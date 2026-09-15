// Removes the duplicate URL surfaces that `next build` emits but that this
// site cannot canonicalise, because GitHub Pages serves every file it is given
// at HTTP 200 and cannot add a header, a redirect or a canonical of its own.
//
// Two surfaces are removed:
//
// 1. `out/<route>/index.txt` — the React Server Components flight payload that
//    App Router static export writes beside every `index.html`. GitHub Pages
//    serves it at `https://reigncreativellc.com/<route>/index.txt` with
//    HTTP 200 and `Content-Type: text/plain`. The body contains the page's full
//    rendered prose, so it is a byte-addressable duplicate of the HTML page,
//    and because it is not HTML it can carry no `<link rel="canonical">`. That
//    is the exact signature of Search Console's "Duplicate without
//    user-selected canonical". There is no way to attach a canonical to it and
//    no way to serve an `X-Robots-Tag` for it from GitHub Pages, so the only
//    honest fix is for the URL to stop existing.
//
//    Cost of removal, measured in next/dist/client/components/router-reducer/
//    fetch-server-response.js: when the `.txt` fetch is not a 200 text/plain
//    response the App Router falls back to `doMpaNavigation`, i.e. a normal
//    full-page browser navigation via `location.assign` (push) — so in-app
//    links and the Back/Forward buttons keep working, they just stop being
//    single-page transitions. See docs/url-normalization-audit.md.
//
// 2. `out/404/index.html` — a byte-identical copy of `out/404.html` that
//    `trailingSlash: true` emits. GitHub Pages uses `404.html` as the real
//    not-found handler and serves it with a genuine 404 status for unknown
//    paths; the `/404/` directory form instead answers HTTP 200, which is a
//    soft 404. `404.html` itself is left in place — deleting it would remove
//    the site's custom not-found page.
//
// Idempotent: running it twice removes nothing the second time.
//
// Run: node scripts/postbuild-normalize-urls.mjs

import { existsSync, readdirSync, rmSync, statSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { basename, dirname, join } from 'node:path';

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, '..');
const OUT = join(ROOT, 'out');

if (!existsSync(OUT)) {
  console.error('out/ not found — run `npm run build` first.');
  process.exit(1);
}

const rel = (f) => f.slice(OUT.length + 1).split('\\').join('/');

function walk(dir) {
  const found = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) found.push(...walk(full));
    else found.push(full);
  }
  return found;
}

/* ------------------------------------------- 1. RSC flight payloads (.txt) */

// Only files literally named `index.txt` that sit beside an `index.html` are
// flight payloads. This deliberately spares out/robots.txt, out/app-ads.txt
// (required by AdMob) and out/llms.txt, which are real, intentional documents.
const isPayload = (f) => basename(f) === 'index.txt' && existsSync(join(dirname(f), 'index.html'));
const payloads = walk(OUT).filter(isPayload);

let payloadBytes = 0;
for (const f of payloads) {
  payloadBytes += statSync(f).size;
  rmSync(f);
}

const orphans = walk(OUT).filter((f) => basename(f) === 'index.txt');
if (orphans.length > 0) {
  console.error(
    `index.txt files remain with no sibling index.html — investigate before shipping:\n  ${orphans
      .map(rel)
      .join('\n  ')}`
  );
  process.exit(1);
}

/* ------------------------------------------------- 2. the /404/ soft 404 */

const notFoundHandler = join(OUT, '404.html');
const notFoundDir = join(OUT, '404');
let removedNotFoundDir = false;

if (existsSync(notFoundDir)) {
  if (!existsSync(notFoundHandler)) {
    console.error('out/404.html is missing — refusing to remove out/404/, which would leave no 404 page.');
    process.exit(1);
  }
  rmSync(notFoundDir, { recursive: true });
  removedNotFoundDir = true;
}

/* --------------------------------------------------------------- reporting */

const kb = (n) => `${(n / 1024).toFixed(0)} KB`;
console.log(`removed ${payloads.length} RSC flight payload(s) (${kb(payloadBytes)})`);
console.log(removedNotFoundDir ? 'removed out/404/ (soft 404; out/404.html kept)' : 'out/404/ already absent');
console.log('url normalization complete');
