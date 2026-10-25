export type CategoryId =
  | 'sports-gm'
  | 'action-arcade'
  | 'anime-creative'
  | 'language-learning'
  | 'education-brain'
  | 'health-nutrition'
  | 'video-utility';

export type FilterId = 'all' | CategoryId;

export interface AppFeature {
  title: string;
  body: string;
}

export interface AppFaq {
  question: string;
  answer: string;
}

export interface AppStep {
  title: string;
  body: string;
}

/**
 * A screenshot from the app's own Google Play listing, self-hosted under
 * public/screenshots/<slug>/ (never hotlinked). Each one is checked by a person
 * or the catalog review before it is added: no real athletes' names, no team or
 * league branding and no third-party characters may be visible, because a
 * screenshot republishes whatever is on the screen.
 */
export interface AppScreenshot {
  src: string;
  width: number;
  height: number;
  /** What the screenshot shows, for someone who cannot see it. */
  alt: string;
}

/**
 * Fields under `verified` are copied from the app's live Google Play listing by
 * scripts/verify-play-listings.mjs. Nothing in this group may be hand-edited —
 * re-run the script instead, so the site can never drift from the store.
 */
export interface VerifiedPlayFacts {
  playCategory: string;
  contentRating: string;
  containsAds: boolean;
  inAppPurchases: boolean;
  free: boolean;
  lastVerified: string;
}

export interface AppInfo extends VerifiedPlayFacts {
  slug: string;
  name: string;
  /**
   * Earlier Google Play titles, most recent first. Only titles a committed
   * verification snapshot recorded on the live listing belong here — see
   * docs/app-inventory-2026-10.md — never a name the site used on its own or a
   * local project name that never shipped. Rendered as "Previously listed on
   * Google Play as …" and emitted as `alternateName`, so a reader or crawler who
   * knows the old title can tell it is the same app.
   */
  formerNames?: string[];
  tagline: string;
  cardDescription: string;
  longDescription: string[];
  /** Short human-readable label shown on cards and detail pages. */
  category: string;
  categoryId: CategoryId;
  schemaCategory:
    | 'GameApplication'
    | 'HealthApplication'
    | 'EducationalApplication'
    | 'MultimediaApplication'
    | 'LifestyleApplication'
    | 'UtilitiesApplication';
  playStoreUrl: string;
  packageId: string;
  icon: string;
  iconSmall: string;
  accent: string;
  featured?: boolean;
  features: AppFeature[];
  audience: string[];
  howItWorks: AppStep[];
  faqs: AppFaq[];
  /**
   * What the app does not do, or where its limits are — stated from the live
   * listing and the store's structured fields, never guessed. Rendered as
   * "Good to know before you install", so a reader can rule the app out as
   * easily as in.
   */
  limitations?: string[];
  /** Up to three listing screenshots; see AppScreenshot. */
  screenshots?: AppScreenshot[];
  metaTitle: string;
  metaDescription: string;
}

export interface CategoryChoice {
  /** What a reader wants to do, in their words. */
  need: string;
  /** The catalog apps that fit, by slug. */
  apps: string[];
}

export interface CategoryInfo {
  id: CategoryId;
  label: string;
  shortLabel: string;
  blurb: string;
  /** Original standing copy for the category landing page. */
  intro: string[];
  /**
   * Standing copy for the category's *reading list* at /blog/category/<id>/ —
   * what the articles cover and how to approach them. Deliberately not `intro`:
   * when both pages rendered the same copy the article list became a near-total
   * text subset of the app page. `intro` is about the apps; this is about the
   * reading.
   */
  readingIntro: string[];
  /**
   * "Which app fits what you want to do?" — the category page's own guidance,
   * by need rather than by title. Every slug must be an app in this category
   * (checked at module load in ./index.ts).
   */
  chooser: CategoryChoice[];
  metaTitle: string;
  metaDescription: string;
}

export const categories: CategoryInfo[] = [
  {
    id: 'sports-gm',
    label: 'Sports Career & GM Games',
    shortLabel: 'Sports & GM',
    blurb: 'Career sims, hands-on career games, draft boards and league sandboxes across eleven sports.',
    intro: [
      'Sports management games ask a different question than sports action games. Instead of "can you make the shot?", they ask "can you build the team that makes the shot?" — which turns a commute or a lunch break into a series of roster decisions, draft picks, and long-term bets.',
      'Reign Creative builds the genre four ways. Career sims follow one athlete and hand you the decisions at the moments that matter; the newer Pro League games put that athlete under your thumbs on the field, court or rink; draft and GM games build a roster and chase a perfect season; and two league sandboxes make you the commissioner of a whole league. Between them they cover basketball, American football, soccer, baseball, hockey, golf, tennis, rugby union, motorsport, boxing and cricket.',
    ],
    readingIntro: [
      'These articles cover the sports as much as the games: how drafts, salary caps and depth charts work, what the statistics actually measure, and where the rules of rugby, tennis, golf, hockey, cricket or mixed martial arts decide a result.',
      'Around them sit guides to the simulators themselves — what a career mode or a GM mode asks of you, and what the simulation assumes. The guides do not profile real athletes, and none of them predicts a real game.',
    ],
    chooser: [
      {
        need: 'Live one athlete’s career and make the calls that matter',
        apps: [
          'pro-basketball-my-career-sim',
          'football-career-sim',
          'soccer-career-sim-xi',
          'baseball-career-sim',
          'hockey-career-sim',
          'golf-career-simulator',
          'tennis-career-sim',
          'rugby-career-sim',
          'car-racing-pro-career',
          'cricket-career-simulator',
        ],
      },
      {
        need: 'Control your player yourself on the court, field or rink',
        apps: [
          'basketball-career-pro-league',
          'football-career-pro-league',
          'football-career-soccer-league',
          'hockey-career-pro-league',
          'boxing-prize-fighter-career',
        ],
      },
      {
        need: 'Draft a roster and chase an unbeaten season',
        apps: [
          'pro-basketball-draft-gm-mode',
          'football-draft-gm-mode',
          'baseball-draft-gm-team',
          'soccer-draft-gm-xi',
          'hockey-draft-gm-manager',
          'mma-boxing-fight-draft',
          'rugby-draft-pro-league',
        ],
      },
      {
        need: 'Run a whole league as commissioner',
        apps: ['basketball-league-sandbox', 'football-league-commissioner'],
      },
    ],
    metaTitle: 'Sports Career & GM Games for Android',
    metaDescription:
      'Career sims, hands-on career games, draft and GM games and league sandboxes across eleven sports, from basketball to cricket. Free on Google Play.',
  },
  {
    id: 'action-arcade',
    label: 'Action & Arcade Games',
    shortLabel: 'Action & Arcade',
    blurb: 'Fast sessions, readable rules, and difficulty that climbs the longer you last.',
    intro: [
      'Arcade games live or die on the first thirty seconds. The controls have to explain themselves, the failure has to feel like your fault, and the next run has to start quickly enough that you take it.',
      'These titles are built around short, repeatable runs that escalate — the kind of game you open in a waiting room and finish without needing to remember where you left off. Three vertical shooters, a zombie survival run and an io arena sit alongside two tower defence games: a lane-defence campaign, and an idle defence with a hero who fights beside the towers.',
    ],
    readingIntro: [
      'Short sessions are the point of these games, so most of the articles are practical: reading enemy fire in a shooter, countering armoured and flying waves in tower defence, what bots change in an io arena, and what "offline" really means for an Android game.',
      'A few step back to definitions — what makes a roguelike, how bullet hell differs from a classic shoot-em-up — because the genre labels on a store page rarely explain themselves.',
    ],
    chooser: [
      { need: 'A vertical shooter you can learn in seconds', apps: ['space-shooter-classic-arcade'] },
      { need: 'A harder shooter with a campaign and ship loadouts', apps: ['space-galaxy-attack-hardcore'] },
      { need: 'A gunship shooter with missions and hangar upgrades', apps: ['world-war-gunship-attack'] },
      { need: 'Survive waves while your weapons fire on their own', apps: ['zombie-survival-last-survivor'] },
      { need: 'Grow bigger than a field of AI rivals', apps: ['jellyfish-arena-survivor-io'] },
      { need: 'Plan towers, auras and build pads across a campaign', apps: ['regal-tower-defense'] },
      { need: 'Tower defence with a hero, spells and idle upgrades', apps: ['hero-td-idle-tower-defense'] },
    ],
    metaTitle: 'Action & Arcade Games for Android',
    metaDescription:
      'Space shooters, a gunship shooter, zombie survival, an io arena and two tower defence games, all built for short escalating runs on Android.',
  },
  {
    id: 'anime-creative',
    label: 'Anime & Creative Games',
    shortLabel: 'Anime & Creative',
    blurb: 'Coloring, building, virtual pets, trivia, and virtual-coin slots games.',
    intro: [
      'Creative and casual games occupy a useful middle ground: more engaging than scrolling, less demanding than a game that expects a real time commitment.',
      'This category pairs relaxed digital coloring with anime knowledge and word puzzles, a cosy town builder, a block-building sandbox RPG and a dragon virtual-pet game — low-pressure formats you can pick up for two minutes or forty. Two social-casino slots games sit here too; both are played with virtual coins only, offer no real-money gambling, and describe an adult audience.',
    ],
    readingIntro: [
      'Coloring technique, anime knowledge and slot mechanics: how line art and flat colours work, how to fix a fill that leaks, how anime art styles and genres differ, and what the common slot-machine terms mean.',
      'The slots titles are played with virtual coins only, and the articles about them explain how social-casino games differ from real-money gambling rather than blurring the two.',
    ],
    chooser: [
      { need: 'Color anime line art at your own pace', apps: ['anime-coloring-book'] },
      { need: 'Test your anime knowledge and word skills', apps: ['anime-trivia-word-games'] },
      { need: 'Build a cosy town and look after its residents', apps: ['life-simulator-city-builder'] },
      { need: 'Craft, build and explore a block world', apps: ['block-world-rpg'] },
      { need: 'Hatch, raise and evolve virtual pets', apps: ['dragon-pet-evolve'] },
      {
        need: 'Spin slot machines with virtual coins (adults; no real money)',
        apps: ['anime-casino-slots', 'big-jackpot-casino-slots'],
      },
    ],
    metaTitle: 'Coloring, Building, Pets, Trivia & Slots Games',
    metaDescription:
      'Anime coloring, trivia, a cosy town builder, a block-building RPG, dragon virtual pets and virtual-coin slots for Android, from Reign Creative LLC.',
  },
  {
    id: 'language-learning',
    label: 'Language Learning',
    shortLabel: 'Languages',
    blurb: 'Beginner-first courses for languages most apps under-serve.',
    intro: [
      'Most language apps invest heavily in Spanish, French, and Japanese, and comparatively little in the languages millions of people actually need for family, travel, or work — Cantonese, Thai, Malay, Khmer, Marathi, Shanghainese.',
      'These apps target that gap. They start from a genuine beginner position: script and pronunciation first, then the vocabulary and phrases you would realistically use in a first conversation. Nine of the ten also run the other way, teaching English to speakers of the language.',
    ],
    readingIntro: [
      'Beginner-first guides to the languages our courses teach: how their scripts, tones and grammar work, which phrases to learn first, and study methods such as shadowing and spaced repetition that apply to any language.',
      'Where usage varies by region or register, the articles say so. None has been reviewed by a native speaker unless one is named on the article.',
    ],
    chooser: [
      { need: 'A Chinese variety other than Mandarin', apps: ['learn-cantonese', 'learn-shanghainese'] },
      { need: 'A Southeast Asian language with its own script', apps: ['learn-thai', 'learn-lao', 'learn-cambodian-khmer'] },
      { need: 'Start speaking quickly in the Latin alphabet', apps: ['learn-malay', 'learn-vietnamese', 'learn-italian'] },
      { need: 'Learn Devanagari or Cyrillic from the first letter', apps: ['learn-marathi', 'learn-russian'] },
    ],
    metaTitle: 'Language Learning Apps for Android',
    metaDescription:
      'Beginner courses for Cantonese, Thai, Malay, Russian, Khmer, Marathi, Shanghainese and more on Android. Free on Google Play.',
  },
  {
    id: 'education-brain',
    label: 'Education & Brain Games',
    shortLabel: 'Education',
    blurb: 'History, mathematics, brain training and investing basics, with progress you can see.',
    intro: [
      'Learning apps work best when they make progress legible. A timeline you can move through shows you how much ground you have covered; a drill or a unit test shows you a number that improves.',
      'Four subjects share this category: world history on an interactive timeline, brain training across memory, logic and mental arithmetic, a study companion for discrete mathematics, and a beginner’s trading simulator that teaches how markets work with virtual money only.',
    ],
    readingIntro: [
      'Several large subjects share this category. World history — dating systems and chronology, empires, major events and the people involved — written to keep what is documented apart from what historians interpret.',
      'Mental arithmetic, memory and reasoning sit beside them, with a plain account of what brain training and IQ tests can and cannot tell you, and newer guides cover discrete mathematics and the basics of how markets and orders work. With this many articles, the topic hubs below are the better way in.',
    ],
    chooser: [
      { need: 'Put world history in order and play out alternate histories', apps: ['world-history-timeline-sim'] },
      { need: 'Practise mental maths, memory and logic', apps: ['mental-math-memory-games'] },
      { need: 'Study logic, proofs, counting and graphs for a course', apps: ['discrete-math-study-quiz'] },
      { need: 'Learn how trading works without risking money', apps: ['learn-to-trade-stocks'] },
    ],
    metaTitle: 'Education & Brain Training Apps for Android',
    metaDescription:
      'World history, brain training, discrete mathematics and a beginner trading simulator for Android. Free on Google Play from Reign Creative LLC.',
  },
  {
    id: 'health-nutrition',
    label: 'Health & Nutrition',
    shortLabel: 'Health',
    blurb: 'Focused trackers, meal planning and a guided breathing break.',
    intro: [
      'Nutrition tracking usually fails for a mundane reason: logging takes too long, so people stop. A tracker that does one thing quickly beats a comprehensive one you abandon in week two.',
      'The trackers here each centre on a single number — daily protein, or net carbs — and are built so that logging a meal stays quick. Alongside them sit a recipe and meal planner for the other half of the problem, deciding what to cook before the week gets away from you, and a breathing app for a short guided pause. None of them is medical advice.',
    ],
    readingIntro: [
      'Nutrition tracking explained from the label up: what protein, net-carb and sugar figures mean, how to turn a macro target into grams you can log, and why food databases disagree. Alongside them are practical guides to meal planning, pantry lists and batch cooking.',
      'These articles are general information, not medical advice. They cite public-health and government sources, listed at the end of each one.',
    ],
    chooser: [
      { need: 'See how much protein you actually eat', apps: ['protein-diet-tracker'] },
      { need: 'Track net carbs on a keto diet', apps: ['keto-diet-tracker'] },
      { need: 'Plan the week’s meals and cook from what you have', apps: ['easy-recipes-meal-planner'] },
      { need: 'Take a short guided breathing break', apps: ['kawaii-breathe-relax'] },
    ],
    metaTitle: 'Nutrition, Meal Planning & Breathing Apps',
    metaDescription:
      'Protein and keto macro trackers, a recipe and weekly meal planner, and a guided breathing app for Android. Tracking tools, not medical advice.',
  },
  {
    id: 'video-utility',
    label: 'Video & Utility Apps',
    shortLabel: 'Utilities',
    blurb: 'Practical Android tools that stay out of your way.',
    intro: [
      'Utility apps are judged almost entirely on whether they do the job without friction — formats that just play, a camera match you can correct yourself, controls where you expect them, and no detour through a setup wizard.',
      'This category covers Reign Creative’s practical Android tools: a local video player, a trading-card scanner for identifying cards, checking market-value estimates and measuring centring, an all-in-one PDF toolkit, an app that turns recorded speech into text, and a notes, journal and planner app.',
    ],
    readingIntro: [
      'Practical Android know-how: what is inside an MP4, MKV or MOV file, why a video will not play or its subtitles will not show, which codecs matter, and how picture-in-picture and app permissions work.',
      'For collectors, the trading-card articles cover condition grading, centring and what grading services charge.',
    ],
    chooser: [
      { need: 'Play video files stored on your phone', apps: ['regal-video-player'] },
      { need: 'Merge, sign, scan or shrink a PDF', apps: ['pdf-all-in-one-tools'] },
      { need: 'Turn a recording into text you can search', apps: ['transcribe-audio-to-text'] },
      { need: 'Keep notes, a journal and a planner in one place', apps: ['kawaii-cute-notes-journal'] },
      { need: 'Identify trading cards and check centring and value estimates', apps: ['tcg-card-grading-scanner'] },
    ],
    metaTitle: 'Video Player & Utility Apps for Android',
    metaDescription:
      'Practical Android utilities: a video player, a trading-card scanner, PDF tools, audio transcription and a notes journal. Free on Google Play.',
  },
];

export const companyInfo = {
  name: 'Reign Creative LLC',
  tagline: 'Premium Apps. Built to Be Played, Learned From, and Loved.',
  description:
    'Reign Creative LLC is an independent mobile app studio building memorable games, learning experiences, fitness trackers, and lifestyle apps for Android.',
  supportEmail: 'ReignCreativeSupport@gmail.com',
  domain: 'reigncreativellc.com',
  siteUrl: 'https://reigncreativellc.com',
  founded: '2024',
  developerPageUrl: 'https://play.google.com/store/apps/developer?id=Reign+Collective+Apps',
  developerName: 'Reign Collective Apps',
};
