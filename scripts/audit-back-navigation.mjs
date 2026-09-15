// Guards the browser Back button against the patterns that have broken it here
// before, and against the Google spam-policy behaviours that share a root cause.
//
// This site once shipped a retired app URL that sent visitors forward again the
// moment they pressed Back, trapping them on the destination page. The fix was
// `location.replace()` — it overwrites the current history entry instead of
// pushing a new one, so Back goes wherever the visitor actually came from. That
// fix is one line and easy to undo by accident, which is what this script is for.
//
// These are *static* checks over the exported HTML and the client chunks. They
// cannot prove Back works in a real browser — only a driven browser can do that,
// and one was run against this build (see docs/url-normalization-audit.md). What
// they can do is fail loudly in CI the moment someone reintroduces a known-bad
// pattern, which is the part a browser test is too slow and too flaky to own.
//
// Run: node scripts/audit-back-navigation.mjs

import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, '..');
const OUT = join(ROOT, 'out');
const SRC = join(ROOT, 'src');

if (!existsSync(OUT)) {
  console.error('out/ not found — run `npm run build` first.');
  process.exit(1);
}

function walk(dir, ext) {
  const found = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) found.push(...walk(full, ext));
    else if (full.endsWith(ext)) found.push(full);
  }
  return found;
}

const problems = [];
const notes = [];
const fail = (m) => problems.push(m);
const rel = (file) => file.slice(ROOT.length + 1).split('\\').join('/');

const htmlFiles = walk(OUT, '.html');

/* ------------------------------------------------- 1. meta refresh redirects */

// A zero-delay `<meta http-equiv="refresh">` is called out by name in Google's
// sneaky-redirect policy, and it is also the variant that leaves the retired URL
// in session history — the exact Back-button trap described above. A *delayed*
// refresh is a different thing and is only reported, not failed.
for (const file of htmlFiles) {
  const html = readFileSync(file, 'utf8');
  for (const m of html.matchAll(/<meta[^>]+http-equiv=["']refresh["'][^>]*>/gi)) {
    const content = /content=["']\s*(\d+)/i.exec(m[0]);
    const delay = content ? Number(content[1]) : null;
    if (delay === 0 || delay === null) {
      fail(`${rel(file)}: zero-delay meta refresh — ${m[0].slice(0, 120)}`);
    } else {
      notes.push(`${rel(file)}: delayed meta refresh (${delay}s) — confirm this is deliberate`);
    }
  }
}

/* ------------------------------------------ 2. history manipulation in source */

// `location.href = …` and `location.assign()` PUSH a history entry. Used as a
// redirect on a retired URL, that is precisely the loop this site already had.
// `location.replace()` is the safe form. Anything that writes to history
// directly, or hooks popstate/beforeunload, gets reported for human review
// because those are the tools back-button hijacking is built from.
// Only *navigations* are a problem. `location.href = "mailto:…"` hands off to
// the mail client and leaves the page — and the history — exactly where it was,
// so flagging it would be flagging correct code, which is how a checker teaches
// its readers to skip it. The schemes below are the ones that never navigate.
const HANDOFF_SCHEME = /^\s*[`'"]?(?:mailto|tel|sms):/;
const BAD_IN_REDIRECT = [
  [
    /\blocation\.href\s*=\s*([^;\n]*)/g,
    'location.href assignment (pushes a history entry — use location.replace)',
  ],
  [
    /\blocation\.assign\s*\(\s*([^)\n]*)/g,
    'location.assign() (pushes a history entry — use location.replace)',
  ],
];
const REVIEW = [
  [/\bhistory\.pushState\s*\(/, 'history.pushState'],
  [/\bhistory\.replaceState\s*\(/, 'history.replaceState'],
  [/\bhistory\.(?:back|forward|go)\s*\(/, 'programmatic history navigation'],
  [/\bonpopstate\b|addEventListener\(\s*['"]popstate['"]/, 'popstate handler'],
  [/addEventListener\(\s*['"]beforeunload['"]/, 'beforeunload handler'],
];

const sourceFiles = [...walk(SRC, '.tsx'), ...walk(SRC, '.ts')];
for (const file of sourceFiles) {
  const code = readFileSync(file, 'utf8');
  for (const [pattern, label] of BAD_IN_REDIRECT) {
    for (const m of code.matchAll(pattern)) {
      if (HANDOFF_SCHEME.test(m[1] ?? '')) continue;
      fail(`${rel(file)}: ${label} — ${m[0].trim().slice(0, 90)}`);
    }
  }
  for (const [pattern, label] of REVIEW) {
    if (pattern.test(code)) notes.push(`${rel(file)}: uses ${label} — confirm Back still works`);
  }
}

/* --------------------------------- 3. the retired-URL redirect keeps its shape */

const legacy = join(SRC, 'components', 'LegacyRedirect.tsx');
if (existsSync(legacy)) {
  const code = readFileSync(legacy, 'utf8');
  if (!/window\.location\.replace\(/.test(code)) {
    fail(
      'src/components/LegacyRedirect.tsx no longer calls window.location.replace() — ' +
        'this is the Back-button fix; any other form re-creates the trap it removed'
    );
  }
} else {
  notes.push('src/components/LegacyRedirect.tsx is gone — confirm no retired URL still needs it');
}

// The retired page must also still render readable content, so a visitor with
// JavaScript disabled gets an explanation and a link rather than a blank screen.
const legacyPage = join(OUT, 'apps', '82-0-pro-basketball-draft', 'index.html');
if (existsSync(legacyPage)) {
  const html = readFileSync(legacyPage, 'utf8');
  if (!/<h1[^>]*>/.test(html)) fail('retired app page renders no <h1> — no no-JS fallback');
  if (!/href="\/apps\/pro-basketball-draft-gm-mode\/"/.test(html)) {
    fail('retired app page does not link its replacement — no no-JS escape route');
  }
}

/* ------------------------------------------------------- 4. no history.length traps */

// A page that reopens itself on unload, or that stacks entries on scroll, is the
// other shape of back-button hijacking. Neither exists here; this asserts it.
for (const file of htmlFiles) {
  const html = readFileSync(file, 'utf8');
  if (/window\.open\s*\([^)]*\)\s*;?\s*(?:window\.)?history/.test(html)) {
    fail(`${rel(file)}: window.open combined with history manipulation`);
  }
}

/* ----------------------------------------------------------------- reporting */

console.log(`back-navigation audit — ${htmlFiles.length} page(s), ${sourceFiles.length} source file(s)`);

if (notes.length) {
  console.log(`\n${notes.length} note(s) for human review:`);
  for (const n of notes) console.log(`  · ${n}`);
}

if (problems.length) {
  console.error(`\n${problems.length} PROBLEM(S):`);
  for (const p of problems) console.error(`  ✗ ${p}`);
  process.exit(1);
}

console.log('\nback navigation clean — no zero-delay refresh, no history-pushing redirect');
