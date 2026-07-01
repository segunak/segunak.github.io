# Front Matter And Jekyll

Use this reference when a draft needs publication mechanics for this Jekyll and Minimal Mistakes blog.

## Site Defaults

The site configuration is in [docs/_config.yml](../../../../docs/_config.yml).

Important defaults:

1. Posts use `layout: single`.
2. `show_date: true`.
3. `author_profile: true` unless overridden.
4. `read_time: true` unless overridden.
5. `comments: true`, though the provider is disabled globally.
6. `share: true`.
7. `related: true`.
8. Permalinks use `/:categories/:title/`, which produces `/blog/[slug]/` because posts use `blog` as their category.

## Standard Front Matter Order

Use this order for normal posts:

```yaml
---
title: "Post Title"
excerpt: "Short preview sentence."
last_modified_at:
toc: true
toc_sticky: true
toc_label: "On This Page"
toc_icon: "robot"
header:
  teaser: /assets/images/example.jpg
  og_image: /assets/images/example.jpg
  overlay_image: /assets/images/example.jpg
  overlay_filter: 0.6
categories:
  - blog
tags:
  - (choose from the current site tags returned by the site-tags skill)
---
```

Only include optional keys when they fit the post.

Keep `last_modified_at:` present but blank while drafting or preparing a post. Do not manually invent or fill this timestamp during normal writing, polishing, or publication preparation. The versioned Git pre-commit hook at [`.githooks/pre-commit`](../../../../.githooks/pre-commit) updates `last_modified_at` automatically for staged Markdown files under [docs/_posts](../../../../docs/_posts/) when a commit is made. If the hook is not running in a fresh clone, run `git config core.hooksPath .githooks` from the repository root.

## Required Fields

Normal posts should have:

1. `title`
2. `excerpt`
3. `header.teaser`
4. `categories`
5. `tags`

Use `categories` with `blog` unless there is an explicit reason not to.

## Tag Conventions

Tags are lowercase and hyphenated.

Before adding or changing tags, use the [Site Tags skill](../../site-tags/SKILL.md) to scan [docs/_posts](../../../../docs/_posts/) and return the current unique tag values. Choose from that generated list unless the author explicitly wants to introduce a new site tag. If introducing a new tag, keep it lowercase and hyphenated.

## Table Of Contents

Substantial posts usually use:

```yaml
toc: true
toc_sticky: true
toc_label: "On This Page"
toc_icon: "robot"
```

Icon patterns:

1. `robot` for AI, GitHub Copilot, and agent posts.
2. `microchip` for STEM and AI education.
3. `database` for data engineering posts.
4. `book` for faith posts.
5. `coffee` for third places.
6. `info-circle` for Dough Diaries and general narrative posts.
7. `bolt` for entertainment or analysis.

## Header Images

Header pattern:

```yaml
header:
  teaser: /assets/images/example.jpg
  og_image: /assets/images/example.jpg
  overlay_image: /assets/images/example.jpg
  overlay_filter: 0.6
  caption: "Image Credit: [**Source**](url)"
```

`teaser` drives post cards. `og_image` supports social previews. `overlay_image` creates the hero banner. `overlay_filter` is often around `0.6`.

## Special Flags

Use `classes: wide` for technical deep dives, wide screenshots, or pages that need more horizontal room.

Use `read_time: false` and `author_profile: false` for faith catalogs or special posts where the normal article frame feels wrong.

Use `pinned: true` only for featured posts or major highlights.

Use `link:` for external press or link posts.

Use `canonical_url:` and `seo:` only for high visibility SEO cases where the post already follows that pattern.

## Manual Sidebars

Most new substantial posts should use `toc`. Some older long posts use a manual sidebar with entries in [docs/_data/navigation.yml](../../../../docs/_data/navigation.yml). Reuse manual sidebars only when the post needs a custom navigation structure.
