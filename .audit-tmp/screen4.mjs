import { readFileSync } from 'node:fs';
const rows = JSON.parse(readFileSync('.audit-tmp/all-posts.json', 'utf8'));
const drafts = rows.filter((r) => r.status !== 'published');

// Blocked by the user's explicit exclusion list (from screen2).
const BLOCKED = new Set([
  'best-offline-arcade-games-android',
  'history-of-shoot-em-up-games',
  'wave-survival-game-design',
  'what-makes-a-roguelike',
  'keto-macros-explained',
  'low-carb-tracking-apps-compared',
  'reading-nutrition-labels',
  'what-is-a-ketone-reading',
  'cantonese-tones-explained',
  'cantonese-vs-mandarin-differences',
  'khmer-script-explained',
  'best-offline-sports-games-android',
  'android-video-players-compared',
  'video-codecs-explained',
  'video-file-formats-explained',
]);

// Same class of issue, different language / different product. The user's list
// was introduced with "This includes:", and E7 in the audit covers tone tables,
// romanisation and third-party product claims generally.
const EXTENDED = new Set([
  'thai-tones-explained',
  'is-thai-hard-to-learn',
  'language-learning-apps-compared',
  'protein-tracking-apps-compared',
]);

const eligible = drafts.filter((d) => !BLOCKED.has(d.slug) && !EXTENDED.has(d.slug));
console.log(`eligible after extended exclusions: ${eligible.length}`);

const cats = {};
eligible.forEach((d) => (cats[d.category] = (cats[d.category] ?? 0) + 1));
console.log('by category:', JSON.stringify(cats, null, 1));

const apps = {};
eligible.forEach((d) => d.relatedApps.forEach((a) => (apps[a] = (apps[a] ?? 0) + 1)));
console.log(`\ndistinct apps in eligible pool: ${Object.keys(apps).length}`);
console.log('articles per app (primary+secondary refs):');
Object.entries(apps)
  .sort((a, b) => b[1] - a[1])
  .forEach(([a, n]) => console.log(`  ${String(n).padStart(2)}  ${a}`));

// The <=2-per-app cap binds on the FIRST related app (the article's own subject).
const primary = {};
eligible.forEach((d) => {
  const p = d.relatedApps[0] ?? '(none)';
  (primary[p] ??= []).push(d);
});
console.log(`\ndistinct PRIMARY apps: ${Object.keys(primary).length}`);
console.log('ceiling if capped at 2 per primary app:', Object.keys(primary).filter((k) => k !== '(none)').length * 2);
Object.entries(primary)
  .sort((a, b) => b[1].length - a[1].length)
  .forEach(([a, ds]) => console.log(`  ${String(ds.length).padStart(2)}  ${a}  [${ds[0].category}]`));

console.log('\nzero-source eligible:', eligible.filter((d) => d.sources.length === 0).length);
console.log('with >=1 source  :', eligible.filter((d) => d.sources.length > 0).length);

// Feasibility: pick <=2 per primary app, >=5 categories, >=10 apps, total 15.
const catsOf = {};
Object.entries(primary).forEach(([a, ds]) => {
  ds.forEach((d) => ((catsOf[d.category] ??= new Set()).add(a)));
});
console.log('\ncategories reachable:', Object.keys(catsOf).length);
