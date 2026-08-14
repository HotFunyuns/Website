import { readFileSync } from 'node:fs';
const rows = JSON.parse(readFileSync('.audit-tmp/all-posts.json', 'utf8'));
const drafts = rows.filter((r) => r.status !== 'published');
const pub = rows.filter((r) => r.status === 'published');

const BLOCKED = new Set([
  'best-offline-arcade-games-android', 'history-of-shoot-em-up-games', 'wave-survival-game-design',
  'what-makes-a-roguelike', 'keto-macros-explained', 'low-carb-tracking-apps-compared',
  'reading-nutrition-labels', 'what-is-a-ketone-reading', 'cantonese-tones-explained',
  'cantonese-vs-mandarin-differences', 'khmer-script-explained', 'best-offline-sports-games-android',
  'android-video-players-compared', 'video-codecs-explained', 'video-file-formats-explained',
  'thai-tones-explained', 'is-thai-hard-to-learn', 'language-learning-apps-compared',
  'protein-tracking-apps-compared',
]);

const eligible = drafts.filter((d) => !BLOCKED.has(d.slug));

console.log('=== PUBLISHED 21 (for overlap checking) ===');
pub.sort((a, b) => a.category.localeCompare(b.category)).forEach((p) =>
  console.log(`  ${p.category.padEnd(17)} ${p.slug.padEnd(46)} kw="${p.primaryKeyword}"`),
);

console.log('\n=== ELIGIBLE 35 ===');
eligible
  .sort((a, b) => a.category.localeCompare(b.category) || (a.relatedApps[0] ?? '').localeCompare(b.relatedApps[0] ?? ''))
  .forEach((d) =>
    console.log(
      `  ${d.category.padEnd(17)} ${d.slug.padEnd(46)} ${String(d.words).padStart(4)}w src=${String(d.sources.length).padStart(2)} faq=${d.faqs} ${d.intent.padEnd(14)} app=${(d.relatedApps[0] ?? '-').padEnd(30)} kw="${d.primaryKeyword}"`,
    ),
  );
