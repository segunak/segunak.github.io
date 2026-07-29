---
title: "Agentic AI: From Acronyms to Applications"
excerpt: "Everybody's talking but nobody's making sense. Let's demystify Agentic AI, its key differences from Generative AI, and its essential terms. Learn what RAG, MCP, GANs, RLHF and more actually mean in plain English. No jargon, no hype, just practical explanations for the curious mind."
last_modified_at: 2026-07-29T11:59:59
toc: true
toc_sticky: true
toc_label: "On This Page"
header:
  teaser: /assets/images/robot-ai-banner.png
  og_image: /assets/images/robot-ai-banner.png
  overlay_image: /assets/images/dark-blue-far-right-gradient-banner.jpg
  overlay_filter: 0.5
categories:
  - blog
tags:
  - artificial-intelligence
---

<script src="/assets/js/dynamic-link-targeting.js"></script>

<style>
    /* Apply styles only on tablets and larger devices */
    @media (min-width: 768px) {
        .page__hero--overlay {
            padding: 8em 0;
        }
    }
</style>

You can skip the prologue and hop straight to the core concepts [by clicking here](#what-agentic-ai-is). This article is a companion piece to presentations delivered to [PMI Carolinas](https://pmicarolina.org/pdd-2025), the [Charlotte Women in Data Science (WiDS) Conference](https://wids.charlotte.edu/) at [UNC Charlotte](https://en.wikipedia.org/wiki/University_of_North_Carolina_at_Charlotte), the [SEO Career Summit](https://career.seo-usa.org/career-summit/), and the [SEO Tech Developer Conference](https://tech.seo-usa.org/). You can check out the [PMI Carolinas deck here](https://1drv.ms/p/c/750d396c5cadcebd/ETOAltIn6FtErV2gWQYHlfkBg0uvsKEcp0QuaYnBgGm0og?e=diVNW4), the [WiDS Charlotte deck here](https://1drv.ms/p/c/750d396c5cadcebd/IQBTr0Er7OGZSYPxsMfkgORjAQp5HuUoO7BFG4Yl_PEZX5A) the [SEO Career Summit deck here](https://1drv.ms/p/c/750d396c5cadcebd/IQBwmTDFyBOlSYkFAeQFiGGkAdYyTeO4M7Akp8HAZ3HlG_Y?e=jJ4bNe), or the [SEO TechDevCon deck here](https://1drv.ms/p/c/750d396c5cadcebd/IQBlE2SKOUcxRpnB-VjuWGfkAW0IWFjp7-B1Qc78JqxnFjw?e=zb8Xm2).
{: .notice--info}

## Some Background

I generally find LinkedIn, [when used correctly](https://www.vice.com/en/article/linkedin-used-for-dating-sexual-harassment/), to be a solid platform compared to the rest of social media. So long as you tightly control your followings (you don't [have to follow](https://www.linkedin.com/help/linkedin/answer/a524326) your Connections), you can find yourself in the midst of relatively valuable conversations about niche sectors of various industries, all of it mostly professional.

And yet, never before has LinkedIn been more of a pompous, pretentious, puffed up, hype-peddling wasteland than it is right now.

And it's all because of one thing.

<div class="meme-container">
  <div class="meme-wrapper">
    <img src="/assets/images/ai-spongebob-rainbow-meme.jpg" alt="Spongebob Rainbow Meme"/>
  </div>
</div>

I'm a software engineer at a [company you've likely heard of](https://en.wikipedia.org/wiki/Microsoft), and once upon a time, you used to be able to rely on the [technical crowd](https://news.ycombinator.com/) to eschew itself from such nonsense. To speak about how things actually work, about what's going on under the hood, to lean on the classic hallmarks of software development. Works like...

* [Donald Knuth's](https://en.wikipedia.org/wiki/Donald_Knuth) [_The Art of Computer Programming_](https://en.wikipedia.org/wiki/The_Art_of_Computer_Programming).
* [Robert C. Martin's](https://en.wikipedia.org/wiki/Robert_C._Martin) (affectionately called Uncle Bob) [_Clean Code_](https://www.oreilly.com/library/view/clean-code-a/9780136083238/).
* Industry legends [Kent Beck](https://www.linkedin.com/in/kentbeck/) and [Martin Fowler's](https://www.linkedin.com/in/martin-fowler-com) [_Refactoring_](https://refactoring.com/).
* [Andy Hunt](https://en.wikipedia.org/wiki/Andy_Hunt_(author)) and [Dave Thomas's](https://en.wikipedia.org/wiki/Dave_Thomas_(programmer)) [_The Pragmatic Programmer_](https://en.wikipedia.org/wiki/The_Pragmatic_Programmer).
* [_Design Patterns_](https://en.wikipedia.org/wiki/Design_Patterns) by the venerable [Gang of Four](https://www.google.com/search?q=Who+are+the+Gang+of+Four+authors+of+the+book+Design+Patterns).

...and more. No matter how many new languages or frameworks or paradigms would come out, the core fundamentals of computing and software would remain the same.

But given the risen of AI, I'm here to tell you that...

<div class="meme-container">
  <div class="meme-wrapper">
    <img src="/assets/images/undertaker-rising.gif" alt="Undertaker Rising Gif"/>
  </div>
</div>

...ALL OF THAT IS STILL TRUE!

That's right ladies and gentlemen. [Building software is still hard](https://blog.nordcraft.com/they-lied-to-you-building-software-is-really-hard). LLMs [can't do it totally devoid of human involvement](https://zed.dev/blog/why-llms-cant-build-software).

The [_do more with less_](https://www.google.com/search?q=Do+more+with+less+meaning+and+who+coined+the+phrase) CEOs, since the emergence of Generative AI in 2022, have finally..._hopefully_...learned their lesson. The rise of AI doesn't mean you can axe your entire IT division, as [Klarna](https://futurism.com/klarna-ai-automation-engineers) had to learn the hard way.

In fact, with the rise of Agentic AI, you need your [IT division to upskill](https://www.latent.space/p/ai-engineer).

Don't just take my word for it. Both [McKinsey](https://www.mckinsey.com/capabilities/quantumblack/our-insights/seizing-the-agentic-ai-advantage) and [Bain](https://www.bain.com/insights/building-the-foundation-for-agentic-ai-technology-report-2025/), whose consulting [_wisdom_](https://en.wikipedia.org/wiki/When_McKinsey_Comes_to_Town) 🙄 has shaped the Fortune 500 for decades, are running around telling CEOs the same thing.

You can't just spin up an Agentic AI solution from [Microsoft](https://adoption.microsoft.com/en-us/ai-agents/), [Google](https://cloud.google.com/products/agent-builder), or [Amazon](https://aws.amazon.com/bedrock/agents/) and expect it to work magic out of the box. Despite what their marketing teams might suggest, there's significant complexity under the hood that needs to be understood and properly configured.

## The Show Goes On

Agentic AI's ascension, which [misinformed plebeians](https://futurism.com/first-ai-software-engineer-devin-bungling-tasks) have taken to mean "it's over for software developers", has only increased the need for technical individuals to piece together multi-modal, multi-agent, distributed, scalable, cost-efficient, low-latency, federated systems that can do more than just be a chatbot.

And so, I present to you a meme from this [iconic scene in The Wolf of Wall Street](https://www.youtube.com/watch?v=g07Xxr20L9s). One that perfectly captures the cathartic declaration of defiance that we, the technical workforce worldwide, have been needing since 2022.

That fateful year when everyone and their mama who knows nothing about software development decided our entire industry would be gone "any day now" because they [vibe coded](https://en.wikipedia.org/wiki/Vibe_coding) a to-do app in 30 seconds.

For each and every one of us, I say to you...

<div class="meme-container">
  <div class="meme-wrapper">
    <img src="/assets/images/wolf-of-wall-street-the-show-goes-on.gif" alt="The Show Goes On Wolf of Wall Street"/>
  </div>
</div>

...and, like Leo's character in that same scene after [finishing his speech](https://www.youtube.com/watch?v=g07Xxr20L9s), I am, at the present moment, feeling like...

<div class="meme-container">
  <div class="meme-wrapper">
    <img src="/assets/images/leo-crazy-face-wolf-of-wall-street.gif" alt="Leo Crazy Face Wolf of Wall Street"/>
  </div>
</div>

But all this raises the question: what is Agentic AI? Like...what is it really?

## The Rise of Agentic AI (And Why Everyone's Confused)

Agentic AI is being pushed so hard by the LinkedIn clout-chasing crowd that you'd think they're all decades deep into understanding it.

But alas, such is not the case.

I can tell you confidently that even among developers, there isn't uniform understanding of precisely what is meant by Agentic AI.

The terminology surrounding it is confusing. The lines between it and Generative AI chatbots like ChatGPT are blurry. The exact difference between something being Agentic and traditional automation we've had forever isn't abundantly clear.

Meanwhile, the business folks are under immense pressure to sell Agentic AI as the promise of AI finally made real. Anything to justify the [absolutely insane capital expenditures](https://www.theguardian.com/technology/2025/aug/02/big-tech-ai-spending) of building out data centers and buying up GPUs.

They're talking ad nauseam about Agentic AI while themselves not really understanding what it is. And honestly, I don't blame them. They've got bosses pushing them to "sell, sell, sell!" and thus must hit the road to push tech that most developers don't fully understand how to build with yet.

And so, I write to inform. Let's move from confusion to clarity together.

## What Agentic AI Is

**Agentic AI** is AI that can make decisions and take actions independently with minimal human oversight.

It's given a mission, not a conversation. Once you set the goals and guardrails, it plans, decides, and acts autonomously.

Sounds simple enough, right? Not quite.

A [viral Twitter thread](https://x.com/simonw/status/1843290729260703801) asked the tech community to crowdsource a definition of "agent" that could fit in a tweet. Engineers, researchers, developers all chimed in. No consensus emerged.

The [Hacker News crowd is similarly struggling](https://news.ycombinator.com/item?id=43560849) to pin down exactly what an "agent" is. There are [litmus tests being proposed](https://www.tines.com/blog/a-litmus-test-for-ai-agents/) and debates raging. But one authoritative voice has emerged above the noise.

[Anthropic](https://www.anthropic.com/engineering/building-effective-agents), the company founded by former OpenAI employees, has become such a force that [Microsoft told OpenAI "we're not exclusive anymore" and welcomed their Claude models into Copilot](https://www.cnbc.com/2025/09/24/microsoft-adds-anthropic-model-to-microsoft-365-copilot.html). When they speak about AI, people listen.

Here's how Anthropic defines an Agent:

> Workflows are systems where LLMs and tools are orchestrated through predefined code paths.
>
> Agents, on the other hand, are systems where LLMs dynamically direct their own processes and tool usage, maintaining control over how they accomplish tasks.
>
> [Anthropic - Building Effective Agents](https://www.anthropic.com/engineering/building-effective-agents)

Anthropic later distilled it even further:

> We've gravitated towards a simple definition for agents: LLM's autonomously using tools in a loop.
>
> [Anthropic - Effective Context Engineering for AI Agents](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents)

And OpenAI, the company that started this whole wave, frames it around three pillars:

> An AI system that has instructions (what it should do), guardrails (what it should not do), and access to tools (what it can do) to take action on the user's behalf.
>
> [OpenAI - Building Agents](https://developers.openai.com/tracks/building-agents)

Those three definitions together paint a clear picture. An agent is an LLM that has tools, follows instructions, respects guardrails, and acts autonomously in a loop to get things done.

Generative AI is reactive. It's prompt and stop. You ask, it answers, it's over.

Agentic AI is proactive. It's plan and act. You give it objectives, and it figures out how to achieve them, taking multiple steps across different systems if needed.

**Aside:** Generative AI and Agentic AI are not competing concepts. They're layers. An AI agent IS a generative AI model (like GPT) that becomes agentic when you give it tools and autonomy. The generative model does the thinking. The agentic layer gives it the ability to act. Saying "Generative" for chatbots and "Agentic" for autonomous systems is how the [industry talks about it](https://www.ibm.com/think/topics/agentic-ai-vs-generative-ai), but under the hood, agentic systems are built on top of generative ones.
{: .notice--info}

These definitions aren't perfect, and I'm sure someone somewhere is itching to hit me with a "[well ackchyually](https://knowyourmeme.com/memes/ackchyually-actually-guy)", but I think they're sufficient to understand the gist of what's going on.

## What Agentic AI Isn't

Now, given the sheer amount of confusion still out there, let's be crystal clear about what isn't Agentic AI. Sometimes figuring out what something isn't helps you understand what it is.

* A [chatbot](https://www.google.com/search?q=what+is+a+chatbot) is not an Agent.
* An [automated script](https://www.google.com/search?q=what+is+an+automated+script) is not an Agent.
* A [scheduled email](https://www.google.com/search?q=scheduled+email+automation) is not an Agent.
* A [Zapier workflow](https://zapier.com/) is not an Agent.
* A [Power Automate flow](https://powerautomate.microsoft.com/) is not an Agent.
* A [cron job](https://en.wikipedia.org/wiki/Cron) is not an Agent.
* A [GitHub Actions](https://github.com/features/actions) workflow is not an Agent.
* An [Excel macro](https://www.google.com/search?q=what+is+an+excel+macro) is definitely not an Agent.

And for good measure, [College Park is not Atlanta](https://www.google.com/search?q=College+Park+is+not+Atlanta+Omeretta). [Sorry, not sorry](https://www.youtube.com/watch?v=6IvchaA0B3Y).

<div class="meme-container">
  <div class="meme-wrapper">
    <img src="/assets/images/omeretta-not-atlanta.jpg" alt="Omeretta Not Atlanta"/>
  </div>
</div>

## The Power and the Peril

All those things I listed follow predetermined rules. They don't reason, they don't adapt, they don't make judgment calls. They're automation, not autonomy.

An Agent, true Agentic AI, can look at a situation, understand the context, make decisions based on goals you've set, and take actions. Sometimes actions _you didn't explicitly program it to take_, but that make sense given its mission.

If you've read this far and had a moment of "wait, if that's what Agentic AI is, isn't that kind of dangerous? Aren't you guys letting the system go off and connect to things and do stuff and control things when we know AI itself isn't sentient so it's not like it really knows what it's doing?"

Yes. Yes, you are right, and I applaud you for thinking that way. We can be friends.

Agentic AI is powerful, but also incredibly dangerous if you don't set things up right. You should read these articles.

* [Anthropic - Agentic Misalignment: How LLMs Could be Insider Threats](https://www.anthropic.com/research/agentic-misalignment)
* [MIT Technology Review - Why Handing Over Total Control to Agents Would Be a Huge Mistake](https://www.technologyreview.com/2025/03/24/1113647/why-handing-over-total-control-to-ai-agents-would-be-a-huge-mistake/)
* [MIT Technology Review - Cyberattacks by AI Agents are Coming](https://www.technologyreview.com/2025/04/04/1114228/cyberattacks-by-ai-agents-are-coming/)

And to drive home my point, [Microsoft is out here encouraging people to try out "vibe working" using Agent modes in their various products](https://www.microsoft.com/en-us/microsoft-365/blog/2025/09/29/vibe-working-introducing-agent-mode-and-office-agent-in-microsoft-365-copilot/), like that isn't the exact thing those aforementioned articles are talking about being a bad idea. There is no "vibe working". Don't do that. Don't be a "vibe worker", that's the first step to being an "unemployed worker", like what are you doing fam.

## Key Acronyms Explained

We've covered what Agentic AI is and isn't. Now let's talk about some of the acronyms and concepts you'll encounter when building or working with these systems.

* **[GPT (Generative Pre-trained Transformer)](https://en.wikipedia.org/wiki/Generative_pre-trained_transformer):** The AI model that started the present AI revolution. Creates new text by predicting what comes next using patterns learned from data. That "T" stands for Transformer, [invented by Google in 2017](https://arxiv.org/abs/1706.03762) in the iconic paper "Attention Is All You Need."

* **[Context (not an acronym, but crucial)](https://en.wikipedia.org/wiki/Context):** The surrounding information that gives meaning to what's being discussed. AI uses context from conversation history, relevant data, and the current prompt to understand what's really meant, not just the literal words. A **context window** is how much info the AI can remember at once, its "short-term memory." Larger windows mean better understanding of long conversations and documents.

* **[MCP (Model Context Protocol)](https://en.wikipedia.org/wiki/Model_Context_Protocol):** A standard way for AI to connect to different tools and data sources. Think of it as USB-C for AI. One connector for everything. [Anthropic created it](https://www.anthropic.com/news/model-context-protocol) and everyone supports it now. It's the standard.

* **[RLHF (Reinforcement Learning from Human Feedback)](https://en.wikipedia.org/wiki/Reinforcement_learning_from_human_feedback):** How ChatGPT got so good. Humans rate AI outputs, and the AI learns from that feedback to be more helpful and less harmful. Invented by [Paul Christiano](https://en.wikipedia.org/wiki/Paul_Christiano) while he was at OpenAI.

* **[GANs (Generative Adversarial Networks)](https://en.wikipedia.org/wiki/Generative_adversarial_network):** Two AIs compete. One creates fake content, the other tries to detect it. Through this competition, both get better. Invented by [Ian Goodfellow in 2014](https://en.wikipedia.org/wiki/Ian_Goodfellow).

* **[NLP (Natural Language Processing)](https://en.wikipedia.org/wiki/Natural_language_processing):** The field that lets computers understand human language, whether written, spoken, or even emojis and slang. Been around since the 1950s.

* **[LLM (Large Language Model)](https://en.wikipedia.org/wiki/Large_language_model):** The foundation of modern AI. Trained on massive text collections with billions of parameters to predict what comes next.

* **[Tools (not an acronym, but essential for agents)](https://platform.openai.com/docs/guides/function-calling):** A tool is a function an agent can call to interact with the outside world. Checking the weather, querying a database, posting to a website, looking up who's in space. These are all tools. Without tools, an LLM is just a chatbot answering from its training data. With tools, it becomes an agent that can take action. When MCP talks about connecting AI to "tools and data sources," this is what it means.

* **[RAG (Retrieval-Augmented Generation)](https://en.wikipedia.org/wiki/Retrieval-augmented_generation):** A technique where the AI retrieves relevant information from external sources (documents, databases, websites) before generating a response. Instead of relying solely on what it learned during training, the model pulls in fresh, specific data to ground its answers. This is how you get an AI that can answer questions about your company's internal docs without retraining the whole model.

## Agentic AI Platforms

Listen. Listen to me.

The Agentic AI world is moving absurdly fast. By the time this post goes live, something here might already feel dated (I'm exaggerating…barely).

What follows are the platforms that currently matter in **enterprise** scenarios. Think end-to-end offerings, not just frameworks. Honorable mentions to [CrewAI](https://www.crewai.com/), [LangGraph](https://www.langchain.com/langgraph), [LlamaIndex](https://www.llamaindex.ai/), and [Atomic Agents](https://github.com/BrainBlend-AI/atomic-agents).

* **[LangChain](https://www.langchain.com/)**: Open-source, industry standard for agent orchestration.
* **[Azure AI Foundry](https://azure.microsoft.com/en-us/products/ai-studio)**: Pro-code platform for enterprise agents with built-in governance.
* **[Microsoft Copilot Studio](https://www.microsoft.com/en-us/microsoft-copilot/microsoft-copilot-studio)**: Low-code/no-code visual builder for business users as well as developers. Making building agents a click, drag, and drop experience.
* **[Amazon Bedrock Agents](https://aws.amazon.com/bedrock/agents/)**: Pro-code API-based agent development. Developers write code to connect AWS services and Lambda functions.
* **[Google Vertex AI Agent Builder](https://cloud.google.com/products/agent-builder)**: Low-code platform using Google's Gemini models. Visual interface for building agents with RAG and tool calling.
* **[Salesforce Agentforce](https://www.salesforce.com/agentforce/)**: Low-code agent builder for CRM workflows. Click-based configuration with pre-built templates for sales and service.

If you're interested in the skills needed to build Agentic AI systems, check out my [AI Engineering guide](https://segunakinyemi.com/blog/seo-techdevcon-2025/#what-to-learn). AI Engineering is the emerging field for those who build this stuff. That's what [they're calling the industry](https://www.latent.space/p/ai-engineer). You could call it Software Development, because that's what it is, but I guess AI Engineering sounds cooler.

## Try It Yourself

I built a hands-on workshop that lets you interact with a real AI agent, toggle its tools on and off, and then build your own custom agent with personalized instructions. No coding required. It runs entirely in your browser through [Visual Studio Code for Education](https://vscodeedu.com/).

The agent has access to live tools that call real APIs: weather data, who's currently in space, recent earthquakes, NASA's Astronomy Picture of the Day, Charlotte Third Places from [charlottethirdplaces.com](https://charlottethirdplaces.com) (a project of mine cataloging cafes, libraries, parks, and hangout spots in the Charlotte area), Charlotte cinnamon roll rankings (from yours truly), anime recommendations, and more. You start with no tools to see the agent's limitations, then progressively add them to watch its capabilities grow. By the end, you're configuring your own agent from scratch.

Built with the [Vercel AI SDK](https://ai-sdk.dev/), powered by [Microsoft Foundry](https://learn.microsoft.com/azure/ai-foundry/what-is-foundry) on [Azure](https://azure.microsoft.com/). The workshop was first delivered at the [Charlotte Women in Data Science (WiDS) Conference](https://wids.charlotte.edu/) in March 2026.

**Try it at [aka.ms/aaw](https://aka.ms/aaw)**. All you need is a Microsoft or Google account. If you're prompted for a workshop key, [reach out to me on LinkedIn](https://www.linkedin.com/in/segunakinyemi/) and I'll get you sorted.

## Essential Reading

Here's some good stuff. These articles will get you up to speed on Agentic AI, and really AI in general, from the fundamentals to the cautionary tales to even more terminology worth knowing.

* [Latent Space - The Rise of the AI Engineer](https://www.latent.space/p/ai-engineer)
* [Conrad Irwin - Why LLMs Can't Really Build Software](https://zed.dev/blog/why-llms-cant-build-software)
* [MIT Technology Review - Why Handing Over Total Control to AI Agents Would Be a Huge Mistake](https://www.technologyreview.com/2025/03/24/1113647/why-handing-over-total-control-to-ai-agents-would-be-a-huge-mistake/)
* [MIT Technology Review - Cyberattacks by AI Agents are Coming](https://www.technologyreview.com/2025/04/04/1114228/cyberattacks-by-ai-agents-are-coming/)
* [Anthropic - Agentic Misalignment](https://www.anthropic.com/research/agentic-misalignment)
* [Cerbos - The Productivity Paradox of AI Coding Assistants](https://www.cerbos.dev/blog/productivity-paradox-of-ai-coding-assistants)
* [ShiftMag - The Illusion of Vibe Coding](https://shiftmag.dev/the-illusion-of-vibe-coding-5297/)
* [Microsoft - 10 AI Terms Everyone Should Know](https://news.microsoft.com/10-ai-terms/)
* [Microsoft - 10 More AI Terms Everyone Should Know](https://news.microsoft.com/source/features/ai/10-more-ai-terms-everyone-should-know/)
* [IBM - Agentic AI vs Generative AI](https://www.ibm.com/think/topics/agentic-ai-vs-generative-ai)
* [Forbes - Generative AI vs Agentic AI: The Key Differences](https://www.forbes.com/sites/bernardmarr/2025/02/03/generative-ai-vs-agentic-ai-the-key-differences-everyone-needs-to-know/)
* [Agentic AI: From Acronyms to Applications - Hands-On Workshop](https://aka.ms/aaw)

## A Final Note

There are very few seasoned experts in Agentic AI right now. We're all figuring it out together. The technology is moving fast, but the fundamentals remain the same. You need humans who understand systems, can set boundaries, and know when the AI is hallucinating nonsense.

Agentic AI is powerful. It's also dangerous if you don't know what you're doing. But if you take the time to understand it, to learn the tools and concepts, you'll be part of building the future instead of being replaced by it.

The show goes on, my friends. [The show goes on](https://www.youtube.com/watch?v=Rmp6zIr5y4U).
