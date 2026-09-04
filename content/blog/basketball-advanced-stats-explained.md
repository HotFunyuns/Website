---
{
  "title": "Basketball Advanced Stats Explained",
  "metaTitle": "Basketball Advanced Stats Explained",
  "description": "Per-possession thinking, true shooting, usage and rebound rate — what basketball's advanced statistics are correcting for, and where they still fall short.",
  "status": "published",
  "publishedAt": "2026-09-04",
  "updatedAt": "2026-09-04",
  "author": "Reign Creative Team",
  "category": "sports-gm",
  "tags": [
    "basketball",
    "statistics",
    "analysis"
  ],
  "primaryKeyword": "basketball advanced stats explained",
  "secondaryKeywords": [
    "true shooting percentage",
    "usage rate basketball",
    "per possession stats",
    "rebound rate explained",
    "pace adjusted stats"
  ],
  "intent": "informational",
  "longTailKeywords": [
    "what is true shooting percentage",
    "why are per game stats misleading",
    "what does usage rate mean",
    "how do you compare players on different teams"
  ],
  "aiSearchQuestions": [
    "What are basketball advanced stats?",
    "What is true shooting percentage?",
    "Why are per-game statistics misleading?",
    "What does usage rate measure?"
  ],
  "demandTier": "unverified-medium",
  "relatedApps": [
    "pro-basketball-draft-gm-mode",
    "pro-basketball-my-career-sim"
  ],
  "relatedArticles": [
    "basketball-positions-explained",
    "how-to-build-a-balanced-basketball-roster",
    "basketball-draft-gm-guide",
    "plus-minus-and-hockey-stats"
  ],
  "takeaways": [
    "Almost every advanced basketball statistic is correcting for one of two things: pace, or opportunity.",
    "Per-game numbers reward playing on a fast team and playing a lot of minutes, neither of which is a skill.",
    "True shooting percentage fixes field-goal percentage by valuing a three-pointer at three points and counting free throws.",
    "Usage rate measures how much of a team's offence runs through a player, which is context for efficiency rather than a quality measure itself.",
    "Rate statistics let you compare players across teams; they do not tell you whether a player would keep their rate in a different role."
  ],
  "disclaimer": "none",
  "featured": false,
  "faqs": [
    {
      "question": "What problem do advanced statistics solve?",
      "answer": "Two, mostly. Pace: a team that plays faster gives everyone more chances, inflating per-game totals. Opportunity: a player who takes more shots or plays more minutes accumulates more counting statistics without necessarily being better."
    },
    {
      "question": "What is true shooting percentage?",
      "answer": "A shooting efficiency measure that values a three-pointer at three points and includes free throws, rather than treating every field goal as equal. It answers 'how many points does this player generate per scoring attempt' instead of 'what fraction of shots go in'."
    },
    {
      "question": "What is usage rate?",
      "answer": "The share of a team's possessions a player ends while on the floor, through a shot, a turnover or drawing free throws. It is context rather than quality: high usage with high efficiency is excellent, high usage with poor efficiency is a problem."
    },
    {
      "question": "Why use rate statistics instead of totals?",
      "answer": "Because totals reward opportunity. A player averaging 20 points in 38 minutes on a fast team and one averaging 15 in 25 minutes on a slow one may be equally productive; only a rate reveals that."
    },
    {
      "question": "What do advanced statistics still miss?",
      "answer": "Role transferability. A player efficient in a low-usage role may not stay efficient with a larger share of the offence, and no rate statistic predicts that on its own."
    }
  ],
  "sources": [
    {
      "title": "Official Basketball Rules",
      "publisher": "FIBA",
      "url": "https://about.fiba.basketball/en/our-sport/official-basketball-rules",
      "accessed": "2026-09-03"
    },
    {
      "title": "Official Basketball Rules and Basketball Equipment (rule book downloads)",
      "publisher": "FIBA",
      "url": "https://www.fiba.basketball/documents",
      "accessed": "2026-09-03"
    }
  ]
}
---

**Almost every advanced basketball statistic is correcting for one of two things: pace, or opportunity.** Once you know that, the vocabulary stops being intimidating, because each metric is just a specific answer to "compared to what?"

## The problem with per-game numbers

A team that plays faster has more possessions. More possessions mean more shots, more rebounds and more assists for everyone on the floor — without anybody playing better.

Minutes have the same effect. A player on the floor for 38 minutes accumulates more of everything than one playing 25, and that difference is a coaching decision rather than a skill.

So "18 points per game" describes an outcome shaped by three things: how good the player is, how fast their team plays, and how long they are on the court. Advanced statistics try to isolate the first.

## Pace corrections: per-possession thinking

The standard fix is to express production **per possession** rather than per game, often scaled to a round number like 100 possessions.

This is the single most important idea in basketball analytics, and it is simple: a team's offence should be judged by points per possession, not points per game. A team scoring 118 points at a fast pace and one scoring 108 at a slow one may have identical offences.

The same applies to defence, which is why "points allowed" is close to useless as a defensive measure without a pace adjustment.

## Efficiency corrections: true shooting

Field-goal percentage has an obvious flaw: it treats a two-point shot and a three-point shot as identical successes.

**True shooting percentage** fixes this by measuring points produced per scoring attempt, valuing a three at three points and including free throws in the denominator.

The practical consequence is large. A player shooting a modest field-goal percentage from three-point range can be more efficient than one shooting a much higher percentage from mid-range, because the three is worth 50% more. This is the arithmetic behind the shift toward three-point shooting in modern basketball.

## Opportunity context: usage rate

**Usage rate** is the share of a team's possessions a player ends while on the floor — by shooting, turning it over, or drawing free throws.

Usage is **not** a quality measure. It is context for efficiency:

| Usage | Efficiency | Reading |
| --- | --- | --- |
| High | High | A genuine offensive centrepiece |
| High | Low | Taking shots the team would rather someone else took |
| Low | High | Efficient in a defined role; unproven at scale |
| Low | Low | Not contributing offensively |

The bottom-left cell is where most roster-building mistakes live. A player who is highly efficient on six shots a game may not stay efficient on eighteen, because the extra twelve are harder shots. No rate statistic tells you whether the efficiency survives the promotion.

## Rate versions of everything else

The same logic produces rebound rate (share of available rebounds grabbed while on the floor), assist rate, block rate and steal rate. Each replaces "how many" with "what share of the available opportunities", which makes players on different teams comparable.

Rebound rate is the most useful of these, because raw rebound totals are heavily influenced by how many shots miss — which is a property of the teams, not the rebounder.

## What they still miss

Three honest limitations:

**Role transferability.** Discussed above, and the most important.

**Defence is hard to measure.** Steals and blocks capture a small fraction of defensive activity. Most of defending is positioning that prevents an event from occurring, and events that do not occur are not recorded.

**Composite metrics hide their assumptions.** Single-number player ratings combine many inputs with weights chosen by their author. They are useful summaries and poor arguments, because disagreeing with the number requires disagreeing with weights you cannot see.

Hockey's plus/minus has the same fundamental problem in a cruder form — [plus/minus and hockey statistics explained](/blog/plus-minus-and-hockey-stats/) covers the parallel.

## Using this in a simulation

In [Pro Basketball GM Franchise](/apps/pro-basketball-draft-gm-mode/), you evaluate generated players from attributes rather than statistics, which sidesteps most of these problems at the draft. They return the moment your roster plays, because your own players' numbers are shaped by the roles you assigned.

Two practical rules:

- **Do not judge a bench player by their totals.** They played fewer minutes. Look at production per minute.
- **Do not assume a role change preserves efficiency.** The usage caveat applies to your own roster decisions as much as to real ones.

[How to build a balanced basketball roster](/blog/how-to-build-a-balanced-basketball-roster/) covers the minutes-as-a-budget problem this creates, and [the basketball draft and GM guide](/blog/basketball-draft-gm-guide/) covers evaluating a pool. From the player's side, [Basketball Career Sim](/apps/pro-basketball-my-career-sim/) puts you inside the usage question directly — your own share of the offence is something you earn.

Basketball's rules are published by [FIBA](https://about.fiba.basketball/en/our-sport/official-basketball-rules) and other governing bodies; positional and statistical conventions are not part of them, as [basketball positions explained](/blog/basketball-positions-explained/) covers. Every league, team and player in our games is fictional, and the catalogue is under [sports career and GM games](/apps/category/sports-gm/).
