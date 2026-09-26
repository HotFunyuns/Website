# SEO pipeline pass — baseline

Recorded **2026-09-25 21:40 America/Los_Angeles** (2026-09-26 04:40 UTC), before
any file in this pass was changed. Every figure below was measured from the
repository, a fresh `npm run build`, or the live site at that time. None is
estimated.

## 1. Repository instructions read

| Source | What it governs |
| --- | --- |
| `README.md` | Stack, deployment, and the security-header reality on GitHub Pages |
| `MEMORY.md` (repo) | Key files and how to update apps, navigation and policies |
| `docs/content-spec.md` | Article frontmatter and body rules, hard prohibitions |
| `docs/content-review-process.md` | The nine-step draft → published process |
| `docs/publishing-schedule.md` | The superseded drip plan and the single-release history |
| `docs/seo-expansion-250-final-report.md` | The most recent release (2026-09-22) and its known gaps |
| `.claude/settings.local.json` | Tool permissions only |

There is no `CLAUDE.md` or `AGENTS.md`. The working tree was clean, so no
unrelated user changes needed preserving.

## 2. Repository state

| | |
| --- | --- |
| Branch | `main` |
| Upstream | `origin/main` — `https://github.com/HotFunyuns/Website.git` (public repository) |
| Tracking | up to date, working tree clean |
| Baseline commit | `c79de0fa73d62fd121b6b69ef0b6712cc40c46fe` — "Record the 250-article expansion final report" |

## 3. Hosting and deployment architecture

- **Next.js 14 App Router, `output: 'export'`**. Fully static, no server, no API
  routes and no middleware.
- **GitHub Pages**, deployed by the single workflow `.github/workflows/nextjs.yml`
  on every push to `main`, or manually via `workflow_dispatch`.
- The host serves files and nothing else. It sends no 301s except
  `www` → apex and the trailing-slash directory redirect, no custom headers, and
  no `X-Robots-Tag`. `vercel.json` is inert.
- **Enforce HTTPS is still OFF.** `http://reigncreativellc.com/` answers 200
  instead of upgrading. This is an owner setting that no code can change.
- Deploy time scales with page count. There is no `gh` CLI on this machine, so
  deployment is verified by polling live URLs.

**Production matches the baseline commit.** The live `sitemap.xml`,
`blog/rss.xml`, `llms.txt` and `robots.txt` were byte-identical to a local build
of `c79de0f`. An article page differed only by a `next-size-adjust` meta tag,
which the Linux CI build emits and the Windows build does not. Every `href` and
every JSON-LD block on that page was identical.

## 4. Route counts (fresh build of `c79de0f`)

| Route family | Count |
| --- | --- |
| Articles `/blog/<slug>/` | **525** |
| App pages `/apps/<slug>/` | **39** (+1 retired alias canonicalised elsewhere) |
| App category pages `/apps/category/<id>/` | 7 |
| Blog category pages `/blog/category/<id>/` | 7 |
| Topic hubs `/blog/topics/<id>/` | 10 |
| Index pages (`/`, `/apps/`, `/blog/`) | 3 |
| Static pages (about, support, press, editorial-policy, app-support, privacy, terms) | 7 |
| **Author pages** | **0 — none exist** |
| **Indexable routes (= sitemap URLs)** | **598** |
| Exported HTML files | 600 (598 + `404.html` + the retired alias) |

| Feed | Count |
| --- | --- |
| `sitemap.xml` URLs | **598** (live and local agree) |
| `blog/rss.xml` items | **525** |
| `llms.txt` | 155,352 bytes, 610 lines — it restates every article's title and description |

## 5. Content state

| | |
| --- | --- |
| Articles on disk | 525 |
| `status: published` | 525 |
| `draft` / `review` / `scheduled` | **0 / 0 / 0** |
| Future-dated articles | 0 |
| `editorialApproved` or `publishAt` fields | **do not exist** |
| Byline | `"Reign Creative Team"` on all 525, plain text, **not linked** |
| JSON-LD `author` | `Organization` named "Reign Creative Team", `url` → `/editorial-policy/` |
| Articles with `updatedAt ≠ publishedAt` | 23 |

Release cohorts by `publishedAt`: 2026-08-09 (21), 2026-08-13 (15),
2026-09-04 (139), 2026-09-15 (100), 2026-09-22 (250).

## 6. Canonicalisation, URL surface and analytics

- **Canonicals.** Every indexable page has one absolute, https, self-referencing
  canonical, and `og:url` agrees. The retired alias
  `/apps/82-0-pro-basketball-draft/` canonicalises to its replacement.
  `404.html` is `noindex` with no canonical. `audit-canonicals` is clean.
- **`index.txt`.** The build removed 599 RSC flight payloads and `out/404/`.
  Live probes of `/index.txt`, `/blog/index.txt`, `/about/index.txt`,
  `/apps/index.txt`, `/blog/topics/mental-math/index.txt` and an article's
  `index.txt` all returned a **genuine HTTP 404**. So did `/404/` and an
  unknown path.
- **GA4.** Exactly one property, `G-JK8FPQB5L2`, is present in source and output.
  It is injected at runtime only on `reigncreativellc.com` and `www.`, and no
  exported HTML hard-codes a loader (`audit-analytics`).
- **`play_store_click`.** `trackPlayStoreClick` has one caller: the `onClick` in
  `src/components/PlayStoreLink.tsx`. That handler fires once and never calls
  `preventDefault`. All 1,584 Play links in `out/` are rendered by that
  component, and no document-level click listener exists anywhere in `src/`.

## 7. Checks run at baseline — all passing

`npm run build` (catalog audit → export → `validate-content` → URL normaliser),
`tsc --noEmit`, `next lint`, `preflight-articles`, `audit-output`,
`validate-structured-data`, `audit-analytics`, `audit-canonicals`,
`audit-redirects`, `audit-duplicate-content`, `audit-back-navigation`,
`validate-sitemap-rss`, `audit-expansion-250`, `audit-similarity-250`,
`audit-catalog`. There is **no unit-test suite** in the repository.

## 8. Gaps found while taking the baseline

These are measured facts that the rest of this pass addresses. Each phase
document records what was done about it.

1. **The editorial policy makes a claim known to be false.** It says "Every
   article is reviewed by a person before publication." The 2026-09-22 final
   report records that the 250 articles in that release were drafted by AI
   agents and not all read by a person before release.
2. **Ownership disclosure is promised, not delivered.** The policy says the
   commercial relationship is disclosed "on the article itself". Only the 18
   comparison articles render a disclosure, and 129 article bodies never
   mention that the company makes the app they promote.
3. **"Written by the team that builds the app"** appears on app pages and the
   blog index, which is inaccurate for AI-drafted articles.
4. **No author page.** The byline is unlinked, and the JSON-LD author points at
   the editorial policy under a name ("Reign Creative Team") that is a third
   string for one company.
5. **"Keep reading" fills empty slots by recency, not relevance.** On the Mental
   Math cornerstone, `mental-math-training-guide`, it rendered "Achaemenid
   Persia administration" and a history study routine, because the fallback
   takes the alphabetically first of the newest same-category articles.
6. **Editorial link gaps.** One article (`what-does-td-mean-in-games`) has no
   inbound link from any other article's prose or cards, and 36 have exactly
   one. Of the 250 articles published 2026-09-22, 224 have no link from any
   older article, and neither does any of the 100 from 2026-09-15.
7. **No publishing queue.** There is no approval flag and no one-per-day limit.
   The legacy `publish-drafts.mjs` accepts any date, which would allow
   backdating.
8. **Dates are judged in UTC.** `isPublicPost()` and `validate-content.mjs`
   compare against the UTC day. At the time this baseline was taken it was
   already the 26th in UTC and still the 25th in Los Angeles.
9. **`llms.txt` duplicates the RSS feed**, at 155 KB.
10. **No Search Console data is available** — no credentials, no API access and
    no export anywhere on this machine. Nothing in this pass ranks pages by
    position.
