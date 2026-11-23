# Blog Style Guide

Use this guide when an edit requires judgment about voice, rhythm, audience, hyperlinks, existing humor, or personal employer references. Ground that judgment in the active draft and [the full _posts corpus](../../../../docs/_posts) first.

These are observed tendencies, not ingredients to add. Do not manufacture voice markers merely to make a draft resemble the guide.

## Voice

The author's voice is conversational, direct, approachable, technical when needed, occasionally sarcastic, meme aware, and allergic to marketing prose. The writing should sound like a software engineer explaining things clearly to smart readers without trying to sound impressive.

Core traits:

1. Clarity before cleverness.
2. Technical accuracy without needless abstraction.
3. Casual phrasing blended with precise technical language.
4. Cultural references used as bridges back to the point.
5. Punchy lines, self aware undercuts, and occasional sarcasm.
6. Mobile friendly paragraphs with breathing room.
7. Respect for one specific intelligent reader instead of a generic crowd.
8. Hyperlinks used as source grounding, compression, and sometimes comedy.

## Audience Of One, Front-Loading, And Exit Ramps

Pair [John Steinbeck's audience of one principle](https://www.megykarydes.com/news/2017/8/7/john-steinbeck-write-for-an-audience-of-one) with [Daniel Sada's assume-disinterest principle](https://danielsada.tech/blog/assume-people-are-not-interested-in-your-blog-post/). Assume a new reader is deciding in the first few lines whether the post applies to them and is worth their eyes.

The author tends to be verbose, detailed, and thorough, and values personal storytelling ("yapping") because this is a personal blog, not corporate documentation. Do not flatten his personality into a dry memo. Instead, check that long setup or yapping is either **earned after the payoff** or **signposted up front** through one of the author's established corpus moves:

1. **Conversational audience filter:** Name who the post is for in plain, casual language right away when the topic is niche (as in [Microsoft Fabric Lakehouse SQL Analytics Endpoints](../../../../docs/_posts/2025-11-14-microsoft-fabric-lakehouse-sql-analytics-endpoints.md)).
2. **Payoff first, yap second:** Put the fix, definition, or direct answer in the opening section so skimmers could leave satisfied, then unpack background, nuance, and jokes for readers who stay (as in [MCP vs RAG](../../../../docs/_posts/2025-06-28-mcp-vs-rag.md), [What Is AI Engineering?](../../../../docs/_posts/2026-10-27-what-is-ai-engineering.md), and [GitHub Copilot Auto-Approve URLs](../../../../docs/_posts/2026-02-24-vscode-github-copilot-auto-approve-urls.md)).
3. **Prologue plus skip-link notice:** When an anecdotal `Some Background` section intentionally precedes a workshop, guide, or ranked list, check whether a top notice with a `#section-id` link would help impatient readers jump straight to the meat (as in [AI Engineering With Petoi Bittle](../../../../docs/_posts/2025-07-23-ai-engineering-petoi-bittle.md) and [Agentic AI: From Acronyms to Applications](../../../../docs/_posts/2025-10-13-agentic-ai-from-acronyms-to-applications.md)).
4. **Links and asides as threads:** Compress side detours that only serve a subset of readers into hyperlinks, Google AI Mode links, or `An Aside` `.notice--info` blocks rather than stalling the main prose.

Trust the reader's intelligence. Do not add basic primers just because some possible reader somewhere may need them. Add context when the intended reader needs it, not when the internet in general might.

## Hyperlinks As Voice And Compression

Hyperlinks are a major part of the author's style. They are not only citations. They can be source grounding, joke delivery, quiet context, receipts, rabbit holes, or a way to avoid overexplaining.

When editing:

1. Prefer a useful hyperlink over a bulky explanation when the intended reader can follow the point without the extra detail.
2. Suggest links to source of truth references, definitions, background, jokes, pop culture references, docs, or related posts when they help the prose stay tight.
3. Do not make every link label painfully explicit. The author sometimes uses links where the surrounding sentence carries the surface meaning and the link adds a second layer.
4. Keep links conversational. Avoid turning the prose into a citation dump.
5. When cutting explanation, consider whether a link can preserve the helpful path for curious readers.

## Employer References

The author writes a personal blog and does not write on behalf of his employer. When the draft refers to the author's employer, workplace, or company affiliation in a personal capacity, do not directly name the employer in the prose.

Default to indirect linked phrasing such as:

1. `[company you've probably heard of](https://en.wikipedia.org/wiki/Microsoft)`
2. `[employer's](https://en.wikipedia.org/wiki/Microsoft)`

Use the version that best fits the sentence and tone, including variations of the above themes. The point is to keep the post clearly personal, avoid sounding like the author represents the company, and preserve the established wink in the author's style.

This rule does not forbid naming the company when the post is directly discussing public products, public resources, news, documentation, or external articles where the company itself is the subject. It applies specifically to references to where the author works or the author's workplace affiliation.

## Humor And Cultural References

Humor should feel like it belongs to the argument. Do not add jokes as decoration.

Preserve cultural references and jokes already present in the draft. If a joke or reference lands awkwardly, tighten it only by trimming excess words or flag it in an editorial note so the author can rework the punchline in his own words. Never rewrite a joke's phrasing for the author. Use related posts in [the full _posts corpus](../../../../docs/_posts) to understand how the author deploys humor. Consult the [library](../../../../docs/_pages/library.md) or public [Goodreads profile](https://www.goodreads.com/segunak) only when an existing literary reference makes that relevant.

For post-specific structure and endings, use [Post type playbooks](./post-type-playbooks.md). Do not force a draft into an existing category merely because a playbook exists.
