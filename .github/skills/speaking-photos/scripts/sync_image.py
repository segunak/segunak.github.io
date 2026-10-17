import argparse
from pathlib import Path

from PIL import Image, ImageOps


def create_preview(
    source: Path, destination: Path, max_dimension: int = 800, quality: int = 80
) -> dict[str, int]:
    if max_dimension < 1:
        raise ValueError("Maximum dimension must be positive")
    if not 1 <= quality <= 100:
        raise ValueError("WebP quality must be between 1 and 100")
    if destination.exists() and source.samefile(destination):
        raise ValueError("The destination must not overwrite the original")

    with Image.open(source) as original:
        if original.mode not in ("RGB", "RGBA") or getattr(original, "n_frames", 1) != 1:
            raise ValueError("Only single-frame, 8-bit RGB/RGBA photos are supported")
        if original.format == "PNG":
            with source.open("rb") as stream:
                if stream.read(25)[24] > 8:
                    raise ValueError("16-bit PNGs are not supported for WebP previews")
            if "cicp" in original.info or (
                not original.info.get("icc_profile")
                and "srgb" not in original.info
                and ("gamma" in original.info or "chromaticity" in original.info)
            ):
                raise ValueError("Unsupported PNG color metadata")

        with ImageOps.exif_transpose(original) as image:
            image.thumbnail((max_dimension, max_dimension), Image.Resampling.LANCZOS)
            profile = image.info.get("icc_profile")
            image.save(
                destination,
                format="WEBP",
                quality=quality,
                method=4,
                icc_profile=profile,
            )

            with Image.open(destination) as preview:
                if preview.format != "WEBP":
                    raise ValueError("Generated preview is not a WebP")
                if preview.width > max_dimension or preview.height > max_dimension:
                    raise ValueError("Generated preview exceeds its maximum dimensions")
                if preview.info.get("icc_profile") != profile:
                    raise ValueError("Generated preview color profile does not match the source")

            return {"width": image.width, "height": image.height}


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Create a color-profile-aware gallery preview")
    parser.add_argument("source", type=Path)
    parser.add_argument("destination", type=Path)
    parser.add_argument("--max-dimension", type=int, default=800)
    parser.add_argument("--quality", type=int, default=80)
    args = parser.parse_args()
    create_preview(args.source, args.destination, args.max_dimension, args.quality)
