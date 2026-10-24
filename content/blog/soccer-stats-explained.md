---
{
  "title": "Soccer Stats Explained: Shots on Target, Key Passes, PPDA and Expected Assists",
  "metaTitle": "Soccer Stats Explained: What Each Number Rewards",
  "description": "Shots on target, key passes, expected assists, PPDA, tackles and points per game: what each soccer stat counts, what it rewards and what it hides.",
  "status": "published",
  "editorialReview": "organization",
  "reviewAttestation": "library-2026-10-24",
  "publishedAt": "2026-10-02",
  "updatedAt": "2026-10-02",
  "author": "reign-creative-llc",
  "category": "sports-gm",
  "tags": [
    "soccer stats",
    "soccer analytics",
    "ppda",
    "expected assists",
    "statistics"
  ],
  "primaryKeyword": "soccer stats explained",
  "secondaryKeywords": [
    "shots on target vs shots on goal",
    "progressive passes meaning",
    "ppda meaning",
    "expected assists",
    "points per game soccer",
    "soccer player stats explained"
  ],
  "intent": "informational",
  "longTailKeywords": [
    "what counts as a shot on target",
    "what is a key pass in soccer",
    "what does ppda mean",
    "what are expected assists",
    "how to calculate points per game"
  ],
  "aiSearchQuestions": [
    "What counts as a shot on target in soccer?",
    "What is a key pass?",
    "What does PPDA mean in soccer?",
    "What are expected assists (xA)?",
    "How is points per game calculated?"
  ],
  "relatedApps": [
    "soccer-draft-gm-xi",
    "soccer-career-sim-xi"
  ],
  "relatedArticles": [
    "clean-sheets-explained",
    "how-soccer-league-tables-work",
    "style-fit-vs-rating-in-squad-building",
    "goal-difference-and-tiebreakers",
    "soccer-formations-explained",
    "how-the-fifa-world-ranking-works"
  ],
  "takeaways": [
    "Before comparing any two numbers, check that they come from the same provider's definitions — event counts are defined, not observed.",
    "Treat counting stats such as tackles and shots as descriptions of what a player was asked to do, not as rankings of quality.",
    "Use key passes and expected assists together: one counts chances created, the other estimates how good those passes were.",
    "Read PPDA as pressing intensity in a chosen zone — lower means more aggressive — not as a measure of whether the press worked.",
    "Compare teams with unequal fixtures by points per game, and remember it describes the past rather than predicting the rest of the season."
  ],
  "disclaimer": "none",
  "featured": false,
  "faqs": [
    {
      "question": "What counts as a shot on target?",
      "answer": "In Opta's definitions, a shot on target is a deliberate attempt that would have gone in: goals, shots saved by the goalkeeper, and shots blocked by a last-line defender. A shot that hits the post or bar counts as off target unless the ball then goes in. If a site uses a different label, such as 'shots on goal', check whether it counts the same events."
    },
    {
      "question": "What is a key pass?",
      "answer": "Opta defines a key pass as the final pass to a team-mate who then has a shot without scoring. A pass that leads to a goal is an assist instead. Assists and key passes together make up 'chances created'."
    },
    {
      "question": "What does PPDA mean?",
      "answer": "Passes allowed per defensive action: the number of passes the opposing team makes divided by the number of defensive actions — tackles, interceptions, challenges and fouls — in a chosen area of the pitch. In the zone-based version Colin Trainor published in 2014, he counted events in the defending team's attacking half plus a little of its own half. A lower number means more aggressive pressing."
    },
    {
      "question": "What are expected assists (xA)?",
      "answer": "Expected assists estimate how likely a pass is to become an assist. In Stats Perform's model, every completed pass gets a value between 0 and 1, whether or not the receiver shoots, so a player is credited for creating good chances even when team-mates do not finish them."
    },
    {
      "question": "How do you calculate points per game?",
      "answer": "Divide points by matches played. Thirty points from fifteen matches is 2.00 per game; thirty-three from eighteen is about 1.83. It is a fair way to compare teams that have played different numbers of matches, but it describes results so far rather than forecasting the rest of a season."
    }
  ],
  "sources": [
    {
      "title": "Opta Event Definitions",
      "publisher": "Stats Perform",
      "url": "https://www.statsperform.com/opta-event-definitions/",
      "accessed": "2026-10-02"
    },
    {
      "title": "What Are Expected Assists (xA)?",
      "publisher": "Opta Analyst (Stats Perform)",
      "url": "https://theanalyst.com/articles/what-are-expected-assists-xa",
      "accessed": "2026-10-02"
    },
    {
      "title": "Defensive Metrics: Measuring the Intensity of a High Press (Colin Trainor, 2014)",
      "publisher": "StatsBomb, now hosted by Hudl",
      "url": "https://www.hudl.com/blog/defensive-metrics-measuring-the-intensity-of-a-high-press",
      "accessed": "2026-10-02"
    },
    {
      "title": "Impact of Technical-Tactical and Physical Performance on the Match Outcome in Professional Soccer: A Case Study (Barthelemy et al., 2024)",
      "publisher": "Journal of Human Kinetics, via PubMed Central",
      "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC11571459/",
      "accessed": "2026-10-02"
    },
    {
      "title": "What Is Expected Goals (xG)?",
      "publisher": "Opta Analyst (Stats Perform)",
      "url": "https://theanalyst.com/articles/what-is-expected-goals-xg",
      "accessed": "2026-10-02"
    }
  ]
}
---

**Every soccer (association football) statistic answers a narrower question than it seems to.** A shot on target, a key pass or a tackle is an event that a data provider has defined and a coder has logged, so the first thing to know about any number is what exactly it counts. The second is what it rewards — and the third, which most stat lines never mention, is what it hides.

This guide takes the common numbers one at a time, using the published definitions of Opta, Stats Perform's event-data brand, and the original definition of PPDA. Definitions differ between providers, so treat these as one reference point rather than the only one.

## The quick reference

| Stat | What it counts | Rewards | Hides |
| --- | --- | --- | --- |
| Shots on target | Attempts that would have scored without a save or last-line block | Getting the ball to goal | How good the chances were |
| Big chances | Situations where a player should reasonably be expected to score | Chance quality, in a yes/no form | Everything just below the threshold |
| Key passes | Final passes to a team-mate who shoots without scoring | Creating shots | Whether the shots were any good |
| Expected assists (xA) | Probability each completed pass becomes an assist | Passing into dangerous areas | Passes that were never completed |
| Tackles and interceptions | Ball won by a legal challenge, or a pass read and cut out | Defensive involvement | Good positioning that prevents the need |
| PPDA | Opponent passes per defensive action in a chosen zone | Pressing intensity | Whether the press succeeded |
| Points per game | Points ÷ matches played | Results, adjusted for fixtures played | Which fixtures are still to come |

## Shooting numbers

### Shots and shots on target

In [Opta's definitions](https://www.statsperform.com/opta-event-definitions/), a shot on target is "a deliberate attempt to score that is on target": goals, shots saved by the goalkeeper, and shots blocked by a last-line defender who stops the ball going in. A shot off target misses without a deflection pushing it wide, and a shot that hits the frame of the goal counts as **off** target unless the ball then goes in. Shots blocked by an outfield player with other defenders or the goalkeeper behind them are a separate category.

**What it rewards:** making the goalkeeper work. **What it hides:** quality. A 35-metre drive straight at the keeper and a close-range finish both count as one. If a site uses a different label — "shots on goal" is a common one — check its definition before comparing it with an Opta count.

### Big chances

Opta's "big chance" is a situation where a player "should reasonably be expected to score", usually one-on-one or from very close range with a clear path to goal and little pressure; every penalty counts as one. It is a human judgment in a yes/no form, which makes it intuitive and coarse at the same time. Expected goals is the probabilistic version of the same idea, giving each shot a value between 0 and 1 rather than a tick, as [Opta's xG explainer](https://theanalyst.com/articles/what-is-expected-goals-xg) sets out.

## Creating chances

### Assists, key passes and chances created

Opta's assist is "the final touch from a teammate" that leads to a goal; a key pass is the final pass to a team-mate who shoots **without** scoring; and "chances created" is the two added together. All three depend on what the receiver does next. A perfect through ball to a striker who then miscontrols it creates nothing on the stat sheet.

### Expected assists (xA)

[Expected assists](https://theanalyst.com/articles/what-are-expected-assists-xa) fix that dependency. Stats Perform's model gives every completed pass a value between 0 and 1 for how likely it is to become an assist, "regardless of whether the receiver takes a shot or not", using a logistic regression trained on hundreds of thousands of historical passes. **What it rewards:** passing into dangerous areas. **What it hides:** ambition that failed — an incomplete pass gets no value — and the receiver's movement that made the pass possible.

### Progression

A "progressive pass" count only means something alongside its definition — how far forward a pass must move the ball to qualify — and that definition is the provider's choice. Opta's published sequence statistics measure the underlying idea directly: "progress" is the distance in metres the ball moved towards the opponent's goal line during a sequence of play. When you see a progressive-pass count, look for the threshold before you compare it with anything.

## Defensive numbers

### Tackles, interceptions, clearances and recoveries

Opta counts a tackle when a player wins the ball from an opponent in possession with a legal, ground-level challenge — "won" if their team keeps the ball, "lost" if it goes to an opponent. An interception is a pass read and cut out; a clearance gets the ball away from danger with no particular target; a ball recovery is the moment possession changes hands in open play.

**What they reward:** involvement. **What they hide:** context. A defender who is always in the right place may need to tackle less, and a team that has the ball most of the time offers fewer chances to make any of these actions. A high tackle count can describe a busy afternoon as easily as a good one.

### PPDA: passes allowed per defensive action

PPDA comes from Colin Trainor, who floated the idea in an October 2013 piece and set out the zone-based version in [a 2014 StatsBomb article](https://www.hudl.com/blog/defensive-metrics-measuring-the-intensity-of-a-high-press). It divides the passes the opposing team makes by the defending team's defensive actions — tackles, interceptions, challenges and fouls — counting only events in a chosen zone. Trainor used the area beyond Opta's x = 40 line, which covers a team's attacking half and "a little bit" of its own half.

A worked example with invented numbers: if the opponents complete 180 passes in that zone and the defending team makes 20 defensive actions there, PPDA is 180 ÷ 20 = 9. Make 30 defensive actions against the same passes and it falls to 6. **Lower means more intense pressing.** Trainor described it as a descriptive measure of intensity — it says nothing about whether the press won the ball, and, as he noted, teams that wait for pressing triggers will not press all the time.

### Clean sheets

A clean sheet is a match without conceding, which sounds like a defensive statistic and is really a team one. [Clean sheets explained](/blog/clean-sheets-explained/) covers what it does and does not measure.

## Points per game

Points per game is points divided by matches played. Thirty points from fifteen matches is 2.00; thirty-three from eighteen is about 1.83 — the second team is higher in the table and behind on rate. It is the fair way to compare teams with games in hand, as [how soccer league tables work](/blog/how-soccer-league-tables-work/) explains, but it describes results so far; remaining fixtures are not interchangeable. When teams finish level on points, [goal difference and tiebreakers](/blog/goal-difference-and-tiebreakers/) takes over.

## Which numbers actually separate results?

Research can test which indicators line up with winning, within limits. A 2024 case study by [Barthelemy and colleagues](https://pmc.ncbi.nlm.nih.gov/articles/PMC11571459/) tracked one French Ligue 2 team over 71 matches across two seasons using Opta data. Two chance-quality measures separated wins from losses: expected goals against (0.70 on average in wins, 1.24 in losses) and expected goal chains against (5.38 against 10.92). The physical-running measures showed no meaningful association with results.

The authors are careful about the limits: one team, a second-tier league, male players only, and players who did not complete 90 minutes excluded. It is also, in their words, a descriptive, comparative analysis, so it shows an association rather than a cause. The useful lesson is narrower and still valuable: in that sample, the quality of chances a team allowed lined up with its results, and how much it ran did not.

## A checklist for reading any stat line

1. **Whose definition?** Event counts depend on the provider's rules.
2. **Per what?** Per match, per 90 minutes, per possession or per season changes everything.
3. **Count or quality?** Shots and key passes count; xG and xA estimate quality.
4. **Role or merit?** A full-back's crosses and a holding midfielder's interceptions often reflect the job they were given.
5. **Sample size?** A handful of matches can make any rate look extraordinary.

## Numbers and squad building

Stat lines are tempting shortcuts when building a team, and they mislead in a specific way: they measure what a player did in someone else's system. [Style fit over rating](/blog/style-fit-vs-rating-in-squad-building/) makes the case that the right player for a role beats the higher number, and the [guide to soccer formations](/blog/soccer-formations-explained/) explains why the role decides which numbers a player will produce.

That is the logic [Pro Football GM Club Soccer](/apps/soccer-draft-gm-xi/) is built on: you draft an XI one position at a time, fit and style count alongside the ratings, and the simulated season is scored in wins, draws and losses by the game's own rules. [Football Career Soccer XI Sim](/apps/soccer-career-sim-xi/) follows a fictional player chasing goals, assists and clean sheets across a career. Neither game forecasts real matches, and neither is affiliated with any league or data provider. Other numbers-and-tactics explainers are linked from the [soccer hub](/sports/soccer/); for the games, see [sports career and GM games](/apps/category/sports-gm/).
