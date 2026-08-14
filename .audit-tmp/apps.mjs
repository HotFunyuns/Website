import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const DIR = 'src/data/apps/catalog';
const SLATE = [
  'anime-coloring-book', 'anime-trivia-word-games', 'mental-math-memory-games',
  'world-history-timeline-sim', 'protein-diet-tracker', 'keto-diet-tracker',
  'learn-russian', 'learn-malay', 'learn-cantonese', 'space-shooter-classic-arcade',
  'mma-boxing-fight-draft', 'baseball-draft-gm-team', 'pro-basketball-draft-gm-mode',
  'pro-basketball-my-career-sim', 'soccer-draft-gm-xi',
];

const found = new Map();
for (const f of readdirSync(DIR)) {
  const raw = readFileSync(join(DIR, f), 'utf8');
  for (const m of raw.matchAll(/slug:\s*'([^']+)'/g)) {
    const slug = m[1];
    const tail = raw.slice(m.index, m.index + 3000);
    found.set(slug, {
      pkg: /packageId:\s*'([^']+)'/.exec(tail)?.[1],
      url: /playStoreUrl:\s*'([^']+)'/.exec(tail)?.[1],
      ver: /lastVerified:\s*'([^']+)'/.exec(tail)?.[1],
      cat: /categoryId:\s*'([^']+)'/.exec(tail)?.[1],
      file: f,
    });
  }
}

console.log(`catalog apps: ${found.size}\n`);
console.log('=== SLATE APPS ===');
for (const s of SLATE) {
  const a = found.get(s);
  if (!a) { console.log(`  MISSING FROM CATALOG: ${s}`); continue; }
  const urlOk = a.url && a.pkg && a.url.includes(a.pkg);
  console.log(`  ${s.padEnd(30)} ${a.cat.padEnd(18)} pkg=${a.pkg} verified=${a.ver} urlMatchesPkg=${urlOk ? 'yes' : 'NO -> ' + a.url}`);
}

console.log('\n=== catalog apps NOT in slate ===');
for (const [s, a] of found) if (!SLATE.includes(s)) console.log(`  ${s.padEnd(30)} ${a.cat}`);
