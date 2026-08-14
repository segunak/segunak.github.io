---
title: "Roche's Maxim: Essential Wisdom For Simplifying Data Transformation"
excerpt: "Embrace the simple but powerful wisdom of Roche's Maxim to enhance the way you approach data transformation."
classes: wide
last_modified_at: 2026-08-13T20:14:57
header:
  teaser: /assets/images/misc/thinker.jpg
categories:
  - blog
tags:
  - tech
---


Have you ever heard a word or phrase that perfectly describes something you'd often thought about, but didn't have a name for? The joy that comes from discovering that official (or colloquial) term is downright vindicating. I recently had this satisfying experience after coming across a concept called [Roche's Maxim of Data Transformation](https://ssbipolar.com/2021/05/31/roches-maxim/).

It states:

> Data should be transformed as far upstream as possible, and as far downstream as necessary.
>
> <cite>[Matthew Roche](https://www.linkedin.com/in/matthewroche/)</cite>

How delightfully simple, and suitably germane to my current line of work. I'm presently a software engineer on a team that works a lot with data. One of our projects involves the first two parts of the [ETL](https://en.wikipedia.org/wiki/Extract,_transform,_load) process, extract and transform, with a downstream system responsible for the load.

## The Trials of a Data Middleman

Our team is responsible for transforming data extracted to a [data lake](https://cloud.google.com/learn/what-is-a-data-lake) by an upstream system. This has proven cumbersome, primarily because it's published in a format far from what the [final destination](https://en.wikipedia.org/wiki/Final_Destination) system is looking for. We're effectively a middleman, doing anything and everything to prepare data for a downstream system whose importance within the larger organization outranks ours by a mile. The publishing team upstream of us is well-intentioned, but for various reasons (technical debt, staffing constraints, shifting priorities, platform limitations), are unable to provide much more than a raw dump of their internals, leaving us scrambling to fit it all together.

It's like someone asking you to help assemble furniture for their grandma, but instead of working with you, they drop the box on your front porch, expecting completion by week's end. They also conveniently forgot to provide you with the instructions, and instead of sending a copy, opt for sharing bits and pieces of it over chats and emails. So in addition to the furniture being in pieces, you're also getting the instructions in pieces, leaving you with two puzzles to solve at once. After languishing for some time, you have an epiphany. Wouldn't it be easier if the furniture's owner, who possesses the full set of instructions, put it together themselves, and asked you to only _deliver_ it to their grandma? Or, if they want your help putting it together, couldn't they at least send the full instructions?

No analogy is perfect, particularly this one, but it mostly captures how I felt about the project, and I wasn't alone. The feeling of "this is ridiculous" became so widespread that it eventually grew to include engineers on the data-providing upstream team. They acknowledged the inefficiency of dumping their internals for us to painstakingly assemble, leading to a constant need for clarifications on ever-shifting domain knowledge. From these shared sentiments, a joint effort was born to eliminate our team's role as a data middleman. Transformation is now handled upstream, and the results are egressed directly to the authoritative downstream system. Everyone's happier for the simplification, and although we didn't know it at the time, we had put Roche's Maxim to practical use.  

## Embracing the Maxim

If I had known about Roche's Maxim when I first started on the project, I would've proudly dropped it on my colleagues in meetings, taking care to appear a refined intellectual in the process. Do you know how cool it is to go around spouting _maxims_? Nothing says "I know what I'm talking about" (or perhaps, "I'm a pretentious snob") more than having a maxim or carefully curated philosophical quote up your sleeve at all times.

Jokes aside, I couldn't be happier to have discovered Roche's Maxim. If embraced, it can be a golden rule that keeps data flowing smoothly, teams smiling, and companies thriving. In a world where data is king, it provides a simple path toward keeping ETL processes [perfectly balanced, as all things should be](https://knowyourmeme.com/memes/perfectly-balanced).
