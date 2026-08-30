---
name: 'Speaking Page'
description: 'Use when adding future videos, talks, workshops, features, photos, or PowerPoint deck embeds to the Speaking page'
applyTo: 'docs/_pages/speaking.md,docs/_data/features.yml,docs/assets/js/speaking-talks.js'
---

# Speaking Page Maintenance

Preserve the existing page structure and components. For routine additions, clone the nearest matching entry instead of redesigning or refactoring the page.

## Videos

- Treat the curated YouTube playlist as the source of truth. Add, remove, and reorder recordings in YouTube instead of creating individual page entries.
- When changing playlists, update the iframe's `list` parameter and set `data-speaking-playlist-featured-video-id` to a video in that playlist.
- Do not add manually maintained video captions or metadata.

## Talks & Workshops

- Copy an existing `.talk-card` and preserve this order: `.talk-card__title`, optional italic subtitle, `**Best For:**`, `**Format:**`, description, optional slides embed, `**Presented At:**`, and `**Resources:**`. Keep the title as a styled non-heading element so it does not enter the page TOC. Omit the subtitle or slides embed when none exists.
- Give every `.talk-card` a unique, permanent, lowercase kebab-case `id`. Treat `/speaking/#<id>` as a public permalink, and never change an existing ID when a talk title changes.
- Preserve progressive enhancement for talk permalinks. The source card owns the ID, the dialog clones only its contents, recognized fragments open the matching dialog, and unrelated fragments remain untouched.
- Opening **View Details** replaces the current URL fragment without adding a browser history entry. Closing the dialog clears only the active talk fragment.
- Keep every talk card inside `.speaking-talks-grid`, which renders 1 column on mobile, 2 on desktop, and an odd final card across the full row.
- Keep the first description paragraph compelling and understandable on its own because it remains visible in the collapsed card.
- Link directly to useful recordings, articles, decks, workshops, and repositories.

### PowerPoint Deck Embeds

- When a public deck exists, embed 1 representative version after the complete description and before `**Presented At:**`. Keep alternate versions as direct links under `**Resources:**`.
- Generate the embed URL in PowerPoint for the web through **File**, **Share**, and **Embed this Presentation**. Use the generated `em=2` URL. Do not place an ordinary OneDrive `e=` sharing URL in an iframe.
- Copy only the generated iframe URL into `data-speaking-talk-slides-src`. Do not add `src` in the source card. `speaking-talks.js` adds `src` after the matching dialog opens, shows an accessible loading status, and replaces it after 12 seconds with guidance to use the PowerPoint link under `**Resources:**`. Removing the dialog contents unloads the viewer when it closes.
- Use the existing responsive wrapper and attributes. Replace only the URL and descriptive title.

```html
<div class="speaking-talk-dialog__slides">
	<div class="speaking-talk-dialog__section-heading">Slides</div>
	<div class="speaking-talk-dialog__slides-frame">
		<iframe data-speaking-talk-slides-iframe data-speaking-talk-slides-src="POWERPOINT_EMBED_URL" title="TALK_TITLE slides" loading="lazy" allowfullscreen></iframe>
	</div>
</div>
```

- Keep the deck-specific styles in the existing `<style>` block in `speaking.md`. Preserve the frame's `476 / 288` aspect ratio, loading spinner, reduced-motion behavior, full-width iframe, border, and overflow rules. Do not move these styles into the sitewide `_styleoverrides.scss` file. Do not copy PowerPoint's fixed `width` or `height` attributes.
- Keep the direct OneDrive PowerPoint link under `**Resources:**`. The embed is the inline viewer. The direct link is the open or download path.
- Verify a new embed in a signed-out browser. Confirm that it loads without a Microsoft account, works at mobile width, exposes its viewer controls, and updates when the OneDrive deck changes.

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
