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
  schemaCategory: 'GameApplication' | 'HealthApplication' | 'EducationalApplication' | 'MultimediaApplication';
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
    blurb: 'Draft boards, franchise decisions, and full career arcs across seven sports.',
    intro: [
      'Sports management games ask a different question than sports action games. Instead of "can you make the shot?", they ask "can you build the team that makes the shot?" — which turns a commute or a lunch break into a series of roster decisions, draft picks, and long-term bets.',
      'Reign Creative builds this genre for Android with a consistent design goal: give you the parts of being a general manager that are genuinely fun — the draft board, the depth chart, the trade call — without demanding hours per session or a spreadsheet on the side.',
    ],
    metaTitle: 'Sports Career & GM Games for Android',
    metaDescription:
      'Draft simulators, franchise mode, and career sims for basketball, football, baseball, soccer, hockey, and combat sports. Free on Google Play from Reign Creative LLC.',
  },
  {
    id: 'action-arcade',
    label: 'Action & Arcade Games',
    shortLabel: 'Action & Arcade',
    blurb: 'Fast sessions, readable rules, and difficulty that climbs the longer you last.',
    intro: [
      'Arcade games live or die on the first thirty seconds. The controls have to explain themselves, the failure has to feel like your fault, and the next run has to start quickly enough that you take it.',
      'These titles are built around short, repeatable runs that escalate — the kind of game you open in a waiting room and finish without needing to remember where you left off.',
    ],
    metaTitle: 'Action & Arcade Games for Android',
    metaDescription:
      'Space shooters and zombie survival action built for short, escalating runs on Android. Free on Google Play from Reign Creative LLC.',
  },
  {
    id: 'anime-creative',
    label: 'Anime & Creative Games',
    shortLabel: 'Anime & Creative',
    blurb: 'Coloring, trivia, and word play for people who like anime aesthetics.',
    intro: [
      'Creative and trivia games occupy a useful middle ground: more engaging than scrolling, less demanding than a game that expects a real time commitment.',
      'This category pairs relaxed digital coloring with anime knowledge and word puzzles — low-pressure formats you can pick up for two minutes or forty.',
    ],
    metaTitle: 'Anime Coloring & Trivia Games for Android',
    metaDescription:
      'Anime coloring, trivia, and word games for Android. Relaxed creative play and knowledge challenges, free on Google Play from Reign Creative LLC.',
  },
  {
    id: 'language-learning',
    label: 'Language Learning',
    shortLabel: 'Languages',
    blurb: 'Beginner-first courses for languages most apps under-serve.',
    intro: [
      'Most language apps invest heavily in Spanish, French, and Japanese, and comparatively little in the languages millions of people actually need for family, travel, or work — Cantonese, Thai, Malay, Khmer.',
      'These apps target that gap. They start from a genuine beginner position: script and pronunciation first, then the vocabulary and phrases you would realistically use in a first conversation.',
    ],
    metaTitle: 'Language Learning Apps for Android',
    metaDescription:
      'Beginner courses for Cantonese, Thai, Malay, Russian, and Khmer on Android. Free on Google Play from Reign Creative LLC.',
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
    blurb: 'Single-purpose trackers that make daily logging fast enough to stick.',
    intro: [
      'Nutrition tracking usually fails for a mundane reason: logging takes too long, so people stop. A tracker that does one thing quickly beats a comprehensive one you abandon in week two.',
      'These apps each focus on a single number — daily protein, or net carbs — and optimise for the speed of entry rather than the breadth of the database.',
    ],
    metaTitle: 'Nutrition & Macro Tracking Apps for Android',
    metaDescription:
      'Focused protein and keto macro trackers for Android. Fast daily logging, free on Google Play from Reign Creative LLC.',
  },
  {
    id: 'video-utility',
    label: 'Video & Utility Apps',
    shortLabel: 'Utilities',
    blurb: 'Practical Android tools that stay out of your way.',
    intro: [
      'Utility apps are judged almost entirely on whether they do the job without friction — formats that just play, controls where you expect them, and no detour through a setup wizard.',
      'This category covers Reign Creative’s practical Android tools.',
    ],
    metaTitle: 'Video Player & Utility Apps for Android',
    metaDescription:
      'Practical Android utilities including a local video player that handles common formats. Free on Google Play from Reign Creative LLC.',
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
