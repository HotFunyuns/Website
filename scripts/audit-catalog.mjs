// Cross-checks src/data/apps against scripts/play-verification.json so the site
// can never claim something the live Play listing does not support. Compiles the
// data layer to CommonJS in a cache dir first, because the catalog uses
// extensionless TS imports that Node's ESM loader will not resolve.
//
// Run: node scripts/audit-catalog.mjs

import { readFileSync, existsSync, rmSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, '..');
const BUILD = join(ROOT, 'node_modules', '.cache', 'catalog-audit');

rmSync(BUILD, { recursive: true, force: true });
execFileSync(
  process.execPath,
  [
    join(ROOT, 'node_modules', 'typescript', 'lib', 'tsc.js'),
    join(ROOT, 'src', 'data', 'apps', 'index.ts'),
    '--outDir', BUILD,
    '--module', 'commonjs',
    '--target', 'es2020',
    '--moduleResolution', 'node',
    '--skipLibCheck',
  ],
  { stdio: 'inherit' }
);

const require = createRequire(import.meta.url);
const { apps, categories, activeCategories, featuredApps } = require(join(BUILD, 'index.js'));

const verification = JSON.parse(readFileSync(join(HERE, 'play-verification.json'), 'utf8'));
const live = new Map(verification.results.filter((r) => r.ok).map((r) => [r.packageId, r]));

const problems = [];
const fail = (m) => problems.push(m);

console.log(`apps: ${apps.length}   live verified listings: ${live.size}`);

const slugs = new Set();
const pkgs = new Set();

for (const app of apps) {
  if (slugs.has(app.slug)) fail(`duplicate slug: ${app.slug}`);
  slugs.add(app.slug);
  if (pkgs.has(app.packageId)) fail(`duplicate packageId: ${app.packageId}`);
  pkgs.add(app.packageId);

  const l = live.get(app.packageId);
  if (!l) {
    fail(`${app.slug}: packageId ${app.packageId} is not in play-verification.json`);
    continue;
  }

  if (app.name !== l.name) fail(`${app.slug}: name "${app.name}" != Play "${l.name}"`);
  if (app.playStoreUrl !== l.playStoreUrl) fail(`${app.slug}: playStoreUrl != live Play URL`);
  if (app.free !== (String(l.price) === '0')) fail(`${app.slug}: free=${app.free} but Play price=${l.price}`);
  if (app.contentRating !== l.contentRating) fail(`${app.slug}: contentRating "${app.contentRating}" != Play "${l.contentRating}"`);
  if (app.containsAds !== l.containsAds) fail(`${app.slug}: containsAds ${app.containsAds} != Play ${l.containsAds}`);
  if (app.inAppPurchases !== l.inAppPurchases) fail(`${app.slug}: inAppPurchases ${app.inAppPurchases} != Play ${l.inAppPurchases}`);
  if (app.playCategory !== l.applicationCategory) fail(`${app.slug}: playCategory "${app.playCategory}" != Play "${l.applicationCategory}"`);

  for (const field of [app.icon, app.iconSmall]) {
    if (!existsSync(join(ROOT, 'public', field))) fail(`${app.slug}: missing icon file public${field}`);
  }

  if (!categories.some((c) => c.id === app.categoryId)) fail(`${app.slug}: unknown categoryId ${app.categoryId}`);
  for (const [field, min] of [['features', 3], ['audience', 3], ['howItWorks', 3], ['faqs', 4], ['longDescription', 2]]) {
    if (!Array.isArray(app[field]) || app[field].length < min) {
      fail(`${app.slug}: ${field} has ${app[field]?.length ?? 0}, expected >= ${min}`);
    }
  }
  if (app.metaTitle.length > 60) fail(`${app.slug}: metaTitle ${app.metaTitle.length} chars (>60)`);
  if (app.metaDescription.length > 160) fail(`${app.slug}: metaDescription ${app.metaDescription.length} chars (>160)`);
  if (app.metaDescription.length < 70) fail(`${app.slug}: metaDescription only ${app.metaDescription.length} chars`);
}

for (const pkg of live.keys()) {
  if (!pkgs.has(pkg)) fail(`live app missing from the site: ${pkg}`);
}

// Some Play descriptions name real leagues and rivals; site copy must not, since
// we hold no licence and imply no affiliation.
const TRADEMARKS = /\b(NBA|NFL|MLB|NHL|UFC|FIFA|Duolingo|MyFitnessPal|Carb Manager|Netflix|VLC|Madden|2K)\b/;
for (const app of apps) {
  const m = TRADEMARKS.exec(JSON.stringify(app));
  if (m) fail(`${app.slug}: trademark "${m[1]}" appears in site copy`);
}

console.log('\nby category:');
for (const c of categories) {
  console.log(`  ${c.id.padEnd(20)} ${apps.filter((a) => a.categoryId === c.id).length}`);
}
console.log(`activeCategories: ${activeCategories.length}`);
console.log(`featured (${featuredApps.length}): ${featuredApps.map((a) => a.slug).join(', ')}`);

if (problems.length) {
  console.log(`\n${problems.length} PROBLEM(S):`);
  for (const p of problems) console.log(`  - ${p}`);
  process.exit(1);
}
console.log('\nAll catalog checks passed.');
