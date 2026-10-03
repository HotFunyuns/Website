---
{
  "title": "What Is Expected Goals (xG) in Hockey? How Shot-Quality Models Work",
  "metaTitle": "What Is Expected Goals in Hockey? xG and GSAx Explained",
  "description": "Expected goals gives every unblocked hockey shot a probability of scoring. How the models work, how goals saved above expected follows, and what xG can't see.",
  "status": "published",
  "editorialReview": "automated",
  "publishedAt": "2026-10-02",
  "updatedAt": "2026-10-02",
  "author": "reign-creative-llc",
  "category": "sports-gm",
  "tags": [
    "hockey",
    "analytics",
    "expected goals",
    "goaltending"
  ],
  "primaryKeyword": "what is expected goals in hockey",
  "secondaryKeywords": [
    "expected goals hockey explained",
    "expected goals nhl explained",
    "what is expected goals percentage in hockey",
    "goals saved above expected meaning",
    "expected goals hockey formula"
  ],
  "intent": "informational",
  "longTailKeywords": [
    "what does xgf mean in hockey",
    "how is goals saved above expected calculated",
    "why do different sites have different expected goals",
    "what is flurry adjusted expected goals"
  ],
  "aiSearchQuestions": [
    "What does expected goals mean in hockey?",
    "How are expected goals calculated?",
    "What is goals saved above expected?",
    "Why do expected goals differ between websites?"
  ],
  "relatedApps": [
    "hockey-draft-gm-manager",
    "hockey-career-sim"
  ],
  "relatedArticles": [
    "plus-minus-and-hockey-stats",
    "hockey-goaltending-explained",
    "how-sports-simulation-engines-work",
    "hockey-draft-gm-guide"
  ],
  "takeaways": [
    "Read an expected-goals figure as a sum of probabilities: each unblocked shot is worth between 0 and 1, depending on how often similar shots have gone in.",
    "Compare a goaltender with the shots he faced, not with a raw save percentage: goals saved above expected is expected goals against minus goals actually allowed.",
    "Only compare expected goals from the same model, because every public site builds its own and none is official.",
    "Remember what the data cannot see: the models described here have no passing or player-position data, so a cross-crease pass and a lone shot from the same spot can look alike.",
    "Expect results to drift from xG over short stretches; finishing, goaltending and luck all live in the gap between expected and actual goals."
  ],
  "disclaimer": "none",
  "featured": false,
  "faqs": [
    {
      "question": "What is expected goals in hockey?",
      "answer": "Expected goals (xG) is a model's estimate of the probability that a shot becomes a goal, based on how often similar shots have gone in. A team's or player's expected goals is the sum of those probabilities across their shots. Public models generally use unblocked shot attempts, and none of them is an official league statistic."
    },
    {
      "question": "Is there a formula for expected goals?",
      "answer": "Not a single one. Each model is fitted to past play-by-play data, and turns features of a shot — such as distance, angle, shot type and what happened just before it — into a probability between 0 and 1. Many early public models used logistic regression; MoneyPuck and Evolving-Hockey describe models built with gradient boosting. The only universal arithmetic is the last step: add up the shot probabilities to get a total."
    },
    {
      "question": "What does goals saved above expected mean?",
      "answer": "It compares a goaltender with the shots he faced. MoneyPuck defines it as expected goals against minus the goals the goalie actually allowed, so a positive number means he stopped more than an average goalie would have. A goalie who faced 30 expected goals and allowed 26 would be at plus four."
    },
    {
      "question": "What is expected goals percentage?",
      "answer": "It is a team's share of the expected goals in the minutes being measured: expected goals for divided by the total of expected goals for and against. MoneyPuck's example is a player whose team generates 0.6 expected goals and allows 0.4 while he is on the ice, for 60 per cent. It works like Corsi percentage, but weights each shot by its danger instead of counting every attempt equally."
    },
    {
      "question": "Why do websites show different expected goals for the same game?",
      "answer": "Because each site builds its own model with its own features, training seasons and methods. Evolving-Hockey notes that expected goals is not standardised and lists several public models, including its own, Natural Stat Trick's, HockeyViz's and MoneyPuck's. Evolving-Hockey suggests they are probably similar in aggregate while noting that has never been properly tested, so compare numbers from the same source rather than across sources."
    }
  ],
  "sources": [
    {
      "title": "Glossary: General Terms",
      "publisher": "Evolving-Hockey",
      "url": "https://evolving-hockey.com/glossary/general-terms/",
      "accessed": "2026-10-02"
    },
    {
      "title": "A New Expected Goals Model for Predicting Goals in the NHL",
      "publisher": "Evolving-Hockey",
      "url": "https://evolving-hockey.com/blog/a-new-expected-goals-model-for-predicting-goals-in-the-nhl/",
      "accessed": "2026-10-02"
    },
    {
      "title": "About and How it Works",
      "publisher": "MoneyPuck.com",
      "url": "https://moneypuck.com/about.htm",
      "accessed": "2026-10-02"
    },
    {
      "title": "Glossary",
      "publisher": "MoneyPuck.com",
      "url": "https://moneypuck.com/glossary.htm",
      "accessed": "2026-10-02"
    }
  ]
}
---

**Expected goals (xG) assigns every unblocked shot a probability of becoming a goal, based on how often similar shots have gone in; add those probabilities up and you get a team's, a player's or a goaltender's expected goals.** MoneyPuck's glossary gives the flavour: a rebound in the slot might be worth about half a goal, a short-handed shot from the blue line about one hundredth of one. Goals saved above expected, the goaltending number built on it, is simply expected goals against minus goals actually allowed.

Two warnings belong at the top. Expected goals comes from a model, not a measurement, and every public site builds its own. None of them is an official NHL statistic.

## One shot, one probability

Imagine a team takes three unblocked shots in a period. A model rates them:

| Shot | Description | Model's probability |
| --- | --- | --- |
| 1 | Wrist shot from the point | 0.03 |
| 2 | Snap shot from the top of the circle | 0.08 |
| 3 | Quick rebound from in front of the net | 0.35 |
| **Total** | | **0.46 xG** |

These numbers are invented to show the arithmetic. The team "should" have scored about half a goal from those chances; if it scored one, it outperformed its expected goals by 0.54. As Evolving-Hockey's glossary puts it, instead of counting each shot as one, as Corsi does, a model counts the raw probability of each shot.

## What a model looks at

A model learns from past play-by-play data which features of a shot go with goals. Evolving-Hockey lists distance and angle to the net, shot type, the events before the shot, and score and game state among the usual inputs. MoneyPuck publishes the fifteen variables in its own model, which fall into a few groups:

| Group | Examples from MoneyPuck's list |
| --- | --- |
| Where the shot came from | Distance from net, shot angle, east-west and north-south location |
| What kind of shot | Shot type — slap, wrist, backhand and so on |
| What happened just before | Last event before the shot, time since it, distance from it, speed from it |
| Rebounds | Change in shot angle divided by time since the last shot |
| Game situation | Opponent's skaters on the ice, man advantage, time since the power play began, an empty net |

Not all of these matter equally. In Evolving-Hockey's write-up of its model, shot distance was the most important variable in every strength state — the first split its decision trees made the vast majority of the time. MoneyPuck notes that the shots with the highest goal probability are quick rebounds close to the net after a large change in angle.

Both sites use **unblocked** shots. Evolving-Hockey explains why: the NHL does not track where blocked shots were taken. MoneyPuck simply values blocked attempts at zero.

## How a model is built — and the "formula"

Statistically, expected goals is what Evolving-Hockey calls binary classification: each shot either became a goal or did not, and the model learns to estimate the chance of the first outcome.

Many early public models did this with logistic regression, which converts a weighted sum of a shot's features into a probability between 0 and 1. More recent models use gradient boosting, which builds many small decision trees. MoneyPuck describes its model as gradient boosted and trained on more than 50,000 goals and 800,000 shots from 2007-08 to 2014-15. Evolving-Hockey built four separate models — even strength, power play, short-handed and empty net — with a gradient-boosting library called XGBoost, training the even-strength and power-play models on seven seasons and the rarer situations on ten.

So when people search for an "expected goals formula", the honest answer is that there is no single one. Each model is its own fitted function. The universal part is only the final arithmetic: a team's expected goals is the sum of its shots' probabilities.

## From shots to teams, players and goaltenders

Once each shot has a probability, the familiar measures follow:

- **xGF and xGA** — expected goals for and against, summed over the minutes being measured.
- **xG%** — xGF divided by xGF plus xGA. MoneyPuck's glossary defines it on an on-ice basis: a player whose team generates 0.6 expected goals and allows 0.4 while he is on the ice is at 60 per cent.
- **Per-60 rates** — totals scaled to 60 minutes, so players with different ice time can be compared.

For goaltenders, the key number is **goals saved above expected (GSAx)**. MoneyPuck defines it as expected goals against minus the goals the goalie actually let in; a positive number means he stopped more than an average goaltender would have, given the same shots. Its glossary also offers a percentage version that divides GSAx by expected goals against.

A worked example with invented numbers: two goalies each face 300 shots in a month. Goalie A's shots add up to 30.0 expected goals and he allows 26, a .913 save percentage. Goalie B's add up to 18.0 expected goals and he allows 21, a .930 save percentage. On save percentage, B looks better. On goals saved above expected, A is +4.0 and B is −3.0, because A faced far more dangerous shots and stopped more of them than an average goalie would have. That is exactly the distortion [hockey goaltending explained](/blog/hockey-goaltending-explained/) describes in raw save percentage, which treats every shot as equal.

## Rebounds and flurries

A rebound creates a problem for simple xG: a team that gets three quick shots in one sequence can pile up more than a goal's worth of expected goals in a few seconds, even though it can score at most once before the puck goes back to centre ice.

MoneyPuck's answer is **flurry-adjusted expected goals**, which discounts every shot after the first in a flurry by the chance the team had not already scored. In its definition, the adjusted value of a shot is the chance of not having scored yet in the flurry multiplied by the shot's regular expected-goal value.

With invented numbers: a first shot worth 0.20 is followed by a rebound worth 0.50. The rebound's adjusted value is 0.80 × 0.50 = 0.40, so the flurry totals 0.60 instead of 0.70. MoneyPuck points out that the adjusted figure can never exceed 1.0 for a single flurry, and reports that it has been found more repeatable and more predictive of future winning than ordinary expected goals.

## Shooting talent: the open question

Standard expected goals assumes a shooter of average ability — MoneyPuck's glossary says so directly. That is deliberate: the model describes the chance, not the player who took it. But it means an elite finisher will tend to beat his expected goals and a poor one will fall short.

The sites have handled this differently. MoneyPuck publishes a separate shooting-talent-adjusted figure, which multiplies expected goals by an estimate of how far above or below average a player shoots. Evolving-Hockey tried adding a shooting-talent variable to its model and reported that the algorithm never used it, while noting that its method might have been the limitation and that the question warrants more research. Neither answer is final.

## Every model is different

Evolving-Hockey's glossary is blunt: expected goals is not standardised. It names several public models — its own, Natural Stat Trick's, HockeyViz's and MoneyPuck's — each built on NHL play-by-play data, and suggests they are probably quite similar in aggregate while acknowledging that has never been properly tested.

The practical rule is to compare like with like. A team's xG% on one site and a rival's on another are not comparable numbers, even if they look it.

## What expected goals cannot see

The models are only as good as the data, and the public data has real gaps:

- **No passing data.** Evolving-Hockey's write-up shows cross-crease passes and stretch passes producing low expected-goal values for chances that were plainly dangerous, because the model sees a shot from a location, not the pass that moved the goalie.
- **No player positions.** Without tracking data, a model does not know where the other players were on the ice — including anyone standing between the shooter and the goalie.
- **Recording errors.** MoneyPuck's own illustration includes a slap shot that was recorded closer to the net than it really was, inflating its expected-goal value.
- **Blocked attempts.** They carry no expected goals at all, though the decision to shoot into a block is part of the game.

None of this makes expected goals useless. It makes it a better description of shot locations and sequences than of the full play.

## A short history

Evolving-Hockey's write-up traces the idea back to 2004. It credits Alan Ryder with the first version of the method in 2004, when such models were often called "shot quality" models, notes Brian MacDonald's model presented at the 2012 Sloan conference, and describes a 2015 model by Dawson Sprigings and Asmae Toumi that became very popular, followed by public models from Emmanuel Perry, MoneyPuck's Peter Tanner and others. What began as weighting shots has become a family of machine-learning models — which is exactly why their outputs differ.

## Using expected goals well

1. **Use enough games.** Goals are noisy; the gap between expected and actual goals over a week says little.
2. **Read xG with Corsi, not instead of it.** Attempts tell you who controlled play; expected goals tells you how dangerous that play was.
3. **Separate the shooter, the chance and the goalie.** Actual goals above expected can be finishing skill, goaltending or luck.
4. **Stick to one source** when comparing teams or players.

The same reasoning — a model turning inputs into probabilities, then outcomes drifting around them — is how sports simulations work, which is the subject of [how sports simulation engines turn ratings into results](/blog/how-sports-simulation-engines-work/). For hockey's older statistics and their blind spots, see [plus/minus and the rest of hockey's statistics](/blog/plus-minus-and-hockey-stats/).

## Expected outcomes in a draft game

[84-0 Hockey Draft & GM Manager](/apps/hockey-draft-gm-manager/) also turns inputs into an output, at the scale of a season: you draft a starting six and a coach, and its simulator projects a full 84-game record for that lineup. The projection is the game's own model judging the roster you built, from a player pool drawn from real players' careers with the game's own ratings — not a forecast of real games and not anyone's official numbers. [The hockey draft simulator guide](/blog/hockey-draft-gm-guide/) is the place to start for reading that number. [Hockey Career Sim 2026](/apps/hockey-career-sim/), by contrast, follows one player through a career in an entirely fictional league. Neither game is affiliated with any league. The [hockey hub](/sports/hockey/) collects our other hockey explainers, and the full catalogue is under [sports career and GM games](/apps/category/sports-gm/).
