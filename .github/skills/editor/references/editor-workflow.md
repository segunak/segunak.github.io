# Editor Workflow

Use this workflow for every blog editing task.

## 1. Anchor On The Draft

1. Identify the active draft, selection, or rough Markdown file.
2. Preserve the draft's thesis, sequence of thought, jokes, and emotional center unless Segun explicitly requests a restructure.
3. Decide whether the request is a light polish, a structure pass, a mechanics pass, or a full publication readiness pass.

## 2. Choose The Output Mode

Choose whether to respond in chat or edit the source file before changing files.

Use chat response mode when the author asks for ideas, suggestions, a polished version, a draft version, something to compare, or similar wording. In this mode, provide the polished or revised Markdown in the chat response and leave the source post untouched.

Use in-place edit mode only when the author clearly asks to edit the source file directly, with phrases like `edit this file`, `apply this`, `fix in place`, `make the change`, `update the post`, or similarly direct language.

If the request is ambiguous, do not edit the source post in place. Ask a short clarification or respond in chat with the polished version when the author appears to want a comparable suggestion.

## 3. Classify The Post

Classify the draft before editing. The categories below are common starting points from the current corpus, not limits on future topics:

1. Technical guide
2. AI, software engineering, or career commentary
3. STEM workshop or educational resource
4. Entertainment review or analysis
5. Faith reflection or Scripture catalog
6. Dough Diaries, food, travel, or third places narrative
7. Resource compilation
8. Press, personal highlight, or link post

If the draft does not fit these categories, name a new working category based on the draft itself. Then choose source posts by shared structure, tone, audience, or mechanics instead of forcing a topical match.

## 4. Identify The Audience Of One

Before editing for structure or adding context, identify the one concrete reader implied by the draft.

That reader may include but is not limited to:

1. The author from a few years ago.
2. A good friend.
3. A professional software developer.
4. An AI tinkerer.
5. A tech curious reader.
6. A student or educator.
7. A Christian reader.
8. A local Charlotte reader.

Do not make the post serve everyone. If the draft explains basics only because a hypothetical beginner might be lost, decide whether that explanation serves the chosen reader. If not, suggest a trim, a link, a brief aside, or a separate section instead of a full detour.

The author tends to be detail oriented. Treat concision as an editorial service, not as a voice eraser. Tighten excess detail while preserving rhythm, humor, and the author's natural explanatory style.

## 5. Ground In The Corpus

The full corpus is [the full _posts corpus](../../../../docs/_posts). Read the corpus index or search within it, then choose two to five related posts.

Choose related posts by:

1. Topic overlap
2. Post type
3. Similar emotional register
4. Similar mechanics, such as front matter, notices, media, embeds, or custom CSS
5. Recency, with a bias toward 2024 through 2026 when older posts conflict with current instructions

Do not rely on generic writing instincts before checking the corpus. The corpus is the authority.

For publication readiness, op-ed polish, AP style requests, or copy editing passes, also load [Newsroom polish and AP style](./newsroom-polish-and-ap-style.md) after grounding in the draft and corpus.

## 6. Edit In Layers

1. Mechanical pass: typos, Markdown, links, headings, front matter, scripts, media, notices, and obvious syntax.
2. Clarity pass: sentence order, paragraph breaks, repeated wording, missing transitions, and mobile readability.
3. Tightening pass: details that do not serve the audience of one, redundant setup, repeated examples, and background that should be linked instead of explained.
4. Voice pass: phrasing, rhythm, jokes, undercuts, cultural references, and category fit.
5. Newsroom polish pass: consistency, clarity, accuracy, brevity, attribution, numerals, dates, titles, punctuation, and whether the intended reader can follow the piece without needless detours.
6. Link pass: source of truth links, related post links, joke links, definition links, and indirect employer links where they preserve the author's style or reduce overexplaining.
7. Integrity pass: claims, facts, unsupported statements, missing sources, and places that need `TODO:`.

Make the smallest useful edit for the request. If the draft needs more work than requested, say so without silently doing a larger rewrite.

Do not run validation commands as a default habit after prose-only Markdown edits. Match validation to the surface changed: front matter gets the front matter validator, tags get the tag scanner when needed, media or HTML/CSS gets targeted static checks, and ordinary prose can rely on an editorial reread or targeted diff.
