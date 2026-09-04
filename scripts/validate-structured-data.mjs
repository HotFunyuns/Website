// Parses every JSON-LD block in the exported site and checks it against the
// shape Schema.org and Google's structured-data documentation require, plus the
// house rule that we never mark up something a visitor cannot see.
//
// This is a syntax and completeness check, not a substitute for Google's Rich
// Results Test — which needs a live URL and is run separately after deploy.
//
// Run: node scripts/validate-structured-data.mjs

import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const HERE = dirname(fileURLToPath(import.meta.url));
const OUT = join(HERE, '..', 'out');
const SITE = 'https://reigncreativellc.com';

if (!existsSync(OUT)) {
  console.error('out/ not found — run `npm run build` first.');
  process.exit(1);
}

function walk(dir) {
  const found = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) found.push(...walk(full));
    else if (full.endsWith('.html')) found.push(full);
  }
  return found;
}

const problems = [];
const counts = {};
const fail = (m) => problems.push(m);

/** Fields we will not publish, because we have no verified source for them. */
const FORBIDDEN_FIELDS = ['aggregateRating', 'review', 'ratingValue', 'reviewCount', 'award'];

const REQUIRED = {
  Organization: ['name', 'url'],
  WebSite: ['name', 'url'],
  SoftwareApplication: ['name', 'applicationCategory', 'operatingSystem', 'url'],
  BlogPosting: ['headline', 'datePublished', 'author', 'publisher', 'mainEntityOfPage'],
  BreadcrumbList: ['itemListElement'],
  FAQPage: ['mainEntity'],
};

for (const file of walk(OUT)) {
  const route = `/${file.slice(OUT.length + 1).split('\\').join('/').replace(/index\.html$/, '')}`;
  const doc = readFileSync(file, 'utf8');

  // Compare against what a reader actually sees: strip scripts and tags, then
  // decode the entities the renderer emitted, so a curly apostrophe in a
  // question still matches the same apostrophe in the rendered answer.
  const decode = (t) =>
    t
      .replace(/&#x27;|&apos;|&#39;/g, "'")
      .replace(/&quot;|&#34;/g, '"')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&nbsp;|&#160;/g, ' ')
      .replace(/&#x2019;/g, '’')
      .replace(/\s+/g, ' ');
  const visibleText = decode(doc.replace(/<script[\s\S]*?<\/script>/g, '').replace(/<[^>]+>/g, ' '));

  // Every URL the page links in its visible body or Sources list. A citation in
  // the schema is only legitimate if the reader can see and follow it too.
  const visibleHrefs = new Set([...doc.matchAll(/href="(https?:\/\/[^"]+)"/g)].map((m) => decode(m[1])));

  for (const m of doc.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)) {
    let data;
    try {
      data = JSON.parse(m[1].replace(/\\u003c/g, '<'));
    } catch (error) {
      fail(`${route}: unparseable JSON-LD — ${error.message}`);
      continue;
    }

    const type = data['@type'];
    counts[type] = (counts[type] ?? 0) + 1;

    if (!data['@context'] && !data['@id']) fail(`${route}: ${type} has no @context`);

    for (const field of REQUIRED[type] ?? []) {
      if (data[field] === undefined) fail(`${route}: ${type} missing required "${field}"`);
    }

    const serialised = JSON.stringify(data);
    for (const field of FORBIDDEN_FIELDS) {
      if (serialised.includes(`"${field}"`)) fail(`${route}: ${type} contains forbidden field "${field}"`);
    }

    // Our own URLs must be canonical and absolute.
    for (const url of serialised.match(/"https:\/\/reigncreativellc\.com[^"]*"/g) ?? []) {
      if (!/^"https:\/\/reigncreativellc\.com(\/[^"]*)?"$/.test(url)) {
        fail(`${route}: ${type} has a malformed site URL ${url}`);
      }
    }

    // A citation must be a source the reader can see and click. This is the
    // structured-data half of the rule that we never mark up something that is
    // not on the page.
    if (type === 'BlogPosting') {
      for (const citation of data.citation ?? []) {
        if (!visibleHrefs.has(citation.url)) {
          fail(`${route}: cites ${citation.url} in schema but does not link it on the page`);
        }
      }
      if (data.dateModified && data.datePublished && data.dateModified < data.datePublished) {
        fail(`${route}: dateModified precedes datePublished`);
      }
    }

    if (type === 'SoftwareApplication') {
      if (data.installUrl && !data.installUrl.startsWith('https://play.google.com/store/apps/')) {
        fail(`${route}: SoftwareApplication installUrl is not a Google Play listing`);
      }
      if (data.offers && data.offers.price !== '0') {
        fail(`${route}: SoftwareApplication declares a price we have not verified`);
      }
    }

    // The house rule: structured data describes what is on the page.
    if (type === 'FAQPage') {
      for (const q of data.mainEntity ?? []) {
        const needle = decode(q.name).slice(0, 30);
        if (!visibleText.includes(needle)) {
          fail(`${route}: FAQ question not visible on the page — "${decode(q.name).slice(0, 60)}"`);
        }
      }
    }
    if (type === 'BreadcrumbList') {
      for (const item of data.itemListElement ?? []) {
        if (!item.name) fail(`${route}: BreadcrumbList item without a name`);
      }
    }
  }
}

console.log('JSON-LD types found:');
for (const [type, n] of Object.entries(counts).sort((a, b) => b[1] - a[1])) {
  console.log(`  ${String(n).padStart(4)}  ${type}`);
}

if (problems.length) {
  console.log(`\n${problems.length} PROBLEM(S):`);
  for (const p of problems.slice(0, 40)) console.log(`  ✗ ${p}`);
  if (problems.length > 40) console.log(`  … and ${problems.length - 40} more`);
  process.exit(1);
}
console.log('\nstructured data valid');
