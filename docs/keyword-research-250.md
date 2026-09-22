# Keyword and search-intent research for the 250-article expansion

What evidence was actually collected before the 250 new articles are written,
what that evidence establishes, and — stated just as plainly — what it does not.

Collected **2026-09-21**. Raw data: `search-intent-observations-250.json`.
Candidate pool: `keyword-candidates.json`. Already-claimed terms:
`claimed-primary-keywords.json`. Reproduce with
`node collect-search-intent-250.mjs` then `node build-candidates.mjs`.

## The honest headline

**No search-volume data exists for any term in this document, and none is
implied anywhere in it.** There is no authenticated access to Google Ads Keyword
Planner in this environment, no Search Console credentials, and no subscription
to Semrush, Ahrefs, Moz or an equivalent provider. Google Trends returned
HTTP 429 to the request made today, as it did on the previous research run, so
no relative-interest series was captured either.

What was captured is a real, dated, reproducible record of **how people phrase
queries** in these three subject areas: 9,841 raw autocomplete
suggestions across 1,200 queries, reduced to
8,610 unique candidate phrases. That is genuinely useful for
choosing topics, titles and angles. It is not demand data, and nothing below
presents it as demand data.

**Every candidate in `keyword-candidates.json` carries `volume: "unknown"`,
`difficulty: "unknown"` and `cpc: "unknown"`. Those are literal values, not
placeholders awaiting a guess.**

## Sources consulted, and their status as found today

| # | Source | Available on 2026-09-21? | Evidence of status | What was obtained |
| --- | --- | --- | --- | --- |
| 1 | Google Search Console API | **No** | No service-account or OAuth credentials present in the environment; `gcloud` is not installed | Nothing |
| 2 | Google Ads Keyword Planner | **No** | No authenticated Ads account or developer token available to this environment | Nothing |
| 3 | Google Trends (`/trends/api/explore`) | **No** | Retried once today; returned **HTTP 429 Too Many Requests** | Nothing |
| 4 | Semrush / Ahrefs / Moz or equivalent | **No** | No subscription and no API key in environment variables | Nothing |
| 5 | Google Autocomplete (`suggestqueries.google.com/complete/search`) | **Yes** | HTTP 200 on 1,200 of 1,200 queries | 9,841 suggestions |
| 6 | First-party Google Play listing copy (repo catalog, `src/data/apps/catalog/*.ts`) | **Yes** | Present in-repo with `lastVerified` dates | App grounding for clusters A, B and C |
| 7 | Existing article frontmatter (`content/blog/*.md`) | **Yes** | 275 files parsed, 275 unique `primaryKeyword` values | The definitive collision list |
| 8 | GA4 / site-search behaviour | **No** | No GA4 export available to this environment; the site has no internal search | Nothing |

Rows 1–4 and 8 are recorded as unavailable rather than approximated. An estimate
put in their place would be indistinguishable from an invented figure, which is
the one outcome this project must never produce.

## Collection parameters

| Parameter | Value |
| --- | --- |
| Provider | Google Autocomplete (suggestqueries.google.com/complete/search, client=firefox) |
| Request shape | `https://suggestqueries.google.com/complete/search?client=firefox&hl=en&gl=us&q=<seed>` |
| Country | US (`gl=us`) |
| Language | English (`hl=en`) |
| Observation date | 2026-09-21 |
| Base seeds | 270 |
| Head terms given expansion | 30 |
| Expansion suffixes | 26 letters (` a`…` z`) + 5 modifiers (` how`, ` what`, ` why`, ` best`, ` vs`) = 31 per head term |
| Expansion queries | 930 |
| Total queries issued | 1,200 |
| Queries that returned HTTP 200 | 1,200 |
| Queries that failed after one retry | 0 |
| Politeness delay | 250–400 ms, jittered, between every request |
| Retry policy | one retry per failed query, after a 900 ms pause |
| Raw suggestions returned | 9,841 |
| Unique candidate phrases after filtering and de-duplication | 8,610 |

Every observation in `search-intent-observations-250.json` records its own
exact provider URL, `geo: "US"`, `lang: "en"`, `observedDate: "2026-09-21"`
and the seed it came from, alongside `volume`, `difficulty` and `cpc` fixed at
`"unknown"`.

### How 9,841 raw suggestions became 8,610 candidates

| Step | Count |
| --- | ---: |
| Raw suggestion strings returned | 9,841 |
| Dropped: single word or fewer than 6 characters | 0 |
| Dropped: blocklist (adult, piracy, `near me`, and platform-navigational terms such as reddit / wikipedia / quizlet / youtube / pdf that this site cannot serve) | 402 |
| Dropped: off-topic (shares no meaningful token with its seed **and** hits no cluster anchor vocabulary) | 9 |
| Dropped: duplicate of a phrase already in the pool | 820 |
| **Kept as unique candidates** | **8,610** |

Duplicates were merged rather than discarded: each surviving record lists every
seed that surfaced it in `allSeedsThatSurfacedIt` and every query string in
`autocompleteQueries`.

## What this evidence does and does not establish

**It establishes**, for the United States, in English, on 2026-09-21:

- That a given phrasing is common enough for Google's suggestion system to
  surface it from the seed shown.
- Which adjacent questions the suggestion system connects to a seed — the
  alphabet and modifier expansions exist precisely to surface question-shaped
  long-tail wording that a bare seed does not return.
- Which wording people use for a concept: whether they type "mental math tricks"
  or "mental maths tricks", "what if history" or "alternate history".

**It does not establish, and no part of this document claims:**

- **How many people search any term.** Autocomplete has no volume component at
  all. Converting a suggestion list into a volume figure is inventing the number.
- **How competitive a term is.** No difficulty score was obtained for any phrase.
- **What a term is worth.** No CPC or commercial-value figure was obtained.
- **Whether ranking for a term would produce traffic.** No traffic projection is
  made for any phrase or any planned article.
- **What competitors have published.** No competitor coverage analysis was run;
  no SERP was scraped or counted.
- **That a phrase appearing under many seeds is "popular".** It means the
  suggestion system connects it to several entry points on this date. Nothing more.

A further limit worth stating: autocomplete output varies by location,
personalisation state and time. This is a snapshot for one locale on one date,
not a constant. Re-running the script on another day may return a different set.

### Queries that failed

None. All 1,200 queries returned HTTP 200, so the retry path was never needed.


### Base seeds that returned no suggestions (12)

- `baseball gm game android`
- `best way to learn a language on your phone`
- `tonal language tips`
- `tip calculation mental math`
- `rounding and estimation strategies`
- `mental math for shopping`
- `unit conversion in your head`
- `spaced repetition for math facts`
- `math practice for dyslexia`
- `compare timelines of civilizations`
- `things people get wrong about the middle ages`
- `world history app for students`

This is treated as information, not as a veto. An absent suggestion means the exact phrasing is not commonly typed. It does not mean the underlying question is not asked, and an article may still be justified if the question is real and one of the studio's apps is a legitimate place to answer it. Where that happens the title should be written for the question, not for the seed.

## Intent classification

Every candidate is tagged with exactly one of the seven intents the brief
specifies. Classification is rule-based and deterministic — the same phrase
always receives the same label — and the rules are applied in this precedence
order, first match winning:

| Order | Intent | Triggered by (abridged) |
| --- | --- | --- |
| 1 | **troubleshooting** | first-person fault reports only — `why am i…`, `why do i keep/always/struggle…`, `why can't my…`, `not working`, `doesn't work`, `error message`, `how to fix`, `bad at`, `slow at`, `stuck on`, `careless/common mistakes`, `app crashes` |
| 2 | **comparison** | `vs`, `versus`, `difference between`, `compared to`, `which is better`, `alternatives`, `pros and cons`, `instead of` |
| 3 | **app-discovery** | `app`, `apk`, `android`, `ios`, `download`, `play store`, `game(s)`, `online`, `free`, `software`, `simulator`, `for pc` |
| 4 | **study** | `study`, `exam`, `revision`, `homework`, `classroom`, `for students`, `flashcards`, `quiz`, `essay`, `memorize`, `worksheet`, `gcse`, `ap world` |
| 5 | **practice** | `practice`, `drill`, `exercises`, `training`, `routine`, `daily`, `challenge`, `streak`, `repetition`, `warm up` |
| 6 | **tutorial** | `how to`, `steps to`, `guide`, `tips`, `technique`, `trick`, `strategy`, `method`, `formula`, `shortcut`, `way to` |
| 7 | **informational** | default when no rule above matches — `what is`, `who was`, `explained`, `timeline`, `list`, `facts`, `causes of` |

Precedence is a judgement call and worth being explicit about: a phrase such as
"free brain training app" matches both app-discovery and practice vocabulary,
and is labelled app-discovery because the reader's first requirement is a
product, not a routine. "how to practice math daily" matches both practice and
tutorial and is labelled practice because the routine is the subject and the
"how to" is only its framing. The label is an editorial starting point, not a
measurement; a writer may override it with a reason.

The troubleshooting rule was deliberately narrowed after a first pass: a generic
`why did` test had labelled "why did rome fall" and "french revolution why did
it happen" as troubleshooting, and a generic `error`/`problem` test had caught
"how to calculate percent error" and "number sequence problems". Those are
subject-matter words, not fault reports. The rule now requires a first-person
subject or an explicit failure phrase, which is why the troubleshooting count is
small (17 of 8,610). A small honest count is the
correct outcome; the earlier inflated one was a measurement error.

### Intent distribution across all 8,610 candidates

| Intent | Phrases | Share |
| --- | ---: | ---: |
| informational | 5,127 | 59.5% |
| comparison | 159 | 1.8% |
| tutorial | 1,530 | 17.8% |
| study | 624 | 7.2% |
| practice | 295 | 3.4% |
| troubleshooting | 17 | 0.2% |
| app-discovery | 858 | 10.0% |
| **Total** | **8,610** | **100%** |

## Cluster-by-cluster phrase pools

| Cluster | Seeds | Head terms expanded | Candidate phrases | Exact collisions | Near collisions |
| --- | ---: | ---: | ---: | ---: | ---: |
| A | 62 | 10 | 1,604 | 10 | 1 |
| B | 106 | 10 | 3,371 | 4 | 0 |
| C | 102 | 10 | 3,635 | 3 | 0 |
| **Total** | **270** | **30** | **8,610** | **17** | **1** |

The full pool — every phrase, not the samples shown below — is in
`keyword-candidates.json`.

### Cluster A — general articles across the published app portfolio

- **Seeds queried:** 62
- **Head terms given alphabet + modifier expansion:** 10 — `basketball career sim`, `football gm mode`, `how to learn cantonese`, `how much protein per day`, `keto diet for beginners`, `best android video player`, `tower defense strategy`, `anime trivia questions`, `how do slot machines work`, `offline games no wifi`
- **Unique candidate phrases:** 1,604
- **Exact collisions with an existing `primaryKeyword`:** 10
- **Near collisions (same phrase after lowercasing, punctuation-stripping and naive singularisation):** 1
- **Phrases with a known search volume:** 0

#### Seeds and candidate counts by topic group

| Topic group | Seeds | Candidate phrases |
| --- | ---: | ---: |
| portfolio-health | 8 | 496 |
| portfolio-action-arcade | 6 | 233 |
| portfolio-video-utility | 6 | 196 |
| portfolio-language | 14 | 192 |
| portfolio-android-general | 5 | 156 |
| portfolio-sports-gm | 15 | 145 |
| portfolio-casino-puzzle | 4 | 120 |
| portfolio-anime-creative | 4 | 66 |
| **Total** | **62** | **1,604** |

#### Intent distribution

| Intent | Candidate phrases |
| --- | ---: |
| informational | 723 |
| comparison | 14 |
| tutorial | 338 |
| study | 17 |
| practice | 10 |
| troubleshooting | 4 |
| app-discovery | 498 |
| **Total** | **1,604** |

#### Observed phrasing by intent

Ordered by how many distinct seeds surfaced the phrase. That is an
ordering of **observation frequency in this collection run**, not of demand.
A phrase appearing under several seeds means the suggestion system connects
it to several entry points; it says nothing about how many people type it.

**informational** (723 phrases; 20 shown)

| Phrase | Surfaced by seed | Times observed | Collides? | Volume |
| --- | --- | ---: | --- | --- |
| anime trivia facts | anime trivia questions | 20 | no | unknown |
| anime trivia questions with answers | anime trivia questions | 17 | no | unknown |
| basketball career points | basketball career sim | 12 | no | unknown |
| simple keto diet for beginners | keto diet for beginners | 11 | no | unknown |
| ways to learn cantonese | how to learn cantonese | 9 | no | unknown |
| what is a good keto diet for beginners | keto diet for beginners | 9 | no | unknown |
| anime trivia questions and answers | anime trivia questions | 6 | no | unknown |
| anime trivia questions multiple choice with answers | anime trivia questions | 6 | no | unknown |
| tower defense tower ideas | tower defense strategy | 6 | no | unknown |
| anime trivia questions and answers hard | anime trivia questions | 5 | no | unknown |
| easy anime trivia questions and answers | anime trivia questions | 5 | no | unknown |
| is cantonese easy to learn | how to learn cantonese | 5 | no | unknown |
| is cantonese hard to learn | how to learn cantonese | 5 | no | unknown |
| 100 anime trivia questions and answers | anime trivia questions | 4 | no | unknown |
| anime trivia questions demon slayer | anime trivia questions | 4 | no | unknown |
| anime trivia questions multiple choice | anime trivia questions | 4 | no | unknown |
| basketball players number 42 | basketball career sim | 4 | no | unknown |
| how much does it cost to use a slot machine | how do slot machines work | 4 | no | unknown |
| tower defense tower types | tower defense strategy | 4 | **yes** → `tower-types-and-what-they-counter` | unknown |
| anime trivia questions easy | anime trivia questions | 3 | no | unknown |

**comparison** (14 phrases; 14 shown)

| Phrase | Surfaced by seed | Times observed | Collides? | Volume |
| --- | --- | ---: | --- | --- |
| android video player better than vlc | best android video player | 11 | no | unknown |
| how much protein per day men vs women | how much protein per day | 2 | no | unknown |
| compare effective tower defense strategies for popular games on roblox | tower defense strategy | 1 | no | unknown |
| how much protein for women vs men | how much protein per day | 1 | no | unknown |
| net carbs vs total carbs | net carbs vs total carbs | 1 | no | unknown |
| net carbs vs total carbs cronometer | net carbs vs total carbs | 1 | no | unknown |
| net carbs vs total carbs diabetes | net carbs vs total carbs | 1 | no | unknown |
| net carbs vs total carbs for prediabetes | net carbs vs total carbs | 1 | no | unknown |
| net carbs vs total carbs for weight loss | net carbs vs total carbs | 1 | no | unknown |
| net carbs vs total carbs gestational diabetes | net carbs vs total carbs | 1 | no | unknown |
| net carbs vs total carbs keto | net carbs vs total carbs | 1 | no | unknown |
| shanghainese vs mandarin | shanghainese vs mandarin | 1 | **yes** → `shanghainese-vs-mandarin-differences` | unknown |
| shanghainese vs mandarin vs cantonese | shanghainese vs mandarin | 1 | no | unknown |
| what video player is better than vlc | best android video player | 1 | no | unknown |

**tutorial** (338 phrases; 20 shown)

| Phrase | Surfaced by seed | Times observed | Collides? | Volume |
| --- | --- | ---: | --- | --- |
| how do slot machines actually work | how do slot machines work | 18 | no | unknown |
| how do.slot machines work | how do slot machines work | 15 | no | unknown |
| how to learn cantonese | how to learn cantonese | 15 | no | unknown |
| how to start learning cantonese | how to learn cantonese | 10 | no | unknown |
| how to learn cantonese fast | how to learn cantonese | 8 | no | unknown |
| keto diet beginners guide | keto diet for beginners | 8 | no | unknown |
| how to start keto diet for beginners | keto diet for beginners | 7 | no | unknown |
| tower defense best strategy | tower defense strategy | 6 | no | unknown |
| how do slot machines really work | how do slot machines work | 5 | no | unknown |
| best way to learn how to speak cantonese | how to learn cantonese | 4 | no | unknown |
| how do slot machine lines work | how do slot machines work | 4 | no | unknown |
| how to learn basic cantonese | how to learn cantonese | 4 | no | unknown |
| how to learn cantonese as an english speaker | how to learn cantonese | 4 | no | unknown |
| how to learn cantonese for free | how to learn cantonese | 4 | no | unknown |
| how to learn cantonese if you know mandarin | how to learn cantonese | 4 | no | unknown |
| warzone tower defense best strategy | tower defense strategy | 4 | no | unknown |
| how do slot machines work for beginners | how do slot machines work | 3 | no | unknown |
| how do slot machines work in kentucky | how do slot machines work | 3 | no | unknown |
| how to learn cantonese as a chinese speaker | how to learn cantonese | 3 | no | unknown |
| how to learn cantonese from english | how to learn cantonese | 3 | no | unknown |

**study** (17 phrases; 17 shown)

| Phrase | Surfaced by seed | Times observed | Collides? | Volume |
| --- | --- | ---: | --- | --- |
| anime trivia questions for kids | anime trivia questions | 5 | no | unknown |
| anime trivia quiz with answers | anime trivia questions | 3 | no | unknown |
| how to learn cantonese for kids | how to learn cantonese | 2 | no | unknown |
| anime quiz trivia creator | anime trivia questions | 1 | no | unknown |
| anime trivia quiz hard | anime trivia questions | 1 | no | unknown |
| how does a vending machine work for kids | how do slot machines work | 1 | no | unknown |
| how much protein should i eat a day quiz | how much protein per day | 1 | no | unknown |
| how to say study in cantonese | how to learn cantonese | 1 | no | unknown |
| keto diet for children | keto diet for beginners | 1 | no | unknown |
| keto diet for children with epilepsy | keto diet for beginners | 1 | no | unknown |
| keto diet for kids | keto diet for beginners | 1 | no | unknown |
| ketogenic diet for kids | keto diet for beginners | 1 | no | unknown |
| learn russian alphabet quiz | learn russian alphabet | 1 | no | unknown |
| reading nutrition labels for kids | reading nutrition labels | 1 | no | unknown |
| reading nutrition labels worksheet | reading nutrition labels | 1 | no | unknown |
| study lao language | learn lao language | 1 | no | unknown |
| study lao language in vientiane | learn lao language | 1 | no | unknown |

**practice** (10 phrases; 10 shown)

| Phrase | Surfaced by seed | Times observed | Collides? | Volume |
| --- | --- | ---: | --- | --- |
| adaptive forgetting curve for spaced repetition language learning | spaced repetition language learning | 1 | no | unknown |
| how much protein daily zepbound | how much protein per day | 1 | no | unknown |
| how much protein for daily value | how much protein per day | 1 | no | unknown |
| is spaced repetition good for language learning | spaced repetition language learning | 1 | no | unknown |
| language learning streak | language learning streak | 1 | no | unknown |
| spaced repetition language learning | spaced repetition language learning | 1 | **yes** → `spaced-repetition-for-language-learning` | unknown |
| spaced repetition method for language learning | spaced repetition language learning | 1 | no | unknown |
| spaced repetition system language learning | spaced repetition language learning | 1 | no | unknown |
| trainable spaced repetition model for language learning | spaced repetition language learning | 1 | no | unknown |
| who has the longest duolingo streak | language learning streak | 1 | no | unknown |

**troubleshooting** (4 phrases; 4 shown)

| Phrase | Surfaced by seed | Times observed | Collides? | Volume |
| --- | --- | ---: | --- | --- |
| subtitle file not working | subtitle file not working | 1 | no | unknown |
| subtitle file not working vlc | subtitle file not working | 1 | no | unknown |
| subtitles not working | subtitle file not working | 1 | no | unknown |
| vlc add subtitle file not working | subtitle file not working | 1 | no | unknown |

**app-discovery** (498 phrases; 20 shown)

| Phrase | Surfaced by seed | Times observed | Collides? | Volume |
| --- | --- | ---: | --- | --- |
| offline games without wifi | offline games no wifi | 15 | no | unknown |
| offline games without internet | offline games no wifi | 12 | no | unknown |
| what is the default video player for android | best android video player | 9 | no | unknown |
| which is the best audio and video player for android | best android video player | 7 | no | unknown |
| tower defense strategy games | tower defense strategy | 4 | no | unknown |
| which video player is good for android | best android video player | 4 | no | unknown |
| best android video player apk free download | best android video player | 3 | no | unknown |
| best android video player for car | best android video player | 3 | no | unknown |
| best android video player for network streaming | best android video player | 3 | no | unknown |
| best android video player with chromecast support | best android video player | 3 | no | unknown |
| best android video player without ads | best android video player | 3 | no | unknown |
| offline games no wifi games on google | offline games no wifi | 3 | no | unknown |
| offline games no wifi games without downloading | offline games no wifi | 3 | no | unknown |
| offline games no wifi internet | offline games no wifi | 3 | no | unknown |
| offline games without wifi or internet | offline games no wifi | 3 | no | unknown |
| what is the best offline game | offline games no wifi | 3 | no | unknown |
| basketball career simulator online free | basketball career sim | 2 | no | unknown |
| basketball career simulator roblox | basketball career sim | 2 | no | unknown |
| basketball career simulator roblox codes | basketball career sim | 2 | no | unknown |
| best android browser with built in video player | best android video player | 2 | no | unknown |


### Cluster B — IQ and brain training (Mental Math & Memory Games)

- **Seeds queried:** 106
- **Head terms given alphabet + modifier expansion:** 10 — `mental math`, `brain training`, `iq test`, `memory techniques`, `logic puzzles`, `number sequence`, `how to improve memory`, `pattern recognition`, `multiplication tricks`, `how to calculate percentages`
- **Unique candidate phrases:** 3,371
- **Exact collisions with an existing `primaryKeyword`:** 4
- **Near collisions (same phrase after lowercasing, punctuation-stripping and naive singularisation):** 0
- **Phrases with a known search volume:** 0

#### Seeds and candidate counts by topic group

| Topic group | Seeds | Candidate phrases |
| --- | ---: | ---: |
| brain-arithmetic | 20 | 617 |
| brain-patterns | 10 | 603 |
| brain-memory | 12 | 565 |
| brain-iq | 13 | 396 |
| brain-number-sense | 10 | 362 |
| brain-logic | 12 | 354 |
| brain-games | 8 | 330 |
| brain-study | 12 | 81 |
| brain-speed | 4 | 39 |
| brain-access | 5 | 24 |
| **Total** | **106** | **3,371** |

#### Intent distribution

| Intent | Candidate phrases |
| --- | ---: |
| informational | 1,369 |
| comparison | 76 |
| tutorial | 1,122 |
| study | 262 |
| practice | 285 |
| troubleshooting | 13 |
| app-discovery | 244 |
| **Total** | **3,371** |

#### Observed phrasing by intent

Ordered by how many distinct seeds surfaced the phrase. That is an
ordering of **observation frequency in this collection run**, not of demand.
A phrase appearing under several seeds means the suggestion system connects
it to several entry points; it says nothing about how many people type it.

**informational** (1,369 phrases; 20 shown)

| Phrase | Surfaced by seed | Times observed | Collides? | Volume |
| --- | --- | ---: | --- | --- |
| iq test accuracy | iq test accuracy | 2 | no | unknown |
| iq test accurate | iq test accuracy | 2 | no | unknown |
| iq test accurate free | iq test accuracy | 2 | no | unknown |
| iq test results | iq test accuracy | 2 | no | unknown |
| logic puzzles for adults | logic puzzles for adults | 2 | no | unknown |
| mental math for adults | mental math for adults | 2 | no | unknown |
| number sequence puzzles | number sequence puzzles | 2 | no | unknown |
| number sequence puzzles for adults | number sequence puzzles | 2 | no | unknown |
| number sequence puzzles with answers | number sequence puzzles | 2 | no | unknown |
| number sequence rules | number pattern rules | 2 | no | unknown |
| pattern recognition test | pattern recognition test | 2 | no | unknown |
| pattern recognition test autism | pattern recognition test | 2 | no | unknown |
| pattern recognition test free | pattern recognition test | 2 | no | unknown |
| pattern recognition test meme | pattern recognition test | 2 | no | unknown |
| what is mental.math | mental math for competitive exams | 2 | no | unknown |
| logic puzzles numbers | logic puzzles | 6 | no | unknown |
| pattern recognition examples | pattern recognition | 4 | no | unknown |
| benefits of logic puzzles | logic puzzles | 3 | no | unknown |
| number sequence what comes next | number sequence | 3 | no | unknown |
| pattern recognition and machine learning | pattern recognition | 3 | no | unknown |

**comparison** (76 phrases; 20 shown)

| Phrase | Surfaced by seed | Times observed | Collides? | Volume |
| --- | --- | ---: | --- | --- |
| brain train vs acad1 | brain training | 2 | no | unknown |
| brain train vs academic gateway | brain training | 2 | no | unknown |
| iq test vs aptitude test | iq test | 2 | no | unknown |
| iq test vs asvab | iq test | 2 | no | unknown |
| memory vs skills | memory techniques | 2 | no | unknown |
| mental math vs | mental math | 2 | no | unknown |
| mental math vs abacus | mental math | 2 | no | unknown |
| mental math vs standard algorithm | mental math | 2 | no | unknown |
| number pattern vs sequence | number sequence | 2 | no | unknown |
| number series vs sequence | number sequence | 2 | no | unknown |
| pattern recognition vs confirmation bias | pattern recognition | 2 | no | unknown |
| pattern recognition vs intuition | pattern recognition | 2 | no | unknown |
| pattern recognition vs racism | pattern recognition | 2 | no | unknown |
| pattern recognition vs stereotyping | pattern recognition | 2 | no | unknown |
| brain training vs brain age | brain training | 1 | no | unknown |
| elevate brain training vs lumosity | brain training | 1 | no | unknown |
| fluid vs crystallized intelligence | fluid vs crystallized intelligence | 1 | no | unknown |
| fluid vs crystallized intelligence ap psych | fluid vs crystallized intelligence | 1 | no | unknown |
| fluid vs crystallized intelligence ap psychology | fluid vs crystallized intelligence | 1 | no | unknown |
| fluid vs crystallized intelligence cattell | fluid vs crystallized intelligence | 1 | no | unknown |

**tutorial** (1,122 phrases; 20 shown)

| Phrase | Surfaced by seed | Times observed | Collides? | Volume |
| --- | --- | ---: | --- | --- |
| how to calculate percentages in your head | how to calculate percentages in your head | 3 | no | unknown |
| mental math addition strategies | mental math addition strategies | 2 | no | unknown |
| mental math tricks | mental math tricks | 2 | **yes** → `mental-math-tricks-that-work` | unknown |
| mental math tricks for adults | mental math tricks | 2 | no | unknown |
| mental math tricks for multiplication | mental math tricks | 2 | no | unknown |
| multiplication tricks for 11 | multiplication tricks | 7 | no | unknown |
| what is the best memory technique | memory techniques | 6 | no | unknown |
| multiplication tricks for 8 | multiplication tricks | 5 | no | unknown |
| easy multiplication tricks | multiplication tricks | 4 | no | unknown |
| what are memory techniques | memory techniques | 4 | no | unknown |
| 3 digit multiplication tricks | multiplication tricks | 3 | no | unknown |
| how to improve memory and concentration | how to improve memory | 3 | no | unknown |
| how to improve memory and focus | how to improve memory | 3 | no | unknown |
| how to improve memory and recall | how to improve memory | 3 | no | unknown |
| memory techniques and how to use them | memory techniques | 3 | no | unknown |
| memory techniques for remembering names | memory techniques | 3 | no | unknown |
| multiplication and tricks | multiplication tricks | 3 | no | unknown |
| multiplication tricks and hacks | multiplication tricks | 3 | no | unknown |
| multiplication tricks and tips | multiplication tricks | 3 | no | unknown |
| multiplication tricks for 6 | multiplication tricks | 3 | no | unknown |

**study** (262 phrases; 20 shown)

| Phrase | Surfaced by seed | Times observed | Collides? | Volume |
| --- | --- | ---: | --- | --- |
| mental math strategies for addition grade 2 | mental math addition strategies | 2 | no | unknown |
| memory techniques for kids | memory techniques | 3 | no | unknown |
| how to improve memory for studying | how to improve memory | 2 | no | unknown |
| memory techniques for studying | memory techniques | 2 | no | unknown |
| multiplication table tricks for kids | multiplication tricks | 2 | no | unknown |
| multiplication tricks for kids | multiplication tricks | 2 | no | unknown |
| attention span activities for kids | attention span exercises | 1 | no | unknown |
| attention span exercises for kids | attention span exercises | 1 | no | unknown |
| best logic puzzles for kids | logic puzzles | 1 | no | unknown |
| best memory techniques for students | memory techniques | 1 | no | unknown |
| best memory techniques for studying | memory techniques | 1 | no | unknown |
| brain teasers with answers for kids | brain teasers with answers | 1 | no | unknown |
| brain teasers with answers for students | brain teasers with answers | 1 | no | unknown |
| brain training activities for kids | brain training | 1 | no | unknown |
| brain training classes for kids | brain training | 1 | no | unknown |
| brain training courses | brain training | 1 | no | unknown |
| brain training exercises for kids | brain training | 1 | no | unknown |
| brain training for kids | brain training | 1 | no | unknown |
| brain training for kids with adhd | brain training | 1 | no | unknown |
| brain training program for kids | brain training | 1 | no | unknown |

**practice** (285 phrases; 20 shown)

| Phrase | Surfaced by seed | Times observed | Collides? | Volume |
| --- | --- | ---: | --- | --- |
| how to practice mental math daily | how to practice math daily | 2 | no | unknown |
| mental math exercises for adults | mental math for adults | 2 | no | unknown |
| brain training how old is your brain | brain training | 2 | no | unknown |
| brain training techniques | brain training | 2 | no | unknown |
| brain training while you poo | brain training | 2 | no | unknown |
| how to do brain training | brain training | 2 | no | unknown |
| abstract reasoning test practice | abstract reasoning test | 1 | no | unknown |
| attention span exercises | attention span exercises | 1 | no | unknown |
| attention span exercises for adults | attention span exercises | 1 | no | unknown |
| best way to track training progress | how to track progress learning | 1 | no | unknown |
| brain exercises yoga | brain training | 1 | no | unknown |
| brain expansions scholastic training best | brain training | 1 | no | unknown |
| brain injury training | brain training | 1 | no | unknown |
| brain injury training iowa | brain training | 1 | no | unknown |
| brain intelligence training | brain training | 1 | no | unknown |
| brain speed training | mental speed training | 1 | no | unknown |
| brain speed training exercises | mental speed training | 1 | no | unknown |
| brain training activities | brain training | 1 | no | unknown |
| brain training adhd | brain training | 1 | no | unknown |
| brain training and adhd | brain training | 1 | no | unknown |

**troubleshooting** (13 phrases; 13 shown)

| Phrase | Surfaced by seed | Times observed | Collides? | Volume |
| --- | --- | ---: | --- | --- |
| common mistakes in problem solving | common reasoning mistakes | 1 | no | unknown |
| excel drag number sequence not working | number sequence | 1 | no | unknown |
| i keep making careless mistakes in math | why do i keep making careless mistakes in math | 1 | no | unknown |
| number sequence not working in excel | number sequence | 1 | no | unknown |
| why am i bad at mental math | why am i slow at mental math | 1 | no | unknown |
| why am i not good at mental math | why am i slow at mental math | 1 | no | unknown |
| why am i slow at mental math | why am i slow at mental math | 1 | no | unknown |
| why do i always make careless mistakes | why do i keep making careless mistakes in math | 1 | no | unknown |
| why do i always make stupid mistakes in math | why do i keep making careless mistakes in math | 1 | no | unknown |
| why do i keep making careless mistakes | why do i keep making careless mistakes in math | 1 | no | unknown |
| why do i keep making careless mistakes in math | why do i keep making careless mistakes in math | 1 | no | unknown |
| why do i keep making silly mistakes in math | why do i keep making careless mistakes in math | 1 | no | unknown |
| why do i struggle with mental math | why am i slow at mental math | 1 | no | unknown |

**app-discovery** (244 phrases; 20 shown)

| Phrase | Surfaced by seed | Times observed | Collides? | Volume |
| --- | --- | ---: | --- | --- |
| brain training apps | brain training apps | 2 | no | unknown |
| brain training apps for adults | brain training apps | 2 | no | unknown |
| brain training apps for seniors | brain training apps | 2 | no | unknown |
| brain training apps free | brain training apps | 2 | no | unknown |
| brain training apps that actually work | brain training apps | 2 | no | unknown |
| brain training apps without subscription | brain training apps | 2 | no | unknown |
| mental math games for adults | mental math for adults | 2 | no | unknown |
| brain training best apps | brain training | 2 | no | unknown |
| brain training games | brain training | 2 | no | unknown |
| logic puzzles and games | logic puzzles | 2 | no | unknown |
| abstract reasoning test online free | abstract reasoning test | 1 | no | unknown |
| apps for brain training | free brain training app android | 1 | no | unknown |
| are any online iq tests accurate | are online iq tests accurate | 1 | no | unknown |
| are brain games effective | do brain training games work | 1 | no | unknown |
| are free online iq tests accurate | are online iq tests accurate | 1 | no | unknown |
| are mensa online iq tests accurate | are online iq tests accurate | 1 | no | unknown |
| are most online iq tests accurate | are online iq tests accurate | 1 | no | unknown |
| are online iq tests accurate | are online iq tests accurate | 1 | no | unknown |
| are online iq tests accurate at all | are online iq tests accurate | 1 | no | unknown |
| are online iq tests accurate for adults | are online iq tests accurate | 1 | no | unknown |


### Cluster C — world history (World History Timeline Sim)

- **Seeds queried:** 102
- **Head terms given alphabet + modifier expansion:** 10 — `world history`, `ancient civilizations`, `roman empire`, `industrial revolution`, `world war 2`, `french revolution`, `history timeline`, `silk road`, `how to study history`, `renaissance`
- **Unique candidate phrases:** 3,635
- **Exact collisions with an existing `primaryKeyword`:** 3
- **Near collisions (same phrase after lowercasing, punctuation-stripping and naive singularisation):** 0
- **Phrases with a known search volume:** 0

#### Seeds and candidate counts by topic group

| Topic group | Seeds | Candidate phrases |
| --- | ---: | ---: |
| history-events | 10 | 679 |
| history-timelines | 9 | 589 |
| history-empires | 8 | 370 |
| history-civilizations | 10 | 357 |
| history-trade | 5 | 350 |
| history-culture | 4 | 344 |
| history-revolutions | 5 | 330 |
| history-study | 10 | 279 |
| history-politics | 7 | 65 |
| history-figures | 6 | 58 |
| history-apps | 7 | 56 |
| history-comparative | 7 | 44 |
| history-science | 5 | 40 |
| history-exploration | 3 | 29 |
| history-misconceptions | 4 | 25 |
| history-faq | 2 | 20 |
| **Total** | **102** | **3,635** |

#### Intent distribution

| Intent | Candidate phrases |
| --- | ---: |
| informational | 3,035 |
| comparison | 69 |
| tutorial | 70 |
| study | 345 |
| practice | 0 |
| troubleshooting | 0 |
| app-discovery | 116 |
| **Total** | **3,635** |

**Intents with no observed phrasing in this cluster: `practice`, `troubleshooting`.**
This is a finding about autocomplete, not about readers. It means the
suggestion system did not return phrases of that shape from these seeds on
2026-09-21. It is not evidence that nobody wants that kind of article,
and it must not be used to argue that one should not be written.

#### Observed phrasing by intent

Ordered by how many distinct seeds surfaced the phrase. That is an
ordering of **observation frequency in this collection run**, not of demand.
A phrase appearing under several seeds means the suggestion system connects
it to several entry points; it says nothing about how many people type it.

**informational** (3,035 phrases; 20 shown)

| Phrase | Surfaced by seed | Times observed | Collides? | Volume |
| --- | --- | ---: | --- | --- |
| ancient civilizations list | ancient civilizations list | 2 | no | unknown |
| ancient civilizations list in order | ancient civilizations list | 2 | no | unknown |
| history timeline eras | history timeline by era | 2 | no | unknown |
| how does the history timeline work | history timeline by era | 2 | no | unknown |
| industrial revolution timeline | industrial revolution timeline | 2 | no | unknown |
| industrial revolution timeline america | industrial revolution timeline | 2 | no | unknown |
| silk road history | silk road history | 2 | no | unknown |
| silk road history timeline | silk road history | 2 | no | unknown |
| what is timeline of history | history timeline by era | 2 | no | unknown |
| world history for dummies | world history for beginners | 2 | no | unknown |
| world history timeline | world history timeline | 2 | no | unknown |
| world war 2 timeline | world war 2 timeline | 2 | no | unknown |
| history of candy timeline | history timeline | 3 | no | unknown |
| ancient civilizations and the bible | ancient civilizations | 2 | no | unknown |
| french revolution and catholic church | french revolution | 2 | no | unknown |
| french revolution and napoleon | french revolution | 2 | no | unknown |
| french revolution and napoleonic wars | french revolution | 2 | no | unknown |
| french revolution how many died | french revolution | 2 | no | unknown |
| french revolution why did it happen | french revolution | 2 | no | unknown |
| how were ancient civilizations so advanced | ancient civilizations | 2 | no | unknown |

**comparison** (69 phrases; 20 shown)

| Phrase | Surfaced by seed | Times observed | Collides? | Volume |
| --- | --- | ---: | --- | --- |
| french revolution vs american revolution | french revolution | 2 | no | unknown |
| french revolution vs now | french revolution | 2 | no | unknown |
| french revolution vs russian revolution meme | french revolution | 2 | no | unknown |
| industrial revolution vs ai revolution | industrial revolution | 2 | no | unknown |
| industrial revolution vs gilded age | industrial revolution | 2 | no | unknown |
| industrial revolution vs second industrial revolution | industrial revolution | 2 | no | unknown |
| renaissance vs baroque | renaissance | 2 | no | unknown |
| renaissance vs enlightenment | renaissance | 2 | no | unknown |
| renaissance vs medieval | renaissance | 2 | no | unknown |
| roman empire vs byzantine empire | roman empire | 2 | no | unknown |
| roman empire vs greek empire | roman empire | 2 | no | unknown |
| roman empire vs han dynasty | roman empire | 2 | no | unknown |
| roman empire vs holy roman empire | roman empire | 2 | no | unknown |
| roman empire vs mongol empire | roman empire | 2 | no | unknown |
| roman empire vs ottoman empire | roman empire | 2 | no | unknown |
| roman empire vs persian empire | roman empire | 2 | no | unknown |
| roman empire vs roman republic | roman empire | 2 | no | unknown |
| roman empire vs usa | roman empire | 2 | no | unknown |
| silk road vs spice road | silk road | 2 | no | unknown |
| world history vs global history | world history | 2 | no | unknown |

**tutorial** (70 phrases; 20 shown)

| Phrase | Surfaced by seed | Times observed | Collides? | Volume |
| --- | --- | ---: | --- | --- |
| how to learn history dates | how to memorize history dates | 2 | no | unknown |
| how to learn world history | best way to learn world history | 2 | no | unknown |
| how to learn world history as an adult | best way to learn world history | 2 | no | unknown |
| how to use a history degree | how to study history | 3 | no | unknown |
| ancient civilization core best way to get | ancient civilizations | 1 | no | unknown |
| ancient civilization core how to farm | ancient civilizations | 1 | no | unknown |
| ancient civilization core how to find | ancient civilizations | 1 | no | unknown |
| ancient civilization core how to get | ancient civilizations | 1 | no | unknown |
| ancient civilization core how to get palworld | ancient civilizations | 1 | no | unknown |
| ancient civilization core how to get palworld 1.0 | ancient civilizations | 1 | no | unknown |
| ancient civilization parts how to get | ancient civilizations | 1 | no | unknown |
| best way to learn history dates | how to memorize history dates | 1 | no | unknown |
| best way to learn world history | best way to learn world history | 1 | no | unknown |
| how do empires expand | how empires expand | 1 | no | unknown |
| how do historians divide history into periods | how is history divided into periods | 1 | no | unknown |
| how to analyze a primary source | how to analyze a primary source | 1 | no | unknown |
| how to analyze a primary source document | how to analyze a primary source | 1 | no | unknown |
| how to analyze a primary source history | how to analyze a primary source | 1 | no | unknown |
| how to analyze a primary source picture | how to analyze a primary source | 1 | no | unknown |
| how to analyze a secondary source | how to analyze a primary source | 1 | no | unknown |

**study** (345 phrases; 20 shown)

| Phrase | Surfaced by seed | Times observed | Collides? | Volume |
| --- | --- | ---: | --- | --- |
| how to study history effectively | how to study history effectively | 8 | no | unknown |
| how to study history fast and effectively | how to study history effectively | 3 | no | unknown |
| how to memorise history dates | how to remember historical dates | 2 | no | unknown |
| how to study history efficiently | how to study history effectively | 2 | no | unknown |
| how to study history properly | how to study history effectively | 2 | no | unknown |
| world history for kids | world history for beginners | 2 | no | unknown |
| how to study history | how to study history | 5 | no | unknown |
| how to study history and remember it | how to study history | 4 | no | unknown |
| how to study history and civics | how to study history | 3 | no | unknown |
| how to study history and geography | how to study history | 3 | no | unknown |
| how to study history for upsc prelims | how to study history | 3 | no | unknown |
| how to study history of the world | how to study history | 3 | no | unknown |
| how to self study history | how to study history | 2 | no | unknown |
| how to study ancient history | how to study history | 2 | no | unknown |
| how to study art history on your own | how to study history | 2 | no | unknown |
| how to study history and civics class 10 icse | how to study history | 2 | no | unknown |
| how to study history as a hobby | how to study history | 2 | no | unknown |
| how to study history better | how to study history | 2 | no | unknown |
| how to study history for exam in 1 day | how to study history | 2 | no | unknown |
| how to study history for nda | how to study history | 2 | no | unknown |

**app-discovery** (116 phrases; 20 shown)

| Phrase | Surfaced by seed | Times observed | Collides? | Volume |
| --- | --- | ---: | --- | --- |
| best history timeline app | history timeline app | 2 | no | unknown |
| history timeline app | history timeline app | 2 | no | unknown |
| alternate history scenario generator | alternate history scenarios | 1 | no | unknown |
| ancient civilizations game | ancient civilizations | 1 | no | unknown |
| ancient civilizations video game | ancient civilizations | 1 | no | unknown |
| apps for history | best history apps android | 1 | no | unknown |
| best app to learn world history | best way to learn world history | 1 | no | unknown |
| best free art history apps for android | best history apps android | 1 | no | unknown |
| best free history learning apps | free history learning app | 1 | no | unknown |
| best free history learning apps for adults | free history learning app | 1 | no | unknown |
| best history apps for android | best history apps android | 1 | no | unknown |
| best history games for android | best history apps android | 1 | no | unknown |
| best history timeline software | history timeline | 1 | no | unknown |
| best history timeline websites | history timeline | 1 | no | unknown |
| best notification history app android | best history apps android | 1 | no | unknown |
| black history games for students | history games for students | 1 | no | unknown |
| free art history learning apps | free history learning app | 1 | no | unknown |
| free history education apps | free history learning app | 1 | no | unknown |
| free history learning apps | free history learning app | 1 | no | unknown |
| free history learning apps for adults | free history learning app | 1 | no | unknown |


## Collision with the 275 existing primary keywords

`src/lib/blog/index.ts` throws at build time if two articles claim the same
`primaryKeyword`, compared case-insensitively. A collision is therefore a build
failure, not a style problem, so the claimed list was extracted definitively
rather than sampled: all 275 files in `content/blog/` were parsed,
all 275 yielded a `primaryKeyword`, and all 275 are
unique today. The lowercased list is `claimed-primary-keywords.json`.

### Exact collisions — 17 candidate phrases are already claimed

These must not be used as a `primaryKeyword` for any new article. Each is
flagged `collidesWithExisting: true` with its owner in `existingOwnerSlug`.

| Phrase | Cluster | Already owned by |
| --- | --- | --- |
| anime genres explained | A | `anime-genres-explained` |
| basketball career sim game | A | `basketball-career-sim-guide` |
| best android video player | A | `android-video-players-compared` |
| high protein foods list | A | `protein-sources-compared` |
| how much protein per day | A | `how-much-protein-per-day` |
| how to play mkv files on android | A | `how-to-play-mkv-files-on-android` |
| shanghainese vs mandarin | A | `shanghainese-vs-mandarin-differences` |
| spaced repetition language learning | A | `spaced-repetition-for-language-learning` |
| tower defense strategy | A | `tower-defense-strategy-basics` |
| tower defense tower types | A | `tower-types-and-what-they-counter` |
| how to calculate percentages mentally | B | `percentages-in-your-head` |
| memory techniques | B | `memory-techniques-that-work` |
| mental math practice app | B | `mental-math-training-guide` |
| mental math tricks | B | `mental-math-tricks-that-work` |
| how to remember historical dates | C | `how-to-remember-historical-dates` |
| how to study history on your own | C | `how-to-study-history-on-your-own` |
| primary vs secondary sources | C | `primary-vs-secondary-sources` |

### Near collisions — 1 candidate phrase differs only trivially

These do **not** fail the build, because the build compares exact lowercased
strings and these differ by punctuation or a plural. They are flagged anyway
(`nearCollision: true`) because two articles targeting phrasings this close will
compete with each other in search whether or not the build objects.

| Phrase | Cluster | Near-identical to the keyword owned by |
| --- | --- | --- |
| video codec explained | A | `video-codecs-explained` |

Note that collision checking here covers `primaryKeyword` only, as the brief
specifies. Existing `secondaryKeywords` and `longTailKeywords` were also
extracted (`claimed-secondary-longtail.json`) and should be consulted during
cannibalisation review, but they do not fail the build.

## Keywords with verified volume

**Zero.**

Not "few". Not "estimated". Zero, out of 8,610 candidate phrases
and 275 existing primary keywords.

The reason is stated above and repeated here because it is the single most
important sentence in this document: **the only keyword source available to this
environment on 2026-09-21 was Google Autocomplete, and Google Autocomplete
returns no volume component of any kind.** The four sources that do publish
volume — Search Console, Keyword Planner, Trends and a commercial SEO provider —
were each tested today and each was unavailable, for the reasons recorded in the
sources table.

There is consequently no basis in this research for describing any term as
"high volume", "low competition", "easy to rank for", or worth any stated amount. Any such
phrase appearing in a downstream brief, article or report did not come from
this research and should be treated as fabricated.

## Keywords whose volume is unknown

**All 8,610 of them.** Every record in `keyword-candidates.json`
carries:

```json
"volume": "unknown", "difficulty": "unknown", "cpc": "unknown"
```

Those are literal string values written by `build-candidates.mjs`, not nulls
awaiting an estimate and not defaults to be filled in later by inference. The
same three fields are set to `"unknown"` on every one of the
1,200 raw observations as well.

The same is true of the 275 keywords already claimed by published
articles. Nothing on this site has ever had a verified volume figure attached to it.

| Metric | Phrases with a verified value | Phrases where the value is `unknown` |
| --- | ---: | ---: |
| Monthly search volume | 0 | 8,610 |
| Keyword difficulty | 0 | 8,610 |
| CPC / commercial value | 0 | 8,610 |
| Competitor coverage | 0 | 8,610 |
| Traffic projection | 0 | 8,610 |

## What this research can legitimately be used for

1. **Choosing wording.** When two titles say the same thing, prefer the phrasing
   autocomplete actually returned, and cite the seed as the reason.
2. **Finding question-shaped angles.** The 930 expansion
   queries exist to surface the "how/what/why/best/vs" long tail that a bare seed
   does not return. Those phrasings map cleanly onto article sections.
3. **Avoiding collisions.** The 17 exact and
   1 near collisions listed above are the terms a new article
   may not claim.
4. **Balancing the editorial mix.** The intent distribution shows where the pool
   is thin — thin intents are a prompt to look harder, not evidence that readers
   do not want that format.

## What it must not be used for

1. Ranking topics by "demand". There is no demand figure here to rank by.
2. Promising traffic, positions or revenue from any article.
3. Filling a `volume` or `difficulty` field with anything other than `unknown`.
4. Claiming competitors do or do not cover a topic. That was not measured.

## What the owner should do next

1. **Connect Search Console.** Once the existing 275 URLs have been
   crawled, the Performance report becomes the first real demand data this
   project has ever had — and it is specific to this site rather than to a
   general corpus. It would also convert most of this document's `unknown`
   fields into measured ones.
2. **Check the shortlisted primary terms in a real keyword tool** before
   committing an article to each. One article per term makes a bad choice the
   most expensive kind of mistake.
3. **Retarget from data rather than from guesses** after a measurement window.
   That is worth more than another two hundred articles.
