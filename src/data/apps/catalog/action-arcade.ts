import type { AppInfo } from '../types';

export const actionArcadeApps: AppInfo[] = [
  {
    slug: 'space-shooter-classic-arcade',
    name: 'Space Galaxy Attack Arcade',
    tagline: 'Four abilities, one ship, and a screen full of enemy fire to weave through.',
    cardDescription:
      'Dodge projectile patterns, time your shield and Ultimate through escalating waves, then spend the rewards on a stronger ship.',
    longDescription: [
      'Space Galaxy Attack Arcade is wave-based space combat where staying alive comes down to where you put your ship. Hostile fleets fill the screen with projectiles, and the safe route through them changes every few seconds. Firing is only part of the job, and reading the pattern before it closes around you is the rest.',
      'You have four things to work with. FIRE runs your main weapons, ALT triggers a secondary attack, the Ultimate charges up for the moments that need it, and the Shield buys you a way out when the screen turns dangerous. Knowing which one to spend, and when, is what separates a short run from a deep one.',
      'Rewards earned during a run go straight into the ship: stronger weapons, unlocked upgrades, improved systems and bonuses you choose yourself. Enemy models move and attack differently, and boss encounters ask you to learn their patterns rather than out-gun them. Endless Mode removes the finish line entirely and simply asks how far you can get.',
    ],
    category: 'Games · Arcade',
    categoryId: 'action-arcade',
    schemaCategory: 'GameApplication',
    playStoreUrl: 'https://play.google.com/store/apps/details?id=com.reigncreative.alieninvasion',
    packageId: 'com.reigncreative.alieninvasion',
    icon: '/icons/space-shooter-classic-arcade.jpg',
    iconSmall: '/icons/space-shooter-classic-arcade-sm.jpg',
    accent: 'from-crimson-500 to-ink-700',
    featured: true,
    playCategory: 'GAME_ARCADE',
    contentRating: 'Everyone',
    containsAds: true,
    inAppPurchases: true,
    free: true,
    lastVerified: '2026-09-15',
    features: [
      {
        title: 'Four abilities, four answers',
        body: 'FIRE, ALT, Ultimate and Shield each solve a different problem, so every wave is really a question about which one to spend.',
      },
      {
        title: 'Patterns you can learn',
        body: 'Projectiles arrive in readable patterns. Movement and timing keep you alive far more reliably than raw firepower does.',
      },
      {
        title: 'Upgrade the ship',
        body: 'Rewards from each run strengthen weapons, unlock upgrades and improve ship systems, so a better setup carries you deeper next time.',
      },
      {
        title: 'Enemies that are not interchangeable',
        body: 'Different enemy models use their own movement and attack styles, and bosses bring heavy attacks with openings you have to find.',
      },
      {
        title: 'Endless Mode',
        body: 'No finish line, just rising pressure. Positioning and ability timing decide how long you last once the waves stop ending.',
      },
    ],
    audience: [
      'Arcade shooter players who enjoy dodging as much as shooting',
      'Anyone who wants runs that fit into a short break',
      'Players who like building a stronger ship between attempts',
      'Bullet hell fans looking for readable patterns rather than chaos',
    ],
    howItWorks: [
      {
        title: 'Launch a run',
        body: 'Take your ship into the wave in front of you and start clearing the fleet as it moves into position.',
      },
      {
        title: 'Move first, shoot second',
        body: 'Weave between projectiles and pick the safest path through the pattern instead of trading fire head-on.',
      },
      {
        title: 'Spend your abilities',
        body: 'Trigger ALT attacks, hold the Ultimate for a boss or a bad wave, and drop the Shield when the screen closes in.',
      },
      {
        title: 'Upgrade and go again',
        body: 'Put the rewards you earned into weapons, systems and bonuses, then push further into the campaign or into Endless Mode.',
      },
    ],
    faqs: [
      {
        question: 'Is Space Galaxy Attack Arcade free?',
        answer:
          'Yes, it is free to download on Google Play. It is supported by ads, and optional in-app purchases are available.',
      },
      {
        question: 'What do the ability buttons do?',
        answer:
          'FIRE runs your main weapons, ALT triggers a secondary attack, the Ultimate is a charged attack you save for pressure, and the Shield protects you while it holds.',
      },
      {
        question: 'Does progress carry between runs?',
        answer:
          'Yes. Rewards earned during a run go into weapons, upgrades, ship systems and bonuses, so the ship you launch with keeps getting stronger.',
      },
      {
        question: 'Is it too hard for a casual player?',
        answer:
          'The controls take seconds to learn and early waves are approachable. Pressure builds as you go, which is where the arcade challenge lives.',
      },
      {
        question: 'What is Endless Mode?',
        answer:
          'A mode with no end point. Waves keep coming and keep getting harder, so the only measure is how far your positioning and ability timing take you.',
      },
    ],
    metaTitle: 'Space Galaxy Attack Arcade for Android',
    metaDescription:
      'Weave through enemy fire, time your ALT attack, Ultimate and Shield, then upgrade your ship between runs and test it in Endless Mode. Free on Google Play.',
  },
  {
    slug: 'zombie-survival-last-survivor',
    name: 'Zombie Survival: Last Survivor',
    tagline: 'Move, level up mid-run, and build a survivor who can outlast the next wave.',
    cardDescription:
      'You move, your weapons fire. Level up during the run, pick upgrades, and see how deep into the dead city you get.',
    longDescription: [
      'Zombie Survival: Last Survivor gives you one job, which is to keep moving. Your weapons fire on their own as you run, so the game lives entirely in positioning: staying out of the middle of the horde, keeping distance from the fast ones, and never letting a swarm close the gap behind you.',
      'Experience collected during a stage levels you up mid-battle, and every level is a decision. Weapon boosts, damage increases, survival upgrades and special abilities stack into a build, and because you pick them under pressure, no two runs end up the same shape.',
      'The dead city runs through stages of dark streets, infected zones and abandoned areas, each with its own enemy types and rising pressure. Bosses arrive with unique attack patterns and are less about raw damage than about spotting the openings. Runs are short enough for a break and long enough to matter when things are going well.',
    ],
    category: 'Games · Action',
    categoryId: 'action-arcade',
    schemaCategory: 'GameApplication',
    playStoreUrl:
      'https://play.google.com/store/apps/details?id=com.reigncreative.zombiesurvivors',
    packageId: 'com.reigncreative.zombiesurvivors',
    icon: '/icons/zombie-survival-last-survivor.jpg',
    iconSmall: '/icons/zombie-survival-last-survivor-sm.jpg',
    accent: 'from-crimson-600 to-ink-900',
    playCategory: 'GAME_ACTION',
    contentRating: 'Everyone',
    containsAds: true,
    inAppPurchases: true,
    free: true,
    lastVerified: '2026-09-15',
    features: [
      {
        title: 'You move, the weapons fire',
        body: 'Movement is the whole skill. Your survivor shoots automatically, so every decision comes down to where you are standing.',
      },
      {
        title: 'Level up mid-run',
        body: 'Experience collected during a stage promotes you in the middle of the fight and hands you an upgrade choice on the spot.',
      },
      {
        title: 'Builds that come out differently',
        body: 'Stronger weapons, extra damage, survivability and special abilities combine into a build that changes how the whole run plays.',
      },
      {
        title: 'Enemy types and bosses',
        body: 'Different undead behave differently, and boss fights bring their own attack patterns you have to read before you can beat them.',
      },
      {
        title: 'Stages through a dead city',
        body: 'Dark streets, infected zones and abandoned areas each raise the pressure as you push further into the outbreak.',
      },
    ],
    audience: [
      'Players who like roguelike survival runs with upgrade choices',
      'Anyone who wants heavy action without complicated controls',
      'Zombie and horde survival fans',
      'People who need a game that fits a five-minute gap or a long sitting',
    ],
    howItWorks: [
      {
        title: 'Start a stage',
        body: 'Drop into the dead city and start moving. Your weapons handle the shooting from the first second.',
      },
      {
        title: 'Stay out of the swarm',
        body: 'Keep distance from the fast enemies, avoid being surrounded, and pick up power-ups while you reposition.',
      },
      {
        title: 'Choose your upgrades',
        body: 'Experience levels you up mid-run, and each level lets you take weapon boosts, damage, survival upgrades or a special ability.',
      },
      {
        title: 'Take on the boss',
        body: 'Learn the attack pattern, dodge the heavy hits, and use the build you assembled to bring it down before the next stage.',
      },
    ],
    faqs: [
      {
        question: 'Is Zombie Survival: Last Survivor free?',
        answer:
          'Yes, it is free to download on Google Play. It is supported by ads and offers optional in-app purchases.',
      },
      {
        question: 'Do I have to aim and shoot?',
        answer:
          'No. You control movement and your weapons fire at the undead automatically, which is why positioning decides most runs.',
      },
      {
        question: 'How do upgrades work?',
        answer:
          'You collect experience during a stage, level up in the middle of the fight, and pick from weapon boosts, damage increases, survival upgrades or a special ability.',
      },
      {
        question: 'How long is a run?',
        answer:
          'It flexes. The game is built for short sessions or longer survival runs, so you can stop after a stage or keep pushing through the city.',
      },
      {
        question: 'Is it difficult?',
        answer:
          'Early stages are approachable and the controls are simple. Waves get heavier and bosses get tougher the further you go, which is where the challenge sits.',
      },
    ],
    metaTitle: 'Zombie Survival: Last Survivor for Android',
    metaDescription:
      'Keep moving while your weapons fire, level up mid-run and choose upgrades that build a survivor tough enough for the boss. Free on Google Play.',
  },
  {
    slug: 'space-galaxy-attack-hardcore',
    name: 'Space Galaxy Attack Hardcore',
    tagline: 'A vertical shooter with a difficulty mode that expects you to have learned the patterns.',
    cardDescription:
      'Fly anime-styled ships through ten sectors of enemy formations and multi-phase bosses, with Normal, Hardcore and Endless modes.',
    longDescription: [
      'Space Galaxy Attack Hardcore is a vertical scrolling shoot ’em up with anime and manga-inspired artwork. You pick a ship, fly it up through enemy formations, and spend the gold you collect on making it survive the next sector. The controls are touch-based and immediate — the game explains itself in the first run, which is the point of the genre.',
      'The campaign runs through connected sectors: orbital stations, neon cities, asteroid fields, enemy factories and, at the end, the Galactic Core. Each sector brings its own enemy movement and attack patterns, minibosses, and multi-phase galaxy bosses with destructible modules and weak points you have to find and hit rather than simply out-damage.',
      'Three modes cover different appetites. Normal is classic arcade progression. Hardcore raises enemy durability, projectile speed and formation complexity, and gives bosses extra attack patterns with fewer openings — it assumes you already know the fight. Endless drops the campaign entirely and just asks how long you last. Runs can be paused, saved and continued, so the campaign survives being put down mid-sector.',
    ],
    category: 'Games · Arcade Shooter',
    categoryId: 'action-arcade',
    schemaCategory: 'GameApplication',
    playStoreUrl:
      'https://play.google.com/store/apps/details?id=com.reigncreative.spacegalaxyattackhardcore',
    packageId: 'com.reigncreative.spacegalaxyattackhardcore',
    icon: '/icons/space-galaxy-attack-hardcore.webp',
    iconSmall: '/icons/space-galaxy-attack-hardcore-sm.webp',
    accent: 'from-crimson-600 to-ink-900',
    playCategory: 'GAME_ACTION',
    contentRating: 'Everyone',
    containsAds: true,
    inAppPurchases: false,
    free: true,
    lastVerified: '2026-09-15',
    features: [
      {
        title: 'Three difficulty modes',
        body: 'Normal for classic arcade progression, Hardcore for tougher enemies and tighter boss openings, and Endless for chasing a score.',
      },
      {
        title: 'Multiple ships and loadouts',
        body: 'Each ship has its own strengths, with different primary weapons, alternate attacks, shields and ultimate abilities to build around.',
      },
      {
        title: 'Deep upgrade tree',
        body: 'Spend collected gold on damage, firing speed, piercing, shields, hull durability, movement handling, cooldowns and ultimate charge.',
      },
      {
        title: 'Bosses with weak points',
        body: 'Minibosses and multi-phase galaxy bosses carry destructible modules, so learning where to aim matters more than raw firepower.',
      },
      {
        title: 'A connected campaign',
        body: 'Sectors run from orbital stations and neon cities through asteroid fields and enemy factories to the Galactic Core, each with new hazards.',
      },
    ],
    audience: [
      'Shoot ’em up players who want a real difficulty ceiling',
      'Anyone who likes anime and manga-styled sci-fi art',
      'Players who prefer short runs with long-term upgrade progress',
      'Bullet-hell fans looking for something they can play one-handed',
    ],
    howItWorks: [
      {
        title: 'Pick a ship',
        body: 'Choose a spacecraft and the primary weapon, alternate attack, shield and ultimate that suit how you like to fly.',
      },
      {
        title: 'Clear the sector',
        body: 'Move through enemy formations, learn their patterns, and use the shield and ultimate at the moments that actually save a run.',
      },
      {
        title: 'Upgrade between missions',
        body: 'Spend the gold you collected on damage, defence, movement or ability upgrades, depending on what killed you last time.',
      },
      {
        title: 'Raise the difficulty',
        body: 'Move to Hardcore once the patterns are familiar, or switch to Endless and see how long you can hold out.',
      },
    ],
    faqs: [
      {
        question: 'Is Space Galaxy Attack Hardcore free?',
        answer:
          'Yes, it is free to download on Google Play and supported by ads.',
      },
      {
        question: 'How is this different from Space Galaxy Attack Arcade?',
        answer:
          'They are separate games. This one is built around a harder difficulty curve: Hardcore mode increases enemy durability, projectile speed and formation complexity, and bosses gain extra attack patterns with fewer openings.',
      },
      {
        question: 'Can I stop mid-campaign?',
        answer:
          'Yes. The campaign can be paused, saved and continued, so you can leave a sector part-finished and come back to it.',
      },
      {
        question: 'What does Endless mode do?',
        answer:
          'It drops the campaign structure and keeps sending waves, so the only goal is surviving as long as possible and pushing your score.',
      },
      {
        question: 'Do upgrades carry between runs?',
        answer:
          'Yes. Gold collected in missions is spent on permanent ship upgrades, so a failed run still moves your fleet forward.',
      },
    ],
    metaTitle: 'Space Galaxy Attack Hardcore for Android',
    metaDescription:
      'An anime-styled vertical space shooter with ship upgrades, multi-phase bosses, and Normal, Hardcore and Endless modes. Free on Google Play.',
  },
  {
    slug: 'jellyfish-arena-survivor-io',
    name: 'Jellyfish Arena Survivor io',
    tagline: 'Start as the smallest thing in the water and try to finish the run as the biggest.',
    cardDescription:
      'An eat-and-grow io arena with up to 100 AI rivals, snake-style movement, a live top-ten leaderboard and unlockable skins.',
    longDescription: [
      'Jellyfish Arena Survivor io is an eat-and-grow arena game with the shape of an io title and the movement of a snake game. You start small, collect glowing food to grow longer and stronger, and try to stay clear of everything currently bigger than you. The rules explain themselves in about ten seconds, which is what makes the runs repeatable.',
      'Each run fills the arena with up to 100 AI-controlled rivals that chase food, attack smaller jellyfish and compete for the top spot. It plays like a multiplayer arena but it is a solo experience — the opposition is the game, not other people, so a run starts the moment you tap and never waits on a lobby.',
      'A live leaderboard tracks the ten largest rivals as you grow, and the number-one position carries a crown. A minimap helps you find food, avoid the giants and keep an eye on the current leader. Pearls earned from runs unlock jellyfish skins, so a session that ends badly still adds to a collection.',
    ],
    category: 'Games · io Arena',
    categoryId: 'action-arcade',
    schemaCategory: 'GameApplication',
    playStoreUrl: 'https://play.google.com/store/apps/details?id=com.reigncreative.jellyfishio',
    packageId: 'com.reigncreative.jellyfishio',
    icon: '/icons/jellyfish-arena-survivor-io.webp',
    iconSmall: '/icons/jellyfish-arena-survivor-io-sm.webp',
    accent: 'from-gold-500 to-crimson-500',
    playCategory: 'GAME_ACTION',
    contentRating: 'Everyone',
    containsAds: true,
    inAppPurchases: true,
    free: true,
    lastVerified: '2026-09-15',
    features: [
      {
        title: 'Up to 100 rivals per run',
        body: 'The arena fills with AI opponents that hunt food and each other, so the field thins and refills while you are still growing.',
      },
      {
        title: 'Snake-style movement',
        body: 'One-finger steering with momentum, which makes cutting off a larger rival — or escaping one — a matter of the line you take.',
      },
      {
        title: 'Live top-ten leaderboard',
        body: 'The ten largest jellyfish are tracked as you play, and reaching first place puts a crown on you for as long as you hold it.',
      },
      {
        title: 'Minimap navigation',
        body: 'See where the food is, where the danger is, and where the current leader is sitting before you commit to a direction.',
      },
      {
        title: 'Pearls and skins',
        body: 'Every run earns pearls toward a collection of jellyfish skins you can pick from before entering the arena.',
      },
    ],
    audience: [
      'io game players who want a run that starts instantly',
      'Anyone who likes eat-and-grow or snake-style arcade games',
      'Players looking for a five-minute game with a leaderboard',
      'People who want arena competition without real-time multiplayer',
    ],
    howItWorks: [
      {
        title: 'Enter the arena',
        body: 'Pick a skin and drop into an ocean arena that already has rivals in it, all of them hunting the same food you are.',
      },
      {
        title: 'Eat and grow',
        body: 'Collect glowing food to grow longer, and use your size to pressure smaller jellyfish while staying away from bigger ones.',
      },
      {
        title: 'Watch the board',
        body: 'Track the top ten and the minimap to decide whether to hunt the leader or keep feeding somewhere quieter.',
      },
      {
        title: 'Spend the pearls',
        body: 'Cash in what you earned for new skins, then start another run with a different look.',
      },
    ],
    faqs: [
      {
        question: 'Is Jellyfish Arena Survivor io free?',
        answer:
          'Yes, it is free to download on Google Play. It is supported by ads, and Google Play lists in-app purchases.',
      },
      {
        question: 'Am I playing against real people?',
        answer:
          'No. The rivals are AI-controlled, so it has the feel of a multiplayer arena while staying a solo experience that starts immediately.',
      },
      {
        question: 'How many rivals are in a run?',
        answer:
          'Up to 100 aggressive rivals in a standard run, and up to 200 with Premium.',
      },
      {
        question: 'How do I unlock skins?',
        answer:
          'Playing runs earns pearls, and pearls unlock jellyfish skins you can choose between before entering the arena.',
      },
      {
        question: 'What is the crown for?',
        answer:
          'It marks whoever currently holds first place on the live leaderboard. Hold the top spot and it is yours until something bigger takes it.',
      },
    ],
    metaTitle: 'Jellyfish Arena Survivor io for Android',
    metaDescription:
      'Eat, grow and survive against up to 100 AI rivals in a jellyfish io arena with snake-style movement, a live leaderboard and unlockable skins.',
  },
  {
    slug: 'regal-tower-defense',
    name: 'Regal Tower Defense: TD Game',
    tagline: 'Fifty levels of lane defence where placement, not raw damage, decides the wave.',
    cardDescription:
      'Place and upgrade attacking towers and support auras across 50 levels and 10 worlds, and build your own extra tower positions.',
    longDescription: [
      'Regal Tower Defense is a tower defence campaign built around placement rather than volume. Arrow, Cannon, Frost, Flame, Lightning, Siege and Chaos towers each answer a different problem — armour, speed, resistance, crowding — and the levels are designed so that a wave you cannot beat usually means the wrong tower in the right place, or the right tower in the wrong one.',
      'Aura Towers are the layer on top. Instead of attacking, they raise the damage, attack speed, range or elemental power of everything nearby, which turns a chokepoint into a kill zone and makes the shape of your layout matter as much as its contents. You can also buy Build Pads and place them yourself on valid terrain away from paths, towers, auras and the castle, so the map is partly something you design.',
      'The campaign runs 50 levels across 10 worlds — Royal Meadow, Stone Pass, Forest Bend, Frozen Crossing, Volcanic Gate, Haunted Marsh, Desert Citadel, Crystal Caverns, Celestial Gardens and the Chaos Realm — with goblins, brutes, wolves, trolls, drakes, golems, armoured units, flying units, elites and world bosses arriving in combinations that shift as you go. Coins, gems, XP, stars, achievements, a Tower Collection and an enemy Encyclopedia give you something to chase beyond the next level.',
    ],
    category: 'Games · Tower Defense',
    categoryId: 'action-arcade',
    schemaCategory: 'GameApplication',
    playStoreUrl:
      'https://play.google.com/store/apps/details?id=com.reigncreative.regaltowerdefense',
    packageId: 'com.reigncreative.regaltowerdefense',
    icon: '/icons/regal-tower-defense.webp',
    iconSmall: '/icons/regal-tower-defense-sm.webp',
    accent: 'from-gold-500 to-gold-700',
    playCategory: 'GAME_STRATEGY',
    contentRating: 'Everyone',
    containsAds: true,
    inAppPurchases: true,
    free: true,
    lastVerified: '2026-09-15',
    features: [
      {
        title: '50 levels, 10 worlds',
        body: 'From Royal Meadow to the Chaos Realm, each world changes the path shapes, hazards and enemy mix you are planning against.',
      },
      {
        title: 'Seven attacking tower types',
        body: 'Arrow, Cannon, Frost, Flame, Lightning, Siege and Chaos towers cover splash, slowing, burn, chain damage and long-range fire.',
      },
      {
        title: 'Aura Towers',
        body: 'Support towers that boost the damage, attack speed, range or elemental power of neighbours, so layout shape becomes a real lever.',
      },
      {
        title: 'Build your own positions',
        body: 'Purchase Build Pads and place them on valid terrain away from paths, towers, auras and the castle to create the angles you want.',
      },
      {
        title: 'Camera you can actually use',
        body: 'Pinch to zoom, pan, save camera presets or follow the lead enemy, and the view stays where you left it between waves.',
      },
    ],
    audience: [
      'Tower defence players who care about layout, not just upgrades',
      'Anyone who wants a campaign with a real difficulty curve',
      'Strategy fans looking for something playable in short sessions',
      'Players who like collecting towers and filling out an enemy index',
    ],
    howItWorks: [
      {
        title: 'Read the map',
        body: 'Look at the path, find the bends and long lanes, and decide where damage will actually have time to land.',
      },
      {
        title: 'Place and upgrade',
        body: 'Build attacking towers for the enemy types coming, then upgrade the positions that are carrying the level.',
      },
      {
        title: 'Add support',
        body: 'Drop Aura Towers next to your strongest cluster, and buy Build Pads when you need a position the map does not give you.',
      },
      {
        title: 'Adapt to the boss',
        body: 'Later waves mix armoured, flying and elite units before a world boss, so expect to rearrange rather than just add more.',
      },
    ],
    faqs: [
      {
        question: 'Is Regal Tower Defense free?',
        answer:
          'Yes, it is free to download on Google Play. It is supported by ads, and Google Play lists in-app purchases.',
      },
      {
        question: 'How many levels are there?',
        answer:
          'Fifty campaign levels spread across ten worlds, each world introducing new enemies, hazards and path layouts.',
      },
      {
        question: 'What do Aura Towers do?',
        answer:
          'They do not attack. They increase the damage, attack speed, attack range or elemental power of the towers around them, which rewards building in clusters.',
      },
      {
        question: 'Can I create new tower positions?',
        answer:
          'Yes. Build Pads can be purchased and placed on valid terrain away from paths, existing towers, auras and the castle, so you can open up angles the map did not offer.',
      },
      {
        question: 'Is there anything to do besides the campaign?',
        answer:
          'Coins, gems, XP, stars, achievements and milestone rewards run alongside it, plus a Tower Collection to expand and an Encyclopedia that fills in as you meet new enemies.',
      },
    ],
    metaTitle: 'Regal Tower Defense: TD Game for Android',
    metaDescription:
      'A 50-level tower defence campaign across 10 worlds with seven tower types, support auras, player-placed build pads and world bosses. Free on Google Play.',
  },
];
