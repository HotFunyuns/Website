# Search Console duplicate / canonical diagnosis

> **No authenticated Google Search Console access was available for this
> investigation.** Everything below is derived from a full audit of the
> repository, the built `out/` directory at commit `acb47f8`, and live HTTP
> probes of `https://reigncreativellc.com` performed on **2026-09-15**. The
> mapping of specific URLs onto specific Search Console buckets is
> **inference from a production audit, not a readout of the report**. Nothing
> here should be recorded as "the issue is fixed" — Google is the only party
> that can confirm that, and only after re-crawling.
>
> **In-flight work:** other agents on this wave have since landed fixes in the
> working tree (uncommitted, undeployed). §6 records their status. Everything
> in §1–§5 describes the site **as live on 2026-09-15**, before those changes
> ship.

**Reported Search Console state (relayed by the owner, unverified by us):**

| Bucket | Count |
|---|---|
| Indexed | 59 |
| Excluded — **Duplicate without user-selected canonical** | **12** |
| Excluded — Page with redirect | 2 |
| Excluded — Not found (404) | 1 |
| Excluded — Alternate page with proper canonical tag | 1 |
| **Total known to Google** | **75** |

**The semantics that drive this whole analysis.** Google reports
*Duplicate without user-selected canonical* when it groups a URL with a
duplicate **and finds no canonical declaration on that URL at all**. When a
canonical *is* present but Google disagrees with it, the bucket is
*Duplicate, Google chose different canonical than user* — and that bucket is
**not** being reported here. So the search is specifically for surfaces that
return **HTTP 200 with real duplicate content and no canonical whatsoever**.

That constraint is doing a lot of work, because it eliminates almost the
entire HTML surface of this site. See §2.

---

## 1. Summary — ranked root causes

| # | Root cause | Confidence | Accounts for |
|---|---|---|---|
| **R1** | **Next.js RSC flight payloads served at `/<route>/index.txt`** — 229 URLs, HTTP 200, `text/plain`, containing the full human-readable page text, structurally incapable of carrying a canonical | **High** | Most or all of the 12 |
| **R2** | **`http://` origin serves 200 and never upgrades to `https://`** — a complete second copy of all 231 pages under a second scheme | **Medium-high** as a contributor | Duplicate pressure site-wide; possibly some of the 12 |
| **R3** | **Crawl history: the site had *no* canonical tags at all from 2026-04-22 to 2026-07-06** | **Medium**, decaying | A residual tail of the 12 |
| **R4** | `/blog/category/<id>/` is a ~97–99 % content subset of `/apps/category/<id>/` (7 pairs, same `<h1>`) | **Low** for *this* bucket, **real** as a latent risk | 0 of the 12 today |
| **R5** | Path/query noise that serves 200 duplicates: `?utm_*`, `?ref=`, `?page=`, `?_rsc=`, `//`, `/…/index.html` | **Low** for this bucket | Likelier the 1 *Alternate page with proper canonical tag* |
| **R6** | `/404/` and `/404.html` | **Refuted** — they are `noindex`; see R6 below | 0 of the 12 |
| **R7** | `/llms.txt` and `/blog/rss.xml` — 200, no canonical possible, reproduce site metadata | **Low** | At most 1–2 of the 12 |

### R1 — the RSC `index.txt` surface (primary; confirmed as a surface)

This was the lead's primary hypothesis. **The surface is confirmed. The
attribution to the 12 is inferred.**

What was verified:

1. **229 `index.txt` files exist in `out/`** — one beside every `index.html`
   except `out/404/`. (`231` HTML files = `230` `index.html` + `404.html`.)
2. **They are live, at 200, as `text/plain`.** 32 distinct existing `index.txt`
   URLs were probed across every page type (homepage, blog index, apps index,
   app detail, app category, blog category, article, legal pages). **All 32
   returned `200 text/plain; charset=utf-8`.** Zero exceptions. The one
   `index.txt` probe that did *not* return 200 was `/404/index.txt`, which
   correctly returns **404** because `out/404/` is the single route with no
   payload file.
3. **They contain the page's complete primary text.** This is not a summary or
   a manifest. `https://reigncreativellc.com/blog/android-video-player-guide/index.txt`
   (60,374 bytes) contains the article's body verbatim, `<h2>`/`<p>`/`<ul>`
   markup and all:

   > `<h3 id="it-plays-but-stutters-or-drops-frames">It plays, but stutters or drops frames</h3><p>The decode is happening in software rather than on dedicated hardware.</p>…`

   The same holds for app pages (`/apps/protein-diet-tracker/index.txt`,
   59,837 bytes — every feature heading and paragraph) and for the homepage
   (`/index.txt`, 81,296 bytes — every app's `longDescription`).
4. **They cannot carry a canonical.** The payload *does* contain a serialized
   React element `["$","link","12",{"rel":"canonical","href":"…"}]`, but that
   is JSON inside a `text/plain` document, not an HTML `<link>` tag. Google
   accepts a canonical only from parsed HTML or from an HTTP `Link:` header.
5. **No HTTP header can rescue them.** `public/_headers` is Netlify/Cloudflare
   syntax and GitHub Pages ignores it — **proved live**: a response for
   `/apps/protein-diet-tracker/` carries *none* of the six headers that file
   declares (no `X-Frame-Options`, no CSP, no HSTS, no
   `X-Content-Type-Options`). So `X-Robots-Tag: noindex` is not available
   either.
6. **Discovery path.** The `.txt` URLs appear in **no** `<a href>`, **no**
   `<link>`, the sitemap, or `llms.txt` — a grep of all 231 built HTML files
   for `index.txt` returns nothing. They are constructed **at runtime by the
   Next.js App Router**, in `out/_next/static/chunks/117-21d4b81fd4ecddbc.js`:

   ```js
   t.pathname.endsWith("/") ? t.pathname += "index.txt" : t.pathname += ".txt",
   t.searchParams.set(r.NEXT_RSC_UNION_QUERY, h);
   let n = await fetch(t, { credentials: "same-origin", headers … })
   ```

   So the fetched URL is `https://reigncreativellc.com/<route>/index.txt?_rsc=<hash>`,
   fired by `<Link>` prefetch. **`/index.txt?_rsc=abc123` was probed live and
   returns 200 `text/plain`** — the query string is ignored by GitHub Pages,
   so the exact URL the router requests is independently crawlable.

Why this is more than speculation: Googlebot crawling Next.js RSC prefetch
URLs is a **documented, widely-reported phenomenon**. In
[vercel/next.js Discussion #61850](https://github.com/vercel/next.js/discussions/61850)
site owners report that "Google is massively crawling pages with `_rsc`
parameters in the URL, which leads to errors in identifying canonical pages",
and the discussion identifies the discovery mechanism as the internal prefetch
issued by `<Link>` components.

**The distinction that matters for this site.** In the common
server-rendered case the crawled URL is *the page's own path* plus `?_rsc=`,
and reporters overwhelmingly see the bucket **"Alternative page with proper
canonical tag"** — Google can associate the variant with the clean URL. Under
`output: 'export'` the URL is a **different path entirely** (`…/index.txt`)
with a **non-HTML content type** and **no canonical anywhere in the
response**. There is nothing for Google to associate it with except content
similarity. That is precisely the definition of
**Duplicate without user-selected canonical** — and it is why this site sees
that bucket rather than the alternate-canonical one that SSR sites report.

**What is still inference:** we cannot confirm that the 12 reported URLs *are*
`index.txt` URLs. Only the owner can, by reading the example URLs out of the
report (§7.1).

### R2 — `http://` never upgrades to `https://`

Re-verified 2026-09-15:

| URL | Result |
|---|---|
| `http://reigncreativellc.com/` | **200** `text/html`, 143,217 bytes — byte-identical to the https response. No redirect. |
| `http://reigncreativellc.com/blog/android-video-player-guide/` | **200**, 119,695 bytes — identical to https |
| `http://reigncreativellc.com/sitemap.xml` | **200** |
| `http://www.reigncreativellc.com/` | 301 → `http://reigncreativellc.com/` — **the redirect preserves the insecure scheme** |
| `https://hotfunyuns.github.io/Website/` | 301 → **`http://reigncreativellc.com/`** — the GitHub Pages custom-domain redirect also lands on http |

So every page on this site exists twice, once per scheme, and two of the three
entry redirects deliver traffic *into* the http copy.

**Which bucket does this produce?** The http copy serves the same HTML,
including `<link rel="canonical" href="https://…">`. A canonical *is* present
and it points at the https URL, so an http HTML page should be reported as
**Alternate page with proper canonical tag**, not as an uncanonicalised
duplicate. **But `http://reigncreativellc.com/<route>/index.txt` also returns
200 with no canonical** — R2 therefore *doubles the size of the R1 surface*
from 229 URLs to 458. That is its main contribution to this specific bucket.

This is **not fixable from the repository.** GitHub Pages cannot serve a
redirect from code. It requires the owner to switch on **Enforce HTTPS** in
the repo's Pages settings. See §7.2.

### R3 — the pre-canonical crawl window

`git log` on this repository:

- `8f64b1c` **2026-04-22** — initial site. `output: 'export'` and
  `trailingSlash: true` from day one, so the URL shape has never changed.
- `b3c2415` **2026-07-06** — "Redesign Reign Creative website and add SEO app
  pages". This is the **first commit that introduces `canonical` anywhere in
  `src/`** (`git log -S'canonical' -- src/` returns nothing older).

For roughly **2.5 months** the live site served every page at 200 with **no
canonical tag at all**. At the time it had only 7 routes (`/`, `/about/`,
`/apps/`, `/app-support/`, `/privacy/`, `/support/`, `/terms/`) plus their
`index.txt` twins and `/index.html`. Anything Google clustered as a duplicate
in that window entered this exact bucket, and a URL can sit in it until Google
re-crawls and re-evaluates. This is a genuinely plausible source of a residual
tail — it is *self-healing* and needs no code change, only re-crawling.

### R4 — `/blog/category/<id>/` ⊂ `/apps/category/<id>/`

A normalised-content pass over all 231 built pages (`<main>` region, scripts,
styles, `<nav>`, `<header>`, `<footer>` stripped, whitespace collapsed,
lowercased) found **exactly one exact-duplicate group** — `404.html` ==
`404/index.html` — and **seven near-duplicate pairs**, all of the same shape:

| Pair | 5-gram Jaccard | Containment of the smaller in the larger |
|---|---|---|
| `apps/category/sports-gm/` ↔ `blog/category/sports-gm/` | 0.768 | **0.994** |
| `apps/category/health-nutrition/` ↔ `blog/category/health-nutrition/` | 0.733 | **0.985** |
| `apps/category/language-learning/` ↔ `blog/category/language-learning/` | 0.725 | **0.990** |
| `apps/category/action-arcade/` ↔ `blog/category/action-arcade/` | 0.637 | **0.977** |
| `apps/category/video-utility/` ↔ `blog/category/video-utility/` | 0.629 | **0.970** |
| `apps/category/education-brain/` ↔ `blog/category/education-brain/` | 0.626 | **0.975** |
| `apps/category/anime-creative/` ↔ `blog/category/anime-creative/` | 0.581 | **0.969** |

Cause: `/apps/category/<id>/` renders the app cards, the category prose **and
the complete list of article cards for that category**; `/blog/category/<id>/`
renders *only* that same article list. The two pages also share an identical
`<h1>` and tagline — e.g. both render `Video & Utility Apps` /
"Practical Android tools that stay out of your way."

**This is not the reported bucket.** Both pages carry a correct absolute
self-canonical, so if Google folded them the report would read *Duplicate,
Google chose different canonical than user*. It is listed here because it is a
real duplicate-content liability that will surface as exactly that bucket if
left alone, and because a reader of this report will otherwise find these pairs
and assume they are the answer. **They are not the answer.**

### R6 — `/404/` and `/404.html` are **not** the cause (refuted)

The briefing flagged these as a secondary no-canonical surface. They are
indeed the only two built pages with no canonical (`alternates: { canonical: null }`
in `src/app/not-found.tsx`), they are byte-identical (both 35,193 bytes live),
and both return **200** rather than 404. But `src/app/not-found.tsx` also sets
`robots: { index: false, follow: true }`, and this is **live-verified**:

```
$ curl -sS https://reigncreativellc.com/404/ | grep -o '<meta name="robots"[^>]*>'
<meta name="robots" content="noindex"/>
<meta name="robots" content="noindex, follow"/>
```

A `noindex` URL is reported under **Excluded by 'noindex' tag**, not under a
duplicate bucket. The relayed summary contains **no** `noindex` bucket at all,
which is consistent with Google simply never having crawled them — both are
**orphans**: no internal link anywhere in the 231 built pages points at
`/404/` or `/404.html`, and neither is in the sitemap.

(Minor, separate: the two `<meta name="robots">` tags are redundant. Harmless,
but untidy — noted for whoever owns `src/app/not-found.tsx`.)

---

## 2. What the audit positively ruled out

This section exists so the lead does not spend another agent's budget here.

### 2.1 Canonical hygiene is essentially perfect

A parse of all 231 built HTML files:

| Check | Result |
|---|---|
| Pages with **no** canonical | **2** — `404.html`, `404/index.html` (both `noindex`, intentional) |
| Pages with **more than one** canonical | **0** |
| **Relative** canonicals | **0** — all 229 are absolute `https://reigncreativellc.com/…` |
| Canonicals on a non-production host | **0** |
| Canonical ≠ own route | **1** — `/apps/82-0-pro-basketball-draft/` → `/apps/pro-basketball-draft-gm-mode/` (deliberate, see §3 and §5) |
| `og:url` ≠ canonical | **1** — the same alias page (a real defect — see §6, F3) |
| JSON-LD that fails to parse | **0** |
| JSON-LD `url` / `mainEntityOfPage` disagreeing with canonical | **0** |
| `noindex` pages | **2** — the two 404s only |
| Canonical targets that are **not** 200 | **0 of 68 sampled** (all 53 non-article canonicals + a 15-article spread) |

### 2.2 The six URL signals agree

| Signal | Count | Agreement |
|---|---|---|
| Distinct `<link rel="canonical">` targets | 228 | — |
| `<loc>` entries in `sitemap.xml` | 228 | **exact set match** with the canonical set, both directions |
| `<link>` items in `blog/rss.xml` | 175 | every one is a valid canonical; every one of the 175 article canonicals is in the feed |
| Site URLs in `llms.txt` | 214 | every one is a valid canonical |
| `og:url` | 231 | matches canonical on all but the alias page |
| JSON-LD `url` | 231 | matches canonical everywhere (the extra `https://reigncreativellc.com` values are the site-wide `Organization` / `WebSite` nodes, which are correct) |

### 2.3 Internal linking is canonical-clean

Across all 228 distinct internal page `href`s in the built output:

- **0** without a trailing slash (none would trigger a 301)
- **0** with a query string
- **0** containing `index.html`
- **0** containing an uppercase character
- **0** pointing at a route that does not exist

Only **3 orphan routes** exist: `/404.html`, `/404/`, and
`/apps/82-0-pro-basketball-draft/` — all three intentionally.

### 2.4 No host or environment leakage

Grepping `out/` for `github.io`, `vercel.app`, `localhost`, `127.0.0.1`,
`netlify` and `http://`:

- `vercel.app`, `localhost`, `127.0.0.1`, `netlify` — **zero hits**.
- `github.io` — hits only in two articles, as legitimate source citations
  (`https://aomediacodec.github.io/av1-spec/`).
- `http://` — only `http://www.w3.org` and `http://www.sitemaps.org`, both XML
  namespace identifiers, not links.

### 2.5 Path-normalisation behaviour (live, 2026-09-15)

| Variation | Result | Verdict |
|---|---|---|
| Missing trailing slash — `/blog`, `/about`, `/apps`, `/apps/protein-diet-tracker`, `/apps/category/sports-gm`, `/blog/category/sports-gm`, `/blog/android-video-player-guide`, `/apps/82-0-pro-basketball-draft` | **301** → slashed form, every time | Correct |
| `www.` → apex | **301** | Correct (but preserves scheme — see R2) |
| Uppercase — `/Blog/`, `/BLOG/`, `/Apps/`, `/blog/Android-Video-Player-Guide/` | **404** | Correct — no case duplicates |
| `/blog/<slug>.txt` (the router's non-slash `.txt` form) | **404** | Only the `…/index.txt` form exists |
| Common CMS aliases — `/feed/`, `/rss.xml`, `/atom.xml`, `/sitemap_index.xml`, `/category/<id>/`, `/tag/<x>/`, `/blog/page/2/`, `/home/`, `/index/` | **404** | Correct |
| Renamed-app aliases — `/apps/pro-basketball-gm-franchise/`, `/apps/38-0-0-pro-football-gm-soccer/` | **404** | **Correct — see §2.6** |
| `hotfunyuns.github.io` root | 404 | No cross-host duplicate |

### 2.6 The renamed apps did **not** create alias routes

Two apps were renamed while keeping their slug (`pro-basketball-draft-gm-mode`
is now "Pro Basketball GM Franchise"; `soccer-draft-gm-xi` is now "38-0-0 Pro
Football GM Soccer"). Confirmed clean:

- `src/app/apps/` contains exactly one hardcoded route beside `[slug]` and
  `category/[category]` — namely `82-0-pro-basketball-draft`, the deliberate
  legacy alias.
- Probing name-derived slugs returns **404**.
- `git log --diff-filter=DR` over `content/blog/` and `src/data/apps/` returns
  **nothing** — no route has ever been deleted or renamed in this repository.

---

## 3. Duplicate / at-risk URL inventory

All statuses observed live on **2026-09-15**. No fix in this table has been
applied — this agent owns only this document. "Owner" names the file and the
agent who must make the change.

| URL (pattern or exact) | HTTP status | Content-type | Canonical present? | Canonical value | Preferred canonical | Root cause | Fix — recommended (owner) | In sitemap? | In RSS? | Internally linked? | Most likely GSC bucket |
|---|---|---|---|---|---|---|---|---|---|---|---|
| `https://reigncreativellc.com/<route>/index.txt` — **229 URLs** (32 verified) | **200** | `text/plain` | **NO — impossible** | — | the parent HTML route | **R1** | **Delete at build time** — `scripts/postbuild-normalize-urls.mjs` (landed; see §6 F1). *Not* a robots.txt rule | No | No | **No** — runtime `fetch()` only | **Duplicate without user-selected canonical** |
| `…/index.txt?_rsc=<hash>` (same 229, as the router requests them) | **200** | `text/plain` | **NO** | — | parent HTML route | **R1** | same deletion — once the file is gone the query form 404s too | No | No | fetched by `<Link>` prefetch | **Duplicate without user-selected canonical** |
| `http://reigncreativellc.com/<route>/index.txt` — **229 more** | **200** | `text/plain` | **NO** | — | https parent route | **R1 + R2** | **Enforce HTTPS** — *owner, GitHub Pages settings*; the deletion in §6 F1 also removes these | No | No | No | **Duplicate without user-selected canonical** |
| `http://reigncreativellc.com/<any route>/` — **230 URLs** | **200** | `text/html` | Yes | `https://…` (correct) | the https URL | **R2** | **Enforce HTTPS** — *owner* | No¹ | No¹ | No | Alternate page with proper canonical tag |
| `https://reigncreativellc.com/llms.txt` | **200** | `text/plain` | **NO — impossible** | — | n/a (it is an original artifact) | **R7** | Leave. Optionally `Allow` it explicitly. Reproduces titles + one-line descriptions for 214 URLs, **not** article bodies | No | No | **No** — referenced nowhere | Duplicate without user-selected canonical *(low)* |
| `https://reigncreativellc.com/blog/rss.xml` | **200** | `application/xml` | **NO — impossible** | — | `/blog/` | **R7** | Leave. Note it has **no `<link rel="alternate">`** anywhere in the HTML, so it is not auto-discoverable | No | — | **No** | Duplicate without user-selected canonical *(low)* |
| `https://reigncreativellc.com/404/` | **200** ⚠ soft-404 | `text/html` | **NO** *(deliberate)* | — | none — should not be indexed | **R6** | `/404/` is **deleted at build time** by `postbuild-normalize-urls.mjs` (landed), so this URL stops existing. Do **not** "fix" the missing canonical on `404.html` | No | No | No (orphan) | **Excluded by 'noindex' tag** |
| `https://reigncreativellc.com/404.html` | **200** ⚠ soft-404 | `text/html` | **NO** *(deliberate)* | — | none | **R6** | **Keep.** This is the real 404 handler, served with a genuine 404 status for unknown paths. `canonical: null` + `noindex` is correct | No | No | No (orphan) | **Excluded by 'noindex' tag** |
| `https://reigncreativellc.com/index.html` | **200** | `text/html` | Yes | `https://reigncreativellc.com/` | `/` | **R5** | None possible — GitHub Pages always serves `index.html`. Canonical already handles it | No | No | **No** | **Alternate page with proper canonical tag** ← best candidate for the reported 1 |
| `https://reigncreativellc.com/<route>/index.html` — 229 more | **200** | `text/html` | Yes | the clean route | the clean route | **R5** | None possible; canonical handles it | No | No | No | Alternate page with proper canonical tag |
| `https://reigncreativellc.com/?utm_source=…`, `?ref=…`, `?page=2` | **200** | `text/html` | Yes | `https://reigncreativellc.com/` | `/` | **R5** | None needed — canonical is correct | No | No | **No** — 0 internal hrefs carry a query string | Alternate page with proper canonical tag |
| `https://reigncreativellc.com/<route>/?_rsc=<hash>` | **200** | `text/html` | Yes | the clean route | the clean route | **R5** | **Do not robots-block these.** They already resolve correctly via canonical; blocking risks *Indexed, though blocked by robots.txt* (see §6, "Things to not do") | No | No | No | Alternate page with proper canonical tag |
| `https://reigncreativellc.com//` and `/blog//` | **200** | `text/html` | Yes | the single-slash route | single-slash route | **R5** | None possible on GitHub Pages; canonical handles it | No | No | No | Alternate page with proper canonical tag |
| `https://reigncreativellc.com/blog` (and every other slash-less form) | **301** | `text/html` | n/a | → slashed form | slashed form | correct behaviour | None | No | No | No | **Page with redirect** ← candidate for the reported 2 |
| `https://www.reigncreativellc.com/…` | **301** | `text/html` | n/a | → apex, **same scheme** | https apex | **R2** (scheme preserved) | **Enforce HTTPS** fixes the scheme half — *owner* | No | No | No | **Page with redirect** ← candidate for the reported 2 |
| `https://reigncreativellc.com/apps/82-0-pro-basketball-draft/` | **200** | `text/html` | Yes | `/apps/pro-basketball-draft-gm-mode/` | that target | deliberate legacy alias | **`og:url` is wrong** — it inherits the layout default `https://reigncreativellc.com/` while the canonical points at the new slug. Add `openGraph: { url: … }` — *`src/app/apps/82-0-pro-basketball-draft/page.tsx` agent* | **No** | No | **No** (orphan) | **Page with redirect** *(if Google renders the `location.replace`)* or **Alternate page with proper canonical tag** *(if it does not)* |
| `/blog/category/<id>/` — **7 URLs** | **200** | `text/html` | Yes | self | self (keep) — see §6, F4 | **R4** | Differentiate the two category families, or fold one — *content/templates agent*; **not** a canonical change | Yes | No | Yes | *Not currently in a duplicate bucket.* Latent **Duplicate, Google chose different canonical than user** |

¹ The sitemap and RSS are https-only, which is correct.

---

## 4. Mapping onto the 16 exclusions

Honest labelling: **P** = proven by direct observation, **I** = inference.

### The 12 "Duplicate without user-selected canonical"

**Best explanation: `/<route>/index.txt`.**

- **P** — the surface exists, at scale (229 URLs, or 458 counting the http
  copy), at 200, with the full primary text, and with no canonical possible.
- **P** — the exact URLs the framework requests
  (`…/index.txt?_rsc=<hash>`) are independently crawlable at 200.
- **P** — Googlebot crawling Next.js RSC prefetch URLs is a documented,
  reproduced phenomenon (vercel/next.js #61850).
- **I** — that 12 of *these* are the 12 in the report.

**Why 12 and not 229?** Two things constrain it, and both are consistent:

1. **Google only knows 75 URLs of this site.** The sitemap carries 228. The
   139-article expansion shipped on **2026-09-04**, eleven days ago. Before it
   the site had ~92 routes. 59 indexed is close to "every non-article page plus
   a handful of articles" (54 non-article routes exist today), so Google's
   picture is roughly the pre-expansion site. Its `index.txt` population at
   that point was ~90, not 229.
2. These URLs have **no `<a href>` anywhere, no sitemap entry, and no external
   links**. They reach Googlebot only through renderer-initiated `fetch()`,
   which is sampled, not exhaustive. A low-double-digit discovered subset is
   exactly what that produces.

**Contributing, not alternative:** R2 doubles the surface; R3 leaves a
decaying tail from the 2026-04-22 → 2026-07-06 no-canonical window.

**Explicitly ruled out as the cause:** `/404/` and `/404.html` (`noindex`,
R6 above); every HTML route (all 229 carry exactly one absolute self-canonical,
§2.1); `/blog/category/<id>/` (self-canonical present — wrong bucket, R4 above).

### The 2 "Page with redirect"

**Candidates, in order (I):**

1. A slash-less form of a real URL — `https://reigncreativellc.com/blog`,
   `/about`, `/apps/protein-diet-tracker`, etc. All verified **301** to the
   slashed form. Google reaches these from external links or its own history;
   nothing internal produces them (**P**: 0 of 228 internal hrefs lack a
   trailing slash).
2. `https://www.reigncreativellc.com/<something>` — verified **301**.
3. `/apps/82-0-pro-basketball-draft/` — served at 200, but `<LegacyRedirect>`
   runs `location.replace()` on the client. If Googlebot renders it, it is
   classified as a redirect. This one is **orphaned and not in the sitemap**,
   so Google knows it only from its own history — which is exactly the
   population it was built for.

### The 1 "Not found (404)"

**Unresolved (I).** No candidate was found inside the repository:

- **P** — `git log --diff-filter=DR` over `content/blog/` and `src/data/apps/`
  returns nothing. No route has ever been removed or renamed here.
- **P** — 0 of 228 internal hrefs point at a non-existent route.
- **P** — the URL structure has been `trailingSlash: true` since the first
  commit, so no migration stranded an old URL shape.

So the 404 is almost certainly an **external** URL — a mistyped or truncated
inbound link, a stale third-party citation, or a legacy path from before
2026-04-22. **P** — unknown paths return a genuine `HTTP 404` (verified:
`/this-path-does-not-exist-xyz/` → `404`, body = `404.html`), so this is
correct behaviour being correctly reported. Only the owner can identify the
URL (§7.1).

### The 1 "Alternate page with proper canonical tag"

**Most likely `https://reigncreativellc.com/index.html` (I).** It is the
classic URL a crawler tries, it returns 200 with content byte-identical to `/`
(143,217 bytes each), and it carries `<link rel="canonical" href="https://reigncreativellc.com/">`.
That is the textbook definition of this bucket.

Equally consistent alternatives: an `http://` HTML page (R2 above), a `?utm_*` or
`?_rsc=` variant, a `//` double-slash form, or
`/apps/82-0-pro-basketball-draft/` if Google did **not** render its JS.

---

## 5. Are the other four exclusions intentional?

| Bucket | Verdict | Reasoning |
|---|---|---|
| **1 Not found (404)** | **Intentional — do not "fix"** | A 404 for a URL that has never existed is the correct response. GitHub Pages returns a true `404` status with the styled `404.html` body. The only action is to *look at* the URL: if it is a real inbound link worth capturing, the response is a new page or an alias route, **not** a canonical change. |
| **1 Alternate page with proper canonical tag** | **Intentional — do not "fix"** | This bucket means the canonical worked. Google found a duplicate URL, read its canonical, and consolidated onto the right page. That is the system operating correctly. Removing it would mean removing the duplicate URL, which on GitHub Pages is not possible (`/index.html` is the file that *is* `/`). |
| **2 Page with redirect** | **Intentional, with one caveat** | A 301 from a slash-less or `www.` form is the correct response and needs no change. **The caveat is R2**: `www.` → apex preserves the `http://` scheme, so `http://www.…` currently lands on an insecure 200 rather than the canonical https URL. That half *is* worth fixing, via Enforce HTTPS. The redirect itself is fine. If `/apps/82-0-pro-basketball-draft/` is one of the two, it is entirely intentional — the file comment in `page.tsx` explains that the missing `noindex` is deliberate so the canonical and the client-side replace can pass the old URL's equity to the renamed app. |
| **12 Duplicate without user-selected canonical** | **Not intentional** | This is the one real defect, and R1 + R2 are its causes. |

One framing worth keeping in front of the owner: a URL in *Duplicate without
user-selected canonical* is **excluded, not mis-indexed**. Google picked the
HTML page as canonical and dropped the duplicate — which is the outcome we
want. The cost is crawl budget and report noise, **not** suppressed rankings
for the real pages. The risk that justifies acting is the tail case where
Google picks the `.txt` as the cluster canonical. Nothing observed suggests it
has.

---

## 6. Fixes — status and owners

**This agent applied no fixes.** It owns only this document. While this audit
was running, other agents on this wave landed changes in the working tree that
address most of what is below. Those changes are **uncommitted and undeployed**
at the time of writing — production still serves every `index.txt` — so the
diagnosis in §1–§4 describes the live site, and this section describes what is
staged to change it.

### F1 — Delete the RSC payloads at build time — **landed** *(`scripts/postbuild-normalize-urls.mjs`, wired in `.github/workflows/nextjs.yml`)*

The fix that landed is **better than the `robots.txt` rule this report was
going to recommend**, and the reasoning is worth recording because it is not
obvious.

`scripts/postbuild-normalize-urls.mjs` runs after `next build` and deletes:

1. every `out/<route>/index.txt` that sits beside an `index.html` — the 229 RSC
   flight payloads. It deliberately spares `out/robots.txt`, `out/app-ads.txt`
   (AdMob depends on it) and `out/llms.txt`, and it hard-fails if any
   `index.txt` survives without a sibling `index.html`.
2. `out/404/` — the soft-404 directory — while keeping `out/404.html`, which is
   the file GitHub Pages actually serves, with a genuine 404 status, for
   unknown paths. It refuses to run if `404.html` is missing.

**Why deletion beats `Disallow:`.** A robots-blocked URL is one Google may
never re-crawl, so it never sees the 404 that would resolve the duplicate, and
reporters in [vercel/next.js #61850](https://github.com/vercel/next.js/discussions/61850)
found Google moved blocked RSC URLs into *Indexed, though blocked by
robots.txt* rather than dropping them. A deleted file returns a real 404 and
falls out of the index cleanly. `public/robots.txt` now carries an explicit
comment recording that decision — **do not add a `Disallow` rule for
`index.txt`; it would undo this.**

**The cost, independently verified.** Deleting the payloads means the App
Router's prefetch `fetch()` gets a 404 instead of a flight response. Confirmed
in `node_modules/next/dist/client/components/router-reducer/fetch-server-response.js`:

```js
let isFlightResponse = contentType === RSC_CONTENT_TYPE_HEADER;
if (!isFlightResponse) { isFlightResponse = contentType.startsWith("text/plain"); }
if (!isFlightResponse || !res.ok) { … return doMpaNavigation(responseUrl.toString()); }
```

Both branches are taken once the file is gone (`!res.ok` **and**
`!isFlightResponse`), so the router falls back to `doMpaNavigation` — an
ordinary full-page browser navigation. **Internal links and Back/Forward keep
working; they simply stop being single-page transitions.** That is the whole
regression, and it is the right trade for removing 229 uncanonicalisable URLs.

**One real gap — flagged, not fixed (not this agent's file).**
`postbuild-normalize-urls.mjs` is invoked **only** from
`.github/workflows/nextjs.yml`. `package.json` still reads:

```json
"build": "next build && node scripts/validate-content.mjs"
```

There is no `postbuild` lifecycle key. So a local `npm run build` produces an
`out/` that **still contains all 229 payloads and `out/404/`** — CI output and
local output diverge, and any deploy path other than that one workflow ships
the duplicates.

The agent that wrote the normaliser spotted this too and specified the exact
lines needed, in `docs/url-normalization-audit.md` → *Package scripts*. **But
`package.json` has not actually been edited** — it still reads the two-command
`build` above. This is a live cross-agent handoff that can fall through the
gap: the doc says what to do, no one has done it. *Owner: whoever holds
`package.json`.* The script is idempotent, so adding it to `build` while
leaving the workflow step in place is safe.

Three deploy-gating audits were added alongside it and are wired into the same
workflow — `audit-canonicals.mjs` (one absolute self-referencing canonical per
page; canonical, `og:url` and JSON-LD agree), `audit-redirects.mjs` (no
`index.txt` survives; `404.html` exists and `404/` does not; no dead host
config shipped) and `audit-duplicate-content.mjs` (exact duplicate `<main>`
content fails, near-duplicates warn). These are the right gates, and they
encode this report's findings as regression tests.

### F2 — Turn on **Enforce HTTPS** — **still open, owner only** *(see §7.2)*

Not code. Not possible from the repository. **This is now the largest
unaddressed item in this report.** Once F1 deploys, the `index.txt` surface
disappears on both schemes — but the 230 `http://` HTML duplicates remain, and
both `www.` → apex and `hotfunyuns.github.io/Website/` → apex still deliver
traffic into the insecure copy.

### F3 — `og:url` on the legacy alias — **landed** *(`src/app/apps/82-0-pro-basketball-draft/page.tsx`)*

The page previously declared no `openGraph` block of its own, so it inherited
the root layout's `og:url` of `https://reigncreativellc.com/` while its
canonical pointed at `/apps/pro-basketball-draft-gm-mode/` — two different
answers to "what page is this?". An explicit `openGraph.url` matching the
canonical has been added. This was the only page on the site with the mismatch.

### F4 — Differentiate the category families — **still open** *(category templates / content)*

`/blog/category/<id>/` is a 97–99 % content subset of `/apps/category/<id>/`,
sharing the same `<h1>`. **Do not cross-canonicalise them** — they serve
different search intents, and folding them throws away the article-hub pages.
The fix is editorial: give the blog category page a distinct `<h1>`, and stop
rendering the full article list on the apps category page (link to the blog
category hub instead). This is a **latent** risk, not a current one — it would
surface as *Duplicate, Google chose different canonical than user*, which is
not the bucket being reported today. The new `audit-duplicate-content.mjs`
warns on these seven pairs rather than failing, which is the correct severity.

### F5 — Double `<meta name="robots">` on the 404 — **still open, cosmetic** *(`src/app/not-found.tsx`)*

`noindex` and `noindex, follow` are both emitted. Harmless. The file's
`canonical: null` has been correctly documented as deliberate and must stay.

### Things to **not** do

- **Do not add a `Disallow` for `index.txt`.** The files are being deleted
  instead; `public/robots.txt` documents that choice explicitly.
- **Do not add a canonical to `/404.html`.** One file answers for infinitely
  many unknown URLs, so a self-canonical would be false and a canonical to `/`
  would claim the homepage. `noindex` is the correct and sufficient signal.
- **Do not add `X-Robots-Tag` to `_headers` or `vercel.json`.** Both are
  **proven dead** in production — a live response carries none of the six
  headers `_headers` declared. GitHub Pages ignores both files entirely.
  (`public/_headers` has since been deleted in the working tree, correctly.)
- **Do not robots-block `?_rsc=` on HTML routes.** Those already resolve via
  canonical; blocking them invites the *Indexed, though blocked* failure mode.
- **Do not claim the bucket is fixed because a deploy succeeded.** Only a
  re-crawl decides, and that takes weeks.

### Unrelated findings worth routing elsewhere

- **No `CNAME` file in the repository.** The custom domain is configured only
  in the Pages UI; no `CNAME` exists in `public/` or anywhere tracked. If a
  deploy ever drops the domain binding, the entire site becomes a second live
  copy at `hotfunyuns.github.io/Website/`. Today that path correctly 301s — but
  to `http://reigncreativellc.com/`, i.e. into the insecure copy.
- **The duplicate deploy workflow is resolved.** Both
  `.github/workflows/deploy.yml` and `nextjs.yml` previously fired on every
  push to `main` against the same `pages` concurrency group. `deploy.yml` has
  been deleted in the working tree, leaving `nextjs.yml` — which is also the
  only workflow that runs the URL normaliser, so this deletion is load-bearing
  for F1.
- **Security headers are gone, not merely ignored.** `public/_headers` declared
  CSP, HSTS, `X-Frame-Options`, `X-Content-Type-Options`, `X-XSS-Protection`
  and `Permissions-Policy`, and GitHub Pages shipped **none** of them. Deleting
  the file is honest, but it does not add the protection — the site has no
  security headers and cannot have them on this host. Whoever owns security
  posture should know.

## 7. Still requires the owner

### 7.1 Read these out of Search Console — this is the one blocker

Open **Search Console → Indexing → Pages → "Duplicate without user-selected
canonical"** and copy **all 12 example URLs verbatim**. That single action
converts §4 from inference to fact. What to look for:

- If they end in **`index.txt`** (with or without `?_rsc=…`) → **R1 confirmed**;
  F1 is the fix.
- If they begin with **`http://`** → **R2 confirmed**; F2 is the fix.
- If they are ordinary **`https://` HTML routes** → **both hypotheses are
  wrong** and the cause is R3 (stale pre-2026-07-06 crawl data) or something
  this audit did not reach. Send them back and we re-open.

Also worth copying while in there:

- The **1 "Not found (404)"** URL — nothing in the repository explains it
  (§4, "The 1 Not found (404)"). We need the string.
- The **2 "Page with redirect"** URLs — to confirm whether one is
  `/apps/82-0-pro-basketball-draft/`.
- The **1 "Alternate page with proper canonical tag"** URL — to confirm the
  `/index.html` inference.

### 7.2 Settings only the owner can change

1. **GitHub Pages → Settings → Pages → Enforce HTTPS: ON.** The single highest-
   value action in this report and impossible from code. It collapses 229
   uncanonicalisable `http://…/index.txt` URLs and 230 `http://` HTML
   duplicates, and stops the `www.` and `github.io` redirects from delivering
   traffic into the insecure copy. *If the checkbox is greyed out, the
   certificate is still provisioning — re-check in a few hours.*
2. ~~**Consider deleting one of the two deploy workflows.**~~ **DONE in this
   release.** `.github/workflows/deploy.yml` was deleted; `nextjs.yml` is now
   the only workflow. They did not in fact race — the repo-scoped `pages`
   concurrency group serialised them — but every push ran two full builds and
   two deployments of the same artifact, and the two pinned different
   `deploy-pages` versions (v4 and v5), so which one actually went live was not
   obvious from the history.
3. **After F1 and F2 ship**, use *URL Inspection → Test live URL* on one
   `index.txt` URL and confirm it now returns **404** (not "blocked"), then
   **watch the bucket for 4–6 weeks.** Do not treat a successful deploy as
   resolution — only a re-crawl removes a URL from this report.

---

## 8. Verification method

Every command below is reproducible. Live probes were run **2026-09-15**
against `https://reigncreativellc.com`. The probe helper records status,
content-type, byte count and redirect target without following redirects:

```bash
# probe helper
while IFS= read -r u; do
  curl -sS -o /dev/null -L --max-redirs 0 \
    -w '%{http_code}|%{content_type}|%{size_download}|%{redirect_url}' "$u"
done < urls.txt
```

**Live probes — 158 distinct URLs**, in six batches: core routes and asset files;
scheme/host/slash/case/query variants; alternate hosts and common CMS aliases;
68 canonical targets (all 53 non-article canonicals + a 15-article spread);
21 `index.txt` URLs spanning every page type; and a final batch covering
`?_rsc=`, `//`, and per-type trailing-slash behaviour.

```bash
# header inspection (X-Robots-Tag, and whether public/_headers is honoured)
curl -sSI https://reigncreativellc.com/blog/android-video-player-guide/index.txt
curl -sSI https://reigncreativellc.com/apps/protein-diet-tracker/
curl -sSI https://reigncreativellc.com/this-path-does-not-exist-xyz/   # -> 404

# RSC payload content proof
curl -sS https://reigncreativellc.com/blog/android-video-player-guide/index.txt -o a.txt
tail -c +20000 a.txt | head -c 4000      # full <h2>/<p> article body
curl -sS https://reigncreativellc.com/404/ | grep -o '<meta name="robots"[^>]*>'
```

**Static analysis over `out/` (231 HTML files).** Three Node scripts, kept in
the session scratchpad as `a1-audit.js`, `a1-dupes.js`, `a1-links.js`:

- `a1-audit.js` — parses every built HTML file and extracts `<link rel=canonical>`
  (count, absolute/relative, host), `og:url`, `<meta name=robots>`, `<title>`,
  `<meta name=description>`, every JSON-LD block (`@type`, `url`,
  `mainEntityOfPage`), and the normalised `<main>` text. Normalisation strips
  `<script>`, `<style>`, `<nav>`, `<header>`, `<footer>`, then all tags and
  entities, collapses whitespace and lowercases. Emits SHA-1 content hashes.
  *(Note: the `<main>` region is the right unit here — `<article>` is used for
  teaser cards on this site, and extracting on it produces false duplicates.)*
- `a1-dupes.js` — exact-hash duplicate grouping, duplicate `<title>` and
  `<meta description>` grouping, and an O(n²) word-5-gram Jaccard **and**
  containment pass over all 231 pages (26,565 comparisons), reporting pairs at
  Jaccard ≥ 0.50 or containment ≥ 0.80.
- `a1-links.js` — extracts every internal `href` from all 231 files and checks
  for missing trailing slashes, query strings, `index.html`, uppercase, and
  dead targets; identifies orphan routes; and cross-checks the canonical set
  against `sitemap.xml`, `blog/rss.xml` and `llms.txt`.

```bash
# route ↔ sitemap diff
find out -name index.html | sed 's|^out||; s|/index\.html$|/|' | sort > routes.txt
grep -o '<loc>[^<]*</loc>' out/sitemap.xml \
  | sed 's|<loc>https://reigncreativellc.com||; s|</loc>||' | sort > sitemap.txt
comm -23 routes.txt sitemap.txt      # -> /404/ and /apps/82-0-pro-basketball-draft/

# host leakage
grep -rl 'github\.io\|vercel\.app\|localhost\|127\.0\.0\.1\|netlify' out \
  --include=*.html --include=*.xml --include=*.txt

# how the router builds the .txt URL
grep -o '.\{160\}\.txt.\{120\}' out/_next/static/chunks/117-21d4b81fd4ecddbc.js

# canonical / trailingSlash history
git log --format='%h %ad %s' --date=short -S'canonical' -- src/
git log --format='%h %ad %s' --date=short -S'trailingSlash' -- next.config.mjs
git log --diff-filter=DR --name-status -- content/blog/ src/data/apps/
git ls-tree -r --name-only 6a0db72 -- src/app | grep page.tsx
```

**External evidence** (checked 2026-09-15, both reachable):

- [vercel/next.js Discussion #61850 — "Google Search Console and Next.js caching, `_rsc=` issue"](https://github.com/vercel/next.js/discussions/61850)
  — Googlebot discovers RSC URLs via `<Link>` prefetch; reporters see
  *Alternative page with proper canonical tag* in the SSR case; robots.txt has
  moved some URLs to *Indexed, though blocked by robots.txt*.
- [Next.js — Guides: Static Exports](https://nextjs.org/docs/app/guides/static-exports)
  — `output: 'export'` behaviour.
- [Google — How Google Interprets the robots.txt Specification](https://developers.google.com/crawling/docs/robots-txt/robots-txt-spec)
  — `*` and `$` wildcard support, matching over path and query.

### What was **not** done

- `npm run build` was not run (another agent owns the build this wave). All
  static analysis is against the committed `out/`, current for `acb47f8`.
- No repository file other than this one was modified.
- No Search Console API or authenticated data was accessed.
