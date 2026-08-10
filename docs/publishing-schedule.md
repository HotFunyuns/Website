# Publishing schedule

A recommended 90-day plan for releasing the 50 gated draft articles, starting
from the 21 cornerstone articles that go live with the site.

This is a **recommendation, not a commitment**. Nothing here guarantees a
ranking, an impression, a click, an AI citation or an install. Search results
are not under our control. The schedule exists to make outcomes *attributable*,
not to promise them.

## Why it is spread out rather than shipped at once

Fifty articles released on one day is the shape of a scaled-content dump, and
search engines evaluate that pattern at the site level rather than the page
level. The downside risk is therefore the whole domain, not the batch.

Releasing five at a time does two useful things:

1. If quality is a problem, it surfaces after five pages instead of fifty.
2. Each batch gets a clean measurement window, so a change in performance can be
   traced to a specific release rather than to "the content we added in August".

## The gate

Every article below is currently `"status": "draft"` with `"noindex": true` and
has **no route on the public site**. Releasing one means completing all nine
steps in [`content-review-process.md`](./content-review-process.md) — including
re-verifying its sources and its app claims, which may have changed since it was
written. Moving the date on this table is not publishing.

Approving a batch is the owner's decision. A batch that is not ready does not
ship; the schedule slips instead.

## Day 0 — the cornerstone set

The 21 cornerstone articles (one per app in the catalog) go live with the
redesigned site. They are not part of the 90-day drip: they are the reference
layer every draft links back to, and they need to be indexed before the drafts
that point at them start arriving.

Leave roughly two weeks between the cornerstone launch and the first draft
batch. That gap is the baseline everything afterwards is measured against.

## The ten batches

Each batch mixes categories deliberately. Publishing all twenty sports articles
consecutively would concentrate the risk in one cluster and leave the other
categories with no fresh material for two months.

| Batch | Suggested date | Articles |
| --- | --- | --- |
| 1 | 2026-08-24 | `how-fantasy-draft-strategy-works`, `snake-draft-vs-auction-draft`, `cantonese-vs-mandarin-differences`, `how-much-protein-per-day`, `history-of-shoot-em-up-games` |
| 2 | 2026-09-01 | `salary-cap-basics-for-gm-games`, `what-makes-a-good-draft-board`, `cantonese-tones-explained`, `keto-macros-explained`, `what-makes-a-roguelike` |
| 3 | 2026-09-09 | `basketball-positions-explained`, `how-to-build-a-balanced-basketball-roster`, `thai-tones-explained`, `protein-sources-compared`, `color-theory-for-beginners` |
| 4 | 2026-09-17 | `football-positions-explained-for-drafting`, `best-offline-sports-games-android`, `is-thai-hard-to-learn`, `what-is-a-ketone-reading`, `video-file-formats-explained` |
| 5 | 2026-09-25 | `baseball-stats-explained-for-beginners`, `how-sports-simulation-engines-work`, `malay-vs-indonesian-differences`, `reading-nutrition-labels`, `bullet-hell-vs-classic-shmup` |
| 6 | 2026-10-03 | `understanding-sports-sim-probability`, `career-mode-vs-franchise-mode`, `malay-pronunciation-guide`, `intermittent-fasting-windows-explained`, `wave-survival-game-design` |
| 7 | 2026-10-11 | `soccer-formations-explained`, `how-soccer-league-tables-work`, `russian-cases-explained-for-beginners`, `mental-math-tricks-that-work`, `digital-coloring-techniques` |
| 8 | 2026-10-19 | `hockey-positions-explained`, `hockey-line-combinations-explained`, `how-long-does-it-take-to-learn-russian`, `how-historians-date-events`, `best-offline-arcade-games-android` |
| 9 | 2026-10-27 | `mma-weight-classes-explained`, `boxing-scoring-explained`, `khmer-script-explained`, `working-memory-and-training`, `anime-genres-explained` |
| 10 | 2026-11-04 | `sports-gm-games-without-internet`, `best-sports-manager-games-for-short-sessions`, `spaced-repetition-for-language-learning`, `major-eras-of-world-history`, `video-codecs-explained` |

Totals: 20 sports, 10 language, 6 health, 4 education, 5 arcade, 3 anime and
creative, 2 video and utility.

## What to check between batches

Roughly a week after each release, before approving the next one:

- **Search Console → Pages.** Are the new URLs discovered and indexed? A batch
  that is crawled but excluded as "Crawled – currently not indexed" is a quality
  signal worth acting on before adding five more.
- **Search Console → Performance.** Impressions on the new URLs, and — more
  importantly — whether impressions on *existing* URLs dropped. A fall in the
  cornerstone articles after a batch is the signal that matters most.
- **Cannibalisation.** If a new article and an older one trade positions on the
  same query, one of them should be merged or retargeted. The build blocks
  duplicate `primaryKeyword` values, but it cannot detect two different phrasings
  of one intent.
- **GA4.** Run the verification checklist in
  [`analytics-measurement.md`](./analytics-measurement.md). Confirm
  `play_store_click` fires with a populated `article_slug` on the new pages.
- **Internal linking.** Run `npm run report:links` and check that the new
  articles are not orphans and did not push anything past three clicks deep.

## When to stop or slow down

Pause the schedule and diagnose before releasing more if any of these appear:

- New URLs are consistently crawled but not indexed.
- Impressions or clicks fall on pages that were performing before a batch.
- A manual action or a "Search Console message" about content quality.
- Any article in a batch fails step 1 or step 2 of the review process — if the
  facts have moved, the ones already published need re-checking too.

Slowing down costs a few weeks. A site-wide quality problem costs considerably
more, and takes much longer to recover from than it does to cause.

## After the 90 days

The cadence above is a starting rhythm, not a permanent one. Once there is real
performance data, write to the intents that are actually earning impressions
rather than to a fixed quota — and update existing articles instead of adding
new ones where the existing page is already ranking. A genuine update with a
real `updatedAt` change is worth more than another page.
