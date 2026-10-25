# 400-article release — final report (published 2026-10-25)

## Outcome

- **400 new articles published in one production release**: 339 consumer, educational and
  tutorial articles plus **61 partnership/acquisition overviews** (one per live app).
  Site total: **1,051 published articles**, 1,265 built pages, 1,262 canonical sitemap URLs.
- Every new article carries the label **"AI-assisted article … checked by automated tests and
  an AI editorial review. No person has reviewed it yet."** None claims a person's review.
- Plan: [article-expansion-400-plan.md](./article-expansion-400-plan.md). Every planned row was
  written; none was dropped or swapped.

| Cluster | Articles |
| --- | ---: |
| Discrete mathematics | 66 |
| Partnerships & acquisition | 61 |
| Investing basics | 50 |
| World history | 43 |
| Languages | 40 |
| Utilities & Android help | 37 |
| Sports | 27 |
| Cricket | 26 |
| Health & food | 17 |
| Creative & casual | 15 |
| Motorsport | 12 |
| Action & arcade | 6 |
| **Total** | **400** |

## How the articles were made and checked

1. **Writing** — the lead session plus parallel writing agents (owner-authorised for this
   phase), all working from one brief (session scratchpad `BRIEF.md`). Each article: a plan
   keyword with Autocomplete phrasing evidence, sources saved and read, a worked example with
   arithmetic checked in code, app facts only from the catalog.
2. **Gates per article** — ≥760 words, topic-specific headings, app/category/related links,
   unique FAQs, primary keyword unique site-wide, 5-word-shingle similarity < 0.05 against
   every article.
3. **AI editorial review** — 13 separate reviewer agents (none reviewed its own writing) read
   every article against its sources, the catalog and the site, fixed problems in place, and
   logged a verdict plus the content hash of the final text
   ([review manifest](./article-review-manifest-400.md); log
   `docs/data/editorial-review-log-2026-10.json`). **400 pass, 0 revise, 0 reject.**
   Corrections were substantial in every cluster: invented app features (unit names, tools,
   modes), claims credited to the Play listing that exist only in the catalog, outdated rules
   (F1 2026 tyre allocations, NFL draft eligibility, World Boxing rules edition), wrong
   figures, mis-attributed quotations and unsourced generalisations.
4. **Publishing** — `scripts/publish-batch.mjs` verified each hash and the whole batch's link
   graph (24 were first held because two comparison pages lacked their primary-app link;
   fixed and re-logged), then published all 400 (publishedAt 2026-10-25, noindex removed).
5. **Linking pass** — `post-publication-links.mjs --batch`: 467 related cards planned, 340 of
   them on 232 older articles; 0 new articles without an inbound link.

## Validation (all green before commit)

- `npm run build` — validate-content OK (1,051 published, 0 unpublished), authorship and
  dates consistent, RSC sidecars removed.
- `tsc --noEmit`, `next lint` — clean.
- `npm run audit:all` — content preflight, catalog (61/61 against live Play), output,
  structured data, analytics (single GA4 tag G-JK8FPQB5L2), authorship, entities, link report
  (**0 broken, 0 orphans, 0 articles without editorial inbound, max click depth 3**),
  canonicals (1,262 distinct, all self-referencing), redirects, duplicates, back-navigation,
  sitemap/RSS/llms.txt, Search Console regressions (5/5 local), **235/235 tests**.
- Release similarity audit — no pair ≥ 0.08 (closest 0.049), openings, FAQ questions and
  titles distinct; no heading reused beyond the cap.
- 390 px headless check on 17 representative pages — no horizontal page scroll.

## Site changes in this release

- New sport hubs **/sports/cricket/** and **/sports/motorsport/**; sport hubs now list guides
  only (partnership overviews stay in /partnerships/).
- New topic hubs **/blog/topics/discrete-math/** and **/blog/topics/investing-basics/**.
- New disclaimer kind **wellness** (breathing articles).
- Search Console remediation (see below), `/sports/` calculator list reduced to names,
  `/tools/` question table, course-handicap explainer, category app chooser, about page.
- New script `scripts/audit-search-console-regressions.mjs` (`npm run audit:search-console`,
  live: `npm run verify:search-console`); link-report now classifies `/blog/page/N/` as listings.

## Search Console remediation

Baseline from the owner (2026-10-24): **Indexed 425, Not indexed 138, Total 563**.
Per-URL dispositions for the 22 URLs with a known reason, the classification method for the
116 "Crawled – currently not indexed" URLs (list not yet received), regression tests and owner
steps: [search-console-indexing-remediation.md](./search-console-indexing-remediation.md).

Refreshed existing articles flagged as duplicates (each moved from the organisation review
label to the AI-assisted label, updatedAt 2026-10-25, with a dated correction note):
- `how-does-american-football-work` — checked against the 2026 NFL rulebook; removed a
  misattributed quotation and two "usually" claims; overlapping kickoff/penalty/overtime
  detail replaced by links to the dedicated guides.
- `malay-reduplication-explained` — fixed the claim that doubling never changes word class;
  examples aligned with Wiktionary/Kamus Dewan; unsourced claims cut.
- `how-to-track-protein-intake` — refocused on the tracking method; reference-intake
  material reduced to a summary linking to `how-much-protein-per-day`; USDA worked example.
- `anime-coloring-app-guide` — no third-party art or names; non-catalog claims removed.
- `/blog/topics/world-history-timelines/` — hub copy rewritten so it no longer echoes the
  category page.

Nothing in this release guarantees indexing, rankings, traffic, AI citations or installs.

## Review-label note (owner attestation)

The 651 articles published before this release show "Reviewed by Reign Creative Editorial
Team" on the strength of the owner's written statement of 2026-10-24 that the published
library received human review (`src/data/review-attestations.ts`). That label rests on the
owner's attestation alone; no individual reviewer, date or per-article record exists or was
invented. The 400 new articles, and the four existing articles edited in this release, carry
the AI-assisted label instead.

## Owner actions

1. **Search Console** — after the deploy: Validate fix for *Duplicate without user-selected
   canonical* and *Not found (404)*; resubmit the sitemap; export the 116 *Crawled – currently
   not indexed* URLs so they can be classified A–E. Do not use the Indexing API.
2. **Day 14 (2026-11-08)** — record Indexed / Not indexed / Total, validation status, and how
   many of the 400 new URLs are indexed (segment them separately).
3. **Day 28 (2026-11-22)** — repeat; anything still failing goes through the classification
   in the remediation doc; follow `seo-growth-playbook.md` §7.
4. **Play Console (listings, owner-side)** — several live short descriptions name leagues or
   overstate outcomes ("NFL 20-0", "MLB Baseball 162-0", "NHL Hockey 84-0", "manage UFC
   fighters", Thai "become fluent fast"); the Anime Trivia listing names third-party series
   without an independence statement; Ketora's listing describes a Premium while Play shows no
   in-app purchases; Discrete Math store screenshots show a Premium tier while Play shows none;
   Regal Tower Defense's listing mentions "other specialized towers" beyond the seven the
   catalog names. 29 of 39 earlier listings still use /privacy/ rather than the site as the
   developer website.
5. **Partnership enquiries** — follow [acquisition-checklist.md](./acquisition-checklist.md).
6. **Existing library follow-up** — 52 older history articles still say the app's content
   "carries no citations" / quote a textbook disclaimer that the current listing does not
   contain; review and correct.

## Documents produced

Plan, [review manifest](./article-review-manifest-400.md),
[keyword research](./keyword-research-400.md),
[keyword map — release](./keyword-to-url-map-400.md),
[keyword map — latest](./keyword-to-url-map-latest.md),
[cannibalisation audit](./cannibalization-audit-400.md),
[internal-linking report](./internal-linking-report.md),
[search-intent map addendum](./search-intent-cannibalization-map.md),
[playbook §8](./seo-growth-playbook.md),
[partnership report](./partnership-report-2026-10.md),
[acquisition checklist](./acquisition-checklist.md),
[published app inventory](./published-app-inventory-latest.md),
[Search Console remediation](./search-console-indexing-remediation.md).

## Deployment

Recorded below after the push and live verification.
