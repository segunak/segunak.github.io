---
title: "Exploring the Tech Stack Behind Charlotte Third Places"
excerpt: "Explore the purposefully over-engineered tech stack behind Charlotte Third Places, a project that helps people discover third places in Charlotte, North Carolina."
toc: true
toc_sticky: true
toc_label: "On This Page"
toc_icon: "coffee"
last_modified_at: 2026-08-13T20:14:57
header:
  teaser: /assets/images/misc/skyline-vibrant.jpeg
categories:
  - blog
tags:
  - tech
---


![HelloThere](/assets/gifs/kakashi-hello.gif)

Hello, and welcome! Charlotte Third Places is a project I built to help people explore various 'third places' around Charlotte, North Carolina. Third places are social environments separate from home (the "first place") and work/school (the "second place") where people come together to build community, exchange ideas, and relax. Think coffee shops, cafes, libraries, casual restaurants, and the like. You can read more about third places as a concept [here](https://en.wikipedia.org/wiki/Third_place).

In short, third places play a crucial role in building connections and creating a sense of belonging beyond the confines of home, work, or school. When I first moved to Charlotte, these spaces were invaluable to me. My personal list of third places grew so much that it eventually needed a more organized solution. This led to the creation of Charlotte Third Places. You can check out the project below, or keep reading to see how it was built.

* **Website:** <https://charlottethirdplaces.com>
* **GitHub:** <https://github.com/segunak/charlotte-third-places>

## Project Background

I'll start by establishing that this project is 100% over-engineered, and that's by design. Have you ever heard the phrase "this meeting could've been an email"? Well, this project could've been nothing more than a well-organized spreadsheet.

When my list of third places outgrew my notes app, creating a spreadsheet and sharing it with people would've been the simplest path forward. In fact, I did exactly that, the first part at least. I transferred my list to an [Airtable](https://airtable.com/) base, which is essentially a fancy spreadsheet with low-code, database-like functionality. Once I had the data in Airtable, I realized I could easily experiment with it using their [API](https://airtable.com/developers), and that's when the real fun began. I hit pause on sharing the base because I knew wanted to do something else. Something cooler. [Something greater](https://www.youtube.com/watch?v=yPZLIf9MqUU). I wanted to use this project as a learning opportunity. As a chance to play around with frontend development, a domain I don't use much in my day job (where it's mostly backend data engineering in Python, Scala, and SQL on Azure).

That's where the over-engineering came in. It wasn't because I didn't understand how simple this project could be. In fact, it was precisely because the concept was so simple that I wanted to challenge myself to do more, and learn as much as I could along the way. Some might say the entire point of a side project as a developer is to over-engineer things in service of learning. Here's a classic [Hacker News thread](https://news.ycombinator.com/item?id=15147660) on the topic. I'm not saying I fully agree with that sentiment, but I am saying I took my time building this site because I wanted to explore. Like sure, you can stick to the linear path in an open-world RPG, but you miss out on so much cool stuff playing that way. Game developers literally spend hours creating things that you only discover if you meander. It's about the journey sometimes, not the destination.

That being said, my journey to getting this project live was longer than I would've liked. It turns out working on hobby projects can be challenging when you have a day job, so the speed of development wasn't exactly <s>Facebook</s> Meta level "[move fast and break things](https://en.wikipedia.org/wiki/Meta_Platforms#History:~:text=On%20May%202,%5B44%5D)". There were plenty of times where I met people interested in viewing my list and had to tell them to "wait a week or two" for me to finish the project. Some of those people waited months. There's at least 1 who waited a year. If you're reading this, my bad G. Life be lifin. The project is live now, and I'm glad for it. Scroll through the sections below to learn how it was made.

## Frontend

Here are the frontend software development tools used to build this project.

### Vercel

[Vercel](https://vercel.com/segun-akinyemis-projects) is the most developer friendly cloud platform I have every used. Seriously. They have done such an amazing job of making software development and deployments painless for developers. Particularly for hobby projects. Everything just works off your GitHub repo, you can configure most things, either via their portal or a `.json` file, the documentation is clear and well-written, they have a generous free hobby plan that [won't surprise you](https://www.reddit.com/r/nextjs/comments/1cfxuz1/comment/l1s3srr/) (at least, [not anymore](https://www.reddit.com/r/nextjs/comments/12dngvg/small_mistake_leads_to_3000_bill_from_vercel_and/)) with charges. It's just an all-around awesome platform. Charlotte Third Places is hosted on Vercel. They also happen to be the creators of Next.js.

### Next.js

[Next.js](https://nextjs.org/) is the framework behind the site. There was once a time where people wrote vanilla HTML, CSS, and JavaScript to build websites. Those days are long gone. This [article](https://www.pzuraq.com/blog/four-eras-of-javascript-frameworks) has a pretty good accounting of how we got to our present era of frameworks on top of libraries on top of other libraries on top of frameworks. [React](https://react.dev/) has emerged as the winner of the JavaScript library race, and Next.js as the framework on top of it (although [Remix](https://www.reddit.com/r/nextjs/comments/1f92jdv/chatgptcom_switched_from_nextjs_to_remix/) is rising). Don't take my word for it though, just reference the latest [Stack Overflow Developer Survey](https://survey.stackoverflow.co/2024/technology/#1-web-frameworks-and-technologies) for evidence.

These days, there's so much overlap between the React and Next.js (developed by [Vercel](https://vercel.com/about)) development teams that some are [concerned](https://www.epicweb.dev/why-i-wont-use-nextjs) they're one and the same. Seeing as this is a hobby project, I'm not with the drama when it comes to the trend-chasing nature of frontend development. Everyone and their mama is using Next.js, including many [popular websites](https://nextjs.org/showcase) you've likely used. That's enough justification for me to use it. My experience has been mostly good, although the app router seems [overly complex](https://github.com/vercel/next.js/discussions/54075).

### React

Next.js is a React framework, so Charlotte Third Places is by extension a React website. React is king. It beat [Angular](https://angularjs.org/), it beat [Backbone](https://backbonejs.org/), it beat [Ember](https://emberjs.com/), it knocked out [Knockout](https://knockoutjs.com/). The debate is over. React is **the** JavaScript library of the web. That being said, it has its pros and cons. Among the cons is its complexity. Most of us using React aren't solving the level of problems <s>Facebook</s> Meta was facing when they created it, but we all benefit from the truly groundbreaking innovations they've brought to web development through it. The React team goes hard. Seriously. They're some of the best software engineers on earth.

These days, the official guidance from React is to use a [framework](https://react.dev/learn/start-a-new-react-project) to get started, which says a lot. They're basically going "lol kid, nobody writes plain React anymore" which to me is like, really? That's where we're at now with frontend development? React is already an abstraction over the [DOM](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model), it's primarily written with [TypeScript](https://en.wikipedia.org/wiki/TypeScript), which is an (awesome) abstraction over [JavaScript](https://en.wikipedia.org/wiki/JavaScript), and now we have [meta-frameworks](https://www.google.com/search?q=what+are+meta-frameworks) like Next.js and Remix as abstractions over React itself. So yeah, welcome to web development. As developers, I feel like we have been [hoodwinked, bamboozled, led astray, run amok, and flat-out deceived.](https://youtu.be/-B3gjf0sREk?si=FiN9ULX9gNnoBbNn)

We're all awash in a cauldron of complexity, crafted by genius web developers who built solutions to problems that are far less common than the frameworks they unleashed on the world would have you believe. I know that <s>Facebook</s> Meta needs [Server Side Rendering](https://nextjs.org/docs/pages/building-your-application/rendering/server-side-rendering) and [Incremental Static Regeneration](https://nextjs.org/docs/app/building-your-application/data-fetching/incremental-static-regeneration), but do you? Do you really? I think most websites really could survive, and work well, with just HTML, CSS, and JavaScript (or some good old [jQuery](https://en.wikipedia.org/wiki/JQuery)). That being said, I do really like TypeScript. TypeScript is fun. I've suffered under the ambiguous hand of JavaScript before, and coming from the backend side of development, writing code for the web that's type-safe and properly linted was a joy.

To be clear, I write partially in [jest](https://jestjs.io/) here. I like building software, frontend, backend, complex, simple, framework, no framework, it don't matter. I'll figure it out, and have fun along the way.

### Shadcn/UI

Styling is one of the hardest parts of web development, which is why style libraries have become so popular. There are countless options, each with its own pros and cons. Among them is [shadcn/ui](https://ui.shadcn.com/), which stands out because it's not a traditional library. Instead, it's a set of reusable components that you, as a developer, copy directly into your app and fully own. Unlike typical libraries where you rely on a third party to maintain updates as the web evolves, with shadcn/ui, you have complete control. You own the code from the start, it works out of the box, and if something needs changing, it's entirely up to you. Yet, there's still community support, since plenty of other developers are taking the same approach. Shout out to [shadcn](https://twitter.com/shadcn) for creating a solution that became so popular, Vercel brought him onto their team. Charlotte Third Places relies heavily on shadcn/ui components, and they work beautifully throughout the project.

That being said, shadcn/ui is built on top of yet another library: [Radix UI](https://www.radix-ui.com/). Radix UI, in turn, is built on React, continuing the layering of abstractions that has become so common in modern web development. So, to break it down: we have [Next.js](https://nextjs.org/) → [shadcn/ui](https://ui.shadcn.com/) → [Radix UI](https://www.radix-ui.com/) → [React](https://react.dev/). And oh, throw [Tailwind CSS](https://tailwindcss.com/) (more on that later) somewhere in there. So yeah. Welcome to web development.

### Tailwind CSS

I'm going to try and not say anything snarky about [Tailwind CSS](https://tailwindcss.com/), a CSS framework that gives you shorthand classes and configuration for *streamlined* styling. It's, I mean it's yet another abstraction on top of a foundational building block of the web, [Cascading Style Sheets](https://developer.mozilla.org/en-US/docs/Web/CSS), which itself has grown so much in capability that I question if you really need a framework on top of it (looking at you [SASS](https://sass-lang.com/) and [LESS](https://lesscss.org/)). Charlotte Third Places uses Tailwind CSS because shadcn/ui uses Tailwind CSS. It's an inherited dependency. I don't dislike it. It makes some things easier, other things harder, and overall, it works well. So, yeah. I think I managed to not say anything snarky.

## Backend

Here are the backend software development tools used to build this project.

### Airtable

The data storage solution. I started with the notes app on my phone before moving to Airtable. I then second guessed my decision and spent some time writing a [NoSQL](https://en.wikipedia.org/wiki/NoSQL) Firebase [Firestore](https://firebase.google.com/products/firestore) solution. I quickly realized Firestore wasn't the answer when I found myself writing custom rules to support consistent schemas across documents. NoSQL is a great (*[webscale](https://www.youtube.com/watch?v=b2F-DItXtZs)*) solution for unstructured data, like social media, but that wasn't what I was dealing with, so it wasn't for me. If you ever find yourself considering NoSQL, and Firestore specifically, read these articles first. They helped me reach a "[it's a no from me dawg](https://www.google.com/search?q=Randy+Jackson+American+Idol+It%27s+a+No+From+Me+Dawg+Origin)" place of enlightenment.

* [Why Firestore, Part I: Reasons to Love It](https://leancode.co/blog/why-firestore-firebase-pros-cons-reasons-to-love-it-part-i)
* [Why Firestore, Part II: Reasons to Hate It](https://leancode.co/blog/why-firestore-part-2-reasons-to-hate-it)
* [Why Firestore, Part III:  6 Things You Need to Know Before Using Firestore](https://leancode.co/blog/why-firestore-6-things-you-need-to-know-before-using-firestore)

I then wanted to try my hand at [PostgreSQL](https://www.postgresql.org/). I'm familiar with [Transact SQL](https://learn.microsoft.com/en-us/sql/t-sql/language-reference) and [Spark SQL](https://spark.apache.org/sql/), as they're consistent parts of my day job, but PostgreSQL is truly its own cool thing. Read [this article](https://www.amazingcto.com/postgres-for-everything/), and [this discussion thread](https://news.ycombinator.com/item?id=33934139), to learn why. The open source community around Postgres is incredible. I wanted to hop in and make something in that universe. I'm sure one day I'll find a way to.

Anyways, the places data for this project is stored in an Airtable base. User feedback is also collected through Airtable forms, which write directly to the same base. It's easy to use, has a solid API, a mobile app that let's me edit things easily, webhooks, and a generous [free plan](https://airtable.com/pricing). Airtable rocks for projects like this. I'm dealing with less than 1 GB of actual data. I don't need NoSQL or a [RDBMS](https://www.google.com/search?q=RDBMS). Airtable will do.

Now, that doesn't mean I won't come back to over-engineer the data side of this project sometime in the future. You know, for learning purposes. Growth mindset and all that. I've got my eye on [Supabase](https://supabase.com/) if I do.

### Google Maps API

My best friend on this project, Google's [Maps API](https://developers.google.com/maps), specifically the [Places API](https://developers.google.com/maps/documentation/places/web-service/overview). Much of the data for the places on the site is pulled directly from Google Maps. Information like whether a place has free parking, requires a purchase to use services, offers outdoor seating, or is good for children, dogs, and groups is all available through the Google Maps API. Google seems to know *everything* about *everyone* and *every* place *everywhere*. It's a bit scary really, but I try not to think about it. You know, [set your mind on things above](https://www.biblegateway.com/passage/?search=Colossians%203%3A2-4&version=NIV) and such. Got to stay positive. It might be a good time to reread [1984](https://en.wikipedia.org/wiki/Nineteen_Eighty-Four) though. Or [Brave New World](https://en.wikipedia.org/wiki/Brave_New_World), which I've always thought more realistic. Just saying.

### Azure Functions

[Azure Functions](https://learn.microsoft.com/en-us/azure/azure-functions/functions-overview?pivots=programming-language-python) are one of many "serverless" function solutions available today. Despite the name, "serverless" doesn't mean there are no servers involved. It just means you don't have to worry about managing them. In simple terms, a serverless function is a piece of code that runs in the cloud, triggered by an event (like an API call or a scheduled task), that automatically scales to handle the load. You only pay for the time it runs, not for keeping a server up and running 24/7. It's like renting a power tool by the minute instead of buying and storing one for occasional use. But just to be clear, there *is* a server. It's just managed by someone else. The "serverless" part is more about convenience and flexibility. As a general rule, always remember, [there's no such thing as "the cloud", it's just someone else's computer](https://www.fromjason.xyz/p/notebook/any-technology-indistinguishable-from-magic-is-hiding-something/).
  
Anyways, the code that interacts with the Google Maps API and Airtable runs as a Python Azure Function. There's also logic for retrieving Google Maps reviews through a platform called [Outscraper](https://outscraper.com/), which bypasses limitations in the native API on how many reviews can be retrieved for a place. That part is handled by an [Azure Durable Function](https://learn.microsoft.com/en-us/azure/azure-functions/durable/durable-functions-overview). The review data is used for AI-driven sentiment analysis, with the goal of generating adjectives to describe the ambience of each place. This feature is a work in progress and should be visible soon, though it's not live yet (as of Fall 2024).

Overall, I can't say I'm terribly enthusiastic about Azure Functions. They work, but the Python implementation has some [annoying bugs](https://www.reddit.com/r/AZURE/comments/1cuz049/azure_function_swallows_a_build_error_no_way_to/). This is one area of the project in scope for a rewrite. I've got my eye on Vercel Serverless Functions, which also [support Python](https://vercel.com/docs/functions/runtimes/python). I'm already hosting on Vercel and using Next.js. Might as well complete the trifecta. You might ask, aren't you worried about platform lock in? I'd say no, I'm not. Maybe I should be, but I'm not. I try not to [worry about tomorrow](https://www.biblegateway.com/passage/?search=Matthew%206%3A33-34&version=NKJV). Also, I'm not running an Enterprise software solution out here. It's a side project. If Vercel goes down, I'll be screwed alongside plenty of others out there. At least we'll be suffering together.

### Others

Here's other stuff that was used for this project.

* [GitHub Actions](https://docs.github.com/en/actions) - Automation for tasks like periodically refreshing Airtable with data from Google Maps, deploying changes for the Azure Function, and deploying the site itself to Vercel. It's a powerful tool, well built, very demure. I don't think I used that now [memeable](https://www.reddit.com/r/OutOfTheLoop/comments/1ermjck/whats_the_deal_with_social_media_using_demure/) word right. I don't care.
* [Microsoft Designer](https://designer.microsoft.com/) - It's a bit more than just a wrapper around [DALL-E](https://en.wikipedia.org/wiki/DALL-E). Microsoft has some really cool stuff going on here. Most notably, you can create AI generated icons without a background, so full cutout style. That's how I got some of the imagery for the site. The thumbnail for this article was generated using Designer as well.
* [Python](https://www.python.org/) - My favorite programming language, used for all the data interactions with the Google Maps API, Airtable, Azure Functions, etc.
* [TypeScript](https://www.typescriptlang.org/) - My chosen language for writing React code (the other option is vanilla JavaScript). If you're coming from the backend side of engineering, I can't suggest TypeScript enough. It'll help you stay sane.
* [React Icons](https://react-icons.github.io/react-icons/) - This is cool. You install 1 library and can access just about every Icon set out there. My [Icons](https://github.com/segunak/charlotte-third-places/blob/master/charlotte-third-places/components/Icons.tsx) component makes full use of this. Great project.
* [AG Grid](https://www.ag-grid.com/) - A seriously awesome data grid/table solution. The team of developers here really outdid themselves. The home page of Charlotte Third Places with cards for each place is built on AG Grid. It's how all the filtering and sorting is made possible. Whenever I wanted to try and add a feature to the list logic, I'd find it as a simple configuration option in AG Grid. This thing was built by developers for developers, and it's awesome.
* [Incremental Static Regeneration](https://nextjs.org/docs/app/building-your-application/data-fetching/incremental-static-regeneration) - This feature from Next.js prevents me from hitting Airtable's API limits. When you visit Charlotte Third Places, the page doesn't immediately make an API call to Airtable. Instead, the data is fetched every `n` hours, cached, and then served to users until the next refresh. It's a nifty feature, a static page that doesn't have to be fully static. I know I memed about this feature being overkill earlier in this article, only to reveal now that I'm using it. Well, I can poke fun at something and still acknowledge its merits, can't I? Why yes indeed, I think I can.
* [React Google Maps](https://visgl.github.io/react-google-maps/) - A project by [vis.gl](https://vis.gl/) that's responsible for the embedded map view of the places. There's confusion as to what library is **the** library to use if you're implementing Google Maps in React. This is the one Google now [officially recommends](https://mapsplatform.google.com/resources/blog/introducing-react-components-for-the-maps-javascript-api/), but it took them a while to get there. There was great need for standardization, see [this post](https://www.reddit.com/r/react/comments/xvlte1/navigating_the_react_x_google_maps_wild_west/) for details on how convoluted the Google Maps in React space is (or was).

## Tools I Explored But Didn't Use

Here's some tools I explored but ultimately didn't use for the project.

* [React Native](https://reactnative.dev/) - My first thought for this project was to make it a cross-platform application. Web, iOS, and Android, all using 1 codebase. I did a lot of React Native vs. Flutter research and settled on React Native after some [drama](https://news.ycombinator.com/item?id=38381573) in the Flutter community regarding Google's direction for the project. After about a month of working with React Native (and [Expo](https://expo.dev/), which is actually great), I was like, [it's a no from me dawg](https://www.google.com/search?q=Randy+Jackson+American+Idol+It%27s+a+No+From+Me+Dawg+Origin). This is a side project. A passion project. A hobby project. React Native was giving me headaches I just couldn't justify for something I wanted to work on for fun. Pivoting to a *simple* React website made development a lot more fun.
* [Flutter](https://flutter.dev/) - I'll start by saying, any framework made or maintained by Google gives me anxiety. Their infamous reputation for killing products has impacted me more than once. I'm scarred, as are many others. Just check out the [Google Graveyard](https://killedbygoogle.com/) to see some examples. That being said, I gave Flutter a full unbiased evaluation, and there was a lot to like, and some stuff to be concerned about. This [article](https://stackoverflow.blog/2022/10/31/comparing-frameworks-for-cross-platform-apps-flutter-vs-react-native/) from Stack Overflow helped a lot in my evaluation. Another thing that increased my apprehension with Flutter is its use of [Dart](https://dart.dev/). It's just not a language I was looking to build expertise in. Read through [this thread](https://www.reddit.com/r/dartlang/comments/11xe6sz/why_isnt_dart_used_more/) for commentary on why it isn't more used as a programming language.

## Closing Thoughts

There you have it, the tech stack revealed. Charlotte Third Places was a labor of love born from a passion to explore and grow. It could've been simpler, but embracing *a bit* of complexity turned it into a rewarding challenge that pushed me to learn more. If you've read this far, thanks for reading! You can check out the project using the links below.

* **Website:** <https://charlottethirdplaces.com>
* **GitHub:** <https://github.com/segunak/charlotte-third-places>
