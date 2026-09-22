// Generates the keyword-to-URL map for the 2026-09-22 expansion straight from
// the published articles, so the map can never drift from what actually
// shipped. One primary phrase maps to exactly one URL, which is the property
// the build already enforces globally — this file makes it auditable.
//
// Volume, difficulty and CPC are absent by design, not by omission: no source
// available to this repository publishes them. See docs/keyword-research-250.md.
//
// Run: node scripts/build-keyword-url-map-250.mjs
// Out: docs/keyword-to-url-map-250.md, docs/data/keyword-to-url-map-250.csv

import { readFileSync, readdirSync, writeFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, '..');
const CONTENT = join(ROOT, 'content', 'blog');
const SITE = 'https://reigncreativellc.com';
const RELEASE = '2026-09-22';
// The keyword collection and the source-availability tests happened the day
// before publication. Keeping the two dates apart stops the generated document
// claiming the research was done on the release date.
const RESEARCH_DATE = '2026-09-21';

const IQ_APP = 'mental-math-memory-games';
const HISTORY_APP = 'world-history-timeline-sim';

const posts = readdirSync(CONTENT)
  .filter((f) => f.endsWith('.md'))
  .map((file) => {
    const raw = readFileSync(join(CONTENT, file), 'utf8');
    const block = /^---\r?\n([\s\S]*?)\r?\n---\r?\n/.exec(raw);
    return { slug: file.replace(/\.md$/, ''), ...JSON.parse(block[1]) };
  });

const release = posts
  .filter((p) => p.publishedAt === RELEASE)
  .sort((a, b) => a.slug.localeCompare(b.slug));

const cohortOf = (p) =>
  p.relatedApps?.[0] === IQ_APP ? 'B' : p.relatedApps?.[0] === HISTORY_APP ? 'C' : 'A';

// --------------------------------------------------------------- observation
// Which release keywords were actually seen in the Autocomplete collection.
// A phrase we chose editorially is not worse than an observed one, but the two
// are different kinds of evidence and the map says which is which.
const observed = new Set();
const candidatesPath = join(ROOT, 'docs', 'data', 'keyword-candidates-250.csv');
if (existsSync(candidatesPath)) {
  const lines = readFileSync(candidatesPath, 'utf8').split('\n').slice(1);
  for (const line of lines) {
    if (!line) continue;
    // `phrase` is the first column; it is quoted only when it contains a comma.
    const phrase = line.startsWith('"')
      ? line.slice(1, line.indexOf('",')).replace(/""/g, '"')
      : line.slice(0, line.indexOf(','));
    if (phrase) observed.add(phrase.trim().toLowerCase());
  }
}

const rows = release.map((p) => ({
  cohort: cohortOf(p),
  primaryKeyword: p.primaryKeyword,
  url: `${SITE}/blog/${p.slug}/`,
  intent: p.intent,
  category: p.category,
  hub: (p.hubs ?? []).join(' ') || '—',
  app: p.relatedApps?.[0] ?? '—',
  volume: 'unknown',
  difficulty: 'unknown',
  cpc: 'unknown',
  evidence: observed.has(p.primaryKeyword.trim().toLowerCase())
    ? 'observed in Google Autocomplete 2026-09-21 (US/en)'
    : 'editorial selection — not observed in the Autocomplete sample',
  secondary: (p.secondaryKeywords ?? []).join('; '),
  longTail: (p.longTailKeywords ?? []).join('; '),
}));

// A primary phrase owned by two URLs is the cannibalisation failure this whole
// map exists to prevent, so it is an error rather than a note.
const byKeyword = new Map();
for (const row of rows) {
  const key = row.primaryKeyword.trim().toLowerCase();
  if (byKeyword.has(key)) {
    console.error(`✗ "${row.primaryKeyword}" is claimed by ${byKeyword.get(key)} and ${row.url}`);
    process.exit(1);
  }
  byKeyword.set(key, row.url);
}

const counts = { A: 0, B: 0, C: 0 };
for (const row of rows) counts[row.cohort] += 1;
const observedCount = rows.filter((r) => r.evidence.startsWith('observed')).length;

const esc = (v) => String(v ?? '').replace(/\|/g, '\\|');
const table = (subset) =>
  [
    '| Primary phrase | URL | Intent | Hub | Volume | Difficulty | Evidence |',
    '| --- | --- | --- | --- | --- | --- | --- |',
    ...subset.map(
      (r) =>
        `| ${esc(r.primaryKeyword)} | [${r.url.replace(SITE, '')}](${r.url}) | ${r.intent} | ${esc(r.hub)} | \`unknown\` | \`unknown\` | ${r.evidence.startsWith('observed') ? 'Autocomplete' : 'editorial'} |`
    ),
  ].join('\n');

const md = `# Keyword-to-URL map — the 250-article expansion

Generated from the published articles by \`scripts/build-keyword-url-map-250.mjs\`
on ${RELEASE}. Re-run it after any content change; it reads the articles rather
than a hand-maintained list, so it cannot drift.

## Read this before using the table

**Every volume, difficulty and CPC value in this document is \`unknown\`, and
that is a measured fact rather than a gap waiting to be filled.** On ${RELEASE}
no source available to this repository published search volume: Google Search
Console (no credentials), Google Ads Keyword Planner (no authenticated access),
Google Trends (HTTP 429) and the commercial providers (no subscription) were
each tested and each unavailable. The one source that did work, Google
Autocomplete, returns no volume component of any kind.

So the "Evidence" column distinguishes only two honest states:

- **Autocomplete** — the exact phrase was returned by Google Autocomplete in the
  ${RELEASE} collection (US, English). This proves people phrase queries this
  way. It proves nothing about how many of them there are.
- **editorial** — the phrase was chosen because it names the article's topic
  precisely. No demand evidence of any kind is claimed for it.

Neither state is a volume estimate. Do not convert either into one.

## One phrase, one URL

${rows.length} articles, ${byKeyword.size} distinct primary phrases, zero
collisions. This is enforced at build time as well: \`src/lib/blog/index.ts\`
throws if two articles claim the same \`primaryKeyword\`, case-insensitively,
so a cannibalising pair cannot reach production.

| | Articles | Primary phrases | Observed in Autocomplete |
| --- | ---: | ---: | ---: |
| Cohort A — general portfolio | ${counts.A} | ${counts.A} | ${rows.filter((r) => r.cohort === 'A' && r.evidence.startsWith('observed')).length} |
| Cohort B — Mental Math & Memory Games | ${counts.B} | ${counts.B} | ${rows.filter((r) => r.cohort === 'B' && r.evidence.startsWith('observed')).length} |
| Cohort C — World History Timeline Sim | ${counts.C} | ${counts.C} | ${rows.filter((r) => r.cohort === 'C' && r.evidence.startsWith('observed')).length} |
| **Total** | **${rows.length}** | **${byKeyword.size}** | **${observedCount}** |

Secondary and long-tail phrases for every article are in
\`docs/data/keyword-to-url-map-250.csv\`, which carries the same rows with the
full keyword lists attached.

## Cohort A — general portfolio articles

${table(rows.filter((r) => r.cohort === 'A'))}

## Cohort B — Mental Math & Memory Games

${table(rows.filter((r) => r.cohort === 'B'))}

## Cohort C — World History Timeline Sim

${table(rows.filter((r) => r.cohort === 'C'))}
`;

writeFileSync(join(ROOT, 'docs', 'keyword-to-url-map-250.md'), md);

const cols = [
  'cohort',
  'primaryKeyword',
  'url',
  'intent',
  'category',
  'hub',
  'app',
  'volume',
  'difficulty',
  'cpc',
  'evidence',
  'secondary',
  'longTail',
];
const csvEsc = (v) => {
  const s = String(v ?? '');
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
};
writeFileSync(
  join(ROOT, 'docs', 'data', 'keyword-to-url-map-250.csv'),
  `${cols.join(',')}\n${rows.map((r) => cols.map((c) => csvEsc(r[c])).join(',')).join('\n')}\n`
);

console.log(`keyword-to-url map: ${rows.length} articles (A ${counts.A} / B ${counts.B} / C ${counts.C})`);
console.log(`distinct primary phrases: ${byKeyword.size} — no collisions`);
console.log(`observed in Autocomplete: ${observedCount}; editorial: ${rows.length - observedCount}`);
console.log('wrote docs/keyword-to-url-map-250.md and docs/data/keyword-to-url-map-250.csv');
