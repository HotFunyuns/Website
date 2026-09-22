// Collects *observable* search-intent evidence for the 250-article expansion.
//
// What this records: the suggestions Google Autocomplete returns for a seed, on
// a given date, for a given locale. That is a real, reproducible observation of
// how people phrase a query.
//
// What this does NOT record, because no source available to this environment
// provides it: monthly search volume, keyword difficulty, CPC or competition.
// Autocomplete proves phrasing. It does not prove demand size, and nothing
// downstream of this file may claim that it does.
//
// Run:    node collect-search-intent-250.mjs
// Output: search-intent-observations-250.json

import { readFileSync, writeFileSync } from 'node:fs';

const SEEDS_FILE = 'search-intent-seeds-250.json';
const OUT = 'search-intent-observations-250.json';

const UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36';

const PROVIDER = 'Google Autocomplete (suggestqueries.google.com/complete/search, client=firefox)';
const GEO = 'US';
const LANGUAGE = 'en';
const OBSERVED_DATE = '2026-09-21';

const urlFor = (q) =>
  'https://suggestqueries.google.com/complete/search?client=firefox' +
  `&hl=${LANGUAGE}&gl=${GEO.toLowerCase()}&q=${encodeURIComponent(q)}`;

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
// Politeness: 250-400ms between requests, jittered.
const politeDelay = () => 250 + Math.floor(Math.random() * 150);

async function suggestOnce(query) {
  const url = urlFor(query);
  try {
    const res = await fetch(url, { headers: { 'User-Agent': UA } });
    if (!res.ok) return { ok: false, status: res.status, reason: `HTTP ${res.status}`, suggestions: [], url };
    const body = await res.text();
    let parsed;
    try {
      parsed = JSON.parse(body);
    } catch {
      return { ok: false, status: res.status, reason: 'unparseable response', suggestions: [], url };
    }
    return { ok: true, status: res.status, suggestions: Array.isArray(parsed[1]) ? parsed[1] : [], url };
  } catch (e) {
    return { ok: false, status: 0, reason: String(e.message || e), suggestions: [], url };
  }
}

// One retry per failed query, as specified.
async function suggest(query) {
  let r = await suggestOnce(query);
  if (!r.ok) {
    await sleep(900);
    const retry = await suggestOnce(query);
    return { ...retry, retried: true, firstAttempt: { status: r.status, reason: r.reason } };
  }
  return { ...r, retried: false };
}

const cfg = JSON.parse(readFileSync(SEEDS_FILE, 'utf8'));
const queries = [];

for (const s of cfg.baseSeeds) {
  queries.push({ cluster: s.cluster, group: s.group, seed: s.seed, query: s.seed, queryType: 'base' });
}
for (const h of cfg.headTerms) {
  for (const letter of cfg.expansionSuffixes.alphabet) {
    queries.push({ cluster: h.cluster, group: h.group, seed: h.seed, query: `${h.seed} ${letter}`, queryType: 'alphabet' });
  }
  for (const mod of cfg.expansionSuffixes.modifiers) {
    queries.push({ cluster: h.cluster, group: h.group, seed: h.seed, query: `${h.seed} ${mod}`, queryType: 'modifier' });
  }
}

console.log(`Planned queries: ${queries.length} (base ${cfg.baseSeeds.length}, expansion ${queries.length - cfg.baseSeeds.length})`);

const observations = [];
let done = 0;
for (const q of queries) {
  const r = await suggest(q.query);
  observations.push({
    cluster: q.cluster,
    group: q.group,
    seed: q.seed,
    query: q.query,
    queryType: q.queryType,
    providerUrl: r.url,
    geo: GEO,
    lang: LANGUAGE,
    observedDate: OBSERVED_DATE,
    ok: r.ok,
    status: r.status,
    retried: r.retried,
    reason: r.reason ?? null,
    suggestions: r.suggestions,
    volume: 'unknown',
    difficulty: 'unknown',
    cpc: 'unknown',
  });
  done += 1;
  if (done % 25 === 0 || !r.ok) {
    const total = observations.reduce((n, o) => n + o.suggestions.length, 0);
    console.log(`${done}/${queries.length}  suggestions=${total}  last=${r.ok ? 'OK' : 'FAIL ' + r.reason}  "${q.query}"`);
  }
  await sleep(politeDelay());
}

const failed = observations.filter((o) => !o.ok);
const totalSuggestions = observations.reduce((n, o) => n + o.suggestions.length, 0);

writeFileSync(
  OUT,
  JSON.stringify(
    {
      provider: PROVIDER,
      measures: 'query phrasing only — NOT search volume, difficulty, CPC or competition',
      geography: GEO,
      language: LANGUAGE,
      observedDate: OBSERVED_DATE,
      collectedAt: new Date().toISOString(),
      baseSeedCount: cfg.baseSeeds.length,
      headTermCount: cfg.headTerms.length,
      expansionQueryCount: queries.length - cfg.baseSeeds.length,
      totalQueryCount: queries.length,
      totalSuggestions,
      failedQueryCount: failed.length,
      volume: 'unknown for every term — no volume source was available',
      difficulty: 'unknown for every term — no difficulty source was available',
      cpc: 'unknown for every term — no CPC source was available',
      observations,
    },
    null,
    2
  )
);

console.log(`\n${observations.length - failed.length}/${observations.length} queries returned data, ${totalSuggestions} suggestions total`);
if (failed.length) console.log('FAILED: ' + failed.map((f) => f.query).join(' | '));
console.log('Wrote ' + OUT);
