# 90-Day Authority Measurement Plan

Written 2026-08-13, to measure the changes made in the authority audit
(`docs/authority-audit.md`). Complements `docs/analytics-measurement.md`, which
documents *how* the tag is installed; this document is *what to read and when*.

## What this plan will and will not tell you

It will tell you whether pages became more discoverable, whether more people
clicked through from search, and whether that traffic reached Google Play.

It will not tell you that rankings improved because of a specific change. Search
results move for reasons outside this site — algorithm updates, competitors
publishing, seasonality — and with 21 published articles the sample is small
enough that ordinary variance will look like a trend. **No target position,
traffic figure or number of referring domains is promised anywhere in this
document**, and any that appears in a report later should be treated as a
forecast someone invented.

Read every number below as a diagnostic, not a scorecard.

---

## Day 0: capture the baseline before deploying

None of the comparisons work without this. Do it **before** the audit changes go
live, and save the exports rather than screenshots.

| # | Capture | Where | Export |
| --- | --- | --- | --- |
| 1 | Impressions, clicks, average CTR, average position — last 28 days, whole site | GSC → Performance | CSV |
| 2 | The same four metrics **per page** | GSC → Performance → Pages | CSV |
| 3 | Queries per landing page for the 21 published articles and 21 app pages | GSC → Performance → filter by page → Queries | CSV per page, or the bulk export |
| 4 | Indexed page count and the reason breakdown for anything excluded | GSC → Indexing → Pages | CSV |
| 5 | External links, by linking site and by linked page | GSC → Links → External links | CSV |
| 6 | Core Web Vitals status, mobile | GSC → Core Web Vitals | Screenshot acceptable; note URL group counts |
| 7 | Organic sessions and users by landing page, last 28 days | GA4 → Reports → Acquisition → Traffic acquisition, or Explore with Session source/medium = `google / organic` | CSV |
| 8 | `play_store_click` count, split by `button_location` and by `app_name` | GA4 → Explore | CSV |
| 9 | Play Console store-listing acquisition: visitors and installs, per app | Play Console → Statistics → Store performance | CSV |

Store these in a dated folder. They are the only version of "before" you will get.

---

## Cadence

Four windows of 28 days. 28 rather than 30 so each window contains exactly four
of each weekday — weekday seasonality is strong on an app site and monthly
windows will mislead you.

| Window | Days after deploy | Compare against |
| --- | --- | --- |
| Baseline | −28 to 0 | — |
| P1 | 0 to 28 | Baseline |
| P2 | 28 to 56 | P1 and Baseline |
| P3 | 56 to 84 | P2 and Baseline |
| Review | day 90 | Full-period read |

Expect P1 to look flat or slightly negative. Recrawling and reprocessing 66 URLs
takes time, and title changes in particular need Google to recrawl before they
can affect CTR at all. **Do not act on P1 in isolation.** If something looks
alarming in P1, check §6 before changing anything back.

---

## 1. Google Search Console

### Coverage and indexing

- **Indexed count.** Expected to rise by 1 as `/press/` is discovered. If it
  falls, open Indexing → Pages and read the exclusion reasons before anything
  else — that is the highest-severity signal in this document.
- **`/apps/82-0-pro-basketball-draft/`.** Previously `noindex`; now an instant
  meta-refresh plus a canonical to `/apps/pro-basketball-draft-gm-mode/`. Expect
  it to be reported as a canonical duplicate ("Alternate page with proper
  canonical tag"), not as an error. That outcome is the goal. If it instead
  starts being indexed *separately*, the change did not work and should be
  reverted to `noindex`.
- **Sitemap.** Should read 66 URLs discovered. `lastmod` is now derived from
  `lastVerified` and `updatedAt` rather than build time, so it should stop
  changing on deploys that did not change content.

### Performance

Track per page, not just sitewide, for the pages listed in §7 of
`docs/authority-outreach-plan.md`.

- **Impressions** — the closest available proxy for whether a page is being
  considered for more queries.
- **Clicks and CTR** — the metric most likely to respond to this audit. 24 of 68
  page titles were over the width a result can display and were being truncated;
  all are now within it. If CTR does not move by P3 at constant position, the
  titles were not the constraint.
- **Average position** — record it, but weight it least. It is an average across
  queries of wildly differing volume and moves for reasons unrelated to the site.
- **Queries per landing page** — the genuinely useful one. Watch for *new*
  queries appearing against a page, which indicates broader relevance rather than
  the same query ranking better.

### Links

- **External links**, by target page. This is the authoritative source for the
  outreach plan; do not substitute a third-party backlink tool.
- **Internal links.** The audit changed internal linking, so this report should
  show more links into app pages and category hubs. This is verifiable
  immediately in the build via `npm run report:links` — GSC is the confirmation
  that Google sees the same graph.

---

## 2. GA4

Property `G-JK8FPQB5L2`.

> **Standing constraint.** Enhanced Measurement's *"Page changes based on browser
> history events"* must stay **off**. The site sends `page_view` manually with
> `send_page_view: false`. Turning that toggle on double-counts every client-side
> navigation and silently invalidates every comparison in this document. Confirm
> it is still off at the start of each window.

### Organic landing pages

Segment to `google / organic` and report **sessions by landing page**. Compare
the app pages and the 21 published articles separately — they behave differently
and averaging them hides both.

### `play_store_click`

The event carries `button_location`, `link_url`, `page_path`, `app_name`,
`article_slug` and `link_text`. Useful reads:

- **Total count**, and the rate per organic session. Rate matters more than
  count: traffic growth alone will raise the count.
- **By `button_location`** — `hero`, `app_card`, `article_top`, `article_middle`,
  `article_bottom`, `related_apps`, `header`, `footer`. This shows *where* intent
  converts. The audit added in-body article links and monetisation disclosures,
  so `article_middle` and `article_bottom` are the ones to watch.
- **By `article_slug`** — which articles actually drive store visits. Expect a
  small number to dominate. That ranking should inform which of the 54 drafts to
  publish next, and is probably the single most actionable number here.
- **By `app_name`** — which apps benefit from site traffic at all.

New in this audit: `/press/` emits `play_store_click` with `button_location` of
`hero` (developer page link) and `app_card` (per-app listing links).

---

## 3. Google Play Console

GA4 cannot follow a user into the Play Store, so this is a separate,
non-joinable dataset. Do not present the two as a single funnel.

- **Store listing acquisition → visitors from "Third-party referrers" or web.**
  The closest available signal that site traffic reached the store.
- **Install conversion rate**, per app.
- Compare against `play_store_click` counts for the same window. The two will not
  match — clicks are not visits and visits are not installs — but a large
  divergence in *direction* is worth investigating.

---

## 4. What each change should and should not move

Stated up front so results are not reinterpreted after the fact.

| Change | Should move | Should **not** be expected to move |
| --- | --- | --- |
| 24 over-length titles shortened | CTR at constant position; fewer Google-rewritten titles | Impressions, position |
| `lastmod` now content-derived | Crawl efficiency; fewer pointless recrawls | Rankings |
| 8 pages given `og:image` | Appearance when shared | Anything in search |
| Retired app page: `noindex` removed | Consolidation of that URL into its successor | Sitewide anything |
| `/press/` added | Indexed count +1; a page to earn citations | Near-term traffic |
| Internal linking changes | Internal link counts in GSC; crawl depth | Immediate rankings |
| Article corrections and disclosures | Nothing measurable | Everything — these are trust and accuracy fixes, made because they were wrong, not to move a metric |

That last row matters. The FSI figures were wrong and are now right; that is the
entire justification and it needs no metric.

---

## 5. Not fixed — measure the cost

App icons are encoded as **lossless** WebP: 28 files totalling ~2.9 MB, with
individual icons up to 257 KB. Each app detail page loads its full-size icon
eagerly as the LCP element. This is the largest outstanding performance item and
was not changed, because re-encoding brand assets is the owner's call and no
image tooling is installed in this repo.

Watch **GSC → Core Web Vitals (mobile)** and specifically LCP for the
`/apps/{slug}/` group. If those URLs sit in "Needs improvement" or "Poor", icon
weight is the first thing to address, and the fix is re-encoding to lossy WebP —
not a code change.

---

## 6. Confounders — check before concluding anything

- **Google algorithm updates.** Check the Search Status Dashboard for the window
  before attributing any sitewide movement to this work.
- **Seasonality.** Sports GM apps almost certainly track their sports' calendars;
  a baseline captured mid-August is not comparable to one captured in playoff
  season. Language apps commonly peak in January.
- **Small numbers.** At this traffic level a change from 4 clicks to 8 is not a
  100% improvement, it is noise. Prefer 28-day totals and ignore daily figures.
- **Publishing during the window.** 54 drafts are gated. Publishing any of them
  changes the site materially and breaks comparability — record the date if it
  happens, and note which windows are affected.
- **Recrawl lag.** Nothing in §4 can register before Google recrawls the page.
  Use the URL Inspection tool to confirm the crawl date before deciding a change
  did not work.

---

## 7. Signals that something is wrong

Escalate immediately, rather than waiting for the next window:

- Indexed count falls.
- Any URL under `/blog/` that is not one of the 21 published slugs appears in GSC
  — that would mean draft content leaked.
- `play_store_click` drops to zero (a tag regression, not a behaviour change).
- Page views roughly double with no traffic increase — the Enhanced Measurement
  history toggle has been switched on.
- `/apps/82-0-pro-basketball-draft/` gets indexed as its own page.

---

## 8. The day-90 report

Five things, and nothing that is not directly supported by an export:

1. Baseline vs P3 for impressions, clicks, CTR and indexed count.
2. Which landing pages gained or lost, and the queries behind the change.
3. `play_store_click` per organic session, by `button_location` and `article_slug`.
4. Which referring domains appeared in GSC External links, if any.
5. What is still unexplained.

Point 5 is not optional. A report with no unexplained movement has been
over-fitted.
