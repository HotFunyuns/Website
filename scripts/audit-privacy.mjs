// Privacy-policy content audit of the exported site.
//
// Google Play rejects an app whose privacy policy does not name the app or the
// developer shown on its listing ("Invalid Privacy Policy: app or developer
// details don't match"), or that leaves out what the User Data policy requires:
// developer information and a privacy contact, the data collected and who it is
// shared with, secure handling, retention and deletion, and clear labelling as a
// privacy policy. This script checks those elements in the built HTML of the
// company-wide policy (/privacy/) and of every app-specific policy registered in
// src/data/privacy.ts, so a later edit cannot silently drop one.
//
// It also checks that the policy text is VISIBLE, not merely present. On
// 2026-11-12 both policies were in the HTML in full but rendered blank: each sat
// inside a <Reveal> scroll animation (`.js .reveal { opacity: 0 }`) that never
// fired for an element that tall. HTML-text checks and HTTP 200 both passed.
// A policy heading inside a `.reveal`, `hidden` or `opacity:0` ancestor now fails.
//
//   node scripts/audit-privacy.mjs                 checks out/ (run `npm run build` first)
//   node scripts/audit-privacy.mjs --app <repo>    also checks an app's own repository:
//       its package name and title match the registry, its in-app privacy link is
//       its own page, no other policy URL is hard-coded, and the SDKs in its
//       package.json are exactly the ones the policy discloses.
//
// It checks wording and structure, not truth: whether the apps really behave as
// described is established by auditing their code, and each app's Play Console
// Data safety form must agree.

import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const OUT = join(ROOT, 'out');
const SITE = 'https://reigncreativellc.com';
const BUSINESS = 'Reign Creative LLC';
const DEVELOPER = 'Reign Collective Apps';
const SUPPORT_EMAIL = 'ReignCreativeSupport@gmail.com';

/**
 * The services the company-wide policy must keep disclosing: each is shipped by at least one
 * published app (portfolio audit of the apps' source, 2026-11-12). Remove one only when no app
 * uses it any more; add one when an app starts to.
 */
const GENERAL_POLICY_SERVICES = [
  'Google AdMob',
  'Google Analytics for Firebase',
  'Firebase Crashlytics',
  'Firebase Remote Config',
  'Google Play Billing',
  'RevenueCat',
  'Open-Meteo',
  'Hugging Face',
];

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

const VOID = new Set(['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr']);

/**
 * Walks the element tree of `html` (React's output is well formed) and returns every <h2>
 * whose ancestors would hide it before any script runs or forever: a `.reveal` wrapper
 * (`.js .reveal` starts at opacity 0 and needs a scroll observer to show), the `hidden`
 * attribute, or an inline `opacity:0` / `display:none` / `visibility:hidden` style.
 */
function hiddenHeadings(html) {
  const stack = [];
  const hidden = [];
  const tag = /<(\/?)([a-zA-Z][a-zA-Z0-9-]*)((?:[^>"']|"[^"]*"|'[^']*')*?)(\/?)>/g;
  const hides = (attrs) =>
    /\bclass="[^"]*\breveal\b/.test(attrs) ||
    /\shidden(?:[\s=>]|$)/.test(attrs) ||
    /style="[^"]*(?:opacity:\s*0(?:[;"]|\.0*[;"])|display:\s*none|visibility:\s*hidden)/.test(attrs);
  let m;
  while ((m = tag.exec(html))) {
    const [, closing, rawName, attrs, selfClosing] = m;
    const name = rawName.toLowerCase();
    if (closing) {
      const at = stack.map((e) => e.name).lastIndexOf(name);
      if (at >= 0) stack.length = at;
      continue;
    }
    if (name === 'h2' && stack.some((e) => e.hides)) {
      const end = html.indexOf('</h2>', tag.lastIndex);
      hidden.push(inner(html.slice(tag.lastIndex, end)));
    }
    if (!selfClosing && !VOID.has(name)) stack.push({ name, hides: hides(attrs) });
  }
  return hidden;
}

function readPage(route) {
  const file = join(OUT, ...route.split('/').filter(Boolean), 'index.html');
  if (!existsSync(file)) return null;
  const html = readFileSync(file, 'utf8');
  // The page's own content: the header and footer are shared chrome, and the
  // framework's script payloads repeat the page props.
  const main = /<main\b[^>]*>([\s\S]*)<\/main>/.exec(html)?.[1] ?? '';
  return {
    main,
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

/** Numbered sections must run 1, 2, 3, … with no gaps or repeats. */
function checkNumbering(where, h2s) {
  const numbered = h2s.filter((h) => /^\d+\.\s/.test(h));
  check(numbered.length > 0, `${where}: no numbered sections`);
  numbered.forEach((heading, i) => {
    check(heading.startsWith(`${i + 1}. `), `${where}: section "${heading}" is out of sequence (expected ${i + 1}.)`);
  });
  const titles = numbered.map((h) => h.replace(/^\d+\.\s*/, '').toLowerCase());
  check(new Set(titles).size === titles.length, `${where}: a section title appears twice`);
  return numbered;
}

function checkVisible(where, page) {
  const hidden = hiddenHeadings(page.main);
  check(
    hidden.length === 0,
    `${where}: ${hidden.length} section heading(s) are inside a hidden or reveal-on-scroll wrapper, e.g. "${hidden[0]}" — the policy would render blank`
  );
}

/** A blanket "we collect nothing" claim, which no app with an SDK can make. */
const NOTHING_COLLECTED = /\b(?:we|the app|it) (?:do|does) not collect any (?:personal )?(?:data|information)\b|\bcollects? no (?:personal )?(?:data|information)\b|\bno (?:personal )?(?:data|information) (?:is|are) collected\b/i;
const HEALTH_TERMS = /\bketo\b|\bmacros?\b|\bmacro logs?\b|\bdiet (?:entries|tracking)\b|\bweight tracking\b/i;
const HEALTH_APP = /keto|diet|protein|nutrition|health|fasting|calorie/i;

/** The User Data policy's required topics, matched against an app policy's section headings. */
const APP_POLICY_TOPICS = [
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
const GENERAL_POLICY_TOPICS = [
  ['who we are and scope', /who we are/i],
  ['information collected', /information we collect/i],
  ['use of information', /how we use/i],
  ['security', /security/i],
  ['retention', /retention/i],
  ['sharing', /sharing/i],
  ['deletion and choices', /deletion/i],
  ['children', /children/i],
  ['rights', /rights/i],
  ['changes', /changes/i],
  ['contact', /contact/i],
];

const sitemap = existsSync(join(OUT, 'sitemap.xml')) ? readFileSync(join(OUT, 'sitemap.xml'), 'utf8') : '';
check(sitemap.length > 0, 'out/sitemap.xml is missing');

/* -------------------------------------------------- company-wide policy */

const general = readPage('/privacy/');
if (check(general !== null, '/privacy/: page not found in out/')) {
  const where = '/privacy/';
  check(/Privacy Policy/.test(general.title), `${where}: <title> "${general.title}" does not say Privacy Policy`);
  check(/Privacy Policy/.test(general.h1), `${where}: H1 "${general.h1}" does not say Privacy Policy`);
  check(general.canonical === `${SITE}/privacy/`, `${where}: canonical is ${general.canonical}`);
  check(sitemap.includes(`<loc>${SITE}/privacy/</loc>`), `${where}: missing from sitemap.xml`);
  checkVisible(where, general);

  // Identification: the Google Play developer name and the business, each labelled for what it is.
  check(
    general.text.includes(`Google Play Developer ${DEVELOPER}`),
    `${where}: does not identify "Google Play Developer: ${DEVELOPER}"`
  );
  check(general.text.includes(`Business ${BUSINESS}`), `${where}: does not identify "Business: ${BUSINESS}"`);
  check(
    general.text.includes(`published on Google Play under the developer name ${DEVELOPER}`),
    `${where}: does not say the policy covers the apps published under the developer name ${DEVELOPER}`
  );
  check(general.links.has(`mailto:${SUPPORT_EMAIL}`), `${where}: no mailto link to ${SUPPORT_EMAIL}`);
  check(
    general.text.includes(`Last Updated: ${formatDay(generalUpdated)}`),
    `${where}: does not show "Last Updated: ${formatDay(generalUpdated)}" (generalPrivacyPolicyUpdated)`
  );

  const numbered = checkNumbering(where, general.h2);
  for (const [topic, pattern] of GENERAL_POLICY_TOPICS) {
    check(numbered.some((h) => pattern.test(h)), `${where}: no numbered section covering ${topic}`);
  }
  check(general.h3.some((h) => /^Website Analytics/.test(h)), `${where}: no "Website Analytics" subsection`);
  check(general.h3.some((h) => /^Mobile App Analytics/.test(h)), `${where}: no "Mobile App Analytics" subsection`);
  check(
    general.h3.some((h) => /^Health and Nutrition Apps/.test(h)) && /This section applies to our health/.test(general.text),
    `${where}: health disclosures are not scoped to the health apps`
  );
  for (const service of GENERAL_POLICY_SERVICES) {
    check(general.text.includes(service), `${where}: no longer discloses ${service}, which a published app uses`);
  }

  // One policy for the portfolio: no app-specific index, no app sections, no links to app pages.
  check(
    ![...general.h2, ...general.h3].some((h) => /app-specific/i.test(h)),
    `${where}: has an "App-Specific" section — the company-wide policy does not list app policies`
  );
  for (const policy of policies) {
    check(!general.text.includes(policy.appName), `${where}: names ${policy.appName} — keep app-specific detail on its own page`);
    check(!general.links.has(policy.path), `${where}: links the app-specific page ${policy.path}`);
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
  checkVisible(where, page);

  for (const [label, value] of [
    ['app name', policy.appName],
    ['Google Play developer name', DEVELOPER],
    ['business name', BUSINESS],
    ['Android package name', policy.packageId],
  ]) {
    check(page.text.includes(value), `${where}: does not show the ${label} "${value}"`);
  }
  check(page.links.has(`mailto:${SUPPORT_EMAIL}`), `${where}: no mailto link to ${SUPPORT_EMAIL}`);
  check(page.links.has('/privacy/'), `${where}: does not link back to the company-wide policy /privacy/`);
  check(
    page.text.includes(`Last updated: ${formatDay(policy.updated)}`),
    `${where}: does not show "Last updated: ${formatDay(policy.updated)}" (updated in src/data/privacy.ts)`
  );

  const numbered = checkNumbering(where, page.h2);
  for (const [topic, pattern] of APP_POLICY_TOPICS) {
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
  if (check(existsSync(pkgFile), `--app ${repo}: no package.json`)) {
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

console.log(`privacy: company-wide policy + ${policies.length} app-specific polic${policies.length === 1 ? 'y' : 'ies'}, ${checks} checks`);
console.log(`  /privacy/  discloses ${GENERAL_POLICY_SERVICES.join(', ')}`);
for (const policy of policies) console.log(`  ${policy.path}  ${policy.appName} — discloses ${policy.sdks.join(', ')}`);
if (appSummary) console.log(`  app repo: ${appSummary}`);
if (problems.length) {
  console.log(`\n${problems.length} PROBLEM(S):`);
  for (const p of problems) console.log(`  ✗ ${p}`);
  process.exit(1);
}
console.log('privacy policies complete and visible');
