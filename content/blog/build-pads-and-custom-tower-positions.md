---
{
  "title": "Build Pads: Making Tower Positions the Map Did Not Give You",
  "metaTitle": "Build Pads and Custom Tower Positions",
  "description": "Build Pads add tower slots on valid terrain away from paths, towers, auras and the castle. Where a new position earns its cost, and when to skip it.",
  "status": "published",
  "publishedAt": "2026-09-22",
  "updatedAt": "2026-09-22",
  "author": "Reign Creative Team",
  "category": "action-arcade",
  "tags": [
    "tower defense",
    "strategy",
    "level design",
    "placement"
  ],
  "primaryKeyword": "how to add tower spots in tower defense",
  "secondaryKeywords": [
    "build pads tower defense",
    "custom tower placement",
    "tower defense placement rules",
    "creating tower positions",
    "tower defense map geometry",
    "where to put towers"
  ],
  "intent": "informational",
  "longTailKeywords": [
    "can you make your own tower spots in a tower defense game",
    "where can a build pad be placed",
    "why is there nowhere to build near the bend",
    "is a build pad worth the coins"
  ],
  "aiSearchQuestions": [
    "Can you create new tower positions in a tower defense game?",
    "Where are you allowed to place a build pad?",
    "Is buying a build pad better than upgrading an existing tower?",
    "Why does tower placement matter more than tower damage?"
  ],
  "demandTier": "unverified-low",
  "relatedApps": [
    "regal-tower-defense"
  ],
  "relatedArticles": [
    "tower-defense-strategy-basics",
    "aura-towers-and-support-stacking",
    "tower-types-and-what-they-counter",
    "world-boss-waves-in-tower-defense",
    "tower-defense-camera-controls"
  ],
  "takeaways": [
    "A Build Pad is a purchased tower position, not a tower: it buys you geometry, and the tower that goes on it still has to be paid for separately.",
    "Placement rules are explicit — a pad goes on valid terrain away from paths, existing towers, auras and the castle — so the useful spots are usually just outside a cluster rather than inside it.",
    "Damage delivered is time in range multiplied by rate, so a position that sees a long straight or the inside of a bend is worth more than a higher-damage tower placed where enemies pass briefly.",
    "The strongest case for a pad is aura overlap: support towers boost their neighbours, so one extra slot inside an existing aura can raise the output of towers you already own.",
    "The weakest case is panic. Buying a pad mid-level when the current layout is already failing usually spends coins that a targeted upgrade or a repositioned counter would have spent better."
  ],
  "disclaimer": "none",
  "featured": false,
  "faqs": [
    {
      "question": "What is a Build Pad?",
      "answer": "A purchasable tower position. Instead of being limited to the slots a map provides, you buy a pad and place it yourself on valid terrain, away from paths, existing towers, auras and the castle. It creates the option to build somewhere; it does not come with a tower, so the tower is a separate cost."
    },
    {
      "question": "Where can a build pad be placed?",
      "answer": "On valid terrain that is clear of the enemy path, of towers you have already built, of aura areas and of the castle. In practice that means the ring of ground just outside your existing cluster, or an unused stretch of terrain beside a long lane that the map never offered a slot for."
    },
    {
      "question": "Is a build pad better value than an upgrade?",
      "answer": "It depends on whether your problem is output or coverage. If your towers are firing constantly and still not killing things, upgrade. If they spend part of each wave with nothing in range, the shortfall is coverage, and a new position in the right place converts existing damage into applied damage."
    },
    {
      "question": "Why does placement matter more than raw damage?",
      "answer": "Because damage is only delivered while a target is in range. A tower that covers a long straight or the inside of a bend gets many more seconds of fire per enemy than one covering a short crossing, so the weaker tower in the better spot frequently out-damages the stronger tower in the worse one."
    }
  ],
  "sources": [
    {
      "title": "Introduction to the A* Algorithm",
      "publisher": "Red Blob Games (Amit J. Patel)",
      "url": "https://www.redblobgames.com/pathfinding/a-star/introduction.html",
      "accessed": "2026-09-21"
    },
    {
      "title": "Reinforcement Learning for High-Level Strategic Control in Tower Defense Games",
      "publisher": "Bergdahl, Sestini and Gisslen, arXiv (IEEE CoG 2024)",
      "url": "https://arxiv.org/abs/2406.07980",
      "accessed": "2026-09-21"
    },
    {
      "title": "CMS.608 Game Design, Spring 2014",
      "publisher": "MIT OpenCourseWare",
      "url": "https://ocw.mit.edu/courses/cms-608-game-design-spring-2014/",
      "accessed": "2026-09-21"
    }
  ]
}
---

If a level keeps failing at the same bend and there is no slot near it, the problem is not your tower choice. It is that the map never offered you the position the wave requires. A Build Pad is the answer to that specific problem: you buy a tower position and place it yourself.

It is worth being precise about what you are buying, because the name misleads people into treating it as a tower. A pad is empty ground you are allowed to build on. The tower still costs what it costs.

## What a Build Pad is, and where it is allowed to go

[Regal Tower Defense: TD Game](/apps/regal-tower-defense/) is our own app, built by Reign Creative, and its placement rule is stated plainly: Build Pads can be purchased and placed on valid terrain away from paths, existing towers, auras and the castle.

Each of those four exclusions is doing work, and reading them as a set tells you where pads actually fit:

- **Away from paths** means you cannot block or narrow a lane with one. A pad changes where you can shoot from, never where enemies walk.
- **Away from existing towers** means you cannot stack positions on the single best square. Spacing is forced.
- **Away from auras** means the new slot sits at the edge of a support field rather than in the middle of one — which, counter-intuitively, is often where you want it, for reasons in the aura section below.
- **Away from the castle** keeps the last line of defence from becoming a fortress you can simply add to.

The net effect is that pads open the ring of usable ground just outside your current layout, plus stretches of terrain beside long lanes the level designer left bare.

## Why the map limited you in the first place

Enemies in a tower defence level follow a path, and a path is a graph: a set of locations joined by connections, with costs on the moves between them. Pathfinding writing makes the point that the algorithm only sees that graph — it has no idea whether a node is a doorway or a meadow.

Your towers, on the other hand, see distance. That mismatch is the whole game. The level designer chooses where the path goes and where slots exist, and in doing so decides how many seconds of fire each position gets per enemy. Damage delivered is time in range multiplied by rate of fire, so a mediocre tower watching a long straight can out-damage a strong one covering a short diagonal crossing.

This is why [placement beats damage](/blog/tower-defense-strategy-basics/) as a first principle, and it is also why the shortfall you feel at a bad bend is a *geometry* shortfall. You cannot upgrade your way out of a position that only sees an enemy for a second and a half.

Research that treats tower defence as a strategic control problem points at the same difficulty from the other direction: a study applying reinforcement learning to high-level tower defence decisions reported that training an agent that generalises across levels is hard, with a hybrid of scripted logic and learning outperforming heuristics alone but still far from solved. Placement and resource allocation across a changing board is genuinely a difficult class of decision, not something you are failing at through carelessness.

## Reading a map for the position it is missing

Before buying, find the gap. Four map features are usually worth a new slot.

**The inside of a bend.** A turn keeps enemies within a small radius for longer than any straight of the same length. If the map gives no slot inside a bend, that is the first place to look.

**A long lane with slots only at one end.** Enemies spend the whole traverse exposed, but your towers only cover a third of it. A pad at the midpoint roughly doubles the exposure without touching upgrade costs.

**The approach to the castle.** Not adjacent to it, which is excluded, but the last stretch before it — the segment where leakers get their final chance to be killed.

**Anywhere your cluster's range circles do not overlap the path.** Zoom out and look at where your towers are pointing rather than where they are. Gaps are easy to miss from a close camera, which is one reason the [camera presets and follow mode](/blog/tower-defense-camera-controls/) exist.

## Where a pad earns the most: aura overlap

Aura Towers do not attack. They raise the damage, attack speed, range or elemental power of nearby towers, which means the shape of your layout is itself a damage stat.

That changes the arithmetic on a new position. A pad placed so a new tower falls inside an existing aura is not buying one tower's worth of output — it is buying a boosted tower, with the aura you already paid for doing extra work. The same pad placed outside every aura buys the base tower and nothing else.

The exclusion rule matters here. Because a pad cannot be placed *on* an aura, the productive move is to find ground at the edge of the aura's field, where the new tower is covered but the pad itself is clear. [Aura towers and support stacking](/blog/aura-towers-and-support-stacking/) works through how those boosts interact when several overlap.

## The cost question, honestly

A pad competes with three other uses of the same coins: a new tower on an existing slot, an upgrade to a tower already carrying the level, and holding the money for the wave after next. A simple test sorts most cases.

Watch one full wave and ask whether your towers are idle. If they are firing continuously and enemies still get through, your problem is output — upgrade, or add a counter for whatever is surviving, which [tower types and what they counter](/blog/tower-types-and-what-they-counter/) covers type by type. If your towers spend noticeable stretches with nothing in range while enemies stream past somewhere else, your problem is coverage, and coverage is what a pad sells.

The failure mode to avoid is buying a pad during a wave you are already losing. At that point you are spending coins on a position that will not be occupied by a meaningful tower in time, and the same coins put into an upgrade on a tower already in range would have landed damage immediately.

## Treat the layout as something you are designing

The reason pads change how the game feels is that they move you from solving a level to designing one. Introductory game design teaching frames design as iterating on a rule set and testing how the pieces interact, and that is a fair description of what you are doing with a handful of pads: adding elements, seeing what the wave does, and adjusting.

Two habits make that iteration cheaper. Buy pads between waves rather than during them, so you can see the whole board and place deliberately. And add one at a time — a single new position changes what the next gap is, and buying three at once usually means two of them were placed to solve a problem the first one already fixed.

More strategy writing for the studio's arcade and strategy titles sits under [action and arcade games](/blog/category/action-arcade/).
