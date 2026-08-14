---
title: "Exploring Responsible Generative AI Through Music With Microsoft Copilot and Suno"
excerpt: "Discover how to use Microsoft Copilot and Suno's Generative AI to engage students in hands-on STEM learning and Responsible AI practices through an interactive music creation workshop."
last_modified_at: 2026-08-13T20:14:57
toc: true
toc_sticky: true
toc_label: "On This Page"
toc_icon: "microchip"
header:
  teaser: /assets/images/misc/ai-music.jpeg
  og_image: /assets/images/misc/music-banner.jpeg
  overlay_image: /assets/images/misc/music-banner.jpeg
  overlay_filter: 0.6
categories:
  - blog
tags:
  - stem-education
  - artificial-intelligence
---


**Heads Up:** This post starts off with an anecdote related to how I found my way into STEM. While I'd certainly appreciate you reading it, if you're feeling like '[I ain't reading all that](https://knowyourmeme.com/memes/i-aint-reading-all-that){:target="_blank"}' you can skip to the actual workshop by clicking [here](#workshop-overview).
{: .notice--warning}

## Some Background

As a software engineer, I've been fortunate to work at a company the past few years that, as long as I'm meeting my responsibilities, provides support, resources, and funding (money talks) for employees to pursue their passions through volunteerism. A passion of mine is [STEM education](https://www.google.com/search?q=STEM+Education), specifically the computer science and software engineering (which is distinct from computer science) side of it. I care deeply about making what we actually do as software engineers accessible to students. I almost missed out on what has been an incredibly fun and rewarding career because, growing up, I thought all software engineers did was math all day.

The turning point for me, the moment that opened my eyes to computer science, came during a random conversation with a friend during my first semester of college. At the time, I was a Biology major, not because I had any real passion for it, but because it was the only subject in high school where I genuinely felt inspired by my teacher (shoutout to the legend, Ms. Marsh, Redmond High School). I saw my friend coding and casually remarked, "You must really like math." He stopped to correct me, explaining that he doesn't actually do any math. The computer handles that. He just makes the things he wants to digitally. At that time, he was working on a self-hosted Minecraft server, which he later turned into a small business to fund his weekend _excursions_.

Whether by divine providence (my preferred interpretation) or dumb luck, that conversation set me on the path toward computer science and my career as a software engineer. I'm set on making sure others don't have to rely on chance to discover how cool this field can be. I want people to truly understand it, beyond the surface-level "you should learn to code" or "tech is important" messaging we hear so often today.

To that end, I started and maintain a program that brings students to my [employer's](https://en.wikipedia.org/wiki/Microsoft) local office for a day of tech-centric learning and discovery. The highlight of these visits is a 1-hour STEM workshop where I do my best to make computer science fun and accessible. The goal isn't to make them experts, only to pique their interest, and hopefully send them home with a desire to keep learning.

I've developed a handful of workshops for these events that I'll be sharing here on my blog from time to time. I'm starting off by sharing an AI-discovery focused workshop I developed for a much larger event I led (side note, event planning is exhausting) this past March, which you can read more about [here](https://www.microsoft.com/insidetrack/blog/simplifying-nonprofit-volunteering-at-microsoft-with-power-automate/?ocid=InsideTrack_Promotion_10669#:~:text=Every%20year%2C%20the,across%20the%20region.), and get a recap of [here](https://www.linkedin.com/posts/microsoft_600-students-from-28-schools-across-north-ugcPost-7196494793907048449-6Oad/).

## Workshop Summary

The goal of this workshop is to help students grasp just how massive the impact of Generative AI is, and will continue to be, by getting them involved in something fun and tangible: making AI-generated music that sounds real. Using Microsoft's flagship AI product, [Microsoft Copilot](https://copilot.microsoft.com/), with the [Suno](https://suno.com/) plugin (Suno leads the AI-music creation space), students can turn a simple prompt into a 2-minute AI-generated song, giving them a firsthand look at how powerful the right input ([prompt engineering](https://www.google.com/search?q=prompt+engineering)) can be.

Beyond just making music, this workshop emphasizes Responsible AI usage, encouraging students to think critically about AI-generated content and its ethical implications. Before diving into song creation, facilitators lead discussions and debates around AI's role in everyday scenarios (like school), helping students see how, like _most_ any tool, AI's ethical impact depends on how it's used. This approach gives them a sense of both AI's creative potential and the care required to ensure ethical usage. Since, as we all know, [with great power comes great responsibility](https://en.wikipedia.org/wiki/With_great_power_comes_great_responsibility).

## Required Materials

Here's what's needed to run this workshop.

* **Internet Access:** Required for connecting students with Microsoft Copilot and Suno AI.
* **Computing Devices:** Each student (or small group of 4-5 students) needs a smartphone, tablet, laptop, or desktop computer to access Microsoft Copilot and Suno.
* **Microsoft Accounts:** Each student or group will need a Microsoft account with access to Copilot and its plugins. This can be personal, work, school, or demo, whatever works, as long as it's got access. Facilitators should double-check this ahead of time, since work or school accounts might have limitations if admins have restricted Copilot or plugin access. Most personal accounts should be fine, but it's worth confirming. For simplicity, groups of 4-5 students can also use one facilitator's account on a shared device if needed. Follow the instructions in  [this](https://www.howtogeek.com/how-to-use-microsoft-copilot-suno-plugin/) article to verify access.
* **Projector and Audio Setup:** This is optional, but can help facilitators. Having a projector the class can see and a speaker/audio setup that all can hear makes demoing song creation easier. It also allows for students to come easily to the front and play the song they created for the class.

## Required Expertise

This workshop doesn't require deep expertise in AI but benefits from a general understanding of the technology and some facilitation skills:

* **Basic Familiarity with Generative AI:** As the facilitator, having a grasp on the fundamentals of generative AI will help you answer questions and guide students through the workshop. Understanding terms like "machine learning," "text-to-music models," and "prompt engineering" would be good as students might ask about them. Take a minute to read through [this](https://news.microsoft.com/10-ai-terms/) article and [this](https://news.microsoft.com/source/features/ai/10-more-ai-terms-everyone-should-know/) article for a breakdown of common AI terminology. Also check out my article [here](https://segunakinyemi.com/blog/ai-learning-resources/) that lists various resources for learning more about AI.
* **Prompt Engineering Skills:** Knowledge of [prompt engineering](https://platform.openai.com/docs/guides/prompt-engineering) will be valuable for helping students to do so effectively during the workshop.
* **Familiarity with Microsoft Copilot and Plugins:** It's helpful to have some experience with Microsoft Copilot before leading this workshop, especially when it comes to enabling and using the Suno plugin. In the event that you're not able to get the plugin to work, having familiarity using [Suno](https://suno.com/) directly would also be valuable. Go through [this](https://www.howtogeek.com/how-to-use-microsoft-copilot-suno-plugin/) and [this](https://help.suno.com/en/articles/2462273) article before delivering the workshop.
* **Comfort Leading Ethical Discussions:** Being prepared to lead a discussion on the ethics of AI-generated content, particularly around creativity, copyright, and Responsible AI principles, is key. These discussions can make a lasting impression on students, hopefully inspiring them to think critically about technology's impact on creative fields. Your goal is to facilitate conversation, not dogmatically bring down an answer to difficult questions from "on high." Lean into the [Socratic method](https://en.wikipedia.org/wiki/Socratic_method).

## Workshop Overview

Here's an overview of the workshop. It was first delivered to 400 students, organized into classrooms of 40, and further divided into small groups of 5-6, each paired with a facilitator for technical support and guidance. You can find a recap of the event in [this LinkedIn post](https://www.linkedin.com/posts/microsoft_600-students-from-28-schools-across-north-ugcPost-7196494793907048449-6Oad/). In addition to this overview, more detailed resources for delivering the workshop can be found in [this](#facilitation-resources) section.

1. **Introduction to Generative AI:** Begin with a simple explanation of what Generative AI is and why it's so impactful. Highlight how it creates content like music, art, and text by learning patterns from existing data. Emphasize that the goal of the workshop is, in addition to having fun, to think critically about the ethics, implications, and responsible usage of Generative AI.
2. **Responsible AI Scenarios:** Discuss real-life scenarios where AI might be used, such as for homework, group projects, or creating art. Present each scenario and ask students whether they think it's an ethical use of AI. After each scenario, facilitate a conversation, offering insights based on Responsible AI principles from sources like [Microsoft](https://www.microsoft.com/en-us/ai/principles-and-approach), [Google](https://ai.google/responsibility/principles/), and [Meta](https://ai.meta.com/responsible-ai/).
3. **Exploring AI-Generated Music:** Introduce students to AI tools like Microsoft Copilot and Suno AI, explaining how they're able to generate content, like songs, by analyzing patterns in existing works. Highlight that Suno is a leader in AI-generated music and offers a plugin that is accessible through Microsoft Copilot, making it a convenient option for music creation.
4. **Hands-On Music Creation:** Use the Suno plugin in Microsoft Copilot to generate songs with the group. If students encounter difficulties accessing Suno through Copilot, guide them directly to Suno's website as a reliable alternative. Encourage creativity and collaboration by sharing and discussing their results as a group. Demonstrate how different prompts lead to different outcomes. Use examples like.
   * Create a Jazz song about teamwork.
   * Generate a pop song about perseverance in the style of Celine Dion.
   * Create an opera song about cinnamon rolls being the best pastry of all pastries in the style of Andrea Bocelli.
5. **Creating Songs with Suno**: [This is where the fun begins](https://www.youtube.com/watch?v=KAHLwAxS7FI). Start by demonstrating how to generate a song in Microsoft Copilot using the Suno plugin. If students encounter difficulties with Copilot, guide them directly to Suno's website for song generation. Allow students to create 3-5 songs of their own, depending on time. Challenge them to get creative with their prompts, explore different genres, and consider how the details in their prompts shape the music.
   * **Prompt Engineering:** Encourage students to try prompts like "create a [genre] song about [topic]". For example, "Create an opera song about cinnamon rolls being the best pastry of all pastries in the style of Andrea Bocelli".
   * **Feedback & Interactions:** After generating songs, have students play them for their small group, discuss what they hear, and reflect on how well the AI captured their chosen theme and style.
   * **Facilitator-Led Song Creation:** Wrap up by leading a collaborative creation from a crowd-suggested prompt. Play it back for everyone, keeping the session interactive, engaging, and above all, fun.
6. **Discussing the Ethics of AI in Music:** Facilitate a discussion on the ethical implications surrounding AI-generated content, focusing ownership, copyright, and training issues. The goal is to get students thinking, rather than to guide them to any sort of "right" answer or way of thinking. Facilitators should be in [Socratic method](https://en.wikipedia.org/wiki/Socratic_method) mode.
   * **Creativity, Credit & Impact:** Pose questions on creativity and credit. How would they feel if an AI was trained on their original music? Should they be compensated if someone can generate songs in their style? Encourage them to think about the implications for human musicians.
   * **Responsible AI Principles:** Connect this discussion to established Responsible AI principles, such as those from  [Microsoft](https://www.microsoft.com/en-us/ai/principles-and-approach), [Google](https://ai.google/responsibility/principles/), or [Meta](https://ai.meta.com/responsible-ai/). Emphasize that ethics in AI is a complex and evolving field, with major tech companies investing heavily in it, and that students have a chance to shape what responsible AI usage will look like in the future.
7. **Wrap-Up & Encouragement:** Close by encouraging students to continue exploring AI. Highlight the importance of understanding and using AI responsibly as it becomes more integrated into their futures.Share additional online learning resources (Coursera, Microsoft Learn, Grow with Google) to inspire continued exploration of AI.

## Facilitation Resources

If you're looking for more tangible resources for running this workshop, look no further. A full facilitator's guide and accompanying presentation can be found below. If you're interested in running this workshop yourself, these resources should get you started!

<iframe src="https://1drv.ms/w/c/750d396c5cadcebd/IQT94XikKGuQRpPh1KoLzHp0ASs4NmV0vnsS3dj935_Huy0?em=2&amp;wdEmbedCode=0" width="100%" height="500px" frameborder="0">This is an embedded <a target="_blank" href="https://office.com">Microsoft Office</a> document, powered by <a target="_blank" href="https://office.com/webapps">Office</a>.</iframe>

---

<iframe src="https://1drv.ms/p/c/750d396c5cadcebd/IQRspUxu3WgnQKDoq7IzD2zZAeIAZHQTr8aLI0PHFmWRQ2E?em=2&amp;wdAr=1.7777777777777777" width="100%" height="500px" frameborder="0">This is an embedded <a target="_blank" href="https://office.com">Microsoft Office</a> presentation, powered by <a target="_blank" href="https://office.com/webapps">Office</a>.</iframe>
