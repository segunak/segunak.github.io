---
title: "What Is AI Engineering?"
excerpt: "AI Engineering is a term that's demonstrated staying power in the fast moving hype-filled world of AI. Here's what it is, and what it isn't."
last_modified_at: 2026-10-27T20:02:41
toc: true
toc_sticky: true
toc_label: "On This Page"
toc_icon: "robot"
header:
  teaser: /assets/images/misc/obi-wan-visible-confusion.jpg
  og_image: /assets/images/misc/obi-wan-visible-confusion.jpg
  overlay_image: /assets/images/misc/nick-young-confusion-meme-banner.png
  overlay_filter: 0.6
categories:
  - blog
tags:
  - tech
  - artificial-intelligence
---

<style>
  /* Tablet and larger */
  @media (min-width: 768px) {
    .page__hero--overlay {
      padding: 10em 0;
    }
  }
</style>

## It's Legit

AI Engineering is a term that's demonstrated staying power in the fast moving hype-filled world of AI. Seeing as our [attention spans are collectively cooked](https://time.com/3858309/attention-spans-goldfish/) by social media these days, I won't linger. Here it is.

> **AI Engineering** is the discipline of building reliable software on top of AI models.

Credit where credit is due, this definition is inspired by [AI Engineer](https://ai.engineer/what-is-an-ai-engineer) and [Chip Huyen's *AI Engineering*](https://www.oreilly.com/library/view/ai-engineering/9781098166298/) book. I'm sure you can find other definitions online that differ, but this one is short, sweet, and easy to understand, so I'm sticking with it.

**An Aside:** To nitpick, you might think to replace _AI models_ with _[LLMs (Large Language Models)](https://en.wikipedia.org/wiki/Large_language_model)_, but that would rule out [SLMs (Small Language Models)](https://en.wikipedia.org/wiki/Small_language_model), [World Models](https://en.wikipedia.org/wiki/World_model_(artificial_intelligence)), and [Decision Models](https://www.forbes.com/sites/ronschmelzer/2026/10/12/decisions-decisions-a-guide-to-the-new-wave-of-ai-decision-models-besides-jev/), which are all rising in popularity and used to build software. So, yeah, AI models it is.
{: .notice--info}

## Isn't That Just Software Engineering?

Now if you're like me, you might be going, wait...from that definition, I mean isn't that just software engineering? Why would you need a new term for that?

Well, first let me say, I like the way you think.

I agree, what's being called AI Engineering **is** just Software Engineering. AI models are software, we take that software and make stuff with it. That's Software Engineering, or Software Development (there's no widely accepted difference between those terms, anyone telling you otherwise is being either pedantic or pretentious).

That said, the distinction provided by AI Engineering is valuable when you consider that AI models are inherently non-deterministic.

Back in the day, if we wanted to write a program to read and respond to emails, it'd go something like this.

1. Scan emails
2. Find an email from _such and such_ person with _such and such_ keywords
3. When that email is _unread_ then...
4. Grab a static email template
5. Replace placeholder values with live values from the database and current date/time
6. Reply to the email

You see that? That right there my friends is...

<div class="meme-container">
  <div class="meme-wrapper">
    <img src="/assets/images/misc/spongebob-meme-rainbow.jpg" alt="SpongeBob Rainbow Meme"/>
  </div>
</div>

Good, plain, boring, deterministic software that you could trust to do the same thing every time. And if it didn't, it was because of a logical flaw in the written instructions that you could track down and fix, sometimes with [help from an old friend](https://stackoverflow.com/questions).

**An Aside:** For the kiddos out there, we used to call those written instructions "code". Now we call them "prompts". But if prompts are now our written instructions for computers, [are they not a new form of code](https://www.commitstrip.com/en/2016/08/25/a-very-comprehensive-and-precise-spec/)? Also, if a tree falls in the forest with no one around to hear it, does it make a sound? Think about it 🤔
{: .notice--info}

But this new software? This new non-deterministic software? Totally different. Here's what that same email workflow would look like today with AI.

1. Choose your AI tool (Claude, ChatGPT, Gemini, Microsoft Copilot, GitHub Copilot, etc.)
2. Make sure it has an automations feature (most do)
3. Write a prompt, "When I get an email from _such and such_ person and I haven't read it yet, respond and just tell them something that makes sense for what they sent me"
4. Trust the AI model to understand what you meant and send good responses
5. If it sends a bad response, update the prompt from Step 3 (or switch the model to something more <s>expensive</s> powerful)

Do you see how different that is? You're **trusting** the AI model to understand your **plain language instructions** despite knowing **it doesn't actually understand you**. Not the way a human would. It's an "it". It's not alive.

It pains me to say this, but with LLMs, we've reduced human language to a math problem. Words mean something to you because **you're a different kind of AI, Authentic Intelligence**. Words mean nothing to computers.

We've taken the words in the English language, derived patterns from how often they appear next to each other, and assigned numbers to those patterns. And bam, now you have a computer that can talk as though it were one of us. That's an aggressively oversimplified explanation of how LLMs are created, so [check this out](https://www.parand.com/a-completely-non-technical-explanation-of-ai.html) for a better version.

With all this in mind, it makes sense that we decided to give a distinct name to the field of "making AI models behave consistently within other kinds of software while keeping their core benefit of inferring intent".

## The Rise of the AI Engineer

If you're thinking "oh well, since AI models can write code, it must be easy getting them to play nice with other software"...[look at Copilot](https://futurism.com/artificial-intelligence/microsoft-screwed-up-windows-11-copilot). Really. [Look at Copilot](https://finance.biggo.com/news/202608132021_Microsoft-unifies-Copilot-apps). It's not easy, **at all!**

Making AI models behave consistently for consumers is already kind of hard, but a bunch of companies have figured it out. [OpenClaw](https://openclaw.ai/), [Meta Muse](https://about.fb.com/news/2026/09/introducing-muse-personal-ai-agent/), [OpenAI Dots](https://openai.com/index/introducing-dots/), and [Claude Duet](https://claude.com/product/claude-duet) are the personal assistants that take over your device and _do life for you 😟_. But it's even harder when it's more than one person's life. Making AI models behave consistently (dare I say...deterministically?) for enterprise level use cases is **hard**. Really hard.

So much so that [Microsoft](https://apply.careers.microsoft.com/careers?query=AI+Engineer&location=United+States), [Google](https://www.google.com/about/careers/applications/jobs/results?q=%22AI+Engineer%22), [Amazon](https://www.amazon.jobs/en/search?base_query=%22AI+Engineer%22), [Meta](https://www.metacareers.com/jobsearch?q=%22AI%20Engineer%22), and other tech companies have started embracing the job title **AI Engineer**.

It was coined in [this popular 2023 article from Latent Space](https://latent.space/p/ai-engineer/), which went on to catch fire in Silicon Valley and win the [approval of some big names](https://x.com/karpathy/status/1674873002314563584). Three years later, the big corporate companies are on board. Making AI models behave consistently is worth a new field name, AI Engineering, and a new job title, AI Engineer.

LinkedIn has the data to back it up. Their [2026 Jobs On the Rise](https://www.linkedin.com/pulse/linkedin-jobs-rise-2026-25-fastest-growing-roles-us-linkedin-news-dlb1c/) report lists AI Engineers as the top role, notably distinct from AI/ML Researchers coming in at 5th.

## What AI Engineering Isn't

I'm going to try a meme reference that I suspect precious few of you will get, but here I go. We now know what AI Engineering is, so here's what it isn't.

🎶🎶🎶

* Machine Learning _is not AI Engineering_ (nope).
* Prompt Engineering _is not AI Engineering_ (nope).
* Data Science _is not AI Engineering_ (nope).
* [Vibe Coding](https://segunakinyemi.com/blog/coding-is-dead-software-engineering-isnt/#is-it-vibe-coding-or-vibe-engineering) _is definitely not AI Engineering_ (nah).

🎶🎶🎶

And for good measure, [College Park is not Atlanta](https://www.google.com/search?q=Explain+the+Omeretta+the+Great+Sorry+Not+Sorry+song+lyrics+controversy+regarding+gatekeeping+Atlanta&udm=50). [Sorry, not sorry](https://www.youtube.com/watch?v=6IvchaA0B3Y).

<div class="meme-container">
  <div class="meme-wrapper">
    <img src="/assets/images/misc/omeretta-not-atlanta.jpg" alt="Omeretta Not Atlanta"/>
  </div>
</div>

Training models from scratch is Machine Learning. The people who do that usually have PhDs and are really good at math. AI Engineers are akin to Software Engineers, and at most companies, they still have the job title Software Engineer. They were tasked with "hey, add AI to our product" at some point, and at that moment, they became an AI Engineer in everything but name.

Typing clever prompts into a chat box and hoping for the best is the now dead field of Prompt Engineering, superseded by Context Engineering.

## What's Next

The big challenge of making software with AI is unpredictable outputs. The model is only one part of the larger system that goes into making good software. If you've heard of Harness Engineering, that's a **subdomain of AI Engineering**, just like how frontend and backend development are subdomains of Software Development, not their own separate thing.

So yeah, that's AI Engineering. Here are some other popular terms that I plan to explore in future blog posts, and they're almost all just subdomains of AI Engineering.

* Context & Context Window
* Context Engineering (and the death of Prompt Engineering)
* Harness Engineering
* Loop Engineering & Ralph Loop
* Agentic Engineering
* Graph Engineering (a.k.a. Agentic Workflow Orchestration)
* Agent Skills
* Custom Agents
* Custom Instructions
* Agent Evals
* Agent Hooks
* Agent Plugins
* AI Agent (I guarantee we all don't have a shared definition of what an Agent even is)
* Agent Squad/Squads

[Subscribe to my blog](http://eepurl.com/itDfHE) if you want to stay up to date! And check out my [MCP vs RAG](https://segunakinyemi.com/blog/mcp-vs-rag/) post to learn more about some other popular terms.
