---
{
  "title": "Expected Goals (xG) Explained: What the Number Measures and What It Cannot",
  "metaTitle": "Expected Goals (xG) Explained: What It Measures",
  "description": "What expected goals measures, how xG models are built from past shots, why the number is a probability rather than a prediction, and what xGOT and xGA add.",
  "status": "published",
  "editorialReview": "organization",
  "reviewAttestation": "library-2026-10-24",
  "publishedAt": "2026-10-02",
  "updatedAt": "2026-10-02",
  "author": "reign-creative-llc",
  "category": "sports-gm",
  "tags": ["expected goals", "xg", "soccer analytics", "statistics", "probability"],
  "primaryKeyword": "expected goals explained",
  "secondaryKeywords": ["xg explained", "what is expected goals", "expected goals how is it calculated", "expected goals vs actual goals", "expected goals on target xgot", "expected goals against xga", "expected goals formula"],
  "intent": "informational",
  "longTailKeywords": ["what does xg mean in soccer", "how is xg calculated", "what is a good xg", "why do teams lose with higher xg", "what is the difference between xg and xgot"],
  "aiSearchQuestions": ["What is expected goals (xG) in soccer?", "How is xG calculated?", "Why can a team with more xG lose?", "What is the difference between xG and xGOT?", "Does beating your xG mean you are a good finisher?"],
  "relatedApps": ["soccer-draft-gm-xi", "soccer-career-sim-xi"],
  "relatedArticles": ["understanding-sports-sim-probability", "clean-sheets-explained", "how-sports-simulation-engines-work", "goal-difference-and-tiebreakers", "soccer-formations-explained"],
  "takeaways": [
    "Read xG as the probability that a shot is scored, estimated from many similar past shots — and a team's xG as the sum of those probabilities.",
    "Do not treat a match xG total as the result the game should have had; Opta itself says it measures chance quality, not the expected outcome.",
    "Compare xG figures only within one provider's model, because each model uses different data and variables.",
    "Be slow to call a player a great or poor finisher from goals minus xG: the gap is noisy over small samples and models can carry built-in biases.",
    "Use xGOT for what happened after the shot and xGA for the chances a team allows; each answers a different question from plain xG."
  ],
  "disclaimer": "none",
  "featured": false,
  "faqs": [
    {
      "question": "What is expected goals (xG)?",
      "answer": "Expected goals is a number between 0 and 1 attached to each shot, estimating how likely a shot like it is to be scored based on similar shots in the past. Adding up a team's or player's shot values gives their total xG. Opta's explainer gives the example that a chance worth 0.1 xG would be scored about one time in ten."
    },
    {
      "question": "How is xG calculated?",
      "answer": "A statistical or machine-learning model is trained on a large set of past shots and learns how features such as distance, angle, body part and the type of play change the chance of scoring. Approaches include logistic regression, gradient boosting and neural networks. Opta, for example, describes a gradient-boosting model trained on nearly one million shots."
    },
    {
      "question": "Why can a team with more xG lose a match?",
      "answer": "Because xG is a probability, not a scoreline. A few good chances can all be missed and one half-chance can go in. Under simple independence assumptions, a side creating twice the xG of its opponent still fails to win a meaningful share of the time, which is why Opta stresses that xG measures chance quality rather than the expected outcome of a game."
    },
    {
      "question": "What is the difference between xG and xGOT?",
      "answer": "xG is a pre-shot measure of the chance, based on where and how the shot was taken. Expected goals on target (xGOT) is a post-shot measure for on-target shots only: it adds where in the goal the shot ended up, so a well-placed shot from a poor chance can score highly. Goalkeepers can be assessed by comparing goals conceded with the xGOT they faced."
    },
    {
      "question": "Does scoring more goals than your xG prove you are a good finisher?",
      "answer": "Not on its own. Research by Davis and Robberechts argues that the gap between goals and xG is noisy because shot outcomes vary a lot and samples are small, that sustained overperformance needs both many shots and exceptional finishing, and that standard models can understate how good the best finishers are."
    }
  ],
  "sources": [
    { "title": "What Is Expected Goals (xG)?", "publisher": "Opta Analyst (Stats Perform)", "url": "https://theanalyst.com/articles/what-is-expected-goals-xg", "accessed": "2026-10-02" },
    { "title": "Introducing Expected Goals on Target (xGOT)", "publisher": "Stats Perform", "url": "https://www.statsperform.com/insights/introducing-expected-goals-on-target-xgot/", "accessed": "2026-10-02" },
    { "title": "Expected goals in football: Improving model performance and demonstrating value (Mead, O'Hare and McMenemy, 2023)", "publisher": "PLOS ONE", "url": "https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0282295", "accessed": "2026-10-02" },
    { "title": "Biases in Expected Goals Models Confound Finishing Ability (Davis and Robberechts)", "publisher": "arXiv", "url": "https://arxiv.org/abs/2401.09940", "accessed": "2026-10-02" },
    { "title": "What Are Expected Assists (xA)?", "publisher": "Opta Analyst (Stats Perform)", "url": "https://theanalyst.com/articles/what-are-expected-assists-xa", "accessed": "2026-10-02" },
    { "title": "Impact of Technical-Tactical and Physical Performance on the Match Outcome in Professional Soccer: A Case Study (Barthelemy et al., 2024)", "publisher": "Journal of Human Kinetics, via PubMed Central", "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC11571459/", "accessed": "2026-10-02" }
  ]
}
---

**Expected goals (xG) is the probability that a shot will be scored, estimated from how often similar shots were scored in the past.** Each shot gets a value between 0 and 1; add them up and you get a team's or a player's xG for a match or a season — the number of goals those chances would produce, on average, for an average finisher. In soccer (association football), where goals are rare, that makes xG a way to describe how good a team's chances were without waiting for the ball to go in.

What it is not is a forecast of the result. Opta's own [explainer](https://theanalyst.com/articles/what-is-expected-goals-xg) puts it directly: xG "is only measuring chance quality and not the expected outcome of the game".

## From one shot to a number

An xG model is trained on a large set of past shots, each labelled goal or no goal, and learns how the circumstances of a shot change the chance of scoring. In a 2023 [PLOS ONE study](https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0282295), Mead, O'Hare and McMenemy list the usual approaches — logistic regression, gradient boosting, neural networks, support vector machines and tree-based classifiers — and identify the predominant inputs as distance, angle and shot type. Their own dataset, a full season of top-five-league event data, had roughly one goal for every tenth shot, which is the base rate every model starts from.

Commercial models add more context. Opta describes a gradient-boosting model ("XGBoost") trained on nearly one million shots from 40 competitions between 2018-19 and 2021-22, weighing more than 20 variables, among them:

- distance and angle to goal;
- the goalkeeper's position;
- how clear the shooter's view of the goal is, given other players' positions;
- pressure from defenders;
- shot type — which foot, a header, a volley, a one-on-one;
- pattern of play — open play, fast break, free kick, corner, throw-in;
- the previous action, such as a through ball or a cross.

Penalties are handled separately: Opta gives every penalty a constant 0.79 xG, reflecting historical conversion.

### What the "formula" looks like

There is no single xG formula, because each provider trains its own model and few publish the fitted weights. The simplest common form, logistic regression, looks like this:

P(goal) = 1 / (1 + e^−(b₀ + b₁·distance + b₂·angle + b₃·header + …))

The model learns the weights b₀, b₁ and so on from historical shots; the logistic function squeezes the total into a probability between 0 and 1. A tree-based model such as gradient boosting replaces the weighted sum with many small decision rules, but the output means the same thing: the share of similar shots that went in.

## A worked example: adding up a match

Assume two teams take the following shots. The values are invented for illustration, except the penalty, which uses Opta's constant.

| Team A shots | xG | Team B shots | xG |
| --- | --- | --- | --- |
| Penalty | 0.79 | Close-range finish after a cut-back | 0.60 |
| One-on-one with the goalkeeper | 0.35 | Four shots from outside the area, 0.04 each | 0.16 |
| Header from a corner | 0.30 | | |
| Three long-range efforts, 0.03 each | 0.09 | | |
| **Total** | **1.53** | **Total** | **0.76** |

Team A created about twice Team B's xG. Now treat every shot as an independent event with the probability shown — a simplification, since shots in a match are not truly independent. On those assumptions:

- Team A fails to score at all about 9% of the time (0.21 × 0.65 × 0.70 × 0.97³ ≈ 0.087);
- Team B scores at least once about 66% of the time (1 − 0.40 × 0.96⁴ ≈ 0.660);
- combining the two, Team A wins about 60% of the time, draws about 30% and loses about 10%.

So the side with twice the chances fails to win roughly four times in ten. That is not a flaw in xG; it is what probabilities do over a handful of events. [Understanding probability in sports simulations](/blog/understanding-sports-sim-probability/) walks through the same independence logic in a game setting.

## Expected goals against actual goals

The gap between a player's goals and their xG is a popular way to talk about finishing. It is also easy to over-read.

Davis and Robberechts, in a [paper on finishing ability](https://arxiv.org/abs/2401.09940), argue three things. The gap between actual and expected goals is a weak measure on its own because shot outcomes vary a great deal and samples are small. Sustained overperformance requires both a high volume of shots and exceptional finishing. And standard models carry a persistent bias that makes actual and expected goals look closer for excellent finishers than they really are — so the best finishers can be underrated rather than flattered. Their proposed fix borrows a calibration technique from AI fairness research.

Opta adds a caution about the opposite mistake: a team that has outscored its xG does not then have to underperform to "even out". Assuming it must is the gambler's fallacy; future shots carry their own probabilities.

## The variants: xGOT, xGA and xA

**Expected goals on target (xGOT)** is a post-shot model. According to [Stats Perform](https://www.statsperform.com/insights/introducing-expected-goals-on-target-xgot/), it is built from on-target shots only and combines the original xG with where the shot ended up in the goal mouth, crediting shots towards the corners more than shots down the middle. Comparing goals conceded with the xGOT a goalkeeper faced gives "goals prevented", a way to judge a keeper that [clean sheets](/blog/clean-sheets-explained/) cannot provide.

**Expected goals against (xGA)** is the same idea from the defending side: the probability of conceding from the shots the opponent takes. In a case study of one French Ligue 2 team across 71 matches, [Barthelemy and colleagues](https://pmc.ncbi.nlm.nih.gov/articles/PMC11571459/) found average xGA was significantly lower in wins than in losses (0.70 against 1.24). It is a comparison of averages for one team — an association, not proof of cause — and the authors list the team's second-division level among the study's limitations.

**Expected assists (xA)** values passes rather than shots. Opta [defines it](https://theanalyst.com/articles/what-are-expected-assists-xa) as the likelihood that a given pass becomes a goal assist, credited whether or not the receiver actually shoots — so it belongs with the passing statistics more than with shooting.

## What xG cannot tell you

- **Which team deserved to win.** The match total is a sum of probabilities, not a verdict.
- **Finishing skill over a short run.** Davis and Robberechts report that only about 9% of players who shoot in the big five European leagues take more than 50 shots in a season, too few for goals minus xG to separate skill from luck.
- **Anything the model was not given.** A model without goalkeeper position or defensive pressure treats very different shots alike, and Mead and colleagues note that models built only on distance, angle and shot type tend to predict poorly for both above- and below-average teams.
- **Comparisons across providers.** Two models can price the same shot differently. Compare like with like.
- **Why the shots happened.** xG records the chances, not the reasons: a team that sat deep after taking the lead and a team that was simply outplayed can post similar numbers. The scoreline still decides everything that counts, as [goal difference and tiebreakers](/blog/goal-difference-and-tiebreakers/) shows.

## Chances, shapes and simulations

Chance quality is shaped long before the shot. The [guide to soccer formations](/blog/soccer-formations-explained/) explains how a shape decides who arrives in the box, and [how sports simulation engines work](/blog/how-sports-simulation-engines-work/) shows how a game turns situations into weighted outcomes — the same family of idea as xG.

[Pro Football GM Club Soccer](/apps/soccer-draft-gm-xi/) drafts an XI position by position and simulates a season reported in wins, draws and losses; those results come from the game's own rules and are not forecasts of real matches. [Football Career Soccer XI Sim](/apps/soccer-career-sim-xi/) puts one fictional player in key match moments where the choice to shoot is weighed by attributes, position, energy, morale and the match situation. Neither game is affiliated with any league or data provider, and nothing here is a prediction of any kind. Our [soccer hub](/sports/soccer/) links the rest of the analytics and rules series, and both games sit in [sports career and GM games](/apps/category/sports-gm/).
