# Existing Content — Duplication & Cannibalization Audit

**Scope:** all 175 published articles in `content/blog/*.md`
**Audit date:** 2026-09-15
**Method:** quantitative — pairwise lexical similarity, shingle/Jaccard body comparison, heading-skeleton clustering, keyword-density measurement, rendered link-graph construction, catalog diffing, live citation spot-checks.
**Status:** AUDIT ONLY. No article file was modified in producing this document.

---

## 1. Executive summary

| Measure | Result |
|---|---|
| Articles audited | 175 / 175 (100%) |
| Article pairs compared | 15,225 (175 × 174 / 2) |
| Pairs above flagging threshold | 70 |
| Pairs recommended for **consolidation** | 2 |
| Pairs recommended **KEEP BOTH — differentiate** | 11 |
| Max body 5-gram Jaccard similarity (any pair) | **0.059** |
| Max intro (first ~140 words) Jaccard similarity | **0.094** |
| Distinct H2 skeletons | **175 / 175 — zero shared heading sequences** |
| Duplicate titles / metaTitles / descriptions / primaryKeywords | **0 / 0 / 0 / 0** (independently re-verified) |
| Articles with primary keyword stuffed | **0** (max token density 1.26%) |
| Articles with **zero** exact-match primary keyword in body | 163 / 175 |
| Correct self-referencing canonicals | **175 / 175** |
| Articles with `robots: index, follow` | 175 / 175 |
| Stale app names found | **0** |
| Incorrect package IDs found | **0** (no package ID appears in any article body) |
| Unsupported app feature claims | **0** (all 14 candidates verified as supported or false positives) |
| Citation entries | 507 across 91 distinct domains, 224 distinct URLs |
| Citations with future `accessed` dates | **0** |
| Citations spot-checked live | 24 / 24 returned HTTP 200 |
| Fabricated-looking citations | **0** |
| **Editorial orphans (0 in-body inbound links)** | **13** |
| **Near-orphans (exactly 1 inbound)** | **30** |
| Articles deeper than 3 clicks from `/` | **0** (max depth is 2) |
| **`relatedArticles` entries declared but never rendered** | **126** |
| Apps in catalog with **zero** article coverage | **10** (catalog grew 29 → 39 during this audit) |

### The headline

**This corpus is not scaled or templated content, and it is not keyword-stuffed.** Those two findings are the most important outputs of this audit because they are the two failure modes that would block publishing 100 more articles, and the measurements rule both out decisively:

- The single highest body-text similarity between any two of the 175 articles is **0.059** (5-gram Jaccard). For reference, genuinely spun or templated content typically lands above 0.35. Every article is independently written prose.
- The single highest intro similarity is **0.094**. There are no near-duplicate openings.
- All 175 articles have a **unique H2 heading sequence**. Not one pair shares a skeleton.
- 163 of 175 articles do not contain their own primary keyword as an exact phrase in the body even once. The corpus is, if anything, *under*-optimized rather than stuffed.

**The real problems are structural, not textual**, and they are cheap to fix:

1. **126 `relatedArticles` entries never render.** `getRelatedPosts()` in `src/lib/blog/index.ts:200` slices to `count = 3`, but 126 articles declare 4. Every 4th entry is dead weight — authored, validated, and silently discarded.
2. **All 5 commercial-intent comparison articles are orphans.** Every article carrying `disclaimer: "comparison"` has **zero** in-body inbound links. These are the highest-commercial-value pages in the corpus ("best keto app", "best protein tracking app", "best android video player", "best language learning app for less common languages", "which sports career sim to play") and they receive no internal link equity at all. This is a perfect 5-for-5 correlation and is almost certainly a publishing-process gap rather than coincidence.
3. **Only 2 genuine cannibalization pairs exist**, both in `sports-gm`.

---

## 2. Method and thresholds

Five independent similarity measures were computed for all 15,225 pairs:

| Measure | Definition |
|---|---|
| `meta` | Jaccard of content-word sets over (title + metaTitle + description + primaryKeyword + secondaryKeywords + longTailKeywords) |
| `kw` | Jaccard over keyword fields only |
| `body5` | Jaccard of 5-gram shingles over the Markdown body, frontmatter stripped, code/images/link-targets removed, stopwords removed |
| `body8c` | **Containment** of 8-gram shingles relative to the smaller document — catches subset duplication that Jaccard hides |
| `intro` | Jaccard of 4-gram shingles over the first ~140 content words |

A pair was flagged if `meta ≥ 0.18` **or** `body5 ≥ 0.06` **or** `intro ≥ 0.15` **or** `kw ≥ 0.25` **or** `body8c ≥ 0.08`. 70 pairs cleared at least one bar.

**Threshold justification.** Because `body5` never exceeds 0.059 anywhere in the corpus, body-text duplication is definitionally not the risk here and cannot be used as the primary signal. The operative signal is therefore `meta` + `kw` overlap **conditioned on** the two articles targeting the same real-world entity. Two articles about *different* sports or *different* languages can share a very high `kw` score purely because they share the scaffolding vocabulary of their vertical ("learn X for beginners", "is X hard to learn") while targeting entirely distinct queries that never compete. That distinction — same framing vs. same target — is what separates CONSOLIDATE from KEEP BOTH below, and it is applied by inspection of the actual query target, not by score alone.

---

## 3. Overlap table

Sorted by risk. `in:` = in-body editorial inbound links.

| Pair | meta | kw | body5 | intro | Verdict | Reasoning |
|---|---|---|---|---|---|---|
| `best-offline-sports-games-android` ↔ `sports-gm-games-without-internet` | 0.339 | 0.417 | 0.004 | 0.007 | **CONSOLIDATE** | Same category, same intent ("offline sports games on Android"), **same opening H2 verbatim** ("Four things 'offline' can mean"), same airplane-mode/five-minute test device, and 2 of 3 `relatedApps` shared. This is the only pair in the corpus where two articles answer the same query with the same structure. Weaker page: `best-offline-sports-games-android` (in:0, 1422w, zero `relatedArticles` inbound). |
| `career-mode-vs-franchise-mode` ↔ `career-sim-vs-manager-game` | 0.246 | 0.323 | 0.001 | 0.000 | **CONSOLIDATE** (owner decision) | Both resolve the same binary for the same reader: player-career format vs team-management format. PKs are query variants of each other ("career mode vs franchise mode" / "career mode vs manager mode"). Both articles internally acknowledge the other's angle as an aside ("The third shape nobody names" / "A related but different distinction"), which is the classic signature of two pages written around one intent. Weaker page: `career-sim-vs-manager-game` (882w, in:2) vs (1585w, in:9). |
| `best-offline-arcade-games-android` ↔ `best-offline-sports-games-android` | **0.453** | **0.528** | 0.001 | 0.000 | **KEEP BOTH — differentiate** | Highest metadata overlap in the corpus, but the vertical differs (arcade vs sports) and the queries do not compete. The overlap is the shared "offline is four claims + airplane-mode test" framing, not the target. Resolves automatically if the consolidation above proceeds. |
| `av1-on-android-explained` ↔ `hardware-vs-software-decoding` | 0.255 | 0.333 | **0.059** | 0.000 | **KEEP BOTH — differentiate** | **Corpus maximum body overlap** (`body8c` 0.091). Genuine partial text duplication: AV1's "What 'support' actually means" and "Why AV1 playback stutters" restate the decoder-profile/stutter mechanism that is the whole subject of the other page. Distinct queries, overlapping explanation. |
| `is-thai-hard-to-learn` ↔ `is-vietnamese-hard-to-learn` | 0.372 | **0.619** | 0.000 | 0.000 | **KEEP BOTH — differentiate** | Highest keyword overlap in the corpus, entirely from the shared "is X hard to learn" frame. Different languages, non-competing queries. **But** the Vietnamese article carries secondary keyword `vietnamese vs thai difficulty` and an H2 "Comparison with Thai", which does reach into the Thai page's target. |
| `best-sports-manager-games-for-short-sessions` ↔ `sports-gm-games-without-internet` | 0.345 | 0.270 | 0.006 | 0.000 | **KEEP BOTH — differentiate** | Session-length discovery vs offline-capability discovery. Genuinely different buyer questions, but both lean on a "five-minute test" device and overlapping app sets. |
| `learn-italian-beginners-guide` ↔ `learn-vietnamese-beginners-guide` | 0.375 | 0.500 | 0.002 | 0.000 | **KEEP BOTH — differentiate** | Different languages; overlap is the shared "first month" template ("A realistic first month" H2 appears in 5 articles). No query competition. |
| `learn-lao-beginners-guide` ↔ `learn-vietnamese-beginners-guide` | 0.319 | 0.281 | 0.005 | 0.000 | **KEEP BOTH — differentiate** | As above. |
| `is-thai-hard-to-learn` ↔ `learn-malay-beginners-guide` | 0.203 | 0.158 | 0.012 | **0.094** | **KEEP BOTH — differentiate** | Corpus-maximum intro similarity — still only 0.094, i.e. no real duplication. Both open on a difficulty-scale framing. Different languages. |
| `low-carb-tracking-apps-compared` ↔ `protein-tracking-apps-compared` | 0.181 | 0.244 | 0.023 | 0.042 | **KEEP BOTH — differentiate** | Different verticals (keto vs protein), identical structural template including the shared closing H2 "How we checked, and a note on names". Both are orphans — that is the more urgent issue than the overlap. |
| `complete-vs-incomplete-proteins` ↔ `protein-sources-compared` | 0.200 | 0.353 | — | — | **KEEP BOTH — differentiate** | `complete-vs-incomplete-proteins` is the shortest article in the corpus (698 body words, in:1) and `protein-sources-compared` already carries `complete protein foods` as a secondary keyword and covers protein quality. Highest-risk thin-page overlap in health-nutrition. |
| `difficulty-curves-explained` ↔ `wave-survival-game-design` | 0.250 | 0.400 | 0.002 | 0.000 | **KEEP BOTH — differentiate** | Difficulty pacing vs wave-gap pacing. Adjacent design concepts, distinct queries. |
| `anime-genres-explained` ↔ `anime-terminology-glossary` | 0.231 | 0.303 | 0.005 | 0.000 | **KEEP BOTH — differentiate** | Taxonomy vs glossary. The glossary (789w, in:2) is the weaker page and risks being absorbed. |
| `how-to-track-protein-intake` ↔ `protein-tracking-apps-compared` | 0.217 | 0.308 | 0.005 | 0.000 | **NO ACTION** | Clean informational/commercial intent split ("how to track protein intake" vs "best protein tracking app"). Correct topical pairing. |
| `android-video-player-guide` ↔ `android-video-players-compared` | ~0.20 | 0.29 | — | — | **NO ACTION** | Troubleshooting ("why won't my video play") vs commercial comparison ("best android video player"). Correct split. |
| 5 × draft-GM guides (basketball / football / hockey / baseball / soccer) | up to 0.267 | up to 0.424 | ≤0.002 | 0.000 | **NO ACTION** | Each is anchored on a sport-specific mechanic: basketball = draft formats, football = unit construction and refresh cost, hockey = six-player tightness and goaltending, baseball = stat-card reading, soccer = the draw and coverage-vs-fit. Genuinely differentiated. |
| 6 × career-sim guides (baseball / basketball / football / hockey / soccer / golf) | up to 0.264 | up to 0.385 | ≤0.015 | ≤0.013 | **NO ACTION** | Same — sport-specific substance under a shared frame. |
| `baseball-stats-explained-for-beginners` ↔ `ops-and-slugging-explained` | 0.222 | 0.276 | 0.004 | 0.000 | **NO ACTION** | Correct hub-and-spoke: the hub (1662w, in:11) links down to the spoke (743w). Working as intended. |
| `cantonese-vs-mandarin-differences` ↔ `learn-cantonese-beginners-guide` | 0.207 | 0.258 | 0.037 | 0.000 | **NO ACTION** | Hub/spoke within one language. |
| `how-long-does-it-take-to-learn-russian` ↔ `how-long-to-learn-italian` | 0.214 | 0.324 | 0.000 | 0.000 | **NO ACTION** | Different languages. |
| `lao-alphabet-explained` ↔ `learn-thai-script-beginners-guide` | 0.283 | 0.267 | 0.000 | 0.000 | **NO ACTION** | Different scripts. |
| Remaining 49 flagged pairs | <0.25 | — | <0.02 | <0.01 | **NO ACTION** | Shared vertical vocabulary only. |

---

## 4. Consolidation recommendations — consequences first

> **Read this section before acting on any consolidation recommendation above.**

### 4.1 The hosting constraint — stated plainly

**This site is deployed to GitHub Pages, which cannot serve a 301 or 308 redirect.** There is no server-side redirect mechanism available on this host.

- `vercel.json` exists in the repo but the site is **not** deployed to Vercel; GitHub Pages ignores it entirely.
- `public/_headers` is Netlify/Cloudflare syntax and is **also ignored** by GitHub Pages.
- Therefore **"consolidate and 301 the weaker page" is not an executable instruction on this infrastructure.** Any recommendation phrased that way would be describing a redirect that does not and cannot exist.

The only retirement pattern this host actually supports is the one already in production for the renamed basketball app at `/apps/82-0-pro-basketball-draft/`: keep the URL serving a real HTML page, and have that page carry `<link rel="canonical">` to the successor plus a meta-refresh and a no-JS fallback body. That is a *client-side* approximation of a redirect. It passes consolidation signals to Google reasonably well, but it is not a 301, it does not pass equity as reliably, and it requires a bespoke route per retired URL.

### 4.2 Consequence analysis per consolidation candidate

#### Candidate A — retire `best-offline-sports-games-android` into `sports-gm-games-without-internet`

| Consequence | Finding |
|---|---|
| In-body inbound links that would break | **0** — no article links to it |
| `relatedArticles` references that would break | **0** — no article lists it |
| In `out/sitemap.xml` | **Yes** (1 entry) |
| In `out/blog/rss.xml` | **Yes** |
| Likely Search Console impressions | Published 2026-09-04 as part of the 139-article bulk release. Eleven days old at audit date. Impressions are plausible but likely low; **this has not been verified against Search Console and must not be asserted as fact.** Check before acting. |
| Outbound links lost | 4 in-body links out |

**This is the cleanest consolidation candidate in the corpus**: zero internal links break because nothing links to it. The only costs are the sitemap/RSS entries and whatever early impressions it has accrued.

**Recommended action (honest alternative to a redirect):** Do **not** delete the file. Either
(a) **differentiate it** — narrow it to a genuinely distinct angle (e.g. offline *career* sims specifically, or a per-app verified offline-capability table), fix the duplicate opening H2, and give it real inbound links; or
(b) **retire it properly** — merge its unique material into `sports-gm-games-without-internet`, then convert the retired URL to a canonical-plus-meta-refresh stub following the existing `/apps/82-0-pro-basketball-draft/` pattern, and remove it from the sitemap.

Option (a) is lower-risk and cheaper. Option (b) requires a bespoke route and owner sign-off. **Flagged for owner decision.**

#### Candidate B — retire `career-sim-vs-manager-game` into `career-mode-vs-franchise-mode`

| Consequence | Finding |
|---|---|
| In-body inbound links that would break | **2** — `how-a-golf-cut-works`, `how-to-choose-a-sports-career-sim` |
| `relatedArticles` references that would break | **2** — `how-a-golf-cut-works` (index 3 — currently **dead**, never renders), `how-to-choose-a-sports-career-sim` |
| In `out/sitemap.xml` | **Yes** |
| In `out/blog/rss.xml` | **Yes** |
| Likely Search Console impressions | Published 2026-09-04. Carries `intent: commercial`. **Unverified — check Search Console before acting.** |
| Outbound links lost | 5 in-body links out, including the only in-body link into `career-mode-vs-franchise-mode` from this cluster |

**This one is not clean.** Two articles link to it in prose, and one of them (`how-to-choose-a-sports-career-sim`) is itself an orphan whose main job is routing readers into this cluster. Retiring `career-sim-vs-manager-game` would require rewriting those two sentences, not just adding a redirect that this host cannot serve anyway.

**Recommended action:** **Differentiate, do not retire.** Give `career-sim-vs-manager-game` a distinct job — it is already the shorter, more decision-oriented page and covers three sports (`baseball-career-sim`, `baseball-draft-gm-team`, `golf-career-simulator`) that `career-mode-vs-franchise-mode` does not touch. Sharpen it into the *practical chooser* and leave `career-mode-vs-franchise-mode` as the *conceptual explainer*. Retitle/re-key `career-sim-vs-manager-game` away from the "career mode vs …" pattern so the two stop sharing a query shape. **Flagged for owner decision.**

### 4.3 Publication-date rule (applies to every recommendation in this document)

> **`publishedAt` is never changed.** Original publication dates are preserved on every article, including ones that are rewritten, merged into, or differentiated.
>
> **`updatedAt` changes only after a meaningful revision** — new sections, corrected facts, changed recommendations, or substantive rewrites. It must **not** be touched for cosmetic edits, link additions, typo fixes, or to manufacture freshness. Bumping `updatedAt` without a corresponding content change is a freshness-spoofing signal and is prohibited.

---

## 5. KEEP BOTH — required differentiation

Each page below needs concrete, first-party differentiation, not paraphrase. Specifics:

| Pages | Differentiation required |
|---|---|
| `av1-on-android-explained` vs `hardware-vs-software-decoding` | **Highest real text overlap in the corpus.** Cut the general decoder-profile/stutter explanation out of the AV1 page and link to the decoding page for it. Leave AV1 with what is genuinely AV1-specific: the Android version/CDD requirement history, the royalty-free licensing position, AV1-vs-HEVC file-size observations from actual test files, and which specific devices in first-party testing had hardware AV1. |
| `best-offline-arcade-games-android` vs `best-offline-sports-games-android` vs `sports-gm-games-without-internet` | All three share the "four things offline can mean" scaffold. Keep that taxonomy in **one** page and link to it from the others. Replace it in the other two with a **verified per-app airplane-mode result table** — actual observed behaviour for the studio's own titles, which is first-party data no competitor can copy. |
| `is-vietnamese-hard-to-learn` vs `is-thai-hard-to-learn` | Remove `vietnamese vs thai difficulty` from the Vietnamese page's secondary keywords and cut the "Comparison with Thai" H2 down to a one-line pointer. That comparison belongs in its own page or in `lao-vs-thai-differences`' neighbourhood, not inside a difficulty page for a third language. |
| `learn-*-beginners-guide` family (8 articles) | Five share the H2 "A realistic first month". Differentiate the *content* of that section per language: Italian should show a transparent-spelling drill, Vietnamese a tone-pair minimal-pair drill, Lao a script-first reading schedule, Khmer a stacked-consonant decoding schedule. Same heading is acceptable; identical structure underneath is not. |
| `low-carb-tracking-apps-compared` vs `protein-tracking-apps-compared` | Both close with "How we checked, and a note on names". Keep the methodology disclosure (it is an integrity asset) but make the comparison axes genuinely different: low-carb should compare **net-carb subtraction conventions and ketone/fasting logs**; protein should compare **database depth and repeat-meal tap cost**. Both already gesture at this — push it further so the tables share no column. |
| `complete-vs-incomplete-proteins` (698w) vs `protein-sources-compared` | The shortest article in the corpus overlaps a 1667w page that already targets `complete protein foods`. Either expand the short page into genuinely distinct territory (the limiting-amino-acid calculation worked through with real numbers, the history of why the combining rule was relaxed) or fold it in. It currently has 1 inbound link. |
| `anime-terminology-glossary` (789w) vs `anime-genres-explained` | Make the glossary a genuine reference — alphabetised, more entries, linkable anchors per term — rather than a prose explainer that reads like a thinner version of the genres page. |
| `difficulty-curves-explained` vs `wave-survival-game-design` | Split cleanly: difficulty curves = how challenge scales *within* a run; wave survival = how the *gaps between* waves pace a session. Remove the overlapping pacing discussion from whichever page is not the owner of it. |
| `best-sports-manager-games-for-short-sessions` vs `sports-gm-games-without-internet` | One owns the "five-minute test", the other links to it. Do not run the same test device in both. |

---

## 6. Stale app names

**None found. No fixes to apply.**

Both renames are already fully propagated through `content/blog/`:

| App slug | Current catalog name | Occurrences in article bodies | Stale occurrences |
|---|---|---|---|
| `pro-basketball-draft-gm-mode` | **Pro Basketball GM Franchise** | 17 | **0** |
| `soccer-draft-gm-xi` | **38-0-0 Pro Football GM Soccer** | 12 | **0** |

Verification performed three ways:
1. Literal string scan for six stale-name variants (`82-0 Pro Basketball Draft`, `82-0 Basketball Draft`, `38-0-0 Soccer Draft`, `Soccer Draft & GM XI`, etc.) across all 175 files — **0 hits**.
2. Repo-wide `grep` for `82-0` restricted to `content/`, `src/`, `docs/` — the only hits are the **intentional legacy redirect stub route** `src/app/apps/82-0-pro-basketball-draft/` and documentation describing it. That route is deliberate and documented in `docs/authority-audit.md` (item **T9/L8**) as a canonical-plus-meta-refresh stub that must stay unlinked and out of the sitemap.
3. Full enumeration of every catalog app name appearing in article bodies (Section 7 below) — all 29 names match the current catalog exactly.

**Package IDs:** zero package-ID strings and zero `play.google.com` URLs appear in any article body. There is nothing to get wrong, and nothing is wrong.

**Referential integrity:** 0 invalid `relatedApps` slugs, 0 invalid `relatedArticles` slugs, 0 self-references, 0 empty `relatedApps`.

---

## 7. Unsupported app claims

**None found.** 47 distinct capitalised mode/feature phrases were extracted from article bodies, FAQs and takeaways and diffed against the full text of `src/data/apps/catalog/*.ts`. 33 matched directly. All 14 non-matches were manually verified and every one resolves:

| Phrase | Resolution |
|---|---|
| "Endless Mode" | **Real** — `action-arcade.ts`, a named feature of Space Shooter - Galaxy Arcade |
| "Time Travel Mode", "Civilization Survival Mode" | **Real** — `education-brain.ts`, named features of World History Timeline Sim |
| "Live Sim", "Unlimited Draft", "Salary Cap Draft" | **Real** — present in catalog, matched as substrings of longer phrases |
| "Four rulesets" (football) | **Supported** — catalog lists exactly four: Unlimited, Limited, Salary Cap, Playoff Mode |
| "Nutrition Board" | **Not an app claim** — "Food and Nutrition Board" (NIH / National Academies) |
| "International Football Association Board" | **Not an app claim** — IFAB, the real governing body |
| "Flash Player" | **Not an app claim** — historical reference to Adobe Flash |
| "The Football Career", "The Baseball Career Sim", "The Golf Career", "The Hockey Career Sim" | **Regex artifacts** — partial captures of correct catalog names |

Additionally, 65 sentences asserting a feature of a named app were scored against that app's own catalog entry. Only 3 fell below a 28% content-word match, and all 3 are false positives (prose vocabulary, not feature invention).

---

## 8. Keyword-density measurements

Exact-match primary-keyword counts over body prose (frontmatter stripped, code/images/link-targets removed).

**Distribution (occurrences per 1,000 body words):**

| Statistic | Value |
|---|---|
| min | 0.00 |
| p25 | 0.00 |
| median | **0.00** |
| p75 | 0.00 |
| p90 | 0.00 |
| p95 | 0.60 |
| max | 6.29 |
| mean | 0.12 |
| standard deviation | 0.59 |
| outlier threshold (mean + 2σ) | 1.31 |

**Articles above mean + 2σ — 5 of 175:**

| Article | per 1k | count | body words | token density | placement (Title/Meta/Desc/Head/Intro/FAQ/Takeaway) |
|---|---|---|---|---|---|
| `sugar-alcohols-explained` | 6.29 | 5 | 795 | **1.26%** | 1/1/0/0/2/2/1 |
| `keto-flu-explained` | 2.43 | 2 | 822 | 0.49% | 1/1/0/0/1/1/1 |
| `comprehensible-input-explained` | 2.33 | 2 | 859 | 0.47% | 1/1/1/0/1/1/2 |
| `learn-cantonese-beginners-guide` | 2.29 | 5 | 2182 | 0.92% | 1/1/0/0/0/3/0 |
| `complete-vs-incomplete-proteins` | 1.43 | 1 | 698 | 0.29% | 0/0/0/0/1/1/1 |

**Verdict: no keyword stuffing anywhere in the corpus.**

- Maximum token density is **1.26%** (`sugar-alcohols-explained`). Stuffing concern generally begins above ~3–4%. The top outlier is a two-word term ("sugar alcohols") that is the literal subject of the article and appears 5 times in 795 words — that is normal English, not manipulation.
- **Zero** articles exceed 2.0% token density. **Zero** exceed 1.5%.
- 163 of 175 articles contain their primary keyword **zero** times as an exact phrase in the body.

The last point deserves a note for the incoming writers: this is largely benign, because most primary keywords are natural-language query strings ("added sugar vs total sugar", "what is the difference between total sugars and added sugars") that no competent prose writer would repeat verbatim. But it does mean the corpus leans hard on title/metaTitle/description for topical signal. **New articles should not overcorrect.** Matching the existing 0–1 exact-match convention is correct; deliberately inserting keywords to raise density would break the pattern and violate the project's no-stuffing rule.

---

## 9. Thin content

Word counts here are **body prose only** (frontmatter stripped), so they run lower than the briefing's baseline figures, which include rendered FAQ and takeaway text.

| Statistic | Body prose | Rendered (body + FAQs + takeaways) |
|---|---|---|
| min | 698 | 1001 |
| median | 919 | — |
| max | 2676 | — |

Only **1 article** falls below 700 body words: `complete-vs-incomplete-proteins` (698w, 1001 rendered). Shortest ten:

| Article | Body | Rendered | Inbound |
|---|---|---|---|
| `complete-vs-incomplete-proteins` | 698 | 1001 | 1 |
| `what-is-whip-in-baseball` | 726 | 1020 | 2 |
| `percentages-in-your-head` | 736 | 1043 | 2 |
| `plant-vs-animal-protein` | 739 | 1050 | 2 |
| `ops-and-slugging-explained` | 743 | 1032 | 1 |
| `clean-sheets-explained` | 745 | 1057 | 1 |
| `how-a-golf-cut-works` | 745 | 1065 | 2 |
| `goal-difference-and-tiebreakers` | 749 | 1052 | 1 |
| `what-is-icing-in-hockey` | 752 | 1104 | 1 |
| `electrolytes-on-low-carb` | 760 | 1069 | 1 |

**Assessment: no thin-content problem.** Every article clears 1000 rendered words. These short pages are single-concept definitional spokes ("what is WHIP", "what is icing") where a tight answer is the correct format — padding them would make them worse. The notable pattern is that **short pages correlate with low inbound links** (8 of the 10 shortest have ≤2), which is a linking issue, not a length issue.

---

## 10. Internal linking

### 10.1 Click depth — healthy

| Depth from `/` | Article pages |
|---|---|
| 1 | 3 |
| 2 | 172 |
| **>3** | **0** |

No article is more than 2 clicks from the homepage. `/blog/` lists every article in static HTML, so the whole corpus is one hop from the blog index. **No depth remediation needed.**

Across all 230 rendered routes: 1 at depth 0, 25 at depth 1, 202 at depth 2, and **2 unreachable** — `/404/` and `/apps/82-0-pro-basketball-draft/`. Both are intentional and correct (the latter is the documented retirement stub that must stay unlinked).

### 10.2 Editorial link graph

Measured from in-body prose links only (`](/blog/<slug>/)`), which is where real link equity lives — the rendered "related articles" cards are template furniture.

| Statistic | Value |
|---|---|
| mean inbound | 3.73 |
| median inbound | 3 |
| p90 inbound | 8 |
| max inbound | 17 (`learn-thai-script-beginners-guide`) |
| min/median/max outbound | 1 / 4 / 8 |
| articles with 0 outbound | **0** |

### 10.3 Orphans — 13 articles with zero in-body inbound links

| Article | Category | Outbound | Note |
|---|---|---|---|
| `low-carb-tracking-apps-compared` | health-nutrition | 2 | **commercial intent**, `disclaimer: comparison` |
| `protein-tracking-apps-compared` | health-nutrition | 2 | **commercial intent**, `disclaimer: comparison` |
| `language-learning-apps-compared` | language-learning | 4 | **commercial intent**, `disclaimer: comparison` |
| `android-video-players-compared` | video-utility | 2 | **commercial intent**, `disclaimer: comparison` |
| `how-to-choose-a-sports-career-sim` | sports-gm | 7 | **commercial intent**, `disclaimer: comparison` |
| `best-offline-sports-games-android` | sports-gm | 4 | consolidation candidate A |
| `added-sugars-vs-total-sugars` | health-nutrition | 4 | |
| `depth-charts-explained` | sports-gm | 6 | |
| `expansion-drafts-explained` | sports-gm | 6 | |
| `frame-rate-and-resolution-explained` | video-utility | 4 | |
| `how-the-offside-rule-works` | sports-gm | 4 | |
| `is-vietnamese-hard-to-learn` | language-learning | 8 | |
| `mma-weight-classes-explained` | sports-gm | 4 | only 3 articles reference `mma-boxing-fight-draft` at all |

**The commercial cluster is the finding that matters.** All 5 articles carrying `disclaimer: "comparison"` are orphans — a 5-for-5 correlation. These are the money pages of the corpus and no article in it links to any of them. They all link *outward* (2–7 links each) but receive nothing back. This is a systematic publishing-process gap.

All 5 correctly carry `researchDate: 2026-09-03`, so the build-time validator passes; the defect is purely in linking.

### 10.4 Near-orphans — 30 articles with exactly 1 inbound link

`audio-codecs-explained`, `auto-fire-and-touch-controls`, `basketball-advanced-stats-explained`, `batting-order-strategy-explained`, `building-a-daily-practice-habit`, `cantonese-vs-mandarin-differences`, `clean-sheets-explained`, `complete-vs-incomplete-proteins`, `electrolytes-on-low-carb`, `glycemic-index-and-load`, `goal-difference-and-tiebreakers`, `how-calendars-and-dating-systems-work`, `how-long-does-it-take-to-learn-russian`, `how-quiz-difficulty-works`, `injuries-in-sports-career-games`, `is-thai-hard-to-learn`, `keto-flu-explained`, `learning-a-language-without-a-teacher`, `malay-pronunciation-guide`, `ops-and-slugging-explained`, `power-play-and-penalty-kill`, `protein-for-older-adults`, `quarterback-archetypes-explained`, `soccer-positions-explained`, `subtitle-formats-explained`, `thai-tones-explained`, `transfers-and-contracts-explained`, `two-way-players-explained`, `what-is-era-in-baseball`, `what-is-icing-in-hockey`

Note several **reciprocal-only pairs** — two articles that link to each other and to nothing else, forming isolated islands: `clean-sheets-explained` ↔ `goal-difference-and-tiebreakers`, `keto-flu-explained` ↔ `electrolytes-on-low-carb`, `power-play-and-penalty-kill` ↔ `what-is-icing-in-hockey`. These need a third inbound link from a hub page to join the main graph.

### 10.5 126 dead `relatedArticles` entries — highest-value cheap fix

`getRelatedPosts()` (`src/lib/blog/index.ts:200`) is declared `count = 3` and returns `[...explicit, ...sameCategory, ...rest].slice(0, count)`.

`relatedArticles` length distribution across the corpus:

| Declared entries | Articles |
|---|---|
| 1 | 4 |
| 2 | 4 |
| 3 | 41 |
| **4** | **126** |

**Every 4th entry in 126 articles is authored, build-validated, and then silently discarded.** That is 126 internal links that exist in the source, pass validation, and never reach the rendered page.

Confirmed in production output: `added-sugars-vs-total-sugars` declares four related articles; three render (3 occurrences each in the HTML) and the fourth, `net-carbs-explained-keto-tracking`, appears only once — from the body prose link, not from the related-articles module.

This directly damages several orphans. For example `sports-gm-games-without-internet` is referenced by `hockey-line-combinations-explained` and `mma-weight-classes-explained` at index 3 — both dead.

**Fix:** change `count = 3` to `count = 4` in `src/lib/blog/index.ts:200`. One-line change, recovers 126 internal links, and is verifiable by re-running the link graph. **This is not my file to edit — flagging for the lead.** Note that this changes the rendered output of 126 pages and should be checked against the related-articles grid layout (currently a 3-up card list).

---

## 11. Canonicals

**All correct. No action.**

| Check | Result |
|---|---|
| Articles with a self-referencing canonical | **175 / 175** |
| Canonical matches `https://reigncreativellc.com/blog/<slug>/` exactly | **175 / 175** |
| Missing canonical | 0 |
| Wrong canonical | 0 |
| `robots` meta | `index, follow` on all 175 |

No article-level canonical defects exist. (The duplicate-canonical issue the lead is tracking concerns the `index.txt` RSC payloads and `/404/`, which are outside this audit's scope — none of the 175 article HTML pages is implicated.)

---

## 12. Citations

| Check | Result |
|---|---|
| Total `sources[]` entries | 507 |
| Distinct URLs | 224 |
| Distinct domains | 91 |
| Missing title / publisher / url / accessed | 0 / 0 / 0 / 0 |
| Non-HTTPS URLs | **0** |
| **`accessed` dates in the future** | **0** |
| Non-ISO `accessed` formats | 0 |
| `accessed` later than the article's `updatedAt` | 0 |
| Articles with 0 sources | 19 |

`accessed` dates cluster on three values — `2026-08-09` (223), `2026-08-13` (13), `2026-09-03` (271) — matching the three publication waves. Consistent and plausible.

**Fabricated-looking citations: none.** The domain inventory is dominated by primary and institutional sources: `pubmed.ncbi.nlm.nih.gov` (37), `medlineplus.gov` (27), `en.wikipedia.org` (25), `fda.gov` (22), `unicode.org` (20), `developer.android.com` (18), `theifab.com` (17), `mlb.com` (14), `state.gov` (14), `glottolog.org` (13), `nap.nationalacademies.org` (12), `fdc.nal.usda.gov` (11), `iso639-3.sil.org` (11). No unknown, invented, or implausible domain appears anywhere in the set.

**Live spot-check: 24 URLs sampled, 24 returned HTTP 200.** The sample deliberately over-weighted deep paths and obscure domains — the easiest things to fabricate — including:

- `https://www.ftc.gov/news-events/news/press-releases/2016/01/lumosity-pay-2-million-settle-ftc-deceptive-advertising-charges-its-brain-training-program`
- `https://www.abcboxing.com/wp-content/uploads/2025/10/ABC-BOXING-JUDGE-MANUAL.pdf`
- `https://glottolog.org/resource/languoid/id/nucl1235`, `.../viet1252`, `.../laoo1244`
- `https://roguebasin.com/index.php/Berlin_Interpretation`
- `https://bjorklab.psych.ucla.edu/research/`
- `https://seeing-theory.brown.edu/basic-probability/index.html`
- `https://humanorigins.si.edu/evidence/behavior/stone-tools`
- `https://www.unicode.org/charts/PDF/U0100.pdf`

The 93 URLs flagged by automated shape heuristics were all false positives — the "uppercase-in-path" rule fires on legitimate Wikipedia article titles and W3C specification paths (`/TR/css-color-4/`, `/TR/WCAG22/`).

**The 19 articles with zero sources** are all first-party app explainers (`basketball-draft-gm-guide`, `football-draft-gm-guide`, `hockey-draft-gm-guide`, `soccer-draft-xi-guide`, `mma-boxing-fight-draft-guide`, `anime-coloring-app-guide`, `anime-trivia-quiz-guide`, `career-mode-vs-franchise-mode`, `how-fantasy-draft-strategy-works`, `how-soccer-league-tables-work`, `salary-cap-basics-for-gm-games`, `snake-draft-vs-auction-draft`, `what-makes-a-good-draft-board`, `sports-gm-games-without-internet`, `best-sports-manager-games-for-short-sessions`, `football-positions-explained-for-drafting`, `hockey-line-combinations-explained`, `hockey-positions-explained`, `basketball-career-sim-guide`). Describing the studio's own software from direct knowledge needs no external citation. This is correct, not a gap.

---

## 13. Templates, boilerplate and title patterns

### 13.1 Heading skeletons — no template duplication

**175 distinct H2 sequences across 175 articles. Zero shared skeletons. Zero shared first-three-H2 openings at a threshold of 3+ articles.**

H2 count distribution: 4 H2s (4 articles), 5 (7), 6 (39), **7 (68)**, 8 (34), 9 (12), 10 (5), 11 (3), 12 (1), 13 (1), 15 (1).

### 13.2 Recurring boilerplate headings

While no *sequence* repeats, individual headings do:

| Heading | Articles |
|---|---|
| "Where our app fits" | 33 |
| "Where our apps fit" | 18 |
| "Where our games fit" | 7 |
| **→ combined promotional-placement section** | **58 (33.1%)** |
| "The short version" | 22 |
| "Where to read next" | 13 |
| "In a simulation" | 10 |
| "Further reading" | 6 |
| "A realistic first month" | 5 |
| "How we checked, and a note on names" | 4 |

**One in three articles ends with a near-identically-titled promotional section.** The sections' *contents* are distinct (body similarity is near zero), so this is a labelling pattern rather than duplicated content — but at 58 articles it is a visible, scaled-looking signature. Varying the heading wording across the corpus would remove the pattern at negligible cost. Recommend new articles use varied phrasing rather than extending this run.

### 13.3 Title pattern concentration

| Pattern | Titles | metaTitles |
|---|---|---|
| "X Explained" | **50 (28.6%)** | **54 (30.9%)** |
| "Title: Subtitle" | 46 (26.3%) | 21 (12.0%) |
| Other | 34 (19.4%) | 28 (16.0%) |
| Question | 14 (8.0%) | 15 (8.6%) |
| "How to / How X" | 11 (6.3%) | 17 (9.7%) |
| "Compared" | 8 (4.6%) | 2 (1.1%) |
| "Guide" | 7 (4.0%) | 19 (10.9%) |
| "A vs B" | 5 (2.9%) | 17 (9.7%) |
| "Best / listicle" | 0 | 2 (1.1%) |

83 of 175 titles (47.4%) contain a colon.

**"X Explained" is approaching saturation at ~30% of both titles and metaTitles.** This is the single most concentrated pattern in the corpus. With 100 new articles incoming, holding this share would mean ~30 more "Explained" titles. **Recommend capping "X Explained" at well under 20% of the new batch** and diversifying toward question, how-to, and comparison forms.

### 13.4 Field-length and validity re-verification (independent of baseline)

| Check | Result |
|---|---|
| Duplicate titles | **0** |
| Duplicate metaTitles | **0** |
| Duplicate descriptions | **0** |
| Duplicate primaryKeywords (case-insensitive) | **0** |
| Unique slugs | 175 / 175 |
| `status` != `published` | 0 |
| `noindex: true` | 0 |
| `publishedAt` > 2026-09-15 | 0 |
| `metaTitle` > 60 chars | **0** |
| `description` outside 70–160 chars | **0** |
| `comparison` disclaimer missing `researchDate` | 0 |

Baseline confirmed on every count.

### 13.5 Demand-evidence labelling — integrity check passed

`demandTier` values across the corpus: `unverified-medium` (137), `unverified-high` (37), `unverified-low` (1). **Every article is labelled `unverified-*`.** No article claims verified search volume. This is honest labelling and complies with the project's integrity rules. New articles must maintain this convention unless a figure is genuinely Search-Console-sourced and labelled as such.

---

## 14. Appendix — topics already covered

**Purpose: this is the cannibalization guard for the 100 new articles.** Before assigning any new title, check the relevant cluster below. If a proposed article's query target already appears here, it must either target a genuinely distinct query or be dropped.

Format: `slug` — "primaryKeyword" (body words, inbound links)

Three hard constraints from the content model:
- **`primaryKeyword` must be globally unique across all posts, case-insensitively.** A collision is a build failure. All 175 keywords below are taken.
- `metaTitle` ≤ 60 chars; `description` 70–160 chars.
- `relatedApps` must be non-empty and every slug must exist in the catalog.

### SPORTS-GM — 64 articles

**Draft-simulator app guides (6)** — one per sport, all taken
`baseball-draft-gm-guide` — "baseball draft simulator app" (1735, 12) · `basketball-draft-gm-guide` — "basketball draft simulator app" (1682, 13) · `football-draft-gm-guide` — "football draft simulator app" (1523, 10) · `hockey-draft-gm-guide` — "hockey draft simulator app" (1524, 8) · `soccer-draft-xi-guide` — "soccer draft simulator" (1554, 9) · `mma-boxing-fight-draft-guide` — "mma fight simulator app" (1475, 3)

**Career-sim app guides (6)** — one per sport, all taken
`baseball-career-sim-guide` — "baseball career sim game" (1223, 10) · `basketball-career-sim-guide` — "basketball career sim game" (1690, 6) · `football-career-sim-guide` — "football career sim game" (1053, 3) · `hockey-career-sim-guide` — "hockey career sim game" (978, 5) · `soccer-career-sim-guide` — "soccer career simulator" (1051, 6) · `golf-career-sim-guide` — "golf career game" (1076, 4)

**Format choice / "which should I play" (4) — SATURATED, highest cannibalization risk in corpus**
`career-mode-vs-franchise-mode` — "career mode vs franchise mode" (1585, 9) · `career-sim-vs-manager-game` — "career mode vs manager mode" (882, 2) · `how-to-choose-a-sports-career-sim` — "which sports career sim to play" (775, **0**) · `how-player-career-modes-work` — "how player career mode works" (983, 6)

**Discovery: offline / session length (3) — SATURATED**
`best-offline-sports-games-android` — "offline sports games android" (1422, **0**) · `sports-gm-games-without-internet` — "sports gm games no wifi" (1455, 4) · `best-sports-manager-games-for-short-sessions` — "sports manager games for phone" (1632, 6)

**Draft mechanics & roster rules (8)**
`how-fantasy-draft-strategy-works` — "fantasy draft strategy" (1917, 5) · `what-makes-a-good-draft-board` — "how to build a draft board" (1574, 8) · `snake-draft-vs-auction-draft` — "snake draft vs auction draft" (1448, 4) · `how-draft-lotteries-work` — "how do draft lotteries work" (790, 3) · `how-football-draft-order-works` — "how draft order works" (873, 3) · `expansion-drafts-explained` — "expansion draft explained" (772, **0**) · `salary-cap-basics-for-gm-games` — "salary cap explained" (1449, 8) · `free-agency-explained` — "free agency explained" (802, 3)

**Roster & team building (5)**
`how-to-build-a-balanced-basketball-roster` — "how to build a basketball roster" (1486, 10) · `depth-charts-explained` — "depth chart explained" (807, **0**) · `rebuild-vs-retool` — "rebuild vs retool" (829, 3) · `hockey-line-combinations-explained` — "hockey line combinations" (1782, 8) · `transfers-and-contracts-explained` — "how football transfers work" (884, 1)

**Positions (5)**
`basketball-positions-explained` — "basketball positions explained" (1581, 6) · `football-positions-explained-for-drafting` — "football positions explained" (1885, 5) · `hockey-positions-explained` — "hockey positions explained" (1627, 6) · `soccer-positions-explained` — "soccer positions explained" (846, 1) · `quarterback-archetypes-explained` — "quarterback archetypes" (858, 1)

**Baseball stats & rules (7)**
`baseball-stats-explained-for-beginners` — "baseball stats explained" (1662, 11) · `what-is-era-in-baseball` — "what is era in baseball" (774, 1) · `what-is-whip-in-baseball` — "what is whip in baseball" (726, 2) · `ops-and-slugging-explained` — "what is ops in baseball" (743, 1) · `batting-order-strategy-explained` — "how a batting order works" (961, 1) · `baseball-pitching-roles-explained` — "starter vs reliever vs closer" (912, 3) · `two-way-players-explained` — "what is a two way player in baseball" (998, 1)

**Basketball stats (1)** — `basketball-advanced-stats-explained` — "basketball advanced stats explained" (831, 1)

**Hockey rules & stats (4)**
`what-is-icing-in-hockey` — "what is icing in hockey" (752, 1) · `power-play-and-penalty-kill` — "how a power play works" (766, 1) · `plus-minus-and-hockey-stats` — "plus minus hockey stat" (816, 4) · `hockey-goaltending-explained` — "hockey goalie position explained" (919, 2)

**Soccer rules & tactics (5)**
`how-the-offside-rule-works` — "offside rule explained" (786, **0**) · `clean-sheets-explained` — "what is a clean sheet" (745, 1) · `goal-difference-and-tiebreakers` — "goal difference tiebreaker" (749, 1) · `how-soccer-league-tables-work` — "how soccer league tables work" (1437, 5) · `soccer-formations-explained` — "soccer formations explained" (1791, 12)

**Golf (3)** — `golf-scoring-explained` — "how golf scoring works" (821, 2) · `how-a-golf-cut-works` — "what is the cut in golf" (745, 2) · `golf-course-management-basics` — "golf course management strategy" (844, 4)

**Combat sports (2)** — `boxing-scoring-explained` — "how boxing scoring works" (1659, 2) · `mma-weight-classes-explained` — "mma weight classes explained" (1448, **0**)

**Simulation engine & probability (2)** — `how-sports-simulation-engines-work` — "how sports simulation games work" (1444, 6) · `understanding-sports-sim-probability` — "sports simulation probability" (1444, 6)

**Career-mode experience (3)** — `coach-trust-and-playing-time` — "how to get more playing time in career mode" (867, 3) · `injuries-in-sports-career-games` — "injuries in career mode" (842, 1) · `reading-a-defense-basics` — "how to read a defense" (859, 3)

> **Gap note for A5:** `mma-boxing-fight-draft` is referenced by only 3 articles, `golf-career-simulator` by 6. Combat sports and golf are the thinnest sub-verticals and have the most room for non-cannibalizing additions.

### LANGUAGE-LEARNING — 36 articles

**Per-language beginner guides (8) — one per app, all taken**
`learn-cantonese-beginners-guide` — "learn cantonese for beginners" (2182, 9) · `learn-italian-beginners-guide` — "learn italian for beginners" (895, 4) · `learn-khmer-beginners-guide` — "learn khmer for beginners" (2097, 7) · `learn-lao-beginners-guide` — "learn lao for beginners" (924, 6) · `learn-malay-beginners-guide` — "learn malay for beginners" (1938, 10) · `learn-russian-cyrillic-beginners-guide` — "learn russian cyrillic alphabet" (1903, 6) · `learn-thai-script-beginners-guide` — "learn thai script" (1956, **17 — most-linked page in corpus**) · `learn-vietnamese-beginners-guide` — "learn vietnamese for beginners" (893, 4)

**Difficulty & time-to-learn (5)**
`is-thai-hard-to-learn` — "is thai hard to learn" (1906, 1) · `is-vietnamese-hard-to-learn` — "is vietnamese hard to learn" (893, **0**) · `how-long-does-it-take-to-learn-russian` — "how long to learn russian" (2034, 1) · `how-long-to-learn-italian` — "how long does it take to learn italian" (887, 3) · `how-many-words-to-be-conversational` — "how many words to be fluent" (881, 5)

**Scripts & alphabets (3)** — `khmer-script-explained` — "khmer script explained" (2292, 2) · `lao-alphabet-explained` — "lao alphabet" (888, 5) · `vietnamese-alphabet-explained` — "vietnamese alphabet" (809, 2)

**Tones (4)** — `cantonese-tones-explained` — "cantonese tones explained" (1930, 2) · `thai-tones-explained` — "thai tones explained" (1763, 1) · `vietnamese-tones-explained` — "vietnamese tones explained" (779, 5) · `what-is-a-tonal-language` — "what is a tonal language" (896, 6)

**Language-pair comparisons (3)** — `cantonese-vs-mandarin-differences` — "cantonese vs mandarin" (2064, 1) · `lao-vs-thai-differences` — "is lao similar to thai" (835, 2) · `malay-vs-indonesian-differences` — "malay vs indonesian" (1702, 3)

**Grammar specifics (4)** — `italian-articles-and-gender` — "italian articles explained" (900, 3) · `italian-verb-conjugation-basics` — "italian verb conjugation" (886, 3) · `russian-cases-explained-for-beginners` — "russian cases explained" (2052, 4) · `vietnamese-pronouns-explained` — "vietnamese pronouns" (898, 2)

**Method & technique (7)** — `comprehensible-input-explained` — "comprehensible input" (859, 6) · `spaced-repetition-for-language-learning` — "spaced repetition language learning" (1830, 8) · `shadowing-technique-explained` — "shadowing technique language learning" (787, 3) · `listening-practice-in-a-new-language` — "how to improve listening in a foreign language" (923, 3) · `learning-a-language-without-a-teacher` — "how to learn a language alone" (859, 1) · `language-learning-plateau` — "language learning plateau" (867, 4) · `malay-pronunciation-guide` — "malay pronunciation guide" (1896, 1)

**Frameworks & discovery (2)** — `cefr-levels-explained` — "cefr levels explained" (851, 6) · `language-learning-apps-compared` — "best language learning app for less common languages" (2069, **0**)

> **Gap note for A5:** `learn-lao` (4 articles), `learn-cambodian-khmer` (5) and `learn-malay` (6) are the least-covered language apps. **No per-language beginner guide slot remains** — all 8 are taken. Safe new angles: per-language grammar specifics (only Italian, Russian, Vietnamese have them), per-language script deep-dives (Cantonese and Malay have none), and per-language "how long" pages (only Russian and Italian have them).

### HEALTH-NUTRITION — 23 articles

**Protein intake & tracking (6)** — `how-much-protein-per-day` — "how much protein per day" (1892, 7) · `how-to-track-protein-intake` — "how to track protein intake" (1917, 8) · `how-to-hit-a-protein-goal` — "how to hit protein goals" (888, 3) · `protein-per-meal-explained` — "protein per meal" (835, 3) · `protein-for-older-adults` — "protein for older adults" (803, 1) · `protein-tracking-apps-compared` — "best protein tracking app" (1989, **0**)

**Protein quality & sources (3)** — `complete-vs-incomplete-proteins` — "complete protein" (698, 1) · `plant-vs-animal-protein` — "plant protein vs animal protein" (739, 2) · `protein-sources-compared` — "high protein foods list" (1667, 5)

**Keto & low-carb (6)** — `net-carbs-explained-keto-tracking` — "net carbs explained" (1884, 13) · `keto-macros-explained` — "keto macros explained" (1658, 4) · `keto-flu-explained` — "keto flu" (822, 1) · `electrolytes-on-low-carb` — "electrolytes on keto" (760, 1) · `what-is-a-ketone-reading` — "ketone levels explained" (1733, 3) · `low-carb-tracking-apps-compared` — "best keto app" (1950, **0**)

**Labels & food data (5)** — `reading-nutrition-labels` — "how to read nutrition labels" (1841, 8) · `added-sugars-vs-total-sugars` — "added sugar vs total sugar" (792, **0**) · `sugar-alcohols-explained` — "sugar alcohols" (795, 2) · `serving-size-vs-portion-size` — "serving size vs portion size" (881, 2) · `why-food-databases-disagree` — "food database accuracy" (829, 2)

**Energy & metabolic (3)** — `tdee-and-energy-balance` — "tdee explained" (851, 2) · `glycemic-index-and-load` — "glycemic index explained" (854, 1) · `intermittent-fasting-windows-explained` — "intermittent fasting windows" (2157, 3)

> **Note for A5:** this is the most keyword-dense cluster relative to its size — protein and keto basics are largely exhausted. All health-nutrition articles require `disclaimer: "health"`.

### ACTION-ARCADE — 15 articles

**App guides (2)** — `space-shooter-arcade-guide` — "space shooter arcade game android" (1789, 9) · `zombie-survival-roguelike-guide` — "zombie survival roguelike android" (1631, 7)

**Genre definition & history (4)** — `bullet-hell-vs-classic-shmup` — "bullet hell vs shmup" (1825, 3) · `history-of-shoot-em-up-games` — "history of shoot em up games" (1835, 4) · `what-makes-a-roguelike` — "what is a roguelike" (2061, 3) · `horde-survival-vs-wave-shooter` — "horde survival games" (837, 2)

**Design mechanics (4)** — `difficulty-curves-explained` — "difficulty curve game design" (964, 4) · `wave-survival-game-design` — "wave survival games" (2084, 3) · `power-ups-and-build-design` — "power up design games" (820, 3) · `boss-pattern-recognition` — "how to beat boss patterns" (877, 4)

**Play technique (1)** — `score-attack-strategy` — "score attack strategy" (860, 2)

**Device & platform (4)** — `auto-fire-and-touch-controls` — "mobile game touch controls" (864, 1) · `battery-and-performance-in-mobile-games` — "mobile game battery drain" (836, 3) · `why-free-android-games-show-ads` — "why do free apps have ads" (797, 3) · `best-offline-arcade-games-android` — "offline arcade games android" (1830, 3)

### EDUCATION-BRAIN — 14 articles

**Mental math (5)** — `mental-math-training-guide` — "mental math practice app" (1846, 4) · `mental-math-tricks-that-work` — "mental math tricks" (2303, 5) · `multiplication-shortcuts-explained` — "multiplication shortcuts" (909, 3) · `percentages-in-your-head` — "how to calculate percentages mentally" (736, 2) · `estimation-techniques-explained` — "estimation techniques math" (843, 3)

**Memory & cognition (3)** — `memory-techniques-that-work` — "memory techniques" (877, 3) · `working-memory-and-training` — "what is working memory" (2188, 4) · `building-a-daily-practice-habit` — "how to build a study habit" (875, 1)

**World history (6)** — `world-history-timeline-guide` — "interactive world history timeline app" (1942, 4) · `major-eras-of-world-history` — "eras of world history explained" (2061, 3) · `how-historians-date-events` — "how historians date events" (2072, 5) · `bce-and-ce-explained` — "what does bce and ce mean" (776, 2) · `how-calendars-and-dating-systems-work` — "how calendar systems work" (854, 1) · `primary-vs-secondary-sources` — "primary vs secondary sources" (769, 2)

> **Gap note for A5:** `world-history-timeline-sim` has only 6 articles and `mental-math-memory-games` 10. World history is broad and under-served — the largest genuinely open space in the corpus.

### VIDEO-UTILITY — 12 articles

**App guides & discovery (2)** — `android-video-player-guide` — "android video player for local files" (1647, 8) · `android-video-players-compared` — "best android video player" (1628, **0**)

**Codecs & decoding (4)** — `video-codecs-explained` — "video codecs explained" (2676, 5) · `audio-codecs-explained` — "audio codecs explained" (857, 1) · `av1-on-android-explained` — "av1 support android" (816, 2) · `hardware-vs-software-decoding` — "hardware vs software decoding" (818, 5)

**Containers, formats & processing (3)** — `video-file-formats-explained` — "video file formats explained" (2289, 6) · `remuxing-vs-transcoding` — "remux vs transcode" (820, 4) · `subtitle-formats-explained` — "subtitle formats" (893, 1)

**Video properties (1)** — `frame-rate-and-resolution-explained` — "frame rate and resolution explained" (916, **0**)

**Platform & privacy (2)** — `android-app-permissions-explained` — "how to check app permissions android" (806, 3) · `google-play-data-safety-explained` — "google play data safety" (818, 2)

### ANIME-CREATIVE — 11 articles

**App guides (2)** — `anime-coloring-app-guide` — "anime coloring app android" (1634, 6) · `anime-trivia-quiz-guide` — "anime trivia quiz game" (1757, 6)

**Anime knowledge (3)** — `anime-genres-explained` — "anime genres explained" (2023, 3) · `anime-art-styles-explained` — "anime art styles" (799, 3) · `anime-terminology-glossary` — "anime terms glossary" (789, 2)

**Coloring & art technique (4)** — `color-theory-for-beginners` — "color theory for beginners" (1940, 3) · `color-palettes-for-anime-art` — "anime color palette" (925, 2) · `digital-coloring-techniques` — "digital coloring techniques" (2069, 4) · `line-art-and-flats-explained` — "what are flats in coloring" (849, 2)

**Quiz & word-game design (2)** — `how-quiz-difficulty-works` — "how quiz difficulty works" (846, 1) · `word-game-strategy-guide` — "word game strategy" (846, 2)

---

## 15. App coverage — where new articles are least likely to cannibalize

> **Catalog changed during this audit.** `src/data/apps/catalog/*.ts` grew from **29 to 39 apps** while this audit was running (another agent's work this wave; no apps were removed, and both renamed apps still carry their correct current names). All findings in this document were re-verified against the 39-app catalog and still hold: 0 stale names, 0 invalid `relatedApps` references, 0 invalid `relatedArticles` references.

### 15.1 Ten apps with ZERO article coverage — the safest space for new content

These ten apps were added to the catalog with no supporting articles. **Any article written for these apps is guaranteed not to cannibalize an existing page, because no existing page targets them.** This is the highest-value, lowest-risk allocation for a large share of the 100 new articles.

| App slug | Catalog name | Category | Existing articles |
|---|---|---|---|
| `tennis-career-sim` | Tennis Career Simulator 2026 | sports-gm | **0** |
| `rugby-draft-pro-league` | 24-0 Rugby Draft Pro League | sports-gm | **0** |
| `space-galaxy-attack-hardcore` | Space Galaxy Attack Hardcore | action-arcade | **0** |
| `jellyfish-arena-survivor-io` | Jellyfish Arena Survivor io | action-arcade | **0** |
| `regal-tower-defense` | Regal Tower Defense: TD Game | action-arcade | **0** |
| `anime-casino-slots` | Anime Casino Slot Machine Game | anime-creative | **0** |
| `easy-recipes-meal-planner` | Easy Recipes & Meal Planner | health-nutrition | **0** |
| `learn-marathi` | Learn Marathi Language Fast | language-learning | **0** |
| `learn-shanghainese` | Learn Shanghainese Wu Chinese | language-learning | **0** |
| `tcg-card-grading-scanner` | TCG Card Grading Scanner Value | video-utility | **0** |

Two particularly clean openings, because the corpus has an established pattern with a free slot:

- **`learn-marathi` and `learn-shanghainese`** — the per-language beginner-guide pattern exists for 8 languages and is fully taken for those 8, but these two languages have no page at all. `learn marathi for beginners` and `learn shanghainese for beginners` are unclaimed `primaryKeyword` values fitting an established, proven template.
- **`tennis-career-sim` and `rugby-draft-pro-league`** — the career-sim guide pattern (6 sports) and draft-GM guide pattern (6 sports) both have an obvious free slot for tennis and rugby respectively, plus all the downstream rules/stats/positions spokes those sports support (scoring, positions, formats), none of which exist.

Use the exact catalog names above verbatim. Note `anime-casino-slots` is a gambling-themed title — check content-policy and disclaimer handling with the owner before writing for it.

### 15.2 Coverage across the 29 apps that already have articles

Articles per app (via `relatedApps`), ascending. Low counts are opportunity; high counts are saturation.

| Articles | App |
|---|---|
| **3** | `mma-boxing-fight-draft` |
| **4** | `learn-lao` |
| **5** | `learn-cambodian-khmer` |
| **6** | `world-history-timeline-sim`, `learn-malay`, `golf-career-simulator` |
| 8 | `learn-russian`, `football-career-sim` |
| 9 | `anime-coloring-book`, `anime-trivia-word-games`, `learn-cantonese`, `pro-basketball-my-career-sim`, `hockey-career-sim`, `soccer-career-sim-xi` |
| 10 | `mental-math-memory-games`, `soccer-draft-gm-xi` |
| 11 | `learn-thai`, `learn-vietnamese`, `baseball-career-sim` |
| 12 | `learn-italian` |
| 13 | `regal-video-player` |
| 15 | `space-shooter-classic-arcade`, `zombie-survival-last-survivor` |
| 16 | `hockey-draft-gm-manager` |
| 17 | `pro-basketball-draft-gm-mode`, `football-draft-gm-mode` |
| 20 | `baseball-draft-gm-team` |
| 22 | `keto-diet-tracker` |
| **25** | `protein-diet-tracker` |

**On the briefing's "check catalog for any 30th app" question.** At the start of this audit the catalog held exactly **29** apps — the 29 listed in the briefing were the complete set, and there was no 30th. It has since grown to **39** (Section 15.1). Any agent relying on the briefing's 29-app list should re-read the catalog before writing `relatedApps`.

---

## 16. Prioritised actions

| # | Action | Owner | Effort | Impact |
|---|---|---|---|---|
| 1 | Change `count = 3` → `count = 4` in `src/lib/blog/index.ts:200` | Lead | 1 line | Recovers **126** internal links. Verify against the 3-up card grid layout. |
| 2 | Add in-body inbound links to the **5 orphaned comparison articles** from their topical hubs | Content | Low | Fixes the entire commercial-intent class receiving zero link equity |
| 3 | Add inbound links to the other **8 orphans** and the 3 reciprocal-only islands | Content | Low | Joins 13 pages to the main graph |
| 4 | Differentiate `av1-on-android-explained` vs `hardware-vs-software-decoding` | Content | Medium | Removes the corpus's only real body-text overlap |
| 5 | Decide Candidate A (`best-offline-sports-games-android`) — differentiate or retire | **Owner** | Medium | Only clean consolidation available; **no 301 possible on GitHub Pages** |
| 6 | Decide Candidate B (`career-sim-vs-manager-game`) — recommend differentiate, not retire | **Owner** | Medium | 2 in-body links would break on retirement |
| 7 | Cap "X Explained" well below 20% of the 100 new titles | A5 / writers | None | Prevents pattern saturation past 30% |
| 8 | Vary the "Where our app fits" heading in new articles | A5 / writers | None | Stops a 58-article boilerplate run from growing |
| 9 | Verify Search Console impressions before acting on 5 or 6 | **Owner** | Low | Both consolidation calls are currently unverified on impressions |

---

## 17. Blocking assessment for the 100-article release

**Nothing in the existing 175 articles blocks publishing 100 more.** Specifically:

- No scaled-content signature (max body similarity 0.059, zero shared heading skeletons).
- No keyword stuffing (max token density 1.26%).
- No fabricated citations (24/24 live spot-checks passed, all 91 domains legitimate).
- No stale app names, no wrong package IDs, no unsupported feature claims.
- No canonical defects on any article page.
- No depth problems.

Five cautions carry into the new batch:

1. **`primaryKeyword` uniqueness is a build-time failure.** All 175 existing keywords are listed in Section 14. A collision breaks the build.
2. **"X Explained" is at ~30%.** Do not extend it.
3. **"Where our app fits" is at 58 articles (33%).** Vary the heading.
4. **New articles must ship with inbound links, not just outbound ones.** The 5-for-5 orphaning of the comparison articles shows the current process reliably produces outbound links and reliably forgets inbound ones. With 100 new articles, that same gap would produce a far larger orphan set.
5. **The catalog moved from 29 to 39 apps mid-wave.** Re-read `src/data/apps/catalog/*.ts` before writing any `relatedApps` value rather than trusting the briefing's 29-app list. The 10 new apps (Section 15.1) have zero existing coverage and are the safest targets in the entire release.
