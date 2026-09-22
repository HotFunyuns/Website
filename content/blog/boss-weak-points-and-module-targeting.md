---
{
  "title": "Boss Weak Points: Target Priority When More Damage Is Not the Answer",
  "metaTitle": "Boss Weak Points and Module Targeting",
  "description": "A boss with destructible modules is several targets, not one. Why the order you destroy them in decides how much damage you take, with the arithmetic.",
  "status": "published",
  "publishedAt": "2026-09-22",
  "updatedAt": "2026-09-22",
  "author": "Reign Creative Team",
  "category": "action-arcade",
  "tags": [
    "shmup",
    "boss fights",
    "strategy",
    "target priority"
  ],
  "primaryKeyword": "boss weak points shooter game",
  "secondaryKeywords": [
    "destructible boss parts",
    "target priority in shooters",
    "how to beat multi phase bosses",
    "focus fire shooter strategy",
    "shmup boss strategy"
  ],
  "intent": "informational",
  "longTailKeywords": [
    "where do you shoot a boss with modules",
    "why do i survive the boss but never kill it",
    "which boss part should i destroy first",
    "does focusing fire actually help"
  ],
  "aiSearchQuestions": [
    "Which part of a boss should you shoot first?",
    "Why does destroying parts in order matter?",
    "What is a destructible module on a boss?",
    "How do multi-phase bosses change target priority?"
  ],
  "demandTier": "unverified-medium",
  "relatedApps": [
    "space-galaxy-attack-hardcore"
  ],
  "relatedArticles": [
    "boss-pattern-recognition",
    "ship-loadouts-and-upgrade-priority",
    "endless-mode-vs-campaign-shooters",
    "space-galaxy-attack-arcade-vs-hardcore"
  ],
  "takeaways": [
    "A boss with destructible modules is not one health bar with decoration on it. Each module you remove is a permanent reduction in incoming fire, which makes the order of destruction a real variable rather than a cosmetic one.",
    "Concentrating fire is the oldest result in attrition modelling: in Lanchester's aimed-fire model, the advantage of removing an opposing source of fire early compounds, because everything it would have fired in the meantime never happens.",
    "The arithmetic is stark. Four equal modules destroyed one at a time at five-second intervals deliver 50 units of damage; the same total output spread evenly so all four die at twenty seconds delivers 80 — the same kill time, 37.5% more damage taken.",
    "When modules differ, kill the highest output first even if it is not the weakest. Removing a module that fires three times as hard as another saves more than the difference in their health costs you.",
    "Multi-phase bosses reset the problem. A phase change can move, expose or replace modules, so a priority list that was correct thirty seconds ago may be actively wrong now."
  ],
  "disclaimer": "none",
  "featured": false,
  "faqs": [
    {
      "question": "Why do I survive a boss fight but never actually kill the boss?",
      "answer": "Because dodging and killing are different problems and most advice only covers the first. If you are reading telegraphs well enough to avoid damage but the fight still ends in a timeout or a slow loss, your damage is going somewhere that does not reduce the threat — usually armoured surfaces, or modules picked because they were closest rather than because they were dangerous. The fix is target selection, not more upgrades."
    },
    {
      "question": "Which module should I destroy first?",
      "answer": "The one producing the most incoming damage per second, unless another module is nearly as dangerous and much faster to remove. Health is a cost, output is a benefit, and the comparison is between them rather than between health values alone. A module with twice the health and three times the output is still the correct first target, because every second it survives is a second of its full output landing on you."
    },
    {
      "question": "Is it better to spread damage across everything or focus one part at a time?",
      "answer": "Focus, in almost every case. Spreading damage means every module stays alive and firing until close to the end of the fight, so you absorb near-maximum incoming fire for the whole duration. Focusing removes sources of fire progressively, and each removal applies to the entire remainder of the fight. The total damage you deal is identical; the total damage you take is substantially lower."
    },
    {
      "question": "What changes when a boss enters a new phase?",
      "answer": "Potentially everything about your priority list. A phase transition can reposition modules, expose ones that were previously armoured, retire ones you never reached, and introduce attack patterns with different timing. Treat each phase as a fresh assessment rather than a continuation, and spend the first few seconds of a new phase identifying what is firing before committing your damage anywhere."
    }
  ],
  "sources": [
    {
      "title": "Lanchester combat models",
      "publisher": "arXiv preprint (N. J. MacKay, University of York)",
      "url": "https://arxiv.org/abs/math/0606300",
      "accessed": "2026-09-21"
    },
    {
      "title": "Learning, attentional control and action video games",
      "publisher": "Current Biology (via PubMed Central)",
      "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC3461277/",
      "accessed": "2026-09-21"
    },
    {
      "title": "The Pac-Man Dossier",
      "publisher": "Jamey Pittman",
      "url": "https://pacman.holenet.info/",
      "accessed": "2026-09-21"
    }
  ]
}
---

If you can survive a boss but cannot kill it, the problem is not your dodging and it is usually not your damage output. It is where the damage is going. A boss built out of destructible modules is several targets wearing one silhouette, and the order you remove them in changes how much punishment you absorb before the fight ends — even when your total damage dealt is identical.

That is the opposite of the usual boss advice, which is defensive: read the telegraph, learn the pattern, find the safe lane. All of that is necessary and we have written about it separately in [reading boss patterns](/blog/boss-pattern-recognition/). This is the offensive half, and a player can master the first and still never finish a fight.

## Modules turn one health bar into a schedule

The design idea is simple enough to state in a sentence. Instead of a single pool of health, the boss is assembled from parts, each with its own health and its own contribution to the attack. Destroying one removes that contribution permanently for the rest of the fight.

The moment that is true, the fight stops being a race between two health bars and becomes a scheduling problem. You are not only deciding how fast to deal damage; you are deciding when each source of incoming damage stops existing. Those are different questions and only the second one is under your control in an interesting way.

## The arithmetic, worked

Take a boss with four identical gun modules, each dealing one unit of damage per second, and assume your ship can destroy one module per five seconds of focused fire. The boss dies when all four are gone, at twenty seconds, and the total damage your ship produces is the same in every scenario below. Only the distribution changes.

**Focused, one at a time.** For the first five seconds all four modules fire: 20 units. The next five seconds, three remain: 15. Then two: 10. Then one: 5. Total incoming damage: **50 units**.

**Spread evenly across all four.** Every module survives until the twentieth second, because you were chipping at all of them simultaneously. Four modules firing for twenty seconds: **80 units**.

Same kill time. Same output from you. Sixty per cent more damage taken in the second case — or, put the other way, focusing cuts incoming damage by 37.5%. That difference is the entire margin between a boss you clear with a shield in reserve and a boss you lose to with the pattern read perfectly.

This is not a game-specific quirk. It is the oldest result in attrition modelling. In Lanchester's aimed-fire model — set out clearly in N. J. MacKay's overview of the family — each side's losses depend on the number of opposing units still firing, which makes the conserved quantity a difference of *squares* rather than of counts. The consequence MacKay draws out is the classic military maxim that you should almost never divide your forces, because dividing an effort N ways reduces its effective strength by a factor of N. Spreading your fire across four modules is exactly that division, applied to the attacking side.

## When the modules are not equal

Real bosses do not come in matched sets, which raises the question of what to kill first when the parts differ.

Keep the same setup but make two modules unequal: one deals three units per second, the other one unit, and either takes five seconds to destroy. Both are alive for the first five seconds whatever you do, which costs 20 units. The difference appears in the second five seconds.

Destroy the heavy module first and the light one fires alone: 5 units. Destroy the light one first and the heavy one fires alone: 15 units. **25 total against 35** — nearly thirty per cent less damage taken, from nothing but ordering.

The rule that falls out is worth committing to memory, because instinct points the other way. Players naturally kill the weakest thing first, because it produces visible progress soonest. Output is what you are trying to remove; health is only what it costs to remove it. A module with twice the health and three times the output is still the correct opening target.

The exception is when a cheap module is nearly as dangerous as an expensive one, or when a module is unreachable from your current position. Reachability matters more than it sounds: in a vertical shooter, the geometry of which parts your shots can actually touch changes every few seconds as the boss moves, and a theoretically correct target you cannot hit for four seconds is worse than a slightly wrong one you can hit now. Weapon properties feed into this too — piercing in particular changes which modules are reachable through others — which is one of the reasons upgrade order matters, covered in [which upgrades to buy first](/blog/ship-loadouts-and-upgrade-priority/).

## Phases reset the problem

Multi-phase bosses invalidate priority lists on purpose. A transition can reposition modules, expose surfaces that were armoured, retire parts you never reached and introduce attack patterns with different timing.

The precedent is older than the genre. Pac-Man's ghosts alternate between scatter and chase on a fixed schedule — four scatter periods per level before chase becomes permanent — and the correct response to a ghost depends entirely on which mode is currently running. The lesson generalises: when a game's antagonist has modes, "what should I do about that thing" is an incomplete question until you have specified which mode it is in.

Practically, that means spending the first two or three seconds of a new phase identifying what is firing rather than continuing to pour damage into whatever you were hitting. It feels like wasted time. It is cheaper than a phase spent shooting a decorative surface.

## The attention problem underneath all of this

There is a reason target priority is hard in practice even when the theory is obvious: a boss fight is a dense visual field and you are being asked to hold one specific object in attention while ignoring everything else moving on the screen.

Research on action video games describes exactly this capacity — reviews of the field report that action gamers suppress irrelevant visual streams more strongly than non-gamers, and that the extent of that suppression predicts how quickly they respond. Whatever one concludes about cause and effect there, the description of the task is accurate: selecting the right target in a crowded field is a suppression problem, not a perception problem. You can see the module perfectly well. The difficulty is not looking at everything else.

Two habits help. Name the target out loud, or at least explicitly, before committing — the act of specifying it makes drifting off it noticeable. And when you genuinely cannot identify which module is producing the heaviest fire, destroy one and watch what stops. Information gathered in the first phase is worth more than damage dealt in it.

## How this looks in a game built around it

Space Galaxy Attack Hardcore is our own app, built by Reign Creative, and it is designed around this exact decision. Its minibosses and multi-phase galaxy bosses carry destructible modules, and the game's own framing is that learning where to aim matters more than raw firepower. The campaign runs through ten sectors — orbital stations, neon cities, asteroid fields, enemy factories and finally the Galactic Core — each bringing its own enemy movement and attack patterns, and the upgrade tree includes piercing, firing speed and damage as separate purchases, which are three different answers to a targeting problem rather than three flavours of the same one.

Hardcore mode sharpens the point. It raises enemy durability, projectile speed and formation complexity, and gives bosses extra attack patterns with fewer openings — which means less time in each window to do the damage that matters, and a correspondingly higher penalty for spending that window on the wrong part. The [app page](/apps/space-galaxy-attack-hardcore/) has the full breakdown.

Whether to practise those fights in the campaign or grind them in Endless is a separate decision with a surprisingly clear answer, which we work through in [endless mode or the campaign](/blog/endless-mode-vs-campaign-shooters/). The rest of the category sits under [action and arcade games](/blog/category/action-arcade/).
