// Privacy-policy content audit of the exported site.
//
// Google Play rejects an app whose privacy policy does not name the app or the
// developer shown on its listing ("Invalid Privacy Policy: app or developer
// details don't match"), or that leaves out what the User Data policy requires:
// developer information and a privacy contact, the data collected and who it is
// shared with, secure handling, retention and deletion, and clear labelling as a
// privacy policy. This script checks those elements in the built HTML of the
// general policy (/privacy/) and of every app-specific policy registered in
// src/data/privacy.ts, so a later edit cannot silently drop one.
//
//   node scripts/audit-privacy.mjs                 checks out/ (run `npm run build` first)
//   node scripts/audit-privacy.mjs --app <repo>    also checks an app's own repository:
//       its package name and title match the registry, its in-app privacy link is
//       its own page, no other policy URL is hard-coded, and the SDKs in its
//       package.json are exactly the ones the policy discloses.
//
// It checks wording and structure, not truth: whether the app really behaves as
// described is established by auditing the app (see the comment at the top of
// each app policy page), and the Play Console Data safety form must agree.

import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const OUT = join(ROOT, 'out');
const SITE = 'https://reigncreativellc.com';
const BUSINESS = 'Reign Creative LLC';
const DEVELOPER = 'Reign Collective Apps';
const SUPPORT_EMAIL = 'ReignCreativeSupport@gmail.com';

const args = process.argv.slice(2);
const appArg = args.indexOf('--app');
const appRepo = appArg >= 0 ? args[appArg + 1] : null;
if (appArg >= 0 && !appRepo) {
  console.error('--app needs the path of an app repository');
  process.exit(2);
}

if (!existsSync(OUT)) {
  console.error('out/ not found — run `npm run build` first.');
  process.exit(1);
}

const problems = [];
const fail = (m) => problems.push(m);
let checks = 0;
const check = (ok, message) => {
  checks++;
  if (!ok) fail(message);
  return ok;
};

/* ------------------------------------------------------------- registry */

const registrySource = readFileSync(join(ROOT, 'src', 'data', 'privacy.ts'), 'utf8');
const field = (name) => [...registrySource.matchAll(new RegExp(`^\\s{4}${name}: '([^']+)',`, 'gm'))].map((m) => m[1]);
const sdkLists = [...registrySource.matchAll(/^\s{4}sdks: \[([^\]]*)\],/gm)].map((m) =>
  [...m[1].matchAll(/'([^']+)'/g)].map((s) => s[1])
);
const slugs = field('slug');
const names = field('appName');
const packageIds = field('packageId');
const updatedDays = field('updated');
const generalUpdated = /generalPrivacyPolicyUpdated = '(\d{4}-\d{2}-\d{2})'/.exec(registrySource)?.[1];

if (![names, packageIds, updatedDays, sdkLists].every((list) => list.length === slugs.length) || !generalUpdated) {
  console.error('src/data/privacy.ts could not be read: every policy needs slug, appName, packageId, updated and sdks.');
  process.exit(1);
}
const policies = slugs.map((slug, i) => ({
  slug,
  appName: names[i],
  packageId: packageIds[i],
  updated: updatedDays[i],
  sdks: sdkLists[i],
  path: `/privacy/${slug}/`,
}));

/* ---------------------------------------------------------------- helpers */

const decode = (t) =>
  t
    .replace(/&#x27;|&apos;|&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&');
const textOf = (html) =>
  decode(
    html
      .replace(/<!--[\s\S]*?-->/g, '')
      .replace(/<script[\s\S]*?<\/script>/g, ' ')
      .replace(/<style[\s\S]*?<\/style>/g, ' ')
      .replace(/<[^>]+>/g, ' ')
  )
    .replace(/\s+/g, ' ')
    .trim();
const inner = (html) => decode(html.replace(/<!--[\s\S]*?-->/g, '').replace(/<[^>]+>/g, '')).replace(/\s+/g, ' ').trim();

function readPage(route) {
  const file = join(OUT, ...route.split('/').filter(Boolean), 'index.html');
  if (!existsSync(file)) return null;
  const html = readFileSync(file, 'utf8');
  // The page's own content: the header and footer are shared chrome, and the
  // framework's script payloads repeat the page props.
  const main = /<main\b[^>]*>([\s\S]*)<\/main>/.exec(html)?.[1] ?? '';
  return {
    text: textOf(main),
    title: inner(/<title>([\s\S]*?)<\/title>/.exec(html)?.[1] ?? ''),
    h1: inner(/<h1\b[^>]*>([\s\S]*?)<\/h1>/.exec(main)?.[1] ?? ''),
    h2: [...main.matchAll(/<h2\b[^>]*>([\s\S]*?)<\/h2>/g)].map((m) => inner(m[1])),
    h3: [...main.matchAll(/<h3\b[^>]*>([\s\S]*?)<\/h3>/g)].map((m) => inner(m[1])),
    canonical: /<link rel="canonical" href="([^"]+)"/.exec(html)?.[1] ?? null,
    links: new Set([...main.matchAll(/<a\b[^>]*href="([^"]+)"/g)].map((m) => decode(m[1]))),
  };
}

const formatDay = (day) =>
  new Date(`${day}T00:00:00Z`).toLocaleDateString('en-US', {
    timeZone: 'UTC',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

/** A blanket "we collect nothing" claim, which no app with an SDK can make. */
const NOTHING_COLLECTED = /\b(?:we|the app|it) (?:do|does) not collect any (?:personal )?(?:data|information)\b|\bcollects? no (?:personal )?(?:data|information)\b|\bno (?:personal )?(?:data|information) (?:is|are) collected\b/i;
const HEALTH_TERMS = /\bketo\b|\bmacros?\b|\bmacro logs?\b|\bdiet (?:entries|tracking)\b|\bweight tracking\b/i;
const HEALTH_APP = /keto|diet|protein|nutrition|health|fasting|calorie/i;

/** The User Data policy's required topics, matched against an app policy's section headings. */
const REQUIRED_TOPICS = [
  ['developer identification', /identification/i],
  ['information collected', /information collected/i],
  ['on-device storage', /storage/i],
  ['third parties and sharing', /shar/i],
  ['use of information', /\bused?\b/i],
  ['security', /security/i],
  ['retention', /retention/i],
  ['deletion', /deletion/i],
  ['children', /children/i],
  ['user rights', /rights/i],
  ['changes', /changes/i],
  ['contact', /contact/i],
];

const sitemap = existsSync(join(OUT, 'sitemap.xml')) ? readFileSync(join(OUT, 'sitemap.xml'), 'utf8') : '';
check(sitemap.length > 0, 'out/sitemap.xml is missing');

/* --------------------------------------------------------- general policy */

const general = readPage('/privacy/');
if (check(general !== null, '/privacy/: page not found in out/')) {
  const where = '/privacy/';
  check(/Privacy Policy/.test(general.title), `${where}: <title> "${general.title}" does not say Privacy Policy`);
  check(/Privacy Policy/.test(general.h1), `${where}: H1 "${general.h1}" does not say Privacy Policy`);
  check(general.canonical === `${SITE}/privacy/`, `${where}: canonical is ${general.canonical}`);
  check(general.text.includes(BUSINESS), `${where}: does not name the business "${BUSINESS}"`);
  check(general.text.includes(DEVELOPER), `${where}: does not name the Google Play developer "${DEVELOPER}"`);
  check(general.links.has(`mailto:${SUPPORT_EMAIL}`), `${where}: no mailto link to ${SUPPORT_EMAIL}`);
  check(
    general.text.includes(`Last Updated: ${formatDay(generalUpdated)}`),
    `${where}: does not show "Last Updated: ${formatDay(generalUpdated)}" (generalPrivacyPolicyUpdated)`
  );
  check(general.h3.some((h) => /^Website Analytics/.test(h)), `${where}: no "Website Analytics" subsection`);
  check(general.h3.some((h) => /^Mobile App Analytics/.test(h)), `${where}: no "Mobile App Analytics" subsection`);
  check(
    general.h3.some((h) => /^Health and Nutrition Apps/.test(h)) && /This section applies to our health/.test(general.text),
    `${where}: health disclosures are not scoped to the health apps`
  );
  for (const policy of policies) {
    check(general.links.has(policy.path), `${where}: does not link ${policy.path}`);
    check(general.text.includes(policy.appName), `${where}: does not name ${policy.appName}`);
  }
  check(sitemap.includes(`<loc>${SITE}/privacy/</loc>`), `${where}: missing from sitemap.xml`);
}

const appSupport = readPage('/app-support/');
if (check(appSupport !== null, '/app-support/: page not found in out/')) {
  for (const policy of policies) {
    check(appSupport.links.has(policy.path), `/app-support/: does not link ${policy.path}`);
  }
}

/* ---------------------------------------------------- app-specific policies */

for (const policy of policies) {
  const where = policy.path;
  const page = readPage(policy.path);
  if (!check(page !== null, `${where}: page not found in out/ (registered in src/data/privacy.ts)`)) continue;

  const expectedTitle = `${policy.appName} — Privacy Policy`;
  check(page.title === expectedTitle, `${where}: <title> is "${page.title}", expected "${expectedTitle}"`);
  check(page.h1 === expectedTitle, `${where}: H1 is "${page.h1}", expected "${expectedTitle}"`);
  check(page.canonical === `${SITE}${policy.path}`, `${where}: canonical is ${page.canonical}`);
  check(sitemap.includes(`<loc>${SITE}${policy.path}</loc>`), `${where}: missing from sitemap.xml`);

  for (const [label, value] of [
    ['app name', policy.appName],
    ['Google Play developer name', DEVELOPER],
    ['business name', BUSINESS],
    ['Android package name', policy.packageId],
  ]) {
    check(page.text.includes(value), `${where}: does not show the ${label} "${value}"`);
  }
  check(page.links.has(`mailto:${SUPPORT_EMAIL}`), `${where}: no mailto link to ${SUPPORT_EMAIL}`);
  check(page.links.has('/privacy/'), `${where}: does not link back to the general policy /privacy/`);
  check(
    page.text.includes(`Last updated: ${formatDay(policy.updated)}`),
    `${where}: does not show "Last updated: ${formatDay(policy.updated)}" (updated in src/data/privacy.ts)`
  );

  const numbered = page.h2.filter((h) => /^\d+\.\s/.test(h));
  numbered.forEach((heading, i) => {
    check(heading.startsWith(`${i + 1}. `), `${where}: section "${heading}" is out of sequence (expected ${i + 1}.)`);
  });
  for (const [topic, pattern] of REQUIRED_TOPICS) {
    check(numbered.some((h) => pattern.test(h)), `${where}: no numbered section covering ${topic}`);
  }

  for (const sdk of policy.sdks) {
    check(page.text.includes(sdk), `${where}: declares "${sdk}" in src/data/privacy.ts but the page never names it`);
  }

  const nothing = NOTHING_COLLECTED.exec(page.text);
  check(!nothing, `${where}: blanket non-collection claim "${nothing?.[0]}"`);
  if (!HEALTH_APP.test(policy.appName)) {
    const health = HEALTH_TERMS.exec(page.text);
    check(!health, `${where}: health-app wording "${health?.[0]}" on a policy for a non-health app`);
  }
}

/* ------------------------------------------------- optional: the app repo */

/** package.json dependency → the service name the policy must use. */
const SDK_PACKAGES = [
  ['react-native-google-mobile-ads', 'Google AdMob'],
  ['@react-native-firebase/analytics', 'Google Analytics for Firebase'],
  ['@react-native-firebase/remote-config', 'Firebase Remote Config'],
  ['@react-native-firebase/crashlytics', 'Firebase Crashlytics'],
  ['@react-native-firebase/messaging', 'Firebase Cloud Messaging'],
  ['@react-native-firebase/auth', 'Firebase Authentication'],
  ['@react-native-firebase/firestore', 'Cloud Firestore'],
  ['@react-native-firebase/perf', 'Firebase Performance Monitoring'],
  ['expo-iap', 'Google Play Billing'],
  ['react-native-iap', 'Google Play Billing'],
  ['react-native-purchases', 'RevenueCat'],
  ['@sentry/react-native', 'Sentry'],
  ['expo-location', 'Location'],
];

let appSummary = null;
if (appRepo) {
  const repo = resolve(appRepo);
  const identityFile = join(repo, 'app.identity.json');
  const appJsonFile = join(repo, 'app.json');
  const pkgFile = join(repo, 'package.json');
  if (!check(existsSync(pkgFile), `--app ${repo}: no package.json`)) {
    // nothing more to read
  } else {
    let identity = null;
    if (existsSync(identityFile)) identity = JSON.parse(readFileSync(identityFile, 'utf8'));
    else if (existsSync(appJsonFile)) {
      const expo = JSON.parse(readFileSync(appJsonFile, 'utf8')).expo ?? {};
      identity = { appName: expo.name, androidPackage: expo.android?.package, privacyPolicyUrl: null };
    }
    const packageName = identity?.androidPackage;
    const policy = policies.find((p) => p.packageId === packageName);
    if (check(policy, `--app: package "${packageName}" has no app-specific policy in src/data/privacy.ts`)) {
      const expectedUrl = `${SITE}${policy.path}`;
      check(
        [identity.appName, identity.storeName].includes(policy.appName),
        `--app: app name "${identity.storeName ?? identity.appName}" ≠ registry "${policy.appName}"`
      );
      check(
        identity.privacyPolicyUrl === expectedUrl,
        `--app: the in-app privacy link is ${identity.privacyPolicyUrl}, expected ${expectedUrl}`
      );

      // No other policy URL may be hard-coded in the app's runtime source.
      const stray = [];
      const walk = (dir) => {
        for (const entry of readdirSync(dir)) {
          if (entry === 'node_modules' || entry === '__tests__' || entry.startsWith('.')) continue;
          const full = join(dir, entry);
          if (statSync(full).isDirectory()) walk(full);
          else if (/\.(?:ts|tsx|js|jsx|json)$/.test(entry)) {
            for (const m of readFileSync(full, 'utf8').matchAll(/https?:\/\/(?:www\.)?reigncreativellc\.com\/privacy[^\s"'`)<]*/g)) {
              if (m[0] !== expectedUrl) stray.push(`${full.slice(repo.length + 1)}: ${m[0]}`);
            }
          }
        }
      };
      for (const dir of ['app', 'src']) if (existsSync(join(repo, dir))) walk(join(repo, dir));
      check(stray.length === 0, `--app: other privacy URLs hard-coded in the app: ${stray.join('; ')}`);

      const pkg = JSON.parse(readFileSync(pkgFile, 'utf8'));
      const deps = { ...pkg.dependencies };
      const detected = [...new Set(SDK_PACKAGES.filter(([dep]) => dep in deps).map(([, name]) => name))];
      for (const name of detected) {
        check(policy.sdks.includes(name), `--app: package.json ships ${name}, which ${policy.path} does not declare`);
      }
      for (const name of policy.sdks) {
        check(detected.includes(name), `--app: ${policy.path} declares ${name}, but package.json does not ship it`);
      }
      appSummary = `${policy.appName} (${packageName}) — SDKs in package.json: ${detected.join(', ') || 'none'}`;
    }
  }
}

/* -------------------------------------------------------------- reporting */

console.log(`privacy: general policy + ${policies.length} app-specific polic${policies.length === 1 ? 'y' : 'ies'}, ${checks} checks`);
for (const policy of policies) console.log(`  ${policy.path}  ${policy.appName} — discloses ${policy.sdks.join(', ')}`);
if (appSummary) console.log(`  app repo: ${appSummary}`);
if (problems.length) {
  console.log(`\n${problems.length} PROBLEM(S):`);
  for (const p of problems) console.log(`  ✗ ${p}`);
  process.exit(1);
}
console.log('privacy policies complete');
