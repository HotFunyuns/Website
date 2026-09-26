---
{
  "title": "Shmup Difficulty: What Normal, Hardcore and Endless Actually Change",
  "metaTitle": "Shmup Difficulty Tiers",
  "description": "Difficulty modes usually change more than enemy health. What each tier alters, and how we decided where the line between them should sit.",
  "status": "published",
  "publishedAt": "2026-09-15",
  "updatedAt": "2026-09-15",
  "author": "reign-creative-llc",
  "category": "action-arcade",
  "tags": ["shmup", "difficulty", "game design", "developer insight"],
  "primaryKeyword": "shmup difficulty",
  "secondaryKeywords": [
    "shmup difficulty tier list",
    "shmup difficulty ranking",
    "game difficulty levels",
    "hardcore mode games",
    "arcade difficulty design",
    "endless mode"
  ],
  "intent": "informational",
  "longTailKeywords": [
    "what does hardcore mode change in a shooter",
    "how is shmup difficulty measured",
    "what is the difference between normal and hardcore",
    "do difficulty modes just add enemy health",
    "what does endless mode do"
  ],
  "aiSearchQuestions": [
    "What changes between difficulty modes in a shooter?",
    "How is shmup difficulty measured?",
    "Does hardcore mode just add health?",
    "What is Endless mode for?"
  ],
  "demandTier": "unverified-medium",
  "relatedApps": ["space-galaxy-attack-hardcore"],
  "relatedArticles": [
    "difficulty-curves-explained",
    "bullet-hell-vs-classic-shmup",
    "ship-loadouts-and-upgrade-priority",
    "boss-pattern-recognition"
  ],
  "takeaways": [
    "A difficulty tier that only raises enemy health makes a run longer, not harder, and players notice within one stage.",
    "The variables that genuinely change difficulty in a shooter are projectile speed, formation density and the size and frequency of boss openings.",
    "Boss opening windows are the strongest single lever: shrinking the gap between attack patterns changes what skill is being tested, not just how much of it you need.",
    "Endless mode is a different game mode wearing a difficulty label — it removes the finish line and turns the question into how long you last.",
    "If players cannot tell two difficulty tiers apart, the tiers are noise, and the right fix is to delete one rather than to widen the numbers."
  ],
  "disclaimer": "none",
  "featured": false,
  "faqs": [
    {
      "question": "What does a hardcore mode usually change?",
      "answer": "In a well-designed shooter, four things at once: enemy durability, projectile speed, formation complexity and boss behaviour. Enemy health alone is the weakest of the four, because it lengthens a stage without altering what you have to do in it. Projectile speed and formation density change the actual dodging problem, and extra boss attack patterns with fewer openings change what a competent player has to know rather than how much damage they can absorb."
    },
    {
      "question": "Is shmup difficulty measurable?",
      "answer": "Not in any standard way. There is no agreed scale across games, and the community tier lists that exist are collective opinion rather than measurement. Within a single game you can measure specific things — average bullets on screen, projectile velocity, seconds of safe window per boss cycle — which is what a developer tunes against. Across games those numbers are not comparable, because a slow bullet in a cramped playfield can be harder than a fast one in an open field."
    },
    {
      "question": "What is Endless mode for?",
      "answer": "It answers a different question from the campaign. A campaign asks whether you can finish; an endless mode removes the finish line and asks how long you last, which turns the game into a score and survival exercise rather than a progression one. It also serves as practice ground, because you meet the same enemy types repeatedly without having to replay earlier sectors to get to them."
    },
    {
      "question": "Should a beginner start on the harder mode?",
      "answer": "Usually not, but for an unexpected reason: the harder tier is often designed on the assumption that you already know the boss patterns, so it teaches badly. It is not simply the same content with tighter margins — it is the same content with the learning windows removed. Starting there means you are trying to learn a fight and survive it at the same time, which is the slowest possible way to do either."
    },
    {
      "question": "Do difficulty modes change the rewards?",
      "answer": "They do in some games and not in others, and it is worth checking which, because it changes the incentive. If a harder tier pays more, the mode becomes an efficiency decision as well as a skill one, and players will grind the hardest tier they can barely survive. If rewards are flat, the tier is purely an expression of how you want to play, which is the cleaner design but gives a completionist less reason to climb."
    }
  ],
  "sources": [
    {
      "title": "Game balance",
      "publisher": "Wikipedia",
      "url": "https://en.wikipedia.org/wiki/Game_balance",
      "accessed": "2026-09-15"
    },
    {
      "title": "Dynamic game difficulty balancing",
      "publisher": "Wikipedia",
      "url": "https://en.wikipedia.org/wiki/Dynamic_game_difficulty_balancing",
      "accessed": "2026-09-15"
    }
  ]
}
---

The laziest way to build a hard mode is to multiply enemy health. It is one line of code, it reliably makes players die more, and it is almost always the wrong answer, because what it actually produces is a longer stage rather than a harder one. Players work this out inside a single level: the bullets look the same, the formations arrive at the same time, everything just takes more shots to remove.

Here is what genuinely moves difficulty in a vertical shooter, in rough order of how much it matters, and what we changed in our own tiers once we stopped pretending health was enough.

## The four levers that actually matter

**Projectile speed.** The most direct lever there is. A faster bullet gives you less time between seeing it and needing to have moved, and the effect is not linear — past a certain speed, reaction stops being viable and the pattern has to be learned in advance. That is a completely different skill, not more of the same one.

**Formation density.** How many things are on screen, how tightly they are packed, and how much safe space exists between them. Density changes the shape of the dodge: sparse fire is a reaction problem, dense fire is a routing problem.

**Boss opening windows.** The seconds between a boss's attack patterns when you can safely deal damage. Shrinking those windows is the single strongest difficulty lever in the genre, because it converts a fight you can win by being careful into a fight you can only win by knowing what comes next.

**Enemy durability.** Last, and least. It has a legitimate role — it lengthens the time a formation is on screen, which interacts with density — but on its own it is padding.

Adjusting these is straightforward game balance work: changing rewards, challenges and elements to produce the experience you intended. What makes difficulty tiers particularly tricky is that you are doing it several times over, for several different players, in the same build.

## What Hardcore changes in our game

[Space Galaxy Attack Hardcore](/apps/space-galaxy-attack-hardcore/) ships three modes, and the differences between them are deliberate rather than numerical.

**Normal** is classic arcade progression through ten connected sectors — orbital stations, neon cities, asteroid fields, enemy factories, and the Galactic Core at the end. It is built to be learnable: bosses telegraph, openings are generous, and the first time you meet a pattern you are given room to watch it.

**Hardcore** raises enemy durability, projectile speed and formation complexity, and gives bosses extra attack patterns with fewer openings. The last clause is the important one and it is the design intent stated plainly: *Hardcore assumes you already know the fight.* It is not Normal with tighter margins. It is Normal with the teaching removed.

We are explicit about that because it changes the advice. Playing Hardcore first is not brave, it is inefficient — you are trying to learn a boss and survive it simultaneously, in a mode built on the assumption that the learning already happened. The general principle underneath this, and how escalation is designed across genres, is in [difficulty curves explained](/blog/difficulty-curves-explained/).

**Endless** drops the campaign entirely and asks how long you last. It is not a third rung on the same ladder; it is a different question. It is also, quietly, the best practice mode, because you meet enemy types repeatedly without replaying four sectors to reach them.

## The two tiers we cut

The build did not start with three modes. It started with five.

Between Normal and Hardcore we had two intermediate tiers, and the reasoning at the time was reasonable: a smoother ramp, more places for a player to sit comfortably, a smaller cliff at the top. The numbers between each step were carefully chosen and the spacing was even.

Nobody could tell them apart.

In internal play, asked which of the two middle tiers they had just finished, people guessed — and guessed wrong about as often as right. The differences were real in the configuration file and invisible in the hands. What we had built was not a ramp, it was four values of the same mode plus a genuinely different one at the end.

So we deleted both. Not merged, not retuned — deleted, and reallocated their distinctiveness into making the gap between Normal and Hardcore mean something concrete: not "more of everything", but specifically *fewer boss openings and faster projectiles*, which a player can feel in one fight.

The lesson we took from it is narrow and we think it generalises: **a difficulty tier only exists if players can describe how it differs.** If the only way to tell two modes apart is to read the menu, the modes are noise, and adding a third one will not fix that.

## Why we do not adjust difficulty automatically

There is a whole category of design that handles this differently: adjusting parameters, scenarios and behaviours in real time based on the player's ability, with the aim of keeping challenge appropriate and preventing both boredom and frustration.

It is a legitimate technique and we chose not to use it, for one reason specific to this genre. Shoot 'em ups are score games. If the game quietly gets easier when you are struggling, a score stops describing your performance and starts describing your performance plus an unknown adjustment. Two runs with the same number on the board are no longer comparable, and in a genre where the entire long-term appeal is beating your own result, that is a large thing to give up.

We would rather have a fixed difficulty you can fail at honestly than an adaptive one that flatters you. That is a preference, not a fact, and there are plenty of games where the opposite call is clearly right.

## How to pick a tier

- **If you have never played the genre**, start on the easiest tier available and finish it. The point is not the credit; it is that the easier tier is where the patterns are teachable.
- **If you are dying to the same boss repeatedly**, the problem is usually a pattern you have not identified rather than a stat you are missing — [boss pattern recognition](/blog/boss-pattern-recognition/) covers how to read one instead of out-damaging it.
- **If you are comfortable but bored**, move up one tier and expect to lose the first three attempts. That is the tier working.
- **If you want a score rather than a campaign**, go to the endless mode directly. It is not a lesser mode.

One thing a difficulty tier will not fix is a bad upgrade order. A run that ends early because you bought damage before survivability ends early on every difficulty, which is why [which upgrades to buy first](/blog/ship-loadouts-and-upgrade-priority/) is worth reading before you climb.

It is also worth knowing which shape of shooter you are actually playing, because "hard" means different things in a dense-pattern bullet hell and a formation-based classic shooter — [bullet hell versus classic shmup](/blog/bullet-hell-vs-classic-shmup/) draws that line.

## What we would still like to fix

Our tiers are honest about what they change, and they are not equally well-served. Endless is the mode with the least design attention in the current build: it does what it says, it escalates sensibly, and it does not yet have the pacing variation the campaign sectors have. That is a real limitation rather than a roadmap tease, and if endless play is the main thing you want from a shooter, it is fair to weigh it.

The campaign, and the rest of the studio's short-session titles, are listed under [Action & Arcade Games](/apps/category/action-arcade/).
