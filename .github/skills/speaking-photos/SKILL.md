---
name: speaking-photos
description: 'Add, remove, regenerate, or troubleshoot photos for the Speaking page gallery. Use for speaking photos, speaker gallery, personal brand photos, gallery previews, gallery alt text, image sitemaps, or files in docs/assets/images/me.'
---

# Speaking Photos

Manage the Speaking page photo gallery without modifying original images.

## Rules

1. Put original photos directly in `docs/assets/images/me/`.
2. Keep `speaking_gallery.photos` in `docs/_pages/speaking.md` as the only gallery photo list.
3. Never resize, convert, overwrite, or delete an original unless the user explicitly requests it.
4. Do not manually edit generated files in `docs/assets/images/me/thumbs/`. Do not create a generated photo manifest.
5. The pre-commit hook automatically generates and stages previews when the Speaking page or a supported original photo changes. It never modifies originals. To generate previews before committing, run:

   ```powershell
   pwsh -NoProfile -File .github/skills/speaking-photos/scripts/sync.ps1
   ```

   Previews are 800 pixels maximum, WebP quality 80, and preserve embedded ICC profiles. Clicking a photo opens the unchanged original. Previews are intentionally smaller and lossy.

6. Treat `speaking_gallery.photos` in `docs/_pages/speaking.md` as the only source of truth. Only listed photos render.
   - `file` is required and must match an original photo in `docs/assets/images/me/`.
   - `caption` is required and excludes the date, which is rendered from `month`. Describe the actual photo.
   - `alt` is optional. Normally omit it to use the generated author name, caption, and date. Use a nonblank string when that description is inaccurate or insufficient. It replaces the complete alt text without changing the caption. Identify people accurately and avoid keyword stuffing.
   - `month` uses quoted `MM-YYYY` format, controls newest-first ordering, and is optional only when the date is unknown. Undated photos render last.
   - `featured: true` adds a photo to the visible grid. Omit `featured` otherwise. List order controls featured order.
   - Load the six featured previews eagerly. Only load the other previews after **View All** opens. Load full-size originals only in the lightbox, and do not preload neighboring full-size images.
   - `credit` and `credit_url` add attribution.
   - Gallery and headshot downloads use `segun-akinyemi-{12-character random ID}.{original extension}`. JavaScript creates the names without fetching or changing the originals. Keep the direct headshot button and lightbox download names consistent. Do not add download metadata to individual photos or restore a manifest.
   - Omit non-gallery assets such as the headshot. Do not use `include`.
   - Keep the original `SegunAkinyemiHeadshot.jpg` for the separate headshot section. It does not need a gallery preview.
7. Run `ruby .github/skills/speaking-photos/scripts/validate-gallery.rb` after front matter-only changes. The preview generator validates automatically after a sync. After changing the preview generator, run `python -B -m unittest discover -s .github\skills\speaking-photos\scripts -p test_sync_image.py`.
   After gallery template changes, run `ruby .github\skills\speaking-photos\scripts\test_gallery_template.rb` to check rendered preview URLs against the real files using the installed Jekyll and Liquid filters.
8. Report generated, unchanged, and removed previews.
9. When removing a photo, remove its front matter entry and original as appropriate. The sync removes orphaned previews.
10. Never commit or push.

## Image Sitemap

The image sitemap lists the original files from `speaking_gallery.photos`. It updates when the site builds; do not edit the sitemap or `docs/robots.txt` for photo changes.
