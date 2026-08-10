---
{
  "title": "Understanding Probability in Sports Simulations",
  "metaTitle": "Sports Simulation Probability, Explained",
  "description": "Why a better roster still loses, how season length compounds small edges, and how many runs you actually need before a simulated result means anything.",
  "status": "draft",
  "publishedAt": "2026-08-09",
  "updatedAt": "2026-08-09",
  "author": "Reign Creative Team",
  "category": "sports-gm",
  "tags": ["probability", "variance", "sports sim", "simulation", "statistics"],
  "primaryKeyword": "sports simulation probability",
  "secondaryKeywords": [
    "variance in sports simulation",
    "why does the better team lose",
    "sample size sports sim",
    "law of large numbers sports",
    "how many simulations to run",
    "binomial distribution wins"
  ],
  "intent": "informational",
  "longTailKeywords": [
    "why does my best roster keep losing in a sim",
    "how many times should i run a simulation to compare strategies",
    "why is a perfect season so unlikely",
    "how much does season length affect simulated results"
  ],
  "aiSearchQuestions": [
    "Why does the better team lose in a sports simulation?",
    "How does season length affect the chance of an unbeaten record?",
    "How many simulation runs are needed to compare two strategies?",
    "What is variance in a sports simulation?"
  ],
  "demandTier": "unverified-medium",
  "relatedApps": ["baseball-draft-gm-team", "football-draft-gm-mode"],
  "relatedArticles": [
    "how-sports-simulation-engines-work",
    "baseball-stats-explained-for-beginners",
    "how-fantasy-draft-strategy-works",
    "baseball-draft-gm-guide"
  ],
  "takeaways": [
    "A probability is a statement about a distribution of outcomes, not a promise about the next one, so a strong roster losing is the model working rather than failing.",
    "Season length compounds ruthlessly: at a constant 90 percent per-game win chance under an independence assumption, an unbeaten 20 games works out near 12 percent, an unbeaten 162 near one run in 26 million.",
    "The spread of plausible results is wide in absolute terms and narrow in proportional terms, which is why long seasons rank teams better than short ones without making any single season predictable.",
    "Comparing two strategies takes many runs, not one, because a single result is dominated by the draw rather than by the decision.",
    "Simulated probabilities describe a fictional model only; they are not predictions about real sport and are not betting guidance."
  ],
  "disclaimer": "none",
  "featured": false,
  "noindex": true,
  "faqs": [
    {
      "question": "Why does my best roster keep losing?",
      "answer": "Because a simulation samples from a distribution rather than reading off a fixed answer. If the model gives your team a 65 percent chance in a game, it loses roughly a third of the time, and losing a third of the time is what a 65 percent chance is. The result to be suspicious of is not an occasional bad run but a consistent pattern across many runs, which usually points at a structural problem with the roster."
    },
    {
      "question": "How many times should I run a simulation before trusting the result?",
      "answer": "More than once, and enough that you are looking at a spread rather than a number. There is no magic count, but a useful habit is to run each approach until the ranking between your two options stops flipping when you add another run. If it never stabilises, the difference between the approaches is probably smaller than the noise."
    },
    {
      "question": "Why is a perfect season so unlikely?",
      "answer": "Because unbeaten records multiply small failure chances across every game. Even at a very high constant win probability, the chance of never losing collapses as the season lengthens. Under a simple independence assumption, a 90 percent per-game chance gives roughly a 12 percent chance of going 20-0 and roughly one chance in 26 million of going 162-0 — the same team quality, a wildly different result, purely because of length."
    },
    {
      "question": "Does a longer season make results more predictable?",
      "answer": "It makes the win rate more stable while making the exact record no easier to call. The spread of outcomes grows in absolute terms as the season lengthens but shrinks as a proportion of games played, so a long season is a better instrument for ranking teams and no better at telling you what will happen in any one of them."
    },
    {
      "question": "Are these probabilities predictions about real sport?",
      "answer": "No. Every number in this article is either arithmetic you can check yourself or a property of a fictional model. 162-0 Baseball Draft & GM Team and 20-0 Football Draft & GM Mode are simulations built on generated players, not affiliated with, endorsed by or connected to any real league, team or athlete. Nothing here is a forecast, and nothing here is betting guidance."
    }
  ],
  "sources": [
    {
      "title": "Seeing Theory: A visual introduction to probability and statistics",
      "publisher": "Brown University",
      "url": "https://seeing-theory.brown.edu/",
      "accessed": "2026-08-09"
    },
    {
      "title": "NIST/SEMATECH e-Handbook of Statistical Methods",
      "publisher": "National Institute of Standards and Technology",
      "url": "https://www.itl.nist.gov/div898/handbook/",
      "accessed": "2026-08-09"
    }
  ]
}
---

You built the better roster and the record came back worse. This is the most common complaint in the genre and the one with the least interesting answer: that is what probability does. The model was not broken, and you were not cheated.

What is worth your time is knowing how much of a result is your decision and how much is the draw — because until you can separate those, every run teaches you something and half of what it teaches you is wrong.

## A probability is a claim about a distribution

When a model says a team wins 65 percent of the time, it is describing the shape of many possible seasons, not the content of the next one. The 35 percent is not an error term. It is part of the statement.

This trips people up because the interface shows one number and one outcome, so the outcome feels like a verdict on the number. It is not. It is one draw from a distribution the interface never shows you.

The practical version: **a single result cannot confirm or refute a strategy.** It can only be consistent or inconsistent with one, and even a fairly bad strategy produces good runs regularly.

## Season length is doing more work than roster quality

Here is the arithmetic that explains why unbeaten seasons are the hardest thing in the genre. Assume — and this is a deliberate simplification — that a team has a constant probability *p* of winning each game and that games are independent of one another. The chance of winning all *n* games is then *p* raised to the power of *n*.

At **p = 0.9**:

| Season length | Chance of a perfect record | Roughly |
| --- | --- | --- |
| 20 games | 0.9²⁰ ≈ 0.1216 | about 12 in 100 |
| 82 games | 0.9⁸² ≈ 0.000177 | about 18 in 100,000 |
| 162 games | 0.9¹⁶² ≈ 0.000000039 | about 1 in 26 million |

Same team. Same quality. The only thing that changed is how many chances the season gave it to lose.

And the sensitivity to *p* is just as sharp. At 162 games, raising the per-game chance from 0.9 to **0.95** takes the perfect-season probability from roughly 1 in 26 million to roughly **1 in 4,000** — still rare, but six thousand times less rare. Small edges compound; so do small vulnerabilities.

Two honest caveats about this calculation. It assumes every game is independent and every opponent identical, which is not how any real sport works and not how a well-built simulator works either. And no actual engine computes a season this way. It is a toy model, and its purpose is to show the *shape* of the relationship between length and rarity, which holds regardless of how much more sophisticated the real model is.

This is also why [162-0 Baseball Draft & GM Team](/apps/baseball-draft-gm-team/) states outright that the perfect 162-0 season is designed to be rare, while [20-0 Football Draft & GM Mode](/apps/football-draft-gm-mode/) can build its whole identity around a 20-game unbeaten run. The two games are asking for very different amounts of luck.

## How wide is "normal"?

Rarity of perfection is one question. The spread of ordinary results is a more useful one.

If a team wins each of *n* games with probability *p*, and the games are independent, the number of wins follows a binomial distribution. Its mean is *n × p* and its standard deviation is the square root of *n × p × (1 − p)*.

For a **162-game** season at **p = 0.6**:

- Mean wins: 162 × 0.6 = **97.2**
- Standard deviation: √(162 × 0.6 × 0.4) = √38.88 ≈ **6.2 wins**

So a team whose true quality is "wins 60 percent of the time" will routinely post anywhere from about 91 to about 103 wins, and will sometimes land outside that. Those look like meaningfully different seasons. They are the same team.

Now the same team over **20 games**:

- Mean wins: 20 × 0.6 = **12**
- Standard deviation: √(20 × 0.6 × 0.4) = √4.8 ≈ **2.2 wins**

Two and a bit wins of standard deviation on a 20-game season is enormous *relative to the season*. Divide the standard deviation by the number of games and you get the spread as a win rate: **6.2 ÷ 162 ≈ 3.8 percentage points** over a long season, versus **2.2 ÷ 20 ≈ 11 percentage points** over a short one.

That single comparison explains a lot about sport and about sims. Long seasons do not make any individual season predictable — the absolute spread actually grows. What they do is make the *rate* more reliable, which is why long competitions sort teams better than short ones and why a short format is a much noisier test of anything.

## What running it again actually buys you

The law of large numbers says the observed average converges toward the true value as the number of trials increases. It does not say results even out, and it makes no promise about any particular run — the widespread belief that a bad streak makes a good one more likely is the exact opposite of what independence means.

For a simulation player, this cashes out as a procedure rather than a philosophy:

1. **Change one thing.** If you alter your drafting approach, your coach and your positional priorities at once, no number of runs will tell you which mattered.
2. **Run both versions repeatedly under the same format.** The format is part of the model; comparing across formats compares two different things.
3. **Compare the spreads, not the peaks.** Your best result under each approach is a comparison of luck. The middle of each range is a comparison of the approach.
4. **Stop when the ranking stops flipping.** If adding another run keeps changing which approach looks better, the true difference is smaller than the noise, and the honest conclusion is "these are about the same".

That last point is the one people resist, because "about the same" feels like a failed experiment. It is not. It is a real finding, and it saves you from optimising something that does not matter.

## Where intuition reliably misleads

**Reading a streak as a trend.** Runs of the same outcome are ordinary in random sequences and much more common than people expect. A four-loss streak in an 82-game season is unremarkable.

**Assuming a due correction.** Independent trials have no memory. Nothing is owed to you after a bad run.

**Over-updating on the last result.** The most recent run is not more informative than the previous ones; it is just more available.

**Confusing precision with accuracy.** A projected record of 96-66 looks precise. The precision is a display convention. The underlying quantity has a spread around it, and the third digit is not carrying information you can use.

**Treating a bad outcome as a bad decision.** These come apart constantly. Judge the roster you built, because that is the part you controlled.

## What these numbers are not

Everything above describes fictional models. The probabilities in a sports simulation are properties of software written by people, applied to generated players who do not exist. They cannot be evidence about a real athlete, a real team or a real competition.

They are also not wagering guidance, and this article does not offer any. The arithmetic here is for understanding why a simulated season behaves the way it does, and its whole domain of validity ends at the edge of the app.

## Reading your own results better

- **Keep a note of the roster, not just the record.** The roster is your decision; the record is the model's response to it plus a draw.
- **Look for patterns that survive several runs.** A weakness that shows up repeatedly is a structural problem. One that appears once is a draw.
- **Expect the extremes.** In enough runs you will see a result that seems impossible for the roster you built. That is exactly what a distribution with tails looks like.
- **Judge the process.** The reason to prefer a better approach is that it moves the whole distribution, not that it guarantees the next result. Nothing guarantees the next result.

## Further reading

For the machinery that produces these probabilities in the first place, see [how sports simulation engines work](/blog/how-sports-simulation-engines-work/). If you want to improve the inputs, [how fantasy draft strategy works](/blog/how-fantasy-draft-strategy-works/) covers valuation and tiers, and [baseball stats explained for beginners](/blog/baseball-stats-explained-for-beginners/) covers the rate statistics that behave much like the probabilities above. The [baseball draft simulator guide](/blog/baseball-draft-gm-guide/) applies all of it to one game.

More simulation and management titles are in the [sports GM category](/apps/category/sports-gm/).
