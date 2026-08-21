---
title: "GitHub Copilot's Agent Mode Is Rather Impressive, But the Real Question Is, Are Software Developers Cooked?"
excerpt: "One thing is for sure, if we as developers don't adapt, we're more than cooked, we're royally fried."
toc: true
toc_sticky: true
toc_label: "On This Page"
toc_icon: "robot"
last_modified_at: 2026-08-20T20:56:16
header:
  teaser: /assets/images/misc/be-water.jpeg
  og_image: /assets/images/misc/be-water.jpeg
  overlay_image: /assets/images/misc/be-water.jpeg
  overlay_filter: 0.6
categories:
  - blog
tags:
  - tech
  - artificial-intelligence
---

<style>
    .notice--primary {
        font-style: normal !important;
    }

    .gifformat {
        width: 100%;
    }

    .page__hero--overlay {
        background-position: center bottom;
    }

    /* Apply styles only on tablets and larger devices */
    @media (min-width: 768px) {
        .page__hero--overlay {
            padding: 10em 0;
        }

        .gifformat {
            width: 70%;
        }
    }
</style>


**Author's Note:** While researching this article, I spent a fair amount of time using GitHub Copilot (and its Agent Mode). I discovered that some privacy settings, specifically how they use your code and data, are on by default from the moment you [interact with Copilot](https://www.reddit.com/r/github/comments/1hhrntv/comment/m388n38/?utm_source=share&utm_medium=web3x&utm_name=web3xcss&utm_term=1&utm_content=share_button). If you have a GitHub account, I **strongly suggest** heading to the [Copilot page](https://github.com/settings/copilot) and double-checking your privacy settings. Maybe disable **"Allow GitHub to use my data for product improvements"** and **"Allow GitHub to use my data for AI model training"**. GitHub is [owned by Microsoft](https://en.wikipedia.org/wiki/GitHub#Acquisition_by_Microsoft), who have a [significant stake in OpenAI](https://finance.yahoo.com/news/microsoft-openai-haggling-over-tech-170816471.html), the folks behind ChatGPT, so they'll be just fine without your data. Privacy first!
{: .notice--primary}

## A New Era

Thomas Dohmke, the CEO of [GitHub](https://en.wikipedia.org/wiki/GitHub), recently wrote an [article](https://github.blog/news-insights/product-news/github-copilot-the-agent-awakens) about a new feature of their AI-assisted programming tool, [GitHub Copilot](https://github.com/features/copilot), called _Agent Mode_.

After reading through it, my initial reaction, out of deep philosophical concern for the future of software development, was…

<div class="meme-container">
  <div class="meme-wrapper">
    <img src="/assets/gifs/concern-oscar-office.gif" />
  </div>
</div>

Which, with time and reflection, transitioned into feelings more aptly conveyed by…

<div class="meme-container">
  <div class="meme-wrapper">
    <img src="/assets/gifs/alonzo-mourning.gif" />
  </div>
</div>

In short, I'm concerned, but also optimistic. And at the very least, I'm here to help others understand what's happening in the industry responsible for every app, website, game, operating system, chatbot, and computer-based tool you've ever used.

I'm a developer at a company you've [definitely heard of](https://en.wikipedia.org/wiki/Microsoft), which also happens to own GitHub, so my day-to-day is packed with the latest and greatest in software engineering. And let me tell you, AI-assisted programming is being **pushed hard**. However, based on my experience, developer reactions have been mixed at best. Some feel like the tech just isn't there yet. They spend more time wrestling with AI to get the right output than they would've just doing the work themselves. Others are locked in. They've figured out how to structure their prompts, how to feed the right context, how to work with AI instead of against it. And because of that, they're legitimately more productive than ever before.

I'm firmly in the latter camp. I'm not going to sit around whining about how AI will "never be good enough", or dismissing it because "it couldn't solve this one super-specific problem I had". And I'm definitely not clinging to the tired take that "real devs would never use it". Who would've thought we'd see [luddites](https://en.wikipedia.org/wiki/Luddite) among tech workers? What wonderful irony. I certainly don't have the luxury of joining them. The tides are shifting, and I shift with them. As the great [Bruce Lee](https://en.wikipedia.org/wiki/Bruce_Lee) once said: _Be water, my friend_.

With that in mind, the article that sparked this one is linked below. I highly recommend you read it. The rest of this post is my response.

> **Read More:** [GitHub Copilot: The Agent Awakens](https://github.blog/news-insights/product-news/github-copilot-the-agent-awakens/)
{: .notice--primary}

## Why Is It Called Copilot?

Let's start with some background on why GitHub named their AI-assisted programming tool _Copilot_, not to be confused with their parent company Microsoft's own product of the same name.

> The name reflects our belief that artificial intelligence (AI) isn't replacing the developer. Instead, it's always on their side. And like any good first officer, Copilot can also fly by itself: for example, when providing pull request feedback, autofixing security vulnerabilities, or brainstorming on how to implement an issue.
>
> [Thomas Dohmke - GitHub CEO](https://github.blog/news-insights/product-news/github-copilot-the-agent-awakens/#:~:text=The%20name%20reflects,implement%20an%20issue.)

So there you have it. It's called _Copilot_ because GitHub, the world's leading software development platform, believes the future of programming isn't about replacing developers with AI but enhancing them.

Now, are there reasons to be skeptical? Absolutely, especially when you consider what _Agent Mode_ is capable of (more on that later). But I've chosen to take an optimistic view of what life as a software developer looks like with AI-powered tools. I've written about a related concept called Natural Language Programming, which is making the field more accessible than ever. If that interests you, check out the article below.

> **Read More:** [Natural Language Programming Is Lowering Software Development's Barrier to Entry](https://segunakinyemi.com/blog/natural-language-programming/)
{: .notice--primary}

But for now, let's dive deeper into what GitHub Copilot's _Agent Mode_ is all about.

## Why Is It Called Agent Mode?

If you're wondering why GitHub calls this enhanced version of Copilot _Agent Mode_, the answer lies below.

> ⁠⁠GitHub Copilot's new agent mode is capable of iterating on its own code, recognizing errors, and fixing them automatically. It can suggest terminal commands and ask you to execute them. It also analyzes run-time errors with self-healing capabilities.⁠ In agent mode, Copilot will iterate on not just its own output, but the result of that output. And it will iterate until it has completed all the subtasks required to complete your prompt. Instead of performing just the task you requested, Copilot now has the ability to infer additional tasks that were not specified, but are also necessary for the primary request to work. Even better, it can catch its own errors, freeing you up from having to copy/paste from the terminal back into chat.
>
> [Thomas Dohmke - GitHub CEO](https://github.blog/news-insights/product-news/github-copilot-the-agent-awakens/#:~:text=GitHub%20Copilot%E2%80%99s%20new,back%20into%20chat.)

So yeah, this goes way beyond a simple prompt-response chatbot. It directly addresses one of the biggest complaints I hear from fellow devs about AI tools today. Namely, that they can generate code, but don't help much with the actual workflow of software development. The tedious, time-consuming tasks, deployment, debugging, configuration, local environment setup, unit testing, system design, refactoring, networking, and all the other overhead that separates real-world development from LeetCode-style exercises. _Agent Mode_ is trying to step in and alleviate the burden of that work, freeing developers to focus on the bigger picture.

And GitHub's ambitions go even further. Instead of just typing instructions, they want developers speaking them as well.

> Using your voice is a natural experience while using Copilot Edits. Just talking to Copilot makes the back and forth smooth and conversational. It almost feels like interacting with a colleague with area expertise, using the same kind of iterative flow that you would use in real-life pair programming.
>
> [Thomas Dohmke - GitHub CEO](https://github.blog/news-insights/product-news/github-copilot-the-agent-awakens/#:~:text=Using%20your%20voice,life%20pair%20programming.)

"_Almost feels like interacting with a colleague_", yeah, okay, but what happened to my actual colleague? Are they still needed? That's where the real job concerns come in. If one developer with _Agent Mode_ is as productive as what used to be a three or four person team, well… we all know how corporations think. The question isn't just whether it feels like working with a colleague. It's whether it's one step closer to _replacing one_.

If your reaction to all this as a developer is...

<div class="meme-container">
  <div class="meme-wrapper">
    <img src="/assets/gifs/im-in-danger.gif" />
  </div>
</div>

I feel you. The idea of an AI suggesting terminal commands, commands that could theoretically delete files, modify system configurations, or otherwise wreck your day, is enough to make even the most seasoned dev hesitate. The margin for error here isn't just "Oops, the code doesn't compile". It's "Oops, I just [rm -rf'd](https://askubuntu.com/questions/670648/what-does-rm-rf-do) my project into the shadow realm". And now, with voice mode, you don't even have to type out your own destruction. You can just say it. On one hand, hands-free coding is the stuff of sci-fi dreams. On the other, it's one bad transcription away from "I said _deploy_, not _destroy_!".

Now in fairness, GitHub isn't handing full control over to AI. _Yet_. _Agent Mode_ still asks for confirmation before running commands, and ideally, it's surfacing useful suggestions, not catastrophic ones. But let's be real. AI stepping beyond simple code suggestions and into system-level operations is a shift worth watching. Anyone remotely familiar with sci-fi knows how quickly this could go sideways.

Regardless, this is a turning point for AI-assisted development. How far it goes depends not just on the tech, but on how comfortable developers are with having AI function less like a tool and more like a _colleague_, or perhaps, a **replacement** for one.

## So How Good Is It?

If you have a few minutes, watch this video.

<div class="video-container">
  <iframe src="https://www.youtube.com/embed/of--3Fq1M3w"
    title="Agent Mode and New Models in GitHub Copilot Chat, Visual Studio Code"
    loading="lazy"
    allow="clipboard-write; encrypted-media; picture-in-picture; web-share"
    referrerpolicy="strict-origin-when-cross-origin"
    allowfullscreen></iframe>
</div>

If you don't, let me sum it up: **_Agent Mode_ is insane**.

Watching that demo was like seeing hours of work done in minutes. Debugging, creating and updating tests, troubleshooting build issues, handling local environment quirks, validating changes, all automated. The developer's role shifts to defining the goal and verifying the AI's work, adjusting as needed. That said, we'll see its true daily-driver quality when it hits general availability. For now, you can try it on [VS Code Insiders](https://code.visualstudio.com/insiders/).

Still, the fact that it's already this capable in preview says a lot. If you show that video to a developer and they hit you with  "_lol, it still sucks, it'll never be good enough_", please don't take career advice from that person. They can't see the forest for the trees. GitHub is improving it every day, and it's only going to get better from here. Seriously better, if you believe GitHub's vision for what they're dubbing _Project [Padawan](https://www.google.com/search?q=What+is+a+padawan)_.

> Project Padawan ships later this year, it will allow you to directly assign issues to GitHub Copilot, using any of the GitHub clients, and have it produce fully tested pull requests. Once a task is finished, Copilot will assign human reviewers to the PR, and work to resolve feedback they add. In a sense, it will be like onboarding Copilot as a contributor to every repository on GitHub.
>
> [Thomas Dohmke - GitHub CEO](https://github.blog/news-insights/product-news/github-copilot-the-agent-awakens/#:~:text=We%E2%80%99re%20excited%20to,repository%20on%20GitHub.)

So, like…this thing is just straight-up a developer on your team now? You assign it tasks, it does _all the things_, and you just loop back for a PR review? That's wild. Seriously. Let me emphasize again, any developer who reads that [article](https://github.blog/news-insights/product-news/github-copilot-the-agent-awakens), watches the [demo](https://www.youtube.com/watch?v=of--3Fq1M3w), and says, "_Eh, not a big deal_," is in denial. This is one of the rare times where the overused word _innovation_ actually fits.

## So Are We Cooked?

If you're a software developer, or in a related code-heavy position, a reaction like so to GitHub Copilot _Agent Mode_ would be understandable.

<div class="meme-container">
  <div class="meme-wrapper">
    <img src="/assets/gifs/screwed-the-office.gif" />
  </div>
</div>

Now, instead of panicking, let's evaluate an analogy inspired by the name Copilot. Think about the history of flying. Pilots used to do a lot manually. Then computers came along, and things got easier. We've now reached a point where modern pilots spend most of a flight on autopilot, with the computer doing the bulk of the flying. The human pilots are largely relegated to oversight, takeoff, landing, and stepping in when things go wrong. But here's the key: pilots still have to be experts. They know their aircraft inside and out, every instrument, every reading, every turbulence pattern, and exactly how to react in an emergency. The computer handles the grunt work, the routine, predictable stuff, but when creativity born of expertise is needed, we still trust human pilots to take the controls. Like Denzel Washington in [_Flight_](https://en.wikipedia.org/wiki/Flight_(2012_film)) (great film, by the way).

No analogy is perfect, but the point stands: software development isn't disappearing. Developers will still be around, but those who fail to adapt might be left behind. Early programmers wrestled with hardware intricacies, while today's high-level languages (and _some_ [low-code tools](https://www.google.com/search?q=what+are+low+code+tools&oq=what+are+low+code+tools)) have made development more accessible and efficient. AI-assisted programming is simply the next step.

Now, as someone who genuinely loves coding, I get why this might feel like an affront to the craft. Many of us got into this field for the "love of the game". Coding for the sake of it, for the sheer joy of crafting something. I respect that sentiment, I feel it myself, but at the end of the day, that's what it is, sentiment. The business world isn't built on nostalgia. It runs on logic. Efficiency. Productivity. Speed. Growth. Relentless ambition. [Ruthless capitalism](https://en.wikipedia.org/wiki/Embrace,_extend,_and_extinguish). No company will pass up a tool that makes developers faster and more effective.

So, yes, developers will have to adapt. Some jobs will almost certainly be lost, especially among those who refuse AI-assisted development. When one developer using AI can do the work of several, fewer will be needed. That sucks, but the best way to stay ahead is to master these tools, be the expert guiding AI rather than competing with it. In an [_ostensibly_](https://www.google.com/search?q=ostensibly+definition) over-saturated field, this shift could actually bring back scarcity and make AI-savvy developers more valuable. Maybe I'm just being optimistic, but learning how to use this stuff is the smartest way to thrive in our new reality.

We're not completely cooked, but plenty of us will be if we refuse to evolve.

## A New Hope

If you're a software developer, early in your career, a student, or just trying to figure out where you fit into all of this, here's my final point.

You can complain, meme, fearmonger, and be cynical all you want. Or, as [Sandor Clegane](https://gameofthrones.fandom.com/wiki/Sandor_Clegane) would put it, you can [whinge](https://www.google.com/search?q=whinge+definition). That's your right. But if you love building things with computers and want a future in the industry, then you need to understand how GitHub, and by extension, Microsoft, is using AI to develop software. Not just chatbots, not just consumer gimmicks, but real software development powered by AI. The [shrewd](https://www.biblegateway.com/passage/?search=Matthew%2010%3A16&version=NIV) move is to align yourself with the [skills](https://learn.microsoft.com/en-us/ai/?tabs=developer) that will let you use these tools to build the future.

Or, put more simply: [Adapt or die](https://www.google.com/search?q=what+does+adapt+or+die+mean).

## Additional Reading

If you're interested in where the future is headed with AI, particularly regarding software development and computer science education, these are excellent reads.

> **Nisha Talagala (Forbes):** [Is Coding Education As We Know It Dead?](https://www.forbes.com/sites/nishatalagala/2023/06/01/is-coding-educationas-we-know-itdead-how-large-language-models-are-changing-programmers/)
>
This piece by [Nisha Talagala](https://www.linkedin.com/in/nisha-talagala-6a6b20) is my go-to when I run into college students freaking out about whether there'll be any jobs left in tech by the time they graduate, or if their computer science degree is useless. It's also a great read for professors and educators thinking, "_So how do we teach coding in an AI-driven world?_". The traditional ways of teaching computer science are no longer sufficient, Talagala breaks down why you should care.
{: .notice--primary}

> **Thomas Dohmke (GitHub):** [Developer Odyssey](https://ashtom.github.io/developer-odyssey)
>
If you think I'm too optimistic about AI's impact on software development, you'll find [Thomas Dohmke](https://www.linkedin.com/in/ashtom), CEO of GitHub, downright nauseating in this article, but I still think you should read it! His post walks through the evolution of software development: from early, near-hardware languages like assembly to high-level languages such as Python and C#, then the "low-code" wave, and finally the age of AI-assisted programming. The point is tech changes constantly, and you never really reach the mythical "_I can stop learning now_" plateau. If you're freaking out about AI eliminating literally all dev jobs, reading this might actually calm you down because, spoiler, it's just another shift in how we code, not the end times.
{: .notice--primary}

> **Namanyay Goel:** [New Junior Developers Can't Actually Code](https://nmn.gl/blog/ai-and-learning)
>
Another fantastic read for computer science students, educators, or any developer in the trenches. While the previous articles focus on the future, [Namanyay Goel](https://www.linkedin.com/in/namanyayg) snaps you back to the present: people are using AI as a shortcut instead of actually learning to code. Copy, paste, done. No clue what's happening under the hood. That's how we get Matrix-level [Machines](https://matrix.fandom.com/wiki/Machines) or Terminator [Skynet](https://en.wikipedia.org/wiki/Skynet_(Terminator)). Goel offers hope though: treat AI chatbots like way better Stack Overflow. Ask follow-ups, dig into the answers, build real understanding, because you still need to know what your code does.
{: .notice--primary}

> **Segun Akinyemi (Me):** [From Padawan to Jedi Master to Whatever Yoda Was: A Curated List of AI Learning Resources](https://segunakinyemi.com/blog/ai-learning-resources/)
>
Shameless plug. I wrote an article filled with AI learning resources that bridge the gap between "_I know how to use AI chatbots_" and "_I actually understand the science and technical concepts behind this stuff_". I try to keep it updated; it's essentially my personal study stash. My hope is that it'll be a solid resource for anyone wanting to grow from surface-level AI chatter to deeper discussions grounded in how these models actually work. If you've got a minute, check it out!
{: .notice--primary}
