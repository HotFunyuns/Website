---
{
  "title": "Modelling Style Matchups in a Fight Simulator",
  "metaTitle": "Style Matchups in a Fight Sim",
  "description": "Styles make fights, but turning that into code means deciding what a style is. How we modelled it, and what the model cannot represent.",
  "status": "published",
  "publishedAt": "2026-09-15",
  "updatedAt": "2026-09-15",
  "author": "Reign Creative Team",
  "category": "sports-gm",
  "tags": ["mma", "simulation", "game design", "developer insight"],
  "primaryKeyword": "how fight simulators model styles",
  "secondaryKeywords": [
    "fight simulator mechanics",
    "mma fighting styles",
    "boxing styles",
    "style makes fights",
    "combat sport simulation",
    "fighter attributes in games"
  ],
  "intent": "informational",
  "longTailKeywords": [
    "how does a fight simulator decide a winner",
    "is style matchup rock paper scissors",
    "how do you model fighting style in code",
    "what can a fight sim not model"
  ],
  "aiSearchQuestions": [
    "How does a fight simulator model style?",
    "Is style matchup just rock paper scissors?",
    "What can a fight simulator not model?",
    "Why does the higher-rated fighter not always win?"
  ],
  "demandTier": "unverified-low",
  "relatedApps": ["mma-boxing-fight-draft"],
  "relatedArticles": [
    "how-sports-simulation-engines-work",
    "understanding-sports-sim-probability",
    "striking-vs-grappling-in-mma",
    "mma-fantasy-draft-strategy"
  ],
  "takeaways": [
    "A style has to be represented as something the code can compare, and the choice of representation decides how the whole simulator behaves.",
    "An explicit style-versus-style table is easy to build and easy to read, which is exactly why we abandoned it.",
    "Modelling style as a set of preferred ranges and phases produces matchup effects as a consequence rather than as a rule.",
    "A simulator should be honest that cross-era and cross-division comparisons are unfalsifiable, not confident about them.",
    "The clearest limitation is adaptation: our model does not represent a fighter solving a problem mid-bout, which is a real and central part of the sport."
  ],
  "disclaimer": "none",
  "featured": false,
  "faqs": [
    {
      "question": "How does a fight simulator model style?",
      "answer": "It has to turn a style into numbers the code can compare. The two common approaches are an explicit matchup table, where style A is given an advantage over style B, and an emergent approach, where styles are described as preferences about range and phase and matchup effects fall out of those preferences interacting."
    },
    {
      "question": "Is style matchup just rock paper scissors?",
      "answer": "It can easily become that, which is the main risk. A game whose style system reduces to a visible cycle stops being about evaluation and becomes about identifying the cycle. Our model avoids an explicit cycle, though some cyclical behaviour still emerges - the difference is that it is a consequence rather than a rule."
    },
    {
      "question": "Why does the higher-rated fighter not always win?",
      "answer": "Because a rating summarises a fighter and a fight is a specific interaction. Style advantages shape results, so a stylistic edge can outweigh a ratings edge. A simulator that always returned the higher rating would not need a simulator - it would need a sort."
    },
    {
      "question": "What can a fight simulator not model?",
      "answer": "Adaptation, most importantly: a fighter recognising a problem in round two and solving it in round three. It also cannot honestly evaluate matchups with no real-world reference, such as cross-era bouts, and it cannot represent transitional moments where neither fighter has established a phase."
    }
  ],
  "sources": [
    {
      "title": "Rock paper scissors",
      "publisher": "Wikipedia",
      "url": "https://en.wikipedia.org/wiki/Rock_paper_scissors",
      "accessed": "2026-09-15"
    },
    {
      "title": "Elo rating system",
      "publisher": "Wikipedia",
      "url": "https://en.wikipedia.org/wiki/Elo_rating_system",
      "accessed": "2026-09-15"
    }
  ]
}
---

"Styles make fights" is the most repeated sentence in combat sports and the least useful one to a programmer. Before you can model a style matchup you have to answer a question the phrase carefully avoids: *what is a style, expressed as data?*

We answered it twice. The first answer shipped internally, survived about three weeks of testing, and was deleted.

## Attempt one: the matchup table

The obvious representation is a lookup. Enumerate the styles — pressure wrestler, counter-striker, submission specialist, boxer-puncher, and so on — and build a matrix giving each pairing a modifier. Style A gets an edge over style B; style B gets an edge over style C.

It has real virtues. It is trivial to implement, trivial to tune, and it directly encodes the sport's own folk wisdom, which is mostly expressed in exactly this form.

We deleted it because of what testers did with it.

Within a few sessions, players stopped evaluating fighters and started solving the table. Drafting became an exercise in identifying which style beat which, and matchmaking became an exercise in arranging favourable cells. The moment the cycle became legible, the fighters stopped mattering — a mediocre fighter in a favourable cell beat a good fighter in an unfavourable one, reliably, and reliability is death for this kind of model.

The failure has a name. Any explicit cycle of advantage is a rock-paper-scissors structure: a small closed set of options where each beats one and loses to another. That structure is excellent when you want a game of prediction and bluffing. It is poor when you want a game of evaluation, because it rewards reading the table rather than reading the fighter.

## Attempt two: styles as preferences, not identities

What shipped in [40-0 MMA & Boxing Fight Draft](/apps/mma-boxing-fight-draft/) removes style as a first-class entity. There is no style field driving a lookup.

Instead, a fighter is described by attributes — power, defence, cardio, reach, grappling and fight IQ, plus the discipline-specific measures each simulator uses. Mixed martial arts weighs striking, wrestling, takedowns, submissions and ground control; boxing weighs hand speed, power, defence, footwork and ring control. On top of that sits a small set of **preferences**: at what range this fighter wants the fight, in which phase, at what pace.

A "pressure wrestler" is then not a label the model reads. It is what you get when a fighter has high takedown ability, a preference for close range, and the cardio to sustain it. A "counter-striker" is a fighter who prefers distance, has defensive numbers ahead of offensive ones, and a pace preference on the low side.

Matchup effects emerge from these preferences colliding. When both fighters want the same range, one of them gets it and the other is fighting somewhere they did not choose. When they want different phases, the phase resolution described in [striking versus grappling](/blog/striking-vs-grappling-in-mma/) decides who gets their way.

**Cyclical behaviour still appears.** Certain preference profiles do systematically trouble certain others, and if you play enough fights you will notice it. The difference from attempt one is that it is a consequence you can discover by observation rather than a rule you can look up, and it is modulated by every attribute the fighters actually have. A pressure wrestler with poor cardio is not a pressure wrestler after round one.

## What the model claims, and what it does not

This is where a simulator has to be careful, because the temptation is to let confident-looking outputs imply confident knowledge.

**What it claims:** given these attributes, these preferences and this ruleset, here is a plausible distribution of outcomes. Run the same bout repeatedly and you will get different results, because the model is sampling rather than calculating. That is the same logic discussed in [understanding sports sim probability](/blog/understanding-sports-sim-probability/), and it is the only honest way to present a fight — a single simulated result is one draw from a distribution, not a verdict.

**What it does not claim:** anything about reality. The fighters are fictional and generated inside the game. A result does not describe, predict or relate to any real bout or athlete.

There is a subtler point about cross-era matchups, which the app supports and which are one of the genuine pleasures of a fictional pool. A cross-era comparison is **unfalsifiable by construction**. There is no ground truth to calibrate against, because the fight never happens and cannot happen. Our model will produce a result for it, and that result is entertainment. Presenting it as analysis would be dishonest, and we try not to.

Rating systems designed for real competition have a defined meaning — an Elo-style rating is calibrated against actual results between actual opponents. Our ratings have no such anchor, and it would be a mistake to read them as though they did.

## The three things it cannot do

Worth stating plainly, because a list of features is cheaper than a list of limits.

**1. Adaptation.** The big one. A real fighter loses round one, identifies why, and changes something for round two. Our model has no mid-fight learning: a bout is a sequence of exchanges resolved under fixed preferences, with fatigue and damage accumulating. Corner advice, in-fight problem-solving and the entire narrative of a fighter figuring an opponent out are absent. We have prototyped it twice and both times produced something that felt arbitrary — the model would "adapt" in ways the player could not anticipate or interpret, which reads as the simulator changing its mind rather than the fighter changing their approach.

**2. Scrambles and transitions.** Phase is resolved per exchange, so genuinely in-between moments collapse into whichever phase came next.

**3. Anything about a real fight.** Covered above, and worth repeating.

## Why this belongs in a draft game specifically

A fight simulator inside a drafting game has a different job from one inside a fighting game. It does not need to be exciting second by second. It needs to **reward evaluation** — to make a well-judged draft board produce better outcomes than a badly judged one, without making the mapping so direct that the board becomes a puzzle with a solution.

The preference model does that better than the table did, because there is no single dimension to optimise along. A drafter who understands that a fighter's preferences interact with the preferences of whoever they face is doing the thing the game is actually about, which is the argument made in more practical terms in [MMA fantasy draft strategy](/blog/mma-fantasy-draft-strategy/).

The general architecture of how simulation engines of this kind are assembled, across the studio's other sports, is in [how sports simulation engines work](/blog/how-sports-simulation-engines-work/).

The fighters, records and results in the game are fictional. It is not affiliated with, endorsed by or connected to any real promotion, sanctioning body, event or athlete. The rest of the studio's simulation titles are listed under [sports GM](/blog/category/sports-gm/).
