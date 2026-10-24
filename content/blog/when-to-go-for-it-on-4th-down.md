---
{
  "title": "When to Go for It on Fourth Down: What the Analytics Actually Say",
  "metaTitle": "When to Go for It on 4th Down: What the Research Says",
  "description": "What the landmark fourth-down studies found, the break-even yardage they estimated across the field, and why tracking data shrinks the case for aggression.",
  "status": "published",
  "editorialReview": "organization",
  "reviewAttestation": "library-2026-10-24",
  "publishedAt": "2026-10-02",
  "updatedAt": "2026-10-02",
  "author": "reign-creative-llc",
  "category": "sports-gm",
  "tags": [
    "american football",
    "fourth down",
    "analytics",
    "decision making",
    "career sims"
  ],
  "primaryKeyword": "when to go for it on 4th down",
  "secondaryKeywords": [
    "fourth down analytics",
    "when to go for it on 4th down chart",
    "go for it on 4th down analytics",
    "4th down decision chart",
    "4th down analytics nfl"
  ],
  "intent": "informational",
  "longTailKeywords": [
    "should you go for it on 4th and 1",
    "why do coaches punt on 4th down",
    "what is the dead zone in football",
    "how do fourth down models work"
  ],
  "aiSearchQuestions": [
    "When should a football team go for it on fourth down?",
    "What did David Romer's fourth-down study find?",
    "Does tracking data change the case for going for it on fourth down?",
    "What inputs does a fourth-down decision model use?"
  ],
  "relatedApps": [
    "football-career-sim",
    "football-draft-gm-mode"
  ],
  "relatedArticles": [
    "how-sports-simulation-engines-work",
    "understanding-sports-sim-probability",
    "two-minute-clock-management",
    "football-draft-gm-guide",
    "two-point-conversion-chart"
  ],
  "takeaways": [
    "In Romer's estimates from 1998-2000 first quarters, going for it beat kicking on average with fewer than about 4 yards to go on a team's own half, up to about 10 yards near the opponent's 33, and always inside the opponent's 5.",
    "Teams in that sample kicked on 959 of the 1,068 fourth downs where going for it was better on average, though the estimated gain is modest per game.",
    "Use the real distance: tracking data shrinks the estimated benefit of an aggressive strategy from 0.35 to 0.22 wins per team-season for 2017-2019 without reversing it.",
    "Late in a game, judge a fourth down by win probability rather than expected points, because the score and clock change what each point is worth."
  ],
  "disclaimer": "none",
  "featured": false,
  "faqs": [
    {
      "question": "When should you go for it on fourth down?",
      "answer": "On the best-known estimates, from David Romer's study of 1998-2000 first quarters, going for it was better on average with fewer than about 4 yards to go anywhere on a team's own half, with up to 6.5 yards at the opponent's 45 and 9.8 at the opponent's 33, and always from the opponent's 5 or closer. Those are averages for the early part of a game, so the score, the clock and your own team's strengths can move the answer."
    },
    {
      "question": "What did Romer's fourth-down study find?",
      "answer": "Using play-by-play from the 1998, 1999 and 2000 NFL seasons, Romer found that teams' choices were systematically more conservative than the choices that maximised their chances of winning. On the 1,068 fourth downs where his analysis said going for it was better on average, teams kicked 959 times. He estimated the cost at roughly 2.1 percentage points of win probability per game, or slightly more than one win every three seasons."
    },
    {
      "question": "Why do coaches kick if going for it is better?",
      "answer": "Romer's paper offers possibilities rather than a verdict. He notes that conventional risk aversion cannot explain the pattern, because a game ends in a win or a loss, and suggests decision makers may weigh the visible drop in their chances after a failed attempt more heavily than an equal gain, or may simply be imperfect at maximising. He adds that the wider behavioural research offers little evidence for telling those two explanations apart."
    },
    {
      "question": "Does tracking data change the fourth-down answer?",
      "answer": "It shrinks it. Michael Lopez, writing from the NFL and Skidmore College, found that teams that went for it on fourth-and-1 were typically closer to the line to gain than teams that kicked, so earlier comparisons flattered aggression. Re-estimating with precise distances for 2017-2019 cut the estimated benefit from about 0.35 to 0.22 extra wins per team per season, which is smaller but still positive."
    },
    {
      "question": "What inputs does a fourth-down model use?",
      "answer": "At minimum: the yard line, the yards needed, the time left, the score, and both teams' timeouts, plus estimates of the chance of converting, the chance a field goal is good and where a punt is likely to land. The open-source nflfastR expected-points model, for example, also uses the season, the home team and the roof type."
    }
  ],
  "sources": [
    {
      "title": "Do Firms Maximize? Evidence from Professional Football",
      "publisher": "Journal of Political Economy (David Romer, 2006; author's copy)",
      "url": "https://eml.berkeley.edu/~dromer/papers/JPE_April06.pdf",
      "accessed": "2026-10-02"
    },
    {
      "title": "Bigger data, better questions, and a return to fourth down behavior",
      "publisher": "Michael J. Lopez, Journal of Quantitative Analysis in Sports research note (arXiv preprint)",
      "url": "https://arxiv.org/abs/1909.10631",
      "accessed": "2026-10-02"
    },
    {
      "title": "Compute expected points (calculate_expected_points)",
      "publisher": "nflfastR package documentation",
      "url": "https://nflfastr.com/reference/calculate_expected_points.html",
      "accessed": "2026-10-02"
    },
    {
      "title": "Field Descriptions",
      "publisher": "nflfastR package documentation",
      "url": "https://nflfastr.com/articles/field_descriptions.html",
      "accessed": "2026-10-02"
    }
  ]
}
---

The best-known research on fourth downs reaches a blunt conclusion: teams kick far more often than the arithmetic supports. In David Romer's study of the 1998 to 2000 NFL seasons, published in the Journal of Political Economy in 2006, going for it was the better choice on average whenever a team on its own half needed fewer than about 4 yards. The threshold rose to almost 10 yards around the opponent's 33-yard line, and inside the opponent's 5 going for it was always better. Teams kicked on 959 of the 1,068 fourth downs where his analysis said going for it was better.

A later research note by Michael Lopez, written from the NFL and Skidmore College, adds the necessary caveat. Measured with tracking data, the benefit of aggression is smaller than play-by-play studies suggested. It does not disappear.

## How the question is framed

A fourth down offers three choices: punt, kick a field goal, or try to convert. Each produces some points now, possibly none, and a new situation next. The analytic approach puts all of them on one scale, the expected point difference between the two teams from whatever situation results.

Romer built that scale from the play-by-play of virtually every regular-season game in 1998, 1999 and 2000. He used first quarters only, because score and clock distort decisions later in a game, which left 11,112 situations. Using dynamic programming, he estimated the value of a first-and-10 at every yard line, the value of kicking from each spot, from 2,560 first-quarter kicking plays, and the value of going for it. Teams went for it only 118 times in the sample, too rarely to measure directly, so he estimated the payoff from third-down plays, which face the same yardage problem.

He also assumed that teams are risk-neutral over points, so that a point is a point whenever it is scored. He shows this is an excellent approximation early in a game and says plainly that it is not a good one late.

## What the research found

| Field position | Go for it on average when fewer than about this many yards are needed |
| --- | --- |
| Anywhere on the team's own half | 4 yards |
| Opponent's 45-yard line | 6.5 yards |
| Opponent's 33 | 9.8 yards, the peak |
| Opponent's 21 | 4.0 yards, the low point in field-goal range |
| Opponent's 5 or closer | Always |

Two forces shape that curve. Between midfield and comfortable field-goal range lies the dead zone, where a field goal is unlikely and a punt nets little, so the value of kicking dips. And the chance of converting falls only slowly as the distance grows: away from the end zone, teams in the sample converted third downs 64 percent of the time with 1 yard to go, 44 percent with 5 and 34 percent with 10.

Romer's cleanest example is fourth-and-goal from the 2 early in a game. A field goal is close to a certain 3 points, while a touchdown try has roughly a three-in-seven chance of 7. The immediate payoffs are about equal, but a failed try leaves the opponent pinned at its own 2, whereas any score hands it a kickoff. His estimates make the two choices equal at about an 18 percent touchdown chance, and put the gain from going for it at roughly three percentage points of win probability. Teams in his sample faced that situation nine times and kicked all nine.

Midfield works the same way. On fourth-and-3 or 4 at the 50, a team has about an even chance of converting and gains about 6 yards on average when it tries; a punt typically leaves the opponent with a first-and-10 around its own 14. Going for it leaves the team better placed on average than its opponent; punting does not.

### What teams actually did

On the 1,604 fourth downs where kicking was better, teams went for it nine times. On the 1,068 where going for it was better, they kicked 959 times. Romer tested complications such as momentum and risk aversion about points and reports that none of them changes the basic conclusions.

He is also honest about the stakes. Being more aggressive was worth about 0.23 points per game in the first quarter alone, which he scales to roughly 2.1 percentage points of win probability over a whole game, or slightly more than one extra win every three seasons in the 16-game schedule of the time. That is real, but small enough to be invisible from one week to the next.

## What any fourth-down model needs

You do not need a calculator to follow the logic, but it helps to know what one has to estimate. The open-source models rest on the same pieces Romer used.

1. **A value for every situation.** The nflfastR package's expected-points model takes the season, which team is at home, the roof type, the seconds left in the half, the yard line, the down, the yards to go and both teams' timeouts, and returns the probability of each possible next score in the half, from a touchdown to no score at all.
2. **A conversion probability** for the yards needed from that spot, and the value of the first down that follows a success.
3. **The cost of failure,** which is the opponent's value with the ball at the spot of the stop.
4. **The kicking alternatives:** the chance a field goal is good from that distance, and where a punt is likely to leave the opponent.

Then the comparison is mechanical:

- **Go for it:** chance of converting × value after converting, plus chance of failing × value of the opponent's ball at the spot.
- **Field goal:** chance of making it × (3 points plus the value of kicking off afterwards), plus chance of missing × value of the opponent's ball after the miss.
- **Punt:** value of the opponent's ball where the punt is likely to leave it.

Late in a game, swap expected points for win probability. nflfastR carries a separate win-probability estimate for every play for exactly that reason: the value of a game-tying field goal in the final minute lies in the chance of winning it adds, not in its three points.

## The caveat: not every fourth-and-1 is the same

Play-by-play data records the distance to a first down in whole yards. Tracking data does not have to. Lopez compared the two and found that teams that went for it on fourth-and-1 were typically 0.70 yards from the line to gain, while teams that kicked were 0.98 yards away. On fourth-and-2 the medians were 1.98 and 2.06 yards. Teams were, sensibly, going for it when the real distance was shorter.

That matters because earlier studies compared teams that went for it with teams that did not as if both groups faced the same task. Re-running an earlier model on the 2017 to 2019 seasons, Lopez estimates that an aggressive strategy was worth about 0.35 extra wins per team per season using the standard yardage, and about 0.22 once the precise distance is accounted for. The estimated gain in win probability per play falls from about 3.8 percent to 2.2 percent. His conclusion is that past findings supporting aggression "may have been overstated", not that they were wrong.

## A working checklist

1. **Start with field position.** On your own half, short yardage leans towards going. In the dead zone near the opponent's 33 the case is at its widest. Near the goal line, the fact that a failed try still pins the opponent does much of the work.
2. **Use the real distance.** Fourth-and-1 covers anything from inches to a long yard, and the research says the difference is big enough to change the estimate.
3. **Change currency late.** In the fourth quarter the score and the clock decide what a point is worth, so think in win probability.
4. **Know your own team.** League-average conversion rates describe nobody in particular, so a model built on them is a starting point.
5. **Judge the decision, not the result.** At 5 yards to go, the sample's conversion rate was below one in two, so a correct decision to go for it will often fail.

## Fourth down in a career sim

In [Football Career Sim 2027's single-quarterback career](/apps/football-career-sim/), drives resolve with downs, distance, field position, turnovers, timeouts and red-zone situations, the same kind of state the models above work from. The game's outcomes come from its own model of fictional players and teams, not from historical data, so a result in the sim is not evidence about real fourth downs, and nothing here is a prediction. What transfers is the habit of asking what each option leaves behind. [How sports simulation engines turn ratings into results](/blog/how-sports-simulation-engines-work/) and [understanding probability in sports sims](/blog/understanding-sports-sim-probability/) cover that from the simulation side, and [clock management in the final two minutes](/blog/two-minute-clock-management/) covers the end-of-half decisions where expected points stop being the right measure.

If you are more interested in building the roster than calling the play, [our football draft and GM guide](/blog/football-draft-gm-guide/) explains why football rosters are judged unit by unit. There are more [American football](/sports/football/) explainers on our hub and across the [sports career and GM section](/blog/category/sports-gm/).
