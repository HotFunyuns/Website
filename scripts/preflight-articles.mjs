// Editorial pre-flight for every article on disk. Runs the mechanical half of
// docs/content-review-process.md so a human review can concentrate on the half
// a script cannot do.
//
// Every rule here fires on a *claim shape*, not on a bare word — "the only cure
// for an imbalanced draft" and "diagnoses a condition" inside a disclaimer that
// says the article does not do that are both fine, and a checker that flags
// them teaches its reader to ignore it.
//
// Run: node scripts/preflight-articles.mjs [--published-only] [--context] [--only <slug>]
//
// --only <slug> checks one article — the publishing queue runs it on the
// article it is about to release — against the published corpus: per-article
// rules for that article alone, and the cross-article duplicate checks only
// where that article is one side of the pair, so an unrelated draft still in
// progress cannot block a release.

import { readFileSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { FIRST_PARTY_GUIDE } from './lib/content.mjs';

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, '..');
const CONTENT = process.env.REIGN_CONTENT_DIR || join(ROOT, 'content', 'blog');
const FRONTMATTER = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/;
const publishedOnly = process.argv.includes('--published-only');
const showContext = process.argv.includes('--context');
const onlyIndex = process.argv.indexOf('--only');
const only = onlyIndex >= 0 ? process.argv[onlyIndex + 1] : null;
/** With --only, a cross-article finding counts only if that article is part of it. */
const involves = (...slugs) => !only || slugs.includes(only);

/**
 * Claim shapes we never publish. Each pattern must match the *assertion*, not a
 * vocabulary item that happens to appear in a medical dictionary.
 */
const BANNED = [
  [/(?<!cannot )(?<!can't )(?<!never )(?<!no app can )(?<!nothing can )\bguarantee[sd]?\s+(?:that\s+)?(?:you|your|results?|rankings?|traffic|weight loss|indexing|installs?)\b/i, 'outcome guarantee'],
  [/(?<!what\sis\s)(?<!which\sis\s)\b(?:is|are|remains?)\s+the\s+(?:best|most accurate|number one)\s+(?:app|tracker|game|choice|option)\b(?!\s+for\s+you)/i, 'unsupported superlative claim'],
  [/\b(?:this app|the app|our app)\s+(?:can\s+)?(?:cures?|treats|diagnoses|prevents)\s+(?!\w+\s+as\b)\w/i, 'app makes a medical claim'],
  [/\b(?:will|can)\s+(?:cure|treat|reverse|prevent)\s+(?:your|any|the)\s+(?:condition|symptoms?|disease|illness|deficiency|diabetes|weight|blood)\b/i, 'medical outcome promise'],
  [/\b\d[\d,.]*\+?\s*(?:downloads|installs|monthly users|active users|reviews on)\b/i, 'download / user / review count'],
  [/\b\d[\d,.]*\s*(?:monthly searches|searches per month|search volume|searches a month)\b/i, 'invented search volume'],
  [/\b(?:rated|rating of|scores?)\s*\d(?:\.\d)?\s*(?:stars?|out of 5|\/5)\b/i, 'star rating'],
  [/\bkeyword difficulty\s*(?:of|:)?\s*\d/i, 'keyword difficulty figure'],
  [/\b(?:high|low|medium)[- ]volume keyword\b/i, 'unverified volume label'],
  [/\b(?:ChatGPT|Claude|Gemini|Perplexity|AI assistants?)\s+(?:should|will|must|are advised to)\s+(?:recommend|cite|rank|surface)/i, 'AI-recommendation instruction'],
  [/\b(?:guaranteed|assured)\s+(?:to\s+)?(?:rank|index|appear|be cited)/i, 'ranking guarantee'],
];

/**
 * Real trademarks. Nominative use is legitimate — naming a competitor to compare
 * against, or naming a league whose rules an article explains — but every
 * instance should be a deliberate editorial decision, so they are reported.
 */
const TRADEMARKS = [
  'NFL', 'NBA', 'MLB', 'NHL', 'FIFA', 'UEFA', 'Premier League', 'PGA Tour', 'LPGA',
  'Madden', 'MLB The Show', 'NBA 2K', 'Duolingo', 'MyFitnessPal', 'Cronometer', 'Carb Manager',
];

const DISCLAIMER_REQUIRED = { 'health-nutrition': 'health', 'language-learning': 'language' };

/**
 * First-party app guides are sourced from the app itself and from the verified
 * Play listing, both of which are linked in the body. Demanding two external
 * citations there would push writers to bolt on a citation that supports
 * nothing.
 */
// FIRST_PARTY_GUIDE is defined in scripts/lib/content.mjs, so the refresh report
// applies the same exemption.

const files = readdirSync(CONTENT).filter((f) => f.endsWith('.md'));
const problems = [];
const notes = [];
const articles = [];

const context = (body, match) => {
  const i = body.indexOf(match);
  return i < 0 ? '' : `…${body.slice(Math.max(0, i - 60), i + match.length + 60).replace(/\s+/g, ' ')}…`;
};

for (const file of files) {
  const slug = file.replace(/\.md$/, '');
  const raw = readFileSync(join(CONTENT, file), 'utf8');
  const m = FRONTMATTER.exec(raw);
  if (!m) {
    problems.push(`${slug}: no frontmatter`);
    continue;
  }
  const data = JSON.parse(m[1]);
  const body = raw.slice(m[0].length).trim();
  if (publishedOnly && data.status !== 'published') continue;
  if (only && slug !== only) {
    // Other articles take part only in the cross-article checks, and only when
    // they are public — two unreleased drafts cannot collide in public.
    if (data.status === 'published') articles.push({ slug, data, body });
    continue;
  }
  articles.push({ slug, data, body });

  const fail = (msg) => problems.push(`${slug}: ${msg}`);
  const note = (msg) => notes.push(`${slug}: ${msg}`);

  const needed = DISCLAIMER_REQUIRED[data.category];
  if (needed && data.disclaimer === 'none') fail(`category ${data.category} but disclaimer "none"`);
  if (data.disclaimer === 'comparison' && !data.researchDate) fail('comparison without researchDate');

  // `aiSearchQuestions` holds questions a *reader* might type — "What is the
  // best app for tracking protein?" is a query, not a claim the article makes.
  // Claim patterns therefore run against the body and the visible FAQ answers,
  // never against the planning question lists.
  const visibleFaq = (data.faqs ?? []).map((f) => `${f.question} ${f.answer}`).join('\n');
  const searchable = `${body}\n${visibleFaq}\n${data.title}\n${data.description}\n${(data.takeaways ?? []).join('\n')}`;
  for (const [pattern, label] of BANNED) {
    const hit = pattern.exec(searchable);
    if (hit) fail(`${label}: "${hit[0].trim()}"${showContext ? ` ${context(searchable, hit[0])}` : ''}`);
  }

  for (const tm of TRADEMARKS) {
    const re = new RegExp(`\\b${tm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`);
    if (re.test(body)) note(`names "${tm}" — confirm nominative use and disclosure`);
  }

  const h2 = (body.match(/^## /gm) || []).length;
  if (h2 < 3) fail(`only ${h2} H2 headings`);
  if (/^# /m.test(body)) fail('body contains an H1 (the template renders the H1)');

  const internal = [...body.matchAll(/\]\((\/[^)\s]*)\)/g)].map((x) => x[1]);
  if (!internal.some((l) => l.startsWith('/apps/'))) fail('body links no app page');
  const blogLinks = new Set(internal.filter((l) => l.startsWith('/blog/')));
  if (blogLinks.size < 2) fail(`body links only ${blogLinks.size} article(s), needs 2+`);
  if (!internal.some((l) => l.includes('/category/'))) fail('body links no category page');

  const minSources = FIRST_PARTY_GUIDE.test(slug) ? 0 : 2;
  if ((data.sources ?? []).length < minSources) {
    fail(`only ${(data.sources ?? []).length} source(s), needs ${minSources}`);
  }
  if ((data.faqs ?? []).length < 3) fail(`only ${(data.faqs ?? []).length} FAQ(s)`);
  if ((data.takeaways ?? []).length < 3) fail(`only ${(data.takeaways ?? []).length} takeaway(s)`);

  // Mirrors the limits src/lib/blog/index.ts enforces, so an over-length field
  // is caught here rather than at the end of a full production build.
  if (data.metaTitle.length > 60) fail(`metaTitle is ${data.metaTitle.length} chars (max 60)`);
  if (data.description.length > 160) fail(`description is ${data.description.length} chars (max 160)`);
  if (data.description.length < 70) fail(`description is ${data.description.length} chars (min 70)`);

  if (data.status === 'published' && data.noindex) fail('published but noindex');
  if (data.updatedAt < data.publishedAt) fail('updatedAt is before publishedAt');

  const words = body.split(/\s+/).length;
  if (words < 700) fail(`only ${words} words — too thin to publish`);
}

const byIntentKey = new Map();
for (const a of articles) {
  const key = `${a.data.category}::${a.data.intent}::${a.data.primaryKeyword.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim()}`;
  if (byIntentKey.has(key) && involves(a.slug, byIntentKey.get(key))) problems.push(`${a.slug}: identical intent key to ${byIntentKey.get(key)}`);
  byIntentKey.set(key, a.slug);
}

const norm = (s) => s.toLowerCase().replace(/[^a-z0-9 ]/g, '').split(/\s+/).filter(Boolean);
for (let i = 0; i < articles.length; i++) {
  for (let j = i + 1; j < articles.length; j++) {
    const a = new Set(norm(articles[i].data.title));
    const b = new Set(norm(articles[j].data.title));
    const shared = [...a].filter((w) => b.has(w)).length;
    if (shared / Math.min(a.size, b.size) >= 0.85 && involves(articles[i].slug, articles[j].slug)) {
      problems.push(`near-duplicate titles: "${articles[i].data.title}" / "${articles[j].data.title}"`);
    }
  }
}

for (const field of ['metaTitle', 'description', 'title']) {
  const seen = new Map();
  for (const a of articles) {
    const v = a.data[field].trim().toLowerCase();
    if (seen.has(v) && involves(a.slug, seen.get(v))) problems.push(`duplicate ${field}: ${a.slug} and ${seen.get(v)}`);
    seen.set(v, a.slug);
  }
}

if (only && !articles.some((a) => a.slug === only)) problems.push(`${only}: no such article`);
console.log(only ? `checked ${only} against ${articles.length - 1} published article(s)` : `checked ${articles.length} article(s)`);
if (notes.length) {
  console.log(`\n${notes.length} note(s) for human review:`);
  for (const n of notes) console.log(`  · ${n}`);
}
if (problems.length) {
  console.log(`\n${problems.length} PROBLEM(S):`);
  for (const p of problems) console.log(`  ✗ ${p}`);
  process.exit(1);
}
console.log('\npre-flight clean');
