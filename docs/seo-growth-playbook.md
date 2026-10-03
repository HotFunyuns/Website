# SEO growth playbook — reigncreativellc.com

What this site does to be found, understood and trusted, what has actually been
observed, and how to keep publishing without manufacturing anything. Written
2026-10-02 alongside the sports expansion (report:
[expansion-2026-10-final-report.md](./expansion-2026-10-final-report.md)).

Read the sections in order. They keep apart four things that are easy to blur:
what is **implemented** (checkable in the repo), what has been **observed** (with a
date and a source), what **probably contributed** (inference), and what is
**unproven** (a hypothesis nobody has measured).

> **Data available when this was written:** no Search Console export, no Search
> Console API access, no GA4 export and no Keyword Planner account have ever been
> available to this repository. Every metric below has a source and a date; where
> none exists, the text says so. Nothing here is a ranking or traffic forecast.

---

## 1. Implemented practices

Each line names where the practice lives, so it can be verified rather than trusted.

### Hosting, HTTPS and the preferred host
- One preferred origin, `https://reigncreativellc.com`, used by every canonical,
  `og:url`, JSON-LD `url`, sitemap `<loc>`, RSS link and internal link
  (`companyInfo.siteUrl` in `src/data/apps/types.ts`).
- The host is GitHub Pages: no 301/308 redirects except the trailing-slash
  redirect for directories, no custom response headers, no `X-Robots-Tag`
  (`docs/https-canonical-report-2026-10.md`). `vercel.json` is inert here.
- **Not yet enforced:** GitHub Pages "Enforce HTTPS" is **off** (verified live
  2026-10-02: `http://reigncreativellc.com/` answers 200 with the same bytes as
  https, `http://www.` redirects into http, no HSTS). Only the owner can switch it
  on (Settings → Pages). Until then, http duplicates exist and only the https
  canonicals resolve them. Generating pages does not change the HTTPS count in
  Search Console, and nothing here tries to.

### Canonical URLs and duplicate control
- Every indexable page carries an absolute, self-referencing https canonical that
  ends in `/` (`trailingSlash: true`); `og:url` equals it. Checked by
  `scripts/audit-canonicals.mjs` and `scripts/verify-live.mjs`.
- `scripts/postbuild-normalize-urls.mjs` deletes every `out/**/index.txt` RSC
  payload and the soft-404 `out/404/` copy after each build. Without it, every page
  has an uncanonicalisable `text/plain` twin (the cause of the 12 "Duplicate without
  user-selected canonical" pages reported on 2026-09-15). It must stay in
  `npm run build`.
- The 404 page (`out/404.html`, served with a real 404 status for every unknown
  path) carries exactly one robots tag (`noindex`), no canonical and no `og:url`.
- No filter, sort, search or tracking parameter produces a page: the apps
  explorer and blog explorer keep state client-side; a `?utm_…` URL serves the same
  file whose canonical omits the parameter. Case variants (`/Blog/`) are genuine 404s.

### Sitemap, RSS and llms.txt
- `src/app/sitemap.ts` lists only published, canonical, indexable 200 URLs. Every
  `lastModified` comes from a recorded date — an app's `lastVerified`, an article's
  `updatedAt`, a hub's or tool's `updatedAt` — never the build time.
  `scripts/validate-sitemap-rss.mjs` and `scripts/validate-content.mjs` fail the
  build on a draft, a noindex page or a missing article in the sitemap.
- `/blog/rss.xml` lists the **newest 50** articles (from 2026-10-02; before that
  it listed every article). It announces what is new; the sitemap is the complete
  index. Advertised with `rel="alternate"` on the blog index and articles, and
  linked visibly from `/blog/`.
- `/llms.txt` is a short index pointing to the sitemap, the feed and the main
  sections. It is not a Google ranking factor and is not treated as one.

### Breadcrumbs and structured data
- One component (`src/components/Breadcrumbs.tsx`) renders the visible trail and
  the `BreadcrumbList` from the same array, so they cannot disagree. Every level is
  a real, linked page. Used by app, category, article, topic-hub, sport-hub, tool,
  author and index pages.
- Structured data is limited to what the page visibly shows: `Organization`,
  `WebSite`, `SoftwareApplication` (app pages, with `alternateName` for verified
  former Play titles), `BlogPosting`, `BreadcrumbList`, `CollectionPage`/`ItemList`
  (hubs), `WebPage` (tools), `FAQPage` only where the FAQs are visible,
  `AboutPage`, `ProfilePage`. No `aggregateRating`, `review`, invented offers,
  credentials or invisible claims; `SoftwareApplication` is not used for calculators.
  `scripts/validate-structured-data.mjs` checks every template.

### Site structure
- **Which app:** `/apps/`, `/apps/category/<id>/`, `/apps/<slug>/`.
- **Which subject:** `/blog/`, `/blog/category/<id>/`, `/blog/topics/<hub>/` (ten
  education hubs with a build-time cornerstone check).
- **Which sport:** `/sports/` and nine sport hubs (`/sports/<sport>/`) with their
  own standing copy, the sport's apps by role (draft/GM vs career), guides grouped
  by subject, calculators and visible FAQs (`src/data/sports.ts`,
  `docs/sports-architecture.md`).
- **Do it yourself:** `/tools/` and one page per calculator at
  `/tools/<sport>/<tool>/`; formulas live in tested pure modules and the worked
  example on each page is computed by the same code at build time.
- **Who wrote it:** `/authors/reign-creative-llc/`.
- Maximum click depth from the homepage is 2–3 (`scripts/link-report.mjs`).

### Internal linking
- Articles link their primary app page, their category or hub, their sport hub
  ("Part of: … guides", template-level), their cornerstone, and 2–5 related
  published articles. App pages list every guide and link their sport hub.
- A separate **post-publication reverse-linking pass** (`npm run links:after-publish
  -- <slug>`, batch mode `npm run links:batch`) adds "Keep reading" cards from the
  most relevant older articles, capped at the six cards the template renders, and
  links prose only when the article's own target phrase already appears verbatim.
  It never moves `updatedAt`.
- **Orphan prevention:** the build fails if a published article is linked from no
  exported page, or from no other article's prose or "Keep reading" grid
  (`validate-content`). Links to unpublished pages fail the build.
- Anchors are descriptive and varied; exact-match keyword anchors are not repeated
  for their own sake. `link-report` flags anchors reused 10+ times for one target.

### Authorship, disclosure and review labels
- Byline: **Reign Creative LLC**, linked `rel="author"` to the author page; the
  `BlogPosting.author` reads the same registry entry (`src/data/authors.ts`). No
  named person is shown without an owner approval record.
- Every article states, beside the byline, that the company makes the apps it links.
- From 2026-10-02 every new article carries one of two labels
  (`src/components/blog/ArticleReviewNotice.tsx`): **"AI-assisted article … No
  person has reviewed it yet"** (published after automated checks and a logged AI
  editorial review), or **"Reviewed by <name> on <date>"**, which requires a real
  record — `editorialApproved`, `reviewerName`, `reviewDate`, `sourcesChecked`,
  `reviewNotes` — that no script may write. Articles published on or before
  2026-09-22 carry no label; the editorial policy explains what was checked for them.
- Comparisons disclose ownership, show a research date and follow the rules in
  `docs/content-spec.md`.

### Sources and facts
- Every external fact is cited with publisher and access date. App facts come only
  from the catalog, which `scripts/verify-play-listings.mjs` + `audit-catalog.mjs`
  keep identical to the live Google Play listings (name, category, rating, ads, IAP,
  price). A Play rename keeps the URL and shows the former name.
- The AI editorial review logs, per article, what it checked and the hash of the
  exact text it passed (`docs/data/editorial-review-log-2026-10.json`;
  `scripts/publish-batch.mjs` refuses an article whose text changed after review).
- When a listing changes, articles that contradict it are corrected with a dated
  correction note and a new "Updated" date (2026-10-02: 59 sports and 116 other
  articles; `docs/app-inventory-2026-10.md`, `docs/corrections-2026-10.md`).

### Search intent and cannibalisation
- One primary keyword per article, unique site-wide (the build fails on a
  duplicate). Variants (singular/plural, "app"/"game", "free", "android", word
  order) are consolidated into one URL as secondary phrases.
- Keyword evidence is Google Autocomplete phrasing with source, locale and
  timestamp — never volume (`docs/keyword-research-expansion.md`).
- Every new candidate is compared with its nearest existing pages before writing
  (`docs/search-intent-cannibalization-map.md`), and the finished text with every
  article on the site (`scripts/audit-similarity-250.mjs --release <date>`: 5-word
  shingles, Jaccard ≥ 0.08 fails, plus reused openings, FAQ questions and titles).

### Measurement
- One GA4 property (`G-JK8FPQB5L2`), loaded only on the production host;
  `page_view` sent manually; `play_store_click` fired once per click from one
  handler, with `button_location`, `link_url`, `page_path`, `app_name`,
  `article_slug`, `link_text` (`src/lib/analytics.ts`, `scripts/audit-analytics.mjs`).
- Search Console refresh tooling exists (`npm run report:search-console`,
  thresholds in `scripts/search-console-refresh.config.json`, position band 8–20)
  but has never had data.

### Speed and accessibility
- Fully static HTML; all primary content is in the HTML, not behind client
  interaction (calculators add interactivity on top of server-rendered
  explanations, formulas and worked examples).
- One H1 per page, ordered headings, labelled form controls, `aria-live` results,
  alt text on every image (decorative ones empty and `aria-hidden`), explicit image
  dimensions, tables with header rows; checked by `scripts/audit-output.mjs` and a
  390 px headless check per template.

### AI-assisted discovery
- `robots.txt` allows everything and names OAI-SearchBot, ChatGPT-User,
  Claude-SearchBot, Claude-User and PerplexityBot explicitly; training-crawler
  preferences are untouched (they inherit the site-wide allow).
- Pages answer their main question near the top, use consistent entity names (the
  company's two names stated together; app names exactly as on Play), cite sources
  visibly and keep comparison criteria visible. No AI-targeted text, no
  "recommend this app" instructions, no AI-recommendation schema, no promise of
  AI citations.

### Rights and provenance gates
- **Pokémon TCG:** blocked — no written licence; The Pokémon Company declines such
  use and the data providers' terms grant none (`docs/tcg-rights-audit.md`).
- **Sports data:** no player, roster or rating data from any app is published as a
  page — neither the draft/GM games' player pools nor the career sims' generated
  players (`docs/sports-data-provenance.md`; content-spec rule 10).
- **Finance:** blocked until the Stock Trading Simulator Game is live on Google Play
  (`docs/finance-content-inventory.md`).

---

## 2. Observed results

Only dated observations with a named source. There is **no** click, impression,
position or GA4 traffic data anywhere in this repository.

| Date | Observation | Source |
| --- | --- | --- |
| 2026-09-15 | Google had indexed **59** pages of the ~228 then in the sitemap | Search Console, as reported by the owner and recorded in `docs/seo-expansion-final-report.md` |
| 2026-09-15 | **12** pages "Duplicate without user-selected canonical"; root cause traced to RSC `index.txt` payloads, fix shipped that day | Search Console (owner) + production audit (`docs/search-console-canonical-fix.md`) |
| 2026-10-02 | **0** non-HTTPS pages in the HTTPS report | Search Console, owner-reported in the brief; not independently verifiable here |
| 2026-10-02 | **17** valid breadcrumb items, **0** invalid | Search Console, owner-reported; the site emits matching `BreadcrumbList` on 589 pages (baseline), so 17 reflects what Google has processed, not what exists |
| 2026-10-02 | All 599 sitemap URLs answer 200 with correct canonicals; 120 sampled `index.txt` URLs answer 404; `http://` still serves 200 | Live sweep, `docs/expansion-2026-10-baseline.md` |

No change in traffic, rankings or indexing can be attributed to any change on this
site, because no before/after data exists. Statements in the other sections are
correlations or hypotheses and are labelled as such.

---

## 3. Likely contributing factors (inference, not measurement)

- **Slow indexing of new URLs** is consistent with three single-shot releases in
  September (139, 100 and 250 articles) on a young domain with few external links;
  59 indexed of ~228 on 2026-09-15 is the only data point. This is a correlation.
- **Breadcrumb count (17)** most likely tracks the number of pages Google has
  processed, not a markup problem — every template emits identical, valid markup.
- **Duplicate-canonical exclusions** were caused by the static-export payloads; the
  fix is verified live, but Search Console "Validate fix" was not pressed as of the
  last report, so Google's view of it is unconfirmed.

---

## 4. Unproven hypotheses (to test, not to rely on)

- Sport hubs, calculators and tightly cross-linked guides will help Google
  understand each sport cluster and choose the right URL per query.
- Original calculators earn links and repeat visits better than explainers do.
- A visible "AI-assisted, not reviewed by a person" label does not reduce user
  trust or search performance relative to unlabelled pages — or it does. Nobody
  has measured it here.
- A 50-item feed improves fetch efficiency for feed readers without affecting
  discovery (the sitemap still lists everything).
- FAQ sections help readers; `FAQPage` markup is kept only because the FAQs are
  visible — Google no longer shows FAQ rich results for sites like this one, so
  no search benefit is expected from the markup itself.
- `llms.txt`, "Key takeaways" boxes and explicit AI-crawler allow rules help AI
  systems summarise or cite the site. No evidence either way.

---

## 5. Practices explicitly rejected

- Buying, exchanging, automating or fabricating links; fake reviews, ratings,
  awards, download counts, credentials, testimonials or authors.
- Keyword-density targets, keyword-stuffed titles/alt text, exact-match anchor
  repetition, one page per keyword variant, doorway pages.
- Thin programmatic pages: one page per database row (per Pokémon card, per real
  or generated player), per filter combination or per app-name variant.
- Claiming human, expert or fact-checked review without a named reviewer and a
  record; mass-setting `editorialApproved`.
- Backdating, or refreshing dates without a real content change.
- Publishing a draft, a testing/in-review app, or an unverifiable app; linking to one.
- Competitor logos, invented competitor limitations, criteria reverse-engineered so
  our app wins.
- Individualised investment advice, betting framing, medical advice.
- Google's Indexing API for normal articles.
- Text aimed at search engines or AI systems rather than readers.

---

## 6. Repeatable publishing workflow

1. **Research** — Autocomplete phrasing (with date/locale), live result types,
   existing coverage; one canonical URL per intent; candidates written to
   `docs/data/expansion-candidates-*.json` with nearest existing pages and a
   decision (proceed / merge / reject).
2. **Write** — `content/blog/<slug>.md`, `status: "review"`,
   `editorialReview: "automated"`, `noindex: true`; app facts only from
   `node scripts/dump-catalog.mjs <slug>`; every source opened.
   `node scripts/preflight-articles.mjs --only <slug>` must pass.
3. **Review** — the AI editorial review (`docs/content-review-process.md`): sources
   support the claims, app claims match the catalog, rights, cannibalisation,
   similarity, usefulness, links, metadata. Log verdict + `contentHash`
   (`node scripts/publish-batch.mjs --hash <slug>`).
   *Or* a person reviews it and fills the review record → `editorialReview: "person"`.
4. **Publish** — `node scripts/publish-batch.mjs <slugs…> --dry-run`, then without
   `--dry-run`: only reviewed, unchanged, valid articles go live, dated today
   (Los Angeles). Nothing is held back to fit a schedule.
5. **Link** — `npm run links:batch` (reverse links from older articles first), then
   check `npm run report:links` for orphans, depth and anchor repetition.
6. **Build and validate** — `npm run build`, `npm run audit:all`, `npx tsc --noEmit`,
   `npx next lint`, `node scripts/audit-similarity-250.mjs --release <day>`.
7. **Ship** — commit, normal push to `main`, then
   `node scripts/verify-live.mjs <slug> --wait 20` and `--smoke`.
8. **Record** — release report in `docs/`, refresh queue, owner actions.

---

## 7. Fourteen-day and 28-day review

Export from Search Console (Performance → compare mode; Pages report; and the
URL Inspection result for a sample of new URLs) into `search-console/` (gitignored),
then run `npm run report:search-console`.

**Day 14 (indexing and errors)**
- Pages report: how many new URLs are *Indexed*, *Crawled – currently not
  indexed*, *Discovered – currently not indexed*, or excluded for another reason.
  Compare the new sport hubs and calculators with the new articles.
- Enhancements: breadcrumb items valid/invalid; any structured-data errors.
- Coverage of the http duplicates (until Enforce HTTPS is on).
- GA4: `play_store_click` by `page_path` and `button_location` for new pages (a
  count, not a conversion claim).
- **Act only on errors**; do not judge content performance at day 14.

**Day 28 (performance and decisions)**
- Performance per new URL: impressions, clicks, average position, top queries.
- **Positions 8–20 with impressions** above the config thresholds → refresh
  candidates (`npm run report:search-console` lists them): improve the answer,
  sources, examples and title/description; never just bump the date.
- **Two of our URLs sharing a query** → decide which intent each serves; merge or
  re-target the weaker one (canonical, since the host cannot redirect).
- **Most new URLs still not indexed at day 28** → stop publishing new batches,
  strengthen internal links to the best pages, and improve or merge weak ones. The
  recovery move is consolidation, not more pages.
- Record what changed, with dates, in this file's §2 — observations only.
