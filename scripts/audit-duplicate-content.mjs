// Duplicate rendered-content detector for the exported `out/` directory.
//
// A canonical tag only resolves a duplicate that Google can see is a duplicate.
// The other half of the problem is two *different* URLs that render the same
// primary content, which no amount of canonical hygiene fixes. This script
// measures that directly: it takes each page's <main> region, throws away the
// shared chrome (head, header, nav, footer, scripts, styles, inline SVG), and
// compares what is left.
//
//   exact match  -> FAIL. Two URLs render byte-identical primary content.
//   near match   -> WARN. Reported with a similarity score so a human can judge;
//                   two articles on adjacent topics legitimately share phrasing,
//                   so this must not gate a deploy on its own.
//
// Similarity is an estimated Jaccard overlap of 5-word shingles via MinHash,
// which is an approximation and is labelled as one in the output.
//
// Run: node scripts/audit-duplicate-content.mjs [--threshold 0.9]

import { createHash } from 'node:crypto';
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { basename, dirname, join } from 'node:path';

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, '..');
const OUT = join(ROOT, 'out');

if (!existsSync(OUT)) {
  console.error('out/ not found — run `npm run build` first.');
  process.exit(1);
}

const thresholdArg = process.argv.indexOf('--threshold');
const NEAR = thresholdArg > -1 ? Number(process.argv[thresholdArg + 1]) : 0.9;
const SHINGLE = 5;
const SIGNATURE = 96;
const MIN_WORDS = 120; // below this a page is mostly chrome and near-match scores are noise

function walk(dir) {
  const found = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) found.push(...walk(full));
    else if (full.endsWith('.html')) found.push(full);
  }
  return found;
}

const rel = (f) => f.slice(OUT.length + 1).split('\\').join('/');
const routeOf = (f) => (basename(f) === 'index.html' ? `/${rel(f).replace(/index\.html$/, '')}` : `/${rel(f)}`);

/** The page's own content, with everything the whole site shares removed. */
function primaryContent(doc) {
  const main = /<main\b[^>]*>([\s\S]*?)<\/main>/i.exec(doc);
  let body = main ? main[1] : doc.replace(/[\s\S]*<body\b[^>]*>/i, '').replace(/<\/body>[\s\S]*/i, '');

  body = body
    .replace(/<script\b[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style\b[\s\S]*?<\/style>/gi, ' ')
    .replace(/<noscript\b[\s\S]*?<\/noscript>/gi, ' ')
    .replace(/<svg\b[\s\S]*?<\/svg>/gi, ' ')
    .replace(/<template\b[\s\S]*?<\/template>/gi, ' ')
    .replace(/<!--[\s\S]*?-->/g, ' ')
    // Site-wide navigation that happens to sit inside <main> (breadcrumbs,
    // "more articles", category rails) is chrome, not this page's content.
    .replace(/<nav\b[\s\S]*?<\/nav>/gi, ' ')
    .replace(/<[^>]+>/g, ' ');

  return body
    .replace(/&(?:nbsp|#160);/g, ' ')
    .replace(/&(?:amp|#38);/g, '&')
    .replace(/&(?:lt|#60);/g, '<')
    .replace(/&(?:gt|#62);/g, '>')
    .replace(/&(?:quot|#34);/g, '"')
    .replace(/&(?:#39|apos|#x27);/g, "'")
    .replace(/&[a-z]+;|&#x?[0-9a-f]+;/gi, ' ')
    .toLowerCase()
    .replace(/[^a-z0-9\s]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function hash32(str, seed) {
  // FNV-1a with a per-permutation seed. Cheap, dependency-free, good enough for
  // a similarity estimate — it is not used for anything security-sensitive.
  let h = (2166136261 ^ seed) >>> 0;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619) >>> 0;
  }
  return h >>> 0;
}

function signature(words) {
  const sig = new Uint32Array(SIGNATURE).fill(0xffffffff);
  if (words.length < SHINGLE) return sig;
  for (let i = 0; i + SHINGLE <= words.length; i++) {
    const shingle = words.slice(i, i + SHINGLE).join(' ');
    for (let s = 0; s < SIGNATURE; s++) {
      const h = hash32(shingle, s);
      if (h < sig[s]) sig[s] = h;
    }
  }
  return sig;
}

function estimateJaccard(a, b) {
  let same = 0;
  for (let i = 0; i < SIGNATURE; i++) if (a[i] === b[i]) same++;
  return same / SIGNATURE;
}

/* ------------------------------------------------------------- measurement */

const pages = [];
for (const file of walk(OUT)) {
  const text = primaryContent(readFileSync(file, 'utf8'));
  const words = text ? text.split(' ') : [];
  pages.push({
    route: routeOf(file),
    words: words.length,
    digest: createHash('sha256').update(text).digest('hex'),
    sig: words.length >= MIN_WORDS ? signature(words) : null,
  });
}

const problems = [];
const warnings = [];

/* --------------------------------------------------------- exact duplicates */

const byDigest = new Map();
for (const page of pages) {
  if (!byDigest.has(page.digest)) byDigest.set(page.digest, []);
  byDigest.get(page.digest).push(page);
}
for (const group of byDigest.values()) {
  if (group.length < 2) continue;
  problems.push(
    `${group.length} URLs render identical primary content (${group[0].words} words): ` +
      group.map((p) => p.route).join(', ')
  );
}

/* ---------------------------------------------------------- near duplicates */

const comparable = pages.filter((p) => p.sig);
for (let i = 0; i < comparable.length; i++) {
  for (let j = i + 1; j < comparable.length; j++) {
    if (comparable[i].digest === comparable[j].digest) continue; // already an exact failure
    const score = estimateJaccard(comparable[i].sig, comparable[j].sig);
    if (score >= NEAR) {
      warnings.push(`~${(score * 100).toFixed(0)}% similar: ${comparable[i].route}  <->  ${comparable[j].route}`);
    }
  }
}

/* ---------------------------------------------------------------- reporting */

const thin = pages.filter((p) => p.words < MIN_WORDS).sort((a, b) => a.words - b.words);
console.log(`pages compared: ${pages.length}   distinct primary-content hashes: ${byDigest.size}`);
console.log(`near-duplicate threshold: ${NEAR} (estimated Jaccard over ${SHINGLE}-word shingles, MinHash k=${SIGNATURE})`);
console.log(`pages under ${MIN_WORDS} words of primary content (excluded from near-match): ${thin.length}`);
for (const p of thin.slice(0, 10)) console.log(`  ${p.words.toString().padStart(4)} words  ${p.route}`);

if (warnings.length) {
  console.log(`\n${warnings.length} NEAR-DUPLICATE PAIR(S) — review, not a failure:`);
  for (const w of warnings.slice(0, 25)) console.log(`  ! ${w}`);
  if (warnings.length > 25) console.log(`  … and ${warnings.length - 25} more`);
}

if (problems.length) {
  console.log(`\n${problems.length} PROBLEM(S):`);
  for (const p of problems) console.log(`  ✗ ${p}`);
  process.exit(1);
}
console.log('\nno exact duplicate primary content');
