# Keyword research — the next 100 articles

Prepared 2026-09-15 · Agent A5 · covers 100 proposed articles, to sit alongside the 175 already published.

Machine-readable companion: the plan these tables are generated from is a 100-entry JSON array
validated against the live catalogue and the existing corpus. Every claim in this document comes
from that array or from the raw autocomplete capture behind it.

---

## Limitations — read this before using any number in this document

**There is no search volume data in this document, and no keyword difficulty score, because we have none.**

- There is **no authenticated Google Search Console** property available to this work.
- There is **no Google Keyword Planner** access (it requires an active Google Ads account).
- There is **no Semrush, Ahrefs, Moz, Similarweb or any other third-party keyword tool**.

That means every figure you might expect in a keyword-research document — monthly searches, CPC,
competition score, difficulty 0–100 — is simply absent. It has not been estimated, modelled,
inferred from a proxy, or presented as a range. Estimating it would be inventing it.

### What we actually measured

One thing, and it is measured precisely: **Google autocomplete suggestions**, pulled live on
**2026-09-15** from `https://suggestqueries.google.com/complete/search` with
`client=firefox&hl=en&gl=us`. 373 seed queries were issued and every one returned a
response; **50 of them returned zero suggestions**, which is itself recorded as evidence
(an empty autocomplete response is a real, reportable negative signal). 2794 suggestion
strings were captured in total.

**Autocomplete is not search volume.** It tells you Google will complete a prefix, that the
completion is common enough to be offered, and roughly what shape the surrounding query cluster
takes. It does not tell you how many people search it, whether that number is rising, or how hard
it would be to rank. Anyone reading a long autocomplete list as "high volume" is reading it wrong.

### The other evidence types used, and what each is worth

| Signal | What it is | What it cannot tell you |
|---|---|---|
| Google autocomplete | Live suggestion list for a prefix, dated 2026-09-15 | Volume, trend, difficulty |
| Autocomplete cluster shape | Whether suggestions are questions, comparisons, PDFs, named products | Volume |
| Empty autocomplete response | The exact phrase is not offered as a completion | Whether anyone searches it |
| Observed SERP composition | What *kind* of result the suggestions point at (academic papers, news, PDFs, named apps) | Ranking difficulty |
| Google Play listing language | Feature names and FAQ wording taken from our own catalogue | Anything about demand |
| On-site coverage gap | Which of the 175 existing articles do or do not target a query | Anything about demand |

### demandTier is a judgement label, not a measurement

`unverified-high` / `unverified-medium` / `unverified-low` describe **how strong the observed
autocomplete evidence for the exact phrase was**, nothing more. The `unverified-` prefix is not
decoration: it is the honest statement that no tier here is backed by a measured number.

- `unverified-high` — the exact phrase returned a full, on-topic suggestion cluster.
- `unverified-medium` — the exact phrase returned a thin cluster, or the evidence comes mainly from an adjacent seed.
- `unverified-low` — **the exact phrase returned no suggestions at all.** 7 articles are in this tier. They are proposed on intent quality and app relevance, and each one says so in its own `demandEvidence` field.

Writers must not upgrade any of these labels, and must not introduce a volume figure into an
article. If a figure ever becomes genuinely available from Search Console, label it as such.

---

## What changed mid-research (recorded so the numbers make sense)

The app catalogue grew from **29 to 39 apps** while this research was in progress. The plan was
re-cut against the 39-app catalogue read directly from `src/data/apps/catalog/*.ts`, not from the
briefing's stale 29-app list.

**52 of the 100 articles target the nine new apps that have zero existing article coverage.**
Those articles cannot cannibalize anything, because nothing on the site currently targets those apps.

`anime-casino-slots` was **excluded as an article target by a lead decision** — it is a
social-casino/slots title and the lead ruled out building content around gambling mechanics. This
is a deliberate content-risk decision, not an oversight. It is the only catalogue app with zero
coverage that this plan does not address.

### A finding the writers need before they draft a CTA

**12 of the 39 catalogue apps have no `playStoreUrl` in the catalogue**, which under the project's
own inclusion test (`docs/published-app-inventory.md`) means no verified public Google Play listing.
Seven of them are article targets in this plan.

- **57 articles** can use a real Google Play CTA. The exact URL is in the plan's `playCta` field.
- **43 articles** target an app with no public listing URL. Their `playCta` is the on-site app page (`/apps/<slug>/`) instead.

Do not invent a Play Store URL for the second group. If a listing goes live later, the CTA can be
swapped; until then the on-site page is the only honest destination.

Apps in this plan with no public Play listing URL: learn-marathi, learn-shanghainese, mma-boxing-fight-draft, regal-tower-defense, rugby-draft-pro-league, space-galaxy-attack-hardcore, tennis-career-sim.

---

## Distribution tables

### By category

| Category | New articles | Existing (175) | After |
|---|---|---|---|
| language-learning | 34 | 36 | 70 |
| sports-gm | 25 | 64 | 89 |
| action-arcade | 12 | 15 | 27 |
| education-brain | 10 | 14 | 24 |
| video-utility | 8 | 12 | 20 |
| health-nutrition | 7 | 23 | 30 |
| anime-creative | 4 | 11 | 15 |

The existing corpus is heavily weighted to `sports-gm` (64 of 175, 36.6%). This batch deliberately
adds the **fewest** new sports articles relative to the existing base while adding the most
language-learning coverage, because two entire language courses have no page at all.

### By content type

| Content type | Count | Share |
|---|---|---|
| reference | 13 | 13% |
| beginner | 12 | 12% |
| faq | 12 | 12% |
| comparison | 9 | 9% |
| how-to | 9 | 9% |
| listicle | 9 | 9% |
| strategy | 9 | 9% |
| best-for | 6 | 6% |
| troubleshooting | 5 | 5% |
| case-study | 4 | 4% |
| developer-insight | 4 | 4% |
| feature-explainer | 4 | 4% |
| workflow | 4 | 4% |

All 13 content types are used. The largest single type is **reference at 13%** — no template dominates.

### By target app

| App | New articles | Existing coverage | Note |
|---|---|---|---|
| learn-marathi | 8 | 0 | **new app — zero prior coverage** |
| easy-recipes-meal-planner | 7 | 0 | **new app — zero prior coverage** |
| learn-shanghainese | 7 | 0 | **new app — zero prior coverage** |
| mma-boxing-fight-draft | 7 | 3 |  |
| tennis-career-sim | 7 | 0 | **new app — zero prior coverage** |
| world-history-timeline-sim | 7 | 6 |  |
| golf-career-simulator | 6 | 6 |  |
| regal-tower-defense | 6 | 0 | **new app — zero prior coverage** |
| tcg-card-grading-scanner | 6 | 0 | **new app — zero prior coverage** |
| learn-cambodian-khmer | 5 | 5 |  |
| learn-lao | 5 | 4 |  |
| learn-russian | 5 | 8 |  |
| rugby-draft-pro-league | 5 | 0 | **new app — zero prior coverage** |
| learn-malay | 4 | 6 |  |
| jellyfish-arena-survivor-io | 3 | 0 | **new app — zero prior coverage** |
| mental-math-memory-games | 3 | 10 |  |
| space-galaxy-attack-hardcore | 3 | 0 | **new app — zero prior coverage** |
| anime-coloring-book | 2 | 9 |  |
| anime-trivia-word-games | 2 | 9 |  |
| regal-video-player | 2 | 13 |  |

### By intent, demand tier and disclaimer

| Field | Values |
|---|---|
| intent | informational = 90, commercial = 10 |
| demandTier | unverified-high = 69, unverified-medium = 24, unverified-low = 7 |
| disclaimer | none = 53, language = 32, comparison = 8, health = 7 |

### Title-pattern compliance

The existing corpus has "X Explained" in ~29% of titles and ~31% of metaTitles, which the
consolidation audit flagged as approaching saturation.

| Check | Result |
|---|---|
| "Explained" in a new title | **0 of 100** |
| "Explained" in a new metaTitle | **0 of 100** |
| Duplicate titles / metaTitles / descriptions in the batch | 0 |
| Any two titles across all 275 sharing >= 85% of their words | **0** |
| metaTitle > 60 chars | 0 |
| description outside 70-160 chars | 0 |

Writers must also **not** use the H2 "Where our app fits" / "Where our apps fit" / "Where our games
fit". That heading already appears in 58 of 175 existing articles. Vary the wording.

---

## Internal linking

Every one of the 100 articles names an `inboundLinkFrom`: an existing published article (or another
article in this batch) that must gain an in-body link to the new page. This is a hard requirement,
not a suggestion — the consolidation audit found that **all five** existing `disclaimer: comparison`
articles are orphans with zero inbound links, because the publishing process reliably produces
outbound links and forgets inbound ones.

| Check | Result |
|---|---|
| Distinct inbound sources used | **71** |
| Maximum new articles pointing at any one source | **4** |
| Of the 13 known orphans, how many gain a link from this batch | **13 of 13** |

### The 13 known orphans, and which new articles link to them

| Orphaned existing article | New articles that must link to it |
|---|---|
| `language-learning-apps-compared` | `learn-marathi-beginners-guide`, `learn-shanghainese-beginners-guide`, `building-a-lao-course-from-scratch`, `should-i-learn-malay-or-indonesian` |
| `is-vietnamese-hard-to-learn` | `is-marathi-hard-to-learn`, `is-lao-hard-to-learn`, `is-khmer-hard-to-learn`, `is-malay-easy-to-learn` |
| `android-video-players-compared` | `how-to-play-mkv-files-on-android`, `subtitles-not-working-on-android` |
| `how-to-choose-a-sports-career-sim` | `tennis-career-sim-guide`, `tennis-ranking-decay-and-scheduling`, `pressure-and-nerves-in-golf-sims` |
| `depth-charts-explained` | `rugby-positions-and-numbers`, `rugby-forwards-and-backs` |
| `how-the-offside-rule-works` | `rugby-union-vs-rugby-league` |
| `expansion-drafts-explained` | `rugby-draft-and-squad-building` |
| `best-offline-sports-games-android` | `rugby-draft-and-squad-building`, `offline-tower-defence-on-android` |
| `mma-weight-classes-explained` | `southpaw-vs-orthodox`, `striking-vs-grappling-in-mma`, `how-mma-judging-criteria-work`, `how-boxing-records-are-written`, `how-fight-cards-are-built`, `mma-fantasy-draft-strategy` |
| `frame-rate-and-resolution-explained` | `vertical-shooter-games-on-android` |
| `protein-tracking-apps-compared` | `how-to-meal-plan-for-the-week` |
| `added-sugars-vs-total-sugars` | `recipe-nutrition-figures-and-why-they-move`, `batch-cooking-for-the-week` |
| `low-carb-tracking-apps-compared` | `recipe-nutrition-figures-and-why-they-move` |

---

## Comparison articles and named competitors

A comparison was only proposed where a genuine comparison intent is attested. **9 articles are
`contentType: comparison`**, but most of those compare *concepts* — one language against another,
one fighting stance against another, one card printing against another — and involve no competitor
product at all.

**4 articles name real third-party products** and therefore carry verification obligations:

#### `should-i-learn-malay-or-indonesian`
Primary keyword: "should i learn malay or indonesian" · disclaimer: `comparison`

| Competitor | Official source the writer must verify against | Note |
|---|---|---|
| Duolingo | https://www.duolingo.com/courses | Verify the current published course list from English for whether Malay and/or Indonesian are offered. Do not assume - the list changes. No logo use, no implied affiliation, no claim that our course is better. |

#### `choosing-a-history-app-for-students`
Primary keyword: "best history app for students" · disclaimer: `comparison`

| Competitor | Official source the writer must verify against | Note |
|---|---|---|
| Khan Academy | https://www.khanacademy.org/humanities | Verify the current world-history course coverage and that it is free. No logo use, no implied affiliation. |
| Timeline Eons | https://play.google.com/store/apps/details?id=com.timelineeons.app | Verify the live Google Play listing, its stated feature set and its pricing model before describing it. If the listing does not resolve, drop the comparison rather than describing it from memory. |

#### `do-brain-training-apps-work`
Primary keyword: "do brain training apps work" · disclaimer: `comparison`

| Competitor | Official source the writer must verify against | Note |
|---|---|---|
| Lumosity (Lumos Labs) | https://www.lumosity.com/en/ | Also check the US Federal Trade Commission press release on the 2016 Lumos Labs settlement at ftc.gov before describing any claim. Quote only what the primary sources say. No logo use, no implied affiliation. |
| Elevate | https://elevateapp.com/ | Verify the current feature set and pricing from the official site before describing it. |
| Peak | https://www.peak.net/ | Verify the official site is live and describe only what it states. If it does not resolve, drop it from the comparison. |

#### `card-grading-costs-and-tiers`
Primary keyword: "card grading cost" · disclaimer: `comparison`

| Competitor | Official source the writer must verify against | Note |
|---|---|---|
| PSA (Professional Sports Authenticator) | https://www.psacard.com/services | Verify current service levels, declared-value bands and fees from the official page on the day of writing. Fees change. No logo use, no implied affiliation, no claim of accreditation. |
| Beckett Grading Services | https://www.beckett.com/grading | Verify the current published service levels and pricing from the official page. If the page does not resolve, omit rather than describing from memory. |
| CGC Cards | https://www.cgccards.com/trading-cards/services-pricing/ | Verify the current published pricing tiers. No logo use, no implied affiliation. |


### Rules that apply to every competitor mention

- **Do not use competitor logos, icons, screenshots or brand marks.** Name in plain text only.
- **Do not imply affiliation, partnership, endorsement or accreditation.**
- **Do not predetermine that Reign Creative wins.** Several of these articles should conclude that a
  competitor, a free resource, or a book is the better answer for some readers — say so.
- Every comparison must be verified against the **competitor's own site, docs or store listing** on
  the day of writing, and that URL goes in `sources[]`. If a source page does not resolve, **drop
  the competitor from the article** rather than describing it from memory.
- `disclaimer: "comparison"` **requires a `researchDate`** in frontmatter or the build fails.
  8 articles in this plan carry it: `should-i-learn-malay-or-indonesian`, `choosing-a-history-app-for-students`, `do-brain-training-apps-work`, `offline-tower-defence-on-android`, `vertical-shooter-games-on-android`, `io-games-without-a-connection`, `is-my-card-worth-grading`, `card-grading-costs-and-tiers`.

---

## The 100 articles, with their evidence


### Block 1 — Language courses — the two brand-new ones (Marathi, Shanghainese) plus the two thinnest existing ones (Lao, Khmer)

#### Learn Marathi for Beginners: Where to Start and What to Skip

`learn-marathi-beginners-guide` · `language-learning` · `beginner` · `informational` · app: `learn-marathi` · disclaimer: `language`

- **Primary keyword:** "learn marathi for beginners"
- **Demand tier:** `unverified-high` — *a judgement label about evidence strength, not a measurement*
- **Evidence observed:** Google autocomplete, captured 2026-09-15 via suggestqueries.google.com (client=firefox, hl=en, gl=us). "learn marathi" returned "learn marathi online", "learn marathi in 30 days", "learn marathi app", "learn marathi free", "learn marathi online free" (10 suggestions). No search volume or difficulty figure is available: this project has no authenticated Search Console, no Keyword Planner and no third-party keyword tool.
- **Why it is a separate page:** The site has eight per-language beginner guides and none for Marathi; this app has zero article coverage of any kind. (closest existing article: `learn-malay-beginners-guide`, similarity **0.63**)
- **First-party angle (only we can write this):** How the Marathi course sequences Devanagari against spoken practice, and why romanisation stays visible on every line rather than being dropped after the alphabet unit.
- **Inbound link required from:** `language-learning-apps-compared`
- **Outbound internal links:** `marathi-alphabet-and-devanagari`, `marathi-phrases-with-meaning`, `language-learning-apps-compared`, `is-marathi-hard-to-learn`
- **CTA:** **No public Play listing for this app.** Link the on-site app page instead: https://reigncreativellc.com/apps/learn-marathi/
- **Supporting terms:** learn marathi; learn marathi app; learn marathi online; marathi for beginners; how to learn marathi; learn marathi free
- **Long-tail:** how do i start learning marathi; best way to learn marathi from scratch; learn marathi online free; do i need devanagari to learn marathi; marathi lessons for beginners
- **Questions to answer directly:** How do you start learning Marathi? / Do you need to learn Devanagari first? / How many speakers does Marathi have? / Can you learn Marathi without a teacher?

#### The Marathi Alphabet: Reading Devanagari From Scratch

`marathi-alphabet-and-devanagari` · `language-learning` · `beginner` · `informational` · app: `learn-marathi` · disclaimer: `language`

- **Primary keyword:** "marathi alphabet"
- **Demand tier:** `unverified-high` — *a judgement label about evidence strength, not a measurement*
- **Evidence observed:** Google autocomplete, captured 2026-09-15 via suggestqueries.google.com (client=firefox, hl=en, gl=us). "marathi alphabet" returned "marathi alphabet chart", "marathi alphabets with pictures pdf", "marathi alphabet in english", "marathi alphabet chart in english", "marathi alphabet song" (10 suggestions); "devanagari script" returned a further 10 including "devanagari script languages" and "devanagari script numbers". No search volume or difficulty figure is available: this project has no authenticated Search Console, no Keyword Planner and no third-party keyword tool.
- **Why it is a separate page:** No article on the site covers Devanagari at all; the existing script articles cover Thai, Khmer, Lao, Cyrillic and Vietnamese only. (closest existing article: `vietnamese-alphabet-explained`, similarity **0.43**)
- **First-party angle (only we can write this):** Why our Marathi alphabet unit teaches the letters Marathi adds beyond the Hindi set in their own lesson rather than mixed into the main chart.
- **Inbound link required from:** `learn-marathi-beginners-guide`
- **Outbound internal links:** `learn-marathi-beginners-guide`, `marathi-vs-hindi-differences`, `marathi-numbers-and-counting`, `is-marathi-hard-to-learn`
- **CTA:** **No public Play listing for this app.** Link the on-site app page instead: https://reigncreativellc.com/apps/learn-marathi/
- **Supporting terms:** marathi alphabet chart; marathi alphabet in english; devanagari script; marathi varnamala; marathi letters; marathi alphabet with pronunciation
- **Long-tail:** how many letters are in the marathi alphabet; how to read devanagari for marathi; marathi alphabet chart in english; difference between marathi and hindi letters; how long to learn the marathi alphabet
- **Questions to answer directly:** How many letters does the Marathi alphabet have? / Is Marathi written in the same script as Hindi? / What are matras in Devanagari? / How long does the Marathi alphabet take to learn?

#### Marathi vs Hindi: Same Script, Different Language

`marathi-vs-hindi-differences` · `language-learning` · `comparison` · `informational` · app: `learn-marathi` · disclaimer: `language`

- **Primary keyword:** "marathi vs hindi"
- **Demand tier:** `unverified-high` — *a judgement label about evidence strength, not a measurement*
- **Evidence observed:** Google autocomplete, captured 2026-09-15 via suggestqueries.google.com (client=firefox, hl=en, gl=us). "marathi vs hindi" returned "marathi vs hindi script", "marathi vs hindi alphabet", "marathi vs hindi language", "marathi vs hindi varnamala", "marathi vs hindi reddit" (10 suggestions); "is marathi hard to learn" separately returned "is marathi hard to learn for hindi speakers". No search volume or difficulty figure is available: this project has no authenticated Search Console, no Keyword Planner and no third-party keyword tool.
- **Why it is a separate page:** The site has comparison pages for Cantonese/Mandarin, Malay/Indonesian and Lao/Thai but nothing on the Indic languages, and no Marathi page exists. (closest existing article: `language-learning-apps-compared`, similarity **0.05**)
- **First-party angle (only we can write this):** The vocabulary decisions we made building a Marathi course for learners who may already know some Hindi, and where that prior knowledge actively misleads them.
- **Inbound link required from:** `cantonese-vs-mandarin-differences`
- **Outbound internal links:** `marathi-alphabet-and-devanagari`, `learn-marathi-beginners-guide`, `is-marathi-hard-to-learn`, `cantonese-vs-mandarin-differences`
- **CTA:** **No public Play listing for this app.** Link the on-site app page instead: https://reigncreativellc.com/apps/learn-marathi/
- **Supporting terms:** marathi vs hindi script; marathi vs hindi alphabet; marathi vs hindi language; is marathi similar to hindi; marathi hindi mutual intelligibility; marathi vs hindi grammar
- **Long-tail:** can hindi speakers understand marathi; how different is marathi from hindi; is marathi easier if you know hindi; marathi and hindi alphabet differences; which is harder marathi or hindi
- **Questions to answer directly:** Can Hindi speakers understand Marathi? / Do Marathi and Hindi use the same alphabet? / How different is Marathi grammar from Hindi? / Is Marathi easier to learn if you already speak Hindi?

#### Is Marathi Hard to Learn? A Straight Answer

`is-marathi-hard-to-learn` · `language-learning` · `faq` · `informational` · app: `learn-marathi` · disclaimer: `language`

- **Primary keyword:** "is marathi hard to learn"
- **Demand tier:** `unverified-high` — *a judgement label about evidence strength, not a measurement*
- **Evidence observed:** Google autocomplete, captured 2026-09-15 via suggestqueries.google.com (client=firefox, hl=en, gl=us). "is marathi hard to learn" returned "is marathi hard to learn for english speakers", "is marathi hard to learn for hindi speakers", "is marathi difficult to learn", "is marathi easy to learn", "is marathi language easy to learn" (7 suggestions). No search volume or difficulty figure is available: this project has no authenticated Search Console, no Keyword Planner and no third-party keyword tool.
- **Why it is a separate page:** We answer this difficulty question for Thai and Vietnamese only; Marathi has no page of any kind on the site. (closest existing article: `is-vietnamese-hard-to-learn`, similarity **0.62**)
- **First-party angle (only we can write this):** Where learners slow down in our Marathi course - the gender and verb-agreement lessons - and the unit split we made because of it.
- **Inbound link required from:** `is-vietnamese-hard-to-learn`
- **Outbound internal links:** `learn-marathi-beginners-guide`, `marathi-vs-hindi-differences`, `is-vietnamese-hard-to-learn`, `marathi-study-plan-first-month`
- **CTA:** **No public Play listing for this app.** Link the on-site app page instead: https://reigncreativellc.com/apps/learn-marathi/
- **Supporting terms:** is marathi difficult to learn; is marathi easy to learn; how long to learn marathi; marathi difficulty for english speakers; marathi learning curve; is marathi hard for hindi speakers
- **Long-tail:** is marathi hard to learn for english speakers; is marathi hard to learn for hindi speakers; how many days to learn marathi; what is the hardest part of marathi; is marathi worth learning
- **Questions to answer directly:** Is Marathi a hard language to learn? / How long does it take to learn Marathi? / Is Marathi harder than Hindi? / What is the most difficult part of Marathi?

#### Marathi Numbers 1 to 100: The Part Nobody Warns You About

`marathi-numbers-and-counting` · `language-learning` · `reference` · `informational` · app: `learn-marathi` · disclaimer: `language`

- **Primary keyword:** "marathi numbers 1 to 100"
- **Demand tier:** `unverified-high` — *a judgement label about evidence strength, not a measurement*
- **Evidence observed:** Google autocomplete, captured 2026-09-15 via suggestqueries.google.com (client=firefox, hl=en, gl=us). "marathi numbers" returned "marathi numbers 1 to 100", "marathi numbers 1-10", "marathi numbers 1 to 10", "marathi numbers in words 1 to 100", "marathi numbers 1 to 20" (10 suggestions). No search volume or difficulty figure is available: this project has no authenticated Search Console, no Keyword Planner and no third-party keyword tool.
- **Why it is a separate page:** No number-system article exists for any Indic language on the site, and Marathi has no coverage at all. (closest existing article: `how-historians-date-events`, similarity **0.04**)
- **First-party angle (only we can write this):** Why our Marathi numbers unit drills in blocks of ten rather than as a single list, a change forced by how badly a single long lesson performed.
- **Inbound link required from:** `learn-marathi-beginners-guide`
- **Outbound internal links:** `marathi-alphabet-and-devanagari`, `learn-marathi-beginners-guide`, `marathi-phrases-with-meaning`, `marathi-verb-basics`
- **CTA:** **No public Play listing for this app.** Link the on-site app page instead: https://reigncreativellc.com/apps/learn-marathi/
- **Supporting terms:** marathi numbers; marathi numbers 1-10; marathi numbers in words; marathi counting; marathi numerals; marathi numbers pronunciation
- **Long-tail:** how to count in marathi 1 to 100; why are marathi numbers irregular; marathi numbers in words 1 to 100; marathi numbers 1 to 20; how to say prices in marathi
- **Questions to answer directly:** How do you count to a hundred in Marathi? / Why are Marathi numbers irregular? / Does Marathi use Devanagari numerals? / How do you say a price in Marathi?

#### Marathi Phrases Worth Learning First, With What They Literally Mean

`marathi-phrases-with-meaning` · `language-learning` · `listicle` · `informational` · app: `learn-marathi` · disclaimer: `language`

- **Primary keyword:** "marathi phrases with meaning"
- **Demand tier:** `unverified-medium` — *a judgement label about evidence strength, not a measurement*
- **Evidence observed:** Google autocomplete, captured 2026-09-15 via suggestqueries.google.com (client=firefox, hl=en, gl=us). "marathi phrases" returned "marathi phrases and idioms", "marathi phrases with meaning", "marathi phrases to learn", "marathi phrases in english" (8 suggestions). No search volume or difficulty figure is available: this project has no authenticated Search Console, no Keyword Planner and no third-party keyword tool.
- **Why it is a separate page:** No Marathi content exists on the site; the closest pages are travel phrase lists for unrelated languages. (closest existing article: `language-learning-plateau`, similarity **0.04**)
- **First-party angle (only we can write this):** The situation groups our Marathi vocabulary units are built around, and the one we cut because it never matched how the app was actually being used.
- **Inbound link required from:** `learn-marathi-beginners-guide`
- **Outbound internal links:** `learn-marathi-beginners-guide`, `marathi-numbers-and-counting`, `marathi-verb-basics`, `marathi-alphabet-and-devanagari`
- **CTA:** **No public Play listing for this app.** Link the on-site app page instead: https://reigncreativellc.com/apps/learn-marathi/
- **Supporting terms:** marathi phrases; marathi phrases to learn; marathi phrases in english; basic marathi phrases; marathi greetings; common marathi phrases
- **Long-tail:** what marathi phrases should i learn first; how to say hello in marathi; how to say thank you in marathi; marathi phrases for travel in pune; useful marathi phrases for beginners
- **Questions to answer directly:** Which Marathi phrases should a beginner learn first? / How do you say hello in Marathi? / How do you say thank you in Marathi? / Are Marathi and Hindi greetings the same?

#### Marathi Verbs: Building Your First Sentences

`marathi-verb-basics` · `language-learning` · `how-to` · `informational` · app: `learn-marathi` · disclaimer: `language`

- **Primary keyword:** "marathi verbs"
- **Demand tier:** `unverified-high` — *a judgement label about evidence strength, not a measurement*
- **Evidence observed:** Google autocomplete, captured 2026-09-15 via suggestqueries.google.com (client=firefox, hl=en, gl=us). "marathi verbs" returned "marathi verbs list pdf", "marathi verbs list", "marathi verbs worksheet", "marathi verbs pdf" (10 suggestions); "marathi grammar" returned a further 10 including "marathi grammar rules" and "marathi grammar test". Note the SERP-composition signal: suggestions skew heavily toward PDFs and worksheets, which points at a gap for a readable web explainer. No search volume or difficulty figure is available: this project has no authenticated Search Console, no Keyword Planner and no third-party keyword tool.
- **Why it is a separate page:** Nothing on the site covers Indic verb morphology, and Marathi has no existing page. (closest existing article: `italian-verb-conjugation-basics`, similarity **0.1**)
- **First-party angle (only we can write this):** Why our Marathi grammar lessons introduce verb agreement through paired masculine and feminine example sentences instead of a conjugation table.
- **Inbound link required from:** `learn-marathi-beginners-guide`
- **Outbound internal links:** `learn-marathi-beginners-guide`, `marathi-phrases-with-meaning`, `is-marathi-hard-to-learn`, `marathi-vs-hindi-differences`
- **CTA:** **No public Play listing for this app.** Link the on-site app page instead: https://reigncreativellc.com/apps/learn-marathi/
- **Supporting terms:** marathi verbs list; marathi verb conjugation; marathi grammar; marathi sentence structure; marathi tenses; marathi verb agreement
- **Long-tail:** how do marathi verbs work; marathi verb conjugation for beginners; how to form a sentence in marathi; marathi present tense examples; does marathi have gender agreement
- **Questions to answer directly:** How do Marathi verbs conjugate? / Does Marathi mark gender on verbs? / How do you build a simple Marathi sentence? / What tenses does Marathi use?

#### How Long Does It Take to Learn Marathi? Planning a First Month

`marathi-study-plan-first-month` · `language-learning` · `workflow` · `informational` · app: `learn-marathi` · disclaimer: `language`

- **Primary keyword:** "how long to learn marathi"
- **Demand tier:** `unverified-high` — *a judgement label about evidence strength, not a measurement*
- **Evidence observed:** Google autocomplete, captured 2026-09-15 via suggestqueries.google.com (client=firefox, hl=en, gl=us). "how long to learn marathi" returned "how many days to learn marathi", "how many hours to learn marathi", "how long does it take to learn marathi for hindi speakers" (7 suggestions); "learn marathi" separately returned "learn marathi in 30 days". No search volume or difficulty figure is available: this project has no authenticated Search Console, no Keyword Planner and no third-party keyword tool.
- **Why it is a separate page:** We publish timeline articles for Italian and Russian only; this is a different language and pairs the timeline with an actual weekly plan. (closest existing article: `how-long-does-it-take-to-learn-russian`, similarity **0.55**)
- **First-party angle (only we can write this):** The session length our Marathi lessons are built to, why we capped units at that length, and what that implies for a 30-day target.
- **Inbound link required from:** `building-a-daily-practice-habit`
- **Outbound internal links:** `learn-marathi-beginners-guide`, `is-marathi-hard-to-learn`, `building-a-daily-practice-habit`, `marathi-alphabet-and-devanagari`
- **CTA:** **No public Play listing for this app.** Link the on-site app page instead: https://reigncreativellc.com/apps/learn-marathi/
- **Supporting terms:** how many days to learn marathi; how long does it take to learn marathi; marathi study plan; learn marathi in 30 days; marathi daily practice; how many hours to learn marathi
- **Long-tail:** how long does it take to learn marathi for hindi speakers; can you learn marathi in 30 days; how many hours a day to learn marathi; realistic marathi learning timeline; marathi study schedule for beginners
- **Questions to answer directly:** How long does it take to learn Marathi? / Can you learn Marathi in 30 days? / How much daily practice does Marathi need? / What should the first month of Marathi cover?

#### Learn Shanghainese for Beginners: A Route Into Wu Chinese

`learn-shanghainese-beginners-guide` · `language-learning` · `beginner` · `informational` · app: `learn-shanghainese` · disclaimer: `language`

- **Primary keyword:** "learn shanghainese for beginners"
- **Demand tier:** `unverified-high` — *a judgement label about evidence strength, not a measurement*
- **Evidence observed:** Google autocomplete, captured 2026-09-15 via suggestqueries.google.com (client=firefox, hl=en, gl=us). "learn shanghainese" returned "learn shanghainese online free", "learn shanghainese app", "learn shanghainese online", "learn shanghainese language", "learn shanghainese duolingo" (10 suggestions). The "learn shanghainese duolingo" suggestion is an observed signal that people are looking for a course that does not exist on the large platforms. No search volume or difficulty figure is available: this project has no authenticated Search Console, no Keyword Planner and no third-party keyword tool.
- **Why it is a separate page:** Eight per-language beginner guides exist and none covers Shanghainese; this app has zero article coverage. (closest existing article: `learn-malay-beginners-guide`, similarity **0.63**)
- **First-party angle (only we can write this):** Why our Shanghainese course teaches tone sandhi in the first third rather than as an advanced topic, and what breaks when it is left until later.
- **Inbound link required from:** `language-learning-apps-compared`
- **Outbound internal links:** `wu-chinese-and-where-shanghainese-sits`, `shanghainese-vs-mandarin-differences`, `language-learning-apps-compared`, `shanghainese-phrases-for-beginners`
- **CTA:** **No public Play listing for this app.** Link the on-site app page instead: https://reigncreativellc.com/apps/learn-shanghainese/
- **Supporting terms:** learn shanghainese; learn shanghainese app; learn shanghainese online; shanghainese for beginners; how to learn shanghainese; shanghainese lessons
- **Long-tail:** how do i start learning shanghainese; can you learn shanghainese without mandarin; learn shanghainese online free; is there an app for shanghainese; best way to learn shanghainese
- **Questions to answer directly:** How do you start learning Shanghainese? / Do you need Mandarin before Shanghainese? / Is there an app that teaches Shanghainese? / How many people speak Shanghainese?

#### Shanghainese vs Mandarin: Why Knowing One Barely Helps

`shanghainese-vs-mandarin-differences` · `language-learning` · `comparison` · `informational` · app: `learn-shanghainese` · disclaimer: `language`

- **Primary keyword:** "shanghainese vs mandarin"
- **Demand tier:** `unverified-high` — *a judgement label about evidence strength, not a measurement*
- **Evidence observed:** Google autocomplete, captured 2026-09-15 via suggestqueries.google.com (client=firefox, hl=en, gl=us). "shanghainese vs mandarin" returned "shanghainese vs mandarin vs cantonese", "shanghainese vs mandarin reddit", "shanghainese and mandarin", "is shanghainese similar to mandarin" (6 suggestions); "wu chinese" returned "wu chinese vs mandarin" among 10. No search volume or difficulty figure is available: this project has no authenticated Search Console, no Keyword Planner and no third-party keyword tool.
- **Why it is a separate page:** cantonese-vs-mandarin-differences covers a different variety pair entirely; Shanghainese has no page on the site. (closest existing article: `cantonese-vs-mandarin-differences`, similarity **0.48**)
- **First-party angle (only we can write this):** The audio decision behind our Shanghainese course: we recorded from Wu speakers rather than adapting Mandarin recordings, and why that constrained the vocabulary we could cover.
- **Inbound link required from:** `cantonese-vs-mandarin-differences`
- **Outbound internal links:** `wu-chinese-and-where-shanghainese-sits`, `learn-shanghainese-beginners-guide`, `cantonese-vs-mandarin-differences`, `shanghainese-tones-and-tone-sandhi`
- **CTA:** **No public Play listing for this app.** Link the on-site app page instead: https://reigncreativellc.com/apps/learn-shanghainese/
- **Supporting terms:** is shanghainese similar to mandarin; shanghainese and mandarin; wu chinese vs mandarin; shanghainese vs mandarin vs cantonese; shanghainese mandarin differences; can mandarin speakers understand shanghainese
- **Long-tail:** can mandarin speakers understand shanghainese; how different is shanghainese from mandarin; is shanghainese harder than mandarin; shanghainese vs mandarin tones; do shanghainese and mandarin share characters
- **Questions to answer directly:** Can Mandarin speakers understand Shanghainese? / How many tones does Shanghainese have compared with Mandarin? / Do they use the same characters? / Is Shanghainese harder than Mandarin?

#### Is Shanghainese a Dialect or a Language?

`is-shanghainese-a-dialect-or-a-language` · `language-learning` · `faq` · `informational` · app: `learn-shanghainese` · disclaimer: `language`

- **Primary keyword:** "is shanghainese a dialect"
- **Demand tier:** `unverified-high` — *a judgement label about evidence strength, not a measurement*
- **Evidence observed:** Google autocomplete, captured 2026-09-15 via suggestqueries.google.com (client=firefox, hl=en, gl=us). "is shanghainese a dialect" returned "is shanghainese a dialect of mandarin", "is shanghainese a dialect or language", "is shanghainese a wu dialect", "is shanghainese a language", "does shanghainese have tones" (9 suggestions); "shanghainese romanization" and "shanghainese tones" both also surfaced "is shanghainese dying". No search volume or difficulty figure is available: this project has no authenticated Search Console, no Keyword Planner and no third-party keyword tool.
- **Why it is a separate page:** No article on the site addresses the dialect-versus-language question for any variety; the Cantonese/Mandarin page compares features rather than classification. (closest existing article: `learning-a-language-without-a-teacher`, similarity **0.11**)
- **First-party angle (only we can write this):** Why our catalogue lists this course as Wu Chinese rather than a Mandarin variant, and the practical consequence that had for how we structured the lessons.
- **Inbound link required from:** `cantonese-vs-mandarin-differences`
- **Outbound internal links:** `wu-chinese-and-where-shanghainese-sits`, `shanghainese-vs-mandarin-differences`, `learn-shanghainese-beginners-guide`, `what-is-a-tonal-language`
- **CTA:** **No public Play listing for this app.** Link the on-site app page instead: https://reigncreativellc.com/apps/learn-shanghainese/
- **Supporting terms:** is shanghainese a dialect of mandarin; is shanghainese a language; is shanghainese a wu dialect; shanghainese dialect or language; is shanghainese dying; where is shanghainese spoken
- **Long-tail:** is shanghainese a dialect or a separate language; why is shanghainese called a dialect; is shanghainese dying out; how many people still speak shanghainese; is shanghainese taught in schools
- **Questions to answer directly:** Is Shanghainese a dialect or a language? / Why is Shanghainese called a dialect of Chinese? / Is Shanghainese dying out? / Where is Shanghainese spoken?

#### Shanghainese Tones and Tone Sandhi: How Many Are There Really?

`shanghainese-tones-and-tone-sandhi` · `language-learning` · `reference` · `informational` · app: `learn-shanghainese` · disclaimer: `language`

- **Primary keyword:** "how many tones does shanghainese have"
- **Demand tier:** `unverified-high` — *a judgement label about evidence strength, not a measurement*
- **Evidence observed:** Google autocomplete, captured 2026-09-15 via suggestqueries.google.com (client=firefox, hl=en, gl=us). "shanghainese tones" returned "shanghainese how many tones", "does shanghainese have tones", "how many tones does shanghainese have", "what does shanghainese sound like" (6 suggestions); the separate seed "tone sandhi" returned "tone sandhi rules", "tone sandhi chinese", "tone sandhi meaning", "tone sandhi cantonese" (10 suggestions). No search volume or difficulty figure is available: this project has no authenticated Search Console, no Keyword Planner and no third-party keyword tool.
- **Why it is a separate page:** The site has tone articles for Thai, Cantonese and Vietnamese and a general tonal-language explainer; none covers phrase-level sandhi, which is the defining Shanghainese feature. (closest existing article: `thai-tones-explained`, similarity **0.35**)
- **First-party angle (only we can write this):** Why our Shanghainese audio is recorded as whole phrases rather than isolated syllables, because syllable-level recordings teach a tone that never occurs in speech.
- **Inbound link required from:** `what-is-a-tonal-language`
- **Outbound internal links:** `what-is-a-tonal-language`, `learn-shanghainese-beginners-guide`, `shanghainese-vs-mandarin-differences`, `cantonese-tones-explained`
- **CTA:** **No public Play listing for this app.** Link the on-site app page instead: https://reigncreativellc.com/apps/learn-shanghainese/
- **Supporting terms:** shanghainese tones; tone sandhi; tone sandhi rules; does shanghainese have tones; wu chinese tones; shanghainese pronunciation
- **Long-tail:** how many tones does shanghainese have; what is tone sandhi in shanghainese; why do shanghainese tone counts differ; shanghainese tone sandhi rules for beginners; is shanghainese tonal like cantonese
- **Questions to answer directly:** How many tones does Shanghainese have? / What is tone sandhi? / Why do sources disagree on the tone count? / Is Shanghainese tonal in the same way as Cantonese?

#### Wu Chinese: The Family Shanghainese Belongs To

`wu-chinese-and-where-shanghainese-sits` · `language-learning` · `reference` · `informational` · app: `learn-shanghainese` · disclaimer: `language`

- **Primary keyword:** "wu chinese language"
- **Demand tier:** `unverified-medium` — *a judgement label about evidence strength, not a measurement*
- **Evidence observed:** Google autocomplete, captured 2026-09-15 via suggestqueries.google.com (client=firefox, hl=en, gl=us). "wu chinese" returned "wu chinese language", "wu chinese vs mandarin", "wu chinese character", "wu chinese meaning" (10 suggestions, mixed with restaurant-name queries - an observed SERP-composition note rather than a volume claim). No search volume or difficulty figure is available: this project has no authenticated Search Console, no Keyword Planner and no third-party keyword tool.
- **Why it is a separate page:** Nothing on the site describes the Chinese language groups; the Cantonese articles treat Cantonese in isolation. (closest existing article: `what-is-a-tonal-language`, similarity **0.37**)
- **First-party angle (only we can write this):** Why the course is named for Shanghainese rather than Wu, and the scope line we drew when learners from Suzhou and Ningbo asked whether it would work for them.
- **Inbound link required from:** `cantonese-vs-mandarin-differences`
- **Outbound internal links:** `learn-shanghainese-beginners-guide`, `is-shanghainese-a-dialect-or-a-language`, `shanghainese-vs-mandarin-differences`, `cantonese-vs-mandarin-differences`
- **CTA:** **No public Play listing for this app.** Link the on-site app page instead: https://reigncreativellc.com/apps/learn-shanghainese/
- **Supporting terms:** wu chinese; wu chinese vs mandarin; wu dialect; suzhou dialect; ningbo dialect; chinese language families
- **Long-tail:** what is wu chinese; how many people speak wu chinese; is shanghainese the same as wu chinese; which chinese varieties are in the wu group; can wu speakers understand each other
- **Questions to answer directly:** What is Wu Chinese? / Is Shanghainese the same as Wu Chinese? / How many people speak Wu? / Can Wu speakers from different cities understand each other?

#### Shanghainese Phrases to Start With, and Why They Sound Odd

`shanghainese-phrases-for-beginners` · `language-learning` · `listicle` · `informational` · app: `learn-shanghainese` · disclaimer: `language`

- **Primary keyword:** "common shanghainese phrases"
- **Demand tier:** `unverified-medium` — *a judgement label about evidence strength, not a measurement*
- **Evidence observed:** Google autocomplete, captured 2026-09-15 via suggestqueries.google.com (client=firefox, hl=en, gl=us). "shanghainese phrases" returned "common shanghainese phrases", "basic shanghainese phrases", "how to say hello in shanghainese", "how to say shanghai in shanghainese" (6 suggestions); "learn shanghainese app" also returned "how to say hello in shanghainese". No search volume or difficulty figure is available: this project has no authenticated Search Console, no Keyword Planner and no third-party keyword tool.
- **Why it is a separate page:** No Shanghainese content exists; the nearest pages are Cantonese vocabulary articles for a different language group. (closest existing article: `language-learning-apps-compared`, similarity **0.14**)
- **First-party angle (only we can write this):** Which phrases our first Shanghainese unit opens with and why we start with a greeting whose Mandarin cognate is misleading, so learners stop transliterating from day one.
- **Inbound link required from:** `learn-shanghainese-beginners-guide`
- **Outbound internal links:** `learn-shanghainese-beginners-guide`, `shanghainese-tones-and-tone-sandhi`, `shanghainese-romanisation-choices`, `shanghainese-vs-mandarin-differences`
- **CTA:** **No public Play listing for this app.** Link the on-site app page instead: https://reigncreativellc.com/apps/learn-shanghainese/
- **Supporting terms:** shanghainese phrases; basic shanghainese phrases; how to say hello in shanghainese; shanghainese greetings; shanghainese vocabulary; shanghainese words
- **Long-tail:** how do you say hello in shanghainese; basic shanghainese phrases for travel; shanghainese phrases with pronunciation; how to say thank you in shanghainese; useful shanghainese words for beginners
- **Questions to answer directly:** How do you say hello in Shanghainese? / Which Shanghainese phrases should a beginner learn? / How do you say thank you in Shanghainese? / Do Shanghainese phrases use the same characters as Mandarin?

#### Romanising Shanghainese: Picking a System When There Is No Standard

`shanghainese-romanisation-choices` · `language-learning` · `case-study` · `informational` · app: `learn-shanghainese` · disclaimer: `language`

- **Primary keyword:** "shanghainese romanization"
- **Demand tier:** `unverified-medium` — *a judgement label about evidence strength, not a measurement*
- **Evidence observed:** Google autocomplete, captured 2026-09-15 via suggestqueries.google.com (client=firefox, hl=en, gl=us). "shanghainese romanization" returned only 6 suggestions and most were adjacent rather than exact ("is shanghainese a language", "does shanghainese have tones", "where is shanghainese spoken"). Treated as a medium signal: the exact phrase is attested but the cluster around it is thin. No search volume or difficulty figure is available: this project has no authenticated Search Console, no Keyword Planner and no third-party keyword tool.
- **Why it is a separate page:** The Cantonese Jyutping situation is not covered on the site either, and no page discusses romanisation choice as a design problem. (closest existing article: `golf-course-management-basics`, similarity **0.02**)
- **First-party angle (only we can write this):** The actual comparison we ran between competing Shanghainese romanisations before shipping, the one we picked, and the specific readability compromise we accepted.
- **Inbound link required from:** `learn-shanghainese-beginners-guide`
- **Outbound internal links:** `learn-shanghainese-beginners-guide`, `shanghainese-tones-and-tone-sandhi`, `shanghainese-phrases-for-beginners`, `wu-chinese-and-where-shanghainese-sits`
- **CTA:** **No public Play listing for this app.** Link the on-site app page instead: https://reigncreativellc.com/apps/learn-shanghainese/
- **Supporting terms:** shanghainese romanisation; wu romanization; shanghainese pinyin; how to write shanghainese; shanghainese transcription; shanghainese spelling systems
- **Long-tail:** is there a standard romanisation for shanghainese; how do you write shanghainese in latin letters; shanghainese romanization compared with pinyin; why does shanghainese spelling vary; learning shanghainese without characters
- **Questions to answer directly:** Is there a standard romanisation for Shanghainese? / Can you learn Shanghainese without characters? / How does Shanghainese romanisation differ from Pinyin? / Why do Shanghainese spellings vary between sources?

#### How to Say Hello in Lao: Greetings, the Nop and Politeness

`lao-greetings-and-politeness` · `language-learning` · `how-to` · `informational` · app: `learn-lao` · disclaimer: `language`

- **Primary keyword:** "how to say hello in laos"
- **Demand tier:** `unverified-high` — *a judgement label about evidence strength, not a measurement*
- **Evidence observed:** Google autocomplete, captured 2026-09-15 via suggestqueries.google.com (client=firefox, hl=en, gl=us). "how to say hello in lao" returned "how to say hello in laos", "how to say hello in laotian", "how to say hello in laos audio", "how to say hello in laos pronunciation", "how to say thank you in laos", "how to say hi in laos". The seed "lao greetings" returned "lao greetings pronunciation", "how to say hello in lao", "what is hello in lao". No search volume or difficulty figure is available: this project has no authenticated Search Console, no Keyword Planner and no third-party keyword tool.
- **Why it is a separate page:** The beginner guide covers the course structure; no existing article teaches the greeting set, the nop, or the politeness particles that go with it. (closest existing article: `lao-alphabet-explained`, similarity **0.13**)
- **First-party angle (only we can write this):** Why the app introduces the politeness particle before the full greeting phrase, and the recording decision we made about male and female speaker forms.
- **Inbound link required from:** `learn-lao-beginners-guide`
- **Outbound internal links:** `learn-lao-beginners-guide`, `lao-phrases-for-travellers`, `lao-tone-rules`, `lao-alphabet-explained`
- **CTA:** Google Play listing — https://play.google.com/store/apps/details?id=com.reigncreative.learnlaolanguage
- **Supporting terms:** sabaidee meaning; lao greetings; how to say thank you in lao; lao politeness particles; nop gesture laos; how to say hi in lao
- **Long-tail:** how do you greet someone in laos; what does sabaidee mean; is the nop the same as the thai wai; polite way to say hello in lao; how to say goodbye in lao
- **Questions to answer directly:** What is the standard greeting in Lao? / What does sabaidee literally mean? / Do you bow or shake hands when greeting someone in Laos? / How do Lao politeness particles change a greeting?

#### Basic Lao Phrases for Travellers: What Actually Gets Used

`lao-phrases-for-travellers` · `language-learning` · `listicle` · `informational` · app: `learn-lao` · disclaimer: `language`

- **Primary keyword:** "basic lao phrases"
- **Demand tier:** `unverified-high` — *a judgement label about evidence strength, not a measurement*
- **Evidence observed:** Google autocomplete, captured 2026-09-15 via suggestqueries.google.com (client=firefox, hl=en, gl=us). "basic lao phrases" returned "basic lao phrases in english", "common lao phrases", "useful lao phrases", "simple phrases in lao", "basic lao words"; the seed "lao phrases" returned "lao phrases to know", "lao phrases for tourists", "useful lao phrases". The longer phrase "basic lao phrases for travel" returned no suggestions at all, so the shorter attested form is the primary keyword. No search volume or difficulty figure is available: this project has no authenticated Search Console, no Keyword Planner and no third-party keyword tool.
- **Why it is a separate page:** Existing Lao articles cover the script, a Thai comparison and a course overview; none is a practical travel phrase list. (closest existing article: `lao-alphabet-explained`, similarity **0.39**)
- **First-party angle (only we can write this):** Which situation groups we built the Lao travel unit around after cutting the ones that never came up, and why the numbers unit sits next to it.
- **Inbound link required from:** `lao-alphabet-explained`
- **Outbound internal links:** `lao-greetings-and-politeness`, `learn-lao-beginners-guide`, `lao-vs-thai-differences`, `lao-alphabet-explained`
- **CTA:** Google Play listing — https://play.google.com/store/apps/details?id=com.reigncreative.learnlaolanguage
- **Supporting terms:** useful lao phrases; common lao phrases; lao phrases for tourists; simple phrases in lao; basic lao words; lao travel vocabulary
- **Long-tail:** what phrases should i learn before visiting laos; how to order food in lao; how to ask how much in lao; lao phrases for taxis and tuk tuks; essential lao phrases for beginners
- **Questions to answer directly:** Which Lao phrases are worth learning before a trip? / How do you ask for the price in Lao? / Can you get by in Laos with English? / How do you order food politely in Lao?

#### Is Lao Hard to Learn? An Honest Look for English Speakers

`is-lao-hard-to-learn` · `language-learning` · `faq` · `informational` · app: `learn-lao` · disclaimer: `language`

- **Primary keyword:** "is lao hard to learn"
- **Demand tier:** `unverified-high` — *a judgement label about evidence strength, not a measurement*
- **Evidence observed:** Google autocomplete, captured 2026-09-15 via suggestqueries.google.com (client=firefox, hl=en, gl=us). "is lao hard to learn" returned "is lao hard to learn for english speakers", "is laotian hard to learn", "how long does it take to learn lao"; the seed "learn lao" also surfaced "how long does it take to learn lao" and "is lao hard to learn" as question suggestions. No search volume or difficulty figure is available: this project has no authenticated Search Console, no Keyword Planner and no third-party keyword tool.
- **Why it is a separate page:** We answer this question for Thai and Vietnamese but not Lao, and the Lao vs Thai article compares the two languages rather than assessing Lao difficulty on its own. (closest existing article: `is-vietnamese-hard-to-learn`, similarity **0.63**)
- **First-party angle (only we can write this):** Where learners stall in the Lao course based on the lesson order we had to rework: the gap between recognising the script and reading it at speed.
- **Inbound link required from:** `lao-vs-thai-differences`
- **Outbound internal links:** `lao-vs-thai-differences`, `learn-lao-beginners-guide`, `lao-tone-rules`, `is-vietnamese-hard-to-learn`
- **CTA:** Google Play listing — https://play.google.com/store/apps/details?id=com.reigncreative.learnlaolanguage
- **Supporting terms:** is laotian hard to learn; how long does it take to learn lao; lao difficulty for english speakers; is lao easier than thai; lao learning curve; hardest part of learning lao
- **Long-tail:** is lao hard to learn for english speakers; how many hours to learn lao; is lao harder than thai; what makes lao difficult; is lao worth learning
- **Questions to answer directly:** Is Lao a hard language for English speakers? / How long does it take to learn Lao? / Is Lao easier than Thai? / What is the hardest part of learning Lao?

#### Lao Tone Rules: Consonant Classes, Tone Marks and Vowel Length

`lao-tone-rules` · `language-learning` · `reference` · `informational` · app: `learn-lao` · disclaimer: `language`

- **Primary keyword:** "lao tone rules"
- **Demand tier:** `unverified-medium` — *a judgement label about evidence strength, not a measurement*
- **Evidence observed:** Google autocomplete, captured 2026-09-15 via suggestqueries.google.com (client=firefox, hl=en, gl=us). the exact phrase "lao tone rules" returned only one further suggestion ("pinyin tone rules"); the broader seed "lao tones" returned "lao tones chart" and "lao language tones". Treated as a medium signal on the strength of the adjacent cluster rather than the exact phrase. No search volume or difficulty figure is available: this project has no authenticated Search Console, no Keyword Planner and no third-party keyword tool.
- **Why it is a separate page:** We have tone articles for Thai, Cantonese and Vietnamese and a general tonal-language explainer, but nothing covering the Lao consonant-class and tone-mark system. (closest existing article: `lao-alphabet-explained`, similarity **0.4**)
- **First-party angle (only we can write this):** Why the Lao course teaches consonant class before tone marks, a sequencing change we made because teaching the marks first produced confident but wrong readings.
- **Inbound link required from:** `lao-alphabet-explained`
- **Outbound internal links:** `lao-alphabet-explained`, `what-is-a-tonal-language`, `thai-tones-explained`, `learn-lao-beginners-guide`
- **CTA:** Google Play listing — https://play.google.com/store/apps/details?id=com.reigncreative.learnlaolanguage
- **Supporting terms:** lao tones; lao tones chart; lao language tones; lao consonant classes; lao tone marks; how many tones does lao have
- **Long-tail:** how do lao tone rules work; how many tones are there in lao; lao tone rules for beginners; why does the same tone mark give different tones in lao; lao vowel length and tone
- **Questions to answer directly:** How many tones does Lao have? / How do you work out the tone of a Lao syllable? / Do Lao tone marks always mean the same tone? / How do consonant classes affect Lao tones?

#### Learn Lao App: Building a Course for a Language Most Apps Skip

`building-a-lao-course-from-scratch` · `language-learning` · `case-study` · `commercial` · app: `learn-lao` · disclaimer: `language`

- **Primary keyword:** "learn lao app"
- **Demand tier:** `unverified-high` — *a judgement label about evidence strength, not a measurement*
- **Evidence observed:** Google autocomplete, captured 2026-09-15 via suggestqueries.google.com (client=firefox, hl=en, gl=us). "learn lao app" returned "simply learn lao app", "learn lao language app", "how to learn lao language free"; the seed "learn lao" returned "learn lao app", "learn lao free", "learn lao online", "learn lao alphabet". App-seeking intent is clearly attested. No search volume or difficulty figure is available: this project has no authenticated Search Console, no Keyword Planner and no third-party keyword tool.
- **Why it is a separate page:** The existing Lao beginner guide is a learner-facing how-to; this answers the app-seeking query with a build story, which is a different intent and a different page. (closest existing article: `learn-lao-beginners-guide`, similarity **0.63**)
- **First-party angle (only we can write this):** The scope decisions behind the Lao course: what we cut, why the script comes before conversation, and what a small team can and cannot cover for a language with few reference resources.
- **Inbound link required from:** `language-learning-apps-compared`
- **Outbound internal links:** `learn-lao-beginners-guide`, `lao-alphabet-explained`, `language-learning-apps-compared`, `lao-tone-rules`
- **CTA:** Google Play listing — https://play.google.com/store/apps/details?id=com.reigncreative.learnlaolanguage
- **Supporting terms:** learn lao language app; lao learning app; apps that teach lao; learn lao online; lao course for beginners; simply learn lao app
- **Long-tail:** is there an app to learn lao; why do major apps not offer lao; best way to learn lao on your phone; how to learn lao language free; lao language app for android
- **Questions to answer directly:** Is there an app for learning Lao? / Why do major language apps not offer Lao? / What should a Lao course teach first? / Can you learn Lao without a teacher?

#### Khmer Greetings and Honorifics: Getting the Register Right

`khmer-greetings-and-honorifics` · `language-learning` · `beginner` · `informational` · app: `learn-cambodian-khmer` · disclaimer: `language`

- **Primary keyword:** "khmer greetings"
- **Demand tier:** `unverified-medium` — *a judgement label about evidence strength, not a measurement*
- **Evidence observed:** Google autocomplete, captured 2026-09-15 via suggestqueries.google.com (client=firefox, hl=en, gl=us). "khmer greetings" returned "common greetings in khmer", "basic khmer greetings", "khmer new year greetings"; the seed "learn khmer" returned "learn khmer language" and "learn khmer alphabet". No search volume or difficulty figure is available: this project has no authenticated Search Console, no Keyword Planner and no third-party keyword tool.
- **Why it is a separate page:** Existing Khmer coverage is the script explainer and the beginner course guide; neither covers the register system that decides which greeting to use. (closest existing article: `khmer-script-explained`, similarity **0.38**)
- **First-party angle (only we can write this):** Why the app teaches two greeting registers in the first unit instead of one, after a single "hello" left learners sounding wrong with older speakers.
- **Inbound link required from:** `learn-khmer-beginners-guide`
- **Outbound internal links:** `learn-khmer-beginners-guide`, `khmer-phrases-for-cambodia-travel`, `khmer-script-explained`, `is-khmer-hard-to-learn`
- **CTA:** Google Play listing — https://play.google.com/store/apps/details?id=com.reigncreative.learncambodian
- **Supporting terms:** common greetings in khmer; basic khmer greetings; how to say hello in khmer; khmer honorifics; sampeah gesture; cambodian greetings
- **Long-tail:** how do you greet someone in cambodia; difference between chum reap suor and suosdei; when to use formal khmer greetings; how to say thank you in khmer; khmer greetings for elders
- **Questions to answer directly:** How do you say hello in Khmer? / What is the difference between formal and informal Khmer greetings? / What is the sampeah and when do you use it? / Do Khmer greetings change by age or status?

#### Khmer Phrases for Travellers: A Short, Usable List

`khmer-phrases-for-cambodia-travel` · `language-learning` · `listicle` · `informational` · app: `learn-cambodian-khmer` · disclaimer: `language`

- **Primary keyword:** "khmer phrases for travellers"
- **Demand tier:** `unverified-high` — *a judgement label about evidence strength, not a measurement*
- **Evidence observed:** Google autocomplete, captured 2026-09-15 via suggestqueries.google.com (client=firefox, hl=en, gl=us). "useful khmer phrases for travel" returned "basic khmer phrases for tourists", "khmer phrases for travellers", "useful cambodian phrases"; the seed "khmer phrases" returned "khmer phrases to know", "khmer phrases for travellers", "basic khmer phrases", "useful khmer phrases". No search volume or difficulty figure is available: this project has no authenticated Search Console, no Keyword Planner and no third-party keyword tool.
- **Why it is a separate page:** No existing article lists practical Khmer travel phrases; the beginner guide describes the course and the script article covers writing. (closest existing article: `learn-khmer-beginners-guide`, similarity **0.34**)
- **First-party angle (only we can write this):** Which travel situations we built the Cambodia unit around, and why transliteration sits beside Khmer script in that unit only rather than across the whole course.
- **Inbound link required from:** `learn-khmer-beginners-guide`
- **Outbound internal links:** `khmer-greetings-and-honorifics`, `learn-khmer-beginners-guide`, `khmer-script-explained`, `khmer-vs-thai-script`
- **CTA:** Google Play listing — https://play.google.com/store/apps/details?id=com.reigncreative.learncambodian
- **Supporting terms:** basic khmer phrases for tourists; useful cambodian phrases; common khmer phrases; cambodia words to know; khmer travel vocabulary; how to bargain in khmer
- **Long-tail:** what khmer phrases should i learn before cambodia; how to order food in khmer; how to ask the price in khmer; khmer phrases for tuk tuk drivers; essential cambodian phrases for tourists
- **Questions to answer directly:** Which Khmer phrases are most useful for travellers? / How do you ask how much something costs in Khmer? / Is English widely spoken in Cambodia? / How do you order food in Khmer?

#### Is Khmer Hard to Learn? What Actually Slows English Speakers Down

`is-khmer-hard-to-learn` · `language-learning` · `faq` · `informational` · app: `learn-cambodian-khmer` · disclaimer: `language`

- **Primary keyword:** "is khmer hard to learn"
- **Demand tier:** `unverified-high` — *a judgement label about evidence strength, not a measurement*
- **Evidence observed:** Google autocomplete, captured 2026-09-15 via suggestqueries.google.com (client=firefox, hl=en, gl=us). "is khmer hard to learn" returned "is khmer hard to learn for english speakers", "is khmer harder to learn than thai", "is khmer language hard to learn", "is khmer or thai harder to learn", "how hard is it to learn cambodian". Strong question-form cluster. No search volume or difficulty figure is available: this project has no authenticated Search Console, no Keyword Planner and no third-party keyword tool.
- **Why it is a separate page:** We answer the difficulty question for Thai and Vietnamese but not Khmer; the Khmer script article explains the writing system without assessing overall difficulty. (closest existing article: `learn-khmer-beginners-guide`, similarity **0.64**)
- **First-party angle (only we can write this):** The point in our Khmer course that forced a redesign: the subscript consonant lessons, which we split into three shorter units because learners abandoned the single long one.
- **Inbound link required from:** `khmer-script-explained`
- **Outbound internal links:** `khmer-script-explained`, `learn-khmer-beginners-guide`, `khmer-vs-thai-script`, `is-vietnamese-hard-to-learn`
- **CTA:** Google Play listing — https://play.google.com/store/apps/details?id=com.reigncreative.learncambodian
- **Supporting terms:** is khmer language hard to learn; how hard is it to learn cambodian; khmer difficulty for english speakers; is khmer harder than thai; khmer learning curve; how long to learn khmer
- **Long-tail:** is khmer hard to learn for english speakers; is khmer or thai harder to learn; why is the khmer script difficult; does khmer have tones; how long does it take to learn khmer
- **Questions to answer directly:** Is Khmer a difficult language to learn? / Does Khmer have tones? / Is Khmer harder than Thai? / What is the hardest part of learning Khmer?

#### Khmer vs Thai Script: Shared Roots, Different Rules

`khmer-vs-thai-script` · `language-learning` · `comparison` · `informational` · app: `learn-cambodian-khmer` · disclaimer: `language`

- **Primary keyword:** "khmer vs thai script"
- **Demand tier:** `unverified-high` — *a judgement label about evidence strength, not a measurement*
- **Evidence observed:** Google autocomplete, captured 2026-09-15 via suggestqueries.google.com (client=firefox, hl=en, gl=us). "khmer vs thai script" returned "cambodian vs thai script", "khmer and thai script", "cambodia vs thai script", "khmer vs thai writing", "khmer vs thai alphabet"; the seed "khmer vs thai" also returned "khmer vs thai vs lao". Strong comparison intent. No search volume or difficulty figure is available: this project has no authenticated Search Console, no Keyword Planner and no third-party keyword tool.
- **Why it is a separate page:** lao-vs-thai-differences compares Lao and Thai as languages; nothing on the site compares the Khmer and Thai writing systems. (closest existing article: `khmer-script-explained`, similarity **0.63**)
- **First-party angle (only we can write this):** What we learned building a Khmer and a Thai course in the same codebase: the shared rendering problems and the places where one lesson template would not work for both.
- **Inbound link required from:** `learn-thai-script-beginners-guide`
- **Outbound internal links:** `khmer-script-explained`, `learn-thai-script-beginners-guide`, `lao-vs-thai-differences`, `khmer-fonts-on-android`
- **CTA:** Google Play listing — https://play.google.com/store/apps/details?id=com.reigncreative.learncambodian
- **Supporting terms:** cambodian vs thai script; khmer and thai script; khmer vs thai writing; khmer vs thai alphabet; khmer vs thai language; brahmic scripts compared
- **Long-tail:** are khmer and thai scripts the same; can you read thai if you know khmer; which is harder khmer or thai script; how are khmer and thai alphabets related; khmer vs thai vs lao script
- **Questions to answer directly:** Are the Khmer and Thai alphabets related? / Can someone who reads Thai read Khmer? / Which script is harder to learn, Khmer or Thai? / Why does Thai have tone marks and Khmer does not?

#### Khmer Fonts on Android: Why Text Breaks and How to Fix It

`khmer-fonts-on-android` · `language-learning` · `troubleshooting` · `informational` · app: `learn-cambodian-khmer` · disclaimer: `none`

- **Primary keyword:** "khmer font for android"
- **Demand tier:** `unverified-high` — *a judgement label about evidence strength, not a measurement*
- **Evidence observed:** Google autocomplete, captured 2026-09-15 via suggestqueries.google.com (client=firefox, hl=en, gl=us). "khmer font android" returned "khmer font for android phone", "khmer font download for android", "khmer unicode font for android", "install khmer font on android"; "khmer keyboard android" returned a further eight suggestions. The narrower phrasing "khmer font not displaying android" returned nothing, so the attested shorter phrase is used. No search volume or difficulty figure is available: this project has no authenticated Search Console, no Keyword Planner and no third-party keyword tool.
- **Why it is a separate page:** No existing article covers script rendering at all; the Khmer script explainer is about the writing system, not about display problems on a device. (closest existing article: `khmer-script-explained`, similarity **0.35**)
- **First-party angle (only we can write this):** The font fallback problem we hit shipping the Khmer course on Android, how stacked subscript consonants clipped on some manufacturer skins, and what we changed in the app to stop it.
- **Inbound link required from:** `android-app-permissions-explained`
- **Outbound internal links:** `khmer-script-explained`, `learn-khmer-beginners-guide`, `android-app-permissions-explained`, `khmer-vs-thai-script`
- **CTA:** Google Play listing — https://play.google.com/store/apps/details?id=com.reigncreative.learncambodian
- **Supporting terms:** khmer font android; install khmer font on android; khmer unicode font for android; khmer font not displaying; khmer text showing boxes; khmer keyboard android
- **Long-tail:** why does khmer text show as boxes on android; how to install a khmer font on android; khmer subscript consonants not rendering; best khmer unicode font for phones; khmer font download for android
- **Questions to answer directly:** Why does Khmer text display as boxes on my phone? / How do I install a Khmer font on Android? / Why are Khmer subscript consonants cut off? / Which Khmer font works best on Android?


### Block 2 — Grammar depth (Malay, Russian), world history, memory and media practicalities

#### Malay Affixes: meN-, ber-, -kan and -an Without the Jargon

`malay-affixes-guide` · `language-learning` · `reference` · `informational` · app: `learn-malay` · disclaimer: `language`

- **Primary keyword:** "malay affixes"
- **Demand tier:** `unverified-medium` — *a judgement label about evidence strength, not a measurement*
- **Evidence observed:** Google autocomplete, captured 2026-09-15 via suggestqueries.google.com (client=firefox, hl=en, gl=us). "malay affixes" returned "malay verb affixes" only; the broader seed "malay grammar" returned "malay grammar rules", "malay grammar structure", "malay grammar made easy". A narrow but genuine attested phrase. No search volume or difficulty figure is available: this project has no authenticated Search Console, no Keyword Planner and no third-party keyword tool.
- **Why it is a separate page:** Existing Malay articles cover pronunciation, the Indonesian comparison and the beginner course; affixation, the core of Malay word building, is not covered anywhere. (closest existing article: `malay-vs-indonesian-differences`, similarity **0.46**)
- **First-party angle (only we can write this):** Why our Malay course introduces root words without affixes for the first three units, and the trade-off that creates when learners meet real signage early.
- **Inbound link required from:** `malay-pronunciation-guide`
- **Outbound internal links:** `learn-malay-beginners-guide`, `malay-pronunciation-guide`, `malay-vs-indonesian-differences`, `is-malay-easy-to-learn`
- **CTA:** Google Play listing — https://play.google.com/store/apps/details?id=com.reigncreative.learnmalaylanguage
- **Supporting terms:** malay verb affixes; malay prefixes and suffixes; men prefix malay; ber prefix malay; malay word formation; malay grammar rules
- **Long-tail:** how do malay affixes work; what does the men prefix mean in malay; malay affixes list with examples; when to use kan and i in malay; malay root words and affixes
- **Questions to answer directly:** How do Malay prefixes and suffixes work? / What does the meN- prefix do in Malay? / Why does memb- become mem- in Malay? / Do you need affixes to speak Malay?

#### Should You Learn Malay or Indonesian? A Decision Guide

`should-i-learn-malay-or-indonesian` · `language-learning` · `best-for` · `commercial` · app: `learn-malay` · disclaimer: `comparison`

- **Primary keyword:** "should i learn malay or indonesian"
- **Demand tier:** `unverified-high` — *a judgement label about evidence strength, not a measurement*
- **Evidence observed:** Google autocomplete, captured 2026-09-15 via suggestqueries.google.com (client=firefox, hl=en, gl=us). "should i learn malay or indonesian" returned "should i learn malay or indonesian reddit", "should i learn malay or indonesian first", "should i learn malaysian or indonesian", "which is easier malay or indonesian", "indonesian vs malay". Clear decision intent. No search volume or difficulty figure is available: this project has no authenticated Search Console, no Keyword Planner and no third-party keyword tool.
- **Why it is a separate page:** malay-vs-indonesian-differences explains how the two languages differ; this answers the separate question of which one a learner should pick, and says when the answer is not ours. (closest existing article: `malay-vs-indonesian-differences`, similarity **0.76**)
- **First-party angle (only we can write this):** Why we built a Malay course and not an Indonesian one, and the specific vocabulary and spelling choices that decision forced on us.
- **Inbound link required from:** `malay-vs-indonesian-differences`
- **Outbound internal links:** `malay-vs-indonesian-differences`, `learn-malay-beginners-guide`, `language-learning-apps-compared`, `malay-affixes-guide`
- **CTA:** Google Play listing — https://play.google.com/store/apps/details?id=com.reigncreative.learnmalaylanguage
- **Supporting terms:** which is easier malay or indonesian; indonesian vs malay; should i learn malaysian or indonesian; malay or indonesian for travel; bahasa melayu vs bahasa indonesia; malay indonesian mutual intelligibility
- **Long-tail:** is it better to learn malay or indonesian; can indonesian speakers understand malay; which language has more learning resources malay or indonesian; which apps offer a malay course; should i learn malay or indonesian first
- **Questions to answer directly:** Should I learn Malay or Indonesian? / Are Malay and Indonesian mutually intelligible? / Which has more learning material available? / Which language apps offer a Malay course?

#### Malay Phrases for Travel: What to Learn Before Malaysia

`malay-phrases-for-travel` · `language-learning` · `listicle` · `informational` · app: `learn-malay` · disclaimer: `language`

- **Primary keyword:** "malay phrases for travel"
- **Demand tier:** `unverified-high` — *a judgement label about evidence strength, not a measurement*
- **Evidence observed:** Google autocomplete, captured 2026-09-15 via suggestqueries.google.com (client=firefox, hl=en, gl=us). "malay phrases for travel" returned "malaysia travel phrases", "malay phrases for tourists", "common phrases in malaysia"; the seed "malay phrases" returned "malay phrases for travel", "malay phrases to know", "malay phrases for tourists". No search volume or difficulty figure is available: this project has no authenticated Search Console, no Keyword Planner and no third-party keyword tool.
- **Why it is a separate page:** No existing Malay article is a situational phrase list; the pronunciation guide and beginner guide both teach mechanics rather than usable phrases. (closest existing article: `malay-vs-indonesian-differences`, similarity **0.38**)
- **First-party angle (only we can write this):** The situations our Malay course groups vocabulary by, and why we dropped a formal-register unit that never matched how travellers actually used the app.
- **Inbound link required from:** `learn-malay-beginners-guide`
- **Outbound internal links:** `learn-malay-beginners-guide`, `malay-pronunciation-guide`, `malay-affixes-guide`, `is-malay-easy-to-learn`
- **CTA:** Google Play listing — https://play.google.com/store/apps/details?id=com.reigncreative.learnmalaylanguage
- **Supporting terms:** malay phrases for tourists; common phrases in malaysia; malaysia travel phrases; basic malay words; malay phrases to know; bahasa melayu travel phrases
- **Long-tail:** what malay phrases should i learn before malaysia; how to order food in malay; how to ask the price in malay; is english enough in malaysia; useful malay phrases for tourists
- **Questions to answer directly:** Which Malay phrases are useful for travellers? / Do you need Malay to travel in Malaysia? / How do you order food in Malay? / How do you ask how much something costs in Malay?

#### Is Malay Easy to Learn? The Honest Version

`is-malay-easy-to-learn` · `language-learning` · `faq` · `informational` · app: `learn-malay` · disclaimer: `language`

- **Primary keyword:** "is malay easy to learn"
- **Demand tier:** `unverified-high` — *a judgement label about evidence strength, not a measurement*
- **Evidence observed:** Google autocomplete, captured 2026-09-15 via suggestqueries.google.com (client=firefox, hl=en, gl=us). "is malay easy to learn" returned "is malay easy to learn for english speakers", "is malay easy to learn reddit", "is malay easy to learn for indonesian speakers", "is malay difficult to learn". Strong question-form cluster. No search volume or difficulty figure is available: this project has no authenticated Search Console, no Keyword Planner and no third-party keyword tool.
- **Why it is a separate page:** We answer this difficulty question for Thai and Vietnamese but not Malay, and no existing Malay article addresses difficulty at all. (closest existing article: `learn-malay-beginners-guide`, similarity **0.69**)
- **First-party angle (only we can write this):** The point in our Malay course where the "easy language" framing breaks down for learners: the affix system, which is where lesson completion drops.
- **Inbound link required from:** `is-vietnamese-hard-to-learn`
- **Outbound internal links:** `learn-malay-beginners-guide`, `malay-affixes-guide`, `is-vietnamese-hard-to-learn`, `should-i-learn-malay-or-indonesian`
- **CTA:** Google Play listing — https://play.google.com/store/apps/details?id=com.reigncreative.learnmalaylanguage
- **Supporting terms:** is malay easy to learn for english speakers; is malay difficult to learn; how long does it take to learn malay; malay learning curve; easiest asian language to learn; malay difficulty rating
- **Long-tail:** is malay easy to learn for english speakers; how long does it take to learn malay; what is the hardest part of malay; is malay easier than indonesian; is malay a good first asian language
- **Questions to answer directly:** Is Malay easy for English speakers to learn? / How long does it take to learn Malay? / What is the hardest part of Malay? / Is Malay easier than Thai or Vietnamese?

#### Russian Verbs of Motion: Idti, Khodit and the Prefixes

`russian-verbs-of-motion` · `language-learning` · `reference` · `informational` · app: `learn-russian` · disclaimer: `language`

- **Primary keyword:** "russian verbs of motion"
- **Demand tier:** `unverified-high` — *a judgement label about evidence strength, not a measurement*
- **Evidence observed:** Google autocomplete, captured 2026-09-15 via suggestqueries.google.com (client=firefox, hl=en, gl=us). "russian verbs of motion" returned nine further suggestions including "russian verbs of motion prefixes", "russian verbs of motion chart", "russian verbs of motion quiz", "russian verbs of motion practice" and "russian verbs of motion explained". One of the strongest attested clusters in this research. No search volume or difficulty figure is available: this project has no authenticated Search Console, no Keyword Planner and no third-party keyword tool.
- **Why it is a separate page:** The site covers Russian cases and the Cyrillic alphabet; verbs of motion are a separate grammar system that no existing article touches. (closest existing article: `russian-cases-explained-for-beginners`, similarity **0.32**)
- **First-party angle (only we can write this):** How our Russian course splits motion verbs across two units rather than one, and why we teach the prefixed forms against a map screen instead of a table.
- **Inbound link required from:** `russian-cases-explained-for-beginners`
- **Outbound internal links:** `russian-cases-explained-for-beginners`, `choosing-russian-verb-aspect`, `learn-russian-cyrillic-beginners-guide`, `russian-word-order-and-emphasis`
- **CTA:** Google Play listing — https://play.google.com/store/apps/details?id=com.reigncreative.learnrussianlanguage
- **Supporting terms:** russian verbs of motion prefixes; russian verbs of motion chart; idti vs khodit; russian motion verb pairs; russian verbs of motion conjugation; russian verbs of motion practice
- **Long-tail:** how do russian verbs of motion work; difference between idti and khodit; russian verbs of motion with prefixes explained; why does russian have two verbs for go; russian verbs of motion for beginners
- **Questions to answer directly:** What are Russian verbs of motion? / What is the difference between idti and khodit? / How do prefixes change Russian motion verbs? / Why does Russian have two words for to go?

#### Russian Verbal Aspect: How to Choose Perfective or Imperfective

`choosing-russian-verb-aspect` · `language-learning` · `how-to` · `informational` · app: `learn-russian` · disclaimer: `language`

- **Primary keyword:** "russian verbal aspect"
- **Demand tier:** `unverified-high` — *a judgement label about evidence strength, not a measurement*
- **Evidence observed:** Google autocomplete, captured 2026-09-15 via suggestqueries.google.com (client=firefox, hl=en, gl=us). "russian verbal aspect" returned "russian verb aspects", "russian verb aspect exercises", "russian verb aspect pairs", "russian grammar aspect"; the seed "russian aspect" returned "russian aspect pairs", "russian aspects of verbs", "russian aspect exercises", "russian aspectual pairs". The phrase "russian verb aspect explained" itself returned nothing, so the attested form is used. No search volume or difficulty figure is available: this project has no authenticated Search Console, no Keyword Planner and no third-party keyword tool.
- **Why it is a separate page:** Aspect is the grammar point Russian learners get stuck on after cases; the existing cases article does not touch verbs at all. (closest existing article: `how-long-does-it-take-to-learn-russian`, similarity **0.32**)
- **First-party angle (only we can write this):** Why our Russian course teaches aspect through paired example sentences rather than definitions, and the lesson format we abandoned because learners could recite the rule but not apply it.
- **Inbound link required from:** `how-long-does-it-take-to-learn-russian`
- **Outbound internal links:** `russian-verbs-of-motion`, `russian-cases-explained-for-beginners`, `how-long-does-it-take-to-learn-russian`, `russian-word-order-and-emphasis`
- **CTA:** Google Play listing — https://play.google.com/store/apps/details?id=com.reigncreative.learnrussianlanguage
- **Supporting terms:** russian verb aspects; russian aspect pairs; russian verb aspect exercises; perfective vs imperfective russian; russian grammar aspect; how to choose russian aspect
- **Long-tail:** how do i know which russian aspect to use; perfective and imperfective russian examples; russian aspect rules for beginners; russian aspect in the past tense; when to use imperfective in russian
- **Questions to answer directly:** What is verbal aspect in Russian? / How do you choose between perfective and imperfective? / Does Russian aspect map onto English tenses? / Which aspect do you use for repeated actions?

#### Russian Word Order: Flexible, But Not Free

`russian-word-order-and-emphasis` · `language-learning` · `reference` · `informational` · app: `learn-russian` · disclaimer: `language`

- **Primary keyword:** "russian word order"
- **Demand tier:** `unverified-high` — *a judgement label about evidence strength, not a measurement*
- **Evidence observed:** Google autocomplete, captured 2026-09-15 via suggestqueries.google.com (client=firefox, hl=en, gl=us). "russian word order" returned "russian word order vs english", "russian word order emphasis", "russian word order examples", "russian word order rules", "russian syntax word order", "is russian word order flexible", "russian free word order". Strong attested cluster. No search volume or difficulty figure is available: this project has no authenticated Search Console, no Keyword Planner and no third-party keyword tool.
- **Why it is a separate page:** The cases article explains why word order can move; it does not explain what moving it actually communicates. (closest existing article: `batting-order-strategy-explained`, similarity **0.36**)
- **First-party angle (only we can write this):** How our reading exercises were rewritten to vary word order deliberately, after learners trained on fixed subject-verb-object sentences stalled on real Russian text.
- **Inbound link required from:** `learn-russian-cyrillic-beginners-guide`
- **Outbound internal links:** `russian-cases-explained-for-beginners`, `choosing-russian-verb-aspect`, `russian-verbs-of-motion`, `russian-vowel-reduction`
- **CTA:** Google Play listing — https://play.google.com/store/apps/details?id=com.reigncreative.learnrussianlanguage
- **Supporting terms:** russian word order vs english; russian word order emphasis; russian word order rules; russian syntax word order; is russian word order flexible; russian word order examples
- **Long-tail:** is russian word order really free; how does russian word order change meaning; default word order in russian sentences; why russian word order matters for emphasis; russian word order for beginners
- **Questions to answer directly:** Is Russian word order free? / How does word order change emphasis in Russian? / What is the default Russian sentence order? / Why can Russian move words around when English cannot?

#### Russian Cursive Handwriting: Reading It and Writing It

`russian-cursive-handwriting-guide` · `language-learning` · `how-to` · `informational` · app: `learn-russian` · disclaimer: `language`

- **Primary keyword:** "russian cursive handwriting"
- **Demand tier:** `unverified-high` — *a judgement label about evidence strength, not a measurement*
- **Evidence observed:** Google autocomplete, captured 2026-09-15 via suggestqueries.google.com (client=firefox, hl=en, gl=us). "russian cursive handwriting" returned "russian cursive handwriting generator", "russian cursive handwriting practice", "russian cursive handwriting alphabet", "russian cursive handwriting workbook pdf"; the seed "russian handwriting" returned "russian handwriting cursive", "russian handwriting practice", "russian handwriting alphabet". No search volume or difficulty figure is available: this project has no authenticated Search Console, no Keyword Planner and no third-party keyword tool.
- **Why it is a separate page:** The Cyrillic beginner guide teaches the printed alphabet only; cursive is a separate reading and writing skill it does not cover. (closest existing article: `learn-russian-cyrillic-beginners-guide`, similarity **0.33**)
- **First-party angle (only we can write this):** Why our Cyrillic unit shows printed and cursive forms side by side from the first lesson, after learners who met cursive later reported it felt like a second alphabet.
- **Inbound link required from:** `learn-russian-cyrillic-beginners-guide`
- **Outbound internal links:** `learn-russian-cyrillic-beginners-guide`, `russian-vowel-reduction`, `russian-word-order-and-emphasis`, `russian-cases-explained-for-beginners`
- **CTA:** Google Play listing — https://play.google.com/store/apps/details?id=com.reigncreative.learnrussianlanguage
- **Supporting terms:** russian cursive handwriting practice; russian cursive handwriting alphabet; russian handwriting; russian cursive letters; how to write russian cursive; russian handwriting practice sheets
- **Long-tail:** why is russian cursive so hard to read; how to learn russian cursive handwriting; russian cursive alphabet chart; difference between russian print and cursive; do russians still write in cursive
- **Questions to answer directly:** Why is Russian cursive so hard to read? / Which Russian cursive letters look alike? / Do Russians still write in cursive? / How do you practise Russian handwriting?

#### Russian Vowel Reduction: Why Written and Spoken Russian Differ

`russian-vowel-reduction` · `language-learning` · `beginner` · `informational` · app: `learn-russian` · disclaimer: `language`

- **Primary keyword:** "russian vowel reduction"
- **Demand tier:** `unverified-high` — *a judgement label about evidence strength, not a measurement*
- **Evidence observed:** Google autocomplete, captured 2026-09-15 via suggestqueries.google.com (client=firefox, hl=en, gl=us). "russian vowel reduction" returned "russian vowel reduction rules", "russian vowel reduction chart", "russian reduced vowels", "what is vowel reduction", "vowel reduction examples"; the seed "russian pronunciation" returned "russian pronunciation guide", "russian pronunciation practice", "russian pronunciation audio". No search volume or difficulty figure is available: this project has no authenticated Search Console, no Keyword Planner and no third-party keyword tool.
- **Why it is a separate page:** The Cyrillic guide teaches letter-to-sound mapping; reduction is the systematic exception to that mapping and needs its own explanation. (closest existing article: `how-long-does-it-take-to-learn-russian`, similarity **0.35**)
- **First-party angle (only we can write this):** Why our Russian audio is recorded at natural speed with reduction intact rather than over-enunciated, and the complaint that decision reliably generates from beginners.
- **Inbound link required from:** `learn-russian-cyrillic-beginners-guide`
- **Outbound internal links:** `learn-russian-cyrillic-beginners-guide`, `russian-cursive-handwriting-guide`, `choosing-russian-verb-aspect`, `how-long-does-it-take-to-learn-russian`
- **CTA:** Google Play listing — https://play.google.com/store/apps/details?id=com.reigncreative.learnrussianlanguage
- **Supporting terms:** russian vowel reduction rules; russian vowel reduction chart; russian reduced vowels; akanye russian; russian stress and pronunciation; what is vowel reduction
- **Long-tail:** why does russian o sound like a; how does russian vowel reduction work; russian unstressed vowel pronunciation; why russian words sound different from their spelling; russian stress rules for beginners
- **Questions to answer directly:** What is vowel reduction in Russian? / Why does the Russian letter o sound like a? / How do you know which Russian syllable is stressed? / Do all unstressed Russian vowels reduce?

#### What Caused the Bronze Age Collapse?

`what-caused-the-bronze-age-collapse` · `education-brain` · `faq` · `informational` · app: `world-history-timeline-sim` · disclaimer: `none`

- **Primary keyword:** "what caused the bronze age collapse"
- **Demand tier:** `unverified-high` — *a judgement label about evidence strength, not a measurement*
- **Evidence observed:** Google autocomplete, captured 2026-09-15 via suggestqueries.google.com (client=firefox, hl=en, gl=us). "bronze age collapse" returned "bronze age collapse date", "bronze age collapse cause", "bronze age collapse timeline", "bronze age collapse year", "bronze age collapse sea peoples reddit" (10 suggestions); the exact question phrasing returned its own cluster. No search volume or difficulty figure is available: this project has no authenticated Search Console, no Keyword Planner and no third-party keyword tool.
- **Why it is a separate page:** major-eras-of-world-history sketches the periods at a high level; no article on the site examines a single collapse event or the evidence for competing causes. (closest existing article: `major-eras-of-world-history`, similarity **0.02**)
- **First-party angle (only we can write this):** How the app represents a multi-cause collapse on a timeline that otherwise wants single dated events, and the compromise we made in the data model to do it.
- **Inbound link required from:** `major-eras-of-world-history`
- **Outbound internal links:** `major-eras-of-world-history`, `world-history-timeline-guide`, `how-historians-date-events`, `why-rome-fell`
- **CTA:** Google Play listing — https://play.google.com/store/apps/details?id=com.reigncreative.history
- **Supporting terms:** bronze age collapse; bronze age collapse cause; sea peoples; bronze age collapse date; late bronze age collapse; bronze age collapse timeline
- **Long-tail:** why did the bronze age civilisations collapse; who were the sea peoples; when was the bronze age collapse; did drought cause the bronze age collapse; what survived the bronze age collapse
- **Questions to answer directly:** What caused the Bronze Age collapse? / Who were the Sea Peoples? / When did the Bronze Age collapse happen? / Which civilisations survived it?

#### Why Did Rome Fall? Four Explanations and What They Assume

`why-rome-fell` · `education-brain` · `faq` · `informational` · app: `world-history-timeline-sim` · disclaimer: `none`

- **Primary keyword:** "why did rome fall"
- **Demand tier:** `unverified-high` — *a judgement label about evidence strength, not a measurement*
- **Evidence observed:** Google autocomplete, captured 2026-09-15 via suggestqueries.google.com (client=firefox, hl=en, gl=us). "fall of rome" returned "fall of rome date", "fall of rome year", "fall of rome 476", "fall of rome books" (10 suggestions). No search volume or difficulty figure is available: this project has no authenticated Search Console, no Keyword Planner and no third-party keyword tool.
- **Why it is a separate page:** The eras article mentions Rome in passing as a period boundary; nothing on the site examines the causal debate or the dating problem. (closest existing article: `how-historians-date-events`, similarity **0.04**)
- **First-party angle (only we can write this):** Why the app places the fall of Rome as a range rather than a single year on the timeline, and the objection that design choice attracts from users.
- **Inbound link required from:** `major-eras-of-world-history`
- **Outbound internal links:** `major-eras-of-world-history`, `how-historians-date-events`, `what-caused-the-bronze-age-collapse`, `primary-vs-secondary-sources`
- **CTA:** Google Play listing — https://play.google.com/store/apps/details?id=com.reigncreative.history
- **Supporting terms:** fall of rome; fall of rome date; fall of rome 476; why did the roman empire fall; decline of the roman empire; when did rome fall
- **Long-tail:** what year did rome actually fall; was 476 really the end of rome; did christianity cause the fall of rome; why do historians disagree about the fall of rome; did rome fall or transform
- **Questions to answer directly:** Why did the Roman Empire fall? / What year did Rome fall? / Did Rome fall all at once? / Why do historians disagree about the cause?

#### What Was the Silk Road? Routes, Goods and Who Actually Travelled

`the-silk-road-for-beginners` · `education-brain` · `beginner` · `informational` · app: `world-history-timeline-sim` · disclaimer: `none`

- **Primary keyword:** "what was the silk road"
- **Demand tier:** `unverified-medium` — *a judgement label about evidence strength, not a measurement*
- **Evidence observed:** Google autocomplete, captured 2026-09-15 via suggestqueries.google.com (client=firefox, hl=en, gl=us). "silk road" returned "silk road map", "silk road movie", "silk roads book" among 10 suggestions, heavily mixed with local-business results - an observed SERP-composition note, not a volume claim. The history-specific intent is attested by "silk road map" and "silk roads book". No search volume or difficulty figure is available: this project has no authenticated Search Console, no Keyword Planner and no third-party keyword tool.
- **Why it is a separate page:** No article on the site covers trade networks; the eras article treats periods rather than connections between them. (closest existing article: `color-theory-for-beginners`, similarity **0.05**)
- **First-party angle (only we can write this):** Why the app models the Silk Road as a corridor across several timeline entries rather than one event, and what that let us show about simultaneity.
- **Inbound link required from:** `world-history-timeline-guide`
- **Outbound internal links:** `major-eras-of-world-history`, `world-history-timeline-guide`, `how-to-study-history-on-your-own`, `how-calendars-and-dating-systems-work`
- **CTA:** Google Play listing — https://play.google.com/store/apps/details?id=com.reigncreative.history
- **Supporting terms:** silk road; silk road map; silk road history; silk road trade goods; silk road routes; who travelled the silk road
- **Long-tail:** was the silk road a single road; what was traded on the silk road; how long did the silk road last; did marco polo travel the whole silk road; what ended the silk road
- **Questions to answer directly:** What was the Silk Road? / Was the Silk Road one road or many? / What was traded along it? / When did the Silk Road decline?

#### How to Remember Historical Dates Without Rote Drilling

`how-to-remember-historical-dates` · `education-brain` · `strategy` · `informational` · app: `world-history-timeline-sim` · disclaimer: `none`

- **Primary keyword:** "how to remember historical dates"
- **Demand tier:** `unverified-medium` — *a judgement label about evidence strength, not a measurement*
- **Evidence observed:** Google autocomplete, captured 2026-09-15 via suggestqueries.google.com (client=firefox, hl=en, gl=us). "how to study history" returned "how to study history effectively", "how to study history on your own", "how to study history easily" (10 suggestions); the date-specific intent is attested by "how to memorize numbers" returning "how to remember numbers" and by the history study cluster. The exact phrase "how to remember historical dates" is proposed on that adjacent evidence rather than an exact-match suggestion. No search volume or difficulty figure is available: this project has no authenticated Search Console, no Keyword Planner and no third-party keyword tool.
- **Why it is a separate page:** memory-techniques-that-work covers general recall methods; this is specific to dates and sequences and links the technique to timeline use. (closest existing article: `how-historians-date-events`, similarity **0.03**)
- **First-party angle (only we can write this):** Why the app tests sequence before exact year, and the scoring change we made after users who could order events still failed year-only questions.
- **Inbound link required from:** `memory-techniques-that-work`
- **Outbound internal links:** `memory-techniques-that-work`, `how-to-study-history-on-your-own`, `world-history-timeline-guide`, `major-eras-of-world-history`
- **CTA:** Google Play listing — https://play.google.com/store/apps/details?id=com.reigncreative.history
- **Supporting terms:** how to memorise dates for history; history revision techniques; remembering dates for exams; history date memory tricks; how to study history dates; timeline memorisation
- **Long-tail:** best way to remember dates in history; how to memorise history dates fast; why do i forget historical dates; history date mnemonics that work; how to revise history timelines
- **Questions to answer directly:** How do you remember historical dates? / Is memorising dates worth it? / What is date anchoring? / How do timelines help with recall?

#### How to Study History on Your Own Without a Syllabus

`how-to-study-history-on-your-own` · `education-brain` · `workflow` · `informational` · app: `world-history-timeline-sim` · disclaimer: `none`

- **Primary keyword:** "how to study history on your own"
- **Demand tier:** `unverified-high` — *a judgement label about evidence strength, not a measurement*
- **Evidence observed:** Google autocomplete, captured 2026-09-15 via suggestqueries.google.com (client=firefox, hl=en, gl=us). "how to study history" returned "how to study history on your own", "how to study history effectively", "how to study history as a hobby", "how to study history reddit", "how to study history easily" (10 suggestions). No search volume or difficulty figure is available: this project has no authenticated Search Console, no Keyword Planner and no third-party keyword tool.
- **Why it is a separate page:** primary-vs-secondary-sources covers source evaluation only; nothing on the site sets out a self-study routine. (closest existing article: `history-of-shoot-em-up-games`, similarity **0.38**)
- **First-party angle (only we can write this):** How we use the app timeline as a spine for self-study, and the honest limitation: a timeline gives you sequence, not argument, so it cannot be the whole method.
- **Inbound link required from:** `primary-vs-secondary-sources`
- **Outbound internal links:** `primary-vs-secondary-sources`, `how-to-remember-historical-dates`, `building-a-daily-practice-habit`, `how-historians-date-events`
- **CTA:** Google Play listing — https://play.google.com/store/apps/details?id=com.reigncreative.history
- **Supporting terms:** how to study history effectively; how to learn history as a hobby; self study history; history reading plan; how to study history easily; learning history without a teacher
- **Long-tail:** how do i teach myself history; best way to study history alone; how to build a history reading list; how to take notes on history books; how to study history as a hobby
- **Questions to answer directly:** How do you study history on your own? / Where should a self-taught history reader start? / How do you take useful history notes? / How do you check a history source?

#### Counterfactual History: What If Questions, Taken Seriously

`counterfactual-history-and-what-if-scenarios` · `education-brain` · `feature-explainer` · `informational` · app: `world-history-timeline-sim` · disclaimer: `none`

- **Primary keyword:** "what is counterfactual history"
- **Demand tier:** `unverified-low` — *a judgement label about evidence strength, not a measurement*
- **Evidence observed:** The exact phrase returned a thin Google autocomplete cluster on 2026-09-15; the adjacent attested seeds are "what caused" (which returned ten cause-and-effect history questions) and "cold war explained". No measured volume available; this topic is proposed primarily on app relevance, because the app ships a Time Travel Mode built on exactly this idea, and on the intent quality of the question. No search volume or difficulty figure is available: this project has no authenticated Search Console, no Keyword Planner and no third-party keyword tool.
- **Why it is a separate page:** Nothing on the site discusses historical causation or counterfactual reasoning; the existing history articles are descriptive. (closest existing article: `history-of-shoot-em-up-games`, similarity **0.38**)
- **First-party angle (only we can write this):** How Time Travel Mode decides which consequences follow a changed decision, what we deliberately refused to model, and why we label its outcomes as scenarios rather than predictions.
- **Inbound link required from:** `world-history-timeline-guide`
- **Outbound internal links:** `how-historians-date-events`, `primary-vs-secondary-sources`, `world-history-timeline-guide`, `why-rome-fell`
- **CTA:** Google Play listing — https://play.google.com/store/apps/details?id=com.reigncreative.history
- **Supporting terms:** counterfactual history; what if history scenarios; alternate history vs counterfactual; historical causation; what if questions in history; time travel mode history game
- **Long-tail:** what is counterfactual history used for; is alternate history the same as counterfactual history; do historians take what if questions seriously; how do you test a historical counterfactual; what if scenarios in history teaching
- **Questions to answer directly:** What is counterfactual history? / Do historians use what-if questions? / How is it different from alternate history fiction? / What are the limits of counterfactual reasoning?

#### Choosing a History App for Students: What to Look For

`choosing-a-history-app-for-students` · `education-brain` · `best-for` · `commercial` · app: `world-history-timeline-sim` · disclaimer: `comparison`

- **Primary keyword:** "best history app for students"
- **Demand tier:** `unverified-medium` — *a judgement label about evidence strength, not a measurement*
- **Evidence observed:** Google autocomplete, captured 2026-09-15 via suggestqueries.google.com (client=firefox, hl=en, gl=us). "history timeline app" returned "history timeline app free", "world history timeline app", "best history timeline app", "history timeline maker app" (10 suggestions); "history for kids" returned a further ten education-oriented suggestions. No search volume or difficulty figure is available: this project has no authenticated Search Console, no Keyword Planner and no third-party keyword tool.
- **Why it is a separate page:** world-history-timeline-guide is a guide to our own app; this is a category decision guide that must name alternatives and say when they win. (closest existing article: `world-history-timeline-guide`, similarity **0.46**)
- **First-party angle (only we can write this):** What our app deliberately does not do - it is not a curriculum, has no assessment reporting and no teacher dashboard - and which readers should therefore look elsewhere.
- **Inbound link required from:** `world-history-timeline-guide`
- **Outbound internal links:** `world-history-timeline-guide`, `how-to-study-history-on-your-own`, `primary-vs-secondary-sources`, `counterfactual-history-and-what-if-scenarios`
- **CTA:** Google Play listing — https://play.google.com/store/apps/details?id=com.reigncreative.history
- **Supporting terms:** history timeline app; best history app; history apps for high school; world history timeline app; history revision app; history learning app
- **Long-tail:** what is the best history app for students; are history apps useful for revision; history timeline app for classroom; free apps for learning world history; do history apps help with exams
- **Questions to answer directly:** What should a student look for in a history app? / Are history apps useful for revision? / Which is better for history, an app or a textbook? / Are there free options for learning world history?

#### How to Divide in Your Head: Methods That Survive Real Numbers

`mental-division-tricks` · `education-brain` · `how-to` · `informational` · app: `mental-math-memory-games` · disclaimer: `none`

- **Primary keyword:** "mental division tricks"
- **Demand tier:** `unverified-medium` — *a judgement label about evidence strength, not a measurement*
- **Evidence observed:** Google autocomplete, captured 2026-09-15 via suggestqueries.google.com (client=firefox, hl=en, gl=us). "mental math" returned "mental math tricks", "mental math practice", "mental math trainer", "mental math problems" (10 suggestions); "speed math" returned a further ten. The division-specific phrasing is proposed on that cluster plus the existing on-site gap. No search volume or difficulty figure is available: this project has no authenticated Search Console, no Keyword Planner and no third-party keyword tool.
- **Why it is a separate page:** The site covers multiplication shortcuts, general tricks, estimation and percentages, but division has no page of its own. (closest existing article: `mental-math-tricks-that-work`, similarity **0.56**)
- **First-party angle (only we can write this):** Which division methods we put in the app as taught techniques rather than only drilled questions, and the one we removed because it only worked on contrived numbers.
- **Inbound link required from:** `multiplication-shortcuts-explained`
- **Outbound internal links:** `multiplication-shortcuts-explained`, `mental-math-tricks-that-work`, `estimation-techniques-explained`, `percentages-in-your-head`
- **CTA:** Google Play listing — https://play.google.com/store/apps/details?id=com.reigncreative.mentalmathchampion
- **Supporting terms:** how to divide in your head; division shortcuts; divisibility rules; mental maths division; fast division methods; long division alternatives
- **Long-tail:** how to do division in your head quickly; divisibility rules for 3 7 and 11; how to divide by 5 mentally; mental division with remainders; fastest way to divide big numbers mentally
- **Questions to answer directly:** How do you divide numbers in your head? / What are the divisibility rules? / How do you handle remainders mentally? / Is halving and doubling faster than long division?

#### Do Brain Training Apps Work? What the Evidence Supports

`do-brain-training-apps-work` · `education-brain` · `faq` · `commercial` · app: `mental-math-memory-games` · disclaimer: `comparison`

- **Primary keyword:** "do brain training apps work"
- **Demand tier:** `unverified-high` — *a judgement label about evidence strength, not a measurement*
- **Evidence observed:** Google autocomplete, captured 2026-09-15 via suggestqueries.google.com (client=firefox, hl=en, gl=us). "brain training apps" returned "brain training apps that actually work", "brain training apps free", "brain training apps without subscription", "brain training apps review", "brain training apps reddit" (10 suggestions). The "that actually work" suggestion is a direct skepticism signal. No search volume or difficulty figure is available: this project has no authenticated Search Console, no Keyword Planner and no third-party keyword tool.
- **Why it is a separate page:** working-memory-and-training explains the construct; this addresses the commercial claim and the transfer question head-on, which that article does not. (closest existing article: `how-calendars-and-dating-systems-work`, similarity **0.26**)
- **First-party angle (only we can write this):** What our app claims and what it does not: we measure improvement on the drills themselves and make no claim about general cognition, and this article says so in our own words.
- **Inbound link required from:** `working-memory-and-training`
- **Outbound internal links:** `working-memory-and-training`, `memory-techniques-that-work`, `mental-math-training-guide`, `how-quiz-difficulty-works`
- **CTA:** Google Play listing — https://play.google.com/store/apps/details?id=com.reigncreative.mentalmathchampion
- **Supporting terms:** brain training apps that actually work; are brain training games effective; brain training apps review; do memory games improve memory; cognitive training evidence; brain training without subscription
- **Long-tail:** do brain training apps actually improve memory; is lumosity backed by science; does brain training transfer to real life; are brain training apps a scam; which brain training apps are free
- **Questions to answer directly:** Do brain training apps actually work? / Does practice transfer to other skills? / What have regulators said about brain training claims? / Are free brain training apps any good?

#### Designing Memory Games That Are Not Just Matching Pairs

`designing-memory-games-beyond-matching-pairs` · `education-brain` · `case-study` · `informational` · app: `mental-math-memory-games` · disclaimer: `none`

- **Primary keyword:** "memory game design"
- **Demand tier:** `unverified-medium` — *a judgement label about evidence strength, not a measurement*
- **Evidence observed:** Google autocomplete, captured 2026-09-15 via suggestqueries.google.com (client=firefox, hl=en, gl=us). "memory game design" returned "memory game design ideas", "matching game design", "memory game development", "memory card game design", "memory game ui design" (8 suggestions); the separate seed "memory games" returned ten audience-qualified variants. No search volume or difficulty figure is available: this project has no authenticated Search Console, no Keyword Planner and no third-party keyword tool.
- **Why it is a separate page:** how-quiz-difficulty-works covers question difficulty in the trivia sense; this is about memory task design specifically and is written from build experience. (closest existing article: `memory-techniques-that-work`, similarity **0.4**)
- **First-party angle (only we can write this):** The memory formats we shipped, the two we cut after they measured attention rather than memory, and the span limits we settled on for each.
- **Inbound link required from:** `how-quiz-difficulty-works`
- **Outbound internal links:** `memory-techniques-that-work`, `working-memory-and-training`, `how-quiz-difficulty-works`, `do-brain-training-apps-work`
- **CTA:** Google Play listing — https://play.google.com/store/apps/details?id=com.reigncreative.mentalmathchampion
- **Supporting terms:** memory game design ideas; memory game development; memory card game design; types of memory games; what is a memory game; memory game mechanics
- **Long-tail:** how do you design a memory game; what makes a memory game hard; memory game formats other than matching pairs; how to scale difficulty in a memory game; what skills do memory games train
- **Questions to answer directly:** How do you design a memory game? / What makes a memory game difficult? / Are matching pairs the only memory game format? / What does a memory game actually train?

#### Shonen vs Seinen: What the Labels Actually Mean

`shonen-vs-seinen` · `anime-creative` · `comparison` · `informational` · app: `anime-trivia-word-games` · disclaimer: `none`

- **Primary keyword:** "shonen vs seinen"
- **Demand tier:** `unverified-high` — *a judgement label about evidence strength, not a measurement*
- **Evidence observed:** Google autocomplete, captured 2026-09-15 via suggestqueries.google.com (client=firefox, hl=en, gl=us). "shonen vs seinen" returned "shonen vs seinen vs shoujo vs josei", "shonen vs seinen anime", "shonen vs seinen meaning", "shonen vs seinen difference", "shonen vs seinen art style" (10 suggestions). Strong comparison intent. No search volume or difficulty figure is available: this project has no authenticated Search Console, no Keyword Planner and no third-party keyword tool.
- **Why it is a separate page:** anime-genres-explained covers genre labels; demographic labels are a different classification axis and are the ones people confuse. (closest existing article: `anime-genres-explained`, similarity **0.05**)
- **First-party angle (only we can write this):** How our trivia question bank tags demographic separately from genre, and the batch of questions we had to rewrite when the two tags were conflated.
- **Inbound link required from:** `anime-genres-explained`
- **Outbound internal links:** `anime-genres-explained`, `anime-terminology-glossary`, `manga-vs-anime-differences`, `anime-trivia-quiz-guide`
- **CTA:** Google Play listing — https://play.google.com/store/apps/details?id=com.reigncreative.animetrivia
- **Supporting terms:** shonen vs seinen vs shoujo; shonen vs seinen meaning; shonen vs seinen difference; anime demographics explained; josei vs seinen; what does shonen mean
- **Long-tail:** what is the difference between shonen and seinen; is shonen a genre or a demographic; can an anime be both shonen and seinen; shonen vs seinen art style differences; which is more mature shonen or seinen
- **Questions to answer directly:** What is the difference between shonen and seinen? / Are they genres or demographics? / Can a series change category? / Which magazines publish each?

#### Manga vs Anime: Why the Same Story Ends Differently

`manga-vs-anime-differences` · `anime-creative` · `comparison` · `informational` · app: `anime-trivia-word-games` · disclaimer: `none`

- **Primary keyword:** "manga vs anime difference"
- **Demand tier:** `unverified-high` — *a judgement label about evidence strength, not a measurement*
- **Evidence observed:** Google autocomplete, captured 2026-09-15 via suggestqueries.google.com (client=firefox, hl=en, gl=us). "manga vs anime" returned "manga vs anime difference", "manga vs anime one piece", "manga vs anime ending aot", "manga vs anime vs manhwa", "manga vs anime naruto" (10 suggestions). No search volume or difficulty figure is available: this project has no authenticated Search Console, no Keyword Planner and no third-party keyword tool.
- **Why it is a separate page:** anime-terminology-glossary defines terms; this explains the adaptation relationship and the divergence problem, which the glossary does not cover. (closest existing article: `anime-terminology-glossary`, similarity **0.36**)
- **First-party angle (only we can write this):** The sourcing rule our trivia bank uses when anime and manga disagree, and why questions that depend on an anime-original ending are tagged separately.
- **Inbound link required from:** `anime-terminology-glossary`
- **Outbound internal links:** `anime-terminology-glossary`, `anime-genres-explained`, `shonen-vs-seinen`, `anime-trivia-quiz-guide`
- **CTA:** Google Play listing — https://play.google.com/store/apps/details?id=com.reigncreative.animetrivia
- **Supporting terms:** manga vs anime; manga vs anime reddit; manga vs anime endings; anime original ending; filler episodes; adaptation differences anime
- **Long-tail:** why do anime and manga endings differ; what is an anime original ending; why does anime have filler; should i read the manga or watch the anime first; how faithful are anime adaptations
- **Questions to answer directly:** What is the difference between manga and anime? / Why do anime endings differ from the manga? / What is filler? / Should you read the manga first?

#### How to Shade Anime Hair: Blocks, Bands and Highlights

`how-to-shade-anime-hair` · `anime-creative` · `how-to` · `informational` · app: `anime-coloring-book` · disclaimer: `none`

- **Primary keyword:** "how to shade anime hair"
- **Demand tier:** `unverified-high` — *a judgement label about evidence strength, not a measurement*
- **Evidence observed:** Google autocomplete, captured 2026-09-15 via suggestqueries.google.com (client=firefox, hl=en, gl=us). "how to shade anime hair" returned "how to shade anime", "how to shade anime eyes", "how to shade anime faces", "how to shade anime skin", "how to shade anime hair with pencil" (10 suggestions); "anime hair coloring" returned "anime hair coloring tutorial" and "anime hair coloring guide". One of the strongest attested clusters in the creative category. No search volume or difficulty figure is available: this project has no authenticated Search Console, no Keyword Planner and no third-party keyword tool.
- **Why it is a separate page:** digital-coloring-techniques covers tools and general method; hair is the specific subject people search for and it is not covered. (closest existing article: `color-palettes-for-anime-art`, similarity **0.35**)
- **First-party angle (only we can write this):** Why our colouring app keeps hair as separate fill regions rather than one shape, and the zoom threshold we set so highlight bands stay tappable on a phone.
- **Inbound link required from:** `digital-coloring-techniques`
- **Outbound internal links:** `digital-coloring-techniques`, `color-palettes-for-anime-art`, `line-art-and-flats-explained`, `anime-hair-colour-meanings`
- **CTA:** Google Play listing — https://play.google.com/store/apps/details?id=reigncreative.animecoloringbook
- **Supporting terms:** anime hair shading; how to shade anime; anime hair highlights; cel shading hair; anime hair coloring tutorial; how to color anime hair digitally
- **Long-tail:** how do you shade anime hair step by step; where to put the highlight on anime hair; anime hair shading on a phone; how to shade anime hair with flat colours; why does my anime hair shading look muddy
- **Questions to answer directly:** How do you shade anime hair? / Where does the highlight band go? / Should anime hair use gradients or flat blocks? / What order should you shade hair in?

#### Anime Hair Colours and the Meanings People Read Into Them

`anime-hair-colour-meanings` · `anime-creative` · `listicle` · `informational` · app: `anime-coloring-book` · disclaimer: `none`

- **Primary keyword:** "anime hair color meaning"
- **Demand tier:** `unverified-high` — *a judgement label about evidence strength, not a measurement*
- **Evidence observed:** Google autocomplete, captured 2026-09-15 via suggestqueries.google.com (client=firefox, hl=en, gl=us). "anime hair coloring" returned "anime hair color meaning", "anime hair color quiz", "anime hair color male", "anime hair color ideas", "anime hair color palette" (10 suggestions). No search volume or difficulty figure is available: this project has no authenticated Search Console, no Keyword Planner and no third-party keyword tool.
- **Why it is a separate page:** color-palettes-for-anime-art is about building palettes; this is about the conventions behind specific hair colours, which is a different question. (closest existing article: `color-palettes-for-anime-art`, similarity **0.53**)
- **First-party angle (only we can write this):** Which hair colours appear most often across our own line-art library and the palette presets we built around them.
- **Inbound link required from:** `color-palettes-for-anime-art`
- **Outbound internal links:** `color-palettes-for-anime-art`, `anime-art-styles-explained`, `how-to-shade-anime-hair`, `color-theory-for-beginners`
- **CTA:** Google Play listing — https://play.google.com/store/apps/details?id=reigncreative.animecoloringbook
- **Supporting terms:** anime hair color; anime hair color palette; anime hair color ideas; why do anime characters have colored hair; anime hair color symbolism; anime hair color quiz
- **Long-tail:** what does pink hair mean in anime; why do anime characters have unnatural hair colours; anime hair colour personality associations; which anime hair colours are most common; do anime hair colours mean anything
- **Questions to answer directly:** Do anime hair colours have meanings? / Why do anime characters have unnatural hair colours? / What does white hair usually signal? / Are these conventions still followed?

#### How to Play MKV Files on Android When Nothing Opens Them

`how-to-play-mkv-files-on-android` · `video-utility` · `troubleshooting` · `informational` · app: `regal-video-player` · disclaimer: `none`

- **Primary keyword:** "how to play mkv files on android"
- **Demand tier:** `unverified-high` — *a judgement label about evidence strength, not a measurement*
- **Evidence observed:** Google autocomplete, captured 2026-09-15 via suggestqueries.google.com (client=firefox, hl=en, gl=us). "how to play mkv files on android" returned "how to play mkv files on android tv", "how to play mkv files on vlc android", "app to play mkv files on android", "best app to play mkv files on android", "mkv file not playing in android" (6 suggestions); "how to play mkv on android" separately returned "how to run mkv file on android" and "can you play mkv on android". No search volume or difficulty figure is available: this project has no authenticated Search Console, no Keyword Planner and no third-party keyword tool.
- **Why it is a separate page:** video-file-formats-explained defines containers; this is the failure-mode page that walks a broken file back to a cause, which the reference page does not do. (closest existing article: `android-video-player-guide`, similarity **0.46**)
- **First-party angle (only we can write this):** What our player does when it meets a codec the device cannot decode in hardware, and why we show the codec name in the error rather than a generic failure message.
- **Inbound link required from:** `video-file-formats-explained`
- **Outbound internal links:** `video-file-formats-explained`, `video-codecs-explained`, `hardware-vs-software-decoding`, `android-video-players-compared`
- **CTA:** Google Play listing — https://play.google.com/store/apps/details?id=com.reigncreative.regalvideoplayer
- **Supporting terms:** mkv file not playing in android; app to play mkv files on android; can you play mkv on android; mkv not supported android; how to open mkv on phone; best app to play mkv files on android
- **Long-tail:** why will my mkv file not play on android; what codec is inside my mkv file; does android support mkv natively; how to play mkv with subtitles on android; mkv plays audio but no video android
- **Questions to answer directly:** Why will an MKV file not play on Android? / Is MKV a codec or a container? / Which app plays MKV on Android? / Why does an MKV play sound but no picture?

#### Subtitles Not Working on Android: A Checklist That Finds It

`subtitles-not-working-on-android` · `video-utility` · `troubleshooting` · `informational` · app: `regal-video-player` · disclaimer: `none`

- **Primary keyword:** "subtitles not working on android"
- **Demand tier:** `unverified-high` — *a judgement label about evidence strength, not a measurement*
- **Evidence observed:** Google autocomplete, captured 2026-09-15 via suggestqueries.google.com (client=firefox, hl=en, gl=us). "subtitles not working on android" returned ten suggestions including "subtitles not working in vlc android", "subtitles not showing on youtube android", "plex subtitles not working android"; the seed "subtitles not working android" returned a parallel set. Note the suggestions are dominated by named streaming apps, which is an observed SERP-composition signal that a player-agnostic checklist is under-served. No search volume or difficulty figure is available: this project has no authenticated Search Console, no Keyword Planner and no third-party keyword tool.
- **Why it is a separate page:** subtitle-formats-explained is a format reference; this is the diagnostic page and targets a distinct failure-mode query. (closest existing article: `working-memory-and-training`, similarity **0.36**)
- **First-party angle (only we can write this):** The subtitle encodings our player falls back through when a file declares none, and why we surface the detected encoding in the track picker.
- **Inbound link required from:** `subtitle-formats-explained`
- **Outbound internal links:** `subtitle-formats-explained`, `android-video-players-compared`, `how-to-play-mkv-files-on-android`, `video-file-formats-explained`
- **CTA:** Google Play listing — https://play.google.com/store/apps/details?id=com.reigncreative.regalvideoplayer
- **Supporting terms:** subtitles not showing android; srt not working android; subtitle encoding problems; subtitles out of sync android; external subtitles android; subtitle track not selectable
- **Long-tail:** why are my subtitles not showing on android; how to load external srt on android; subtitles showing as question marks; how to fix out of sync subtitles; why do embedded subtitles not appear
- **Questions to answer directly:** Why are subtitles not showing on Android? / How do you load an external SRT file? / Why do subtitles appear as garbled characters? / How do you fix out-of-sync subtitles?


### Block 3 — Sports sims — two brand-new sports (tennis, rugby) plus the two thinnest existing sub-verticals (combat sports, golf)

#### Tennis Career Sim: Junior Circuit to the Top of the Rankings

`tennis-career-sim-guide` · `sports-gm` · `beginner` · `commercial` · app: `tennis-career-sim` · disclaimer: `none`

- **Primary keyword:** "tennis career sim game"
- **Demand tier:** `unverified-high` — *a judgement label about evidence strength, not a measurement*
- **Evidence observed:** Google autocomplete, captured 2026-09-15 via suggestqueries.google.com (client=firefox, hl=en, gl=us). "tennis career mode" returned "tennis career mode game", "best tennis career mode game", "tiebreak tennis career mode", "ao tennis career mode" (10 suggestions); "tennis career simulator" returned "tennis career simulator online", "tennis career sim game", "tennis player career simulator" (7 suggestions). No search volume or difficulty figure is available: this project has no authenticated Search Console, no Keyword Planner and no third-party keyword tool.
- **Why it is a separate page:** The site has career-sim guides for six sports and none for tennis; this app has zero article coverage. (closest existing article: `baseball-career-sim-guide`, similarity **0.69**)
- **First-party angle (only we can write this):** Which points the simulation actually hands to the player and which it resolves automatically, and why the cut-off is set where it is.
- **Inbound link required from:** `how-to-choose-a-sports-career-sim`
- **Outbound internal links:** `how-to-choose-a-sports-career-sim`, `how-player-career-modes-work`, `tennis-playing-styles`, `how-tennis-ranking-points-work`
- **CTA:** **No public Play listing for this app.** Link the on-site app page instead: https://reigncreativellc.com/apps/tennis-career-sim/
- **Supporting terms:** tennis career mode; tennis career simulator; tennis player career simulator; best tennis career mode game; tennis sim game; tennis career game android
- **Long-tail:** is there a tennis career mode game for android; what does a tennis career sim actually let you control; best tennis career mode game; how long is a season in a tennis career sim; tennis career simulator online
- **Questions to answer directly:** What is a tennis career simulator? / Do you play the points yourself? / How long does a tennis career take to play through? / Does the playing style change the game?

#### How Tennis Ranking Points Work, and Why Yours Go Down

`how-tennis-ranking-points-work` · `sports-gm` · `reference` · `informational` · app: `tennis-career-sim` · disclaimer: `none`

- **Primary keyword:** "tennis ranking points explained"
- **Demand tier:** `unverified-high` — *a judgement label about evidence strength, not a measurement*
- **Evidence observed:** Google autocomplete, captured 2026-09-15 via suggestqueries.google.com (client=firefox, hl=en, gl=us). "tennis ranking points" returned "tennis ranking points system", "tennis ranking points explained", "tennis ranking points per tournament", "tennis ranking points women", "tennis ranking points men" (10 suggestions); "atp ranking points explained" returned a further seven including "how are atp ranking points calculated". No search volume or difficulty figure is available: this project has no authenticated Search Console, no Keyword Planner and no third-party keyword tool.
- **Why it is a separate page:** No tennis content exists on the site at all; the nearest pages cover league tables and draft order for other sports. (closest existing article: `tdee-and-energy-balance`, similarity **0.22**)
- **First-party angle (only we can write this):** How our simulation implements point expiry on a rolling window and the scheduling pressure that creates, which is the mechanic players notice first.
- **Inbound link required from:** `understanding-sports-sim-probability`
- **Outbound internal links:** `tennis-career-sim-guide`, `tennis-ranking-decay-and-scheduling`, `how-tennis-qualifiers-work`, `understanding-sports-sim-probability`
- **CTA:** **No public Play listing for this app.** Link the on-site app page instead: https://reigncreativellc.com/apps/tennis-career-sim/
- **Supporting terms:** tennis ranking points; tennis ranking points system; atp ranking points explained; tennis ranking points per tournament; how are ranking points calculated; wta ranking points
- **Long-tail:** how are tennis ranking points calculated; why did my tennis ranking drop after a win; how long do tennis ranking points last; what is a rolling ranking window; how many points for winning a tournament
- **Questions to answer directly:** How are tennis ranking points calculated? / Why do ranking points expire? / What is a rolling 52-week window? / Can a player drop in the rankings after winning?

#### Tennis Playing Styles: Six Ways to Win a Point

`tennis-playing-styles` · `sports-gm` · `listicle` · `informational` · app: `tennis-career-sim` · disclaimer: `none`

- **Primary keyword:** "tennis playing styles"
- **Demand tier:** `unverified-high` — *a judgement label about evidence strength, not a measurement*
- **Evidence observed:** Google autocomplete, captured 2026-09-15 via suggestqueries.google.com (client=firefox, hl=en, gl=us). "tennis playing styles" returned "tennis playing styles explained", "tennis player styles", "tennis game styles", "tennis playing style quiz" (10 suggestions); "counterpuncher tennis" returned a further nine including "counterpuncher tennis meaning" and "counterpuncher tennis style". No search volume or difficulty figure is available: this project has no authenticated Search Console, no Keyword Planner and no third-party keyword tool.
- **Why it is a separate page:** The site explains positions and archetypes for basketball, football and soccer but has nothing on tennis. (closest existing article: `anime-art-styles-explained`, similarity **0.31**)
- **First-party angle (only we can write this):** How the six styles in our simulation differ in the choices they offer on a big point, rather than only in their attribute spreads.
- **Inbound link required from:** `tennis-career-sim-guide`
- **Outbound internal links:** `tennis-career-sim-guide`, `serve-and-volley-strategy`, `tennis-scoring-for-beginners`, `how-tennis-ranking-points-work`
- **CTA:** **No public Play listing for this app.** Link the on-site app page instead: https://reigncreativellc.com/apps/tennis-career-sim/
- **Supporting terms:** tennis player styles; counterpuncher tennis; aggressive baseliner; all court player tennis; tennis game styles; tennis playing style quiz
- **Long-tail:** what are the main tennis playing styles; what is a counterpuncher in tennis; which tennis style is best on clay; how do playing styles match up against each other; what style suits a tall player
- **Questions to answer directly:** What are the main playing styles in tennis? / What is a counterpuncher? / Which style works best on which surface? / Do styles beat each other predictably?

#### Tennis Scoring for Beginners: Games, Sets and Tiebreaks

`tennis-scoring-for-beginners` · `sports-gm` · `beginner` · `informational` · app: `tennis-career-sim` · disclaimer: `none`

- **Primary keyword:** "tennis scoring explained"
- **Demand tier:** `unverified-high` — *a judgement label about evidence strength, not a measurement*
- **Evidence observed:** Google autocomplete, captured 2026-09-15 via suggestqueries.google.com (client=firefox, hl=en, gl=us). "tennis scoring explained" returned "tennis scoring explained for dummies", "tennis scoring explained wimbledon", "tennis scoring explained for kids", "tennis scoring explained easy", "tennis scoring explained simply" (10 suggestions). No search volume or difficulty figure is available: this project has no authenticated Search Console, no Keyword Planner and no third-party keyword tool.
- **Why it is a separate page:** The site has scoring explainers for golf, boxing and soccer tables but nothing for tennis. (closest existing article: `golf-scoring-explained`, similarity **0.35**)
- **First-party angle (only we can write this):** How the simulation compresses a match to the decision points without breaking the scoring structure, and where that compression shows.
- **Inbound link required from:** `tennis-career-sim-guide`
- **Outbound internal links:** `tennis-career-sim-guide`, `tennis-playing-styles`, `how-tennis-qualifiers-work`, `golf-scoring-explained`
- **CTA:** **No public Play listing for this app.** Link the on-site app page instead: https://reigncreativellc.com/apps/tennis-career-sim/
- **Supporting terms:** tennis scoring; how does tennis scoring work; tennis scoring system; what is deuce in tennis; tennis tiebreak rules; tennis scoring for dummies
- **Long-tail:** why does tennis score 15 30 40; what does deuce mean in tennis; how many games win a set in tennis; how does a tiebreak work in tennis; what is a super tiebreak
- **Questions to answer directly:** How does tennis scoring work? / Why does tennis use 15, 30 and 40? / What is deuce? / How does a tiebreak work?

#### How Do Tennis Qualifiers Work?

`how-tennis-qualifiers-work` · `sports-gm` · `faq` · `informational` · app: `tennis-career-sim` · disclaimer: `none`

- **Primary keyword:** "how do tennis qualifiers work"
- **Demand tier:** `unverified-medium` — *a judgement label about evidence strength, not a measurement*
- **Evidence observed:** Google autocomplete, captured 2026-09-15 via suggestqueries.google.com (client=firefox, hl=en, gl=us). "how tennis qualifying works" returned "how does qualifying work in tennis", "how do tennis qualifiers work", "how us open tennis qualifying works", "do tennis qualifiers get paid" (4 suggestions). A smaller cluster than the other tennis topics but an exact question match. No search volume or difficulty figure is available: this project has no authenticated Search Console, no Keyword Planner and no third-party keyword tool.
- **Why it is a separate page:** Nothing on the site covers tournament entry mechanics for any sport; the golf cut article covers what happens after entry, not before. (closest existing article: `how-calendars-and-dating-systems-work`, similarity **0.31**)
- **First-party angle (only we can write this):** Why our career sim makes qualifying playable rather than simulated, and the pacing problem that created for players early in a career.
- **Inbound link required from:** `tennis-career-sim-guide`
- **Outbound internal links:** `tennis-career-sim-guide`, `how-tennis-ranking-points-work`, `how-golf-q-school-works`, `tennis-scoring-for-beginners`
- **CTA:** **No public Play listing for this app.** Link the on-site app page instead: https://reigncreativellc.com/apps/tennis-career-sim/
- **Supporting terms:** tennis qualifying; tennis qualifying draw; lucky loser tennis; tennis wildcard; how does qualifying work in tennis; tennis main draw entry
- **Long-tail:** how does tennis qualifying work at a grand slam; what is a lucky loser in tennis; how do you get a wildcard into a tennis tournament; how many rounds are in tennis qualifying; do tennis qualifiers get ranking points
- **Questions to answer directly:** How does tennis qualifying work? / What is a lucky loser? / How do wildcards get awarded? / Do qualifiers earn ranking points?

#### Serve and Volley: When It Still Wins and When It Gets Punished

`serve-and-volley-strategy` · `sports-gm` · `strategy` · `informational` · app: `tennis-career-sim` · disclaimer: `none`

- **Primary keyword:** "tennis serve and volley strategy"
- **Demand tier:** `unverified-high` — *a judgement label about evidence strength, not a measurement*
- **Evidence observed:** Google autocomplete, captured 2026-09-15 via suggestqueries.google.com (client=firefox, hl=en, gl=us). "tennis serve and volley" returned "tennis serve and volley strategy", "tennis serve and volley players", "tennis serve and volley drills", "tennis serve and volley tips", "tennis serve and volley meaning", "tennis serve and volley players today" (10 suggestions). No search volume or difficulty figure is available: this project has no authenticated Search Console, no Keyword Planner and no third-party keyword tool.
- **Why it is a separate page:** No tactical article exists for tennis; the nearest are soccer formations and reading a defense in football. (closest existing article: `how-fantasy-draft-strategy-works`, similarity **0.24**)
- **First-party angle (only we can write this):** How the simulation prices the serve-and-volley decision against surface and opponent return quality, and the balance pass that changed it.
- **Inbound link required from:** `tennis-playing-styles`
- **Outbound internal links:** `tennis-playing-styles`, `tennis-career-sim-guide`, `tennis-scoring-for-beginners`, `tennis-ranking-decay-and-scheduling`
- **CTA:** **No public Play listing for this app.** Link the on-site app page instead: https://reigncreativellc.com/apps/tennis-career-sim/
- **Supporting terms:** tennis serve and volley; serve and volley players; serve and volley drills; why did serve and volley decline; serve and volley on grass; chip and charge tennis
- **Long-tail:** is serve and volley still viable in modern tennis; when should you serve and volley; why did serve and volley die out; serve and volley on clay vs grass; how to beat a serve and volleyer
- **Questions to answer directly:** Does serve and volley still work? / On which surfaces is serve and volley strongest? / Why did serve and volley decline? / How do you counter a serve-and-volley player?

#### Ranking Decay and Schedule Planning in a Tennis Career

`tennis-ranking-decay-and-scheduling` · `sports-gm` · `developer-insight` · `informational` · app: `tennis-career-sim` · disclaimer: `none`

- **Primary keyword:** "how tennis ranking decay works"
- **Demand tier:** `unverified-low` — *a judgement label about evidence strength, not a measurement*
- **Evidence observed:** The exact phrase returned no Google autocomplete suggestions on 2026-09-15. The adjacent attested cluster is "tennis ranking points system" and "tennis ranking points per tournament" (google autocomplete, captured 2026-09-15 via suggestqueries.google.com (client=firefox, hl=en, gl=us).) plus "why did my tennis ranking drop" style questions in the same cluster. No measured volume available; proposed on intent quality and app relevance, since decay is a headline mechanic of this app. No search volume or difficulty figure is available: this project has no authenticated Search Console, no Keyword Planner and no third-party keyword tool.
- **Why it is a separate page:** how-tennis-ranking-points-work is the rules explainer; this is the design piece about what decay does to decision-making, written from build experience. (closest existing article: `how-player-career-modes-work`, similarity **0.21**)
- **First-party angle (only we can write this):** The decay window we implemented, the two we rejected, and the behaviour change we saw in testing once points started expiring.
- **Inbound link required from:** `how-to-choose-a-sports-career-sim`
- **Outbound internal links:** `how-tennis-ranking-points-work`, `tennis-career-sim-guide`, `how-to-choose-a-sports-career-sim`, `understanding-sports-sim-probability`
- **CTA:** **No public Play listing for this app.** Link the on-site app page instead: https://reigncreativellc.com/apps/tennis-career-sim/
- **Supporting terms:** tennis ranking points expire; defending ranking points; tennis schedule planning; rolling ranking window; tennis points drop off; career sim ranking system
- **Long-tail:** why do tennis ranking points expire; how do you plan a tennis schedule around points; what happens if you skip a tournament you won last year; how does ranking decay work in a sim; is defending points harder than earning them
- **Questions to answer directly:** Why do ranking points expire? / How should you plan a tennis schedule? / What happens if you skip a tournament you won? / How does a sim model ranking decay?

#### Rugby Positions by Number: Who Wears What and Why

`rugby-positions-and-numbers` · `sports-gm` · `reference` · `informational` · app: `rugby-draft-pro-league` · disclaimer: `none`

- **Primary keyword:** "rugby positions by number"
- **Demand tier:** `unverified-high` — *a judgement label about evidence strength, not a measurement*
- **Evidence observed:** Google autocomplete, captured 2026-09-15 via suggestqueries.google.com (client=firefox, hl=en, gl=us). "rugby positions" returned "rugby positions by number", "rugby positions explained", "rugby positions and roles", "rugby positions scrum", "rugby positions body types" (10 suggestions). No search volume or difficulty figure is available: this project has no authenticated Search Console, no Keyword Planner and no third-party keyword tool.
- **Why it is a separate page:** The site explains positions for football, soccer, hockey and basketball but has nothing for rugby; this app has zero article coverage. (closest existing article: `basketball-positions-explained`, similarity **0.33**)
- **First-party angle (only we can write this):** Which position attributes our draft pool actually distinguishes, and the two positions we had to merge in the data model because the difference did not survive simulation.
- **Inbound link required from:** `depth-charts-explained`
- **Outbound internal links:** `rugby-forwards-and-backs`, `how-rugby-scoring-works`, `depth-charts-explained`, `rugby-draft-and-squad-building`
- **CTA:** **No public Play listing for this app.** Link the on-site app page instead: https://reigncreativellc.com/apps/rugby-draft-pro-league/
- **Supporting terms:** rugby positions; rugby positions explained; rugby positions and roles; rugby positions scrum; rugby position numbers; rugby union positions
- **Long-tail:** what does the number 10 do in rugby; rugby positions by number and role; which rugby positions are forwards; what is a flanker in rugby; rugby positions body types
- **Questions to answer directly:** What do the rugby shirt numbers mean? / Which positions are forwards and which are backs? / What does the fly-half do? / Which position is the hardest?

#### Rugby Union vs Rugby League: The Rules That Diverge

`rugby-union-vs-rugby-league` · `sports-gm` · `comparison` · `informational` · app: `rugby-draft-pro-league` · disclaimer: `none`

- **Primary keyword:** "rugby union vs rugby league"
- **Demand tier:** `unverified-high` — *a judgement label about evidence strength, not a measurement*
- **Evidence observed:** Google autocomplete, captured 2026-09-15 via suggestqueries.google.com (client=firefox, hl=en, gl=us). "rugby union vs rugby league" returned "rugby union vs rugby league differences", "rugby union vs rugby league rules", "rugby union vs rugby league popularity", "rugby union vs rugby league which is better" (10 suggestions). No search volume or difficulty figure is available: this project has no authenticated Search Console, no Keyword Planner and no third-party keyword tool.
- **Why it is a separate page:** No rugby article exists on the site; the offside article covers soccer only. (closest existing article: `how-soccer-league-tables-work`, similarity **0.25**)
- **First-party angle (only we can write this):** Why our draft and season model implements rugby union rather than league, and the specific scoring and squad-size assumptions that choice locked in.
- **Inbound link required from:** `how-the-offside-rule-works`
- **Outbound internal links:** `rugby-positions-and-numbers`, `how-rugby-scoring-works`, `how-the-offside-rule-works`, `rugby-forwards-and-backs`
- **CTA:** **No public Play listing for this app.** Link the on-site app page instead: https://reigncreativellc.com/apps/rugby-draft-pro-league/
- **Supporting terms:** rugby union vs rugby league differences; rugby union vs rugby league rules; difference between union and league; 13 vs 15 rugby; rugby codes explained; rugby league tackle rule
- **Long-tail:** what is the difference between rugby union and rugby league; why does rugby league have six tackles; which rugby code is more popular; do union and league use the same scoring; can players switch between rugby codes
- **Questions to answer directly:** What is the difference between rugby union and rugby league? / How many players are on each side? / Do the two codes score differently? / Can players move between codes?

#### How Rugby Scoring Works: Tries, Conversions and Drop Goals

`how-rugby-scoring-works` · `sports-gm` · `beginner` · `informational` · app: `rugby-draft-pro-league` · disclaimer: `none`

- **Primary keyword:** "rugby scoring system"
- **Demand tier:** `unverified-high` — *a judgement label about evidence strength, not a measurement*
- **Evidence observed:** Google autocomplete, captured 2026-09-15 via suggestqueries.google.com (client=firefox, hl=en, gl=us). "rugby scoring" returned "rugby scoring system", "rugby scoring rules", "rugby scoring plays", "rugby scoring explained", "rugby scoring points", "rugby scoring terms" (10 suggestions). No search volume or difficulty figure is available: this project has no authenticated Search Console, no Keyword Planner and no third-party keyword tool.
- **Why it is a separate page:** The site has scoring explainers for golf, boxing and soccer; rugby has none. (closest existing article: `boxing-scoring-explained`, similarity **0.39**)
- **First-party angle (only we can write this):** How the season simulator weights kicking accuracy against try-scoring, and why a squad built purely on pace underperforms in our model.
- **Inbound link required from:** `rugby-union-vs-rugby-league`
- **Outbound internal links:** `rugby-positions-and-numbers`, `rugby-union-vs-rugby-league`, `rugby-draft-and-squad-building`, `golf-scoring-explained`
- **CTA:** **No public Play listing for this app.** Link the on-site app page instead: https://reigncreativellc.com/apps/rugby-draft-pro-league/
- **Supporting terms:** rugby scoring; rugby scoring rules; rugby scoring explained; how many points is a try; rugby conversion points; rugby drop goal value
- **Long-tail:** how many points is a try worth in rugby; why is the conversion taken from where the try was scored; can a rugby match end in a draw; what is a penalty try; rugby scoring differences union and league
- **Questions to answer directly:** How many points is a try worth? / Why does the conversion position depend on the try? / What is a drop goal worth? / Can a rugby match end in a draw?

#### Forwards and Backs: The Two Halves of a Rugby Squad

`rugby-forwards-and-backs` · `sports-gm` · `beginner` · `informational` · app: `rugby-draft-pro-league` · disclaimer: `none`

- **Primary keyword:** "rugby forwards and backs"
- **Demand tier:** `unverified-high` — *a judgement label about evidence strength, not a measurement*
- **Evidence observed:** Google autocomplete, captured 2026-09-15 via suggestqueries.google.com (client=firefox, hl=en, gl=us). "rugby forwards and backs" returned "rugby positions forwards and backs", "rugby league forwards and backs", "rugby union forwards and backs", "rugby explained forwards and backs" (10 suggestions). No search volume or difficulty figure is available: this project has no authenticated Search Console, no Keyword Planner and no third-party keyword tool.
- **Why it is a separate page:** rugby-positions-and-numbers is the position-by-position reference; this is the higher-level squad-structure explainer that drafting decisions actually hang on. (closest existing article: `how-to-build-a-balanced-basketball-roster`, similarity **0.01**)
- **First-party angle (only we can write this):** How our draft pool balances forward and back availability, and why we rotate the pool so a forward-heavy board is not always available.
- **Inbound link required from:** `rugby-positions-and-numbers`
- **Outbound internal links:** `rugby-positions-and-numbers`, `rugby-draft-and-squad-building`, `depth-charts-explained`, `how-rugby-scoring-works`
- **CTA:** **No public Play listing for this app.** Link the on-site app page instead: https://reigncreativellc.com/apps/rugby-draft-pro-league/
- **Supporting terms:** rugby positions forwards and backs; rugby union forwards and backs; what do rugby forwards do; rugby pack; rugby backline; forward vs back rugby
- **Long-tail:** what is the difference between forwards and backs in rugby; which rugby positions are in the pack; do forwards and backs train differently; how many forwards are in a rugby team; which is harder forwards or backs
- **Questions to answer directly:** What is the difference between forwards and backs? / Which positions make up the pack? / How many forwards are on the field? / Do forwards and backs have different body types?

#### Rugby Draft: Building a Squad That Survives 24 Matches

`rugby-draft-and-squad-building` · `sports-gm` · `strategy` · `commercial` · app: `rugby-draft-pro-league` · disclaimer: `none`

- **Primary keyword:** "rugby draft simulator"
- **Demand tier:** `unverified-high` — *a judgement label about evidence strength, not a measurement*
- **Evidence observed:** Google autocomplete, captured 2026-09-15 via suggestqueries.google.com (client=firefox, hl=en, gl=us). "rugby draft" returned "rugby draft game", "rugby draft simulator", "rugby draft xv", "rugby draft 2025" (10 suggestions); "fantasy rugby" returned "fantasy rugby draft" among ten. No search volume or difficulty figure is available: this project has no authenticated Search Console, no Keyword Planner and no third-party keyword tool.
- **Why it is a separate page:** The site has draft guides for six sports and none for rugby; this app has zero article coverage. (closest existing article: `soccer-draft-xi-guide`, similarity **0.54**)
- **First-party angle (only we can write this):** What our rotating draft pool actually rotates, why no two boards are the same, and the depth threshold below which squads visibly fail late in a simulated season.
- **Inbound link required from:** `best-offline-sports-games-android`
- **Outbound internal links:** `rugby-forwards-and-backs`, `rugby-positions-and-numbers`, `expansion-drafts-explained`, `best-offline-sports-games-android`
- **CTA:** **No public Play listing for this app.** Link the on-site app page instead: https://reigncreativellc.com/apps/rugby-draft-pro-league/
- **Supporting terms:** rugby draft; rugby draft game; rugby draft xv; fantasy rugby draft; rugby squad building; rugby draft strategy
- **Long-tail:** is there a rugby draft game; how do you draft a rugby squad; how much depth does a rugby squad need; rugby draft strategy for beginners; how to balance forwards and backs in a draft
- **Questions to answer directly:** Is there a rugby draft game? / How do you build a balanced rugby squad? / How much squad depth does a season need? / Which positions should you draft first?

#### Southpaw vs Orthodox: Why the Stance Matchup Changes the Fight

`southpaw-vs-orthodox` · `sports-gm` · `comparison` · `informational` · app: `mma-boxing-fight-draft` · disclaimer: `none`

- **Primary keyword:** "southpaw vs orthodox"
- **Demand tier:** `unverified-high` — *a judgement label about evidence strength, not a measurement*
- **Evidence observed:** Google autocomplete, captured 2026-09-15 via suggestqueries.google.com (client=firefox, hl=en, gl=us). "southpaw vs orthodox" returned "southpaw vs orthodox stance", "southpaw vs orthodox boxing", "southpaw vs orthodox pros and cons", "southpaw vs orthodox meaning", "southpaw vs orthodox stance mma" (10 suggestions); "boxing stance" returned "boxing stance southpaw" and "boxing stance vs mma stance". No search volume or difficulty figure is available: this project has no authenticated Search Console, no Keyword Planner and no third-party keyword tool.
- **Why it is a separate page:** Combat sports is the thinnest sub-vertical on the site with three articles covering scoring, weight classes and the app itself; stance is untouched. (closest existing article: `mma-boxing-fight-draft-guide`, similarity **0.03**)
- **First-party angle (only we can write this):** How our fight simulator represents stance as a matchup modifier rather than a fighter attribute, and the reason that distinction matters for drafting.
- **Inbound link required from:** `boxing-scoring-explained`
- **Outbound internal links:** `boxing-scoring-explained`, `mma-weight-classes-explained`, `striking-vs-grappling-in-mma`, `how-fight-cards-are-built`
- **CTA:** **No public Play listing for this app.** Link the on-site app page instead: https://reigncreativellc.com/apps/mma-boxing-fight-draft/
- **Supporting terms:** southpaw vs orthodox stance; southpaw vs orthodox boxing; southpaw vs orthodox pros and cons; what is a southpaw; orthodox stance boxing; switch stance fighters
- **Long-tail:** why are southpaws hard to fight; how do you beat a southpaw; what is the lead foot rule against a southpaw; southpaw vs orthodox in mma; are southpaws at an advantage
- **Questions to answer directly:** What is the difference between southpaw and orthodox? / Why are southpaws difficult to fight? / How do you beat a southpaw? / Is the stance advantage real?

#### Striking vs Grappling: How Mixed Martial Arts Matchups Resolve

`striking-vs-grappling-in-mma` · `sports-gm` · `comparison` · `informational` · app: `mma-boxing-fight-draft` · disclaimer: `none`

- **Primary keyword:** "striking vs grappling"
- **Demand tier:** `unverified-high` — *a judgement label about evidence strength, not a measurement*
- **Evidence observed:** Google autocomplete, captured 2026-09-15 via suggestqueries.google.com (client=firefox, hl=en, gl=us). "mma striking vs grappling" returned "mma striking and grappling", "what is better grappling or striking", "mma grappling techniques", "striking martial arts vs grappling" (5 suggestions); "wrestling in mma" returned ten further suggestions including "best wrestling in mma" and "wrestling moves in mma". No search volume or difficulty figure is available: this project has no authenticated Search Console, no Keyword Planner and no third-party keyword tool.
- **Why it is a separate page:** The three existing combat-sports articles cover scoring, weight classes and the app; discipline matchups are not covered. (closest existing article: `mma-boxing-fight-draft-guide`, similarity **0.06**)
- **First-party angle (only we can write this):** How our simulator resolves where a fight takes place before resolving the exchange itself, and why that ordering was the single biggest realism fix we made.
- **Inbound link required from:** `mma-weight-classes-explained`
- **Outbound internal links:** `mma-weight-classes-explained`, `southpaw-vs-orthodox`, `how-mma-judging-criteria-work`, `style-matchups-in-a-fight-simulator`
- **CTA:** **No public Play listing for this app.** Link the on-site app page instead: https://reigncreativellc.com/apps/mma-boxing-fight-draft/
- **Supporting terms:** what is better grappling or striking; mma striking and grappling; wrestling in mma; mma grappling techniques; takedown defense; striking martial arts vs grappling
- **Long-tail:** is striking or grappling better in mma; why do wrestlers do well in mma; how does a striker beat a grappler; what decides where an mma fight takes place; is takedown defence more important than striking
- **Questions to answer directly:** Is striking or grappling better in MMA? / Why do wrestlers succeed in MMA? / How does a striker keep a fight standing? / Does one discipline beat the other?

#### How MMA Judging Criteria Work, and Why Scorecards Disagree

`how-mma-judging-criteria-work` · `sports-gm` · `reference` · `informational` · app: `mma-boxing-fight-draft` · disclaimer: `none`

- **Primary keyword:** "mma judging criteria"
- **Demand tier:** `unverified-high` — *a judgement label about evidence strength, not a measurement*
- **Evidence observed:** Google autocomplete, captured 2026-09-15 via suggestqueries.google.com (client=firefox, hl=en, gl=us). "mma judging criteria" returned "mma scoring criteria", "mma scoring criteria clarification", "abc mma judging criteria", "ufc mma judging criteria", "new mma judging criteria" (10 suggestions). No search volume or difficulty figure is available: this project has no authenticated Search Console, no Keyword Planner and no third-party keyword tool.
- **Why it is a separate page:** boxing-scoring-explained covers boxing only; MMA uses a different criteria hierarchy and is the more contested of the two. (closest existing article: `mma-boxing-fight-draft-guide`, similarity **0.28**)
- **First-party angle (only we can write this):** How our simulator scores a decision round, the criteria weighting we implemented, and the deliberate randomness we added because real scorecards genuinely diverge.
- **Inbound link required from:** `boxing-scoring-explained`
- **Outbound internal links:** `boxing-scoring-explained`, `mma-weight-classes-explained`, `how-boxing-records-are-written`, `striking-vs-grappling-in-mma`
- **CTA:** **No public Play listing for this app.** Link the on-site app page instead: https://reigncreativellc.com/apps/mma-boxing-fight-draft/
- **Supporting terms:** mma scoring criteria; abc mma judging criteria; ten point must system; how are mma rounds scored; mma judging controversy; effective striking vs control
- **Long-tail:** how do judges score an mma round; what is the ten point must system; why do mma judges disagree; does octagon control still count; how is a 10-8 round scored
- **Questions to answer directly:** How do MMA judges score a round? / What is the ten-point must system? / Why do judges disagree? / When is a 10-8 round awarded?

#### How Do Boxing Records Work? Reading 30-2-1 (18 KO)

`how-boxing-records-are-written` · `sports-gm` · `faq` · `informational` · app: `mma-boxing-fight-draft` · disclaimer: `none`

- **Primary keyword:** "how do boxing records work"
- **Demand tier:** `unverified-medium` — *a judgement label about evidence strength, not a measurement*
- **Evidence observed:** Google autocomplete, captured 2026-09-15 via suggestqueries.google.com (client=firefox, hl=en, gl=us). "boxing records explained" returned "boxing records meaning", "how do boxing records work", "how are boxing records written" (4 suggestions); "how do mma rankings work" separately returned "how do mma records work". A small but exact-match cluster. No search volume or difficulty figure is available: this project has no authenticated Search Console, no Keyword Planner and no third-party keyword tool.
- **Why it is a separate page:** No article on the site explains combat-sports record notation; the weight class and scoring articles cover different ground. (closest existing article: `boxing-scoring-explained`, similarity **0.34**)
- **First-party angle (only we can write this):** How the app records results across its two simulators, and why a drafted stable can post a strong combined record while individual matchmaking was poor.
- **Inbound link required from:** `mma-weight-classes-explained`
- **Outbound internal links:** `mma-weight-classes-explained`, `how-mma-judging-criteria-work`, `how-fight-cards-are-built`, `boxing-scoring-explained`
- **CTA:** **No public Play listing for this app.** Link the on-site app page instead: https://reigncreativellc.com/apps/mma-boxing-fight-draft/
- **Supporting terms:** boxing records explained; boxing records meaning; how are boxing records written; undefeated boxers; no contest boxing; boxing record ko percentage
- **Long-tail:** what do the numbers in a boxing record mean; what is a no contest in boxing; does a draw count in a boxing record; why do some boxers have padded records; how are mma records written
- **Questions to answer directly:** What do the numbers in a boxing record mean? / What is a no-contest? / Do draws appear in the record? / Is an undefeated record meaningful?

#### How Do Fight Cards Work? Main Events, Undercards and Matchmaking

`how-fight-cards-are-built` · `sports-gm` · `feature-explainer` · `informational` · app: `mma-boxing-fight-draft` · disclaimer: `none`

- **Primary keyword:** "how do fight cards work"
- **Demand tier:** `unverified-medium` — *a judgement label about evidence strength, not a measurement*
- **Evidence observed:** Google autocomplete, captured 2026-09-15 via suggestqueries.google.com (client=firefox, hl=en, gl=us). "how do fight cards work" returned "how do ufc fight cards work" among ten suggestions (the rest were unrelated card-game queries, an observed SERP-composition note); "boxing undercard meaning" returned "undercard fight meaning" and "what does undercard mean in boxing". The narrower seed "how are fight cards made" returned nothing. No search volume or difficulty figure is available: this project has no authenticated Search Console, no Keyword Planner and no third-party keyword tool.
- **Why it is a separate page:** Nothing on the site explains card structure or matchmaking; the existing app guide describes draft formats instead. (closest existing article: `how-draft-lotteries-work`, similarity **0.28**)
- **First-party angle (only we can write this):** How the app builds matchups from a drafted stable, the constraints it applies on weight and style, and why it will refuse some pairings outright.
- **Inbound link required from:** `mma-boxing-fight-draft-guide`
- **Outbound internal links:** `mma-weight-classes-explained`, `how-boxing-records-are-written`, `mma-fantasy-draft-strategy`, `how-mma-judging-criteria-work`
- **CTA:** **No public Play listing for this app.** Link the on-site app page instead: https://reigncreativellc.com/apps/mma-boxing-fight-draft/
- **Supporting terms:** fight card meaning; boxing undercard meaning; main event vs co main event; mma fight card; matchmaking in combat sports; prelims meaning
- **Long-tail:** what does undercard mean in boxing; how is a fight card put together; what is the co main event; why are fights placed in a certain order; how do matchmakers pick opponents
- **Questions to answer directly:** How is a fight card put together? / What does undercard mean? / What is the co-main event? / How do matchmakers choose opponents?

#### MMA Fantasy Draft: Picking a Stable, Not a Highlight Reel

`mma-fantasy-draft-strategy` · `sports-gm` · `strategy` · `informational` · app: `mma-boxing-fight-draft` · disclaimer: `none`

- **Primary keyword:** "mma fantasy draft"
- **Demand tier:** `unverified-medium` — *a judgement label about evidence strength, not a measurement*
- **Evidence observed:** Google autocomplete, captured 2026-09-15 via suggestqueries.google.com (client=firefox, hl=en, gl=us). "fantasy mma" returned "fantasy mma league", "fantasy mma app", "fantasy mma scoring", "mma fantasy draft" (10 suggestions); "mma fantasy draft" itself returned "mma fighting fantasy draft" and further DFS-oriented suggestions (7 total). No search volume or difficulty figure is available: this project has no authenticated Search Console, no Keyword Planner and no third-party keyword tool.
- **Why it is a separate page:** how-fantasy-draft-strategy-works is sport-agnostic and written around team sports; combat sports draft on style matchups and weight classes, which that article does not address. (closest existing article: `how-fantasy-draft-strategy-works`, similarity **0.65**)
- **First-party angle (only we can write this):** Which fighter attributes our draft board exposes, which it hides, and why a stable of the highest-rated fighters loses to a balanced one in our simulation.
- **Inbound link required from:** `how-fantasy-draft-strategy-works`
- **Outbound internal links:** `how-fantasy-draft-strategy-works`, `mma-weight-classes-explained`, `style-matchups-in-a-fight-simulator`, `striking-vs-grappling-in-mma`
- **CTA:** **No public Play listing for this app.** Link the on-site app page instead: https://reigncreativellc.com/apps/mma-boxing-fight-draft/
- **Supporting terms:** fantasy mma draft; mma draft strategy; fighter draft tips; fantasy mma scoring; mma stable building; drafting across weight classes
- **Long-tail:** how do you draft a fantasy mma team; what makes a good mma draft pick; should you draft for style or record; how many weight classes should a stable cover; mma draft strategy for beginners
- **Questions to answer directly:** How do you draft a fantasy MMA roster? / Should you draft for style or record? / How much weight-class spread do you need? / What is the most common drafting mistake?

#### Modelling Style Matchups in a Fight Simulator

`style-matchups-in-a-fight-simulator` · `sports-gm` · `developer-insight` · `informational` · app: `mma-boxing-fight-draft` · disclaimer: `none`

- **Primary keyword:** "how fight simulators model styles"
- **Demand tier:** `unverified-low` — *a judgement label about evidence strength, not a measurement*
- **Evidence observed:** The exact phrase returned no Google autocomplete suggestions on 2026-09-15. The adjacent attested cluster is "mma fighting styles explained" and "fighting styles explained" (10 suggestions), plus "boxing manager game tips" and "mma simulator fight manager" from the simulator seeds. No measured volume available; proposed on intent quality and app relevance. No search volume or difficulty figure is available: this project has no authenticated Search Console, no Keyword Planner and no third-party keyword tool.
- **Why it is a separate page:** how-sports-simulation-engines-work is general and team-sport oriented; this is combat-sport specific and covers a different modelling problem. (closest existing article: `mma-boxing-fight-draft-guide`, similarity **0.32**)
- **First-party angle (only we can write this):** The style representation we shipped, the one we abandoned because it made the rock-paper-scissors too visible, and the limits we state openly about what the model can claim.
- **Inbound link required from:** `how-sports-simulation-engines-work`
- **Outbound internal links:** `how-sports-simulation-engines-work`, `understanding-sports-sim-probability`, `striking-vs-grappling-in-mma`, `mma-fantasy-draft-strategy`
- **CTA:** **No public Play listing for this app.** Link the on-site app page instead: https://reigncreativellc.com/apps/mma-boxing-fight-draft/
- **Supporting terms:** fight simulator mechanics; mma fighting styles explained; boxing styles; style makes fights; combat sport simulation; fighter attributes in games
- **Long-tail:** how do fight simulators decide a winner; how do you model fighting styles in a game; what is the style triangle in fighting games; can a simulator predict a real fight; why do sim results vary between runs
- **Questions to answer directly:** How does a fight simulator decide a winner? / How are fighting styles modelled in code? / Can a simulator predict a real fight? / Why do repeated simulations give different results?

#### Strokes Gained: What It Measures and What It Cannot

`strokes-gained-for-club-golfers` · `sports-gm` · `reference` · `informational` · app: `golf-career-simulator` · disclaimer: `none`

- **Primary keyword:** "strokes gained explained"
- **Demand tier:** `unverified-high` — *a judgement label about evidence strength, not a measurement*
- **Evidence observed:** Google autocomplete, captured 2026-09-15 via suggestqueries.google.com (client=firefox, hl=en, gl=us). "strokes gained explained" returned "strokes gained explained golf", "shots gained explained", "strokes gained meaning", "strokes gained definition", "strokes gained analysis", "strokes gained putting explained" (10 suggestions). No search volume or difficulty figure is available: this project has no authenticated Search Console, no Keyword Planner and no third-party keyword tool.
- **Why it is a separate page:** golf-scoring-explained covers scoring notation; strokes gained is a statistical framework and is the golf term most searched for with "explained" attached. (closest existing article: `tdee-and-energy-balance`, similarity **0.27**)
- **First-party angle (only we can write this):** Why our golf sim scores decisions rather than swings, and how that maps onto the strokes gained idea without pretending to reproduce its data.
- **Inbound link required from:** `golf-course-management-basics`
- **Outbound internal links:** `golf-scoring-explained`, `golf-course-management-basics`, `club-distance-gapping`, `how-golf-q-school-works`
- **CTA:** Google Play listing — https://play.google.com/store/apps/details?id=com.reigncreative.golfmycareersimulator
- **Supporting terms:** strokes gained meaning; strokes gained putting explained; strokes gained analysis; shots gained explained; strokes gained categories; strokes gained baseline
- **Long-tail:** how is strokes gained calculated; what does strokes gained putting mean; is strokes gained useful for amateurs; what baseline does strokes gained use; strokes gained vs traditional golf stats
- **Questions to answer directly:** What is strokes gained in golf? / How is strokes gained calculated? / What are the four strokes gained categories? / Is strokes gained useful for amateur golfers?

#### Golf Handicaps for Beginners: What the Number Actually Says

`golf-handicap-for-beginners` · `sports-gm` · `beginner` · `informational` · app: `golf-career-simulator` · disclaimer: `none`

- **Primary keyword:** "golf handicap explained"
- **Demand tier:** `unverified-high` — *a judgement label about evidence strength, not a measurement*
- **Evidence observed:** Google autocomplete, captured 2026-09-15 via suggestqueries.google.com (client=firefox, hl=en, gl=us). "golf handicap explained" returned "golf handicap explained reddit", "golf handicap explained simply", "golf handicap explained for dummies", "golf handicap explained for beginners", "usga handicap explained" (10 suggestions). No search volume or difficulty figure is available: this project has no authenticated Search Console, no Keyword Planner and no third-party keyword tool.
- **Why it is a separate page:** golf-scoring-explained covers par and stroke notation; the handicap system is a separate calculation and the most-searched golf concept of the two. (closest existing article: `how-a-golf-cut-works`, similarity **0.37**)
- **First-party angle (only we can write this):** Why our golf career sim does not use a handicap at all, what it uses instead to represent a developing player, and the trade-off that choice makes.
- **Inbound link required from:** `golf-scoring-explained`
- **Outbound internal links:** `golf-scoring-explained`, `how-a-golf-cut-works`, `strokes-gained-for-club-golfers`, `golf-tournament-formats`
- **CTA:** Google Play listing — https://play.google.com/store/apps/details?id=com.reigncreative.golfmycareersimulator
- **Supporting terms:** golf handicap explained simply; golf handicap for dummies; how is a golf handicap calculated; what is a good golf handicap; handicap index vs course handicap; world handicap system
- **Long-tail:** how does a golf handicap work; what is a good handicap for a beginner; why is my handicap not dropping; difference between handicap index and course handicap; how many rounds to get a handicap
- **Questions to answer directly:** How does a golf handicap work? / Is a handicap your average score? / What is a good handicap for a beginner? / How many rounds do you need to get one?

#### Golf Tournament Formats: Stroke Play, Match Play, Scramble and More

`golf-tournament-formats` · `sports-gm` · `listicle` · `informational` · app: `golf-career-simulator` · disclaimer: `none`

- **Primary keyword:** "golf tournament formats"
- **Demand tier:** `unverified-high` — *a judgement label about evidence strength, not a measurement*
- **Evidence observed:** Google autocomplete, captured 2026-09-15 via suggestqueries.google.com (client=firefox, hl=en, gl=us). "golf tournament formats" returned "golf tournament formats for fun", "golf tournament formats explained", "golf tournament formats ideas", "golf tournament formats scramble", "golf competition formats" (10 suggestions). No search volume or difficulty figure is available: this project has no authenticated Search Console, no Keyword Planner and no third-party keyword tool.
- **Why it is a separate page:** how-a-golf-cut-works covers one tournament mechanic; formats are a broader category with no page on the site. (closest existing article: `golf-scoring-explained`, similarity **0.39**)
- **First-party angle (only we can write this):** Which tournament formats our golf sim implements, which it does not, and why stroke play with a cut turned out to be the only one that held a career narrative together.
- **Inbound link required from:** `how-a-golf-cut-works`
- **Outbound internal links:** `golf-scoring-explained`, `how-a-golf-cut-works`, `golf-handicap-for-beginners`, `golf-course-management-basics`
- **CTA:** Google Play listing — https://play.google.com/store/apps/details?id=com.reigncreative.golfmycareersimulator
- **Supporting terms:** golf tournament formats explained; golf competition formats; golf outing formats; stableford scoring; scramble golf format; match play vs stroke play
- **Long-tail:** what are the different golf tournament formats; how does a scramble work in golf; what is stableford scoring; difference between match play and stroke play; best golf formats for a group of four
- **Questions to answer directly:** What are the main golf tournament formats? / How does a scramble work? / What is Stableford scoring? / How is match play different from stroke play?

#### Club Distance Gapping: Building a Set With No Blind Spots

`club-distance-gapping` · `sports-gm` · `strategy` · `informational` · app: `golf-career-simulator` · disclaimer: `none`

- **Primary keyword:** "golf club distance gapping"
- **Demand tier:** `unverified-medium` — *a judgement label about evidence strength, not a measurement*
- **Evidence observed:** Google autocomplete, captured 2026-09-15 via suggestqueries.google.com (client=firefox, hl=en, gl=us). "golf club distances" returned "golf club distances chart", "golf club distances for beginners", "golf club distances by handicap", "golf club distances by swing speed" (10 suggestions); the gapping-specific phrase returned a smaller but present cluster. No search volume or difficulty figure is available: this project has no authenticated Search Console, no Keyword Planner and no third-party keyword tool.
- **Why it is a separate page:** golf-course-management-basics covers shot selection on the course; gapping is an equipment-and-yardage problem that precedes it. (closest existing article: `how-a-golf-cut-works`, similarity **0.24**)
- **First-party angle (only we can write this):** How our sim represents a golfer distance profile without modelling a swing, and why gapping shows up as a decision constraint rather than an equipment screen.
- **Inbound link required from:** `golf-course-management-basics`
- **Outbound internal links:** `golf-course-management-basics`, `strokes-gained-for-club-golfers`, `golf-handicap-for-beginners`, `pressure-and-nerves-in-golf-sims`
- **CTA:** Google Play listing — https://play.google.com/store/apps/details?id=com.reigncreative.golfmycareersimulator
- **Supporting terms:** golf club distances; golf club distances chart; golf club distances by handicap; carry distance vs total distance; gapping session golf; how far should each club go
- **Long-tail:** how far should each golf club go; what is a gapping session; how to find distance gaps in your set; why are my wedge gaps uneven; club distances for high handicappers
- **Questions to answer directly:** What is club distance gapping? / How far should each club go? / How do you run a gapping session? / Why do wedge gaps matter most?

#### How Does Golf Q-School Work?

`how-golf-q-school-works` · `sports-gm` · `faq` · `informational` · app: `golf-career-simulator` · disclaimer: `none`

- **Primary keyword:** "how golf q school works"
- **Demand tier:** `unverified-medium` — *a judgement label about evidence strength, not a measurement*
- **Evidence observed:** Google autocomplete, captured 2026-09-15 via suggestqueries.google.com (client=firefox, hl=en, gl=us). "golf qualifying school" returned "golf qualifying school results", "golf qualifying school european tour", "golf q school", "golf q school 2025" (10 suggestions). Note the suggestions skew toward live results, which is an observed SERP-composition signal that the rules-explainer intent is less well served. No search volume or difficulty figure is available: this project has no authenticated Search Console, no Keyword Planner and no third-party keyword tool.
- **Why it is a separate page:** how-a-golf-cut-works explains the cut within a tournament; Q-School is about tour access across a season and is not covered. (closest existing article: `golf-scoring-explained`, similarity **0.56**)
- **First-party angle (only we can write this):** How our career sim models tour access and loss of status, and why we made losing a card recoverable rather than career-ending.
- **Inbound link required from:** `golf-career-sim-guide`
- **Outbound internal links:** `how-a-golf-cut-works`, `golf-career-sim-guide`, `golf-tournament-formats`, `how-tennis-qualifiers-work`
- **CTA:** Google Play listing — https://play.google.com/store/apps/details?id=com.reigncreative.golfmycareersimulator
- **Supporting terms:** golf qualifying school; golf q school; how to get a tour card; q school stages; conditional status golf; golf tour card explained
- **Long-tail:** how do you get a pga tour card; what happens at golf qualifying school; how many stages are in q school; what is conditional status in golf; can you lose a tour card
- **Questions to answer directly:** What is golf Q-School? / How do you earn a tour card? / How many stages does qualifying have? / What happens if you lose your card?

#### Modelling Pressure in a Golf Career Sim

`pressure-and-nerves-in-golf-sims` · `sports-gm` · `case-study` · `informational` · app: `golf-career-simulator` · disclaimer: `none`

- **Primary keyword:** "how golf sims model pressure"
- **Demand tier:** `unverified-low` — *a judgement label about evidence strength, not a measurement*
- **Evidence observed:** The exact phrase returned no Google autocomplete suggestions on 2026-09-15, and the adjacent seeds "golf pressure putting" and "sports sim pressure" also returned nothing. The nearest attested cluster is "golf mental game" ("golf mental game tips", "golf mental game exercises", "golf mental game scorecard" - 10 suggestions). No measured volume available; proposed on intent quality and app relevance, since pressure is a stated feature of the app. No search volume or difficulty figure is available: this project has no authenticated Search Console, no Keyword Planner and no third-party keyword tool.
- **Why it is a separate page:** understanding-sports-sim-probability covers randomness generically; this is a golf-specific design account written from build experience. (closest existing article: `golf-career-sim-guide`, similarity **0.35**)
- **First-party angle (only we can write this):** The three pressure implementations we tested, why two of them read as the game cheating, and the variance model we shipped instead.
- **Inbound link required from:** `understanding-sports-sim-probability`
- **Outbound internal links:** `golf-career-sim-guide`, `understanding-sports-sim-probability`, `how-to-choose-a-sports-career-sim`, `golf-course-management-basics`
- **CTA:** Google Play listing — https://play.google.com/store/apps/details?id=com.reigncreative.golfmycareersimulator
- **Supporting terms:** golf mental game; pressure putting; choking in golf; sports sim pressure mechanics; golf nerves; clutch performance modelling
- **Long-tail:** how do golf games model pressure; why do sim golfers miss short putts; is pressure in golf games just random; how to handle pressure in a golf career mode; what makes a pressure mechanic feel fair
- **Questions to answer directly:** How do golf games model pressure? / Is a missed putt under pressure just randomness? / What makes a pressure mechanic feel fair? / Can you train pressure resistance in a career sim?


### Block 4 — Arcade defence and survival, plus the two new utility apps (card scanning, meal planning)

#### Tower Defence Strategy: Why Placement Beats Damage

`tower-defense-strategy-basics` · `action-arcade` · `strategy` · `informational` · app: `regal-tower-defense` · disclaimer: `none`

- **Primary keyword:** "tower defense strategy"
- **Demand tier:** `unverified-high` — *a judgement label about evidence strength, not a measurement*
- **Evidence observed:** Google autocomplete, captured 2026-09-15 via suggestqueries.google.com (client=firefox, hl=en, gl=us). "tower defense strategy" returned "tower defense strategy games", "tower defense strategy wiki", "steam tower defense strategy" (10 suggestions); "tower defense tips" returned "tower defense tips and tricks", "tower defense guide" (10 suggestions). No search volume or difficulty figure is available: this project has no authenticated Search Console, no Keyword Planner and no third-party keyword tool.
- **Why it is a separate page:** The site has no tower defence content at all; this app has zero article coverage and the existing arcade articles cover shooters and survival runs. (closest existing article: `reading-a-defense-basics`, similarity **0.37**)
- **First-party angle (only we can write this):** Why our maps are designed around bend density rather than path length, and the level we rebuilt because a single long straight made every tower type equivalent.
- **Inbound link required from:** `difficulty-curves-explained`
- **Outbound internal links:** `tower-types-and-what-they-counter`, `aura-towers-and-support-stacking`, `difficulty-curves-explained`, `countering-armoured-and-flying-enemies`
- **CTA:** **No public Play listing for this app.** Link the on-site app page instead: https://reigncreativellc.com/apps/regal-tower-defense/
- **Supporting terms:** tower defense tips; tower defense guide; tower defense strategy games; td strategy; how to get better at tower defense; tower defense path reading
- **Long-tail:** how do you get better at tower defense games; where should you place towers in tower defense; is more damage always better in tower defense; how to beat a tower defense level you keep losing; tower defense strategy for beginners
- **Questions to answer directly:** What is the best tower defence strategy? / Where should you place your first towers? / Is upgrading better than building more towers? / How do you read a tower defence map?

#### Tower Types and What Each One Is Actually For

`tower-types-and-what-they-counter` · `action-arcade` · `feature-explainer` · `informational` · app: `regal-tower-defense` · disclaimer: `none`

- **Primary keyword:** "tower defense tower types"
- **Demand tier:** `unverified-medium` — *a judgement label about evidence strength, not a measurement*
- **Evidence observed:** Google autocomplete, captured 2026-09-15 via suggestqueries.google.com (client=firefox, hl=en, gl=us). "tower defense tower types" returned "merge tower defense tower types", "tower defense simulator tower guide", "tower defense tower ideas", "what is the best tower in tower defense", "tower defense tier list" (7 suggestions). Note the suggestions are dominated by named third-party games, an observed SERP-composition signal that a game-agnostic explainer is under-served. No search volume or difficulty figure is available: this project has no authenticated Search Console, no Keyword Planner and no third-party keyword tool.
- **Why it is a separate page:** No tower defence article exists on the site; power-ups-and-build-design covers roguelite upgrades in a different genre. (closest existing article: `reading-a-defense-basics`, similarity **0.28**)
- **First-party angle (only we can write this):** The seven tower types we shipped, the role each was designed to fill, and the one whose damage numbers we cut twice because it made three others redundant.
- **Inbound link required from:** `power-ups-and-build-design`
- **Outbound internal links:** `tower-defense-strategy-basics`, `countering-armoured-and-flying-enemies`, `aura-towers-and-support-stacking`, `power-ups-and-build-design`
- **CTA:** **No public Play listing for this app.** Link the on-site app page instead: https://reigncreativellc.com/apps/regal-tower-defense/
- **Supporting terms:** tower defense towers; types of towers in tower defense; splash damage towers; slow towers tower defense; chain lightning tower; best tower in tower defense
- **Long-tail:** what do the different towers do in tower defense; which tower is best against armoured enemies; when should you build a frost tower; are splash towers worth it; what counters flying enemies in tower defense
- **Questions to answer directly:** What are the main tower types in tower defence? / Which tower is best against armour? / What does a frost tower do? / Do splash towers beat single-target towers?

#### Aura Towers: Making Your Best Cluster Better

`aura-towers-and-support-stacking` · `action-arcade` · `developer-insight` · `informational` · app: `regal-tower-defense` · disclaimer: `none`

- **Primary keyword:** "aura towers in tower defense"
- **Demand tier:** `unverified-low` — *a judgement label about evidence strength, not a measurement*
- **Evidence observed:** The phrase "aura tower" returned ten Google autocomplete suggestions on 2026-09-15 but every one was a real-estate development, so the term is ambiguous and the game sense is not attested at the head. The attested game-side cluster is "tower defense tower types" and "tower defense strategy". No measured volume available; proposed on app relevance - Aura Towers are a named feature of this app - and on the adjacent tower-type demand. No search volume or difficulty figure is available: this project has no authenticated Search Console, no Keyword Planner and no third-party keyword tool.
- **Why it is a separate page:** Nothing on the site covers support or buff mechanics in any genre; this is a distinct mechanic with a distinct query, ambiguous head term notwithstanding. (closest existing article: `reading-a-defense-basics`, similarity **0.25**)
- **First-party angle (only we can write this):** Why aura stacking is capped in our game, the runaway cluster that forced the cap, and how Build Pads interact with aura range.
- **Inbound link required from:** `tower-defense-strategy-basics`
- **Outbound internal links:** `tower-types-and-what-they-counter`, `tower-defense-strategy-basics`, `countering-armoured-and-flying-enemies`, `power-ups-and-build-design`
- **CTA:** **No public Play listing for this app.** Link the on-site app page instead: https://reigncreativellc.com/apps/regal-tower-defense/
- **Supporting terms:** support towers tower defense; buff towers; tower defense aura; tower defense damage buff; tower defense layout; stacking buffs in tower defense
- **Long-tail:** what do aura towers do in tower defense; do aura effects stack in tower defense; where should you place a support tower; are buff towers worth a slot; how to build a tower cluster
- **Questions to answer directly:** What does an aura tower do? / Do aura effects stack? / Where should support towers go? / Is a buff tower worth giving up a damage slot?

#### Tower Defence Without Wi-Fi: What Offline Really Means

`offline-tower-defence-on-android` · `action-arcade` · `best-for` · `commercial` · app: `regal-tower-defense` · disclaimer: `comparison`

- **Primary keyword:** "best tower defense games android offline"
- **Demand tier:** `unverified-high` — *a judgement label about evidence strength, not a measurement*
- **Evidence observed:** Google autocomplete, captured 2026-09-15 via suggestqueries.google.com (client=firefox, hl=en, gl=us). "best tower defense games android" returned "best tower defense games android offline", "best tower defense games android reddit", "best tower defense games android no ads", "best tower defense games android free" (10 suggestions). The "offline" and "no ads" qualifiers are directly attested. No search volume or difficulty figure is available: this project has no authenticated Search Console, no Keyword Planner and no third-party keyword tool.
- **Why it is a separate page:** best-offline-arcade-games-android covers arcade titles broadly; tower defence is a distinct genre with its own attested offline query and no coverage. (closest existing article: `best-offline-arcade-games-android`, similarity **0.58**)
- **First-party angle (only we can write this):** What our tower defence game does and does not need a connection for, and the ad placement we chose so that a level in progress is never interrupted.
- **Inbound link required from:** `best-offline-arcade-games-android`
- **Outbound internal links:** `best-offline-arcade-games-android`, `best-offline-sports-games-android`, `tower-defense-strategy-basics`, `why-free-android-games-show-ads`
- **CTA:** **No public Play listing for this app.** Link the on-site app page instead: https://reigncreativellc.com/apps/regal-tower-defense/
- **Supporting terms:** best tower defense games android; offline tower defense; tower defense no wifi; tower defense games without ads; android tower defense games free; offline strategy games android
- **Long-tail:** which tower defense games work offline on android; do tower defense games need internet; best offline tower defense android free; tower defense games with no ads; are offline tower defense games worth it
- **Questions to answer directly:** Which tower defence games work offline? / Do tower defence games need an internet connection? / What do offline games give up? / Are there tower defence games without ads?

#### What Does TD Mean in Games?

`what-does-td-mean-in-games` · `action-arcade` · `faq` · `informational` · app: `regal-tower-defense` · disclaimer: `none`

- **Primary keyword:** "td game meaning"
- **Demand tier:** `unverified-medium` — *a judgement label about evidence strength, not a measurement*
- **Evidence observed:** Google autocomplete, captured 2026-09-15 via suggestqueries.google.com (client=firefox, hl=en, gl=us). "td game meaning" returned "td game meaning in chat", "tower defense game meaning", "td meaning game dev tycoon", "what is the full meaning of td" (6 suggestions). The ambiguity itself is the search intent. No search volume or difficulty figure is available: this project has no authenticated Search Console, no Keyword Planner and no third-party keyword tool.
- **Why it is a separate page:** what-makes-a-roguelike defines a different genre; no article on the site defines tower defence. (closest existing article: `word-game-strategy-guide`, similarity **0.32**)
- **First-party angle (only we can write this):** Why our title uses both "Tower Defense" and "TD", and what we found about how people search for the genre when naming it.
- **Inbound link required from:** `what-makes-a-roguelike`
- **Outbound internal links:** `tower-defense-strategy-basics`, `what-makes-a-roguelike`, `tower-types-and-what-they-counter`, `offline-tower-defence-on-android`
- **CTA:** **No public Play listing for this app.** Link the on-site app page instead: https://reigncreativellc.com/apps/regal-tower-defense/
- **Supporting terms:** tower defense game meaning; what does td stand for; td genre; what is a tower defense game; td abbreviation games; tower defence definition
- **Long-tail:** what does td mean in a game title; what is the tower defense genre; is td the same as tower defence; what counts as a tower defense game; difference between td and rts
- **Questions to answer directly:** What does TD stand for in games? / What defines the tower defence genre? / Is tower defence a strategy game? / How is TD different from RTS?

#### Countering Armoured, Flying and Elite Enemies

`countering-armoured-and-flying-enemies` · `action-arcade` · `strategy` · `informational` · app: `regal-tower-defense` · disclaimer: `none`

- **Primary keyword:** "how to counter flying enemies in tower defense"
- **Demand tier:** `unverified-low` — *a judgement label about evidence strength, not a measurement*
- **Evidence observed:** The exact phrase returned no Google autocomplete suggestions on 2026-09-15. The attested adjacent cluster is "tower defense tower types" ("which tower is best", "tower defense tier list") and "tower defense strategy". No measured volume available; proposed on intent quality and on the app shipping armoured, flying and elite units as a named feature. No search volume or difficulty figure is available: this project has no authenticated Search Console, no Keyword Planner and no third-party keyword tool.
- **Why it is a separate page:** tower-types-and-what-they-counter is a tower-side reference; this is enemy-side and covers wave composition, which that article does not. (closest existing article: `reading-a-defense-basics`, similarity **0.23**)
- **First-party angle (only we can write this):** How our late waves mix unit types deliberately so that adding more of the same tower stops working, and the wave we rebuilt because it had exactly one solution.
- **Inbound link required from:** `boss-pattern-recognition`
- **Outbound internal links:** `tower-types-and-what-they-counter`, `tower-defense-strategy-basics`, `aura-towers-and-support-stacking`, `boss-pattern-recognition`
- **CTA:** **No public Play listing for this app.** Link the on-site app page instead: https://reigncreativellc.com/apps/regal-tower-defense/
- **Supporting terms:** armoured enemies tower defense; flying enemies tower defense; tower defense boss wave; enemy types tower defense; anti air towers; tower defense wave composition
- **Long-tail:** how do you deal with flying enemies in tower defense; what beats armoured enemies in tower defense; how to survive a boss wave; why does my defence fail on mixed waves; should you build anti air early
- **Questions to answer directly:** How do you counter flying enemies? / What damage type beats armour? / How do you prepare for a boss wave? / Why do mixed waves break a strong defence?

#### Vertical Shooters on Android: Picking One Worth Learning

`vertical-shooter-games-on-android` · `action-arcade` · `best-for` · `commercial` · app: `space-galaxy-attack-hardcore` · disclaimer: `comparison`

- **Primary keyword:** "vertical shooter games android"
- **Demand tier:** `unverified-high` — *a judgement label about evidence strength, not a measurement*
- **Evidence observed:** Google autocomplete, captured 2026-09-15 via suggestqueries.google.com (client=firefox, hl=en, gl=us). "vertical shooter games" returned "vertical shooter games android", "vertical scrolling shooter games", "vertical shooter arcade games", "best vertical shooter games" (10 suggestions). No search volume or difficulty figure is available: this project has no authenticated Search Console, no Keyword Planner and no third-party keyword tool.
- **Why it is a separate page:** best-offline-arcade-games-android is a broad offline list; this is genre-specific and about evaluation criteria rather than availability. (closest existing article: `best-offline-arcade-games-android`, similarity **0.44**)
- **First-party angle (only we can write this):** What we prioritised when tuning readability on a phone screen: hitbox size, bullet contrast and the frame budget we protect during boss phases.
- **Inbound link required from:** `bullet-hell-vs-classic-shmup`
- **Outbound internal links:** `best-offline-arcade-games-android`, `bullet-hell-vs-classic-shmup`, `auto-fire-and-touch-controls`, `frame-rate-and-resolution-explained`
- **CTA:** **No public Play listing for this app.** Link the on-site app page instead: https://reigncreativellc.com/apps/space-galaxy-attack-hardcore/
- **Supporting terms:** vertical shooter games; vertical scrolling shooter games; best vertical shooter games; shmup android; arcade shooter android; space shooter games android
- **Long-tail:** what are the best vertical shooter games on android; what makes a good mobile shmup; do vertical shooters work with touch controls; vertical shooter games offline android; best arcade shooters for phones
- **Questions to answer directly:** What is a vertical scrolling shooter? / Which vertical shooters work well on a phone? / Do touch controls work for shmups? / What should you look for in a mobile shooter?

#### Shmup Difficulty: What Normal, Hardcore and Endless Actually Change

`shmup-difficulty-tiers` · `action-arcade` · `developer-insight` · `informational` · app: `space-galaxy-attack-hardcore` · disclaimer: `none`

- **Primary keyword:** "shmup difficulty"
- **Demand tier:** `unverified-medium` — *a judgement label about evidence strength, not a measurement*
- **Evidence observed:** Google autocomplete, captured 2026-09-15 via suggestqueries.google.com (client=firefox, hl=en, gl=us). "shmup difficulty" returned "shmup difficulty list", "shmup difficulty tier list", "shmup difficulty ranking", "shmup difficulty chart", "shmup difficulty index" (10 suggestions). The parallel seed "hardcore mode games" returned nothing, so the attested genre term is used. No search volume or difficulty figure is available: this project has no authenticated Search Console, no Keyword Planner and no third-party keyword tool.
- **Why it is a separate page:** difficulty-curves-explained covers curve design in general; this is about discrete difficulty tiers and is written from our own tuning decisions. (closest existing article: `how-quiz-difficulty-works`, similarity **0.41**)
- **First-party angle (only we can write this):** What our Hardcore mode actually changes beyond enemy health - boss opening windows and formation timing - and the two tiers we cut because players could not tell them apart.
- **Inbound link required from:** `difficulty-curves-explained`
- **Outbound internal links:** `difficulty-curves-explained`, `bullet-hell-vs-classic-shmup`, `ship-loadouts-and-upgrade-priority`, `boss-pattern-recognition`
- **CTA:** **No public Play listing for this app.** Link the on-site app page instead: https://reigncreativellc.com/apps/space-galaxy-attack-hardcore/
- **Supporting terms:** shmup difficulty tier list; shmup difficulty ranking; game difficulty levels; hardcore mode games; arcade difficulty design; endless mode
- **Long-tail:** what does hardcore mode change in a shooter; how is shmup difficulty measured; what is the difference between normal and hardcore; do difficulty modes just add enemy health; what does endless mode do
- **Questions to answer directly:** What changes between difficulty modes in a shooter? / How is shmup difficulty measured? / Does hardcore mode just add health? / What is Endless mode for?

#### Ship Loadouts: Which Upgrades to Buy First

`ship-loadouts-and-upgrade-priority` · `action-arcade` · `strategy` · `informational` · app: `space-galaxy-attack-hardcore` · disclaimer: `none`

- **Primary keyword:** "space shooter upgrade ship"
- **Demand tier:** `unverified-medium` — *a judgement label about evidence strength, not a measurement*
- **Evidence observed:** Google autocomplete, captured 2026-09-15 via suggestqueries.google.com (client=firefox, hl=en, gl=us). "space shooter upgrades" returned "space shooter upgrade ship", "space shooter mods", "space shooter tips and tricks" (4 suggestions); the broader seed "space shooter game" returned ten. The narrower "arcade upgrade tree" returned only "game upgrade tree" and "arcade skill tree". No search volume or difficulty figure is available: this project has no authenticated Search Console, no Keyword Planner and no third-party keyword tool.
- **Why it is a separate page:** power-ups-and-build-design covers in-run roguelite power-ups; this is about a persistent between-run upgrade tree, which is a different system. (closest existing article: `space-shooter-arcade-guide`, similarity **0.36**)
- **First-party angle (only we can write this):** The upgrade ordering our own playtests converged on, why the damage node is the trap pick, and the cooldown node we had to nerf after it dominated every build.
- **Inbound link required from:** `power-ups-and-build-design`
- **Outbound internal links:** `power-ups-and-build-design`, `shmup-difficulty-tiers`, `vertical-shooter-games-on-android`, `boss-pattern-recognition`
- **CTA:** **No public Play listing for this app.** Link the on-site app page instead: https://reigncreativellc.com/apps/space-galaxy-attack-hardcore/
- **Supporting terms:** space shooter upgrades; arcade upgrade tree; ship loadout; shmup upgrade priority; space shooter tips and tricks; best upgrades space shooter
- **Long-tail:** which upgrades should i buy first in a space shooter; is damage or shields better in a shmup; how do upgrade trees work in arcade shooters; best ship loadout for beginners; how to spend gold in a space shooter
- **Questions to answer directly:** Which upgrades should you buy first? / Is damage or survivability more valuable early? / How do ship loadouts differ? / What is the best starting ship?

#### IO Games: What the Name Actually Means

`what-are-io-games` · `action-arcade` · `beginner` · `informational` · app: `jellyfish-arena-survivor-io` · disclaimer: `none`

- **Primary keyword:** "what are io games"
- **Demand tier:** `unverified-medium` — *a judgement label about evidence strength, not a measurement*
- **Evidence observed:** Google autocomplete, captured 2026-09-15 via suggestqueries.google.com (client=firefox, hl=en, gl=us). "io games" returned "io games list", "io games online", "io games free", "io games space", "io games to play with friends" (10 suggestions); "snake io games" and "eat and grow games" each returned ten more. No search volume or difficulty figure is available: this project has no authenticated Search Console, no Keyword Planner and no third-party keyword tool.
- **Why it is a separate page:** what-makes-a-roguelike defines a different genre label; nothing on the site explains the io category, and this app has zero article coverage. (closest existing article: `sports-gm-games-without-internet`, similarity **0.54**)
- **First-party angle (only we can write this):** Why our jellyfish arena fills with AI rivals rather than real players, what that changes about pacing, and why we say so plainly in the listing rather than implying live multiplayer.
- **Inbound link required from:** `what-makes-a-roguelike`
- **Outbound internal links:** `eat-and-grow-arena-strategy`, `io-games-without-a-connection`, `what-makes-a-roguelike`, `horde-survival-vs-wave-shooter`
- **CTA:** Google Play listing — https://play.google.com/store/apps/details?id=com.reigncreative.jellyfishio
- **Supporting terms:** io games; io games list; snake io games; eat and grow games; agar io; io games meaning
- **Long-tail:** what does io mean in io games; why are they called io games; are io games always multiplayer; what was the first io game; are io games free to play
- **Questions to answer directly:** What does the io in io games mean? / Are io games always online multiplayer? / What do io games have in common? / Are io games free?

#### Eat and Grow Arenas: How to Stop Dying at Medium Size

`eat-and-grow-arena-strategy` · `action-arcade` · `strategy` · `informational` · app: `jellyfish-arena-survivor-io` · disclaimer: `none`

- **Primary keyword:** "eat and grow games"
- **Demand tier:** `unverified-medium` — *a judgement label about evidence strength, not a measurement*
- **Evidence observed:** Google autocomplete, captured 2026-09-15 via suggestqueries.google.com (client=firefox, hl=en, gl=us). "eat and grow games" returned "eat and grow games android", "eat and grow games online", "feed and grow games" (10 suggestions); "agar io strategy" returned "agar io guide", "agar io best strategy", "io games like agario" (6 suggestions). No search volume or difficulty figure is available: this project has no authenticated Search Console, no Keyword Planner and no third-party keyword tool.
- **Why it is a separate page:** score-attack-strategy is about score chasing in a shooter; this is arena survival in a growth game, a different mechanic entirely. (closest existing article: `sports-gm-games-without-internet`, similarity **0.25**)
- **First-party angle (only we can write this):** How the momentum on our one-finger steering changes which cut-off angles are actually available, and why we tuned turn radius rather than speed.
- **Inbound link required from:** `score-attack-strategy`
- **Outbound internal links:** `what-are-io-games`, `io-games-without-a-connection`, `score-attack-strategy`, `horde-survival-vs-wave-shooter`
- **CTA:** Google Play listing — https://play.google.com/store/apps/details?id=com.reigncreative.jellyfishio
- **Supporting terms:** agar io strategy; snake io strategy; io game tips; how to win io games; arena survival tips; eat and grow games android
- **Long-tail:** how do you get big in an io game; how to avoid bigger players in io games; best strategy for snake style io games; when should you attack in an io game; how to use the minimap in io games
- **Questions to answer directly:** How do you survive the mid-size stage in an io game? / How do you cut off a larger opponent? / When should you play safe instead of hunting? / What does the minimap tell you?

#### IO Games Without a Connection: What Bots Change

`io-games-without-a-connection` · `action-arcade` · `best-for` · `commercial` · app: `jellyfish-arena-survivor-io` · disclaimer: `comparison`

- **Primary keyword:** "offline io games android"
- **Demand tier:** `unverified-high` — *a judgement label about evidence strength, not a measurement*
- **Evidence observed:** Google autocomplete, captured 2026-09-15 via suggestqueries.google.com (client=firefox, hl=en, gl=us). "offline io games" returned "offline io games android", "best offline io games", "offline paper io games" (10 suggestions). No search volume or difficulty figure is available: this project has no authenticated Search Console, no Keyword Planner and no third-party keyword tool.
- **Why it is a separate page:** best-offline-arcade-games-android is a general arcade list; the io sub-genre has its own attested offline query and a specific honesty issue about bots versus players. (closest existing article: `best-offline-sports-games-android`, similarity **0.76**)
- **First-party angle (only we can write this):** Why our arena is explicitly AI-filled rather than server-backed, what that means for run length and difficulty, and why we state it in the store FAQ.
- **Inbound link required from:** `sports-gm-games-without-internet`
- **Outbound internal links:** `best-offline-arcade-games-android`, `what-are-io-games`, `eat-and-grow-arena-strategy`, `sports-gm-games-without-internet`
- **CTA:** Google Play listing — https://play.google.com/store/apps/details?id=com.reigncreative.jellyfishio
- **Supporting terms:** offline io games; best offline io games; io games without internet; offline arena games android; io games that work offline; single player io games
- **Long-tail:** can io games be played offline; which io games work without internet; are offline io games multiplayer; do offline io games use bots; best offline io games for android
- **Questions to answer directly:** Can io games be played offline? / How do offline io games replace other players? / Do bots feel different from real opponents? / Which io games work without a connection?

#### How to Measure Card Centring Before You Send Anything Off

`how-to-measure-card-centring` · `video-utility` · `how-to` · `informational` · app: `tcg-card-grading-scanner` · disclaimer: `none`

- **Primary keyword:** "card centering tool"
- **Demand tier:** `unverified-high` — *a judgement label about evidence strength, not a measurement*
- **Evidence observed:** Google autocomplete, captured 2026-09-15 via suggestqueries.google.com (client=firefox, hl=en, gl=us). "card centering" returned "card centering tool", "card centering calculator", "card centering app", "card centering tool online", "card centering checker" (10 suggestions); "card centering tool" returned a further ten. No search volume or difficulty figure is available: this project has no authenticated Search Console, no Keyword Planner and no third-party keyword tool.
- **Why it is a separate page:** The site has no trading-card content at all; this app has zero article coverage. (closest existing article: `clean-sheets-explained`, similarity **0.03**)
- **First-party angle (only we can write this):** How our centring overlay handles rounded corners, why we made the guides adjustable rather than fixed, and the photographing conditions that break the measurement.
- **Inbound link required from:** `is-my-card-worth-grading`
- **Outbound internal links:** `is-my-card-worth-grading`, `card-grading-costs-and-tiers`, `card-condition-grading-scales`, `when-a-card-scanner-picks-the-wrong-card`
- **CTA:** Google Play listing — https://play.google.com/store/apps/details?id=com.reigncreative.tcgvaluescanner
- **Supporting terms:** card centering; card centering calculator; card centering tool online; how to check card centering; centering ratio cards; psa centering standards
- **Long-tail:** how do you measure card centering at home; what centering does a grader require; how to photograph a card for centering; why does back centering matter; what is a 55/45 centering ratio
- **Questions to answer directly:** How do you measure card centring? / What centring ratio do graders require? / Does the back of the card matter? / How do you photograph a card for measurement?

#### Is My Card Worth Grading? Working It Out Before You Pay

`is-my-card-worth-grading` · `video-utility` · `best-for` · `commercial` · app: `tcg-card-grading-scanner` · disclaimer: `comparison`

- **Primary keyword:** "is my card worth grading"
- **Demand tier:** `unverified-high` — *a judgement label about evidence strength, not a measurement*
- **Evidence observed:** Google autocomplete, captured 2026-09-15 via suggestqueries.google.com (client=firefox, hl=en, gl=us). "is my card worth grading" returned "is my card worth grading psa", "is my pokemon card worth grading", "how to know if my card is worth grading", "how to tell if a card is worth grading" (7 suggestions); "should i grade my card" returned a further ten. No search volume or difficulty figure is available: this project has no authenticated Search Console, no Keyword Planner and no third-party keyword tool.
- **Why it is a separate page:** No trading-card article exists; this is the decision query the whole category hangs on. (closest existing article: `working-memory-and-training`, similarity **0.04**)
- **First-party angle (only we can write this):** What our scanner gives you and what it does not: a market-value estimate by printing variant and a centring measurement, but no grade and no prediction of one.
- **Inbound link required from:** `card-grading-costs-and-tiers`
- **Outbound internal links:** `card-grading-costs-and-tiers`, `how-to-measure-card-centring`, `card-condition-grading-scales`, `reverse-holo-vs-holo`
- **CTA:** Google Play listing — https://play.google.com/store/apps/details?id=com.reigncreative.tcgvaluescanner
- **Supporting terms:** should i grade my cards; card grading worth it; graded vs raw card value; card grading break even; when to grade a card; card grading fees vs value
- **Long-tail:** how do i know if a card is worth grading; is grading worth it for cheap cards; how much does grading add to card value; what condition does a card need to be worth grading; should i grade a reverse holo
- **Questions to answer directly:** Is grading a card worth the cost? / How do you work out the break-even price? / Which cards are not worth grading? / Does condition change the answer?

#### What Card Grading Costs, and What the Tiers Buy You

`card-grading-costs-and-tiers` · `video-utility` · `reference` · `informational` · app: `tcg-card-grading-scanner` · disclaimer: `comparison`

- **Primary keyword:** "card grading cost"
- **Demand tier:** `unverified-high` — *a judgement label about evidence strength, not a measurement*
- **Evidence observed:** Google autocomplete, captured 2026-09-15 via suggestqueries.google.com (client=firefox, hl=en, gl=us). "card grading cost" returned "card grading cost psa", "card grading cost cgc", "card grading cost comparison", "card grading cost calculator" (10 suggestions); "psa grading" returned "psa grading cost", "psa grading tiers", "psa grading fees" (10 suggestions). No search volume or difficulty figure is available: this project has no authenticated Search Console, no Keyword Planner and no third-party keyword tool.
- **Why it is a separate page:** No trading-card content exists on the site; cost is the most concrete query in the category and has no page. (closest existing article: `how-calendars-and-dating-systems-work`, similarity **0.02**)
- **First-party angle (only we can write this):** Why our app estimates card value but deliberately does not estimate a grade or a grading fee, and what we would need in order to do either responsibly.
- **Inbound link required from:** `is-my-card-worth-grading`
- **Outbound internal links:** `is-my-card-worth-grading`, `how-to-measure-card-centring`, `card-condition-grading-scales`, `when-a-card-scanner-picks-the-wrong-card`
- **CTA:** Google Play listing — https://play.google.com/store/apps/details?id=com.reigncreative.tcgvaluescanner
- **Supporting terms:** card grading companies; psa grading cost; card grading services; card grading tiers; card grading turnaround; card grading fees
- **Long-tail:** how much does it cost to grade a card; what do grading tiers mean; why does declared value change the grading price; how long does card grading take; what are the hidden costs of grading
- **Questions to answer directly:** How much does card grading cost? / What do the grading tiers mean? / Why does declared value affect the price? / What costs do people forget?

#### Reverse Holo vs Holo: Which Printing Are You Holding?

`reverse-holo-vs-holo` · `video-utility` · `comparison` · `informational` · app: `tcg-card-grading-scanner` · disclaimer: `none`

- **Primary keyword:** "reverse holo vs holo"
- **Demand tier:** `unverified-high` — *a judgement label about evidence strength, not a measurement*
- **Evidence observed:** Google autocomplete, captured 2026-09-15 via suggestqueries.google.com (client=firefox, hl=en, gl=us). "reverse holo vs holo" returned "reverse holo vs holofoil", "reverse holo vs holo price", "reverse holo vs holo rare", "reverse holo vs holo which is better" (10 suggestions). No search volume or difficulty figure is available: this project has no authenticated Search Console, no Keyword Planner and no third-party keyword tool.
- **Why it is a separate page:** No trading-card article exists on the site; variant identification is the precondition for every value question in the category. (closest existing article: `how-football-draft-order-works`, similarity **0.01**)
- **First-party angle (only we can write this):** Why our scanner prices normal, holo and reverse holo separately and keeps the chosen variant visible with the result, rather than collapsing them to one average.
- **Inbound link required from:** `card-condition-grading-scales`
- **Outbound internal links:** `card-condition-grading-scales`, `is-my-card-worth-grading`, `when-a-card-scanner-picks-the-wrong-card`, `card-grading-costs-and-tiers`
- **CTA:** Google Play listing — https://play.google.com/store/apps/details?id=com.reigncreative.tcgvaluescanner
- **Supporting terms:** reverse holo vs holofoil; reverse holo vs holo price; what is a reverse holo; holo rare meaning; card printing variants; how to identify card variants
- **Long-tail:** what is the difference between holo and reverse holo; is a reverse holo worth more than a holo; how do i tell if my card is a reverse holo; do variants have different card numbers; which printing is rarer
- **Questions to answer directly:** What is the difference between holo and reverse holo? / Which is worth more? / How do you identify a reverse holo? / Do variants share a card number?

#### When a Card Scanner Picks the Wrong Card

`when-a-card-scanner-picks-the-wrong-card` · `video-utility` · `troubleshooting` · `informational` · app: `tcg-card-grading-scanner` · disclaimer: `none`

- **Primary keyword:** "card scanner wrong card"
- **Demand tier:** `unverified-low` — *a judgement label about evidence strength, not a measurement*
- **Evidence observed:** The exact phrase returned no Google autocomplete suggestions on 2026-09-15, and "food barcode scanner not working" style phrasing also returned nothing. The attested adjacent cluster is "trading card scanner app" ("trading card scanner app reddit", "collector card scanner app" - 10 suggestions) and "pokemon card scanner app reddit". No measured volume available; proposed on intent quality and on this being a named behaviour of our app, which ranks alternatives and lets you correct the match. No search volume or difficulty figure is available: this project has no authenticated Search Console, no Keyword Planner and no third-party keyword tool.
- **Why it is a separate page:** No trading-card article exists; this is a failure-mode page rather than a value or grading page. (closest existing article: `malay-pronunciation-guide`, similarity **0.03**)
- **First-party angle (only we can write this):** Why our scanner shows ranked alternatives instead of a single confident answer, and the reprint case that convinced us a single-answer interface was wrong.
- **Inbound link required from:** `reverse-holo-vs-holo`
- **Outbound internal links:** `reverse-holo-vs-holo`, `how-to-measure-card-centring`, `card-grading-costs-and-tiers`, `is-my-card-worth-grading`
- **CTA:** Google Play listing — https://play.google.com/store/apps/details?id=com.reigncreative.tcgvaluescanner
- **Supporting terms:** trading card scanner app; card scanner not recognising card; pokemon card scanner app; card identification errors; how card scanners work; card scanner accuracy
- **Long-tail:** why does my card scanner pick the wrong card; how do you correct a card scanner match; why do reprints confuse card scanners; can a card scanner tell variants apart; how accurate are card scanner apps
- **Questions to answer directly:** Why does a card scanner match the wrong card? / How do you correct a wrong match? / Can scanners tell reprints apart? / How accurate are card scanning apps?

#### Card Condition: From Near Mint to Damaged, and Who Decides

`card-condition-grading-scales` · `video-utility` · `reference` · `informational` · app: `tcg-card-grading-scanner` · disclaimer: `none`

- **Primary keyword:** "card condition guide"
- **Demand tier:** `unverified-high` — *a judgement label about evidence strength, not a measurement*
- **Evidence observed:** Google autocomplete, captured 2026-09-15 via suggestqueries.google.com (client=firefox, hl=en, gl=us). "card condition guide" returned "card condition guide pokemon", "card condition guide tcgplayer", "card condition guide ebay", "card condition guide mtg", "card condition guidelines" (10 suggestions). No search volume or difficulty figure is available: this project has no authenticated Search Console, no Keyword Planner and no third-party keyword tool.
- **Why it is a separate page:** No trading-card article exists on the site, and condition is a separate system from both centring and price. (closest existing article: `malay-pronunciation-guide`, similarity **0.24**)
- **First-party angle (only we can write this):** Why our app records a condition note against a saved card but never assigns a condition itself, and the line we drew between measurement and judgement.
- **Inbound link required from:** `how-to-measure-card-centring`
- **Outbound internal links:** `how-to-measure-card-centring`, `card-grading-costs-and-tiers`, `reverse-holo-vs-holo`, `is-my-card-worth-grading`
- **CTA:** Google Play listing — https://play.google.com/store/apps/details?id=com.reigncreative.tcgvaluescanner
- **Supporting terms:** card condition guidelines; card condition guide tcgplayer; near mint meaning cards; card condition scale; lightly played condition; graded card scale
- **Long-tail:** what does near mint mean for trading cards; how do marketplace conditions map to grades; what is the difference between lightly played and moderately played; who decides card condition; how strict are card condition standards
- **Questions to answer directly:** What do card condition labels mean? / How do marketplace grades map to numeric grades? / What counts as near mint? / Who sets these standards?

#### How to Meal Plan for the Week Without Overcomplicating It

`how-to-meal-plan-for-the-week` · `health-nutrition` · `how-to` · `informational` · app: `easy-recipes-meal-planner` · disclaimer: `health`

- **Primary keyword:** "how to meal plan for the week"
- **Demand tier:** `unverified-high` — *a judgement label about evidence strength, not a measurement*
- **Evidence observed:** Google autocomplete, captured 2026-09-15 via suggestqueries.google.com (client=firefox, hl=en, gl=us). "how to meal plan" returned "how to meal plan for the week", "how to meal plan for a month", "how to meal plan for weight loss", "how to meal plan on a budget", "how to meal plan for one person" (10 suggestions); "meal planning for the week" returned a further ten. No search volume or difficulty figure is available: this project has no authenticated Search Console, no Keyword Planner and no third-party keyword tool.
- **Why it is a separate page:** The site has protein and keto tracking articles but nothing about planning meals in advance; this app has zero article coverage. (closest existing article: `protein-per-meal-explained`, similarity **0.31**)
- **First-party angle (only we can write this):** Why our planner uses fixed breakfast, lunch, dinner and snack slots rather than a free-form list, and the replanning behaviour that design has to support.
- **Inbound link required from:** `how-to-track-protein-intake`
- **Outbound internal links:** `pantry-inventory-and-grocery-lists`, `batch-cooking-for-the-week`, `recipe-scaling-and-serving-sizes`, `protein-tracking-apps-compared`
- **CTA:** Google Play listing — https://play.google.com/store/apps/details?id=com.reigncreative.easyrecipes
- **Supporting terms:** meal planning for the week; how to meal plan; weekly meal planner; meal planning on a budget; meal plan template; meal planning for beginners
- **Long-tail:** how do you meal plan for a week; how many meals should you plan in advance; meal planning for one person; how to meal plan on a budget; what to do when a meal plan falls apart
- **Questions to answer directly:** How do you plan meals for a week? / How many meals should you plan ahead? / What happens when the plan falls apart? / How do you meal plan on a budget?

#### What Can I Make With What I Have? Cooking From the Cupboard

`cooking-from-what-is-in-the-pantry` · `health-nutrition` · `workflow` · `informational` · app: `easy-recipes-meal-planner` · disclaimer: `health`

- **Primary keyword:** "what can i make with what i have"
- **Demand tier:** `unverified-high` — *a judgement label about evidence strength, not a measurement*
- **Evidence observed:** Google autocomplete, captured 2026-09-15 via suggestqueries.google.com (client=firefox, hl=en, gl=us). "what can i make with what i have" returned "what can i make with what i have in my fridge", "what can i make with what i have app", "what can i make with what i have in my pantry", "what can i cook with what i have" (10 suggestions). No search volume or difficulty figure is available: this project has no authenticated Search Console, no Keyword Planner and no third-party keyword tool.
- **Why it is a separate page:** Nothing on the site covers cooking or recipe selection; the existing health articles are about tracking what you already ate. (closest existing article: `estimation-techniques-explained`, similarity **0.06**)
- **First-party angle (only we can write this):** How our pantry matching decides a recipe is cookable, why we surface what is missing rather than hiding partial matches, and the substitution rule we refused to automate.
- **Inbound link required from:** `why-food-databases-disagree`
- **Outbound internal links:** `pantry-inventory-and-grocery-lists`, `how-to-meal-plan-for-the-week`, `batch-cooking-for-the-week`, `recipe-scaling-and-serving-sizes`
- **CTA:** Google Play listing — https://play.google.com/store/apps/details?id=com.reigncreative.easyrecipes
- **Supporting terms:** what can i cook with what i have; recipe by ingredients; cooking with what is in the fridge; ingredient substitutions; pantry cooking; use up leftovers
- **Long-tail:** what can i make with what i have in my fridge; how to find recipes by ingredients you own; which ingredients can you substitute safely; how to cook without shopping; what to make when the cupboard is nearly empty
- **Questions to answer directly:** How do you find recipes from ingredients you already have? / Which ingredients can be substituted? / When does a missing ingredient matter? / How do you cook without shopping first?

#### Recipe Scaling: Why Doubling a Recipe Is Not Just Doubling

`recipe-scaling-and-serving-sizes` · `health-nutrition` · `how-to` · `informational` · app: `easy-recipes-meal-planner` · disclaimer: `health`

- **Primary keyword:** "recipe scaling"
- **Demand tier:** `unverified-high` — *a judgement label about evidence strength, not a measurement*
- **Evidence observed:** Google autocomplete, captured 2026-09-15 via suggestqueries.google.com (client=firefox, hl=en, gl=us). "recipe scaling" returned "recipe scaling calculator", "recipe scaling spreadsheet", "recipe scaling tool", "recipe scaling app", "recipe scaling formula", "recipe scaling meaning" (10 suggestions). No search volume or difficulty figure is available: this project has no authenticated Search Console, no Keyword Planner and no third-party keyword tool.
- **Why it is a separate page:** serving-size-vs-portion-size is about label serving sizes on packaged food; this is about scaling a cooked recipe, which is a different calculation. (closest existing article: `serving-size-vs-portion-size`, similarity **0.03**)
- **First-party angle (only we can write this):** Why our recipes start at one serving and scale up rather than down, and the rounding rule we apply so scaled ingredient amounts stay measurable in a real kitchen.
- **Inbound link required from:** `serving-size-vs-portion-size`
- **Outbound internal links:** `serving-size-vs-portion-size`, `recipe-nutrition-figures-and-why-they-move`, `how-to-meal-plan-for-the-week`, `batch-cooking-for-the-week`
- **CTA:** Google Play listing — https://play.google.com/store/apps/details?id=com.reigncreative.easyrecipes
- **Supporting terms:** recipe scaling calculator; how to double a recipe; recipe scaling formula; scaling recipes up and down; serving size conversion; recipe portion calculator
- **Long-tail:** how do you scale a recipe up; does cooking time double when you double a recipe; how to halve a recipe with eggs; how does scaling change nutrition per serving; recipe scaling for a crowd
- **Questions to answer directly:** How do you scale a recipe? / Does cooking time scale with quantity? / How do you halve a recipe that uses one egg? / Does nutrition per serving change when you scale?

#### Recipe Nutrition Figures and Why Two Apps Disagree

`recipe-nutrition-figures-and-why-they-move` · `health-nutrition` · `troubleshooting` · `informational` · app: `easy-recipes-meal-planner` · disclaimer: `health`

- **Primary keyword:** "recipe nutrition calculator"
- **Demand tier:** `unverified-high` — *a judgement label about evidence strength, not a measurement*
- **Evidence observed:** Google autocomplete, captured 2026-09-15 via suggestqueries.google.com (client=firefox, hl=en, gl=us). "recipe nutrition calculator" returned "recipe nutrition calculator free", "recipe nutrition calculator app", "recipe nutrition calculator from link", "recipe nutrition calculator online" (10 suggestions); the adjacent seed "macro calculator accuracy" returned "which macro calculator is most accurate" and "most accurate macro calculator". No search volume or difficulty figure is available: this project has no authenticated Search Console, no Keyword Planner and no third-party keyword tool.
- **Why it is a separate page:** why-food-databases-disagree is about packaged-food database entries; this is about recipe-level calculation, yield and cooking losses, which that article does not cover. The two must cross-link and state the boundary explicitly. (closest existing article: `reading-nutrition-labels`, similarity **0.35**)
- **First-party angle (only we can write this):** Why our app shows nutrition only for recipes where the ingredient data supports it, and why we leave the figure blank rather than estimating it.
- **Inbound link required from:** `why-food-databases-disagree`
- **Outbound internal links:** `why-food-databases-disagree`, `added-sugars-vs-total-sugars`, `recipe-scaling-and-serving-sizes`, `low-carb-tracking-apps-compared`
- **CTA:** Google Play listing — https://play.google.com/store/apps/details?id=com.reigncreative.easyrecipes
- **Supporting terms:** recipe nutrition calculator free; how to calculate nutrition for a recipe; recipe calorie calculator; cooking losses nutrition; yield after cooking; nutrition per serving calculation
- **Long-tail:** why do recipe nutrition calculators give different numbers; does cooking change the calories in a recipe; how is nutrition per serving calculated; should you weigh food raw or cooked; how accurate are recipe nutrition figures
- **Questions to answer directly:** Why do recipe nutrition calculators disagree? / Does cooking change a recipe calorie count? / Should you weigh ingredients raw or cooked? / How accurate are recipe nutrition figures?

#### Keeping a Food Allergy and Reaction Log That Is Actually Useful

`tracking-food-allergies-and-reactions` · `health-nutrition` · `feature-explainer` · `informational` · app: `easy-recipes-meal-planner` · disclaimer: `health`

- **Primary keyword:** "food allergy tracker"
- **Demand tier:** `unverified-high` — *a judgement label about evidence strength, not a measurement*
- **Evidence observed:** Google autocomplete, captured 2026-09-15 via suggestqueries.google.com (client=firefox, hl=en, gl=us). "food allergy tracker" returned "food allergy tracker app", "food allergy tracker printable", "food intolerance tracker app", "food intolerance tracker" (10 suggestions). No search volume or difficulty figure is available: this project has no authenticated Search Console, no Keyword Planner and no third-party keyword tool.
- **Why it is a separate page:** reading-nutrition-labels covers allergen declarations on packaging; this is about logging reactions over time, which nothing on the site addresses. (closest existing article: `why-food-databases-disagree`, similarity **0.37**)
- **First-party angle (only we can write this):** How our allergy log flags a recipe when an ingredient matches one you recorded, and why the flag is a prompt to check rather than a safety guarantee - we say so in the app and will say so here.
- **Inbound link required from:** `reading-nutrition-labels`
- **Outbound internal links:** `reading-nutrition-labels`, `how-to-meal-plan-for-the-week`, `cooking-from-what-is-in-the-pantry`, `why-food-databases-disagree`
- **CTA:** Google Play listing — https://play.google.com/store/apps/details?id=com.reigncreative.easyrecipes
- **Supporting terms:** food allergy tracker app; food intolerance tracker; food reaction diary; elimination diet log; allergy symptom tracking; food diary for allergies
- **Long-tail:** how do you keep a food allergy diary; what should you record after a reaction; can a food log identify an allergy; how long should you keep a food reaction log; food intolerance tracker app
- **Questions to answer directly:** What should a food allergy log record? / Can a food diary identify an allergy? / How long should you keep a reaction log? / What are the limits of self-tracking?

#### Pantry Inventory and Grocery Lists That Stay Accurate

`pantry-inventory-and-grocery-lists` · `health-nutrition` · `workflow` · `informational` · app: `easy-recipes-meal-planner` · disclaimer: `health`

- **Primary keyword:** "pantry inventory app"
- **Demand tier:** `unverified-high` — *a judgement label about evidence strength, not a measurement*
- **Evidence observed:** Google autocomplete, captured 2026-09-15 via suggestqueries.google.com (client=firefox, hl=en, gl=us). "pantry inventory app" returned "pantry inventory app free", "pantry inventory app with barcode scanner", "pantry inventory app android", "pantry inventory app with recipes" (10 suggestions); "grocery list app" returned a further ten. No search volume or difficulty figure is available: this project has no authenticated Search Console, no Keyword Planner and no third-party keyword tool.
- **Why it is a separate page:** No article on the site covers kitchen organisation or shopping; the closest is barcode scanning inside the keto tracker, which is about logging what you ate. (closest existing article: `android-app-permissions-explained`, similarity **0.21**)
- **First-party angle (only we can write this):** What our pantry tracker deliberately does not ask you to record, and why we decided partial accuracy beats an inventory nobody maintains.
- **Inbound link required from:** `how-to-hit-a-protein-goal`
- **Outbound internal links:** `cooking-from-what-is-in-the-pantry`, `how-to-meal-plan-for-the-week`, `batch-cooking-for-the-week`, `recipe-scaling-and-serving-sizes`
- **CTA:** Google Play listing — https://play.google.com/store/apps/details?id=com.reigncreative.easyrecipes
- **Supporting terms:** pantry inventory; kitchen inventory app; grocery list app; pantry tracker; food inventory management home; shopping list from meal plan
- **Long-tail:** how do you keep a pantry inventory; is a pantry tracking app worth it; how to build a grocery list from a meal plan; what should you not bother tracking in a pantry; pantry inventory app with barcode scanner
- **Questions to answer directly:** How do you keep a pantry inventory up to date? / What is worth tracking and what is not? / How does a meal plan generate a shopping list? / Do pantry apps actually save money?

#### Batch Cooking Ideas That Survive Four Days in the Fridge

`batch-cooking-for-the-week` · `health-nutrition` · `listicle` · `informational` · app: `easy-recipes-meal-planner` · disclaimer: `health`

- **Primary keyword:** "batch cooking ideas"
- **Demand tier:** `unverified-high` — *a judgement label about evidence strength, not a measurement*
- **Evidence observed:** Google autocomplete, captured 2026-09-15 via suggestqueries.google.com (client=firefox, hl=en, gl=us). "batch cooking" returned "batch cooking recipes", "batch cooking ideas", "batch cooking freezer meals", "batch cooking meal prep", "batch cooking meaning" (10 suggestions); "keto meal prep" returned a parallel ten-suggestion cluster. No search volume or difficulty figure is available: this project has no authenticated Search Console, no Keyword Planner and no third-party keyword tool.
- **Why it is a separate page:** No cooking or meal-prep article exists on the site; the nutrition articles cover measurement rather than preparation. (closest existing article: `why-food-databases-disagree`, similarity **0.02**)
- **First-party angle (only we can write this):** How recipe scaling in our planner interacts with batch portions, and the serving-size rounding that keeps a scaled batch dividing evenly into containers.
- **Inbound link required from:** `protein-per-meal-explained`
- **Outbound internal links:** `how-to-meal-plan-for-the-week`, `recipe-scaling-and-serving-sizes`, `pantry-inventory-and-grocery-lists`, `added-sugars-vs-total-sugars`
- **CTA:** Google Play listing — https://play.google.com/store/apps/details?id=com.reigncreative.easyrecipes
- **Supporting terms:** batch cooking; batch cooking recipes; batch cooking meal prep; freezer meals; meal prep for the week; batch cooking meaning
- **Long-tail:** what foods are best for batch cooking; how long does batch cooked food last; how do you portion batch cooked meals; which meals freeze well; batch cooking on a budget
- **Questions to answer directly:** What foods batch cook well? / How long does batch-cooked food keep? / Which dishes should not be batch cooked? / How do you portion batch meals?


---

## Reproducing the evidence

The autocomplete capture is reproducible. For any keyword in this document:

```
curl -s "https://suggestqueries.google.com/complete/search?client=firefox&hl=en&gl=us&q=<url-encoded+phrase>"
```

Results move over time. Anything captured after 2026-09-15 will differ, and that is expected —
autocomplete is a live surface, which is exactly why it is labelled with a date here and never
presented as a stable metric.
