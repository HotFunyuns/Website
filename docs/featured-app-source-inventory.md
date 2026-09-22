# Featured app source inventory and publication exclusions

What the two featured app projects actually contain, what the website may say
about them, and what must never be republished. Compiled **2026-09-21** from a
read-only inspection of:

- `C:\Users\regal\Desktop\Mental Math Champion` → **Mental Math & Memory Games**
- `C:\Users\regal\Desktop\History` → **World History Timeline Sim**

Neither project was modified, formatted, built, committed or deleted. `git
status` in both was clean after the inspection.

---

## 1. Mental Math & Memory Games — what is in the project

| Area | Contents |
| --- | --- |
| Playable modes | 255 total — 39 math, 41 memory, 176 cognitive across 17 groups |
| Techniques library | 49 techniques in 7 categories, each with steps, a worked example, a "best for" note, a named common mistake and a 2-question quiz |
| Cognitive test data | 24 domains, ~130 item kinds, ~22,000 lines of item banks |
| Assessments | 28 (2 legacy + 26 hub), 5–25 minutes, 11–60 items each |
| Progression | XP, 99 levels, 78 achievements, 6 bosses, 6 flash decks, 13 themes, progress charts |
| Bundled imagery | 7 PNGs only — app icons and splash. **No screenshots or illustrations exist to reuse.** |

### 1.1 The shipping-status ruling that governs Cohort B

The project's `CHANGELOG.md` marks every entry after 2026-06-10 as
`[Unreleased]`, including a rename that is *confirmed not live*. So the markers
are unmaintained and cannot be trusted either way.

This was resolved against the live Play listing instead. Its full description
advertises: mental math games, memory games, multiplication / addition /
subtraction / division practice, number and sequence memory games, a daily math
challenge, math speed training, timed sprints, accuracy rounds, survival
challenges, boss quizzes, techniques for percentages / estimation / number
patterns / faster calculation, and tracking of scores, accuracy, streaks,
response time and personal bests.

The description contains **none** of: "IQ test", "cognitive test",
"assessment", "personality", "16-type", "brain age", "percentile", "processing
speed", "spatial", "vocabulary", "reaction", "logic puzzle", "pattern
recognition".

**Ruling applied to all 100 Cohort B articles:** the cognitive-assessment layer
(Cognitive IQ Test, 26-assessment hub, 16-type personality inventory, the 176
cognitive modes) is treated as **not shipped**. Articles cover IQ, reasoning,
logic, memory and attention as *subject matter*, but describe as app features
only the verified-shipped set above. **No article states or implies that this
app tests, measures or estimates the reader's IQ.**

### 1.2 Claim-safety, from the app's own source

`src/data/cognitiveTest/norms.ts`:

> THIS IS A PRELIMINARY INTERNAL SCALE, NOT A VALIDATED NORM. No population
> sample, age norms, reliability or validity study backs it.

with `validated: false`. `src/data/cognitiveTest/brainAgeScale.ts`:

> PRELIMINARY AND UNVALIDATED. No population sample backs these bands.

with `BRAIN_AGE_SCALE_VALIDATED = false`. In-app outputs are labelled
"Estimated Cognitive Percentile", "Estimated IQ-Style Range", "Brain
Performance Age Estimate" — never "your IQ" — and the in-app disclaimer says it
is *"not a clinical or professionally administered IQ test."*

The app is therefore honest about its own limits, and the website matches that
standard: no validated, clinical, official or standardised IQ claim; no
biological brain-age claim; no claim that practice raises intelligence,
prevents cognitive decline, or treats or diagnoses anything.

---

## 2. World History Timeline Sim — what is in the project

| Bank | Entries |
| --- | ---: |
| Historical events | 5,153 |
| Flashcards | 12,026 in 391 decks |
| Glossary terms | 3,787 |
| Time Travel scenarios | 2,497 |
| Survive scenarios | 2,106 |
| "Facts" | 2,190 |
| Iceberg entries | 1,810 |
| Detective cases | 1,470 |
| Invention chains | 1,041 |
| Missions | 928 |
| Quiz questions | 745 in 19 sets |
| Map items | 636 |
| Daily-life profiles | 478 |
| People | 425 |
| Civilizations | 239 |
| Wars | 209 |
| Leader campaigns | 209 |
| Lessons | 189 |
| Landmarks | 168 |
| What-if matchups | 166 |
| Artifacts | 119 |
| Campaign chapters | 116 |

Counted by evaluating each bank through the app's own TypeScript loader
(`scripts/content-loader.js`) and reading `.length` off the exported array —
not by pattern-matching the source. 81 route files, 76 user-visible screens,
24 advertised game modes, 10 mini-game modules.

Coverage is genuinely global: 239 civilizations spanning Mesopotamia, Egypt and
Nubia, sub-Saharan Africa, Greece and Rome, Europe, South Asia, East Asia,
Central Asia, a notably deep Southeast Asia set, the Americas and Oceania.

### 2.1 The accuracy ruling that governs Cohort C

**The app's content carries no sources.** Across the whole project there is no
citation, bibliography, footnote, historian credit or record of external
review, and the release verifier checks data integrity only — duplicate ids,
answerable questions, resolving references — never historical accuracy.

**The app's data also disagrees with itself.** 49 duplicate war names, 42
duplicate civilizations and about 95 duplicate people, several with conflicting
dates: "Arab-Byzantine Wars" is 629–1050 in one record and 629–1180 in another;
"Mongol Conquests" 1206–1294 against 1206–1368.

Applied to all 100 Cohort C articles:

- The app's data is used as a **topic map, never as evidence.**
- Every date, name, place, sequence and causal claim published is
  independently verified against an external reliable source and cited.
- No article describes the app's content as sourced, cited, fact-checked,
  peer-reviewed or historian-approved, because none of that is true.
- Figures from the project's README / MEMORY / CHANGELOG are never quoted —
  the inventory proved them stale (they claim 3,578 events against an actual
  5,153, and 3,006 flashcards against an actual 12,026). The Play listing's
  "over 2,000 events" is used instead, which is both first-party and true.

---

## 3. Must never be published

Named by file and kind. **No secret value is reproduced in this document or in
any article.**

### Mental Math & Memory Games

| File | Kind |
| --- | --- |
| `google-services.json`, `GoogleService-Info.plist` | Firebase config — API keys, project ids, storage buckets |
| `src/config/admob.ts` | Production AdMob ad unit IDs |
| `app.json` | AdMob app IDs, EAS project id |
| `src/config/appConfig.ts` | Play product ids, trial offer id, unreleased price figures |
| `src/services/remoteConfigService.ts` | The full Remote Config key list — a map of every server-side kill switch |
| `MEMORY.md`, `CHANGELOG.md`, `AGENTS.md` | Internal engineering rules, monetization cadence, unreleased roadmap |

Proprietary logic not to be described in publishable detail: the ad cadence
algorithm, the premium auto-popup and review-prompt gating, the rewarded →
interstitial fallback chain, and the deterministic item-generation and seeding
scheme.

### World History Timeline Sim

AdMob app and unit IDs in `app.json` and `src/runtime/ads.ts`; Firebase config
files; the EAS project id; internal engineering notes.

### The item and content banks — never reproduced

The brain-training app's ~22,000 lines of item content, its 88 personality
statements, its 60 Big Five statements and its 16 profile write-ups, and the
history app's event, quiz, flashcard and scenario banks are the products' core
assets. Publishing items would also make them memorisable, which would
invalidate every score the app produces.

Articles may describe **item kinds and formats** ("a 3×3 matrix with one cell
missing"). Every worked example published on this site is **written fresh for
the article and independently checked** — never lifted from an app bank.

---

## 4. Copyright and licensing exclusions

| # | Item | Decision |
| --- | --- | --- |
| 1 | **All 107 history-app illustrations + 5 launch icons are AI-generated (Google Gemini).** Ownership is asserted only in a code comment; protectability of prompt-generated images is legally unsettled and the generating service's terms were not reviewed. | **Excluded.** No app artwork is used on the website. Flagged for owner and counsel. |
| 2 | **13 "Image Credits" entries** in the history app are citations to Wikimedia / NASA / NARA works that **do not exist as files in the project**. Two CC BY-SA entries (Hagia Sophia, Machu Picchu) carry **no attribution**, which the licence requires. | **Excluded.** The repo's licence labels are unverified second-hand claims. Attribution gap flagged for owner. |
| 3 | **Orphaned icon files** including one carrying the pre-rebrand name "Time Travel History". | **Excluded** — publishing it would recirculate a retired brand name. |
| 4 | **The four-letter personality axis scheme** (E/I, S/N, T/F, J/P) is the framework popularised by a trademarked commercial instrument. | The strings "MBTI", "Myers-Briggs" and "official 16 personalities" appear nowhere in this release, in any field including alt text and schema. |
| 5 | **Commercial test names** — WAIS, Stanford-Binet, Raven's Progressive Matrices, Mensa, Lumosity, Cambridge Brain Sciences. | Not named as equivalents to anything in the app. Public-domain paradigms (n-back, digit span, Stroop, mental rotation) are described generically. |
| 6 | **Method-origin claims** — "Vedic math", "Russian peasant multiplication", "lattice method". | The app's own hedged phrasing is reused ("popularly associated with"); no national-origin claim is asserted as sourced fact. |
| 7 | **Platform emoji glyphs.** | Not extracted into web assets. |
| 8 | **Memorial and protected sites** in the landmark bank — Auschwitz-Birkenau, Tuol Sleng, Choeung Ek, Robben Island, and others. | Kept framed as places of remembrance, with no implication of endorsement or affiliation. |
| 9 | **Originality of the ~22,000 lines of item content** rests solely on the developer's own in-code assertions. No LICENSE, NOTICE or THIRD_PARTY_NOTICES file exists in either project. | **No article claims "every question is original".** Flagged for written owner confirmation. |

Absence of attribution is not proof of ownership. Where rights were not clearly
established, the asset was excluded rather than assumed.

---

## 5. Images on this site

No image from either app project is used. Article pages carry no in-body
images at all — the export requires `alt`, `width` and `height` on every
`<img>`, which Markdown images cannot emit, and the audit enforces it. Each
article's social preview is the site's own Open Graph card, and every figure
that matters is described in text, which is also what makes the content legible
to search and retrieval crawlers.
