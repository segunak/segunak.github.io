---
name: speaking-photos
description: 'Add, remove, regenerate, or troubleshoot photos for the Speaking page gallery. Use for speaking photos, speaker gallery, personal brand photos, gallery thumbnails, gallery WebPs, or files in docs/assets/images/me.'
argument-hint: 'A photo path or gallery task'
---

# Speaking Photos

Manage the Speaking page photo pipeline without modifying original images.

## Rules

1. Put originals directly in `docs/assets/images/me/`.
2. Never resize, convert, overwrite, or delete an original unless the user explicitly requests it.
3. Never manually edit `display/`, `thumbs/`, or `docs/_data/speaking_photos.json`.
4. Run the shared generator after originals change.

   ```powershell
   pwsh -NoProfile -File .github/skills/speaking-photos/scripts/sync.ps1
   ```

5. Treat `speaking_gallery.photos` inside `docs/_pages/speaking.md` as the gallery inclusion list. Only listed photos render.
   - `file` is required and must match an original and manifest record.
   - `caption` is required and excludes the date, which is rendered from `month`.
   - `month` uses quoted `MM-YYYY` format, controls newest-first ordering, and is optional only when the date is unknown. Undated photos render last.
   - Download names are generated automatically as `segun-akinyemi-{12-character content hash}.{extension}`. Do not add download metadata to individual photos.
   - `featured: true` adds a photo to the visible grid. Omit `featured` otherwise. List order controls featured order.
   - Load thumbnails rendered in the visible featured grid eagerly. Keep thumbnails shown only inside the closed **View All** dialog lazy, and keep display images demand-loaded by the lightbox.
   - `credit` and `credit_url` add attribution.
   - Omit non-gallery assets such as the headshot. Do not use `include`.
   - Keep exactly one supported original with the stem `SegunAkinyemiHeadshot`. The validator requires it, and the Speaking page derives its extension, dimensions, paths, and download filename from the generated manifest record. The shared gallery popup supplies its enlarged-view download control.
6. Run `ruby .github/skills/speaking-photos/scripts/validate-gallery.rb` after front matter-only changes. The shared generator runs it automatically after a sync.
7. Report generated, unchanged, and removed derivatives.
8. When an original is deleted, remove its front matter entry and run the generator to remove its orphaned display and thumbnail WebPs and manifest record.
9. Never commit or push.

The Git pre-commit hook runs the same generator for staged original changes.
