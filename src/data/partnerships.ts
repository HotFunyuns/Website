import type { InquiryType } from '@/lib/analytics';
import { companyInfo } from './apps';

/**
 * The business-development layer: what Reign Creative LLC is open to discussing,
 * how to raise it, and the words that keep every page an invitation rather than
 * an offer. Owner-approved scope (2026-10-24): partnerships, publishing,
 * distribution, co-development, licensing, white-label where technically
 * feasible, sponsorship, cross-promotion, localization, educational and
 * institutional partnerships, integrations supported by existing capabilities,
 * and acquisition of an individual app, several apps or the portfolio. Not
 * authorised: prices, valuations, revenue, user numbers, binding offers.
 */

export const INQUIRY_TYPES: { id: InquiryType; label: string }[] = [
  { id: 'publishing', label: 'Publishing' },
  { id: 'distribution', label: 'Distribution' },
  { id: 'licensing', label: 'Licensing' },
  { id: 'sponsorship', label: 'Sponsorship' },
  { id: 'co_development', label: 'Co-development' },
  { id: 'localization', label: 'Localization' },
  { id: 'integration', label: 'Integration' },
  { id: 'app_acquisition', label: 'App acquisition' },
  { id: 'portfolio_acquisition', label: 'Portfolio acquisition' },
  { id: 'other', label: 'Other business inquiry' },
];

export function inquiryLabel(id: InquiryType): string {
  return INQUIRY_TYPES.find((type) => type.id === id)?.label ?? 'Business inquiry';
}

/** The subject line a business inquiry email opens with. */
export function inquirySubject(appName: string | null, type: InquiryType): string {
  const about = appName ?? 'Reign Creative portfolio';
  return `Partnership inquiry: ${about} (${inquiryLabel(type)})`;
}

/**
 * The prompt pre-filled into the email body. It asks only for what a first
 * conversation needs and says, in the email itself, not to send confidential
 * material yet.
 */
export function inquiryBody(appName: string | null, type: InquiryType): string {
  return [
    `Hello ${companyInfo.name},`,
    '',
    `I would like to discuss ${appName ?? 'the Reign Creative portfolio'} (${inquiryLabel(type)}).`,
    '',
    'Name:',
    'Organization:',
    'Work email for replies:',
    'What we have in mind (a few sentences):',
    '',
    '(Please do not include confidential, financial or personal information in a first message.)',
  ].join('\n');
}

export function inquiryMailto(appName: string | null, type: InquiryType): string {
  return `mailto:${companyInfo.supportEmail}?subject=${encodeURIComponent(
    inquirySubject(appName, type)
  )}&body=${encodeURIComponent(inquiryBody(appName, type))}`;
}

/** The nonbinding notice, shared by the hub, every overview and the app pages. */
export const NONBINDING_NOTICE =
  'This page invites discussion. It is not an offer to sell, a valuation, a financial projection or an investment solicitation, and it does not guarantee that any partnership, licence or transaction will happen. Any arrangement is subject to discussion, due diligence, the requirements of the platforms involved — including Google Play’s own process for transferring an app between developer accounts — and a written agreement.';

/**
 * How the hub groups the portfolio. Each app belongs to exactly one group; the
 * build checks that every app with a published overview is in one.
 */
export interface PortfolioGroup {
  id: string;
  label: string;
  intro: string;
  apps: string[];
}

export const PORTFOLIO_GROUPS: PortfolioGroup[] = [
  {
    id: 'sports-careers',
    label: 'Sports career games',
    intro:
      'Fifteen games that follow one athlete’s career, from a quarterback reading a defence to a cricketer choosing between pace and spin. Some are decision-led simulations and some put the controls in the player’s hands; between them they cover basketball, American football, soccer, baseball, hockey, golf, tennis, rugby union, motorsport, boxing and cricket — one approach to career play applied across eleven sports.',
    apps: [
      'pro-basketball-my-career-sim',
      'basketball-career-pro-league',
      'football-career-sim',
      'football-career-pro-league',
      'soccer-career-sim-xi',
      'football-career-soccer-league',
      'baseball-career-sim',
      'hockey-career-sim',
      'hockey-career-pro-league',
      'golf-career-simulator',
      'tennis-career-sim',
      'rugby-career-sim',
      'car-racing-pro-career',
      'boxing-prize-fighter-career',
      'cricket-career-simulator',
    ],
  },
  {
    id: 'draft-gm',
    label: 'Draft, GM and league management',
    intro:
      'Nine games about building rosters and running leagues rather than playing matches: perfect-season draft challenges across seven sports, and two league sandboxes with commissioner controls. Their player pools draw on real players’ careers with each game’s own ratings, and none is affiliated with a league, team or players’ association.',
    apps: [
      'pro-basketball-draft-gm-mode',
      'football-draft-gm-mode',
      'baseball-draft-gm-team',
      'soccer-draft-gm-xi',
      'hockey-draft-gm-manager',
      'mma-boxing-fight-draft',
      'rugby-draft-pro-league',
      'basketball-league-sandbox',
      'football-league-commissioner',
    ],
  },
  {
    id: 'languages',
    label: 'Language learning',
    intro:
      'Ten beginner courses, most of them for languages the large apps serve thinly — Lao, Khmer, Marathi, Shanghainese and Cantonese — alongside Thai, Malay, Vietnamese, Russian and Italian. Nine of the ten also run in the other direction, teaching English to speakers of the language, which widens the audience a school, tutoring service or community organisation could reach.',
    apps: [
      'learn-cantonese',
      'learn-shanghainese',
      'learn-thai',
      'learn-lao',
      'learn-cambodian-khmer',
      'learn-vietnamese',
      'learn-malay',
      'learn-marathi',
      'learn-russian',
      'learn-italian',
    ],
  },
  {
    id: 'learning',
    label: 'History, mathematics and reasoning',
    intro:
      'Three study-and-practice apps: an interactive world-history timeline with an alternate-history mode, a brain-training app whose IQ-style results are labelled as estimates, and a discrete-mathematics companion for computer-science students. Museums, educational publishers, schools and tutoring services are the obvious conversations.',
    apps: ['world-history-timeline-sim', 'mental-math-memory-games', 'discrete-math-study-quiz'],
  },
  {
    id: 'finance-education',
    label: 'Financial education',
    intro:
      'A beginner trading simulator that teaches how shares, orders, portfolios and risk work through lessons and paper trading with virtual money. It is education and simulation only — no brokerage, no advice, no signals — so the relevant partners are financial-literacy programmes, schools and learning platforms.',
    apps: ['learn-to-trade-stocks'],
  },
  {
    id: 'health',
    label: 'Health, food and wellbeing',
    intro:
      'Two macro trackers — one for protein, one for keto net carbs — a recipe and weekly meal planner, and a breathing app with animated guides. They are tracking and routine tools rather than medical products, which shapes the partners that fit: meal-planning services, fitness educators and wellness publishers rather than clinical providers.',
    apps: ['protein-diet-tracker', 'keto-diet-tracker', 'easy-recipes-meal-planner', 'kawaii-breathe-relax'],
  },
  {
    id: 'utilities',
    label: 'Productivity and utilities',
    intro:
      'Three practical tools, each built around one everyday task: playing local video files, working with PDFs, and turning recorded speech into text. Utilities like these are where integration, bundling and distribution partnerships tend to start.',
    apps: ['regal-video-player', 'pdf-all-in-one-tools', 'transcribe-audio-to-text'],
  },
  {
    id: 'creative',
    label: 'Creative, journaling and cosy games',
    intro:
      'Five relaxed titles with a strong visual style: an anime coloring book, a kawaii notes and journal app, a cosy town builder, a block-building sandbox RPG and a dragon virtual-pet game. Art direction is the common thread, which suits character, brand and licensing collaborations.',
    apps: [
      'anime-coloring-book',
      'kawaii-cute-notes-journal',
      'life-simulator-city-builder',
      'block-world-rpg',
      'dragon-pet-evolve',
    ],
  },
  {
    id: 'arcade',
    label: 'Arcade, action and strategy',
    intro:
      'Seven short-session games: two vertical space shooters, a zombie survival roguelike, an io arena, two tower defence games — one with a hero and idle progression — and a gunship shooter. Compact action titles like these suit publishers, cross-promotion partners and localization work.',
    apps: [
      'space-shooter-classic-arcade',
      'space-galaxy-attack-hardcore',
      'zombie-survival-last-survivor',
      'jellyfish-arena-survivor-io',
      'regal-tower-defense',
      'hero-td-idle-tower-defense',
      'world-war-gunship-attack',
    ],
  },
  {
    id: 'trivia-casino',
    label: 'Trivia and social casino',
    intro:
      'An anime trivia and word game, and two slots games played with virtual coins only. The slots titles are rated Teen on Google Play and describe an adult audience; any partnership around them has to keep them clear of real-money gambling and of content aimed at children.',
    apps: ['anime-trivia-word-games', 'anime-casino-slots', 'big-jackpot-casino-slots'],
  },
  {
    id: 'collectibles',
    label: 'Collectibles tools',
    intro:
      'A trading-card scanner that identifies cards, measures centring and shows third-party market estimates. Hobby shops, collection-management services and collector communities are the natural fits; it is not affiliated with any card company or grading service.',
    apps: ['tcg-card-grading-scanner'],
  },
];
