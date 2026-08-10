/**
 * Prints a compact view of the verified app catalog. Used when authoring blog
 * content so article facts are copied from the catalog rather than recalled.
 * Usage: node scripts/dump-catalog.mjs [slug]
 */
import { execFileSync } from 'node:child_process';
import { createRequire } from 'node:module';
import { rmSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
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
const { apps } = require(join(BUILD, 'index.js'));

const wanted = process.argv[2];
const selection = wanted ? apps.filter((a) => a.slug === wanted) : apps;

if (wanted) {
  for (const app of selection) console.log(JSON.stringify(app, null, 2));
} else {
  for (const app of selection) {
    console.log(
      [
        `slug: ${app.slug}`,
        `name: ${app.name}`,
        `category: ${app.categoryId}`,
        `tagline: ${app.tagline}`,
        `features: ${app.features.map((f) => f.title).join(' | ')}`,
        `audience: ${app.audience.join(' | ')}`,
        `ads: ${app.containsAds}  iap: ${app.inAppPurchases}  rating: ${app.contentRating}`,
        '',
      ].join('\n')
    );
  }
  console.log(`total: ${apps.length}`);
}
