---
{
  "title": "Tennis Stats Explained: Unforced Errors, First-Serve Percentage and Break Points",
  "metaTitle": "Tennis Stats Explained: Errors, First Serves, Break Points",
  "description": "What the numbers on a tennis stat sheet mean, which are counts and which are a scorer's judgement, and why service points won tells you the most.",
  "status": "published",
  "editorialReview": "organization",
  "reviewAttestation": "library-2026-10-24",
  "publishedAt": "2026-10-02",
  "updatedAt": "2026-10-02",
  "author": "reign-creative-llc",
  "category": "sports-gm",
  "tags": ["tennis", "statistics", "serve", "analysis"],
  "primaryKeyword": "tennis stats explained",
  "secondaryKeywords": [
    "unforced errors in tennis meaning",
    "forced vs unforced error tennis",
    "first serve percentage tennis meaning",
    "break points converted meaning tennis",
    "what does service points won mean in tennis"
  ],
  "intent": "informational",
  "longTailKeywords": [
    "what counts as an unforced error in tennis",
    "is a high first serve percentage good",
    "what does break points converted mean",
    "which tennis stat matters most"
  ],
  "aiSearchQuestions": [
    "What is an unforced error in tennis?",
    "What is the difference between a forced and an unforced error?",
    "What does first-serve percentage mean?",
    "What does break points converted mean?",
    "Which tennis statistic best predicts who wins?"
  ],
  "relatedApps": ["tennis-career-sim"],
  "relatedArticles": [
    "tennis-scoring-for-beginners",
    "playing-the-big-points-in-tennis",
    "tennis-playing-styles",
    "understanding-sports-sim-probability"
  ],
  "takeaways": [
    "Separate the counts on a stat sheet, such as aces, double faults and points won, from the judgement calls, such as forced and unforced errors, which depend on whoever is classifying them.",
    "Read first-serve percentage together with the points won behind it: putting fewer first serves in can still leave service points won unchanged.",
    "Always read break points converted alongside the number of chances, because three breaks from twelve chances beats two from three.",
    "Service points won and return points won are the closest thing to a summary statistic, because the rest of the scoreboard follows from them under the standard modelling assumption.",
    "Compare winners and unforced errors only between players with similar styles, since an aggressive player will pile up both."
  ],
  "disclaimer": "none",
  "featured": false,
  "faqs": [
    {
      "question": "What is an unforced error in tennis?",
      "answer": "It is a missed shot that a statistician judges was caused by the player's own decision or execution rather than by pressure from the opponent. The Rules of Tennis do not define it; the classification is made by whoever records the match statistics, so two scorers can disagree about the same miss."
    },
    {
      "question": "What is the difference between a forced and an unforced error?",
      "answer": "A forced error is a miss caused by the opponent's good shot, such as a stretched reply to a heavy, deep ball. An unforced error is a miss on a ball the player was judged able to handle. Because the line between the two is a judgement, counts of both are partly subjective."
    },
    {
      "question": "What does first-serve percentage mean?",
      "answer": "It is the share of first serves that land in. A player who puts 42 of 70 first serves in has a first-serve percentage of 60%. It says nothing on its own about how many of those points were won, so read it alongside first-serve points won."
    },
    {
      "question": "What does break points converted mean?",
      "answer": "It is the number of break points a returner won divided by the number they had. A break point is a point that would win the opponent's service game: the receiver has one at 30-40 or advantage, two at 15-40 and three at 0-40. Three from twelve is 25%, but it is still one more break than two from three."
    },
    {
      "question": "Which tennis statistic tells you the most?",
      "answer": "Points won on serve and on return come closest. Tennis models commonly assume each point on a player's serve is won with the same probability, independently of the others, and under that assumption the chances of holding serve, winning sets and winning the match can all be derived from those two numbers."
    }
  ],
  "sources": [
    {
      "title": "ATP Stats Leaderboards",
      "publisher": "ATP Tour",
      "url": "https://www.atptour.com/en/stats/leaderboard",
      "accessed": "2026-10-02"
    },
    {
      "title": "Glossary of tennis terms",
      "publisher": "Wikipedia",
      "url": "https://en.wikipedia.org/wiki/Glossary_of_tennis_terms",
      "accessed": "2026-10-02"
    },
    {
      "title": "A point-based Bayesian hierarchical model to predict the outcome of tennis matches (Journal of Quantitative Analysis in Sports, 2019)",
      "publisher": "Martin Ingram (author manuscript)",
      "url": "https://martiningram.github.io/papers/bayes_point_based.pdf",
      "accessed": "2026-10-02"
    },
    {
      "title": "ITF Rules of Tennis 2026",
      "publisher": "International Tennis Federation (ITF)",
      "url": "https://www.itftennis.com/media/7221/2026-rules-of-tennis-english.pdf",
      "accessed": "2026-10-02"
    }
  ]
}
---

A tennis stat sheet mixes two kinds of number. Most are plain counts that anyone could check against the score and the umpire's calls: aces, double faults, first serves in, points and games won, break points created and taken. A few, above all forced and unforced errors, are judgements made by whoever records the match, and two scorers can classify the same missed shot differently. The single most informative pair of numbers is the share of points each player won on serve and on return. Under the standard modelling assumption described below, most of what happens on the scoreboard, from holding serve to winning sets, follows from those two.

This guide defines each common statistic, shows which ones mislead when read alone, and works through the arithmetic that connects them.

## The stat sheet, line by line

| Statistic | What it is | Count or judgement? | The trap |
| --- | --- | --- | --- |
| Aces | Serves that land in and are not touched by the receiver | Count | Depends heavily on surface and opponent |
| Double faults | Two faults in a row, losing the point | Count | A few can be the price of an aggressive second serve |
| First-serve percentage | First serves in ÷ first serves hit | Count | Says nothing about points won |
| First-serve points won | Points won when the first serve went in ÷ first serves in | Count | High for big servers who miss often |
| Second-serve points won | Points won after a first-serve fault ÷ those points | Count | Often the most revealing serve number |
| Break points converted | Break points won ÷ break points had | Count | A percentage that hides the number of chances |
| Break points saved | Break points faced and won ÷ break points faced | Count | Facing many is itself a warning sign |
| Winners | Shots that win the point without the opponent touching them | Mostly count; edge cases judged | Style-dependent |
| Unforced errors | Misses the scorer judges were not caused by the opponent | Judgement | Style-dependent and scorer-dependent |
| Total points won | Every point won, on serve and return | Count | Close totals can still produce lopsided scores |

The definitions follow standard tennis usage. A double fault ends the point under Rule 24(a) of the ITF Rules of Tennis, and a service let is not counted as a fault at all (Rule 22).

## Counts and judgement calls

Most of the table can be checked from the scoreboard and the umpire's calls. Whether a serve went in, whether a point was won and whether the score was 30-40 are facts.

**Errors are different.** The ITF Rules of Tennis do not define an unforced error. It is a classification: the scorer decides whether a missed ball was the result of the opponent's pressure (a forced error) or of the hitter's own decision or execution (unforced). A standard tennis glossary describes counting both kinds as partly subjective. By those definitions, a miss on a heavy, deep ball from a stretched position belongs in the forced column, and the same miss from a neutral position, on a ball the player was set for, belongs in the unforced one. Between those two lies a wide grey zone.

Notably, the ATP's own statistical leaderboards list no error counts at all. Its Serve, Return and Under Pressure tables show first-serve percentage and the points won behind first and second serves, aces and double faults per match, and service and return games won. They also show break points converted and saved, tiebreaks won and deciding sets won. Every one of those can be counted.

## Serve numbers, and why the first-serve percentage misleads

First-serve percentage is the share of first serves that land in. It is the most quoted serve statistic and, on its own, one of the least informative. What matters is how many **points** the serve wins, and that depends on three numbers together:

> Service points won = (first-serve %) × (first-serve points won) + (1 − first-serve %) × (second-serve points won)

Take two versions of the same server, both winning 50% of their second-serve points:

| Version | First serves in | Points won behind the first serve | Service points won |
| --- | --- | --- | --- |
| Safer first serve | 60% | 75% | 0.60 × 0.75 + 0.40 × 0.50 = **65%** |
| Bigger first serve | 50% | 80% | 0.50 × 0.80 + 0.50 × 0.50 = **65%** |

Judged on first-serve percentage alone, the first version looks far better. Both win exactly the same share of points on serve. The first-serve percentage changed; the outcome did not.

The same formula shows why **second-serve points won** often says the most about a server's real strength. A player who wins most of their points after a first-serve fault can afford to swing at the first serve. A player who wins few must keep the first serve safe. Aces and double faults are the two ends of that trade, which is why a handful of double faults is not automatically a bad sign.

## Return and pressure numbers

A **break point** is a point that would win the receiver the server's game. It arises at 30-40 or when the receiver has the advantage, with two at once at 15-40 and three at 0-40. Converting one is a break of serve.

**Break points converted** divides break points won by break points had, and the percentage on its own can point the wrong way:

| Returner | Break points | Converted | Rate | Breaks of serve |
| --- | --- | --- | --- | --- |
| A | 3 | 2 | 67% | 2 |
| B | 12 | 3 | 25% | 3 |

B has the worse rate but one more break of serve, and kept far more pressure on the opponent's serve. Read conversion together with the number of opportunities, and read **break points saved** together with the number faced. A server who saves 8 of 10 has still faced 10, which is a sign of trouble in itself. [Playing the big points in tennis](/blog/playing-the-big-points-in-tennis/) covers what players actually do on those points.

## Winners and unforced errors: read them as a pair, and by style

A **winner** is a shot the opponent cannot reach that wins the point. Winners and unforced errors move together for an obvious reason: both come from taking risk. An aggressive baseliner who goes for lines tends to pile up both, and a counterpuncher tends to record fewer of each. Comparing the two players' error counts directly mostly measures their styles. [Tennis playing styles](/blog/tennis-playing-styles/) describes the six broad approaches.

Two cautions help. Compare a player's ratio of winners to unforced errors with their own matches, not with an opponent of a different type. And remember the scorer: the same match recorded by two people can produce different error totals, while the aces and double faults will match.

## The numbers that drive everything else

The most informative statistics are the shares of points won on serve and on return. Tennis research leans on a long-standing simplification, summarised in Martin Ingram's 2019 paper in the *Journal of Quantitative Analysis in Sports*. It treats each point on a player's serve as won with the same probability, independently of the others. Under that assumption, the probability of winning a service game, a set and the match can all be derived from the two players' serve-point probabilities. The same paper reports that, in its ATP data from the 2014 season, a player served about 80 points per match on average and won about 51 of them, around 64%.

That relationship magnifies small differences. Under the same assumption:

- A server who wins **60%** of service points holds about **73.6%** of service games.
- At **65%**, the hold rate rises to about **83.0%**.

Five points of serve share turn into nearly ten points of hold rate. That is why the serve-and-return split deserves more attention than the error column, and why a match can look lopsided on the scoreboard while total points won stay close. [Tennis scoring for beginners](/blog/tennis-scoring-for-beginners/) explains the win-by-a-margin rule that repeats at every level of the score, and [understanding sports simulation probability](/blog/understanding-sports-sim-probability/) covers the same idea for simulated seasons. Real points are not perfectly independent of one another, and the paper notes the deviations found in studies have been small, so treat these figures as a model, not a law.

## A stat line, read properly

Here is an invented stat line for a three-set match:

| | Player X | Player Y |
| --- | --- | --- |
| First serves in | 52% | 66% |
| First-serve points won | 79% | 70% |
| Second-serve points won | 55% | 44% |
| Break points converted | 3/7 | 1/9 |
| Winners / unforced errors | 38 / 41 | 17 / 19 |

A quick reading says Y served better (66% in) and played cleaner (19 errors). A careful reading says the opposite. Work out the service points won: X won 0.52 × 0.79 + 0.48 × 0.55 ≈ 67% on serve, Y 0.66 × 0.70 + 0.34 × 0.44 ≈ 61%. X faced nine break points and dropped only one, while turning three of seven into breaks. The error counts mostly reflect X's riskier style. X is the player in control.

## Where the career sim fits

[Tennis Career Simulator 2026](/apps/tennis-career-sim/) is a decision game. You choose how to serve, return, defend or attack on the points that matter, and the result comes from your player's attributes, style and preparation. Results, form, records and career history then build up across seasons. It is a fictional simulation, connected to no real player or tour. The habit this guide recommends, judging a performance by points won on serve and return rather than by the error column, applies to any match you look back on.

The rest of the tennis coverage is gathered on the [tennis hub](/sports/tennis/), and the studio's other games are under [sports career and GM games](/apps/category/sports-gm/).
