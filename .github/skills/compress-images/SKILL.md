---
name: compress-images
description: 'Losslessly shrink an image, GIF, or video on a Windows machine when a file is too big to commit or too heavy for the site. Use for compress image, optimize image, shrink photo, reduce file size, file too large, PNG too big, JPEG too big, GIF too big, MP4 too big, video too big, lossless compression, optimize assets. Installs missing tools with winget and verifies every result is pixel identical to the original.'
argument-hint: 'A file or folder path'
---

# Compress Images

Shrink files with zero quality loss. Every result is verified pixel identical to its original, and the original is kept whenever that verification fails.

## When To Use

A file is too big to commit, a page loads slowly, or a photo, GIF, or video needs to get smaller without looking worse.

## What Lossless Means Here

The decoded pixels are bit for bit identical before and after. Only tools that guarantee that are used.

| Format | Tool | Verified by |
| --- | --- | --- |
| PNG | `oxipng` | md5 of every decoded frame |
| JPEG | `jpegoptim` | md5 of every decoded frame |
| GIF | `gifsicle -O3` | md5 of a 50fps resampled timeline |
| Video | `ffmpeg -c copy` | md5 of the copied bitstream |

Three facts that decide those choices.

1. **ffmpeg cannot losslessly optimize a JPEG.** Every JPEG that passes through an ffmpeg encoder is re-encoded and loses quality, so JPEG goes to `jpegoptim`. ffmpeg is still used here, as the verifier.
2. **GIFs need a resampled timeline to verify.** `gifsicle -O3` merges duplicate frames and combines their delays. The animation renders identically, but the stored frame list changes, so comparing raw frames gives a false failure.
3. **Video barely shrinks losslessly.** `-c copy` only strips container overhead. Real video size reduction requires re-encoding, which is lossy. If a video is still too big afterward, say so and ask before doing anything lossy.

## What To Expect

Savings depend entirely on how the file was originally written.

| Type | Typical result |
| --- | --- |
| PNG from a screenshot or export tool | 5 to 40 percent |
| JPEG from a camera | Near zero, since the encoder was already efficient |
| GIF from a modern exporter | Under 1 percent |
| Already optimized anything | Skipped, original kept |

A skip is a success. It means the file was already as small as it can get without losing quality.

## Procedure

1. Run the script against a file or a folder.

   ```powershell
   pwsh -File .github/skills/compress-images/scripts/compress.ps1 -Path docs/assets/images/me
   ```

2. It checks for all 4 tools and installs anything missing. `ffmpeg`, `oxipng`, and `jpegoptim` come from `winget`. `gifsicle` comes from `npm`, since it is absent from winget and the chocolatey package would stall on a UAC prompt.
3. For each file it compresses a temp copy, hashes both the original and the copy with ffmpeg, and overwrites the original only when the hashes match and the result is smaller.
4. Report the before and after sizes plus anything skipped.

Add `-DryRun` to see what would change without touching a file.

## Notes

Installs need no admin rights. Both winget and `npm install -g` write to per-user locations, and the script refreshes `PATH` in-session afterward so a freshly installed tool is usable immediately.

GIFs are skipped and reported if `gifsicle` is still unavailable, which only happens when Node is not installed.

Never commit or push. Report the results and let the author run git.
