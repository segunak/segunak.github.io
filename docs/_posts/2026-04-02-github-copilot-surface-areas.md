---
title: "Should I Use GitHub Copilot in the CLI, VS Code, or the Web? It Hardly Matters. Context Engineering Makes the Difference."
excerpt: "GitHub Copilot Chat, CLI, and Cloud Agent are different doors to the same AI. The real lever for better output is Context Engineering, not which interface you type into."
toc: true
toc_sticky: true
toc_label: "On This Page"
last_modified_at:
header:
  teaser: /assets/images/ghcp-cli.webp
  og_image: /assets/images/ghcp-cli.webp
  overlay_image: /assets/images/banner-github-copilot.jpg
  overlay_filter: 0.8
categories:
  - blog
tags:
  - tech
  - artificial-intelligence
---

<script src="/assets/js/dynamic-link-targeting.js"></script>

<style>
  /* Tablet and larger */
  @media (min-width: 768px) {
      .page__hero--overlay {
          padding: 10em 0;
      }
  }
</style>


## The Surface Area Debate

There are questions I keep hearing, from colleagues, from friends, on [Reddit](https://www.reddit.com/r/LLMDevs/), on [Hacker News](https://news.ycombinator.com/), in group chats. They all come in different flavors, but they boil down to the same thing. "Which AI coding tool should I be using to get the best results?"

The responses to that question are endless. Conflicting, contradictory, *everyone-has-a-different-answer-and-they're-all-absolutely-sure-they're-right*. As a software engineer expected to be on top of the latest with AI, it can cause a real sense of [FOMO](https://en.wikipedia.org/wiki/Fear_of_missing_out). Sometimes even [impostor syndrome](https://en.wikipedia.org/wiki/Impostor_syndrome). But that feeling fades every time I dive deep to get to the truth behind the noise.

When it comes to [GitHub Copilot](https://docs.github.com/en/copilot/get-started/features) specifically, and its many surface areas (ways of interacting with a tool), here's the kind of stuff I see people asking.

* Which surface area should I use if I want the best results out of coding with AI?
* Why is everyone talking incessantly about the [CLI](https://docs.github.com/en/copilot/concepts/agents/copilot-cli/about-copilot-cli) these days?
* Is the CLI doing something that wasn't happening before using GitHub Copilot in [Agent Mode](https://docs.github.com/en/copilot/get-started/features#agent-mode) in VS Code?
* Is GitHub Copilot in VS Code fundamentally a different thing than GitHub Copilot on the web and in the CLI?
* In what cases does it make sense to use the CLI vs using the VS Code Chat?
* If I use the CLI, should I even be reviewing the code? How do I review changes across many files in the CLI? If the answer is "use an IDE" then why did I leave the IDE in the first place?
* Isn't there literally a terminal inside VS Code? So why are we acting like this is CLI vs VS Code when you can do both **at the same time**?
* Why are we using a terminal as a chat interface when we already had a chat interface?
* Which one of these do I need to use to keep my "AI adoption" metrics high, and me off [layoffs.fyi](https://layoffs.fyi/)?

If you're confused, you're not alone.

<div class="meme-container">
  <div class="meme-wrapper">
    <img alt="Confused Math Lady meme" src="/assets/images/confused-math-lady-meme.gif"/>
  </div>
</div>

Nothing good comes from confusion, and in this age of AI, it feels like everybody's talking, contradicting one another, and making things sound more complicated than they really need to be. Let's get some answers.

## Why GitHub Copilot

I'm a software engineer at a [company you've probably heard of](https://en.wikipedia.org/wiki/Microsoft), and I use [GitHub Copilot](https://github.com/features/copilot) daily across its many surface areas. CLI, VS Code, GitHub.com, [you name it](https://www.youtube.com/watch?v=8BPizjoGP1M).

This article focuses on GitHub Copilot specifically, but the core lessons apply to every AI coding tool out there. [Claude Code](https://docs.anthropic.com/en/docs/agents-and-tools/claude-code/overview), [OpenAI Codex](https://openai.com/codex/), [Gemini CLI](https://geminicli.com/), [Antigravity](https://antigravity.google/), [Cursor](https://cursor.com/home). They're all great.

But [Microsoft](https://en.wikipedia.org/wiki/Embrace,_extend,_and_extinguish) is so invested in GitHub Copilot, and [so good at enterprise licensing](https://www.cnbc.com/2026/03/31/microsoft-cma-investigation-uk-software-business.html), that if you have a corporate job there's a very real chance you'll be using it whether you chose it or not. But unlike [a similarly named Microsoft product](https://en.wikipedia.org/wiki/Microsoft_Copilot), GitHub Copilot doesn't suck. The [GitHub Copilot CLI](https://github.com/features/copilot/cli) has caught up with [Claude Code](https://code.claude.com/docs/en/overview) to where the differences between the two are negligible. VS Code [is the world's best IDE](https://survey.stackoverflow.co/2025/technology/#2-dev-id-es), and [GitHub Copilot Chat](https://code.visualstudio.com/docs/copilot/chat/copilot-chat) works beautifully within it. So if you're a corporate <s>wage slave</s> employee, you're best served [learning how to use it well](https://awesome-copilot.github.com/learning-hub/).

That said, the learnings here, specifically around [Context Engineering](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents), apply to all AI coding tools.

## Where This Confusion Comes From

This whole debate is a direct result of [Claude Code](https://docs.anthropic.com/en/docs/agents-and-tools/claude-code/overview) being so popular. It popularized terminal-based AI coding, [vibe coders](https://en.wikipedia.org/wiki/Vibe_coding) latched onto it, and Microsoft caught up by pushing the [GitHub Copilot CLI](https://docs.github.com/en/copilot/concepts/agents/copilot-cli/about-copilot-cli). Now there are CLIs, web interfaces, and IDE extensions everywhere. The options multiplied, but nobody stopped to explain that the underlying AI is the same.

Part of the problem is history. GitHub Copilot launched in 2021 as an underwhelming autocomplete tool, didn't get chat until 2023, multi-file edits until late 2024, and full [Agent Mode](https://segunakinyemi.com/blog/github-copilot-agent-mode/) until early 2025. A lot of people [formed their opinion during the autocomplete era and never updated it](https://news.ycombinator.com/item?id=44802723).

Microsoft's [legendary inability to name things clearly](https://segunakinyemi.com/blog/natural-language-programming/#an-addendum-microsoft-cant-name-things) doesn't help either. Even [Simon Willison](https://simonwillison.net/), co-creator of [Django](https://www.djangoproject.com/) and one of the most respected voices in AI-assisted coding, [tweeted](https://x.com/simonw/status/2011862194439536657) asking "Is the Microsoft product called Copilot the same thing as GitHub's product called Copilot?" If *he's* confused by Microsoft's naming, you definitely shouldn't feel bad.

This confusion isn't limited to users of [GitHub Copilot](https://github.com/features/copilot) though. It's everywhere. In a recent [Reddit thread](https://www.reddit.com/r/Anthropic/comments/1p7iimt/claude_code_vs_code_extension_is_now_incredible/) about the [Claude Code VS Code extension](https://marketplace.visualstudio.com/items?itemName=anthropic.claude-code), one user put it plainly.

> I can't figure out if there's a difference between CLI, web and VS Code extension. I feel like **they all work.**
>
> [u/imabev](https://www.reddit.com/r/Anthropic/comments/1p7iimt/comment/nqy8ddv/)

To which another replied:

> Same, as someone who does not know a lot about the technical bts, it's kind of confusing to pick one.
>
> [u/JohnDoe99101](https://www.reddit.com/r/Anthropic/comments/1p7iimt/comment/ntbjvkp/)

That exchange is a microcosm of what I'm trying to bring clarity to. The same exact confusion, playing out across AI coding tools, not just GitHub Copilot.

People are asking "which one is the best?" when the answer is that they're all fundamentally the same LLM-powered, context window limited, [Agentic AI](https://segunakinyemi.com/blog/agentic-ai-from-acronyms-to-applications/), reading the same codebase (yours), calling the same models, constrained by the same token limits, just behind different interfaces.

That's not to say the surface area you choose doesn't matter at all. But it's not what makes or breaks your results.

Hopping from GitHub Copilot Chat to GitHub Copilot CLI and typing the same prompt **won't change much**, other than you discovering that [LLMs are non-deterministic](https://arxiv.org/html/2408.04667v5).

What actually moves the needle is [Context Engineering](https://github.blog/ai-and-ml/generative-ai/want-better-ai-outputs-try-context-engineering/). If you haven't encountered the term yet, [Philipp Schmid](https://www.philschmid.de/context-engineering), a Staff Engineer at [Google DeepMind](https://deepmind.google/), defines it well.

> Context Engineering is the discipline of designing and building dynamic systems that provide the right information and tools, in the right format, at the right time, to give an LLM everything it needs to accomplish a task.
>
> [Philipp Schmid - The New Skill in AI is Not Prompting, It's Context Engineering](https://www.philschmid.de/context-engineering)

It's the evolution of [prompt engineering](https://www.google.com/search?q=what+is+prompt+engineering). Instead of obsessing over how to phrase a single question, you're engineering the entire environment the AI operates in. Instructions, tools, memory, examples, quality gates. [Anthropic](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents) also frames it nicely.

> Good context engineering means finding the smallest possible set of high-signal tokens that maximize the likelihood of some desired outcome.
>
> [Anthropic - Effective Context Engineering for AI Agents](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents)

Invest in Context Engineering, and every single one of those surface areas gets better. All of them. At the same time.

## One GitHub Copilot, Many Doors

There is **one** GitHub Copilot. One.

The [GitHub Copilot docs](https://docs.github.com/en/copilot/get-started/features) and the [VS Code docs](https://code.visualstudio.com/docs/copilot/agents/overview) spell this out clearly. GitHub Copilot runs in different environments depending on when you need results and how much oversight you want. The two key dimensions are **where the agent runs** (your machine or the cloud) and **how you interact with it** (interactively or autonomously in the background).

From a [single dropdown in VS Code](https://code.visualstudio.com/docs/copilot/agents/overview#_types-of-agents), you can pick between all of them. [Local GitHub Copilot Chat](https://docs.github.com/en/copilot/using-github-copilot/asking-github-copilot-questions-in-your-ide) for interactive work, [GitHub Copilot CLI](https://docs.github.com/en/copilot/concepts/agents/about-copilot-cli) for background tasks, or a [GitHub Copilot Cloud Agent](https://docs.github.com/en/copilot/using-github-copilot/coding-agent) for PR-based workflows.

<div class="meme-container">
  <div class="meme-wrapper">
    <img alt="VS Code dropdown showing CLI and Cloud Agent options" src="/assets/images/vsscode-dropdown.png"/>
  </div>
</div>

Or you can go directly to each surface area on its own. Run the CLI in your terminal or assign an issue to a Cloud Agent on [github.com](https://github.com/copilot). They're not different tools. They're different windows into the same tool. The difference is the interface.

* **[GitHub Copilot Chat](https://docs.github.com/en/copilot/how-tos/chat-with-copilot)**. VS Code, Visual Studio, JetBrains, etc. Agent Mode, chat, inline suggestions.
* **[GitHub Copilot CLI](https://docs.github.com/copilot/how-tos/copilot-cli/cli-getting-started)**. Your terminal. Any terminal (including the one's inside of IDE's). Terminal-native AI coding assistant.
* **[GitHub Copilot Cloud Agent](https://docs.github.com/copilot/using-github-copilot/using-copilot-coding-agent-to-work-on-tasks)**. GitHub. Assign issues to agents, get PRs back.
* **[GitHub Copilot on GitHub.com](https://github.com/copilot)**. Immersive chat about your repos.

## The CLI Craze

Somewhere along the way, a UI preference got confused for a quality difference.

The [Claude Code](https://docs.anthropic.com/en/docs/agents-and-tools/claude-code/overview) vibe coding craze has some people thinking that by using the CLI you are uniquely doing something you weren't before. That the terminal is somehow producing better output because... it's a terminal? It's the same AI. Same models. Same codebase.

And here's what's left me the most perplexed throughout the CLI craze. There's a terminal in VS Code. It's been there for years.

**The GitHub Copilot CLI works inside VS Code. You can use it and the chat at the same time. You don't have to choose.**

Anyone saying stuff like "GitHub Copilot CLI is way better than VS Code Chat," or "I switched to the CLI and my productivity 10x'd," or "Stop using VS Code, the terminal is the future," or "Why I ditched VS Code Chat and never looked back" is either misinformed, misleading others, or just flat out wrong.

[Stop the cap](https://www.google.com/search?q=stop+the+cap+phrase+meaning&oq=stop+the+cap+phrase+meaning). They're not competing products. You should use what you feel comfortable with. I mean, VS Code will literally call the CLI for you if you set the chat window to "Background." **And again, there's a terminal in VS Code**.

I'm not the only one confused by the CLI craze. In a [recent Reddit thread](https://www.reddit.com/r/GithubCopilot/comments/1sc14xv/what_are_the_advantages_of_using_copilot_cli_over/) asking "What are the advantages of using Copilot CLI over VS Code?", the top comment was.

> You look like a hacker and people think you are smart.
>
> [u/Genetic_Prisoner](https://www.reddit.com/r/GithubCopilot/comments/1sc14xv/what_are_the_advantages_of_using_copilot_cli_over/oe7kdvo/)

And another great point that I agree with 100%.

> CLI inside of vscode is where it's at. Easy to open files and access to IDE internal tools, with all the benefits of the cli.
>
> [u/mattgrommes](https://www.reddit.com/r/GithubCopilot/comments/1sc14xv/what_are_the_advantages_of_using_copilot_cli_over/oe7o1x2/)

And then there's someone who tried it at work and felt a purely CLI experience wasn't it for them.

> That was my thing. I had it installed as an experiment at work and I didn’t get it. It felt like I wasn’t supposed to look at the code, which is so very, very wrong.
>
> [u/SirMarkMorningStar](https://www.reddit.com/r/GithubCopilot/comments/1sc14xv/what_are_the_advantages_of_using_copilot_cli_over/oe7p5f9/)

This is the part that concerns me the most. The CLI craze was popularized by [vibe coders](https://en.wikipedia.org/wiki/Vibe_coding) using Claude Code who don't necessarily care about what the code looks like as long as it works.

That's fine for side projects. But if you're a software engineer at a job where bad code means getting paged at 3 AM, where an outage ruins your team's entire week, where you're accountable for what ships, you better be looking at the code. As [Simon Willison](https://en.wikipedia.org/wiki/Simon_Willison) puts it.

> Your job is to deliver code you have proven to work.
>
> [Simon Willison](https://simonwillison.net/2025/Dec/18/code-proven-to-work/)

An IDE with a built-in terminal gives you the best of both worlds. You can review diffs, trace through code, and still fire off CLI tasks without leaving. A pure terminal on its own doesn't give you that visibility.

<div class="meme-container">
  <div class="meme-wrapper">
    <img alt="Always has been meme about VS Code having a terminal" src="/assets/images/always-has-been-vscode-terminal.jpg"/>
  </div>
</div>

Now, to be clear, the CLI absolutely has its place. Terminal-native workflows, background tasks, fire-and-forget automation. It's great for all of that. Once I have [a plan I trust](https://code.visualstudio.com/docs/copilot/agents/planning), I give things to the CLI for it to [do the needful](https://www.google.com/search?q=do+the+needful+meaning).

But the reason any of it works well isn't because the CLI has some magic that GitHub Copilot in VS Code or the other surface areas doesn't. It's because of good [Context Engineering](https://github.blog/ai-and-ml/generative-ai/want-better-ai-outputs-try-context-engineering/).

## Context Engineering Is What Actually Matters

In GitHub Copilot's ecosystem, [Context Engineering](https://github.blog/ai-and-ml/generative-ai/want-better-ai-outputs-try-context-engineering/) comes down to a set of features that **work across every surface area**. They're not tied to one interface. They live in your repo. For a detailed comparison, see the [GitHub Copilot Customization Cheat Sheet](https://docs.github.com/en/copilot/reference/customization-cheat-sheet).

* **Custom Instructions**. Tell the AI how your team works. Scoped broad or granular with glob patterns. ([GitHub Docs](https://docs.github.com/en/copilot/how-tos/configure-custom-instructions/add-repository-instructions), [VS Code Docs](https://code.visualstudio.com/docs/copilot/customization/custom-instructions))

* **Custom Agents**. Specialized modes for specific workflows like code review, documentation, onboarding new services, or migration. ([GitHub Docs](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/coding-agent/create-custom-agents), [VS Code Docs](https://code.visualstudio.com/docs/copilot/customization/custom-agents))

* **Agent Skills**. Packaged domain knowledge the agent loads on demand. Think of it like codified tribal knowledge that AI can use whenever. ([GitHub Docs](https://docs.github.com/en/copilot/concepts/agents/about-agent-skills), [VS Code Docs](https://code.visualstudio.com/docs/copilot/customization/agent-skills))

* **Prompt Files**. Reusable, parameterized prompts for repeatable tasks. ([GitHub Docs](https://docs.github.com/en/copilot/tutorials/customization-library/prompt-files), [VS Code Docs](https://code.visualstudio.com/docs/copilot/customization/prompt-files))

* **MCP Servers**. External tool connections for databases, APIs, and internal services. I've written about MCP [here](https://segunakinyemi.com/blog/mcp-vs-rag/). ([GitHub Docs](https://docs.github.com/en/copilot/how-tos/provide-context/use-mcp/extend-copilot-chat-with-mcp), [VS Code Docs](https://code.visualstudio.com/docs/copilot/customization/mcp-servers))

* **Agent Hooks**. Automated quality gates. Linting, tests, formatting, automatically. ([GitHub Docs](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/coding-agent/use-hooks), [VS Code Docs](https://code.visualstudio.com/docs/copilot/customization/hooks))

* **Agent Plugins**. Bundle all of the above for easy distribution across teams and repos. ([GitHub Docs](https://docs.github.com/en/copilot/concepts/agents/copilot-cli/about-cli-plugins), [VS Code Docs](https://code.visualstudio.com/docs/copilot/customization/agent-plugins))

Same context, same instructions, same results. Regardless of which surface area you're in. No surprises. No "it works differently in the CLI than in the Chat." You can even [hand off sessions between them](https://code.visualstudio.com/docs/copilot/agents/overview#_hand-off-a-session-to-another-agent), starting a plan in VS Code GitHub Copilot Chat and finishing with a pull request generated by the CLI running in the background.

This is where knowledge workers who understand the problems the business needs solved are still incredibly valuable. We [don't write all the code by hand anymore](https://segunakinyemi.com/blog/coding-is-dead-software-engineering-isnt/), but there's still a lot of work for us to do for AI to not suck. AI doesn't know your domain, your standards, or your edge cases. **You do.** Write it down. [That's the job now](https://www.philschmid.de/context-engineering).

## The Bottom Line

What produces better output is [Context Engineering](https://github.blog/ai-and-ml/generative-ai/want-better-ai-outputs-try-context-engineering/). [Custom Instructions](https://docs.github.com/en/copilot/how-tos/configure-custom-instructions/add-repository-instructions), [Custom Agents](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/coding-agent/create-custom-agents), Agent Skills, [Prompt Files](https://docs.github.com/en/copilot/tutorials/customization-library/prompt-files), [MCP Servers](https://docs.github.com/en/copilot/how-tos/provide-context/use-mcp/extend-copilot-chat-with-mcp), [Agent Hooks](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/coding-agent/use-hooks), [Agent Plugins](https://docs.github.com/en/copilot/concepts/agents/copilot-cli/about-cli-plugins). These are the levers. They work across every surface area. Invest in them, and the AI gets better everywhere.

Stop optimizing where you type. [Start optimizing your context](https://github.blog/ai-and-ml/generative-ai/want-better-ai-outputs-try-context-engineering/).

## Related Reading and Resources

* [VS Code Context Engineering Guide](https://code.visualstudio.com/docs/copilot/guides/context-engineering-guide). Walkthrough of how to apply Context Engineering in VS Code with GitHub Copilot.
* [VS Code Agents Overview](https://code.visualstudio.com/docs/copilot/agents/overview#_which-agent-type-should-i-use). Practical guide on which surface area to use for which task.
* [Awesome Copilot](https://awesome-copilot.github.com/). Curated collection of Context Engineering tools, plugins, and resources for GitHub Copilot.
* [GitHub Copilot CLI for Beginners](https://github.com/github/copilot-cli-for-beginners). Great starter course if you want to learn the CLI.
* [Mastering GitHub Copilot for Paired Programming](https://github.com/microsoft/Mastering-GitHub-Copilot-for-Paired-Programming). Deeper dive into working with Copilot across workflows.
* [Accelerate App Development Using GitHub Copilot](https://learn.microsoft.com/en-us/training/paths/accelerate-app-development-using-github-copilot/). Structured Microsoft Learn path for those who want the full curriculum.
* [Agentic AI: From Acronyms to Applications](https://segunakinyemi.com/blog/agentic-ai-from-acronyms-to-applications/). My post on the broader Agentic AI landscape.
* [Coding Is Dead. Software Engineering Isn't](https://segunakinyemi.com/blog/coding-is-dead-software-engineering-isnt/). My post on how AI changes the craft of software engineering.

Have thoughts, questions, or want to share your own setup? Find me on [LinkedIn](https://www.linkedin.com/in/segunakinyemi/).
{: .notice--info}
