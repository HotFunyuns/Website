---
{
  "title": "Basketball Shot Selection: Points Per Shot and the Case Against Long Twos",
  "metaTitle": "Basketball Shot Selection Explained With Points Per Shot",
  "description": "How to judge a shot by its expected points: shots at the rim, mid-range jumpers and threes compared, eFG% and true shooting, and when a 'bad' shot is right.",
  "status": "published",
  "editorialReview": "automated",
  "publishedAt": "2026-10-25",
  "updatedAt": "2026-10-25",
  "author": "reign-creative-llc",
  "category": "sports-gm",
  "tags": ["basketball", "shot selection", "analytics", "efficiency", "career sims"],
  "primaryKeyword": "basketball shot selection",
  "secondaryKeywords": [
    "points per shot basketball",
    "mid range vs three pointer",
    "expected points per shot",
    "effective field goal percentage",
    "true shooting percentage"
  ],
  "intent": "informational",
  "longTailKeywords": [
    "why is the mid range shot bad",
    "how good does a three point shooter need to be",
    "what is a good shot in basketball",
    "why are corner threes valuable"
  ],
  "aiSearchQuestions": [
    "What is good shot selection in basketball?",
    "Why do analytics favour threes and layups over mid-range shots?",
    "How do you calculate points per shot?",
    "What is the difference between eFG% and true shooting?"
  ],
  "relatedApps": ["basketball-career-pro-league", "pro-basketball-my-career-sim"],
  "relatedArticles": [
    "double-double-triple-double",
    "basketball-advanced-stats-explained",
    "how-to-read-a-basketball-box-score",
    "basketball-offense-types",
    "basketball-career-pro-league-guide"
  ],
  "takeaways": [
    "A shot's value is its make probability times its points: a 40% two is worth 0.80 points, a 36% three 1.08.",
    "To beat a 40% mid-range jumper, a three only needs to go in about 27% of the time.",
    "Analytics-driven teams, as Wikipedia notes of Daryl Morey's approach, favour threes and layups over mid-range jumpers.",
    "eFG% adjusts for the extra point of a three; true shooting also counts free throws, weighting each attempt at 0.44 of a shot.",
    "Context still matters: the shot clock, the defender and the score can make a lower-value shot the right one."
  ],
  "disclaimer": "none",
  "featured": false,
  "faqs": [
    {
      "question": "Why do analytics favour threes and layups over mid-range shots?",
      "answer": "Because of expected points. A layup goes in often and a three is worth more, while a long two is both harder than a layup and worth only two. Wikipedia describes Daryl Morey's analytics-based philosophy as favouring three-point field goals and layups over mid-range jumpers."
    },
    {
      "question": "How do you calculate points per shot?",
      "answer": "Multiply the chance the shot goes in by its point value. A two-pointer made 50% of the time is worth 1.00 point per attempt; a three made 35% of the time is worth 1.05."
    },
    {
      "question": "What is the difference between eFG% and true shooting percentage?",
      "answer": "eFG% adjusts field goal percentage for the extra point a three is worth: (field goals + 0.5 × threes made) ÷ field goal attempts. True shooting also includes free throws: points ÷ (2 × (FGA + 0.44 × FTA))."
    },
    {
      "question": "Is a mid-range shot ever a good shot?",
      "answer": "Yes. Expected points compare typical shots, but a wide-open mid-range jumper for a strong shooter can beat a contested three, and late in the shot clock any decent look beats a turnover."
    }
  ],
  "sources": [
    {
      "title": "Effective field goal percentage",
      "publisher": "Wikipedia",
      "url": "https://en.wikipedia.org/wiki/Effective_field_goal_percentage",
      "accessed": "2026-10-24"
    },
    {
      "title": "True shooting percentage",
      "publisher": "Wikipedia",
      "url": "https://en.wikipedia.org/wiki/True_shooting_percentage",
      "accessed": "2026-10-24"
    },
    {
      "title": "Three-point field goal",
      "publisher": "Wikipedia",
      "url": "https://en.wikipedia.org/wiki/Three-point_field_goal",
      "accessed": "2026-10-24"
    },
    {
      "title": "Daryl Morey",
      "publisher": "Wikipedia",
      "url": "https://en.wikipedia.org/wiki/Daryl_Morey",
      "accessed": "2026-10-24"
    }
  ]
}
---

Every possession ends with a decision: shoot now, pass for a better look, or attack the basket. Good **shot selection** means choosing the shot that is worth the most points on average, not the one that feels best. Basketball analytics put a number on that idea: expected points per attempt.

## Expected points: the one formula

A shot's value is the chance it goes in multiplied by the points it is worth:

**Expected points = make probability × point value**

Illustrative numbers for typical shots:

| Shot | Make rate (example) | Points | Expected points per attempt |
| --- | --- | --- | --- |
| Layup or dunk at the rim | 60% | 2 | 1.20 |
| Long mid-range two | 40% | 2 | 0.80 |
| Above-the-break three | 36% | 3 | 1.08 |
| Corner three | 39% | 3 | 1.17 |

The make rates are examples, but the shape is the point: the long two is the worst value on the table, because it is harder than a layup yet worth no more. A three only needs to go in about **26.7%** of the time to match a 40% mid-range jumper: 0.80 ÷ 3 = 0.267.

## Why corner threes stand out

The three-point line is not the same distance everywhere. Wikipedia notes the NBA line is 23 ft 9 in at the top but **22 ft in the corners**, a distance it has used since the 1997–98 season. That makes the corner the shortest three on an NBA floor, for the same three points. [Basketball offense types](/blog/basketball-offense-types/) shows how systems create them.

## How analytics changed the game

Wikipedia describes the basketball philosophy of executive Daryl Morey, heavily reliant on analytics, as favouring **three-point field goals and layups over mid-range jumpers**, and notes he co-founded the MIT Sloan Sports Analytics Conference. Wikipedia's article on the three-point shot also credits Stephen Curry with inspiring teams to use the three far more heavily, including from well beyond the arc. The same article says NBA three-point attempts have become increasingly frequent, particularly from mid-2015 onwards.

## Measuring a shooter: eFG% and true shooting

Plain field goal percentage treats a three like a two. Two adjusted measures fix that:

| Measure | Formula | What it adds |
| --- | --- | --- |
| Effective field goal % (eFG%) | (FG + 0.5 × 3P) ÷ FGA | The extra point a three is worth |
| True shooting % (TS%) | PTS ÷ (2 × (FGA + 0.44 × FTA)) | Free throws, each attempt weighted at 0.44 of a shot |

**Worked example.** Two players each score 20 points:

- Player A: 10 of 20 on twos, no threes, no free throws. eFG% = 10 ÷ 20 = **50%**.
- Player B: 7 of 14, including 6 threes. Points: 1 two (2) + 6 threes (18) = 20. eFG% = (7 + 3) ÷ 14 = **71%**.

Same points, very different cost in possessions. Wikipedia explains the idea behind eFG%: it shows the percentage a two-point-only shooter would need to match the output. A pure two-point shooter would have to make 10 of Player B's 14 attempts, about 71%, to score the same 20 points. [Basketball advanced stats explained](/blog/basketball-advanced-stats-explained/) covers these measures and others.

## When the "wrong" shot is right

Expected points describe averages, not every possession:

- **Shot clock.** With two seconds left, a contested long two beats a shot-clock violation, which is worth zero.
- **Defender.** A wide-open mid-range jumper for a strong shooter can be worth more than a contested three.
- **Game state.** Down three with seconds left, a two cannot tie the game unless it comes with a foul and a made free throw.
- **Free throws.** Attacking the rim can also draw fouls, and the free throws that follow add points without a field-goal attempt, which is why true shooting counts them. Wikipedia notes that big men who score around the basket and draw free throws at a high rate can post high true shooting percentages for exactly that reason.

## Reading your own shot selection

The box score shows makes and attempts by type; [how to read a basketball box score](/blog/how-to-read-a-basketball-box-score/) explains the columns. Track where your attempts come from, and whether your eFG% rises when you cut long twos. Efficiency also changes how milestones should be read; [double-doubles and triple-doubles](/blog/double-double-triple-double/) shows why a big stat line is not always an efficient one.

In [Basketball Career Pro League](/apps/basketball-career-pro-league/), one of our [sports career games](/apps/category/sports-gm/), you take the shots yourself and see the results in the box score after each game; [the game guide](/blog/basketball-career-pro-league-guide/) explains how training feeds your shooting.
