// How related two articles are, as one number.
//
// Shared by the site — the "Keep reading" fallback in src/lib/blog/index.ts —
// and by the post-publication linking pass in scripts/, so the page a reader
// sees and the links the pass writes can never disagree about what "related"
// means. Plain JavaScript for that reason: node scripts import it directly,
// without a TypeScript step.
//
// Deterministic by construction. The score reads only an article's own
// metadata — no dates, no randomness, no build time — so the same corpus always
// produces the same links. Callers break ties themselves.
//
// What it rewards, strongest first:
//   - the same primary app (the article's CTA app),
//   - a shared topic hub,
//   - overlap between titles and target keywords,
//   - shared tags,
//   - the same category.
// Category alone is deliberately worth the least. Before this existed the
// fallback was "newest article in the same category", which is how the Mental
// Math cornerstone came to recommend an article about Achaemenid Persia.

const STOPWORDS = new Set(
  (
    'the and for with from into over under your you are was were what when where which who why how ' +
    'does did can could should would will just than then that this these those them they their there ' +
    'about after before between vs versus not all any each every more most much many very also only ' +
    'app apps guide guides explained explainer beginner beginners basics best free android game games'
  ).split(' ')
);

/**
 * Lower-cased, accent-folded content words, crudely singularised so "tables"
 * and "table" meet. Short words and stopwords carry no topical signal.
 *
 * @param {string} text
 * @returns {string[]}
 */
export function relevanceTokens(text) {
  return text
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .split(/[^a-z0-9]+/)
    .filter((word) => word.length > 2 && !STOPWORDS.has(word))
    .map((word) => (word.length > 4 && word.endsWith('s') && !word.endsWith('ss') ? word.slice(0, -1) : word));
}

/**
 * @typedef {object} RelevanceSource
 * @property {string} slug
 * @property {string} category
 * @property {string[]} relatedApps
 * @property {string[]} [hubs]
 * @property {string[]} tags
 * @property {string} title
 * @property {string} primaryKeyword
 * @property {string[]} secondaryKeywords
 */

/**
 * @typedef {object} RelevanceProfile
 * @property {string} slug
 * @property {string} category
 * @property {string | undefined} app
 * @property {Set<string>} apps
 * @property {Set<string>} hubs
 * @property {Set<string>} tags
 * @property {Set<string>} terms
 */

/**
 * Precomputes the sets a comparison needs, so scoring every pair in a corpus of
 * several hundred articles stays cheap.
 *
 * @param {RelevanceSource} post
 * @returns {RelevanceProfile}
 */
export function relevanceProfile(post) {
  return {
    slug: post.slug,
    category: post.category,
    app: post.relatedApps[0],
    apps: new Set(post.relatedApps),
    hubs: new Set(post.hubs ?? []),
    tags: new Set(post.tags.map((tag) => tag.toLowerCase())),
    terms: new Set(relevanceTokens([post.title, post.primaryKeyword, ...post.secondaryKeywords].join(' '))),
  };
}

/**
 * Symmetric relevance score. Roughly: 0–1 unrelated, 2–3 same neighbourhood,
 * 4+ about the same app, 8+ about the same app and subject.
 *
 * @param {RelevanceProfile} a
 * @param {RelevanceProfile} b
 * @returns {number}
 */
export function relevanceScore(a, b) {
  let score = 0;

  if (a.app && a.app === b.app) score += 4;
  else if ((b.app && a.apps.has(b.app)) || (a.app && b.apps.has(a.app))) score += 2;

  let sharedHubs = 0;
  for (const hub of a.hubs) if (b.hubs.has(hub)) sharedHubs += 1;
  score += 3 * sharedHubs;

  if (a.category === b.category) score += 1;

  let sharedTags = 0;
  for (const tag of a.tags) if (b.tags.has(tag)) sharedTags += 1;
  score += Math.min(sharedTags, 3);

  let sharedTerms = 0;
  for (const term of a.terms) if (b.terms.has(term)) sharedTerms += 1;
  const union = a.terms.size + b.terms.size - sharedTerms;
  // Jaccard mapped onto 0–4 in half steps, so wording overlap can outweigh a
  // shared category but never a shared app.
  if (union > 0) score += Math.round((8 * sharedTerms) / union) / 2;

  return score;
}

/**
 * The minimum score for an automatic link. Below it, two articles share at most
 * a category and a stray tag, and a link between them would be filler.
 */
export const MIN_LINK_RELEVANCE = 3;
