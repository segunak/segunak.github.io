---
title: "Natural Language Programming Is Lowering Software Development's Barrier to Entry"
excerpt: "Learn to code? I think you absolutely should, but with AI, it's now easier than ever to develop software with minimal coding skills, and I'm all for it."
toc: true
toc_sticky: true
toc_label: "On This Page"
toc_icon: "robot"
last_modified_at: 2026-08-03T16:11:26
header:
  teaser: /assets/images/all-might-hero-graphic.png
  og_image: /assets/images/all-might-hero-graphic.png
  overlay_image: /assets/images/all-might-hero-graphic.png
  overlay_filter: 0.6
categories:
  - blog
tags:
  - tech
  - artificial-intelligence
---


<style>
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

        #spending-image, #azure-image, #sus-dog, .gifformat {
            width: 85%;
        }
    }
</style>

Check out my collection of AI-related articles [here](https://segunakinyemi.com/tags/artificial-intelligence), and a similar article I wrote that expands on this topic at: [GitHub Copilot's Agent Mode Is Rather Impressive, But the Real Question Is, Are Software Developers Cooked?](https://segunakinyemi.com/blog/github-copilot-agent-mode/)
{: .notice--primary}

## AI Everything Everywhere All at Once

In case you haven't heard, I'll start by sharing that Artificial Intelligence (AI) is a big deal right now. There are those who think it nothing more than a fad, the fleeting hype of tech bros, the hollow noise of marketing gurus, the empty promises of corporate shills. To them I say, take a look at this graphic, courtesy of [J.P. Morgan Chase](https://www.chase.com/personal/investments/learning-and-insights/article/tmt-may-eight-twenty-four-daily).

<div class="meme-container">
  <div class="meme-wrapper">
    <img src="/assets/images/ai-spending-cropped.jpg" />
  </div>
</div>

See that y-axis? **Those numbers are in billions.** Regardless of your opinions on AI, money talks. Corporations, especially the tech giants, are fluent in its prose. Big tech has mastered the art of spending money where it matters, which is why they've become the most successful corporations in history. They are the apex of Adam Smith's *unbearably dry* capitalist philosophy from [*The Wealth of Nations*](https://simple.wikipedia.org/wiki/The_Wealth_of_Nations). Instead of speculating about whether AI is "a real thing", just follow the money. It paints a clear picture, for better or worse. AI, specifically [Generative AI](https://www.google.com/search?q=What+is+Generative+AI), is here to stay.

Before we proceed, let me disclose that I'm a Software Engineer at a [company](https://en.wikipedia.org/wiki/Microsoft) responsible for creating many of the products and services mentioned in this article. It also happens to be the big-money sponsor (sugar daddy, if you will) behind OpenAI's ChatGPT and the *owners* of GitHub, putting it squarely at the forefront of AI-assisted software development (or "engineering", whatever, they're truly interchangeable colloquially). That said, I represent only myself on this blog. All opinions are my own. [Dobby is a free elf](https://www.youtube.com/watch?v=8DTb-lseCdQ).

## Natural Language Programming

The focus of this article is a rather recent phenomenon called *Natural Language Programming*. As the name suggests, it's about writing code, not in the traditional programming syntax, but starting with plain, everyday human language. Essentially, you describe what you want, like saying, "Create a website with three pages", and an AI turns your words into actionable code, often in a high-level programming language like Python, Java, JavaScript, or C#. This approach has the potential to make coding more accessible to anyone who can clearly express their ideas in words. In fact, writing skills have never been more critical in the world of programming.

If you're reading this and majored in English, Journalism, or Communications and are sick of being paid peanuts, tech might just have a place for you as a [Prompt Engineer](https://www.google.com/search?q=What+is+a+Prompt+Engineer). Seriously. Actual software developers, like those working on [Apple Intelligence](https://www.apple.com/apple-intelligence/), are spending time [writing plain-language instructions to get AI to do its job](https://www.reddit.com/r/LocalLLaMA/comments/1gepb6t/apple_intelligences_prompt_templates_in_macos_151/). And their lack of writing skills has [even caused bugs](https://www.reddit.com/r/ios/comments/1gohtvd/anyone_also_doesnt_care_about_apple_intelligence/). If you're good at writing, there's a future in tech for you.

## Simplicity's Rising Tide

When it comes to software development in this age of AI, we've blown past the [low-code movement](https://www.google.com/search?q=What+is+the+low+code+movement) into an era where it's easier than ever for people with just a bit of tech savvy, not necessarily a full computer science degree, to build custom software solutions. I'm talking about the kind of people who master tools like Excel, Tableau, Squarespace, Airtable, Wix, or Canva and create incredible things. Of course, actually understanding code is still essential if you want to build production-grade systems at global scale (the kind of work that earns you the big bucks in big tech), but most people aren't aiming for that. They just want to make a website, an app, or something functional for their own purposes. It's never been easier to do so. And if you *are* interested in becoming a software developer, it's also easier than ever to use AI to learn coding. We're driving automatic now; the days of manual stick shift are quickly fading into the rear view.

Or put another way, **you too can become a *<s>hero</s>* software developer**.

<div class="meme-container">
  <div class="meme-wrapper">
    <img src="/assets/images/all-might-you-too-hero.gif"/>
  </div>
</div>

**Aside:** If you got the above reference, that makes me happy, exceedingly joyful even. If you didn't, no worries, it's [anime](https://www.reddit.com/r/BokuNoHeroAcademia/comments/10ss219/the_words_that_started_it_all_you_too_can_become/). I'm of the opinion that [My Hero Academia](https://en.wikipedia.org/wiki/My_Hero_Academia) is [Naruto](https://en.wikipedia.org/wiki/Naruto) for [Gen Z](https://en.wikipedia.org/wiki/Generation_Z) (which I recently learned I'm a part of, just barely). [Deku](https://en.wikipedia.org/wiki/Izuku_Midoriya) is [Naruto](https://en.wikipedia.org/wiki/Naruto_Uzumaki), [Bakugo](https://en.wikipedia.org/wiki/Katsuki_Bakugo) (or maybe [Todoroki](https://en.wikipedia.org/wiki/Shoto_Todoroki)) is [Sasuke](https://en.wikipedia.org/wiki/Sasuke_Uchiha), [Ochaco](https://myheroacademia.fandom.com/wiki/Ochaco_Uraraka) is (a much more useful) [Sakura](https://en.wikipedia.org/wiki/Sakura_Haruno). Yet, it does enough to distinguish itself from Naruto, having it's own take on the [Shōnen](https://en.wikipedia.org/wiki/Sh%C5%8Dnen_manga) genre that I've come to love and respect. If you're looking for your first anime, or already like anime and haven't seen it, it's worth picking up. There's some slow arcs, but when they turn things up, they do so to the max.
{: .notice--info}

## Shine Your Eyes

To emphasize that what I'm saying here isn't just my opinion, but a real trend in software development across the [Fortune 500](https://www.50pros.com/fortune500), let me share a quote from [GitHub](https://en.wikipedia.org/wiki/GitHub), the world's leading developer platform and a cornerstone of software collaboration.

> As programming in natural language lowers the barrier of entry to who can build software, we are accelerating to a near future where one billion people on GitHub will **control a machine just as easily as they ride a bicycle**.
>
> [Thomas Dohmke - GitHub CEO](https://github.blog/news-insights/product-news/github-copilot-workspace/#:~:text=As%20programming%20in%20natural%20language%20lowers%20the%20barrier%20of%20entry%20to%20who%20can%20build%20software%2C%20we%20are%20accelerating%20to%20a%20near%20future%20where%20one%20billion%20people%20on%20GitHub%20will%20control%20a%20machine%20just%20as%20easily%20as%20they%20ride%20a%20bicycle.)

Dohmke's leaning hard into classic CEO hyperbole here, but I get his point. As someone who works at GitHub's [parent company](https://en.wikipedia.org/wiki/Microsoft), I can confirm firsthand that **AI integration is being heavily pushed** in every aspect of software development. Faster, more efficient, less error-prone. That's the directive. Think Tony Stark using [J.A.R.V.I.S.](https://en.wikipedia.org/wiki/J.A.R.V.I.S.) in *Iron Man*: a system that enhances our brilliance (and, ideally, doesn't go full [Ultron](https://en.wikipedia.org/wiki/Avengers:_Age_of_Ultron) on us).  

To further drive this home, here's a list of leading tools in the "make coding easier with AI and natural language" category, designed not just for developers, but for anyone reasonably tech-savvy.  

* [OpenAI Canvas](https://openai.com/index/introducing-canvas/)
* [GitHub Copilot](https://github.com/features/copilot)
* [GitHub Copilot Workspace](https://githubnext.com/projects/copilot-workspace)
* [Google Jules](https://labs.google.com/jules/home)
* [Amazon CodeWhisperer](https://docs.aws.amazon.com/codewhisperer/latest/userguide/what-is-cwspr.html) (lol at this name).
* [IBM Watsonx](https://www.ibm.com/watsonx)
* [Cognition's Devin AI](https://www.cognition.ai/blog/introducing-devin/)
* [Sourcegraph's Cody](https://sourcegraph.com/cody)
* [Replit's Ghostwriter](https://replit.com/learn/intro-to-ghostwriter)
* A bunch from Microsoft, who struggle with clear and consistent naming of things. They've got [Azure AI Foundry](https://learn.microsoft.com/en-us/azure/ai-studio/what-is-ai-studio), formerly named [Azure AI Studio](https://www.google.com/search?q=%22Azure+AI+Studio%22), formerly named [Azure AI Hub](https://www.google.com/search?q=%22Azure+AI+Hub%22), then [Azure AI Platform](https://azure.microsoft.com/en-us/solutions/ai), [Azure Open AI Service](https://azure.microsoft.com/en-us/products/ai-services/openai-service), [Azure AI Services](https://azure.microsoft.com/en-us/products/ai-services), [Azure Machine Learning](https://azure.microsoft.com/en-us/products/machine-learning), and [Azure AI Search](https://azure.microsoft.com/en-us/products/ai-services/ai-search). It is confusing, [no be small](http://naijalingo.com/words/no-be-small-thing-o).

In that list, consider that Microsoft [owns GitHub](https://www.google.com/search?q=Who+owns+GitHub), [a portion of OpenAI](https://fortune.com/2024/10/18/microsoft-openai-equity-stake-nonprofit-for-profit-reorganization-sam-altman/), and now [partners with Cognition on Devin AI](https://www.maginative.com/article/microsoft-partners-with-cognition-labs-to-bring-devin-to-developers/). So it's like...wow. Some ambitious U.S. senator might want to look into that. Becoming Congress's AI regulation hawk would be a savvy career move. Or even just political science majors out there, get yourself a piece of the AI pie. Start posting about the behind-the-scenes dynamics between the leading AI companies: Microsoft backing [OpenAI](https://en.wikipedia.org/wiki/OpenAI) and [Mistral AI](https://en.wikipedia.org/wiki/Mistral_AI); Amazon backing [Anthropic](https://en.wikipedia.org/wiki/Anthropic), founded by former OpenAI employees; Google with [Gemini](https://en.wikipedia.org/wiki/Gemini_(chatbot)); Meta with [Llama](https://en.wikipedia.org/wiki/Llama_(language_model)); and [Apple Intelligence](https://help.openai.com/en/articles/10263313-what-is-apple-intelligence), which is powered by OpenAI, a company partially owned by Microsoft that runs on [Azure](https://en.wikipedia.org/wiki/Microsoft_Azure), tying it to Microsoft in a roundabout way.

<div class="meme-container">
  <div class="meme-wrapper">
    <img src="/assets/images/sus-dog.gif"/>
  </div>
</div>

Now, to be fair to Microsoft, they're rather transparent (as far as corporations go) about their approach to using AI responsibly. They've dedicated a [section of their website](https://www.microsoft.com/en-us/ai/principles-and-approach) to the topic, including a collection of [transparency documents](https://www.microsoft.com/en-us/ai/principles-and-approach#transparency-documents) that detail how their systems are trained, the biases they've identified and are working to address, how user data is utilized, and the specifics of data sharing between GitHub, LinkedIn, OpenAI, Mistral and Microsoft corporate, entities either owned by or closely partnered with the company. That's not to say it isn't a sticky issue regulation wise, but they're not [ducking smoke](https://www.urbandictionary.com/define.php?term=Ducking+smoke).

## GitHub Copilot Workspace

Of the aforementioned tools, one stands out as particularly intriguing: [GitHub Copilot Workspace](https://githubnext.com/projects/copilot-workspace). It places natural language programming at the forefront of software development. That might sound far-fetched, but when you watch the [demos](https://www.youtube.com/watch?v=L5Xny6yehUg), it seems like they're onto something.

The key feature is an AI agent that's *contextualized to your codebase*, integrated directly with your GitHub repository. This addresses one of my biggest complaints about AI-assisted programming using tools like ChatGPT. The process of providing context, manually copying, pasting, or uploading files, can be tedious. Plus, as conversations progress, these tools often run into context limits, leaving me stuck re-explaining things. Having an LLM that can access my entire codebase? That's cash money. And for software developer's trying to get up to speed on a new project, this could be clutch. Imagine an AI that has read every corner of the codebase, ready to assist, or *copilot*, as you try to understand what's going on and make effective changes. Here's how GitHub's CEO describes the product:

> Copilot Workspace represents a radically new way of building software with natural language, and is expressly designed to deliver, not replace, developer creativity, faster and easier than ever before. With Copilot Workspace we will empower more experienced developers to operate as systems thinkers, and materially lower the barrier of entry for who can build software.
>
> [Thomas Dohmke - GitHub CEO](https://github.blog/news-insights/product-news/github-copilot-workspace/#:~:text=Copilot%20Workspace%20represents,can%20build%20software.)

That bit about *deliver, not replace* developer creativity? That's where many in the software development community start feeling like:

<div class="meme-container">
  <div class="meme-wrapper">
    <img src="/assets/images/im-in-danger.gif" />
  </div>
</div>

The fact that GitHub's CEO felt the need to explicitly address this concern makes the worries from the tech community understandable and, in many ways, justified. That said, in my opinion, AI-assisted programming isn't reducing the need for humans to build software. For that to happen, we'd need [Artificial General Intelligence](https://en.wikipedia.org/wiki/Artificial_general_intelligence), which we don't have...yet.

The demand for software developers remains significant, so much so that companies like [Microsoft](https://learn.microsoft.com/en-us/training/) and [Google](https://grow.google/) have launched their own training and education initiatives. They've recognized that traditional college programs aren't always producing graduates equipped to meet industry needs. AI-assisted programming is another tool in the same vein. It's designed to help bridge the gap, enabling more people to contribute to software development.

Natural language programming is a perfect example of this. Many companies are now looking at their Product Managers and Business Analysts and saying, "Hey, you're already tech-savvy. Can you figure out how to use tools like this to build software?" The idea isn't to replace software engineers but to empower more people to create solutions and take on smaller projects, freeing up engineers for the more complex, production-grade work. AI-assisted programming is meant to augment, not eliminate, the role of developers.

Here's another quote from a different article to illustrate that point:

> With GitHub Copilot Workspace, we envision a world where millions of novice, hobbyist, and professional developers alike **can code with entirely human language**.
>
> [Thomas Dohmke - GitHub CEO](https://github.blog/news-insights/product-news/introducing-github-models/?__readwiseLocation=#:~:text=With%20GitHub%20Copilot%20Workspace%2C%20we%20envision%20a%20world%20where%20millions%20of%20novice%2C%20hobbyist%2C%20and%20professional%20developers%20alike%20can%20code%20with%20entirely%20human%20language.)

So...yeah. Things are [changing](https://www.youtube.com/watch?v=0t-Hm5mlveY).

## Becoming A Natural Language Programmer

If you've read this far and are like "ayo let me get in on this" here's my advice on getting started.

### Learn Basic Coding (Seriously)

First things first, take a basic coding class. Please. I don't want you out here building software if you're generating code with AI but can't understand, at a basic level, what it's doing. That's how you accidentally create [Skynet](https://en.wikipedia.org/wiki/Skynet_(Terminator)) or end up with the [Machines](https://matrix.fandom.com/wiki/Machines) from [The Matrix](https://en.wikipedia.org/wiki/The_Matrix). Learning to code is like taking a driver's test. Nobody's saying you need to train for NASCAR or get a commercial license for trucking, that's elite-level driving. But for the love of humanity, at least know how to change lanes, adjust your mirrors, put air in the tires, the basics.

Start with Python. It's the go-to language for data science, machine learning, and AI, the backbone of this entire movement. Python is becoming like English: you can get by just about anywhere with it. Plus, if you ever need to switch to another programming language, AI can translate your Python code for you. It's a beginner-friendly language that's also powerful enough for building machine learning models when you're ready to level up.

To start learning Python:

* [Visual Studio Code for Education's Intro to Python Course](https://vscodeedu.com/courses/intro-to-python) - A **free** resource from Microsoft to start learning Python in a beginner friendly way. It's similar to Codeacademy in terms of a tutorial style teaching approach. It's also worth noting that [Guido van Rossum](https://en.wikipedia.org/wiki/Guido_van_Rossum), the creator of the Python programming language, [works at Microsoft](https://en.wikipedia.org/wiki/Guido_van_Rossum#Microsoft) these days.
* [Codeacademy's Python Courses](https://www.codecademy.com/catalog/language/python) - This is the platform I used to learn coding when my liberal arts school, [Lindenwood University](https://en.wikipedia.org/wiki/Lindenwood_University), wasn't quite cutting it for me (still love em though). It's interactive and beginner-friendly.
* Try Harvard's famous [CS50 Introduction to Programming with Python](https://cs50.harvard.edu/python/) course for a deeper dive into coding fundamentals. It's without question the most suggested "learn how to code" course industry wide.
* Check out [r/learnpython](https://www.reddit.com/r/learnpython/wiki/index/#wiki_new_to_python.3F) for additional resources and community support.

### Understand the Basics of AI

Next, get a handle on how AI works. I'm not saying you need to become an expert, but at least take an hour to read or watch something that explains what's happening under the hood. Think of this like learning how your car works before you start driving. At least skim the manual, don't just floor the gas.

Here's a fantastic series of articles by [Parand Tony Darugar](https://www.linkedin.com/in/parand/) to start:

* [A Completely Non-Technical Explanation of AI and Deep Learning](https://www.parand.com/a-completely-non-technical-explanation-of-ai.html)
* [A Non-Technical Explanation of ChatGPT](https://www.parand.com/a-non-technical-explanation-of-chatgpt.html)
* [A Non-Technical Explanation of ChatGPT: Deep Learning](https://www.parand.com/a-non-technical-explanation-of-chatgpt-deep-learning.html)

These articles break down AI, machine learning, and ChatGPT in plain, approachable terms. I even built a student workshop based on how well he explains these concepts, which you can check out [here](https://segunakinyemi.com/blog/stem-workshop-how-to-train-your-ai/). For additional AI learning resources, check out my guide [here](https://segunakinyemi.com/blog/ai-learning-resources/#wading-in).

### Dive Into AI-Driven Coding

Finally, it's time to get hands-on. First, familiarize yourself with [Git](https://www.google.com/search?q=What+is+Git) and [GitHub](https://www.google.com/search?q=WHat+is+GitHub). Even in an AI-assisted world, [version control](https://www.google.com/search?q=what+is+version+control+in+software+development) is critical. Check out [GitHub's skills lab](https://skills.github.com/) for beginner-friendly tutorials. Next, know that the heart of natural language programming is [*prompt engineering*](https://www.google.com/search?q=What+is+Prompt+Engineering), crafting precise, well-written inputs to get AI to deliver exactly what you want. AI models rely on probabilities and statistics tied to the words you use. The better you write, the better AI understands you because it was trained on clean, high-quality text. If you suck at writing, it's going to struggle understanding you. Here's how to level up.

---

**Learn the basics of prompt engineering.**

* [OpenAI Prompt Engineering Guide](https://platform.openai.com/docs/guides/prompt-engineering)
* [DAIR.AI Prompt Engineering Guide](https://github.com/dair-ai/Prompt-Engineering-Guide)
* [Awesome ChatGPT Prompts](https://github.com/f/awesome-chatgpt-prompts)

---

**Explore AI-driven coding platforms.**

* [Cursor](https://www.cursor.com/): A staple for the "code with AI" crowd. It lets AI work with your entire project context. Unlike standalone tools, it bridges the gap between natural language and coding with precision. And yes, real software engineers are already using it.  
* [GitHub Copilot Workspace](https://githubnext.com/projects/copilot-workspace): An extension of GitHub Copilot that goes beyond single-file suggestions, allowing AI to actually understand your entire codebase. It's a direct competitor to Cursor that I believe will eventually outlast it because of how entrenched GitHub is in developer workflows (and the fact that Microsoft is their *<s>sugar daddy</s>* parent company).
* [OpenAI Canvas](https://openai.com/index/introducing-canvas): Another in the coding-with-AI space. It's less comprehensive than Cursor or GitHub Copilot Workspace but works as a digital whiteboard where you sketch ideas in natural language, and AI translates them into functional code. Great for experimenting or mapping out prototypes.

---

**Get inspired and find community. Check out:**

* [r/ChatGPTCoding](https://www.reddit.com/r/ChatGPTCoding/) to see how others are creatively using AI for coding projects.  
* [r/learnprogramming](https://www.reddit.com/r/learnprogramming/) for a mix of beginner advice and coding tips, including how AI fits into the learning process.
* [YouTubers](https://www.youtube.com/results?search_query=+building+an+app+from+scratch+with+AI) who demonstrate building an app from scratch with AI tools.

---

With these steps, you'll be on your way to becoming [something of a programmer yourself](https://www.youtube.com/watch?v=Ita27tRkFNs). Just remember: the tools are here to augment your skills, not replace them. Build responsibly.

## Cynicism, Skepticism, and Anxiety

For my cynics, skeptics, and understandably anxious people out there concerned about AI eliminating the need for software developers, consider this quote from GitHub's CEO.

> At the same time, we live in a world dependent on, and in short supply of, professional developers. Around the world, developers add millions of lines of code every single day to evermore complex systems and are increasingly behind on maintaining the old ones. Just like any infrastructure in this world, we need real experts to maintain and renew the world's code.
>
> [Thomas Dohmke - GitHub CEO](https://github.blog/news-insights/product-news/github-copilot-workspace/#:~:text=At%20the%20same,the%20world%E2%80%99s%20code.)

GitHub is a company of developers building for other developers. An opinion from their CEO on the future of software development carries some weight. **We need more developers, not less**. As someone who works at GitHub's [parent company](https://en.wikipedia.org/wiki/Microsoft), I can verify this firsthand. I occasionally interview candidates, man booths at recruiting events, and dip into the company's budget to put on student learning workshops. The demand for developers is high, but the skills needed, [frameworks](https://survey.stackoverflow.co/2024/technology#3-web-frameworks-and-technologies), [design patterns](https://refactoring.guru/design-patterns), [networking](https://aws.amazon.com/getting-started/aws-networking-essentials/), [system design](https://github.com/donnemartin/system-design-primer), [DevOps](https://azure.microsoft.com/en-us/solutions/devops/tutorial), and clouds like [AWS](https://en.wikipedia.org/wiki/Amazon_Web_Services), [Azure](https://en.wikipedia.org/wiki/Microsoft_Azure), and [GCP](https://en.wikipedia.org/wiki/Google_Cloud_Platform), often aren't taught in traditional computer science programs. Colleges focus on abstract concepts that, while important, don't always translate to practical software development skills.

If you're a student worried that your computer science degree might not be worth it, let me reassure you, it's not useless. But universities need to change how they teach, and fast. This [article](https://www.forbes.com/sites/nishatalagala/2023/06/01/is-coding-educationas-we-know-itdead-how-large-language-models-are-changing-programmers/) explains how AI is reshaping programming education. Bottom line: Your degree is valuable, but only if your school is preparing you for real world software development. If not, well, that's on them. But you don't have to let their shortcomings screw you. That's exactly why companies like Microsoft and Google created their own training and education programs, to bridge the gap between what colleges teach and what the industry actually needs. Check out [Microsoft Learn](https://learn.microsoft.com/en-us/training/) and [Grow with Google](https://grow.google/) for resources to build real-world software development skills.

## An Addendum: Microsoft Can't Name Things

Let me end with some lighthearted memeing about Microsoft's naming conventions. If you can make sense of half the jargon in the image below from [this blog post](https://techcommunity.microsoft.com/blog/azure-ai-services-blog/multimodal-parsing-for-rag-azure-openai-gpt-4o-llamaparse-and-azure-ai-search/4330399), congrats, you're ahead of the curve in the fast-moving world of AI. If not, that's okay, you're a normal person trying to keep up with the relentless speed at which new terms and tools emerge.

<div class="meme-container">
  <div class="meme-wrapper">
    <img src="/assets/images/wtf-azure-post.png" />
  </div>
</div>

My point is Microsoft's naming skills are [mid](https://www.urbandictionary.com/define.php?term=mid) at best. Consider their gaming console progressions over the years.

1. Xbox ([2001](https://en.wikipedia.org/wiki/Xbox_(console)))
2. Xbox 360 ([2005](https://en.wikipedia.org/wiki/Xbox_360))
3. Xbox One ([2013](https://en.wikipedia.org/wiki/Xbox_One))
4. Xbox Series X and Xbox Series S ([2020](https://en.wikipedia.org/wiki/Xbox_Series_X_and_Series_S))

Now consider how Sony, creators of the PlayStation, have named their gaming consoles.

1. PlayStation ([1994](https://en.wikipedia.org/wiki/PlayStation_(console)))
2. PlayStation 2 ([2000](https://en.wikipedia.org/wiki/PlayStation_2))
3. PlayStation 3 ([2006](https://en.wikipedia.org/wiki/PlayStation_3))
4. PlayStation 4 ([2013](https://en.wikipedia.org/wiki/PlayStation_4))
5. PlayStation 5 ([2020](https://en.wikipedia.org/wiki/PlayStation_5))

I hope my point is clear: there's beauty in simplicity. Do you know how many parents bought their kids the wrong Xbox because they couldn't decipher Microsoft's convoluted naming scheme? And now, Microsoft seems to be pivoting away from the console wars entirely, conceding defeat and embracing a (much more profitable) role as a cloud gaming provider. [This article](https://www.eurogamer.net/what-is-the-point-of-xbox) dives into the shift. Owning IP and letting people play wherever they want is a *[<s>pro gamer move</s>](https://knowyourmeme.com/memes/im-gonna-do-whats-called-a-pro-gamer-move)* smart business move, but it feels like a betrayal of decades of loyalty from Xbox fans.

Of course, Microsoft is [comically larger than Sony](https://www.google.com/search?q=Microsoft+vs+Sony+Market+Cap), with the capital to buy them several times over. But when it comes to the console wars? [They lost](https://en.wikipedia.org/wiki/List_of_best-selling_game_consoles), both culturally and financially. This has nothing to do with the topic of this article; I just felt like saying it.

Anyways, that's all. Godspeed.

<div class="meme-container">
  <div class="meme-wrapper">
    <img src="/assets/images/peace-out-bye.gif" />
  </div>
</div>
