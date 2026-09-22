// Near-duplicate detection across the whole corpus, aimed at the failure mode
// a 250-article release actually has: not byte-identical pages (audit-duplicate
// -content already catches those) but *template repetition* — fifty articles
// built from one skeleton with the nouns swapped.
//
// Method: 5-word shingles, Jaccard similarity, every expansion article against
// every article on the site. A pair sharing a large fraction of its five-word
// sequences is reusing sentences, which is the thing to catch.
//
// Also flags repeated openings, headings and FAQ phrasing, because those recur
// across a templated batch long before the body text does.
//
// Run: node scripts/audit-similarity-250.mjs [--threshold 0.08]

import { readFileSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const HERE = dirname(fileURLToPath(import.meta.url));
const CONTENT = join(HERE, '..', 'content', 'blog');
const RELEASE = '2026-09-22';

const argThreshold = process.argv.indexOf('--threshold');
// 0.08 is empirically well clear of the corpus: two genuinely distinct
// articles on adjacent topics land far below it, while a shared template
// pushes a pair well above.
const THRESHOLD = argThreshold > -1 ? Number(process.argv[argThreshold + 1]) : 0.08;
const SHINGLE = 5;

const normalise = (text) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9 ]+/g, ' ')
    .split(/\s+/)
    .filter(Boolean);

function shingles(words, n = SHINGLE) {
  const set = new Set();
  for (let i = 0; i + n <= words.length; i += 1) set.add(words.slice(i, i + n).join(' '));
  return set;
}

function jaccard(a, b) {
  let intersection = 0;
  const [small, large] = a.size <= b.size ? [a, b] : [b, a];
  for (const item of small) if (large.has(item)) intersection += 1;
  const union = a.size + b.size - intersection;
  return union === 0 ? 0 : intersection / union;
}

const docs = [];
for (const file of readdirSync(CONTENT).filter((f) => f.endsWith('.md'))) {
  const raw = readFileSync(join(CONTENT, file), 'utf8');
  const block = /^---\r?\n([\s\S]*?)\r?\n---\r?\n/.exec(raw);
  if (!block) continue;
  const data = JSON.parse(block[1]);
  const body = raw.slice(block[0].length);
  docs.push({
    slug: file.replace(/\.md$/, ''),
    isRelease: data.publishedAt === RELEASE,
    title: data.title,
    description: data.description,
    shingles: shingles(normalise(body)),
    // The first sentence is where a templated batch gives itself away fastest.
    opening: body.replace(/^#+.*$/gm, '').trim().split(/(?<=\.)\s/)[0]?.trim() ?? '',
    headings: [...body.matchAll(/^##+\s+(.+)$/gm)].map((m) => m[1].trim()),
    faqs: (data.faqs ?? []).map((f) => f.question.trim()),
  });
}

const release = docs.filter((d) => d.isRelease);
console.log(`similarity audit — ${release.length} expansion article(s) against ${docs.length} total`);
console.log(`method: ${SHINGLE}-word shingles, Jaccard, threshold ${THRESHOLD}\n`);

const problems = [];

// ------------------------------------------------------------ body overlap
const pairs = [];
for (const a of release) {
  for (const b of docs) {
    if (a.slug === b.slug) continue;
    // Each unordered pair once when both sides are in the release.
    if (b.isRelease && b.slug < a.slug) continue;
    const score = jaccard(a.shingles, b.shingles);
    if (score >= THRESHOLD) pairs.push({ score, a: a.slug, b: b.slug });
  }
}
pairs.sort((x, y) => y.score - x.score);
if (pairs.length) {
  problems.push(`${pairs.length} article pair(s) share ≥${THRESHOLD} of their 5-word sequences`);
  for (const p of pairs.slice(0, 25)) {
    console.log(`  ✗ ${p.score.toFixed(3)}  ${p.a}  ~  ${p.b}`);
  }
} else {
  console.log(`  body text: no pair reaches ${THRESHOLD} — no template repetition`);
}

// Report the worst pair even when clean, so the margin is visible rather than
// merely asserted.
let peak = { score: 0 };
for (const a of release) {
  for (const b of docs) {
    if (a.slug === b.slug) continue;
    const score = jaccard(a.shingles, b.shingles);
    if (score > peak.score) peak = { score, a: a.slug, b: b.slug };
  }
}
if (peak.score) {
  console.log(`  closest pair overall: ${peak.score.toFixed(3)}  ${peak.a} ~ ${peak.b}`);
}

// --------------------------------------------------- openings and headings
const countBy = (items) => {
  const map = new Map();
  for (const { key, slug } of items) {
    if (!key) continue;
    if (!map.has(key)) map.set(key, []);
    map.get(key).push(slug);
  }
  return map;
};

const openings = countBy(release.map((d) => ({ key: d.opening.toLowerCase(), slug: d.slug })));
const repeatedOpenings = [...openings].filter(([, slugs]) => slugs.length > 1);
if (repeatedOpenings.length) {
  problems.push(`${repeatedOpenings.length} opening sentence(s) reused across articles`);
  for (const [text, slugs] of repeatedOpenings.slice(0, 10)) {
    console.log(`  ✗ opening reused by ${slugs.length}: "${text.slice(0, 70)}…" — ${slugs.join(', ')}`);
  }
} else {
  console.log('  openings: all distinct');
}

const headingItems = [];
for (const d of release) for (const h of d.headings) headingItems.push({ key: h.toLowerCase(), slug: d.slug });
const headings = countBy(headingItems);
// Some repetition is legitimate ("Frequently asked questions"-style section
// names), so only flag a heading recurring across a large share of the batch.
const headingLimit = Math.max(4, Math.ceil(release.length * 0.12));
const overusedHeadings = [...headings].filter(([, slugs]) => slugs.length > headingLimit);
if (overusedHeadings.length) {
  problems.push(`${overusedHeadings.length} heading(s) reused in more than ${headingLimit} articles`);
  for (const [text, slugs] of overusedHeadings.slice(0, 12)) {
    console.log(`  ✗ heading in ${slugs.length} articles: "${text}"`);
  }
} else {
  console.log(`  headings: none reused in more than ${headingLimit} articles`);
}

const faqItems = [];
for (const d of release) for (const q of d.faqs) faqItems.push({ key: q.toLowerCase(), slug: d.slug });
const faqs = countBy(faqItems);
const repeatedFaqs = [...faqs].filter(([, slugs]) => slugs.length > 1);
if (repeatedFaqs.length) {
  problems.push(`${repeatedFaqs.length} FAQ question(s) reused verbatim`);
  for (const [text, slugs] of repeatedFaqs.slice(0, 10)) {
    console.log(`  ✗ FAQ in ${slugs.length}: "${text.slice(0, 70)}…"`);
  }
} else {
  console.log('  FAQ questions: all distinct');
}

// --------------------------------------------------------- title/meta drift
const titleWords = (t) => new Set(normalise(t));
const titlePairs = [];
for (let i = 0; i < release.length; i += 1) {
  for (let j = 0; j < docs.length; j += 1) {
    if (release[i].slug === docs[j].slug) continue;
    const overlap = jaccard(titleWords(release[i].title), titleWords(docs[j].title));
    if (overlap >= 0.85) titlePairs.push({ overlap, a: release[i].slug, b: docs[j].slug });
  }
}
if (titlePairs.length) {
  problems.push(`${titlePairs.length} title pair(s) share ≥85% of their words`);
  for (const p of titlePairs.slice(0, 10)) console.log(`  ✗ titles ${p.overlap.toFixed(2)}: ${p.a} ~ ${p.b}`);
} else {
  console.log('  titles: no pair shares 85% of its words');
}

if (problems.length) {
  console.error(`\n${problems.length} problem(s):`);
  for (const p of problems) console.error(`  · ${p}`);
  process.exit(1);
}

console.log('\nsimilarity audit clean — no near-duplicates, no template repetition');
