# Final report — the 250-article expansion

Released **2026-09-22**. Commit `efa6da0`, branch `main`, pushed to
`origin/main`.

Per-article URL lists are in `docs/keyword-to-url-map-250.md`, which is
generated from the published files and therefore cannot drift from what
actually shipped.

---

## 1. Starting point

| | |
| --- | --- |
| Starting commit | `2170969` — "Fix canonical indexing and publish 100 app guides" |
| Starting article count | **275**, all published, 0 drafts |
| Branch / upstream | `main` → `origin/main`, working tree clean |
| Repository instruction files | none (no `AGENTS.md`, no `CLAUDE.md`) |
| Production at start | sitemap 338 URLs, RSS 275 items — identical to the repository |

## 2. Was the earlier 50-article batch already present?

**No.** `2170969` was still `HEAD`, no commit followed it on `main` or
`origin/main`, the tree was clean, the count was exactly 275, and no article
carried a date later than 2026-09-15. There was nothing to count toward this
expansion and nothing to preserve.

The target was therefore the full 250, as the brief specifies for that case.

## 3. Counts

| | Articles |
| --- | ---: |
| Baseline | 275 |
| Cohort A — general portfolio | **50** |
| Cohort B — Mental Math & Memory Games | **100** |
| Cohort C — World History Timeline Sim | **100** |
| **Expansion** | **250** |
| **Final published total** | **525** |

Enforced by `scripts/audit-expansion-250.mjs`, which derives cohort membership
from the publication date and the article's primary app rather than trusting a
declared label.

Content scale: **317,866 words**, **1,037 citations**, **1,017 FAQ entries**.
Median article 1,256 words; shortest 905, longest 1,698. Nothing was padded to
reach a length, and nothing was written to reach a count.

## 4. Verified app identity

Both apps were fetched signed-out on 2026-09-21 and read from the
`SoftwareApplication` JSON-LD Google Play embeds. Full detail in
`docs/featured-app-verification.md`.

| | Mental Math & Memory Games | World History Timeline Sim |
| --- | --- | --- |
| Package | `com.reigncreative.mentalmathchampion` | `com.reigncreative.history` |
| Developer | Reign Collective Apps | Reign Collective Apps |
| Play URL | `.../details?id=com.reigncreative.mentalmathchampion` | `.../details?id=com.reigncreative.history` |
| Store category | GAME_EDUCATIONAL | EDUCATION |
| Price / ads / IAP | Free · contains ads · offers IAP | Free · contains ads · offers IAP |
| Content rating | Everyone | Everyone |
| Rating displayed | **none** | **none** |

### Two corrections to the brief's premises

The brief named the brain-training app "IQ Test & Brain Training Games" and the
other "World History". Both names exist only in the local projects:

- `app.json` says "IQ Test & Brain Training Games"; the **live store title is
  Mental Math & Memory Games**.
- `app.json` says "World History Simulator"; the **live store title is World
  History Timeline Sim**.

The live titles are used in every title, description, CTA and structured-data
field. `audit-expansion-250.mjs` fails the release if either unreleased name
appears anywhere in the 250.

## 5. Source inventories

Both app projects were read strictly read-only; `git status` in each was clean
afterwards. Detail in `docs/featured-app-source-inventory.md`.

**Mental Math & Memory Games** — 255 playable modes (39 math, 41 memory, 176
cognitive across 17 groups), a 49-technique library, 24 cognitive-test domains,
28 assessments, ~22,000 lines of item banks, 7 bundled images (icons only).

**World History Timeline Sim** — 5,153 events, 12,026 flashcards in 391 decks,
3,787 glossary terms, 2,497 Time Travel scenarios, 2,106 survival scenarios,
1,810 iceberg entries, 1,470 detective cases, 1,041 invention chains, 636 map
items, 478 daily-life profiles, 425 people, 239 civilizations, 209 wars, 189
lessons, 168 landmarks. Counted by evaluating each bank through the app's own
TypeScript loader, not by pattern-matching source text.

## 6. The two rulings that shaped the content

### Cohort B — the assessment layer is not shipped

The app project contains a large cognitive-assessment layer: a Cognitive IQ
Test, a 26-assessment hub, a 16-type personality inventory and 176 cognitive
modes. Its `CHANGELOG.md` marks every entry after 2026-06-10 `[Unreleased]`,
including a rename that is confirmed not live, so the markers are unmaintained
and prove nothing either way.

Resolved against the live listing instead. The store description advertises
mental math and memory games, the four operations, number and sequence memory,
a daily challenge, timed sprints, accuracy rounds, survival, boss quizzes, the
techniques library, and tracking of scores, accuracy, streaks, response time
and personal bests. It contains **none** of: "IQ test", "cognitive test",
"assessment", "personality", "brain age", "percentile", "processing speed",
"spatial", "vocabulary", "reaction", "logic puzzle", "pattern recognition".

So the assessment layer was treated as **not shipped**. Articles cover IQ,
reasoning, logic, memory and attention as subject matter; app-feature claims
are confined to the verified-shipped set. **No article says the app tests,
measures or estimates the reader's IQ.** Fourteen articles state plainly that
the app has no corresponding feature.

This cost 48 of the 150 candidate topics the inventory produced, which is why
the planning stage re-derived the slate rather than using the inventory list.

### Cohort C — the app's data is a topic map, not evidence

The history app's content carries no citations and no external review, and its
banks contain 49 duplicate war names, 42 duplicate civilizations and about 95
duplicate people — several with conflicting dates ("Arab-Byzantine Wars" ends
1050 in one record and 1180 in another).

Every historical date, name, place, sequence and causal claim published was
verified against an external source and cited. No article describes the app's
content as sourced, cited, fact-checked or historian-approved, because none of
that is true.

## 7. Claim-safety review

The brain-training app's own source states its percentile and IQ-style range
rest on a *"PRELIMINARY INTERNAL SCALE, NOT A VALIDATED NORM"* with
`validated: false`, and that its Brain Performance Age bands are *"PRELIMINARY
AND UNVALIDATED"*. The site matches that standard.

Machine-enforced across all 100 Cohort B articles, negation-aware so that
honest refutations pass and assertions fail:

- no validated / clinical / official / standardised IQ claim
- no "raises your IQ or intelligence"
- no "prevents cognitive decline or dementia"
- no "treats or diagnoses" any condition
- no "biological brain age"
- no "scientifically proven to"
- no equivalence asserted with any commercial instrument

18 articles name a commercial instrument (WAIS, Raven's, Lumosity and others) as
subject matter or as an explicit contrast, which is the honest way to explain
what a supervised assessment is. **Zero claim equivalence with our app.**

Also enforced across all 250: no download, install, user or review counts; no
star ratings (neither app displays one); no awards; no search volumes.

"MBTI" and "Myers-Briggs" appear nowhere — the app's four-letter axis scheme is
associated with a trademarked commercial instrument, so the framework is
described without the trademark.

## 8. Historical sourcing and fact-checking

Every history article carries **4 or more** independently opened sources.
Writers consistently declined to publish what they could not verify. Examples:

- No global transatlantic slave-trade total, because the dataset that carries
  it renders client-side and could not be read. Attributed regional and period
  figures are given instead, with their denominators explained.
- No casualty figures for the Maji Maji war, because circulating numbers could
  not be traced to an openable study — and the article says so.
- Angkor Wat's builder is not named, because no citable source could be opened.
- "Let them eat cake" and Napoleon's height were dropped as myth examples for
  the same reason; four fully sourced myths were used instead.
- The Haudenosaunee Confederacy's founding date is not adjudicated; the
  Confederacy's own position is given.
- Chinese dynastic chronology is not adjudicated either: a state-sponsored
  project's dating is reported alongside a published scholarly critique.
- Where two national archives disagree on the date Partition was announced, the
  discrepancy is stated in the text rather than silently resolved.

Sensitive subjects — the Khmer Rouge, the Armenian genocide, the Herero and
Nama, the Atlantic slave trade, the Scramble for Africa, Partition — are
handled directly, with attributed ranges rather than single round numbers, and
with contested framings marked as contested.

## 9. Keyword research

Methodology in `docs/keyword-research-250.md`; machine-readable map in
`docs/data/keyword-candidates-250.csv` (8,610 rows) and
`docs/data/keyword-to-url-map-250.csv`.

| Source | Status on 2026-09-21 |
| --- | --- |
| Google Search Console | unavailable — no credentials, `gcloud` not installed |
| Google Ads Keyword Planner | unavailable — no authenticated account |
| Google Trends | unavailable — HTTP 429 |
| Semrush / Ahrefs / Moz | unavailable — no subscription |
| Google Autocomplete | **available** — 1,200 queries, 9,841 raw suggestions |
| Google Play listing text | **available** — first-party |
| GA4 export | unavailable |

**Keywords with verified search volume: zero.** Not few — zero, out of 8,610
candidates and 525 primary keywords. Autocomplete returns no volume component,
and the four sources that publish volume were each tested and each unavailable.
Every volume, difficulty and CPC field in this release is literally `unknown`.

**This means the brief's request for "at least 20 verified high-demand terms"
per featured cluster could not be met, and nothing was substituted for it.**
Labelling Autocomplete phrasing as demand would have been indistinguishable
from inventing a figure.

Of the 250 primary keywords, **53** are phrases observed verbatim in the
Autocomplete collection and **197** are editorial selections. The map marks
which is which and claims nothing further for either.

## 10. Cannibalisation and similarity

- 250 articles, **250 distinct primary keywords, zero collisions** — enforced
  at build time, case-insensitively, across all 525.
- Both cohort slates were checked against all 325 then-existing articles and
  **against each other**: zero slug collisions, zero keyword collisions, zero
  title pairs sharing 85% of their words (none even reached 60%).
- Post-write similarity audit over all 250 against all 525, using 5-word
  shingles and Jaccard: **no pair reaches 0.08**; the closest is 0.063. All
  openings distinct, all FAQ questions distinct, no title overlap.

Two duplicates were found and fixed during the run: one FAQ question reused
across two memory articles, and two FAQ collisions between logic articles.

## 11. Internal linking

Every article links its app page, its category, its topic hub, its hub's
cornerstone, and two or more related articles — all build-enforced.

The reciprocal-link pass (`scripts/link-expansion-250.mjs`) fixed the real
structural gap: new articles linked outward but nothing linked back.
**Articles with no inbound link: 122 → 0.** Five have exactly one.

Body prose was left exactly as authored; only `relatedArticles` was extended,
because automated anchor-text insertion is how over-linking happens.

## 12. Hub architecture

Ten topic hubs at `/blog/topics/<id>/`, each with standing editorial copy and a
"where to start" section, so none is a thin listing.

| Hub | Articles |
| --- | ---: |
| `mental-math` | 32 |
| `major-historical-events` | 27 |
| `civilizations-and-empires` | 26 |
| `world-history-timelines` | 23 |
| `history-learning-methods` | 22 |
| `memory-and-attention` | 22 |
| `brain-training-games` | 20 |
| `iq-tests-and-reasoning` | 20 |
| `logic-and-pattern-puzzles` | 18 |
| `historical-people` | 16 |

A build-time check fails the build if an active hub's cornerstone is not a
published article.

## 13. App promotion and CTAs

Every article renders two Play CTAs — mid-article and conclusion — from the
shared `PlayStoreLink` component. Verified in the export: every article page
carries correctly referrer-tagged install CTAs, and the analytics audit reports
**every** Play CTA on the site rendered by the tracked component.

`play_store_click` fires once per click with `button_location`, `link_url`,
`page_path`, `app_name`, `article_slug` and `link_text`. Install-referrer
attribution is a single percent-encoded `referrer` parameter carrying
`utm_source`, `utm_medium`, `utm_campaign` (app) and `utm_content` (article).
No personal data.

No article hand-writes a Play URL. Ownership of the promoted app is disclosed
in every article.

## 14. Comparisons

Five comparison articles, each carrying `disclaimer: "comparison"` and
`researchDate: 2026-09-22`. Every competitor claim is quoted from that
company's own official page, opened on the research date. Each states plainly
where our app is the wrong choice.

One finding worth keeping: `elevateapp.com` now 301-redirects to
`themindcompany.com/apps/elevate`.

## 15. Technical verification

Build: **525 published, 0 unpublished, 601 pages.**

| Check | Result |
| --- | --- |
| TypeScript typecheck | pass |
| ESLint | pass, no warnings |
| Preflight (all 525) | clean |
| Catalog audit | pass |
| Output audit | clean |
| Structured data | valid — 525 BlogPosting, 587 BreadcrumbList, CollectionPage on hubs |
| Analytics audit | clean — one GA4 tag, `G-JK8FPQB5L2` |
| Canonical audit | clean |
| URL surface audit | clean |
| Duplicate content | none |
| Back-navigation | clean |
| Sitemap / RSS / llms.txt | agree with every page canonical |
| Expansion audit | clean |
| Similarity audit | clean |
| `index.txt` files in export | **0** |
| `out/404/` | removed; `404.html` kept |
| `.txt` files in export | exactly 3 — `app-ads.txt`, `llms.txt`, `robots.txt` |
| Sitemap | 598 URLs (525 articles, 39 apps, 10 hubs, 14 category/static) |
| RSS | 525 items |

`robots.txt` is unchanged: no `Disallow` lines, sitemap declared, explicit
`Allow` for OAI-SearchBot, ChatGPT-User, Claude-SearchBot, Claude-User and
PerplexityBot, and deliberate silence on training-only crawlers.

### Defects found and fixed during the release

1. **`validate-structured-data.mjs` had no `/blog/topics/` branch**, so hub
   pages fell through to the article rule and were required to carry a
   `BlogPosting` they do not emit. Would have failed the moment hubs went live.
2. **RSS stamped a fixed 09:00 UTC**, which made same-day articles
   future-dated in a build running before 09:00 — read by the validator as
   draft leakage. `pubDate` is now clamped to build time.
3. **`check-sources.mjs` reported three dead citations that are alive.** Both
   `source.android.com` URLs bounce cookie-less clients through an OAuth
   redirect loop, exactly like `developer.android.com` already on its
   allowlist; `mlb.com` returns 200 to a browser and 406 to a script. All three
   were confirmed live by independent fetch and added to the allowlist with
   dated evidence.

## 16. Source-link verification

Of 519 cited URLs checked site-wide before the expansion's own sources were
added: 494 resolved directly, 22 are browser-only (each independently confirmed
live), **zero dead**.

Many authoritative institutions block automated access. Confirmed unreachable
during this work: APA (empty body), NCTM (HTTP 402), the Education Endowment
Foundation (403), NIA (405), UNESCO WHC (403), the British Museum (403), the
Met (429), the Library of Congress (403), the Smithsonian (403), PubMed
(cookie wall), and several publishers. In every case writers substituted a
verified equivalent — IES/WWC practice guides, NRICH, MacTutor, Science Museum
Group, Perseus, Crossref-verified DOIs, PMC open access — or dropped the claim.

## 17. Accessibility and performance

No article body contains an image, so there is no missing `alt`, `width` or
`height` anywhere in the 250 — the output audit enforces this. Every figure
that matters is described in text, which is also what makes the content legible
to retrieval crawlers.

Heading hierarchy is one `<h1>` per page with logical `<h2>`/`<h3>` beneath,
verified in the export. Tables scroll inside their own container. No article
introduces a client component; all 601 pages remain statically generated. The
back-navigation audit found no zero-delay refresh and no history-pushing
redirect.

## 18. Facts requiring owner review

### Priority — outside the website

1. **The history app's `settings/data-safety.tsx` states "This release does not
   offer any in-app purchases or subscriptions"** while the app ships a full
   Premium system with monthly, yearly and lifetime purchases. This is a Google
   Play Data Safety accuracy problem. **Fix first.**
2. **Four game modes advertise XP they never award** (Rule as a Leader,
   Invention Impact Chains, History Iceberg, Live a Day); seven others show XP
   that does not match the code.
3. **`app/campaign/play.tsx` credits a mission on mount**, so campaign progress
   advances when the preview screen opens.
4. **`app/settings/about.tsx` says "browse 800+ events"** against a verified
   5,153 — the app understates itself more than sixfold.
5. **Both app projects carry unreleased names in `app.json`** that differ from
   their live store titles.

### Content and data

6. Duplicate records with conflicting dates — 49 wars, 42 civilizations, ~95
   people.
7. Era mis-tagging: seven events dated 1402–1471 tagged `late_antique`
   (including the Fall of Constantinople); Goguryeo, Baekje and Silla tagged
   `ancient`; the founding of Rome and Caral contradict the app's own bands.
8. `uncertaintyLevel` labels the *subject* rather than the *claim*, so
   "Churchill led Britain through WWII" is marked `debated`.
9. 776 superlative sentences in the events bank and 447 in the glossary,
   including "the world's first true city" with no stated criterion.
10. The Crossword is not an interlocking grid, and Map Challenge is text-only
    multiple choice — both are described accurately on the site, and neither
    matches what its name implies. Two crossword clues do not match their
    answers.
11. "Butterfly Effect Score" implies a measurement the code does not produce.
12. Only 5 of 189 lessons populate `commonMisconception` — the cheapest
    quality win available.
13. The app's `PEOPLE` bank contains **zero** Oceania entries, which is why
    Oceania is the thinnest region in Cohort C.
14. 920 of 1,810 iceberg entries carry a templated prefix that de-capitalises
    proper nouns ("king Yasovarman", "robert McClure").

### Rights

15. **All 107 history-app illustrations and 5 launch icons are AI-generated
    (Google Gemini).** Ownership is asserted only in a code comment. None is
    used on the website; confirm rights before any public use.
16. **Two CC BY-SA image credits carry no attribution** (Hagia Sophia, Machu
    Picchu), which the licence requires.
17. **Originality of the ~22,000 lines of item content** rests solely on
    in-code assertions. No article claims "every question is original".

### Pre-existing website items, not introduced here

18. **27 existing articles use two retired Play titles**, and 12 soccer
    articles assert a 38-game season the live listing no longer supports.
19. **`content/blog/rugby-draft-and-squad-building.md`** asserts a guarantee
    the catalog does not support.
20. `docs/published-app-inventory.md` is stale (29 apps, dated 2026-09-04).
21. Two external domains to avoid citing: `sarnathmuseumasi.org` now serves
    casino content, and `bnportugal.gov.pt` returned a page with injected spam.
    Neither is cited anywhere on this site.

## 19. Manual Search Console actions

Nothing in this release requires the Indexing API, and none was used.

1. Submit `https://reigncreativellc.com/sitemap.xml` for a recrawl.
2. Watch Coverage over the next few weeks. The previous release saw Google
   index 59 of 275 pages before the next batch landed; 525 is a large surface
   and discovery will be gradual.
3. **Confirm the GA4 "browser history events" enhanced-measurement toggle is
   still OFF.** This site sends `page_view` manually; with the toggle on,
   navigations double-count. This is an owner action in the GA console.
4. Consider enabling **Enforce HTTPS** in GitHub Pages — it is currently OFF,
   so `http://` does not redirect and no HSTS is sent. Owner action.

## 20. Known limitations

1. **No search-volume data exists in this release, anywhere.** Topic selection
   rests on app-content grounding and observed phrasing, not on demand
   measurement.
2. **The editorial policy at `/editorial-policy/` states that every article is
   read by a person before publication.** These 250 were drafted by AI agents
   with automated source verification, claim auditing and similarity checking,
   but no human read all 250 before release. The owner chose to publish without
   amending the policy; **that statement is currently inaccurate for this
   batch** and is recorded here as the known gap it is.
3. **The session's WebSearch budget was exhausted partway through.** Later
   batches discovered sources through direct URL probing and the Crossref,
   OpenAlex, NCBI and DOAJ APIs instead. They handled it correctly — dropping
   claims rather than citing unopened pages — but some ideal sources were lost.
4. **Fourteen Cohort C citations are paywalled DOIs**, verified through
   Crossref metadata rather than read in full. Those citations support
   bibliographic and framing claims only.
5. **The Cold War has no dedicated article.** The events hub had no free slot
   that did not cost an under-covered region its only article. Declared rather
   than padded; recommended as the first follow-up, with 1989/Berlin Wall.
6. Environment/disaster history and religion-as-a-subject have no dedicated
   articles despite strong app data. Industrialisation and art/culture have one
   each.
7. **One app listing could not be verified** — *BIG JACKPOT Casino Slots Games*
   is owner-reported as Production but absent from the developer page and every
   search and package probe. Status is UNVERIFIED, not unpublished. No article
   was written for it.
8. Deploy time scales with page count; at 601 pages a GitHub Pages build takes
   well over ten minutes.

## 21. What this release does not promise

No ranking, indexing, traffic, AI citation, app recommendation, click or
install outcome is predicted or guaranteed anywhere in this work. What was
built is a large, original, source-grounded body of content that is technically
sound and honest about its limits. How search and AI systems treat it is not
within anyone's control here.
