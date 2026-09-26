---
{
  "title": "Countering Armoured, Flying and Elite Enemies",
  "metaTitle": "Countering Armour and Flyers",
  "description": "Mixed waves punish a single-answer defence. How armour, flight and elite modifiers change what damage gets through, and how to plan for all three.",
  "status": "published",
  "publishedAt": "2026-09-15",
  "updatedAt": "2026-09-15",
  "author": "reign-creative-llc",
  "category": "action-arcade",
  "tags": ["tower defense", "enemies", "strategy", "tactics"],
  "primaryKeyword": "how to counter flying enemies in tower defense",
  "secondaryKeywords": [
    "armoured enemies tower defense",
    "flying enemies tower defense",
    "tower defense boss wave",
    "enemy types tower defense",
    "anti air towers",
    "tower defense wave composition"
  ],
  "intent": "informational",
  "longTailKeywords": [
    "how do you deal with flying enemies in tower defense",
    "what beats armoured enemies in tower defense",
    "how to survive a boss wave",
    "why does my defence fail on mixed waves",
    "should you build anti air early"
  ],
  "aiSearchQuestions": [
    "How do you counter flying enemies?",
    "What damage type beats armour?",
    "How do you prepare for a boss wave?",
    "Why do mixed waves break a strong defence?"
  ],
  "demandTier": "unverified-low",
  "relatedApps": ["regal-tower-defense"],
  "relatedArticles": [
    "tower-types-and-what-they-counter",
    "tower-defense-strategy-basics",
    "aura-towers-and-support-stacking",
    "boss-pattern-recognition",
    "tower-defense-camera-controls"
  ],
  "takeaways": [
    "Armour taxes each individual hit, so fast weak shots lose most of their value and slow heavy shots keep most of theirs — the answer is rarely more of the same tower.",
    "Flight is a geometry problem rather than a damage problem, because flyers ignore the path your whole layout was built around.",
    "Elite modifiers usually change a stat you were relying on rather than adding a new one, which is why an elite wave fails in a way that looks arbitrary.",
    "A defence that beats every wave separately can still lose a mixed wave, because mixed waves attack the assumption that one answer is enough.",
    "If a wave has exactly one solution, that is a level design fault rather than a difficulty setting, and we rebuilt one of ours for that reason."
  ],
  "disclaimer": "none",
  "featured": false,
  "faqs": [
    {
      "question": "How do you counter flying enemies?",
      "answer": "By treating it as a positioning problem first. Flyers usually ignore the ground route, which means the corner you built your entire defence around may not be on their line at all. Check where they actually cross the map, make sure at least one cluster covers that line, and confirm which of your towers can target them — a tower that cannot shoot upward is not a weak answer to flyers, it is no answer. Building a little anti-air before you need it costs less than rearranging a whole layout mid-wave."
    },
    {
      "question": "What beats armoured enemies?",
      "answer": "Slow, heavy single hits. Armour in most tower defence games subtracts a fixed amount from each incoming hit, which means a tower firing many small shots loses a large proportion of its output while a tower firing few large ones loses very little. Adding more fast towers therefore feels like it should work and does not. The intended answer is a siege-type tower, and the usual cost is a rate of fire that makes it poor against swarms."
    },
    {
      "question": "Why does my defence fail on mixed waves when it beats every wave separately?",
      "answer": "Because a mixed wave is not testing your power, it is testing your assumption. A layout built entirely of splash damage beats a crowd wave and loses to an armoured single target. A layout built entirely of heavy single hits does the reverse. When both arrive together, the defence has to answer two different questions at once with one budget, and whichever answer you skipped is the one that leaks."
    },
    {
      "question": "How do you prepare for a boss wave?",
      "answer": "Before it arrives, not during. Bosses generally reward concentrated single-target damage rather than coverage, so the usual preparation is to deepen one cluster on the boss's route rather than spread thin. Keep a reserve of currency going into the wave so you can respond to what the boss actually does, and expect to rearrange rather than just add — a defence tuned for the previous forty waves is tuned for the wrong problem."
    },
    {
      "question": "Should you build anti-air early?",
      "answer": "A little, yes. The cost of being early is a slightly slower start; the cost of being late is a wave that walks over your whole layout while you scramble. Most campaigns telegraph the first flying wave, and the cheap insurance is one tower that can target them, placed on the line they will actually take rather than on the ground path."
    }
  ],
  "sources": [
    {
      "title": "Tower defense",
      "publisher": "Wikipedia",
      "url": "https://en.wikipedia.org/wiki/Tower_defense",
      "accessed": "2026-09-15"
    },
    {
      "title": "Rock paper scissors",
      "publisher": "Wikipedia",
      "url": "https://en.wikipedia.org/wiki/Rock_paper_scissors",
      "accessed": "2026-09-15"
    }
  ]
}
---

The wave that finally beats a good defence is almost never the biggest one. It is the one carrying three different problems at the same time: something armoured that shrugs off your arrow towers, something flying that ignores the corner you built everything around, and an elite with a modifier that quietly disables the trick you have been relying on since world two.

Each of those is a different failure with a different fix, and the diagnosis matters more than the fix does.

## Armour is a tax on every individual hit

Start with the counter-intuitive one.

Armour in this genre generally works by subtracting a fixed amount of damage from each hit that lands, rather than by increasing a health pool. That single design choice changes the arithmetic completely.

Imagine an armour value that removes 5 damage per hit.

- A fast tower doing 8 per shot lands 3. It has lost more than half its output.
- A heavy tower doing 60 per shot lands 55. It has lost under a tenth.

The fast tower is not slightly worse against armour. It is *categorically* worse, and building four more of them multiplies a bad ratio. This is why "I added more towers and it still leaked" is the most common armour complaint, and why the answer is a different kind of tower rather than more of the same one.

In [Regal Tower Defense: TD Game](/apps/regal-tower-defense/) that role belongs to the Siege tower — slow, long-ranged, heavy per hit — and the trade is exactly what you would expect. A defence made of Siege towers handles brutes and golems comfortably and then gets swarmed by goblins and wolves, because it cannot fire often enough. Which of the seven types answers which problem is set out in [what each tower type is actually for](/blog/tower-types-and-what-they-counter/).

There is a second answer worth knowing: control. Slowing an armoured unit does not change the damage subtraction at all, but it does increase how many hits land, and against a slow-moving heavy target that is often the cheapest improvement available.

## Flight is a geometry problem in a damage costume

Flying enemies get treated as a damage question — "what has enough output to kill drakes" — when they are usually a positioning question.

Your layout is built around the path. You found the switchback, you clustered on the corner, you bought Build Pads to get a better angle on the inside of the bend. Every bit of that was an argument about the route.

Flyers frequently ignore the route. They cross the map on their own line, and the cluster you spent forty waves perfecting may simply not be near it. When a flying wave goes through untouched, the usual cause is not that your towers were too weak, but that they were pointing at the ground.

So the checks are, in order:

1. **Where do they actually cross?** Watch one flying wave without panicking about the damage. Note the line.
2. **Does anything cover that line?** If not, nothing else you do matters.
3. **Can the towers on that line target them at all?** A tower that cannot shoot upward is not a weak answer. It is no answer.
4. **Is that cluster strong enough?** Only now is this a damage question.

The cheap insurance is to place one tower that can engage flyers before the first flying wave arrives, on the line they will take rather than on the path. Being a little early costs you a slightly slower economy. Being late costs you the level.

## Elites change a stat you were relying on

Elite modifiers are the third category and the one that reads as arbitrary until you know what to look for.

An elite is usually not a new enemy. It is a normal enemy with one property altered — more speed, more resistance to a damage type, immunity to slowing, or a shield that regenerates. The reason an elite wave feels unfair is that the alteration is almost always aimed at whatever your defence has been quietly depending on. A layout built around a Frost tower collapses against something that cannot be slowed, and it collapses suddenly, because the dependency was invisible while it was working.

The practical habit is to name your dependency out loud before the wave. "This level is held together by the slow." "This level is held together by one Lightning tower on the second bend." Once you can say it, you can guess what an elite will do to it.

## Why mixed waves are the real exam

Individually, armour, flight and elites are solvable. Together they are testing something else.

Counter systems in games are commonly built on a non-transitive, rock-paper-scissors relationship — each option beats one thing and loses to another — and the point of designing that way is that it is self-balancing: it prevents a single dominant strategy from taking over. That is a design virtue from our side of the screen and an obligation from yours. If every option has something it is bad at, a defence made entirely of one option has a guaranteed hole, and a mixed wave is simply the wave that finds it.

This is why a layout that beats waves 1 through 30 can fall apart at 31 with no warning. Nothing got much stronger. The wave just stopped being one kind of thing.

The corresponding skill is budget allocation rather than tower choice: keeping a minority of your spend on the answer you are not currently using. It feels wasteful for twenty waves and pays for itself once.

## The wave we rebuilt

One late wave in our campaign originally had exactly one solution.

It combined a heavily armoured lead with a fast flying escort, timed so that you could not reposition between them, and the only layout that survived was a specific pairing of Siege and anti-air on one particular pad. Players did not find it clever. They found it by dying six times and then copying a layout, which is a very different experience from solving something.

We rebuilt it, and the change was not to make it easier. We widened the timing so the armoured lead and the flying escort arrive with a gap, which means there are now several ways through: commit early on armour and reposition, split the budget, or lean on control and accept a slower kill. The wave is about as hard as it was. It just stopped having a single key.

That is the design line we try to hold: a wave should punish a defence that only knows one answer, and it should not demand one specific answer. Which of those two a hard wave actually is can be hard to tell from the losing side, and it is a fair thing to judge any tower defence game on.

## Reading the wave before it arrives

Most of this comes down to using the planning pause properly.

- Check what is coming and name the property that threatens you: armour, flight, speed, or a resistance.
- Name the thing your current layout depends on. That is what the wave will attack.
- Spend on the missing answer rather than deepening the answer you already have — unless the wave is a single large target, in which case depth on its route is exactly right.
- Keep a reserve. A boss you can respond to is much cheaper than a boss you have to have pre-empted perfectly.

Bosses in particular reward pattern reading over raw output, and the general version of that skill — watching what an encounter does before deciding how to answer it — is covered in [boss pattern recognition](/blog/boss-pattern-recognition/).

If the leaks are happening in the same place every wave regardless of enemy type, the problem is not composition at all, it is coverage, and [why placement beats damage](/blog/tower-defense-strategy-basics/) is the right page. If the leaks stopped once you added a support tower and came back when you moved it, [aura towers and support stacking](/blog/aura-towers-and-support-stacking/) explains what you actually changed.

Our fifty-level campaign and the rest of the studio's short-session games are listed under [Action & Arcade Games](/apps/category/action-arcade/).
