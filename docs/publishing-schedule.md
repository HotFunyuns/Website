# Publishing schedule

## Status: superseded on 2026-09-04

This document recommended a 90-day, ten-batch drip release for the gated drafts.
**That plan was not followed.** On 2026-09-04 the owner instructed a single
release of everything: all remaining gated drafts plus 100 newly written
articles, 139 articles in one day.

The recommendation and the reasoning behind it are preserved below, unedited,
because the "before" reading is the only one that exists and rewriting it would
destroy the record. What follows first is what actually happened and what to
watch as a result.

## What actually happened

| | Plan | Actual |
| --- | --- | --- |
| Release shape | 10 batches of 5, over 90 days | 1 release of 139 |
| Gated drafts released | 50 (the count when this was written) | 39 (the count that remained) |
| New articles | Not contemplated | 100 |
| First release date | 2026-08-24 | 2026-09-04 |
| Published total after | 71 | 175 |

Every article released still went through the nine-step review in
[`content-review-process.md`](./content-review-process.md). The step that was
skipped is the pacing, not the review.

## The risk this creates, stated plainly

The argument below for spreading releases out was about **attribution and
downside containment**, and both are weakened by a single release:

**Attribution is now coarse.** With one release there is no clean measurement
window per batch. A change in performance after 2026-09-04 can be traced to
"the September release" and no further. The batch-level diagnosis this schedule
was designed to enable is not available.

**The downside is site-wide rather than batch-sized.** If quality or release
pattern is a problem, it surfaces across 139 URLs at once rather than after five.

**Release pattern is itself a signal.** Publishing a large number of pages
simultaneously is a pattern search engines evaluate at the site level. That is
independent of whether the individual pages are good, and it is recorded in
[`google-spam-compliance-audit.md`](./google-spam-compliance-audit.md) § 1 as the
residual risk of this pass.

## What to watch now, and what to do

Check these at roughly two, six and twelve weeks from 2026-09-04.

**Search Console → Pages.** Are the new URLs discovered and indexed? A large
share sitting in "Crawled – currently not indexed" is the signal that matters
most, and it points at the release pattern before it points at any individual
article.

**Search Console → Performance.** Impressions on the new URLs, and — more
important — whether impressions on the **36 pre-existing articles** fell. A drop
on previously performing pages is the clearest evidence of a site-level problem.

**Cannibalisation.** The build blocks duplicate primary keywords and pre-flight
blocks duplicate intent keys, but neither detects two different phrasings of one
intent competing in practice. If two URLs trade positions on one query, merge or
retarget one. `docs/search-intent-and-cannibalization-map.md` lists the 30 pairs
closest to that line.

**GA4.** Run the checklist in [`analytics-measurement.md`](./analytics-measurement.md).
Confirm `play_store_click` fires once per click with a populated `article_slug`
on the new pages.

**Internal linking.** `npm run report:links` after any content change.

## If indexing goes badly

The recovery move is **not** to publish more. In rough order:

1. Stop publishing. Add nothing new until the picture is clear.
2. Identify the weakest pages by impressions and by whether they are indexed at
   all, and improve or consolidate them.
3. Strengthen internal linking to the pages that are performing.
4. Wait. Site-level assessments take considerably longer to reverse than to
   trigger.

## The original recommendation, preserved

Everything below this line is the document as it stood before 2026-09-04.

---

A recommended 90-day plan for releasing the 50 gated draft articles, starting
from the 21 cornerstone articles that go live with the site.

This is a **recommendation, not a commitment**. Nothing here guarantees a
ranking, an impression, a click, an AI citation or an install. Search results
are not under our control. The schedule exists to make outcomes *attributable*,
not to promise them.

### Why it is spread out rather than shipped at once

Fifty articles released on one day is the shape of a scaled-content dump, and
search engines evaluate that pattern at the site level rather than the page
level. The downside risk is therefore the whole domain, not the batch.

Releasing five at a time does two useful things:

1. If quality is a problem, it surfaces after five pages instead of fifty.
2. Each batch gets a clean measurement window, so a change in performance can be
   traced to a specific release rather than to "the content we added in August".

### The gate

Every article was `"status": "draft"` with `"noindex": true` and had **no route
on the public site**. Releasing one meant completing all nine steps in
[`content-review-process.md`](./content-review-process.md) — including
re-verifying its sources and its app claims, which may have changed since it was
written. Moving the date on the table was not publishing.

Approving a batch was the owner's decision. A batch that was not ready did not
ship; the schedule slipped instead.

### When to stop or slow down

Pause the schedule and diagnose before releasing more if any of these appear:

- New URLs are consistently crawled but not indexed.
- Impressions or clicks fall on pages that were performing before a batch.
- A manual action or a "Search Console message" about content quality.
- Any article in a batch fails step 1 or step 2 of the review process — if the
  facts have moved, the ones already published need re-checking too.

Slowing down costs a few weeks. A site-wide quality problem costs considerably
more, and takes much longer to recover from than it does to cause.

### After the 90 days

The cadence above is a starting rhythm, not a permanent one. Once there is real
performance data, write to the intents that are actually earning impressions
rather than to a fixed quota — and update existing articles instead of adding
new ones where the existing page is already ranking. A genuine update with a
real `updatedAt` change is worth more than another page.
