---
title: "Favorite Quotes"
excerpt: "A collection of awesome quotes from various sources."
last_modified_at:
classes: wide
header:
  teaser: /assets/images/coolkingdom.jpg
categories:
  - blog
tags:
  - miscellaneous
---

<script src="/assets/js/dynamic-link-targeting.js"></script>

<style>
  .quote-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 2fr;
    grid-column-gap: 5px;
    grid-row-gap: 5px;
    justify-items: stretch;
    align-items: start;
  }

  /* X-Small devices (portrait phones, less than 576px) */
  @media (max-width: 575.98px) {
    .quote-container {
      grid-template-columns: repeat(1, 1fr);
    }

    blockquote {
      margin: 1em 0 1em 0;
      border-bottom: 1px solid #cecfd1;
    }
  }

  /* Small devices (landscape phones, less than 768px) */
  @media (max-width: 767.98px) {
    .quote-container {
      grid-template-columns: repeat(1, 1fr);
    }

    blockquote {
      margin: 1em 0 1em 0;
      border-bottom: 1px solid #cecfd1;
    }
  }
</style>

<script>
  /*
    This code does the following:
    1. When the page loads, it selects all the blockquote elements within the quote-container div.
    2. It checks if there is an odd number of blockquotes. If so, it removes the last one from the
      quote-container and places it just below the quote-container div.
    3. It then sorts the remaining blockquotes based on the length of their text content. Blockquotes
      with similar text lengths will be placed next to each other.
    4. Finally, it rearranges the blockquotes within the quote-container div according to the sorted order,
      so that blockquotes with similar text lengths are grouped together.
  */
  window.addEventListener('load', function() {
    const quoteContainer = document.querySelector('.quote-container');
    const blockquotes = Array.from(quoteContainer.querySelectorAll('blockquote'));

    // Check if there is an odd number of blockquotes
    // If so, remove the last one and place it outside the quote-container
    if (blockquotes.length % 2 !== 0) {
      const lastBlockquote = blockquotes.pop();
      quoteContainer.removeChild(lastBlockquote);
      quoteContainer.parentNode.insertBefore(lastBlockquote, quoteContainer.nextSibling);
    }

    // Sort the blockquotes based on the length of their text content
    // Blockquotes with similar text lengths will be placed next to each other
    blockquotes.sort((a, b) => {
      const lengthA = a.innerText.length;
      const lengthB = b.innerText.length;
      return lengthA - lengthB;
    });

    // Rearrange the blockquotes in the quote-container according to the sorted order
    blockquotes.forEach(blockquote => {
      quoteContainer.appendChild(blockquote);
    });
  });
</script>

This page is an ongoing collection of some of my favorite quotes. I'll start with one that requires an annotation.

There's some controversy surrounding the quote below, as it's [often misinterpreted](https://www.google.com/search?q=The+Road+Not+Taken+is+misinterpeted) by those who wield it. Most famously, by John Keating (played by [Robin Williams](https://en.wikipedia.org/wiki/Robin_Williams)) in the film [The Dead Poets Society](https://en.wikipedia.org/wiki/Dead_Poets_Society), who used it to emphasize the importance of embracing nonconformity in becoming a free thinker. I'm aware of all such deliberations about the true meaning of this quote, I understand their rationale, their logic, and their unquestionable accuracy, and yet, I don't care. I prefer it as seen below, out of context, and unambiguous in its meaning. One could say I'm *embracing nonconformity* :wink:.

> Two roads diverged in a wood, and I - I took the one less traveled by, and that has made all the difference.
>
> <cite>[Robert Frost in "The Road Not Taken"](https://www.poetryfoundation.org/poems/44272/the-road-not-taken)</cite>

As much as I love that quote, there's someone I love a lot more who said something similar. Someone whose word I view as far more authoritative on the topic of life and all things concerning it.

> Enter by the narrow gate; for wide is the gate and broad is the way that leads to destruction, and there are many who go in by it. Because narrow is the gate and difficult is the way which leads to life, and there are few who find it.
>
> <cite>[Jesus Christ](https://www.biblegateway.com/passage/?search=Matthew+7%3A13&version=NKJV)</cite>

All that being said, enjoy the rest of some of my favorite quotes below!

<div class="quote-container" markdown="1">

> We need to read - above all the Word of God, but also history and biographies and great novels. If we don't read, we condemn ourselves to chronic stupidity and a conditioning by mass media that have no sympathy for the things we believe. If we fill our heads with poison and junk, we make ourselves angry and dumb.
>
> <cite>[Archbishop Charles Caput](https://catholicphilly.com/2017/07/homilies-speeches/whats-next-catholics-america-and-a-world-made-new/)</cite>


> For what it's worth: it's never too late or, in my case, too early to be whoever you want to be. There's no time limit, stop whenever you want. You can change or stay the same, there are no rules to this thing. We can make the best or the worst of it. I hope you make the best of it. And I hope you see things that startle you. I hope you feel things you never felt before. I hope you meet people with a different point of view. I hope you live a life you're proud of. And if you find that you're not, I hope you have the courage to start all over again
>
> <cite>[Francis Scott Fitzgerald](https://www.goodreads.com/quotes/7452670-for-what-it-s-worth-it-s-never-too-late-or-in)</cite>


> If you want to learn something, read about it. If you want to understand something, write about it. If you want to master something, teach it.
>
> <cite>[Yogi Bhajan](https://skeptics.stackexchange.com/questions/17873/did-harbhajan-singh-yogi-say-to-learn-something-read-about-it)</cite>


> It is better to trust in the Lord than to put confidence in man.
>
> <cite>[Psalm 118:8](https://www.biblegateway.com/passage/?search=Psalm+118&version=NKJV)</cite>


> Columbus went out not knowing where he was going; and when he got there he did not know where he was, and when he got back he did not know where he had been, and he did it all on other people's money.
>
> <cite>[A.W. Tozer in "The Purpose of Man: Designed to Worship"](https://www.google.com/search?q=The+Purpose+of+Man+A.W.+Tozer)</cite>


> Religion that God our Father accepts as pure and faultless is this: to look after orphans and widows in their distress and to keep oneself from being polluted by the world.
>
> <cite>[James 1:27](https://www.biblegateway.com/passage/?search=James+1%3A27&version=NIV)</cite>


> It is the mark of an educated mind to be able to entertain a thought without accepting it.
>
> <cite>[Aristotle](https://en.wikiquote.org/wiki/Aristotle#:~:text=It%20is%20the%20mark%20of%20an%20educated%20mind%20to%20be%20able%20to%20entertain%20a%20thought%20without%20accepting%20it.)</cite>


> Money will never be, and has never been, the mark of God's approval on someone's life.
>
> <cite>[Dr. Daniel Olukoya](https://www.google.com/search?q=Dr.+Daniel+Olukoya)</cite>


> I have set the Lord always before me: because He is at my right hand, I shall not be moved.
>
> <cite>[Psalm 16:8](https://www.biblegateway.com/passage/?search=Psalm+16%3A8&version=KJV)</cite>


> Through personal feeling true perspective is easily lost.
>
> <cite>[Thomas à  Kempis in "The Imitation of Christ"](https://en.wikipedia.org/wiki/The_Imitation_of_Christ)</cite>


> It is greater work to resist vices and passions than to sweat in physical toil.
>
> <cite>[Thomas à  Kempis in "The Imitation of Christ"](https://en.wikipedia.org/wiki/The_Imitation_of_Christ)</cite>


> A thing isn't beautiful because it lasts.
>
> <cite>[The Vision in "Avengers: Age of Ultron"](https://www.youtube.com/watch?v=SrSNQCa-C7A)</cite>


> For who is greater, he who sits at the table, or he who serves? Is it not he who sits at the table? Yet I am among you as the One who serves.
>
> <cite>[Luke 22:27](https://www.biblegateway.com/passage/?search=Luke%2022%3A27&version=NKJV)</cite>


> But suppose I had found a watch upon the ground, and it should be inquired how the watch happened to be in that place. Its mechanism being observed, the inference, we think, is inevitable, that the watch must have had a maker: that there must have existed, at some time, and at some place or other, an artificer or artificers who formed it for the purpose which we find it actually to answer; who comprehended its construction, and designed its use.
>
> <cite>[William Paley in "Natural Theology or Evidences of the Existence and Attributes of the Deity"](https://en.wikipedia.org/wiki/Natural_Theology_or_Evidences_of_the_Existence_and_Attributes_of_the_Deity)</cite>


> I believe that almost anyone who is seriously involved in any church will realize that churchgoing is not synonymous with personal spirituality. Having participated throughout my life in organized church and community service groups, I have found that attending church does not necessarily mean living the principles taught in those meetings. You can be active in a church and inactive in its gospel.
>
> <cite>[Stephen R. Covey in "The 7 Habits of Highly Effective People"](https://en.wikipedia.org/wiki/The_7_Habits_of_Highly_Effective_People)</cite>


> We live in a society that likes to approach things from a utilitarian eye, and there are advantages to that... But our society treats art too utilitarianly. It doesn't look at the primary purpose of art, which is making the artist's life more enriched. It's sincerely what I believe the primary purpose is. It is to make your life better by creating something... They will ask you when you're going to sell your writing. They're going to ask you if you're published. And that's OK. But I want you to understand that's not why you have to write. In fact, it's probably not why you should write. Writing is good for you. Expressing yourself is good for you. Creating art is good for you.
>
> <cite>[Brandon Sanderson](https://en.wikipedia.org/wiki/Brandon_Sanderson) in ["The Philosophy of Professional Writing" Lecture at Brigham Young University in 2025](https://youtu.be/MEUh_y1IFZY?si=cFKFsBD2CG3KUVEt&t=852)</cite>

</div>
