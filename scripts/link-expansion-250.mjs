// Makes the expansion's internal linking reciprocal.
//
// The problem this solves: a freshly written article links *outward* to
// established pages, but nothing links *back* to it. It is then reachable only
// from paginated listings — which is how a new article gets crawled late, or
// not at all. Authored body links are already in place (every article links two
// or more others in prose); what is missing is the return path.
//
// The fix is deliberately mechanical and low-risk: `relatedArticles` is a list
// the template renders as a card grid, so adding a slug there creates a real
// rendered link without touching a sentence anyone wrote. Body prose is left
// exactly as authored — automated anchor-text insertion is how you get
// unnatural over-linking, which is the thing the brief forbids.
//
// Pairing preference, most relevant first:
//   1. another expansion article about the same app AND in the same hub
//   2. another expansion article about the same app
//   3. an established article about the same app
//   4. another expansion article in the same category
//
// Run: node scripts/link-expansion-250.mjs [--dry]

import { readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const HERE = dirname(fileURLToPath(import.meta.url));
const CONTENT = join(HERE, '..', 'content', 'blog');
const RELEASE = '2026-09-22';
const DRY = process.argv.includes('--dry');
const TARGET_INBOUND = 2;
const MAX_RELATED = 6; // the article template renders at most six

const posts = [];
for (const file of readdirSync(CONTENT).filter((f) => f.endsWith('.md'))) {
  const raw = readFileSync(join(CONTENT, file), 'utf8');
  const block = /^---\r?\n([\s\S]*?)\r?\n---\r?\n/.exec(raw);
  if (!block) continue;
  posts.push({
    slug: file.replace(/\.md$/, ''),
    file: join(CONTENT, file),
    data: JSON.parse(block[1]),
    body: raw.slice(block[0].length),
  });
}

const bySlug = new Map(posts.map((p) => [p.slug, p]));
const isRelease = (p) => p.data.publishedAt === RELEASE;
const appOf = (p) => p.data.relatedApps?.[0];
const hubsOf = (p) => new Set(p.data.hubs ?? []);

/** Inbound edges from frontmatter picks and from authored body links. */
function buildInbound() {
  const inbound = new Map(posts.map((p) => [p.slug, new Set()]));
  for (const p of posts) {
    const targets = new Set([
      ...(p.data.relatedArticles ?? []),
      ...[...p.body.matchAll(/\]\(\/blog\/([a-z0-9-]+)\/\)/g)].map((m) => m[1]),
    ]);
    for (const t of targets) {
      if (t !== p.slug && inbound.has(t)) inbound.get(t).add(p.slug);
    }
  }
  return inbound;
}

let inbound = buildInbound();
const release = posts.filter(isRelease);
const before = release.filter((p) => inbound.get(p.slug).size === 0).length;

console.log(`${release.length} expansion article(s); ${before} with no inbound link`);

const added = new Map(); // slug -> slugs appended to its relatedArticles

function candidatesFor(target) {
  const app = appOf(target);
  const hubs = hubsOf(target);
  const sameHubSameApp = [];
  const sameApp = [];
  const establishedSameApp = [];
  const sameCategory = [];

  for (const p of posts) {
    if (p.slug === target.slug) continue;
    if ((p.data.relatedArticles ?? []).includes(target.slug)) continue;
    // Never exceed what the template will actually render.
    if ((p.data.relatedArticles?.length ?? 0) + (added.get(p.slug)?.length ?? 0) >= MAX_RELATED) {
      continue;
    }
    const shareHub = [...hubsOf(p)].some((h) => hubs.has(h));
    if (isRelease(p) && appOf(p) === app && shareHub) sameHubSameApp.push(p);
    else if (isRelease(p) && appOf(p) === app) sameApp.push(p);
    else if (!isRelease(p) && (p.data.relatedApps ?? []).includes(app)) establishedSameApp.push(p);
    else if (isRelease(p) && p.data.category === target.data.category) sameCategory.push(p);
  }
  return [...sameHubSameApp, ...sameApp, ...establishedSameApp, ...sameCategory];
}

// Process the most isolated articles first so scarce link slots go where they
// are needed, rather than to whichever article happens to sort first.
const queue = [...release].sort(
  (a, b) => inbound.get(a.slug).size - inbound.get(b.slug).size || a.slug.localeCompare(b.slug)
);

for (const target of queue) {
  let have = inbound.get(target.slug).size;
  if (have >= TARGET_INBOUND) continue;
  for (const source of candidatesFor(target)) {
    if (have >= TARGET_INBOUND) break;
    if (!added.has(source.slug)) added.set(source.slug, []);
    added.get(source.slug).push(target.slug);
    inbound.get(target.slug).add(source.slug);
    have += 1;
  }
  if (have < TARGET_INBOUND) {
    console.warn(`  ! ${target.slug}: only ${have} inbound link(s) after pairing`);
  }
}

if (added.size === 0) {
  console.log('nothing to add — every expansion article already has inbound links');
  process.exit(0);
}

let written = 0;
for (const [slug, extras] of added) {
  const post = bySlug.get(slug);
  const data = post.data;
  const merged = [...new Set([...(data.relatedArticles ?? []), ...extras])].slice(0, MAX_RELATED);
  if (merged.length === (data.relatedArticles ?? []).length) continue;

  // Rebuild the object in its original key order so the diff shows only the
  // relatedArticles line changing.
  const rebuilt = {};
  for (const [k, v] of Object.entries(data)) rebuilt[k] = k === 'relatedArticles' ? merged : v;
  if (!('relatedArticles' in rebuilt)) rebuilt.relatedArticles = merged;

  if (!DRY) {
    writeFileSync(post.file, `---\n${JSON.stringify(rebuilt, null, 2)}\n---\n${post.body}`);
  }
  written += 1;
}

// Re-read from disk so the reported figure reflects what was actually written.
if (!DRY) {
  for (const p of posts) {
    const raw = readFileSync(p.file, 'utf8');
    const block = /^---\r?\n([\s\S]*?)\r?\n---\r?\n/.exec(raw);
    p.data = JSON.parse(block[1]);
    p.body = raw.slice(block[0].length);
  }
  inbound = buildInbound();
}

const after = release.filter((p) => inbound.get(p.slug).size === 0).length;
const thin = release.filter((p) => inbound.get(p.slug).size === 1).length;

console.log(`${DRY ? '[dry run] would update' : 'updated'} ${written} article(s)`);
console.log(`expansion articles with no inbound link: ${before} → ${after}`);
console.log(`expansion articles with exactly one inbound link: ${thin}`);
