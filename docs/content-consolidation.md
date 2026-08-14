# Content consolidation

Where two articles compete for the same search intent, which one should own it,
and what to do about the other.

Measured **2026-08-13** across all 75 articles — 21 published, 54 gated drafts.

## Nothing here has been implemented

This document proposes. It does not act.

- **No article has been deleted, merged or renamed.**
- **No redirect is proposed**, because no published URL is affected.
- **No draft has been published**, and none is proposed for publication here.

Every proposal below is scoped to a draft that is already gated. The work
happens at the moment that draft is scheduled, not now. That ordering matters:
consolidating before publication is free, and consolidating after publication
costs a redirect and a re-crawl.

## The short answer

| | |
| --- | --- |
| Published vs published collisions | **0** |
| Published vs draft collisions | **9** — none live today |
| Draft vs draft collisions | **1 merge**, 1 false alarm |
| Redirects needed | **0** |
| Articles proposed for deletion | **0** |

Primary-keyword uniqueness is already enforced at build time across all 75
articles, drafts included, so no two articles can share an exact primary term.
Everything below is a *secondary*-term or *thesis-level* overlap, which the build
does not and cannot catch.

---

## 1. Published vs published — clean

All 21 live articles were compared on primary keyword, secondary keywords, title
tokens and H2 structure. **No two compete for the same intent.**

The closest pairs are the four sports drafting guides, which share the pattern
`{sport} draft simulator app`:

| | |
| --- | --- |
| `baseball-draft-gm-guide` | *baseball draft simulator app* |
| `basketball-draft-gm-guide` | *basketball draft simulator app* |
| `football-draft-gm-guide` | *football draft simulator app* |
| `hockey-draft-gm-guide` | *hockey draft simulator app* |

These are not cannibalizing. The sport is the differentiator, each maps to a
different app, and a reader searching *hockey draft simulator* does not want the
baseball page. Token similarity flags them at 0.60 because the template is
shared; the intent is not. **No action.**

---

## 2. Draft vs draft — one real merge

### 2.1 Merge: `sports-gm-games-without-internet` → `best-offline-sports-games-android`

These are the same article written twice.

| | `best-offline-sports-games-android` | `sports-gm-games-without-internet` |
| --- | --- | --- |
| Category | sports-gm | sports-gm |
| Primary | *offline sports games android* | *sports gm games no wifi* |
| Words | 1,403 | 1,450 |
| First H2 | "Four things 'offline' can mean" | "Four things 'offline' can mean" |
| Structure | genre rationale → read the listing → airplane-mode test → hidden network calls → our games → cost | genre rationale → five-minute test → what to expect → our games → hockey example → pre-flight checklist |
| Apps | football, basketball career, baseball | hockey, basketball career, baseball |

Their secondary keyword sets are near-paraphrases of each other:

| `best-offline-sports-games-android` | `sports-gm-games-without-internet` |
| --- | --- |
| *no internet sports game* | *no internet sports games* |
| *android games no account required* | *android games without account* |
| *offline manager game android* | *offline sports management games android* |
| *sports games that work without wifi* | *play without wifi* |

**Proposal — keep `best-offline-sports-games-android` as the canonical.** It has
the broader primary term, its "what offline actually costs you" section is
material the other lacks, and its slug is the more natural URL.

**Merge in from the other, because it is genuinely better there:**

- the five-minute test framing, which is more actionable than "the
  airplane-mode test" alone
- the pre-flight checklist section
- the hockey worked example, which makes the abstract point concrete
- the hockey app in `relatedApps`, giving the merged article four apps instead
  of three

**Then leave `sports-gm-games-without-internet` unpublished and remove it from
the schedule.** It is gated, so there is no URL, no index entry and nothing to
redirect. Deleting the file is optional and is a judgement call for the owner —
this document does not delete it.

### 2.2 Not a duplicate: `best-offline-arcade-games-android`

Flagged at 0.60 token similarity against the sports article, and it shares the
same explainer template and two secondary keywords (*google play data safety
section*, and a near-identical "how to test if a game/app works offline").

It is a different article: different category, different apps, and its content —
what specifically reaches for the network in an arcade game, ad SDK behaviour —
does not appear in the sports version. **No action beyond making sure the two
do not both claim *google play data safety section* as a secondary.** Give it to
the arcade article, which discusses ad-network behaviour in more depth.

---

## 3. Published vs draft — nine terms to resolve before publication

None of these collide today, because a gated draft has no route, no sitemap
entry and no index presence. **Each becomes live the day its draft publishes.**
The fix is always the same shape: decide which page owns the term, and demote it
on the other *before* the draft ships.

### 3.1 Exact collisions — a published article's secondary is a draft's primary

| Published article | Secondary term | Draft that owns it as primary | Proposal |
| --- | --- | --- | --- |
| `how-to-track-protein-intake` | *how much protein per day* | `how-much-protein-per-day` | See 3.3 — this one is not just a keyword |
| `learn-cantonese-beginners-guide` | *cantonese tones explained* | `cantonese-tones-explained` | Demote from the hub. The draft is the deeper treatment |
| `learn-cantonese-beginners-guide` | *cantonese vs mandarin* | `cantonese-vs-mandarin-differences` | Demote from the hub |
| `learn-malay-beginners-guide` | *malay vs indonesian* | `malay-vs-indonesian-differences` | See 3.3 — the hub has a whole H2 on this |

### 3.2 Near collisions — same intent, different wording

| Published article | Term | Draft | Draft's primary | Proposal |
| --- | --- | --- | --- | --- |
| `mental-math-training-guide` | secondary *mental math tricks that work* | `mental-math-tricks-that-work` | *mental math tricks* | Demote from the hub. The draft's title **is** the hub's secondary |
| `android-video-player-guide` | primary *android video player for local files* + secondary *offline video player android* | `android-video-players-compared` | *best android video player* | Keep the hub's primary. Drop *offline video player android* from the hub — the comparison draft is the better home for a "which one" query |
| `how-to-track-protein-intake` | secondary *protein tracking app no subscription* | `protein-tracking-apps-compared` | *best protein tracking app* | Demote from the hub. A no-subscription query is a comparison query |
| `learn-thai-script-beginners-guide` | secondaries *thai consonant classes*, *thai tone rules* | `thai-tones-explained` | *thai tones explained* | **Both articles currently claim both terms.** Give them to the draft and remove from the hub |
| `space-shooter-arcade-guide` | — | `bullet-hell-vs-classic-shmup` | *bullet hell vs shmup* | No keyword collision, but the hub's genre discussion overlaps the draft's thesis. Trim the hub's genre passage to a summary that links down |

### 3.3 Thesis-level overlap — the ones that matter most

A shared keyword is easy to fix. A shared *argument* is not, because the hub
already answers the question the draft exists to answer, and a reader who lands
on the hub has no reason to click through.

**`how-to-track-protein-intake` → `how-much-protein-per-day`**

The hub's H2 "What the official numbers actually say" is the draft's entire
thesis. The draft is titled "How Much Protein Per Day? What the Published
Reference Numbers Actually Answer".

This is the sharpest case on the site. Two options, and the owner has to pick:

1. **The hub keeps the term.** Re-scope the draft to something the hub does not
   cover — protein *timing*, or distribution across meals, or the specific
   reference-intake methodology. This is the lower-risk option, because the hub
   is already live and already ranking for whatever it ranks for.
2. **The draft takes the term.** Cut the hub's section down to two or three
   sentences and a link. This is the better long-term shape — a hub that
   summarises and delegates — but it means editing a live, indexed page.

Whichever is chosen, decide **before** the draft is scheduled. Both articles
carry health content, so the sourcing has to survive the edit either way.

**`learn-malay-beginners-guide` → `malay-vs-indonesian-differences`**

The hub has an H2 titled "Malay and Indonesian: close, and not the same". The
draft is "Malay vs Indonesian: How Close Are They, Really?". Same treatment:
trim the hub section to a summary and link down, or re-scope the draft.

**`learn-thai-script-beginners-guide` → `is-thai-hard-to-learn`**

The hub has an H2 "Where Thai sits on the difficulty scale". The draft is "Is
Thai Hard to Learn? Where the Difficulty Actually Sits". Same treatment.

Note this hub is involved in two separate overlaps — the difficulty draft here
and the tones draft in 3.2. It is the most heavily claimed page in the corpus.
When the Thai batch ships, plan both edits together rather than in two passes.

---

## 4. Modifier clusters with no owner

These are not keyword collisions. They are concepts that many articles touch and
none owns, which is how a site ends up with ten pages that each rank badly for
the same modifier instead of one that ranks well.

| Cluster | Articles touching it | Proposed owner | Everyone else |
| --- | --- | --- | --- |
| **offline / no wifi / without internet** | 12 (4 published sports guides, `android-video-player-guide`, `basketball-career-sim-guide`, plus 5 drafts) | `best-offline-sports-games-android` for sports; `best-offline-arcade-games-android` for arcade; `android-video-players-compared` for video | Mention offline behaviour where it is a genuine app fact, but do not target the term |
| **free** | 9 | No single owner needed — "free" is a factual property of every app in the catalog, not a search target | Keep stating it because it is true; do not build a page around it |
| **gm / franchise** | 10 (4 published guides + 6 drafts) | `career-mode-vs-franchise-mode` for the distinction; `salary-cap-basics-for-gm-games` for the mechanics | The four sport-specific guides keep their sport-specific framing |
| **for beginners** | 11 (5 published language guides + 6 drafts) | Each language guide owns *{language} for beginners* — already true and already unique | No change |
| **vs / compared** | 30 | Every comparison draft owns its own pairing | Watch that no two comparison drafts ship claiming the same pair |

The *offline* cluster is the one worth acting on. Twelve articles reaching for
the same modifier, with three legitimate owners among them, is a real dilution
risk once the drafts publish.

---

## 5. Gap in the existing register

`docs/keyword-verification-needed.md` currently lists 10 exact-string keyword
overlaps. It does not cover:

- the three thesis-level overlaps in 3.3, which are the highest-risk items and
  are invisible to a string comparison
- the shared secondaries between `learn-thai-script-beginners-guide` and
  `thai-tones-explained`
- the near-miss wording collisions in 3.2
- the `sports-gm-games-without-internet` merge
- the modifier clusters in section 4

**Proposal:** treat this file as the register for intent-level overlap and keep
`keyword-verification-needed.md` for what it is good at — exact terms whose
demand has not been verified in a real tool. They answer different questions.

---

## 6. Where this plugs into publishing

`docs/content-review-process.md` already defines a nine-step release checklist
per draft. This adds one step, which belongs before the rest:

> **Check this document for the draft being released.** If it appears in section
> 2 or 3, complete the consolidation — the merge, or the demotion on the
> published hub — and rebuild, **before** the draft's status changes.

Doing it in that order means the hub never competes with the spoke, not even for
one crawl cycle.

Drafts named here, for quick reference:

`sports-gm-games-without-internet` · `best-offline-sports-games-android` ·
`best-offline-arcade-games-android` · `how-much-protein-per-day` ·
`protein-tracking-apps-compared` · `cantonese-tones-explained` ·
`cantonese-vs-mandarin-differences` · `malay-vs-indonesian-differences` ·
`thai-tones-explained` · `is-thai-hard-to-learn` ·
`mental-math-tricks-that-work` · `android-video-players-compared` ·
`bullet-hell-vs-classic-shmup`

Thirteen of the 54 drafts. The other 41 have no known overlap and can be
scheduled on their own merits.

## Method

Comparisons were computed from the parsed frontmatter and body of all 75
markdown files:

- exact match of every secondary keyword against every primary keyword
- token-containment match at ≥3 shared tokens and ≥75% coverage, to catch
  paraphrases that exact matching misses
- Jaccard similarity ≥0.60 between primary keywords
- draft primary keywords searched verbatim in published bodies
- draft titles compared against published H2 headings at ≥70% token overlap,
  which is what surfaced the three thesis-level overlaps in 3.3

Two automated hits were reviewed and discarded as false positives: *how to read
nutrition labels* against *how to read thai*, and a soccer-formations title
matching an unrelated protein H2. Both were token artifacts with no shared
intent.
