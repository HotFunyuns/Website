---
{
  "title": "Tournament Formats Explained: Round Robin, Knockout, Double Elimination and Swiss",
  "metaTitle": "Tournament Formats Explained: Knockout, Round Robin, Swiss",
  "description": "How round robin, single and double elimination and Swiss systems work, how many games each needs, and how much luck each format leaves in the result.",
  "status": "published",
  "editorialReview": "organization",
  "reviewAttestation": "library-2026-10-24",
  "publishedAt": "2026-10-02",
  "updatedAt": "2026-10-02",
  "author": "reign-creative-llc",
  "category": "sports-gm",
  "tags": [
    "tournament formats",
    "probability",
    "league design",
    "brackets"
  ],
  "primaryKeyword": "tournament formats explained",
  "secondaryKeywords": [
    "single elimination vs double elimination",
    "swiss system tournament format",
    "round robin vs knockout",
    "what is double elimination bracket",
    "round robin tournament meaning",
    "single elimination vs double elimination vs round robin"
  ],
  "intent": "informational",
  "longTailKeywords": [
    "how many games in a round robin",
    "what is a bracket reset",
    "how many rounds in a swiss tournament",
    "why are knockout brackets seeded"
  ],
  "aiSearchQuestions": [
    "What is the difference between single and double elimination?",
    "How many games does a round robin tournament need?",
    "How does a Swiss-system tournament pair players?",
    "Which tournament format is the fairest?"
  ],
  "relatedApps": [
    "mma-boxing-fight-draft",
    "soccer-draft-gm-xi"
  ],
  "relatedArticles": [
    "understanding-sports-sim-probability",
    "goal-difference-and-tiebreakers",
    "how-tennis-qualifiers-work",
    "golf-tournament-formats",
    "how-soccer-league-tables-work",
    "mma-boxing-fight-draft-guide"
  ],
  "takeaways": [
    "Choose a format by the question the event has to answer: a ranking of everyone, one winner found quickly, or a winner who is allowed one bad day.",
    "Expect a knockout to knock out even a clear favourite most of the time: three straight wins at 70% each come off only about one time in three.",
    "Seed every knockout bracket, because a random eight-entrant draw puts the two best entrants in the same half three times in seven.",
    "Fix and announce the tie-break rule before a round robin or Swiss event starts, because short ones often end with entrants level at the top.",
    "Treat a Swiss event played over the minimum number of rounds as a knockout for first place that also ranks everyone else."
  ],
  "disclaimer": "none",
  "featured": false,
  "faqs": [
    {
      "question": "What is the difference between single and double elimination?",
      "answer": "In single elimination one loss ends an entrant's event, so a field of n entrants needs n − 1 games. In double elimination an entrant is out only after a second loss: the first loss moves it to a losers' bracket, and the event needs 2n − 2 games, or 2n − 1 if the final is replayed. The extra games buy every entrant a second chance."
    },
    {
      "question": "How many games does a round robin need?",
      "answer": "A single round robin of n entrants needs n(n − 1)/2 games, so eight entrants play 28 games and sixteen play 120. It takes n − 1 rounds when n is even, or n rounds when n is odd, because one entrant sits out each round. A double round robin, where every pair meets twice, doubles the total."
    },
    {
      "question": "How many rounds does a Swiss tournament need?",
      "answer": "At least the base-2 logarithm of the number of entrants, rounded up: three rounds for up to eight entrants and four for up to sixteen. That minimum is enough to leave one entrant alone on a perfect score when there are no draws. Organisers can declare more rounds in advance, which gives one bad result more room to be outweighed but can leave several entrants level at the top."
    },
    {
      "question": "Which tournament format is the fairest?",
      "answer": "It depends on what the event has to decide. A round robin gives every entrant the same set of opponents and is the fairest way to rank a whole field, but it is long and short ones often end level at the top. A knockout reliably settles only first place, and a Swiss event at its minimum length is no better than a knockout at finding the winner, although it ranks everyone else."
    },
    {
      "question": "What is a bracket reset in double elimination?",
      "answer": "It is the possible second game of a double-elimination final. The winners'-bracket finalist arrives unbeaten and the losers'-bracket finalist with one loss, so if the losers'-bracket side wins the first game, both have lost once and a second game decides the title. Between two evenly matched finalists, that rule hands the unbeaten side the title three times in four."
    },
    {
      "question": "Why are knockout brackets seeded?",
      "answer": "To stop the draw from deciding who meets whom early. In a random eight-entrant draw, the two best entrants meet in the first round one time in seven and land in opposite halves, the only way they can meet in the final, four times in seven. Seeding places them in opposite halves on purpose."
    }
  ],
  "sources": [
    {
      "title": "General Regulations for Competitions. Annex 1: Details of Berger Table",
      "publisher": "FIDE Handbook",
      "url": "https://handbook.fide.com/chapter/C05Annex1",
      "accessed": "2026-10-02"
    },
    {
      "title": "C.04.1 Basic rules for Swiss Systems (effective from 1 February 2026)",
      "publisher": "FIDE Handbook",
      "url": "https://handbook.fide.com/chapter/C0401202507",
      "accessed": "2026-10-02"
    },
    {
      "title": "Round-robin tournament",
      "publisher": "Wikipedia",
      "url": "https://en.wikipedia.org/wiki/Round-robin_tournament",
      "accessed": "2026-10-02"
    },
    {
      "title": "Single-elimination tournament",
      "publisher": "Wikipedia",
      "url": "https://en.wikipedia.org/wiki/Single-elimination_tournament",
      "accessed": "2026-10-02"
    },
    {
      "title": "Double-elimination tournament",
      "publisher": "Wikipedia",
      "url": "https://en.wikipedia.org/wiki/Double-elimination_tournament",
      "accessed": "2026-10-02"
    },
    {
      "title": "Swiss-system tournament",
      "publisher": "Wikipedia",
      "url": "https://en.wikipedia.org/wiki/Swiss-system_tournament",
      "accessed": "2026-10-02"
    }
  ]
}
---

**A tournament format is a trade between how many games get played and how much one bad result can cost.** A round robin, where everyone plays everyone, needs n(n − 1)/2 games for n entrants and ranks the whole field. Single elimination sends each loser home, so it finds a winner in just n − 1 games, but one off day ends anyone's event. Double elimination forgives one loss for roughly twice the games. A Swiss system plays a fixed number of rounds, pairing entrants on similar scores, so nobody is eliminated and far fewer games are needed than in a round robin.

Which one is "fairest" depends on what the event is for: naming the best entrant, ranking everybody, or rewarding whoever survives. The worked numbers below make those trade-offs concrete.

## The four formats side by side

| Format | When an entrant is out | Games, 8 entrants | Games, 16 entrants | Rounds, 8 / 16 | Fewest games any entrant plays |
| --- | --- | --- | --- | --- | --- |
| Round robin (single) | Never; ranked on totals | 28 | 120 | 7 / 15 | 7 / 15 |
| Single elimination | First loss | 7 | 15 | 3 / 4 | 1 |
| Double elimination | Second loss | 14 or 15 | 30 or 31 | Depends on the bracket | 2 |
| Swiss, minimum length | Never; ranked on score | 12 | 32 | 3 / 4 | 3 / 4 |

The formulas are short. A round robin needs n(n − 1)/2 games, over n − 1 rounds when n is even, or n rounds when n is odd because one entrant sits out each round. A knockout needs n − 1 games, because every game eliminates exactly one entrant and all but one have to go, over log₂ n rounds rounded up. Double elimination needs 2n − 2 games, or 2n − 1 if the final is played twice. A Swiss event needs at least log₂ n rounds, rounded up, to leave one entrant on a perfect score, with n/2 games a round.

## One toy field for every example

To compare the formats on equal terms, every example below uses the same simplified field:

- one **favourite**, who wins any match against anyone with probability 0.7;
- every other entrant evenly matched with every other, at 0.5;
- independent matches, no fatigue and no draws.

Real fields are not like this: seeds exist, form changes, and some matchups suit one side. But every number can be checked by hand, and the setup isolates the one thing a format controls: how many results the favourite has to get right, and how expensive a wrong one is. These are the same independence assumptions behind the season arithmetic in [understanding probability in sports simulations](/blog/understanding-sports-sim-probability/), pointed at brackets instead of seasons.

## Single elimination: three perfect days

In a knockout, the loser of every match is out. With eight entrants the favourite has to win three in a row:

0.7 × 0.7 × 0.7 = 0.343

That is about one time in three. With sixteen entrants it needs four wins, and the chance falls to 0.7⁴ ≈ 0.240. Doubling the field adds one round, and one more factor of 0.7.

Two details shape real brackets.

**Byes.** When the field is not a power of two, some entrants skip the first round. A 12-entrant bracket fills a 16-slot draw, so it needs four byes.

**Seeding.** Drawn at random, the second-best entrant is equally likely to land in any of the seven slots the favourite does not occupy. One of those slots is the favourite's first opponent, so the two best entrants meet in round one with probability 1/7, about 14%, and are placed in opposite halves, the only way they can meet in the final, with probability 4/7, about 57%. Seeding exists to take that decision away from the draw.

The same structure is why a knockout fairly decides only first place. The runner-up is the best entrant from the half the winner was not in, who may not be the second-best entrant in the event, and lower places need extra matches to settle at all. For how a knockout field gets filled before it starts, through qualifying, wild cards and lucky losers, see [how tennis qualifiers work](/blog/how-tennis-qualifiers-work/).

## Double elimination: the price of a second chance

Double elimination runs two brackets. Winners stay in the winners' bracket; a first loss drops an entrant into the losers' bracket, and a second loss ends its event. The two bracket champions meet in a final where the winners'-bracket side, still unbeaten, needs only one win, while the losers'-bracket side must win twice. If the losers'-bracket side takes the first game, a second game, often called the bracket reset, decides the title.

Lay out an eight-entrant bracket like this: first-round losers play each other; the two survivors play the two losers of the winners'-bracket semi-finals; the winners of those two games play each other; and that winner plays whoever lost the winners' final for a place in the final. The favourite can win the event by four routes:

| Favourite's route | Wins it needs | Probability |
| --- | --- | --- |
| Unbeaten through the winners' bracket | 3, then 1 of up to 2 in the final | 0.7³ × (1 − 0.3²) ≈ 0.312 |
| Loses the winners' final | 2, then 1 in the losers' bracket, then 2 in the final | 0.7⁵ × 0.3 ≈ 0.050 |
| Loses a winners'-bracket semi-final | 1, then 3 in the losers' bracket, then 2 in the final | 0.7⁶ × 0.3 ≈ 0.035 |
| Loses its first match | 4 in the losers' bracket, then 2 in the final | 0.7⁶ × 0.3 ≈ 0.035 |
| **Any route** | | **≈ 0.433** |

The second chance lifts the favourite from about 34% to about 43% in this field, and it costs 14 or 15 games instead of 7. Every entrant also gets at least two games, which a knockout cannot promise.

The final is worth a calculation of its own. Put two evenly matched sides in it, each winning any game half the time. The losers'-bracket side has to win twice in a row, which happens with probability 0.5 × 0.5 = 0.25, so the unbeaten side lifts the title three times in four. That is deliberate. The format rewards going through without a loss, and the cost of the first defeat is collected in the final.

## Round robin: everyone meets everyone, and ties arrive

A round robin takes the draw out of the result: every entrant meets every other, in rounds fixed in advance. FIDE publishes Berger tables for scheduling them; its table for four players pairs 1–4 and 2–3 in round one, 4–3 and 1–2 in round two, and 2–4 and 3–1 in round three, and in an odd field the highest number counts as a bye. For a double round robin, FIDE recommends reversing the order of the last two rounds of the first cycle so that nobody gets the same colour three games running. Most domestic football leagues run a double round robin, home and away, which for 20 teams means 20 × 19 = 380 matches over 38 rounds.

The case for the format is that one or two bad performances no longer have to end anyone's chances. The catch shows up in a small worked example. Take four entrants, the favourite and three equals, playing a single round robin of three games each:

- **The favourite wins all three** (0.7³ = 0.343) and is first outright.
- **It wins two** (3 × 0.7² × 0.3 = 0.441). It lost to one rival, who therefore already has a win. Of the eight equally likely results of the three games among the other entrants, two see that rival also beat the other two and finish first. In the remaining six, someone finishes level with the favourite on two wins, so the favourite is never alone at the top.
- **It wins one or none.** It cannot finish first. The other three share at least five wins between them, three from their own games and at least two from beating the favourite, so at least one of them has two.

So the favourite finishes first outright with probability 0.343, no better than in the eight-entrant knockout, and at least level for first with probability 0.343 + 0.441 × 6/8 ≈ 0.674. In about a third of these events the favourite's place depends on the tie-break rule, which makes the tie-break part of the format rather than a technicality. [Goal difference and league tiebreakers](/blog/goal-difference-and-tiebreakers/) covers how football settles exactly this problem.

The other costs are length, at seven rounds for eight entrants and fifteen for sixteen, and late games between entrants with no remaining chance of anything.

## Swiss system: a knockout that keeps everyone playing

A Swiss event fixes its number of rounds in advance and, each round, pairs entrants on the same or similar scores without ever repeating a pairing. FIDE's basic rules for Swiss systems, applied from 1 February 2026, add the housekeeping: when an odd number remain to be paired, one receives a bye worth a win's points unless the event's rules say otherwise, nobody receives it twice, and colours are balanced so that, barring an exception in the pairing system, nobody plays the same colour three times in a row.

Here is what the minimum length does with eight entrants, three rounds and no draws:

1. Round one leaves four entrants on 1–0.
2. Round two pairs the 1–0s with each other, leaving two on 2–0.
3. Round three pairs those two, and exactly one finishes 3–0.

The favourite finishes alone on a perfect score with probability 0.7³ = 0.343, the same as in the knockout, because the top score group is a knockout. The difference is everyone else: all eight entrants play three games and finish ranked, where a knockout sends six of them home before the final round.

Declaring more rounds than the minimum gives one bad result room to be outweighed, at the cost of more games and of entrants finishing level at the top, which is why Swiss events need tie-breaks too. The system was first used at a chess tournament in Zürich in 1895 and now runs events in chess, Go, bridge and esports, among others.

## Choosing a format

| If the event has to… | Format | What it costs |
| --- | --- | --- |
| Rank every entrant as fairly as possible | Round robin, ideally double | The most games, dead late rounds, ties |
| Find one winner quickly from a large field | Single elimination, seeded | One bad day ends anyone; only first place is reliable |
| Forgive one bad day | Double elimination | Roughly twice the games, and a final tilted towards the unbeaten side |
| Rank a large field without eliminating anyone | Swiss | At minimum length, no better than a knockout at finding the winner |
| Rank the field and still finish with a climax | Groups or Swiss rounds, then a knockout | The knockout stage brings its luck back |

Three mistakes to avoid when reading any result:

1. **Treating the runner-up as the second-best.** In a knockout, it is the best entrant from the other half of the draw.
2. **Treating the tie-break as small print.** In short round robins and Swiss events it settles a large share of outcomes.
3. **Comparing records across formats.** A 3–0 Swiss score, a 7–0 round-robin record and a title won from the losers' bracket are three different achievements.

## Formats in the draft games

[40-0 MMA & Boxing Fight Draft](/apps/mma-boxing-fight-draft/) includes a Tournament mode and a Draft Battle Royale among its seven draft formats, and is built for players who enjoy elimination brackets. Its fighter pools are built from real fighters' careers, with ratings that are the game's own estimates, and separate MMA and boxing simulators settle the bouts.

Style advantages shape those results, so the higher-rated fighter does not always get the nod, and that is exactly when the knockout arithmetic bites. Our toy favourite, a 0.7 chosen for illustration rather than a number taken from the game, still goes out of a three-round bracket about two times in three (1 − 0.343 ≈ 0.657). That argues for drafting a stable with few exploitable style matchups rather than one with a single standout rating, and the [fight draft guide](/blog/mma-boxing-fight-draft-guide/) covers how those matchups resolve.

[Pro Football GM Club Soccer](/apps/soccer-draft-gm-xi/) offers tournaments among its draft modes, next to a season mode that plays out a league campaign scored in wins, draws and losses. The two reward different squads: a league table rewards a side that rarely loses across many games, while a short competition rewards a side that wins the particular games in front of it.

None of these results describes a real fighter, player or event, and none is a forecast: each is a game's own rules applied to the roster you drafted, with chance added. The toy numbers here are a way of reading that chance, not a description of either engine. Rules and formats for each sport we cover are in our [sports guides](/sports/), and the games are listed under [sports GM apps](/apps/category/sports-gm/).
