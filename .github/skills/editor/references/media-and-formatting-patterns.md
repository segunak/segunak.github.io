# Media And Formatting Patterns

Use this reference for post mechanics after checking related posts in [the full _posts corpus](../../../../docs/_posts).

## Media Corpus

Treat [docs/assets/images](../../../../docs/assets/images/) as a visual style corpus. It contains not only post assets but also evidence of the author's cover image taste, meme culture, pop culture references, reaction GIF rhythm, screenshots, and visual humor.

When suggesting media:

1. Check how related posts use images and GIFs.
2. Prefer existing assets from [docs/assets/images](../../../../docs/assets/images/) when they fit the draft.
3. Match the moment, not just the topic. A reaction GIF should fit the emotional beat in the prose.
4. If no existing asset fits, suggest meme concepts, image directions, or online search ideas that align with the author's demonstrated humor and references.
5. Do not download, add, or invent new media unless the user explicitly asks.

## Scripts

Most posts load this immediately after front matter:

```html
<script src="/assets/js/dynamic-link-targeting.js"></script>
```

Posts that use Mermaid diagrams load this before the dynamic link script:

```html
<script src="/assets/js/mermaid.min.js"></script>
```

In general a given post can load whatever custom scripts are needed for that page to accomplish its task.

## Hero Overlay Framing

Many posts use a small inline `<style>` block after the script tags to tune how the Minimal Mistakes `header.overlay_image` appears in the hero banner. Treat this as an established house pattern. Do not delete it as stray CSS when polishing a post.

Use this pattern when the overlay image is cropping poorly, the focal point is too high or low, the hero feels too short on desktop, or the title/lead needs better room over the image.

Common controls:

1. `padding` on `.page__hero--overlay` changes hero height. Existing posts commonly use `10em 0`, `11em 0`, `12em 0`, and occasionally larger values like `15em 0` when the image needs more vertical room.
2. `background-position` moves the image crop. Existing values include `center`, `center bottom`, `center 60%`, and `center 92%`.
3. `.page__hero--overlay .page__lead` can set `max-width` when the excerpt line needs a more readable width over the image.
4. Put tablet and desktop changes inside `@media (min-width: 768px)` unless the mobile crop also needs a deliberate adjustment.
5. Always check that every `<style>`, `@media`, and CSS rule block is closed. Use static checks and careful review for this. Do not run a Jekyll build or serve command.

Default desktop pattern:

```html
<style>
  /* Tablet and larger */
  @media (min-width: 768px) {
    .page__hero--overlay {
      padding: 10em 0;
    }
  }
</style>
```

Use `padding: 10em 0` as the normal starting point. Raise it when the post already shows the image needs more height.

When the important part of the image is not centered, add `background-position`:

```html
<style>
  .page__hero--overlay {
    background-position: center 60%;
  }

  /* Tablet and larger */
  @media (min-width: 768px) {
    .page__hero--overlay {
      padding: 10em 0;
    }
  }
</style>
```

Use `center bottom` when the important visual detail is low in the image, as seen in AI and Copilot posts. Use a percentage such as `center 60%` or `center 92%` when the focal point needs a more precise vertical crop. If the desktop and mobile crops both need the same focal point, set `background-position` outside the media query and repeat it inside the query only when the desktop crop differs.

Before editing this CSS, inspect related posts with similar cover image shapes. Good source models include:

1. [2025-02-15-github-copilot-agent-mode.md](../../../../docs/_posts/2025-02-15-github-copilot-agent-mode.md) for `center bottom` and GIF width tuning.
2. [2024-11-19-stem-workshop-three-levels-of-programming-petoi-bittle.md](../../../../docs/_posts/2024-11-19-stem-workshop-three-levels-of-programming-petoi-bittle.md) for `center 60%` with desktop padding.
3. [2025-02-27-comforts-of-christ.md](../../../../docs/_posts/2025-02-27-comforts-of-christ.md) for mobile and desktop hero positioning.
4. [2024-11-28-gladiator-II-good-not-great.md](../../../../docs/_posts/2024-11-28-gladiator-II-good-not-great.md) for `.page__lead` width control.
5. [2025-07-23-ai-engineering-petoi-bittle.md](../../../../docs/_posts/2025-07-23-ai-engineering-petoi-bittle.md) for a compact one-line desktop padding rule.

For hero overlay changes, focus on the changed height, focal position, excerpt width, or formatting. If the image still needs visual judgment, tell the author what to inspect in the local preview.

## Notices

Minimal Mistakes notices use a class marker immediately after the paragraph or blockquote.

```markdown
**Heads Up:** This post starts with context before the main section.
{: .notice--warning}
```

Use:

1. `.notice--primary` for author's notes, read more blocks, and resource recommendations.
2. `.notice--warning` for spoilers, caveats, and heads up notes.
3. `.notice--info` for side context and navigation hints.
4. `.notice--success` only when a related post already supports that pattern.

## Meme GIFs

Reaction GIFs usually use this wrapper:

```html
<div class="meme-container">
  <div class="meme-wrapper">
    <img src="/assets/images/filename.gif" />
  </div>
</div>
```

Use this for a full reaction beat. Plain Markdown images or raw `img` tags are fine for smaller one off images when an existing post uses that pattern.

## Standard Images

```markdown
![DescriptiveAltText](/assets/images/filename.jpg)
```

Use descriptive alt text. Keep image paths under `/assets/images/`.

## YouTube Embeds

Short reference videos often use:

```html
<p>
    <iframe width="100%" height="70" src="https://www.youtube.com/embed/VIDEO_ID" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
</p>
```

Spoiler sensitive entertainment posts sometimes use image preview links instead of embedded video.

## Office Embeds

Workshop resources often use OneDrive or Office embeds like this:

```html
<iframe src="https://1drv.ms/..." width="100%" height="500px" frameborder="0">This is an embedded <a target="_blank" href="https://office.com">Microsoft Office</a> document, powered by <a target="_blank" href="https://office.com/webapps">Office</a>.</iframe>
```

## LinkedIn Embeds

```html
<iframe src="https://www.linkedin.com/embed/feed/update/..." height="430px" width="100%" frameborder="0" allowfullscreen="" title="LinkedIn Post"></iframe>
```

## Mermaid Diagrams

```html
<div class="mermaid">
  graph LR
    A[Start] --> B[Process]
</div>
```

## Blockquotes And Citations

```markdown
> Quote text here.
>
> <cite>[Source](url)</cite>
```

Scripture quotes, article quotes, and source excerpts should preserve this visual rhythm.

## Lists Over Tables

Markdown tables are rare in posts. Prefer prose, bullets, and numbered lists for mobile readability.
