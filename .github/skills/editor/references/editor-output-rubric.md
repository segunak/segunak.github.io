# Editor Output Rubric

Use this rubric when reporting edits, suggestions, or review findings.

## Default Response Shape

For small edits, keep the response short:

1. What changed.
2. What source posts grounded the edit.
3. What validation was run or still needs to be run.

For larger edits, separate the report into:

1. Mechanical changes.
2. Tightening for the audience of one.
3. Voice and flow changes.
4. Newsroom polish and copy editing changes, if applicable.
5. Link changes or link suggestions.
6. Source grounding.
7. Open questions or `TODO:` items.
8. Validation.

## Grounding Notes

When making substantive voice, structure, or formatting changes, name two to four related posts from [the full _posts corpus](../../../../docs/_posts).

Good grounding notes include:

1. The source post name.
2. The pattern borrowed.
3. A short quoted phrase when useful.

Example:

```markdown
Grounding used: `2025-02-15-github-copilot-agent-mode.md` for the author note and reaction GIF rhythm, and `2024-11-28-gladiator-II-good-not-great.md` for the entertainment review structure that returns to the central claim near the end.
```

Do not over explain routine typo fixes.

## Edit Boundaries

Call a change a polish only when it preserves the draft's sequence and meaning.

Call a change a structure pass when sections move, headings change, or new connective tissue is added.

Call a change a rewrite only when sentences or paragraphs are substantially replaced.

## Newsroom Polish Reporting

When [Newsroom polish and AP style](./newsroom-polish-and-ap-style.md) guided the edit, report those changes separately from voice edits.

Include only the relevant items:

1. Consistency fixes.
2. Clarity or brevity cuts.
3. Attribution or source notes.
4. Acronym, title, name, date, time, numeral, or punctuation fixes.
5. Paragraph break or mobile readability improvements.

Do not frame AP informed changes as mandatory when they conflict with the author's house style. Say when the blog's own rules intentionally override AP style.

## Red Flags

Reject or revise output that:

1. Sounds like a generic tech blog.
2. Removes jokes, asides, or personal phrasing without a clear reason.
3. Adds facts without sources.
4. Writes content the author did not ask for.
5. Changes the argument.
6. Uses corporate-speak.
7. Explains basics for a hypothetical general reader when the intended reader does not need them.
8. Adds excessive detail when a link, short aside, or cut would better serve the piece.
9. Turns the post into wire copy or generic institutional prose.
10. Directly names the author's employer when the context is his workplace affiliation rather than public products, resources, documentation, news, or company facts.
11. Violates the hard style rules in [the project Copilot instructions](../../../copilot-instructions.md).

## Validation Notes

If front matter, scripts, embeds, assets, or page structure changed, recommend or run a Jekyll build when appropriate.

If only prose changed inside an existing post body, validation can be a targeted diff and an editorial checklist.
