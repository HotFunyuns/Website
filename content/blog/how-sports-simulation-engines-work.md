---
{
  "title": "How Sports Simulation Engines Turn Ratings Into Results",
  "metaTitle": "How Sports Simulation Games Actually Work",
  "description": "Inside a sports sim: how ratings become probabilities, where randomness enters, the two main engine designs, and what a simulated record does and does not mean.",
  "status": "draft",
  "publishedAt": "2026-08-09",
  "updatedAt": "2026-08-09",
  "author": "Reign Creative Team",
  "category": "sports-gm",
  "tags": ["sports sim", "simulation engine", "game design", "baseball", "probability"],
  "primaryKeyword": "how sports simulation games work",
  "secondaryKeywords": [
    "sports simulation engine explained",
    "how do sim games calculate results",
    "ratings to probability model",
    "season simulator explained",
    "random number generator in games",
    "event level vs outcome level simulation"
  ],
  "intent": "informational",
  "longTailKeywords": [
    "how does a season simulator decide wins and losses",
    "do sports sims simulate every play",
    "why does the same roster give different results",
    "what inputs does a sports simulation use"
  ],
  "aiSearchQuestions": [
    "How does a sports simulation game calculate a result?",
    "What is the difference between event-level and outcome-level simulation?",
    "Why does the same team produce different results in a sim?",
    "Is a simulated season a prediction of anything real?"
  ],
  "demandTier": "unverified-medium",
  "relatedApps": ["baseball-draft-gm-team", "pro-basketball-draft-gm-mode"],
  "relatedArticles": [
    "understanding-sports-sim-probability",
    "baseball-stats-explained-for-beginners",
    "how-fantasy-draft-strategy-works",
    "baseball-draft-gm-guide"
  ],
  "takeaways": [
    "Every sports simulation has the same three layers: numeric inputs describing the roster, a model that converts those numbers into probabilities, and a sampling step that turns probabilities into one concrete result.",
    "Event-level engines simulate each play and add the results up; outcome-level engines score the roster as a whole and map that score to a record — the first produces a story, the second produces an answer.",
    "Randomness is what makes the same roster give different results, and it is a design choice rather than a flaw: a deterministic sim would only ever need to be run once.",
    "A simulation models the things its designers chose to represent and nothing else, so anything absent from the input list is absent from the result.",
    "A simulated record is a score for how well you built a roster inside one model — it is not a forecast, and it describes nothing outside the app."
  ],
  "disclaimer": "none",
  "featured": false,
  "noindex": true,
  "faqs": [
    {
      "question": "How does a sports simulation game calculate a result?",
      "answer": "It converts the roster into numbers, feeds those numbers through a model that produces probabilities, and then samples from those probabilities to get one concrete outcome. The model is where all the design work sits — it encodes what the developers decided matters and how much. The sampling step is what makes the result specific rather than an average."
    },
    {
      "question": "What is the difference between event-level and outcome-level simulation?",
      "answer": "An event-level engine simulates the small units of the sport — a possession, a plate appearance, a drive — and aggregates them into a game and then a season. An outcome-level engine skips that and evaluates the roster as a whole, mapping the resulting score onto a win-loss record. Event-level gives you a play-by-play narrative at greater computational cost; outcome-level gives you a fast, clean verdict on team construction."
    },
    {
      "question": "Why does the same roster give a different result each time?",
      "answer": "Because the engine samples from a probability distribution rather than reading off a fixed answer. A team with a 60 percent chance of winning a given game does not win every time — that is what a 60 percent chance means. If a simulator returned an identical result for identical input, running it more than once would tell you nothing."
    },
    {
      "question": "What does 162-0 Baseball Draft & GM Team actually weigh?",
      "answer": "Its season simulator weighs roster quality, position fit, hitting, pitching, speed, defence and your coach selection, and returns a projected 162-game record. Everything in the game runs on projections — there are no live results and no online multiplayer. A perfect 162-0 season is designed to be rare."
    },
    {
      "question": "Is a simulated season a prediction?",
      "answer": "No, and treating it as one is the most common misreading of the genre. The record is a score assigned by a model to the roster you assembled inside that model's assumptions. It has no bearing on any real game, team or athlete, it is not betting guidance, and changing the model would change the number without anything in the world having changed."
    },
    {
      "question": "Are these games based on real players or leagues?",
      "answer": "No. 162-0 Baseball Draft & GM Team and Basketball Draft GM Franchise are fictional sports simulations built on generated player pools, and they are not affiliated with, endorsed by or connected to any real league, team or athlete."
    }
  ],
  "sources": [
    {
      "title": "Seeing Theory: A visual introduction to probability and statistics",
      "publisher": "Brown University",
      "url": "https://seeing-theory.brown.edu/",
      "accessed": "2026-08-09"
    }
  ]
}
---

Press simulate and a number comes back. The interesting question is not whether the number is right — it is not the kind of thing that can be right — but what produced it, because that determines what you should do differently next time.

Every sports simulation, regardless of sport or scale, is built from the same three layers.

## Layer one: turning a roster into numbers

Before anything can be computed, the roster has to become arithmetic. Whatever the interface shows you — a player card, a bar, a letter grade — the engine sees a vector of numbers.

Those numbers describe two different kinds of thing, and conflating them is the first place amateur analysis goes wrong:

- **Individual attributes.** How well a given player does a given thing.
- **Structural properties.** Whether the roster covers the positions it needs, whether the strengths complement each other, whether the depth holds up.

The second category has no home on any single player card, and it is usually what separates two rosters with identical average ratings. This is why "I drafted the highest-rated available player every time and lost" is such a common and such a solvable complaint.

## Layer two: the model that turns numbers into probabilities

This is the actual engine, and it is where every design decision lives.

At its core the model answers questions of the form: *given these inputs, how likely is each possible outcome?* It might be estimating the chance a possession ends in a score, the chance a plate appearance produces a hit, or — at a coarser grain — the chance this roster wins a given game.

Three things are worth understanding about this layer.

**It is a set of choices, not a discovery.** Somebody decided that defence matters this much relative to attack, that positional fit is worth this much, that coaching moves the number by this amount. Different designers make different choices and produce different games. There is no neutral model.

**It is invisible on purpose.** If the exact weights were published, the game would be an optimisation exercise you could solve on paper once and never think about again. The opacity is the replay value: you form a theory about what the model rewards, build to it, and read the result.

**It is bounded by its inputs.** A model can only weigh what it represents. If something is not in the input list, it does not exist in the simulation — not as a small effect, but as no effect at all. This is the single most important thing to understand about any simulation, and it is why an honest game states what it weighs.

## Layer three: sampling, which is where randomness enters

A probability is not a result. Turning "this team wins 62 percent of the time" into "this team won" requires a draw from a random source.

Practically, engines use a pseudorandom number generator — an algorithm that produces a sequence of numbers with the statistical properties of randomness from a starting value. The engine draws a number, compares it against the probability the model produced, and records the outcome that corresponds.

This is why identical input yields different output. It is a feature, and the alternative is worse: a deterministic simulator would return the same record for the same roster forever, which would make running it twice pointless and would misrepresent the sport it is modelling. Uncertainty is not noise layered on top of sport. It is a property of sport.

The consequence for you as a player is that **one run is one sample**. It carries some information about the roster and a great deal of information about that particular draw. Distinguishing the two is a skill, and it is covered properly in [understanding sports sim probability](/blog/understanding-sports-sim-probability/).

## Two engine designs, and what each is for

Most simulators sit near one of two poles.

### Event-level

Simulate the small units of the sport and aggregate upward. Plate appearance to inning to game to season. Possession to quarter to game to season.

**Strengths:** you get a genuine narrative. Box scores, individual statistics and momentum swings all emerge from the simulation rather than being generated separately. Interventions during a game are meaningful because there is a game happening.

**Costs:** far more computation per season, far more model surface to design and balance, and many more places for an unintended interaction to distort results.

### Outcome-level

Evaluate the roster as a whole and map the resulting score onto a record.

**Strengths:** fast, transparent about what it is doing, and tightly focused on the question a drafting game actually asks — *was this a good roster?* You can run a draft and get an answer in a single session.

**Costs:** no play-by-play, less texture, and no meaningful in-game intervention because there is no simulated game to intervene in.

Neither is more legitimate. They answer different questions. A game built around drafting is well served by an outcome-level engine, because the thing being evaluated is the roster, and adding a play-by-play layer would mostly add time between your decision and your feedback.

## A concrete example of stated inputs

[162-0 Baseball Draft & GM Team](/apps/baseball-draft-gm-team/) is explicit about what its season simulator weighs: **roster quality, position fit, hitting, pitching, speed, defence and coaching**. It returns a projected 162-game record.

That list is more useful than it looks, because it tells you where your effort should go.

- **Position fit** appearing separately from **roster quality** means the model is checking structure, not just adding ratings up. Stacking one kind of star will show up in the projection.
- **Speed** and **defence** being listed separately from **hitting** means a club of pure hitters is leaving inputs unused.
- **Coaching** being an input means the coach selection is a real decision, not a cosmetic one.

The drafting side gives you the raw material to reason about: you compare pitchers and hitters on ERA, WHIP, home runs, on-base ability, fielding, speed and WAR before committing a pick, then fill each required position and choose the coach. What those statistics mean is worth knowing before you draft on them — see [baseball stats explained for beginners](/blog/baseball-stats-explained-for-beginners/).

The game is also explicit about its limits: everything runs on projections, there are no live results and there is no online multiplayer. And the headline outcome, a perfect 162-0 season, is designed to be rare. That is a deliberate design decision about the shape of the output distribution, not an accident.

## What a simulation is not modelling

Being precise about absence is as important as describing presence.

A simulation does not model the sport. It models a representation of the sport that its designers built, containing the factors they chose to include, weighted the way they chose to weight them. Everything else — everything real that happens in a real season — is outside the system entirely.

It also does not model anything happening in the world. A projected record is generated from a roster that does not exist, using a model that was written rather than measured. It cannot be evidence about any real athlete, team or competition, and it is not a basis for predicting one. Simulated results are not forecasts and are not betting guidance.

## How to read a result usefully

**Treat it as a score for your process.** The roster is the thing you controlled. The record is the model's assessment of it.

**Look at the shape across runs, not one number.** If you want to know whether an approach is better, run it several times. A single unusually good or bad result tells you about a draw.

**Use disappointing results diagnostically.** Two causes account for most of them: a position you left uncovered, and a roster concentrated in one area at the expense of the others. Both are visible in the roster and neither is visible in the record.

**Change one thing at a time.** If you alter your draft strategy, your coach and your positional priorities simultaneously, the next result cannot tell you which change mattered. This is the most reliable way to actually learn a model you cannot see.

## Further reading

The variance side of this — why a better roster loses, how many runs you need, why rare outcomes stay rare — is in [understanding sports sim probability](/blog/understanding-sports-sim-probability/). If you want to improve the inputs rather than interpret the outputs, [how fantasy draft strategy works](/blog/how-fantasy-draft-strategy-works/) covers valuation and tiers, and the [baseball draft simulator guide](/blog/baseball-draft-gm-guide/) walks through a full run of the game above.

The rest of the studio's simulation and management titles are listed in the [sports GM category](/apps/category/sports-gm/).
