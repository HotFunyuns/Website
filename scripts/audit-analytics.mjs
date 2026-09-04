// Checks the measurement layer in the exported site: that every Google Play CTA
// is a tracked, accessible link with correct install-referrer attribution, and
// that exactly one GA4 property is configured.
//
// The single-fire property is structural rather than observable from HTML: every
// Play link is rendered by PlayStoreLink, which attaches one onClick that calls
// trackPlayStoreClick once and never calls preventDefault. This script asserts
// the structural precondition — that no Play link bypasses that component.
//
// Run: node scripts/audit-analytics.mjs

import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, '..');
const OUT = join(ROOT, 'out');
const EXPECTED_GA = 'G-JK8FPQB5L2';

if (!existsSync(OUT)) {
  console.error('out/ not found — run `npm run build` first.');
  process.exit(1);
}

function walk(dir, ext) {
  const found = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) found.push(...walk(full, ext));
    else if (full.endsWith(ext)) found.push(full);
  }
  return found;
}

const problems = [];
const fail = (m) => problems.push(m);

let links = 0;
let accessible = 0;
let withReferrer = 0;
const measurementIds = new Set();

for (const file of walk(OUT, '.html')) {
  const route = file.slice(OUT.length + 1).split('\\').join('/');
  const doc = readFileSync(file, 'utf8');

  for (const m of doc.matchAll(/<a\b[^>]*href="(https:\/\/play\.google\.com[^"]*)"[^>]*>/g)) {
    links++;
    const tag = m[0];
    const url = m[1].replace(/&amp;/g, '&');

    // PlayStoreLink is the only component that renders a Play link, and it
    // always emits these two attributes. Their absence means something else
    // rendered the link and the click is therefore untracked.
    if (/target="_blank"/.test(tag) && /rel="noopener noreferrer"/.test(tag)) accessible++;
    else fail(`${route}: Play link not rendered by PlayStoreLink — ${tag.slice(0, 110)}`);

    // Two legitimate shapes: an app listing, and the studio's own developer page.
    const isListing = /^https:\/\/play\.google\.com\/store\/apps\/details\?id=/.test(url);
    const isDeveloperPage = url.startsWith('https://play.google.com/store/apps/developer?id=');
    if (!isListing && !isDeveloperPage) fail(`${route}: unexpected Play URL shape — ${url}`);

    const referrer = new URL(url).searchParams.get('referrer');
    if (referrer) {
      withReferrer++;
      const params = new URLSearchParams(referrer);
      if (params.get('utm_source') !== 'reigncreative_blog') fail(`${route}: wrong utm_source`);
      if (params.get('utm_medium') !== 'organic_content') fail(`${route}: wrong utm_medium`);
      if (!params.get('utm_campaign')) fail(`${route}: missing utm_campaign`);
      if (!params.get('utm_content')) fail(`${route}: missing utm_content`);
      for (const [, value] of params) {
        if (/@|\+\d{7,}|user|email/i.test(value)) fail(`${route}: referrer may carry identifying data`);
      }
    }
  }

  for (const id of doc.matchAll(/\bG-[A-Z0-9]{8,}\b/g)) measurementIds.add(id[0]);
}

for (const file of walk(join(ROOT, 'src'), '.ts').concat(walk(join(ROOT, 'src'), '.tsx'))) {
  for (const id of readFileSync(file, 'utf8').matchAll(/\bG-[A-Z0-9]{8,}\b/g)) measurementIds.add(id[0]);
}

if (measurementIds.size !== 1 || !measurementIds.has(EXPECTED_GA)) {
  fail(`expected exactly one GA4 property (${EXPECTED_GA}), found: ${[...measurementIds].join(', ') || 'none'}`);
}

// A second gtag/analytics loader would double-count everything.
const loaders = walk(OUT, '.html').filter((f) =>
  /googletagmanager\.com\/gtag\/js|gtm\.js|analytics\.js/.test(readFileSync(f, 'utf8'))
);
if (loaders.length > 0) {
  fail(`${loaders.length} page(s) hard-code an analytics loader; it should be injected at runtime only`);
}

console.log(`Google Play CTAs: ${links}`);
console.log(`  rendered by the tracked component: ${accessible}`);
console.log(`  carrying install-referrer attribution: ${withReferrer}`);
console.log(`GA4 property: ${[...measurementIds].join(', ')}`);

if (problems.length) {
  console.log(`\n${problems.length} PROBLEM(S):`);
  for (const p of problems.slice(0, 20)) console.log(`  ✗ ${p}`);
  if (problems.length > 20) console.log(`  … and ${problems.length - 20} more`);
  process.exit(1);
}
console.log('\nanalytics audit clean');
