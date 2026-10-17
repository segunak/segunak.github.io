import struct
import tempfile
import unittest
import zlib
from pathlib import Path

from PIL import Image, ImageCms, ImageOps, PngImagePlugin

from sync_image import create_preview


class PreviewTests(unittest.TestCase):
    def setUp(self) -> None:
        self.folder = tempfile.TemporaryDirectory()
        self.root = Path(self.folder.name)
        self.output = self.root / "preview.webp"
        self.profile = ImageCms.ImageCmsProfile(ImageCms.createProfile("sRGB")).tobytes()

    def tearDown(self) -> None:
        self.folder.cleanup()

    def test_preview_is_small_and_preserves_the_source_profile_and_original(self) -> None:
        source = self.root / "Photo With Spaces.jpg"
        Image.linear_gradient("L").convert("RGB").resize((1024, 683)).save(
            source, icc_profile=self.profile
        )
        original_bytes = source.read_bytes()
        self.assertEqual(create_preview(source, self.output), {"width": 800, "height": 534})

        with Image.open(self.output) as preview:
            self.assertEqual(preview.format, "WEBP")
            self.assertEqual(preview.info.get("icc_profile"), self.profile)
            self.assertLess(self.output.stat().st_size, len(original_bytes))
        self.assertEqual(source.read_bytes(), original_bytes)

    def test_portrait_orientation_is_applied(self) -> None:
        source = self.root / "portrait.jpg"
        exif = Image.Exif()
        exif[274] = 6
        Image.new("RGB", (300, 500), (123, 45, 67)).save(source, exif=exif)

        self.assertEqual(create_preview(source, self.output), {"width": 500, "height": 300})
        with Image.open(self.output) as preview:
            self.assertEqual(preview.size, (500, 300))

    def test_preview_does_not_upscale_small_images(self) -> None:
        source = self.root / "small.png"
        Image.new("RGBA", (40, 30), (123, 45, 67, 128)).save(source)

        self.assertEqual(create_preview(source, self.output), {"width": 40, "height": 30})
        with Image.open(self.output) as preview:
            self.assertEqual(preview.size, (40, 30))
            self.assertEqual(preview.mode, "RGBA")

    def test_original_cannot_be_used_as_the_destination(self) -> None:
        source = self.root / "source.png"
        Image.new("RGB", (40, 30)).save(source)
        original_bytes = source.read_bytes()

        with self.assertRaisesRegex(ValueError, "must not overwrite"):
            create_preview(source, source)
        self.assertEqual(source.read_bytes(), original_bytes)

    def test_animated_images_are_rejected(self) -> None:
        source = self.root / "animated.png"
        Image.new("RGB", (17, 13), "red").save(
            source, save_all=True, append_images=[Image.new("RGB", (17, 13), "blue")]
        )

        with self.assertRaisesRegex(ValueError, "single-frame"):
            create_preview(source, self.output)

    def test_high_bit_depth_images_are_rejected(self) -> None:
        source = self.root / "source.png"
        Image.new("I;16", (17, 13)).save(source)

        with self.assertRaisesRegex(ValueError, "8-bit"):
            create_preview(source, self.output)

    def test_16_bit_rgb_png_is_rejected_before_precision_is_reduced(self) -> None:
        def chunk(kind: bytes, data: bytes) -> bytes:
            return (
                struct.pack(">I", len(data))
                + kind
                + data
                + struct.pack(">I", zlib.crc32(kind + data))
            )

        source = self.root / "source.png"
        source.write_bytes(
            b"\x89PNG\r\n\x1a\n"
            + chunk(b"IHDR", struct.pack(">IIBBBBB", 1, 1, 16, 2, 0, 0, 0))
            + chunk(b"IDAT", zlib.compress(b"\x00\x12\x34\x56\x78\x9a\xbc"))
            + chunk(b"IEND", b"")
        )

        with self.assertRaisesRegex(ValueError, "16-bit"):
            create_preview(source, self.output)

    def test_png_gamma_is_not_silently_discarded(self) -> None:
        source = self.root / "gamma.png"
        metadata = PngImagePlugin.PngInfo()
        metadata.add(b"gAMA", struct.pack(">I", 100000))
        Image.new("RGB", (40, 30), (123, 45, 67)).save(source, pnginfo=metadata)

        with self.assertRaisesRegex(ValueError, "color metadata"):
            create_preview(source, self.output)

    def test_icc_profile_takes_precedence_over_png_gamma_metadata(self) -> None:
        source = self.root / "profiled-gamma.png"
        metadata = PngImagePlugin.PngInfo()
        metadata.add(b"gAMA", struct.pack(">I", 100000))
        image = Image.new("RGB", (40, 30), (123, 45, 67))
        image.save(source, pnginfo=metadata, icc_profile=self.profile)

        create_preview(source, self.output)
        with Image.open(self.output) as preview:
            self.assertEqual(preview.info.get("icc_profile"), self.profile)

    def test_invalid_quality_and_dimensions_are_rejected(self) -> None:
        source = self.root / "source.png"
        Image.new("RGB", (40, 30)).save(source)

        with self.assertRaisesRegex(ValueError, "Maximum dimension"):
            create_preview(source, self.output, 0)
        with self.assertRaisesRegex(ValueError, "quality"):
            create_preview(source, self.output, quality=101)

    def test_exif_transpose_helper_preserves_profile_metadata(self) -> None:
        source = self.root / "source.jpg"
        image = Image.linear_gradient("L").convert("RGB").resize((40, 30))
        image.save(source, icc_profile=self.profile)

        with Image.open(source) as original, ImageOps.exif_transpose(original) as oriented:
            self.assertEqual(oriented.info.get("icc_profile"), self.profile)


if __name__ == "__main__":
    unittest.main()
