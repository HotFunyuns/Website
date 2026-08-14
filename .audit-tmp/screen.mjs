import { readFileSync } from 'node:fs';
const rows = JSON.parse(readFileSync('.audit-tmp/all-posts.json', 'utf8'));
const drafts = rows.filter((r) => r.status !== 'published');

// Exclusion probes, from the user's list + the audit's E7/E8 human-verification register.
const PROBES = [
  ['khmer', /khmer|cambodian|ក|diacritic|subscript consonant|coeng/i],
  ['cantonese-tones', /cantonese/i],
  ['net-carb/polyol', /net carb|polyol|erythritol|sugar alcohol|maltitol|glycemic/i],
  ['AV1/android-version', /\bAV1\b|Android (\d{1,2})\b|HEVC|H\.265|VP9|codec/i],
  ['space-invaders', /space invaders|taito|nishikado|galaga|namco|atari/i],
  ['competitor-named', /duolingo|anki|memrise|pleco|myfitnesspal|cronometer|carb manager|lose it!|vlc|mx player|out of milk|hevy|strong app|football manager|out of the park|madden|2k\b|ea sports|pokemon|clash of/i],
  ['flagged-url', /cdc\.gov|roguebasin|support\.google\.com\/googleplay|developer\.apple\.com\/.*quicktime|adobe\.com\/.*flash|developer\.android\.com\/games\/pgs/i],
];

const out = [];
for (const d of drafts) {
  const hay = `${d.title} ${d.metaTitle} ${d.primaryKeyword} ${d.secondaryKeywords.join(' ')} ${d.body} ${JSON.stringify(d.sources)}`;
  const flags = [];
  for (const [name, re] of PROBES) if (re.test(hay)) flags.push(name);
  out.push({ ...d, flags });
}

const clean = out.filter((d) => d.flags.length === 0);
const flagged = out.filter((d) => d.flags.length > 0);

console.log(`=== CLEAN on all probes: ${clean.length} / ${drafts.length} ===`);
for (const d of clean.sort((a, b) => a.category.localeCompare(b.category) || a.slug.localeCompare(b.slug)))
  console.log(
    `  ${d.category.padEnd(18)} ${d.slug.padEnd(46)} w=${String(d.words).padStart(4)} src=${String(d.sources.length).padStart(2)} apps=${d.relatedApps.join(',') || '-'}`,
  );

console.log(`\n=== FLAGGED: ${flagged.length} ===`);
const byFlag = {};
for (const d of flagged) d.flags.forEach((f) => (byFlag[f] = (byFlag[f] ?? 0) + 1));
console.log('  flag frequency:', JSON.stringify(byFlag, null, 1));
for (const d of flagged.sort((a, b) => a.category.localeCompare(b.category) || a.slug.localeCompare(b.slug)))
  console.log(`  ${d.slug.padEnd(46)} ${d.flags.join(', ')}`);
