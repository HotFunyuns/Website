---
{
  "title": "Designing Memory Games That Are Not Just Matching Pairs",
  "metaTitle": "Designing Memory Games",
  "description": "Matching pairs is one memory task among many. The formats we built instead, what each one actually stresses, and the ones that did not survive testing.",
  "status": "published",
  "publishedAt": "2026-09-15",
  "updatedAt": "2026-09-15",
  "author": "reign-creative-llc",
  "category": "education-brain",
  "tags": [
    "memory games",
    "game design",
    "case study",
    "education"
  ],
  "primaryKeyword": "memory game design",
  "secondaryKeywords": [
    "memory game design ideas",
    "memory game development",
    "memory card game design",
    "types of memory games",
    "what is a memory game",
    "memory game mechanics"
  ],
  "intent": "informational",
  "longTailKeywords": [
    "how do you design a memory game",
    "what makes a memory game hard",
    "memory game formats other than matching pairs",
    "how to scale difficulty in a memory game",
    "what skills do memory games train"
  ],
  "aiSearchQuestions": [
    "How do you design a memory game?",
    "What makes a memory game difficult?",
    "Are matching pairs the only memory game format?",
    "What does a memory game actually train?"
  ],
  "demandTier": "unverified-medium",
  "relatedApps": [
    "mental-math-memory-games"
  ],
  "hubs": [
    "memory-and-attention"
  ],
  "relatedArticles": [
    "memory-techniques-that-work",
    "working-memory-and-training",
    "how-quiz-difficulty-works",
    "do-brain-training-apps-work"
  ],
  "takeaways": [
    "Matching pairs is a spatial-location task with a search component, which is why it rewards systematic scanning as much as recall.",
    "Span tasks, sequence reproduction and delayed recall stress genuinely different things, and a collection that contains all three is harder to game than one built on a single mechanic.",
    "Difficulty has to scale on span or delay rather than on speed, because speed pressure converts a memory task into an attention task.",
    "Two formats we prototyped were cut for exactly that reason: they measured how alert you were rather than how much you retained.",
    "Published span figures are a design anchor, not a target — a game that starts at the adult average will feel punishing to most of the people who open it."
  ],
  "disclaimer": "none",
  "featured": false,
  "faqs": [
    {
      "question": "What does a matching pairs game actually test?",
      "answer": "Memory for the locations of items you have already turned over, combined with a search strategy. That second component is larger than people assume: a player who turns cards in a systematic order rather than at random will outperform a player with better recall, which means the game is not a clean measure of memory."
    },
    {
      "question": "What memory game formats exist besides matching pairs?",
      "answer": "Span tasks, in which you reproduce an increasing sequence of digits or positions; sequence reproduction, where order matters as well as content; delayed recall, where a gap and an interfering task sit between presentation and test; and paired associates, where you learn arbitrary links between items. Each stresses something different."
    },
    {
      "question": "What makes a memory game difficult?",
      "answer": "Three independent dials: how much is presented, how long you have to hold it, and what happens in between. Increasing the amount tests capacity, increasing the delay tests retention, and adding an interfering task tests resistance to interference. Making the timer shorter is a fourth dial that mostly tests something else entirely."
    },
    {
      "question": "How should difficulty scale in a memory game?",
      "answer": "On span and delay, adaptively, one step at a time. Increase the length after a success and drop it after a failure, so a player spends most of their session near the edge of what they can do. Fixed difficulty levels waste a player's time at both ends: too easy to be informative, or too hard to complete."
    },
    {
      "question": "Do memory games improve memory?",
      "answer": "They reliably improve performance on the specific task being practised. Whether that transfers to memory in everyday life is contested and the evidence weakens with distance from the trained task. Any design discussion of memory games should be read with that caveat attached rather than assuming the exercises buy general improvement."
    }
  ],
  "sources": [
    {
      "title": "Concentration (card game)",
      "publisher": "Wikipedia",
      "url": "https://en.wikipedia.org/wiki/Concentration_(card_game)",
      "accessed": "2026-09-15"
    },
    {
      "title": "Memory span",
      "publisher": "Wikipedia",
      "url": "https://en.wikipedia.org/wiki/Memory_span",
      "accessed": "2026-09-15"
    },
    {
      "title": "Corsi block-tapping test",
      "publisher": "Wikipedia",
      "url": "https://en.wikipedia.org/wiki/Corsi_block-tapping_test",
      "accessed": "2026-09-15"
    },
    {
      "title": "Working memory",
      "publisher": "Wikipedia",
      "url": "https://en.wikipedia.org/wiki/Working_memory",
      "accessed": "2026-09-15"
    }
  ]
}
---

Every memory game in a phone store is the same game. Turn over two cards, find the pair, repeat. It is a fine game — Concentration has survived as a card game for a very long time — but it is one task, and if you build a memory app entirely out of it you are training one narrow thing while calling it memory.

What follows is what we found when we tried to build a collection instead of a mechanic: which formats measure what, which difficulty dials actually work, and the two prototypes we cut because they turned out to be measuring the wrong thing.

## What matching pairs is actually testing

Pull the mechanic apart and there are two components, not one.

The first is **memory for location**: you turned over the elephant three moves ago, and you need to know where it was. That is genuinely a memory task, specifically a visuospatial one.

The second is **search strategy**, and it is larger than most people assume. A player who turns cards in a systematic order — sweeping the grid rather than picking at random — will discover pairs faster than a player with better recall and no method. Two players with identical memories and different strategies will produce different scores.

That is not a criticism of the game. It is an observation about what a score in it means: it is a mixture, and you cannot separate the parts from the outside. For a game that is fine. For anything claiming to measure memory, it is a problem.

## The formats that stress different things

Once you accept that memory is not one faculty, the design space opens.

**Span tasks.** Present a sequence of increasing length and ask for it back. The classic verbal version is digit span, and the reference figure everyone quotes is Miller's: the average digit span for adults without error is seven plus or minus two. The spatial equivalent is the Corsi block-tapping test, in which a participant reproduces a tapped sequence across up to nine spatially separated blocks, starting simple and growing until performance breaks down; the average for typical adults is described as about five to six.

Those two numbers — around seven for digits, around five to six for spatial positions — are the single most useful pair of facts in memory-game design, and we will come back to why.

**Sequence reproduction.** Same as a span task but order is scored as well as content. Getting all five items with two of them swapped is a different kind of failure from getting three items, and a game that scores them identically is throwing away information.

**Delayed recall.** Present the material, insert a gap, then test. The gap is the variable, and what you put in the gap matters enormously: an empty gap tests decay, while a gap containing another task tests resistance to interference. Those are different things and they come apart in real people.

**Paired associates.** Learn arbitrary links — this symbol goes with that colour — then test one from the other. This is closer to what most people mean when they say they want a better memory, because remembering a name attached to a face is a paired-associate problem.

A collection with all four is much harder to game than a collection with one. A player who has found a strategy for span tasks has not found one for delayed recall, and that is the point: the score stays informative because the player cannot flatten the whole app with a single trick. [How quiz difficulty works](/blog/how-quiz-difficulty-works/) covers the related problem on the trivia side, where question difficulty and question discrimination come apart in similar ways.

## Three dials, and one that lies

Difficulty in a memory task can be scaled on:

1. **Amount** — how many items. Tests capacity.
2. **Delay** — how long you hold it. Tests retention.
3. **Interference** — what happens in between. Tests resistance to disruption.

And there is a fourth, ever-present temptation: **shorten the timer.**

Speed pressure is the easiest difficulty dial to implement and the most misleading one to use here. A memory task under a tight clock stops being a memory task. What it measures is how fast you can read the display, how alert you are, and how well you handle pressure — all real things, none of them memory. The player experiences a harder game and the score measures something it did not measure a moment ago.

Speed has a legitimate home. In arithmetic drills it is exactly right, because retrieval speed for number facts is part of the skill being built. In a memory task, use it to bound a session rather than to create difficulty.

## The two formats we cut

Both were prototyped, both were fun, and both were removed for the same reason.

**A change-detection screen.** Two grids in quick succession with one cell different; spot it. It plays well, the failure is unambiguous, and it has an obvious difficulty curve in grid size. It is also, on inspection, substantially a **vigilance task**. Performance tracked how closely someone was watching rather than how much they retained, and it moved with tiredness in a way none of the span tasks did. Interesting, but not a memory game.

**A timed find-the-difference format.** The same problem in a prettier costume. Under a clock it became a visual-search exercise; without the clock, it was too easy to be worth a slot. We could not find a configuration where it was measuring retention rather than attention, so it came out.

The rule we took from both: **if a format's score moves when the player is tired but does not move when the material gets longer, it is not testing memory.** That is a crude test and it has been reliable.

## Where we set the spans, and why not at the average

Here is where the published figures stop being targets and start being anchors.

If the adult digit span is around seven and the spatial span around five to six, the tempting design is to start players near those numbers. It is also wrong, for two reasons.

First, those figures describe performance under controlled conditions on a specific task. A phone screen, a distracted player, a first attempt at an unfamiliar interface — none of that resembles the setting the figures come from.

Second, and more practically: a game that opens at the population average is a game that the majority of people fail on their first try. First-session failure is the most reliable way to lose someone, and there is no pedagogical benefit to it.

So the numeric and grid tasks in [Mental Math & Memory Games](/apps/mental-math-memory-games/) start comfortably below those anchors and **climb adaptively** — the sequence lengthens after a success and shortens after a failure, so a player spends most of their session at the edge of their own capacity rather than at the edge of a published average. The adult figures are where the curve is heading, not where it starts.

The consequence is that early rounds look trivially easy to a strong player. That is a deliberate cost: two or three quick successes cost a strong player fifteen seconds, and they are the difference between a weaker player continuing and closing the app.

## What the app ships, and how it is measured

The memory side covers **number, grid, sequence and delayed-recall** activities — a verbal span task, a spatial span task, an order-sensitive reproduction task and a task with a gap in it. Four formats stressing four different things, deliberately, rather than one mechanic with four skins.

Around them sit formats that change the pressure rather than the task: timed sprints, accuracy rounds, survival challenges that run until you slip, and boss quizzes to close out a stretch of work. Scores, accuracy, streaks, response time and personal bests are recorded with a history, so progress is a trend rather than an impression.

The arithmetic half of the app is the place where speed pressure *is* the right dial, which is why the two halves are built differently even though they sit in the same product.

## The caveat that has to be attached

A design article about memory games can easily read as an implicit claim that the games improve memory generally. It is not one.

Practice improves the practised task. The evidence for that is strong. The evidence that it transfers to other tasks is weaker, and weaker again for everyday functioning — the argument, the regulatory history and where our own app sits inside it are set out in [do brain training apps work](/blog/do-brain-training-apps-work/), and the underlying construct is covered in [working memory and training](/blog/working-memory-and-training/).

So everything above is a claim about **game design**: how to build a memory task that measures what it says it measures, scales sensibly, and stays interesting past the third session. That is a real design problem and worth solving well. It is not a claim about what solving it does to your brain.

If what you actually want is to remember more in daily life, the methods with the best support are not games at all — retrieval practice, spacing, elaboration and the method of loci — and they are covered in [memory techniques that work](/blog/memory-techniques-that-work/). More of this material sits under [education and brain training articles](/blog/category/education-brain/), and the apps under [education and brain training](/apps/category/education-brain/).
