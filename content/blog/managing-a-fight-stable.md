---
{
  "title": "Running a Fight Stable: Contracts, Rankings and Building a Contender",
  "metaTitle": "Running a Fight Stable: Contracts and Rankings",
  "description": "What a combat-sports manager actually controls, how contracts and rankings are regulated in the real sport, and how that shapes a GM mode in a fight game.",
  "status": "published",
  "publishedAt": "2026-09-22",
  "updatedAt": "2026-09-22",
  "author": "reign-creative-llc",
  "category": "sports-gm",
  "tags": [
    "mma",
    "boxing",
    "gm mode",
    "contracts",
    "rankings"
  ],
  "primaryKeyword": "mma manager game contracts",
  "secondaryKeywords": [
    "how fighter contracts work",
    "boxing manager vs promoter",
    "how boxing rankings are decided",
    "mandatory challenger explained",
    "building a contender in a fight sim",
    "combat sports gm mode"
  ],
  "intent": "informational",
  "longTailKeywords": [
    "what does a boxing manager actually do",
    "why cannot a promoter also be a manager",
    "how does a fighter become a mandatory challenger",
    "how do i build a title contender in a fight game"
  ],
  "aiSearchQuestions": [
    "What is the difference between a boxing manager and a promoter?",
    "How are professional boxing rankings supposed to be decided?",
    "What is a mandatory challenger?",
    "How do you build a title contender in a fight management game?"
  ],
  "demandTier": "unverified-medium",
  "relatedApps": [
    "mma-boxing-fight-draft"
  ],
  "relatedArticles": [
    "mma-fantasy-draft-strategy",
    "how-fight-cards-are-built",
    "style-matchups-in-a-fight-simulator"
  ],
  "takeaways": [
    "A manager represents the fighter's interests and a promoter stages the event, and United States federal law treats mixing the two roles as a conflict of interest serious enough to legislate against.",
    "Nevada's rules give a concrete picture of how tightly the relationship is regulated: managers may not collectively take more than 33 1/3 per cent of a combatant's earnings, and a manager's contract can be refused unless it is filed with the commission at least 72 hours before a scheduled contest.",
    "The Muhammad Ali Boxing Reform Act makes long contracts that are conditioned on granting further promotional rights unenforceable, which is the legal shape of the coercive contract problem.",
    "Rankings are meant to be a published system rather than an opinion: sanctioning organisations must file rating criteria and explain ratings changes for their top-ten boxers.",
    "Building a contender is a scheduling problem more than a talent problem, because ranked opposition, activity and timing are what convert ability into a position.",
    "A GM mode is worth playing as a sequencing puzzle: which fighter, against whom, when, and what the ranking does in response."
  ],
  "disclaimer": "none",
  "featured": false,
  "faqs": [
    {
      "question": "What is the difference between a manager and a promoter?",
      "answer": "A manager represents the fighter: negotiating terms, choosing which offers to accept, and directing the shape of a career. A promoter stages events and pays fighters to appear on them. Their interests are opposed at the moment a purse is negotiated, which is why United States federal law restricts promoters from having a financial interest in managing a boxer and restricts managers from being compensated by promoters other than through the boxer's contract."
    },
    {
      "question": "Why are long fighter contracts sometimes unenforceable?",
      "answer": "Because of how they were historically used. The Muhammad Ali Boxing Reform Act makes provisions granting rights between a boxer and a promoter for more than twelve months unenforceable where they are conditioned on the boxer granting additional future rights, and it bars requiring a boxer to grant future promotional rights as a condition of taking a mandatory bout. The target is the coercive contract, where the price of a title opportunity is signing away the next several years."
    },
    {
      "question": "How is a mandatory challenger decided?",
      "answer": "By position in a sanctioning organisation's ratings, which is why the ratings themselves are regulated. Under the Ali Act, sanctioning organisations must file their rating criteria, bylaws and appeals procedures annually, must give a boxer a written explanation of a ratings decision within seven days of a request, and must publicly notify a change affecting a top-ten rated boxer within seven days. A mandatory is the mechanism that stops a champion from choosing every opponent."
    },
    {
      "question": "Does a fight game need to model all of this?",
      "answer": "No, and none of them do in full. What a good GM mode borrows is the shape: that a manager chooses opponents rather than outcomes, that a contract is a constraint you live inside rather than a number on a screen, and that a ranking responds to the quality of opposition and not only to the win. Those three ideas are enough to make the management layer a real decision."
    }
  ],
  "sources": [
    {
      "title": "Muhammad Ali Boxing Reform Act, Public Law 106-210",
      "publisher": "United States Government Publishing Office (govinfo)",
      "url": "https://www.govinfo.gov/content/pkg/PLAW-106publ210/html/PLAW-106publ210.htm",
      "accessed": "2026-09-21"
    },
    {
      "title": "Nevada Administrative Code Chapter 467: Unarmed Combat",
      "publisher": "Nevada Legislature",
      "url": "https://www.leg.state.nv.us/nac/nac-467.html",
      "accessed": "2026-09-21"
    },
    {
      "title": "Association of Boxing Commissions and Combative Sports",
      "publisher": "Association of Boxing Commissions and Combative Sports",
      "url": "https://www.abcboxing.com/",
      "accessed": "2026-09-21"
    }
  ]
}
---

A fight manager does not pick who wins. They pick who fights whom, when, for how much, and under what terms — and in the real sport those four decisions are constrained by law, by state regulation and by the published criteria of sanctioning bodies. Understanding those constraints is what turns a management mode in a fight game from a menu into a puzzle.

This is about the layer above the draft: the contracts, the rankings and the sequencing that carry a fighter from an unranked signing to a title opportunity.

## What a manager actually controls

Three things, essentially.

**Selection.** Which offers to accept and which to decline. A manager's leverage is the right to say no, and an unranked fighter with a full calendar of poor opponents has a manager who does not use it.

**Terms.** The purse, the length of the agreement, and what rights the fighter is granting away in exchange for the opportunity.

**Sequencing.** The order of fights. The same three opponents taken in a different order produce different career outcomes, because a loss early is a delay and a loss late is a reset.

What a manager does not control is the result, and a management game that lets you control the result is not modelling management.

## Federal law separates managers from promoters

The clearest way to see what a manager is supposed to be is to look at what United States law forbids them from also being.

The Muhammad Ali Boxing Reform Act, enacted in 2000 as Public Law 106-210, restricts promoters from having a financial interest in the management of a boxer, and restricts managers from having a financial interest in promotion or from receiving compensation from a promoter other than through the boxer's contract. The provisions apply to bouts of ten rounds or more.

The reasoning is structural rather than moral. At the moment a purse is negotiated, the promoter wants to pay less and the fighter wants to be paid more, and the manager is the fighter's representative in that negotiation. A person sitting on both sides of it cannot represent either properly.

State regulation reinforces the point. Nevada's administrative code states plainly that an unarmed combatant may not have a promoter act directly or indirectly as their manager.

## What a contract actually controls

Two features of real fighter contracts are worth importing into how you think about a management mode.

**Length and conditionality.** The Ali Act makes provisions granting rights between a boxer and a promoter for longer than twelve months unenforceable against the boxer where those rights were conditioned on granting further rights, and separately prohibits requiring a boxer to grant future promotional rights as a condition of competing in a mandatory bout. The practice being legislated against is the coercive contract: the title shot that costs you the next five years.

**Share and filing.** Nevada caps what managers can take, stating that a manager or managers may not participate separately or collectively in more than 33 1/3 per cent of a combatant's earnings, and provides that the commission may refuse to honour a manager's contract unless it is filed at least 72 hours before a scheduled contest. Bout agreements for main events must be on file at least seven calendar days before the programme.

The useful takeaway for a player: a contract is not a salary figure. It is a bundle of duration, exclusivity, share and obligation, and the obligations are what constrain your next ten decisions.

## Rankings are a published system

The most common misconception about combat sports is that rankings are an opinion column. Legally, they are not supposed to be.

Under the Ali Act, sanctioning organisations must file their rating criteria, bylaws and appeals procedures annually with the Federal Trade Commission. They must provide a boxer with a written explanation of a ratings decision within seven days of a request, and must publicly notify a change affecting a boxer rated in their top ten within seven days. The Act also directed the Association of Boxing Commissions to develop guidelines for objective and consistent written criteria for rating professional boxers.

Whether the reality always matches the requirement is a separate argument, and a real one. But the design intent is clear: a ranking is meant to be a reproducible output of published criteria, responsive to who you beat rather than to who is talking about you.

## Building a contender is a scheduling problem

Given all of the above, the path from signing to title shot is mostly a sequencing exercise. Four levers:

**Activity.** A fighter who does not fight does not move. Inactivity is a ranking problem before it is a form problem.

**Opposition quality.** Beating ranked opposition moves you; beating unranked opposition largely does not, however emphatic the finish. This is the single most common error in a management mode — padding a record with wins that the ranking does not reward.

**Style selection.** A manager picks matchups, and the matchup is where most of the result is decided. Our piece on [how fight simulators model styles](/blog/style-matchups-in-a-fight-simulator/) covers why a stylistic edge frequently outweighs a ratings edge.

**Timing.** Taking a ranked opponent too early risks a loss that costs more than the win would have gained. Taking one too late wastes a prime. The judgement is about where the fighter is now, not where they will be.

## How GM Mode maps onto it

[40-0 MMA & Boxing Fight Draft](/apps/mma-boxing-fight-draft/) is our own app, and its GM Mode is built around exactly this layer: signing fighters, managing contracts and guiding contenders toward titles, with the rankings responding to the calls you make. The two simulators underneath it stay separate, so a mixed martial arts bout can end in knockout, technical knockout, submission or decision while a boxing bout adds draws and judges' scorecards.

That separation matters for a manager, because it changes what a "safe" fight is. A boxing match has a scorecard outcome available, which makes a close contest against a good opponent survivable in a way a submission loss is not.

The drafting modes and GM Mode answer different questions. Drafting asks who you would pick; managing asks what you do with them afterwards. If the draft half is what you are here for, [fantasy draft strategy for combat sports](/blog/mma-fantasy-draft-strategy/) is the piece for that, and [how fight cards are built](/blog/how-fight-cards-are-built/) covers the matchmaking side from the promoter's point of view rather than the manager's.

## Three mistakes that stall a stable

**Signing for ability alone.** A roster of talented fighters in the same division competes with itself. Spread across weight classes and you have more callable matchups.

**Chasing the finish rate.** Highlight wins over weak opposition build a record and not a ranking. The ranking is the thing that unlocks the next tier.

**Never taking the risk.** A stable that only takes safe fights produces a group of well-protected fighters who are ranked below everyone who took chances. Protection has a cost, and it is paid in position.

More on the wider category, including the draft and season modes that sit alongside this one, is in our [sports career and GM games](/blog/category/sports-gm/) section.
