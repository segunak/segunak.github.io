---
title: "How To Have a Link With Spaces in Markdown"
excerpt: "You can link to files, folders, websites, or anything with spaces in it, using this one simple Markdown trick (intentional built-in feature)."
last_modified_at: 2026-08-13T20:14:57
classes: wide
header:
  teaser: /assets/images/misc/markdown-image.jpg
categories:
  - blog
tags:
  - tech
---


I recently edited some [Markdown](https://www.markdownguide.org/) files that needed to link to documents with spaces in their name. I had never done that before and set out to discover how to make it happen. Here's what I learned.

You can have a [markdown link](https://www.markdownguide.org/basic-syntax/#links) with spaces by wrapping the URL in angle brackets (`<>`).

```Markdown
[link](<Your Link With Spaces Here>)
```

This solution should work on most all flavors of Markdown, as it's defined in the [Common Mark](https://spec.commonmark.org/0.30/#example-485) standard that's used by [Discourse](https://www.discourse.org/), [GitHub](https://github.com/about), [GitLab](https://about.gitlab.com/), [Reddit](https://www.reddit.com/), [Qt](https://www.qt.io/), [Stack Overflow](https://stackoverflow.com/), [Stack Exchange](https://stackexchange.com/), and [Swift](https://developer.apple.com/swift/). Here are some examples.

```Markdown
[Some Caption](<https://www.google.com/search?q=how to have spaces in markdown link>)
```

```Markdown
[Krabby Patty Formula](<./Secret Files/Krabby Patty Formula.md>)
```

```Markdown
![StLouisArchImage](<./St Louis Arch.jpg>)
```

Now that you know how to link to items with spaces in Markdown, try to avoid doing so. You're best off just not having spaces in the name of a file, folder, or URL. Don't take my word for it though, the [engineering community](https://superuser.com/questions/29111/what-technical-reasons-exist-for-not-using-space-characters-in-file-names) is in agreement on this one. You can use dashes, underscores, or [casing styles](https://stackoverflow.com/questions/17326185/what-are-the-different-kinds-of-cases), just do whatever you can to avoid spaces in names.

But sometimes, it's out of your control. In that case, do what you got to do, much like a wise man once did [_a long time ago in a galaxy far far away_](https://starwars.fandom.com/wiki/Duel_on_Mustafar).

<div class="meme-container">
  <div class="meme-wrapper">
    <img alt="Obi Wan Do What I Must" src="/assets/gifs/obi-wan-must.gif"/>
  </div>
</div>
