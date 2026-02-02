---
title: "Adventures in AI Engineering: What I Learned Building AI-Ready Data for Charlotte Third Places"
excerpt: "My journey from 'just adding a chatbot' to understanding vector embeddings, semantic search, retrieval-augmented generation, and making databases that AI actually understands"
toc: true
toc_sticky: true
toc_label: "On This Page"
toc_icon: "database"
last_modified_at: 
header:
  teaser: /assets/images/ai-engineering-databases-banner.webp
  og_image: /assets/images/ai-engineering-databases-banner.webp
  overlay_image: /assets/images/ai-engineering-databases-banner.webp
  overlay_filter: 0.6
categories:
  - blog
tags:
  - artificial-intelligence
---

<script src="/assets/js/dynamic-link-targeting.js"></script>

<style>
  /* Tablet and larger */
  @media (min-width: 768px) {
      .page__hero--overlay {
          padding: 10em 0;
      }
  }
</style>

**Note:** You can skip the preamble and get straight to the learnings [by clicking here](#the-challenge-making-data-ai-friendly).
{: .notice--info}

## Some Background

In what feels like _[four score and seven years ago](https://en.wikipedia.org/wiki/Gettysburg_Address)_ (last year), I launched [Charlotte Third Places](https://charlottethirdplaces.com), a site to help people discover coffee shops, cafes, bookstores, libraries, and other "[third places](https://en.wikipedia.org/wiki/Third_place)" around [Charlotte, North Carolina](https://en.wikipedia.org/wiki/Charlotte,_North_Carolina).

Third places are spots outside of home (your "first place") and work/school (your "second place") where you can hang out, build community, and relax. When I launched the site, [I wrote about how it started and the tech behind it](https://segunakinyemi.com/blog/charlotte-third-places-tech-stack/).

But therein lies the reality of software development. You're never really "done", especially on hobby projects. You always find something to add, improve, tweak, or change. The [project's history](https://github.com/segunak/charlotte-third-places/commits/master/) shows as much.

## When the Roots Shift, the Tree Must Learn to Dance

And so, there I was at [Amélie's French Bakery & Café](https://www.charlottethirdplaces.com/places/recpfmxH0JABVbhCV) (one of my favorite third places) when a thought came to mind. Given the unrelenting [Kamehameha wave](https://dragonball.fandom.com/wiki/Kamehameha) of AI-related stuff that tech workers everywhere are facing right now, it'd be prudent to upskill along that track.

AI is undoubtedly [reshaping tech careers](https://segunakinyemi.com/blog/ai-in-tech-careers/). I needed hands-on experience with the growing field of [AI Engineering](https://www.latent.space/p/ai,-engineer) outside of work (where AI is everywhere but driven by business needs) if I wanted to keep up.

The old paradigm where you tell yourself "_If I just become an expert in Java (ew) or C# or C++ or JavaScript or Python or some framework like [Spring](https://en.wikipedia.org/wiki/Spring_Framework) or [.NET](https://en.wikipedia.org/wiki/.NET) or [React](https://en.wikipedia.org/wiki/React_(software)), then I'll have job security and [big tech](https://en.wikipedia.org/wiki/Big_Tech) will want me_" is changing fast. It's safe to say it's already over.

There's still value in technical skills, just in different ways than before. The easiest parallel I can think of is driving a car. You don't need to understand how an engine works to be a good driver, no matter what your dad says. You can drive [an automatic](https://en.wikipedia.org/wiki/Automatic_transmission) just fine without knowing a thing about cars if your goal is just to navigate traffic.

AI is doing something similar to tech jobs, but this isn't new. [Assembly](https://en.wikipedia.org/wiki/Assembly_language) freed us from [punch cards](https://en.wikipedia.org/wiki/Punched_card), [high-level languages](https://en.wikipedia.org/wiki/High-level_programming_language#Relative_meaning) freed us from [memory management](https://en.wikipedia.org/wiki/Memory_management), [low-code platforms](https://en.wikipedia.org/wiki/Low-code_development_platform) freed us from [boilerplate](https://www.google.com/search?q=boilerplate+code+meaning).

Each wave let people with domain knowledge and decent technical skills have massive impact without mastering the layer below. AI is doing something similar, although [not all agree](https://shiftmag.dev/the-illusion-of-vibe-coding-5297/#:~:text=It%E2%80%99s%20Not%20the%20Same%20as%20Replacing%20Assembly). Regardless, given this shift, you either flow with the times or risk becoming irrelevant. _[Be water, my friend](https://www.google.com/search?q=Be+water+my+friend+Bruce+Lee+quote)_.

## My Learning Laboratory

So, when I looked at my [perfectly functional website](https://www.charlottethirdplaces.com/) and thought, "Let's add AI", it wasn't random restlessness.

It was a strategic step towards building new skills to stay relevant in a rapidly evolving field (_or until [AGI](https://en.wikipedia.org/wiki/Artificial_general_intelligence) makes us all obsolete, at which point I'm moving to [Alentejo](https://en.wikipedia.org/wiki/Alentejo#Economy) and becoming a farmer_). Learning new things is easier when you apply them to stuff you actually care about.

That decision sent me on a journey through what's now being dubbed "[AI Engineering](https://www.latent.space/p/ai-engineer)". Turns out, building effective AI applications isn't just about pointing an [LLM](https://en.wikipedia.org/wiki/Large_language_model) at your data and hoping for the best. There's actual engineering involved.

If you're curious about making AI useful for your data, from the basics (what's an "embedding"?) to the advanced stuff ([vector indexing strategies](https://supabase.com/docs/guides/ai/vector-indexes)), here's what I learned.

## The Challenge: Making Data AI-Friendly

My goal was simple. Build a chatbot with expertise in Charlotte's third places by connecting it to the site's no-frills, low-code, lovably simple [Airtable](https://airtable.com/) database.

The data was already organized, so I thought I'd let an LLM run something like `SELECT ImportantColumn1, ImportantColumn2 FROM ImportantTable` and sift through the results to produce a marvelous answer.

How naive I was. In practice, things rarely work like that.

Sure, you can technically do this (an MCP server calling Airtable's API, for example), and for exact, schema-aligned questions it will work. But it often won't deliver the rich, contextual answers that [retrieval-augmented generation (RAG)](https://en.wikipedia.org/wiki/Retrieval-augmented_generation) can. My data was organized for precise look-ups ("show me all coffee shops"), but AI needs to understand meaning ("show me cozy laptop-friendly places with eclectic vibes") to provide value to users.

You can't just point AI at your data and expect magic.

This is where [semantic search](https://cloud.google.com/discover/what-is-semantic-search) comes in. Instead of matching exact words, it compares meanings, so it can link "cozy laptop-friendly places" with reviews mentioning "comfortable atmosphere" or "great for working" even though the exact phrases differ.

Now, the real question is...

<div class="meme-container">
  <div class="meme-wrapper">
    <img alt="You Name It Meme" src="/assets/images/how-blac-youngsta.gif" />
  </div>
</div>

## The Solution: Turning Words Into Numbers

Here's where we get into the real genius work that Machine Learning Engineers, Data Scientists, and Mathematicians have been doing for decades. These are the people who figured out how to make computers understand meaning. We [AI Engineers](https://www.latent.space/p/ai-engineer) are just using the cars they invented. They built the engine, we're driving it to new places.

The breakthrough came from teaching [neural networks](https://en.wikipedia.org/wiki/Neural_network_(machine_learning)) (computer programs that learn patterns like your brain does) to predict missing words in sentences. Feed the network millions of examples like "The cat sat on the ___" and it learns that "mat," "floor," and "couch" all fit. Through this training, the network develops an internal representation of how words relate to each other. That representation becomes the embeddings.

For an approachable explanation, check out [this completely non-technical breakdown](https://www.parand.com/a-completely-non-technical-explanation-of-ai.html). Or if you're super nerdy and want the academic deep dive, these foundational papers explain the breakthroughs.

* Google's [2013 "Efficient Estimation of Word Representations in Vector Space"](https://arxiv.org/abs/1301.3781) that started it all.
* Google's [2017 "Attention Is All You Need" paper](https://arxiv.org/abs/1706.03762) that revolutionized everything (invented the "T" for "Transformers" in "GPT").

**Aside:** Other companies might be in the lead, but Google are the ones who pushed us to where we are today with AI. They deserve their flowers!
{: .notice--info}

Anyways, AI models (not vector databases, those just store the results) turn words into lists of numbers called embeddings. When I type "cozy coffee shop," an AI model converts that into something like `[0.2, -0.1, 0.8, ...]`. These numbers represent the meaning in mathematical space.

**Terminology Check:** When people say "embeddings," "vectors," or "vector embeddings," they're talking about the same thing. Lists of numbers. AI folks say "embeddings," math folks say "vectors," database folks use both. Don't let the jargon trip you up.
{: .notice--warning}

The magic happens because similar phrases get similar numbers. For example:

* "cozy coffee shop" becomes `[0.2, -0.1, 0.8, ...]`
* "comfortable cafe" becomes `[0.19, -0.09, 0.79, ...]` (super close!)
* "loud nightclub" becomes `[-0.4, 0.6, -0.2, ...]` (totally different!)

So when someone searches for "quiet study spot", it finds places described as "peaceful atmosphere" or "great for working" because their number representations are close together in mathematical space. **The computer doesn't know what "cozy" means**. It just knows these numbers are similar.

Think of it like GPS coordinates. Charlotte and [Raleigh](https://segunakinyemi.com/blog/dough-diaries-raleigh/) have similar coordinates because they're geographically close. London and Charlotte have very different coordinates because they're far apart. Embeddings do the same thing but with meaning instead of geography.

To LLMs, it's all math. The models from OpenAI, Anthropic, Meta, and Google work because they turned massive amounts of text from articles, essays, transcripts, research papers, legal documents, books, social media posts...

<div class="meme-container">
  <div class="meme-wrapper">
    <img alt="You Name It Meme" src="/assets/images/you-name-it.gif" />
  </div>
</div>

...and turned them into numbers.

**Aside:** If you're still curious about the technical details, [this MIT video is worth watching](https://www.youtube.com/watch?v=4fThhooNvA0).
{: .notice--info}

## The Reality: Making Your Data AI-Ready

If you want an LLM to be an expert in your data, you've got to turn it into numbers. The good news is you don't need to be good at math, or do any math at all, to do this.

[Vector databases](https://en.wikipedia.org/wiki/Vector_database) handle the heavy lifting. Think of them as specialized databases where everything is stored as these number lists (vectors, or embeddings, or vector embeddings, same thing) representing meaning.

This is where [Retrieval-Augmented Generation (RAG)](https://en.wikipedia.org/wiki/Retrieval-augmented_generation) comes in. Instead of hoping the AI remembers facts from its training, RAG lets it search your actual data and quote real information.

**Without RAG:** "Tell me about quiet coffee shops in [South End](https://en.wikipedia.org/wiki/South_End,_Charlotte)"

AI might respond: "_Blue Mountain State Coffee on South Blvd is very quiet_" (a hallucination, it doesn't exist)

**With RAG:** "Tell me about quiet coffee shops in [South End](https://en.wikipedia.org/wiki/South_End,_Charlotte)"

AI searches your vector database, finds real reviews, and responds: "_[ROOTS Cafe](https://maps.app.goo.gl/sNSzQhvno3o1hm839) in South End is described as 'perfect for working and chilling with a book' but only in the afternoons/evenings after the lunch crowd clears out. Note that South End is one of Charlotte's hottest neighborhoods, dominated by people in their 20s and 30s trying to extend the college life. It's honestly the worst place in the city to go looking for calm and quiet vibes, except ROOTS manages to have that at certain times of day._"

Without RAG, you're hoping the AI happened to see accurate Charlotte coffee shop data during training. With RAG, you guarantee it quotes real information from your database.

**Your AI is only as good as the vector database behind it.** Most bad chatbots aren't proof that AI is overhyped. They're proof that engineers don't know how to organize data for AI yet. I didn't either until this journey.

That's where [context engineering](https://www.philschmid.de/context-engineering) comes in, the [core of AI Engineering](https://rlancemartin.github.io/2025/06/23/context_engineering/). It's about structuring your domain knowledge so AI can use it effectively.

You can't just tell AI "be like ChatGPT but for our data." Someone **at least nominally technical** (_smells like job opportunity to me_) needs to organize that data properly.












































## The Technical Deep Dive: How I Actually Built This Thing

Once I understood embeddings conceptually, I had to figure out how to actually implement them. This is where things got interesting (and where PostgreSQL proved, once again, why it's the [best database in existence](https://www.amazingcto.com/postgres-for-everything/)).

### The Database Schema: Designing for AI

I ended up rebuilding my entire data storage around what I'm calling an "AI-first architecture." This approach is gaining traction across the industry, with companies like [Notion](https://www.latent.space/p/ai-interfaces-and-notion), [Replit](https://www.latent.space/p/reza-shabani), and others leading the way in integrating AI into core product functionality. Instead of just storing place names and addresses, I needed to store:

**Core place data** (the stuff humans care about):

```sql
google_maps_place_id    TEXT PRIMARY KEY    -- Stable Google identifier
place_name              TEXT NOT NULL       -- What humans call it
latitude, longitude     DOUBLE PRECISION    -- GPS coordinates
address                 TEXT                -- Where humans can find it
neighborhood            TEXT                -- Charlotte area designation
```

**AI-optimized data** (the stuff computers care about):

```sql
enriched_data           JSONB               -- Complete Google Places API response
reviews_tsv             TSVECTOR            -- Traditional full-text search index
embedding               VECTOR(1536)        -- The AI "meaning" representation
```

That `VECTOR(1536)` column is where the magic happens. Using PostgreSQL's [pgvector extension](https://github.com/pgvector/pgvector), I can store those 1,536-number embeddings directly in the database and search them at lightning speed.

The PostgreSQL community has done incredible work here. For those interested in the technical details, [Use The Index, Luke!](https://use-the-index-luke.com/) remains the gold standard for understanding database indexing fundamentals, while the [PostgreSQL Performance Wiki](https://wiki.postgresql.org/wiki/Performance_Optimization) covers advanced optimization techniques.

### The Data Pipeline: From Text to Numbers

Here's how text becomes searchable AI magic:

1. **Extract text:** Pull descriptions, reviews, and other text content
2. **Send to AI service:** Ship it to OpenAI's embedding API
3. **Get numbers back:** Receive 1,536 numbers representing the meaning
4. **Store in database:** Save those numbers in the `VECTOR(1536)` column
5. **Index for speed:** Create specialized indexes for fast similarity search

The code looks something like this (simplified):

```python
import openai
import psycopg2

# Convert text to embedding
response = openai.Embedding.create(
    input="This coffee shop has a cozy atmosphere",
    model="text-embedding-ada-002"
)
embedding = response['data'][0]['embedding']

# Store in PostgreSQL
cursor.execute(
    "INSERT INTO places (place_name, embedding) VALUES (%s, %s)",
    ("Common Market", embedding)
)
```

### Vector Similarity Search: Finding "Similar Meanings"

Once you have embeddings stored, searching becomes a matter of mathematical distance. PostgreSQL's `<->` operator calculates the distance between vectors in 1,536-dimensional space. Closer distance means more similar meaning.

```sql
-- Find places semantically similar to a concept
SELECT place_name, neighborhood,
       embedding <-> get_embedding('quiet study spot')::vector as meaning_distance
FROM places 
ORDER BY meaning_distance  -- Closest meaning first
LIMIT 5;
```

This is where it gets wild. Someone searches for "quiet study spot" and finds places described as "peaceful reading corner," "calm workspace," or "silent library atmosphere" even though the exact words don't match. Traditional keyword search would miss these completely.

### The Performance Challenge: Making It Fast

Here's where I learned about vector indexes, specifically something called HNSW (Hierarchical Navigable Small World). Without getting too deep into the math, HNSW creates a multi-layered graph structure that lets PostgreSQL quickly navigate to similar embeddings instead of calculating distance to every single embedding.

```sql
CREATE INDEX idx_places_embedding 
    ON places USING hnsw (embedding vector_l2_ops);
```

This single index took my search times from 2-5 seconds (unacceptably slow) to 50-200ms (blazing fast). The beauty of HNSW is that it's robust against changing data. Unlike older approaches like IVFFLAT that require careful timing and may need rebuilding as your data grows, HNSW indexes adapt automatically as you add new data.

Why does this matter? Because when you're building a real system, you don't want to worry about when to create indexes or whether your performance will degrade as you add more places to your database. HNSW just works.

## RAG: Making AI Quote Real Sources (Not Make Things Up)

The next concept that blew my mind was RAG (Retrieval Augmented Generation). This is the difference between an AI that makes things up versus an AI that quotes real information from your database.

RAG has become one of the hottest topics in AI Engineering. The [r/LangChain](https://www.reddit.com/r/LangChain/) community regularly discusses implementation strategies, while [Anthropic's research](https://docs.anthropic.com/claude/docs/guide-to-rag) provides excellent theoretical foundations.

**Without RAG:** User asks "Are there quiet coffee shops in South End?" and the AI responds "Yes! Blue Mountain Coffee on Park Road is very quiet and popular with students." Problem: Blue Mountain Coffee doesn't exist. The AI invented it.

**With RAG:** Same question, but the AI responds "Based on customer reviews, Common Market in South End is described as 'perfect for laptop work with minimal background noise' and customers note it's 'great for studying, never too crowded.'" These are real quotes from real customer reviews in your database.

### Review Chunking: Breaking Big Text into Smart Pieces

RAG works best when you break large text (like 500-word Google reviews) into smaller, focused chunks. Instead of giving the AI an entire review about everything (coffee quality, parking, wifi, atmosphere, staff), you give it 2-3 sentence chunks, each focused on one aspect.

```sql
-- Example: One review becomes multiple searchable chunks
review_chunk_id         BIGSERIAL PRIMARY KEY
google_maps_place_id    TEXT REFERENCES places
chunk_text              TEXT                -- "The wifi is super fast and reliable."
chunk_embedding         VECTOR(1536)        -- Embedding for this specific chunk
```

Now when someone asks about wifi, you can return the exact chunk that mentions "wifi is super fast and reliable" instead of a 500-word review where wifi is mentioned once in passing.

## Index Strategy: The Secret Sauce of Fast AI Search

Building an AI-powered database isn't just about storing embeddings. You need multiple types of indexes working together:

**HNSW indexes** for vector similarity:

```sql
CREATE INDEX idx_places_embedding 
    ON places USING hnsw (embedding vector_l2_ops);
```

**GIN indexes** for array and text search:

```sql
CREATE INDEX idx_places_tags ON places USING gin (tags);
CREATE INDEX idx_places_reviews_tsv ON places USING gin (reviews_tsv);
```

**BTREE indexes** for exact matches:

```sql
CREATE INDEX idx_places_neighborhood ON places (neighborhood);
```

**Trigram indexes** for typo-tolerant search:

```sql
CREATE INDEX idx_places_name_trgm ON places USING gin (lower(place_name) gin_trgm_ops);
```

Each index type solves different problems. HNSW handles "find similar meanings," GIN handles "search across arrays of tags," BTREE handles "exact matches," and trigram handles "find Starbucks when user types starbks."

The performance difference is dramatic. Without proper indexes, finding coffee shops with wifi might take 2-5 seconds. With the right indexes, it takes 5-50ms. That's the difference between users waiting impatiently and users thinking your app is magic.

For those who want to dive deeper into PostgreSQL performance optimization, the [PostgreSQL community](https://www.postgresql.org/community/) maintains excellent documentation, and the [#postgresql](https://www.reddit.com/r/PostgreSQL/) subreddit is invaluable for troubleshooting specific performance issues.

## Lessons Learned: Why This Matters Beyond Charlotte Third Places

After months of deliberately building this system to learn AI Engineering, here are the big takeaways:

### 1. Technical People Are More Important Than Ever

Despite all the "AI will replace programmers" hype, building effective AI applications requires deep technical knowledge. You need to understand data structures, indexing strategies, query optimization, and how to organize information for machine consumption. The role isn't disappearing, it's evolving into something the industry calls [AI Engineering](https://www.latent.space/p/ai-engineer).

As [Thomas Dohmke pointed out](https://github.blog/news-insights/product-news/github-copilot-the-agent-awakens/) in his piece about GitHub Copilot's Agent Mode, AI tools are enhancing developers, not replacing them. The key is learning to work *with* these tools rather than against them.

### 2. Context Engineering Is the New Critical Skill

The most valuable skill in the AI era might be ["context engineering"](https://www.philschmid.de/context-engineering): taking messy, human-readable data and organizing it so AI can extract maximum value. This isn't just about databases, it's about understanding how AI models consume and process information.

[Simon Willison's work](https://simonwillison.net/2025/Jun/27/context-engineering/) on context engineering has been particularly influential in how I think about this challenge. The [LangChain community](https://blog.langchain.com/the-rise-of-context-engineering/) has also produced excellent resources on this topic.

### 3. Domain Knowledge + Technical Skills = Competitive Advantage

Companies with massive amounts of data can't just point AI at everything and expect ChatGPT-level results. They need people who understand both the domain (what makes a good third place?) and the technology (how do embeddings work?) to bridge that gap.

### 4. The Database Is the Foundation

All the fancy AI in the world won't help if your data is poorly organized. Getting the database schema right, creating the right indexes, and designing for both human and machine consumption is still fundamental engineering work.

This aligns with what I learned building the [original Charlotte Third Places tech stack](https://segunakinyemi.com/blog/charlotte-third-places-tech-stack/): sometimes the most important decisions are the foundational ones that enable everything else to work properly.

## The Practical Stuff: Resources to Learn More

If you want to dive deeper into AI-powered databases, here are the resources that actually helped me:

**Understanding Embeddings:**

- [OpenAI's Guide to Embeddings](https://platform.openai.com/docs/guides/embeddings) - The authoritative source
- [What are Vector Embeddings?](https://www.pinecone.io/learn/vector-embeddings/) - Excellent visual explanations
- [Hugging Face NLP Course](https://huggingface.co/course/chapter2/1) - Deep dive into how transformers create embeddings

**Vector Databases and Performance:**

- [pgvector Documentation](https://github.com/pgvector/pgvector) - PostgreSQL vector extension
- [Pinecone Learning Center](https://www.pinecone.io/learn/) - Vector database concepts
- [Use The Index, Luke!](https://use-the-index-luke.com/) - Database indexing fundamentals
- [PostgreSQL Performance Tips](https://wiki.postgresql.org/wiki/Performance_Optimization) - Advanced optimization

**RAG and AI Applications:**

- [LangChain RAG Tutorial](https://python.langchain.com/docs/tutorials/rag/) - Practical implementation  
- [Anthropic's Guide to RAG](https://docs.anthropic.com/claude/docs/guide-to-rag) - Conceptual overview
- [r/LangChain](https://www.reddit.com/r/LangChain/) - Community discussions and troubleshooting

**AI Engineering Communities:**

- [r/LocalLLaMA](https://www.reddit.com/r/LocalLLaMA/) - Open source models and local deployment
- [r/MachineLearning](https://www.reddit.com/r/MachineLearning/) - Latest research and practical applications
- [Latent Space Newsletter](https://www.latent.space/) - AI Engineer community and insights
- [AI Engineer Summit](https://www.ai.engineer/summit) - Premier conference for AI Engineers

## Wrapping Up: The Deliberate Path Forward

Building the AI features for Charlotte Third Places wasn't just about making a better chatbot. It was about positioning myself for a rapidly changing industry. As I wrote in my piece about [AI in tech careers](https://segunakinyemi.com/blog/ai-in-tech-careers/), the question isn't whether AI will impact your career, but how you'll adapt to stay relevant.

The companies that will win in the AI era aren't the ones with the biggest models or the most data. They're the ones with the best-organized data and the technical talent to make AI systems that actually work. That's where the [AI Engineer](https://www.latent.space/p/ai-engineer) role becomes critical.

As software engineers, we're not becoming obsolete. We're evolving. As I discussed in my article about [GitHub Copilot's Agent Mode](https://segunakinyemi.com/blog/github-copilot-agent-mode/), the skills are changing, but the fundamental need for people who understand both technology and domain problems isn't going anywhere. In fact, it's becoming more valuable.

This project taught me that learning AI Engineering through real projects beats tutorial hell every time. I'm still over-engineering things for the sake of learning, but now instead of just playing with frontend frameworks, I'm building systems that make AI actually useful. And it's some of the most fun I've had as a developer in years.

The landscape is shifting fast. As I've written before, you either [flow with the times or risk becoming irrelevant](https://segunakinyemi.com/blog/github-copilot-agent-mode/). You can either adapt with intention, or risk being left behind. I chose to adapt. The question is: what will you choose?

---

*If you're interested in seeing the actual implementation, check out the [Charlotte Third Places GitHub repo](https://github.com/segunak/charlotte-third-places). The database schema and AI implementation are all open source. And if you're ever in Charlotte, definitely try out the [site](https://charlottethirdplaces.com) to find some great third places. That's the whole point of this project, after all.*

## Additional Learning Resources

If this article sparked your interest in AI Engineering, here are some additional resources I recommend:

**My Other Writing on AI:**

- [GitHub Copilot's Agent Mode](https://segunakinyemi.com/blog/github-copilot-agent-mode/) - How AI tools are enhancing (not replacing) developers
- [Natural Language Programming](https://segunakinyemi.com/blog/natural-language-programming/) - Making development more accessible through AI
- [On AI in Tech Careers](https://segunakinyemi.com/blog/ai-in-tech-careers/) - Navigating career transitions in the AI era

**Technical Deep Dives:**

- [Hugging Face NLP Course](https://huggingface.co/course/) - Comprehensive guide to transformers and embeddings
- [FastAPI Documentation](https://fastapi.tiangolo.com/) - Building APIs that serve AI models
- [Supabase AI & Vectors Guide](https://supabase.com/docs/guides/ai) - Practical vector database implementation

**Stay Current:**

- Subscribe to the [Latent Space newsletter](https://www.latent.space/) for AI Engineering insights
- Join [r/LocalLLaMA](https://www.reddit.com/r/LocalLLaMA/) for open source AI discussions
- Follow developments in [r/MachineLearning](https://www.reddit.com/r/MachineLearning/) for research updates

The field moves fast, but the fundamentals we've covered here will serve you well as you build your own AI-powered applications.

*Check out the [Charlotte Third Places GitHub repo](https://github.com/segunak/charlotte-third-places) for the implementation. And if you're in Charlotte, use the [site](https://charlottethirdplaces.com) to find your new favorite third place!*
{: .notice--primary}