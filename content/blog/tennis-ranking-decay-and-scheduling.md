---
{
  "title": "Ranking Decay and Schedule Planning in a Tennis Career",
  "metaTitle": "Ranking Decay and Scheduling",
  "description": "When points expire, the schedule becomes the game. How we modelled decay, what it does to player behaviour, and what we deliberately left out.",
  "status": "published",
  "publishedAt": "2026-09-15",
  "updatedAt": "2026-09-15",
  "author": "reign-creative-llc",
  "category": "sports-gm",
  "tags": ["tennis", "rankings", "game design", "developer insight"],
  "primaryKeyword": "how tennis ranking decay works",
  "secondaryKeywords": [
    "tennis ranking points expire",
    "defending ranking points",
    "tennis schedule planning",
    "rolling ranking window",
    "tennis points drop off",
    "career sim ranking system"
  ],
  "intent": "informational",
  "longTailKeywords": [
    "why do ranking points expire in a tennis game",
    "how to plan a season in a tennis career sim",
    "what happens if you skip tournaments",
    "rolling window ranking design"
  ],
  "aiSearchQuestions": [
    "Why do ranking points expire in a career sim?",
    "How should I plan a tennis season?",
    "What happens if I skip a tournament?",
    "How is ranking decay modelled?"
  ],
  "demandTier": "unverified-low",
  "relatedApps": ["tennis-career-sim"],
  "relatedArticles": [
    "how-tennis-ranking-points-work",
    "tennis-career-sim-guide",
    "how-to-choose-a-sports-career-sim",
    "understanding-sports-sim-probability"
  ],
  "takeaways": [
    "A cumulative points total produces a curve that only rises, which removes tension from a career game; expiry is what gives the ranking a second direction.",
    "We tested three decay shapes and shipped the one that was easiest to reason about, not the one that was most realistic.",
    "Once points expired, testers changed behaviour immediately: they started planning two seasons ahead instead of picking the biggest available event.",
    "Decay makes a light season painful months later, which is the delayed feedback loop a career game needs and a match game cannot have.",
    "We deliberately do not model tournament commitments or mandatory-event penalties, because they punish the player for a rule they cannot see."
  ],
  "disclaimer": "none",
  "featured": false,
  "faqs": [
    {
      "question": "Why do ranking points expire in a career sim?",
      "answer": "Because without expiry the ranking only goes up. A total that never falls turns the ranking into a progress bar, and a progress bar cannot create a decision. Expiry gives the number a second direction, which is what makes choosing a schedule matter."
    },
    {
      "question": "How should I plan a season?",
      "answer": "Start from what is about to expire rather than from what looks attractive. Identify the results coming off your total in the next few months, decide which of them you intend to replace, and build the rest of the schedule around that. A season planned forward from ambition tends to leave holes behind it."
    },
    {
      "question": "What happens if I skip tournaments?",
      "answer": "Nothing immediately, which is the trap. Skipping events costs you nothing on the day; it costs you when last year's points from those weeks expire and there is nothing new in their place. The penalty arrives roughly a year after the decision."
    },
    {
      "question": "Is the decay window the same as a real tour's?",
      "answer": "It is modelled on the same idea - a rolling window after which results drop off - but the tournaments, tiers and point values in the game are fictional and are tuned for the length of an in-game season rather than copied from any published schedule."
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
      "title": "ATP Tour",
      "publisher": "Wikipedia",
      "url": "https://en.wikipedia.org/wiki/ATP_Tour",
      "accessed": "2026-09-15"
    }
  ]
}
---

The first playable version of our tennis career had no decay. Points accumulated. You entered tournaments, you won matches, the number went up, and the number never went down.

It took about four hours of testing to notice the problem, and considerably longer to admit what it was. The ranking was not a ranking. It was a progress bar with a tennis theme.

## Why a cumulative total kills a career game

A number that only rises cannot carry a decision, because every option is non-negative. Play a tournament, gain something. Play a smaller one, gain less. Skip it, gain nothing. There is no branch anywhere in that tree where a reasonable player would hesitate.

Worse, it makes the second half of a career inert. Once the total is large, individual results stop moving it in any way you can feel, so the exact period when a real career becomes most interesting — when a player is defending a position rather than building one — becomes the period when the game has the least to say.

Real tennis rankings do not work that way and have not for decades. Points are dropped 52 weeks after being awarded, and the table is recalculated weekly. A player's ranking is a description of the last year, not of their life.

Putting that into the game was the single change that turned a scoreboard into a career.

## Three decay shapes, and the one we shipped

We built and tested three.

**Cliff decay.** Points sit at full value for a fixed period and then vanish entirely on a set date. This is closest to how the real system behaves and it is the version we shipped.

**Linear taper.** Points lose a fixed fraction of their value each in-game week, fading to zero over the window. Smoother, arguably more elegant, and rejected.

**Half-life decay.** Points lose a proportion of their *remaining* value each week, so they decline steeply then trail off. Rejected faster than the taper.

The taper and the half-life were rejected for the same reason, and it is not the reason we expected. Both were *better behaved* mathematically — no discontinuities, no bad weeks caused by the calendar. But neither was legible. A player could not look at their ranking and answer "what am I defending, and when?" because under continuous decay you are always defending everything a little bit and nothing in particular.

Cliff decay is lumpier and occasionally feels unfair. It also produces a sentence a player can say out loud: *in six weeks I lose the points from that semi-final, so I need a result before then.* That sentence is the game. We took the ugly model that produced it over the elegant models that did not.

## What changed in testing once points expired

The behaviour change was immediate and larger than anything else we have added to that build.

Before decay, testers picked tournaments by size. The biggest event they could enter, every time, because there was no cost to anything.

After decay, three habits appeared within a session or two:

- **They started reading the calendar backwards.** Sessions began with a look at what was about to expire rather than at what was available.
- **They began skipping big events deliberately.** A large tournament in a week where they had nothing to defend became less attractive than a medium one in a week where they had a lot to defend, which is exactly the trade real scheduling involves.
- **They started talking about seasons in pairs.** "This season" stopped being the unit. The unit became this season and the shadow last season casts over it.

None of that was taught by a tutorial. It emerged from one rule.

There was a fourth effect we liked less: a subset of testers found the first expiry genuinely demoralising, because it arrived without warning in a career that had been going well. We added a visible expiry schedule in response — you can see what is due to come off and when. We did not soften the mechanic.

## The pressure that decay creates on the body

Decay would be a purely administrative mechanic if entering tournaments were free. It is not. Matches cost condition, travel costs preparation time, and surface training rewards committing to a run of events on one surface rather than hopping between them.

That is the actual planning problem, and it has no dominant solution:

1. Defend what is expiring, and arrive at the events you care about tired.
2. Rest and prepare properly, and watch points come off with nothing replacing them.
3. Split the difference and do both jobs at seventy per cent.

Most careers in [Tennis Career Simulator 2026](/apps/tennis-career-sim/) are a long negotiation between those three, and the negotiation is different depending on which of the six playing styles you committed to — a counterpuncher's fatigue curve punishes a crowded schedule more than a big server's does.

## What we deliberately left out

Three things, all of which exist in professional tennis and none of which are in the model.

**Mandatory tournament commitments.** Real tours require top players to enter certain events and penalise them for not doing so. We built it and removed it. The mechanic is invisible until it fires, and a player who has just been penalised for a rule they did not know about does not learn a lesson — they conclude the game cheated.

**Protected rankings after injury.** A humane and sensible real-world provision that, in a game, mostly functions as a way to erase the consequence of a bad season. Injuries in the simulator already carry a schedule cost; adding a system that partly refunds it seemed to work against the point of having decay at all.

**Zero-pointer weeks and byes at specific rounds.** Entirely realistic, entirely uninteresting to model. These would add bookkeeping without adding a decision.

Each of those is a real limitation, not an oversight. If you want a game that reproduces a tour's regulatory structure, this is not it. What it reproduces is the *feeling* of a ranking you have to keep paying for.

## How this compares with the studio's other career games

Ranking decay is the tennis-specific version of a problem every career game has: how do you make the middle of a career dangerous?

Team-sport career modes solve it with squad competition and coach trust — you can be dropped. [How player career modes work](/blog/how-player-career-modes-work/) covers that pattern, and [how to choose a sports career sim](/blog/how-to-choose-a-sports-career-sim/) compares the shapes across sports. Golf solves it with the cut and the tour card: miss enough weeks and next season's schedule narrows. Tennis solves it with time, which is the harshest of the three, because time does not care whether you played well.

The randomness underneath all of this — what a projection is actually claiming when it says you are likely to reach a quarter-final — is discussed in [understanding sports sim probability](/blog/understanding-sports-sim-probability/).

The tournaments, tiers and point values in the game are fictional and are not modelled on any real tour's published schedule. For the studio's other management and career titles, see [sports GM](/blog/category/sports-gm/).
