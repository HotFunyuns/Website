# Google Search spam-policy compliance audit

Every public page on this site, audited against Google's current Search spam
policies. Audited **2026-09-04** against the 231-page export produced by
`npm run build`.

Each check names the mechanism that enforces it, so a future change that breaks
one fails a build rather than being discovered later.

## Summary

| Policy area | Result | Enforced by |
| --- | --- | --- |
| Scaled content abuse | **Reviewed — see § 1** | Editorial gate, per-article review |
| Keyword stuffing | Pass | `preflight-articles.mjs`, `build-keyword-map.mjs` |
| Doorway pages | Pass | `search-intent-and-cannibalization-map.md` |
| Thin affiliate pages | Not applicable — no affiliate links exist | — |
| Site reputation abuse | Not applicable — no third-party content is hosted | — |
| Scraped content | Pass | Every article written for this site |
| Cloaking | Pass | Static export; one HTML file per URL |
| Hidden text | Pass | `audit-output.mjs` |
| Sneaky redirects | Pass | `audit-output.mjs` |
| Link spam | Pass | No links bought, exchanged or automated |
| Auto-generated fake engagement | Pass | No ratings, reviews or counts published |
| Misleading functionality | Pass | Every CTA states its destination |
| **Back-button interference** | Pass | `audit-output.mjs`, first-party source scan |
| Forced redirect loops | Pass | Legacy redirect uses `location.replace()` |
| Intrusive app-install interstitials | Pass | None exist |
| False freshness | Pass | `stamp-dates.mjs` refuses to backdate |
| Misleading structured data | Pass | `validate-structured-data.mjs` |
| Expired-domain abuse | Not applicable — domain registered for this business | — |
| Near-duplicate query-variation pages | Pass | IDF cannibalisation analysis |

## 1. Scaled content abuse — the honest assessment

This is the policy that most deserves a straight answer, because this pass
published 139 articles on one day.

**What the policy targets:** producing many pages primarily to manipulate
rankings rather than to help people, particularly where the pages are
unoriginal, low-value, or generated at scale without meaningful human input.

**What was actually done, and how it can be checked:**

| Property | Evidence |
| --- | --- |
| Every article written individually | 175 articles, 225,270 words, median 928 words, no shared template — formats vary by topic (explainers, comparisons, decision guides, glossaries, workflows, troubleshooting) |
| Every article has a distinct primary intent | Build fails on a duplicate `primaryKeyword`; pre-flight fails on a duplicate intent key or a near-duplicate title |
| Every article cites sources | 507 source records across 175 articles; every URL checked and resolving |
| Every article carries first-party insight where it discusses an app | App claims trace to `scripts/play-verification.json` and the catalog, cross-checked by `audit-catalog.mjs` |
| No article is a keyword variation of another | 30 keyword pairs exceed the similarity threshold; all 30 are parallel series (different subject), none is a subset relation |
| Minimum substance is enforced | Pre-flight fails any article under 700 words, with fewer than 3 H2s, 3 FAQs, 3 takeaways, 2 article links or an app link |

**The residual risk, stated plainly.** Publishing 139 pages in one day is a
release pattern that can attract site-level scrutiny regardless of the quality of
the individual pages. The previous audit in this repository recommended a
ten-batch drip precisely for that reason, and `docs/publishing-schedule.md`
recorded that plan.

That plan was superseded by an explicit owner instruction to publish everything
in this pass. The instruction was followed, and the risk is recorded here rather
than left unstated. **If Search Console later reports these URLs as crawled and
not indexed, the release pattern is the first thing to examine** — not the
individual articles.

## 2. Keyword stuffing

**Not present.** Checks in force:

- No keyword-density target exists anywhere in the process. `docs/content-spec.md`
  states this explicitly.
- `preflight-articles.mjs` fails on unverified volume labels, invented search
  volumes and keyword-difficulty figures in body text.
- Planning fields (`secondaryKeywords`, `longTailKeywords`, `aiSearchQuestions`,
  `demandTier`) are **never rendered to a visitor**. They exist to feed
  `docs/keyword-map.csv` and are stripped from the page.
- Image alt text describes the image. Decorative icons carry `alt=""` with
  `aria-hidden`, which is the correct treatment rather than a keyword slot.
- 1,820 unique terms map across 175 articles — roughly ten terms per page, not
  one page per term.

## 3. Doorway pages

**Not present.** A doorway page is one of many similar pages funnelling users to
the same destination. The distinguishing test is whether each page has its own
reason to exist.

- All 30 high-similarity keyword pairs are **parallel series** — the same
  question asked about a different sport or language, where the differing token
  is the entire query. None is a subset of another, which is the shape that
  would indicate a doorway set.
- Every article answers its own question and links onward rather than existing
  only to redirect.
- App pages describe distinct apps with distinct package IDs.

Full analysis: `docs/search-intent-and-cannibalization-map.md`.

## 4. Hidden text and cloaking

**Not present.**

- The site is a static export. Every URL is one HTML file, identical for every
  visitor and every crawler. There is no server-side logic that could serve
  different content by user agent.
- No `display: none` or off-screen text is used to hold keywords. The only
  visually-hidden text is `sr-only` on Play Store buttons, which reads
  "(opens Google Play in a new tab)" — an accessibility affordance, and it is
  deliberately excluded from the `link_text` analytics parameter.
- `audit-output.mjs` fails on hidden-text patterns.

## 5. Sneaky redirects and back-button interference

This is the area the 2026 policy update specifically addresses, and it received
the most attention in this pass.

**What was found and fixed.** The retired URL `/apps/82-0-pro-basketball-draft/`
used `<meta http-equiv="refresh" content="0; …">` to reach the renamed app page.
A meta refresh can leave the retired URL in the session history, which means
pressing Back from the destination returns there and is immediately sent forward
again — a loop the visitor cannot escape.

**The fix.** That page now uses `location.replace()` via
`src/components/LegacyRedirect.tsx`, which replaces the current history entry
rather than adding one. Back now returns wherever the visitor actually came from.
The page still renders full, readable content explaining the rename, so a visitor
without JavaScript gets an explanation and a link rather than a blank screen.

**Standing enforcement.** `audit-output.mjs` now fails the audit if:

- any rendered page contains `<meta http-equiv="refresh">`;
- any rendered page contains an inline `onbeforeunload` or `onpopstate` handler;
- any first-party source file uses `history.pushState`, adds a `popstate` or
  `beforeunload` listener, or assigns `location.href` to an internal path.

**A deliberate exclusion.** Next.js's App Router uses `pushState` and a
`popstate` listener in its own bundle to implement client-side navigation. That
is the mechanism that *makes* Back work in a single-page router, not one that
breaks it, so the History API rules are enforced against first-party source
rather than against the framework bundle. Flagging the framework would be a false
positive that trains a reader to ignore the check.

**One remaining first-party history call**, reviewed and kept:
`AppsExplorer.tsx` uses `history.replaceState` to reflect the active category
filter in the URL fragment. `replaceState` cannot create the extra history
entries a back-trap requires — it replaces the current one — so filter changes
never accumulate, and Back always leaves the page rather than stepping through
filter states.

## 6. Misleading functionality and app-install interstitials

**Not present.**

- Every Google Play CTA is a plain link that opens the listing in a new tab.
  1,067 of them, all rendered by `PlayStoreLink`, all carrying
  `rel="noopener noreferrer"` and visible text stating the destination.
- No modal, overlay or interstitial promotes an install. There is no app-install
  banner anywhere on the site.
- No CTA uses false urgency, countdowns or scarcity language.
- No element mimics a system dialog or a download button for something other
  than what it says.

## 7. Fake engagement and unverifiable claims

**Not present, and structurally prevented.**

- `validate-structured-data.mjs` fails the audit if `aggregateRating`, `review`,
  `reviewCount`, `ratingValue` or `award` appears in any JSON-LD block.
- `preflight-articles.mjs` fails on download counts, user counts, review counts,
  star ratings, outcome guarantees, ranking guarantees and unsupported
  superlatives in visible text.
- No app page publishes a rating, a review count or a download count. The
  reasoning is recorded in `docs/published-app-inventory.md`: those figures change
  continuously, and a stale figure presented as current is a false claim.

## 8. Link spam

**Not present.** No link was bought, sold, exchanged or automated during this
pass. No guest posts were placed, no directories submitted to, no link exchanges
entered. The only outbound links are citations to primary sources and links to
our own Google Play listings.

`docs/authority-outreach-plan.md` records the standing position on this.

## 9. False freshness

**Not present, and structurally prevented.**

- `scripts/stamp-dates.mjs` **refuses to move a date backwards** and refuses to
  set `updatedAt` earlier than `publishedAt`. It exits non-zero rather than
  writing.
- The 36 previously published articles kept their original `publishedAt`. Only
  the 15 that were meaningfully revised in this pass had `updatedAt` changed.
- The 139 newly published articles carry 2026-09-04, the date they actually went
  live in America/Los_Angeles.
- Comparison articles carry a `researchDate` that records when competitor claims
  were last verified. All four were genuinely re-verified against the vendors'
  own current pages before that date was moved.

## 10. Misleading structured data

**Not present.** Beyond the forbidden-field check above,
`validate-structured-data.mjs` enforces:

- every `FAQPage` question also appears in the visible page text;
- every `BlogPosting` citation URL is also a visible, clickable link on the page;
- `SoftwareApplication.installUrl` is a Google Play listing URL;
- an `Offer` may declare only `price: "0"`, matching the verified listing;
- `dateModified` never precedes `datePublished`.

1,105 JSON-LD blocks across 231 pages, all valid.

## 11. Near-duplicate query-variation pages

**Not present.** Covered in § 3. The mechanism worth repeating: autocomplete
returns many near-identical phrasings for the same question, and the tempting
move is a page for each. Those phrasings were folded into existing articles as
secondary keywords instead.

## 12. What is deliberately not claimed anywhere on this site

- No guarantee of ranking, indexing, traffic, clicks, AI citation or installs.
- No claim that any content has been medically, linguistically or professionally
  reviewed. Where a subject would need that review, the article says it has not
  had it.
- No affiliation with, or endorsement by, any league, club, athlete, competitor
  or platform.
- No competitor logos, screenshots or trade dress.

## Re-running this audit

```
npm run build          # export + draft-containment gate
npm run audit:all      # content, catalog, output, schema, analytics, links
npm run audit:sources  # every external URL in every article
```
