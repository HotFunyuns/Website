# Keyword and search-intent research for the 100 new articles

What evidence was actually collected before the 100 new articles were written,
what that evidence establishes, and — more importantly — what it does not.

Collected **2026-09-04**. Raw data: `docs/data/search-intent-observations.json`.
Reproduce with `npm run research:intent`.

## The honest headline

**No search-volume data exists for any term on this site, and none is published
anywhere.** We have no authenticated access to Google Ads Keyword Planner, and
no subscription to Semrush, Ahrefs or an equivalent provider. Google Trends
returned HTTP 429 to every request made from this environment, so no relative
interest series was captured either.

What we do have is a real, dated, reproducible record of **how people phrase
queries** in this subject area. That is genuinely useful for choosing topics and
titles. It is not demand data, and this document does not present it as demand
data.

## Sources consulted, in the order the brief specifies

| # | Source | Available? | What was obtained |
| --- | --- | --- | --- |
| 1 | Google Search Console query and landing-page data | **No** — no API credentials or export available to this environment | Nothing |
| 2 | Google Trends | **No** — HTTP 429 on every request | Nothing |
| 3 | Google Ads Keyword Planner | **No** — no authenticated access exists | Nothing |
| 4 | A reputable SEO-data provider | **No** — no subscription configured | Nothing |
| 5 | Google Autocomplete | **Yes** | 1,015 suggestions across 120 seeds |
| 6 | First-party Google Play listing language | **Yes** | 29 verified listings, full descriptions captured |
| 7 | Site search and GA4 behaviour | **No** — no GA4 export available; the site has no internal search | Nothing |
| 8 | Currently ranking articles | **Partly** — individual pages fetched to verify claims, not scraped for coverage analysis | Verification only |

Sources 1–4 and 7 are recorded as unavailable rather than approximated. An
estimate presented in their place would be indistinguishable from an invented
figure, which is exactly what this project must not produce.

## What was collected

### Google Autocomplete

- **Provider:** `suggestqueries.google.com/complete/search`, `client=firefox`
- **Geography:** United States (`gl=us`)
- **Language:** English (`hl=en`)
- **Collected:** 2026-09-04
- **Seeds:** 120
- **Suggestions returned:** 1,015

| Cluster | Seeds | Suggestions |
| --- | ---: | ---: |
| sports-rules | 15 | 140 |
| sports-career-sim | 10 | 93 |
| language-general | 9 | 76 |
| sports-gm | 10 | 70 |
| video-utility | 7 | 65 |
| health-keto | 6 | 60 |
| health-protein | 6 | 60 |
| health-general | 8 | 54 |
| anime-creative | 5 | 50 |
| education-math | 5 | 50 |
| language-existing | 5 | 50 |
| language-vietnamese | 5 | 50 |
| education-history | 5 | 44 |
| android-general | 7 | 43 |
| arcade | 6 | 42 |
| language-italian | 4 | 34 |
| language-lao | 3 | 28 |
| sports-sim-design | 4 | 6 |

**Confidence: high that the observation is accurate, on the collection date, for
that locale.** Autocomplete output varies by location, personalisation state and
time, so this is a snapshot rather than a constant.

### What autocomplete does and does not establish

**It establishes:** that a phrasing is common enough for Google's suggestion
system to surface it, and what related phrasings people use. That is real
evidence about *how a query is worded* and about *which adjacent questions
exist*.

**It does not establish:** how many people search a term, how competitive it is,
what it is worth, or whether ranking for it would produce traffic. Autocomplete
has no volume component. Anyone converting a suggestion list into a volume claim
is inventing the number.

### Seeds that returned nothing

Six seeds produced no suggestions:

`gm mode games android`, `random number generator game fairness`,
`why do simulated seasons vary`, `food logging accuracy`,
`why do food databases disagree`, `android battery drain games`.

**This was treated as information, not as a veto.** An absent suggestion means
the exact phrasing is not commonly typed; it does not mean the underlying
question is not asked. Four of these six became articles anyway — as
[why food databases disagree](../content/blog/why-food-databases-disagree.md),
[battery and performance in mobile games](../content/blog/battery-and-performance-in-mobile-games.md),
and material inside the simulation-probability and GM articles — because the
question is real and our apps are a legitimate place to answer it. Their titles
were written for the question rather than for the seed phrase.

### First-party Play listing language

All 29 published Google Play listings were captured on 2026-09-04 by
`npm run verify:play`, including full descriptions. That copy is the studio's own
description of what each app does, and it is the source for every app-feature
claim in the new articles. Nothing about an app was written from memory.

## How topics were chosen

Each of the 100 new articles had to satisfy all of the following before it was
written:

1. **A single, stated primary search intent.** Recorded in frontmatter as
   `intent`, and enforced as unique-per-keyword by the build.
2. **A distinct primary keyword.** `src/lib/blog/index.ts` throws at build time
   if two articles claim the same one, so a collision cannot ship.
3. **A named associated app and category.** Recorded as `relatedApps` and
   `category`; the build rejects unknown values.
4. **A reason to be a separate page.** Documented per pair in
   `docs/search-intent-and-cannibalization-map.md`.
5. **A cannibalisation check** against every existing and planned article, by
   IDF-weighted keyword similarity within the same category and intent.

### Cluster structure

Topics were organised into hub-and-spoke clusters rather than as a flat list:

| Cluster | New articles | Hub |
| --- | ---: | --- |
| Sports career simulation | 23 | The five new career-sim app pages |
| Sports rules and GM concepts | 14 | `/apps/category/sports-gm/` |
| Language — Vietnamese, Lao, Italian | 12 | The three new language app pages |
| Language — general method | 8 | `/apps/category/language-learning/` |
| Health and nutrition | 13 | `/apps/category/health-nutrition/` |
| Education and brain training | 8 | `/apps/category/education-brain/` |
| Anime and creative | 6 | `/apps/category/anime-creative/` |
| Action and arcade | 8 | `/apps/category/action-arcade/` |
| Video and utility | 8 | `/apps/category/video-utility/` |

### Intent types covered

The brief asks for a demand-led editorial mix rather than one repeated format.
Across the 100:

- **Informational** — how something works, what a term means.
- **Comparison and decision** — which of several options suits which reader,
  including two new comparison articles carrying the ownership disclosure.
- **Troubleshooting** — why a file will not play, why a protein goal is missed,
  why a career stalls.
- **Strategy and instruction** — how to draft, how to read a defence, how to
  manage a golf tournament.
- **First-party app explanation** — how a specific Reign Creative app works,
  written from the verified listing plus the catalog.
- **Reference and glossary** — anime terminology, calendar systems, codec tables.

## Terms this research does not support

Recorded explicitly, because the absence is the finding:

- **No monthly search volume** for any term.
- **No keyword difficulty** for any term.
- **No CPC or commercial value** for any term.
- **No traffic projection** for any article.
- **No claim that any term is "high volume".** The `demandTier` field in
  frontmatter carries values prefixed `unverified-` for exactly this reason, and
  it is never rendered to a visitor.

`docs/keyword-verification-needed.md` is the standing register of terms that
still need checking in a real keyword tool. It now covers **1,820 unique terms
across 175 articles**, all marked unverified.

## What the owner should do next

1. **Connect Search Console.** Once these 139 new URLs have been crawled, the
   Performance report becomes the first real demand data this project has ever
   had — and it is specific to this site rather than to a general corpus.
2. **Check the primary terms in a keyword tool.** One article is committed to
   each, so a bad choice is the most expensive kind. `docs/keyword-map.csv` is
   sorted for exactly this.
3. **Retarget from data rather than from guesses.** After a measurement window,
   rewrite toward the intents that are actually earning impressions. That is
   worth more than another hundred articles.
