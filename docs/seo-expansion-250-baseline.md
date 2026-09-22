# Baseline before the 250-article expansion

Recorded **2026-09-21**, before any file in this repository was changed. Every
number below was measured, not estimated, and the command that produced it is
given so it can be re-run.

## 1. Working tree

| Item | Value |
| --- | --- |
| Branch | `main` |
| Upstream | `origin/main` |
| HEAD commit | `2170969bc972fe00de5d32aff36a3fbb6af6e066` |
| HEAD subject | `Fix canonical indexing and publish 100 app guides` |
| `git status` | clean — no staged, unstaged or untracked changes |
| Repository instruction files | none — there is no `AGENTS.md` and no `CLAUDE.md` in this repository |

No user work was in progress, so nothing had to be preserved, stashed or worked
around. Nothing was reset, discarded, reverted or overwritten.

## 2. Article inventory

```
node -e '...read JSON frontmatter of every content/blog/*.md...'
```

| Metric | Count |
| --- | ---: |
| Markdown files in `content/blog/` | 275 |
| `status: published` | 275 |
| `status: draft` | 0 |
| `status: review` | 0 |
| `status: scheduled` | 0 |
| Future-dated (would be withheld by `isPublicPost`) | 0 |

Every article on disk is published. There is no draft backlog and no gated
content, so there is nothing to leak and nothing to publish accidentally.

### By category

| Category | Articles |
| --- | ---: |
| `sports-gm` | 89 |
| `language-learning` | 70 |
| `health-nutrition` | 30 |
| `action-arcade` | 27 |
| `education-brain` | 24 |
| `video-utility` | 20 |
| `anime-creative` | 15 |

### By publication date

| Date | Articles |
| --- | ---: |
| 2026-08-09 | 21 |
| 2026-08-13 | 15 |
| 2026-09-04 | 139 |
| 2026-09-15 | 100 |

That is the documented history: 36 articles, then the 139-article release, then
the 100-article release. 21 + 15 + 139 + 100 = 275.

## 3. App inventory

39 apps in `src/data/apps/catalog/`:

| Catalog file | Apps |
| --- | ---: |
| `sports-gm.ts` | 14 |
| `language-learning.ts` | 10 |
| `action-arcade.ts` | 5 |
| `anime-creative.ts` | 3 |
| `health-nutrition.ts` | 3 |
| `education-brain.ts` | 2 |
| `video-utility.ts` | 2 |

## 4. Production comparison

Measured against `https://reigncreativellc.com` on 2026-09-21.

| Surface | Production | Repository | Agree? |
| --- | ---: | ---: | --- |
| Sitemap `<loc>` entries | 338 | 338 | yes |
| RSS `<item>` entries | 275 | 275 | yes |
| Published articles | 275 | 275 | yes |
| App pages | 39 | 39 | yes |

Sitemap arithmetic, which confirms nothing unexpected is in the file:
10 static pages + 7 app-category pages + 39 app pages + 7 blog-category pages
+ 275 articles = **338**.

Production and the repository are identical. The expansion therefore starts
from a known, reproducible state.

## 5. Duplicate-URL corrections from the previous release — still intact

The 2026-09-15 release removed the static-export RSC `index.txt` duplicates.
Each of these was re-checked today against production:

| Check | Result |
| --- | --- |
| `/blog/index.txt` | **404** |
| `/blog/why-rome-fell/index.txt` | **404** |
| `/blog/why-rome-fell/` | **200**, HTML |
| `robots.txt` exposes the sitemap | yes — `Sitemap: https://reigncreativellc.com/sitemap.xml` |
| `robots.txt` allows Googlebot / Bingbot | yes — site-wide `User-agent: * / Allow: /` |
| `robots.txt` allows OAI-SearchBot, Claude-SearchBot, Claude-User | yes — explicit `Allow: /` for each |
| Training-only crawler rules (GPTBot, ClaudeBot, CCBot) | no rules of their own; they inherit the site-wide Allow. **Left untouched by this expansion.** |

`scripts/postbuild-normalize-urls.mjs` runs as the last step of `npm run build`
and is what keeps the `index.txt` URLs from coming back. It must stay in the
build script; this expansion does not remove or reorder it.

## 6. Was the earlier 50-article expansion executed?

**No.**

The evidence:

- The reference commit for that work, `2170969`, is still `HEAD`. No commit
  follows it on `main` or on `origin/main`.
- The working tree is clean, so no in-progress 50-article batch exists on disk.
- The article count is exactly 275 — the number the reference commit is
  expected to contain. Nothing has been added since.
- No article carries a publication date later than 2026-09-15.

There are therefore no earlier expansion articles to count toward this work,
and none to preserve or renumber.

### Resulting target

| | Articles |
| --- | ---: |
| Baseline (reference commit `2170969`) | 275 |
| Cohort A — general articles for published apps | 50 |
| Cohort B — Mental Math & Memory Games | 100 |
| Cohort C — World History Timeline Sim | 100 |
| **Expansion total** | **250** |
| **Expected final published count** | **525** |

No unrelated articles were added since the reference commit, so no adjustment
to the target is needed.

## 7. Featured app identity — resolved

Both apps were verified against their live Google Play listings on 2026-09-21
by fetching each listing signed-out and reading the embedded
`SoftwareApplication` JSON-LD. Full detail is in
`docs/featured-app-verification.md`.

The important correction: **the names in the local app projects are not the
live store names.**

| | Local `app.json` name | **Live Google Play title** |
| --- | --- | --- |
| `com.reigncreative.mentalmathchampion` | "IQ Test & Brain Training Games" | **Mental Math & Memory Games** |
| `com.reigncreative.history` | "World History Simulator" | **World History Timeline Sim** |

The live titles are the ones already used in this site's catalog, and they are
the ones this expansion uses in every title, description, CTA and structured-data
field. The local names appear to be unreleased renames; an unreleased name must
not be published as though it were the current one.

## 8. Keyword-data availability, re-tested today

Re-tested on 2026-09-21 rather than inherited from the previous release:

| Source | Available? | Evidence |
| --- | --- | --- |
| Google Search Console | **No** | no API credentials in this environment; `gcloud` is not installed |
| Google Ads Keyword Planner | **No** | no authenticated Ads account reachable from here |
| Google Trends | **No** | `HTTP 429` from the explore endpoint |
| Semrush / Ahrefs / Moz | **No** | no subscription and no API key configured |
| Google Autocomplete | **Yes** | `suggestqueries.google.com/complete/search` returns suggestions |
| Google Play listing text (first-party) | **Yes** | listings fetched and parsed directly |
| GA4 query export | **No** | no export or API access from this environment |

**Consequence, stated plainly: this expansion has no search-volume data, and so
it publishes none.** Every keyword's volume, difficulty and CPC field is
literally `unknown`. Autocomplete evidences how people phrase a query on a
given date; it is not demand data and is not presented as any. No term in this
release is described as "high volume", because nothing available here could
establish that.

## 9. What this expansion must not break

Carried forward as hard constraints:

- `scripts/postbuild-normalize-urls.mjs` stays in `npm run build`.
- No new `/<route>/index.txt` URL.
- GA4 measurement ID `G-JK8FPQB5L2`, one Google tag, `send_page_view: false`
  with manual `page_view`. The "browser history events" toggle must stay OFF in
  the GA console or navigations double-count — that is an owner action in the
  GA UI, not something this repository can set.
- `robots.txt` crawler preferences unchanged, including the deliberate silence
  on training-only crawlers.
- Every article's `primaryKeyword` is globally unique — the build fails
  otherwise.
- GitHub Pages sends no custom headers and issues no 301s; nothing in this
  release may depend on either.
