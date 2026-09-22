# Keyword-to-URL map — the 250-article expansion

Generated from the published articles by `scripts/build-keyword-url-map-250.mjs`
on 2026-09-22. Re-run it after any content change; it reads the articles rather
than a hand-maintained list, so it cannot drift.

## Read this before using the table

**Every volume, difficulty and CPC value in this document is `unknown`, and
that is a measured fact rather than a gap waiting to be filled.** On 2026-09-22
no source available to this repository published search volume: Google Search
Console (no credentials), Google Ads Keyword Planner (no authenticated access),
Google Trends (HTTP 429) and the commercial providers (no subscription) were
each tested and each unavailable. The one source that did work, Google
Autocomplete, returns no volume component of any kind.

So the "Evidence" column distinguishes only two honest states:

- **Autocomplete** — the exact phrase was returned by Google Autocomplete in the
  2026-09-22 collection (US, English). This proves people phrase queries this
  way. It proves nothing about how many of them there are.
- **editorial** — the phrase was chosen because it names the article's topic
  precisely. No demand evidence of any kind is claimed for it.

Neither state is a volume estimate. Do not convert either into one.

## One phrase, one URL

250 articles, 250 distinct primary phrases, zero
collisions. This is enforced at build time as well: `src/lib/blog/index.ts`
throws if two articles claim the same `primaryKeyword`, case-insensitively,
so a cannibalising pair cannot reach production.

| | Articles | Primary phrases | Observed in Autocomplete |
| --- | ---: | ---: | ---: |
| Cohort A — general portfolio | 50 | 50 | 0 |
| Cohort B — Mental Math & Memory Games | 100 | 100 | 35 |
| Cohort C — World History Timeline Sim | 100 | 100 | 18 |
| **Total** | **250** | **250** | **53** |

Secondary and long-tail phrases for every article are in
`docs/data/keyword-to-url-map-250.csv`, which carries the same rows with the
full keyword lists attached.

## Cohort A — general portfolio articles

| Primary phrase | URL | Intent | Hub | Volume | Difficulty | Evidence |
| --- | --- | --- | --- | --- | --- | --- |
| when do players decline in career mode | [/blog/aging-curves-in-career-sims/](https://reigncreativellc.com/blog/aging-curves-in-career-sims/) | informational | — | `unknown` | `unknown` | editorial |
| are io games real players or bots | [/blog/ai-opponents-vs-real-players-in-io-games/](https://reigncreativellc.com/blog/ai-opponents-vs-real-players-in-io-games/) | informational | — | `unknown` | `unknown` | editorial |
| boss weak points shooter game | [/blog/boss-weak-points-and-module-targeting/](https://reigncreativellc.com/blog/boss-weak-points-and-module-targeting/) | informational | — | `unknown` | `unknown` | editorial |
| how to add tower spots in tower defense | [/blog/build-pads-and-custom-tower-positions/](https://reigncreativellc.com/blog/build-pads-and-custom-tower-positions/) | informational | — | `unknown` | `unknown` | editorial |
| how to bulk scan trading cards | [/blog/bulk-scanning-a-card-collection/](https://reigncreativellc.com/blog/bulk-scanning-a-card-collection/) | informational | — | `unknown` | `unknown` | editorial |
| cantonese sentence final particles | [/blog/cantonese-sentence-final-particles/](https://reigncreativellc.com/blog/cantonese-sentence-final-particles/) | informational | — | `unknown` | `unknown` | editorial |
| college recruiting basketball career mode | [/blog/college-recruiting-in-basketball-career-mode/](https://reigncreativellc.com/blog/college-recruiting-in-basketball-career-mode/) | informational | — | `unknown` | `unknown` | editorial |
| language learning dictation practice | [/blog/dictation-practice-in-a-new-script/](https://reigncreativellc.com/blog/dictation-practice-in-a-new-script/) | informational | — | `unknown` | `unknown` | editorial |
| how important is a goal kicker in rugby | [/blog/drafting-a-goal-kicker-in-rugby/](https://reigncreativellc.com/blog/drafting-a-goal-kicker-in-rugby/) | informational | — | `unknown` | `unknown` | editorial |
| endless mode vs campaign mode | [/blog/endless-mode-vs-campaign-shooters/](https://reigncreativellc.com/blog/endless-mode-vs-campaign-shooters/) | informational | — | `unknown` | `unknown` | editorial |
| stamina and morale in football career mode | [/blog/energy-and-morale-in-match-decisions/](https://reigncreativellc.com/blog/energy-and-morale-in-match-decisions/) | informational | — | `unknown` | `unknown` | editorial |
| coloring app fill tool not working | [/blog/fixing-fill-tool-mistakes-in-coloring-apps/](https://reigncreativellc.com/blog/fixing-fill-tool-mistakes-in-coloring-apps/) | informational | — | `unknown` | `unknown` | editorial |
| heritage language learner | [/blog/heritage-language-learners-shanghainese/](https://reigncreativellc.com/blog/heritage-language-learners-shanghainese/) | informational | — | `unknown` | `unknown` | editorial |
| hockey career mode archetypes | [/blog/hockey-career-archetypes-explained/](https://reigncreativellc.com/blog/hockey-career-archetypes-explained/) | informational | — | `unknown` | `unknown` | editorial |
| how to stay first in io games | [/blog/holding-first-place-in-io-leaderboards/](https://reigncreativellc.com/blog/holding-first-place-in-io-leaderboards/) | informational | — | `unknown` | `unknown` | editorial |
| how do tennis players turn pro | [/blog/junior-circuit-to-pro-tour-path/](https://reigncreativellc.com/blog/junior-circuit-to-pro-tour-path/) | informational | — | `unknown` | `unknown` | editorial |
| lao numbers 1 to 100 | [/blog/lao-numbers-and-prices/](https://reigncreativellc.com/blog/lao-numbers-and-prices/) | informational | — | `unknown` | `unknown` | editorial |
| learn english in marathi | [/blog/learning-english-from-marathi/](https://reigncreativellc.com/blog/learning-english-from-marathi/) | informational | — | `unknown` | `unknown` | editorial |
| malay reduplication | [/blog/malay-reduplication-explained/](https://reigncreativellc.com/blog/malay-reduplication-explained/) | informational | — | `unknown` | `unknown` | editorial |
| mma manager game contracts | [/blog/managing-a-fight-stable/](https://reigncreativellc.com/blog/managing-a-fight-stable/) | informational | — | `unknown` | `unknown` | editorial |
| meal planning for dietary restrictions | [/blog/meal-planning-for-a-dietary-preference/](https://reigncreativellc.com/blog/meal-planning-for-a-dietary-preference/) | informational | — | `unknown` | `unknown` | editorial |
| snake game controls tips | [/blog/momentum-steering-in-snake-style-games/](https://reigncreativellc.com/blog/momentum-steering-in-snake-style-games/) | informational | — | `unknown` | `unknown` | editorial |
| how to photograph cards for centering | [/blog/photographing-cards-for-centring/](https://reigncreativellc.com/blog/photographing-cards-for-centring/) | informational | — | `unknown` | `unknown` | editorial |
| picture in picture not working android | [/blog/picture-in-picture-on-android/](https://reigncreativellc.com/blog/picture-in-picture-on-android/) | informational | — | `unknown` | `unknown` | editorial |
| does height matter in basketball career mode | [/blog/player-body-metrics-in-career-sims/](https://reigncreativellc.com/blog/player-body-metrics-in-career-sims/) | informational | — | `unknown` | `unknown` | editorial |
| how to play big points in tennis | [/blog/playing-the-big-points-in-tennis/](https://reigncreativellc.com/blog/playing-the-big-points-in-tennis/) | informational | — | `unknown` | `unknown` | editorial |
| press conferences in football career mode | [/blog/press-conferences-in-career-mode/](https://reigncreativellc.com/blog/press-conferences-in-career-mode/) | informational | — | `unknown` | `unknown` | editorial |
| shanghainese written in chinese characters | [/blog/reading-shanghainese-characters/](https://reigncreativellc.com/blog/reading-shanghainese-characters/) | informational | — | `unknown` | `unknown` | editorial |
| why do draft pools change | [/blog/rotating-draft-pools-explained/](https://reigncreativellc.com/blog/rotating-draft-pools-explained/) | informational | — | `unknown` | `unknown` | editorial |
| squad rotation in rugby management games | [/blog/rugby-squad-rotation-over-a-season/](https://reigncreativellc.com/blog/rugby-squad-rotation-over-a-season/) | informational | — | `unknown` | `unknown` | editorial |
| what happens at a scouting combine | [/blog/scouting-combine-drills-explained/](https://reigncreativellc.com/blog/scouting-combine-drills-explained/) | informational | — | `unknown` | `unknown` | editorial |
| cascading reels and expanding wilds | [/blog/slot-reel-mechanics-explained/](https://reigncreativellc.com/blog/slot-reel-mechanics-explained/) | informational | — | `unknown` | `unknown` | editorial |
| slot volatility explained | [/blog/slot-volatility-explained/](https://reigncreativellc.com/blog/slot-volatility-explained/) | informational | — | `unknown` | `unknown` | editorial |
| social casino games explained | [/blog/social-casino-vs-real-money-gambling/](https://reigncreativellc.com/blog/social-casino-vs-real-money-gambling/) | informational | — | `unknown` | `unknown` | editorial |
| space galaxy attack arcade vs hardcore | [/blog/space-galaxy-attack-arcade-vs-hardcore/](https://reigncreativellc.com/blog/space-galaxy-attack-arcade-vs-hardcore/) | commercial | — | `unknown` | `unknown` | editorial |
| written cantonese vs standard chinese | [/blog/spoken-vs-written-cantonese/](https://reigncreativellc.com/blog/spoken-vs-written-cantonese/) | informational | — | `unknown` | `unknown` | editorial |
| does player rating matter in squad building | [/blog/style-fit-vs-rating-in-squad-building/](https://reigncreativellc.com/blog/style-fit-vs-rating-in-squad-building/) | informational | — | `unknown` | `unknown` | editorial |
| what does a tennis coach do | [/blog/tennis-coaching-teams-explained/](https://reigncreativellc.com/blog/tennis-coaching-teams-explained/) | informational | — | `unknown` | `unknown` | editorial |
| glow and gradient coloring effects | [/blog/texture-palettes-in-coloring-apps/](https://reigncreativellc.com/blog/texture-palettes-in-coloring-apps/) | informational | — | `unknown` | `unknown` | editorial |
| how to get better at timed quizzes | [/blog/timed-and-survival-quiz-modes/](https://reigncreativellc.com/blog/timed-and-survival-quiz-modes/) | informational | — | `unknown` | `unknown` | editorial |
| how do golfers qualify for tournaments | [/blog/tour-eligibility-and-schedules/](https://reigncreativellc.com/blog/tour-eligibility-and-schedules/) | informational | — | `unknown` | `unknown` | editorial |
| tower defense camera controls | [/blog/tower-defense-camera-controls/](https://reigncreativellc.com/blog/tower-defense-camera-controls/) | informational | — | `unknown` | `unknown` | editorial |
| how to learn to write khmer | [/blog/tracing-practice-for-new-scripts/](https://reigncreativellc.com/blog/tracing-practice-for-new-scripts/) | informational | — | `unknown` | `unknown` | editorial |
| two minute drill clock management | [/blog/two-minute-clock-management/](https://reigncreativellc.com/blog/two-minute-clock-management/) | informational | — | `unknown` | `unknown` | editorial |
| which attributes to upgrade hockey career | [/blog/underrated-attributes-in-hockey-career-mode/](https://reigncreativellc.com/blog/underrated-attributes-in-hockey-career-mode/) | informational | — | `unknown` | `unknown` | editorial |
| recipe app allergy warnings | [/blog/what-allergy-flags-in-recipe-apps-miss/](https://reigncreativellc.com/blog/what-allergy-flags-in-recipe-apps-miss/) | informational | — | `unknown` | `unknown` | editorial |
| where is marathi spoken | [/blog/where-marathi-is-spoken/](https://reigncreativellc.com/blog/where-marathi-is-spoken/) | informational | — | `unknown` | `unknown` | editorial |
| why do card prices differ between apps | [/blog/why-card-price-estimates-disagree/](https://reigncreativellc.com/blog/why-card-price-estimates-disagree/) | informational | — | `unknown` | `unknown` | editorial |
| why do meal plans fail | [/blog/why-meal-plans-fail-midweek/](https://reigncreativellc.com/blog/why-meal-plans-fail-midweek/) | informational | — | `unknown` | `unknown` | editorial |
| how to beat tower defense boss waves | [/blog/world-boss-waves-in-tower-defense/](https://reigncreativellc.com/blog/world-boss-waves-in-tower-defense/) | informational | — | `unknown` | `unknown` | editorial |

## Cohort B — Mental Math & Memory Games

| Primary phrase | URL | Intent | Hub | Volume | Difficulty | Evidence |
| --- | --- | --- | --- | --- | --- | --- |
| abstract reasoning test explained | [/blog/abstract-reasoning-tests-explained/](https://reigncreativellc.com/blog/abstract-reasoning-tests-explained/) | informational | iq-tests-and-reasoning | `unknown` | `unknown` | editorial |
| accessible brain training apps | [/blog/accessibility-in-brain-training-apps/](https://reigncreativellc.com/blog/accessibility-in-brain-training-apps/) | informational | brain-training-games | `unknown` | `unknown` | editorial |
| accuracy vs speed in practice | [/blog/accuracy-before-speed/](https://reigncreativellc.com/blog/accuracy-before-speed/) | informational | brain-training-games | `unknown` | `unknown` | editorial |
| how to add a list of numbers in your head | [/blog/adding-a-list-of-numbers-mentally/](https://reigncreativellc.com/blog/adding-a-list-of-numbers-mentally/) | informational | mental-math | `unknown` | `unknown` | editorial |
| analogy questions explained | [/blog/analogy-puzzles-explained/](https://reigncreativellc.com/blog/analogy-puzzles-explained/) | informational | logic-and-pattern-puzzles | `unknown` | `unknown` | editorial |
| are online iq tests accurate | [/blog/are-online-iq-tests-accurate/](https://reigncreativellc.com/blog/are-online-iq-tests-accurate/) | informational | iq-tests-and-reasoning | `unknown` | `unknown` | Autocomplete |
| arithmetic sequence explained | [/blog/arithmetic-sequences-explained/](https://reigncreativellc.com/blog/arithmetic-sequences-explained/) | informational | logic-and-pattern-puzzles | `unknown` | `unknown` | Autocomplete |
| attention span exercises for adults | [/blog/attention-span-exercises/](https://reigncreativellc.com/blog/attention-span-exercises/) | informational | memory-and-attention | `unknown` | `unknown` | Autocomplete |
| backward digit span explained | [/blog/backward-digit-span/](https://reigncreativellc.com/blog/backward-digit-span/) | informational | memory-and-attention | `unknown` | `unknown` | editorial |
| brain games for seniors | [/blog/brain-games-for-older-adults/](https://reigncreativellc.com/blog/brain-games-for-older-adults/) | commercial | brain-training-games | `unknown` | `unknown` | Autocomplete |
| brain games for the whole family | [/blog/brain-games-for-the-whole-family/](https://reigncreativellc.com/blog/brain-games-for-the-whole-family/) | commercial | brain-training-games | `unknown` | `unknown` | editorial |
| brain training apps compared | [/blog/brain-training-apps-compared/](https://reigncreativellc.com/blog/brain-training-apps-compared/) | commercial | brain-training-games | `unknown` | `unknown` | editorial |
| brain training for adults | [/blog/brain-training-for-busy-adults/](https://reigncreativellc.com/blog/brain-training-for-busy-adults/) | commercial | brain-training-games | `unknown` | `unknown` | editorial |
| brain training myths | [/blog/brain-training-questions-answered/](https://reigncreativellc.com/blog/brain-training-questions-answered/) | informational | brain-training-games | `unknown` | `unknown` | editorial |
| how to do budget math in your head | [/blog/budget-math-in-your-head/](https://reigncreativellc.com/blog/budget-math-in-your-head/) | informational | mental-math | `unknown` | `unknown` | editorial |
| can you improve your iq | [/blog/can-practice-raise-an-iq-score/](https://reigncreativellc.com/blog/can-practice-raise-an-iq-score/) | informational | iq-tests-and-reasoning | `unknown` | `unknown` | Autocomplete |
| why do i keep making careless mistakes in math | [/blog/careless-arithmetic-mistakes/](https://reigncreativellc.com/blog/careless-arithmetic-mistakes/) | informational | mental-math | `unknown` | `unknown` | Autocomplete |
| change detection task | [/blog/change-detection-tasks/](https://reigncreativellc.com/blog/change-detection-tasks/) | informational | memory-and-attention | `unknown` | `unknown` | editorial |
| how to choose a difficulty level | [/blog/choosing-a-difficulty-level/](https://reigncreativellc.com/blog/choosing-a-difficulty-level/) | informational | brain-training-games | `unknown` | `unknown` | editorial |
| common reasoning mistakes | [/blog/common-reasoning-mistakes/](https://reigncreativellc.com/blog/common-reasoning-mistakes/) | informational | logic-and-pattern-puzzles | `unknown` | `unknown` | editorial |
| how to compare fractions | [/blog/comparing-fractions-mentally/](https://reigncreativellc.com/blog/comparing-fractions-mentally/) | informational | mental-math | `unknown` | `unknown` | Autocomplete |
| compensation strategy math | [/blog/compensation-strategy-in-arithmetic/](https://reigncreativellc.com/blog/compensation-strategy-in-arithmetic/) | informational | mental-math | `unknown` | `unknown` | Autocomplete |
| conditional reasoning explained | [/blog/conditional-reasoning-if-then/](https://reigncreativellc.com/blog/conditional-reasoning-if-then/) | informational | logic-and-pattern-puzzles | `unknown` | `unknown` | editorial |
| counting up subtraction strategy | [/blog/counting-up-subtraction/](https://reigncreativellc.com/blog/counting-up-subtraction/) | informational | mental-math | `unknown` | `unknown` | editorial |
| vedic multiplication vertically and crosswise | [/blog/cross-multiplication-in-one-pass/](https://reigncreativellc.com/blog/cross-multiplication-in-one-pass/) | informational | mental-math | `unknown` | `unknown` | editorial |
| daily brain exercise | [/blog/daily-challenge-formats-explained/](https://reigncreativellc.com/blog/daily-challenge-formats-explained/) | informational | brain-training-games | `unknown` | `unknown` | editorial |
| deductive reasoning examples | [/blog/deductive-reasoning-examples/](https://reigncreativellc.com/blog/deductive-reasoning-examples/) | informational | logic-and-pattern-puzzles | `unknown` | `unknown` | Autocomplete |
| delayed recall memory test | [/blog/delayed-recall-explained/](https://reigncreativellc.com/blog/delayed-recall-explained/) | informational | memory-and-attention | `unknown` | `unknown` | Autocomplete |
| deliberate practice explained | [/blog/deliberate-practice-in-brain-games/](https://reigncreativellc.com/blog/deliberate-practice-in-brain-games/) | informational | brain-training-games | `unknown` | `unknown` | Autocomplete |
| digit span test explained | [/blog/digit-span-explained/](https://reigncreativellc.com/blog/digit-span-explained/) | informational | memory-and-attention | `unknown` | `unknown` | editorial |
| how to estimate sales tax | [/blog/estimating-sales-tax/](https://reigncreativellc.com/blog/estimating-sales-tax/) | informational | mental-math | `unknown` | `unknown` | editorial |
| fibonacci sequence explained | [/blog/fibonacci-and-recursive-sequences/](https://reigncreativellc.com/blog/fibonacci-and-recursive-sequences/) | informational | logic-and-pattern-puzzles | `unknown` | `unknown` | Autocomplete |
| how to find the original price before a discount | [/blog/finding-the-original-price-before-a-discount/](https://reigncreativellc.com/blog/finding-the-original-price-before-a-discount/) | informational | mental-math | `unknown` | `unknown` | editorial |
| number pattern rules | [/blog/finding-the-rule-in-a-number-pattern/](https://reigncreativellc.com/blog/finding-the-rule-in-a-number-pattern/) | informational | logic-and-pattern-puzzles | `unknown` | `unknown` | Autocomplete |
| fluid vs crystallized intelligence | [/blog/fluid-and-crystallized-intelligence/](https://reigncreativellc.com/blog/fluid-and-crystallized-intelligence/) | informational | iq-tests-and-reasoning | `unknown` | `unknown` | Autocomplete |
| fraction to percent conversion | [/blog/fraction-decimal-percent-conversions/](https://reigncreativellc.com/blog/fraction-decimal-percent-conversions/) | informational | mental-math | `unknown` | `unknown` | Autocomplete |
| iq quiz for fun | [/blog/fun-iq-quizzes-versus-real-assessments/](https://reigncreativellc.com/blog/fun-iq-quizzes-versus-real-assessments/) | informational | iq-tests-and-reasoning | `unknown` | `unknown` | Autocomplete |
| geometric sequence explained | [/blog/geometric-sequences-explained/](https://reigncreativellc.com/blog/geometric-sequences-explained/) | informational | logic-and-pattern-puzzles | `unknown` | `unknown` | Autocomplete |
| visual memory grid test | [/blog/grid-and-position-memory/](https://reigncreativellc.com/blog/grid-and-position-memory/) | informational | memory-and-attention | `unknown` | `unknown` | editorial |
| simon memory game explained | [/blog/growing-sequence-memory-games/](https://reigncreativellc.com/blog/growing-sequence-memory-games/) | informational | memory-and-attention | `unknown` | `unknown` | editorial |
| how to help a child with math facts | [/blog/helping-a-child-with-math-facts/](https://reigncreativellc.com/blog/helping-a-child-with-math-facts/) | informational | mental-math | `unknown` | `unknown` | editorial |
| how is iq measured | [/blog/how-iq-scores-are-calculated/](https://reigncreativellc.com/blog/how-iq-scores-are-calculated/) | informational | iq-tests-and-reasoning | `unknown` | `unknown` | Autocomplete |
| how long should a brain training session be | [/blog/how-long-a-brain-training-session-should-be/](https://reigncreativellc.com/blog/how-long-a-brain-training-session-should-be/) | informational | brain-training-games | `unknown` | `unknown` | editorial |
| how to improve concentration | [/blog/how-to-improve-concentration/](https://reigncreativellc.com/blog/how-to-improve-concentration/) | informational | memory-and-attention | `unknown` | `unknown` | Autocomplete |
| how to memorize numbers | [/blog/how-to-memorize-numbers/](https://reigncreativellc.com/blog/how-to-memorize-numbers/) | informational | memory-and-attention | `unknown` | `unknown` | Autocomplete |
| how to track learning progress | [/blog/how-to-track-practice-progress/](https://reigncreativellc.com/blog/how-to-track-practice-progress/) | informational | brain-training-games | `unknown` | `unknown` | Autocomplete |
| inductive reasoning examples | [/blog/inductive-reasoning-examples/](https://reigncreativellc.com/blog/inductive-reasoning-examples/) | informational | logic-and-pattern-puzzles | `unknown` | `unknown` | Autocomplete |
| proactive vs retroactive interference | [/blog/interference-and-forgetting/](https://reigncreativellc.com/blog/interference-and-forgetting/) | informational | memory-and-attention | `unknown` | `unknown` | editorial |
| interleaving vs blocked practice | [/blog/interleaving-versus-blocked-practice/](https://reigncreativellc.com/blog/interleaving-versus-blocked-practice/) | informational | brain-training-games | `unknown` | `unknown` | editorial |
| iq vs eq | [/blog/iq-and-emotional-intelligence/](https://reigncreativellc.com/blog/iq-and-emotional-intelligence/) | informational | iq-tests-and-reasoning | `unknown` | `unknown` | Autocomplete |
| iq score chart explained | [/blog/iq-score-ranges-and-bands/](https://reigncreativellc.com/blog/iq-score-ranges-and-bands/) | informational | iq-tests-and-reasoning | `unknown` | `unknown` | editorial |
| illusion of knowing | [/blog/judging-your-own-recall/](https://reigncreativellc.com/blog/judging-your-own-recall/) | informational | memory-and-attention | `unknown` | `unknown` | editorial |
| lattice multiplication method | [/blog/lattice-and-line-multiplication/](https://reigncreativellc.com/blog/lattice-and-line-multiplication/) | informational | mental-math | `unknown` | `unknown` | editorial |
| left to right addition | [/blog/left-to-right-addition/](https://reigncreativellc.com/blog/left-to-right-addition/) | informational | mental-math | `unknown` | `unknown` | editorial |
| limitations of iq tests | [/blog/limitations-of-iq-testing/](https://reigncreativellc.com/blog/limitations-of-iq-testing/) | informational | iq-tests-and-reasoning | `unknown` | `unknown` | Autocomplete |
| how to solve logic grid puzzles | [/blog/logic-grid-puzzles/](https://reigncreativellc.com/blog/logic-grid-puzzles/) | informational | logic-and-pattern-puzzles | `unknown` | `unknown` | Autocomplete |
| math anxiety in adults | [/blog/math-anxiety-in-adults/](https://reigncreativellc.com/blog/math-anxiety-in-adults/) | informational | mental-math | `unknown` | `unknown` | Autocomplete |
| matrix reasoning explained | [/blog/matrix-reasoning-puzzles/](https://reigncreativellc.com/blog/matrix-reasoning-puzzles/) | informational | logic-and-pattern-puzzles | `unknown` | `unknown` | Autocomplete |
| missing number problems | [/blog/missing-number-problems/](https://reigncreativellc.com/blog/missing-number-problems/) | informational | logic-and-pattern-puzzles | `unknown` | `unknown` | editorial |
| mnemonic devices for numbers | [/blog/mnemonic-systems-for-numbers/](https://reigncreativellc.com/blog/mnemonic-systems-for-numbers/) | informational | memory-and-attention | `unknown` | `unknown` | editorial |
| multiply by 25 trick | [/blog/multiplying-by-five-and-twenty-five/](https://reigncreativellc.com/blog/multiplying-by-five-and-twenty-five/) | informational | mental-math | `unknown` | `unknown` | editorial |
| multiply by 9 trick | [/blog/multiplying-by-nine-and-ninety-nine/](https://reigncreativellc.com/blog/multiplying-by-nine-and-ninety-nine/) | informational | mental-math | `unknown` | `unknown` | editorial |
| dual n back training | [/blog/n-back-tasks-explained/](https://reigncreativellc.com/blog/n-back-tasks-explained/) | informational | memory-and-attention | `unknown` | `unknown` | Autocomplete |
| nonverbal reasoning test explained | [/blog/nonverbal-reasoning-tests-explained/](https://reigncreativellc.com/blog/nonverbal-reasoning-tests-explained/) | informational | iq-tests-and-reasoning | `unknown` | `unknown` | editorial |
| number bonds to ten | [/blog/number-bonds-and-making-tens/](https://reigncreativellc.com/blog/number-bonds-and-making-tens/) | informational | mental-math | `unknown` | `unknown` | editorial |
| number sequence puzzles | [/blog/number-sequence-puzzles-explained/](https://reigncreativellc.com/blog/number-sequence-puzzles-explained/) | informational | logic-and-pattern-puzzles | `unknown` | `unknown` | Autocomplete |
| numerical reasoning test explained | [/blog/numerical-reasoning-tests-explained/](https://reigncreativellc.com/blog/numerical-reasoning-tests-explained/) | informational | iq-tests-and-reasoning | `unknown` | `unknown` | editorial |
| odd one out puzzles | [/blog/odd-one-out-puzzles/](https://reigncreativellc.com/blog/odd-one-out-puzzles/) | informational | logic-and-pattern-puzzles | `unknown` | `unknown` | editorial |
| offline brain training app | [/blog/offline-brain-training-apps/](https://reigncreativellc.com/blog/offline-brain-training-apps/) | commercial | brain-training-games | `unknown` | `unknown` | editorial |
| paired associate learning | [/blog/paired-associate-learning/](https://reigncreativellc.com/blog/paired-associate-learning/) | informational | memory-and-attention | `unknown` | `unknown` | editorial |
| percentile vs standard score | [/blog/percentiles-and-standard-scores/](https://reigncreativellc.com/blog/percentiles-and-standard-scores/) | informational | iq-tests-and-reasoning | `unknown` | `unknown` | editorial |
| ratio and proportion explained | [/blog/ratios-and-proportions-mentally/](https://reigncreativellc.com/blog/ratios-and-proportions-mentally/) | informational | mental-math | `unknown` | `unknown` | Autocomplete |
| average vs median response time | [/blog/reading-response-time-numbers/](https://reigncreativellc.com/blog/reading-response-time-numbers/) | informational | brain-training-games | `unknown` | `unknown` | editorial |
| recognition vs recall | [/blog/recognition-versus-recall/](https://reigncreativellc.com/blog/recognition-versus-recall/) | informational | memory-and-attention | `unknown` | `unknown` | editorial |
| test reliability and validity | [/blog/reliability-and-validity-in-testing/](https://reigncreativellc.com/blog/reliability-and-validity-in-testing/) | informational | iq-tests-and-reasoning | `unknown` | `unknown` | editorial |
| how to remember a long number | [/blog/remembering-a-long-number/](https://reigncreativellc.com/blog/remembering-a-long-number/) | informational | memory-and-attention | `unknown` | `unknown` | editorial |
| russian peasant multiplication | [/blog/russian-peasant-multiplication/](https://reigncreativellc.com/blog/russian-peasant-multiplication/) | informational | mental-math | `unknown` | `unknown` | editorial |
| sequence puzzles with multiple answers | [/blog/sequences-with-more-than-one-answer/](https://reigncreativellc.com/blog/sequences-with-more-than-one-answer/) | informational | logic-and-pattern-puzzles | `unknown` | `unknown` | editorial |
| short term memory vs working memory | [/blog/short-term-versus-working-memory/](https://reigncreativellc.com/blog/short-term-versus-working-memory/) | informational | memory-and-attention | `unknown` | `unknown` | editorial |
| how to simplify fractions quickly | [/blog/simplifying-fractions-quickly/](https://reigncreativellc.com/blog/simplifying-fractions-quickly/) | informational | mental-math | `unknown` | `unknown` | editorial |
| what is spatial reasoning | [/blog/spatial-reasoning-and-number-sense/](https://reigncreativellc.com/blog/spatial-reasoning-and-number-sense/) | informational | iq-tests-and-reasoning | `unknown` | `unknown` | editorial |
| perfect square numbers trick | [/blog/squares-cubes-and-roots/](https://reigncreativellc.com/blog/squares-cubes-and-roots/) | informational | mental-math | `unknown` | `unknown` | Autocomplete |
| reasoning test taking strategies | [/blog/strategy-for-timed-reasoning-tests/](https://reigncreativellc.com/blog/strategy-for-timed-reasoning-tests/) | informational | iq-tests-and-reasoning | `unknown` | `unknown` | editorial |
| subtraction without borrowing | [/blog/subtraction-without-borrowing/](https://reigncreativellc.com/blog/subtraction-without-borrowing/) | informational | mental-math | `unknown` | `unknown` | editorial |
| syllogism examples | [/blog/syllogisms-explained/](https://reigncreativellc.com/blog/syllogisms-explained/) | informational | logic-and-pattern-puzzles | `unknown` | `unknown` | Autocomplete |
| times tables memorization | [/blog/times-tables-memorisation/](https://reigncreativellc.com/blog/times-tables-memorisation/) | informational | mental-math | `unknown` | `unknown` | Autocomplete |
| how to compare unit prices | [/blog/unit-price-comparison/](https://reigncreativellc.com/blog/unit-price-comparison/) | informational | mental-math | `unknown` | `unknown` | editorial |
| verbal reasoning question types | [/blog/verbal-reasoning-question-types/](https://reigncreativellc.com/blog/verbal-reasoning-question-types/) | informational | iq-tests-and-reasoning | `unknown` | `unknown` | editorial |
| visual pattern puzzles | [/blog/visual-pattern-puzzles/](https://reigncreativellc.com/blog/visual-pattern-puzzles/) | informational | logic-and-pattern-puzzles | `unknown` | `unknown` | Autocomplete |
| brain warm up before studying | [/blog/warming-up-before-focused-work/](https://reigncreativellc.com/blog/warming-up-before-focused-work/) | informational | brain-training-games | `unknown` | `unknown` | editorial |
| what is a brain age test | [/blog/what-a-brain-age-score-means/](https://reigncreativellc.com/blog/what-a-brain-age-score-means/) | informational | iq-tests-and-reasoning | `unknown` | `unknown` | editorial |
| free vs paid brain training app | [/blog/what-a-brain-training-subscription-buys/](https://reigncreativellc.com/blog/what-a-brain-training-subscription-buys/) | commercial | brain-training-games | `unknown` | `unknown` | editorial |
| what do iq tests measure | [/blog/what-iq-tests-actually-measure/](https://reigncreativellc.com/blog/what-iq-tests-actually-measure/) | informational | iq-tests-and-reasoning | `unknown` | `unknown` | editorial |
| what is processing speed | [/blog/what-processing-speed-means/](https://reigncreativellc.com/blog/what-processing-speed-means/) | informational | memory-and-attention | `unknown` | `unknown` | editorial |
| what is the average iq score | [/blog/what-the-average-iq-score-means/](https://reigncreativellc.com/blog/what-the-average-iq-score-means/) | informational | iq-tests-and-reasoning | `unknown` | `unknown` | editorial |
| who invented the iq test | [/blog/who-invented-the-iq-test/](https://reigncreativellc.com/blog/who-invented-the-iq-test/) | informational | iq-tests-and-reasoning | `unknown` | `unknown` | editorial |
| why am i slow at mental math | [/blog/why-am-i-slow-at-mental-math/](https://reigncreativellc.com/blog/why-am-i-slow-at-mental-math/) | informational | mental-math | `unknown` | `unknown` | Autocomplete |
| why divisibility rules work | [/blog/why-divisibility-rules-work/](https://reigncreativellc.com/blog/why-divisibility-rules-work/) | informational | mental-math | `unknown` | `unknown` | editorial |
| why has my progress plateaued | [/blog/why-practice-progress-plateaus/](https://reigncreativellc.com/blog/why-practice-progress-plateaus/) | informational | brain-training-games | `unknown` | `unknown` | editorial |
| working backwards math problems | [/blog/working-backwards-problems/](https://reigncreativellc.com/blog/working-backwards-problems/) | informational | logic-and-pattern-puzzles | `unknown` | `unknown` | editorial |

## Cohort C — World History Timeline Sim

| Primary phrase | URL | Intent | Hub | Volume | Difficulty | Evidence |
| --- | --- | --- | --- | --- | --- | --- |
| daily history study routine | [/blog/a-daily-history-study-routine/](https://reigncreativellc.com/blog/a-daily-history-study-routine/) | informational | history-learning-methods | `unknown` | `unknown` | editorial |
| how the achaemenid empire was governed | [/blog/achaemenid-persia-administration/](https://reigncreativellc.com/blog/achaemenid-persia-administration/) | informational | civilizations-and-empires | `unknown` | `unknown` | editorial |
| andean civilizations in order | [/blog/andean-civilizations-in-order/](https://reigncreativellc.com/blog/andean-civilizations-in-order/) | informational | civilizations-and-empires | `unknown` | `unknown` | editorial |
| what was the armenian genocide | [/blog/armenian-genocide-explained/](https://reigncreativellc.com/blog/armenian-genocide-explained/) | informational | major-historical-events | `unknown` | `unknown` | editorial |
| who was ashoka | [/blog/ashoka-and-the-rock-edicts/](https://reigncreativellc.com/blog/ashoka-and-the-rock-edicts/) | informational | historical-people | `unknown` | `unknown` | editorial |
| how did the atlantic slave trade end | [/blog/atlantic-slave-trade-and-abolition/](https://reigncreativellc.com/blog/atlantic-slave-trade-and-abolition/) | informational | major-historical-events | `unknown` | `unknown` | editorial |
| what were the bantu migrations | [/blog/bantu-migrations-explained/](https://reigncreativellc.com/blog/bantu-migrations-explained/) | informational | major-historical-events | `unknown` | `unknown` | editorial |
| the black death explained | [/blog/black-death-explained/](https://reigncreativellc.com/blog/black-death-explained/) | informational | major-historical-events | `unknown` | `unknown` | Autocomplete |
| how to filter a history timeline by region | [/blog/browsing-history-by-region-and-era/](https://reigncreativellc.com/blog/browsing-history-by-region-and-era/) | informational | world-history-timelines | `unknown` | `unknown` | editorial |
| how long did the byzantine empire last | [/blog/byzantium-a-thousand-years/](https://reigncreativellc.com/blog/byzantium-a-thousand-years/) | informational | civilizations-and-empires | `unknown` | `unknown` | editorial |
| cause and effect in history explained | [/blog/cause-and-effect-in-history/](https://reigncreativellc.com/blog/cause-and-effect-in-history/) | informational | history-learning-methods | `unknown` | `unknown` | Autocomplete |
| deadliest wars in chinese history | [/blog/chinas-deadliest-rebellions/](https://reigncreativellc.com/blog/chinas-deadliest-rebellions/) | informational | major-historical-events | `unknown` | `unknown` | editorial |
| ancient china dynasties in order | [/blog/chinese-dynasties-in-chronological-order/](https://reigncreativellc.com/blog/chinese-dynasties-in-chronological-order/) | informational | world-history-timelines | `unknown` | `unknown` | Autocomplete |
| why was the chola empire important | [/blog/chola-empire-maritime-power/](https://reigncreativellc.com/blog/chola-empire-maritime-power/) | informational | civilizations-and-empires | `unknown` | `unknown` | editorial |
| what was cleopatra really like | [/blog/cleopatra-beyond-the-legend/](https://reigncreativellc.com/blog/cleopatra-beyond-the-legend/) | informational | historical-people | `unknown` | `unknown` | editorial |
| columbian exchange explained | [/blog/columbian-exchange-explained/](https://reigncreativellc.com/blog/columbian-exchange-explained/) | informational | major-historical-events | `unknown` | `unknown` | Autocomplete |
| common history myths | [/blog/common-history-myths-corrected/](https://reigncreativellc.com/blog/common-history-myths-corrected/) | informational | history-learning-methods | `unknown` | `unknown` | Autocomplete |
| why are some historical figures controversial | [/blog/contested-legacies-in-history/](https://reigncreativellc.com/blog/contested-legacies-in-history/) | informational | historical-people | `unknown` | `unknown` | editorial |
| how archaeologists date native american sites | [/blog/dating-north-america-before-columbus/](https://reigncreativellc.com/blog/dating-north-america-before-columbus/) | informational | world-history-timelines | `unknown` | `unknown` | editorial |
| how do we date southeast asian history | [/blog/dating-southeast-asian-history/](https://reigncreativellc.com/blog/dating-southeast-asian-history/) | informational | world-history-timelines | `unknown` | `unknown` | editorial |
| how far back does human history go | [/blog/deep-time-on-a-history-timeline/](https://reigncreativellc.com/blog/deep-time-on-a-history-timeline/) | informational | world-history-timelines | `unknown` | `unknown` | editorial |
| did people think the earth was flat | [/blog/did-people-think-the-earth-was-flat/](https://reigncreativellc.com/blog/did-people-think-the-earth-was-flat/) | informational | history-learning-methods | `unknown` | `unknown` | Autocomplete |
| famous explorers in history | [/blog/famous-explorers-in-history/](https://reigncreativellc.com/blog/famous-explorers-in-history/) | informational | historical-people | `unknown` | `unknown` | Autocomplete |
| what caused the french revolution | [/blog/french-revolution-causes-and-phases/](https://reigncreativellc.com/blog/french-revolution-causes-and-phases/) | informational | major-historical-events | `unknown` | `unknown` | editorial |
| difference between ghana mali and songhai | [/blog/ghana-mali-songhai-empires/](https://reigncreativellc.com/blog/ghana-mali-songhai-empires/) | informational | civilizations-and-empires | `unknown` | `unknown` | editorial |
| who built great zimbabwe | [/blog/great-zimbabwe-and-mutapa/](https://reigncreativellc.com/blog/great-zimbabwe-and-mutapa/) | informational | civilizations-and-empires | `unknown` | `unknown` | editorial |
| why is the haitian revolution important | [/blog/haitian-revolution-explained/](https://reigncreativellc.com/blog/haitian-revolution-explained/) | informational | major-historical-events | `unknown` | `unknown` | editorial |
| converting hijri dates to the gregorian calendar | [/blog/hijri-calendar-and-historical-dating/](https://reigncreativellc.com/blog/hijri-calendar-and-historical-dating/) | informational | world-history-timelines | `unknown` | `unknown` | editorial |
| history apps compared | [/blog/history-apps-compared-for-self-study/](https://reigncreativellc.com/blog/history-apps-compared-for-self-study/) | commercial | history-learning-methods | `unknown` | `unknown` | editorial |
| history of inventions timeline | [/blog/history-of-inventions-timeline/](https://reigncreativellc.com/blog/history-of-inventions-timeline/) | informational | world-history-timelines | `unknown` | `unknown` | Autocomplete |
| history timeline maker tools compared | [/blog/history-timeline-tools-compared/](https://reigncreativellc.com/blog/history-timeline-tools-compared/) | commercial | history-learning-methods | `unknown` | `unknown` | editorial |
| how is african history dated | [/blog/how-african-history-is-dated/](https://reigncreativellc.com/blog/how-african-history-is-dated/) | informational | world-history-timelines | `unknown` | `unknown` | editorial |
| how did decolonization happen | [/blog/how-decolonisation-happened/](https://reigncreativellc.com/blog/how-decolonisation-happened/) | informational | major-historical-events | `unknown` | `unknown` | editorial |
| how long have aboriginal people lived in australia | [/blog/how-long-people-have-lived-in-australia/](https://reigncreativellc.com/blog/how-long-people-have-lived-in-australia/) | informational | world-history-timelines | `unknown` | `unknown` | editorial |
| how did mughal empire expand | [/blog/how-the-mughal-empire-expanded/](https://reigncreativellc.com/blog/how-the-mughal-empire-expanded/) | informational | civilizations-and-empires | `unknown` | `unknown` | Autocomplete |
| how to analyze a primary source | [/blog/how-to-analyse-a-primary-source/](https://reigncreativellc.com/blog/how-to-analyse-a-primary-source/) | informational | history-learning-methods | `unknown` | `unknown` | Autocomplete |
| how to make a country history timeline | [/blog/how-to-build-a-country-history-timeline/](https://reigncreativellc.com/blog/how-to-build-a-country-history-timeline/) | informational | history-learning-methods | `unknown` | `unknown` | editorial |
| how to fact check a history claim | [/blog/how-to-check-a-historical-superlative/](https://reigncreativellc.com/blog/how-to-check-a-historical-superlative/) | informational | history-learning-methods | `unknown` | `unknown` | editorial |
| why is the 1400s the 15th century | [/blog/how-to-count-centuries-correctly/](https://reigncreativellc.com/blog/how-to-count-centuries-correctly/) | informational | world-history-timelines | `unknown` | `unknown` | editorial |
| how to spot bias in history writing | [/blog/how-to-spot-bias-in-history-writing/](https://reigncreativellc.com/blog/how-to-spot-bias-in-history-writing/) | informational | history-learning-methods | `unknown` | `unknown` | editorial |
| history essay structure | [/blog/how-to-write-a-history-essay/](https://reigncreativellc.com/blog/how-to-write-a-history-essay/) | informational | history-learning-methods | `unknown` | `unknown` | Autocomplete |
| how do we know what historical figures did | [/blog/how-we-know-what-historical-figures-did/](https://reigncreativellc.com/blog/how-we-know-what-historical-figures-did/) | informational | historical-people | `unknown` | `unknown` | editorial |
| who was ibn battuta | [/blog/ibn-battuta-and-the-rihla/](https://reigncreativellc.com/blog/ibn-battuta-and-the-rihla/) | informational | historical-people | `unknown` | `unknown` | editorial |
| how is indian history divided into periods | [/blog/indian-history-periodisation-debate/](https://reigncreativellc.com/blog/indian-history-periodisation-debate/) | informational | world-history-timelines | `unknown` | `unknown` | editorial |
| indian ocean trade network explained | [/blog/indian-ocean-trade-before-europeans/](https://reigncreativellc.com/blog/indian-ocean-trade-before-europeans/) | informational | major-historical-events | `unknown` | `unknown` | editorial |
| indigenous resistance to colonial rule | [/blog/indigenous-resistance-wars-compared/](https://reigncreativellc.com/blog/indigenous-resistance-wars-compared/) | informational | major-historical-events | `unknown` | `unknown` | editorial |
| indus valley civilization explained | [/blog/indus-valley-civilization-explained/](https://reigncreativellc.com/blog/indus-valley-civilization-explained/) | informational | civilizations-and-empires | `unknown` | `unknown` | editorial |
| japanese historical periods in order | [/blog/japan-from-yamato-to-meiji/](https://reigncreativellc.com/blog/japan-from-yamato-to-meiji/) | informational | civilizations-and-empires | `unknown` | `unknown` | editorial |
| what was the khmer empire | [/blog/khmer-empire-at-angkor/](https://reigncreativellc.com/blog/khmer-empire-at-angkor/) | informational | civilizations-and-empires | `unknown` | `unknown` | editorial |
| what happened under the khmer rouge | [/blog/khmer-rouge-and-cambodian-genocide/](https://reigncreativellc.com/blog/khmer-rouge-and-cambodian-genocide/) | informational | major-historical-events | `unknown` | `unknown` | editorial |
| what was the kingdom of aksum | [/blog/kingdom-of-aksum-explained/](https://reigncreativellc.com/blog/kingdom-of-aksum-explained/) | informational | civilizations-and-empires | `unknown` | `unknown` | editorial |
| korean dynasties explained | [/blog/korean-dynasties-explained/](https://reigncreativellc.com/blog/korean-dynasties-explained/) | informational | civilizations-and-empires | `unknown` | `unknown` | editorial |
| who were the nubian pharaohs | [/blog/kush-and-the-nubian-pharaohs/](https://reigncreativellc.com/blog/kush-and-the-nubian-pharaohs/) | informational | civilizations-and-empires | `unknown` | `unknown` | editorial |
| how did latin america gain independence | [/blog/latin-american-independence-wars/](https://reigncreativellc.com/blog/latin-american-independence-wars/) | informational | major-historical-events | `unknown` | `unknown` | editorial |
| kingdoms of mainland southeast asia | [/blog/mainland-southeast-asian-kingdoms/](https://reigncreativellc.com/blog/mainland-southeast-asian-kingdoms/) | informational | civilizations-and-empires | `unknown` | `unknown` | editorial |
| why was mansa musa so rich | [/blog/mansa-musa-and-the-hajj-of-1324/](https://reigncreativellc.com/blog/mansa-musa-and-the-hajj-of-1324/) | informational | historical-people | `unknown` | `unknown` | editorial |
| maurya vs gupta empire | [/blog/maurya-and-gupta-empires-compared/](https://reigncreativellc.com/blog/maurya-and-gupta-empires-compared/) | informational | civilizations-and-empires | `unknown` | `unknown` | editorial |
| how the maya long count calendar works | [/blog/maya-long-count-calendar-explained/](https://reigncreativellc.com/blog/maya-long-count-calendar-explained/) | informational | world-history-timelines | `unknown` | `unknown` | editorial |
| what was the meiji restoration | [/blog/meiji-restoration-explained/](https://reigncreativellc.com/blog/meiji-restoration-explained/) | informational | major-historical-events | `unknown` | `unknown` | editorial |
| civilizations before the aztecs | [/blog/mesoamerica-before-the-aztecs/](https://reigncreativellc.com/blog/mesoamerica-before-the-aztecs/) | informational | civilizations-and-empires | `unknown` | `unknown` | editorial |
| how did the mongol conquests spread so fast | [/blog/mongol-conquests-explained/](https://reigncreativellc.com/blog/mongol-conquests-explained/) | informational | major-historical-events | `unknown` | `unknown` | editorial |
| agricultural revolution explained | [/blog/neolithic-agricultural-revolution/](https://reigncreativellc.com/blog/neolithic-agricultural-revolution/) | informational | major-historical-events | `unknown` | `unknown` | Autocomplete |
| what were the opium wars about | [/blog/opium-wars-and-unequal-treaties/](https://reigncreativellc.com/blog/opium-wars-and-unequal-treaties/) | informational | major-historical-events | `unknown` | `unknown` | editorial |
| how did the ottoman empire rise and fall | [/blog/ottoman-empire-rise-and-decline/](https://reigncreativellc.com/blog/ottoman-empire-rise-and-decline/) | informational | civilizations-and-empires | `unknown` | `unknown` | editorial |
| what happened during the partition of india | [/blog/partition-of-india-1947/](https://reigncreativellc.com/blog/partition-of-india-1947/) | informational | major-historical-events | `unknown` | `unknown` | editorial |
| what is periodisation in history | [/blog/periodisation-in-history-explained/](https://reigncreativellc.com/blog/periodisation-in-history-explained/) | informational | world-history-timelines | `unknown` | `unknown` | editorial |
| how did polynesians navigate the pacific | [/blog/polynesian-voyaging-and-pacific-settlement/](https://reigncreativellc.com/blog/polynesian-voyaging-and-pacific-settlement/) | informational | major-historical-events | `unknown` | `unknown` | editorial |
| printing press impact on society | [/blog/printing-press-impact-explained/](https://reigncreativellc.com/blog/printing-press-impact-explained/) | informational | major-historical-events | `unknown` | `unknown` | Autocomplete |
| who was queen nzinga | [/blog/queen-nzinga-of-ndongo-and-matamba/](https://reigncreativellc.com/blog/queen-nzinga-of-ndongo-and-matamba/) | informational | historical-people | `unknown` | `unknown` | editorial |
| did easter island collapse from deforestation | [/blog/rapa-nui-and-the-collapse-myth/](https://reigncreativellc.com/blog/rapa-nui-and-the-collapse-myth/) | informational | civilizations-and-empires | `unknown` | `unknown` | editorial |
| how to tell if a history app is accurate | [/blog/reading-a-history-dataset-critically/](https://reigncreativellc.com/blog/reading-a-history-dataset-critically/) | informational | history-learning-methods | `unknown` | `unknown` | editorial |
| what are regnal years | [/blog/regnal-years-and-dynastic-dating/](https://reigncreativellc.com/blog/regnal-years-and-dynastic-dating/) | informational | world-history-timelines | `unknown` | `unknown` | editorial |
| what happened in the russian revolution of 1917 | [/blog/russian-revolutions-of-1917/](https://reigncreativellc.com/blog/russian-revolutions-of-1917/) | informational | major-historical-events | `unknown` | `unknown` | editorial |
| scholars of the islamic golden age | [/blog/scholars-of-the-islamic-golden-age/](https://reigncreativellc.com/blog/scholars-of-the-islamic-golden-age/) | informational | historical-people | `unknown` | `unknown` | editorial |
| most influential scientists in history | [/blog/scientists-who-changed-the-record/](https://reigncreativellc.com/blog/scientists-who-changed-the-record/) | informational | historical-people | `unknown` | `unknown` | editorial |
| what was the scramble for africa | [/blog/scramble-for-africa-explained/](https://reigncreativellc.com/blog/scramble-for-africa-explained/) | informational | major-historical-events | `unknown` | `unknown` | editorial |
| how many people died in world war 2 | [/blog/second-world-war-death-toll-range/](https://reigncreativellc.com/blog/second-world-war-death-toll-range/) | informational | major-historical-events | `unknown` | `unknown` | editorial |
| spaced repetition for history | [/blog/spaced-repetition-for-history-dates/](https://reigncreativellc.com/blog/spaced-repetition-for-history-dates/) | informational | history-learning-methods | `unknown` | `unknown` | editorial |
| srivijaya and majapahit explained | [/blog/srivijaya-and-majapahit/](https://reigncreativellc.com/blog/srivijaya-and-majapahit/) | informational | civilizations-and-empires | `unknown` | `unknown` | editorial |
| what was the first city in the world | [/blog/sumer-and-the-first-cities/](https://reigncreativellc.com/blog/sumer-and-the-first-cities/) | informational | civilizations-and-empires | `unknown` | `unknown` | editorial |
| what were the swahili city states | [/blog/swahili-coast-city-states/](https://reigncreativellc.com/blog/swahili-coast-city-states/) | informational | civilizations-and-empires | `unknown` | `unknown` | editorial |
| what were the tang and song dynasties known for | [/blog/tang-and-song-china-explained/](https://reigncreativellc.com/blog/tang-and-song-china-explained/) | informational | civilizations-and-empires | `unknown` | `unknown` | editorial |
| umayyad vs abbasid caliphate | [/blog/the-early-caliphates/](https://reigncreativellc.com/blog/the-early-caliphates/) | informational | civilizations-and-empires | `unknown` | `unknown` | editorial |
| who was toussaint louverture | [/blog/toussaint-louverture-and-the-haitian-generals/](https://reigncreativellc.com/blog/toussaint-louverture-and-the-haitian-generals/) | informational | historical-people | `unknown` | `unknown` | editorial |
| leaders of independence movements | [/blog/twentieth-century-liberation-leaders/](https://reigncreativellc.com/blog/twentieth-century-liberation-leaders/) | informational | historical-people | `unknown` | `unknown` | editorial |
| how to use alternate history for learning | [/blog/using-what-if-scenarios-to-learn-history/](https://reigncreativellc.com/blog/using-what-if-scenarios-to-learn-history/) | informational | history-learning-methods | `unknown` | `unknown` | editorial |
| major west african kingdoms explained | [/blog/west-and-central-african-kingdoms/](https://reigncreativellc.com/blog/west-and-central-african-kingdoms/) | informational | civilizations-and-empires | `unknown` | `unknown` | editorial |
| what is late antiquity | [/blog/what-late-antiquity-means/](https://reigncreativellc.com/blog/what-late-antiquity-means/) | informational | world-history-timelines | `unknown` | `unknown` | editorial |
| what makes an event a turning point in history | [/blog/what-makes-an-event-a-turning-point/](https://reigncreativellc.com/blog/what-makes-an-event-a-turning-point/) | informational | world-history-timelines | `unknown` | `unknown` | editorial |
| causes of world war 1 | [/blog/what-started-the-first-world-war/](https://reigncreativellc.com/blog/what-started-the-first-world-war/) | informational | major-historical-events | `unknown` | `unknown` | Autocomplete |
| what was happening in china during the roman empire | [/blog/what-was-happening-elsewhere-when-rome-ruled/](https://reigncreativellc.com/blog/what-was-happening-elsewhere-when-rome-ruled/) | informational | world-history-timelines | `unknown` | `unknown` | Autocomplete |
| what to do when historical sources disagree | [/blog/when-two-sources-disagree-on-a-date/](https://reigncreativellc.com/blog/when-two-sources-disagree-on-a-date/) | informational | history-learning-methods | `unknown` | `unknown` | editorial |
| who built the great monuments of the world | [/blog/who-built-the-great-monuments/](https://reigncreativellc.com/blog/who-built-the-great-monuments/) | informational | historical-people | `unknown` | `unknown` | editorial |
| why did civilizations collapse | [/blog/why-civilizations-collapse/](https://reigncreativellc.com/blog/why-civilizations-collapse/) | informational | major-historical-events | `unknown` | `unknown` | Autocomplete |
| why do historical eras overlap | [/blog/why-historical-eras-overlap/](https://reigncreativellc.com/blog/why-historical-eras-overlap/) | informational | world-history-timelines | `unknown` | `unknown` | editorial |
| why is history important to study | [/blog/why-is-history-important-to-study/](https://reigncreativellc.com/blog/why-is-history-important-to-study/) | informational | history-learning-methods | `unknown` | `unknown` | Autocomplete |
| causes of the industrial revolution | [/blog/why-the-industrial-revolution-started-in-britain/](https://reigncreativellc.com/blog/why-the-industrial-revolution-started-in-britain/) | informational | major-historical-events | `unknown` | `unknown` | Autocomplete |
| women rulers in history | [/blog/women-who-ruled-empires/](https://reigncreativellc.com/blog/women-who-ruled-empires/) | informational | historical-people | `unknown` | `unknown` | editorial |
| who was wu zetian | [/blog/wu-zetian-and-hostile-sources/](https://reigncreativellc.com/blog/wu-zetian-and-hostile-sources/) | informational | historical-people | `unknown` | `unknown` | editorial |
| why did china stop the zheng he voyages | [/blog/zheng-he-treasure-voyages/](https://reigncreativellc.com/blog/zheng-he-treasure-voyages/) | informational | historical-people | `unknown` | `unknown` | editorial |
