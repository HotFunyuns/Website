# Search intent and cannibalization check — the next 100 articles

Prepared 2026-09-15 · Agent A5 · 100 proposed articles checked against all 175 published articles and against each other.

## Method

Every proposed article was scored against **all 175 existing articles** (17,500 comparisons) and
against **each of the other 99 proposals** (4,950 comparisons). This is computed, not eyeballed.

The score is:

```
similarity = 0.55 * Dice(primaryKeyword tokens)
           + 0.45 * cosine(weighted bag of words)
```

where the weighted bag draws on primaryKeyword (weight 3), title (2), slug (2) and description (1),
lowercased, stop-worded and stemmed only by simple tokenisation. Primary keyword is weighted
heaviest deliberately: **cannibalization is a query-level problem**, not a prose-similarity problem.
Two articles can share vocabulary and compete for nothing; two articles can read very differently and
still fight over one query.

### Thresholds

| Band | Treatment |
|---|---|
| >= 0.85 on titles (word overlap) | **Hard fail.** Preflight rejects it. 0 occurrences across all 275. |
| >= 0.45 similarity | **Flagged.** Requires an explicit, documented differentiation rule before writing. |
| 0.30 – 0.44 | Noted. Normal for same-app or same-category articles. No action needed. |
| < 0.30 | Clear. |

### The single most important caveat about these scores

**This metric is lexical, and it over-reports for parallel topics.** "Is Marathi hard to learn?" and
"Is Vietnamese hard to learn?" share almost every word except the one that matters. They score 0.62
and they compete for **nothing** — nobody searching one is served by the other. The same applies to
every per-language and per-sport parallel in this batch.

So a high score here is a **prompt to check**, not a verdict. Each flagged pair below is resolved
individually, and the resolution says either "different query, no action" or "same query space,
here is the editorial rule".

## Distribution of new-vs-existing similarity

| Band | Articles |
|---|---|
| 0.70+ | 2 |
| 0.60-0.69 | 10 |
| 0.50-0.59 | 7 |
| 0.40-0.49 | 9 |
| 0.30-0.39 | 33 |
| under 0.30 | 39 |

Mean closest-existing similarity: **0.322**.
52 of the 100 target apps with **zero existing coverage**, so their
cannibalization risk is structurally near-zero regardless of what the lexical score says.

## Every new article, with its closest existing match

| New article | Closest existing | Score | Band |
|---|---|---|---|
| `should-i-learn-malay-or-indonesian` | `malay-vs-indonesian-differences` | 0.76 | **flagged** |
| `io-games-without-a-connection` | `best-offline-sports-games-android` | 0.76 | **flagged** |
| `is-malay-easy-to-learn` | `learn-malay-beginners-guide` | 0.69 | **flagged** |
| `tennis-career-sim-guide` | `baseball-career-sim-guide` | 0.69 | **flagged** |
| `mma-fantasy-draft-strategy` | `how-fantasy-draft-strategy-works` | 0.65 | **flagged** |
| `is-khmer-hard-to-learn` | `learn-khmer-beginners-guide` | 0.64 | **flagged** |
| `learn-marathi-beginners-guide` | `learn-malay-beginners-guide` | 0.63 | **flagged** |
| `learn-shanghainese-beginners-guide` | `learn-malay-beginners-guide` | 0.63 | **flagged** |
| `is-lao-hard-to-learn` | `is-vietnamese-hard-to-learn` | 0.63 | **flagged** |
| `building-a-lao-course-from-scratch` | `learn-lao-beginners-guide` | 0.63 | **flagged** |
| `khmer-vs-thai-script` | `khmer-script-explained` | 0.63 | **flagged** |
| `is-marathi-hard-to-learn` | `is-vietnamese-hard-to-learn` | 0.62 | **flagged** |
| `offline-tower-defence-on-android` | `best-offline-arcade-games-android` | 0.58 | **flagged** |
| `mental-division-tricks` | `mental-math-tricks-that-work` | 0.56 | **flagged** |
| `how-golf-q-school-works` | `golf-scoring-explained` | 0.56 | **flagged** |
| `marathi-study-plan-first-month` | `how-long-does-it-take-to-learn-russian` | 0.55 | **flagged** |
| `rugby-draft-and-squad-building` | `soccer-draft-xi-guide` | 0.54 | **flagged** |
| `what-are-io-games` | `sports-gm-games-without-internet` | 0.54 | **flagged** |
| `anime-hair-colour-meanings` | `color-palettes-for-anime-art` | 0.53 | **flagged** |
| `shanghainese-vs-mandarin-differences` | `cantonese-vs-mandarin-differences` | 0.48 | **flagged** |
| `malay-affixes-guide` | `malay-vs-indonesian-differences` | 0.46 | **flagged** |
| `choosing-a-history-app-for-students` | `world-history-timeline-guide` | 0.46 | **flagged** |
| `how-to-play-mkv-files-on-android` | `android-video-player-guide` | 0.46 | **flagged** |
| `vertical-shooter-games-on-android` | `best-offline-arcade-games-android` | 0.44 | noted |
| `marathi-alphabet-and-devanagari` | `vietnamese-alphabet-explained` | 0.43 | noted |
| `shmup-difficulty-tiers` | `how-quiz-difficulty-works` | 0.41 | noted |
| `lao-tone-rules` | `lao-alphabet-explained` | 0.4 | noted |
| `designing-memory-games-beyond-matching-pairs` | `memory-techniques-that-work` | 0.4 | noted |
| `lao-phrases-for-travellers` | `lao-alphabet-explained` | 0.39 | noted |
| `how-rugby-scoring-works` | `boxing-scoring-explained` | 0.39 | noted |
| `golf-tournament-formats` | `golf-scoring-explained` | 0.39 | noted |
| `khmer-greetings-and-honorifics` | `khmer-script-explained` | 0.38 | noted |
| `malay-phrases-for-travel` | `malay-vs-indonesian-differences` | 0.38 | noted |
| `how-to-study-history-on-your-own` | `history-of-shoot-em-up-games` | 0.38 | noted |
| `counterfactual-history-and-what-if-scenarios` | `history-of-shoot-em-up-games` | 0.38 | noted |
| `wu-chinese-and-where-shanghainese-sits` | `what-is-a-tonal-language` | 0.37 | noted |
| `golf-handicap-for-beginners` | `how-a-golf-cut-works` | 0.37 | noted |
| `tower-defense-strategy-basics` | `reading-a-defense-basics` | 0.37 | noted |
| `tracking-food-allergies-and-reactions` | `why-food-databases-disagree` | 0.37 | noted |
| `russian-word-order-and-emphasis` | `batting-order-strategy-explained` | 0.36 | noted |
| `manga-vs-anime-differences` | `anime-terminology-glossary` | 0.36 | noted |
| `subtitles-not-working-on-android` | `working-memory-and-training` | 0.36 | noted |
| `ship-loadouts-and-upgrade-priority` | `space-shooter-arcade-guide` | 0.36 | noted |
| `shanghainese-tones-and-tone-sandhi` | `thai-tones-explained` | 0.35 | noted |
| `khmer-fonts-on-android` | `khmer-script-explained` | 0.35 | noted |
| `russian-vowel-reduction` | `how-long-does-it-take-to-learn-russian` | 0.35 | noted |
| `how-to-shade-anime-hair` | `color-palettes-for-anime-art` | 0.35 | noted |
| `tennis-scoring-for-beginners` | `golf-scoring-explained` | 0.35 | noted |
| `pressure-and-nerves-in-golf-sims` | `golf-career-sim-guide` | 0.35 | noted |
| `recipe-nutrition-figures-and-why-they-move` | `reading-nutrition-labels` | 0.35 | noted |
| `khmer-phrases-for-cambodia-travel` | `learn-khmer-beginners-guide` | 0.34 | noted |
| `how-boxing-records-are-written` | `boxing-scoring-explained` | 0.34 | noted |
| `russian-cursive-handwriting-guide` | `learn-russian-cyrillic-beginners-guide` | 0.33 | noted |
| `rugby-positions-and-numbers` | `basketball-positions-explained` | 0.33 | noted |
| `russian-verbs-of-motion` | `russian-cases-explained-for-beginners` | 0.32 | noted |
| `choosing-russian-verb-aspect` | `how-long-does-it-take-to-learn-russian` | 0.32 | noted |
| `style-matchups-in-a-fight-simulator` | `mma-boxing-fight-draft-guide` | 0.32 | noted |
| `what-does-td-mean-in-games` | `word-game-strategy-guide` | 0.32 | noted |
| `tennis-playing-styles` | `anime-art-styles-explained` | 0.31 | noted |
| `how-tennis-qualifiers-work` | `how-calendars-and-dating-systems-work` | 0.31 | noted |
| `how-to-meal-plan-for-the-week` | `protein-per-meal-explained` | 0.31 | noted |
| `how-mma-judging-criteria-work` | `mma-boxing-fight-draft-guide` | 0.28 | clear |
| `how-fight-cards-are-built` | `how-draft-lotteries-work` | 0.28 | clear |
| `tower-types-and-what-they-counter` | `reading-a-defense-basics` | 0.28 | clear |
| `strokes-gained-for-club-golfers` | `tdee-and-energy-balance` | 0.27 | clear |
| `do-brain-training-apps-work` | `how-calendars-and-dating-systems-work` | 0.26 | clear |
| `rugby-union-vs-rugby-league` | `how-soccer-league-tables-work` | 0.25 | clear |
| `aura-towers-and-support-stacking` | `reading-a-defense-basics` | 0.25 | clear |
| `eat-and-grow-arena-strategy` | `sports-gm-games-without-internet` | 0.25 | clear |
| `serve-and-volley-strategy` | `how-fantasy-draft-strategy-works` | 0.24 | clear |
| `club-distance-gapping` | `how-a-golf-cut-works` | 0.24 | clear |
| `card-condition-grading-scales` | `malay-pronunciation-guide` | 0.24 | clear |
| `countering-armoured-and-flying-enemies` | `reading-a-defense-basics` | 0.23 | clear |
| `how-tennis-ranking-points-work` | `tdee-and-energy-balance` | 0.22 | clear |
| `tennis-ranking-decay-and-scheduling` | `how-player-career-modes-work` | 0.21 | clear |
| `pantry-inventory-and-grocery-lists` | `android-app-permissions-explained` | 0.21 | clear |
| `shanghainese-phrases-for-beginners` | `language-learning-apps-compared` | 0.14 | clear |
| `lao-greetings-and-politeness` | `lao-alphabet-explained` | 0.13 | clear |
| `is-shanghainese-a-dialect-or-a-language` | `learning-a-language-without-a-teacher` | 0.11 | clear |
| `marathi-verb-basics` | `italian-verb-conjugation-basics` | 0.1 | clear |
| `striking-vs-grappling-in-mma` | `mma-boxing-fight-draft-guide` | 0.06 | clear |
| `cooking-from-what-is-in-the-pantry` | `estimation-techniques-explained` | 0.06 | clear |
| `marathi-vs-hindi-differences` | `language-learning-apps-compared` | 0.05 | clear |
| `the-silk-road-for-beginners` | `color-theory-for-beginners` | 0.05 | clear |
| `shonen-vs-seinen` | `anime-genres-explained` | 0.05 | clear |
| `marathi-numbers-and-counting` | `how-historians-date-events` | 0.04 | clear |
| `marathi-phrases-with-meaning` | `language-learning-plateau` | 0.04 | clear |
| `why-rome-fell` | `how-historians-date-events` | 0.04 | clear |
| `is-my-card-worth-grading` | `working-memory-and-training` | 0.04 | clear |
| `how-to-remember-historical-dates` | `how-historians-date-events` | 0.03 | clear |
| `southpaw-vs-orthodox` | `mma-boxing-fight-draft-guide` | 0.03 | clear |
| `how-to-measure-card-centring` | `clean-sheets-explained` | 0.03 | clear |
| `when-a-card-scanner-picks-the-wrong-card` | `malay-pronunciation-guide` | 0.03 | clear |
| `recipe-scaling-and-serving-sizes` | `serving-size-vs-portion-size` | 0.03 | clear |
| `shanghainese-romanisation-choices` | `golf-course-management-basics` | 0.02 | clear |
| `what-caused-the-bronze-age-collapse` | `major-eras-of-world-history` | 0.02 | clear |
| `card-grading-costs-and-tiers` | `how-calendars-and-dating-systems-work` | 0.02 | clear |
| `batch-cooking-for-the-week` | `why-food-databases-disagree` | 0.02 | clear |
| `rugby-forwards-and-backs` | `how-to-build-a-balanced-basketball-roster` | 0.01 | clear |
| `reverse-holo-vs-holo` | `how-football-draft-order-works` | 0.01 | clear |

## Flagged pairs, new vs existing — 23 of them, each resolved

### `should-i-learn-malay-or-indonesian` vs `malay-vs-indonesian-differences` — 0.76

- **New page targets:** "should i learn malay or indonesian"
- **Existing page targets:** "malay vs indonesian"
- **Differentiation:** malay-vs-indonesian-differences explains how the two languages differ; this answers the separate question of which one a learner should pick, and says when the answer is not ours.

### `io-games-without-a-connection` vs `best-offline-sports-games-android` — 0.76

- **New page targets:** "offline io games android"
- **Existing page targets:** "offline sports games android"
- **Differentiation:** best-offline-arcade-games-android is a general arcade list; the io sub-genre has its own attested offline query and a specific honesty issue about bots versus players.

### `is-malay-easy-to-learn` vs `learn-malay-beginners-guide` — 0.69

- **New page targets:** "is malay easy to learn"
- **Existing page targets:** "learn malay for beginners"
- **Differentiation:** We answer this difficulty question for Thai and Vietnamese but not Malay, and no existing Malay article addresses difficulty at all.

### `tennis-career-sim-guide` vs `baseball-career-sim-guide` — 0.69

- **New page targets:** "tennis career sim game"
- **Existing page targets:** "baseball career sim game"
- **Differentiation:** The site has career-sim guides for six sports and none for tennis; this app has zero article coverage.

### `mma-fantasy-draft-strategy` vs `how-fantasy-draft-strategy-works` — 0.65

- **New page targets:** "mma fantasy draft"
- **Existing page targets:** "fantasy draft strategy"
- **Differentiation:** how-fantasy-draft-strategy-works is sport-agnostic and written around team sports; combat sports draft on style matchups and weight classes, which that article does not address.

### `is-khmer-hard-to-learn` vs `learn-khmer-beginners-guide` — 0.64

- **New page targets:** "is khmer hard to learn"
- **Existing page targets:** "learn khmer for beginners"
- **Differentiation:** We answer the difficulty question for Thai and Vietnamese but not Khmer; the Khmer script article explains the writing system without assessing overall difficulty.

### `learn-marathi-beginners-guide` vs `learn-malay-beginners-guide` — 0.63

- **New page targets:** "learn marathi for beginners"
- **Existing page targets:** "learn malay for beginners"
- **Differentiation:** The site has eight per-language beginner guides and none for Marathi; this app has zero article coverage of any kind.

### `learn-shanghainese-beginners-guide` vs `learn-malay-beginners-guide` — 0.63

- **New page targets:** "learn shanghainese for beginners"
- **Existing page targets:** "learn malay for beginners"
- **Differentiation:** Eight per-language beginner guides exist and none covers Shanghainese; this app has zero article coverage.

### `is-lao-hard-to-learn` vs `is-vietnamese-hard-to-learn` — 0.63

- **New page targets:** "is lao hard to learn"
- **Existing page targets:** "is vietnamese hard to learn"
- **Differentiation:** We answer this question for Thai and Vietnamese but not Lao, and the Lao vs Thai article compares the two languages rather than assessing Lao difficulty on its own.

### `building-a-lao-course-from-scratch` vs `learn-lao-beginners-guide` — 0.63

- **New page targets:** "learn lao app"
- **Existing page targets:** "learn lao for beginners"
- **Differentiation:** The existing Lao beginner guide is a learner-facing how-to; this answers the app-seeking query with a build story, which is a different intent and a different page.

### `khmer-vs-thai-script` vs `khmer-script-explained` — 0.63

- **New page targets:** "khmer vs thai script"
- **Existing page targets:** "khmer script explained"
- **Differentiation:** lao-vs-thai-differences compares Lao and Thai as languages; nothing on the site compares the Khmer and Thai writing systems.

### `is-marathi-hard-to-learn` vs `is-vietnamese-hard-to-learn` — 0.62

- **New page targets:** "is marathi hard to learn"
- **Existing page targets:** "is vietnamese hard to learn"
- **Differentiation:** We answer this difficulty question for Thai and Vietnamese only; Marathi has no page of any kind on the site.

### `offline-tower-defence-on-android` vs `best-offline-arcade-games-android` — 0.58

- **New page targets:** "best tower defense games android offline"
- **Existing page targets:** "offline arcade games android"
- **Differentiation:** best-offline-arcade-games-android covers arcade titles broadly; tower defence is a distinct genre with its own attested offline query and no coverage.

### `mental-division-tricks` vs `mental-math-tricks-that-work` — 0.56

- **New page targets:** "mental division tricks"
- **Existing page targets:** "mental math tricks"
- **Differentiation:** The site covers multiplication shortcuts, general tricks, estimation and percentages, but division has no page of its own.

### `how-golf-q-school-works` vs `golf-scoring-explained` — 0.56

- **New page targets:** "how golf q school works"
- **Existing page targets:** "how golf scoring works"
- **Differentiation:** how-a-golf-cut-works explains the cut within a tournament; Q-School is about tour access across a season and is not covered.

### `marathi-study-plan-first-month` vs `how-long-does-it-take-to-learn-russian` — 0.55

- **New page targets:** "how long to learn marathi"
- **Existing page targets:** "how long to learn russian"
- **Differentiation:** We publish timeline articles for Italian and Russian only; this is a different language and pairs the timeline with an actual weekly plan.

### `rugby-draft-and-squad-building` vs `soccer-draft-xi-guide` — 0.54

- **New page targets:** "rugby draft simulator"
- **Existing page targets:** "soccer draft simulator"
- **Differentiation:** The site has draft guides for six sports and none for rugby; this app has zero article coverage.

### `what-are-io-games` vs `sports-gm-games-without-internet` — 0.54

- **New page targets:** "what are io games"
- **Existing page targets:** "sports gm games no wifi"
- **Differentiation:** what-makes-a-roguelike defines a different genre label; nothing on the site explains the io category, and this app has zero article coverage.

### `anime-hair-colour-meanings` vs `color-palettes-for-anime-art` — 0.53

- **New page targets:** "anime hair color meaning"
- **Existing page targets:** "anime color palette"
- **Differentiation:** color-palettes-for-anime-art is about building palettes; this is about the conventions behind specific hair colours, which is a different question.

### `shanghainese-vs-mandarin-differences` vs `cantonese-vs-mandarin-differences` — 0.48

- **New page targets:** "shanghainese vs mandarin"
- **Existing page targets:** "cantonese vs mandarin"
- **Differentiation:** cantonese-vs-mandarin-differences covers a different variety pair entirely; Shanghainese has no page on the site.

### `malay-affixes-guide` vs `malay-vs-indonesian-differences` — 0.46

- **New page targets:** "malay affixes"
- **Existing page targets:** "malay vs indonesian"
- **Differentiation:** Existing Malay articles cover pronunciation, the Indonesian comparison and the beginner course; affixation, the core of Malay word building, is not covered anywhere.

### `choosing-a-history-app-for-students` vs `world-history-timeline-guide` — 0.46

- **New page targets:** "best history app for students"
- **Existing page targets:** "interactive world history timeline app"
- **Differentiation:** world-history-timeline-guide is a guide to our own app; this is a category decision guide that must name alternatives and say when they win.

### `how-to-play-mkv-files-on-android` vs `android-video-player-guide` — 0.46

- **New page targets:** "how to play mkv files on android"
- **Existing page targets:** "android video player for local files"
- **Differentiation:** video-file-formats-explained defines containers; this is the failure-mode page that walks a broken file back to a cause, which the reference page does not do.


### The two that need a written editorial rule, not just a note

Most of the flagged pairs above are parallel-topic artefacts. Two are not, and the writers must
follow these rules exactly:

**1. `should-i-learn-malay-or-indonesian` vs `malay-vs-indonesian-differences` (0.76)**

This is the highest genuine overlap in the batch. The two queries are real and distinct —
"malay vs indonesian" (what is different) and "should i learn malay or indonesian" (which should I
pick), both independently attested in autocomplete on 2026-09-15 — but the vocabulary is nearly
identical, so the pages will compete unless separated by content.

> **Rule:** the new page must **not** re-explain the linguistic differences. It links to
> `malay-vs-indonesian-differences` for those in the first two paragraphs and spends its own body on
> the decision inputs only: where you are going, who you will speak to, and what learning material
> actually exists for each. It must state plainly where Malay is the harder language to resource,
> and it must not conclude that our app is the answer for every reader.

**2. `io-games-without-a-connection` vs `best-offline-sports-games-android` (0.76)**

Pure lexical collision on "offline / games / android". The genres share nothing: one is a sports
management game, the other an arena survival game, and the new article's actual subject is that
offline io games replace human players with bots.

> **Rule:** the new page's subject is **bots versus human opponents and what that changes about
> pacing** — not a list of offline games. It must link to `best-offline-sports-games-android` (an
> orphan, and this link helps fix that) rather than duplicating its framing. It must not be
> retitled toward "best offline games for Android".

## New-vs-new similarity — 26 pairs at or above 0.45

| A | B | Score | Resolution |
|---|---|---|---|
| `should-i-learn-malay-or-indonesian` | `is-malay-easy-to-learn` | 0.65 | Same app, different question. Cross-link; do not merge. |
| `learn-marathi-beginners-guide` | `learn-shanghainese-beginners-guide` | 0.64 | Different app and different query. Parallel-topic artefact. |
| `is-my-card-worth-grading` | `card-grading-costs-and-tiers` | 0.64 | Same app, different question. Cross-link; do not merge. |
| `learn-marathi-beginners-guide` | `is-marathi-hard-to-learn` | 0.63 | Same app, different question. Cross-link; do not merge. |
| `is-lao-hard-to-learn` | `is-khmer-hard-to-learn` | 0.63 | Different app and different query. Parallel-topic artefact. |
| `is-marathi-hard-to-learn` | `marathi-study-plan-first-month` | 0.62 | Same app, different question. Cross-link; do not merge. |
| `is-marathi-hard-to-learn` | `is-lao-hard-to-learn` | 0.62 | Different app and different query. Parallel-topic artefact. |
| `is-marathi-hard-to-learn` | `is-khmer-hard-to-learn` | 0.62 | Different app and different query. Parallel-topic artefact. |
| `learn-marathi-beginners-guide` | `marathi-study-plan-first-month` | 0.61 | Same app, different question. Cross-link; do not merge. |
| `is-lao-hard-to-learn` | `building-a-lao-course-from-scratch` | 0.6 | Same app, different question. Cross-link; do not merge. |
| `how-to-shade-anime-hair` | `anime-hair-colour-meanings` | 0.6 | Same app, different question. Cross-link; do not merge. |
| `tower-defense-strategy-basics` | `tower-types-and-what-they-counter` | 0.6 | Same app, different question. Cross-link; do not merge. |
| `offline-tower-defence-on-android` | `io-games-without-a-connection` | 0.57 | Different app and different query. Parallel-topic artefact. |
| `what-are-io-games` | `io-games-without-a-connection` | 0.55 | Same app, different question. Cross-link; do not merge. |
| `marathi-alphabet-and-devanagari` | `marathi-vs-hindi-differences` | 0.51 | Same app, different question. Cross-link; do not merge. |
| `how-tennis-ranking-points-work` | `tennis-ranking-decay-and-scheduling` | 0.51 | Same app, different question. Cross-link; do not merge. |
| `shanghainese-vs-mandarin-differences` | `shanghainese-romanisation-choices` | 0.5 | Same app, different question. Cross-link; do not merge. |
| `vertical-shooter-games-on-android` | `io-games-without-a-connection` | 0.5 | Different app and different query. Parallel-topic artefact. |
| `marathi-alphabet-and-devanagari` | `marathi-verb-basics` | 0.49 | Same app, different question. Cross-link; do not merge. |
| `is-shanghainese-a-dialect-or-a-language` | `shanghainese-romanisation-choices` | 0.49 | Same app, different question. Cross-link; do not merge. |
| `marathi-vs-hindi-differences` | `marathi-verb-basics` | 0.48 | Same app, different question. Cross-link; do not merge. |
| `shanghainese-vs-mandarin-differences` | `is-shanghainese-a-dialect-or-a-language` | 0.48 | Same app, different question. Cross-link; do not merge. |
| `how-to-study-history-on-your-own` | `counterfactual-history-and-what-if-scenarios` | 0.48 | Same app, different question. Cross-link; do not merge. |
| `how-tennis-ranking-points-work` | `tennis-scoring-for-beginners` | 0.47 | Same app, different question. Cross-link; do not merge. |
| `tower-defense-strategy-basics` | `offline-tower-defence-on-android` | 0.45 | Same app, different question. Cross-link; do not merge. |
| `recipe-scaling-and-serving-sizes` | `recipe-nutrition-figures-and-why-they-move` | 0.45 | Same app, different question. Cross-link; do not merge. |

**The parallel-question clusters.** Four question shapes repeat across different subjects, which is
what drives most of the scores above:

- `is-marathi-hard-to-learn` / `is-lao-hard-to-learn` / `is-khmer-hard-to-learn` / `is-malay-easy-to-learn` — four different languages, four different queries, zero shared audience.
- `learn-marathi-beginners-guide` / `learn-shanghainese-beginners-guide` — two different languages.
- `is-my-card-worth-grading` / `card-grading-costs-and-tiers` — same app. One is a decision, one is a price reference. They must cross-link and must not both try to answer "should I grade this".
- `offline-tower-defence-on-android` / `io-games-without-a-connection` — two genres. Neither may drift into a general "best offline Android games" listicle; that space is already occupied by two published articles.

> **Standing rule for all parallel clusters:** each page answers its own language, sport or genre and
> **links sideways to its siblings instead of restating them**. No page may broaden into a
> cross-language or cross-genre comparison — that is a different article, and in several cases one
> we already have.

## Titles

Checked all 275 titles (175 published + 100 proposed) pairwise for shared-word overlap.

- Pairs at or above the 0.85 preflight threshold: **0**
- Duplicate titles: **0** · duplicate metaTitles: **0** · duplicate descriptions: **0**
- "X Explained" in proposed titles: **0 of 100** (existing corpus: ~29%)
- "X Explained" in proposed metaTitles: **0 of 100** (existing corpus: ~31%)

## Primary keywords

- Proposed primary keywords colliding with the 175 published ones (case-insensitive): **0**
- Proposed primary keywords colliding with each other: **0**

Both were asserted programmatically before this document was written. A collision on either is a
**build failure**, not a warning.

## Slugs

- Proposed slugs colliding with the 175 published slugs: **0**
- Proposed slugs colliding with each other: **0**
- Proposed slugs failing lowercase kebab-case: **0**
