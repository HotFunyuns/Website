---
{
  "title": "How the FIFA World Ranking Works: The Elo-Style \"SUM\" Formula, Step by Step",
  "metaTitle": "How FIFA Rankings Work: The SUM Formula Explained",
  "description": "How the FIFA men's world ranking is calculated: the Elo-style SUM formula, match importance values, shoot-out and knockout rules, and worked examples.",
  "status": "published",
  "editorialReview": "organization",
  "reviewAttestation": "library-2026-10-24",
  "publishedAt": "2026-10-02",
  "updatedAt": "2026-10-02",
  "author": "reign-creative-llc",
  "category": "sports-gm",
  "tags": ["fifa ranking", "elo rating", "international soccer", "rankings", "probability"],
  "primaryKeyword": "how fifa rankings work",
  "secondaryKeywords": ["fifa ranking explained", "fifa ranking points explained", "fifa ranking system", "how are fifa rankings worked out", "elo rating vs fifa ranking", "fifa world ranking explained"],
  "intent": "informational",
  "longTailKeywords": ["how are fifa ranking points calculated", "do friendlies count in the fifa ranking", "what is the sum formula fifa", "do teams lose points for losing on penalties", "does home advantage count in fifa rankings"],
  "aiSearchQuestions": ["How are FIFA ranking points calculated?", "What is the SUM formula in the FIFA ranking?", "How much do friendlies count in the FIFA ranking?", "What happens to ranking points after a penalty shoot-out?", "Is the FIFA ranking an Elo rating?"],
  "relatedApps": ["soccer-draft-gm-xi", "soccer-career-sim-xi"],
  "relatedArticles": ["how-tennis-ranking-points-work", "understanding-sports-sim-probability", "goal-difference-and-tiebreakers", "soccer-formations-explained"],
  "takeaways": [
    "Read the ranking as a running points total: every match adds or subtracts I × (W − We) from a team's previous points.",
    "Expect bigger swings from bigger matches — a World Cup match from the quarter-finals onwards carries twelve times the weight of a friendly played outside the international windows.",
    "Remember that beating a stronger team earns more than beating a weaker one, because the expected result We is lower for the underdog.",
    "Check whether a match went to penalties: a shoot-out win counts as W = 0.75 and a shoot-out loss as W = 0.5.",
    "Note that teams cannot lose points in the knockout rounds of a final competition, so upsets there only add points."
  ],
  "disclaimer": "none",
  "featured": false,
  "faqs": [
    {
      "question": "How are FIFA ranking points calculated?",
      "answer": "Since August 2018 the men's ranking has used a formula FIFA calls SUM: after each match, P = Pbefore + I × (W − We). I is the importance of the match, W the result (1 for a win, 0.5 for a draw, 0 for a defeat) and We the expected result, worked out from the gap between the two teams' points. Points won by one team are normally lost by the other."
    },
    {
      "question": "Is the FIFA ranking an Elo rating?",
      "answer": "It is based on the Elo method, which adds or subtracts points match by match according to the relative strength of the opponents. FIFA's version adds its own adjustments: weights for different kinds of match, special values for penalty shoot-outs, and protection against losing points in the knockout rounds of final competitions."
    },
    {
      "question": "Do friendlies count in the FIFA ranking?",
      "answer": "Yes, with the lowest weights. A friendly played outside the international match calendar windows has an importance of 5, and one played inside a window has 10, compared with 25 for qualifiers and up to 60 for World Cup matches from the quarter-finals onwards."
    },
    {
      "question": "What happens to ranking points after a penalty shoot-out?",
      "answer": "A match decided by a shoot-out counts as a draw for the loser (W = 0.5) and as 'half a win' for the winner (W = 0.75). Matches won in normal or extra time are normal wins and defeats even if a shoot-out was also held to decide progress over two legs."
    },
    {
      "question": "Does home advantage count in the FIFA ranking?",
      "answer": "Not in the formula FIFA publishes. The expected result depends only on the difference between the two teams' points, with no term for where the match is played."
    }
  ],
  "sources": [
    { "title": "Revision of the FIFA / Coca-Cola World Ranking", "publisher": "FIFA", "url": "https://digitalhub.fifa.com/m/f99da4f73212220/original/edbm045h0udbwkqew35a-pdf.pdf", "accessed": "2026-10-02" },
    { "title": "Men's ranking procedure", "publisher": "FIFA (Inside FIFA)", "url": "https://inside.fifa.com/fifa-rankings/world-ranking/procedure-men", "accessed": "2026-10-02" }
  ]
}
---

**The FIFA men's world ranking is a running total: after every international match, each team's points go up or down by an amount that depends on how important the match was, what happened, and what was expected to happen.** FIFA calls the formula "SUM". It has been in use since August 2018, when the FIFA Council approved it, and FIFA's [ranking procedure page](https://inside.fifa.com/fifa-rankings/world-ranking/procedure-men) explains the name: points are added to or subtracted from the previous total rather than averaged over a period, as the older ranking did.

In soccer (association football) terms, it is a version of the Elo rating system, tuned with FIFA's own weights. Everything below comes from FIFA's [published revision document](https://digitalhub.fifa.com/m/f99da4f73212220/original/edbm045h0udbwkqew35a-pdf.pdf).

## The formula, term by term

After a match, each team's new total is:

**P = Pbefore + I × (W − We)**

| Term | Meaning | Values |
| --- | --- | --- |
| Pbefore | The team's points before the match | — |
| I | Importance of the match | From 5 to 60 (table below) |
| W | Result of the match | 1 win, 0.5 draw, 0 defeat (special values after a shoot-out) |
| We | Expected result | 1 / (10^(−dr/600) + 1) |
| dr | Difference in ratings | The team's Pbefore minus the opponent's |

We is the heart of it. When two teams have equal points, dr = 0 and We = 0.5 for both. The stronger a team is relative to its opponent, the closer its We gets to 1 — so it earns little for winning and loses a lot for failing to. The two teams' We values always add up to 1, which is why one side's gain normally matches the other's loss.

## How much each match is worth

| Type of match | Importance (I) |
| --- | --- |
| Friendly outside the international match calendar windows | 5 |
| Friendly inside an international match calendar window | 10 |
| Nations League group phase | 15 |
| Nations League play-offs and finals | 25 |
| Qualifiers for confederation finals and for the World Cup finals | 25 |
| Confederation final competition, before the quarter-finals | 35 |
| Confederation final competition, quarter-finals onwards (and Confederations Cup) | 40 |
| World Cup finals, before the quarter-finals | 50 |
| World Cup finals, quarter-finals onwards | 60 |

FIFA's stated aims were to give less weight to friendlies, more to final tournaments, and more to knockout matches than group matches. A World Cup quarter-final carries twelve times the weight of a friendly outside a window.

## A worked example, then some variations

FIFA's own example: Team A has 1300 points and beats Team B, with 1500, in a continental qualifier (I = 25).

1. dr for Team A is 1300 − 1500 = −200, so We = 1 / (10^(200/600) + 1) ≈ 1 / (2.154 + 1) ≈ 0.317.
2. Team B's We is therefore ≈ 0.683.
3. Team A: 1300 + 25 × (1 − 0.317) ≈ 1300 + 17 = **1317**.
4. Team B: 1500 + 25 × (0 − 0.683) ≈ 1500 − 17 = **1483**.

Holding the same two teams constant and changing only the match, the arithmetic gives:

| Same teams, different match | Team A (1300) | Team B (1500) |
| --- | --- | --- |
| Qualifier, A wins | +17.1 | −17.1 |
| Qualifier, draw | +4.6 | −4.6 |
| Friendly in a window, A wins | +6.8 | −6.8 |
| Friendly outside a window, A wins | +3.4 | −3.4 |
| World Cup group match, B wins | −15.9 | +15.9 |
| World Cup quarter-final, A wins | +41.0 | 0 (no loss in a knockout round) |
| World Cup quarter-final, A wins on penalties | +26.0 | 0 (no loss in a knockout round) |
| World Cup quarter-final, B wins on penalties | +11.0 | +4.0 |

The last row is the most instructive. Losing on penalties counts as a draw (W = 0.5), and a draw is a better result than Team A was expected to get, so the losing underdog gains more than the winning favourite.

## The two special rules

**Penalty shoot-outs.** A match decided by a shoot-out is treated as a draw for the loser and "half a win" for the winner: W = 0.5 and W = 0.75. If a match has a winner after normal or extra time but a shoot-out still decides who goes through — over two legs, say — it counts as a normal win and defeat.

**No losses in knockout rounds.** Teams that would earn negative points in the knockout round of a final competition — by losing, or even by winning a shoot-out against a weaker team — lose nothing. FIFA says the rule protects the totals of teams that have reached the knockout stage. It also means the system is not strictly zero-sum: in those matches the winner can gain points that the loser does not give up.

## How SUM compares with plain Elo

FIFA's document describes the Elo method as adding or subtracting points for individual matches according to the relative strength of the opponents, and notes that Elo ratings have been used in other sports for decades. SUM keeps that core — a points exchange driven by the gap between ratings — and adds FIFA's own layers:

- **Match weights.** I varies from 5 to 60 instead of being one fixed value.
- **Shoot-out values.** W = 0.75 or 0.5 rather than a full win or defeat.
- **Knockout protection.** No losses in the knockout rounds of final competitions.
- **No home term.** The published We formula depends only on the points gap; there is no adjustment for where the match is played.

The 600 in the expected-result formula sets the scale: it determines how big a points gap has to be before a result counts as a strong expectation. With a 600 divisor, a 600-point gap gives the stronger team We ≈ 0.91.

## What the 2018 change removed

The revision document lists what SUM was designed to fix in the previous ranking:

- **Averaging over time.** Points are no longer averaged annually, which FIFA says removes the devaluation of points over time, daily fluctuations, and the incentive to avoid friendlies to protect a ranking position.
- **Confederation weightings.** The old formula weighted results by confederation, which made climbing harder for teams outside Europe and South America; SUM removed that.
- **Hosts without qualifiers.** Teams that host a tournament, and so play no qualifiers beforehand, are less penalised, because good results in friendlies now add points.

For the switch itself, teams kept their order from the old ranking and were seeded from 1600 points for first place down in steps of 4, then the 2018 World Cup results were applied.

## Why a rating is not a prediction

We looks like a probability, and it behaves like an expectation — a win counts as 1 and a draw as 0.5 — but it is a device for deciding how many points change hands, not a forecast. The ranking also knows nothing about injuries, squads or form beyond results. [Understanding probability in sports simulations](/blog/understanding-sports-sim-probability/) explains why expected values and single outcomes so often disagree, and [how tennis ranking points work](/blog/how-tennis-ranking-points-work/) shows a very different design for ranking individuals, built on points earned at events rather than exchanged between opponents.

Club competitions settle level teams differently again, with points, [goal difference and tiebreakers](/blog/goal-difference-and-tiebreakers/) rather than ratings. [Pro Football GM Club Soccer](/apps/soccer-draft-gm-xi/) has you draft an XI position by position and simulates a season reported in wins, draws and losses under its own rules, and the [formations guide](/blog/soccer-formations-explained/) covers the squad thinking behind it. [Football Career Soccer XI Sim](/apps/soccer-career-sim-xi/) follows a fictional player whose career can include international selection. Neither game is affiliated with FIFA, and neither forecasts real results. Rankings aside, the [soccer hub](/sports/soccer/) collects our rules and tactics guides, and [sports career and GM games](/apps/category/sports-gm/) has the full list of games.
