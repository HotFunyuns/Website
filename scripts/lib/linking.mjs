// The post-publication internal-linking pass, as pure planning functions.
//
// A new article links outward to things that already exist. Nothing links back
// to it, because nothing older knew it would exist. This pass supplies the
// return path after the article is public, and checks the new article's own
// outbound links while it is at it.
//
// Links back to the new article — at most MAX_NEW_LINKS (five) per run, and it
// stops once WANT_OLDER_INBOUND (three) older articles link it — are one of two
// kinds:
//
//   contextual  wraps words an older article already contains — the new
//               article's own target phrase, found verbatim in a paragraph or
//               list item — in a link. The sentence is not rewritten; not one
//               word is added or removed. Headings, tables, code, images,
//               existing link text and sentences that already carry a link are
//               left alone. At most one per older article, and only the first
//               match.
//   card        appends the new article to an older article's `relatedArticles`,
//               which the template renders as a "Keep reading" card titled with
//               the new article's headline. Used when no natural phrase exists.
//               Never beyond the six the template renders.
//
// Separately, the new article itself may gain cards — its hub's cornerstone, and
// related picks if it links fewer than two public articles — again within the
// six its own template renders. Those are counted apart from the five above.
//
// Sources are chosen by the same relevance score the site uses for its "Keep
// reading" fallback (src/lib/blog/relevance.mjs), only among articles that are
// public now, and only above MIN_LINK_RELEVANCE — a same-category article with
// nothing else in common is not a reason to link.
//
// Idempotent: every action is skipped when the link already exists, so running
// the pass twice changes nothing the second time.

import {
  MIN_LINK_RELEVANCE,
  relevanceProfile,
  relevanceScore,
  relevanceTokens,
} from '../../src/lib/blog/relevance.mjs';
import { blogSlugOf, bodyTargets, extractLinks } from './content.mjs';
import { isPublic } from './publishing.mjs';

/** The article template renders six "Keep reading" cards; a seventh is dead weight. */
export const MAX_RELATED = 6;
/** The new article should end up with at least this many links from older ones… */
export const MIN_OLDER_INBOUND = 2;
/** …and the pass stops adding once it reaches this many. */
export const WANT_OLDER_INBOUND = 3;
/** Never more than this many new links in one run, however many candidates qualify. */
export const MAX_NEW_LINKS = 5;
/** How far down the relevance ranking to look for a source that can take a link. */
const CANDIDATE_WINDOW = 15;
/** An exact anchor used this many times for one target is already repetitive. */
const MAX_SAME_ANCHOR = 3;

/** Which articles link to `slug`, and how. */
export function inboundLinks(articles, slug) {
  const found = new Map();
  for (const source of articles) {
    if (source.slug === slug) continue;
    const body = bodyTargets(source).has(slug);
    const related = (source.data.relatedArticles ?? []).includes(slug);
    if (body || related) found.set(source.slug, { body, related });
  }
  return found;
}

const normalisePhrase = (text) =>
  String(text ?? '')
    .toLowerCase()
    .replace(/[?!.:]+$/, '')
    .replace(/\s+/g, ' ')
    .trim();

/**
 * Candidate anchor phrases for a target, most specific first.
 *
 * Strict on purpose, because an anchor is a claim about where the link goes.
 * Only the target's title, primary keyword and secondary keywords are eligible —
 * never the long-tail question lists, which include tangents ("does brain
 * training actually work" is listed on the mental-math guide but is another
 * article's subject). A phrase must be two to eight words, every content word in
 * it must appear in the target's own title or primary keyword, and it must not
 * be the title or primary keyword of a different article.
 */
export function anchorPhrases(target, articles = []) {
  const owners = new Map();
  for (const a of articles) {
    if (a.slug === target.slug) continue;
    owners.set(normalisePhrase(a.data.title), a.slug);
    owners.set(normalisePhrase(a.data.primaryKeyword), a.slug);
  }
  const core = new Set(relevanceTokens(`${target.data.title} ${target.data.primaryKeyword}`));

  const seen = new Set();
  const phrases = [];
  for (const text of [target.data.title, target.data.primaryKeyword, ...(target.data.secondaryKeywords ?? [])]) {
    const phrase = String(text ?? '').trim().replace(/[?!.:]+$/, '').replace(/\s+/g, ' ');
    const key = normalisePhrase(phrase);
    const words = phrase.split(' ').length;
    if (words < 2 || words > 8 || phrase.length < 8 || seen.has(key)) continue;
    // A phrase ending in a function word ("…tricks for") makes an awkward anchor.
    if (/\b(?:the|a|an|of|for|to|in|and|or|with|vs)$/i.test(phrase)) continue;
    const tokens = relevanceTokens(phrase);
    if (tokens.length < 2 || !tokens.every((token) => core.has(token))) continue;
    if (owners.has(key)) continue;
    seen.add(key);
    phrases.push(phrase);
  }
  return phrases.sort((a, b) => b.length - a.length);
}

const escapeRegExp = (text) => text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

/**
 * Ranges of a Markdown body that must not receive a new link: fenced code,
 * headings, tables, HTML, existing links and inline code. Returned as
 * [start, end) offsets.
 */
function protectedRanges(body) {
  const ranges = [];
  let offset = 0;
  let inFence = false;
  for (const line of body.split('\n')) {
    const start = offset;
    const end = offset + line.length;
    offset = end + 1;
    if (/^\s*(```|~~~)/.test(line)) {
      inFence = !inFence;
      ranges.push([start, end]);
      continue;
    }
    if (inFence || /^\s*#/.test(line) || /^\s*\|/.test(line) || /^\s*</.test(line) || !line.trim()) {
      ranges.push([start, end]);
    }
  }
  for (const link of extractLinks(body)) ranges.push([link.index, link.index + link.length]);
  // extractLinks skips images, but alt text is no place for a link either.
  for (const match of body.matchAll(/!\[[^\]\n]*\]\([^)\s]*\)/g)) ranges.push([match.index, match.index + match[0].length]);
  for (const match of body.matchAll(/`[^`\n]*`/g)) ranges.push([match.index, match.index + match[0].length]);
  return ranges;
}

/** The sentence around an offset: from the previous terminator to the next. */
function sentenceAround(body, start, end) {
  let from = start;
  while (from > 0 && !/[.!?\n]/.test(body[from - 1])) from--;
  let to = end;
  while (to < body.length && !/[.!?\n]/.test(body[to])) to++;
  return { from, to: Math.min(body.length, to + 1) };
}

/**
 * Finds a place in `source` where one of the target's phrases already appears
 * as plain prose. Returns { start, end, text, phrase } or null.
 */
export function findContextualAnchor(source, target, anchorUse = new Map(), articles = []) {
  const body = source.body;
  const ranges = protectedRanges(body);
  const blocked = (s, e) => ranges.some(([a, b]) => s < b && e > a);
  const linkSpans = extractLinks(body).map((l) => [l.index, l.index + l.length]);

  for (const phrase of anchorPhrases(target, articles)) {
    const pattern = new RegExp(`(?<![\\w\\[/-])${escapeRegExp(phrase)}(?![\\w\\]-])`, 'gi');
    let match;
    while ((match = pattern.exec(body)) !== null) {
      const start = match.index;
      const end = start + match[0].length;
      if (blocked(start, end)) continue;
      const { from, to } = sentenceAround(body, start, end);
      // One link per sentence keeps prose readable and avoids link clusters.
      if (linkSpans.some(([a, b]) => a < to && b > from)) continue;
      // The match must be part of a sentence, not the whole of a list item.
      if (body.slice(from, to).trim().replace(/^[-*\d.\s]+/, '').length <= match[0].length + 2) continue;
      const key = match[0].toLowerCase();
      if ((anchorUse.get(`${key}→${target.slug}`) ?? 0) >= MAX_SAME_ANCHOR) continue;
      return { start, end, text: match[0], phrase };
    }
  }
  return null;
}

/** How often each (anchor text → target) pair is used in bodies across the site. */
export function anchorUsage(articles) {
  const use = new Map();
  for (const article of articles) {
    for (const link of extractLinks(article.body)) {
      const slug = blogSlugOf(link.href);
      if (!slug) continue;
      const key = `${link.text.toLowerCase()}→${slug}`;
      use.set(key, (use.get(key) ?? 0) + 1);
    }
  }
  return use;
}

/**
 * Plans the pass for one newly public article. Pure: returns the checks and the
 * actions without writing anything.
 *
 * @param {Array} articles every article on disk (drafts included; they are filtered here)
 * @param {string} slug the article that was just published
 * @param {object} site { apps, hubs } from loadSiteData()
 * @param {object} options { now, anyAge, contextual }
 */
export function planPostPublication(articles, slug, site, options = {}) {
  const { now = new Date(), anyAge = false, contextual = true } = options;
  const target = articles.find((a) => a.slug === slug);
  if (!target) return { fatal: `no article "${slug}" in content/blog`, checks: [], actions: [] };
  if (!isPublic(target.data, now)) {
    return {
      fatal: `"${slug}" is not public (status ${target.data.status}, publishedAt ${target.data.publishedAt}) — the pass runs only after publication`,
      checks: [],
      actions: [],
    };
  }

  const publicArticles = articles.filter((a) => isPublic(a.data, now));
  const publicSlugs = new Set(publicArticles.map((a) => a.slug));
  const appSlugs = new Set(site.apps.map((app) => app.slug));
  const hubIds = new Set(site.hubs.map((hub) => hub.id));
  const profiles = new Map(publicArticles.map((a) => [a.slug, relevanceProfile({ slug: a.slug, ...a.data })]));
  const score = (a, b) => relevanceScore(profiles.get(a.slug), profiles.get(b.slug));

  const checks = [];
  const actions = [];
  const check = (id, ok, detail, fix) => checks.push({ id, ok, detail, ...(fix ? { fix } : {}) });

  const links = extractLinks(target.body);
  const primaryApp = target.data.relatedApps?.[0];
  const relatedNow = [...(target.data.relatedArticles ?? [])];

  /* ------------------------------------------------ outbound from the target */

  check(
    'app-page',
    links.some((l) => l.href === `/apps/${primaryApp}/`),
    `links its app page /apps/${primaryApp}/ in the body`,
    'add a sentence linking the app page — the pass does not write prose into the new article'
  );
  check(
    'play-listing',
    appSlugs.has(primaryApp),
    `the article template renders the tracked Google Play link for ${primaryApp}`
  );

  const categoryLinked = links.some((l) => /^\/(?:apps|blog)\/category\/[a-z-]+\/$/.test(l.href));
  const hubLinked = links.some((l) => /^\/blog\/topics\/[a-z-]+\/$/.test(l.href));
  const hubs = (target.data.hubs ?? []).filter((id) => hubIds.has(id));
  check(
    'category-or-hub',
    categoryLinked || hubLinked || hubs.length > 0,
    hubs.length > 0
      ? `belongs to hub(s) ${hubs.join(', ')}, which the template links`
      : 'links a category or topic hub in the body'
  );
  const categoryHubs = site.hubs.filter((hub) => hub.categoryId === target.data.category);
  if (categoryHubs.length > 0 && hubs.length === 0) {
    check(
      'hub-declared',
      false,
      `its category has topic hubs (${categoryHubs.map((h) => h.id).join(', ')}) but the article declares none`,
      'add the matching hub to "hubs" so the hub page lists it'
    );
  }

  // Anything the article points at must be public, or the link is broken (body)
  // or silently dropped (card).
  const privateRefs = [
    ...links.map((l) => blogSlugOf(l.href)).filter((s) => s && !publicSlugs.has(s)),
    ...relatedNow.filter((s) => !publicSlugs.has(s)),
  ];
  check(
    'no-private-links',
    privateRefs.length === 0,
    privateRefs.length ? `links unpublished or missing article(s): ${[...new Set(privateRefs)].join(', ')}` : 'links only public articles',
    'remove or replace the link — the target is not public'
  );

  const linkedPublic = new Set([...bodyTargets(target), ...relatedNow].filter((s) => publicSlugs.has(s)));
  const capacity = () => MAX_RELATED - relatedNow.length;

  for (const hubId of hubs) {
    const cornerstone = site.hubs.find((hub) => hub.id === hubId)?.cornerstone;
    if (!cornerstone || cornerstone === target.slug || !publicSlugs.has(cornerstone)) continue;
    if (linkedPublic.has(cornerstone)) {
      check(`cornerstone:${hubId}`, true, `links the ${hubId} cornerstone ${cornerstone}`);
    } else if (capacity() > 0) {
      actions.push({ type: 'card', source: target.slug, target: cornerstone, reason: `cornerstone of ${hubId}` });
      relatedNow.push(cornerstone);
      linkedPublic.add(cornerstone);
      check(`cornerstone:${hubId}`, true, `will link the ${hubId} cornerstone ${cornerstone} as a card`);
    } else {
      check(`cornerstone:${hubId}`, false, `does not link the ${hubId} cornerstone ${cornerstone} and has no free card slot`, 'link it in the body');
    }
  }

  if (linkedPublic.size < 2) {
    const picks = publicArticles
      .filter((a) => a.slug !== target.slug && !linkedPublic.has(a.slug))
      .map((a) => ({ a, s: score(target, a) }))
      .filter((c) => c.s >= MIN_LINK_RELEVANCE)
      .sort((x, y) => y.s - x.s || y.a.data.publishedAt.localeCompare(x.a.data.publishedAt) || x.a.slug.localeCompare(y.a.slug));
    for (const { a } of picks) {
      if (linkedPublic.size >= 3 || capacity() <= 0) break;
      actions.push({ type: 'card', source: target.slug, target: a.slug, reason: 'related article for the new page' });
      relatedNow.push(a.slug);
      linkedPublic.add(a.slug);
    }
  }
  check(
    'related-articles',
    linkedPublic.size >= 2,
    `links ${linkedPublic.size} related public article(s)`,
    'add related articles by hand — no candidate cleared the relevance threshold'
  );

  /* -------------------------------------------------- inbound to the target */

  const existing = inboundLinks(publicArticles, target.slug);
  const pool = publicArticles
    .filter((a) => a.slug !== target.slug && (anyAge || a.data.publishedAt < target.data.publishedAt))
    .map((a) => ({ a, s: score(target, a) }))
    .filter((c) => c.s >= MIN_LINK_RELEVANCE)
    .sort((x, y) => y.s - x.s || y.a.data.publishedAt.localeCompare(x.a.data.publishedAt) || x.a.slug.localeCompare(y.a.slug));

  const eligibleSources = new Set(pool.map((c) => c.a.slug));
  let linkedSources = [...existing.keys()].filter((s) => eligibleSources.has(s)).length;
  const usage = anchorUsage(articles);
  const shortlist = pool.slice(0, 5).map((c) => ({ slug: c.a.slug, score: c.s, linked: existing.has(c.a.slug) }));

  let added = 0;
  for (const { a: source, s } of pool.slice(0, CANDIDATE_WINDOW)) {
    if (linkedSources >= WANT_OLDER_INBOUND || added >= MAX_NEW_LINKS) break;
    if (existing.has(source.slug)) continue;

    const anchor = contextual ? findContextualAnchor(source, target, usage, publicArticles) : null;
    if (anchor) {
      actions.push({ type: 'contextual', source: source.slug, target: target.slug, score: s, ...anchor });
    } else if ((source.data.relatedArticles ?? []).length < MAX_RELATED) {
      actions.push({ type: 'card', source: source.slug, target: target.slug, score: s, reason: 'links back to the new article' });
    } else {
      continue;
    }
    added++;
    linkedSources++;
  }

  check(
    'older-inbound',
    linkedSources >= MIN_OLDER_INBOUND,
    `${linkedSources} ${anyAge ? 'relevant' : 'older'} article(s) link to it after this pass (want ${WANT_OLDER_INBOUND}, minimum ${MIN_OLDER_INBOUND})`,
    'link it by hand from a relevant older article'
  );

  return { target: target.slug, checks, actions, shortlist, fatal: null };
}

/**
 * Applies planned actions and returns Map<slug, { original, article }>, where
 * `article.raw` is the content to write and `original` is the article as read
 * (its line endings decide how it is written back). Each action is re-checked
 * against the current content, so replaying a plan — or a plan made against a
 * file that has since changed — adds nothing twice and edits nothing it cannot
 * find verbatim.
 */
export function applyActions(articles, actions, { setFrontmatterValue, parseArticle }) {
  const bySlug = new Map(articles.map((a) => [a.slug, a]));
  const edited = new Map();
  const current = (slug) => edited.get(slug)?.article ?? bySlug.get(slug);
  const record = (slug, raw) => {
    const original = bySlug.get(slug);
    edited.set(slug, { original, article: parseArticle(original.file, raw) });
  };

  for (const action of actions) {
    const source = current(action.source);
    if (!source) continue;
    if (action.type === 'card') {
      const related = source.data.relatedArticles ?? [];
      if (related.includes(action.target) || related.length >= MAX_RELATED) continue;
      record(
        source.slug,
        setFrontmatterValue(source.raw, 'relatedArticles', [...related, action.target], { after: 'relatedApps' })
      );
    } else if (action.type === 'contextual') {
      if (bodyTargets(source).has(action.target)) continue;
      // Offsets were measured on the file as read. If anything has edited this
      // article since, they no longer apply, and the action is dropped.
      if (source !== bySlug.get(source.slug)) continue;
      const body = source.body;
      if (body.slice(action.start, action.end) !== action.text) continue;
      const nextBody = `${body.slice(0, action.start)}[${action.text}](/blog/${action.target}/)${body.slice(action.end)}`;
      record(source.slug, source.raw.slice(0, source.raw.length - body.length) + nextBody);
    }
  }
  return edited;
}
