---
{
  "title": "How Tennis Ranking Points Work, and Why Yours Go Down",
  "metaTitle": "How Tennis Ranking Points Work",
  "description": "Ranking points are awarded by round and tournament tier, then drop off a rolling window. Why defending a result matters as much as winning a new one.",
  "status": "published",
  "publishedAt": "2026-09-15",
  "updatedAt": "2026-09-15",
  "author": "Reign Creative Team",
  "category": "sports-gm",
  "tags": ["tennis", "rankings", "rules", "reference"],
  "primaryKeyword": "tennis ranking points explained",
  "secondaryKeywords": [
    "tennis ranking points",
    "tennis ranking points system",
    "atp ranking points explained",
    "tennis ranking points per tournament",
    "how are ranking points calculated",
    "wta ranking points"
  ],
  "intent": "informational",
  "longTailKeywords": [
    "why did my tennis ranking go down after winning",
    "how often are tennis rankings updated",
    "what does defending points mean in tennis",
    "do tennis ranking points expire"
  ],
  "aiSearchQuestions": [
    "How are tennis ranking points calculated?",
    "Why do tennis ranking points expire?",
    "What does it mean to defend points?",
    "How often do the rankings update?"
  ],
  "demandTier": "unverified-high",
  "relatedApps": ["tennis-career-sim"],
  "relatedArticles": [
    "tennis-career-sim-guide",
    "tennis-ranking-decay-and-scheduling",
    "how-tennis-qualifiers-work",
    "understanding-sports-sim-probability"
  ],
  "takeaways": [
    "Points are awarded for the round you reach, scaled by the tier of the tournament, so the same result is worth very different amounts at different events.",
    "A ranking is a running total over a rolling window rather than a career tally, which is why it can fall in a week when you won matches.",
    "Defending means replacing points that are about to expire from last year's result at the same event.",
    "Only a limited number of counting results make up the total, so a player's worst results are usually invisible in the ranking.",
    "A ranking is an entry-and-seeding mechanism first and a ratings system second, which is why it is deliberately slow and deliberately backward-looking."
  ],
  "disclaimer": "none",
  "featured": false,
  "faqs": [
    {
      "question": "How are tennis ranking points calculated?",
      "answer": "Points are awarded according to the stage of the tournament a player reaches, weighted by the prestige of the event, with the four Grand Slam tournaments awarding the most. A player's ranking is the sum of a limited number of counting results, not everything they have played."
    },
    {
      "question": "Why did my ranking drop even though I won matches?",
      "answer": "Because points expire. The ATP rankings drop points 52 weeks after they were awarded. If a result from a year ago comes off the total in the same week that you add a smaller new result, the arithmetic goes backwards despite the wins."
    },
    {
      "question": "What does defending points mean?",
      "answer": "It means playing the event where you scored well last year, because that result is about to fall off the rolling window. If you match it, you stay level. If you beat it, you gain. If you skip the event or lose early, you lose the difference."
    },
    {
      "question": "How often do the rankings update?",
      "answer": "The ATP rankings are updated every Monday, so the picture changes weekly rather than at the end of a season."
    },
    {
      "question": "Does the ranking measure how good a player is right now?",
      "answer": "Not exactly. It measures results accumulated over a rolling year, which makes it a good tool for deciding tournament entry and seeding and a lagging indicator of current form. A player who improved sharply three weeks ago will not be ranked like it yet."
    }
  ],
  "sources": [
    {
      "title": "ATP rankings",
      "publisher": "Wikipedia",
      "url": "https://en.wikipedia.org/wiki/ATP_Rankings",
      "accessed": "2026-09-15"
    },
    {
      "title": "WTA rankings",
      "publisher": "Wikipedia",
      "url": "https://en.wikipedia.org/wiki/WTA_rankings",
      "accessed": "2026-09-15"
    }
  ]
}
---

A tennis ranking is not a score you accumulate. It is a running total of the points you have earned inside a rolling window of roughly the last year, recalculated every week. Points are awarded for the round you reach, scaled by how important the tournament is, and they fall off the total a year after you earned them. That last clause is the one that confuses people, and it is the reason a player can win two matches in a week and still slide down the list.

## Awarded by round, scaled by tier

The basic shape is simple. Reach a later round, earn more points. Reach the same round at a bigger event, earn more still.

Ranking points are awarded according to the stage of the tournament reached and the prestige of the tournament, with the four Grand Slam tournaments awarding the most. Below those sit the mandatory top-tier events, then a series of descending tiers, then the developmental circuits where a title might be worth less than a first-round loss at a major.

Two consequences follow, and both matter more than the exact numbers:

- **The same performance is worth wildly different amounts.** A semi-final is not a fixed unit of achievement. Where you produced it decides what it bought you.
- **The tier structure shapes the calendar.** Players do not choose events at random; they choose the highest-value events they can get into, which is why the top of the game converges on the same weeks.

## The rolling window, and why it exists

Points are dropped 52 weeks after being awarded. A ranking is therefore always a description of the last twelve months, never of a career.

This is easy to state and genuinely hard to internalise, because it inverts how most sports scoreboards behave. In a league table, points banked in August are still there in May. In tennis, August's points leave the table the following August whether you like it or not.

The design reason is straightforward: the ranking's primary job is deciding who gets into tournaments and who is seeded where. For that job, a stale total is worse than useless. A player who was excellent four years ago should not be taking a seeding from a player who is excellent now.

The side effect is a permanent treadmill. To stay still, you have to keep producing.

## What "defending points" actually means

You will hear that a player is "defending a title" or "defending 500 points." This is not a metaphor about motivation. It is an accounting statement.

Last year, at this event, in this week, a player earned a quantity of points. Those points are about to expire. If the player enters and matches last year's round, the new points replace the expiring ones and the ranking holds. If they do better, they gain the difference. If they lose earlier, or do not play, the expiring points leave and nothing replaces them.

That is why a specific week can look catastrophic for a player who is not playing badly at all. They are not losing points because of what happened this week. They are losing them because of what happened last year.

It also explains an odd behaviour: a player with very little to defend is in a structurally easy position, because almost any result is an improvement. Two players in identical form can move in opposite directions over the same fortnight purely because of what their windows held.

## Counting results, and the invisible bad weeks

A ranking is not the sum of everything played. It is the sum of a limited number of counting results — the majors, the mandatory top-tier events, and a fixed number of the best remaining results.

This has a quietly important effect: beyond a point, playing badly is free. Once a player has filled their counting slots with decent results, an early loss somewhere small does not subtract anything. It just fails to add.

That asymmetry rewards volume in a specific way. Playing more events cannot directly hurt your ranking; it can only fail to help. What it costs is elsewhere — fatigue, injury risk, and preparation time — which is precisely the trade a career game has to represent if the schedule is going to be a real decision.

## Points that expire, inside a simulation

We implemented decay in [Tennis Career Simulator 2026](/apps/tennis-career-sim/) before we implemented most of the things players ask about first, because without it a tennis career has no shape. A cumulative points total produces a curve that only ever goes up, and a game where the number only goes up is a game with no second act.

With expiry in, the career acquires a rhythm that tennis actually has. Your ranking becomes something you maintain rather than something you own. A light season is not punished immediately; it is punished later, which is far more interesting and much more annoying in exactly the right way.

We do not reproduce any real tour's points table. The players, tournaments and tiers in the game are fictional, and the ranking is an internal system tuned so that the decisions feel like the real ones, not a copy of a published schedule. That is a deliberate limit: if you want to know what a real event pays, this is not the place to look. The design account of the window we chose, and the two we rejected, is in [ranking decay and schedule planning](/blog/tennis-ranking-decay-and-scheduling/).

## Reading a ranking honestly

A few habits make the number more useful:

1. **Ask what is in the window, not just what the number is.** Two players at the same ranking can be in completely different positions depending on whether their points are recent or about to expire.
2. **Treat the ranking as an entry ticket first.** Its practical function is deciding which draws you are in and where you are seeded, which in turn decides how hard your next fortnight is. [How tennis qualifiers work](/blog/how-tennis-qualifiers-work/) covers what happens to players on the wrong side of that line.
3. **Do not confuse it with a strength rating.** It lags. A rating system built to answer "who would win" behaves differently from one built to answer "who should be seeded," and the difference is discussed in [understanding sports sim probability](/blog/understanding-sports-sim-probability/).

The women's tour runs the same basic architecture — results over a rolling period, weighted by event tier — with its own tables and its own rules about which events are mandatory.

For the rest of the studio's ranking-driven career and management games, see [sports GM](/blog/category/sports-gm/).
