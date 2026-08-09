---
title: "AI Transparency"
excerpt: "How I use AI as an editor without outsourcing my writing."
layout: single
toc: true
toc_icon: "robot"
toc_sticky: true
author_profile: true
permalink: /ai-transparency/
---

<script src="/assets/js/dynamic-link-targeting.js"></script>

AI's impact on society is enormous, particularly on writing, so I feel the need to have this standing page on my website, as inspired by [Armin Ronacher's AI Transparency Statement](https://lucumr.pocoo.org/ai-transparency/).

Everything written on this website is me. I am the origin, the inspiration, the genesis, the [precious magna carta](https://youtu.be/h5czM9pf9Wo?si=Pn06a-seFR3fsdSD&t=66), of all the content you see here.

AI never generates my posts. It is, and forever will be, relegated to its proper place as a tool. Nothing more. A tool, to aide humanity, not replace us. A tool, like the many we've leveraged for decades, to **help us write**, not write for us. Spellcheck, Grammarly, [University Writing Coaches](https://writingcenter.wustl.edu/), [Literary Editors](https://en.wikipedia.org/wiki/Literary_editor), and now AI.

And as is the case with any great tool:

> With great power comes great responsibility.
>
> [Uncle Ben from Spider-Man](https://en.wikipedia.org/wiki/With_great_power_comes_great_responsibility)

You should never publish anything in your name that you didn't write. It's disingenuous. Asinine. A betrayal of all that is good and right. Of the human race itself. [Don't be a meat proxy](https://gruhn.me/blog/2026-08-03/).

That said, I'm no [Luddite](https://en.wikipedia.org/wiki/Luddite). I think anyone fighting for a world where we reverse time and [stop using Generative AI](https://www.reddit.com/r/antiai/) is fighting a losing battle. It's here. Like the Internet. Like social media. [Trying to ban it won't work](https://en.wikipedia.org/wiki/Streisand_effect). Instead, we must control how we use it. How we relate to it. We are each the captain of the ship that is our life. Take control. [Rule your spirit](https://www.biblegateway.com/passage/?search=Proverbs%2016%3A32&version=NKJV).

## How I Use AI

With respect to writing, I use AI the way authors have used [literary editors](https://en.wikipedia.org/wiki/Literary_editor) for centuries.

I write in plain text Markdown in [VS Code](https://en.wikipedia.org/wiki/Visual_Studio_Code). When my mind is racing, I tend to blow past spelling and grammar mistakes so I can get my ideas down before I lose them. Once a draft exists, I reread it **myself** and give it a second pass, focusing on organization and section headings while continuing to ignore grammar and spelling mistakes.

Then, and only then, after **I've written something myself and reviewed it myself**, do I let AI hop in to catch misspellings, grammar errors, repetition, unclear passages, and the like. From there, I **review every suggestion it makes** using the diff tool built into [VS Code's Chat view](https://code.visualstudio.com/docs/agents/run/chat-view), where AI suggestions aren't applied until I click either the `Keep` or `Undo` button.

Then I do another pass over my own writing, taking selected passages, writing variations, rewriting them, and prompting AI to check whether something is grammatically correct, clear, or could be worded differently. And through it all, I keep an oppressive, unrelenting, and tyrannical hand on AI through the use of a personalized [agent skill](https://code.visualstudio.com/docs/agent-customization/agent-skills), which is public. You can check out my [editor skill here](https://github.com/segunak/segunak.github.io/blob/master/.github/skills/editor/SKILL.md). I've found it to be pretty good at keeping AI in its proper place. I also have a [custom agent](https://code.visualstudio.com/docs/agent-customization/custom-agents) serving as a thin wrapper around the skill, which means I don't have to continually prompt AI to use it or hope it gets picked up automatically. You can [check out the custom agent here](https://github.com/segunak/segunak.github.io/blob/master/.github/agents/editor.md).

## You Too Can Have An Editor

Professional authors have long worked with [editors](https://en.wikipedia.org/wiki/Literary_editor), who are distinctly different from [ghostwriters](https://en.wikipedia.org/wiki/Ghostwriter). That doesn't make the final book the editor's work. The editor sees what the writer may have missed, and the writer decides what to change.

[Brandon Sanderson](https://en.wikipedia.org/wiki/Brandon_Sanderson), one of my favorite authors and a major influence on my own writing, is a great example. I've watched just about all of his [lectures on YouTube](https://www.youtube.com/@BrandSanderson/playlists). In one from [2025](https://www.youtube.com/watch?v=MEUh_y1IFZY&t=3706s), he explained that he invited [Peter Ahlstrom](https://stormlightarchive.fandom.com/wiki/Peter_Ahlstrom) into his early writing group because Peter had "a really good editorial eye".

Ahlstrom later became a professional editor, and Sanderson hired him as [Dragonsteel's](https://www.dragonsteelbooks.com/) Editorial Vice President. The dude knows Sanderson's style and voice. He knows how to help turn a raw Sanderson manuscript into the polished book the public eventually reads. Yet even with Peter in his corner, Sanderson has [said he accepts only a third of the feedback](https://www.youtube.com/watch?v=MEUh_y1IFZY&t=4034s) he receives from a [writing group](https://en.wikipedia.org/wiki/Writing_circle) he considers excellent.

That's because Brandon Sanderson is the author. The captain of the ship. The [HBIC](https://www.urbandictionary.com/define.php?term=HBIC). An editor is just another set of eyes.

It's like the revision process your English teacher should've taught you. You write a first draft, trade it with another student for comments, get feedback from your teacher, then accept or reject that feedback as you work toward a final draft. The writing remains yours.

When kept in its proper place as a **_tool_**, AI can speed up writing and editing without destroying the literary process. In a way, it has democratized editing by making the kind of feedback once largely reserved for big deal professional authors with publishers and editorial teams available to anyone. But you still have to be the author. You still have to write.

## Writing Is the Work

If you have a moment, please read this great article by [Bret Stephens](https://www.nytimes.com/by/bret-stephens) in *The New York Times*. I made you a gift link.

> [*Bret Stephens - I'm Begging You: Never Write With A.I.*](https://www.nytimes.com/2026/08/04/opinion/artificial-intelligence-ai-writing.html?unlocked_article_code=1.3VA.LFlM.iKEZ2eNnfO4m&smid=url-share)

I mostly agree with him. You really do need to write things yourself because **writing itself compels thought**.

If AI is the **origin** of the content, and all you did was prompt, then you've skipped the exercise that makes writing valuable. It's like driving instead of walking when your goal is exercise. You've lost the plot.

Where I part ways with Stephens is on editing. An editor doesn't lift the weights for you. An editor watches your form, points out where it breaks down, and helps you improve.

[Drew Breunig](https://www.dbreunig.com/), a fellow techie, offers a take I'm more closely aligned with in his article, [*Why I Write (And You Should Too!)*](https://www.dbreunig.com/2025/12/27/why-i-write.html).

> You need to do the writing. Not AI. Writing is exercise. If I brought a forklift to the gym and used it to lift weights, what would be the point?
>
> But AI is a wonderful editor...

Indeed. So long as you use it responsibly, AI is a valuable tool, not a replacement for your voice, thoughts, and ideas.

## Why I Write

I'm going to leave you with the words of a writer much greater than I am, who perfectly captures why so many of us write, whether anyone reads our work or not.

> We live in a society that likes to approach things from a utilitarian eye, and there are advantages to that... But our society treats art too utilitarianly. It doesn't look at the primary purpose of art, which is making the artist's life more enriched. It's sincerely what I believe the primary purpose is. It is to make your life better by creating something [...] They will ask you when you're going to sell your writing. They're going to ask you if you're published. And that's OK. But I want you to understand that's not why you have to write. In fact, it's probably not why you should write. Writing is good for you. Expressing yourself is good for you. Creating art is good for you.
>
> <cite>[Brandon Sanderson](https://en.wikipedia.org/wiki/Brandon_Sanderson) in [*The Philosophy of Professional Writing*](https://www.youtube.com/watch?v=MEUh_y1IFZY&t=881s), a lecture at Brigham Young University in 2025</cite>

If you're reading this, and you love to write as I do, don't let AI rob you of that. It can aide, but never replace, what makes you **you**, and the reasons why you write.

<div class="meme-container">
  <div class="meme-wrapper">
    <img src="/assets/images/obama-mic-drop-captioned.gif" alt="Obama Mic Drop"/>
  </div>
</div>
