---
{
  "title": "When to Pull the Goalie: What the Research Says About Empty-Net Timing",
  "metaTitle": "When to Pull the Goalie in Hockey: What Research Shows",
  "description": "Why trailing hockey teams pull the goalie, what published research found about timing, how the trade-off works, and what the models cannot see.",
  "status": "published",
  "editorialReview": "automated",
  "publishedAt": "2026-10-02",
  "updatedAt": "2026-10-02",
  "author": "reign-creative-llc",
  "category": "sports-gm",
  "tags": [
    "hockey",
    "analytics",
    "strategy",
    "goaltending"
  ],
  "primaryKeyword": "when to pull the goalie in hockey",
  "secondaryKeywords": [
    "why do hockey teams pull the goalie",
    "when do nhl teams pull goalie",
    "how often do teams score when they pull the goalie",
    "pulling the goalie",
    "pulling the goalie strategy",
    "empty net goal hockey"
  ],
  "intent": "informational",
  "longTailKeywords": [
    "should you pull the goalie on a power play",
    "how many minutes left do you pull the goalie down two",
    "is pulling the goalie worth it",
    "what happens if you pull the goalie in overtime"
  ],
  "aiSearchQuestions": [
    "Why do hockey teams pull their goalie?",
    "When is the best time to pull the goalie?",
    "Do teams score more often with an extra attacker?",
    "Does research say coaches pull the goalie too late?"
  ],
  "relatedApps": [
    "hockey-career-sim",
    "hockey-draft-gm-manager"
  ],
  "relatedArticles": [
    "hockey-goaltending-explained",
    "understanding-sports-sim-probability",
    "power-play-and-penalty-kill",
    "hockey-draft-gm-guide"
  ],
  "takeaways": [
    "Judge a goalie pull by points, not goals: a loss by three costs no more than a loss by one, while a tying goal can earn at least one point.",
    "A detailed published simulation of the decision, built on 2007-08 NHL data, found the coaching norm of the time too conservative in every scenario it tested.",
    "A power play changes the calculation: the same research found trailing teams should pull the goalie much earlier with a man advantage than at five-on-five.",
    "Treat any timing rule as a starting point, because the models assume constant scoring rates and ignore where the puck is, who is on the ice and how tired they are.",
    "In regular-season overtime the logic flips, because a team that loses with its goalie pulled forfeits the point it earned at the end of regulation."
  ],
  "disclaimer": "none",
  "featured": false,
  "faqs": [
    {
      "question": "Why do hockey teams pull the goalie?",
      "answer": "A team that is losing late replaces its goaltender with an extra skater to raise its chance of scoring. It also raises the chance of conceding into the empty net, but a loss by two goals costs no more in the standings than a loss by one, while a tying goal can earn the team at least a point. The trade is worth making when there is little time left to score at normal strength."
    },
    {
      "question": "When is the best time to pull the goalie?",
      "answer": "Research by David Beaudoin and Tim Swartz, using 2007-08 NHL data, found that coaches of that era pulled too late; the norm was about one minute left when trailing by one goal. In their simulation, an average team pulling its goalie whenever it trailed with less than three minutes left gained about one point over an 82-game season. They found earlier pulls were justified when trailing by two and much earlier pulls when the trailing team had a power play."
    },
    {
      "question": "How often do teams score with the goalie pulled?",
      "answer": "In the 2007-08 season data Beaudoin and Swartz collected, teams playing six skaters against five scored about once every 8.5 minutes, against roughly once every 26 to 29 minutes for teams at five-on-five with both goalies in. Pulling the goalie on a power play to play six-on-four produced a goal every 5.5 minutes, while those teams allowed an empty-net goal every 4.8 minutes."
    },
    {
      "question": "Should a team pull the goalie in overtime?",
      "answer": "In the regular season it is an expensive gamble. Under NHL Rule 84.2, a team that loses while its goalie is off the ice for an extra attacker forfeits the point it earned when regulation ended tied, unless the goalie went off because of a delayed penalty. A pull on a delayed penalty does not put that point at risk, although the rule adds one exception: if the non-offending team then shoots the puck into its own empty net, the game is over and the other team wins."
    },
    {
      "question": "What do goalie-pull models leave out?",
      "answer": "The research models treat each game situation as having a constant scoring rate, so they do not see where the puck is, which players are on the ice, how tired they are or how a specific opponent defends. The Beaudoin and Swartz study also used a single season of data and left out four- and five-minute penalties. Its conclusions are about averages, not about any particular game."
    }
  ],
  "sources": [
    {
      "title": "Strategies for Pulling the Goalie in Hockey (David Beaudoin and Tim B. Swartz)",
      "publisher": "Simon Fraser University, Department of Statistics and Actuarial Science",
      "url": "https://www.sfu.ca/~tswartz/papers/goalie.pdf",
      "accessed": "2026-10-02"
    },
    {
      "title": "National Hockey League Official Rules 2026-2027 (Rules 5.3, 25 and 84.2)",
      "publisher": "National Hockey League",
      "url": "https://media.nhl.com/site/asset/public/ext/2026-27/2026-27Rules.pdf",
      "accessed": "2026-10-02"
    }
  ]
}
---

**A trailing team pulls its goaltender to add a sixth skater, accepting a much higher chance of conceding into the empty net for a higher chance of tying the game — and the published research says coaches have historically done it too late.** One detailed study, which its authors described as the most comprehensive to date when they wrote it, by statisticians David Beaudoin (Université Laval) and Tim Swartz (Simon Fraser University), built a game simulator from the records of every game of the 2007-08 NHL season and found more aggressive strategies beat the coaching norm of the time in every scenario they tested.

That does not make "pull earlier" a universal rule. It makes it a well-supported starting point, with limits that are worth understanding before you apply it.

## The trade-off in one paragraph

Pulling the goalie raises two scoring rates at once: yours and your opponent's. That sounds like a wash until you ask what each goal is worth. A trailing team that concedes into the empty net loses by two instead of one, which costs nothing extra in the standings. A trailing team that scores ties the game, and in the NHL regular season a game still level at the end of regulation is worth a point to each side, with a second available in overtime. When the downside is nearly free and the upside is a point, the question is not *whether* to pull, but *when*.

Beaudoin and Swartz measured strategies by exactly that: the average number of points a team earns from a game situation (they call it ANP), including what happens in overtime and shootouts.

## What the 2007-08 data showed

Before simulating anything, the authors went through the season's detailed game records. Some of what they found:

| Situation (2007-08 regular season) | Observed rate |
| --- | --- |
| Five-on-five, both goalies in | A goal by either team every 13.7 minutes |
| Six skaters against five (goalie pulled) | The team with the extra skater scored every 8.5 minutes |
| Five-on-five, goalies in, by team | Road teams scored every 28.6 minutes, home teams every 26.2 |
| Six against four (goalie pulled on a power play) | Scored every 5.5 minutes; conceded an empty-net goal every 4.8 minutes |
| Penalties while a goalie was pulled | 44 called on the team that pulled its goalie, 84 on the opponent |

The last row is the finding the authors flag as new: in 652.4 minutes played with a goalie pulled that season, the team defending its lead was penalized nearly twice as often as the team attacking. Pulling the goalie did not just raise the scoring rate; it also made a power play more likely.

They also recorded what coaches actually did. In 2007-08, a team trailing by one typically pulled its goalie with about a minute left, and with about 1:30 left when trailing by two, and almost never did it while short-handed.

## What the simulations recommended

Using scoring and penalty rates estimated for 25 different on-ice situations, the authors valued each strategy over 150 million simulated games. A few of their results, in average points per game from the situation described:

| Scenario | Best strategy they found | Its ANP | The 2007-08 norm |
| --- | --- | --- | --- |
| Road team down 1, 3:00 left, five-on-five | Pull the goalie and leave him out until the score is tied | 0.2527 | 0.2045 |
| Home team down 2, 6:00 left, five-on-five | Pull until tied unless short-handed, holding off at one goal down until 3:00 remain | 0.0798 | 0.0512 |
| Home team down 1, 1:54 left, just short-handed | Pull until tied, even while short-handed | 0.0761 | 0.0409 |
| Road team down 3, 12:22 left, two-man advantage | Pull during any power play or four-on-four; at five-on-five, pull with 3:00 left down one or 6:00 left down two; never while short-handed | 0.0914 | 0.0661 |

Over a whole 82-game season, they estimated an average team would earn 83.7 points with the 2007-08 norm, 84.7 by pulling the goalie whenever it trailed with less than three minutes left, and 85.2 with a more aggressive approach. One extra point a season sounds small; the authors note that 13 teams in 2007-08 would have been seeded higher with 2.1 more points.

Their general conclusion was blunt: the simulations "suggest that NHL coaches are too conservative", and every earlier paper they reviewed had reached the same direction of answer. One general result stands out: trailing teams should pull their goaltenders much earlier when they have a power play than at five-on-five.

## The research before them

The question has a long academic history, which the paper summarises:

- **Morrison (1976)** wrote the first paper on the problem, comparing pulling at a given time with never pulling — a flaw later pointed out by Morrison and Wheat (1986), who corrected it.
- **Morrison and Wheat (1986)** assumed that pulling the goalie multiplies a team's scoring rate by about 2.67 and its opponent's by about 7.83.
- **Erkut (1987)** and **Nydick and Weiss (1989)** extended the model to unequal teams and different ways of estimating the rates, and showed the answer was sensitive to that choice.
- **Washburn (1991)** used dynamic programming and noted that scoring first is "neither necessary nor sufficient for victory", since a team that ties can still concede again.
- **Zaman (2001)** modelled the puck's location and suggested pulling with five to eight minutes left when down one, depending on where the puck was.

## What the models cannot see

Any timing rule from this research should come with its assumptions attached:

- **One season, one era.** The data is from 2007-08, and the results depend on scoring rates. The authors say so directly, and caution that their findings apply to the NHL rather than to leagues with different scoring levels.
- **Constant rates.** The simulation treats the time to the next goal or penalty in each situation as random but governed by a fixed average rate. Real games have momentum, fatigue and matchups that rates do not capture.
- **No puck location.** Whether the puck is in the attacking zone after a faceoff win or behind your own net matters enormously in the last minutes. Zaman's model tried to capture that; Beaudoin and Swartz's does not.
- **Some events left out.** Four- and five-minute penalties were omitted because they were rare.
- **Points, not goal differential.** The measure counts standings points. An empty-net goal against costs goal differential, and that cost is not in the model.
- **The rules have moved since.** Overtime in 2007-08 was four-on-four, as the paper describes; today it is three-on-three, so the overtime part of the model no longer matches the current game exactly.

None of this reverses the direction of the finding. It means the precise minute marks are model outputs, not laws.

## The rules that frame the decision

The NHL rulebook sets the boundaries of the gamble:

- **Any skater may replace the goaltender** (Rule 5.3), but he does not get the goaltender's privileges.
- **An empty net changes some penalties into goals.** If a team has pulled its goaltender and an attacker with a clear path to the net is fouled, the referee awards a goal instead of a penalty shot (Rule 25).
- **Overtime is different.** In regular-season overtime, a team that loses with its goalie off the ice forfeits the point it earned at the end of regulation, unless the goalie went off for a delayed penalty (Rule 84.2). With a point already banked, the third-period logic no longer applies.
- **Delayed-penalty pulls are close to free.** When the referee's arm is up, the trailing team can add an attacker with little risk, because play stops as soon as the other team gains control of the puck; the danger is putting the puck into its own empty net.

## How to think about it as a coach, GM or fan

A sensible way to use the research is as a set of questions rather than a stopwatch:

1. **Am I trailing, and is a tie worth points?** In the regular season, a tie at the end of regulation is worth a point; the earlier you can create a real chance to tie, the better.
2. **Do I have a power play?** If so, the research says pull now, not later.
3. **How many goals do I need?** Down two, the window opens much earlier than down one.
4. **Where is the puck?** An offensive-zone faceoff is the cheapest moment to add a skater; a puck in your own end is the most dangerous.

The probability reasoning behind all of this — why a small edge repeated over a season adds up — is the subject of [understanding probability in sports simulations](/blog/understanding-sports-sim-probability/), and [power play and penalty kill explained](/blog/power-play-and-penalty-kill/) covers why one extra skater changes the ice so much.

## In our games

Goaltending is where small-roster drafting is most exposed, and [the hockey draft simulator guide](/blog/hockey-draft-gm-guide/) explains why in [84-0 Hockey Draft & GM Manager](/apps/hockey-draft-gm-manager/), whose player pool is built from real players' careers with the game's own ratings and whose projections are the game's own model rather than forecasts. If you would rather be the one in the crease, [Hockey Career Sim 2026](/apps/hockey-career-sim/) treats goaltender as a full career path in a fictional league, with its own attributes and decisions; [hockey goaltending explained](/blog/hockey-goaltending-explained/) covers the position. Neither app is affiliated with any league. More hockey explainers are on the [hockey hub](/sports/hockey/), and the full catalogue is under [sports career and GM games](/apps/category/sports-gm/).
