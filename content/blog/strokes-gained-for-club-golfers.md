---
{
  "title": "Strokes Gained: What It Measures and What It Cannot",
  "metaTitle": "Strokes Gained for Club Golfers",
  "description": "Strokes gained compares each shot against a baseline. How the four categories work, what the numbers mean, and where the statistic misleads.",
  "status": "published",
  "publishedAt": "2026-09-15",
  "updatedAt": "2026-09-15",
  "author": "Reign Creative Team",
  "category": "sports-gm",
  "tags": ["golf", "statistics", "strokes gained", "reference"],
  "primaryKeyword": "strokes gained explained",
  "secondaryKeywords": [
    "strokes gained meaning",
    "strokes gained putting",
    "strokes gained analysis",
    "shots gained explained",
    "strokes gained categories",
    "strokes gained baseline"
  ],
  "intent": "informational",
  "longTailKeywords": [
    "what does strokes gained approach mean",
    "how is strokes gained calculated",
    "can club golfers use strokes gained",
    "why is strokes gained better than fairways hit"
  ],
  "aiSearchQuestions": [
    "What does strokes gained measure?",
    "What are the four strokes gained categories?",
    "How is the baseline set?",
    "Is strokes gained useful for amateurs?"
  ],
  "demandTier": "unverified-high",
  "relatedApps": ["golf-career-simulator"],
  "relatedArticles": [
    "golf-scoring-explained",
    "golf-course-management-basics",
    "club-distance-gapping",
    "how-golf-q-school-works"
  ],
  "takeaways": [
    "Strokes gained measures a golfer's performance relative to the field they are competing against, rather than against par.",
    "It is usually split into four categories: off the tee, approach, around the green, and putting.",
    "Its advantage over counting fairways and greens is that it weighs how much a shot improved your position, not merely whether it finished in a named area.",
    "It needs a baseline built from a large body of comparable shots, which is the part most club golfers cannot reproduce.",
    "A simulation can honour the idea - scoring the quality of a decision against a reference - without pretending to own the underlying data."
  ],
  "disclaimer": "none",
  "featured": false,
  "faqs": [
    {
      "question": "What does strokes gained measure?",
      "answer": "It measures a golfer's performance relative to the performance of the field they compete against, rather than against par. Each shot is compared to what a reference group would typically need from the same position, and the difference is credited to that shot."
    },
    {
      "question": "What are the four categories?",
      "answer": "Strokes gained is usually separated into off the tee, approach, around the green, and putting. Splitting it that way lets a player see which part of the game is producing the difference in their scores rather than just seeing a total."
    },
    {
      "question": "How is the baseline set?",
      "answer": "From a large body of recorded shots by a comparable group of players, which produces an expected number of strokes to hole out from any given distance and lie. Without that reference data the calculation cannot be performed, which is the practical barrier for most amateurs."
    },
    {
      "question": "Is strokes gained useful for amateurs?",
      "answer": "The framework is useful even where the exact numbers are not available. Asking how much a shot improved your position, rather than whether it landed in a named area, is the transferable part. A drive that finishes in the rough 40 yards further on is often worth more than one in the fairway."
    },
    {
      "question": "Why is it better than counting fairways and greens?",
      "answer": "Because those statistics are binary and position-blind. Fairways hit treats a 300-yard drive and a 200-yard drive identically, and greens in regulation treats a tap-in and a 60-foot putt identically. Strokes gained counts the size of the improvement."
    }
  ],
  "sources": [
    {
      "title": "Glossary of golf",
      "publisher": "Wikipedia",
      "url": "https://en.wikipedia.org/wiki/Glossary_of_golf",
      "accessed": "2026-09-15"
    },
    {
      "title": "Stroke play",
      "publisher": "Wikipedia",
      "url": "https://en.wikipedia.org/wiki/Stroke_play",
      "accessed": "2026-09-15"
    }
  ]
}
---

Strokes gained is a method of measuring a golfer's performance relative to the performance of the field they compete against, usually separated into four categories: off the tee, approach, around the green, and putting.

The reason it displaced older statistics is not sophistication for its own sake. It is that the older statistics were answering a question nobody was asking.

## The problem it was built to solve

Count fairways hit and greens in regulation for a round and you have two numbers that are almost useless for improvement, because both are binary and both ignore position.

"Fairway hit" is true for a 300-yard drive in the centre and for a 190-yard drive that scuttled 20 yards into the short grass. "Green in regulation" is true for a ball three feet from the hole and for one 60 feet away on the wrong tier. In both cases the statistic records that something good happened while discarding the information about *how* good.

Scoring, meanwhile, is decided almost entirely by that discarded information.

## What the calculation actually does

The idea is to hold a reference: from this distance, from this kind of lie, how many strokes does a comparable golfer typically need to hole out?

Every shot then gets graded against that reference. If you were in a position from which the reference says 4.1 strokes are expected, and after your shot you are in a position from which 2.8 are expected, your shot advanced you by 1.3 — and since it cost you one stroke to play, you gained 0.3 strokes with it.

Repeat for every shot in a round, sort the results into the four categories, and you have a breakdown that says where your score came from.

Two properties make this powerful:

- **It is continuous, not binary.** Every shot has a value, including the bad ones, and the values are proportional to how much they helped or hurt.
- **It is comparative, not absolute.** The reference is the field you are measured against, so the number already accounts for how hard the shot was.

## Where it stops working

Four honest limitations, all of which matter more for club golfers than for professionals.

**It needs data you probably do not have.** The baseline is built from a large body of recorded shots by a comparable group. Without that reference set there is no calculation, only a vibe. Amateur-oriented tools exist, but they are approximating a baseline from far less data.

**The category boundaries are conventions.** A 40-yard shot is around the green in one scheme and an approach in another, and the split changes where the credit lands without changing anything about your golf.

**It describes, it does not diagnose.** "You are losing 1.2 strokes on approach" tells you where the score went, not why. Distance control, direction, decision-making and club selection all live inside that one number and it does not separate them.

**It is silent on the counterfactual.** Strokes gained grades the shot you played from where you were. It has nothing to say about whether you should have been there — whether the aggressive line that put you in the rough was the right choice given the state of your round. That is a course-management question, and [golf course management basics](/blog/golf-course-management-basics/) is where it belongs.

That last point is the one worth sitting with, because it is a real boundary of the statistic rather than a data problem that better tools will fix.

## The transferable habit

Even without the arithmetic, the framework changes how you read your own round if you apply one question after every shot: **how much did that shot improve my position?**

- A drive that finishes in light rough 40 yards further down the hole is usually worth more than one in the fairway well short of it, and the fairway statistic says the opposite.
- A greenside bunker shot to 15 feet is a poor result, even though it got out.
- A 40-foot putt that finishes two feet away is an excellent putt, and the putts-per-round statistic will treat it as a failure to hole.

That reframing is most of the practical benefit, and it costs nothing.

## Scoring decisions instead of swings

[Golf Career Simulator Pro Tour](/apps/golf-career-simulator/) is a career game rather than a swing game. There is no timing meter. Each shot is a choice about how to play this hole, from this lie, at this distance, in this wind, under this much pressure, and both aggressive and conservative lines are viable depending on your golfer and the state of the tournament.

That design sits in an interesting relationship to strokes gained, and it is worth being precise about it.

**What the model does share with the idea.** A shot in the game is evaluated against what the position was worth before and after. Choosing to attack a tucked pin from a poor lie and finishing short-sided is scored as a decision that made the position worse, even though the shot itself may have been struck well. That is the strokes-gained instinct: grade the change in position, not the appearance of the action.

**What it deliberately does not do.** It does not reproduce strokes gained as a statistic, does not present numbers in the four categories, and does not claim any relationship to real shot data. It cannot: the baseline that makes strokes gained meaningful comes from an enormous body of recorded professional shots, and every tour, event and golfer in our game is fictional. A number derived from a fictional field would look like strokes gained and mean nothing.

So the seven skills the game does expose — driving, accuracy, irons, short game, putting, composure and consistency — are player attributes, not performance statistics. They describe what your golfer is capable of, and the scorecard describes what happened. There is no layer in between claiming to measure how much each shot was worth against a tour baseline, because we do not have a tour baseline and would not want to invent one.

**The limitation that creates** is real: the game will not tell you that your short game cost you 1.4 strokes this week. It will tell you that you missed the cut, and leave you to work out which decisions did it. Some players want the analytics layer. It is not there, and building a fake one would be worse than its absence.

For the scoring notation those decisions eventually add up to, see [golf scoring](/blog/golf-scoring-explained/), and for the equipment-side problem that sets the distances you are choosing between, see [club distance gapping](/blog/club-distance-gapping/).

The studio's other career and management titles are listed under [sports GM](/apps/category/sports-gm/).
