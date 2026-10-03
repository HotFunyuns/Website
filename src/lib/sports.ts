import 'server-only';
import {
  SPORTS_INDEX_UPDATED_AT,
  getSportForApp,
  getSportForPost,
  isAboutSport,
  sports,
  type SportInfo,
} from '@/data/sports';
import { posts, type BlogPost } from '@/lib/blog';
import { tools, toolsForSport, toolsIndexCopy, type ToolMeta } from '@/tools/registry';

/**
 * Which published articles a sport hub lists, and in which section.
 *
 *   own      — primary app is this sport's, and the article is about the sport
 *   general  — primary app is this sport's, but the article applies to any sport
 *              (salary caps, career modes, draft formats); also listed on /sports/
 *   related  — about this sport, but led by another sport's app
 *
 * Every rule reads existing frontmatter only. Unpublished articles cannot
 * appear: every candidate comes from `posts`.
 */
export interface SportPosts {
  own: BlogPost[];
  general: BlogPost[];
  related: BlogPost[];
}

export function getSportPosts(sport: SportInfo): SportPosts {
  const own: BlogPost[] = [];
  const general: BlogPost[] = [];
  const related: BlogPost[] = [];
  for (const post of posts) {
    const primarySport = getSportForApp(post.relatedApps[0] ?? '');
    if (primarySport?.id === sport.id) {
      (isAboutSport(post, sport) ? own : general).push(post);
    } else if (
      post.relatedApps.slice(1).some((slug) => getSportForApp(slug)?.id === sport.id) &&
      isAboutSport(post, sport)
    ) {
      related.push(post);
    }
  }
  return { own, general, related };
}

/** Sports guides that apply to every sport — listed on the /sports/ index. */
export function getCrossSportPosts(): BlogPost[] {
  return posts.filter((post) => getSportForApp(post.relatedApps[0] ?? '') && !getSportForPost(post));
}

/* ---------------------------------------------------------------- grouping */

export interface GuideGroup {
  id: string;
  title: string;
  posts: BlogPost[];
}

/**
 * Subject groups for a hub's own guides, tested in this order against the
 * article's tags; the first match wins and anything unmatched falls into the
 * simulator group. A grouping, not a taxonomy — it exists so a reader can scan
 * a hub, and it changes nothing about the articles themselves.
 */
const GROUP_RULES: { id: string; title: string; tags: string[] }[] = [
  {
    id: 'statistics',
    title: 'Statistics and what they measure',
    tags: ['statistics', 'analysis', 'strokes gained'],
  },
  {
    id: 'rules',
    title: 'Rules and how the sport works',
    tags: [
      'rules',
      'beginner',
      'beginners',
      'scoring',
      'positions',
      'reference',
      'faq',
      'weight classes',
      'qualifying',
      'league tables',
      'standings',
      'offside',
      'icing',
      'roles',
      'league structure',
      'tiebreakers',
      'transfers',
      'formats',
      'tournament entry',
      'union',
      'career path',
      'coaching',
    ],
  },
  {
    id: 'strategy',
    title: 'Strategy, tactics and team-building',
    tags: [
      'strategy',
      'tactics',
      'draft strategy',
      'roster building',
      'squad building',
      'lineup',
      'formations',
      'line combinations',
      'special teams',
      'clock management',
      'rotation',
      'rotations',
      'squad management',
      'match strategy',
      'course management',
      'matchmaking',
      'playing styles',
      'decision making',
      'clubs',
      'stance',
      'striking',
      'grappling',
      'scouting',
    ],
  },
];

const ORDER = ['rules', 'statistics', 'strategy', 'simulators'];

export function groupGuides(list: BlogPost[]): GuideGroup[] {
  const groups = new Map<string, GuideGroup>([
    ['rules', { id: 'rules', title: 'Rules and how the sport works', posts: [] }],
    ['statistics', { id: 'statistics', title: 'Statistics and what they measure', posts: [] }],
    ['strategy', { id: 'strategy', title: 'Strategy, tactics and team-building', posts: [] }],
    ['simulators', { id: 'simulators', title: 'Getting more from the simulators', posts: [] }],
  ]);
  for (const post of list) {
    const tags = post.tags.map((tag) => tag.toLowerCase());
    const rule = GROUP_RULES.find((r) => r.tags.some((tag) => tags.includes(tag)));
    groups.get(rule?.id ?? 'simulators')!.posts.push(post);
  }
  return ORDER.map((id) => groups.get(id)!).filter((group) => group.posts.length > 0);
}

/* ----------------------------------------------------------------- listing */

/** Sports with at least one published article — the hubs that get a page. */
export function activeSports(): SportInfo[] {
  return sports.filter((sport) => {
    const { own, general } = getSportPosts(sport);
    return own.length + general.length > 0;
  });
}

/** Every article a hub page renders, in render order, without duplicates. */
export function hubPostList(sport: SportInfo): BlogPost[] {
  const { own, general, related } = getSportPosts(sport);
  const seen = new Set<string>();
  return [...own, ...general, ...related].filter((post) => !seen.has(post.slug) && seen.add(post.slug));
}

const newest = (days: string[]) => days.reduce((a, b) => (a > b ? a : b));

/**
 * A hub changes when its standing copy changes, when an article it lists is
 * updated, or when a tool it lists changes — so its last-modified date is the
 * newest of those, never the build date.
 */
export function sportLastModified(sport: SportInfo): string {
  return newest([
    sport.updatedAt,
    ...hubPostList(sport).map((post) => post.updatedAt),
    ...toolsForSport(sport.id).map((tool) => tool.updatedAt),
  ]);
}

export function sportsIndexLastModified(): string {
  return newest([
    SPORTS_INDEX_UPDATED_AT,
    ...activeSports().map(sportLastModified),
    ...getCrossSportPosts().map((post) => post.updatedAt),
  ]);
}

export function toolsIndexLastModified(): string {
  return newest([toolsIndexCopy.updatedAt, ...tools.map((tool: ToolMeta) => tool.updatedAt)]);
}

// A hub whose "start here" article is missing or unpublished would lead with a
// dead link, so the build fails instead — the same rule the topic hubs follow.
for (const sport of sports) {
  if (!posts.some((post) => post.slug === sport.cornerstone)) {
    throw new Error(`src/data/sports.ts — "${sport.id}" names cornerstone "${sport.cornerstone}", which is not a published article`);
  }
  const cornerstone = posts.find((post) => post.slug === sport.cornerstone)!;
  if (getSportForPost(cornerstone)?.id !== sport.id) {
    throw new Error(`src/data/sports.ts — cornerstone "${sport.cornerstone}" is not one of "${sport.id}"'s own articles`);
  }
}
