---
title: "How To Train Your AI: Demystifying ChatGPT With Machine Learning, Neural Networks, and Deep Learning Basics"
excerpt: "Demystify the concepts behind tools like ChatGPT with an approachable introduction to Machine Learning, Neural Networks, and Deep Learning."
last_modified_at: 2026-08-03T16:11:26
toc: true
toc_sticky: true
toc_label: "On This Page"
toc_icon: "robot"
header:
  teaser: /assets/images/how-to-train-your-dragon.jpg
  og_image: /assets/images/how-to-train-your-dragon.jpg
  overlay_image: /assets/images/how-to-train-your-dragon.jpg
  overlay_filter: 0.7
categories:
  - blog
tags:
  - stem-education
  - artificial-intelligence
---


<style>
    .page__hero--overlay {
        background-position: center 60%;
    }
    /* Apply styles only on tablets and larger devices */
    @media (min-width: 768px) {
        .page__hero--overlay {
            padding: 10em 0;
        }
    }
</style>

**Aside:** The *How To Train Your AI* portion of the title is a reference to the heartwarming animated movie series [*How To Train Your Dragon*](https://en.wikipedia.org/wiki/How_to_Train_Your_Dragon). If you caught that before reading this, you have great taste, and I'm proud of you 🙌🏾👏🏾.
{: .notice--info}

## Some Background

We're back with another entry in my series of [STEM Workshops](https://segunakinyemi.com/tags/#stem-education), where I share content I've created to teach the fundamentals of computer science, software engineering, and technology to persons of varying backgrounds. This particular workshop is focused on Artificial Intelligence (AI), which is the hottest topic in technology and maybe the entire world right now. While it might seem magical, the fundamental aspects behind it are rooted in math, probability, and statistics, just at massively refined scales. This workshop aims to take the foundational ideas of AI and distill them into something people can understand, regardless of their technical background.

To do this, it simplifies those concepts quite drastically as they relate to popular AI tools like ChatGPT. I strive to maintain accuracy, but it's undeniable that the concepts are far more complex than how they're presented in the workshop. However, the basic idea is there. I take inspiration for this teaching approach from one of my favorite YouTube channels, [OverSimplified](https://www.youtube.com/@OverSimplified). It breaks down complex historical topics into simple ideas that anyone can understand. The creator doesn't shy away from saying, "Yes, this is oversimplified," but that's the point: make the ideas accessible, spark curiosity, and give people enough understanding to dive deeper on their own.

That's the theme of this workshop. It's an intentionally oversimplified dive into the foundations behind Machine Learning, Neural Networks, and Deep Learning: the pillars of AI.

The workshop comes in two versions that teach the same core concepts about how AI models are trained, but use different teaching methods.

A **Coding Activity** version where participants engage in hands-on programming to train simplified AI models themselves.

A **Language Activity** version where participants learn how AI recognizes patterns through a group exercise using images of different languages with non-English characters. Over time, the audience can recognize a language from its patterns despite not knowing what it is.

Those intrigued by what they learn will hopefully take the next steps to explore further, perhaps by leveraging online resources like those cataloged [here](https://segunakinyemi.com/blog/ai-learning-resources/).  

## Workshop Overview

The workshop breaks down the concepts of AI into digestible sections, using different teaching methods depending on the version chosen.

- **Duration:** ~1 hour  
  - **Coding Activity Version:** 30 minutes of presentation, activity, and discussion, followed by a 30-minute coding exercise.  
  - **Language Activity Version:** 30 minutes of presentation and interactive discussion, followed by a 30-minute group exercise using images of different languages.

- **Goal:** Participants will gain a foundational understanding of how AI systems like ChatGPT work, including key concepts in Machine Learning, Neural Networks, and Deep Learning.  
  - **Coding Activity Version:** Emphasizes hands-on coding to reinforce AI training concepts.  
  - **Language Activity Version:** Uses visual pattern recognition with foreign language characters to demonstrate how AI learns patterns.

## Required Expertise

For participants, no technical background is required. Those with some coding experience will find the later activities more familiar, but the workshop is designed to be accessible to anyone with curiosity and a willingness to learn. That said, facilitators will benefit greatly from a solid understanding of these concepts. It's challenging to stand before a room of curious people, ready to poke, prod, and ask questions, without a firm grasp of the material. The [facilitation resources](#facilitation-resources) are designed to help with building that understanding.

## Required Materials

- The [facilitation resources](#facilitation-resources).
- Pen and paper for all participants.
- **For Coding Activity Version:** Laptops with internet access (one per person or group of 3-4 people works best) and a Microsoft account logged in on the laptops to access the [Visual Studio Code for Education](https://vscodeedu.com) project found [here](https://vscodeedu.com/Q4eHFHOieGscZpldANxN).

## Workshop Structure

Here's the overall structure of this workshop.

### Activity 1: Exploring AI Training Concepts

Participants begin by exploring the difference between traditional programming ("writing rules") and AI ("learning patterns"). Through an interactive pen-and-paper exercise, they create pseudocode representing potential AI training systems, gaining insight into how AI learns from labeled data (supervised learning) and raw text data (self-supervised learning). This foundational activity sets the stage for understanding how AI models like ChatGPT are trained.

### Activity 2: Hands-On Learning

This section varies by workshop version to teach the same core concepts about AI training using different methods.

#### Coding Activity Version

Using Python files from the [Visual Studio Code for Education project](https://vscodeedu.com/Q4eHFHOieGscZpldANxN), participants will:

1. Run a basic random word generator.
2. Improve it using [Markov chains](https://en.wikipedia.org/wiki/Markov_chain) (a way to predict the next word based on previous ones) and tweakable parameters like `window_size` (how many previous words are considered) and `temperature` (how random or creative the word selection is).
3. Interact with an AI-like model they refine themselves, experiencing firsthand how adjustments impact output.

#### Language Activity Version

Participants engage in a group exercise where they are shown images of different languages with non-English characters. Over time, without any prior knowledge of these languages, the audience learns to recognize patterns and distinguish between different languages. This demonstrates the same pattern recognition principles that AI models use during training.

## Facilitation Resources

You can find the facilitation guide for this workshop below, with the latest version always available on GitHub [here](https://github.com/segunak/stem-education/blob/master/workshops/How-To-Train-Your-AI/how-to-train-your-ai.md).

<iframe
    src="https://segunak.github.io/stem-education/workshops/How-To-Train-Your-AI/how-to-train-your-ai.pdf"
    width="100%"
    height="500px"
    style="border: 1px solid gray">
</iframe>

### Coding Activity Version

The **Coding Activity** version of this workshop is below. It features a live AI training exercise using [Visual Studio Code for Education](https://vscodeedu.com/) requiring laptops for participants. If you download a copy, be sure to review the notes section for key discussion points and essential concepts to share with participants.

<iframe
  src="https://1drv.ms/p/c/750d396c5cadcebd/IQS10Ps2jcCrR4jWYJmitxuqAbEgwZWs0ZeYC7lTNEo9CaI?em=2&amp;wdAr=1.7777777777777777"  
  width="100%"
  height="500px"
  frameborder="0">
</iframe>

### Language Activity Version

The **Language Activity** version of this workshop, designed for participants with varying levels of technical expertise, is linked below. It remains interactive but uses a group-based approach where participants are shown images of different languages with non-English characters and learn to recognize patterns over time, demonstrating how AI models learn to distinguish patterns. Participants will only need pen and paper.

<iframe
  src="https://1drv.ms/p/c/750d396c5cadcebd/IQShwvRnbTzxSLUzum-NV0vQAartnDl4cQJ42eL2ccVtiwk?em=2&amp;wdAr=1.7777777777777777"
  width="100%"
  height="500px"
  frameborder="0">
</iframe>

## Final Thoughts

If you'd like to explore AI further, check out my curated list of resources [here](https://segunakinyemi.com/blog/ai-learning-resources/). Feel free to adapt this workshop and [share](/contact) your experiences. I'm always excited to hear how others are teaching these concepts!
