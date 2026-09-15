---
{
  "title": "Aura Towers: Making Your Best Cluster Better",
  "metaTitle": "Aura Towers and Support Stacking",
  "description": "Support towers that buff neighbours turn layout into a real decision. How aura stacking works, and why we capped it the way we did.",
  "status": "published",
  "publishedAt": "2026-09-15",
  "updatedAt": "2026-09-15",
  "author": "Reign Creative Team",
  "category": "action-arcade",
  "tags": ["tower defense", "aura towers", "game design", "developer insight"],
  "primaryKeyword": "aura towers in tower defense",
  "secondaryKeywords": [
    "support towers tower defense",
    "buff towers",
    "tower defense aura",
    "tower defense damage buff",
    "tower defense layout",
    "stacking buffs in tower defense"
  ],
  "intent": "informational",
  "longTailKeywords": [
    "what do aura towers do in tower defense",
    "do aura effects stack in tower defense",
    "where should you place a support tower",
    "are buff towers worth a slot",
    "how to build a tower cluster"
  ],
  "aiSearchQuestions": [
    "What does an aura tower do?",
    "Do aura effects stack?",
    "Where should support towers go?",
    "Is a buff tower worth giving up a damage slot?"
  ],
  "demandTier": "unverified-low",
  "relatedApps": ["regal-tower-defense"],
  "relatedArticles": [
    "tower-types-and-what-they-counter",
    "tower-defense-strategy-basics",
    "countering-armoured-and-flying-enemies",
    "power-ups-and-build-design"
  ],
  "takeaways": [
    "An aura tower contributes nothing by itself; its output is entirely the extra damage the towers around it produce, which makes it the most position-dependent purchase on the board.",
    "A support tower beside one tower is usually a waste of a slot. Beside three good towers on a chokepoint, it is often the cheapest damage increase available.",
    "Uncapped multiplicative buffs collapse a tower defence game into one build, which is why our aura stacking is capped rather than additive-forever.",
    "Build Pads let you create positions the map did not offer, which is as much an aura-range tool as a firing-angle tool.",
    "If you are not sure whether an aura is paying for itself, count the towers inside its radius. Fewer than three and the answer is usually no."
  ],
  "disclaimer": "none",
  "featured": false,
  "faqs": [
    {
      "question": "What does an aura tower do?",
      "answer": "It does not attack. It projects a continuous effect over a radius that improves the towers standing inside it — in our case damage, attack speed, attack range or elemental power. In general video game vocabulary this is a buff: an effect that beneficially increases one or more statistics. Its entire contribution is second-hand, which is why an aura tower with nothing good next to it is the least useful building in the game."
    },
    {
      "question": "Do aura effects stack?",
      "answer": "In Regal Tower Defense they stack, but the stacking is capped rather than unlimited. Two support towers covering the same cluster do more than one; ten do not do ten times as much. The cap exists because uncapped multiplicative buffs collapse the game into a single correct layout, and a game with one correct layout has stopped asking you anything."
    },
    {
      "question": "Where should a support tower go?",
      "answer": "Inside your densest working cluster, not beside your single strongest tower. The arithmetic is simple: an aura giving a 20 per cent improvement to one tower buys you a fifth of a tower, and the same aura covering four towers buys you most of an extra one. Place it where the radius touches the most barrels, which on most maps is just off the inside of a bend or switchback rather than on the path itself."
    },
    {
      "question": "Is a support tower worth giving up a damage slot?",
      "answer": "It depends on how many towers the aura would cover and how good those towers already are. Early in a level, when you have two towers and no money, a damage tower is almost always better. Mid-level, once a chokepoint cluster exists, a support tower is frequently the cheapest way to increase total output, because it multiplies work you have already paid for instead of starting a new position from zero."
    },
    {
      "question": "What are Build Pads for?",
      "answer": "They are purchasable tower positions you place yourself on valid terrain, away from paths, existing towers, auras and the castle. Their obvious use is opening a firing angle the map did not give you. The less obvious use is aura geometry: a pad placed one tile closer to your cluster can pull a fourth tower inside a support radius, which is often worth more than the pad's own tower."
    }
  ],
  "sources": [
    {
      "title": "Glossary of video game terms",
      "publisher": "Wikipedia",
      "url": "https://en.wikipedia.org/wiki/Glossary_of_video_game_terms",
      "accessed": "2026-09-15"
    },
    {
      "title": "Game balance",
      "publisher": "Wikipedia",
      "url": "https://en.wikipedia.org/wiki/Game_balance",
      "accessed": "2026-09-15"
    }
  ]
}
---

There is a building in [Regal Tower Defense: TD Game](/apps/regal-tower-defense/) that never fires a shot and is sometimes the best purchase on the board. Aura Towers do not attack. They project damage, attack speed, range or elemental-power improvements onto whatever is standing near them, which means their entire output is borrowed from their neighbours. Put one beside a lone arrow tower and you have wasted a slot. Put one in the middle of four towers covering a switchback and you have effectively bought a fifth tower for less than the price of one.

This is a note about how that mechanic works, why it is capped, and the layout habits it should change.

## A buff is a multiplier looking for something to multiply

The general term for what an aura does is a buff — an effect that beneficially increases one or more of a unit's statistics. That definition is doing quiet work, because a multiplier has no value of its own. It has the value of whatever it is applied to.

The arithmetic is worth writing out once, because it settles most placement arguments.

Suppose a support tower improves damage output by a fifth for everything inside its radius.

- Covering **one** tower, you have bought 0.2 of a tower.
- Covering **two**, 0.4.
- Covering **four**, 0.8 — nearly a whole extra tower, for one slot and no additional targeting.

Nothing about the aura changed in any of those three cases. What changed was how much work was standing inside it. This is why "where do support towers go" has a better answer than "next to my strongest tower": they go where the *most* towers are, which is usually one tile off the inside of a corner, not on the frontline.

It also explains the failure mode. A support tower dropped early, before a cluster exists, does almost nothing and costs you the damage tower you could have built instead. Aura towers are a mid-level purchase on most maps.

## Why the stacking is capped

The obvious design question for a mechanic like this is whether two auras covering the same towers should both apply. We say yes — and then we cap how far that goes.

We did not start there. An early internal build let support effects add up without a ceiling, on the theory that spending four slots on support instead of damage was its own cost and would balance itself.

It did not. What emerged was a single cluster, always in the same kind of place, with a ring of support towers around a very small number of attackers. Every level became the same puzzle: find the tightest corner, stack it, ignore the rest of the map. The seven attacking tower types stopped mattering, because once the multipliers were large enough, the identity of the tower underneath them was noise. The wave composition stopped mattering too. We had accidentally built a game with one answer.

Capping the stack fixed it, and the reasoning is ordinary game balance — adjusting elements to produce the intended player experience rather than the one that happened to emerge. The cap does three things at once:

1. It keeps a second support tower worth building, so there is still a decision.
2. It makes a *third* or fourth one clearly worse than a damage tower, so the runaway stops.
3. It restores the value of a second cluster elsewhere on the map, which is what keeps path-reading relevant.

We are not going to pretend the specific ceiling is derived from anything but iteration. It was tuned by playing levels until the choice between "another aura here" and "a new position over there" stopped having an obvious answer.

## Build Pads are an aura tool as much as a firing-angle tool

Build Pads are purchasable positions you place yourself, on valid terrain away from paths, existing towers, auras and the castle. Most players discover them as a way to get a tower onto ground the map did not offer — which is true and is the headline use.

The subtler use is radius geometry. Because an aura covers a circle and towers occupy fixed positions, a cluster is often *nearly* efficient: three towers inside a support radius and a fourth sitting just outside it because that is where the map put the slot. A pad placed deliberately one tile closer pulls that fourth tower into the aura. The pad's own tower is then almost a bonus; the value was in the repositioning.

The placement restrictions matter here, and they are worth reading as a constraint rather than an annoyance. Pads cannot go on the path, on top of existing towers or auras, or against the castle, which means you cannot simply ring a chokepoint with everything. You are being asked to choose a shape.

## What this changes about how you play

A few habits follow from all of the above.

**Build damage first, support second.** Until there is a cluster, there is nothing to multiply.

**Count barrels, not tiles.** Before placing an aura, count how many attacking towers will actually sit inside its radius. Fewer than three and you are usually better off with another attacker. This is the single most useful check in the whole mechanic.

**Put the aura behind the line, not on it.** A support tower on the outer edge of a cluster covers half a circle of empty ground. One tile deeper covers towers on every side.

**Stop at the second one.** Because the stacking is capped, a third support tower over the same cluster is close to dead money. That is the cap working as intended, and it is your cue to open a second position rather than deepen the first.

**Re-check after a rebuild.** If you move or sell a tower, the aura's coverage count changes, and an aura that was excellent with four neighbours is mediocre with two.

## Where this sits next to everything else

Aura towers are the third layer of a three-layer decision, and they are the least useful layer to learn first.

The first layer is the ground: where the path bends, where dwell time is longest, where a circle of range covers two legs instead of one. Nothing in this article helps if that has not been done, and [why placement beats damage](/blog/tower-defense-strategy-basics/) is the starting point.

The second layer is choosing what to build — which of the seven attacking types answers the wave that is coming, and which is an expensive ordinary tower against it. [What each tower type is actually for](/blog/tower-types-and-what-they-counter/) covers that, and it matters more than support does, because an aura over the wrong tower type is a multiplier on a mistake. When later waves mix armoured, flying and elite units, that becomes very visible very quickly, which is [its own subject](/blog/countering-armoured-and-flying-enemies/).

Support stacking is the third layer, and it is the one that rewards you for having done the other two properly.

There is a useful contrast with run-based games here. In a roguelite, stacking multipliers on one build is frequently the correct strategy, because the run ends and the build is temporary — [how in-run power-ups combine](/blog/power-ups-and-build-design/) works through that logic. A tower defence layout is permanent for the length of a level and has to answer several different waves in sequence, which is exactly why unlimited stacking breaks it and capped stacking does not.

The campaign runs fifty levels across ten worlds, and Aura Towers stay interesting across all of them for one reason: the cap means you are always choosing between deepening what you have and opening something new. The rest of the studio's short-session games sit under [Action & Arcade Games](/apps/category/action-arcade/).
