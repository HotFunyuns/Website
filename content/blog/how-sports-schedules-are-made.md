---
{
  "title": "How Sports Schedules Are Made: Round-Robins, Formulas and Computers",
  "metaTitle": "How Are Sports Schedules Made? Formulas and Round-Robins",
  "description": "How league schedules are built: the round-robin circle method with a six-team example, double round-robins, the NFL's 17-game formula and the constraints.",
  "status": "published",
  "editorialReview": "automated",
  "publishedAt": "2026-10-25",
  "updatedAt": "2026-10-25",
  "author": "reign-creative-llc",
  "category": "sports-gm",
  "tags": ["scheduling", "leagues", "nfl", "round robin", "career sims"],
  "primaryKeyword": "how are sports schedules made",
  "secondaryKeywords": [
    "round robin schedule",
    "circle method scheduling",
    "nfl schedule formula",
    "double round robin league",
    "how the nfl schedule is made"
  ],
  "intent": "informational",
  "longTailKeywords": [
    "how to make a round robin schedule",
    "how many games in a double round robin",
    "how does the nfl decide who plays who",
    "why do teams get bye weeks"
  ],
  "aiSearchQuestions": [
    "How are sports league schedules made?",
    "What is the circle method for round-robin scheduling?",
    "How does the NFL decide each team's opponents?",
    "Why are computers used to build schedules?"
  ],
  "relatedApps": ["football-league-commissioner", "basketball-league-sandbox"],
  "relatedArticles": [
    "what-does-a-sports-commissioner-do",
    "football-league-commissioner-guide",
    "how-soccer-league-tables-work",
    "how-does-the-nfl-draft-work",
    "home-advantage-in-sports"
  ],
  "takeaways": [
    "In a round-robin every team plays every other once; in a double round-robin, each pair meets twice.",
    "The circle method builds a round-robin by fixing one team and rotating the rest each round; an odd number of teams adds a bye.",
    "A 20-team double round-robin needs 38 rounds and 380 matches.",
    "The NFL instead uses a formula: six division games, four against another division in the conference, four against a division in the other conference, and three games set by last season's division rank.",
    "Choosing dates is the hard part: the NFL generates thousands of possible schedules on cloud computers before picking one."
  ],
  "disclaimer": "none",
  "featured": false,
  "faqs": [
    {
      "question": "How do you make a round-robin schedule?",
      "answer": "With the circle method: number the teams and pair the first with the last, the second with the second-last and so on. Then fix one team and rotate the others one position each round. With n teams this gives n − 1 rounds in which every pair meets once."
    },
    {
      "question": "How many games are in a double round-robin?",
      "answer": "With n teams, each pair meets twice, so there are n × (n − 1) matches over 2 × (n − 1) rounds. A 20-team league therefore plays 380 matches over 38 rounds."
    },
    {
      "question": "How does the NFL decide who plays whom?",
      "answer": "By formula. The NFL's football operations site lists six games against division rivals, four against a division in the same conference, four against a division in the other conference, two against same-ranked teams from the remaining divisions in the conference, and a 17th game against a same-ranked non-conference opponent."
    },
    {
      "question": "Why do odd-numbered leagues have byes?",
      "answer": "Because one team is left without an opponent each round. Wikipedia's round-robin article explains the trick: add a dummy team, and whoever is drawn against it rests that round."
    }
  ],
  "sources": [
    {
      "title": "Creating the NFL Schedule",
      "publisher": "NFL Football Operations",
      "url": "https://operations.nfl.com/gameday/nfl-schedule/creating-the-nfl-schedule/",
      "accessed": "2026-10-24"
    },
    {
      "title": "Round-robin tournament",
      "publisher": "Wikipedia",
      "url": "https://en.wikipedia.org/wiki/Round-robin_tournament",
      "accessed": "2026-10-24"
    }
  ]
}
---

A league schedule looks like a simple list of dates, but it is the answer to a hard puzzle. Every team needs a fair set of opponents, a balance of home and away games, rest, travel that makes sense and slots that suit broadcasters. This guide covers two approaches: the **round-robin**, where everyone plays everyone, and the **formula**, where a set of rules decides who meets whom. This guide explains both, then the step that makes scheduling hard: choosing the dates.

## The round-robin

Wikipedia's article on round-robin tournaments calls it, in theory, the fairest way to determine a champion from a known, fixed number of contestants: every participant meets every other. When each pair meets twice, it is frequently called a **double round-robin**; Wikipedia notes double round-robins with no post-season are common in sports with many matches per season.

The arithmetic for n teams:

| | Single round-robin | Double round-robin |
| --- | --- | --- |
| Rounds | n − 1 | 2 × (n − 1) |
| Matches | n × (n − 1) ÷ 2 | n × (n − 1) |
| Example: 20 teams | 19 rounds, 190 matches | 38 rounds, 380 matches |

[How soccer league tables work](/blog/how-soccer-league-tables-work/) explains how those results are ranked.

## The circle method, worked through

Wikipedia describes the **circle method**: number the competitors, pair them in the first round, then fix one competitor and rotate the others one position in a fixed direction each round. With six teams, A to F:

| Round | Matches |
| --- | --- |
| 1 | A–F, B–E, C–D |
| 2 | A–E, F–D, B–C |
| 3 | A–D, E–C, F–B |
| 4 | A–C, D–B, E–F |
| 5 | A–B, C–F, D–E |

Five rounds, 15 matches, and every pair meets exactly once. For a double round-robin, repeat the five rounds with home and away reversed.

**Odd numbers of teams.** Wikipedia's trick is to add a dummy competitor: whoever is drawn against the dummy has a **bye** that round. Seven teams are scheduled as eight, and one team rests each week.

## The formula: how the NFL does it

A 32-team league playing 17 games cannot use a full round-robin, so the NFL uses a formula. Its football operations site explains that each team plays 17 regular-season games over 18 weeks, 272 games in total, with opponents set by rules:

| Games | Opponents |
| --- | --- |
| 6 | Division rivals, home and away |
| 4 | A division in the same conference, on a rotation |
| 4 | A division in the other conference, on a rotation |
| 2 | Same-ranked teams from the two remaining divisions in the conference, based on last season |
| 1 | A same-ranked non-conference opponent from a division not otherwise scheduled |

The rotation means every team plays every team in each division of the other conference once every four years. Because three games are matched by last season's division finish, a division winner meets other division winners in those three games the next year.

## Choosing the dates: where computers come in

Knowing opponents is only the start. The NFL describes its schedule makers working around events already booked at or near stadiums, collecting information from clubs from January, and using thousands of cloud-based computers to produce thousands of possible schedules before choosing the best. International games are set early, with the travel in the surrounding weeks considered too. For 2026, the league announced nine regular-season games outside the US, including first games in Melbourne, Paris and Rio de Janeiro.

The NFL also adjusts schedules during the season. **Flexible scheduling**, introduced in 2006, lets the league move games into prime-time slots so they feature compelling matchups, and the final week's games are timed once playoff implications are known. Home games alternate too: the league notes that teams alternate seasons between hosting nine regular-season games and one preseason game, and eight regular-season games and two preseason games, so home games even out across two seasons.

## The constraints every scheduler balances

1. **Fairness:** comparable opponents and a balance of home games, because [home advantage](/blog/home-advantage-in-sports/) is real.
2. **Rest:** byes and spacing between games.
3. **Travel:** avoiding long trips back to back.
4. **Venues:** stadiums shared with other events.
5. **Broadcast:** marquee games in the best slots.

Running a league means owning these trade-offs, which is part of [what a sports commissioner does](/blog/what-does-a-sports-commissioner-do/). In [Football League Commissioner](/apps/football-league-commissioner/), one of our [sports career games](/apps/category/sports-gm/), the store screenshots show a schedule creator among the commissioner's tools; [the game guide](/blog/football-league-commissioner-guide/) explains the rest.
