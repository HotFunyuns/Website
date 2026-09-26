// Entity-consistency audit of the exported site: one company, two names, and
// every app called what Google Play calls it.
//
// Reign Creative LLC is the legal name; Reign Collective Apps is the Google Play
// developer name. Both are legitimate and both appear on the site — the rule is
// that nothing else does, that every page that names the relationship states it
// the same way, and that structured data says exactly what the pages say.
//
// Checks, against out/ (visible text, titles, meta tags and JSON-LD):
//   - no stray variants of the company name (legacy byline, misspellings,
//     "Reign Collective" without "Apps", "Reign Creative, LLC", …);
//   - unreleased app names never appear (see featured-app notes in docs/);
//   - the Organization node names both, links the site root, and lists only
//     verified profiles in sameAs;
//   - every app page's H1, SoftwareApplication name and Play package match the
//     catalog, and every Play link on the site points at a catalog package or
//     the developer page — spelled exactly one way;
//   - every BlogPosting author is a registry name, and no Person node exists
//     without an approved registry entry.
//
// Run after `npm run build`:  node scripts/audit-entities.mjs

import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { OUT_DIR, ROOT, SITE, loadSiteData } from './lib/content.mjs';

if (!existsSync(OUT_DIR)) {
  console.error('out/ not found — run `npm run build` first.');
  process.exit(1);
}

const LEGAL = 'Reign Creative LLC';
const DEVELOPER = 'Reign Collective Apps';
const DEVELOPER_PAGE = 'https://play.google.com/store/apps/developer?id=Reign+Collective+Apps';
const VERIFIED_SAME_AS = new Set([DEVELOPER_PAGE]);

/** Spellings that must never ship. Each is a second name for one entity. */
const VARIANTS = [
  [/Reign Creative Team/, 'legacy byline "Reign Creative Team"'],
  [/Reign Creative Editorial/, 'invented "Reign Creative Editorial" name'],
  [/Reign Creatives\b/, '"Reign Creatives"'],
  [/Reign Creative,\s*LLC/, '"Reign Creative, LLC"'],
  [/Reign Creative L\.L\.C/, '"Reign Creative L.L.C."'],
  [/Reign Creative Apps\b/, '"Reign Creative Apps" (mixes the two names)'],
  [/Reign Collective LLC/, '"Reign Collective LLC" (mixes the two names)'],
  [/Reign Collective(?! Apps)/, '"Reign Collective" without "Apps"'],
  [/ReignCreative(?!Support@)/, '"ReignCreative" run together'],
];
const UNRELEASED = ['IQ Test & Brain Training Games', 'IQ Test &amp; Brain Training Games', 'World History Simulator'];

const { apps } = loadSiteData();
const packages = new Map(apps.map((a) => [a.packageId, a]));
const authorsTs = readFileSync(join(ROOT, 'src', 'data', 'authors.ts'), 'utf8');

function walk(dir) {
  const found = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) found.push(...walk(full));
    else if (full.endsWith('.html') || full.endsWith('.txt') || full.endsWith('.xml')) found.push(full);
  }
  return found;
}
const decode = (t) =>
  t
    .replace(/&#x27;|&apos;|&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&');

const problems = [];
const fail = (m) => problems.push(m);
const counts = { legal: 0, developer: 0, short: 0, pages: 0, playLinks: 0 };

for (const file of walk(OUT_DIR)) {
  const route = `/${file.slice(OUT_DIR.length + 1).split('\\').join('/').replace(/index\.html$/, '')}`;
  const raw = readFileSync(file, 'utf8');
  // Visible text and attributes, without the framework's script payloads —
  // those repeat the page's props and would double-count every string.
  const doc = file.endsWith('.html') ? raw.replace(/<script(?! type="application\/ld\+json")[\s\S]*?<\/script>/g, '') : raw;
  const text = decode(doc);
  counts.pages++;

  for (const [pattern, label] of VARIANTS) {
    const hit = pattern.exec(text);
    if (hit) fail(`${route}: ${label} — "…${text.slice(Math.max(0, hit.index - 40), hit.index + 40).replace(/\s+/g, ' ')}…"`);
  }
  for (const name of UNRELEASED) if (doc.includes(name)) fail(`${route}: unreleased app name "${decode(name)}"`);
  counts.legal += (text.match(/Reign Creative LLC/g) ?? []).length;
  counts.developer += (text.match(/Reign Collective Apps/g) ?? []).length;
  counts.short += (text.match(/Reign Creative(?! LLC)/g) ?? []).length;

  if (!file.endsWith('.html')) continue;

  /* ------------------------------------------------------ Google Play links */
  for (const m of doc.matchAll(/href="(https:\/\/play\.google\.com\/[^"]*)"/g)) {
    counts.playLinks++;
    const url = new URL(decode(m[1]));
    if (url.pathname === '/store/apps/developer') {
      if (`${url.origin}${url.pathname}?id=${url.searchParams.get('id')?.replace(/ /g, '+')}` !== DEVELOPER_PAGE) {
        fail(`${route}: developer page link ${url.href} ≠ ${DEVELOPER_PAGE}`);
      }
    } else if (url.pathname === '/store/apps/details') {
      if (!packages.has(url.searchParams.get('id'))) fail(`${route}: Play link to unknown package ${url.searchParams.get('id')}`);
    } else {
      fail(`${route}: unexpected Play URL ${url.href}`);
    }
  }

  /* ------------------------------------------------------------- JSON-LD */
  const blocks = [...raw.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].map((m) =>
    JSON.parse(m[1].replace(/\\u003c/g, '<'))
  );
  for (const block of blocks) {
    if (block['@type'] === 'Organization') {
      if (block.name !== LEGAL) fail(`${route}: Organization.name "${block.name}"`);
      if (block.alternateName !== DEVELOPER) fail(`${route}: Organization.alternateName "${block.alternateName}"`);
      if (block.url !== `${SITE}/`) fail(`${route}: Organization.url ${block.url}`);
      for (const same of block.sameAs ?? []) if (!VERIFIED_SAME_AS.has(same)) fail(`${route}: unverified sameAs ${same}`);
      const logo = typeof block.logo === 'string' ? block.logo : block.logo?.url;
      if (!logo?.startsWith(`${SITE}/`) || !existsSync(join(OUT_DIR, logo.slice(SITE.length + 1)))) {
        fail(`${route}: Organization.logo ${logo} is not a file this site serves`);
      }
    }
    if (block['@type'] === 'SoftwareApplication') {
      const app = apps.find((a) => `${SITE}/apps/${a.slug}/` === block.url);
      if (!app) fail(`${route}: SoftwareApplication for unknown URL ${block.url}`);
      else {
        if (block.name !== app.name) fail(`${route}: SoftwareApplication.name "${block.name}" ≠ catalog "${app.name}"`);
        if (!block.installUrl?.includes(`id=${app.packageId}`)) fail(`${route}: installUrl is not ${app.packageId}`);
        const h1 = decode(/<h1\b[^>]*>([\s\S]*?)<\/h1>/.exec(doc)?.[1]?.replace(/<[^>]*>/g, '').trim() ?? '');
        if (h1 !== app.name) fail(`${route}: H1 "${h1}" ≠ catalog name "${app.name}"`);
      }
      if (block.publisher?.['@id'] !== `${SITE}/#organization`) fail(`${route}: SoftwareApplication.publisher is not the Organization`);
    }
    if (block['@type'] === 'BlogPosting') {
      if (block.author?.name !== LEGAL && !authorsTs.includes(`name: '${block.author?.name}'`)) {
        fail(`${route}: BlogPosting.author "${block.author?.name}" is not a registry name`);
      }
      if (block.publisher?.['@id'] !== `${SITE}/#organization`) fail(`${route}: BlogPosting.publisher is not the Organization`);
    }
    const json = JSON.stringify(block);
    if (/"@type":"Person"/.test(json) && !/kind: 'person'/.test(authorsTs)) {
      fail(`${route}: a Person node exists but src/data/authors.ts approves no person`);
    }
  }
}

console.log(`entities: ${counts.pages} files — "${LEGAL}" ×${counts.legal}, "${DEVELOPER}" ×${counts.developer}, short "Reign Creative" ×${counts.short}, ${counts.playLinks} Google Play links`);
if (problems.length) {
  console.log(`\n${problems.length} PROBLEM(S):`);
  for (const p of problems.slice(0, 40)) console.log(`  ✗ ${p}`);
  if (problems.length > 40) console.log(`  … and ${problems.length - 40} more`);
  process.exit(1);
}
console.log('entity naming consistent');
