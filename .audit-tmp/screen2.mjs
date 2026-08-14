import { readFileSync } from 'node:fs';
const rows = JSON.parse(readFileSync('.audit-tmp/all-posts.json', 'utf8'));
const drafts = rows.filter((r) => r.status !== 'published');

// Tightened to the *specific* excluded issues, not bare mentions of a topic.
const PROBES = [
  // Khmer script/diacritic detail or Khmer translations — the E7 native-speaker item.
  ['khmer-detail', (d) => /[ក-៿]/.test(d.body) || /coeng|subscript consonant|khmer (vowel|diacritic|script|consonant)/i.test(d.body)],
  // A Cantonese tone table specifically (E7), not a passing mention of Cantonese.
  ['cantonese-tone-table', (d) => /tone\s*[1-6]\b/i.test(d.body) || /(high|mid|low)\s+(level|rising|falling)/i.test(d.body)],
  // Net-carb arithmetic / polyol subtraction (E8).
  ['netcarb-math', (d) => /polyol|erythritol|maltitol|sugar alcohol/i.test(d.body) || /net carbs?\s*=|subtract(ing)? (the )?fib(re|er)/i.test(d.body)],
  // Codec / Android-version support claims (E8).
  ['codec-or-android-version', (d) => /\bAV1\b|\bHEVC\b|H\.26[45]|\bVP9\b/i.test(d.body) || /Android\s*\d{1,2}\s*(\+|or (later|newer|above))/i.test(d.body)],
  // Space Invaders / arcade attribution (E8).
  ['arcade-attribution', (d) => /space invaders|nishikado|taito|namco|galaxian|galaga/i.test(d.body)],
  // URLs the audit flagged as needing a browser.
  ['flagged-url', (d) => /cdc\.gov|roguebasin|support\.google\.com\/googleplay|developer\.apple\.com|adobe\.com|developer\.android\.com\/games\/pgs/i.test(JSON.stringify(d.sources))],
];

// Named third-party products — allowed, but each claim needs verifying, so track separately.
const COMPETITOR = /duolingo|anki|memrise|pleco|myfitnesspal|cronometer|carb manager|lose it!|\bvlc\b|mx player|football manager|out of the park|madden|\bfifa\b|ea sports|\b2k\d/i;

const out = drafts.map((d) => {
  const flags = PROBES.filter(([, fn]) => fn(d)).map(([n]) => n);
  const comps = [...new Set((d.body.match(COMPETITOR) ? d.body.match(new RegExp(COMPETITOR, 'gi')) : []).map((s) => s.toLowerCase()))];
  return { ...d, flags, comps };
});

const clean = out.filter((d) => d.flags.length === 0);
const blocked = out.filter((d) => d.flags.length > 0);

const line = (d) =>
  `  ${d.category.padEnd(17)} ${d.slug.padEnd(45)} w=${String(d.words).padStart(4)} src=${String(d.sources.length).padStart(2)} ${d.comps.length ? '[' + d.comps.join('/') + '] ' : ''}${d.flags.join(', ')}`;

console.log(`=== ELIGIBLE (no excluded issue): ${clean.length} ===`);
clean.sort((a, b) => a.category.localeCompare(b.category) || a.slug.localeCompare(b.slug)).forEach((d) => console.log(line(d)));

const cats = {};
clean.forEach((d) => (cats[d.category] = (cats[d.category] ?? 0) + 1));
console.log('\n  eligible by category:', JSON.stringify(cats, null, 1));
const apps = {};
clean.forEach((d) => d.relatedApps.forEach((a) => (apps[a] = (apps[a] ?? 0) + 1)));
console.log('  eligible by primary app coverage:', JSON.stringify(apps, null, 1));
console.log('  eligible with 0 sources:', clean.filter((d) => d.sources.length === 0).length);
console.log('  eligible naming a competitor:', clean.filter((d) => d.comps.length).length);

console.log(`\n=== BLOCKED: ${blocked.length} ===`);
blocked.sort((a, b) => a.category.localeCompare(b.category) || a.slug.localeCompare(b.slug)).forEach((d) => console.log(line(d)));
