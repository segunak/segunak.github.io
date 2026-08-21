---
name: 'Speaking Page'
description: 'Use when adding future videos, talks, workshops, features, or photos to the Speaking page'
applyTo: 'docs/_pages/speaking.md,docs/_data/features.yml'
---

# Speaking Page Maintenance

Preserve the existing page structure and components. For routine additions, clone the nearest matching entry instead of redesigning or refactoring the page.

## Videos

- Treat the curated YouTube playlist as the source of truth. Add, remove, and reorder recordings in YouTube instead of creating individual page entries.
- When changing playlists, update the iframe's `list` parameter and set `data-speaking-playlist-featured-video-id` to a video in that playlist.
- Do not add manually maintained video captions or metadata.

## Talks & Workshops

- Copy an existing `.talk-card` and preserve this order: `.talk-card__title`, optional italic subtitle, `**Best For:**`, `**Format:**`, description, `**Presented At:**`, and `**Resources:**`. Keep the title as a styled non-heading element so it does not enter the page TOC. Omit the subtitle when none exists.
- Keep every talk card inside `.speaking-talks-grid`, which renders 1 column on mobile, 2 on desktop, and an odd final card across the full row.
- Keep the first description paragraph compelling and understandable on its own because it remains visible in the collapsed card.
- Link directly to useful recordings, articles, decks, workshops, and repositories.

## Features, Mentions, & Testimonials

- Add entries to `docs/_data/features.yml`, not directly to the page. Follow the complete schema and examples documented at the top of that file.
- Mark an entry `featured: true` to show it in the initial grid. Featured items are not repeated in **View More**, which contains only nonfeatured items. Recommend exactly 4 featured entries for a complete 2 by 2 desktop preview.
- Keep loading behavior data-driven. Every `featured: true` embed or media player loads eagerly regardless of how many featured entries exist. Only nonfeatured content inside the closed **View More** dialog may use deferred iframe URLs.
- Give every nonfeatured `feature` with `embed_url` a `poster` and `poster_alt` so its facade remains complete until **View More** opens and loads the player.
- Arrange entries as mixed desktop pairs. Interleave types, avoid runs longer than 2 of one type, do not place 2 testimonials in the same row, and alternate testimonial columns when practical.
- Use `embed` for a complete LinkedIn post, `feature` for a whole external article, profile, or video, `testimonial` for an exact excerpt from a longer source, and `mention` for compact evidence.
- Never iframe a normal article page. Use a verified dedicated media player or an image-backed feature card.
- Keep this section selective. Put the complete chronological record in `docs/_pages/highlights.md`.

## Photos

- Follow `.github/skills/speaking-photos/SKILL.md` for every gallery photo addition, removal, featured-state change, caption, credit, or generated-asset task.
