// Audits the 2026-09-22 250-article expansion as a unit: cohort counts, hub
// membership, orphans, click depth, and the claim rules that apply to the two
// featured-app cohorts specifically.
//
// The generic gates (preflight, canonicals, schema, feeds) already cover what
// is true of every article. This covers what is true of *this release*, which
// nothing else knows about.
//
// Run: node scripts/audit-expansion-250.mjs

import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, '..');
const CONTENT = join(ROOT, 'content', 'blog');
const OUT = join(ROOT, 'out');

const EXPANSION_DATE = '2026-09-22';
const IQ_APP = 'mental-math-memory-games';
const HISTORY_APP = 'world-history-timeline-sim';

const IQ_HUBS = new Set([
  'iq-tests-and-reasoning',
  'brain-training-games',
  'mental-math',
  'logic-and-pattern-puzzles',
  'memory-and-attention',
]);
const HISTORY_HUBS = new Set([
  'world-history-timelines',
  'civilizations-and-empires',
  'major-historical-events',
  'historical-people',
  'history-learning-methods',
]);
const ALL_HUBS = new Set([...IQ_HUBS, ...HISTORY_HUBS]);

const errors = [];
const warnings = [];
const fail = (m) => errors.push(m);
const warn = (m) => warnings.push(m);

// ---------------------------------------------------------------- load posts
const posts = [];
for (const file of readdirSync(CONTENT).filter((f) => f.endsWith('.md'))) {
  const raw = readFileSync(join(CONTENT, file), 'utf8');
  const block = /^---\r?\n([\s\S]*?)\r?\n---\r?\n/.exec(raw);
  if (!block) {
    fail(`${file}: no frontmatter block`);
    continue;
  }
  let data;
  try {
    data = JSON.parse(block[1]);
  } catch (error) {
    fail(`${file}: frontmatter is not valid JSON — ${error.message}`);
    continue;
  }
  posts.push({ slug: file.replace(/\.md$/, ''), body: raw.slice(block[0].length), ...data });
}

const bySlug = new Map(posts.map((p) => [p.slug, p]));
const expansion = posts.filter((p) => p.publishedAt === EXPANSION_DATE);

// ------------------------------------------------------------ cohort counts
// Cohort membership is derived, never declared: an article belongs to the IQ or
// history cohort if it is dated to this release AND its primary app is that
// app. Everything else dated to this release is a general-portfolio article.
const cohortB = expansion.filter((p) => p.relatedApps?.[0] === IQ_APP);
const cohortC = expansion.filter((p) => p.relatedApps?.[0] === HISTORY_APP);
const cohortA = expansion.filter(
  (p) => p.relatedApps?.[0] !== IQ_APP && p.relatedApps?.[0] !== HISTORY_APP
);

const EXPECTED = { A: 50, B: 100, C: 100 };
const actual = { A: cohortA.length, B: cohortB.length, C: cohortC.length };

for (const key of ['A', 'B', 'C']) {
  if (actual[key] !== EXPECTED[key]) {
    fail(`cohort ${key}: expected ${EXPECTED[key]} articles, found ${actual[key]}`);
  }
}
if (expansion.length !== 250) {
  fail(`expansion total: expected 250 articles dated ${EXPANSION_DATE}, found ${expansion.length}`);
}

// ------------------------------------------------------------------- Cohort A
for (const post of cohortA) {
  if (post.hubs?.length) {
    fail(`${post.slug}: Cohort A article must not declare a hub (has ${post.hubs.join(', ')})`);
  }
}
const cohortAApps = new Set(cohortA.map((p) => p.relatedApps?.[0]));
if (cohortAApps.size < 20) {
  fail(`Cohort A covers only ${cohortAApps.size} apps; at least 20 required`);
}
const perApp = {};
for (const post of cohortA) perApp[post.relatedApps[0]] = (perApp[post.relatedApps[0]] ?? 0) + 1;
for (const [app, n] of Object.entries(perApp)) {
  if (n > 3) fail(`Cohort A gives ${app} ${n} articles; the cap is 3`);
}
const cohortACats = new Set(cohortA.map((p) => p.category));
if (cohortACats.size < 6) {
  fail(`Cohort A spans only ${cohortACats.size} categories; at least 6 required`);
}

// ------------------------------------------------------- Cohorts B and C hubs
for (const [cohort, list, allowed] of [
  ['B', cohortB, IQ_HUBS],
  ['C', cohortC, HISTORY_HUBS],
]) {
  for (const post of list) {
    if (!post.hubs?.length) {
      fail(`${post.slug}: Cohort ${cohort} article declares no hub`);
      continue;
    }
    for (const hub of post.hubs) {
      if (!allowed.has(hub)) {
        fail(`${post.slug}: hub "${hub}" does not belong to Cohort ${cohort}`);
      }
    }
  }
}

// Every hub must actually hold articles, or its page is thin.
const hubCounts = {};
for (const post of posts) for (const hub of post.hubs ?? []) hubCounts[hub] = (hubCounts[hub] ?? 0) + 1;
for (const hub of ALL_HUBS) {
  const n = hubCounts[hub] ?? 0;
  if (n === 0) fail(`hub "${hub}" holds no articles — its page would not build`);
  else if (n < 8) warn(`hub "${hub}" holds only ${n} articles`);
}

// ------------------------------------------------------- claim-safety sweeps
// Cohort B may never assert a validated IQ score or a cognitive-health outcome.
const IQ_FORBIDDEN = [
  /\bvalidated\s+IQ\b/i,
  /\bclinical(?:ly)?\s+(?:validated|approved)\b/i,
  /\bofficial\s+IQ\s+(?:score|test)\b/i,
  /\byour\s+real\s+IQ\b/i,
  /\b(?:increase|raise|boost|improve)s?\s+your\s+(?:IQ|intelligence)\b/i,
  /\bprevents?\s+(?:cognitive\s+decline|dementia|alzheimer)/i,
  /\b(?:treats?|cures?|diagnoses)\b.{0,30}\b(?:adhd|dyslexia|dementia|condition)\b/i,
  /\bscientifically\s+proven\s+to\b/i,
  /\bbiological\s+brain\s+age\b/i,
];
/**
 * These articles are *supposed* to say "practice will not raise your
 * intelligence" — refuting the claim is the honest framing the cohort requires.
 * A bare pattern match would therefore flag exactly the sentences we want, so a
 * hit only counts when the surrounding clause is not a denial.
 */
const NEGATORS =
  /\b(not|never|cannot|can't|won't|will not|does not|doesn't|do not|don't|no|none|nothing|neither|nor|without|little evidence|fails? to|myth|misconception|false|untrue|unproven|exaggerated|misleading|rather than|instead of|claims? to|promises? to|marketed as|advertised as|purports? to|criticis|debunk)/i;

function isNegated(haystack, index) {
  // Look back to the start of the sentence, and a little way forward, since a
  // denial can sit on either side of the phrase it denies.
  const start = Math.max(0, haystack.lastIndexOf('.', index) + 1);
  const clause = haystack.slice(start, index);
  const tail = haystack.slice(index, index + 60);
  return NEGATORS.test(clause) || /\bis a (myth|misconception)\b/i.test(tail);
}

for (const post of cohortB) {
  const haystack = `${post.title} ${post.description} ${post.body}`;
  for (const pattern of IQ_FORBIDDEN) {
    const rx = new RegExp(pattern.source, `${pattern.flags.replace('g', '')}g`);
    let hit;
    while ((hit = rx.exec(haystack)) !== null) {
      if (isNegated(haystack, hit.index)) continue;
      fail(`${post.slug}: forbidden cognitive/IQ claim — "${hit[0].trim()}"`);
      break;
    }
  }
}

// Naming a commercial instrument is legitimate and often necessary — an article
// explaining what a supervised assessment is cannot avoid saying which ones
// exist, and contrasting our app against one is the honest framing. What is
// forbidden is asserting equivalence: that our app is like, as good as, or
// interchangeable with a published test.
const INSTRUMENTS = 'WAIS|WISC|Stanford-Binet|Raven|Mensa|Lumosity|Cambridge Brain Sciences|BrainHQ';
const EQUIVALENCE = new RegExp(
  `(our app|this app|the app|Mental Math)[^.]{0,140}\\b(is like|similar to|equivalent to|comparable to|as accurate as|the same as|rivals|on a par with)\\b[^.]{0,100}(${INSTRUMENTS})`,
  'i'
);
for (const post of cohortB) {
  const hit = EQUIVALENCE.exec(post.body);
  if (hit) fail(`${post.slug}: claims equivalence with a commercial test — "${hit[0].slice(0, 120)}"`);
}

// Neither featured app displays a rating, and no app publishes install counts.
// A bare "1/5" is a fraction, and these articles are full of them, so the
// rating patterns below require an explicit rating word rather than inferring
// one from a slash. Likewise "2026. Reviews" is a date meeting a heading, not a
// review count, so the count patterns require the number and the noun to be
// adjacent.
const NUMERIC_SOCIAL_PROOF = [
  // `[\d,]` rather than `[\d,.]`, so the number cannot swallow a full stop and
  // pair with a noun that starts the next sentence ("…2026. Reviews were not
  // used as evidence" is a disclosure, not a review count).
  /\b\d[\d,]*(?:\.\d+)?\+?\s?(?:downloads|installs|active users|reviews|ratings)\b/i,
  /\b\d(?:\.\d)?\s*(?:out of|\/)\s*5\s*(?:star|rating)/i,
  /\b\d(?:\.\d)?[-\s]star\b/i,
  /\brated\s+\d(?:\.\d)?\s*(?:star|out of)/i,
];
for (const post of expansion) {
  for (const pattern of NUMERIC_SOCIAL_PROOF) {
    const hit = pattern.exec(post.body);
    if (hit) fail(`${post.slug}: unsupported social proof — "${hit[0].trim()}"`);
  }
}

// The two apps' unreleased local names must never reach the site.
for (const post of expansion) {
  const haystack = `${post.title} ${post.metaTitle} ${post.description} ${post.body}`;
  if (/IQ Test & Brain Training Games/i.test(haystack)) {
    fail(`${post.slug}: uses the unreleased name "IQ Test & Brain Training Games"`);
  }
  if (/World History Simulator\b/i.test(haystack)) {
    fail(`${post.slug}: uses the unreleased name "World History Simulator"`);
  }
}

// ---------------------------------------------------- structural requirements
for (const post of expansion) {
  if (post.status !== 'published') fail(`${post.slug}: status is "${post.status}"`);
  if (post.noindex) fail(`${post.slug}: published article carries noindex`);
  if (post.updatedAt !== EXPANSION_DATE) {
    warn(`${post.slug}: updatedAt ${post.updatedAt} differs from the release date`);
  }
  if (!post.sources?.length) fail(`${post.slug}: no sources`);

  // Ownership disclosure: an article promoting our own app must say so. Writers
  // phrase it naturally rather than to a template, so "is our own app" counts
  // exactly as much as naming the company does.
  const DISCLOSES =
    /Reign\s+(?:Creative|Collective)|\bour own app\b|\bour app\b|\bwe (?:build|built|make|made|develop|developed|publish)\b|\bapp we (?:build|built|make|made)\b/i;
  if (!DISCLOSES.test(post.body)) {
    fail(`${post.slug}: no ownership disclosure in the body`);
  }

  // A hand-written Play link bypasses the tracked CTA component entirely.
  if (/play\.google\.com/i.test(post.body)) {
    fail(`${post.slug}: body hand-writes a play.google.com URL`);
  }

  // Required in-body links.
  if (!/\]\(\/apps\/[a-z0-9-]+\/\)/.test(post.body)) fail(`${post.slug}: no /apps/ link in body`);
  const blogLinks = new Set(
    [...post.body.matchAll(/\]\(\/blog\/([a-z0-9-]+)\/\)/g)].map((m) => m[1])
  );
  if (blogLinks.size < 2) fail(`${post.slug}: only ${blogLinks.size} distinct /blog/ links in body`);
  for (const target of blogLinks) {
    if (!bySlug.has(target)) fail(`${post.slug}: links to /blog/${target}/ which does not exist`);
  }
  if (!/\]\(\/blog\/(?:category|topics)\/[a-z0-9-]+\/\)/.test(post.body)) {
    fail(`${post.slug}: no category or topic-hub link in body`);
  }
  // Cohorts B and C must link their own hub in prose, not only in frontmatter.
  if (post.hubs?.length) {
    const linksOwnHub = post.hubs.some((hub) => post.body.includes(`/blog/topics/${hub}/`));
    if (!linksOwnHub) fail(`${post.slug}: declares a hub but never links it in the body`);
  }
}

// ---------------------------------------------------------- orphans and depth
// An article nobody links to is reachable only from a listing page. Listings
// paginate and get crawled shallowly, so an unlinked article is a real risk.
const inbound = new Map(posts.map((p) => [p.slug, 0]));
for (const post of posts) {
  const targets = new Set([
    ...(post.relatedArticles ?? []),
    ...[...post.body.matchAll(/\]\(\/blog\/([a-z0-9-]+)\/\)/g)].map((m) => m[1]),
  ]);
  for (const target of targets) {
    if (target !== post.slug && inbound.has(target)) inbound.set(target, inbound.get(target) + 1);
  }
}
const orphans = expansion.filter((p) => inbound.get(p.slug) === 0);
if (orphans.length) {
  // Hub membership rescues an article from true orphanhood: the hub page links
  // it, and the hub is two clicks from the homepage.
  const trueOrphans = orphans.filter((p) => !p.hubs?.length);
  for (const post of trueOrphans) {
    fail(`${post.slug}: orphan — no inbound article link and no hub`);
  }
  for (const post of orphans.filter((p) => p.hubs?.length)) {
    warn(`${post.slug}: no inbound article link; reachable via its hub only`);
  }
}

// --------------------------------------------------------- exported HTML pass
if (existsSync(OUT)) {
  for (const post of expansion) {
    const page = join(OUT, 'blog', post.slug, 'index.html');
    if (!existsSync(page)) {
      fail(`${post.slug}: not exported to out/blog/${post.slug}/index.html`);
      continue;
    }
    const html = readFileSync(page, 'utf8');
    const canonical = /<link rel="canonical" href="([^"]+)"/.exec(html)?.[1];
    const ogUrl = /<meta property="og:url" content="([^"]+)"/.exec(html)?.[1];
    const want = `https://reigncreativellc.com/blog/${post.slug}/`;
    if (canonical !== want) fail(`${post.slug}: canonical is ${canonical}, expected ${want}`);
    if (ogUrl !== canonical) fail(`${post.slug}: og:url ${ogUrl} disagrees with canonical ${canonical}`);
    if (/<meta name="robots" content="[^"]*noindex/.test(html)) {
      fail(`${post.slug}: exported page carries noindex`);
    }
    if (existsSync(join(OUT, 'blog', post.slug, 'index.txt'))) {
      fail(`${post.slug}: an index.txt duplicate survived the URL normaliser`);
    }
    // Both CTAs must be present and tracked.
    const ctas = (html.match(/data-play-cta|play\.google\.com\/store\/apps\/details/g) ?? []).length;
    if (ctas < 2) warn(`${post.slug}: fewer than two Play CTAs found in the exported HTML`);
  }
}

// -------------------------------------------------------------------- report
console.log(`expansion dated ${EXPANSION_DATE}: ${expansion.length} articles`);
console.log(`  Cohort A (general portfolio) ${actual.A} / ${EXPECTED.A}`);
console.log(`  Cohort B (${IQ_APP}) ${actual.B} / ${EXPECTED.B}`);
console.log(`  Cohort C (${HISTORY_APP}) ${actual.C} / ${EXPECTED.C}`);
console.log(`  total published on the site: ${posts.filter((p) => p.status === 'published').length}`);
console.log('\nhub membership:');
for (const hub of [...ALL_HUBS].sort()) {
  console.log(`  ${String(hubCounts[hub] ?? 0).padStart(4)}  ${hub}`);
}

if (warnings.length) {
  console.log(`\n${warnings.length} warning(s):`);
  for (const w of warnings.slice(0, 40)) console.log(`  · ${w}`);
  if (warnings.length > 40) console.log(`  … and ${warnings.length - 40} more`);
}

if (errors.length) {
  console.error(`\n${errors.length} error(s):`);
  for (const e of errors.slice(0, 80)) console.error(`  ✗ ${e}`);
  if (errors.length > 80) console.error(`  … and ${errors.length - 80} more`);
  process.exit(1);
}

console.log('\nexpansion audit clean');
