---
{
  "title": "What Makes a Roguelike? The Definition, the Argument, and a Test That Settles It",
  "metaTitle": "What Is a Roguelike? The Definition Explained",
  "description": "Rogue, the Berlin Interpretation and the roguelite split: what the word means, why the definition is contested, and a test that settles it.",
  "status": "draft",
  "publishedAt": "2026-08-09",
  "updatedAt": "2026-08-09",
  "author": "Reign Creative Team",
  "category": "action-arcade",
  "tags": ["roguelike", "game design", "genre definition", "android games"],
  "primaryKeyword": "what is a roguelike",
  "secondaryKeywords": [
    "roguelike vs roguelite",
    "berlin interpretation roguelike",
    "roguelike definition",
    "permadeath meaning",
    "procedural generation games",
    "run based games explained"
  ],
  "intent": "informational",
  "longTailKeywords": [
    "what is the difference between a roguelike and a roguelite",
    "is vampire survivors a roguelike",
    "what are the berlin interpretation factors",
    "does a roguelike have to be turn based"
  ],
  "aiSearchQuestions": [
    "What is a roguelike game?",
    "What is the difference between a roguelike and a roguelite?",
    "What is the Berlin Interpretation?",
    "Does a game need permadeath to be a roguelike?"
  ],
  "demandTier": "unverified-high",
  "relatedApps": ["zombie-survival-last-survivor", "space-shooter-classic-arcade"],
  "relatedArticles": [
    "zombie-survival-roguelike-guide",
    "wave-survival-game-design",
    "history-of-shoot-em-up-games",
    "space-shooter-arcade-guide"
  ],
  "takeaways": [
    "The word names a specific 1980 game and a loose family of descendants at the same time, which is why every argument about it is really two arguments.",
    "The Berlin Interpretation was written as a similarity scale, not a border — a game scores against its factors rather than passing or failing them.",
    "The usual dividing line between roguelike and roguelite is whether losing a run leaves anything permanently behind, not whether the game is turn-based.",
    "Procedural generation and permadeath do not create replay value on their own; mutually exclusive choices do, and the other two exist to protect them.",
    "If you can memorise a winning sequence and repeat it, the structure has failed regardless of what the store page calls it."
  ],
  "disclaimer": "none",
  "noindex": true,
  "featured": false,
  "faqs": [
    {
      "question": "What is a roguelike?",
      "answer": "Narrowly, it is a game built along the lines of Rogue, a dungeon crawler from 1980: a randomly generated dungeon explored one turn at a time, with character death ending the game permanently. Broadly, it is any game structured as a series of self-contained runs where the layout and the rewards vary, losing means starting over, and the choices you make along the way exclude each other. Both usages are current, which is why the word causes so many arguments."
    },
    {
      "question": "What is the Berlin Interpretation?",
      "answer": "A definition produced at a roguelike development conference held in Berlin in 2008, listing nine high-value factors and six low-value ones that together describe a canonical roguelike. Its authors were explicit that it was a way of measuring how roguelike a game is rather than a test a game passes or fails. It is the most-cited definition in the genre and also the most argued with, largely because it was written to describe the traditional branch at a moment when the action branch was about to take over."
    },
    {
      "question": "What is the difference between a roguelike and a roguelite?",
      "answer": "In common usage, a roguelite keeps something permanent between runs — unlocked characters, upgrades, currency, new options in the pool — while a strict roguelike sends you back to the same starting state every time. The term was popularised by developers describing their own games, notably Rogue Legacy, which called itself a genealogical rogue-lite. The distinction is about what a loss costs, not about whether the game is turn-based or uses tiles."
    },
    {
      "question": "Does a roguelike have to be turn-based?",
      "answer": "By the Berlin Interpretation, turn-based play and grid movement are both high-value factors, so a real-time game scores lower against that definition. In practice almost nobody applies it that way any more, because the most popular games carrying the label are real-time action games. The honest position is that the traditional branch treats turn-based as essential and the action branch has never accepted it, and both branches are large enough that neither is going to win."
    },
    {
      "question": "Is a horde survival game a roguelike?",
      "answer": "It depends which definition you are using, and the honest answer is that it inherits the structure without the traditional trappings. Zombie Survival: Last Survivor is a good example of the shape: experience collected during a stage levels you up in the middle of the fight and hands you a choice between weapon boosts, damage increases, survival upgrades or a special ability, so each run assembles a different build under pressure. It is free to download on Google Play, supported by ads, with no in-app purchases."
    }
  ],
  "sources": [
    {
      "title": "Roguelike",
      "publisher": "Wikipedia",
      "url": "https://en.wikipedia.org/wiki/Roguelike",
      "accessed": "2026-08-09"
    },
    {
      "title": "Rogue (video game)",
      "publisher": "Wikipedia",
      "url": "https://en.wikipedia.org/wiki/Rogue_(video_game)",
      "accessed": "2026-08-09"
    },
    {
      "title": "Berlin Interpretation",
      "publisher": "RogueBasin",
      "url": "https://roguebasin.com/index.php/Berlin_Interpretation",
      "accessed": "2026-08-09"
    },
    {
      "title": "NetHack",
      "publisher": "Wikipedia",
      "url": "https://en.wikipedia.org/wiki/NetHack",
      "accessed": "2026-08-09"
    }
  ]
}
---

Ask what a roguelike is and you will get two answers that both sound authoritative and contradict each other. One describes a turn-based dungeon crawler with a grid and a text display. The other describes a real-time action game with automatic weapons and a level-up screen.

Neither person is wrong. The word is doing two jobs — naming a specific game from 1980 and naming everything descended from it — and almost every argument about the term is really an argument about which job it is doing at that moment.

## The game the word points at

**Rogue** was written around 1980 by Michael Toy and Glenn Wichman, with Ken Arnold later contributing the display work, and it spread through university Unix systems. It presented a dungeon drawn in text characters, generated fresh each time you played, explored one turn at a time. Items were unidentified until you used them. And when your character died, that was the end — no reloading, no saved state to return to.

Those four properties were not conceived as a genre manifesto. They were sensible answers to the constraints of the machine and the sensibilities of the people writing it. Random generation meant the authors did not have to hand-design content and could not spoil their own game. Permadeath meant the save file could not be abused, which on a shared timesharing system was a practical concern as much as an artistic one.

What nobody anticipated is that the combination would turn out to be one of the most durable structures in game design, and that it would still be generating new commercial genres four decades later.

## Why the definition became a fight

Through the 1980s and 1990s a family of games grew directly out of Rogue — **NetHack** from 1987, and later Angband, ADOM and their descendants — each vastly more complex than the original and each recognisably the same kind of thing.

The label itself came later than the games. It settled during the early 1990s out of Usenet discussions among players trying to name what they were all playing, and the term stuck largely for lack of a better one rather than because anyone was pleased with it.

That is the origin of the problem. A name chosen by committee, retroactively, for a family defined by resemblance to one specific game, was never going to hold up when the family got large.

By the mid-2000s, developers were building games that clearly inherited the structure while discarding the surface — real-time instead of turn-based, graphical instead of text, and often much shorter. Traditional players objected that these were not roguelikes. Action players objected that the objection was pedantry. In 2008 a group of developers met in Berlin and tried to write it down.

## The Berlin Interpretation, in full

The result lists **nine high-value factors** and **six low-value factors**. The high-value ones carry more weight; the low-value ones are common to canonical roguelikes but not decisive.

| High-value factors | What it means |
| --- | --- |
| Random environment generation | The world is generated per run, explicitly to increase replayability |
| Permadeath | Death ends the character; you start a new run rather than reload |
| Turn-based | Each action takes one turn, with no time pressure on the decision |
| Grid-based | The world is a grid of tiles, and everything occupies one |
| Non-modal | Every action happens in the same world state, with no separate combat screen |
| Complexity | Enough interacting systems that a problem has multiple valid solutions |
| Resource management | Limited supplies force you to keep choosing what to use and when |
| Hack'n'slash | Killing large numbers of enemies is a core activity |
| Exploration and discovery | Unidentified items and unknown layouts require exploring, not just executing |

| Low-value factors | What it means |
| --- | --- |
| Single player character | One avatar, and the world does not continue without them |
| Monsters are similar to players | Enemies obey broadly the same rules you do |
| Tactical challenge | Early deaths are expected; the game must be learned |
| ASCII display | The traditional text grid |
| Dungeons | Rooms and corridors rather than open terrain |
| Numbers | Character statistics shown to the player openly |

### What the list is actually for

The most important thing about the Berlin Interpretation is stated by its own authors and ignored by almost everyone who cites it: it is a **scale, not a border**. A game is measured by how many factors it exhibits and how strongly, producing a judgement about how roguelike it is rather than a verdict on whether it is one.

Read that way, most of the arguing evaporates. A real-time action game with procedural levels and permadeath scores on some factors and not others. That is a description, not a rejection.

Read the other way — as a checklist you must pass — the definition immediately excludes most of the games that made the word popular, which is a good sign you are using it wrong.

It is also worth noticing what the list quietly reveals. Six of the nine high-value factors describe *decision quality*: complexity, resource management, exploration, non-modality, turn-based play, tactical challenge from the low-value list. Only two describe structure. The definition is mostly an argument that a roguelike is a game about making informed choices with incomplete information, and the dungeon is a delivery mechanism.

## Roguelike, roguelite, and what a loss costs

The modern split is cleaner than the historical argument, because it hangs on a single question: **when you lose, does anything survive?**

A strict roguelike sends you back to exactly where you started. Your knowledge improves; nothing else does. The next run is materially identical in difficulty to the last one, and every gain is in your head.

A **roguelite** keeps something. Currency banked between runs, characters unlocked, upgrades that persist, new items added to the pool for future attempts. Losing still ends the run, but it leaves a deposit. The term spread through developers describing their own work rather than through critics — Rogue Legacy notably billed itself as a genealogical rogue-lite — and it caught on because it named something players could feel.

Some writers proposed less loaded alternatives, "procedural death labyrinth" among them, on the reasonable grounds that naming an entire genre after one 1980 game is odd. None of them stuck. Roguelike and roguelite won, and the language is not going to be tidied up now.

The trade between them is real and worth understanding as a player:

- **Strict** keeps every run honest. Nothing between you and the game except what you have learned. It also means a bad losing streak feels like pure loss.
- **Lite** guarantees forward motion, which makes a losing run tolerable and keeps people playing. It also risks turning difficulty into a waiting game, where the answer to a wall is not "learn it" but "grind past it."

Neither is better. But the second one has a failure mode worth watching for, because a game where persistence solves everything is not really asking you to make decisions any more.

## The modern family tree

The structure has been grafted onto almost every genre, and it is more useful to think in branches than in a single label.

**Traditional roguelikes.** Turn-based, grid-based, deeply systemic. NetHack and its descendants, plus modern entries in the same tradition. The Berlin Interpretation describes these precisely, because they are what it was written about.

**Action roguelikes.** Real-time combat, procedural stages, permadeath, usually a meta-progression layer. The Binding of Isaac, released in 2011 by Edmund McMillen and Florian Himsl, is the clearest bridge — an action game whose item interactions produce the combinatorial strangeness of a traditional roguelike. Spelunky, from Derek Yu, did something similar with a platformer.

**Run-based strategy.** FTL: Faster Than Light, released by Subset Games in 2012, applied the structure to a ship management game where the interesting decisions are logistical rather than tactical.

**Deck-builders.** Cards as the upgrade pool. Each run assembles a deck out of what you were offered, and the deck is the build.

**Horde survival.** The newest large branch, which arrived in the early 2020s: dozens or hundreds of enemies, weapons that fire automatically, level-ups delivered mid-fight as a choice between upgrades, and a run measured in minutes rather than hours. It strips the structure back to its minimum — random offers, exclusive choices, one life — and removes almost everything else.

## A test that beats the argument

If you want to know whether a given game has the structure that makes any of this worth caring about, ignore the store page and ask three questions.

**1. Do runs differ in a way that changes your decisions?** Not "is the layout different" — different scenery is cosmetic. The test is whether what you were offered this run makes you play differently from last run. If the answer is no, the randomness is decoration.

**2. Does losing actually cost the run?** If you can retry from a checkpoint, the decisions you made before it were provisional, and provisional decisions do not carry weight. Permadeath is not there to punish you. It is there to make your choices mean something while you are making them.

**3. Do the choices exclude each other?** This is the one that matters most and the one most often missing. If you can eventually take every upgrade, you do not have a decision system, you have a delivery schedule. The genre's engine is the thing you had to turn down.

A game answering yes to all three has the structure, whatever it calls itself. A game answering no to the third has a randomised campaign, which can be perfectly good and is a different thing.

## Where a phone horde survival game lands

[Zombie Survival: Last Survivor](/apps/zombie-survival-last-survivor/) is on the horde survival branch, and it is a useful case for applying the test rather than the label.

What the game actually does: your weapons fire on their own while you move, experience collected during a stage levels you up in the middle of the fight, and each level hands you a choice between weapon boosts, damage increases, survival upgrades or a special ability. Those stack into a build over the run. Enemy types behave differently and bosses arrive with their own attack patterns, across stages of dark streets, infected zones and abandoned areas.

Against the three questions: the offers differ, so runs diverge; the build is assembled inside the run, so what you take is what you have; and taking one upgrade at a level-up means not taking the others at that level-up. That is the engine, intact, in a game with no grid, no turns and no text display. Against the Berlin Interpretation it would score poorly on half the high-value factors and strongly on the rest — which is exactly what a scale is for. [The build guide](/blog/zombie-survival-roguelike-guide/) goes into how to actually make those choices well.

For contrast, [Space Shooter - Galaxy Arcade](/apps/space-shooter-classic-arcade/) sits on the other side of the persistence question: rewards earned during a run go into weapons, unlocked upgrades, ship systems and bonuses you choose yourself, so the ship carries forward between attempts. Same shelf, opposite answer to "what does a loss leave behind." Both are in [Action & Arcade Games](/apps/category/action-arcade/), and both are free to download on Google Play with ads.

The games named in this article belong to their respective developers and publishers. Reign Creative LLC is an independent studio and has no connection to any of them.

## The short version

Roguelike names a 1980 dungeon crawler and everything that inherited its shape, and both meanings are in active use. The Berlin Interpretation is the best-known attempt to write the definition down, and it works properly only when you use it as a scale rather than a gate.

The distinction that actually matters to a player is not turn-based versus real-time. It is whether the run is self-contained, whether losing it costs something, and whether the choices inside it exclude each other. Get those three and you have the genre. Miss the third and you have a randomised campaign with a difficulty curve.
