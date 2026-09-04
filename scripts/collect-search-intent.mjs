// Collects *observable* search-intent evidence for the topics this site covers.
//
// What this records: the suggestions Google Autocomplete returns for a seed, on
// a given date, for a given locale. That is a real, reproducible observation of
// how people phrase a query.
//
// What this does NOT record, because no source available to this repository
// provides it: monthly search volume, keyword difficulty, CPC or competition.
// Autocomplete proves phrasing and intent. It does not prove demand size, and
// nothing downstream of this file may claim that it does.
//
// Run:    node scripts/collect-search-intent.mjs
// Output: docs/data/search-intent-observations.json

import { writeFileSync, mkdirSync, readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, '..');
const OUT_DIR = join(ROOT, 'docs', 'data');
const OUT = join(OUT_DIR, 'search-intent-observations.json');
const SEEDS = join(HERE, 'search-intent-seeds.json');

const UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36';

const PROVIDER = 'Google Autocomplete (suggestqueries.google.com, client=firefox)';
const GEO = 'US';
const LANGUAGE = 'en';

async function suggest(seed) {
  const url =
    'https://suggestqueries.google.com/complete/search?client=firefox' +
    `&hl=${LANGUAGE}&gl=${GEO.toLowerCase()}&q=${encodeURIComponent(seed)}`;
  const res = await fetch(url, { headers: { 'User-Agent': UA } });
  if (!res.ok) return { seed, ok: false, status: res.status, suggestions: [] };
  const body = await res.text();
  let parsed;
  try {
    parsed = JSON.parse(body);
  } catch {
    return { seed, ok: false, status: res.status, reason: 'unparseable response', suggestions: [] };
  }
  return { seed, ok: true, status: res.status, suggestions: Array.isArray(parsed[1]) ? parsed[1] : [] };
}

const seeds = JSON.parse(readFileSync(SEEDS, 'utf8'));
const collectedAt = new Date().toISOString();
const observations = [];

for (const { cluster, seed } of seeds) {
  const result = await suggest(seed);
  observations.push({ cluster, ...result });
  console.log(
    `${result.ok ? 'OK  ' : 'FAIL'} ${String(result.suggestions.length).padStart(2)} suggestions  ${seed}`
  );
  await new Promise((r) => setTimeout(r, 250));
}

mkdirSync(OUT_DIR, { recursive: true });
const prior = existsSync(OUT) ? JSON.parse(readFileSync(OUT, 'utf8')) : null;
writeFileSync(
  OUT,
  JSON.stringify(
    {
      provider: PROVIDER,
      measures: 'query phrasing and intent only — NOT search volume, difficulty or CPC',
      geography: GEO,
      language: LANGUAGE,
      collectedAt,
      previousRun: prior?.collectedAt ?? null,
      seedCount: seeds.length,
      observations,
    },
    null,
    2
  )
);

const failed = observations.filter((o) => !o.ok);
const total = observations.reduce((n, o) => n + o.suggestions.length, 0);
console.log(`\n${observations.length - failed.length}/${observations.length} seeds returned data, ${total} suggestions total`);
if (failed.length) console.log('FAILED: ' + failed.map((f) => f.seed).join(', '));
console.log('Wrote ' + OUT);
