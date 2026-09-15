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
  metaTitle: string;
  metaDescription: string;
}

export interface CategoryInfo {
  id: CategoryId;
  label: string;
  shortLabel: string;
  blurb: string;
  /** Original standing copy for the category landing page. */
  intro: string[];
  metaTitle: string;
  metaDescription: string;
}

export const categories: CategoryInfo[] = [
  {
    id: 'sports-gm',
    label: 'Sports Career & GM Games',
    shortLabel: 'Sports & GM',
    blurb: 'Draft boards, franchise decisions, and full career arcs across nine sports.',
    intro: [
      'Sports management games ask a different question than sports action games. Instead of "can you make the shot?", they ask "can you build the team that makes the shot?" — which turns a commute or a lunch break into a series of roster decisions, draft picks, and long-term bets.',
      'Reign Creative builds this genre for Android with a consistent design goal: give you the parts of being a general manager that are genuinely fun — the draft board, the depth chart, the trade call — without demanding hours per session or a spreadsheet on the side. The range runs from basketball and football through baseball, soccer, hockey, golf and combat sports to tennis and rugby union.',
    ],
    metaTitle: 'Sports Career & GM Games for Android',
    metaDescription:
      'Draft simulators, franchise mode, and career sims for basketball, football, baseball, soccer, hockey, golf, tennis, rugby and combat sports.',
  },
  {
    id: 'action-arcade',
    label: 'Action & Arcade Games',
    shortLabel: 'Action & Arcade',
    blurb: 'Fast sessions, readable rules, and difficulty that climbs the longer you last.',
    intro: [
      'Arcade games live or die on the first thirty seconds. The controls have to explain themselves, the failure has to feel like your fault, and the next run has to start quickly enough that you take it.',
      'These titles are built around short, repeatable runs that escalate — the kind of game you open in a waiting room and finish without needing to remember where you left off. Alongside the shooters, the survival runs and the io arena sits a lane-defence campaign, for when you want the same session length with a plan behind it.',
    ],
    metaTitle: 'Action & Arcade Games for Android',
    metaDescription:
      'Space shooters, zombie survival, an io arena and a tower defence campaign, all built for short escalating runs on Android. Free on Google Play.',
  },
  {
    id: 'anime-creative',
    label: 'Anime & Creative Games',
    shortLabel: 'Anime & Creative',
    blurb: 'Coloring, trivia, word play, and original anime slots.',
    intro: [
      'Creative and trivia games occupy a useful middle ground: more engaging than scrolling, less demanding than a game that expects a real time commitment.',
      'This category pairs relaxed digital coloring with anime knowledge, word puzzles, and an original anime slot collection — low-pressure formats you can pick up for two minutes or forty. The slots title is played with virtual coins only and offers no real-money gambling.',
    ],
    metaTitle: 'Anime Coloring, Trivia & Slots Games for Android',
    metaDescription:
      'Anime coloring, trivia, word games, and original anime slot machines for Android. Free on Google Play from Reign Creative LLC.',
  },
  {
    id: 'language-learning',
    label: 'Language Learning',
    shortLabel: 'Languages',
    blurb: 'Beginner-first courses for languages most apps under-serve.',
    intro: [
      'Most language apps invest heavily in Spanish, French, and Japanese, and comparatively little in the languages millions of people actually need for family, travel, or work — Cantonese, Thai, Malay, Khmer, Marathi, Shanghainese.',
      'These apps target that gap. They start from a genuine beginner position: script and pronunciation first, then the vocabulary and phrases you would realistically use in a first conversation.',
    ],
    metaTitle: 'Language Learning Apps for Android',
    metaDescription:
      'Beginner courses for Cantonese, Thai, Malay, Russian, Khmer, Marathi, Shanghainese and more on Android. Free on Google Play.',
  },
  {
    id: 'education-brain',
    label: 'Education & Brain Games',
    shortLabel: 'Education',
    blurb: 'History and mental arithmetic, structured so progress is visible.',
    intro: [
      'Learning apps work best when they make progress legible. A timeline you can move through shows you how much ground you have covered; a mental-math drill shows you a number that improves.',
      'These titles turn two broad subjects — world history and everyday arithmetic — into sessions short enough to actually repeat daily.',
    ],
    metaTitle: 'Education & Brain Training Apps for Android',
    metaDescription:
      'Interactive world history and mental math training for Android. Free on Google Play from Reign Creative LLC.',
  },
  {
    id: 'health-nutrition',
    label: 'Health & Nutrition',
    shortLabel: 'Health',
    blurb: 'Focused trackers and meal planning that make daily consistency stick.',
    intro: [
      'Nutrition tracking usually fails for a mundane reason: logging takes too long, so people stop. A tracker that does one thing quickly beats a comprehensive one you abandon in week two.',
      'The trackers here each focus on a single number — daily protein, or net carbs — and optimise for the speed of entry rather than the breadth of the database. Alongside them sits a recipe and meal planner for the other half of the problem: deciding what to cook before the week gets away from you.',
    ],
    metaTitle: 'Nutrition, Macro Tracking & Meal Planning Apps',
    metaDescription:
      'Protein and keto macro trackers plus a recipe and weekly meal planner for Android. Free on Google Play from Reign Creative LLC.',
  },
  {
    id: 'video-utility',
    label: 'Video & Utility Apps',
    shortLabel: 'Utilities',
    blurb: 'Practical Android tools that stay out of your way.',
    intro: [
      'Utility apps are judged almost entirely on whether they do the job without friction — formats that just play, a camera match you can correct yourself, controls where you expect them, and no detour through a setup wizard.',
      'This category covers Reign Creative’s practical Android tools: a local video player, and a trading-card scanner for identifying cards, checking market-value estimates and measuring centring.',
    ],
    metaTitle: 'Video Player & Utility Apps for Android',
    metaDescription:
      'Practical Android utilities: a local video player for common formats and a trading-card scanner with centring measurement. Free on Google Play.',
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
