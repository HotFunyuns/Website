import type { AppInfo } from '../types';

export const actionArcadeApps: AppInfo[] = [
  {
    slug: 'space-shooter-classic-arcade',
    name: 'Space Galaxy Attack Arcade',
    formerNames: ['Space Shooter - Galaxy Arcade'],
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
    lastVerified: '2026-10-24',
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
    limitations: [
      'It is run-based: upgrades carry over, but each run starts from the first wave.',
      'Ads support the free version, and in-app purchases are optional.',
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
    lastVerified: '2026-10-24',
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
    limitations: [
      'You control movement only; weapons fire automatically, so there is no manual aiming.',
      'Ads support the free version, and in-app purchases are optional.',
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
    inAppPurchases: true,
    free: true,
    lastVerified: '2026-10-24',
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
          'Yes, it is free to download on Google Play. It is supported by ads, and Google Play lists in-app purchases for it.',
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
    limitations: [
      'Hardcore mode raises enemy durability and projectile speed; it is built for a steep difficulty curve.',
      'Ads support the free version, and Google Play lists in-app purchases.',
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
    lastVerified: '2026-10-24',
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
    limitations: [
      'The rivals are AI-controlled, not real players.',
      'A standard run has up to 100 rivals; up to 200 needs Premium.',
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
    lastVerified: '2026-10-24',
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
    limitations: [
      'It is a single-player campaign; no multiplayer is described.',
      'Ads support the free version, and Google Play lists in-app purchases.',
    ],
    metaTitle: 'Regal Tower Defense: TD Game for Android',
    metaDescription:
      'A 50-level tower defence campaign across 10 worlds with seven tower types, support auras, player-placed build pads and world bosses. Free on Google Play.',
  },
  {
    slug: 'hero-td-idle-tower-defense',
    name: 'Hero TD Idle Tower Defense',
    tagline: 'Defend your castle with towers and a hero, spend upgrades with a plan, and push through tougher waves.',
    cardDescription:
      'An idle tower defense game with a hero at the centre: build towers, choose upgrades, use spells and abilities, and hold the castle against escalating waves.',
    longDescription: [
      'Hero TD Idle Tower Defense is a tower defense game where a hero fights alongside your towers. Enemies come in waves, the waves get harder, and the question each run asks is how to turn the power you have into a better plan: which towers to strengthen, which upgrades to buy, and where the hero can help most.',
      'The listing’s advice is to spend with a purpose rather than without a strategy, and to read the fight — watch how each tower performs against the enemies you face, then decide what matters next. A hard battle is framed as information: review your upgrades, rethink the setup and come back. The store screenshots show the pieces involved: hero skills, spells such as fireballs, ultimate abilities, combat items and loadouts, castle wall upgrades and emergency repairs.',
      'Around the battles sit several modes and a roster. The screenshots show six modes, including a campaign, endless defense and daily and weekly challenges, a roster of heroes to discover, an armoury of weapons, armour, helmets, boots, rings and relics, and daily, weekly and lifetime missions.',
    ],
    category: 'Games · Tower Defense',
    categoryId: 'action-arcade',
    schemaCategory: 'GameApplication',
    playStoreUrl: 'https://play.google.com/store/apps/details?id=com.reigncreative.herotdidletowerdefense',
    packageId: 'com.reigncreative.herotdidletowerdefense',
    icon: '/icons/hero-td-idle-tower-defense.webp',
    iconSmall: '/icons/hero-td-idle-tower-defense-sm.webp',
    accent: 'from-gold-500 to-crimson-500',
    playCategory: 'GAME_STRATEGY',
    contentRating: 'Everyone',
    containsAds: true,
    inAppPurchases: true,
    free: true,
    lastVerified: '2026-10-24',
    features: [
      {
        title: 'A hero beside the towers',
        body: 'Your hero fights in the defense, so placement and upgrades have to support both.',
      },
      {
        title: 'Upgrades with a purpose',
        body: 'Damage, attack speed, critical hits, range and castle defense, chosen for the enemies in front of you.',
      },
      {
        title: 'Spells and ultimates',
        body: 'Fireballs, hero skills and ultimate abilities for the moments a wave gets through.',
      },
      {
        title: 'Several modes',
        body: 'A campaign, endless defense, and daily and weekly challenges, according to the store screenshots.',
      },
      {
        title: 'Heroes and an armoury',
        body: 'A roster of heroes plus weapons, armour, helmets, boots, rings and relics.',
      },
    ],
    audience: [
      'Tower defense fans who like a controllable hero in the mix',
      'Players who enjoy planning upgrades between attempts',
      'Anyone who wants missions and challenges on top of a campaign',
      'People who like games where a loss shows them what to change',
    ],
    howItWorks: [
      {
        title: 'Defend the castle',
        body: 'Build towers and send your hero against the incoming wave.',
      },
      {
        title: 'Read what happened',
        body: 'See which towers held and where enemies broke through.',
      },
      {
        title: 'Upgrade with a plan',
        body: 'Spend on the towers, skills and gear that answer the problem.',
      },
      {
        title: 'Push further',
        body: 'Take on tougher waves, other modes and missions with a stronger setup.',
      },
    ],
    faqs: [
      {
        question: 'Is Hero TD Idle Tower Defense free?',
        answer:
          'Yes. It is free to download on Google Play. It is supported by ads, and Google Play lists in-app purchases.',
      },
      {
        question: 'What makes it different from a standard tower defense game?',
        answer:
          'The hero. A hero fights alongside the towers, with skills, spells and an ultimate, so your plan has to account for one mobile unit as well as fixed defences.',
      },
      {
        question: 'What does idle mean here?',
        answer:
          'The listing calls it an idle tower defense game built around upgrades that add up over time; it emphasises planning upgrades between battles rather than constant tapping.',
      },
      {
        question: 'How should I spend upgrades?',
        answer:
          'The listing’s own advice is to match upgrades to the enemies you face and avoid spending without a strategy — check which towers struggled before deciding.',
      },
      {
        question: 'How is it different from Regal Tower Defense?',
        answer:
          'Regal Tower Defense is a lane-defence campaign built around tower types and placement. Hero TD adds a hero, spells and gear, with several modes and missions around the battles.',
      },
    ],
    limitations: [
      'The listing does not describe multiplayer or co-op.',
      'Progress leans on upgrades, so later waves are much harder without them.',
      'Ads support the free version, and Google Play lists in-app purchases.',
    ],
    screenshots: [
      {
        src: '/screenshots/hero-td-idle-tower-defense/1.webp',
        width: 360,
        height: 640,
        alt: 'Hero TD Idle Tower Defense store image showing a battlefield map with a wave counter, above tiles for 50-wave battles, hero skills, powerful spells and ultimate abilities.',
      },
      {
        src: '/screenshots/hero-td-idle-tower-defense/2.webp',
        width: 360,
        height: 640,
        alt: 'Hero TD Idle Tower Defense store image of the mode select screen, headed Six modes, endless strategy, with tiles for campaign, endless defense and daily and weekly challenges.',
      },
      {
        src: '/screenshots/hero-td-idle-tower-defense/3.webp',
        width: 360,
        height: 640,
        alt: 'Hero TD Idle Tower Defense store image of the hero roster grid, headed Build your hero roster.',
      },
    ],
    metaTitle: 'Hero TD Idle Tower Defense for Android',
    metaDescription:
      'Defend your castle with towers and a hero: choose upgrades, use spells and ultimates, and push through tougher waves and modes. Free on Google Play.',
  },
  {
    slug: 'world-war-gunship-attack',
    name: 'World War Gunship Attack',
    tagline: 'Fly a gunship through mission-based air combat: dodge, aim, use special attacks and upgrade between sorties.',
    cardDescription:
      'An arcade aerial shooter: take a gunship through combat missions and boss fights, switch attacks, trigger ultimates and upgrade your aircraft.',
    longDescription: [
      'World War Gunship Attack is a fast arcade shooter set in a world-war-styled air war. You fly a gunship into battle zones, engage enemy aircraft and armoured targets, dodge incoming fire and strike before the enemy overwhelms you. The controls are easy to understand; mastering movement, aiming, attack timing and enemy patterns is where the practice goes.',
      'Combat gives you more than one button to press. You switch between attack options, use alternative attacks at the right moment and unleash ultimate abilities when the screen gets crowded, timing strikes for elite enemies and bosses. Missions bring new enemy formations and tougher objectives as you progress.',
      'Between missions you upgrade the aircraft to push further. The store screenshots show a hangar for weapon, armour and performance upgrades, a mission select across connected sectors, a choice of aircraft, and Normal, Hardcore and Prestige difficulty.',
    ],
    category: 'Games · Arcade Shooter',
    categoryId: 'action-arcade',
    schemaCategory: 'GameApplication',
    playStoreUrl: 'https://play.google.com/store/apps/details?id=com.reigncreative.worldwargunshipattack',
    packageId: 'com.reigncreative.worldwargunshipattack',
    icon: '/icons/world-war-gunship-attack.webp',
    iconSmall: '/icons/world-war-gunship-attack-sm.webp',
    accent: 'from-crimson-600 to-ink-900',
    playCategory: 'GAME_ACTION',
    contentRating: 'Everyone',
    containsAds: true,
    inAppPurchases: true,
    free: true,
    lastVerified: '2026-10-24',
    features: [
      {
        title: 'Mission-based air combat',
        body: 'Battle zones with enemy formations, armoured targets, elite enemies and bosses.',
      },
      {
        title: 'Switchable attacks',
        body: 'Change between attack options and use alternative attacks when the moment calls for it.',
      },
      {
        title: 'Ultimate abilities',
        body: 'Powerful special attacks for when the battlefield gets crowded.',
      },
      {
        title: 'Hangar upgrades',
        body: 'Improve weapons, armour and performance between missions.',
      },
      {
        title: 'Escalating difficulty',
        body: 'Tougher opposition as missions progress, with Normal, Hardcore and Prestige settings shown in the store images.',
      },
    ],
    audience: [
      'Arcade shooter fans who like learning enemy patterns',
      'Players who enjoy upgrading a craft between short missions',
      'Anyone who likes boss fights with a special-attack meter',
      'People who want simple controls with room to improve',
    ],
    howItWorks: [
      {
        title: 'Choose a mission',
        body: 'Pick a sector and an aircraft.',
      },
      {
        title: 'Fly and fight',
        body: 'Dodge, aim and switch attacks against enemy formations.',
      },
      {
        title: 'Beat the boss',
        body: 'Time your ultimate for elite enemies and bosses.',
      },
      {
        title: 'Upgrade and return',
        body: 'Spend on weapons, armour and performance in the hangar.',
      },
    ],
    faqs: [
      {
        question: 'Is World War Gunship Attack free?',
        answer:
          'Yes. It is free to download on Google Play. It is supported by ads, and Google Play lists in-app purchases.',
      },
      {
        question: 'Is it a flight simulator?',
        answer:
          'No. It is an arcade shooter with accessible controls, built around dodging, aiming and timing attacks rather than realistic flight.',
      },
      {
        question: 'Is it historically accurate?',
        answer:
          'It uses a world-war setting and styling for an arcade game. It is entertainment, not a historical simulation.',
      },
      {
        question: 'What can I upgrade?',
        answer:
          'Your aircraft’s combat power. The store screenshots show hangar upgrades for weapons, armour and performance.',
      },
      {
        question: 'Are there boss fights?',
        answer:
          'Yes. Missions include elite opponents and major boss battles that reward well-timed special attacks.',
      },
    ],
    limitations: [
      'It is not a flight simulator or a historical recreation.',
      'The listing describes single-player missions; no multiplayer is mentioned.',
      'Ads support the free version, and Google Play lists in-app purchases.',
    ],
    screenshots: [
      {
        src: '/screenshots/world-war-gunship-attack/1.webp',
        width: 360,
        height: 640,
        alt: 'World War Gunship Attack store image of an overhead air-combat mission with on-screen controls, headed Rule the skies.',
      },
      {
        src: '/screenshots/world-war-gunship-attack/2.webp',
        width: 360,
        height: 640,
        alt: 'World War Gunship Attack store image of the hangar upgrades screen, headed Upgrade your firepower, covering weapons, armour and performance.',
      },
      {
        src: '/screenshots/world-war-gunship-attack/3.webp',
        width: 360,
        height: 640,
        alt: 'World War Gunship Attack store image of the mission select screen, headed Choose your battlefield, with Normal, Hardcore and Prestige difficulty.',
      },
    ],
    metaTitle: 'World War Gunship Attack for Android',
    metaDescription:
      'An arcade aerial shooter: fly a gunship through combat missions and boss fights, switch attacks, trigger ultimates and upgrade between sorties.',
  },
];
