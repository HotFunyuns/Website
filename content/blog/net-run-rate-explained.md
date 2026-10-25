---
{
  "title": "Net Run Rate Explained: How to Calculate NRR, With a Worked Example",
  "metaTitle": "Net Run Rate in Cricket: How to Calculate NRR",
  "description": "How net run rate is calculated under the ICC's October 2026 conditions, why an all-out side is charged its full overs, converting balls, and a worked table.",
  "status": "published",
  "editorialReview": "automated",
  "publishedAt": "2026-10-25",
  "updatedAt": "2026-10-25",
  "author": "reign-creative-llc",
  "category": "sports-gm",
  "tags": ["cricket", "net run rate", "tournaments", "statistics", "career sims"],
  "primaryKeyword": "net run rate",
  "secondaryKeywords": [
    "how to calculate net run rate",
    "nrr formula cricket",
    "net run rate all out full overs",
    "nrr tie breaker",
    "run rate per over"
  ],
  "intent": "informational",
  "longTailKeywords": [
    "why is nrr calculated on 20 overs when all out",
    "how do you convert overs and balls for run rate",
    "does a no result count in net run rate",
    "how does dls affect net run rate"
  ],
  "aiSearchQuestions": [
    "How is net run rate calculated?",
    "What happens to net run rate if a team is bowled out early?",
    "How do you convert 16.2 overs into a decimal for run rate?",
    "When is net run rate used in cricket tournaments?"
  ],
  "relatedApps": ["cricket-career-simulator"],
  "relatedArticles": [
    "how-cricket-scoring-works",
    "duckworth-lewis-stern-method",
    "cricket-stats-explained",
    "super-over-rules",
    "cricket-formats-explained"
  ],
  "takeaways": [
    "Net run rate is a team's runs per over scored across a competition minus its runs per over conceded.",
    "If a team is bowled out before its overs are up, the ICC counts its full quota of overs, not the overs actually faced.",
    "A team that chases a target down early is credited only with the overs it actually used.",
    "Balls are sixths of an over: 16.2 overs means 16 overs and 2 balls, which is 16.333 overs for the calculation.",
    "Only matches with a result count, and matches decided by DLS use the par or target scores set out in the playing conditions."
  ],
  "disclaimer": "none",
  "featured": false,
  "faqs": [
    {
      "question": "How do you calculate net run rate?",
      "answer": "Add up all the runs a team scored in the competition and divide by the overs it faced. Do the same for runs conceded and overs bowled. Subtract the second figure from the first. A positive NRR means the team scored faster than its opponents."
    },
    {
      "question": "What happens to net run rate if a team is all out?",
      "answer": "The ICC's playing conditions charge the team its full quota of overs. A side bowled out for 140 in 17.4 overs of a T20 is treated as scoring 140 off 20 overs, which lowers its run rate."
    },
    {
      "question": "How do you convert overs and balls for run rate?",
      "answer": "Each ball is one sixth of an over, even though cricket writes it after a decimal point. So 16.2 overs is 16 and 2/6 overs, or 16.333, and 30.5 overs is 30.833."
    },
    {
      "question": "Do washed-out matches count in net run rate?",
      "answer": "No. Only matches with results count. A no result has no run rate. If a result is reached using Duckworth-Lewis-Stern, the playing conditions credit the teams with par or target scores rather than the raw figures."
    }
  ],
  "sources": [
    {
      "title": "ICC Men's T20I Playing Conditions, October 2026 (clause 16.10)",
      "publisher": "International Cricket Council",
      "url": "https://images.icc-cricket.com/image/upload/prd/bsxcho7ufe2pjban0wjp.pdf",
      "accessed": "2026-10-24"
    },
    {
      "title": "Net run rate",
      "publisher": "Wikipedia",
      "url": "https://en.wikipedia.org/wiki/Net_run_rate",
      "accessed": "2026-10-24"
    }
  ]
}
---

When teams finish a group stage level on points, the table can come down to a single decimal: **net run rate**, or NRR. It looks mysterious on a points table, but it is two averages and a subtraction. The ICC's October 2026 T20I playing conditions define it, and this guide works through it with numbers.

## The definition

Clause 16.10 of the ICC's T20I playing conditions says a team's net run rate is calculated by deducting the average runs per over scored **against** that team throughout the competition from the average runs per over scored **by** it.

**NRR = (total runs scored ÷ total overs faced) − (total runs conceded ÷ total overs bowled)**

The totals are across the whole competition, not an average of each match's run rates.

## The two adjustments

1. **All out means full overs.** If a team is bowled out before its full quota of overs, the calculation uses the full quota it was entitled to, not the overs it lasted.
2. **A successful chase uses actual overs.** A team that reaches its target early is credited only with the overs it faced. Wikipedia's example: a side chasing successfully off 30.5 overs has only 30.833 overs added to its seasonal tally.

## Converting balls to overs

Cricket writes overs as "overs.balls", but a ball is one sixth of an over, as Wikipedia's article points out, not a tenth.

| Written | Means | For NRR |
| --- | --- | --- |
| 16.2 | 16 overs, 2 balls | 16.333 overs |
| 17.4 | 17 overs, 4 balls | 17.667 overs |
| 30.5 | 30 overs, 5 balls | 30.833 overs |

Treating 16.2 as sixteen and two tenths is an easy mistake, and it changes the answer.

## A worked example

Team X plays two T20 matches:

| Match | Team X batting | Opponent batting | Result |
| --- | --- | --- | --- |
| 1 | 180/5 in 20 overs | Y 150/9 in 20 overs | X won by 30 runs |
| 2 | 140 all out in 17.4 overs | Z 141/4 in 16.2 overs | Z won by 6 wickets |

**Runs and overs for X:**

- Scored: 180 + 140 = 320 runs. Overs faced: 20 + **20** = 40, because X was all out in match 2 and is charged the full 20.
- Conceded: 150 + 141 = 291 runs. Overs bowled: 20 + 16.333 = 36.333, because Z chased successfully and is credited with its actual overs.

**NRR:** 320 ÷ 40 = 8.000, minus 291 ÷ 36.333 = 8.009, gives **−0.009**.

X won one match by 30 runs, lost the other by six wickets, and still has a slightly negative NRR. Had match 2 wrongly used X's actual 17.667 overs, its NRR would have come out at about +0.486, which shows how much the all-out rule matters.

## When NRR decides positions

The T20I playing conditions give the order for teams level on points in a league: first the most wins, then the most wins against the other teams level, and only then the highest net run rate. In those conditions a win earns 2 points and a tie, no result or abandonment 1, so NRR only matters once wins and head-to-head results have failed to separate the teams.

## Rain, DLS and no results

Only matches with a result count, and a no result has no run rate. When the Duckworth-Lewis-Stern method decides a match, the conditions substitute adjusted figures:

- If the match is abandoned with a DLS result, the team batting first is credited with the second team's **par score** off the same overs the second team faced.
- If DLS was applied earlier and the match was completed, the team batting first is credited with **one run less than the target**, off the overs the second team was allotted.

[The Duckworth-Lewis-Stern method](/blog/duckworth-lewis-stern-method/) explains par scores and targets.

## The limits of NRR

Wikipedia notes common criticisms: NRR is hard to understand, and because it measures scoring speed rather than wickets, ranking by NRR does not rank teams by their margins of victory. A side that wins narrowly by wickets after a slow chase can lose ground to one that thrashes weak opposition.

[Cricket stats explained](/blog/cricket-stats-explained/) covers the individual equivalents, such as strike rate and economy, and [how cricket scoring works](/blog/how-cricket-scoring-works/) the notation behind them. Following one player's numbers through a season is part of [Cricket Sport Career Simulator](/apps/cricket-career-simulator/), one of our [sports career games](/apps/category/sports-gm/), whose store screenshots show live match stats.
