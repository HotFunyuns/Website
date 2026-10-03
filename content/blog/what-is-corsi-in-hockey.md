---
{
  "title": "What Is Corsi in Hockey? Corsi, Fenwick and PDO Explained",
  "metaTitle": "What Is Corsi in Hockey? Corsi, Fenwick and PDO",
  "description": "Corsi counts shot attempts, Fenwick drops the blocked ones and PDO adds shooting and save percentages. How each works, a worked example, and where they mislead.",
  "status": "published",
  "editorialReview": "automated",
  "publishedAt": "2026-10-02",
  "updatedAt": "2026-10-02",
  "author": "reign-creative-llc",
  "category": "sports-gm",
  "tags": [
    "hockey",
    "analytics",
    "statistics",
    "possession"
  ],
  "primaryKeyword": "what is corsi in hockey",
  "secondaryKeywords": [
    "what is a good corsi in hockey",
    "what is corsi percentage in hockey",
    "corsi hockey analytics",
    "pdo hockey meaning",
    "what is a corsi rating in hockey",
    "fenwick hockey"
  ],
  "intent": "informational",
  "longTailKeywords": [
    "difference between corsi and fenwick",
    "how do you calculate corsi for percentage",
    "why is pdo called luck in hockey",
    "what does score adjusted corsi mean"
  ],
  "aiSearchQuestions": [
    "What does Corsi measure in hockey?",
    "How do you calculate Corsi percentage?",
    "What is the difference between Corsi and Fenwick?",
    "What does PDO mean in hockey statistics?"
  ],
  "relatedApps": [
    "hockey-draft-gm-manager",
    "hockey-career-sim"
  ],
  "relatedArticles": [
    "plus-minus-and-hockey-stats",
    "hockey-line-combinations-explained",
    "hockey-draft-gm-guide"
  ],
  "takeaways": [
    "Read Corsi as shot attempts: goals, saved shots, missed shots and blocked shots, for and against, while a player or team is on the ice.",
    "Treat 50 per cent as the dividing line for Corsi percentage, because every attempt is for one team and against another, so the league as a whole sits at exactly 50 per cent.",
    "Use score- and venue-adjusted numbers where you can, because teams protecting a lead attempt fewer shots and trailing teams attempt more.",
    "Check PDO before trusting a hot streak: a team far above 100 is converting and stopping shots at a rate that rarely lasts.",
    "Pair attempt counts with a shot-quality measure, because Corsi values a point shot and a rebound in the slot the same."
  ],
  "disclaimer": "none",
  "featured": false,
  "faqs": [
    {
      "question": "What is Corsi in hockey?",
      "answer": "Corsi is a count of shot attempts: goals, shots on goal, shots that miss the net and shots that are blocked. Corsi For counts a team's attempts while a player or team is on the ice, and Corsi Against counts the opponent's. Evolving-Hockey, a public analytics site, calls it an unfortunate name for a standard concept."
    },
    {
      "question": "How is Corsi percentage calculated?",
      "answer": "Corsi percentage is Corsi For divided by the total of Corsi For and Corsi Against. A team with 500 attempts for and 600 against has a Corsi percentage of 500 ÷ 1,100, or 45.5 per cent. The same calculation works for a single player using the attempts while he was on the ice."
    },
    {
      "question": "What is a good Corsi percentage?",
      "answer": "Anything above 50 per cent means a team or player's side generated more attempts than it allowed. Because every attempt counts for one team and against another, the league as a whole sits at exactly 50 per cent, so the useful comparison is how far above or below that line someone sits — ideally after adjusting for score, venue and the team around them."
    },
    {
      "question": "What is the difference between Corsi and Fenwick?",
      "answer": "Fenwick is Corsi without the blocked shots: goals, shots on goal and missed shots, often described as unblocked shot attempts. One practical reason it matters is that, according to Evolving-Hockey, the NHL does not track where blocked shots were taken, so shot-location models are built on unblocked attempts."
    },
    {
      "question": "What does PDO mean in hockey?",
      "answer": "PDO adds a team's or player's on-ice shooting percentage to their on-ice save percentage. Values around 1.000 (or 100, if both are written as percentages) are normal, and Grantland's 2013 primer described values far above or below it as a red flag for unusually good or bad luck. Some of a high PDO can be real shooting or goaltending skill, so it is a prompt to look closer rather than a verdict."
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
      "title": "Glossary",
      "publisher": "MoneyPuck.com",
      "url": "https://moneypuck.com/glossary.htm",
      "accessed": "2026-10-02"
    },
    {
      "title": "The Faker's Guide to Advanced Stats in the NHL (Sean McIndoe, July 19, 2013)",
      "publisher": "Grantland",
      "url": "https://grantland.com/the-triangle/the-fakers-guide-to-advanced-stats-in-the-nhl/",
      "accessed": "2026-10-02"
    }
  ]
}
---

**Corsi is hockey's count of shot attempts — goals, shots on goal, shots that miss the net and shots that are blocked — for and against while a team or player is on the ice.** Expressed as a percentage, it tells you what share of the attempts in those minutes went towards the right net. Fenwick is the same count without the blocked shots, and PDO is a separate number that adds shooting percentage to save percentage to flag luck.

Evolving-Hockey, one of the public sites that publish these numbers, calls Corsi "an unfortunate name for a standard concept: shot attempts". That is the best way to think about it.

## The definitions

| Measure | What it counts | Typical form |
| --- | --- | --- |
| Shots (SF / SA) | Goals and shots the goalie saved | Totals or per 60 minutes |
| Fenwick (FF / FA) | Shots plus missed shots — every *unblocked* attempt | FF% = FF ÷ (FF + FA) |
| Corsi (CF / CA) | Fenwick plus blocked shots — *every* attempt | CF% = CF ÷ (CF + CA) |
| PDO | On-ice shooting percentage plus on-ice save percentage | Around 1.000 as decimals, or 100 when both are written as percentages |

Two details from the definitions matter in practice.

**"For" and "against" are on-ice counts.** A player's Corsi For includes every attempt his team made while he was on the ice, not only his own shots. MoneyPuck's glossary puts it plainly: for on-ice numbers, a player gets credit for every event that happens while he is on the ice, whether or not he was part of the play.

**Neither name is an acronym.** Both measures are named after people, which is why the analytics community winces at "CORSI" in capitals — a point Grantland's 2013 primer made with some relish.

## A worked example

The numbers below are invented to show the arithmetic. Suppose that over a stretch of games, these events happened at five-on-five while one defenceman was on the ice:

| Event | His team | Opponents |
| --- | --- | --- |
| Goals | 3 | 2 |
| Saved shots | 32 | 23 |
| Missed shots | 20 | 13 |
| Blocked attempts | 15 | 12 |

Working through it:

- **Shots on goal:** 3 + 32 = 35 for; 2 + 23 = 25 against.
- **Fenwick:** 35 + 20 = 55 for; 25 + 13 = 38 against. FF% = 55 ÷ 93 = 59.1 per cent.
- **Corsi:** 55 + 15 = 70 for; 38 + 12 = 50 against. CF% = 70 ÷ 120 = 58.3 per cent.
- **On-ice shooting percentage:** 3 ÷ 35 = 8.6 per cent. **On-ice save percentage:** 1 − (2 ÷ 25) = 92.0 per cent.
- **PDO:** 8.6 + 92.0 = 100.6.

Read together: his side generated a clear majority of the attempts, and the goals came in at roughly normal rates. If he had been on the ice for 60 minutes of play, his Corsi For per 60 would simply be 70.

## Why count attempts instead of goals?

Because goals are rare and attempts are not. Every goal is also a shot attempt, but so is every save, every miss and every block, so a game supplies far more attempts than goals. Grantland's 2013 primer made the case directly: goals are relatively rare events, so judging players on goal-based numbers alone is dicey, while attempts give an analyst far more to work with. A measure built on attempts reaches a meaningful sample much faster than one built on goals.

That is the core argument against [plus/minus](/blog/plus-minus-and-hockey-stats/), which hands every goal scored while a player is on the ice to that player. Grantland's primer described Corsi and Fenwick as essentially the same idea as plus/minus, "only with shot attempts instead of goals", and argued that a team taking more shots than it allows is very probably possessing the puck more. That link is why attempt counts are used as a stand-in for possession, which the public numbers do not measure directly.

## PDO: the luck detector

PDO adds on-ice shooting percentage to on-ice save percentage. Across a whole league, every goal scored is a goal conceded, so the league as a whole sits at 1.000. A team far above that is converting its chances and stopping the opponent's at an unusual rate — what the 2013 primer called "a red flag of especially good (or bad) luck" when PDO strays far from 1.000.

The useful habit is to check PDO whenever a team's results run ahead of its shot attempts. A side with an average Corsi percentage but a PDO well above 1.000 is winning on finishing and goaltending, which is harder to sustain than out-attempting opponents. Not all of it is luck — MoneyPuck, for example, estimates a separate shooting-talent figure precisely because some players really do score more from the same chances — but PDO is a prompt to look closer, not a verdict.

## Where Corsi misleads

**Score effects.** Teams play differently depending on the score. Evolving-Hockey's glossary describes the pattern: teams protecting a lead in the third period tend to defend, trailing teams press, and the effect differs for home and away teams. A team that leads often will look worse on raw Corsi than it is. Sites correct for this with score- and venue-adjusted numbers; Evolving-Hockey uses a method published by Micah Blake McCurdy.

**Shot quality.** Corsi counts a harmless point shot and a rebound in the slot as one attempt each. The 2013 primer argued that, over the long run, shot quality tends to even out. Expected-goals models take the other approach, weighting each unblocked attempt by its chance of scoring. The two are complements: attempts tell you who is driving play, expected goals tell you how dangerous that play was.

**Blocked shots.** According to Evolving-Hockey, the NHL does not track where blocked shots were taken, which is why its expected-goals model is built on unblocked attempts — Fenwick — rather than Corsi.

**Deployment and teammates.** A player's on-ice numbers depend on whom he plays with, whom he plays against and where his shifts start. The analytics community answered with relative measures, which compare a player's numbers with his team's, and context measures such as quality of teammates, quality of competition and zone starts — all of which the 2013 primer lists. [Hockey line combinations explained](/blog/hockey-line-combinations-explained/) covers how coaches shape those factors.

**Small samples.** Evolving-Hockey warns that rate statistics are notably unstable in low playing time, and recommends setting a minimum before comparing players. Ten games of Corsi says little.

**Short history.** On-ice event counts depend on the league's play-by-play tracking, which Evolving-Hockey dates to 2007. There is no Corsi for the players of earlier eras.

## How to read a Corsi number

A five-step routine keeps the number honest:

1. **Use five-on-five data.** Power plays and penalty kills distort attempt shares by design.
2. **Prefer score- and venue-adjusted figures** when they are available.
3. **Compare with 50 per cent and with the player's team.** Because every attempt counts for one side and against the other, the league as a whole sits at exactly 50 per cent, so "good" means above that — and above what his team manages overall.
4. **Check the minutes.** Set a playing-time minimum before ranking anyone.
5. **Look at PDO and shot quality** before concluding that a team is better or worse than its record.

## Statistics in a draft game

In [84-0 Hockey Draft & GM Manager](/apps/hockey-draft-gm-manager/), you compare ratings and statistics while filling a starting six and choosing a coach, and the draft simulator projects an 84-game record from the lineup. The player pool is built from real players' careers, but the ratings are the game's own estimates and the projection is the game's model, not a forecast of anything real. The questions in this article still apply to any number you weigh there: how much of it is the player, how much is the role, and how big is the sample? [The hockey draft simulator guide](/blog/hockey-draft-gm-guide/) covers balancing a roster.

If you would rather live inside the numbers than compare them, [Hockey Career Sim 2026](/apps/hockey-career-sim/) follows one player through seasons of statistics, standings and playoffs in a fictional league. Neither game is affiliated with any league. The [hockey hub](/sports/hockey/) gathers our other hockey explainers, and the full catalogue is under [sports GM](/blog/category/sports-gm/).
