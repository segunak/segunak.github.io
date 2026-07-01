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
