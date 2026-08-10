// Downloads Reign Creative's own app icons from the Play CDN into public/icons/
// at two sizes so the site never hotlinks Google's servers. Existing files are
// left alone unless --force is passed.
//
// Run: node scripts/fetch-app-icons.mjs [--force]

import { writeFileSync, existsSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const HERE = dirname(fileURLToPath(import.meta.url));
const ICONS = join(HERE, '..', 'public', 'icons');
const FORCE = process.argv.includes('--force');

const verification = JSON.parse(readFileSync(join(HERE, 'play-verification.json'), 'utf8'));

// packageId -> site slug. Slugs for the eight pre-existing apps are frozen so no
// live URL changes and no redirects are needed.
const SLUGS = {
  'com.reigncreative.proteinup': 'protein-diet-tracker',
  'com.reigncreative.alieninvasion': 'space-shooter-classic-arcade',
  'com.reigncreative.history': 'world-history-timeline-sim',
  'com.reigncreative.probasketballsim': 'pro-basketball-my-career-sim',
  'com.reigncreative.eightytwopro.basketballdraft': 'pro-basketball-draft-gm-mode',
  'com.reigncreative.zombiesurvivors': 'zombie-survival-last-survivor',
  'reigncreative.animecoloringbook': 'anime-coloring-book',
  'com.reigncreative.ketotracker': 'keto-diet-tracker',
  'com.reigncreative.mentalmathchampion': 'mental-math-memory-games',
  'com.reigncreative.twentyzero.footballdraft': 'football-draft-gm-mode',
  'com.reigncreative.baseballdraft162': 'baseball-draft-gm-team',
  'com.reigncreative.soccerdraftgm': 'soccer-draft-gm-xi',
  'com.reigncreative.eightyfourprohockeydraft': 'hockey-draft-gm-manager',
  'com.reigncreative.regalvideoplayer': 'regal-video-player',
  'com.reigncreative.fortyzero.mmaboxingfightdraft': 'mma-boxing-fight-draft',
  'com.reigncreative.learnchinesecantonese': 'learn-cantonese',
  'com.reigncreative.learnthailanguage': 'learn-thai',
  'com.reigncreative.learnmalaylanguage': 'learn-malay',
  'com.reigncreative.learnrussianlanguage': 'learn-russian',
  'com.reigncreative.learncambodian': 'learn-cambodian-khmer',
  'com.reigncreative.animetrivia': 'anime-trivia-word-games',
};

// The Play CDN resizes via a trailing size directive on the image path. The -rw
// suffix makes it return WebP, which we keep (and name correctly) because this
// is a static export: there is no Next.js image optimizer at request time, so
// whatever we commit is exactly what users download.
const sized = (url, px) => `${url.split('=')[0]}=s${px}-rw`;

// Rendered at most 168px (app detail) and 64px (cards), so 2x of each.
const SIZES = [
  ['', 384],
  ['-sm', 128],
];

async function download(url, dest) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  const buf = Buffer.from(await res.arrayBuffer());
  writeFileSync(dest, buf);
  return buf.length;
}

let fetched = 0;
let skipped = 0;

for (const app of verification.results.filter((r) => r.ok)) {
  const slug = SLUGS[app.packageId];
  if (!slug) {
    console.log(`SKIP  no slug mapping for ${app.packageId}`);
    continue;
  }
  for (const [suffix, px] of SIZES) {
    const dest = join(ICONS, `${slug}${suffix}.webp`);
    const jpgTwin = join(ICONS, `${slug}${suffix}.jpg`);
    if (!FORCE && (existsSync(dest) || existsSync(jpgTwin))) {
      skipped++;
      continue;
    }
    const bytes = await download(sized(app.iconUrl, px), dest);
    if (readFileSync(dest).subarray(8, 12).toString() !== 'WEBP') {
      throw new Error(`${dest} is not WebP — the CDN response format changed`);
    }
    console.log(`GET   ${slug}${suffix}.webp  ${(bytes / 1024).toFixed(1)} KB`);
    fetched++;
    await new Promise((s) => setTimeout(s, 200));
  }
}

console.log(`\nDownloaded ${fetched}, left ${skipped} existing file(s) untouched.`);
