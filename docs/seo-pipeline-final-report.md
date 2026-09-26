# SEO pipeline pass — final report

Authorship, internal linking, entity clarity, the publishing queue and the
Search Console refresh system. **No articles were added.** Baseline:
[seo-pipeline-baseline.md](./seo-pipeline-baseline.md).

## 1. Baseline

Commit `c79de0f` on `main` (tracking `origin/main`, clean). Production was
serving that commit. 598 indexable routes: 525 articles, 39 app pages, 7 app
categories, 7 blog categories, 10 topic hubs, 3 index pages and 7 static pages.
No author pages existed. The sitemap listed 598 URLs, the RSS feed 525 items,
and `llms.txt` was 155,352 bytes. All 525 articles were `published`: no drafts,
no scheduled articles.

## 2. Already in place (kept)

Self-canonicals, with the build failing on a broken one. `index.txt` payloads
are deleted after every build, and live probes returned real 404s. One GA4
property, loaded only on the production host. `play_store_click` fires from
exactly one handler, with no `preventDefault`. Draft containment is enforced in
the data layer, the router and a post-build gate. Primary keywords are unique.
There were the 10 topic hubs with a cornerstone check, sources with access
dates, a visible "Updated" date only on a real change, and structured data
matching frontmatter dates. There was also the house rule of no ratings, reviews,
awards or download counts anywhere.

## 3. Missing or inadequate (found)

1. The editorial policy claimed every article was reviewed by a person. The
   project's own 2026-09-22 report says that was not true for that release.
2. The ownership disclosure was promised "on the article itself" but existed
   only on the 18 comparison articles.
3. The byline was unlinked; no author page existed; the JSON-LD author was a
   third, unlinked name, "Reign Creative Team".
4. App pages, app categories and the blog index said the articles were "Written
   by the team that builds the app".
5. "Keep reading" filled empty slots with the newest same-category articles,
   whatever their topic: Achaemenid Persia appeared on the Mental Math
   cornerstone.
6. 36 of 39 app pages linked only 3 of their own guides and claimed "the topic
   hubs below collect them all", although those apps have no hubs.
7. One article had no editorial inbound link, 36 had one, and 8 hub articles
   did not link their hub's cornerstone.
8. The 7 blog category pages carried 34–41 words of their own copy.
9. There was no approval flag, no daily limit, and no Los Angeles date handling:
   `isPublicPost()` and the build gate compared against the UTC day. The legacy
   `publish-drafts.mjs` accepted any date.
10. There was no Search Console tooling, and `llms.txt` duplicated the feed.

## 4. Internal-link changes

| Measure | Before | After |
| --- | --- | --- |
| Articles with no editorial inbound link | 1 | **0** |
| Articles with exactly one | 36 | **0** |
| Hub articles not linking their cornerstone | 8 | **0** |
| App pages linking only some of their own guides | 36 | **0** |
| Blog category pages under 60 words of standing copy | 7 | **0** (now 101–142) |
| 2026-09-04 articles linked from an older article | 3 / 139 | **53** / 139 |
| 2026-09-15 articles linked from an older article | 2 / 100 | **31** / 100 |
| 2026-09-22 articles linked from an older article | 44 / 250 | **78** / 250 |
| Broken links, links through redirects, orphans | 0, 0, 0 | 0, 0, 0 |
| Maximum click depth from the homepage | 2 | 2 |

How that happened:

- The relevance-ranked "Keep reading" fallback (`src/lib/blog/relevance.mjs`)
  now fills empty slots on about 436 articles.
- The linking pass added **82 persisted "Keep reading" links**: 74 back-links
  from relevant articles to the orphan and the 36 thinly linked articles, and 8
  cornerstone links. No prose was changed. Each link was reviewed in a dry run
  before it was written, and a second run proposed nothing.
- App pages now list every further guide by title.
- Blog category pages gained standing copy, topic hubs, "Most-referenced guides"
  and "Articles by app".

The full audit is in [internal-linking-report.md](./internal-linking-report.md),
with the machine-readable graph in `docs/data/link-graph.json` and
`docs/data/link-graph-edges.csv`.

## 5. Orphan pages fixed

`what-does-td-mean-in-games` had no link from any other article. It is now
linked from `offline-tower-defence-on-android`,
`build-pads-and-custom-tower-positions` and `tower-defense-camera-controls`.
The 36 single-link articles each gained two relevant links.

## 6. Post-publication linking workflow

`npm run links:after-publish -- <slug>` (`scripts/post-publication-links.mjs`).
It runs only after an article is public. It checks the article's own links: app
page, category or hub, cornerstone, and at least two related public articles.
The Play link is checked in the rendered page. It then makes two to five of the
most relevant older articles link back. Where the article's own target phrase
already appears in an older article's prose, those words become the link, with
nothing added or removed. Otherwise the older article gets a "Keep reading" card.

It never links to anything unpublished, never exceeds the six cards the template
renders, never touches headings, tables, code or already-linked sentences, and
never moves `updatedAt`. It is idempotent. `--verify` confirms against the built
site that the article is linked from another article, from its app page or hub,
carries the Play link and byline, and is within three clicks of the homepage.

The build now fails if any published article lacks an editorial inbound link, or
if a queue-era article lacks a persisted link from an older one.

## 7. Publishing queue and scheduling

`scripts/publish-queue.mjs` and `.github/workflows/publish-queue.yml`:

- Statuses `draft`, `review`, `scheduled`, `published`, plus new fields
  `editorialApproved`, `publishAt`, `sameDayOverride` and `corrections`.
- The workflow checks every hour. It releases from 09:00 America/Los_Angeles, at
  most one per Los Angeles day. The eligible article is scheduled, approved and
  due; the earliest `publishAt` wins, then the slug.
- The release stamps the real day, and a rerun the same day is a no-op.
- Manual override is `--slug`: it skips the wait for `publishAt` but still
  requires `scheduled` and approved. The second-release override is
  `--allow-second-today`, which is recorded on the article.
- The release validates, then plans the links, then writes. The workflow builds
  with every gate and runs the tests before it commits, and it deploys only after
  pushing.
- The daily-limit and approval rules are re-checked by the build.
- `publish-drafts.mjs` is retired. The Indexing API is not used.
- Owner procedures are in [publishing-workflow.md](./publishing-workflow.md);
  the current state is in [publishing-queue-report.md](./publishing-queue-report.md).
  The queue is empty, so the job currently does nothing.

## 8. Authorship

Byline **Reign Creative LLC** on all 525 articles, linked with `rel="author"` to
`/authors/reign-creative-llc/`. `BlogPosting.author` reads the same registry
entry. Every article now has an ownership line beside the byline and an "About
the author" box. Dates are unchanged: no `publishedAt` or `updatedAt` moved, and
all 23 existing "Updated" dates were traced to real content changes. Details:
[authorship-audit.md](./authorship-audit.md).

## 9. Authorship details needing the owner

No named individual was approved for public use, so none was created. From now
on, `editorialApproved: true` is a public statement that a person read and
approved the article. Only a person who has done that should set it. `sameAs`
holds only the verified Google Play developer page. To add a named author, follow
the procedure in [authorship-audit.md](./authorship-audit.md) §8.

## 10. About page

Rewritten around verifiable facts:

- the two names, one company;
- the official website and the Google Play developer page;
- a facts list;
- the seven categories with app counts;
- the existing build principles;
- how the articles relate to the apps;
- how facts are checked, including the newest Play-verification date;
- how AI is used, including the approval rule;
- corrections;
- comparison disclosure;
- contact and support links.

It carries `AboutPage` markup pointing at the `#organization` node. No awards,
press, team members, download totals or founding story were added.

## 11. Entity consistency

"Reign Creative Team" has been removed everywhere. App pages now name both the
legal name and the Play developer name. The Organization logo is now the
180×180 PNG, and `llms.txt` states the relationship. The new `audit:entities`
check passes on 606 files and 2,598 Play links.

**Owner action:** 29 of 39 Play listings give only the privacy policy, not the
site, as their developer website. Details in
[entity-consistency-report.md](./entity-consistency-report.md).

## 12. Editorial policy

It now covers:

- who creates the content (an organizational byline, with AI tools);
- ownership;
- how topics are chosen;
- how keyword research is used (Autocomplete only, no volume data);
- how AI is used — honest about the past, with the approval rule going forward;
- how app features are verified;
- how facts are checked, with rules for history, health, languages, brain
  training, technical subjects and sports simulation, and for paywalled
  sources;
- comparisons;
- what will not be published, now including AI-targeted text;
- publication and update dates in Los Angeles time, where link edits are not
  revisions;
- the corrections process, backed by a real `corrections` field;
- no guarantees on rankings, traffic, AI citations or installs.

## 13. Search Console data used

**None.** No credentials, API access or export existed anywhere on this machine.
No page was described as ranking in any position.

## 14. Refresh opportunities identified

No performance-based queue exists without data. The importer and its rules are
ready (`npm run report:search-console`; thresholds are in
`scripts/search-console-refresh.config.json`).

On-site signals only: no stale app facts, stale comparisons, old sources or thin
sourcing were found. Sixteen primary-keyword pairs overlap enough to watch for
cannibalisation, for example the Lao course article and the Lao beginners'
guide. Listed in [refresh-queue.md](./refresh-queue.md).

## 15. Pages meaningfully refreshed

**None, deliberately.** The brief rules out picking ranking pages without data,
and a date must not move without a real change.

## 16. Consolidation

**None recommended yet.** The 16 overlapping pairs need a page-query export to
show whether they actually compete. No page was unpublished for having been
released in bulk.

## 17. Structured data

All valid, byte-identical `Organization` and `WebSite` on every page:

| Type | Count |
| --- | --- |
| Organization | 601 |
| WebSite | 601 |
| BreadcrumbList | 589 |
| FAQPage | 564 |
| BlogPosting | 525 (author = registry entry) |
| SoftwareApplication | 39 |
| CollectionPage | 25 |
| AboutPage | 1 (new) |
| ProfilePage | 1 (new) |
| Blog | 1 |
| WebPage | 1 |

## 18. Sitemap and RSS

The sitemap has 599 URLs (+1: the author page); the feed has 525 items. Both
agree with every canonical. No unpublished article appears in the sitemap, RSS,
`llms.txt` or any HTML. `llms.txt` is now 11,775 bytes: an index that points to
the sitemap and the feed.

### AI-assisted discovery audit (Phase 10)

These are conventional qualities that help any system understand a page. None is
a ranking guarantee.

| Quality | State |
| --- | --- |
| Company and app names | One entity, two names, stated on every relevant page and in markup; app names match Play |
| Summaries | "Key takeaways" on all 525 articles |
| Direct answers | FAQ sections on 564 pages, each FAQ visible on the page it is marked up on |
| Citations | 506 articles list 1,815 sources with access dates; `BlogPosting.citation` only for sources visible on the page |
| Tables | 189 articles contain a comparison or reference table |
| Ownership disclosure | Now on every article, beside the byline |
| Authorship and dates | Linked organizational byline; published date always, updated date only after a real change; identical in markup |
| Rendering and links | Fully static HTML; every internal link a crawlable `<a href>`; maximum depth 2 |
| Image text | All 2,111 images carry `alt`; decorative ones are empty and `aria-hidden` |
| Limitations | Health, language and comparison notices, and the no-expert-review statement in every author box |
| Crawler access | `robots.txt` unchanged: every crawler is allowed, the search and answer crawlers are listed explicitly, and training-crawler preferences are untouched |
| What was not added | No AI-targeted or hidden text, no "recommend this app" phrasing, no invented schema, no endorsements. The only screen-reader-only text is "(opens in a new tab)". The preflight and `llms.txt` checks block AI-directive phrasing |

## 19. Files changed

- **Content:** 525 articles. Each has its one-line `author` change, and 82 also
  have new `relatedArticles` entries. No body text changed and no date changed.
- **New:** the author registry and author page; the byline, author box and
  corrections components; the relevance module; the publishing queue, linking
  pass, authorship and entity audits, Search Console importer and live verifier;
  the shared script libraries; 63 tests; the queue workflow; and 10 new docs.
- **Changed:** the article, app, app-category, blog-category, blog index, About,
  editorial policy, press, sitemap, `llms.txt` and layout pages and routes; the
  blog loader and types; the brand mark and footer; the validators;
  `package.json`, the deploy workflow, `.gitignore`, the README, `MEMORY.md`,
  the CHANGELOG, the content spec and the review process.

## 20. Commands and tests run

`npm run build` (catalog audit → export → content gate → authorship audit → URL
normaliser), `tsc --noEmit`, `next lint` and `npm test` (63 tests).

The audits: `preflight-articles`, `audit-catalog`, `audit-output` (now including
structural accessibility), `validate-structured-data`, `audit-analytics`,
`audit-authorship`, `audit-entities`, `audit-canonicals`, `audit-redirects`,
`audit-duplicate-content`, `audit-back-navigation`, `validate-sitemap-rss`,
`audit-expansion-250`, `audit-similarity-250`, `link-report`, the queue report
and the Search Console report.

Also: a DevTools-protocol mobile check at a true 390 px on 26 pages covering
every template (no horizontal overflow, one H1 each, no tiny tap targets); a git-history audit of
the 23 "Updated" dates; a live check of all 39 Play listings; and the external
source check (`npm run audit:sources`, results below).

### External source check

`npm run audit:sources` checked 1,140 unique URLs (sources plus links in article
bodies):

| Result | Count |
| --- | --- |
| Resolved | 979 |
| Browser-only hosts, known to refuse scripts and confirmed live in earlier passes | 123 |
| 403 to scripts | 25 |
| Hard failures | 13 |

All 13 hard failures were re-checked with a second client (curl, browser user
agent). **Eight resolved**; they were artifacts of Node's HTTP client on this
machine. Five did not:

- **Confirmed dead (HTTP 410):** "The National Archives (UK) — For students",
  cited by `how-to-analyse-a-primary-source`. It is now flagged in
  [refresh-queue.md](./refresh-queue.md). It was not replaced here: the UK
  National Archives appears to be moving education pages into its web archive,
  which refuses scripts, so no replacement could be opened and verified. The
  editorial policy rules out citing a page nobody opened.
- **Moved to the UK Government Web Archive** (the original URL redirects there,
  and the archive answers 405 to scripts): the Bussa's rebellion page, cited by
  `atlantic-slave-trade-and-abolition`. It probably still works in a browser —
  check it.
- **Unreachable from both clients:** `egyankosh.ac.in`
  (`indian-history-periodisation-debate`), `psychclassics.yorku.ca`
  (`who-invented-the-iq-test`), and a University of Zurich PDF answering 502
  (`growing-sequence-memory-games`). These may be temporary. Re-check them in a
  browser before changing any article.

No article text was changed for these. Fixing a citation is a content revision
that moves `updatedAt`, and it needs the claim re-verified first.

### Independent review of the automation

Before commit, a separate reviewer read the queue, linking, validation, audit,
workflow and importer code for correctness bugs. It made no edits. Every finding
was checked and fixed:

1. **Critical — the release rehearsal test read the real queue state.** In the
   workflow it runs right after a real release, so it would have failed on every
   release day. That would have blocked every release commit, and every deploy
   that day. The test now neutralises queued and released articles in its
   temporary copy. The exact failure scenario was reproduced and now passes.
2. The Search Console 90-day lookup let an `http://` or `www.` row overwrite the
   real page's row. It now uses canonical rows only, covered by a new end-to-end
   test on synthetic exports.
3. The authorship audit's "updatedAt moved backwards" rule would have failed a
   release whose placeholder date was later than the real day. It now exempts
   releases.
4. A manual `--slug` release did not require `scheduled`, so an approved draft
   could be released by hand. It now requires `scheduled`, with a unit test and
   an end-to-end test.
5. A body link with a `#fragment` would have been refused before release. The
   fragment is now stripped before checking.
6. The in-prose linker did not protect image alt text. Image spans are now
   protected.
7. A header comment overstated the per-run link limit. Corrected.

## 21. Build result

Pass: 525 published, 0 unpublished, 602 pages exported, 600 RSC payloads
removed, and every gate green.

## 22–24. Commit, branch and deployment

| | |
| --- | --- |
| Commit | `77a9312` — "Improve authorship internal linking and SEO publishing workflow" |
| Branch | `main`, a normal push `c79de0f..77a9312`. No force-push; no history rewritten |
| Deploy | GitHub Actions run 36222741141, *Deploy Next.js site to Pages*: **success**. Pushed 06:06:07 UTC; live 06:08:00 UTC. With a warm build cache the whole run took under two minutes at 601 pages. Every step passed, including the new "Audit entity naming and run tests" |
| Queue workflow | Registered and active. Its hourly runs are no-ops while the queue is empty |

**Verified on production after the deploy** (2026-09-26 UTC, which is still
2026-09-25 in Los Angeles):

- `verify-live --smoke` on 12 key pages: all answer 200, canonicals and `og:url`
  agree, and JSON-LD parses. Every article byline links `/authors/reign-creative-llc/`
  with `rel="author"` and matches `BlogPosting.author`. Every `<page>/index.txt`
  is a genuine 404. The sitemap has 599 URLs and the RSS feed 525 items, and no
  unpublished article answers or is listed anywhere.
- `/authors/reign-creative-llc/` is live, and its `index.txt` returns 404.
- `llms.txt` is 11,759 bytes.
- "Reign Creative Team" appears nowhere on the sampled pages. The editorial
  policy carries the corrected AI disclosure and not the old claim.
- Articles show the ownership line and the author box.
- Category pages show their standing copy. App pages list every guide and name
  both company names.
- The Mental Math cornerstone no longer recommends Achaemenid Persia.
- **GA4:** only `G-JK8FPQB5L2` exists in the shipped JavaScript.
- **`play_store_click`, behaviourally:** the live article was loaded in headless
  Edge with Google Analytics and Tag Manager blocked at the network layer, so no
  test event reached the property. Result: one `page_view` on load, then exactly
  one `play_store_click` per click (0 → 1 → 2). The event carries
  `button_location`, `link_url` with the install referrer, `page_path`,
  `app_name`, `article_slug` and `link_text`.

## 25. Manual actions still required

1. **Play Console:** set the Website field on 29 listings
   ([entity-consistency-report.md](./entity-consistency-report.md)).
2. **GitHub Pages:** turn on **Enforce HTTPS**. It is still off, so
   `http://` serves duplicates.
3. **Search Console:** export the data (steps in
   [search-console-refresh-report.md](./search-console-refresh-report.md)).
4. **GA4:** keep "page changes based on browser history events" **off**, as
   before.
5. **Approval discipline:** set `editorialApproved` only after reading an
   article in full.
6. **GitHub:** if `main` is ever protected, allow Actions to push, or releases
   will stop at the push step.

## 26. The one-article-per-day workflow

Write it as `draft`. When it is finished, set `review`, read it in full, then
`editorialApproved: true`. Schedule it with `status: "scheduled"` and
`publishAt`, then push. From 09:00 Pacific on or after that day, the hourly job
releases it, links it in, builds, commits and deploys. Check it with
`node scripts/verify-live.mjs <slug> --wait 20`. Everything else, including
manual release and recovery, is in [publishing-workflow.md](./publishing-workflow.md).

## 27. Importing Search Console exports

Unzip the 28-day and 3-month Performance exports, each in compare mode, into
`search-console/28d/` and `search-console/90d/`. Optionally add
`page-queries.csv` and `indexing/*.csv`. Then run `npm run report:search-console`.

Reports stay in the gitignored `search-console/reports/`, because this
repository is public. `-- --publish-to-docs` writes them to `docs/` instead.

## 28. Known limitations

- The approval rule applies from 2026-09-23 onward. The 525 existing articles
  stay unapproved in the record, because nobody approved them individually.
- 327 articles are still linked only from same-release or newer articles. Older
  articles cannot carry that many new links without prose edits, which the brief
  rules out doing for their own sake. Every article does have editorial inbound
  links.
- 81 body anchors repeat 10 or more times for one target. They were reported,
  not rewritten.
- In-prose linking is deliberately strict: across the corpus it would find
  exactly one natural anchor. Most links will be cards.
- There is still no Search Console data, so nothing here measures performance.
- GitHub cron is best-effort, and scheduled workflows pause after 60 idle days.
