# Corrections and app-name updates, non-sports articles — 2026-10-02

Follow-up to section H of [app-inventory-2026-10.md](./app-inventory-2026-10.md). Four
non-sports apps were renamed on Google Play, and three were re-described. Published
articles still used the old names, and many said things the live listings now
contradict. This pass corrected those articles under the
[editorial policy](../src/app/editorial-policy/page.tsx) (`#corrections`, `#dates`) and
[content-spec.md](./content-spec.md). Nothing was committed or built.

Evidence used for every judgement:

- `scripts/play-verification.json` — the live listings, signed out, verified
  2026-10-02T22:27:24Z: title, short and full description, ads, IAP, rating.
- `node scripts/dump-catalog.mjs <slug>` — the refreshed catalog (the source of truth
  for app features) for `mental-math-memory-games`, `keto-diet-tracker`,
  `anime-casino-slots` and `regal-video-player`.
- The 2026-09-15 listing snapshot (`git show 2170969:scripts/play-verification.json`)
  — used to see exactly what each listing dropped.
- `docs/featured-app-source-inventory.md` (2026-09-21) — used only to judge whether
  an old *absence* claim (no percentile, no brain-age figure) can still stand. It is
  never cited as evidence of a feature.

## Summary

- **149 non-sports articles changed**: 116 corrected and 33 with the app name only.
  - Each corrected article has one dated correction note and `updatedAt: "2026-10-02"`.
  - Name-only articles keep their `updatedAt` and have no note.
  - No `publishedAt` changed, and no sports article was touched.
- **532 published sentences (counting headings and FAQ text) were rewritten or removed, in 313 passages.**
  - 79 passages carry flagged sentences from section H2.
  - 234 passages are additional corrections the inventory had not flagged. Examples: brain-training "only arithmetic and memory" claims, "the drills named above are listed on the app page" (the app page never lists drills), Ketora "logs stay on your device" claims, and the slots app's machines, meters and daily rewards.
- **Flagged sentences: 80 of 87 rewritten; 7 judged not false and kept** (the list below gives the reasons).
  - IQ Test & Brain Training Games: 58 of 61 rewritten.
  - Ketora: 16 of 16 rewritten.
  - Vegas Casino Slots JACKPOT WIN: 6 of 10 rewritten.
- **Articles corrected by app:**
  - IQ Test & Brain Training Games: 97.
  - Ketora: 16.
  - Vegas Casino Slots JACKPOT WIN: 3.
  - Video Player All Formats PRO: none. Its description did not change, so only the name needed updating.
- **`src/data/hubs.ts`: no change.** It names none of the four apps and makes no claim about them.
- **One listing statement was referred to the owner.** Owner-only compliance notes are kept outside this public repository.

## How each statement was judged

**False — rewritten, with a correction note.** A statement the live listing or the
refreshed catalog contradicts. Under the editorial policy, a feature that is in
neither the listing nor the catalog is treated as not existing. So a feature the
listing has dropped (Ketora's electrolyte logging, the slots app's 25 machines) also
counts as false.

**Not contradicted — kept.** Examples: "not a clinical or standardised assessment";
the practice / entertainment / educational activity / standardised assessment
framing; Teen rating; ads. The brain-training listing's own disclaimer says results
are "not medical, psychological, clinical, educational-placement, employment, or
professional diagnostic assessments", so those sentences still match it.

**Unverifiable — handled by direction.** Some details are in neither the listing nor
the catalog: individual drill names, the 49-technique library, delayed-recall rounds,
offline play, percentile or brain-age figures.

- An *absence* claim in this group was removed, or restated strictly as a fact about
  the listing. Example: "there is no percentile or brain-age figure". The source
  inventory shows such labels in the assessment layer, which the listing now shows is
  released.
- A *presence* claim was left where nothing contradicts it, and is listed for the
  owner below.

**IQ rules kept.** The app's test is called an "IQ-style test" (the catalog's
wording), or "what its listing calls an IQ test". No sentence says the app measures
IQ, gives a valid, real, official or clinical IQ score, raises intelligence, prevents
decline, treats or diagnoses anything, or gives a biological brain age. Where results
come up, articles repeat the listing: they are "estimates based on app activities".
Where an article criticises unsupervised or app-based testing, it now applies that
criticism to our own app's test too, instead of exempting it.

**Dates.**

- Every article whose meaning changed has one `corrections` entry dated 2026-10-02
  (one sentence: what was wrong, what it says now) and `updatedAt: "2026-10-02"`.
  The entry is inserted directly after `updatedAt`, as in the sports corrections.
- `publishedAt` is untouched everywhere; the extraction script checks this.
- A pure name swap is not a substantive revision, so name-only articles keep their
  `updatedAt` and have no note.
- Link URLs (`/apps/<slug>/`) are unchanged.

## Name changes

| App (slug unchanged) | Old name in prose | Live name used | Replaced in total | In sentences otherwise unchanged (pure name swaps) | In sentences that were also corrected | Name-only articles |
| --- | --- | --- | ---: | ---: | ---: | ---: |
| `mental-math-memory-games` | Mental Math & Memory Games | IQ Test & Brain Training Games | 271 | 146 | 125 | 14 |
| `keto-diet-tracker` | Keto Diet Tracker: Low Carb / Keto Diet Tracker | Ketora: Keto Diet Carb Tracker (later mentions: Ketora) | 34 | 14 | 20 | 4 |
| `anime-casino-slots` | Anime Casino Slot Machine Game | Vegas Casino Slots JACKPOT WIN | 8 | 3 | 5 | 0 |
| `regal-video-player` | Regal Video Player | Video Player All Formats PRO | 24 | 24 | 0 | 15 |

- Old names were replaced in body text, FAQ questions and answers, and takeaways.
- No title, `metaTitle` or description contained an old name.
- Generic phrases such as "mental math games", "a keto diet tracker app" and "anime slots" were left alone.
- `/apps/<slug>/` link URLs are unchanged.
- Old names remain in three places, on purpose:
  - every correction note, which says what the article used to call the app;
  - one sentence in `brain-training-apps-compared` that explains the comparison was first written under the old name;
  - three planning-only keyword entries, which are never rendered: `android-video-players-compared` comparisonKeywords "vlc vs regal video player", `low-carb-tracking-apps-compared` comparisonKeywords "keto diet tracker vs carb manager", and `keto-macros-explained` secondaryKeywords "keto diet tracker app" (generic).

## Flagged sentences judged not false

Of the 87 sentences in section H2, 80 were rewritten. The other
7 were judged accurate and kept, apart from the app name where one appears:

- `comparing-fractions-mentally.md:170` — "The app is an educational game and a practice tool, not a standardised assessment; the numbers it keeps are score, accuracy, streak, response time and personal bests on the modes you play."
  - Not contradicted by the live listing: it describes the app as educational brain practice whose results are not professional assessments, so 'not a standardised assessment' holds, and the numbers named are ones the listing says it tracks. The clause is qualified to 'the modes you play' and is not worded as an exhaustive 'only' or 'nothing more', so it is incomplete rather than false.
- `digit-span-explained.md:5` — "How the stepped procedure produces that figure, and why an app's best span is not a test score."
  - A generic statement about a drill's personal-best span, which remains a game statistic; the app's separate memory test is covered in the corrected body, and the listing itself says its test results are estimates, not professional assessments. Left unchanged.
- `what-iq-tests-actually-measure.md:55` — "That is a genuine, useful outcome and it is not an assessment of anything."
  - A generic statement about what drill practice produces, not a claim about the app's contents; the listing does not contradict it. Left unchanged.
- `slot-reel-mechanics-explained.md:70` — "Are the mechanics in Anime Casino Slot Machine Game the same as a real slot machine's?"
  - A question, not a claim. Only the name changed. Its answer (line 71) said the app has twenty-five machines with these mechanics, Mini, Major and Grand meters and coins that cannot be transferred or sold, and that answer was rewritten.
- `slot-reel-mechanics-explained.md:150` — "Full details are on the [app page](/apps/anime-casino-slots/)."
  - Still true: the app page describes the game from its current listing. The sentence was kept at the end of the rewritten section; the claims around it were replaced.
- `social-casino-vs-real-money-gambling.md:68` — "Anime Casino Slot Machine Game is rated Teen on Google Play and its own listing states it is intended for an adult audience for entertainment purposes, and that success in the game does not imply future success in real-money gambling."
  - Still true. The listing is rated Teen, says "For adult entertainment only" and that the game is "designed for adults who enjoy simulated casino entertainment", and keeps "Success in this game does not imply future success in real-money gambling." Only the name changed.
- `social-casino-vs-real-money-gambling.md:126` — "Anime Casino Slot Machine Game is our own app, built by Reign Creative, and it is a useful worked example because every relevant fact about it is public on its [app page](/apps/anime-casino-slots/) and on its store listing."
  - Still true. The facts the worked example now relies on (virtual coins, no cash payouts or real-world prizes, no cash redemption, Teen rating, ads, no in-app purchases shown) are on the app page and the listing. Only the name changed; the next paragraph, which repeated the old listing, was rewritten.

## Left for the owner

One listing statement was referred to the owner. Owner-only compliance notes are kept
outside this public repository. The items below are the website-facing ones.

1. **Ketora Premium versus Play's purchase badge.** The listing describes an optional
   "Ketora Premium", but Google Play shows no in-app purchases.
   - The corrected articles now say both things: Google Play shows no in-app purchases,
     and the listing describes an optional Ketora Premium.
   - Once Premium is live, or dropped from the listing, the wording needs another pass.
2. **Features Ketora's listing no longer mentions.** No article claims these any more:
   - sodium, potassium and magnesium logging;
   - GKI;
   - photo logs;
   - carb-limit alerts;
   - monthly summaries;
   - user-created recipes;
   - erythritol, allulose and monk fruit by name.

   If any of these still ships, the listing (then the catalog) has to say so before an
   article can.
3. **Slots app.**
   - The listing still says coins "cannot be redeemed for cash". It no longer says they
     cannot be transferred or sold, so the articles no longer say so either.
   - `social-casino-vs-real-money-gambling` now relies on the listing's "no real-world
     monetary value" and "no … opportunity to win real money or prizes". If the transfer
     and sale wording returns to the listing, the article can state it again.
   - No article now claims the 25 anime/manga machines, the Mini/Major/Grand meters,
     daily rewards or the VIP tier.
   - The icon still reads "Casino Anime Slots", and the three articles stay in Anime &
     Creative. That placement is already an inventory owner item.
4. **IQ Test & Brain Training Games — what the test shows.** Confirm whether the
   released test shows any of these:
   - a percentile;
   - an "IQ-style range";
   - a brain-age figure.

   The 2026-09-21 source inventory records labels like these in the then-unreleased
   assessment layer. The corrected articles now neither claim nor deny them; they say
   only what the listing says: results are estimates based on app activities, not a
   professional assessment.
5. **IQ Test & Brain Training Games — listing wording that reads as a transfer claim.**
   Two phrases sit awkwardly with the editorial policy ("we do not claim that any app …
   raises intelligence"; practice improves the practised task):
   - the heading "BUILD MEMORY, FOCUS & SPEED";
   - "use brain training recommendations to practice the areas you want to strengthen".

   `brain-training-apps-compared` now says plainly that no research of ours stands
   behind that wording.
6. **Brain-training details taken from the app's source, not the listing.** 73 of the
   111 brain-training articles still describe the app with detail from the
   2026-09-21 source inventory or the 2026-09-15 listing, not from the live listing or
   the catalog. Counts are approximate; the concept articles also use some of these
   words generically.
   - Named drills, in 60 articles: Multiplication Rush, Number Pattern Challenge,
     Accuracy Trainer, Flash Cards, Reverse Calculation and others.
   - The technique library, in 33 articles.
   - Delayed-recall rounds, in 9.
   - Offline or on-device behaviour, in 8. `offline-brain-training-apps` is built
     around it.
   - Also: clock lengths, difficulty ladders, response-time metrics (median, fastest
     correct, consistency) and the score formula.

   Nothing in the live listing contradicts these. They were left where they sat
   outside a sentence that had to be rewritten, and dropped from rewritten text.
   - If any of them no longer ships, those sentences are false in the same way the
     corrected ones were.
   - If they do ship, adding them to the listing and catalog would put them back on a
     verifiable footing.
   - The reviewers' per-article notes are at the end of this list.
7. **Comparison articles keep their original `researchDate`.** No competitor claim was
    re-checked. Only our own rows were re-read against the 2026-10-02 listing, and each
    article now says so:
    - `low-carb-tracking-apps-compared`: 2026-09-03;
    - `brain-training-apps-compared`: 2026-09-22;
    - `do-brain-training-apps-work`: 2026-09-15.

    Re-verify the competitors before these are next promoted.
8. **Video Player All Formats PRO.** The Play description still calls the app
    "Regal Video Player" throughout. Readers who follow the renamed articles to the
    listing will see the old name.
9. **Build and audits not run.** Per instructions, nothing here ran `npm run build`
    or an `audit:*` npm script, and nothing was committed. The authorship audit
    (`scripts/audit-authorship.mjs`) runs after a build and compares changed articles
    with HEAD. Expected result:
    - every `updatedAt` bump here pairs a content change with a correction dated
      2026-10-02;
    - no name-only article moved its date.

<details><summary>Reviewers' per-article notes for the owner (116)</summary>

- `abstract-reasoning-tests-explained`: HEAD text named Number Pattern Challenge (75-second, Easy/Medium/Hard), Mixed Operations and Missing Number Puzzle; the current listing/catalog names none of them, so the rewritten passages no longer mention them. Owner to confirm they still ship.
- `accessibility-in-brain-training-apps`: Accessibility claims from the 2026-09-21 source inspection remain untouched and are not in the current listing: Accuracy Trainer (ten untimed questions, hints), Custom Practice settings, seven memory levels (Beginner 2×2 to Champion 7×7) and reveal speeds, adaptive step rules with a difficulty floor, "ships no sound assets whatsoever" and "portrait-only". After the IQ-test/reaction-test update the owner should re-confirm no-sound and portrait-only in particular.
- `accuracy-before-speed`:  body still says the app ships an untimed ten-question accuracy round with feedback, explanation and optional hint, 60-second sprints on each operation and a no-mistake format, and that every run reports right, wrong, accuracy and answer times — from the earlier listing/app source, not in the live listing or catalog; owner to confirm in the released app.
- `adding-a-list-of-numbers-mentally`: Body still describes a running-total memory mode, Addition Sprint's mixed-chains difficulty against a 60-second clock and the untimed Accuracy Trainer with explanations; none is in the current listing or catalog. Owner to confirm they still ship.
- `analogy-puzzles-explained`: Ratio Trainer (timed, three difficulty settings) was named in the rewritten sentences; it is not in the current listing or catalog, so it was dropped from the rewritten text (ratios are in the listing's mental math). Owner to confirm whether the mode still ships.
- `arithmetic-sequences-explained`: Body still names a 75-second Number Pattern Challenge (Easy/Medium/Hard) and a Missing Number Puzzle mode (2026-09-21 source inventory); not in the live listing or catalog.
- `attention-span-exercises`:  drill details (very brief exposure rounds, rapid-recognition rounds, two-attribute rounds, arithmetic sprints on 30-, 60- or 75-second clocks) are source-derived and not in the live listing. Left unchanged.
- `attention-span-exercises`:  the listing's framing ('Brain training for … focus', 'BUILD MEMORY, FOCUS & SPEED') goes further than the site's evidence position that practice improves the practised task; the article now states both and keeps the narrower reading. Owner may want the listing aligned.
- `backward-digit-span`: Body and a takeaway still describe a random-direction drill, a plain reverse-sequence mode, a backward-span ladder and separate forward/backward span personal bests (from the 2026-09-21 source inventory); none is in the live listing or catalog. Confirm they are in the released app.
- `brain-games-for-older-adults`:  'Arithmetic problems and memory rounds in our app are generated on the device and progress is stored locally, so the drills themselves do not need a connection' — offline play and local storage are not in the listing (data-location claim; owner to confirm). Left unchanged.
- `brain-games-for-older-adults`:  'ships untimed accuracy rounds with feedback and an optional hint on each question' — source-derived; the live listing does not mention accuracy rounds or hints. Left unchanged.
- `brain-games-for-older-adults`:  'the first of seven levels runs three to four items on a two-by-two grid with a slow reveal' and within-level adaptive difficulty with a floor — source-derived detail not in the listing. Left unchanged.
- `brain-games-for-the-whole-family`: Still states (from the 2026-09-21 source inventory, not the live listing): no multiplayer/accounts/shared profile/head-to-head; everything stored on the device as a single record; a daily challenge seeded from the date; local streak counter; 60-second sprints, ten-question accuracy sets; Multiplication Rush and Mixed Operations difficulty ladders; seven memory levels from Beginner (2×2) to Champion (7×7). Confirm against the released app — especially the on-device storage FAQ.
- `brain-training-for-busy-adults`: The four-part routine is built on Multiplication Rush, Addition Sprint, Subtraction Sprint, Division Dash, Accuracy Trainer, the technique library with a two-question mini quiz, a delayed-recall round and seven memory levels — all source-derived and not in the current listing; left untouched.
- `budget-math-in-your-head`:  body still says the app ships 'Budget Speed Math' (75 seconds, Easy/Medium/Hard) and a 'Change-Making Challenge' with an 'Amount spent' difficulty, and quotes a techniques library ('Running Totals', 'Rounding Estimation', each with steps, worked example, 'best for' note, common mistake and two-question mini quiz) — from the 2026-09-21 app-source inventory; the live listing only mentions money problems and no techniques library. Owner to confirm in the released app.
- `can-practice-raise-an-iq-score`:  mode names Multiplication Rush, Division Dash, Mixed Operations and 'daily drills' are source-derived and not in the live listing. Left unchanged.
- `can-practice-raise-an-iq-score`:  the takeaway 'We make no claim that IQ Test & Brain Training Games raises intelligence. It is practice on specific tasks…' was kept — the listing makes no intelligence-raising claim — but the listing's 'BUILD MEMORY, FOCUS & SPEED' heading sits uneasily with the site's no-transfer position (same flag as batch 1).
- `careless-arithmetic-mistakes`: Body still names Accuracy Trainer and No Mistake Challenge modes and per-run statistics (average and median answer time, session history) from the 2026-09-21 source inventory; not in the live listing or catalog.
- `change-detection-tasks`: What's Missing?, Missing Color and Missing Sport as ten-round modes (takeaway and body) and the closing "missing-item modes are in [app]" pointer are source-derived and not in the current listing; left untouched.
- `choosing-a-difficulty-level`: Body and FAQ still describe Multiplication Rush's table ladder, Mixed Operations' Easy-to-Adaptive settings and the adaptive rule (lengthen after three correct, shorten after two misses); none is in the current listing or catalog. Owner to confirm.
- `common-reasoning-mistakes`:  body and FAQ still say the app 'ships an untimed accuracy mode' with feedback, an explanation and an optional hint on each question — from the earlier listing/app source, not in the live listing or catalog; owner to confirm it is in the released app.
- `comparing-fractions-mentally`:  'Compare Numbers Fast, a multiple-choice mode on a 60-second timer with Easy, Medium and Hard settings' and the techniques-library entry 'Common Percent Anchors' (steps, worked example, named common mistake, two-question mini quiz) are source-derived and not in the live listing. Left unchanged.
- `compensation-strategy-in-arithmetic`: Body still names Addition Sprint, Subtraction Sprint (borrowing-practice difficulty), the Accuracy Trainer and two technique-library entries for compensation (2026-09-21 source inventory); none is in the live listing or catalog.
- `conditional-reasoning-if-then`: Accuracy Trainer (untimed rounds with feedback and an explanation) was in the rewritten paragraph and is not in the current listing, so it was dropped; owner to confirm it still ships.
- `counting-up-subtraction`:  the change-making mode (75-second clock), Subtraction Sprint with a borrowing-practice difficulty, and Accuracy Trainer (untimed, ten questions, explanation on a miss) are source-derived and not in the live listing, which mentions subtraction and money problems generally. Left unchanged.
- `cross-multiplication-in-one-pass`: Technique library entries, the Multiplication Rush difficulty ladder and Accuracy Trainer are source-derived and not in the current listing; left untouched.
- `daily-challenge-formats-explained`:  takeaway, FAQ and body still describe the app's daily in source-level detail — date-seeded generation that works offline with no networking, a once-a-day cap while 'every other mode is unlimited' (e.g. Multiplication Rush), a math pool of seven named challenge types and a memory pool of ten, and a single shared streak — from the 2026-09-21 app-source inventory; the live listing only says 'daily challenges' and 'streaks'. Owner to confirm in the released app.
- `deductive-reasoning-examples`: Body still names an untimed "Accuracy Trainer" mode and contrasts it with "timed sprints" (2026-09-21 source inventory / 2026-09-15 listing); neither is in the live listing or catalog.
- `delayed-recall-explained`: The delayed-answer drill, the memory hold duration (no hold at Beginner up to more than a second at the hardest level) and "the timed sprints" are source-derived and not in the current listing; left untouched. The FAQ still opens with them.
- `deliberate-practice-in-brain-games`: Body still describes Subtraction Sprint, an untimed accuracy round with explanations and hints, seven memory levels, digit-based difficulty labels and a technique library with steps, worked examples, 'best for' notes and named mistakes; none is in the current listing or catalog. Owner to confirm.
- `designing-memory-games-beyond-matching-pairs`:  body still says the numeric and grid tasks 'climb adaptively', that the memory side covers number, grid, sequence and delayed-recall activities, and lists timed sprints and accuracy rounds among the formats — wording from the earlier listing/app source; the live listing names digit span, sequences, grids, colours, letters, symbols and mixed recall, and quick play, daily, survival, boss and progression modes, but not delayed recall, sprints, accuracy rounds or adaptive difficulty. Owner to confirm in the released app.
- `digit-span-explained`:  body still names 'a Digit Span Trainer that runs twelve rounds', 'Number Recall' and 'Sequence Memory' running 'up to twenty items' — from the 2026-09-21 app-source inventory, not in the live listing or catalog; owner to confirm these modes and figures are in the released app.
- `do-brain-training-apps-work`: The existing feature paragraph still describes delayed-recall memory games, timed sprints, accuracy rounds and taught techniques for percentages, estimation, number patterns and faster calculation; these came from the earlier listing and are not in the current one. Owner to confirm they still ship.
- `do-brain-training-apps-work`: The listing's 'use brain training recommendations to practice the areas you want to strengthen' (after the IQ test) edges towards a transfer claim; the article still says we make no general-cognition claim. Owner may want to review the listing wording.
- `do-brain-training-apps-work`: researchDate stays 2026-09-15 because no competitor claim was re-verified; only our own column was re-checked (2026-10-02), and the table now dates the two columns separately.
- `estimating-sales-tax`: Body still names a Tax Estimation mode, a techniques-library entry (with mini quiz) and a Percentage Trainer with Basics/Tips/Discounts/Advanced/Mixed settings (2026-09-21 source inventory); not in the live listing or catalog.
- `fibonacci-and-recursive-sequences`:  'The 75-second Number Pattern Challenge' and 'Running Total Memory' are source-derived mode names not in the live listing. Left unchanged.
- `finding-the-original-price-before-a-discount`:  'Discount Challenge mode — a 75-second timed drill on the Discounts difficulty', the techniques-library wording, and 'Percentage Trainer' with Basics, Tips, Discounts, Advanced and Mixed settings plus per-technique 'best for' notes and two-question mini quizzes are source-derived and not in the live listing (which mentions percentages and money problems generally). Left unchanged.
- `finding-the-rule-in-a-number-pattern`: Subtraction Sprint, Mixed Operations and the 75-second Number Pattern Challenge are source-derived and not in the current listing; left untouched.
- `fluid-and-crystallized-intelligence`:  the 'Where a practice app's content falls' mapping is accurate but no longer complete — it does not mention the app's new IQ-style test or logic games. Not a false statement, so not changed; the owner may want the section extended.
- `fluid-and-crystallized-intelligence`:  the 49-technique library, the Flash Cards decks for times tables and common percentages, and Number Pattern Challenge are source-derived and not in the live listing. Left unchanged.
- `fraction-decimal-percent-conversions`:  body still quotes the app's techniques library and names 'Decimal Converter' (ten questions, Easy/Medium/Hard), a 'Flash Cards' Fraction ↔ Percent deck of seventeen pairs with twelve cards a session, and a 'Quick Percents' deck — from the 2026-09-21 app-source inventory, not in the live listing or catalog; owner to confirm in the released app.
- `fun-iq-quizzes-versus-real-assessments`: Body paragraph after "Where our app sits" still names Boss Quiz, True or False Math, Tap the Correct Answer, Multiplication Rush, Mixed Operations, delayed-recall memory rounds, a Daily Challenge and a 49-technique library with practice links — source-derived, not in the current listing or catalog; left untouched, owner to confirm they still ship.
- `geometric-sequences-explained`: Body still names Multiplication Rush, Division Dash, the 75-second Number Pattern Challenge and a 49-technique library with a doubling-and-halving entry (sentences untouched); none is in the current listing or catalog. Owner to confirm.
- `grid-and-position-memory`:  mode names Number Grid Memory, Color Grid, Letter Grid, Color Position Recall, Memory Maze and Pattern Builder, 'seven memory levels', and the level table (2×2 to 7×7 grids, 900–400 ms reveal, 0–1,400 ms hold gap) are source-derived and not in the live listing. Left unchanged.
- `grid-and-position-memory`:  takeaway 'records a largest-grid personal best' — a source-derived personal-best type; the listing mentions personal bests and grid memory games generally. Left unchanged (the sentence's claim that this number is not a test result remains true).
- `growing-sequence-memory-games`: Simon Memory (twelve rounds, "described in the mode list"), Color Sequence, Letter Sequence, Order Recall, Backward Tap, the longest-sequence personal best, and the closing "Simon Memory and the other sequence modes are in [app]" are source-derived; left untouched.
- `helping-a-child-with-math-facts`:  body still names 'Accuracy Trainer' (ten untimed questions with feedback, explanation and hint), 'Flash Cards' with a 2 × 2 to 12 × 12 times-tables deck of twelve cards, single-digit / 1–9-table lowest difficulties, and says 'play works offline' — from the 2026-09-21 app-source inventory, not in the live listing or catalog; owner to confirm in the released app.
- `how-iq-scores-are-calculated`: Body still describes the game scoring formula (base value plus speed and streak bonuses, scaled by difficulty); it comes from the app source, not the current listing. Owner to confirm.
- `how-iq-scores-are-calculated`: Owner to confirm what form the released IQ-style test result takes (the 2026-09-21 source inventory recorded an 'Estimated IQ-Style Range' and an 'Estimated Cognitive Percentile'); the article now neither claims nor denies a percentile or range.
- `how-long-a-brain-training-session-should-be`: Body still says the app's content "is cut into short units" and lists a 30-second lightning round, 60-second sprints, 75-second trainers, a 180-second marathon and a ten-question accuracy round (2026-09-21 source inventory); the live listing gives no durations and now leads with an IQ test whose length it does not state.
- `how-to-improve-concentration`:  takeaway, bullet list and closing line still say the app disables the back-swipe gesture on gameplay routes, gives every timed sprint an untimed counterpart with hints and explanations, generates gameplay on the device and works with the network off — from the 2026-09-21 app-source inventory, not in the live listing or catalog; owner to confirm in the released app (especially offline play, now that the app has an IQ test and assessment history).
- `how-to-memorize-numbers`: The live listing heading "BUILD MEMORY, FOCUS & SPEED" conflicts with the site's no-transfer position; the FAQ now names it and keeps the article's position.
- `how-to-memorize-numbers`: The technique-library number-chunking entry (worked example, short quiz) and the seven memory difficulty levels are source-derived and not in the current listing; left untouched.
- `how-to-track-practice-progress`: HEAD text said the app records average, median and fastest-correct response times and a consistency value; the current listing says only 'response speed', so the rewritten sentence no longer lists them. Owner to confirm.
- `inductive-reasoning-examples`:  'Number Pattern Challenge' generating fresh rule-finding items at three difficulty settings (items generated rather than drawn from a fixed list) is source-derived and not in the live listing. Left unchanged.
- `interference-and-forgetting`: Takeaway and body name Running Total Memory, Endless Memory (up to 200 rounds, three lives), Memory Boss Rush (eight escalating rounds) and Delayed Answer Challenge; none is in the current listing or catalog. Owner to confirm they still ship.
- `interleaving-versus-blocked-practice`: "Its catalogue happens to contain both orders": single-operation sprints and a mixed-operations mode are source-derived; the listing names the four operations but no mixed mode; left untouched.
- `judging-your-own-recall`: The flash-card mode (twelve cards from six decks, flip-then-grade, missed-it/got-it) appears in a takeaway, the body and the closing pointer; source-derived and not in the current listing; left untouched.
- `lattice-and-line-multiplication`:  body still says the app has 'no drawing surface and no grid-multiplication mode' and carries both methods in its technique library, with 'Multiplication Rush' (1–9 tables to two-digit by two-digit) and the untimed 'Accuracy Trainer' — from the 2026-09-21 app-source inventory, not in the live listing or catalog (the listing contradicts none of it); owner to confirm in the released app.
- `left-to-right-addition`: Body still describes the technique library entry for this method and Addition Sprint (60-second drill with single-, two- and three-digit, mixed-chain and large-number settings); neither is in the current listing or catalog. Owner to confirm.
- `logic-grid-puzzles`: HEAD text described number pattern and missing number drills and an untimed accuracy mode with explanations; the current listing/catalog does not name them, so the rewritten passages no longer do. Owner to confirm they still ship.
- `math-anxiety-in-adults`:  'Accuracy Trainer has no timer, runs ten questions, offers a hint and gives feedback with an explanation', beginner memory levels with three or four items, the adaptive floor and 'Replay is always free' are source-derived and not in the live listing. Left unchanged.
- `matrix-reasoning-puzzles`: Body still names a "Number Pattern Challenge" mode (from the 2026-09-21 source inventory). Neither the live listing nor the catalog/app page names it; confirm it is in the released app.
- `memory-techniques-that-work`:  says 'What we will not claim: that it makes you smarter, improves your memory generally, or transfers to unrelated abilities.' True of the site, but the live Play listing now has a section headed 'BUILD MEMORY, FOCUS & SPEED' and says 'Brain training for memory, logic, math, verbal ability, focus, and speed' — owner may want the listing copy aligned with the site's no-transfer position.
- `mental-division-tricks`: Body still says the app teaches techniques for percentages, estimation, number patterns and faster calculation (and which division methods were kept or removed), tracks scores with a history, runs sessions from two minutes and has a daily challenge; these came from the earlier listing, and the techniques are not in the current one. Owner to confirm.
- `mental-math-training-guide`: Body still describes "timed sprints", "accuracy rounds", "techniques for percentages, estimation, number patterns and faster calculation" and "delayed-recall activities" — wording from the 2026-09-15 listing that the live listing no longer contains (not contradicted).
- `mental-math-tricks-that-work`:  the 'Where the app fits' paragraph and the FAQ ('built to drill arithmetic and track speed and accuracy') describe the app from its 2026-09-15 listing — difficulty that climbs as you improve, timed sprints, accuracy rounds, and techniques for percentages, estimation, number patterns and faster calculation. None is contradicted by the live listing, but sprints, accuracy rounds, adaptive difficulty and the techniques are no longer in it, and the paragraph does not mention the IQ-style test. Judged incomplete rather than false; left unchanged.
- `missing-number-problems`: Body still names Missing Number Puzzle (Easy/Medium/Hard, 75 seconds) and Equation Builder modes (2026-09-21 source inventory); not in the live listing or catalog.
- `mnemonic-systems-for-numbers`: FAQ and body still state the app ships no major system, peg list or shape/rhyme scheme, and that its technique library teaches arithmetic methods and number chunking; the technique library, number/sequence recall modes and seven difficulty levels come from the 2026-09-21 source inventory and are not in the live listing or catalog.
- `multiplying-by-five-and-twenty-five`:  Multiplication Rush, Division Dash, Accuracy Trainer (ten untimed questions with a hint and explanation), tip-calculator, discount and unit-price rounds, and the technique-library entry for divide-instead-of-multiply are source-derived and not in the live listing (which mentions percentages, ratios, estimation and money problems generally). Left unchanged.
- `multiplying-by-nine-and-ninety-nine`: Multiplication Rush, Subtraction Sprint (borrowing-practice difficulty), Accuracy Trainer and the technique-library entry are source-derived and not in the current listing; left untouched.
- `n-back-tasks-explained`:  takeaway and body still say the app includes 'N-Back Lite' as 'one of the twelve challenge modes in its memory catalogue', alongside 'Flash Recall', 'Rapid Recognition' and 'Dual Attribute' — from the 2026-09-21 app-source inventory, not in the live listing or catalog; owner to confirm in the released app.
- `nonverbal-reasoning-tests-explained`:  owner to confirm whether the released IQ-style test or logic games use figural series, matrix or diagram items; the article now says only that the listing does not describe item formats.
- `number-bonds-and-making-tens`:  body still says the app's technique library carries the make-ten move and the friendly-numbers approach (anchors 50, 100, 250) with a practice link into 'Addition Sprint', a 60-second drill from single-digit to two- and three-digit settings and mixed chains — from the 2026-09-21 app-source inventory, not in the live listing or catalog; owner to confirm in the released app.
- `number-sequence-puzzles-explained`: Body still names Number Pattern Challenge (75-second, Easy/Medium/Hard) and a technique-library pattern-recognition entry; neither is in the current listing or catalog. Owner to confirm.
- `numerical-reasoning-tests-explained`: Percentage Trainer (75 s; Basics, Tips, Discounts, Advanced, Mixed), Ratio Trainer, Estimation Mode (90 s) and Mixed Operations are source-derived and not in the current listing; left untouched.
- `odd-one-out-puzzles`: The rewrite no longer mentions the Compare Numbers Fast drill (2026-09-21 source inventory; not in the live listing). Owner may confirm whether the released app has an odd-one-out format.
- `offline-brain-training-apps`:  closing pointer 'the mode list is on the app page' judged not false — the article names no individual drills, and the app page lists quick play, daily, survival, boss and progression modes.
- `offline-brain-training-apps`:  the whole article rests on source-derived statements the live listing neither confirms nor contradicts — every problem and memory round generated on the device, scoring computed on the device, progress (personal bests, streaks, session history) stored locally, no account, no cloud backup, adaptive-difficulty rules (three correct lengthens, two misses shortens, clamped to a floor), and ads/billing failing quietly offline. These come from the 2026-09-21 source inspection; owner to confirm they still hold for the released IQ Test & Brain Training Games build, including its new IQ-style test, personality questionnaire and assessment history (data-location claim). Left unchanged.
- `paired-associate-learning`:  body still names 'Letter Pairs' and 'Letter–Number Pairs' (each 'a ten-round drill') and 'Equation Match', and says 'the pair modes themselves are in' the app — from the 2026-09-21 app-source inventory; the live listing only says memory games use letters, symbols and mixed recall. Owner to confirm these modes are in the released app.
- `percentiles-and-standard-scores`: Body still names Division Dash as an example mode (sentence untouched); not in the current listing or catalog. Owner to confirm.
- `percentiles-and-standard-scores`: Owner to confirm whether the released IQ-style test shows a percentile (the 2026-09-21 source inventory recorded an 'Estimated Cognitive Percentile' label). The article no longer says either way.
- `ratios-and-proportions-mentally`:  body still names a 'Ratio Trainer' (75 seconds, Easy/Medium/Hard), a 'Unit Price Challenge' and a techniques-library entry 'The Percentage Swap' with a 4%-of-75 example, steps, 'best for' note, common mistake and two-question mini quiz — from the 2026-09-21 app-source inventory; the live listing mentions ratios but no named modes or techniques library. Owner to confirm in the released app.
- `reading-response-time-numbers`:  body still says the app records average, median and fastest-correct response times and 'a consistency value on a nought-to-one-hundred scale, described in the app as how consistent response times were across the run' — from the 2026-09-21 app-source inventory; the live listing only says 'response speed' and that the reaction time test measures speed and consistency. Owner to confirm in the released app.
- `recognition-versus-recall`:  FAQ and body still describe specific modes — rapid recognition rounds, matching-pair memory rounds, a tap-the-correct-answer arithmetic mode, true-or-false equation items, number recall, sequence memory and typed operation sprints — from the earlier listing/app source; the live listing only names mode types. Owner to confirm in the released app.
- `reliability-and-validity-in-testing`: Body still contrasts 'a 60-second sprint and a 75-second trainer' (mode details from the app source, not the current listing). Owner to confirm.
- `remembering-a-long-number`: Body still names Number Recall, Sequence Memory and Custom Practice modes and seven difficulty levels (Beginner …) from the 2026-09-21 source inventory; none is in the live listing or catalog.
- `russian-peasant-multiplication`: Body still says the app has no mode that builds the halving-doubling table, and names its technique library entry, Multiplication Rush, Division Dash and the untimed Accuracy Trainer (ten questions at a time with explanations); none is in the current listing or catalog. Owner to confirm.
- `sequences-with-more-than-one-answer`: Body still names a 75-second Number Pattern Challenge (Easy/Medium/Hard) and a Missing Number Puzzle mode, and says the generator fixes a rule before producing terms (2026-09-21 source inventory); not in the live listing or catalog.
- `short-term-versus-working-memory`:  mode names Number Recall, Sequence Memory, Running Total Memory, Mental Math Chain and Memory Math are source-derived and not in the live listing (which names digit span, sequences, grids, colours, letters, symbols and mixed recall). Left unchanged.
- `simplifying-fractions-quickly`:  body still quotes the app's techniques library ('Fraction Simplification', 'Simplify Fractions First', each with steps, worked example, 'best for' note, common mistake, two-question mini quiz and a practice link) and names a 'Fraction Simplifier' multiple-choice mode on a 75-second clock with Easy/Medium/Hard — from the 2026-09-21 app-source inventory, not in the live listing or catalog; owner to confirm in the released app.
- `spatial-reasoning-and-number-sense`:  owner to confirm whether the released IQ-style test uses mental rotation, mirror-image, paper-folding or assembly items; the article now says only that the listing names spatial reasoning without describing formats.
- `squares-cubes-and-roots`: Body still names Squares & Cubes (60-second, five settings), Square Root Trainer and Flash Cards Squares/Cubes decks; none is in the current listing or catalog. Owner to confirm.
- `strategy-for-timed-reasoning-tests`:  60-second sprints, 75-second trainers, the 180-second Math Marathon, the 30-Second Lightning Round, Accuracy Trainer (10 questions with feedback and hints) and per-run average/median response time, fastest correct answer and consistency figure are source-derived and not in the live listing. Left unchanged.
- `subtraction-without-borrowing`: Subtraction Sprint (borrowing-practice difficulty), Accuracy Trainer and the technique-library entry are source-derived and not in the current listing; left untouched.
- `times-tables-memorisation`: Flash-card deck (2 × 2 to 12 × 12, twelve cards, self-graded), Multiplication Rush difficulty ladder, Accuracy Trainer and the technique-library topic are source-derived and not in the current listing; left untouched.
- `unit-price-comparison`: Unit Price Challenge (75 s, "Per unit"), Ratio Trainer (75 s, Easy/Medium/Hard), Division Dash (60 s, five settings) and the 49-entry techniques library with mini quizzes and practice links, including "compatible numbers", are source-derived and not in the current listing; left untouched.
- `verbal-reasoning-question-types`: Body still names Multiplication Rush, Addition Sprint, Subtraction Sprint, Division Dash, Mixed Operations and delayed-recall rounds (sentence left untouched); none is in the current listing or catalog. Owner to confirm they still ship.
- `visual-pattern-puzzles`: Body still says the app ships a Number Pattern Challenge mode with three difficulty settings that records accuracy and response time per session (sentence left untouched); not in the current listing or catalog. Owner to confirm.
- `warming-up-before-focused-work`: Body still says three named components exist in the app — a 30-Second Lightning Round, a ten-question Accuracy Trainer set and a technique mini quiz from the technique library (2026-09-21 source inventory); none is in the live listing or catalog.
- `what-a-brain-age-score-means`: Owner to confirm whether the released app shows a brain-age, percentile or IQ-style range figure (the 2026-09-21 source inventory recorded such labels). The article now says only that the listing does not describe a brain-age feature.
- `what-a-brain-age-score-means`: Still names Multiplication Rush, Addition Sprint and Mixed Operations and 'delayed recall' memory rounds (body); none is in the current listing or catalog. Owner to confirm they still ship.
- `what-a-brain-training-subscription-buys`:  'gameplay is not the paywall: every arithmetic mode, every memory mode and the whole technique library are playable, and replaying anything is always free' and 'you do not need to pay anyone — us included' to get arithmetic drill are source-derived purchase details; the listing says only ads plus optional in-app purchases and does not say whether the new IQ-style test, personality test or other content is free. Owner to confirm what the paid tier gates. Left unchanged.
- `what-a-brain-training-subscription-buys`:  comparison article (researchDate 2026-09-22) — competitor statements were not re-checked; only our own app's statements were corrected against the 2026-10-02 listing.
- `what-a-brain-training-subscription-buys`:  the listing's 'BUILD MEMORY, FOCUS & SPEED' heading sits uneasily with the site's no-transfer position (same flag as batch 1).
- `what-processing-speed-means`:  body still says the app records average and median response time, fastest correct answer and a consistency figure for each run, and ships a 30-second lightning round, 60-second sprints and a shrinking-clock speed ladder — from the 2026-09-21 app-source inventory; the live listing only says 'response speed' and that the reaction time test measures speed and consistency. Owner to confirm in the released app.
- `what-the-average-iq-score-means`: Confirm whether the released IQ-style test shows a percentile, IQ-style range or "average" comparison (the 2026-09-21 source inventory lists such labels); the article now neither claims nor denies it. Body still names a "Mixed Operations" mode (source inventory; not in listing).
- `who-invented-the-iq-test`: HEAD text named Multiplication Rush, Addition Sprint, Subtraction Sprint, Division Dash, Mixed Operations, delayed-recall rounds and a library of calculation techniques; the current listing/catalog names none of them, so the rewritten paragraph no longer does. Owner to confirm they still ship.
- `why-am-i-slow-at-mental-math`:  mode names Accuracy Trainer, Multiplication Rush, Addition Sprint, Subtraction Sprint, Division Dash, Mixed Operations, Math Marathon and the technique library are source-derived and not in the live listing. Left unchanged.
- `why-am-i-slow-at-mental-math`:  per-run statistics (correct and wrong counts, average and median answer time, fastest correct answer, best streak, per-mode personal bests, session history) are more specific than the listing's 'personal bests, accuracy, streaks, response speed, assessment history'. Left unchanged.
- `why-divisibility-rules-work`: Body still describes a Divisibility Rules entry in the techniques library (steps, worked example, 'best for' note, named mistake, two-question mini quiz, link into a mode); not in the current listing or catalog. Owner to confirm.
- `why-practice-progress-plateaus`: Body still says "the ladders below are the shipped ones" (arithmetic difficulty ladders, seven memory levels, mixed-operation and survival formats) from the 2026-09-21 source inventory; the live listing names only quick play, daily, survival, boss and progression modes.
- `working-backwards-problems`:  closing pointer 'The modes and the progress record are described on the app page' judged not false — the app page does describe the app's modes (quick play, daily, survival, boss, progression) and its progress record, and the sentence does not claim Reverse Calculation is listed there.
- `working-backwards-problems`:  the Reverse Calculation mode (75-second clock, Easy/Medium/Hard, generated items) and per-run accuracy and response-time records are source-derived and not in the live listing. Left unchanged.
- `working-memory-and-training`:  'we make no claims of the second kind about our app' (far transfer) and the 'What we will not claim' list were kept — they are the site's own position and the listing makes no intelligence-raising or decline claim — but the listing's 'BUILD MEMORY, FOCUS & SPEED' heading sits uneasily with them (same flag as batch 1).

</details>

## Validation

| Check | Result |
| --- | --- |
| `node scripts/preflight-articles.mjs --only <slug>` on each of the 149 changed articles | 149 × "pre-flight clean" |
| `node scripts/audit-expansion-250.mjs` (read-only) | "expansion audit clean". The only warnings are the expected "updatedAt 2026-10-02 differs from the release date" on corrected articles from the 2026-09-22 release |
| Frontmatter against `HEAD`, all 149 files | JSON parses everywhere; `publishedAt` unchanged everywhere; no `sports-gm` article touched |
| The 116 corrected articles | Each has exactly one correction dated 2026-10-02, inserted directly after `updatedAt`, with a one-sentence note and `updatedAt: "2026-10-02"` |
| The 33 name-only articles | Keep their `updatedAt` and their key list |
| IQ-claim sweep over all 111 brain-training articles (the audit's forbidden patterns, plus "measures your IQ" and "IQ score") | No undenied claim about our app. The remaining matches are the articles' own subject (e.g. "How an IQ Score Is Calculated") and two FAQ answers that say the app's result is not a deviation IQ |
| Old app names in rendered text | Only in correction notes and the one historical sentence in `brain-training-apps-compared` |
| Not run, per instructions | `npm run build`, `next build`, any `npm run audit:*`; nothing committed |

The before → after records below were extracted by script from `git diff HEAD`, not
transcribed by hand. Each of the 80 rewritten flagged sentences maps to a recorded
change.

Other agents were working in the repository during this pass. Changes to files
outside `content/blog/` are not part of this work, for example
`scripts/audit-similarity-250.mjs` and new files under `docs/data/`.

## Per-article record

Grouped by the app each correction concerns. Every corrected article lists its
correction note and each changed sentence before → after, with the old name as
published.

- *Before* text comes from `HEAD`; *after* text from the working tree.
- Sentences whose only change was the app name are not listed here; they are counted
  under "Name changes".
- Locations are HEAD line numbers, which match section H2.

### IQ Test & Brain Training Games

<details><summary>97 corrected articles — notes and every sentence before → after</summary>

#### `abstract-reasoning-tests-explained` (education-brain)

- Published 2026-09-22; updated 2026-09-22 → 2026-10-02. Flagged in section H2: line 58 (rewritten), line 77 (rewritten), line 153 (rewritten).
- **Correction note:** This article said our app, then called Mental Math & Memory Games, had no figural items and was not an assessment of anything; the app, now IQ Test & Brain Training Games, has logic games built on patterns and rule discovery and an IQ-style test covering patterns and spatial reasoning, whose results its Google Play listing calls estimates rather than professional assessments, and the article now describes it that way without claiming which item formats it uses.

- *takeaway*
  - Before: "Mental Math & Memory Games has no figural or shape items. Its Number Pattern Challenge is a rule-discovery drill in numbers, which is an analogue of this task rather than an equivalent, and it is not a test."
  - After: "Our own app, IQ Test & Brain Training Games, has logic games built on patterns and rule discovery and an IQ-style test that includes patterns and spatial reasoning; its listing calls the results estimates based on app activities, not a professional assessment, so read them as a record of how you did on the app's own questions."
- *FAQ 4 ("Does IQ Test & Brain Training Games contain abstract reasoning items?")*
  - Before: "It contains no figural, matrix or shape items, so it has nothing that matches a nonverbal abstract reasoning test. Its Number Pattern Challenge asks you to find the rule behind a run of numbers under a timer, with Easy, Medium and Hard settings. That is a useful analogue of the same mental move, but it is practice in a game rather than an assessment, and it produces no score that means anything outside the app."
  - After: "Its Google Play listing describes logic games built on patterns and rule discovery, and an IQ-style test that covers patterns and spatial reasoning alongside numerical reasoning, logic, vocabulary, working memory and processing speed. The listing does not say whether any of those items use the figural series or grid formats described in this article. It also describes the test's results as estimates based on app activities, not a professional assessment, so read a result there as a record of how you did on the app's own questions rather than as a score on a standardised abstract reasoning test."
- *body line 153*
  - Before: "Mental Math & Memory Games is our own app, built by Reign Creative, and it contains no figural or shape items at all. What it does contain is **Number Pattern Challenge**, a 75-second rule-discovery drill in numbers with Easy, Medium and Hard settings, alongside arithmetic modes such as Mixed Operations and Missing Number Puzzle that exercise the same habit of asking what operation links two quantities. That is an analogue of abstract reasoning, not an equivalent, and it is not an assessment of anything. The app records score, accuracy, streak and response time for your own runs, and nothing more."
  - After: "IQ Test & Brain Training Games is our own app, built by Reign Creative. Its logic games include patterns and rule discovery, and its IQ-style test covers patterns and spatial reasoning alongside numerical reasoning, logic, vocabulary, working memory and processing speed; its Google Play listing does not say whether any of those items use the figural formats described above. Practising rule discovery there is an analogue of the task, not an equivalent, and the listing describes the test's results as estimates based on app activities, not medical, psychological, clinical or professional diagnostic assessments. The app keeps personal bests, accuracy, streaks, response speed and a history of past results, so what it tracks is your record against yourself."
- *body line 157*
  - Before: "The rest of the material sits in the [IQ tests and reasoning hub](/blog/topics/iq-tests-and-reasoning/) and the wider [education and brain category](/blog/category/education-brain/), and the drills themselves are described on the [Mental Math & Memory Games app page](/apps/mental-math-memory-games/)."
  - After: "The rest of the material sits in the [IQ tests and reasoning hub](/blog/topics/iq-tests-and-reasoning/) and the wider [education and brain category](/blog/category/education-brain/), and the app itself is described on the [IQ Test & Brain Training Games app page](/apps/mental-math-memory-games/)."

#### `accessibility-in-brain-training-apps` (education-brain)

- Published 2026-09-22; updated 2026-09-22 → 2026-10-02. Flagged in section H2: none (additional corrections).
- **Correction note:** This article said the mode list of our app, then called Mental Math & Memory Games, is on its app page; that page, now for IQ Test & Brain Training Games, describes the app without naming individual modes such as Accuracy Trainer or Custom Practice, and the sentence now points there only for a description of the app.

- *body line 153*
  - Before: "More sits in the [brain training games hub](/blog/topics/brain-training-games/) and the [education and brain category](/blog/category/education-brain/); the mode list is on the [Mental Math & Memory Games app page](/apps/mental-math-memory-games/)."
  - After: "More sits in the [brain training games hub](/blog/topics/brain-training-games/) and the [education and brain category](/blog/category/education-brain/); the app itself is described on the [IQ Test & Brain Training Games app page](/apps/mental-math-memory-games/)."

#### `accuracy-before-speed` (education-brain)

- Published 2026-09-22; updated 2026-09-22 → 2026-10-02. Flagged in section H2: none (additional corrections).
- **Correction note:** This article said the modes of our app, then called Mental Math & Memory Games and now IQ Test & Brain Training Games, are listed on its app page; that page describes the app's games and tests without listing individual modes, and the sentence now points to it only for that description.

- *body line 177*
  - Before: "The [brain training games hub](/blog/topics/brain-training-games/) collects the rest of the practice-design articles, the modes themselves are listed on the [Mental Math & Memory Games app page](/apps/mental-math-memory-games/), and related writing sits in the [education and brain category](/blog/category/education-brain/)."
  - After: "The [brain training games hub](/blog/topics/brain-training-games/) collects the rest of the practice-design articles, the app itself is described on the [IQ Test & Brain Training Games app page](/apps/mental-math-memory-games/), and related writing sits in the [education and brain category](/blog/category/education-brain/)."

#### `adding-a-list-of-numbers-mentally` (education-brain)

- Published 2026-09-22; updated 2026-09-22 → 2026-10-02. Flagged in section H2: none (additional corrections).
- **Correction note:** This article said the full catalogue of math and memory modes in our app, then called Mental Math & Memory Games, is shown on its app page; that page, for the app now named IQ Test & Brain Training Games, describes its features without listing individual modes, so the sentence now simply points to it.

- *body line 173*
  - Before: "You can see the full catalogue of math and memory modes on the [Mental Math & Memory Games app page](/apps/mental-math-memory-games/)."
  - After: "The app itself is described on the [IQ Test & Brain Training Games app page](/apps/mental-math-memory-games/)."

#### `analogy-puzzles-explained` (education-brain)

- Published 2026-09-22; updated 2026-09-22 → 2026-10-02. Flagged in section H2: line 160 (rewritten).
- **Correction note:** This article said our app, then called Mental Math & Memory Games, had no analogy items, was arithmetic and memory practice only and made no assessment of any kind; the app, now IQ Test & Brain Training Games, lists analogies among its logic games, has vocabulary games and includes an IQ-style test whose results its Google Play listing calls estimates rather than clinical or professional assessments, and the article now says so.

- *takeaway*
  - Before: "Mental Math & Memory Games ships no analogy items; its Ratio Trainer drills the proportional reasoning that number analogies depend on."
  - After: "IQ Test & Brain Training Games, our own app, lists analogies among its logic games and ratios in its mental math practice, so the sentence-first habit and the arithmetic behind number analogies both have somewhere to be practised."
- *FAQ 4 ("Does the app have analogy puzzles?")*
  - Before: "No. Mental Math & Memory Games contains no verbal analogy items and no figural analogy items. Its Ratio Trainer mode drills proportional reasoning, which is the machinery a numerical analogy of the two-is-to-three form actually uses, but that is a supporting skill rather than the task. The app is arithmetic and memory practice and it assesses nothing."
  - After: "Yes. IQ Test & Brain Training Games lists analogies among its logic games, alongside sequences, conditional reasoning and deduction, and its vocabulary games work on synonyms, antonyms and context clues; its listing does not say whether the analogy items are verbal, numerical or figural. Its IQ-style test also covers logic, patterns and vocabulary, and the listing describes that test's results as estimates based on app activities, not clinical or professional assessments."
- *body line 160*
  - Before: "On our own app: Mental Math & Memory Games, built by Reign Creative, ships no analogy items, verbal or figural. What it does ship that touches this article is **Ratio Trainer**, a timed drill on proportional relationships at three difficulty settings, which sharpens the arithmetic that numerical analogies of the ratio form depend on. That is a supporting skill, not the task, and the app makes no assessment of any kind. The mode list and the progress statistics are on the [Mental Math & Memory Games app page](/apps/mental-math-memory-games/)."
  - After: "On our own app: IQ Test & Brain Training Games, built by Reign Creative, lists analogies among its logic games, alongside sequences, conditional reasoning and deduction, and its vocabulary games work on synonyms, antonyms and context clues — so the sentence-first habit has somewhere to be practised. Its listing does not say which relationship types or formats the analogy items use. Its mental math practice also covers ratios, the arithmetic that numerical analogies of the ratio form depend on. The app's IQ-style test covers logic, patterns and vocabulary too, and its Google Play listing describes the results as estimates based on app activities, not clinical or professional assessments. The app itself is described on the [IQ Test & Brain Training Games app page](/apps/mental-math-memory-games/)."

#### `are-online-iq-tests-accurate` (education-brain)

- Published 2026-09-22; updated 2026-09-22 → 2026-10-02. Flagged in section H2: line 59 (rewritten), line 78 (rewritten), line 156 (rewritten).
- **Correction note:** This article said our app, then called Mental Math & Memory Games, contained no test of any kind; the app, now IQ Test & Brain Training Games, includes an IQ-style test, a memory test and a reaction time test whose results its Google Play listing calls estimates rather than clinical or professional assessments, and the article now applies its argument to that test.

- *takeaway*
  - Before: "Mental Math & Memory Games contains no test at all, so there is nothing in it to be accurate or inaccurate about. It is an educational game that records practice statistics."
  - After: "Our own app, IQ Test & Brain Training Games, includes an IQ-style test, and the same limits apply to it: it is taken unsupervised on a phone, and its Google Play listing describes the results as estimates based on app activities, not a clinical or professional assessment."
- *FAQ 4 ("Does the IQ Test & Brain Training Games app contain an IQ test?")*
  - Before: "No. It has no test, no assessment, no percentile, no brain-age figure and no estimate of intelligence. It generates arithmetic and memory rounds and records what happened — score, accuracy, streak, response time and personal bests. Those describe a practice session and are not offered as a measurement of anything."
  - After: "Yes. It includes an IQ-style test covering numerical reasoning, logic, patterns, vocabulary, working memory, spatial reasoning and processing speed, alongside brain games, a memory test and a reaction time test. Its Google Play listing states that these results are estimates based on app activities, not medical, psychological, clinical or professional diagnostic assessments. Because the test is taken unsupervised on a phone, the limits this article describes apply to it too."
- *body line 154 (heading)*
  - Before: "## What our app does instead of testing you"
  - After: "## Where our own app fits"
- *body line 156*
  - Before: "[Mental Math & Memory Games](/apps/mental-math-memory-games/) is our own app, built by Reign Creative, and it contains no test. There is nothing in it to be accurate or inaccurate about."
  - After: "[IQ Test & Brain Training Games](/apps/mental-math-memory-games/) is our own app, built by Reign Creative, and it includes an IQ-style test — so this article's argument applies to it as much as to any web quiz."
- *body line 158*
  - Before: "It generates arithmetic rounds — Multiplication Rush, Addition Sprint, Subtraction Sprint, Division Dash, Mixed Operations — plus number, sequence, grid and delayed-recall memory rounds, formats such as Survival and Boss Quiz, a Daily Challenge, and a 49-technique library with worked examples. What it records is score, accuracy, streak, response time and personal bests."
  - After: "Its IQ-style test covers numerical reasoning, logic, patterns, vocabulary, working memory, spatial reasoning and processing speed, and the app also has a memory test, a reaction time test, a personality questionnaire, and memory, logic, focus, vocabulary and mental math games. It keeps personal bests, accuracy, streaks, response speed and a history of past results."
- *body line 160*
  - Before: "None of that is offered as a measurement. There is no percentile, no classification, no brain-age figure and no estimate of intelligence anywhere in the product. The four categories this series keeps apart apply cleanly: the app is **practice**, **entertainment** and **educational activity**, and it is not **standardised psychological assessment**."
  - After: "The listing is explicit about what those results are: IQ test, personality test, memory test and other results are estimates based on app activities, not medical, psychological, clinical, educational-placement, employment or professional diagnostic assessments. The four failure points above apply to it in full: you set the conditions, the listing documents no comparison group, nobody observes the session, and the app invites you to revisit the test and compare against your own history, which is exactly where the retest effect shows up. The four categories this series keeps apart still sort it cleanly: the app is **practice**, **entertainment** and **educational activity**, and it is not **standardised psychological assessment**."

#### `arithmetic-sequences-explained` (education-brain)

- Published 2026-09-22; updated 2026-09-22 → 2026-10-02. Flagged in section H2: none (additional corrections).
- **Correction note:** This article said our app, then called Mental Math & Memory Games, contained no figural, matrix or logic-grid items, presented none of its modes as a test and had its modes listed on its app page; the app, now IQ Test & Brain Training Games, includes logic games built on sequences and patterns and an IQ-style test whose results its Google Play listing calls estimates rather than clinical or professional assessments, and the article now says so and describes the app page accurately.

- *body line 159*
  - Before: "Both are numeric practice drills: the app contains no figural or matrix items and no logic-grid puzzles, and it does not present any of its modes as a test or an assessment of anything."
  - After: "Both are numeric practice drills. The app also has logic games built on sequences, patterns and rule discovery and an IQ-style test whose areas include patterns, and its Google Play listing calls the test results estimates based on app activities, not clinical or professional assessments."
- *body line 159*
  - Before: "The [app page](/apps/mental-math-memory-games/) lists the modes, more sequence material sits in the [logic and pattern puzzles collection](/blog/topics/logic-and-pattern-puzzles/), and the rest of this subject area is in the [education and brain training section](/blog/category/education-brain/)."
  - After: "The [app page](/apps/mental-math-memory-games/) describes the app, more sequence material sits in the [logic and pattern puzzles collection](/blog/topics/logic-and-pattern-puzzles/), and the rest of this subject area is in the [education and brain training section](/blog/category/education-brain/)."

#### `attention-span-exercises` (education-brain)

- Published 2026-09-22; updated 2026-09-22 → 2026-10-02. Flagged in section H2: none (additional corrections).
- **Correction note:** This article said our app, then called Mental Math & Memory Games, contained no attention test, no attention-training mode and no reaction measure, and that its only claim was that its drills demand attention; the app, now IQ Test & Brain Training Games, lists focus games that challenge attention and distractor resistance and a reaction time test, with results its Google Play listing calls estimates rather than professional assessments, and the article now says so while keeping its evidence-based point that practice improves the practised task.

- *takeaway*
  - Before: "Mental Math & Memory Games contains no attention test and no attention-training mode. It ships drills that demand attention — brief-exposure and rapid-recognition rounds, timed sprints — which is a different claim."
  - After: "IQ Test & Brain Training Games, our own app, includes focus games that its listing says challenge attention and distractor resistance, and a reaction time test. Getting better at them is evidence that you got better at them, not that your attention span grew, and the listing describes its test results as estimates rather than professional assessments."
- *FAQ 3 ("Does a memory or maths app train attention?")*
  - Before: "Ours does not, and we would rather say so plainly. Mental Math & Memory Games contains no attention test and no attention-training mode. Several of its rounds are attention-demanding — brief exposures, rapid recognition, rounds that ask you to hold two features of an item at once, and drills under a countdown — but demanding attention and training it are different claims, and only the first is ours."
  - After: "Ours is not only a memory and maths app: IQ Test & Brain Training Games includes focus games that its listing says challenge attention and distractor resistance, plus a reaction time test. What the evidence supports is narrower than the word training suggests — practising those games reliably improves performance on those games, while effects beyond the trained task are weak and contested. Its listing describes the reaction time test and other results as estimates based on app activities, not professional assessments."
- *body line 153*
  - Before: "Mental Math & Memory Games is our own app, built by Reign Creative, and the plainest useful thing we can say here is a negative. **It contains no attention test and no attention-training mode.** There is no vigilance task, no reaction measure, and nothing that produces an attention score."
  - After: "IQ Test & Brain Training Games is our own app, built by Reign Creative, and the plainest useful thing we can say here is what its listing actually claims. **It includes focus games that the listing says challenge attention and distractor resistance, and a reaction time test that it says measures speed and consistency.** The listing describes that result, like its other test results, as an estimate based on app activities, not a professional assessment."
- *body line 155*
  - Before: "What it does contain are drills that *demand* attention while asking about something else: rounds with a very brief exposure, rapid-recognition rounds, rounds that require you to hold two attributes of an item at once, and arithmetic sprints under a 30-, 60- or 75-second clock."
  - After: "It also has drills that *demand* attention while asking about something else: rounds with a very brief exposure, rapid-recognition rounds, rounds that require you to hold two attributes of an item at once, and arithmetic sprints under a 30-, 60- or 75-second clock."
- *body line 155*
  - Before: "Demanding attention and training attention are different claims, and only the first one is ours to make."
  - After: "Demanding attention and training attention are different claims. The listing files its focus games under brain training; the evidence above supports the narrower reading — you get better at the games you practise — and that is the only claim this article makes for them."
- *body line 170*
  - Before: "Those are good reasons, and they are the reasons we offer."
  - After: "Those are good reasons, and they are the reasons this article offers."

#### `backward-digit-span` (education-brain)

- Published 2026-09-22; updated 2026-09-22 → 2026-10-02. Flagged in section H2: line 59 (rewritten).
- **Correction note:** This article said our app, then called Mental Math & Memory Games, administered no cognitive test and did not test working memory; the app, now IQ Test & Brain Training Games, includes a memory test and an IQ-style test covering working memory, whose results its Google Play listing calls estimates rather than clinical or professional assessments, and the article now says so and no longer says that the app page lists the full memory catalogue.

- *takeaway*
  - Before: "Those are game statistics, not assessment scores, and the app administers no cognitive test."
  - After: "Those are game statistics, and the app's memory test and IQ-style test produce results that its listing calls estimates based on app activities, not clinical or professional assessments."
- *FAQ 5 ("Does the app test my working memory?")*
  - Before: "No. Mental Math & Memory Games ships reverse-sequence and backward-span drills and stores your longest successful run in each, but there is no standardised administration, no norms and no interpretation. It is practice and entertainment."
  - After: "Not in the clinical sense. IQ Test & Brain Training Games includes a memory test and an IQ-style test whose areas include working memory, and its Google Play listing describes their results as estimates based on app activities, not medical, psychological, clinical or professional diagnostic assessments. Nothing about a phone session is standardised administration: you choose the time and the conditions, and nobody observes."
- *body line 156*
  - Before: (nothing — added)
  - After: "The same limits apply to the app's memory test and to its IQ-style test, which covers working memory among other areas: the listing calls their results estimates based on app activities, not clinical or professional assessments."
- *body line 158*
  - Before: "You will find the full memory catalogue on the [Mental Math & Memory Games app page](/apps/mental-math-memory-games/), the rest of this subject in the [memory and attention hub](/blog/topics/memory-and-attention/), and the wider set of learning articles in the [education and brain section](/blog/category/education-brain/)."
  - After: "The app's memory games and tests are described on the [IQ Test & Brain Training Games app page](/apps/mental-math-memory-games/), the rest of this subject in the [memory and attention hub](/blog/topics/memory-and-attention/), and the wider set of learning articles in the [education and brain section](/blog/category/education-brain/)."

#### `brain-games-for-older-adults` (education-brain)

- Published 2026-09-22; updated 2026-09-22 → 2026-10-02. Flagged in section H2: line 58 (rewritten), line 153 (rewritten), line 153 (rewritten).
- **Correction note:** This article said our app, then called Mental Math & Memory Games, produced no IQ estimate, brain-age figure, percentile or age comparison and contained no cognitive assessment, reaction test or personality test; the app, now IQ Test & Brain Training Games, includes an IQ-style test, a memory test, a reaction time test and a personality questionnaire whose results its Google Play listing calls estimates rather than clinical or professional assessments, and the article now says so and no longer says the app page lists the modes it describes.

- *takeaway*
  - Before: "Mental Math & Memory Games produces no brain-age number, no percentile, no cognitive assessment and no age comparison of any kind. It is an educational game that records performance on its own drills."
  - After: "IQ Test & Brain Training Games, our own app, includes an IQ-style test, a memory test and a reaction time test, and its listing describes their results as estimates based on app activities, not medical, psychological, clinical or professional diagnostic assessments; treat any figure it shows as a practice record, not a verdict on cognitive health."
- *body line 149 (heading)*
  - Before: "## What this app does not do"
  - After: "## What this app's results do not tell you"
- *body line 153*
  - Before: "Mental Math & Memory Games does not produce a brain-age figure, a cognitive age, a percentile, an IQ estimate or any comparison against an age group. It contains no cognitive assessment, no reaction test and no personality test. What it records is score, accuracy, streak, response time and personal bests on its own drills, and a session history. Those are game statistics about generated questions; they are not a measurement of anything about you, and they should never be read as one. [How to track practice progress without fooling yourself](/blog/how-to-track-practice-progress/) covers what they can and cannot support."
  - After: "IQ Test & Brain Training Games includes an IQ-style test, a memory test, a reaction time test and a personality questionnaire with a Big Five profile, alongside its games. Its Google Play listing states that the IQ test, personality test, memory test and other results are estimates based on app activities, not medical, psychological, clinical, educational-placement, employment or professional diagnostic assessments. Its drills record score, accuracy, streak, response time and personal bests, and the app keeps a history of results to compare against. Whatever figure it shows, treat it as a record of how you did on the app's own questions that day — not a measurement of cognitive health, and never a substitute for one. [How to track practice progress without fooling yourself](/blog/how-to-track-practice-progress/) covers what those numbers can and cannot support."
- *body line 163*
  - Before: "The cornerstone article [do brain training apps work](/blog/do-brain-training-apps-work/) covers the general evidence in more depth, the rest of the practical writing is in the [brain training games hub](/blog/topics/brain-training-games/) and the [education and brain category](/blog/category/education-brain/), and the modes themselves are listed on the [Mental Math & Memory Games app page](/apps/mental-math-memory-games/)."
  - After: "The cornerstone article [do brain training apps work](/blog/do-brain-training-apps-work/) covers the general evidence in more depth, the rest of the practical writing is in the [brain training games hub](/blog/topics/brain-training-games/) and the [education and brain category](/blog/category/education-brain/), and the app itself is described on the [IQ Test & Brain Training Games app page](/apps/mental-math-memory-games/)."

#### `brain-games-for-the-whole-family` (education-brain)

- Published 2026-09-22; updated 2026-09-22 → 2026-10-02. Flagged in section H2: none (additional corrections).
- **Correction note:** This article said our app's full mode list was on its app page, which describes the app without listing individual modes; the article now points to that page as a description of the app, now IQ Test & Brain Training Games (previously Mental Math & Memory Games), and adds that its IQ-style test, memory test and reaction time test give results its Google Play listing calls estimates, not clinical or professional assessments.

- *body line 149*
  - Before: (nothing — added)
  - After: "That applies equally to the app's IQ-style test, memory test and reaction time test, whose results its Google Play listing calls estimates based on app activities, not clinical or professional assessments."
- *body line 151*
  - Before: "More on routines and progress sits in the [brain training games hub](/blog/topics/brain-training-games/) and the wider [education and brain category](/blog/category/education-brain/), and the full mode list is on the [Mental Math & Memory Games app page](/apps/mental-math-memory-games/)."
  - After: "More on routines and progress sits in the [brain training games hub](/blog/topics/brain-training-games/) and the wider [education and brain category](/blog/category/education-brain/), and the app itself is described on the [IQ Test & Brain Training Games app page](/apps/mental-math-memory-games/)."

#### `brain-training-apps-compared` (education-brain)

- Published 2026-09-22; updated 2026-09-22 → 2026-10-02. Flagged in section H2: none (additional corrections).
- **Correction note:** This article described our app, then called Mental Math & Memory Games, as covering arithmetic and memory only, with no verbal or spatial content, a documented technique library and no cognitive claim; the app, now IQ Test & Brain Training Games, has a listing that documents an IQ-style test, logic, vocabulary, focus, memory and mental math games and a personality questionnaire but no technique library, and our row and conclusions now follow that listing, re-read on 2 October 2026.

- *description*
  - Before: "A capability comparison built only from each publisher's own official pages, read on 21 September 2026 — including where ours is the wrong choice."
  - After: "A capability comparison built only from each publisher's own pages, read 21 September 2026 (ours re-read 2 October) — including where ours is the wrong choice."
- *takeaway*
  - Before: "This comparison uses only each publisher's own official pages, read on 21 September 2026."
  - After: "This comparison uses only each publisher's own official pages, read on 21 September 2026, with our own app's listing re-read on 2 October 2026 after it changed."
- *takeaway*
  - Before: "Our app covers arithmetic and memory only. If you want verbal, spatial, navigation or social-cognition training, three of the four alternatives document breadth that ours does not have, and you should choose one of them instead."
  - After: "Our app's listing now documents an IQ-style test plus memory, logic, focus, vocabulary and mental math games and a personality questionnaire, but nothing for navigation, social cognition, writing or speaking. If those are what you want, BrainHQ or Elevate documents them and ours does not, and you should choose one of them instead."
- *FAQ 2 ("Which brain training app covers the most ground?")*
  - Before: "Ours is the narrowest by design: arithmetic and memory only."
  - After: "Ours, as its listing now describes it, spans an IQ-style test, memory, logic, focus, vocabulary and mental math games and a personality questionnaire, and describes nothing for navigation, social skills, writing or speaking."
- *FAQ 3 ("Do any of them prove that their training works?")*
  - Before: "We publish no efficacy research at all and make no cognitive claim."
  - After: "We publish no efficacy research at all, and our app's listing describes its IQ-style test and other results as estimates based on app activities, not professional assessments."
- *FAQ 4 ("Does our app do anything the others do not document?")*
  - Before: "It ships a library of arithmetic techniques, each with steps, a worked example, a note on what it is best for and a named common mistake, with a drill attached. None of the four publishers' pages we read describes a teaching layer of that kind. That is a statement about what those pages say, not a claim about what those products contain."
  - After: "We no longer claim that it does. Our app's current listing documents an IQ-style test, a personality questionnaire with a Big Five profile and memory, logic, focus, vocabulary and mental math games, but we read the other publishers' pages on 21 September 2026 and have not re-checked them against those additions. Until we do, we make no claim that ours documents something theirs do not."
- *body line 131*
  - Before: "**The only honest way to compare apps in this category is to compare what each publisher documents on its own site, and to say clearly where your own product loses.** This article does that for four widely used brain training products and for ours, using each company's official pages as read on 21 September 2026."
  - After: "**The only honest way to compare apps in this category is to compare what each publisher documents on its own site, and to say clearly where your own product loses.** This article does that for four widely used brain training products and for ours, using each company's official pages as read on 21 September 2026 — and, for ours, its Google Play listing as re-read on 2 October 2026, after the app was renamed and re-described."
- *body line 155*
  - Before: "| Mental Math & Memory Games (ours) | Arithmetic across four operations plus mixed, and memory modes; a technique library | Score, accuracy, streak, response time, personal bests, session history |"
  - After: "| IQ Test & Brain Training Games (ours) | An IQ-style test across seven reasoning areas; brain, memory, logic, focus, vocabulary, puzzle and mental math games; a memory test, a reaction time test and a personality questionnaire with a Big Five profile | Personal bests, accuracy, streaks, response speed, assessment history and charts over time |"
- *body line 165*
  - Before: "**Ours.** Mental Math & Memory Games covers arithmetic across addition, subtraction, multiplication, division and mixed operations, in timed sprint, untimed accuracy, survival, ladder and boss formats, with a daily challenge. On the memory side it covers number, sequence, grid and delayed-recall activities with seven difficulty levels. Alongside the drills it ships a library of arithmetic techniques, each with steps, a worked example, a note on what it is best for, a named common mistake and a drill to apply it. It records score, accuracy, streak, response time — average, median, fastest correct and a consistency figure — personal bests and a session history."
  - After: "**Ours.** IQ Test & Brain Training Games — listed on Google Play as Mental Math & Memory Games when this comparison was first written — now documents an IQ-style test covering numerical reasoning, logic, patterns, vocabulary, working memory, spatial reasoning and processing speed, followed by brain-training recommendations. Around it sit brain games with quick play, daily, survival, boss and progression modes; memory games built from digit span, sequences, grids, colours, letters and symbols; logic games with analogies, conditional reasoning and deduction; vocabulary games; focus games; and mental math from the four operations to percentages, ratios, estimation and money problems. It also has a memory test, a reaction time test and a personality questionnaire with a Big Five profile, which the listing presents as self-reflection rather than diagnosis, and it tracks personal bests, accuracy, streaks, response speed and assessment history. The listing states that IQ test, personality test, memory test and other results are estimates based on app activities, not medical, psychological, clinical or professional diagnostic assessments."
- *body line 169*
  - Before: "Three differences are large enough that a feature table hides rather than reveals them. **Scope.** Ours is the narrowest product here, and that is a deliberate design choice rather than a gap waiting to be filled. There are no verbal items, no figural or spatial rotation tasks, no navigation exercises and nothing addressing social cognition. If any of those are what you came for, three of the four alternatives document breadth we do not have, and the sensible decision is to choose one of them. BrainHQ's navigation and people-skills categories in particular have no counterpart on our side at all."
  - After: "Two differences are large enough that a feature table hides rather than reveals them."
- *body line 173*
  - Before: "**Evidence posture.** These four publishers sit in visibly different places. BrainHQ cites a research volume on its own site. Lumosity carries a published caveat about the gap between assessment-score gains and everyday tasks. Peak describes research partnerships and researcher-developed programmes rather than outcome claims. We publish no efficacy research and make no cognitive claim of any kind — our app is an educational game that records performance on its own drills. Those are four different positions, and readers should notice that "cites research" and "demonstrates a benefit for you" are not the same statement."
  - After: "**Scope.** Ours is no longer the narrow arithmetic-and-memory product this comparison first described: its listing now spans reasoning, memory, logic, vocabulary, focus and mental math, plus a personality questionnaire. What it does not describe is any navigation exercise, anything addressing social cognition, or writing and speaking practice. If those are what you came for, BrainHQ's navigation and people-skills categories and Elevate's writing and speaking areas have no counterpart in our listing, and the sensible decision is to choose one of them."
- *body line 175*
  - Before: "**Teaching layer.** The technique library with worked examples and named common mistakes is the one item in our column that none of the four publishers' pages we read describes. That is precisely as strong a claim as it sounds — a statement about the content of four web pages on one date, not an assertion that these products lack such a feature."
  - After: "**Evidence posture.** These four publishers sit in visibly different places. BrainHQ cites a research volume on its own site. Lumosity carries a published caveat about the gap between assessment-score gains and everyday tasks. Peak describes research partnerships and researcher-developed programmes rather than outcome claims. We publish no efficacy research. Our listing describes its IQ-style test and other results as estimates based on app activities rather than professional assessments, and where it says the app builds memory, focus and speed, no research of ours stands behind that wording. Those are different positions, and readers should notice that "cites research" and "demonstrates a benefit for you" are not the same statement."
- *body line 191*
  - Before: "- **You want breadth across many cognitive domains.** BrainHQ, Peak and Lumosity each document a wider spread than we do. BrainHQ documents the widest set of named categories. - **You want language, writing or speaking practice.** Elevate is the only product here that documents those areas. We have nothing in that space."
  - After: "- **You want breadth across many cognitive domains.** BrainHQ documents the widest set of named categories, including navigation and people skills that our listing does not cover, and Lumosity and Peak each document a broad spread too. - **You want writing or speaking practice.** Elevate is the only product here that documents those areas. Ours has vocabulary games — synonyms, antonyms, context clues — but nothing for writing or speaking."
- *body line 194*
  - Before: "- **You want arithmetic fluency, a method library and short offline sessions.** That is the case ours is built for, and it is a narrow one. If your goal is being quicker and more confident with numbers in everyday situations, the [mental math practice guide](/blog/mental-math-training-guide/) covers the methods and the [Mental Math & Memory Games app page](/apps/mental-math-memory-games/) covers the modes."
  - After: "- **You want mental math alongside memory, logic and vocabulary games, and a reasoning test you will read as an estimate.** That is the case ours is built for. If your goal is being quicker and more confident with numbers in everyday situations, the [mental math practice guide](/blog/mental-math-training-guide/) covers the methods and the [IQ Test & Brain Training Games app page](/apps/mental-math-memory-games/) describes what the app includes."

#### `brain-training-for-busy-adults` (education-brain)

- Published 2026-09-22; updated 2026-09-22 → 2026-10-02. Flagged in section H2: none (additional corrections).
- **Correction note:** This article said the modes it names in our app, then called Mental Math & Memory Games, are listed on its app page; that page, now for IQ Test & Brain Training Games, describes the app without naming individual modes, and the sentence now points there only for a description of the app.

- *body line 157*
  - Before: "More routines and explainers sit in the [brain training games hub](/blog/topics/brain-training-games/) and across the [education and brain category](/blog/category/education-brain/), and the modes named above are listed on the [Mental Math & Memory Games app page](/apps/mental-math-memory-games/)."
  - After: "More routines and explainers sit in the [brain training games hub](/blog/topics/brain-training-games/) and across the [education and brain category](/blog/category/education-brain/), and the app itself is described on the [IQ Test & Brain Training Games app page](/apps/mental-math-memory-games/)."

#### `brain-training-questions-answered` (education-brain)

- Published 2026-09-22; updated 2026-09-22 → 2026-10-02. Flagged in section H2: line 66 (rewritten), line 132 (rewritten).
- **Correction note:** This article said our app, then called Mental Math & Memory Games, contained no IQ test, no cognitive assessment and no personality test and showed no brain-age or percentile figure; the app, now IQ Test & Brain Training Games, includes an IQ-style test, a memory test, a reaction time test and a personality questionnaire whose results its Google Play listing calls estimates rather than clinical or professional assessments, and the article now says so and no longer makes claims about figures the listing does not describe.

- *FAQ 2 ("Does a high score in a brain game mean a high IQ?")*
  - Before: "Mental Math & Memory Games contains no IQ test, no cognitive assessment and no percentile scoring, and its score is not an estimate of anything but that session."
  - After: "Our own app, IQ Test & Brain Training Games, does include an IQ-style test, and its Google Play listing describes the results as estimates based on app activities, not a clinical or professional assessment — so a high result there is an estimate from the app's own questions, not a standardised IQ score."
- *body line 132*
  - Before: "Its claim register is short and worth stating up front, because several answers below depend on it: it drills arithmetic and memory tasks, it records score, accuracy, streak, response time and personal bests, and it makes no claim about intelligence, cognitive decline, diagnosis or transfer to untrained skills. It contains no IQ test, no cognitive assessment, no personality test, no brain-age figure and no percentile scoring."
  - After: "Its claim register is worth stating up front, because several answers below depend on it. It includes an IQ-style test, a memory test, a reaction time test and a personality questionnaire with a Big Five profile, alongside brain, memory, logic, focus, vocabulary and mental math games, and it tracks personal bests, accuracy, streaks, response speed and an assessment history. Its Google Play listing states that the test results are estimates based on app activities, not medical, psychological, clinical, educational-placement, employment or professional diagnostic assessments, and it makes no claim about cognitive decline, diagnosis or transfer to untrained skills."
- *body line 180*
  - Before: "Mental Math & Memory Games does not produce a brain-age number, a cognitive age or any age comparison, and it does not compare your result to an average for your age group."
  - After: "The Google Play listing for our own app, IQ Test & Brain Training Games, does not describe a brain-age figure. Whatever result the app shows — from its IQ-style test, memory test or reaction time test — is, in the listing's own words, an estimate based on app activities, not a medical, psychological, clinical or professional diagnostic assessment, and the caution above applies to it."

#### `budget-math-in-your-head` (education-brain)

- Published 2026-09-22; updated 2026-09-22 → 2026-10-02. Flagged in section H2: none (additional corrections).
- **Correction note:** This article said our app, then called Mental Math & Memory Games, was not an assessment of anything and that the figures it keeps describe nothing beyond drill performance; the app, now IQ Test & Brain Training Games, also has an IQ-style test and other tests whose results its Google Play listing calls estimates rather than clinical or professional assessments, so the sentence now describes only what its drills record.

- *body line 170*
  - Before: "The app is an educational game and a practice tool rather than financial advice or an assessment of anything, and the figures it keeps — score, accuracy, streak, response time and personal bests — describe drill performance and nothing else."
  - After: "The app is an educational game and a practice tool rather than financial advice, and the figures its drills keep — score, accuracy, streak, response time and personal bests — describe drill performance and nothing else."

#### `can-practice-raise-an-iq-score` (education-brain)

- Published 2026-09-22; updated 2026-09-22 → 2026-10-02. Flagged in section H2: none (additional corrections).
- **Correction note:** This article said our app, then called Mental Math & Memory Games, contained no test, norm sample, percentile or assessment, that nothing in it measures intelligence, and that it belonged only in the 'better at the task' category; the app, now IQ Test & Brain Training Games, includes an IQ-style test you can revisit, with results its Google Play listing calls estimates rather than clinical or professional assessments, and the article now explains that retest gains on that test are the practice effect it describes.

- *FAQ 4 ("Does the app claim to increase intelligence?")*
  - Before: "No. Mental Math & Memory Games drills arithmetic and memory tasks and records score, accuracy, streak, response time and personal bests. Those numbers describe performance on the drilled task. Nothing in the product measures intelligence or supports a claim about it, and we make no such claim."
  - After: "No, and we make no such claim. IQ Test & Brain Training Games includes an IQ-style test, and its listing describes the results as estimates based on app activities, not a professional assessment. Its drills record score, accuracy, streak, response time and personal bests, which describe performance on the drilled task. If you retake the test, expect the practice effect this article describes: a rising result says more about familiarity with the format than about a change in ability."
- *body line 147*
  - Before: "[Mental Math & Memory Games](/apps/mental-math-memory-games/) is our own app, built by Reign Creative, and it falls squarely into claim two."
  - After: "[IQ Test & Brain Training Games](/apps/mental-math-memory-games/) is our own app, built by Reign Creative, and it touches two of the three claims: its drills are claim two, and its IQ-style test, which you can revisit, is exactly where claim one appears."
- *body line 149*
  - Before: "What the app records — score, accuracy, streak, response time and personal bests, with a session history — describes performance on those tasks and nothing else."
  - After: "What the drills record — score, accuracy, streak, response time and personal bests — describes performance on those tasks."
- *body line 151*
  - Before: "**We make no claim that this raises intelligence, and nothing in the product could support one.** There is no test, no norm sample, no percentile and no assessment in it. If your accuracy in Division Dash rises from 72 per cent to 88 per cent at the same difficulty, you have got better at Division Dash. That is a genuine result and it is the only one on offer."
  - After: "**We make no claim that this raises intelligence, and nothing in the product could support one — its own test included.** If your accuracy in Division Dash rises from 72 per cent to 88 per cent at the same difficulty, you have got better at Division Dash. That is a genuine result. If your result on the app's IQ-style test rises on a second or third attempt, that is claim one at work: you have learned the format. Its listing describes those results as estimates based on app activities, not medical, psychological, clinical or professional diagnostic assessments, and a retest gain on them is no evidence for claim three."

#### `careless-arithmetic-mistakes` (education-brain)

- Published 2026-09-22; updated 2026-09-22 → 2026-10-02. Flagged in section H2: line 158 (rewritten).
- **Correction note:** This article said our app, then called Mental Math & Memory Games, was a practice game and nothing more, with no test or assessment of any kind and no claim about intelligence; the app, now IQ Test & Brain Training Games, includes an IQ-style test and a memory test whose results its Google Play listing calls estimates rather than clinical or professional assessments, and the article now says so.

- *body line 158*
  - Before: "It is a practice game and nothing more: it records performance on its own drills, offers no test or assessment of any kind, and makes no claim about intelligence. The [app page](/apps/mental-math-memory-games/) lists what ships."
  - After: "Those two modes are practice: they record performance on their own drills. The app also includes an IQ-style test and a memory test, and its Google Play listing calls their results estimates based on app activities, not clinical or professional assessments. The [app page](/apps/mental-math-memory-games/) describes the app as a whole."

#### `change-detection-tasks` (education-brain)

- Published 2026-09-22; updated 2026-09-22 → 2026-10-02. Flagged in section H2: line 60 (rewritten), line 139 (rewritten).
- **Correction note:** This article said our app, then called Mental Math & Memory Games, contained no test or assessment of any kind; the app, now IQ Test & Brain Training Games, includes a memory test and an IQ-style test whose results its Google Play listing calls estimates rather than clinical or professional assessments, and the article now says so while keeping its point that a missing-item game result is not a measurement of visual memory.

- *takeaway*
  - Before: "They are practice and entertainment, not a test of visual memory, and the app contains no assessment."
  - After: "They are practice and entertainment, not a test of visual memory; the app's separate memory test and IQ-style test produce results its listing calls estimates based on app activities, not clinical or professional assessments."
- *body line 139*
  - Before: "The app records score, accuracy, streak, response time and personal bests, and it contains no test or assessment of any kind — a missing-item result is a game statistic, not a measurement of your visual memory."
  - After: "In them the app records score, accuracy, streak, response time and personal bests, and a missing-item result is a game statistic, not a measurement of your visual memory. The app does also include a memory test and an IQ-style test, and its Google Play listing describes their results as estimates based on app activities, not clinical or professional assessments."

#### `choosing-a-difficulty-level` (education-brain)

- Published 2026-09-22; updated 2026-09-22 → 2026-10-02. Flagged in section H2: none (additional corrections).
- **Correction note:** This article said every difficulty ladder it names in our app, then called Mental Math & Memory Games, is shown on the app page; that page, for the app now named IQ Test & Brain Training Games, describes its features without listing individual modes or ladders, so the sentence now simply points to it.

- *body line 151*
  - Before: "More sits in the [brain training games hub](/blog/topics/brain-training-games/) and the [education and brain category](/blog/category/education-brain/), and every ladder named above is on the [Mental Math & Memory Games app page](/apps/mental-math-memory-games/)."
  - After: "More sits in the [brain training games hub](/blog/topics/brain-training-games/) and the [education and brain category](/blog/category/education-brain/), and the app itself is described on the [IQ Test & Brain Training Games app page](/apps/mental-math-memory-games/)."

#### `common-reasoning-mistakes` (education-brain)

- Published 2026-09-22; updated 2026-09-22 → 2026-10-02. Flagged in section H2: line 178 (rewritten).
- **Correction note:** This article said our app, then called Mental Math & Memory Games, claimed nothing beyond its drill statistics and contained no test or assessment; the app, now IQ Test & Brain Training Games, includes an IQ-style test, a memory test and a personality questionnaire whose results its Google Play listing calls estimates rather than clinical or professional assessments, and the article now says so.

- *body line 178*
  - Before: "The app records score, accuracy, streak and response time on its drills and claims nothing beyond that; it contains no test, no assessment and no verdict about you."
  - After: "Those drills record score, accuracy, streak and response time. The app's IQ-style test, memory test and personality questionnaire are separate, and its listing describes their results as estimates based on app activities, not clinical or professional assessments, so treat none of them as a verdict about you."
- *body line 180*
  - Before: "You can see the mode list on the [Mental Math & Memory Games app page](/apps/mental-math-memory-games/), find the rest of this material in the [logic and pattern puzzles hub](/blog/topics/logic-and-pattern-puzzles/), and browse the wider [education and brain section](/blog/category/education-brain/) for related writing on study method and evidence."
  - After: "You can see how the app describes its games and tests on the [IQ Test & Brain Training Games app page](/apps/mental-math-memory-games/), find the rest of this material in the [logic and pattern puzzles hub](/blog/topics/logic-and-pattern-puzzles/), and browse the wider [education and brain section](/blog/category/education-brain/) for related writing on study method and evidence."

#### `compensation-strategy-in-arithmetic` (education-brain)

- Published 2026-09-22; updated 2026-09-22 → 2026-10-02. Flagged in section H2: none (additional corrections).
- **Correction note:** This article said our app's full arithmetic and memory catalogue could be seen on its app page; that page, for the app now called IQ Test & Brain Training Games (previously Mental Math & Memory Games), describes the app without listing its individual drills, and the sentence now points to it as a description of the app.

- *body line 162*
  - Before: "You can see the app's full arithmetic and memory catalogue on the [Mental Math & Memory Games app page](/apps/mental-math-memory-games/)."
  - After: "The app itself is described on the [IQ Test & Brain Training Games app page](/apps/mental-math-memory-games/)."

#### `conditional-reasoning-if-then` (education-brain)

- Published 2026-09-22; updated 2026-09-22 → 2026-10-02. Flagged in section H2: none (additional corrections).
- **Correction note:** This article said our app, then called Mental Math & Memory Games, had no logic mode, no conditional items and nothing that assesses reasoning, and was arithmetic and memory practice only; the app, now IQ Test & Brain Training Games, lists conditional reasoning among its logic games and logic among the areas of an IQ-style test whose results its Google Play listing calls estimates rather than clinical or professional assessments, and the article now says so.

- *takeaway*
  - Before: "Mental Math & Memory Games contains no logic mode and no reasoning test; the conditionals worth practising here are the ones attached to arithmetic methods."
  - After: "IQ Test & Brain Training Games, our own app, lists conditional reasoning among its logic games and logic among the areas of its IQ-style test, so the four forms in this article have somewhere to be practised; its listing calls the test's results estimates, not a professional assessment."
- *body line 164*
  - Before: "To be plain about the product this hub sits under: Mental Math & Memory Games, our own app, has no logic mode, no conditional items and nothing that assesses reasoning. It is arithmetic and memory practice. Where it genuinely touches this article is the conditions attached to arithmetic methods — a shortcut that applies only to numbers near a round base, a divisibility test that runs in one direction and not the other — and its untimed **Accuracy Trainer** rounds, which give feedback and an explanation rather than a verdict, are the format in which noticing a misapplied condition is actually possible. The mode list and the statistics the app records are on the [Mental Math & Memory Games app page](/apps/mental-math-memory-games/)."
  - After: "To be plain about the product this hub sits under: IQ Test & Brain Training Games, our own app, lists conditional reasoning among its logic games, alongside analogies, sequences and deduction, and its IQ-style test includes logic among the areas it covers. Its listing does not say which of the four forms above those items use, and it describes the IQ-style test's results as estimates based on app activities, not clinical or professional assessments. The app's mental math practice touches this article too, because arithmetic methods carry conditions of their own — a shortcut that applies only to numbers near a round base, a divisibility test that runs in one direction and not the other. The app itself is described on the [IQ Test & Brain Training Games app page](/apps/mental-math-memory-games/)."

#### `counting-up-subtraction` (education-brain)

- Published 2026-09-22; updated 2026-09-22 → 2026-10-02. Flagged in section H2: none (additional corrections).
- **Correction note:** This article said the full list of modes for our app, then called Mental Math & Memory Games, is on its app page; that page describes the app, now IQ Test & Brain Training Games, without listing individual modes, and the article now says only that the app is described there.

- *body line 157*
  - Before: "The full list of modes is on the [Mental Math & Memory Games app page](/apps/mental-math-memory-games/)."
  - After: "The app itself is described on the [IQ Test & Brain Training Games app page](/apps/mental-math-memory-games/)."

#### `cross-multiplication-in-one-pass` (education-brain)

- Published 2026-09-22; updated 2026-09-22 → 2026-10-02. Flagged in section H2: none (additional corrections).
- **Correction note:** This article said the full catalogue of our app, then called Mental Math & Memory Games, is on its app page; that page, now for IQ Test & Brain Training Games, describes the app without listing individual drills or techniques, and the sentence now points there only for a description of the app.

- *body line 196*
  - Before: "The full catalogue is on the [Mental Math & Memory Games app page](/apps/mental-math-memory-games/)."
  - After: "The app itself is described on the [IQ Test & Brain Training Games app page](/apps/mental-math-memory-games/)."

#### `daily-challenge-formats-explained` (education-brain)

- Published 2026-09-22; updated 2026-09-22 → 2026-10-02. Flagged in section H2: none (additional corrections).
- **Correction note:** This article said the modes that the daily challenge in our app, then called Mental Math & Memory Games and now IQ Test & Brain Training Games, points at are listed on its app page; that page describes the app's games and tests without listing individual modes, and the sentence now points to it only for that description.

- *body line 146*
  - Before: "More on routines and progress sits in the [brain training games hub](/blog/topics/brain-training-games/) and across the [education and brain category](/blog/category/education-brain/); the modes the daily points at are listed on the [Mental Math & Memory Games app page](/apps/mental-math-memory-games/)."
  - After: "More on routines and progress sits in the [brain training games hub](/blog/topics/brain-training-games/) and across the [education and brain category](/blog/category/education-brain/); the app itself is described on the [IQ Test & Brain Training Games app page](/apps/mental-math-memory-games/)."

#### `deductive-reasoning-examples` (education-brain)

- Published 2026-09-22; updated 2026-09-22 → 2026-10-02. Flagged in section H2: none (additional corrections).
- **Correction note:** This article said our app, then called Mental Math & Memory Games, contained no logic items and nothing resembling a reasoning test and covered only arithmetic and memory; the app, now IQ Test & Brain Training Games, includes logic games with deduction and conditional reasoning and an IQ-style test covering logic, whose results its Google Play listing calls estimates rather than clinical or professional assessments, and the article now says so.

- *takeaway*
  - Before: "Mental Math & Memory Games contains no logic items of any kind; this subject is here for the reader, not the product."
  - After: "Our own app, IQ Test & Brain Training Games, includes logic games built on deduction and conditional reasoning, but this subject is here for the reader: the validity and counterexample checks above work on any argument, with or without an app."
- *body line 106*
  - Before: "Mental Math & Memory Games, our own app, has no logic mode, no argument items and nothing resembling a reasoning test. Its catalogue is arithmetic and memory practice. This article is here because readers of the [logic and pattern puzzles hub](/blog/topics/logic-and-pattern-puzzles/) need the concept, not because we have something to sell against it."
  - After: "IQ Test & Brain Training Games, our own app, includes logic games with analogies, sequences, conditional reasoning and deduction, and an IQ-style test whose areas include logic; its Google Play listing calls the test's results estimates based on app activities, not clinical or professional assessments. This article is here because readers of the [logic and pattern puzzles hub](/blog/topics/logic-and-pattern-puzzles/) need the concept, and nothing in it depends on the app."
- *body line 169*
  - Before: "There is no arithmetic in this article, and the app does not help with it. What our app does offer, and the reason it appears in this hub at all, is a set of untimed **Accuracy Trainer** rounds with feedback and explanations, which are the opposite of the timed sprints in one specific way: they do not reward answering before you have finished thinking."
  - After: "There is no arithmetic in this article, and the app's arithmetic drills are not what helps with it; its logic games, which include deduction and conditional reasoning, are the closer match. Our app also offers a set of untimed **Accuracy Trainer** rounds with feedback and explanations, which are the opposite of the timed sprints in one specific way: they do not reward answering before you have finished thinking."
- *body line 169*
  - Before: "The mode list is on the [Mental Math & Memory Games app page](/apps/mental-math-memory-games/), and our sceptical review of what practice apps can and cannot do is in [do brain training apps work](/blog/do-brain-training-apps-work/)."
  - After: "The app itself is described on the [IQ Test & Brain Training Games app page](/apps/mental-math-memory-games/), and our sceptical review of what practice apps can and cannot do is in [do brain training apps work](/blog/do-brain-training-apps-work/)."

#### `delayed-recall-explained` (education-brain)

- Published 2026-09-22; updated 2026-09-22 → 2026-10-02. Flagged in section H2: line 82 (rewritten).
- **Correction note:** This article said our app, then called Mental Math & Memory Games, contained no assessment and said nothing about your performance beyond its drill figures, and that its app page lists every mode; the app, now IQ Test & Brain Training Games, includes a memory test and an IQ-style test whose results its Google Play listing calls estimates rather than clinical or professional assessments, and the article now says so and points to the app page only for a description of the app.

- *FAQ 5 ("Does the app run a delayed recall test?")*
  - Before: "No."
  - After: "Not a standardised one."
- *FAQ 5 ("Does the app run a delayed recall test?")*
  - Before: "The app contains no assessment, no clinical measure and no interpretation of your results."
  - After: "The app also has a memory test that its listing says tracks recall against your own history, and the listing describes that result as an estimate based on app activities, not a clinical or professional assessment."
- *body line 156*
  - Before: "What the app does not have is any assessment. It runs no delayed recall test, produces no clinical measure, and makes no statement about what your performance means beyond the score, accuracy, streak and response-time figures it records for your own runs."
  - After: "What the app does not offer is a standardised memory assessment. It has a memory test that its listing says tracks recall against your own history, and an IQ-style test that includes working memory among its areas, but the listing describes those results as estimates based on app activities, not medical, psychological, clinical or professional diagnostic assessments."
- *body line 158*
  - Before: "Otherwise the full mode list is on the [Mental Math & Memory Games app page](/apps/mental-math-memory-games/), the related writing sits in the [memory and attention hub](/blog/topics/memory-and-attention/), and the wider set of study articles is in the [education and brain section](/blog/category/education-brain/)."
  - After: "Otherwise the app itself is described on the [IQ Test & Brain Training Games app page](/apps/mental-math-memory-games/), the related writing sits in the [memory and attention hub](/blog/topics/memory-and-attention/), and the wider set of study articles is in the [education and brain section](/blog/category/education-brain/)."

#### `deliberate-practice-in-brain-games` (education-brain)

- Published 2026-09-22; updated 2026-09-22 → 2026-10-02. Flagged in section H2: none (additional corrections).
- **Correction note:** This article said the modes and difficulty ladders of our app, then called Mental Math & Memory Games, are shown on its app page; that page, for the app now named IQ Test & Brain Training Games, describes its features without listing difficulty ladders, so the sentence now simply points to it.

- *body line 170*
  - Before: "You can see which modes and difficulty ladders exist on the [Mental Math & Memory Games app page](/apps/mental-math-memory-games/), and more practice-method writing sits in the [education and brain category](/blog/category/education-brain/)."
  - After: "The app itself is described on the [IQ Test & Brain Training Games app page](/apps/mental-math-memory-games/), and more practice-method writing sits in the [education and brain category](/blog/category/education-brain/)."

#### `designing-memory-games-beyond-matching-pairs` (education-brain)

- Published 2026-09-15; updated 2026-09-15 → 2026-10-02. Flagged in section H2: none (additional corrections).
- **Correction note:** This article described our app, then called Mental Math & Memory Games, as two halves, memory and arithmetic; the app, now IQ Test & Brain Training Games, also has logic, vocabulary and focus games and an IQ-style test whose results its Google Play listing calls estimates rather than clinical or professional assessments, and the article now says so.

- *body line 187*
  - Before: "The arithmetic half of the app is the place where speed pressure *is* the right dial, which is why the two halves are built differently even though they sit in the same product."
  - After: "The arithmetic games are the place where speed pressure *is* the right dial, which is why they are built differently from the memory games even though both sit in the same product, which also has logic, vocabulary and focus games and an IQ-style test whose results its listing calls estimates rather than clinical or professional assessments."

#### `digit-span-explained` (education-brain)

- Published 2026-09-22; updated 2026-09-22 → 2026-10-02. Flagged in section H2: line 5 (kept), line 57 (rewritten), line 80 (rewritten), line 118 (rewritten).
- **Correction note:** This article said our app, then called Mental Math & Memory Games, administered no cognitive assessment and made no claim about how you compare with others; the app, now IQ Test & Brain Training Games, includes a memory test and an IQ-style test whose results its Google Play listing calls estimates rather than clinical or professional assessments, so the article now says that and no longer says the app page lists its full memory catalogue.

- *takeaway*
  - Before: "Mental Math & Memory Games records a best span on its own drills. That is a personal best in a game, not a measurement, and the app administers no cognitive assessment of any kind."
  - After: "IQ Test & Brain Training Games records a best span on its own memory drills, and that is a personal best in a game. Its memory test and IQ-style test are separate features, and its listing describes their results as estimates based on app activities, not clinical or professional assessments."
- *FAQ 5 ("Does IQ Test & Brain Training Games give me a digit span score?")*
  - Before: "It records the longest sequence you have completed in its own memory drills and keeps that as a personal best. That is a game statistic produced under game conditions, with no standard administration, no norms and no interpretation attached. It is not a test, not an assessment, and not comparable to a score produced by a psychologist using a standardised instrument."
  - After: "It records the longest sequence you have completed in its own memory drills and keeps that as a personal best — a game statistic produced under game conditions, with no standard administration. The app also has a memory test you can repeat against your own history, and its listing describes that result, like its other test results, as an estimate based on app activities rather than a clinical or professional assessment. Neither is comparable to a score produced by a psychologist using a standardised instrument."
- *body line 118*
  - Before: "The app administers no cognitive assessment of any kind, and this article explains what the real procedure does so you can see the difference."
  - After: "The app also has a memory test and an IQ-style test, whose results its Google Play listing describes as estimates based on app activities, not clinical or professional assessments; this article explains what the real procedure does so you can see the difference."
- *body line 158*
  - Before: "It was produced on your own phone, at a moment of your choosing, with no examiner, no standard presentation rate you did not set, and no norms behind it."
  - After: "It was produced on your own phone, at a moment of your choosing, with no examiner and no standard presentation rate you did not set."
- *body line 158*
  - Before: "It does not tell you anything about your standing relative to other people, and the app makes no such claim."
  - After: "It does not tell you anything about your standing relative to other people."
- *body line 160*
  - Before: "You can see the full memory catalogue on the [Mental Math & Memory Games app page](/apps/mental-math-memory-games/), browse the rest of this subject in the [memory and attention hub](/blog/topics/memory-and-attention/), and find the wider set of study and cognition articles in the [education and brain section](/blog/category/education-brain/)."
  - After: "You can see how the app describes its memory games and memory test on the [IQ Test & Brain Training Games app page](/apps/mental-math-memory-games/), browse the rest of this subject in the [memory and attention hub](/blog/topics/memory-and-attention/), and find the wider set of study and cognition articles in the [education and brain section](/blog/category/education-brain/)."

#### `do-brain-training-apps-work` (education-brain)

- Published 2026-09-15; updated 2026-09-15 → 2026-10-02. Flagged in section H2: none (additional corrections).
- **Correction note:** This article described our app, then called Mental Math & Memory Games, as arithmetic and memory practice only, said arithmetic fluency was the whole of what it offered and that it claimed nothing needing evidence; the app, now IQ Test & Brain Training Games, also includes an IQ-style test, memory and reaction time tests, logic, vocabulary and focus games and a personality questionnaire, whose results its Google Play listing calls estimates rather than professional assessments, and our column of the comparison and the section on what we claim now say so.

- *body line 198*
  - Before: "| What it claims to train | Arithmetic speed and accuracy across four operations, plus number, grid, sequence and delayed-recall memory tasks | Memory, attention, flexibility and problem solving via adaptive games | Our app and Google Play listing; lumosity.com | 15 September 2026 |"
  - After: "| What it claims to train | Memory, logic, math, verbal ability, focus and speed, through brain games, mental math and an IQ-style test across seven areas | Memory, attention, flexibility and problem solving via adaptive games | Our Google Play listing; lumosity.com | Ours 2 October 2026; Lumosity 15 September 2026 |"
- *body line 203*
  - Before: "| What the user is shown | Score, accuracy, response time, streaks and personal bests, with a history | Adaptive difficulty and a daily set of games; assessment scores described in its research summary | Our app; lumosity.com | 15 September 2026 |"
  - After: "| What the user is shown | Personal bests, accuracy, response speed and streaks with a history and charts, plus IQ-style test, memory test, reaction time test and personality results that its listing calls estimates, not professional assessments | Adaptive difficulty and a daily set of games; assessment scores described in its research summary | Our Google Play listing; lumosity.com | Ours 2 October 2026; Lumosity 15 September 2026 |"
- *body line 207*
  - Before: "Our honest position is that we have not run research, and therefore have nothing to cite, and therefore claim nothing that would need citing."
  - After: "Our honest position is that we have not run research and therefore have nothing to cite. That matters more now that the app includes an IQ-style test: its listing calls the results estimates based on app activities, not professional assessments, and no study of ours stands behind them."
- *body line 213*
  - Before: "Here is the claim, stated exactly: **if you practise mental arithmetic in this app, you will get faster and more accurate at mental arithmetic.** That is measurable, it is measured, and it shows up in your own numbers."
  - After: "The app now also includes an IQ-style test covering numerical reasoning, logic, patterns, vocabulary, working memory, spatial reasoning and processing speed, a memory test, a reaction time test, logic, vocabulary and focus games, and a personality questionnaire with a Big Five profile. Its Google Play listing states that IQ test, personality test, memory test and other results are estimates based on app activities, not medical, psychological, clinical, educational-placement, employment or professional diagnostic assessments, and it offers the personality questionnaire as self-reflection rather than diagnosis."
- *body (added)*
  - Before: (nothing — added)
  - After: "Here is the practice claim, stated exactly: **if you practise mental arithmetic in this app, you will get faster and more accurate at mental arithmetic.** That is measurable, it is measured, and it shows up in your own numbers. The test results are a different kind of number, and the listing's own wording is the right way to read them: estimates based on the app's own activities, not a clinical or professional assessment."
- *body line 217*
  - Before: "That is near transfer at essentially zero distance, and it is the whole of what we are offering."
  - After: "That is near transfer at essentially zero distance, and the same rule holds for the app's memory, logic and vocabulary games: expect to get better at what you practise, not at everything else."

#### `estimating-sales-tax` (education-brain)

- Published 2026-09-22; updated 2026-09-22 → 2026-10-02. Flagged in section H2: none (additional corrections).
- **Correction note:** This article said our app, then called Mental Math & Memory Games, was not an assessment of anything and kept only drill figures; the app, now IQ Test & Brain Training Games, also includes an IQ-style test and a memory test whose results its Google Play listing calls estimates rather than clinical or professional assessments, and the article now says so.

- *body line 173*
  - Before: "The app is an educational game and a practice tool, not an assessment of anything. The figures it keeps — score, accuracy, streak, response time and personal bests — describe your performance on the drills you have played, and nothing beyond that."
  - After: "The app is an educational game and a practice tool. The figures its drills keep — score, accuracy, streak, response time and personal bests — describe your performance on the drills you have played. It also includes an IQ-style test and a memory test, and its Google Play listing calls their results estimates based on app activities, not clinical or professional assessments."

#### `fibonacci-and-recursive-sequences` (education-brain)

- Published 2026-09-22; updated 2026-09-22 → 2026-10-02. Flagged in section H2: none (additional corrections).
- **Correction note:** This article said our app, then called Mental Math & Memory Games, had no figural, matrix or logic-grid items, that none of its modes is an assessment of any kind, that its drill statistics are the extent of what its numbers mean, and that its app page lists the modes; the app, now IQ Test & Brain Training Games, lists logic games built on sequences, patterns and rule discovery and an IQ-style test whose results its Google Play listing calls estimates rather than clinical or professional assessments, and the article now says so without claiming item formats the listing does not describe.

- *body line 155*
  - Before: "Being plain about what is not there: the app ships no figural or matrix items and no logic-grid puzzles, and none of its modes is an assessment of any kind. It tracks score, accuracy, streak, response time and personal bests on its own drills, and that is the extent of what its numbers mean. The [app page](/apps/mental-math-memory-games/) lists the modes; more of this subject is in the [logic and pattern puzzles collection](/blog/topics/logic-and-pattern-puzzles/) and the [education and brain training section](/blog/category/education-brain/)."
  - After: "Being plain about what is and is not claimed: the listing also describes logic games built on sequences, patterns and rule discovery and an IQ-style test that covers patterns, but it does not describe figural, matrix or logic-grid formats, so we do not claim them. Its drills track score, accuracy, streak, response time and personal bests, and its listing describes the IQ-style test and other results as estimates based on app activities, not clinical or professional assessments. The [app page](/apps/mental-math-memory-games/) describes the app; more of this subject is in the [logic and pattern puzzles collection](/blog/topics/logic-and-pattern-puzzles/) and the [education and brain training section](/blog/category/education-brain/)."

#### `finding-the-original-price-before-a-discount` (education-brain)

- Published 2026-09-22; updated 2026-09-22 → 2026-10-02. Flagged in section H2: line 181 (rewritten).
- **Correction note:** This article said our app, then called Mental Math & Memory Games, was not an assessment of anything and that its numbers described drill performance and nothing else; the app, now IQ Test & Brain Training Games, also includes an IQ-style test and other tests whose results its Google Play listing calls estimates rather than clinical or professional assessments, and the article now says so.

- *body line 181*
  - Before: "The app is an educational game and a practice tool rather than an assessment of anything, and the numbers it records — score, accuracy, streak, response time and personal bests — describe drill performance and nothing else."
  - After: "The app is an educational game and a practice tool. Its drills record score, accuracy, streak, response time and personal bests, and those numbers describe drill performance; its IQ-style test and other test results are, in its listing's words, estimates based on app activities, not clinical or professional assessments."

#### `finding-the-rule-in-a-number-pattern` (education-brain)

- Published 2026-09-22; updated 2026-09-22 → 2026-10-02. Flagged in section H2: none (additional corrections).
- **Correction note:** This article said our app, then called Mental Math & Memory Games, had no figural, matrix or logic-grid items, that none of its modes is a test or assessment, and that it records nothing beyond drill statistics; the app, now IQ Test & Brain Training Games, lists logic games built on sequences, patterns and rule discovery and an IQ-style test whose results its Google Play listing calls estimates rather than clinical or professional assessments, and the article now says so without claiming which item formats it uses.

- *body line 180*
  - Before: "Two things it does not ship, stated plainly: there are no figural or matrix items and no logic-grid puzzles in it, and none of its modes is a test or an assessment. It records score, accuracy, streak and response time on its own drills, nothing more."
  - After: "Its listing also describes logic games built on sequences, patterns and rule discovery, and an IQ-style test that includes patterns among its areas; it does not say whether any of them uses figural, matrix or logic-grid formats. The listing describes the IQ-style test's results as estimates based on app activities, not clinical or professional assessments, and on the drills the app records score, accuracy, streak and response time."

#### `fraction-decimal-percent-conversions` (education-brain)

- Published 2026-09-22; updated 2026-09-22 → 2026-10-02. Flagged in section H2: none (additional corrections).
- **Correction note:** This article said our app, then called Mental Math & Memory Games, was not an assessment of anything and recorded only drill statistics; the app, now IQ Test & Brain Training Games, also has an IQ-style test and other tests whose results its Google Play listing calls estimates rather than clinical or professional assessments, so the passage now describes only what its drills record.

- *body line 190*
  - Before: "The app is an educational game and a practice tool rather than a course or an assessment of anything. What it records is score, accuracy, streak, response time and personal bests on the modes you actually play."
  - After: "The app is an educational game and a practice tool rather than a course. What its drills record is score, accuracy, streak, response time and personal bests on the modes you actually play."

#### `fun-iq-quizzes-versus-real-assessments` (education-brain)

- Published 2026-09-22; updated 2026-09-22 → 2026-10-02. Flagged in section H2: line 56 (rewritten), line 75 (rewritten), line 159 (rewritten).
- **Correction note:** This article said our app, then called Mental Math & Memory Games, contained no assessment, no IQ test, no personality test, no percentile scoring and no estimate of intelligence; the app, now IQ Test & Brain Training Games, includes an IQ-style test, a memory test, a reaction time test and a personality questionnaire whose results its Google Play listing calls estimates rather than clinical or professional assessments, and the article now runs its checklist on those results.

- *takeaway*
  - Before: "Mental Math & Memory Games ships quiz-shaped practice — Boss Quiz, True or False Math, Tap the Correct Answer — and no assessment of any kind."
  - After: "IQ Test & Brain Training Games, our own app, includes an IQ-style test, a memory test, a reaction time test and a personality questionnaire; its Google Play listing calls their results estimates based on app activities rather than clinical or professional assessments, and the checklist in this article applies to them as it would to any other app."
- *FAQ 4 ("Where does IQ Test & Brain Training Games sit?")*
  - Before: "It is listed on Google Play as an Educational game with a content rating of Everyone, and it ships quiz-shaped practice — Boss Quiz, True or False Math, Tap the Correct Answer — alongside arithmetic and memory drills. It contains no assessment, no percentile and no estimate of intelligence, and everything it records describes a practice session."
  - After: "It is listed on Google Play as an Educational game with a content rating of Everyone. Alongside memory, logic, vocabulary, focus and mental math games, it includes an IQ-style test, a memory test, a reaction time test and a personality questionnaire with a Big Five profile. Its listing states that these results are estimates based on app activities, not medical, psychological, clinical or professional diagnostic assessments. Measured against the checklist in this article, it is a self-administered product anyone can open, so treat its results as practice feedback and entertainment rather than a standardised score."
- *body line 159*
  - Before: "**None of them is an assessment.** The app contains no IQ test, no cognitive assessment, no personality test, no brain-age estimate and no percentile scoring. What it records — score, accuracy, streak, response time, personal bests and session history — describes what happened in a session at a difficulty you chose."
  - After: "The app also includes an IQ-style test, a memory test, a reaction time test and a personality questionnaire with a Big Five profile, and those are where the checklist above matters. Its Google Play listing states that IQ test, personality test, memory test and other results are estimates based on app activities, not medical, psychological, clinical, educational-placement, employment or professional diagnostic assessments. Run against the five features above, the app has no qualification requirement, it is taken unsupervised wherever you happen to be, and its listing documents no norm sample, technical manual or reliability evidence — so **none of its results is a standardised assessment score.** What it records — personal bests, accuracy, streaks, response speed and a history of past results — describes your own sessions over time."
- *body line 161*
  - Before: "The reason to be this explicit is that the category is full of products that are deliberately vague about it. Being clear costs us nothing, because practice with honest feedback is genuinely useful; the case for it does not need borrowed authority."
  - After: "The reason to be this explicit is that the category is full of products that are deliberately vague about it, and an app with "IQ test" in its name has more reason than most to say plainly what its numbers are. Practice with honest feedback is genuinely useful; the case for it does not need borrowed authority."

#### `geometric-sequences-explained` (education-brain)

- Published 2026-09-22; updated 2026-09-22 → 2026-10-02. Flagged in section H2: none (additional corrections).
- **Correction note:** This article said our app, then called Mental Math & Memory Games, had no figural, matrix or logic-grid content, presented nothing as a test and made no claim about intelligence; the app, now IQ Test & Brain Training Games, has pattern and rule-discovery logic games and an IQ-style test whose results its Google Play listing calls estimates rather than professional assessments, and the article now says so without claiming which item formats it uses.

- *body line 147*
  - Before: "Two honest limits are worth stating: the app has no figural, matrix or logic-grid content of any kind, and nothing in it is presented as a test — it records score, accuracy, streak and response time on its own drills and makes no claim about intelligence. The [app page](/apps/mental-math-memory-games/) lists what ships."
  - After: "Its listing also describes logic games built on patterns and rule discovery and an IQ-style test covering patterns and spatial reasoning, without saying whether any of them use figural, matrix or logic-grid items. One honest limit is worth stating: the listing describes the test's results as estimates based on app activities, not medical, psychological, clinical or professional diagnostic assessments, so a result there is a record of how you did on the app's own questions, not a measure of intelligence. The [app page](/apps/mental-math-memory-games/) describes the app."

#### `grid-and-position-memory` (education-brain)

- Published 2026-09-22; updated 2026-09-22 → 2026-10-02. Flagged in section H2: line 76 (rewritten), line 147 (rewritten).
- **Correction note:** This article said our app, then called Mental Math & Memory Games, contained no test or assessment of any kind; the app, now IQ Test & Brain Training Games, includes a memory test and an IQ-style test whose results its Google Play listing calls estimates rather than clinical or professional assessments, and the article now says so while keeping its point that a grid-game personal best is not a test result.

- *FAQ 4 ("Is a grid game the same thing as a Corsi block-tapping task?")*
  - Before: "Mental Math & Memory Games contains no test of any kind, and its grid modes produce a game score rather than a measurement."
  - After: "The grid modes in IQ Test & Brain Training Games produce a game score rather than a measurement. The app's separate memory test is described in its listing as giving an estimate based on app activities, not a clinical or professional assessment."
- *body line 147*
  - Before: "It is not a test result, it is not comparable to anyone else's number, and the app contains no assessment of any kind."
  - After: "It is not a test result, and it is not comparable to anyone else's number. The app's separate memory test and IQ-style test produce results its listing describes as estimates based on app activities, not clinical or professional assessments."

#### `growing-sequence-memory-games` (education-brain)

- Published 2026-09-22; updated 2026-09-22 → 2026-10-02. Flagged in section H2: line 148 (rewritten).
- **Correction note:** This article said our app, then called Mental Math & Memory Games, contained no test of any kind; the app, now IQ Test & Brain Training Games, includes a memory test whose result its Google Play listing calls an estimate rather than a clinical or professional assessment, and the article now says so.

- *body line 148*
  - Before: "A sequence game is practice and entertainment. It is not a standardised assessment, and Mental Math & Memory Games contains no test of any kind."
  - After: "A sequence game is practice and entertainment, and it is not a standardised assessment. IQ Test & Brain Training Games does include a memory test, which its listing says tracks recall against your own history, but the listing describes that result too as an estimate based on app activities, not a clinical or professional assessment."

#### `helping-a-child-with-math-facts` (education-brain)

- Published 2026-09-22; updated 2026-09-22 → 2026-10-02. Flagged in section H2: line 155 (rewritten).
- **Correction note:** This article said our app, then called Mental Math & Memory Games, made no assessment of any kind and that its app page lists everything that ships; the app, now IQ Test & Brain Training Games, includes an IQ-style test and a memory test whose results its Google Play listing calls estimates rather than clinical, educational-placement or professional assessments, and the article now says so.

- *body line 155*
  - Before: "It does not decide what a child should learn next, it does not track a syllabus, and it makes no assessment of any kind — the numbers it keeps are score, accuracy, streak, response time and personal bests on its own drills."
  - After: "It does not track a syllabus or decide what a child needs to learn next — the practice recommendations it offers after its IQ-style test point to its own brain-training games — and its drills keep score, accuracy, streak, response time and personal bests. Its listing describes its IQ-style test, memory test and other results as estimates based on app activities, not medical, psychological, clinical, educational-placement or professional diagnostic assessments."
- *body line 157*
  - Before: "The [app page](/apps/mental-math-memory-games/) lists what ships, the [mental math collection](/blog/topics/mental-math/) holds the rest of the method articles, and the [education and brain training section](/blog/category/education-brain/) has everything else."
  - After: "The [app page](/apps/mental-math-memory-games/) describes the app, the [mental math collection](/blog/topics/mental-math/) holds the rest of the method articles, and the [education and brain training section](/blog/category/education-brain/) has everything else."

#### `how-iq-scores-are-calculated` (education-brain)

- Published 2026-09-22; updated 2026-09-22 → 2026-10-02. Flagged in section H2: line 158 (rewritten).
- **Correction note:** This article said our app, then called Mental Math & Memory Games, showed only a points score and produced no IQ score, percentile or classification of any kind; the app, now IQ Test & Brain Training Games, includes an IQ-style test whose results its Google Play listing calls estimates based on app activities rather than professional assessments, and the article now explains why such a result is still not the deviation IQ it describes.

- *takeaway*
  - Before: "Mental Math & Memory Games reports points — a base value plus speed and streak bonuses, scaled by difficulty. That is a game score, not a normed score, and the two are not comparable in any direction."
  - After: "Our own app, IQ Test & Brain Training Games, offers an IQ-style test alongside its games; its listing describes no norm sample and calls the results estimates based on app activities, not a professional assessment, so read them as a record of how you did on the app's questions rather than as a deviation IQ."
- *FAQ 4 ("Does a brain training app calculate an IQ score?")*
  - Before: "Ours does not. Mental Math & Memory Games awards points for a correct answer, with bonuses for speed and for an unbroken streak, scaled by the difficulty selected. There is no norm sample, no age comparison and no conversion table anywhere in that calculation, so the output is a game score and nothing more."
  - After: "Ours, IQ Test & Brain Training Games, offers an IQ-style test, so it does produce a result — but its Google Play listing describes IQ test results as estimates based on app activities, not medical, psychological, clinical or professional diagnostic assessments. The listing describes no norm sample or conversion table of the kind explained in this article, so treat the result as a record of how you did on the app's own questions, not as a deviation IQ."
- *body line 154*
  - Before: "[Mental Math & Memory Games](/apps/mental-math-memory-games/) is our own app, and its on-screen number is labelled SCORE for a reason."
  - After: "[IQ Test & Brain Training Games](/apps/mental-math-memory-games/) is our own app, and it shows numbers of two kinds: game results such as personal bests, accuracy and streaks, and the results of its IQ-style test, memory test and reaction time test."
- *body line 156*
  - Before: "That score is points."
  - After: "The game score is points."
- *body line 158*
  - Before: "None of the three steps above happens anywhere in it. There is no standardisation sample, no age band, no conversion table, no composite and no metric with a fixed mean. The app therefore produces no IQ score, no percentile and no classification of any kind, and a higher score in it says only that you did better at that mode, at that difficulty, than you did before."
  - After: "A higher game score says only that you did better at that mode, at that difficulty, than you did before. For the IQ-style test, the listing describes no standardisation sample, age band or conversion table, and it states that IQ test and other results are estimates based on app activities, not medical, psychological, clinical, educational-placement, employment or professional diagnostic assessments. Nobody supervises the sitting either, so whatever form a result takes, it is not the deviation IQ this article describes."

#### `how-long-a-brain-training-session-should-be` (education-brain)

- Published 2026-09-22; updated 2026-09-22 → 2026-10-02. Flagged in section H2: none (additional corrections).
- **Correction note:** This article said the whole catalogue of our app's modes and formats could be seen on its app page; that page, for the app now called IQ Test & Brain Training Games (previously Mental Math & Memory Games), describes the app without listing its individual modes, and the sentence now points to it as a description of the app.

- *body line 132*
  - Before: "You can see the whole catalogue of modes and formats on the [Mental Math & Memory Games app page](/apps/mental-math-memory-games/), and the rest of the [brain training games hub](/blog/topics/brain-training-games/) covers how to sequence them."
  - After: "The app itself is described on the [IQ Test & Brain Training Games app page](/apps/mental-math-memory-games/), and the rest of the [brain training games hub](/blog/topics/brain-training-games/) covers how to sequence a session."

#### `how-to-improve-concentration` (education-brain)

- Published 2026-09-22; updated 2026-09-22 → 2026-10-02. Flagged in section H2: line 145 (rewritten).
- **Correction note:** This article said our app, then called Mental Math & Memory Games, had no attention test, no reaction test and no assessment of any kind; the app, now IQ Test & Brain Training Games, includes focus games, a reaction time test and an IQ-style test whose results its Google Play listing calls estimates rather than clinical or professional assessments, and the article now says so.

- *body line 145*
  - Before: "What it does not have is equally worth stating: there is no attention test in the app, no reaction test, and no assessment of any kind. It records score, accuracy, streak, response time and personal bests, and nothing in that list is a measurement of concentration."
  - After: "What it is not is equally worth stating. It does include focus games that challenge attention and distractor resistance, a reaction time test and an IQ-style test, but its listing describes their results as estimates based on app activities, not medical, clinical or professional assessments, so none of them is a clinical measure of your concentration. Its drills record score, accuracy, streak, response time and personal bests, and nothing in that list is a measurement of concentration either."

#### `how-to-memorize-numbers` (education-brain)

- Published 2026-09-22; updated 2026-09-22 → 2026-10-02. Flagged in section H2: none (additional corrections).
- **Correction note:** This article said our app, then called Mental Math & Memory Games, recorded nothing beyond drill statistics, made no claim to expand memory and listed its full catalogue on its app page; the app, now IQ Test & Brain Training Games, includes a memory test and an IQ-style test whose results its Google Play listing calls estimates rather than clinical or professional assessments, and that listing uses a 'build memory' heading, so the article now says so while keeping its position that span practice does not expand general memory.

- *FAQ 5 ("Can a practice app improve my number memory?")*
  - Before: "It makes no claim that this expands your general memory, and the research on span training does not support such a claim."
  - After: "Its store listing uses the heading 'build memory, focus and speed', but we make no claim that this practice expands your general memory, and the research on span training does not support such a claim."
- *body line 168*
  - Before: "There is no claim here that the practice enlarges your memory in general, prevents anything, or measures anything about you — the app records score, accuracy, streak and response time, and nothing else. See the full catalogue on the [Mental Math & Memory Games app page](/apps/mental-math-memory-games/), the rest of this subject in the [memory and attention hub](/blog/topics/memory-and-attention/), and the wider [education and brain section](/blog/category/education-brain/) for related study articles."
  - After: "There is no claim here that the practice enlarges your memory in general or prevents anything. The drills record score, accuracy, streak and response time; the app's separate memory test and IQ-style test produce results its Google Play listing calls estimates based on app activities, not clinical or professional assessments. See how the app describes itself on the [IQ Test & Brain Training Games app page](/apps/mental-math-memory-games/), the rest of this subject in the [memory and attention hub](/blog/topics/memory-and-attention/), and the wider [education and brain section](/blog/category/education-brain/) for related study articles."

#### `how-to-track-practice-progress` (education-brain)

- Published 2026-09-22; updated 2026-09-22 → 2026-10-02. Flagged in section H2: line 160 (rewritten).
- **Correction note:** This article said the numbers our app, then called Mental Math & Memory Games, records are not an assessment and come with no norm group or percentile; the app, now IQ Test & Brain Training Games, also includes an IQ-style test, a memory test and a reaction time test with an assessment history, whose results its Google Play listing calls estimates rather than professional assessments, and the article now says so.

- *body line 158*
  - Before: "Mental Math & Memory Games is our own app — Reign Creative builds it — and what it records is score, accuracy, streak, response time including average, median, fastest correct and a consistency value, personal bests per mode, and a session history you can look back through."
  - After: "IQ Test & Brain Training Games is our own app — Reign Creative builds it — and on its practice side it records personal bests, accuracy, streaks and response speed, with a history and charts you can look back through. It also includes an IQ-style test, a memory test and a reaction time test, and keeps an assessment history of those results."
- *body line 160*
  - Before: "They are not an assessment. There is no norm group, no standardised administration and no percentile, and improvement in them is evidence about the practised task and nothing wider — the cornerstone guide [do brain training apps work](/blog/do-brain-training-apps-work/) sets out how thin the evidence for anything broader is."
  - After: "None of them is a standardised assessment, and the listing says so itself: IQ test, memory test and other results are estimates based on app activities, not medical, psychological, clinical or professional diagnostic assessments. The listing documents no norm group, everything is taken unsupervised, and improvement in them is evidence about the practised task and nothing wider — the cornerstone guide [do brain training apps work](/blog/do-brain-training-apps-work/) sets out how thin the evidence for anything broader is."

#### `inductive-reasoning-examples` (education-brain)

- Published 2026-09-22; updated 2026-09-22 → 2026-10-02. Flagged in section H2: none (additional corrections).
- **Correction note:** This article said our app, then called Mental Math & Memory Games, had no logic items and nothing that assesses reasoning; the app, now IQ Test & Brain Training Games, lists logic games built on analogies, sequences, conditional reasoning, deduction and patterns and an IQ-style test covering logic and numerical reasoning, whose results its Google Play listing calls estimates rather than clinical or professional assessments, and the article now says so.

- *body line 169*
  - Before: "Our own app, Mental Math & Memory Games, ships no logic items and nothing that assesses reasoning. It does ship a **Number Pattern Challenge** mode that generates fresh rule-finding items at three difficulty settings, which is useful here for one reason: because the items are generated rather than drawn from a fixed list, you cannot recognise them, so you have to run the inference each time."
  - After: "Our own app, IQ Test & Brain Training Games, has logic games built on analogies, sequences, conditional reasoning, deduction and patterns, and an IQ-style test that covers logic and numerical reasoning; its listing describes the test's results as estimates based on app activities, not clinical or professional assessments. It also ships a **Number Pattern Challenge** mode that generates fresh rule-finding items at three difficulty settings, which is useful here for one reason: because the items are generated rather than drawn from a fixed list, you cannot recognise them, so you have to run the inference each time."

#### `interference-and-forgetting` (education-brain)

- Published 2026-09-22; updated 2026-09-22 → 2026-10-02. Flagged in section H2: line 154 (rewritten).
- **Correction note:** This article said our app, then called Mental Math & Memory Games, contained no assessment of any kind; the app, now IQ Test & Brain Training Games, also has a memory test, a reaction time test and an IQ-style test whose results its Google Play listing calls estimates rather than clinical or professional assessments, and the article now says so.

- *body line 154*
  - Before: "None of these is a test. The app records score, accuracy, streak, response time and personal bests, and it contains no assessment of any kind."
  - After: "These are game modes. Alongside them the app keeps personal bests, accuracy, streaks and response speed, and it also has a memory test, a reaction time test and an IQ-style test whose results its listing describes as estimates based on app activities, not clinical or professional assessments."

#### `interleaving-versus-blocked-practice` (education-brain)

- Published 2026-09-22; updated 2026-09-22 → 2026-10-02. Flagged in section H2: none (additional corrections).
- **Correction note:** This article said the full list of modes in our app, then called Mental Math & Memory Games, is on its app page; that page, now for IQ Test & Brain Training Games, describes the app without listing individual modes, and the sentence now points there only for a description of the app.

- *body line 156*
  - Before: "More on session design sits in the [brain training games hub](/blog/topics/brain-training-games/), the full list of modes is on the [Mental Math & Memory Games app page](/apps/mental-math-memory-games/), and related writing is collected in the [education and brain category](/blog/category/education-brain/)."
  - After: "More on session design sits in the [brain training games hub](/blog/topics/brain-training-games/), the app itself is described on the [IQ Test & Brain Training Games app page](/apps/mental-math-memory-games/), and related writing is collected in the [education and brain category](/blog/category/education-brain/)."

#### `iq-and-emotional-intelligence` (education-brain)

- Published 2026-09-22; updated 2026-09-22 → 2026-10-02. Flagged in section H2: line 55 (rewritten), line 74 (rewritten), line 142 (rewritten).
- **Correction note:** This article said our app, then called Mental Math & Memory Games, contained no personality content and no assessment of any kind; the app, now IQ Test & Brain Training Games, includes a personality questionnaire with a Big Five profile, an IQ-style test and a memory test, whose results its Google Play listing calls estimates rather than clinical or professional assessments, and the article now says so while noting that the listing describes no emotional-intelligence content.

- *takeaway*
  - Before: "Mental Math & Memory Games contains no emotional-intelligence content, no personality content and no assessment of any kind."
  - After: "Treat the personality questionnaire and Big Five profile in our own app, IQ Test & Brain Training Games, as self-reflection, which is how its listing presents them: the listing describes no emotional-intelligence content and calls the app's results estimates based on app activities, not clinical or professional assessments."
- *FAQ 4 ("Does IQ Test & Brain Training Games include any EQ or personality content?")*
  - Before: "No. The app has no emotional-intelligence content, no personality questionnaire and no assessment of any kind. It is an educational game containing arithmetic drills across the four operations and mixed practice, memory rounds using numbers, sequences, grids and delayed recall, a library of calculation techniques, and progress tracking for score, accuracy, streak and response time."
  - After: "It has personality content, and its Google Play listing describes no emotional-intelligence content. The personality questionnaire uses original questions with dimension-based results about thinking style, communication, planning and decision making, plus a Big Five profile, and the listing presents it as self-reflection rather than diagnosis. The listing describes those results, like the results of the app's IQ-style test and memory test, as estimates based on app activities, not psychological, clinical or professional diagnostic assessments."
- *body line 140 (heading)*
  - Before: "## What this app does not contain"
  - After: "## Where our own app fits"
- *body line 142*
  - Before: "Mental Math & Memory Games is our own app, built by Reign Creative, and it contains no emotional-intelligence content, no personality content and no assessment of any kind. It is an educational game: arithmetic drills across multiplication, addition, subtraction, division and mixed operations; memory rounds built on numbers, sequences, grids and delayed recall; a library of 49 calculation techniques with worked examples; and tracking of score, accuracy, streak, response time and personal bests."
  - After: "IQ Test & Brain Training Games is our own app, built by Reign Creative. Its Google Play listing describes no emotional-intelligence content, but the app does include personality content: a personality questionnaire with original questions and dimension-based results about thinking style, communication, planning and decision making, plus a Big Five profile, which the listing presents as self-reflection rather than diagnosis and does not present as a measure of emotional intelligence. Alongside them sit an IQ-style test covering numerical reasoning, logic, patterns, vocabulary, working memory, spatial reasoning and processing speed, a memory test, a reaction time test, and memory, logic, vocabulary, focus and mental math games, with personal bests, accuracy, streaks, response speed and an assessment history tracked over time."
- *body (added)*
  - Before: (nothing — added)
  - After: "The listing calls those results — IQ test, personality test, memory test and the rest — estimates based on app activities, not medical, psychological, clinical, educational-placement, employment or professional diagnostic assessments. The three questions in the previous section apply to them as well: the personality questionnaire is a self-report, and the listing offers it for reflection rather than for any decision about you."

#### `iq-score-ranges-and-bands` (education-brain)

- Published 2026-09-22; updated 2026-09-22 → 2026-10-02. Flagged in section H2: none (additional corrections).
- **Correction note:** This article said our app, then called Mental Math & Memory Games, produced no bands, no percentile and no classification of any kind and recorded only session statistics; the app, now IQ Test & Brain Training Games, includes an IQ-style test whose results its Google Play listing calls estimates rather than clinical or professional assessments, and the article now says that instead of describing what the app does not show.

- *takeaway*
  - Before: "Mental Math & Memory Games produces no bands, no score chart and no classification of any kind. It reports points, accuracy, streak and response time for a practice run."
  - After: "IQ Test & Brain Training Games, our own app, includes an IQ-style test, and its listing describes the results as estimates based on app activities, not a clinical or professional assessment — so any figure it shows deserves more caution than a band on a publisher's chart, not less."
- *FAQ 4 ("Does the IQ Test & Brain Training Games app place you in a band?")*
  - Before: "No. The app produces no bands, no score chart, no percentile and no classification. It records score, accuracy, streak, response time and personal bests for the mode and difficulty you played, and those are game statistics about a practice session rather than positions in any distribution."
  - After: "Its Google Play listing does not describe bands, a score chart or a classification. It does include an IQ-style test, and the listing states that IQ test and other results are estimates based on app activities, not medical, psychological, clinical or professional diagnostic assessments. Whatever result the app shows, read it as a record of how you did on its own questions, not as a position in a norm sample."
- *body line 157 (heading)*
  - Before: "## What our app does instead"
  - After: "## Where our own app fits"
- *body line 159*
  - Before: "[Mental Math & Memory Games](/apps/mental-math-memory-games/) is our own app, built by Reign Creative, and the honest statement about it belongs here in plain words: **it produces no bands, no score chart and no classification of any kind.**"
  - After: "[IQ Test & Brain Training Games](/apps/mental-math-memory-games/) is our own app, built by Reign Creative, and the honest statement about it belongs here in plain words: **it includes an IQ-style test, and its listing calls the results estimates based on app activities, not a clinical or professional assessment.**"
- *body line 161*
  - Before: "There is no percentile, no descriptive label, no range chart, and no comparison with any population. What the app records is what happened in a session: points scored, accuracy on the questions it asked, the longest unbroken streak, response time, and personal bests for each mode. Those numbers describe a run of Multiplication Rush or a set of number-memory rounds."
  - After: "Its listing does not say whether, or how, a result is placed on a scale, and it documents no comparison group, so you cannot check a result against the standards this article describes. What the listing does describe is a record against your own history: personal bests, accuracy, streaks, response speed and an assessment history. Those numbers describe how you did on the app's own questions."
- *body line 163*
  - Before: "That distinction is deliberate, and it is the same one drawn throughout this series."
  - After: "That distinction is the same one drawn throughout this series, and the listing's own disclaimer places the app's results on the practice side of it."

#### `judging-your-own-recall` (education-brain)

- Published 2026-09-22; updated 2026-09-22 → 2026-10-02. Flagged in section H2: none (additional corrections).
- **Correction note:** This article described what our app, then called Mental Math & Memory Games, records as containing no assessment; the app, now IQ Test & Brain Training Games, also has a memory test and an IQ-style test whose results its Google Play listing calls estimates rather than clinical or professional assessments, and the article now says so.

- *body line 157*
  - Before: "One caveat we would rather state than imply: the app records score, accuracy, streak, response time and personal bests, and nothing in that list is an assessment."
  - After: "One caveat we would rather state than imply: in its flash-card and drill modes the app records score, accuracy, streak, response time and personal bests, and nothing in that list is an assessment. The app's separate memory test and IQ-style test produce results its Google Play listing calls estimates based on app activities, not clinical or professional assessments."

#### `lattice-and-line-multiplication` (education-brain)

- Published 2026-09-22; updated 2026-09-22 → 2026-10-02. Flagged in section H2: none (additional corrections).
- **Correction note:** This article said the full catalogue of our app, then called Mental Math & Memory Games and now IQ Test & Brain Training Games, is on its app page; that page describes the app's games and tests without listing individual modes or techniques, and the sentence now points to it only for that description.

- *body line 180*
  - Before: "The full catalogue is on the [Mental Math & Memory Games app page](/apps/mental-math-memory-games/)."
  - After: "The app itself is described on the [IQ Test & Brain Training Games app page](/apps/mental-math-memory-games/)."

#### `left-to-right-addition` (education-brain)

- Published 2026-09-22; updated 2026-09-22 → 2026-10-02. Flagged in section H2: none (additional corrections).
- **Correction note:** This article said the drills it names in our app, then called Mental Math & Memory Games, are listed on the app page; that page, for the app now named IQ Test & Brain Training Games, describes its features without naming individual drills, so the sentence now simply points to it.

- *body line 170*
  - Before: "The drills named above are listed on the [Mental Math & Memory Games app page](/apps/mental-math-memory-games/)."
  - After: "The app itself is described on the [IQ Test & Brain Training Games app page](/apps/mental-math-memory-games/)."

#### `limitations-of-iq-testing` (education-brain)

- Published 2026-09-22; updated 2026-09-22 → 2026-10-02. Flagged in section H2: line 157 (rewritten).
- **Correction note:** This article said our app, then called Mental Math & Memory Games, reported only task performance and contained no IQ estimate, percentile, classification, brain-age figure or assessment of any kind; the app, now IQ Test & Brain Training Games, includes an IQ-style test, a memory test, a reaction time test and a personality questionnaire whose results its Google Play listing calls estimates rather than clinical or professional assessments, and the article now applies its limits to those results.

- *FAQ question 4*
  - Before: "Why does a practice app report only task performance?"
  - After: "How should you read the results in IQ Test & Brain Training Games?"
- *FAQ 4 ("How should you read the results in IQ Test & Brain Training Games?")*
  - Before: "Because that is the only thing it has any basis for reporting. Mental Math & Memory Games has no norm sample, no standardised conditions, no technical manual and no validity evidence, so it produces no score that could be interpreted as a measurement. It records what happened in a session — score, accuracy, streak, response time and personal bests."
  - After: "As estimates, not measurements of the kind this article describes. The app includes an IQ-style test, a memory test and a reaction time test, and its Google Play listing calls their results estimates based on app activities, not medical, psychological, clinical or professional diagnostic assessments. The listing cites no norm sample, technical manual or validity evidence, and a test taken on your phone has no standardised conditions, so every limit above applies with more force, not less."
- *body line 153 (heading)*
  - Before: "## Why our app reports task performance and nothing else"
  - After: "## What the limits mean for our own app"
- *body line 155*
  - Before: "[Mental Math & Memory Games](/apps/mental-math-memory-games/) is our own app, built by Reign Creative, and the limits above are the reason it makes no measurement claim at all."
  - After: "[IQ Test & Brain Training Games](/apps/mental-math-memory-games/) is our own app, built by Reign Creative, and it includes an IQ-style test, so the limits above apply to it directly."
- *body line 157*
  - Before: "It has no norm sample, no standardised administration, no technical manual, no published reliability evidence and no validity studies. Lacking every one of those, there is nothing it could honestly convert its numbers into. So it does not: there is no IQ estimate, no percentile, no classification, no brain-age figure and no assessment of any kind in the product."
  - After: "Its IQ-style test covers numerical reasoning, logic, patterns, vocabulary, working memory, spatial reasoning and processing speed, and the app also has a memory test, a reaction time test and a personality questionnaire. Its Google Play listing states that these results are estimates based on app activities, not medical, psychological, clinical, educational-placement, employment or professional diagnostic assessments. The listing cites no norm sample, technical manual, reliability evidence or validity studies, and a test taken on a phone has no standardised administration, so a result from it carries every limit described above and should be read as an estimate from the app's own questions, never as a score to base a decision on."
- *body line 159*
  - Before: "What it reports is what it can defend — score, accuracy, streak, response time and personal bests for a run of Multiplication Rush, Mixed Operations, a memory round set or a Daily Challenge."
  - After: "Its games report accuracy, streaks, response speed and personal bests against your own history."
- *body line 159*
  - Before: "Keeping them clearly apart from **standardised psychological assessment** is not a disclaimer bolted on afterwards; it is the reason the numbers are trustworthy for what they do cover."
  - After: "Keeping them, and the test estimates, clearly apart from **standardised psychological assessment** is not a disclaimer bolted on afterwards; it is the only honest way to read them."

#### `logic-grid-puzzles` (education-brain)

- Published 2026-09-22; updated 2026-09-22 → 2026-10-02. Flagged in section H2: none (additional corrections).
- **Correction note:** This article said our app, then called Mental Math & Memory Games, offered only arithmetic and memory drills with nothing resembling a deduction puzzle and made no claims beyond its drill statistics; the app, now IQ Test & Brain Training Games, has logic games built on deduction, conditional reasoning and rule discovery and an IQ-style test whose results its Google Play listing calls estimates, and the article now says so while noting that the listing describes no logic grid mode.

- *takeaway*
  - Before: "Mental Math & Memory Games has no logic grid mode. The nearest thing in the app is rule-finding in its number pattern and missing number drills, which is a different task."
  - After: "Our own app, IQ Test & Brain Training Games, has logic games built on deduction, conditional reasoning and rule discovery, plus puzzle games, but its listing does not describe a logic grid mode, so practise the grid method itself with puzzles built for it."
- *FAQ 5 ("Does IQ Test & Brain Training Games have logic grid puzzles?")*
  - Before: "No. The app ships arithmetic and memory drills, including number pattern and missing number modes that involve rule finding, but it contains no logic grid mode, no zebra puzzles and no verbal deduction items. This article is here for the reader rather than as a description of the product."
  - After: "Its Google Play listing does not describe a logic grid mode. It does describe logic games built on deduction, conditional reasoning, analogies and rule discovery, puzzle games for planning and problem solving, and an IQ-style test that covers logic, so the app exercises related reasoning. For the grid method itself, use puzzles built in that format; this article is here for the reader rather than as a description of the product."
- *body line 107*
  - Before: "Mental Math & Memory Games, which we build at Reign Creative, has **no logic grid mode**. It ships arithmetic and memory drills, including number pattern and missing number puzzles that involve finding a rule, and nothing in it resembles the puzzle below."
  - After: "IQ Test & Brain Training Games, which we build at Reign Creative, has logic games built on deduction, conditional reasoning and rule discovery, and puzzle games, but its Google Play listing does not describe a **logic grid mode**, and nothing below is taken from the app."
- *body line 180*
  - Before: "For practice that does exist in our app rather than in this article, the number pattern and missing number drills on the [Mental Math & Memory Games app page](/apps/mental-math-memory-games/) exercise rule-finding under a timer, and the untimed accuracy mode with its explanations is the better fit if you want to slow down and check your reasoning. Neither is a logic grid, and neither is a test of anything — the app records score, accuracy, streak and response time on its own drills and makes no claims beyond that."
  - After: "For practice that does exist in our app rather than in this article, the logic games in [IQ Test & Brain Training Games](/apps/mental-math-memory-games/) work on deduction, conditional reasoning and rule discovery, though its listing does not describe any of them as a logic grid. Its IQ-style test also covers logic, and the listing describes the results as estimates based on app activities, not a clinical or professional assessment."

#### `math-anxiety-in-adults` (education-brain)

- Published 2026-09-22; updated 2026-09-22 → 2026-10-02. Flagged in section H2: line 145 (rewritten).
- **Correction note:** This article said our app, then called Mental Math & Memory Games, assessed nothing, produced no test result and made no claim about intelligence, and that its app page showed the features named here; the app, now IQ Test & Brain Training Games, includes an IQ-style test, a memory test and a personality questionnaire whose results its Google Play listing calls estimates rather than clinical or professional assessments, and the article now says so while keeping that the app diagnoses and treats nothing.

- *body line 145*
  - Before: "The app does not diagnose, assess or treat anything, produces no test result, and makes no claim about intelligence or about anxiety. It records score, accuracy, streak, response time and personal bests on its own drills."
  - After: "The app does not diagnose or treat anything, anxiety included. It does include an IQ-style test, a memory test and a personality questionnaire, and its listing describes their results as estimates based on app activities, not medical, psychological, clinical or professional diagnostic assessments. Its drills record score, accuracy, streak, response time and personal bests."
- *body line 149*
  - Before: "You can see what ships on the [Mental Math & Memory Games app page](/apps/mental-math-memory-games/)."
  - After: "The app itself is described on the [IQ Test & Brain Training Games app page](/apps/mental-math-memory-games/)."

#### `matrix-reasoning-puzzles` (education-brain)

- Published 2026-09-22; updated 2026-09-22 → 2026-10-02. Flagged in section H2: line 76 (rewritten).
- **Correction note:** This article said our app, then called Mental Math & Memory Games, covered only arithmetic and memory, assessed nothing and contained no matrix or figural items; the app, now IQ Test & Brain Training Games, lists an IQ-style test covering patterns and spatial reasoning and logic games built on patterns and rule discovery, with results its Google Play listing calls estimates rather than clinical or professional assessments, so the article now says that and notes that the listing does not say whether the matrix format is included.

- *takeaway*
  - Before: "Mental Math & Memory Games contains no matrix items and no figural items of any kind; its Number Pattern Challenge rehearses rule-finding in one dimension instead."
  - After: "If you practise in our own app, IQ Test & Brain Training Games, its listing describes pattern, sequence and rule-discovery games and an IQ-style test covering patterns and spatial reasoning, but it does not say whether any of them uses the three-by-three format described here."
- *FAQ 4 ("Does IQ Test & Brain Training Games have matrix puzzles?")*
  - Before: "No. The app ships no matrix items, no shape items and no figural items at all. Its catalogue is arithmetic and memory, and the closest thing to rule discovery is the Number Pattern Challenge, which asks you to find the rule behind a run of numbers. That rehearses the same habit in one dimension, but it is not a matrix puzzle and the app is not an assessment of any kind."
  - After: "Its Google Play listing does not say. The listing describes an IQ-style test covering numerical reasoning, logic, patterns, vocabulary, working memory, spatial reasoning and processing speed, and logic games with analogies, sequences, conditional reasoning, deduction, patterns and rule discovery, but it does not describe the three-by-three format explained here. It calls the app's test results estimates based on app activities, not clinical or professional assessments."
- *body line 104*
  - Before: "Mental Math & Memory Games, which is our own app, contains no matrix items and no figural items of any kind. Its catalogue is arithmetic and memory practice, and nothing in it assesses anything. If you came here looking for matrix practice inside our app, it is not there, and this article is written to explain the format rather than to sell anything."
  - After: "IQ Test & Brain Training Games, which is our own app, includes an IQ-style test whose listed areas include patterns and spatial reasoning, and logic games built around sequences, patterns and rule discovery, but its Google Play listing does not say whether any of them uses the three-by-three matrix format, and it calls the test results estimates rather than clinical or professional assessments. If you came here looking for matrix practice specifically, we cannot point you to it from the listing, and this article is written to explain the format rather than to sell anything."

#### `missing-number-problems` (education-brain)

- Published 2026-09-22; updated 2026-09-22 → 2026-10-02. Flagged in section H2: none (additional corrections).
- **Correction note:** This article said the drill modes it names could be seen on our app's page; that page, for the app now called IQ Test & Brain Training Games (previously Mental Math & Memory Games), describes how the app works and how progress is tracked without naming individual drills, and the sentence now says so.

- *body line 168*
  - Before: "You can see the drill modes and how progress is recorded on the [Mental Math & Memory Games app page](/apps/mental-math-memory-games/), and the rest of our writing on arithmetic and reasoning sits in the [education and brain training section](/blog/category/education-brain/)."
  - After: "You can see how the app works and how progress is tracked on the [IQ Test & Brain Training Games app page](/apps/mental-math-memory-games/), and the rest of our writing on arithmetic and reasoning sits in the [education and brain training section](/blog/category/education-brain/)."

#### `mnemonic-systems-for-numbers` (education-brain)

- Published 2026-09-22; updated 2026-09-22 → 2026-10-02. Flagged in section H2: line 159 (rewritten).
- **Correction note:** This article said our app, then called Mental Math & Memory Games, offered no assessment, no test and no interpretation of your results, and pointed to a full mode list on its app page; the app, now IQ Test & Brain Training Games, includes an IQ-style test, a memory test and a personality questionnaire whose results its Google Play listing calls estimates rather than clinical or professional assessments, and the article now says so and points to the app page's general description instead.

- *body line 159*
  - Before: "It records score, accuracy, streak, response time and personal bests on its own drills. It offers no assessment, no test and no interpretation of what your numbers say about you — practice and entertainment on one side, standardised psychological assessment on the other, and nothing in the product crosses that line. You can see the full mode list on the [Mental Math & Memory Games app page](/apps/mental-math-memory-games/), read the rest of this subject in the [memory and attention hub](/blog/topics/memory-and-attention/), and browse related writing in the [education and brain section](/blog/category/education-brain/)."
  - After: "Its drills record score, accuracy, streak, response time and personal bests. The app also includes an IQ-style test, a memory test and a personality questionnaire, and its Google Play listing calls their results estimates based on app activities, not medical, psychological, clinical or professional diagnostic assessments — practice and entertainment on one side, standardised psychological assessment on the other, and by its own listing's account nothing in the product is the second. You can read a description of the app on the [IQ Test & Brain Training Games app page](/apps/mental-math-memory-games/), read the rest of this subject in the [memory and attention hub](/blog/topics/memory-and-attention/), and browse related writing in the [education and brain section](/blog/category/education-brain/)."

#### `multiplying-by-five-and-twenty-five` (education-brain)

- Published 2026-09-22; updated 2026-09-22 → 2026-10-02. Flagged in section H2: none (additional corrections).
- **Correction note:** This article said the full catalogue of our app, then called Mental Math & Memory Games, is on its app page; that page describes the app, now IQ Test & Brain Training Games, without listing its individual drills or technique library, and the article now says only that the app is described there.

- *body line 176*
  - Before: "The full catalogue is on the [Mental Math & Memory Games app page](/apps/mental-math-memory-games/)."
  - After: "The app itself is described on the [IQ Test & Brain Training Games app page](/apps/mental-math-memory-games/)."

#### `multiplying-by-nine-and-ninety-nine` (education-brain)

- Published 2026-09-22; updated 2026-09-22 → 2026-10-02. Flagged in section H2: none (additional corrections).
- **Correction note:** This article said the full catalogue of our app, then called Mental Math & Memory Games, is on its app page; that page, now for IQ Test & Brain Training Games, describes the app without listing individual drills or techniques, and the sentence now points there only for a description of the app.

- *body line 174*
  - Before: "The full catalogue is on the [Mental Math & Memory Games app page](/apps/mental-math-memory-games/)."
  - After: "The app itself is described on the [IQ Test & Brain Training Games app page](/apps/mental-math-memory-games/)."

#### `n-back-tasks-explained` (education-brain)

- Published 2026-09-22; updated 2026-09-22 → 2026-10-02. Flagged in section H2: none (additional corrections).
- **Correction note:** This article said the full mode list of our app, then called Mental Math & Memory Games and now IQ Test & Brain Training Games, is on its app page; that page describes the app's games and tests without listing individual modes, and the sentence now points to it only for that description.

- *body line 160*
  - Before: "The full mode list is on the [Mental Math & Memory Games app page](/apps/mental-math-memory-games/), and the rest of the [education and brain training category](/blog/category/education-brain/) covers the arithmetic side of the same app."
  - After: "The app itself is described on the [IQ Test & Brain Training Games app page](/apps/mental-math-memory-games/), and the rest of the [education and brain training category](/blog/category/education-brain/) covers the arithmetic side of the same app."

#### `nonverbal-reasoning-tests-explained` (education-brain)

- Published 2026-09-22; updated 2026-09-22 → 2026-10-02. Flagged in section H2: line 138 (rewritten).
- **Correction note:** This article said our app, then called Mental Math & Memory Games, had no figural, shape or matrix items, offered only arithmetic, memory and technique content, and was not an assessment and produced no percentile, band or classification; the app, now IQ Test & Brain Training Games, includes an IQ-style test covering patterns and spatial reasoning and logic games built on sequences and patterns, with results its Google Play listing calls estimates rather than clinical or professional assessments, and the article now says the listing does not describe item formats instead of claiming the app has none.

- *takeaway*
  - Before: "Mental Math & Memory Games contains no figural, shape or matrix items of any kind, so nothing in it is a nonverbal reasoning test."
  - After: "IQ Test & Brain Training Games, our own app, has an IQ-style test that covers patterns and spatial reasoning among other areas, but its listing does not describe the item formats and calls the results estimates based on app activities, so check the items yourself before treating it as nonverbal reasoning practice."
- *FAQ 4 ("Does IQ Test & Brain Training Games include nonverbal reasoning items?")*
  - Before: "No. The app has no figural, shape, matrix or diagram items. Its content is arithmetic practice across the four operations plus mixed drills, memory rounds built on numbers, sequences, grids of positions and delayed recall, and a library of calculation techniques. If you are looking specifically for figural reasoning practice, this is not the app for it, and saying so is more useful than implying otherwise."
  - After: "Its listing does not say. The app's IQ-style test covers numerical reasoning, logic, patterns, vocabulary, working memory, spatial reasoning and processing speed, and its logic games include sequences and patterns, but the listing does not describe item formats such as figural series, matrices or diagrams, so we do not claim them. If figural reasoning practice is specifically what you need, look at the items in the app itself, or at a product built for that purpose, before relying on it."
- *body line 136 (heading)*
  - Before: "## Does this app contain nonverbal reasoning items? No"
  - After: "## Does this app contain nonverbal reasoning items?"
- *body line 138*
  - Before: "Mental Math & Memory Games is our own app, built by Reign Creative, and it ships no figural, shape, matrix or diagram items at all. Its content is arithmetic practice across multiplication, addition, subtraction, division and mixed operations; memory rounds built on numbers, sequences, grids of positions and delayed recall; a library of 49 calculation techniques with worked examples; and progress tracking covering score, accuracy, streak, response time and personal bests. It is an educational game, not an assessment, and it produces no percentile, band or classification of any kind."
  - After: "IQ Test & Brain Training Games is our own app, built by Reign Creative. Its IQ-style test covers numerical reasoning, logic, patterns, vocabulary, working memory, spatial reasoning and processing speed, and around it sit logic games built on analogies, sequences, conditional reasoning, deduction and patterns, plus memory, focus, vocabulary and mental math games. Its listing does not describe the item formats, so we cannot tell you whether any of them is a figural series or a matrix, and we do not claim that they are. What the listing does say is that IQ test and other results are estimates based on app activities, not medical, psychological, clinical, educational-placement, employment or professional diagnostic assessments — so whatever result the app shows is not a nonverbal reasoning score in the sense this article describes."
- *body line 140*
  - Before: "That is a limitation stated plainly rather than a disclaimer buried at the bottom. If nonverbal reasoning practice is what you need, look for a product built for it. If arithmetic fluency and memory span practice is what you need, the [app page](/apps/mental-math-memory-games/) describes the modes."
  - After: "That is the honest position, stated plainly rather than buried at the bottom. If figural reasoning practice is specifically what you need, check the item formats yourself or look for a product built for it. The [app page](/apps/mental-math-memory-games/) describes what the app covers."

#### `number-bonds-and-making-tens` (education-brain)

- Published 2026-09-22; updated 2026-09-22 → 2026-10-02. Flagged in section H2: none (additional corrections).
- **Correction note:** This article said the drills it names from our app, then called Mental Math & Memory Games and now IQ Test & Brain Training Games, are on its app page; that page describes the app's games and tests without listing individual drills, and the sentence now points to it only for that description.

- *body line 186*
  - Before: "The three moves underneath almost every mental method are set out in [our mental math practice guide](/blog/mental-math-training-guide/); more methods sit in the [mental math hub](/blog/topics/mental-math/) and across the [education and brain category](/blog/category/education-brain/), and the drills named above are on the [Mental Math & Memory Games app page](/apps/mental-math-memory-games/)."
  - After: "The three moves underneath almost every mental method are set out in [our mental math practice guide](/blog/mental-math-training-guide/); more methods sit in the [mental math hub](/blog/topics/mental-math/) and across the [education and brain category](/blog/category/education-brain/), and the app itself is described on the [IQ Test & Brain Training Games app page](/apps/mental-math-memory-games/)."

#### `number-sequence-puzzles-explained` (education-brain)

- Published 2026-09-22; updated 2026-09-22 → 2026-10-02. Flagged in section H2: none (additional corrections).
- **Correction note:** This article said our app, then called Mental Math & Memory Games, had one drill for this skill, numeric pattern work only, no figural, matrix or logic-grid items, was not an assessment and made no claim about intelligence; the app, now IQ Test & Brain Training Games, has logic games built on sequences, patterns and rule discovery and an IQ-style test whose results its Google Play listing calls estimates rather than professional assessments, and the article now says so without claiming which item formats it uses.

- *body line 159*
  - Before: "Mental Math & Memory Games, our own app built by Reign Creative, ships one drill aimed squarely at this skill: Number Pattern Challenge, a 75-second mode with Easy, Medium and Hard settings in which you identify a rule and supply a missing value."
  - After: "IQ Test & Brain Training Games, our own app built by Reign Creative, ships a drill aimed squarely at this skill: Number Pattern Challenge, a 75-second mode with Easy, Medium and Hard settings in which you identify a rule and supply a missing value. Its listing also describes logic games built on sequences, patterns and rule discovery, and an IQ-style test that covers patterns."
- *body line 159*
  - Before: "To be plain about the limits: the app's pattern work is numeric only. There are no shape or figural items, no matrix grids and no logic-grid puzzles in it, so it is practice for one dimension of this subject rather than all of it. It is also a game, not an assessment — it records score, accuracy, streak and response time on its own drills and makes no claim about intelligence. You can see the full mode list on the [Mental Math & Memory Games app page](/apps/mental-math-memory-games/), and the wider question of what a reasoning score does and does not represent is covered in [what IQ tests actually measure](/blog/what-iq-tests-actually-measure/)."
  - After: "To be plain about the limits: its listing does not say whether any of its pattern items are figural, matrix or logic-grid puzzles, so do not assume it covers every format in this subject. Its IQ-style test results are, in the listing's words, estimates based on app activities, not medical, psychological, clinical or professional diagnostic assessments, so a result there is a record of how you did on the app's own questions. The app itself is described on the [IQ Test & Brain Training Games app page](/apps/mental-math-memory-games/), and the wider question of what a reasoning score does and does not represent is covered in [what IQ tests actually measure](/blog/what-iq-tests-actually-measure/)."

#### `numerical-reasoning-tests-explained` (education-brain)

- Published 2026-09-22; updated 2026-09-22 → 2026-10-02. Flagged in section H2: line 156 (rewritten).
- **Correction note:** This article said our app, then called Mental Math & Memory Games, drilled only the calculation layer, presented no data tables, made no assessment of any kind and listed its drills on its app page; the app, now IQ Test & Brain Training Games, includes an IQ-style test covering numerical reasoning whose results its Google Play listing calls estimates rather than clinical or professional assessments, and the article now says so, notes that the listing describes no data-table items and points to the app page only for a description of the app.

- *body line 154*
  - Before: "Mental Math & Memory Games is our own app, built by Reign Creative, and it drills the calculation layer rather than the test."
  - After: "IQ Test & Brain Training Games is our own app, built by Reign Creative. Its mental math practice drills the calculation layer, and its IQ-style test includes numerical reasoning among the areas it covers."
- *body line 156*
  - Before: "What it does not do is present a data table and ask what follows from it, and it makes no assessment of any kind. It is an educational game that practises arithmetic, and the honest claim is that fluent arithmetic is a prerequisite for numerical reasoning rather than a substitute for practising the real format."
  - After: "Its listing does not describe data-table items of the kind above, and it says the IQ-style test's results are estimates based on app activities, not clinical or professional assessments, so neither the drills nor that test stands in for the real table-reading format. The honest claim is that fluent arithmetic is a prerequisite for numerical reasoning rather than a substitute for practising the real format."
- *body line 158*
  - Before: "More on item types, scoring and limits sits in the [IQ tests and reasoning hub](/blog/topics/iq-tests-and-reasoning/); the [education and brain category](/blog/category/education-brain/) collects the arithmetic and memory material; and the drills are listed on the [Mental Math & Memory Games app page](/apps/mental-math-memory-games/)."
  - After: "More on item types, scoring and limits sits in the [IQ tests and reasoning hub](/blog/topics/iq-tests-and-reasoning/); the [education and brain category](/blog/category/education-brain/) collects the arithmetic and memory material; and the app itself is described on the [IQ Test & Brain Training Games app page](/apps/mental-math-memory-games/)."

#### `odd-one-out-puzzles` (education-brain)

- Published 2026-09-22; updated 2026-09-22 → 2026-10-02. Flagged in section H2: none (additional corrections).
- **Correction note:** This article said our app, then called Mental Math & Memory Games, covered only arithmetic and memory, assessed nothing, had nothing that asks you to categorise and offered a numerical comparison drill as its nearest relative to odd-one-out; the app, now IQ Test & Brain Training Games, lists vocabulary games on verbal relationships, logic games built on patterns and an IQ-style test whose results its Google Play listing calls estimates rather than clinical or professional assessments, and the article now says so and that the listing does not describe an odd-one-out mode.

- *takeaway*
  - Before: "Mental Math & Memory Games has no word or shape odd-one-out mode; the nearest thing it ships is a timed numerical comparison drill."
  - After: "Our own app, IQ Test & Brain Training Games, lists vocabulary games on word meaning and verbal relationships and logic games built on patterns, but its listing does not describe an odd-one-out mode as such."
- *FAQ 4 ("Does the app have odd one out puzzles?")*
  - Before: "No. Mental Math & Memory Games has no word odd-one-out and no shape odd-one-out. Its closest mode is Compare Numbers Fast, a timed drill on judging which of two numbers is larger, which trains the numerical comparison underneath rather than the categorisation task itself. The app is arithmetic and memory practice, and it assesses nothing."
  - After: "The Google Play listing for IQ Test & Brain Training Games does not describe an odd-one-out mode. The nearest things it lists are vocabulary games on synonyms, antonyms, word meaning and verbal relationships, logic games built on analogies, patterns and rule discovery, and an IQ-style test covering logic, patterns, vocabulary and spatial reasoning. The listing calls the test's results estimates based on app activities, not clinical or professional assessments."
- *body line 164*
  - Before: "Being direct about it: Mental Math & Memory Games, our own app, ships no word odd-one-out and no shape odd-one-out. Nothing in its catalogue asks you to categorise. The nearest relative is **Compare Numbers Fast**, a timed multiple-choice drill on judging which of two numbers is larger, which sharpens the numerical comparison that sits underneath a numeric odd-one-out without being that task. The full mode list and the progress statistics the app records are on the [Mental Math & Memory Games app page](/apps/mental-math-memory-games/)."
  - After: "Being direct about it: the Google Play listing for IQ Test & Brain Training Games, our own app, does not describe an odd-one-out mode. What it does list nearby are vocabulary games on synonyms, antonyms, word meaning and verbal relationships, logic games built on analogies, patterns and rule discovery, and an IQ-style test whose areas include logic, patterns, vocabulary and spatial reasoning; the listing calls the test's results estimates based on app activities, not clinical or professional assessments. The app's games, tests and progress tracking are described on the [IQ Test & Brain Training Games app page](/apps/mental-math-memory-games/)."

#### `paired-associate-learning` (education-brain)

- Published 2026-09-22; updated 2026-09-22 → 2026-10-02. Flagged in section H2: line 57 (rewritten), line 159 (rewritten).
- **Correction note:** This article said our app, then called Mental Math & Memory Games, contained no test or assessment of any kind and recorded nothing beyond its drill statistics; the app, now IQ Test & Brain Training Games, includes a memory test and an IQ-style test whose results its Google Play listing calls estimates rather than clinical or professional assessments, and the article now says so.

- *takeaway*
  - Before: "Mental Math & Memory Games includes Letter Pairs and Letter-Number Pairs rounds as part of its memory catalogue; they are game modes, not an assessment, and the app contains no test of any kind."
  - After: "IQ Test & Brain Training Games, our own app, includes letter-based memory games whose results are game statistics; its memory test and IQ-style test are separate, and its listing describes their results as estimates based on app activities, not clinical or professional assessments."
- *body line 159*
  - Before: "Second, the app records score, accuracy, streak, response time and personal bests, and nothing more. It contains no assessment of any kind, and a pair-drill result is a game statistic rather than a measurement of associative memory."
  - After: "Second, a pair-drill result is a game statistic — score, accuracy, streak, response time and personal bests — rather than a measurement of associative memory. The app does include a memory test and an IQ-style test, and its listing describes their results as estimates based on app activities, not clinical or professional assessments."

#### `percentiles-and-standard-scores` (education-brain)

- Published 2026-09-22; updated 2026-09-22 → 2026-10-02. Flagged in section H2: none (additional corrections).
- **Correction note:** This article said our app, then called Mental Math & Memory Games, held no comparison group and reported no percentile, rank or classification of any kind; the app, now IQ Test & Brain Training Games, also has an IQ-style test whose results its Google Play listing calls estimates based on app activities, with no comparison group documented, and the article now says that instead of ruling any such figure out.

- *takeaway*
  - Before: "Accuracy in Mental Math & Memory Games is a percentage of the questions it asked you. It is not a percentile, and the app reports no percentile of any kind."
  - After: "Accuracy in our own app, IQ Test & Brain Training Games, is a percentage of the questions it asked you, not a percentile. Its listing calls the results of its IQ-style test estimates based on app activities and documents no comparison group, so do not read any figure from it as a rank among other people."
- *FAQ 4 ("Is accuracy in a practice app a percentile?")*
  - Before: "The app holds no comparison group, so it cannot and does not report a percentile, a rank or a classification of any kind."
  - After: "The app also has an IQ-style test, whose results its listing calls estimates based on app activities, not a professional assessment, and the listing documents no comparison group for them, so do not read any figure there as a percentile in the normed sense this article describes."
- *body line 166*
  - Before: "The app holds no norm sample, so it reports **no percentile, no rank and no classification** — and reading its accuracy figure as a standing among other people would be a category error."
  - After: "The app also has an IQ-style test, whose results its Google Play listing calls estimates based on app activities, not a professional assessment, and the listing documents no comparison group for them. So do not read the accuracy figure, or any figure from the test, as a standing among other people — for accuracy, that would be a category error."

#### `ratios-and-proportions-mentally` (education-brain)

- Published 2026-09-22; updated 2026-09-22 → 2026-10-02. Flagged in section H2: none (additional corrections).
- **Correction note:** This article said our app, then called Mental Math & Memory Games, was not an assessment of anything and that the figures it records are only drill statistics; the app, now IQ Test & Brain Training Games, also has an IQ-style test and other tests whose results its Google Play listing calls estimates rather than clinical or professional assessments, so the passage now describes only what its drills record.

- *body line 177*
  - Before: "The app is an educational game and a practice tool rather than a course or an assessment of anything, and the figures it records are game statistics: score, accuracy, streak, response time and personal bests on the modes you play."
  - After: "The app is an educational game and a practice tool rather than a course, and the figures its drills record are game statistics: score, accuracy, streak, response time and personal bests on the modes you play."

#### `reading-response-time-numbers` (education-brain)

- Published 2026-09-22; updated 2026-09-22 → 2026-10-02. Flagged in section H2: none (additional corrections).
- **Correction note:** This article said our app, then called Mental Math & Memory Games, reported statistics about its own rounds and nothing else, with no assessment happening, and that the modes producing these numbers are listed on its app page; the app, now IQ Test & Brain Training Games, also has a reaction time test and an IQ-style test whose results its Google Play listing calls estimates rather than clinical or professional assessments, and the article now says so.

- *body line 159*
  - Before: "There is no assessment happening — the app reports statistics about its own rounds and nothing else."
  - After: "There is no assessment happening in a drill round — it reports statistics about its own questions and nothing else. Our app's separate reaction time test and IQ-style test are a different feature, and its listing describes their results as estimates based on app activities, not clinical or professional assessments."
- *body line 161*
  - Before: "The rest of the practice-record articles sit in the [brain training games hub](/blog/topics/brain-training-games/), the honest limits of the whole category are covered in [do brain training apps work](/blog/do-brain-training-apps-work/), the modes that produce these numbers are listed on the [Mental Math & Memory Games app page](/apps/mental-math-memory-games/), and more of this writing is collected in the [education and brain category](/blog/category/education-brain/)."
  - After: "The rest of the practice-record articles sit in the [brain training games hub](/blog/topics/brain-training-games/), the honest limits of the whole category are covered in [do brain training apps work](/blog/do-brain-training-apps-work/), the app itself is described on the [IQ Test & Brain Training Games app page](/apps/mental-math-memory-games/), and more of this writing is collected in the [education and brain category](/blog/category/education-brain/)."

#### `recognition-versus-recall` (education-brain)

- Published 2026-09-22; updated 2026-09-22 → 2026-10-02. Flagged in section H2: line 155 (rewritten).
- **Correction note:** This article said our app, then called Mental Math & Memory Games, measured nothing about you, recorded nothing beyond its drill statistics, contained no test or assessment, and listed its full mode list on its app page; the app, now IQ Test & Brain Training Games, includes an IQ-style test, a memory test and a personality questionnaire whose results its Google Play listing calls estimates rather than clinical or professional assessments, and the article now says so.

- *body line 155*
  - Before: "That gap is the useful number — not because the app measures anything about you, but because it shows you which of your two scores is the honest one. The app records score, accuracy, streak, response time and personal bests on its own drills and nothing more; it contains no assessment, no test and no interpretation of what any of it means about your abilities."
  - After: "That gap is the useful number — not because the drills measure anything about you, but because it shows you which of your two scores is the honest one. Those drills record score, accuracy, streak, response time and personal bests. The app's IQ-style test, memory test and personality questionnaire are separate features, and its listing describes their results as estimates based on app activities, not clinical or professional assessments of your abilities."
- *body line 157*
  - Before: "If you want to look at the full mode list, it is on the [Mental Math & Memory Games app page](/apps/mental-math-memory-games/)."
  - After: "If you want to see how the app describes its games and tests, that is on the [IQ Test & Brain Training Games app page](/apps/mental-math-memory-games/)."

#### `reliability-and-validity-in-testing` (education-brain)

- Published 2026-09-22; updated 2026-09-22 → 2026-10-02. Flagged in section H2: line 152 (rewritten).
- **Correction note:** This article said our app, then called Mental Math & Memory Games, made no measurement claim and contained no IQ test, cognitive assessment or percentile scoring; the app, now IQ Test & Brain Training Games, includes an IQ-style test, a memory test and a reaction time test whose results its Google Play listing calls estimates rather than professional assessments, and the article now notes that no reliability or validity evidence is cited for them.

- *takeaway*
  - Before: "Mental Math & Memory Games publishes no reliability or validity evidence because it makes no measurement claim. Its score, accuracy, streak and response-time figures are game statistics about your own runs."
  - After: "Our own app, IQ Test & Brain Training Games, includes an IQ-style test, a memory test and a reaction time test, and its listing cites no reliability or validity evidence for them; it calls the results estimates based on app activities, not professional assessments, so ask this article's two questions of them before reading anything into a result."
- *FAQ 4 ("Does IQ Test & Brain Training Games publish reliability or validity evidence?")*
  - Before: "No, and it would be strange if it did. The app makes no measurement claim about you, so there is no interpretation for validity evidence to support. It reports score, accuracy, streak, response time and personal bests for the drills you have played, which are statistics about a game session. Treating them as a measurement of a trait would be the error this article is written to prevent."
  - After: "No. Neither its Google Play listing nor its app page cites any reliability or validity evidence, even though the app now includes an IQ-style test, a memory test and a reaction time test. The listing describes those results as estimates based on app activities, not medical, psychological, clinical or professional diagnostic assessments. Without published evidence, treating a result as a measurement of a trait would be the error this article is written to prevent; use it to compare your own runs."
- *body line 152*
  - Before: "Mental Math & Memory Games is our own app, built by Reign Creative, and it publishes no reliability or validity evidence. That is not an omission — it follows from making no measurement claim. The app is an educational game. It contains no IQ test, no cognitive assessment and no percentile scoring, and the numbers it shows you describe what happened in a session: score, accuracy, streak, average and median response time, fastest correct answer, and personal bests per mode."
  - After: "IQ Test & Brain Training Games is our own app, built by Reign Creative, and neither its Google Play listing nor its app page cites any reliability or validity evidence. That matters, because the app is an educational game that also includes an IQ-style test, a memory test and a reaction time test, and its listing says the reaction time test measures speed and consistency. The listing also states that IQ test, memory test and other results are estimates based on app activities, not medical, psychological, clinical or professional diagnostic assessments, and the app keeps personal bests, accuracy, streaks, response speed and an assessment history."

#### `remembering-a-long-number` (education-brain)

- Published 2026-09-22; updated 2026-09-22 → 2026-10-02. Flagged in section H2: line 147 (rewritten).
- **Correction note:** This article said our app, then called Mental Math & Memory Games, contained no test of any kind and pointed to a mode list on its app page; the app, now IQ Test & Brain Training Games, includes a memory test and an IQ-style test whose results its Google Play listing calls estimates rather than clinical or professional assessments, and the article now says so and points to the app page's general description instead.

- *body line 147*
  - Before: "Second, the app is practice and entertainment, not assessment: it records score, accuracy, streak, response time and personal bests, and contains no test of any kind."
  - After: "Second, the drills are practice and entertainment, not assessment: they record score, accuracy, streak, response time and personal bests. The app does also include a memory test and an IQ-style test, and its Google Play listing calls their results estimates based on app activities, not clinical or professional assessments."
- *body line 149*
  - Before: "Otherwise, browse the [memory and attention hub](/blog/topics/memory-and-attention/), the wider [education and brain section](/blog/category/education-brain/), or the mode list on the [Mental Math & Memory Games app page](/apps/mental-math-memory-games/)."
  - After: "Otherwise, browse the [memory and attention hub](/blog/topics/memory-and-attention/), the wider [education and brain section](/blog/category/education-brain/), or the description of the app on the [IQ Test & Brain Training Games app page](/apps/mental-math-memory-games/)."

#### `russian-peasant-multiplication` (education-brain)

- Published 2026-09-22; updated 2026-09-22 → 2026-10-02. Flagged in section H2: none (additional corrections).
- **Correction note:** This article said the full catalogue of math and memory modes in our app, then called Mental Math & Memory Games, is shown on its app page; that page, for the app now named IQ Test & Brain Training Games, describes its features without listing individual modes, so the sentence now simply points to it.

- *body line 183*
  - Before: "The full catalogue of math and memory modes is on the [Mental Math & Memory Games app page](/apps/mental-math-memory-games/)."
  - After: "The app itself is described on the [IQ Test & Brain Training Games app page](/apps/mental-math-memory-games/)."

#### `sequences-with-more-than-one-answer` (education-brain)

- Published 2026-09-22; updated 2026-09-22 → 2026-10-02. Flagged in section H2: none (additional corrections).
- **Correction note:** This article said our app, then called Mental Math & Memory Games, contained no figural, matrix or logic-grid items, that none of its modes was a test or an estimate of anything about you, and that its app page lists what ships; the app, now IQ Test & Brain Training Games, includes logic games built on sequences and patterns and an IQ-style test, a memory test and a reaction time test whose results its Google Play listing calls estimates rather than clinical or professional assessments, and the article now says so and describes the app page accurately.

- *body line 163*
  - Before: "Being plain about the rest: the app contains no figural or matrix items and no logic-grid puzzles, and none of its modes is a test, an assessment or an estimate of anything about you. It records score, accuracy, streak, response time and personal bests on its own drills, and those are game statistics. The [app page](/apps/mental-math-memory-games/) lists what ships; the rest of this subject is in the [logic and pattern puzzles collection](/blog/topics/logic-and-pattern-puzzles/), and the wider set of guides is in the [education and brain training section](/blog/category/education-brain/)."
  - After: "Being plain about the rest: the app also has logic games built on sequences, patterns and rule discovery, and an IQ-style test, a memory test and a reaction time test whose results its Google Play listing calls estimates based on app activities, not clinical or professional assessments. On its drills it records score, accuracy, streak, response time and personal bests, and those are game statistics. The [app page](/apps/mental-math-memory-games/) describes the app; the rest of this subject is in the [logic and pattern puzzles collection](/blog/topics/logic-and-pattern-puzzles/), and the wider set of guides is in the [education and brain training section](/blog/category/education-brain/)."

#### `short-term-versus-working-memory` (education-brain)

- Published 2026-09-22; updated 2026-09-22 → 2026-10-02. Flagged in section H2: line 153 (rewritten).
- **Correction note:** This article said our app, then called Mental Math & Memory Games, assessed nothing, contained no test or interpretation of your numbers and recorded nothing beyond its drill statistics, and that its full mode list was on our app page; the app, now IQ Test & Brain Training Games, includes a memory test and an IQ-style test whose results its Google Play listing calls estimates rather than clinical or professional assessments, and the article now says so.

- *body line 153*
  - Before: "What the app does not do is assess anything. It records score, accuracy, streak, response time and personal bests on its own drills, and stops there. It contains no cognitive assessment, no test, and no interpretation of what your numbers mean about you — those belong to qualified professionals using standardised instruments, which is a different activity from practice or entertainment. You can see the full mode list on the [Mental Math & Memory Games app page](/apps/mental-math-memory-games/), explore related writing in the [memory and attention hub](/blog/topics/memory-and-attention/), and browse the wider [education and brain section](/blog/category/education-brain/) for the study-method articles."
  - After: "What the app's results are not is a professional assessment. Its memory drills record score, accuracy, streak, response time and personal bests, and it also has a memory test and an IQ-style test that covers working memory; its listing describes those results as estimates based on app activities, not medical, psychological, clinical or professional diagnostic assessments. Interpreting what memory scores mean about a person belongs to qualified professionals using standardised instruments, which is a different activity from practice or entertainment. You can see how the app describes its games and tests on the [IQ Test & Brain Training Games app page](/apps/mental-math-memory-games/), explore related writing in the [memory and attention hub](/blog/topics/memory-and-attention/), and browse the wider [education and brain section](/blog/category/education-brain/) for the study-method articles."

#### `spatial-reasoning-and-number-sense` (education-brain)

- Published 2026-09-22; updated 2026-09-22 → 2026-10-02. Flagged in section H2: none (additional corrections).
- **Correction note:** This article said our app, then called Mental Math & Memory Games, had no spatial content, offered only arithmetic, memory and technique content, was not an assessment and produced no score that describes you; the app, now IQ Test & Brain Training Games, lists spatial reasoning in its IQ-style test, spatial memory in its memory games and a personality questionnaire, with results its Google Play listing calls estimates rather than clinical or professional assessments, and the article now says the listing does not describe item formats such as mental rotation instead of claiming the app has none.

- *takeaway*
  - Before: "Mental Math & Memory Games contains no mental rotation, mirror-image, paper-folding or shape task of any kind, so it is not spatial reasoning practice."
  - After: "IQ Test & Brain Training Games, our own app, lists spatial reasoning among the areas its IQ-style test covers, but its listing does not describe the item formats — mental rotation, paper folding or assembly — so check the items yourself before treating it as spatial reasoning practice."
- *body line 144*
  - Before: "Mental Math & Memory Games is our own app, built by Reign Creative, and it has no spatial content. There is no mental rotation task, no mirror-image task, no paper-folding task, no shape assembly, and no figural item of any kind."
  - After: "IQ Test & Brain Training Games is our own app, built by Reign Creative, and its listing does name spatial content: its IQ-style test covers spatial reasoning among seven areas, and its memory games include spatial memory. The listing does not describe the item formats, so we cannot tell you whether any of them is a mental rotation, mirror-image, paper-folding or assembly task, and we do not claim that they are."
- *body line 146*
  - Before: "What it does contain is arithmetic practice — the four operations, mixed drills, percentages, ratios and estimation — memory rounds built on numbers, sequences, grids and delayed recall, a library of calculation techniques with worked examples, and tracking of score, accuracy, streak, response time and personal bests. It is an educational game and not an assessment, and it produces no score that describes you."
  - After: "Around that sit logic, focus, vocabulary and mental math games — the four operations, percentages, ratios, estimation and money problems — memory games built on digit span, sequences, grids, colours, letters and symbols, a memory test, a reaction time test and a personality questionnaire, with personal bests, accuracy, streaks and response speed tracked over time. Its listing describes the IQ test, personality test, memory test and other results as estimates based on app activities, not medical, psychological, clinical or professional diagnostic assessments."
- *body line 148*
  - Before: "If spatial practice is what you are after, look for a product built around rotation, folding and assembly tasks."
  - After: "If rotation, folding and assembly practice is specifically what you are after, check the items in the app yourself or look for a product built around those tasks."
- *body line 148*
  - Before: "The rest of this subject sits in the [IQ tests and reasoning hub](/blog/topics/iq-tests-and-reasoning/), the [education and brain category](/blog/category/education-brain/) collects the arithmetic and memory articles, and the modes themselves are listed on the [Mental Math & Memory Games app page](/apps/mental-math-memory-games/)."
  - After: "The rest of this subject sits in the [IQ tests and reasoning hub](/blog/topics/iq-tests-and-reasoning/), the [education and brain category](/blog/category/education-brain/) collects the arithmetic and memory articles, and the app itself is described on the [IQ Test & Brain Training Games app page](/apps/mental-math-memory-games/)."

#### `squares-cubes-and-roots` (education-brain)

- Published 2026-09-22; updated 2026-09-22 → 2026-10-02. Flagged in section H2: none (additional corrections).
- **Correction note:** This article said our app, then called Mental Math & Memory Games, was not an assessment and recorded only drill statistics; the app, now IQ Test & Brain Training Games, also includes an IQ-style test, a memory test and a reaction time test whose results its Google Play listing calls estimates rather than professional assessments, and the article now says so.

- *body line 181*
  - Before: "The app is a practice and entertainment product rather than a course or an assessment, and it records only what it can see: score, accuracy, streak, response time and personal bests on the drills you actually play."
  - After: "The app is a practice and entertainment product rather than a course or a standardised assessment: on the drills you actually play it records score, accuracy, streak, response time and personal bests, and the results of its IQ-style test, memory test and reaction time test are, in its listing's words, estimates based on app activities, not a professional assessment."

#### `strategy-for-timed-reasoning-tests` (education-brain)

- Published 2026-09-22; updated 2026-09-22 → 2026-10-02. Flagged in section H2: none (additional corrections).
- **Correction note:** This article said our app, then called Mental Math & Memory Games, was an educational game rather than test preparation, was arithmetic practice with a clock and not a reasoning test, produced no score that means anything outside the app, and had its modes listed on our app page; the app, now IQ Test & Brain Training Games, describes itself as IQ test practice and brain training, with an IQ-style test covering numerical reasoning, logic and patterns whose results its Google Play listing calls estimates rather than educational-placement, employment or professional assessments, and the article now says so.

- *body line 146*
  - Before: "Mental Math & Memory Games is our own app, built by Reign Creative, and while it is an educational game rather than test preparation, some of its formats rehearse exactly those conditions."
  - After: "IQ Test & Brain Training Games is our own app, built by Reign Creative. Its listing describes IQ-style test practice and brain games rather than preparation for any particular selection test, but some of its formats rehearse exactly those conditions."
- *body line 148*
  - Before: "That is the honest boundary of the claim: it is arithmetic practice with a clock attached, not a reasoning test, and it produces no score that means anything outside the app. What it does supply is a cheap way to discover where your own speed-accuracy curve bends — run the same mode at the same difficulty twice, once at a comfortable pace and once pushing, and compare accuracy and average time."
  - After: "That is the honest boundary of the claim: those timed formats are arithmetic practice with a clock attached. The app's IQ-style test does include reasoning areas — numerical reasoning, logic and patterns among them — but its listing describes the results as estimates based on app activities, not educational-placement, employment or professional assessments, so treat them as practice rather than as a forecast of how you will score on a real selection test. What the timed formats do supply is a cheap way to discover where your own speed-accuracy curve bends — run the same mode at the same difficulty twice, once at a comfortable pace and once pushing, and compare accuracy and average time."
- *body line 152*
  - Before: "The rest of the material is in the [IQ tests and reasoning hub](/blog/topics/iq-tests-and-reasoning/) and the [education and brain category](/blog/category/education-brain/), and the modes are listed on the [Mental Math & Memory Games app page](/apps/mental-math-memory-games/)."
  - After: "The rest of the material is in the [IQ tests and reasoning hub](/blog/topics/iq-tests-and-reasoning/) and the [education and brain category](/blog/category/education-brain/), and the app itself is described on the [IQ Test & Brain Training Games app page](/apps/mental-math-memory-games/)."

#### `subtraction-without-borrowing` (education-brain)

- Published 2026-09-22; updated 2026-09-22 → 2026-10-02. Flagged in section H2: none (additional corrections).
- **Correction note:** This article said the full catalogue of our app, then called Mental Math & Memory Games, is on its app page; that page, now for IQ Test & Brain Training Games, describes the app without listing individual drills or techniques, and the sentence now points there only for a description of the app.

- *body line 164*
  - Before: "The full catalogue is on the [Mental Math & Memory Games app page](/apps/mental-math-memory-games/)."
  - After: "The app itself is described on the [IQ Test & Brain Training Games app page](/apps/mental-math-memory-games/)."

#### `syllogisms-explained` (education-brain)

- Published 2026-09-22; updated 2026-09-22 → 2026-10-02. Flagged in section H2: none (additional corrections).
- **Correction note:** This article said our app, then called Mental Math & Memory Games, contained no logic mode and nothing that assesses reasoning and that its catalogue is only arithmetic and memory practice; the app, now IQ Test & Brain Training Games, has logic games covering conditional reasoning and deduction and an IQ-style test whose results its Google Play listing calls estimates rather than clinical or professional assessments, and the article now says so.

- *body line 176 (heading)*
  - Before: "## Load, practice, and what this app does not contain"
  - After: "## Load, practice, and where our app fits"
- *body line 180*
  - Before: "On the product, plainly: Mental Math & Memory Games, our own app, contains no syllogism items, no logic mode and nothing that assesses reasoning. Its catalogue is arithmetic and memory practice, and the reason it appears in this hub at all is that the untimed **Accuracy Trainer** rounds, with their feedback and explanations, model the one condition that helps here — no clock. The mode list is on the [Mental Math & Memory Games app page](/apps/mental-math-memory-games/)."
  - After: "On the product, plainly: IQ Test & Brain Training Games, our own app, has logic games covering analogies, sequences, conditional reasoning and deduction, and an IQ-style test that includes logic. Its listing does not say whether any of them uses categorical syllogisms of the kind above, and it describes test results as estimates based on app activities, not clinical or professional assessments. If you practise deduction there, the diagram habit still applies: draw the circles on paper rather than accepting a conclusion because it sounds believable. How the app describes its games and tests is on the [IQ Test & Brain Training Games app page](/apps/mental-math-memory-games/)."

#### `times-tables-memorisation` (education-brain)

- Published 2026-09-22; updated 2026-09-22 → 2026-10-02. Flagged in section H2: line 171 (rewritten).
- **Correction note:** This article said our app, then called Mental Math & Memory Games, contained no test, made no claim about the player's abilities and listed its full catalogue on its app page; the app, now IQ Test & Brain Training Games, includes an IQ-style test, a memory test and a reaction time test whose results its Google Play listing calls estimates rather than clinical or professional assessments, and the article now says so and points to the app page only for a description of the app.

- *body line 171*
  - Before: "Mental Math & Memory Games, our own app at Reign Creative, is an educational game rather than an assessment of any kind — it contains no test, produces no score that means anything outside the app, and makes no claim about the player's abilities. What it does is give the fact practice described above a structure."
  - After: "IQ Test & Brain Training Games, our own app at Reign Creative, is an educational game. It does include an IQ-style test, a memory test and a reaction time test, but its Google Play listing describes their results as estimates based on app activities, not clinical or professional assessments. What its multiplication practice does is give the fact practice described above a structure."
- *body line 173*
  - Before: "The full catalogue is on the [Mental Math & Memory Games app page](/apps/mental-math-memory-games/)."
  - After: "The app itself is described on the [IQ Test & Brain Training Games app page](/apps/mental-math-memory-games/)."

#### `unit-price-comparison` (education-brain)

- Published 2026-09-22; updated 2026-09-22 → 2026-10-02. Flagged in section H2: line 169 (rewritten).
- **Correction note:** This article said our app, then called Mental Math & Memory Games, was not an assessment of anything; the app, now IQ Test & Brain Training Games, includes an IQ-style test, a memory test and a reaction time test whose results its Google Play listing calls estimates rather than clinical or professional assessments, and the article now says so.

- *body line 169*
  - Before: "The app is an educational game and a practice tool rather than an assessment of anything. What it records — score, accuracy, streak, response time and personal bests — describes how you did on the drills you played."
  - After: "The app is an educational game and a practice tool. It does also include an IQ-style test, a memory test and a reaction time test, and its Google Play listing describes their results as estimates based on app activities, not clinical or professional assessments. What it records on the drills — score, accuracy, streak, response time and personal bests — describes how you did on the drills you played."

#### `verbal-reasoning-question-types` (education-brain)

- Published 2026-09-22; updated 2026-09-22 → 2026-10-02. Flagged in section H2: line 142 (rewritten).
- **Correction note:** This article said our app, then called Mental Math & Memory Games, had no verbal items of any kind, offered no verbal practice and was not an assessment; the app, now IQ Test & Brain Training Games, has vocabulary games, analogy games and an IQ-style test covering vocabulary, whose results its Google Play listing calls estimates rather than professional assessments, and the article now says which verbal formats that overlaps with and which the listing does not describe.

- *takeaway*
  - Before: "Mental Math & Memory Games contains no verbal items of any kind — no passages, no vocabulary questions and no analogies — so it offers no practice for this format."
  - After: "Our own app, IQ Test & Brain Training Games, has vocabulary games built on synonyms, antonyms and context clues, and analogy games, which overlap with the word-level formats here; its listing describes no passage-based items, so do not count on it for the passage-and-statements format."
- *FAQ 4 ("Does IQ Test & Brain Training Games include verbal reasoning practice?")*
  - Before: "No. The app has no verbal items at all: no reading passages, no vocabulary questions, no analogies and no sentence tasks. Its content is arithmetic drills across the four operations and mixed practice, memory rounds using numbers, sequences, grids and delayed recall, and a library of calculation techniques. For verbal reasoning practice you need material built for it, ideally from the publisher whose test you will sit."
  - After: "Partly. Its vocabulary games cover synonyms, antonyms, context clues and word meaning, its logic games include analogies, and its IQ-style test covers vocabulary among other areas. Its Google Play listing does not describe reading passages or true, false and cannot say statements, so for those formats you need material built for them, ideally from the publisher whose test you will sit. The listing also describes test results as estimates based on app activities, not a professional assessment."
- *body line 138 (heading)*
  - Before: "## What these tests claim to measure, and what this app does not do"
  - After: "## What these tests claim to measure, and where our app fits"
- *body line 142*
  - Before: "Mental Math & Memory Games is our own app, built by Reign Creative, and it contains no verbal items whatsoever — no passages, no vocabulary questions, no analogies, no sentence tasks."
  - After: "IQ Test & Brain Training Games is our own app, built by Reign Creative. Its listing describes vocabulary games on synonyms, antonyms, context clues and word meaning, logic games that include analogies, and an IQ-style test that covers vocabulary — but no reading passages or true, false and cannot say statements."
- *body line 142*
  - Before: "It is an educational game rather than an assessment, and it offers no preparation for a verbal reasoning test."
  - After: "It is an educational game, and its listing calls test results estimates based on app activities rather than professional assessments; its word games overlap with the analogy and vocabulary-in-context formats above, but the listing does not present it as preparation for a verbal reasoning test."
- *body line 144*
  - Before: "Everything else in this subject sits in the [IQ tests and reasoning hub](/blog/topics/iq-tests-and-reasoning/) and the wider [education and brain category](/blog/category/education-brain/); the drills themselves are on the [Mental Math & Memory Games app page](/apps/mental-math-memory-games/)."
  - After: "Everything else in this subject sits in the [IQ tests and reasoning hub](/blog/topics/iq-tests-and-reasoning/) and the wider [education and brain category](/blog/category/education-brain/); the app itself is described on the [IQ Test & Brain Training Games app page](/apps/mental-math-memory-games/)."

#### `visual-pattern-puzzles` (education-brain)

- Published 2026-09-22; updated 2026-09-22 → 2026-10-02. Flagged in section H2: none (additional corrections).
- **Correction note:** This article said our app, then called Mental Math & Memory Games, had no shape or figural items, offered only arithmetic and memory practice and assessed nothing; the app, now IQ Test & Brain Training Games, has pattern-based logic games and an IQ-style test covering patterns and spatial reasoning, whose results its Google Play listing calls estimates, and the article now says so without claiming which item formats it uses.

- *takeaway*
  - Before: "Mental Math & Memory Games contains no shape or figural items at all; its Number Pattern Challenge applies the same rule-finding habit to numbers instead."
  - After: "Our own app, IQ Test & Brain Training Games, has pattern and rule-discovery logic games and an IQ-style test covering patterns and spatial reasoning, but its listing does not say whether any of them use the rotation, reflection or translation rules described here."
- *FAQ 4 ("Can I practise visual pattern puzzles in IQ Test & Brain Training Games?")*
  - Before: "No. The app has no shape items, no rotation or mirror-image tasks, and no figural puzzles of any kind. Its catalogue is arithmetic and memory practice. The Number Pattern Challenge mode asks you to find the rule behind a run of numbers, which exercises the same habit of naming what is changing, but it is a numerical task, and the app assesses nothing."
  - After: "Its Google Play listing does not say directly. It describes logic games built on patterns and rule discovery, memory games that use symbols, colours and grids, and an IQ-style test covering patterns and spatial reasoning, without saying whether any item uses the rotation, reflection or translation rules this article describes. The listing also describes the test's results as estimates based on app activities, not a professional assessment."
- *body line 104*
  - Before: "One statement first, because this hub is attached to an app: Mental Math & Memory Games, which is our own app, has no shape items, no mirror-image tasks and no figural puzzles at all. This article is about the puzzle format, not about a feature."
  - After: "One statement first, because this hub is attached to an app: IQ Test & Brain Training Games, which is our own app, has pattern-based logic games and an IQ-style test covering patterns and spatial reasoning, but its Google Play listing does not describe mirror-image or rotation tasks, so this article is about the puzzle format, not about a feature."
- *body line 153*
  - Before: "The habit that makes it work — name the attributes, isolate one, insist on a third and fourth term before committing — applies identically to a run of numbers, which is the one place this app does have something relevant."
  - After: "The habit that makes it work — name the attributes, isolate one, insist on a third and fourth term before committing — applies identically to a run of numbers, and to the pattern and rule-discovery games in our app."
- *body line 153*
  - Before: "It is a one-dimensional analogue of the same discipline, and it is practice rather than assessment. What the app does and does not track is set out on the [Mental Math & Memory Games app page](/apps/mental-math-memory-games/)."
  - After: "It is a one-dimensional analogue of the same discipline, and it is practice rather than assessment; the app's separate IQ-style test, which covers patterns and spatial reasoning, produces results its listing calls estimates based on app activities, not a professional assessment. What the app tracks is set out on the [IQ Test & Brain Training Games app page](/apps/mental-math-memory-games/)."

#### `warming-up-before-focused-work` (education-brain)

- Published 2026-09-22; updated 2026-09-22 → 2026-10-02. Flagged in section H2: none (additional corrections).
- **Correction note:** This article said the modes it names are listed on our app's page; that page, for the app now called IQ Test & Brain Training Games (previously Mental Math & Memory Games), describes the app without naming individual modes, and the sentence now points to it as a description of the app.

- *body line 142*
  - Before: "More on routines and progress sits in the [brain training games hub](/blog/topics/brain-training-games/) and the wider [education and brain category](/blog/category/education-brain/); the modes named above are listed on the [Mental Math & Memory Games app page](/apps/mental-math-memory-games/)."
  - After: "More on routines and progress sits in the [brain training games hub](/blog/topics/brain-training-games/) and the wider [education and brain category](/blog/category/education-brain/); the app itself is described on the [IQ Test & Brain Training Games app page](/apps/mental-math-memory-games/)."

#### `what-a-brain-age-score-means` (education-brain)

- Published 2026-09-22; updated 2026-09-22 → 2026-10-02. Flagged in section H2: line 74 (rewritten), line 142 (rewritten).
- **Correction note:** This article said our app, then called Mental Math & Memory Games, contained no IQ test or cognitive assessment and gave no brain age or percentile; the app, now IQ Test & Brain Training Games, includes an IQ-style test, a memory test and a reaction time test whose results its Google Play listing calls estimates rather than clinical or professional assessments, and the article now says so and no longer rules out any particular figure.

- *takeaway*
  - Before: "Mental Math & Memory Games produces no brain age, no cognitive age and no age comparison of any kind."
  - After: "Our own app, IQ Test & Brain Training Games, includes an IQ-style test, a memory test and a reaction time test; its listing calls their results estimates based on app activities, not clinical or professional assessments, so apply the same caution to any figure it shows you."
- *FAQ 4 ("Does IQ Test & Brain Training Games give you a brain age?")*
  - Before: "No. The app produces no brain age, no cognitive age, no age comparison and no percentile. It reports score, accuracy, streak, response time and personal bests for the drills you have played, which are statistics about a game session. It contains no IQ test and no cognitive assessment of any kind, and it is published as an educational game."
  - After: "Its Google Play listing does not describe a brain-age feature. It does describe an IQ-style test, a memory test and a reaction time test, and states that their results are estimates based on app activities, not medical, psychological, clinical or professional diagnostic assessments. Whatever figure the app shows, the points in this article apply to it: it is an estimate built from your performance on the app's own tasks, not a measurement of your brain. The app is published as an educational game."
- *body line 140 (heading)*
  - Before: "## What this app does, and what it refuses to do"
  - After: "## Where our own app fits"
- *body line 142*
  - Before: "Mental Math & Memory Games is our own app, built by Reign Creative, and it produces no brain age, no cognitive age, no age comparison and no percentile. It contains no IQ test and no cognitive assessment. It is published as an educational game, and the numbers it shows are statistics about your own sessions: score, accuracy, streak, average and median response time, fastest correct answer, and personal bests for each mode."
  - After: "IQ Test & Brain Training Games is our own app, built by Reign Creative. It is published as an educational game, and it includes an IQ-style test, a memory test and a reaction time test alongside its brain games, with personal bests, accuracy, streaks, response speed and an assessment history to compare against. Its Google Play listing does not describe a brain-age feature, and it states that IQ test, memory test and other results are estimates based on app activities, not medical, psychological, clinical or professional diagnostic assessments."
- *body line 144*
  - Before: "Those numbers are worth reading for one narrow purpose — comparing your own runs on the same mode at the same difficulty — and they are worth nothing as a statement about you."
  - After: "Those numbers are worth reading for one narrow purpose — comparing your own runs on the same activity at the same difficulty — and not as a statement about your brain."
- *body line 144*
  - Before: "That is the whole claim, and there is no version of it that involves your age."
  - After: "Treat any figure the app shows, test results included, the same way: an estimate of how you did on its tasks, never a measure of how old your brain is."
- *body line 146*
  - Before: "More practice and memory material sits in the [education and brain category](/blog/category/education-brain/), and the modes are listed on the [Mental Math & Memory Games app page](/apps/mental-math-memory-games/)."
  - After: "More practice and memory material sits in the [education and brain category](/blog/category/education-brain/), and the app itself is described on the [IQ Test & Brain Training Games app page](/apps/mental-math-memory-games/)."

#### `what-a-brain-training-subscription-buys` (education-brain)

- Published 2026-09-22; updated 2026-09-22 → 2026-10-02. Flagged in section H2: none (additional corrections).
- **Correction note:** This article said our app, then called Mental Math & Memory Games, had no algorithmic session selection, implied that breadth across cognitive domains had no free route, said we make no cognitive claim at all, and said its modes are listed on our app page; the app, now IQ Test & Brain Training Games, lists an IQ-style test across seven areas followed by brain-training recommendations and games across several domains, with results its Google Play listing calls estimates rather than clinical or professional assessments, and the article now says so.

- *body line 125*
  - Before: "Everything stated here about another company's product comes from that company's own official pages, read on 21 September 2026."
  - After: "Everything stated here about another company's product comes from that company's own official pages, read on 21 September 2026; statements about our own app were re-checked against its Google Play listing on 2 October 2026, after it was renamed and its listing rewritten."
- *body line 165*
  - Before: "And a product with no algorithmic session selection puts the work of choosing what to practise back on you — which is exactly the thing some readers would happily pay to avoid."
  - After: "And while our app's listing describes brain-training recommendations after its IQ-style test and structured cognitive-training sessions, it does not describe a service that plans every session for you, so expect to do some of the choosing yourself — which is exactly the thing some readers would happily pay to avoid."
- *body line 181*
  - Before: "If you want breadth across several cognitive domains, the publishers that document that breadth put most of it behind a subscription, and there is no free route to it."
  - After: "If you want breadth across several cognitive domains, the subscription publishers that document that breadth put most of it behind a subscription. Ours now lists several domains too, so check what any free tier, ours included, actually unlocks before deciding."
- *body line 189*
  - Before: "That history applies to the category, not to one company, and it applies to us as well: we make no cognitive claim at all, which is a position rather than an achievement."
  - After: "That history applies to the category, not to one company, and it applies to us as well: we make no claim that our app improves everyday performance or protects against cognitive decline, and its listing describes its IQ-style test and other results as estimates based on app activities rather than professional assessments — a position rather than an achievement."
- *body line 191*
  - Before: "The rest of the practical writing sits in the [brain training games hub](/blog/topics/brain-training-games/) and the [education and brain category](/blog/category/education-brain/), and the modes our own app ships are listed on the [Mental Math & Memory Games app page](/apps/mental-math-memory-games/)."
  - After: "The rest of the practical writing sits in the [brain training games hub](/blog/topics/brain-training-games/) and the [education and brain category](/blog/category/education-brain/), and our own app is described on the [IQ Test & Brain Training Games app page](/apps/mental-math-memory-games/)."

#### `what-iq-tests-actually-measure` (education-brain)

- Published 2026-09-22; updated 2026-09-22 → 2026-10-02. Flagged in section H2: line 55 (kept), line 74 (rewritten), line 148 (rewritten).
- **Correction note:** This article said our app, then called Mental Math & Memory Games, contained no test, no percentile and no estimate of intelligence and had no relationship to IQ testing beyond a resemblance in its material; the app, now IQ Test & Brain Training Games, includes an IQ-style test whose results its Google Play listing calls estimates rather than clinical or professional assessments, and the article now explains how that test differs from a standardised battery.

- *FAQ 4 ("Does the IQ Test & Brain Training Games app measure IQ?")*
  - Before: "No. It contains no test, no assessment, no percentile and no estimate of intelligence. It is an educational game that drills arithmetic and memory tasks and records how you did on them — score, accuracy, streak, response time and personal bests. Those are game statistics about a practice session, not measurements of an underlying ability."
  - After: "Not in the sense this article describes. It includes an IQ-style test covering numerical reasoning, logic, patterns, vocabulary, working memory, spatial reasoning and processing speed, but its Google Play listing states that the results are estimates based on app activities, not medical, psychological, clinical or professional diagnostic assessments. The test is taken unsupervised on a phone and the listing documents no comparison group, so treat a result as a record of how you did on the app's own questions rather than a rank against a norm sample."
- *body line 146*
  - Before: "[Mental Math & Memory Games](/apps/mental-math-memory-games/) is our own app, built by Reign Creative, and this is the honest account of its relationship to everything above: there is none, beyond a family resemblance in the material."
  - After: "[IQ Test & Brain Training Games](/apps/mental-math-memory-games/) is our own app, built by Reign Creative, and this is the honest account of its relationship to everything above: it includes an IQ-style test that samples some of the same kinds of task, without the conditions that make a battery's score interpretable."
- *body line 148*
  - Before: "The app drills arithmetic — Multiplication Rush, Addition Sprint, Subtraction Sprint, Division Dash and Mixed Operations — plus number-memory and sequence-memory rounds, a 49-technique library with worked examples, and formats such as Survival, Boss Quiz and a Daily Challenge. Some of those tasks resemble the *surface* of subtests that a real battery uses to sample working memory or processing speed. That resemblance is where the connection ends. The app contains no test, no norms, no percentile, no classification, and no estimate of anyone's intelligence. It records score, accuracy, streak, response time and personal bests, which are statistics about a practice session."
  - After: "The app's IQ-style test covers numerical reasoning, logic, patterns, vocabulary, working memory, spatial reasoning and processing speed, and around it sit memory, logic, focus, vocabulary and mental math games, a memory test and a reaction time test. Some of those areas share names with the domains a standardised battery samples. The procedure does not: the app's test is taken unsupervised, at a moment of your choosing, and its listing documents no comparison group. The listing itself says that IQ test, memory test and other results are estimates based on app activities, not medical, psychological, clinical, educational-placement, employment or professional diagnostic assessments. The app also keeps personal bests, accuracy, streaks, response speed and an assessment history, which describe how you did on its own questions."

#### `what-processing-speed-means` (education-brain)

- Published 2026-09-22; updated 2026-09-22 → 2026-10-02. Flagged in section H2: line 57 (rewritten).
- **Correction note:** This article said our app, then called Mental Math & Memory Games, contained no reaction-time test and no assessment of any kind; the app, now IQ Test & Brain Training Games, includes a reaction time test and an IQ-style test covering processing speed, whose results its Google Play listing calls estimates rather than clinical or professional assessments, and the article now applies its cautions to those results too.

- *takeaway*
  - Before: "Mental Math & Memory Games records average, median and fastest-correct response times and a consistency figure for its own drills. It contains no reaction-time test and no assessment of any kind."
  - After: "IQ Test & Brain Training Games records response times on its own drills and also has a reaction time test and an IQ-style test that covers processing speed. Its listing describes those results as estimates based on app activities, not clinical or professional assessments, so compare them only with your own earlier results."
- *body line 124*
  - Before: "**None of that is a processing-speed measurement, and the app contains no reaction-time test.** Those numbers describe your play in one mode at one difficulty."
  - After: "**None of that is a processing-speed measurement.** Those numbers describe your play in one mode at one difficulty."
- *body line 124*
  - Before: (nothing — added)
  - After: "The app also has a reaction time test, which its listing says measures speed and consistency, and an IQ-style test that includes processing speed; the listing describes those results as estimates based on app activities, not clinical or professional assessments, and the cautions below apply to them as much as to the drill times."

#### `what-the-average-iq-score-means` (education-brain)

- Published 2026-09-22; updated 2026-09-22 → 2026-10-02. Flagged in section H2: none (additional corrections).
- **Correction note:** This article said our app, then called Mental Math & Memory Games, reported only on your own sessions and could not tell you how you compare with an average; the app, now IQ Test & Brain Training Games, includes an IQ-style test whose results its Google Play listing calls estimates rather than clinical or professional assessments and for which the listing documents no norm sample, and the article now says to read any such result as an estimate rather than a rank against a documented average.

- *takeaway*
  - Before: "Mental Math & Memory Games cannot tell you how you compare with an average, because it has no population sample to compare you with."
  - After: "Our own app, IQ Test & Brain Training Games, includes an IQ-style test, but its Google Play listing calls the results estimates based on app activities and documents no norm sample, so treat any result as an estimate, not a rank against a documented average."
- *FAQ 4 ("Can a practice app tell me how I compare with average?")*
  - Before: "Ours cannot, and no app can without a real norm sample. Mental Math & Memory Games records what happened in your own sessions — score, accuracy, streak, response time and personal bests. It has collected no population data, so there is no average for it to place you against and it reports none."
  - After: "Not in the sense this article describes, because no app can without a documented norm sample. Our own app, IQ Test & Brain Training Games, includes an IQ-style test, and its Google Play listing calls the results estimates based on app activities, not clinical or professional assessments; the listing documents no norm sample. Its games track your own personal bests, accuracy, streaks and response speed, which are comparisons with yourself rather than with an average."
- *body line 151*
  - Before: "[Mental Math & Memory Games](/apps/mental-math-memory-games/) is our own app, and it does not tell you how you compare with an average — because it has nothing to compare you with."
  - After: "[IQ Test & Brain Training Games](/apps/mental-math-memory-games/) is our own app, and it includes an IQ-style test covering numerical reasoning, logic, patterns, vocabulary, working memory, spatial reasoning and processing speed. Its Google Play listing calls the results estimates based on app activities, not medical, psychological, clinical or professional diagnostic assessments, and it documents no norm sample — so whatever such a result says, it is not a rank against a documented average in the sense this article describes."
- *body line 153*
  - Before: "Everything the app reports is about your own sessions: points scored, accuracy on the questions it generated, longest streak, response time, and personal bests per mode. There is no standardisation sample behind those numbers, no age banding, no conversion table and no population reference. Any app claiming to place you against "the average" without a documented norm sample is describing something it has not collected."
  - After: "Its games report on your own sessions: points scored, accuracy on the questions it generated, streaks, response speed and personal bests. Those are comparisons with yourself. Any app claiming to place you against "the average" without a documented norm sample is describing something it has not collected, and an IQ-style estimate from our own app should be read in that light."
- *body line 155*
  - Before: "That is a constraint rather than a deficiency, and it keeps the categories where they belong. A drill in Mixed Operations or a set of number-memory rounds is **practice**; a normed battery is **standardised psychological assessment**."
  - After: "That keeps the categories where they belong. A drill in Mixed Operations or a set of number-memory rounds is **practice**; the app's IQ-style test is, by its own listing's account, an estimate rather than a clinical or professional assessment; a normed battery is **standardised psychological assessment**."

#### `who-invented-the-iq-test` (education-brain)

- Published 2026-09-22; updated 2026-09-22 → 2026-10-02. Flagged in section H2: line 142 (rewritten).
- **Correction note:** This article said our app, then called Mental Math & Memory Games, contained no IQ test, cognitive assessment or percentile scoring and sat outside the history of IQ testing; the app, now IQ Test & Brain Training Games, includes an IQ-style test whose results its Google Play listing calls estimates, not clinical, educational-placement, employment or professional assessments, and the article now says so.

- *body line 142*
  - Before: "Mental Math & Memory Games is our own app, built by Reign Creative, and it sits outside this history rather than inside it. It contains no IQ test, no cognitive assessment and no percentile scoring. What it contains is arithmetic drill — Multiplication Rush, Addition Sprint, Subtraction Sprint, Division Dash, Mixed Operations — memory rounds built on numbers, sequences, grids and delayed recall, a library of calculation techniques, and a record of your score, accuracy, streak and response time. Those are game statistics about your practice, not measurements of a trait."
  - After: "IQ Test & Brain Training Games is our own app, built by Reign Creative, and it sits on the consumer side of the line this history draws. It includes an IQ-style test covering numerical reasoning, logic, patterns, vocabulary, working memory, spatial reasoning and processing speed, alongside brain, memory, logic and mental math games, a memory test and a reaction time test. Its Google Play listing states that IQ test, memory test and other results are estimates based on app activities, not medical, psychological, clinical, educational-placement, employment or professional diagnostic assessments — which rules out exactly the school-placement and selection uses this history describes."
- *body line 146*
  - Before: "The drills themselves are on the [Mental Math & Memory Games app page](/apps/mental-math-memory-games/)."
  - After: "The app itself is described on the [IQ Test & Brain Training Games app page](/apps/mental-math-memory-games/)."

#### `why-am-i-slow-at-mental-math` (education-brain)

- Published 2026-09-22; updated 2026-09-22 → 2026-10-02. Flagged in section H2: line 164 (rewritten).
- **Correction note:** This article said our app, then called Mental Math & Memory Games, was not an assessment, made no claim about intelligence, produced no test result and recorded nothing beyond its drill numbers, and that our app page lists the modes named here; the app, now IQ Test & Brain Training Games, includes an IQ-style test and other tests whose results its Google Play listing calls estimates rather than clinical or professional assessments, and the article now says so.

- *body line 164*
  - Before: "It is a practice game, not an assessment: it makes no claim about intelligence, produces no test result, and its numbers describe performance on its own drills and nothing else. The [app page](/apps/mental-math-memory-games/) lists the modes, the [mental math collection](/blog/topics/mental-math/) holds the method articles, and the [education and brain training section](/blog/category/education-brain/) has the rest."
  - After: "Its drill numbers describe performance on its own drills. The app also has an IQ-style test and other tests, and its listing describes their results as estimates based on app activities, not clinical or professional assessments, so none of them identifies a condition of any kind. The [app page](/apps/mental-math-memory-games/) describes the app, the [mental math collection](/blog/topics/mental-math/) holds the method articles, and the [education and brain training section](/blog/category/education-brain/) has the rest."

#### `why-practice-progress-plateaus` (education-brain)

- Published 2026-09-22; updated 2026-09-22 → 2026-10-02. Flagged in section H2: none (additional corrections).
- **Correction note:** This article said our app's available modes and difficulty ladders are listed on its app page; that page, for the app now called IQ Test & Brain Training Games (previously Mental Math & Memory Games), describes the app without listing individual modes or ladders, and the sentence now points to it as a description of the app.

- *body line 157*
  - Before: "The available modes and ladders are listed on the [Mental Math & Memory Games app page](/apps/mental-math-memory-games/), and more practice-design writing sits in the [education and brain category](/blog/category/education-brain/)."
  - After: "The app itself is described on the [IQ Test & Brain Training Games app page](/apps/mental-math-memory-games/), and more practice-design writing sits in the [education and brain category](/blog/category/education-brain/)."

#### `working-memory-and-training` (education-brain)

- Published 2026-09-04; updated 2026-09-04 → 2026-10-02. Flagged in section H2: none (additional corrections).
- **Correction note:** This article said our app, then called Mental Math & Memory Games, drills arithmetic and memory tasks, that this is the only thing we say it does, and that its claims concern practice rather than intelligence; the app, now IQ Test & Brain Training Games, lists an IQ-style test that covers working memory, a memory test, a reaction time test and a personality questionnaire, with results its Google Play listing calls estimates rather than clinical or professional assessments, and the article now describes it that way while keeping that we make no claim it raises intelligence or protects against decline.

- *FAQ 6 ("What does IQ Test & Brain Training Games claim to do?")*
  - Before: "It drills arithmetic and memory tasks and tracks how you perform on them — scores, accuracy, streaks, response time, personal bests and history. That is a claim about practice and measurement, not about intelligence, cognitive health or protection against decline. If it makes you faster at arithmetic, that is the near-transfer effect the evidence supports, and it is the only thing we say it does."
  - After: "Its Google Play listing describes an IQ-style test, memory, logic, focus and vocabulary games, mental math, a memory test, a reaction time test and a personality questionnaire, with progress tracked over time, and it states that the IQ test, personality test, memory test and other results are estimates based on app activities, not medical, psychological, clinical or professional diagnostic assessments. We make no claim that it raises intelligence, protects cognitive health or prevents decline. If it makes you faster at arithmetic, that is the near-transfer effect the evidence supports."
- *body line 221*
  - Before: "[Mental Math & Memory Games](/apps/mental-math-memory-games/) drills addition, subtraction, multiplication and division with difficulty that climbs as you improve, alongside number, grid, sequence and delayed-recall memory games. It includes timed sprints, accuracy rounds, survival challenges, boss quizzes and a daily math challenge, and it tracks scores, accuracy, streaks, response time, personal bests and history. It also covers techniques for percentages, estimation, number patterns and faster calculation."
  - After: "[IQ Test & Brain Training Games](/apps/mental-math-memory-games/) has an IQ-style test covering numerical reasoning, logic, patterns, vocabulary, working memory, spatial reasoning and processing speed, followed by brain-training recommendations. Around it sit memory games built on digit span, sequences, grids, colours, letters and symbols; logic, focus and vocabulary games; mental math across the four operations, percentages, ratios, estimation and money problems; a memory test, a reaction time test and a personality questionnaire; and daily challenges, streaks, personal bests, accuracy, response speed and an assessment history tracked over time. Its listing states that the IQ test, personality test, memory test and other results are estimates based on app activities, not medical, psychological, clinical or professional diagnostic assessments — so nothing it reports is a measure of working-memory capacity in the sense discussed above."

</details>

Name-only articles (14; no correction note, `updatedAt` unchanged):

| Article | Category | Replacements |
| --- | --- | ---: |
| `building-a-daily-practice-habit` | education-brain | 1 |
| `comparing-fractions-mentally` | education-brain | 1 |
| `estimation-techniques-explained` | education-brain | 1 |
| `fluid-and-crystallized-intelligence` | education-brain | 1 |
| `memory-techniques-that-work` | education-brain | 1 |
| `mental-division-tricks` | education-brain | 1 |
| `mental-math-training-guide` | education-brain | 2 |
| `mental-math-tricks-that-work` | education-brain | 2 |
| `multiplication-shortcuts-explained` | education-brain | 1 |
| `offline-brain-training-apps` | education-brain | 5 |
| `percentages-in-your-head` | education-brain | 1 |
| `simplifying-fractions-quickly` | education-brain | 1 |
| `why-divisibility-rules-work` | education-brain | 1 |
| `working-backwards-problems` | education-brain | 2 |

### Ketora: Keto Diet Carb Tracker

<details><summary>16 corrected articles — notes and every sentence before → after</summary>

#### `added-sugars-vs-total-sugars` (health-nutrition)

- Published 2026-09-04; updated 2026-09-04 → 2026-10-02. Flagged in section H2: line 165 (rewritten).
- **Correction note:** This article said our app, then called Keto Diet Tracker: Low Carb, subtracted erythritol, allulose and monk fruit and stored entries only on your device; the app, now Ketora: Keto Diet Carb Tracker, lists net carbs as total carbs minus fiber and sugar alcohols and does not say where it keeps your logs, which its AI coach reviews, so the article now says only what that listing supports.

- *body line 165*
  - Before: "[Keto Diet Tracker: Low Carb](/apps/keto-diet-tracker/) works from total carbohydrate, subtracting fibre and sweeteners including erythritol, allulose and monk fruit to produce net carbs as you log."
  - After: "[Ketora: Keto Diet Carb Tracker](/apps/keto-diet-tracker/) works from total carbohydrate, subtracting fibre and sugar alcohols to produce net carbs as you log."
- *body line 169*
  - Before: "Both include barcode scanning or fast manual entry, and both are free to download on Google Play, supported by ads, with entries stored on your device rather than on our servers."
  - After: "Both include barcode scanning or fast manual entry, and both are free to download on Google Play and supported by ads. Protein Diet Tracker stores entries on your device rather than on our servers."

#### `electrolytes-on-low-carb` (health-nutrition)

- Published 2026-09-04; updated 2026-09-04 → 2026-10-02. Flagged in section H2: line 158 (rewritten).
- **Correction note:** This article said our app, then called Keto Diet Tracker: Low Carb, logged sodium, potassium and magnesium, had no paid tier and stored logs only on your device; the app, now Ketora: Keto Diet Carb Tracker, has a listing that includes no electrolyte logging, describes an optional Ketora Premium and does not say where it keeps the logs its AI coach reviews, so the article now says so.

- *body line 158*
  - Before: "[Keto Diet Tracker: Low Carb](/apps/keto-diet-tracker/) includes logging for sodium, potassium and magnesium alongside water intake, net carbs, fat and protein, so the whole day sits in one record rather than across several apps."
  - After: "[Ketora: Keto Diet Carb Tracker](/apps/keto-diet-tracker/) logs water alongside net carbs, fat, protein and calories, but its current listing does not include sodium, potassium or magnesium logging, so if you are keeping an electrolyte record it will need to live somewhere else."
- *body line 160*
  - Before: "**The app stores what you enter. It does not measure anything, does not interpret a value, and does not recommend an intake.** Those distinctions matter here more than for most nutrients, because the appropriate intake is genuinely individual."
  - After: "**A tracking app stores what you enter. It does not measure anything, should not interpret a value, and is no substitute for a clinician on what your electrolyte intake should be.** Those distinctions matter here more than for most nutrients, because the appropriate intake is genuinely individual."
- *body line 164*
  - Before: "The app is free to download on Google Play, supported by ads, with no in-app purchases. Logs are stored on your device rather than on our servers, which also means an uninstall takes them with it."
  - After: "The app is free to download on Google Play and supported by ads. Google Play shows no in-app purchases for it, although its listing describes an optional Ketora Premium; the core tracker, barcode scanner, food diary, calorie counter and fasting timer stay free."

#### `glycemic-index-and-load` (health-nutrition)

- Published 2026-09-04; updated 2026-09-04 → 2026-10-02. Flagged in section H2: line 162 (rewritten).
- **Correction note:** This article said our app, then called Keto Diet Tracker: Low Carb, subtracted erythritol, allulose and monk fruit and stored entries only on your device; the app, now Ketora: Keto Diet Carb Tracker, lists net carbs as total carbs minus fiber and sugar alcohols and does not say where it keeps your logs, which its AI coach reviews, so the article now says only what that listing supports.

- *body line 162*
  - Before: "[Keto Diet Tracker: Low Carb](/apps/keto-diet-tracker/) works in net carbs rather than glycemic index, subtracting fibre and sweeteners including erythritol, allulose and monk fruit from total carbohydrate as you log."
  - After: "[Ketora: Keto Diet Carb Tracker](/apps/keto-diet-tracker/) works in net carbs rather than glycemic index, subtracting fibre and sugar alcohols from total carbohydrate as you log."
- *body line 166*
  - Before: "Both are free to download on Google Play, supported by ads, and store entries on your device rather than on our servers."
  - After: "Both are free to download on Google Play and supported by ads, and Protein Diet Tracker stores entries on your device rather than on our servers."

#### `google-play-data-safety-explained` (video-utility)

- Published 2026-09-04; updated 2026-09-04 → 2026-10-02. Flagged in section H2: none (additional corrections).
- **Correction note:** This article said Keto Diet Tracker: Low Carb stored your entries only on your device and needed no account; the app, now Ketora: Keto Diet Carb Tracker, describes an AI coach that reviews your logs and its listing does not say where they are kept, so the article now makes that claim for Protein Diet Tracker only and suggests checking Ketora's Data safety section.

- *body line 169*
  - Before: "[Protein Diet Tracker](/apps/protein-diet-tracker/) and [Keto Diet Tracker: Low Carb](/apps/keto-diet-tracker/) store your entries on your device rather than on our servers, and require no account."
  - After: "[Protein Diet Tracker](/apps/protein-diet-tracker/) stores your entries on your device rather than on our servers, and requires no account."
- *body (added)*
  - Before: (nothing — added)
  - After: "[Ketora: Keto Diet Carb Tracker](/apps/keto-diet-tracker/) is a case to check rather than assume: its listing describes an AI coach that reviews your logs and does not say where that happens, so read its Data safety section before treating it as local-first."

#### `intermittent-fasting-windows-explained` (health-nutrition)

- Published 2026-08-13; updated 2026-08-13 → 2026-10-02. Flagged in section H2: line 81 (rewritten), line 245 (rewritten).
- **Correction note:** This article said our app, then called Keto Diet Tracker, tracked electrolytes, kept photo logs and monthly summaries, did not interpret how your fasting was going, and kept everything on your device with no account; the app, now Ketora: Keto Diet Carb Tracker, lists a fasting timer with reminders, a food diary, recipes, a meal planner, weekly insights and an AI coach that reviews your logs without saying where they are kept, and the article now describes only that.

- *FAQ 6 ("Can Ketora run a fasting window?")*
  - Before: "Keto Diet Tracker includes an intermittent fasting timer alongside its food log, net carb tracking, water tracking and electrolyte tracking. It records the window you choose to run. It does not select a protocol for you, does not judge whether fasting is appropriate for you, and everything stays on your device with no account required."
  - After: "Yes. Ketora: Keto Diet Carb Tracker includes an intermittent fasting timer with 16:8, 18:6, 20:4, OMAD or custom windows and reminders when your eating window opens and closes, alongside its food diary, net carb tracking and water tracking. It runs the window you choose rather than selecting a protocol for you, and it does not judge whether fasting is appropriate for you; its listing describes it as informational, not medical advice."
- *body line 245*
  - Before: "[Keto Diet Tracker](/apps/keto-diet-tracker/) includes an intermittent fasting timer alongside the rest of its logging: a food log with automatic net carb subtraction, a low-carb food database with a barcode scanner, custom foods and recipes, water tracking, electrolyte tracking for sodium, potassium and magnesium, ketone logs for readings you have taken yourself, body measurements, photo logs, and charts with weekly and monthly summaries."
  - After: "[Ketora: Keto Diet Carb Tracker](/apps/keto-diet-tracker/) includes an intermittent fasting timer — 16:8, 18:6, 20:4, OMAD or a custom window, with reminders when your eating window opens and closes — alongside the rest of its logging: a food diary with automatic net carb subtraction, a barcode scanner, custom foods and saved meals, keto recipes and a meal planner, water, weight and body measurements, ketone readings you have taken yourself, and charts with weekly insights."
- *body line 247*
  - Before: "What it does is record the window you choose to run. What it does not do is choose the protocol, tell you whether fasting is appropriate for you, or interpret how it is going. It is free with ads, requires no account, and keeps your data on your device."
  - After: "What it does is run the window you choose. What it does not do is choose the protocol for you or tell you whether fasting is appropriate for you; its listing describes it as informational, not medical advice. It is free to download and supported by ads, and its listing describes an AI coach that reviews your logs and suggests low-carb swaps and small meal-planner changes when you hit a plateau — suggestions to weigh, not a judgement about your health."

#### `keto-flu-explained` (health-nutrition)

- Published 2026-09-04; updated 2026-09-04 → 2026-10-02. Flagged in section H2: line 171 (rewritten).
- **Correction note:** This article said our app, then called Keto Diet Tracker: Low Carb, logged sodium, potassium and magnesium, did not recommend an intake, had no paid tier and stored logs only on your device; the app, now Ketora: Keto Diet Carb Tracker, has a listing with no electrolyte logging that sets daily macro and calorie targets and describes an optional Ketora Premium and an AI coach that reviews your logs, and the article now says only what that listing supports.

- *body line 171*
  - Before: "[Keto Diet Tracker: Low Carb](/apps/keto-diet-tracker/) keeps net carbs, fat, protein, water, sodium, potassium and magnesium in one daily record, alongside an intermittent fasting timer and space for any ketone readings you have taken yourself. Charts, measurements and weekly summaries turn that into a history."
  - After: "[Ketora: Keto Diet Carb Tracker](/apps/keto-diet-tracker/) keeps net carbs, fat, protein, calories and water in one daily record, alongside an intermittent fasting timer and space for any ketone readings you have taken yourself. Its current listing does not include sodium, potassium or magnesium logging. Charts, body measurements and weekly insights turn that into a history."
- *body line 173*
  - Before: "**The app records what you enter.** It does not measure anything, does not interpret a symptom, does not diagnose, and does not recommend an intake."
  - After: "**The app records what you enter.** It does not measure anything, does not interpret a symptom and does not diagnose; its listing describes it as informational, not medical advice."
- *body line 175*
  - Before: "It is free to download on Google Play, supported by ads, with no in-app purchases. Logs are stored on your device rather than on our servers."
  - After: "It is free to download on Google Play and supported by ads. Google Play shows no in-app purchases for it, although its listing describes an optional Ketora Premium; the core tracker, barcode scanner, food diary, calorie counter and fasting timer stay free."

#### `keto-macros-explained` (health-nutrition)

- Published 2026-09-04; updated 2026-09-04 → 2026-10-02. Flagged in section H2: line 234 (rewritten).
- **Correction note:** This article said our app, then called Keto Diet Tracker: Low Carb, subtracted erythritol, allulose and monk fruit, sent carb-limit alerts, let you change its starting macros freely, logged electrolytes, GKI and photos, kept monthly summaries, had no paid tier and kept logs only on your device; the app, now Ketora: Keto Diet Carb Tracker, lists net carbs as total carbs minus fiber and sugar alcohols, a progress ring, daily targets with custom macro goals in an optional Ketora Premium, and an AI coach that reviews your logs, and the article now describes only that.

- *FAQ 6 ("Does Ketora set my macros for me?")*
  - Before: "A built-in calculator turns details you enter — age, height, weight and activity level — into starting fat, protein and net carb figures that you are free to change. That is a formula producing a suggestion, not an assessment of you, and it is meant to be overwritten once you know better."
  - After: "Ketora: Keto Diet Carb Tracker asks a few questions about your body and goals and turns the answers into daily fat, protein, carb and calorie targets, and you can switch between strict keto, lazy keto and a flexible low-carb approach. That is a calculation producing a suggestion, not an assessment of you. Its listing puts custom macro goals, for setting your own figures, in an optional Ketora Premium."
- *body line 234*
  - Before: "[Keto Diet Tracker: Low Carb](/apps/keto-diet-tracker/) does the net carb subtraction as you log — fiber and sweeteners such as erythritol, allulose and monk fruit come off total carbohydrate automatically — and can alert you when a day passes a limit you set yourself. A low-carb food database and barcode scanner cover packaged items, custom foods and recipes cover anything you cook, and a meal planner lets you lay out breakfast, lunch, dinner and desserts in advance."
  - After: "[Ketora: Keto Diet Carb Tracker](/apps/keto-diet-tracker/) does the net carb subtraction as you log — fiber and sugar alcohols come off total carbohydrate automatically — and a progress ring shows how much of your daily limit is left. A barcode scanner covers packaged items, custom foods and saved meals cover what you make yourself, and keto recipes with net carbs per serving feed a meal planner that turns the week into a grocery list."
- *body line 236*
  - Before: "The built-in calculator turns details you enter, such as age, height, weight and activity level, into starting fat, protein and net carb figures you can change. It is a formula generating a suggestion, not an assessment of you. Around the food log sit water, sodium, potassium and magnesium, an intermittent fasting timer, ketone readings you have taken yourself with blood, urine strips or a breath meter including GKI, body measurements, photo logs, charts and weekly and monthly summaries."
  - After: "A few questions about your body and goals produce starting fat, protein, carb and calorie targets, and you can switch between strict keto, lazy keto and a flexible low-carb approach; the listing puts custom macro goals in the optional Ketora Premium. It is a calculation generating a suggestion, not an assessment of you. Around the food log sit water, weight and body measurements, an intermittent fasting timer, ketone readings you have taken yourself from blood, breath or urine strips, charts and weekly insights."
- *body line 238*
  - Before: "It is free on Google Play, supported by ads, with no in-app purchases. No account is required and your logs stay on your device rather than on our servers, which also means an uninstall takes the history with it."
  - After: "It is free on Google Play and supported by ads; Google Play shows no in-app purchases for it, although its listing describes an optional Ketora Premium."

#### `low-carb-tracking-apps-compared` (health-nutrition)

- Published 2026-09-04; updated 2026-09-04 → 2026-10-02. Flagged in section H2: line 79 (rewritten), line 83 (rewritten), line 157 (rewritten), line 208 (rewritten), line 220 (rewritten).
- **Correction note:** This article said our app, then called Keto Diet Tracker: Low Carb, had no paid tier, subtracted erythritol, allulose and monk fruit, sent carb-limit alerts, logged electrolytes, GKI and photos, kept monthly summaries and stored logs only on the device, and its description dated the research to August; the app, now Ketora: Keto Diet Carb Tracker, lists net carbs as total carbs minus fiber and sugar alcohols, keto recipes, a meal planner, an AI coach that reviews your logs and an optional Ketora Premium, and the comparison now describes only what that listing supports.

- *description*
  - Before: "Verified August 2026."
  - After: "Checked September and October 2026."
- *FAQ 3 ("Is there a low-carb tracker with no subscription at all?")*
  - Before: "Keto Diet Tracker: Low Carb is free to download on Google Play, is supported by ads, and has no in-app purchases. Everything the app does — the net carb calculation, the barcode scanner, the meal planner, the ketone and fasting logs, the weekly and monthly summaries — is in that free download."
  - After: "Ketora: Keto Diet Carb Tracker is free to download on Google Play and supported by ads, and Google Play shows no in-app purchases for it. Its listing, though, describes an optional Ketora Premium that unlocks custom macro goals, advanced ketosis charts, unlimited keto recipes, the full meal planner and data export, while the core tracker, barcode scanner, food diary, calorie counter and fasting timer stay free; the listing does not say how Premium is priced."
- *FAQ 4 ("Can a keto app measure my ketone levels?")*
  - Before: "Keto Diet Tracker records blood, urine strip and breath readings including GKI, and it does not measure anything itself."
  - After: "Ketora records blood, breath and urine strip readings you have taken yourself, and it does not measure anything itself."
- *body line 157*
  - Before: "[Keto Diet Tracker: Low Carb](/apps/keto-diet-tracker/) subtracts fiber along with erythritol, allulose and monk fruit from total carbohydrate each time you log a food, and it can alert you when a day passes a limit you set yourself."
  - After: "[Ketora: Keto Diet Carb Tracker](/apps/keto-diet-tracker/) subtracts fiber and sugar alcohols from total carbohydrate each time you log a food, shows net and total carbs side by side, and keeps a progress ring of how much of your daily limit is left."
- *body line 165*
  - Before: "If you want the app to also be where you get recipes and where you talk to other people doing the same thing, that is a real reason to pick it, and it is a reason we cannot match."
  - After: "If you want the app to also be where you get recipes and where you talk to other people doing the same thing, that is a real reason to pick it. Ours now has keto recipes and a meal planner too, but its listing describes no community or course content, so on that combination it cannot match."
- *body line 183*
  - Before: "Ours is built narrowly around the low-carb day. The net carb subtraction runs automatically on every entry, with an optional alert when a day passes the limit you chose. There is a low-carb food database and a barcode scanner for packaged items, custom foods and recipes for anything you cook, and a meal planner covering breakfast, lunch, dinner and desserts. A built-in macro calculator turns details you enter — age, height, weight, activity level — into starting fat, protein and net carb figures you are free to change."
  - After: "Ours is built around the low-carb day. The net carb subtraction — total carbohydrate minus fiber and sugar alcohols — runs automatically on every entry, with net and total carbs side by side and a progress ring showing how much of your daily limit is left. A barcode scanner fills in nutrition from a label, and you can save favourite meals, copy yesterday's entries and add custom foods. A few questions about your body and goals produce daily fat, protein, carb and calorie targets, and you can switch between strict keto, lazy keto and a flexible low-carb approach. Keto recipes show net carbs per serving, and a meal planner turns the week into a grocery list."
- *body line 185*
  - Before: "Around the food sit the other logs: ketone readings you took yourself with blood, urine strips or a breath meter including GKI, an intermittent fasting timer, water, and sodium, potassium and magnesium. Body measurements, photo logs, charts and weekly and monthly summaries hold the history."
  - After: "Around the food sit the other logs: ketone readings you took yourself from blood, breath or urine strips, an intermittent fasting timer with 16:8, 18:6, 20:4, OMAD or custom windows, water, weight and body measurements. Charts and weekly insights hold the history, and the listing describes an AI coach that reviews your logs and suggests low-carb swaps and recipes."
- *body line 187*
  - Before: "It is free to download on Google Play, supported by ads, and it has **no in-app purchases** — everything listed above is in that free download. No account is required, and logs are stored locally on your device rather than on our servers."
  - After: "It is free to download on Google Play and supported by ads, and Google Play shows **no in-app purchases** for it. Its listing, however, describes an optional **Ketora Premium** that unlocks custom macro goals, advanced ketosis charts, unlimited keto recipes, the full meal planner and data export; the core tracker, barcode scanner, food diary, calorie counter and fasting timer stay free."
- *body line 189*
  - Before: "What it does not have: no wearable or device integrations, no community, no recipe marketplace or course content, and no full micronutrient panel beyond the electrolytes named above. Those are the trades we made to keep it a single-purpose log."
  - After: "What its listing does not describe: wearable or device integrations, a community, course content, electrolyte logging or a micronutrient panel. If any of those matters to you, one of the others is the better fit."
- *body line 195*
  - Before: "Carb Manager names ketone, blood glucose, insulin and GKI tracking; ours records blood, urine strip and breath readings including GKI."
  - After: "Carb Manager names ketone, blood glucose, insulin and GKI tracking; ours records blood, breath and urine strip readings."
- *body line 199*
  - Before: "Ours logs all three alongside water."
  - After: "Ours logs water, but its current listing does not include electrolyte logging, so if you track those three you will need somewhere else to keep them."
- *body line 208*
  - Before: "| Keto Diet Tracker: Low Carb | Free to download, supported by ads, no in-app purchases."
  - After: "| Ketora: Keto Diet Carb Tracker | Our own listing, read on 2 October 2026: free to download and supported by ads, with no in-app purchases shown by Google Play, but the listing describes an optional Ketora Premium (custom macro goals, advanced ketosis charts, unlimited keto recipes, the full meal planner and data export)."
- *body line 210*
  - Before: "The pattern is worth naming without judging it: the general-purpose trackers monetise through subscriptions and put some target-setting and automation behind them, while ours monetises through ads and puts everything in the download."
  - After: "The pattern is worth naming without judging it: the general-purpose trackers monetise through subscriptions and put some target-setting and automation behind them. Ours is supported by ads, and its listing also describes an optional Premium tier with custom macro goals among the extras, so the comparison is about where each line falls rather than whether there is one."
- *body line 220*
  - Before: "**Pick [Keto Diet Tracker: Low Carb](/apps/keto-diet-tracker/) if** you want the net carb subtraction handled with a stated rule, you log ketones or fasting windows or electrolytes, and you would rather have ads than a subscription."
  - After: "**Pick [Ketora: Keto Diet Carb Tracker](/apps/keto-diet-tracker/) if** you want the net carb subtraction handled with a stated rule, you log ketones or fasting windows, and you would rather start from an ad-supported app whose core tracker, scanner, diary and fasting timer stay free."
- *body line 232*
  - Before: (nothing — added)
  - After: "Statements about our own app were re-checked against its Google Play listing on 2 October 2026, after it was renamed and its listing rewritten."

#### `net-carbs-explained-keto-tracking` (health-nutrition)

- Published 2026-08-09; updated 2026-08-13 → 2026-10-02. Flagged in section H2: none (additional corrections).
- **Correction note:** This article said our app, then called Keto Diet Tracker: Low Carb, subtracted erythritol, allulose and monk fruit, sent carb-limit alerts, left the carb limit entirely to you, let you change its starting macros freely, logged electrolytes, GKI and photos, kept monthly summaries, had no paid tier and kept logs only on your device; the app, now Ketora: Keto Diet Carb Tracker, lists net carbs as total carbs minus fiber and sugar alcohols, daily targets from a few questions with custom macro goals in an optional Ketora Premium, and an AI coach that reviews your logs, and the article now describes only that.

- *FAQ 6 ("Does Ketora do the subtraction for me?")*
  - Before: "It takes total carbohydrate and subtracts fiber along with sweeteners such as erythritol, allulose and monk fruit each time you log a food, and it can alert you when a day passes a limit you have set yourself. You choose the limit; the app does not pick a number for you."
  - After: "Ketora: Keto Diet Carb Tracker takes total carbohydrate and subtracts fiber and sugar alcohols each time you log a food, shows net and total carbs side by side, and keeps a progress ring of how much of your daily limit is left. Its daily targets come from a few questions about your body and goals, so treat them as a starting point rather than a recommendation for you."
- *body line 219*
  - Before: "Fiber and sweeteners including erythritol, allulose and monk fruit come off total carbohydrate automatically as you log, and the app can alert you when a day passes a limit you set yourself. A low-carb food database and barcode scanner cover packaged items, custom foods and recipes cover anything you cook, and a meal planner lets you lay out breakfast, lunch, dinner and desserts in advance."
  - After: "Fiber and sugar alcohols come off total carbohydrate automatically as you log, net and total carbs show side by side, and a progress ring shows how much of your daily limit is left. A barcode scanner covers packaged items, custom foods and saved meals cover what you make yourself, and keto recipes with net carbs per serving feed a meal planner that turns the week into a grocery list."
- *body line 221*
  - Before: "A built-in calculator turns details you enter — age, height, weight, activity level — into starting fat, protein and net carb figures you are free to change. That is a starting point generated from a formula, not an assessment of you, and it is meant to be overwritten once you know better."
  - After: "A few questions about your body and goals produce starting fat, protein, carb and calorie targets, and you can switch between strict keto, lazy keto and a flexible low-carb approach. That is a starting point generated from your answers, not an assessment of you; the listing puts custom macro goals, for setting your own figures, in the optional Ketora Premium."
- *body line 223*
  - Before: "Around the food log sit the other things low-carb eaters tend to record: ketone readings you have taken yourself with blood, urine strips or a breath meter including GKI, an intermittent fasting timer, water, and sodium, potassium and magnesium."
  - After: "Around the food log sit the other things low-carb eaters tend to record: ketone readings you have taken yourself from blood, breath or urine strips, an intermittent fasting timer, water and weight."
- *body line 223*
  - Before: "Charts, body measurements, photo logs and weekly and monthly summaries turn the entries into a record you can look back over."
  - After: "Charts, body measurements and weekly insights turn the entries into a record you can look back over."
- *body line 225*
  - Before: "It is free on Google Play, supported by ads, with no in-app purchases. No account is required and your logs stay on your device rather than on our servers — which also means an uninstall takes the history with it."
  - After: "It is free on Google Play and supported by ads; Google Play shows no in-app purchases for it, although its listing describes an optional Ketora Premium."

#### `plant-vs-animal-protein` (health-nutrition)

- Published 2026-09-04; updated 2026-09-04 → 2026-10-02. Flagged in section H2: none (additional corrections).
- **Correction note:** This article said both of our nutrition apps store your entries on your device; Keto Diet Tracker: Low Carb, now Ketora: Keto Diet Carb Tracker, describes an AI coach that reviews your logs and its listing does not say where they are kept, so the article now makes that claim for Protein Diet Tracker only.

- *body line 155*
  - Before: "Both are free to download on Google Play, supported by ads, and store your entries on your device rather than on our servers."
  - After: "Both are free to download on Google Play and supported by ads, and Protein Diet Tracker stores your entries on your device rather than on our servers."

#### `reading-nutrition-labels` (health-nutrition)

- Published 2026-09-04; updated 2026-09-04 → 2026-10-02. Flagged in section H2: line 82 (rewritten), line 247 (rewritten).
- **Correction note:** This article said our app, then called Keto Diet Tracker: Low Carb, had a low-carb food database, subtracted erythritol, allulose and monk fruit, sent carb-limit alerts, had no paid tier and, like Protein Diet Tracker, kept logs off our servers with no account; the app, now Ketora: Keto Diet Carb Tracker, lists a barcode scanner, net carbs as total carbs minus fiber and sugar alcohols, a progress ring and an optional Ketora Premium and does not say where it keeps the logs its AI coach reviews, and the article now says only that.

- *FAQ 6 ("Can an app read labels for me?")*
  - Before: "Keto Diet Tracker: Low Carb has a barcode scanner and a low-carb food database, and it subtracts fiber and sweeteners such as erythritol, allulose and monk fruit from total carbohydrate as you log."
  - After: "Ketora: Keto Diet Carb Tracker has a barcode scanner that fills in nutrition from a label, and it subtracts fiber and sugar alcohols from total carbohydrate as you log."
- *body line 247*
  - Before: "[Keto Diet Tracker: Low Carb](/apps/keto-diet-tracker/) is the more label-focused of our two: a barcode scanner and a low-carb food database pull packaged items in, custom foods and recipes cover anything you cook, and fiber and sweeteners such as erythritol, allulose and monk fruit come off total carbohydrate automatically as you log. It can alert you when a day passes a limit you set yourself, and it is free on Google Play, supported by ads, with no in-app purchases."
  - After: "[Ketora: Keto Diet Carb Tracker](/apps/keto-diet-tracker/) is the more label-focused of our two: a barcode scanner fills in nutrition from a label, custom foods and saved meals cover anything you make yourself, and fiber and sugar alcohols come off total carbohydrate automatically as you log. A progress ring shows how much of your daily limit is left. It is free on Google Play and supported by ads; Google Play shows no in-app purchases for it, although its listing describes an optional Ketora Premium."
- *body line 251*
  - Before: "Neither stores your logs on our servers or requires an account, which also means an uninstall takes the history with it."
  - After: "Protein Diet Tracker does not store your logs on our servers or require an account, which also means an uninstall takes the history with it; Ketora's listing does not say where its logs are kept."

#### `serving-size-vs-portion-size` (health-nutrition)

- Published 2026-09-04; updated 2026-09-04 → 2026-10-02. Flagged in section H2: none (additional corrections).
- **Correction note:** This article said both of our nutrition apps store your entries on your device; Keto Diet Tracker: Low Carb, now Ketora: Keto Diet Carb Tracker, describes an AI coach that reviews your logs and its listing does not say where they are kept, so the article now makes that claim for Protein Diet Tracker only.

- *body line 173*
  - Before: "Both are free to download on Google Play, supported by ads, and store entries on your device rather than on our servers."
  - After: "Both are free to download on Google Play and supported by ads, and Protein Diet Tracker stores entries on your device rather than on our servers."

#### `sugar-alcohols-explained` (health-nutrition)

- Published 2026-09-04; updated 2026-09-04 → 2026-10-02. Flagged in section H2: line 165 (rewritten).
- **Correction note:** This article said our app, then called Keto Diet Tracker: Low Carb, subtracted erythritol, allulose and monk fruit, had no paid tier, needed no account and kept logs only on your device; the app, now Ketora: Keto Diet Carb Tracker, lists net carbs as total carbs minus fiber and sugar alcohols, describes an optional Ketora Premium and does not say where it keeps the logs its AI coach reviews, so the article now says only what that listing supports.

- *body line 165*
  - Before: "[Keto Diet Tracker: Low Carb](/apps/keto-diet-tracker/) subtracts fibre and sweeteners including erythritol, allulose and monk fruit from total carbohydrate automatically as you log, so the net carb figure is calculated rather than done by hand in a supermarket aisle."
  - After: "[Ketora: Keto Diet Carb Tracker](/apps/keto-diet-tracker/) subtracts fibre and sugar alcohols from total carbohydrate automatically as you log — the fibre-plus-sugar-alcohols convention above — so the net carb figure is calculated rather than done by hand in a supermarket aisle."
- *body line 169*
  - Before: "The app is free to download on Google Play, supported by ads, with no in-app purchases. No account is required and your logs stay on your device rather than on our servers."
  - After: "The app is free to download on Google Play and supported by ads. Google Play shows no in-app purchases for it, although its listing describes an optional Ketora Premium; the core tracker, barcode scanner, food diary, calorie counter and fasting timer stay free."

#### `tdee-and-energy-balance` (health-nutrition)

- Published 2026-09-04; updated 2026-09-04 → 2026-10-02. Flagged in section H2: none (additional corrections).
- **Correction note:** This article said our app, then called Keto Diet Tracker: Low Carb, turned your details into starting fat, protein and net carb figures you were free to adjust, and that it stored entries only on your device; the app, now Ketora: Keto Diet Carb Tracker, lists daily fat, protein, carb and calorie targets from a few questions, puts custom macro goals in an optional Ketora Premium and does not say where it keeps the logs its AI coach reviews, and the article now says so.

- *body line 173*
  - Before: "[Keto Diet Tracker: Low Carb](/apps/keto-diet-tracker/) includes a macro calculator that turns details you enter into starting fat, protein and net carb figures — described as a starting point you are free to adjust, which is the honest framing for any such calculation."
  - After: "[Ketora: Keto Diet Carb Tracker](/apps/keto-diet-tracker/) does produce numbers: a few questions about your body and goals become daily fat, protein, carb and calorie targets, presented as targets to start from — the honest framing for any such calculation, and exactly the kind of estimate to test against your own results. Its listing puts custom macro goals in an optional Ketora Premium."
- *body line 175*
  - Before: "Both are free to download on Google Play, supported by ads, and store entries on your device rather than on our servers."
  - After: "Both are free to download on Google Play and supported by ads, and Protein Diet Tracker stores entries on your device rather than on our servers."

#### `what-is-a-ketone-reading` (health-nutrition)

- Published 2026-09-04; updated 2026-09-04 → 2026-10-02. Flagged in section H2: none (additional corrections).
- **Correction note:** This article said our app, then called Keto Diet Tracker: Low Carb, recorded GKI, logged electrolytes and photos, kept monthly summaries, did not interpret readings, had no paid tier and kept logs only on your device; the app, now Ketora: Keto Diet Carb Tracker, lists blood, breath and urine strip readings, charts with weekly and ketosis insights, an optional Ketora Premium and an AI coach that reviews your logs, and the article now describes only that.

- *FAQ 5 ("What is GKI?")*
  - Before: "Keto Diet Tracker can record it alongside the underlying readings you have taken."
  - After: (removed)
- *FAQ 6 ("Does Ketora measure ketones?")*
  - Before: "It stores readings you have already taken yourself with a blood meter, urine strips or a breath meter, including GKI, and keeps them alongside your food log, fasting timer, water and electrolytes. The app does not measure anything and does not interpret a reading for you."
  - After: "Ketora: Keto Diet Carb Tracker stores readings you have already taken yourself from blood, breath or urine strips and keeps them alongside your food diary, fasting timer, water and weight. The app does not measure anything itself."
- *body line 218*
  - Before: "[Keto Diet Tracker: Low Carb](/apps/keto-diet-tracker/) is built with that framing. It has a place to record blood, urine strip and breath meter readings you have taken yourself, including GKI, and it keeps them next to the rest of the day — the food log with net carbs worked out for you, an intermittent fasting timer, water, and sodium, potassium and magnesium. Charts, body measurements, photo logs and weekly and monthly summaries turn the entries into a history you can look back over."
  - After: "[Ketora: Keto Diet Carb Tracker](/apps/keto-diet-tracker/) has a place to record blood, breath and urine strip readings you have taken yourself, and it keeps them next to the rest of the day — the food diary with net carbs worked out for you, an intermittent fasting timer, water and weight. Charts, body measurements and weekly insights turn the entries into a history you can look back over; whatever those charts show, the framing above still applies to the readings in them."
- *body line 220*
  - Before: "The app stores what you enter. It does not measure anything itself, and it does not interpret a reading. It is free on Google Play, supported by ads, with no in-app purchases; no account is required and your logs stay on your device rather than on our servers, which also means an uninstall takes them with it."
  - After: "The app stores what you enter and does not measure anything itself, and its listing describes it as informational, not medical advice. It is free on Google Play and supported by ads; Google Play shows no in-app purchases for it, although its listing describes an optional Ketora Premium."

#### `why-food-databases-disagree` (health-nutrition)

- Published 2026-09-04; updated 2026-09-04 → 2026-10-02. Flagged in section H2: line 165 (rewritten).
- **Correction note:** This article said our app, then called Keto Diet Tracker: Low Carb, let you add custom recipes, that neither of our apps claims database perfection, and that both store entries on your device; the app, now Ketora: Keto Diet Carb Tracker, has a listing that calls its food database large and verified and its net carbs accurate and does not say where it keeps the logs its AI coach reviews, and the article now says so.

- *body line 165*
  - Before: "[Keto Diet Tracker: Low Carb](/apps/keto-diet-tracker/) includes a low-carb food database and a barcode scanner for packaged items, plus custom foods and recipes for anything you make yourself."
  - After: "[Ketora: Keto Diet Carb Tracker](/apps/keto-diet-tracker/) includes a barcode scanner for packaged items, plus custom foods and saved meals for anything you make yourself."
- *body line 169*
  - Before: "Neither app claims database perfection, and we would rather say why than imply a precision the underlying data cannot support."
  - After: "Ketora's Google Play listing describes its scanner as backed by a large, verified food database and promises accurate net carbs. For the reasons this article sets out, no database entry can be guaranteed to match the food in front of you, ours included, and we would rather say why than imply a precision the underlying data cannot support."
- *body line 171*
  - Before: "Both are free to download on Google Play, supported by ads, and store entries on your device rather than on our servers."
  - After: "Both are free to download on Google Play and supported by ads, and Protein Diet Tracker stores entries on your device rather than on our servers."

</details>

Name-only articles (4; no correction note, `updatedAt` unchanged):

| Article | Category | Replacements |
| --- | --- | ---: |
| `how-much-protein-per-day` | health-nutrition | 1 |
| `how-to-hit-a-protein-goal` | health-nutrition | 1 |
| `how-to-track-protein-intake` | health-nutrition | 1 |
| `protein-tracking-apps-compared` | health-nutrition | 1 |

### Vegas Casino Slots JACKPOT WIN

<details><summary>3 corrected articles — notes and every sentence before → after</summary>

#### `slot-reel-mechanics-explained` (anime-creative)

- Published 2026-09-22; updated 2026-09-22 → 2026-10-02. Flagged in section H2: line 70 (kept), line 148 (rewritten), line 150 (kept).
- **Correction note:** This article said our app, then called Anime Casino Slot Machine Game, had twenty-five anime and manga machines using the mechanics defined here, Mini, Major and Grand meters and coins that cannot be transferred or sold; the app, now Vegas Casino Slots JACKPOT WIN, has a listing that describes Vegas-style reel play with virtual coins and virtual jackpots, no cash payouts or real-world prizes and coins that cannot be redeemed for cash, and the article now says only that.

- *FAQ 4 ("Are the mechanics in Vegas Casino Slots JACKPOT WIN the same as a real slot machine's?")*
  - Before: "Our app uses roaming wilds, split boards, expanding reels, cascading symbols, breakable layers and interactive bonus rounds across twenty-five machines, and Mini, Major and Grand meters that build locally as you spin. All of it runs on virtual coins that cannot be transferred, sold or redeemed, and the meters carry no real-money prizes, so the mechanics affect pacing rather than money."
  - After: "Our app is reel-based slot play with virtual coins and virtual jackpots, and its listing does not itemise which of the mechanics on this page each machine uses. Wins and jackpots are paid in virtual coins that have no real-world monetary value and cannot be redeemed for cash, with no cash payouts or real-world prizes, so whatever mechanics a machine uses affect pacing rather than money."
- *body line 132*
  - Before: "Our own app uses both terms, and the general principle is the one above — a board with memory produces chains, and chains change the distribution rather than the average."
  - After: "The general principle is the one above — a board with memory produces chains, and chains change the distribution rather than the average."
- *body line 146 (heading)*
  - Before: "## Where these terms appear in our own app"
  - After: "## Where our own app fits"
- *body line 148*
  - Before: "Anime Casino Slot Machine Game is built by Reign Creative, and it is the reason this glossary is framed the way it is. Its twenty-five machines use roaming wilds, split boards, expanding reels, cascading symbols, breakable layers and interactive bonus rounds, with each machine carrying its own artwork, music, symbol set and reel mechanics. Five of them are built as manga pages with ink effects and page-turn bonus sequences; five more run a kawaii theme through cafés, pop festivals, dream clubs and prize worlds. Mini, Major and Grand meters build locally as you spin, with no real-money prizes attached, and every machine is playable from the start."
  - After: "Vegas Casino Slots JACKPOT WIN is built by Reign Creative, and it is why this glossary keeps asking what each mechanic means when no money is at stake. Its current Google Play listing describes reel-based slot machines in a Las Vegas-style setting: you spin with virtual coins, watch for symbols that line up into a winning combination, and chase virtual jackpots. The listing does not itemise which of the mechanics above any machine uses, so we do not claim them here."
- *body line 150*
  - Before: "One design choice there is worth calling out because it is a legibility decision rather than a maths one: decorative borders are kept outside the reels, paylines and controls, so the board stays readable while it animates. A mechanic you cannot see resolve is a mechanic you cannot learn."
  - After: "What the listing does state is the boundary that matters most on this page: wins and jackpots use virtual coins, there are no cash payouts or real-world prizes, and the coins have no real-world monetary value and cannot be redeemed for cash. Whatever a jackpot display shows in a game built that way, it is a score rather than a pot."

#### `slot-volatility-explained` (anime-creative)

- Published 2026-09-22; updated 2026-09-22 → 2026-10-02. Flagged in section H2: line 71 (rewritten), line 141 (rewritten), line 143 (rewritten).
- **Correction note:** This article said our app, then called Anime Casino Slot Machine Game, had twenty-five anime and manga machines each with its own volatility, coins that cannot be transferred or sold, a coin balance refilled by daily rewards and an app page listing every machine; the app, now Vegas Casino Slots JACKPOT WIN, has a listing that describes reel-based slots with virtual coins and virtual jackpots and coins that cannot be redeemed for cash, without detailing machines, and the article now says only that.

- *FAQ 4 ("Does volatility matter in a game that only uses virtual coins?")*
  - Before: "In a social casino game such as Anime Casino Slot Machine Game, coins cannot be transferred, sold or redeemed, so volatility determines how often something happens and how long a coin balance lasts, not what anything costs. A player who wants steady activity in a short session and a player who wants rare, large events are looking for opposite machines from the same set of twenty-five."
  - After: "In a social casino game such as Vegas Casino Slots JACKPOT WIN, coins have no real-world monetary value and cannot be redeemed for cash, so volatility determines how often something happens and how long a coin balance lasts, not what anything costs. A player who wants steady activity in a short session and a player who wants rare, large events are looking for opposite kinds of machine."
- *body line 141*
  - Before: "Anime Casino Slot Machine Game is our own app, built by Reign Creative, and it is a social casino game: twenty-five original anime and manga-themed machines played entirely with virtual coins, with no real-money gambling and no way to transfer, sell or redeem those coins. Each of the twenty-five is built with a different theme, reel layout and volatility."
  - After: "Vegas Casino Slots JACKPOT WIN is our own app, built by Reign Creative, and it is a social casino game: reel-based slot machines played with virtual coins and virtual jackpots, with no real-money gambling, no cash payouts or real-world prizes, and coins that have no real-world monetary value and cannot be redeemed for cash."
- *body line 143*
  - Before: "That last clause is the reason this article exists."
  - After: "That is the reason this article exists."
- *body line 143*
  - Before: "The [app page](/apps/anime-casino-slots/) lists what each machine is built around, and the coin balance simply refills through daily rewards rather than through a wallet."
  - After: "The game's listing does not publish a volatility figure for any machine, so the two levers above — how often something lands and how large it is when it does — are the way to read one; the [app page](/apps/anime-casino-slots/) covers what the listing does say."

#### `social-casino-vs-real-money-gambling` (anime-creative)

- Published 2026-09-22; updated 2026-09-22 → 2026-10-02. Flagged in section H2: line 51 (rewritten), line 64 (rewritten), line 68 (kept), line 126 (kept).
- **Correction note:** This article said our app, then called Anime Casino Slot Machine Game, had twenty-five anime and manga machines, Mini, Major and Grand jackpot meters and coins that cannot be transferred, sold or redeemed for money, merchandise or prizes; the app, now Vegas Casino Slots JACKPOT WIN, has a listing that describes virtual jackpots, no cash payouts or real-world prizes and coins with no real-world monetary value that cannot be redeemed for cash, and the worked example now rests on those statements.

- *takeaway*
  - Before: "Anime Casino Slot Machine Game, which we build, uses virtual coins only, attaches no real-money prizes to its jackpot meters, and is rated Teen on Google Play; its coins cannot be transferred, sold or redeemed."
  - After: "Vegas Casino Slots JACKPOT WIN, which we build, uses virtual coins only, pays its virtual jackpots in coins with no real-world monetary value, and is rated Teen on Google Play; its listing says the coins cannot be redeemed for cash and there are no cash payouts or real-world prizes."
- *FAQ 2 ("Can you win real money on a virtual-coin slot app?")*
  - Before: "In Anime Casino Slot Machine Game the Mini, Major and Grand meters build locally as you spin and carry no real-money prizes; coins cannot be transferred, sold or redeemed for money, merchandise or physical prizes. A meter in that design is a score that resets, not a pot that pays."
  - After: "In Vegas Casino Slots JACKPOT WIN, wins and jackpots are paid in virtual coins; its listing states that there are no cash payouts or real-world prizes and that the coins have no real-world monetary value and cannot be redeemed for cash. A jackpot in that design is a score, not a pot that pays."
- *body line 128*
  - Before: "It is a social casino game with twenty-five original anime and manga-themed slot machines, played entirely with virtual coins. It does not offer real-money gambling, and coins cannot be transferred, sold or redeemed for money, merchandise or prizes. Its Mini, Major and Grand jackpot meters build locally as you spin, with celebration effects and no real-money prizes attached."
  - After: "It is a social casino game built around slot machines, played with virtual coins. Its listing states that it does not offer real-money gambling or an opportunity to win real money or prizes, that wins and jackpots use virtual coins with no cash payouts or real-world prizes, and that the coins have no real-world monetary value and cannot be redeemed for cash."
- *body line 130*
  - Before: "There is no prize of money or money's worth, because the currency cannot leave the app."
  - After: "There is no prize of money or money's worth, because the listing gives the coins no real-world monetary value and no route to cash or prizes."
- *body line 130*
  - Before: "The meters are scores."
  - After: "The jackpots are scores."

</details>

### Video Player All Formats PRO

Name-only articles (15; no correction note, `updatedAt` unchanged):

| Article | Category | Replacements |
| --- | --- | ---: |
| `android-app-permissions-explained` | video-utility | 1 |
| `android-video-player-guide` | video-utility | 1 |
| `android-video-players-compared` | video-utility | 7 |
| `audio-codecs-explained` | video-utility | 1 |
| `av1-on-android-explained` | video-utility | 1 |
| `battery-and-performance-in-mobile-games` | action-arcade | 1 |
| `frame-rate-and-resolution-explained` | video-utility | 1 |
| `hardware-vs-software-decoding` | video-utility | 1 |
| `how-to-play-mkv-files-on-android` | video-utility | 1 |
| `picture-in-picture-on-android` | video-utility | 1 |
| `remuxing-vs-transcoding` | video-utility | 1 |
| `subtitle-formats-explained` | video-utility | 1 |
| `subtitles-not-working-on-android` | video-utility | 1 |
| `video-codecs-explained` | video-utility | 2 |
| `video-file-formats-explained` | video-utility | 2 |
