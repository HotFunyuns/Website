import { readFileSync } from 'node:fs';
const rows = JSON.parse(readFileSync('.audit-tmp/all-posts.json', 'utf8'));
const drafts = rows.filter((r) => r.status !== 'published');

const COMPETITOR = /\b(duolingo|anki|memrise|pleco|babbel|busuu|rosetta stone|myfitnesspal|cronometer|carb manager|lose it|vlc|mx player|football manager|out of the park|madden|fifa|ea sports)\b/gi;

console.log('=== real competitor mentions (word-bounded) ===');
for (const d of drafts) {
  const hits = [...new Set((d.body.match(COMPETITOR) ?? []).map((s) => s.toLowerCase()))];
  if (hits.length) console.log(`  ${d.status.padEnd(6)} ${d.slug.padEnd(45)} ${hits.join(', ')}`);
}

// Any linguistic tone / script / romanisation detail — the E7 class, whatever the language.
console.log('\n=== E7-class linguistic detail (tone tables, script, romanisation) ===');
const E7 = [
  ['tone-table', /tone\s*[1-6]\b|\b(rising|falling|level)\s+tone|tone\s+(mark|contour|number)/i],
  ['script-chars', /[฀-๿ក-៿Ѐ-ӿ一-鿿]/],
  ['romanisation', /romani[sz]ation|jyutping|pinyin|rtgs|transliterat/i],
  ['diacritic', /diacritic|vowel sign|consonant cluster|subscript/i],
];
for (const d of drafts) {
  const f = E7.filter(([, re]) => re.test(d.body)).map(([n]) => n);
  if (f.length) console.log(`  ${d.category.padEnd(17)} ${d.slug.padEnd(45)} ${f.join(', ')}`);
}

// Zero-source drafts that nonetheless make real-world factual claims.
console.log('\n=== eligible-pool drafts with 0 sources ===');
for (const d of drafts.filter((x) => x.sources.length === 0))
  console.log(`  ${d.category.padEnd(17)} ${d.slug.padEnd(45)} w=${d.words}`);
