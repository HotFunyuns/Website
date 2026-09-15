# URL normalization audit

Scope: every URL variation this site answers on, what it returns, and what
mechanism (if any) consolidates it onto a canonical URL.

Host: **GitHub Pages**, serving the static export in `out/`.
Origin: `https://reigncreativellc.com`.
Measured: 2026-09-15, with `curl` against production and against the built
`out/` directory.

## What the host can and cannot do

Everything below follows from this, so it is stated first.

GitHub Pages serves files. It offers exactly **one** redirect of its own:
appending a trailing slash when the requested path is a directory. It does not:

- serve a 301 or 308 that we author — there is no `_redirects`, no
  `vercel.json` `redirects`, no `.htaccess`, no rules file of any kind;
- run middleware or any server code;
- send a custom response header — so no `X-Robots-Tag`, no
  `Link: <…>; rel="canonical"`, no CSP, no HSTS;
- treat paths case-insensitively.

**Verified, not assumed.** `curl -I https://reigncreativellc.com/` returns:

```
HTTP/1.1 200 OK
Server: GitHub.com
Content-Type: text/html; charset=utf-8
Cache-Control: max-age=600
ETag, Last-Modified, Age, Via, X-Served-By, X-Cache, Vary: Accept-Encoding
```

That is the complete set. **No** security header of any kind is sent: no
`Content-Security-Policy`, `Strict-Transport-Security`, `X-Frame-Options`,
`X-Content-Type-Options`, `Referrer-Policy` or `Permissions-Policy`. See
[Dead host configuration](#dead-host-configuration) for what the pages do and do
not get from their meta tags instead.

So the practical consequence: **the `<link rel="canonical">` inside each HTML
page is the only canonicalisation signal this site can send.** Anything that
cannot carry that tag cannot be canonicalised, and the only remaining lever is
whether the file exists at all. That is the shape of every fix in this document.

## Root cause of "Duplicate without user-selected canonical"

Search Console's `Duplicate without user-selected canonical` means Google found
a URL that duplicates a page it knows, and that URL carried **no canonical at
all**. Two surfaces on this site matched that description, and both were
verified live before the fix.

### 1. RSC flight payloads — 229 URLs (the main cause)

`output: 'export'` writes a React Server Components flight payload next to
every page: `out/<route>/index.txt`. GitHub Pages served each one:

```
https://reigncreativellc.com/index.txt                                 200  text/plain
https://reigncreativellc.com/blog/index.txt                            200  text/plain
https://reigncreativellc.com/blog/added-sugars-vs-total-sugars/index.txt  200  text/plain
```

The bodies were confirmed to contain the pages' full rendered prose — headings,
article body, disclaimers, app descriptions — as string literals inside the
flight format. The post-build normaliser reported deleting **229 files,
13,135 KB** in the verified build — a 57 KB average per URL.

Because they are `text/plain`, they cannot carry a `<link rel="canonical">`, and
because the host cannot send headers there is no `rel=canonical` header or
`X-Robots-Tag` available either. There was no way to canonicalise them. They had
to stop existing.

`scripts/postbuild-normalize-urls.mjs` deletes them after every build.

### 2. `/404/` — a 200-status soft 404

`trailingSlash: true` made the export emit `out/404/index.html`, byte-identical
to `out/404.html`. GitHub Pages used `404.html` as the real not-found handler
(verified: a random nonexistent path returns a genuine `404`), but served the
directory form at **HTTP 200** — a soft 404 duplicating the handler, with no
canonical, and it was the only pair of URLs on the whole site rendering
identical primary content.

The same post-build script deletes `out/404/` and keeps `out/404.html`.

> **Honest correction to the working hypothesis.** `/404/` and `/404.html` both
> carry `<meta name="robots" content="noindex">`. Google reports a noindexed URL
> under *Excluded by 'noindex' tag*, not under *Duplicate without user-selected
> canonical*. So `/404/` was very likely **not** one of the 12 reported pages.
> It was removed because a 200-status soft 404 is a real defect on its own
> terms, not because it explains the report. The RSC payloads are the
> explanation that fits: 229 URLs, 200 status, duplicate prose, no canonical,
> no noindex.

## Every URL variation tested

Status columns: **before** is production as measured on 2026-09-15; **after** is
what the next deploy will produce.

| URL variation | Before | After | Mechanism |
|---|---|---|---|
| `https://reigncreativellc.com/` | 200 | 200 | canonical page |
| `http://reigncreativellc.com/` | **200, no redirect** | **200, no redirect** | **cannot fix from the repo — owner action** |
| `https://www.reigncreativellc.com/` | 301 → apex | 301 → apex | GitHub Pages `www` handling |
| `/blog` (no trailing slash) | 301 → `/blog/` | 301 → `/blog/` | GitHub Pages directory redirect |
| `/blog/` | 200 | 200 | canonical page |
| `/blog/<slug>` | 301 → `/blog/<slug>/` | 301 → `/blog/<slug>/` | GitHub Pages directory redirect |
| `/index.html` | 200, duplicate of `/` | 200, duplicate of `/` | self-canonical inside the HTML points at `/` |
| `/blog/index.html` | 200, duplicate of `/blog/` | 200 | self-canonical points at `/blog/` |
| `/BLOG/`, `/Blog/` | 404 | 404 | paths are case-sensitive; no case duplicates exist |
| `/?utm_source=…&gclid=…` | 200 | 200 | self-canonical (parameterless) inside the HTML |
| `/blog/?utm_source=…` | 200 | 200 | self-canonical inside the HTML |
| `/index.txt` | **200 text/plain** | **404** | file deleted post-build |
| `/blog/index.txt` | **200 text/plain** | **404** | file deleted post-build |
| `/<any route>/index.txt` (229 URLs) | **200 text/plain** | **404** | files deleted post-build |
| `/404/` | **200 soft 404, no canonical** | **404** | directory deleted post-build |
| `/404.html` | 200 | 200 | unavoidable — it is the handler; carries `noindex` |
| `/_headers` | **200** (dead Netlify config) | **404** | `public/_headers` deleted |
| `/vercel.json` | 404 | 404 | never in `public/`, so never published |
| `/apps/82-0-pro-basketball-draft/` | 200, canonical to new slug, **`og:url` = homepage** | 200, canonical **and** `og:url` = new slug | canonical; see below |
| `/this-path-does-not-exist/` | 404 | 404 | GitHub Pages serves `404.html` with a real 404 |
| `/robots.txt`, `/sitemap.xml`, `/llms.txt`, `/app-ads.txt` | 200 | 200 | intentional documents |

### Trailing slash

Consistent and correct. `trailingSlash: true` makes every page a directory, the
host's own redirect normalises the slashless form onto it, and every canonical,
`og:url` and JSON-LD page URL ends in a slash. `scripts/audit-canonicals.mjs`
asserts all three agree, character for character, on every page.

### Case

GitHub Pages is case-sensitive, so `/BLOG/` is a 404 rather than a duplicate.
No mixed-case route exists in `out/`. Nothing to fix.

### Query parameters

`/?utm_source=x` and `/blog/?ref=y` return 200 with the same body as the clean
URL — unavoidable on a static host, which cannot strip or redirect parameters.
This is the ordinary, well-handled case: the served HTML contains a
parameterless absolute self-canonical, which is exactly the signal Google uses
to fold parameterised variants onto the clean URL. No action needed, and no
`robots.txt` rule should be added for it (see below).

## The retired app URL — an accepted trade-off

`/apps/82-0-pro-basketball-draft/` is the old URL of an app that was renamed to
`pro-basketball-draft-gm-mode`. It returns 200, canonicals to the replacement
page, and runs `location.replace()` to send a visitor there.

**This should be a 301 and cannot be.** GitHub Pages will not serve one. The
options were weighed as follows.

| Option | Verdict |
|---|---|
| HTTP 301 | Correct, **impossible on this host**. Requires migrating hosts — owner action. |
| `rel=canonical` to the replacement | **Chosen as the mechanism.** A signal Google supports and processes. |
| `location.replace()` for visitors | **Kept as a convenience on top of the canonical, not as the mechanism.** It replaces the history entry rather than pushing one, so Back goes where the visitor actually came from instead of bouncing forward again. That Back-button trap is the behaviour Google's spam policies prohibit, and it was a previously fixed bug here — see the comment in `src/components/LegacyRedirect.tsx`. Do not regress it. |
| `<meta http-equiv="refresh" content="0;…">` | Rejected. Zero-delay meta refresh is the pattern the spam policies single out, and it is the variant that leaves the retired URL in session history. |
| `noindex` on the retired page | Rejected. It contradicts the `rel=canonical` doing the consolidating; the pair is dropped without the old URL's signals being passed on. |
| Delete the route | Rejected. The URL would 404 and every external link to it would die. |

**The trade-off being accepted:** consolidation depends on Google processing a
`rel=canonical` rather than a redirect, which is a hint and not a directive, so
it is slower and not guaranteed. The compensating facts are that the page is
honest (its visible content says the app was renamed and links to it), the
canonical target is a genuinely equivalent page, and the URL is **absent from
`sitemap.xml`** — verified — so the sitemap advertises only canonical URLs.

One real defect was found and fixed here: the page shipped
`og:url = https://reigncreativellc.com/` (inherited from the root layout) beside
a canonical pointing at the app page — two different answers to "what page is
this?". `og:url` is now stated explicitly and matches the canonical.

### Other aliases

There are none. `src/app/apps/` contains only `[slug]`, `category/[category]`
and this one hardcoded legacy route, and the app catalog has no alias,
`previousSlug` or redirect field. The two other renamed apps kept their URLs, so
they need no alias.

## Duplicate rendered content

`scripts/audit-duplicate-content.mjs` strips head, header, footer, nav, scripts,
styles and inline SVG from all 230 pages and hashes what is left.

- Before: **one** exact duplicate pair — `/404/` and `/404.html`.
- After: **230 pages, 230 distinct content hashes.** No exact duplicates.
- No pair scored above 0.9 estimated Jaccard similarity, so there is no
  near-duplicate cannibalisation between articles either.

## Cost of removing the RSC payloads — measured, not assumed

Deleting `out/**/index.txt` changes client-side routing, so the consequence was
verified before the change was kept rather than after.

**What the Next.js source says.** In
`next/dist/client/components/router-reducer/fetch-server-response.js`, a `.txt`
response that is not a 200 `text/plain` falls through to `doMpaNavigation`.
`urlToUrlWithoutFlightMarker` strips the `/index.txt` suffix back off, and
`app-router.js` then calls `location.assign()` for a push navigation — which
**adds** a history entry — and `location.replace()` only for a replace
navigation. So Back and Forward keep behaving normally.

**What a browser actually did.** Headless Chrome, driven over the DevTools
Protocol against a local server reproducing GitHub Pages' semantics (directory
index, slash redirect, `404.html` with a real 404 status), on the post-removal
`out/`:

| Check | Result |
|---|---|
| blog index renders and hydrates (359 internal links) | pass |
| clicking an article link navigates to it | pass |
| the article renders — not the 404 page | pass |
| Back returns to `/blog/` | pass |
| Back renders the blog index, no redirect loop | pass |
| Forward returns to the article | pass |
| article → home navigates | pass |
| Back from home returns to the article | pass |
| uncaught page exceptions | 0 |

A marker global set before each click did not survive it, confirming the
navigation genuinely was the MPA fallback and that the test was measuring the
post-removal behaviour.

**What it costs.** Internal navigation is a full page load instead of a
single-page transition, and the server log shows one extra 301 per navigation
(`/blog/<slug>` → `/blog/<slug>/`), because the router strips `/index.txt` and
leaves no trailing slash. Across a three-navigation session the browser made 8
requests for now-missing `.txt` files. Those are not a bandwidth regression: the
404 body is 34 KB (6.6 KB gzipped) against a 57 KB average for the payload it
replaces, so the removal moves slightly *less* data, not more.

**What was rejected.** A `robots.txt` `Disallow` for `*/index.txt` would have
kept single-page navigation, and was rejected on the merits: a blocked URL is a
URL Google can never recrawl, so it would never see the 404 that resolves the
duplicate, and an already-indexed URL can persist indexless instead of dropping
out. Blocking is not canonicalisation. It is also not needed as a supplement
here — a 404 is a stronger and faster signal than a crawl block, and adding the
block on top would actively slow removal down. A comment in `public/robots.txt`
records this so the rule is not added later by someone trying to "fix
duplicates".

## Dead host configuration

| File | Status | Decision |
|---|---|---|
| `public/_headers` | Netlify/Cloudflare syntax. GitHub Pages ignored it **and published it** — `https://reigncreativellc.com/_headers` returned **200**. | **Deleted.** It applied nothing, it was a crawlable junk URL, and it advertised a CSP and HSTS policy that was never sent. |
| `vercel.json` | Repo root, never copied into `out/` — `/vercel.json` returns 404, so it is not published. Inert on this host. | **Kept**, as the ready-made header configuration if the site ever moves to a host that can serve headers. It is documented here as inert so no report can cite it as live security posture. |

**Security-header consequence, stated precisely.** Not one of the headers
declared in `vercel.json` and the deleted `public/_headers` is sent by GitHub
Pages, none ever has been, and no repository change can make them sent. What the
pages actually get comes from meta tags in `src/app/layout.tsx`, and only some of
those do anything:

| Policy | Header sent? | Meta tag present? | Actually in force? |
|---|---|---|---|
| `Content-Security-Policy` | no | yes, `<meta http-equiv>` | **yes** — browsers honour a meta CSP, minus the `frame-ancestors`, `report-uri` and `sandbox` directives, which are header-only |
| `Referrer-Policy` | no | yes, `<meta name="referrer">` | **yes** — the meta form is honoured (it is emitted twice, which is harmless but worth tidying) |
| `X-Content-Type-Options` | no | yes, `<meta http-equiv>` | **no** — browsers ignore this one in meta form |
| `Permissions-Policy` | no | yes, `<meta http-equiv>` | **no** — header-only |
| `X-Frame-Options` | no | no | **no** — header-only. The CSP has `frame-src 'none'`, which stops this site framing others; it is `frame-ancestors` that stops others framing this site, and that directive cannot be set from a meta tag |
| `Strict-Transport-Security` | no | n/a | **no** — header-only, and see owner action 1 |

So "this site has a CSP" is true and "this site has HSTS, `X-Frame-Options` or
clickjacking protection" is false. Any report saying otherwise needs correcting;
the stale claims found in `README.md` and `CHANGELOG.md` are listed in the
handover notes. Closing the gap requires a host that can send headers — see
owner actions.

## Deploy workflows

`.github/workflows/deploy.yml` and `.github/workflows/nextjs.yml` both triggered
on push to `main`, both ran `npm run build`, and both shared
`concurrency: group: "pages"`. Because a concurrency group is repo-scoped, they
did not race — they serialised. The actual consequence was two full builds and
two deployments of the same artifact per push (roughly doubling deploy time at
230 pages), a second entry in the `github-pages` environment every time, and
"whichever finished second is live" as the deciding rule between two workflows
pinned to **different** `deploy-pages` versions (v4 and v5).

`deploy.yml` was **deleted**. `nextjs.yml` survives: it is the one that has been
maintained (it was edited to call `npm run build` so the content gate runs, it
restores the Next build cache, and it is on the current action versions), while
`deploy.yml` had not been touched since the repository's first commit.
Production was confirmed to be serving with an empty `basePath`
(`src="/_next/…"`), so `configure-pages`' `static_site_generator: next`
injection is behaving correctly against the custom domain.

`nextjs.yml` now also runs `scripts/postbuild-normalize-urls.mjs` after the
build and gates the artifact upload on the three audit scripts.

## Regression tests

Plain Node, no dependencies, each exits non-zero on failure.

| Script | Asserts |
|---|---|
| `scripts/audit-canonicals.mjs` | exactly one `<link rel="canonical">` per page; absolute, https, on `reigncreativellc.com`; self-referencing and equal to the page's own output path; resolves to something present in `out/`; no unexpected `noindex`; canonical, `og:url` and the JSON-LD page URL agree including trailing slash; no first-party URL on `github.io`, `vercel.app`, `localhost` or `http://`; no two pages claiming the same canonical. Two documented exemptions, each with its reason inline. |
| `scripts/audit-redirects.mjs` | no `index.txt` payload survives; `out/404.html` exists and `out/404/` does not; no dead host config shipped; only the intended text documents are published; the retired alias exists, canonicals to a real page, is not `noindex`, and is absent from the sitemap; every sitemap `<loc>` is first-party and slash-terminated; `robots.txt` still allows `OAI-SearchBot`, `Claude-SearchBot` and `Claude-User`, points at the sitemap, and contains no `Disallow` at all. `--live` additionally probes production and prints observed versus expected status for every row in the table above. |
| `scripts/audit-duplicate-content.mjs` | no two URLs render identical primary content (fails); reports near-duplicate pairs above an estimated-Jaccard threshold (warns only — adjacent topics legitimately share phrasing, so it must not gate a deploy by itself). |

The `github.io` check is scoped to first-party URLs on purpose: three articles
legitimately cite `https://aomediacodec.github.io/av1-spec/`, which is a real
external source and not a stray deploy host.

## Cannot be fixed from the repository — owner actions

These are the ones that need someone with access to GitHub settings or to the
hosting decision. No repository change achieves any of them.

1. **Enable "Enforce HTTPS."** `http://reigncreativellc.com/` currently returns
   **HTTP 200 with the full page** — not a redirect. Verified:

   ```
   $ curl -I http://reigncreativellc.com/
   HTTP/1.1 200 OK
   Server: GitHub.com
   ```

   Every page on this site therefore exists on two schemes, and the `http://`
   copy is a duplicate carrying an `https://` canonical. The canonical points
   the right way, so this is consolidating rather than splitting, but the fix is
   one checkbox: **repository Settings → Pages → Enforce HTTPS**. It makes
   GitHub serve a 301 from `http://` to `https://` for the apex domain. Nothing
   in this repository can produce that redirect.

2. **Decide whether real security headers are wanted.** CSP, HSTS,
   `X-Frame-Options`, `Referrer-Policy` and `Permissions-Policy` are all absent
   in production and cannot be added on GitHub Pages. Getting them requires
   fronting the site with a host that can send headers — Cloudflare Pages,
   Netlify or Vercel. `vercel.json` already holds the intended policy.

3. **Decide whether a real 301 for the retired app URL is wanted.** Same
   migration. On Cloudflare Pages or Netlify it is one line in `_redirects`; on
   Vercel it is a `redirects` entry in the `vercel.json` already in the repo.
   Until then the `rel=canonical` is the mechanism, and it is a legitimate one.

4. **Confirm in Search Console after the deploy, not before.** A successful
   deploy is not acceptance. The `Duplicate without user-selected canonical`
   count should be watched over subsequent crawls; the removed URLs must be
   recrawled and seen to 404 before they leave the report, and nothing in this
   repository can accelerate that. Do not report the issue as resolved on the
   strength of the deploy.

## Package scripts

`package.json` is owned elsewhere; these are the lines this work needs:

```json
"postbuild:urls": "node scripts/postbuild-normalize-urls.mjs",
"audit:canonicals": "node scripts/audit-canonicals.mjs",
"audit:redirects": "node scripts/audit-redirects.mjs",
"audit:duplicates": "node scripts/audit-duplicate-content.mjs",
"audit:urls": "npm run audit:canonicals && npm run audit:redirects && npm run audit:duplicates",
"build": "next build && node scripts/validate-content.mjs && node scripts/postbuild-normalize-urls.mjs"
```

The `build` line is the important one: without it a local `npm run build` leaves
the duplicate URLs in `out/` and `npm run audit:urls` fails, which is the
intended loud failure rather than a silent one. The deploy workflow runs the
normaliser itself, so production is correct either way, and the script is
idempotent so running it twice is harmless.
