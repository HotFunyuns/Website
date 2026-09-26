---
{
  "title": "Why a Draft Pool Rotates, and How to Draft a Board You Cannot Memorise",
  "metaTitle": "Why Draft Pools Rotate, and How to Adapt",
  "description": "A rotating draft pool changes which positions are deep on every run. Why designers rotate it, and how to draft a board you cannot memorise in advance.",
  "status": "published",
  "publishedAt": "2026-09-22",
  "updatedAt": "2026-09-22",
  "author": "reign-creative-llc",
  "category": "sports-gm",
  "tags": [
    "draft",
    "rugby",
    "game design",
    "strategy"
  ],
  "primaryKeyword": "why do draft pools change",
  "secondaryKeywords": [
    "rotating draft pool",
    "randomised draft board",
    "draft pool variation",
    "how draft pools work",
    "draft board strategy",
    "positional scarcity in a draft"
  ],
  "intent": "informational",
  "longTailKeywords": [
    "why is the draft board different every time",
    "how to draft when the player pool changes",
    "what is positional scarcity in a draft",
    "is a rotating draft pool random"
  ],
  "aiSearchQuestions": [
    "Why does the draft pool change between runs?",
    "How do you draft well when you cannot memorise the board?",
    "What is positional scarcity and why does it move prices?",
    "Is a rotating draft pool the same as a random one?"
  ],
  "demandTier": "unverified-low",
  "relatedApps": [
    "rugby-draft-pro-league"
  ],
  "relatedArticles": [
    "what-makes-a-good-draft-board",
    "rugby-draft-and-squad-building",
    "snake-draft-vs-auction-draft",
    "drafting-a-goal-kicker-in-rugby"
  ],
  "takeaways": [
    "A rotating pool changes which positional groups are deep and which are thin on a given board, so scarcity — not talent — is the variable that moves between runs.",
    "Rotation is a design decision aimed at replay value: it removes the memorised opening and forces judgement about value and position fit, which is the skill a draft mode is trying to test.",
    "Recognition is easier than recall, and a board you have never seen strips out the recall crutch, which is why players who learned a sequence feel worse on a new pool even when their judgement has not changed.",
    "Drafting has the shape of an optimal-stopping problem — sequential, irrevocable choices under uncertainty — but it is not the classic secretary problem, because you can usually see the whole board and take more than one player.",
    "The method that transfers across boards is tiers plus replacement level: group players by how interchangeable they are, then spend where the gap between your pick and the next available body is largest."
  ],
  "disclaimer": "none",
  "featured": false,
  "faqs": [
    {
      "question": "Why does the draft board look different every time?",
      "answer": "Because the pool rotates. Instead of presenting the same ranked list on every run, the game draws a different slice of a much larger player pool, so the mix of forwards, backs, specialists and goal kickers available changes. The intent is replay value: a memorised opening stops working, and judgement has to do the work instead."
    },
    {
      "question": "Is a rotating pool the same as a random one?",
      "answer": "No. Random implies no structure. A rotating pool still has to produce a draftable board with the positional groups the sport needs, so what varies is depth and price within those groups rather than whether the groups exist. You are planning against shifting scarcity, not against noise."
    },
    {
      "question": "How do you draft well without memorising the board?",
      "answer": "Work in tiers rather than rankings. Group players into bands you would be roughly equally happy with, then spend early picks where the drop-off to the next tier is steepest. That method depends only on the board in front of you, so it survives any rotation, while a memorised pick order does not."
    },
    {
      "question": "Does scarcity mean you should always pay up?",
      "answer": "Not always. Scarcity raises price, and paying it is right when the position has no substitute and wrong when it has several. The test is what you would field if you missed: if the fallback is a meaningful downgrade with no alternative route, pay; if three similar players remain, wait and spend the difference elsewhere."
    }
  ],
  "sources": [
    {
      "title": "Optimal Stopping and Applications",
      "publisher": "Thomas S. Ferguson, Mathematics Department, UCLA",
      "url": "https://www.math.ucla.edu/~tom/Stopping/Contents.html",
      "accessed": "2026-09-21"
    },
    {
      "title": "Memory Recognition and Recall in User Interfaces",
      "publisher": "Nielsen Norman Group",
      "url": "https://www.nngroup.com/articles/recognition-and-recall/",
      "accessed": "2026-09-21"
    },
    {
      "title": "CMS.608 Game Design, Spring 2014",
      "publisher": "MIT OpenCourseWare",
      "url": "https://ocw.mit.edu/courses/cms-608-game-design-spring-2014/",
      "accessed": "2026-09-21"
    },
    {
      "title": "Procedural Content Generation in Games: A Textbook and an Overview of Current Research",
      "publisher": "Noor Shaker, Julian Togelius and Mark J. Nelson (Springer, 2016)",
      "url": "https://pcgbook.com/",
      "accessed": "2026-09-21"
    }
  ]
}
---

A rotating draft pool means the list of available players is redrawn between runs, so the board you see is a different slice of a much larger set each time. What changes is not usually the quality at the top — it is which positional groups are deep and which are thin, and therefore what everything costs.

That single fact explains most of the frustration players report with rotation. It feels like the game moved the goalposts. It did not: it removed the part of your preparation that was memorisation and left the part that was judgement.

## What is actually rotating

[24-0 Rugby Draft Pro League](/apps/rugby-draft-pro-league/) — our own app, built by Reign Creative — opens on a pool of more than 1,000 rugby players covering forwards, backs, specialists and goal kickers drawn from different eras, and the pool rotates so no two draft boards look the same.

The important word is *pool*, not *order*. Shuffling the order of a fixed list would change nothing strategically; you would still know every name that exists and could wait for it. Redrawing which slice of a thousand-plus players is available changes the supply of each position, and supply is what sets price on a board with a budget.

So on one run the props are plentiful and a fly-half is expensive. On the next, the reverse. Your opinion of an individual player has not changed. The market around him has.

## Why designers rotate a pool at all

The blunt answer is replay value, but the mechanism is worth stating precisely, because it explains what the mode is asking you to get good at.

A static board has a solution. Once a player finds an opening sequence that works, the draft stops being a decision and becomes a recital — and the interesting part of the mode, which is trading off talent against position fit, value and depth, quietly disappears. Game design teaching treats this as a question about where the decisions live: MIT's introductory game design course frames design as iterating on rules and testing how they interact, and a rule that admits one dominant answer has stopped generating interaction.

Varying content between sessions is a long-standing answer to that problem. The academic literature on procedural content generation treats the automatic creation of game content — levels, items, rules, and the sets a player chooses from — as a way to keep a system producing fresh situations rather than repeating one. A rotating draft pool is a modest, well-behaved instance of that idea: the content being varied is the choice set.

[What makes a good draft board](/blog/what-makes-a-good-draft-board/) covers the evaluation side of this in general terms; rotation is the reason the evaluation has to be done live rather than recalled.

## Recognition is easy. Recall is not.

There is a cognitive reason a rotating pool feels harder than it is, and naming it helps.

Usability research distinguishes recognition from recall: recognition means identifying something as familiar when it is in front of you, recall means retrieving it with no cues. Recognition is easier because the cues do the retrieval work. Multiple choice is easier than an open question for exactly this reason.

A memorised draft plan is recall. You are reproducing a sequence from memory with no support from the board. When the board changes, the recall fails, and it fails loudly — you notice the missing name immediately. What you do not notice is that your *recognition* is intact: shown two props, you can still tell which is better for your squad.

The practical implication is to build a method that runs on recognition. Instead of "take the loosehead at pick three", use "at pick three, compare the best available in each of my two thinnest positions and take the larger gap". The second instruction works on any board.

## Drafting looks like a stopping problem, with caveats

There is a real mathematical family behind this: optimal stopping, the study of when to stop a sequential process to maximise expected reward. The best-known example is the classical secretary problem, where candidates arrive in random order, you can only judge each against those already seen, and a rejected candidate cannot be recalled.

The analogy is genuinely useful for one insight: **an explicit look-before-you-leap phase has value.** Spending the first stretch of a draft calibrating what "good" looks like on *this* board, rather than committing immediately, is how you avoid paying a premium for the first decent player you see.

It is equally important to say where the analogy breaks, because the tidy 37% rule that people quote does not transfer. In the classical problem you choose exactly one candidate, you cannot go back, and you learn only relative ranks. In a draft you are filling many slots at once, the whole board is usually visible rather than arriving one at a time, and other drafters are removing options while you think. Treat optimal stopping as a source of intuition about sampling before committing, not as a formula to apply.

## A method that survives any board

Three habits transfer across every rotation.

**Work in tiers, not rankings.** Group the available players into bands you would be roughly equally content with. A ranking implies precision the board does not support; a tier tells you the only thing you need, which is when the drop-off happens.

**Spend where replacement level is worst.** For each position, ask what you would end up fielding if you missed on your target. The value of a pick is the gap between it and that fallback, not the player's rating in isolation. This is why a scarce position can be worth overpaying for and an abundant one never is.

**Let scarcity set price, and then respect the price.** If the board is short of hookers, hookers are expensive, and no amount of waiting makes that untrue on this run. The choice is to pay or to build a squad that needs one fewer.

The same logic sits underneath the difference between [snake and auction drafts](/blog/snake-draft-vs-auction-draft/), where the format decides whether scarcity shows up as pick order or as money. Rotation just means the scarcity map is redrawn before you start.

## What rotation does not change

It is worth being clear about the fixed parts, because planning belongs there.

The sport does not rotate. Rugby union scoring, the positional roles, and the shape of a squad that can actually play 24 matches are constant. Neither does the budget: GM mode runs under a $200M in-game salary cap, so every board is a pricing exercise regardless of who is on it. And the season that follows the draft is the same length however the draft went, which is why [squad rotation over a rugby season](/blog/rugby-squad-rotation-over-a-season/) matters as much as the board itself.

Put together, that is the honest summary of a rotating pool: the questions are stable, the answers move. The rest of the studio's draft and management titles are listed under [sports GM](/blog/category/sports-gm/).
