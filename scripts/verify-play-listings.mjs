// Verifies that every package ID resolves to a public Google Play listing and
// captures only facts we can publish truthfully. The primary source is the
// JSON-LD SoftwareApplication block Google Play embeds in each listing, which is
// authoritative for name, category, content rating, icon and price. Ads / in-app
// purchase disclosure comes from the listing badges.
//
// Run:    node scripts/verify-play-listings.mjs
// Output: scripts/play-verification.json

import { writeFileSync, readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const HERE = dirname(fileURLToPath(import.meta.url));
const OUT = join(HERE, 'play-verification.json');

const UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36';

const PACKAGES = [
  'com.reigncreative.proteinup',
  'com.reigncreative.alieninvasion',
  'com.reigncreative.history',
  'com.reigncreative.probasketballsim',
  'com.reigncreative.eightytwopro.basketballdraft',
  'com.reigncreative.mentalmathchampion',
  'com.reigncreative.twentyzero.footballdraft',
  'com.reigncreative.baseballdraft162',
  'com.reigncreative.soccerdraftgm',
  'com.reigncreative.eightyfourprohockeydraft',
  'com.reigncreative.zombiesurvivors',
  'com.reigncreative.regalvideoplayer',
  'reigncreative.animecoloringbook',
  'com.reigncreative.fortyzero.mmaboxingfightdraft',
  'com.reigncreative.learnchinesecantonese',
  'com.reigncreative.learnthailanguage',
  'com.reigncreative.learnmalaylanguage',
  'com.reigncreative.learnrussianlanguage',
  'com.reigncreative.learncambodian',
  'com.reigncreative.ketotracker',
  'com.reigncreative.animetrivia',
];

// Owner-confirmed Draft / In Review / Internal Testing. Probed only to prove
// they are not publicly reachable — never published to the site.
const MUST_NOT_BE_PUBLIC = [];

function decode(s) {
  return s
    .replace(/\\u003d/g, '=')
    .replace(/\\u0026/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&nbsp;/g, ' ');
}

function jsonLd(html) {
  const m = /<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/.exec(html);
  if (!m) return null;
  try {
    return JSON.parse(m[1]);
  } catch {
    return null;
  }
}

function fullDescription(html) {
  const m = /<div [^>]*data-g-id="description"[^>]*>([\s\S]*?)<\/div>/.exec(html);
  if (!m) return null;
  return decode(
    m[1]
      .replace(/<br\s*\/?>/gi, '\n')
      .replace(/<\/p>/gi, '\n\n')
      .replace(/<[^>]+>/g, '')
  )
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

async function probe(pkg) {
  const canonical = `https://play.google.com/store/apps/details?id=${pkg}`;
  try {
    const res = await fetch(`${canonical}&hl=en&gl=US`, {
      headers: { 'User-Agent': UA, 'Accept-Language': 'en-US,en' },
    });
    if (!res.ok) return { packageId: pkg, ok: false, status: res.status, reason: `HTTP ${res.status}` };

    const html = await res.text();
    const ld = jsonLd(html);
    if (!ld || ld['@type'] !== 'SoftwareApplication') {
      return { packageId: pkg, ok: false, status: res.status, reason: 'no SoftwareApplication JSON-LD (not public?)' };
    }

    const offer = Array.isArray(ld.offers) ? ld.offers[0] : ld.offers;
    return {
      packageId: pkg,
      playStoreUrl: canonical,
      ok: true,
      status: res.status,
      name: ld.name,
      shortDescription: ld.description,
      applicationCategory: ld.applicationCategory ?? null,
      operatingSystem: ld.operatingSystem ?? null,
      contentRating: ld.contentRating ?? null,
      developer: ld.author?.name ?? null,
      iconUrl: ld.image ?? null,
      price: offer?.price ?? null,
      priceCurrency: offer?.priceCurrency ?? null,
      availability: offer?.availability ?? null,
      containsAds: /Contains ads/.test(html),
      inAppPurchases: /In-app purchases/.test(html),
      fullDescription: fullDescription(html),
    };
  } catch (err) {
    return { packageId: pkg, ok: false, reason: 'fetch failed: ' + err.message };
  }
}

const results = [];
for (const pkg of PACKAGES) {
  const r = await probe(pkg);
  results.push(r);
  console.log(
    (r.ok ? `OK   ${r.name} | ${r.applicationCategory} | free=${r.price === '0'} | ads=${r.containsAds} | iap=${r.inAppPurchases}` : `FAIL ${r.reason}`) +
      `   [${pkg}]`
  );
  await new Promise((s) => setTimeout(s, 400));
}

for (const pkg of MUST_NOT_BE_PUBLIC) {
  const r = await probe(pkg);
  console.log(`${r.ok ? '!! UNEXPECTEDLY PUBLIC' : 'not public (expected)'}  [${pkg}]`);
}

const prior = existsSync(OUT) ? JSON.parse(readFileSync(OUT, 'utf8')) : null;
writeFileSync(
  OUT,
  JSON.stringify({ verifiedAt: new Date().toISOString(), previousRun: prior?.verifiedAt ?? null, results }, null, 2)
);

const bad = results.filter((r) => !r.ok);
console.log(`\n${results.length - bad.length}/${results.length} listings verified public`);
if (bad.length) console.log('NOT VERIFIED: ' + bad.map((b) => b.packageId).join(', '));
console.log('Wrote ' + OUT);
