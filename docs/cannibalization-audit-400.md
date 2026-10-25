# Cannibalisation audit — 400-article release

For each new article: the nearest existing article identified at planning time, the planned risk, and how the article keeps a distinct intent. Mechanical gates applied to every article: primary keyword unique site-wide (build-enforced), 5-word-shingle Jaccard < 0.05 against every other article (`check.mjs`), release audit `audit-similarity-250.mjs --release 2026-10-25` clean (no pair ≥ 0.08, no reused opening, no reused FAQ question, no 85% title overlap; closest pair 0.049). Reviewers additionally compared each article with existing articles on the same subject and could reject; none did.

| Article | Primary keyword | Nearest existing (plan) | Planned risk | Resolution |
| --- | --- | --- | --- | --- |
| `4-7-8-breathing-explained` | 4 7 8 breathing | none close | low | Distinct keyword and intent; similarity gate passed |
| `adjacency-matrix-explained` | adjacency matrix | none close | low | Distinct keyword and intent; similarity gate passed |
| `alexander-the-great-explained` | alexander the great | none close | low | Distinct keyword and intent; similarity gate passed |
| `amateur-vs-professional-boxing` | amateur vs professional boxing | boxing-scoring-explained (0.33) | low | Distinct keyword and intent; similarity gate passed |
| `ancient-egypt-timeline` | ancient egypt timeline | chinese-dynasties-in-chronological-order (0.29) | low | Distinct keyword and intent; similarity gate passed |
| `anime-casino-slots-partnership-opportunities` | social casino game acquisition | none (no partnership content existed) | low (one per app; hub links all) | Scoped to a different question than the nearest article and links to it; similarity gate passed |
| `anime-coloring-book-partnership-opportunities` | coloring app licensing | none (no partnership content existed) | low (one per app; hub links all) | Scoped to a different question than the nearest article and links to it; similarity gate passed |
| `anime-trivia-word-games-partnership-opportunities` | trivia game partnership | none (no partnership content existed) | low (one per app; hub links all) | Scoped to a different question than the nearest article and links to it; similarity gate passed |
| `apartheid-explained` | apartheid explained | none close | low | Distinct keyword and intent; similarity gate passed |
| `athenian-democracy-explained` | athenian democracy | ashoka-and-the-rock-edicts (0.43) | low | Distinct keyword and intent; similarity gate passed |
| `audio-out-of-sync-on-android` | audio out of sync video android | audio-codecs-explained (0.50) | low | Distinct keyword and intent; similarity gate passed |
| `baseball-career-sim-partnership-opportunities` | baseball game partnership | none (no partnership content existed) | low (one per app; hub links all) | Scoped to a different question than the nearest article and links to it; similarity gate passed |
| `baseball-draft-gm-team-partnership-opportunities` | baseball gm game acquisition | none (no partnership content existed) | low (one per app; hub links all) | Scoped to a different question than the nearest article and links to it; similarity gate passed |
| `basketball-career-games-compared` | basketball career game android | how-to-choose-a-sports-career-sim (0.50) | low | Distinct keyword and intent; similarity gate passed |
| `basketball-career-pro-league-guide` | basketball career pro league | rugby-career-sim-guide (0.44) | low | Distinct keyword and intent; similarity gate passed |
| `basketball-career-pro-league-partnership-opportunities` | basketball game publishing partnership | none (no partnership content existed) | low (one per app; hub links all) | Scoped to a different question than the nearest article and links to it; similarity gate passed |
| `basketball-league-sandbox-guide` | basketball league simulator | basketball-advanced-stats-explained (0.33) | low | Distinct keyword and intent; similarity gate passed |
| `basketball-league-sandbox-partnership-opportunities` | basketball simulation licensing | none (no partnership content existed) | low (one per app; hub links all) | Scoped to a different question than the nearest article and links to it; similarity gate passed |
| `basketball-shot-selection` | basketball shot selection | why-divisibility-rules-work (0.33) | low | Distinct keyword and intent; similarity gate passed |
| `bid-ask-spread-explained` | bid ask spread | card-grading-costs-and-tiers (0.29) | low | Distinct keyword and intent; similarity gate passed |
| `big-jackpot-casino-slots-guide` | big jackpot casino slots | free-agency-explained (0.33) | low | Distinct keyword and intent; similarity gate passed |
| `big-jackpot-casino-slots-partnership-opportunities` | slots game publishing partnership | none (no partnership content existed) | low (one per app; hub links all) | Scoped to a different question than the nearest article and links to it; similarity gate passed |
| `big-o-notation-explained` | big o notation | none close | low | Distinct keyword and intent; similarity gate passed |
| `binomial-distribution-explained` | binomial distribution | none close | low | Distinct keyword and intent; similarity gate passed |
| `binomial-theorem-and-pascals-triangle` | binomial theorem | chinese-dynasties-in-chronological-order (0.38) | low | Distinct keyword and intent; similarity gate passed |
| `bipartite-graphs-explained` | bipartite graph | how-the-offside-rule-works (0.33) | low | Distinct keyword and intent; similarity gate passed |
| `birthday-problem-explained` | birthday problem | ai-opponents-vs-real-players-in-io-games (0.33) | low | Distinct keyword and intent; similarity gate passed |
| `block-game-starter-base` | starter base ideas | marathi-verb-basics (0.50) | low | Distinct keyword and intent; similarity gate passed |
| `block-world-rpg-guide` | block world rpg game | baseball-career-sim-guide (0.38) | low | Distinct keyword and intent; similarity gate passed |
| `block-world-rpg-partnership-opportunities` | sandbox game co-development | none (no partnership content existed) | low (one per app; hub links all) | Scoped to a different question than the nearest article and links to it; similarity gate passed |
| `boolean-algebra-and-logic-gates` | boolean algebra laws | none close | low | Distinct keyword and intent; similarity gate passed |
| `box-breathing-explained` | box breathing | home-advantage-in-sports (0.50) | low | Distinct keyword and intent; similarity gate passed |
| `boxing-prize-fighter-career-guide` | boxing career game | how-boxing-records-are-written (0.33) | low | Distinct keyword and intent; similarity gate passed |
| `boxing-prize-fighter-career-partnership-opportunities` | boxing game partnership | none (no partnership content existed) | low (one per app; hub links all) | Scoped to a different question than the nearest article and links to it; similarity gate passed |
| `boxing-punches-explained` | types of boxing punches | how-boxing-records-are-written (0.33) | low | Distinct keyword and intent; similarity gate passed |
| `bull-vs-bear-market` | bull vs bear market | what-is-era-in-baseball (0.33) | low | Distinct keyword and intent; similarity gate passed |
| `bullet-journaling-for-beginners` | bullet journal for beginners | baseball-stats-explained-for-beginners (0.33) | low | Distinct keyword and intent; similarity gate passed |
| `call-and-put-options-explained` | call and put options | baseball-stats-explained-for-beginners (0.33) | low | Distinct keyword and intent; similarity gate passed |
| `cantonese-dim-sum-phrases` | dim sum names in cantonese | none close | low | Distinct keyword and intent; similarity gate passed |
| `cantonese-greetings` | cantonese greetings | lao-greetings-and-politeness (0.29) | low | Distinct keyword and intent; similarity gate passed |
| `cantonese-measure-words` | cantonese measure words | cantonese-tones-explained (0.29) | low | Distinct keyword and intent; similarity gate passed |
| `cantonese-numbers` | cantonese numbers | vietnamese-tones-explained (0.50) | low | Distinct keyword and intent; similarity gate passed |
| `capital-gains-tax-on-stocks` | capital gains tax on stocks | why-divisibility-rules-work (0.33) | low | Distinct keyword and intent; similarity gate passed |
| `car-racing-pro-career-guide` | racing career game | golf-career-sim-guide (0.29) | low | Distinct keyword and intent; similarity gate passed |
| `car-racing-pro-career-partnership-opportunities` | racing game partnership | none (no partnership content existed) | low (one per app; hub links all) | Scoped to a different question than the nearest article and links to it; similarity gate passed |
| `cartesian-product-explained` | cartesian product of sets | none close | low | Distinct keyword and intent; similarity gate passed |
| `cash-account-vs-margin-account` | cash account vs margin account | none close | low | Distinct keyword and intent; similarity gate passed |
| `catalan-numbers-explained` | catalan numbers | mental-math-tricks-that-work (0.29) | low | Distinct keyword and intent; similarity gate passed |
| `causes-of-the-american-civil-war` | causes of the american civil war | expansion-drafts-explained (0.33) | low | Distinct keyword and intent; similarity gate passed |
| `causes-of-the-american-revolution` | causes of the american revolution | french-revolution-causes-and-phases (0.33) | low | Distinct keyword and intent; similarity gate passed |
| `causes-of-world-war-2` | causes of world war 2 | what-started-the-first-world-war (0.50) | low | Distinct keyword and intent; similarity gate passed |
| `charlemagne-explained` | charlemagne | none close | low | Distinct keyword and intent; similarity gate passed |
| `chinese-remainder-theorem-explained` | chinese remainder theorem | none close | low | Distinct keyword and intent; similarity gate passed |
| `chinese-revolutions-1911-1949` | 1911 revolution china | haitian-revolution-explained (0.33) | low | Distinct keyword and intent; similarity gate passed |
| `city-builder-tips-for-beginners` | city builder tips | baseball-stats-explained-for-beginners (0.33) | low | Distinct keyword and intent; similarity gate passed |
| `clear-app-cache-android` | clear cache android app | none close | low | Distinct keyword and intent; similarity gate passed |
| `compound-interest-explained` | compound interest explained | none close | low | Distinct keyword and intent; similarity gate passed |
| `conditional-probability-and-bayes` | conditional probability bayes theorem | none close | low | Distinct keyword and intent; similarity gate passed |
| `converse-inverse-contrapositive` | converse inverse contrapositive | serving-size-vs-portion-size (0.29) | low | Distinct keyword and intent; similarity gate passed |
| `countable-vs-uncountable-sets` | countable vs uncountable sets | none close | low | Distinct keyword and intent; similarity gate passed |
| `creative-vs-survival-mode` | creative vs survival mode | free-agency-explained (0.33) | low | Distinct keyword and intent; similarity gate passed |
| `cricket-ball-types` | red vs white vs pink cricket ball | why-divisibility-rules-work (0.33) | low | Distinct keyword and intent; similarity gate passed |
| `cricket-bat-rules` | cricket bat size rules | why-divisibility-rules-work (0.33) | low | Distinct keyword and intent; similarity gate passed |
| `cricket-batting-shots` | cricket batting shots | none close | low | Distinct keyword and intent; similarity gate passed |
| `cricket-career-simulator-guide` | cricket career game | baseball-career-sim-guide (0.50) | low | Distinct keyword and intent; similarity gate passed |
| `cricket-career-simulator-partnership-opportunities` | cricket game partnership | none (no partnership content existed) | low (one per app; hub links all) | Scoped to a different question than the nearest article and links to it; similarity gate passed |
| `cricket-fielding-positions` | cricket fielding positions | none close | low | Distinct keyword and intent; similarity gate passed |
| `cricket-formats-explained` | test vs odi vs t20 | subtitle-formats-explained (0.50) | low | Distinct keyword and intent; similarity gate passed |
| `cricket-milestones-explained` | what is a century in cricket | none close | low | Distinct keyword and intent; similarity gate passed |
| `cricket-player-roles` | cricket player roles | none close | low | Distinct keyword and intent; similarity gate passed |
| `cricket-rules-for-beginners` | cricket rules for beginners | soccer-rules-for-beginners (0.43) | low | Distinct keyword and intent; similarity gate passed |
| `cricket-stats-explained` | cricket batting average strike rate | baseball-stats-explained-for-beginners (0.33) | low | Distinct keyword and intent; similarity gate passed |
| `cricket-umpire-signals` | cricket umpire signals | football-positions-explained-for-drafting (0.33) | low | Distinct keyword and intent; similarity gate passed |
| `cuban-missile-crisis-explained` | cuban missile crisis | none close | low | Distinct keyword and intent; similarity gate passed |
| `d-day-explained` | d-day explained | none close | low | Distinct keyword and intent; similarity gate passed |
| `daily-planner-vs-to-do-list` | planner vs to do list | zone-vs-man-defense-basketball (0.43) | low | Distinct keyword and intent; similarity gate passed |
| `de-morgans-laws-explained` | de morgans laws | none close | low | Distinct keyword and intent; similarity gate passed |
| `derangements-explained` | derangements | android-app-permissions-explained (0.50) | low | Distinct keyword and intent; similarity gate passed |
| `diaphragmatic-breathing-explained` | diaphragmatic breathing | none close | low | Distinct keyword and intent; similarity gate passed |
| `dietary-fiber-explained` | dietary fiber explained | none close | low | Distinct keyword and intent; similarity gate passed |
| `dijkstras-algorithm-explained` | dijkstras algorithm | none close | low | Distinct keyword and intent; similarity gate passed |
| `discrete-math-cheat-sheet` | discrete math cheat sheet | none close | low | Distinct keyword and intent; similarity gate passed |
| `discrete-math-study-quiz-guide` | discrete math study app | none close | low | Distinct keyword and intent; similarity gate passed |
| `discrete-math-study-quiz-partnership-opportunities` | math education app partnership | none (no partnership content existed) | low (one per app; hub links all) | Scoped to a different question than the nearest article and links to it; similarity gate passed |
| `diversification-explained` | diversification investing | what-allergy-flags-in-recipe-apps-miss (0.33) | low | Distinct keyword and intent; similarity gate passed |
| `dividend-yield-explained` | dividend yield | why-divisibility-rules-work (0.33) | low | Distinct keyword and intent; similarity gate passed |
| `dollar-cost-averaging-explained` | dollar cost averaging | none close | low | Distinct keyword and intent; similarity gate passed |
| `double-double-triple-double` | double double triple double | multiplication-shortcuts-explained (0.50) | low | Distinct keyword and intent; similarity gate passed |
| `dragon-pet-evolve-guide` | dragon pet game | none close | low | Distinct keyword and intent; similarity gate passed |
| `dragon-pet-evolve-partnership-opportunities` | virtual pet game licensing | none (no partnership content existed) | low (one per app; hub links all) | Scoped to a different question than the nearest article and links to it; similarity gate passed |
| `duckworth-lewis-stern-method` | duckworth lewis stern method | none close | low | Distinct keyword and intent; similarity gate passed |
| `earnings-per-share-explained` | earnings per share | none close | low | Distinct keyword and intent; similarity gate passed |
| `easy-recipes-meal-planner-partnership-opportunities` | meal planner app partnership | none (no partnership content existed) | low (one per app; hub links all) | Scoped to a different question than the nearest article and links to it; similarity gate passed |
| `elemental-type-advantages` | type advantage chart | how-to-build-a-balanced-basketball-roster (0.50) | low | Distinct keyword and intent; similarity gate passed |
| `equivalence-relations-and-classes` | equivalence relation | deductive-reasoning-examples (0.33) | low | Distinct keyword and intent; similarity gate passed |
| `etf-vs-mutual-fund` | etf vs mutual fund | none close | low | Distinct keyword and intent; similarity gate passed |
| `euclidean-algorithm-explained` | euclidean algorithm | how-golf-q-school-works (0.33) | low | Distinct keyword and intent; similarity gate passed |
| `euler-path-vs-euler-circuit` | euler path vs euler circuit | none close | low | Distinct keyword and intent; similarity gate passed |
| `expected-value-explained` | expected value discrete math | estimation-techniques-explained (0.29) | low | Distinct keyword and intent; similarity gate passed |
| `fall-of-the-berlin-wall` | fall of the berlin wall | why-divisibility-rules-work (0.33) | low | Distinct keyword and intent; similarity gate passed |
| `fermats-little-theorem-and-rsa` | fermats little theorem | none close | low | Distinct keyword and intent; similarity gate passed |
| `feudalism-explained` | feudalism explained | why-civilizations-collapse (0.83) | medium | Scoped to a different question than the nearest article and links to it; similarity gate passed |
| `finite-state-machines-explained` | finite state machine | none close | low | Distinct keyword and intent; similarity gate passed |
| `follow-on-rule-cricket` | follow on rule cricket | how-the-offside-rule-works (0.33) | low | Distinct keyword and intent; similarity gate passed |
| `food-storage-times` | how long does food last in the fridge | none close | low | Distinct keyword and intent; similarity gate passed |
| `football-career-games-compared` | american football career game | football-career-sim-guide (0.43) | low | Distinct keyword and intent; similarity gate passed |
| `football-career-pro-league-guide` | football career pro league | rugby-career-sim-guide (0.56) | low | Distinct keyword and intent; similarity gate passed |
| `football-career-pro-league-partnership-opportunities` | football game co-development | none (no partnership content existed) | low (one per app; hub links all) | Scoped to a different question than the nearest article and links to it; similarity gate passed |
| `football-career-sim-partnership-opportunities` | american football game publishing partnership | none (no partnership content existed) | low (one per app; hub links all) | Scoped to a different question than the nearest article and links to it; similarity gate passed |
| `football-career-soccer-league-guide` | soccer career pro league | soccer-career-sim-guide (0.38) | low | Distinct keyword and intent; similarity gate passed |
| `football-career-soccer-league-partnership-opportunities` | soccer game localization partnership | none (no partnership content existed) | low (one per app; hub links all) | Scoped to a different question than the nearest article and links to it; similarity gate passed |
| `football-draft-gm-mode-partnership-opportunities` | football gm game partnership | none (no partnership content existed) | low (one per app; hub links all) | Scoped to a different question than the nearest article and links to it; similarity gate passed |
| `football-league-commissioner-guide` | football league commissioner game | why-divisibility-rules-work (0.33) | low | Distinct keyword and intent; similarity gate passed |
| `football-league-commissioner-partnership-opportunities` | sports league simulator licensing | none (no partnership content existed) | low (one per app; hub links all) | Scoped to a different question than the nearest article and links to it; similarity gate passed |
| `founding-of-the-united-nations` | founding of the united nations | none close | low | Distinct keyword and intent; similarity gate passed |
| `fractional-shares-explained` | fractional shares | none close | low | Distinct keyword and intent; similarity gate passed |
| `free-up-storage-on-android` | free up storage android | anime-coloring-app-guide (0.33) | low | Distinct keyword and intent; similarity gate passed |
| `function-composition-and-inverses` | inverse function discrete math | infield-fly-rule (0.29) | low | Distinct keyword and intent; similarity gate passed |
| `fundamental-theorem-of-arithmetic` | fundamental theorem of arithmetic | why-divisibility-rules-work (0.33) | low | Distinct keyword and intent; similarity gate passed |
| `generating-functions-explained` | generating functions | keto-macros-explained (0.29) | low | Distinct keyword and intent; similarity gate passed |
| `golf-career-simulator-partnership-opportunities` | golf game partnership | none (no partnership content existed) | low (one per app; hub links all) | Scoped to a different question than the nearest article and links to it; similarity gate passed |
| `google-play-content-ratings` | google play content rating | bce-and-ce-explained (0.50) | low | Distinct keyword and intent; similarity gate passed |
| `google-play-refund-guide` | google play refund | google-play-data-safety-explained (0.40) | low | Distinct keyword and intent; similarity gate passed |
| `graph-coloring-explained` | graph coloring chromatic number | none close | low | Distinct keyword and intent; similarity gate passed |
| `graph-isomorphism-explained` | graph isomorphism | short-term-versus-working-memory (0.43) | low | Distinct keyword and intent; similarity gate passed |
| `graph-theory-basics` | graph theory basics | none close | low | Distinct keyword and intent; similarity gate passed |
| `hamiltonian-path-explained` | hamiltonian path | why-divisibility-rules-work (0.33) | low | Distinct keyword and intent; similarity gate passed |
| `hdr-video-on-android` | hdr video android | none close | low | Distinct keyword and intent; similarity gate passed |
| `hero-td-idle-tower-defense-guide` | hero td idle tower defense | tower-types-and-what-they-counter (0.33) | low | Distinct keyword and intent; similarity gate passed |
| `hero-td-idle-tower-defense-partnership-opportunities` | idle game publishing partnership | none (no partnership content existed) | low (one per app; hub links all) | Scoped to a different question than the nearest article and links to it; similarity gate passed |
| `high-protein-breakfast-ideas` | high protein breakfast | none close | low | Distinct keyword and intent; similarity gate passed |
| `hockey-career-games-compared` | hockey career game | hockey-career-sim-guide (0.50) | low | Distinct keyword and intent; similarity gate passed |
| `hockey-career-pro-league-guide` | hockey career pro league | what-is-icing-in-hockey (0.50) | low | Distinct keyword and intent; similarity gate passed |
| `hockey-career-pro-league-partnership-opportunities` | hockey game publishing partnership | none (no partnership content existed) | low (one per app; hub links all) | Scoped to a different question than the nearest article and links to it; similarity gate passed |
| `hockey-career-sim-partnership-opportunities` | hockey game licensing | none (no partnership content existed) | low (one per app; hub links all) | Scoped to a different question than the nearest article and links to it; similarity gate passed |
| `hockey-draft-gm-manager-partnership-opportunities` | hockey gm game partnership | none (no partnership content existed) | low (one per app; hub links all) | Scoped to a different question than the nearest article and links to it; similarity gate passed |
| `how-a-test-match-ends-in-a-draw` | how can a test match be a draw | recipe-scaling-and-serving-sizes (0.33) | low | Distinct keyword and intent; similarity gate passed |
| `how-crafting-systems-work` | crafting system games | free-agency-explained (0.33) | low | Distinct keyword and intent; similarity gate passed |
| `how-cricket-pitches-affect-play` | cricket pitch conditions | none close | low | Distinct keyword and intent; similarity gate passed |
| `how-cricket-scoring-works` | how does cricket scoring work | how-golf-q-school-works (0.33) | low | Distinct keyword and intent; similarity gate passed |
| `how-dividends-work` | how do dividends work | none close | low | Distinct keyword and intent; similarity gate passed |
| `how-does-the-nfl-draft-work` | how does the nfl draft work | how-football-draft-order-works (0.43) | low | Distinct keyword and intent; similarity gate passed |
| `how-drs-works-in-cricket` | drs in cricket | how-golf-q-school-works (0.33) | low | Distinct keyword and intent; similarity gate passed |
| `how-long-is-a-cricket-match` | how long does a cricket match last | none close | low | Distinct keyword and intent; similarity gate passed |
| `how-long-is-a-hockey-shift` | how long is a hockey shift | what-is-icing-in-hockey (0.50) | low | Distinct keyword and intent; similarity gate passed |
| `how-racing-qualifying-works` | how does qualifying work in racing | batting-order-strategy-explained (0.38) | low | Distinct keyword and intent; similarity gate passed |
| `how-sports-schedules-are-made` | how are sports schedules made | none close | low | Distinct keyword and intent; similarity gate passed |
| `how-the-mlb-draft-works` | how does the mlb draft work | how-does-the-nhl-draft-work (0.71) | medium | Scoped to a different question than the nearest article and links to it; similarity gate passed |
| `how-the-nba-offseason-works` | nba offseason calendar | free-agency-explained (0.67) | medium | Scoped to a different question than the nearest article and links to it; similarity gate passed |
| `how-the-stock-market-works` | how does the stock market work | how-golf-q-school-works (0.33) | low | Distinct keyword and intent; similarity gate passed |
| `how-to-add-a-language-keyboard-on-android` | add language keyboard android | vietnamese-alphabet-explained (0.50) | low | Distinct keyword and intent; similarity gate passed |
| `how-to-add-timestamps-to-a-transcript` | transcript timestamps | how-to-play-mkv-files-on-android (0.29) | low | Distinct keyword and intent; similarity gate passed |
| `how-to-annotate-a-pdf` | how to annotate a pdf | none close | low | Distinct keyword and intent; similarity gate passed |
| `how-to-cast-video-to-tv-from-android` | cast video from android to tv | none close | low | Distinct keyword and intent; similarity gate passed |
| `how-to-color-anime-eyes` | how to color anime eyes | color-palettes-for-anime-art (0.50) | low | Distinct keyword and intent; similarity gate passed |
| `how-to-color-skin-tones-digitally` | how to color skin digitally | vietnamese-tones-explained (0.50) | low | Distinct keyword and intent; similarity gate passed |
| `how-to-compress-a-pdf` | how to compress a pdf | helping-a-child-with-math-facts (0.40) | low | Distinct keyword and intent; similarity gate passed |
| `how-to-convert-images-to-pdf` | convert images to pdf android | how-sports-simulation-engines-work (0.33) | low | Distinct keyword and intent; similarity gate passed |
| `how-to-fill-in-a-pdf-form` | how to fill out a pdf form on phone | none close | low | Distinct keyword and intent; similarity gate passed |
| `how-to-make-a-habit-tracker` | habit tracker journal | none close | low | Distinct keyword and intent; similarity gate passed |
| `how-to-make-a-truth-table` | how to make a truth table | none close | low | Distinct keyword and intent; similarity gate passed |
| `how-to-merge-pdf-files-on-android` | how to merge pdf files on android | none close | low | Distinct keyword and intent; similarity gate passed |
| `how-to-password-protect-a-pdf` | password protect pdf | android-app-permissions-explained (0.50) | low | Distinct keyword and intent; similarity gate passed |
| `how-to-practise-speaking-alone` | how to practice speaking a language alone | listening-practice-in-a-new-language (0.50) | low | Distinct keyword and intent; similarity gate passed |
| `how-to-print-a-pdf-from-android` | print pdf from android | none close | low | Distinct keyword and intent; similarity gate passed |
| `how-to-read-a-stock-quote` | how to read a stock quote | none close | low | Distinct keyword and intent; similarity gate passed |
| `how-to-read-an-earnings-report` | how to read an earnings report | none close | low | Distinct keyword and intent; similarity gate passed |
| `how-to-read-candlestick-charts` | how to read candlestick charts | what-allergy-flags-in-recipe-apps-miss (0.43) | low | Distinct keyword and intent; similarity gate passed |
| `how-to-read-protein-powder-labels` | protein powder label | added-sugars-vs-total-sugars (0.33) | low | Distinct keyword and intent; similarity gate passed |
| `how-to-scan-documents-to-pdf` | scan documents to pdf with phone | none close | low | Distinct keyword and intent; similarity gate passed |
| `how-to-sign-a-pdf-on-android` | how to sign a pdf on android | none close | low | Distinct keyword and intent; similarity gate passed |
| `how-to-split-a-pdf` | how to split a pdf | none close | low | Distinct keyword and intent; similarity gate passed |
| `how-to-spot-fake-trading-cards` | how to tell if a card is fake | none close | low | Distinct keyword and intent; similarity gate passed |
| `how-to-store-trading-cards` | how to store trading cards | bulk-scanning-a-card-collection (0.29) | low | Distinct keyword and intent; similarity gate passed |
| `how-to-study-for-a-discrete-math-exam` | discrete math exam | none close | low | Distinct keyword and intent; similarity gate passed |
| `how-to-transcribe-a-voice-memo` | how to transcribe a voice memo | how-sports-simulation-engines-work (0.33) | low | Distinct keyword and intent; similarity gate passed |
| `how-to-transcribe-an-interview` | how to transcribe an interview | none close | low | Distinct keyword and intent; similarity gate passed |
| `how-to-transcribe-lectures` | how to transcribe lectures | none close | low | Distinct keyword and intent; similarity gate passed |
| `how-to-update-apps-on-android` | how to update apps on android | recipe-nutrition-figures-and-why-they-move (0.40) | low | Distinct keyword and intent; similarity gate passed |
| `how-to-write-a-direct-proof` | how to write a direct proof | none close | low | Distinct keyword and intent; similarity gate passed |
| `hundred-years-war-explained` | hundred years war | why-divisibility-rules-work (0.33) | low | Distinct keyword and intent; similarity gate passed |
| `in-app-purchases-explained` | in app purchases meaning | google-play-data-safety-explained (0.40) | low | Distinct keyword and intent; similarity gate passed |
| `inclusion-exclusion-principle` | inclusion exclusion principle | none close | low | Distinct keyword and intent; similarity gate passed |
| `index-funds-explained` | what is an index fund | how-golf-q-school-works (0.33) | low | Distinct keyword and intent; similarity gate passed |
| `injective-surjective-bijective` | injective surjective bijective | none close | low | Distinct keyword and intent; similarity gate passed |
| `investment-fraud-red-flags` | investment fraud red flags | none close | low | Distinct keyword and intent; similarity gate passed |
| `italian-essere-vs-avere` | essere vs avere | italian-articles-and-gender (0.33) | low | Distinct keyword and intent; similarity gate passed |
| `italian-greetings-formal-informal` | italian greetings | italian-articles-and-gender (0.33) | low | Distinct keyword and intent; similarity gate passed |
| `italian-numbers` | italian numbers | italian-articles-and-gender (0.33) | low | Distinct keyword and intent; similarity gate passed |
| `italian-plural-nouns` | italian plural nouns | italian-articles-and-gender (0.33) | low | Distinct keyword and intent; similarity gate passed |
| `italian-prepositions-explained` | italian prepositions | italian-articles-and-gender (0.33) | low | Distinct keyword and intent; similarity gate passed |
| `italian-pronunciation-guide` | italian pronunciation | italian-articles-and-gender (0.33) | low | Distinct keyword and intent; similarity gate passed |
| `italian-restaurant-phrases` | italian restaurant phrases | italian-articles-and-gender (0.33) | low | Distinct keyword and intent; similarity gate passed |
| `jellyfish-arena-survivor-io-partnership-opportunities` | io game partnership | none (no partnership content existed) | low (one per app; hub links all) | Scoped to a different question than the nearest article and links to it; similarity gate passed |
| `journaling-prompts-for-beginners` | journaling prompts | baseball-stats-explained-for-beginners (0.33) | low | Distinct keyword and intent; similarity gate passed |
| `jyutping-explained` | jyutping | how-boxing-records-are-written (0.33) | low | Distinct keyword and intent; similarity gate passed |
| `kawaii-breathe-relax-guide` | breathing app for relaxation | hockey-career-sim-guide (0.29) | low | Distinct keyword and intent; similarity gate passed |
| `kawaii-breathe-relax-partnership-opportunities` | wellness app partnership | none (no partnership content existed) | low (one per app; hub links all) | Scoped to a different question than the nearest article and links to it; similarity gate passed |
| `kawaii-cute-notes-journal-guide` | cute notes app | none close | low | Distinct keyword and intent; similarity gate passed |
| `kawaii-cute-notes-journal-partnership-opportunities` | journal app partnership | none (no partnership content existed) | low (one per app; hub links all) | Scoped to a different question than the nearest article and links to it; similarity gate passed |
| `keto-diet-tracker-partnership-opportunities` | keto app licensing | none (no partnership content existed) | low (one per app; hub links all) | Scoped to a different question than the nearest article and links to it; similarity gate passed |
| `khmer-consonant-series` | khmer consonants | khmer-script-explained (0.71) | medium | Scoped to a different question than the nearest article and links to it; similarity gate passed |
| `khmer-numbers` | khmer numbers | lao-numbers-and-prices (0.60) | medium | Scoped to a different question than the nearest article and links to it; similarity gate passed |
| `khmer-vowels-explained` | khmer vowels | khmer-script-explained (0.33) | low | Distinct keyword and intent; similarity gate passed |
| `kitchen-measurement-conversions` | kitchen measurement conversions | none close | low | Distinct keyword and intent; similarity gate passed |
| `knights-and-knaves-puzzles` | knights and knaves puzzles | logic-grid-puzzles (0.43) | low | Distinct keyword and intent; similarity gate passed |
| `lao-vowels-explained` | lao vowels | lao-alphabet-explained (0.50) | low | Distinct keyword and intent; similarity gate passed |
| `lattice-paths-counting` | lattice paths | lattice-and-line-multiplication (0.50) | low | Distinct keyword and intent; similarity gate passed |
| `lbw-rule-explained` | lbw rule | how-the-offside-rule-works (0.33) | low | Distinct keyword and intent; similarity gate passed |
| `league-sandbox-vs-franchise-gm` | basketball gm game | basketball-advanced-stats-explained (0.33) | low | Distinct keyword and intent; similarity gate passed |
| `learn-cambodian-khmer-partnership-opportunities` | khmer learning app partnership | none (no partnership content existed) | low (one per app; hub links all) | Scoped to a different question than the nearest article and links to it; similarity gate passed |
| `learn-cantonese-partnership-opportunities` | cantonese learning app partnership | none (no partnership content existed) | low (one per app; hub links all) | Scoped to a different question than the nearest article and links to it; similarity gate passed |
| `learn-italian-partnership-opportunities` | italian learning app partnership | none (no partnership content existed) | low (one per app; hub links all) | Scoped to a different question than the nearest article and links to it; similarity gate passed |
| `learn-lao-partnership-opportunities` | lao language app partnership | none (no partnership content existed) | low (one per app; hub links all) | Scoped to a different question than the nearest article and links to it; similarity gate passed |
| `learn-malay-partnership-opportunities` | malay learning app partnership | none (no partnership content existed) | low (one per app; hub links all) | Scoped to a different question than the nearest article and links to it; similarity gate passed |
| `learn-marathi-partnership-opportunities` | marathi learning app partnership | none (no partnership content existed) | low (one per app; hub links all) | Scoped to a different question than the nearest article and links to it; similarity gate passed |
| `learn-russian-partnership-opportunities` | russian learning app licensing | none (no partnership content existed) | low (one per app; hub links all) | Scoped to a different question than the nearest article and links to it; similarity gate passed |
| `learn-shanghainese-partnership-opportunities` | shanghainese learning partnership | none (no partnership content existed) | low (one per app; hub links all) | Scoped to a different question than the nearest article and links to it; similarity gate passed |
| `learn-thai-partnership-opportunities` | thai learning app partnership | none (no partnership content existed) | low (one per app; hub links all) | Scoped to a different question than the nearest article and links to it; similarity gate passed |
| `learn-to-trade-stocks-guide` | learn to trade stocks app | learn-lao-beginners-guide (0.43) | low | Distinct keyword and intent; similarity gate passed |
| `learn-to-trade-stocks-partnership-opportunities` | financial literacy app partnership | none (no partnership content existed) | low (one per app; hub links all) | Scoped to a different question than the nearest article and links to it; similarity gate passed |
| `learn-vietnamese-partnership-opportunities` | vietnamese learning app partnership | none (no partnership content existed) | low (one per app; hub links all) | Scoped to a different question than the nearest article and links to it; similarity gate passed |
| `life-simulator-city-builder-guide` | life sim city builder | baseball-career-sim-guide (0.50) | low | Distinct keyword and intent; similarity gate passed |
| `life-simulator-city-builder-partnership-opportunities` | city builder game partnership | none (no partnership content existed) | low (one per app; hub links all) | Scoped to a different question than the nearest article and links to it; similarity gate passed |
| `links-vs-parkland-golf-courses` | links vs parkland golf course | golf-course-management-basics (0.33) | low | Distinct keyword and intent; similarity gate passed |
| `logical-equivalence-explained` | logical equivalence discrete math | none close | low | Distinct keyword and intent; similarity gate passed |
| `low-carb-fruits-list` | low carb fruits | electrolytes-on-low-carb (0.40) | low | Distinct keyword and intent; similarity gate passed |
| `low-carb-vegetables-list` | low carb vegetables | electrolytes-on-low-carb (0.40) | low | Distinct keyword and intent; similarity gate passed |
| `macd-explained` | macd indicator | none close | low | Distinct keyword and intent; similarity gate passed |
| `magna-carta-explained` | magna carta | why-divisibility-rules-work (0.33) | low | Distinct keyword and intent; similarity gate passed |
| `malay-days-and-time` | malay days of the week | none close | low | Distinct keyword and intent; similarity gate passed |
| `malay-numbers` | malay numbers | lao-numbers-and-prices (0.43) | low | Distinct keyword and intent; similarity gate passed |
| `malay-pronouns` | malay pronouns | vietnamese-pronouns-explained (0.50) | low | Distinct keyword and intent; similarity gate passed |
| `malay-question-words` | malay question words | none close | low | Distinct keyword and intent; similarity gate passed |
| `marathi-postpositions` | marathi postpositions | learn-marathi-beginners-guide (0.40) | low | Distinct keyword and intent; similarity gate passed |
| `marathi-pronouns` | marathi pronouns | vietnamese-pronouns-explained (0.50) | low | Distinct keyword and intent; similarity gate passed |
| `margin-call-explained` | margin call | none close | low | Distinct keyword and intent; similarity gate passed |
| `market-capitalization-explained` | market capitalization | none close | low | Distinct keyword and intent; similarity gate passed |
| `market-circuit-breakers-explained` | stock market circuit breakers | none close | low | Distinct keyword and intent; similarity gate passed |
| `market-order-vs-limit-order` | market order vs limit order | none close | low | Distinct keyword and intent; similarity gate passed |
| `meal-planning-on-a-budget` | meal planning on a budget | how-to-meal-plan-for-the-week (0.40) | low | Distinct keyword and intent; similarity gate passed |
| `meal-prep-food-safety` | meal prep food safety | none close | low | Distinct keyword and intent; similarity gate passed |
| `mental-math-memory-games-partnership-opportunities` | brain training app acquisition | none (no partnership content existed) | low (one per app; hub links all) | Scoped to a different question than the nearest article and links to it; similarity gate passed |
| `minimum-spanning-tree-explained` | minimum spanning tree | none close | low | Distinct keyword and intent; similarity gate passed |
| `mma-boxing-fight-draft-partnership-opportunities` | mma game licensing | none (no partnership content existed) | low (one per app; hub links all) | Scoped to a different question than the nearest article and links to it; similarity gate passed |
| `modular-arithmetic-explained` | modular arithmetic | why-divisibility-rules-work (0.33) | low | Distinct keyword and intent; similarity gate passed |
| `modular-inverse-explained` | modular inverse | none close | low | Distinct keyword and intent; similarity gate passed |
| `monty-hall-problem-explained` | monty hall problem | why-divisibility-rules-work (0.33) | low | Distinct keyword and intent; similarity gate passed |
| `mood-tracking-journal` | mood tracker journal | none close | low | Distinct keyword and intent; similarity gate passed |
| `motorsport-career-ladder` | how to become a racing driver | how-soccer-academies-work (0.33) | low | Distinct keyword and intent; similarity gate passed |
| `move-apps-to-a-new-android-phone` | transfer apps to new android phone | transfers-and-contracts-explained (0.33) | low | Distinct keyword and intent; similarity gate passed |
| `moving-averages-explained` | moving average stocks | none close | low | Distinct keyword and intent; similarity gate passed |
| `napoleon-rise-and-fall` | napoleon rise and fall | ottoman-empire-rise-and-decline (0.50) | low | Distinct keyword and intent; similarity gate passed |
| `negating-quantified-statements` | negating quantifiers | conditional-reasoning-if-then (0.29) | low | Distinct keyword and intent; similarity gate passed |
| `net-run-rate-explained` | net run rate | frame-rate-and-resolution-explained (0.33) | low | Distinct keyword and intent; similarity gate passed |
| `no-ball-and-wide-rules` | no ball rule cricket | free-agency-explained (0.33) | low | Distinct keyword and intent; similarity gate passed |
| `norman-conquest-1066` | norman conquest 1066 | none close | low | Distinct keyword and intent; similarity gate passed |
| `northern-vs-southern-vietnamese` | northern vs southern vietnamese | vietnamese-tones-explained (1.00) | medium | Scoped to a different question than the nearest article and links to it; similarity gate passed |
| `number-bases-and-binary` | converting number bases | fraction-decimal-percent-conversions (0.29) | low | Distinct keyword and intent; similarity gate passed |
| `ocr-explained` | what is ocr | none close | low | Distinct keyword and intent; similarity gate passed |
| `pace-vs-spin-bowling` | pace vs spin bowling | none close | low | Distinct keyword and intent; similarity gate passed |
| `partial-orders-and-hasse-diagrams` | hasse diagram | none close | low | Distinct keyword and intent; similarity gate passed |
| `passato-prossimo-vs-imperfetto` | passato prossimo vs imperfetto | italian-articles-and-gender (0.33) | low | Distinct keyword and intent; similarity gate passed |
| `pattern-day-trader-rule` | pattern day trader rule | finding-the-rule-in-a-number-pattern (0.40) | low | Distinct keyword and intent; similarity gate passed |
| `pdf-all-in-one-tools-guide` | pdf tools app android | none close | low | Distinct keyword and intent; similarity gate passed |
| `pdf-all-in-one-tools-partnership-opportunities` | pdf app partnership | none (no partnership content existed) | low (one per app; hub links all) | Scoped to a different question than the nearest article and links to it; similarity gate passed |
| `pdf-vs-pdf-a` | pdf vs pdf/a | none close | low | Distinct keyword and intent; similarity gate passed |
| `pe-ratio-explained` | price to earnings ratio | recipe-scaling-and-serving-sizes (0.33) | low | Distinct keyword and intent; similarity gate passed |
| `permutations-vs-combinations` | permutations vs combinations | verbal-reasoning-question-types (0.29) | low | Distinct keyword and intent; similarity gate passed |
| `pigeonhole-principle-examples` | pigeonhole principle | none close | low | Distinct keyword and intent; similarity gate passed |
| `planar-graphs-and-eulers-formula` | planar graph euler formula | none close | low | Distinct keyword and intent; similarity gate passed |
| `power-set-explained` | power set | why-divisibility-rules-work (0.33) | low | Distinct keyword and intent; similarity gate passed |
| `powerplays-in-cricket` | powerplay in cricket | none close | low | Distinct keyword and intent; similarity gate passed |
| `predicates-and-quantifiers` | universal and existential quantifiers | how-boxing-records-are-written (0.33) | low | Distinct keyword and intent; similarity gate passed |
| `pro-basketball-draft-gm-mode-partnership-opportunities` | basketball gm game acquisition | none (no partnership content existed) | low (one per app; hub links all) | Scoped to a different question than the nearest article and links to it; similarity gate passed |
| `pro-basketball-my-career-sim-partnership-opportunities` | basketball career game licensing | none (no partnership content existed) | low (one per app; hub links all) | Scoped to a different question than the nearest article and links to it; similarity gate passed |
| `progressive-jackpots-explained` | how progressive jackpots work | malay-reduplication-explained (0.29) | low | Distinct keyword and intent; similarity gate passed |
| `proof-by-contradiction-explained` | proof by contradiction | zone-vs-man-defense-basketball (0.40) | low | Distinct keyword and intent; similarity gate passed |
| `proof-by-contrapositive-explained` | proof by contrapositive | direct-vs-indirect-free-kick (0.33) | low | Distinct keyword and intent; similarity gate passed |
| `proof-by-induction-step-by-step` | proof by induction | none close | low | Distinct keyword and intent; similarity gate passed |
| `properties-of-relations` | reflexive symmetric transitive | none close | low | Distinct keyword and intent; similarity gate passed |
| `protein-diet-tracker-partnership-opportunities` | nutrition tracker app partnership | none (no partnership content existed) | low (one per app; hub links all) | Scoped to a different question than the nearest article and links to it; similarity gate passed |
| `protein-in-common-foods` | protein in common foods | protein-per-meal-explained (0.33) | low | Distinct keyword and intent; similarity gate passed |
| `quality-start-baseball` | quality start baseball | baseball-stats-explained-for-beginners (0.33) | low | Distinct keyword and intent; similarity gate passed |
| `racing-car-setup-basics` | race car setup guide | none close | low | Distinct keyword and intent; similarity gate passed |
| `racing-flags-explained` | racing flags meaning | what-does-td-mean-in-games (0.33) | low | Distinct keyword and intent; similarity gate passed |
| `racing-line-explained` | racing line explained | none close | low | Distinct keyword and intent; similarity gate passed |
| `racing-points-systems` | racing points system | tennis-rating-systems-ntrp-utr-wtn (0.33) | low | Distinct keyword and intent; similarity gate passed |
| `racing-tire-strategy` | tyre strategy | none close | low | Distinct keyword and intent; similarity gate passed |
| `ramsey-numbers-introduction` | ramsey numbers | interference-and-forgetting (0.67) | medium | Scoped to a different question than the nearest article and links to it; similarity gate passed |
| `recurrence-relations-explained` | recurrence relations | none close | low | Distinct keyword and intent; similarity gate passed |
| `regal-tower-defense-partnership-opportunities` | tower defense game acquisition | none (no partnership content existed) | low (one per app; hub links all) | Scoped to a different question than the nearest article and links to it; similarity gate passed |
| `regal-video-player-partnership-opportunities` | video player app licensing | none (no partnership content existed) | low (one per app; hub links all) | Scoped to a different question than the nearest article and links to it; similarity gate passed |
| `risk-tolerance-explained` | risk tolerance investing | reliability-and-validity-in-testing (0.43) | low | Distinct keyword and intent; similarity gate passed |
| `roman-republic-vs-empire` | roman republic vs roman empire | ottoman-empire-rise-and-decline (0.40) | low | Distinct keyword and intent; similarity gate passed |
| `rsi-indicator-explained` | rsi indicator | recipe-scaling-and-serving-sizes (0.33) | low | Distinct keyword and intent; similarity gate passed |
| `rugby-career-paths` | how to become a professional rugby player | how-soccer-academies-work (0.40) | low | Distinct keyword and intent; similarity gate passed |
| `rugby-career-sim-partnership-opportunities` | rugby game partnership | none (no partnership content existed) | low (one per app; hub links all) | Scoped to a different question than the nearest article and links to it; similarity gate passed |
| `rugby-draft-pro-league-partnership-opportunities` | rugby gm game partnership | none (no partnership content existed) | low (one per app; hub links all) | Scoped to a different question than the nearest article and links to it; similarity gate passed |
| `rules-of-inference-explained` | rules of inference | why-divisibility-rules-work (0.33) | low | Distinct keyword and intent; similarity gate passed |
| `russian-adjective-endings` | russian adjective endings | italian-articles-and-gender (0.33) | low | Distinct keyword and intent; similarity gate passed |
| `russian-greetings` | russian greetings | none close | low | Distinct keyword and intent; similarity gate passed |
| `russian-numbers` | russian numbers | baseball-positions-by-number (0.40) | low | Distinct keyword and intent; similarity gate passed |
| `russian-personal-pronouns` | russian pronouns | vietnamese-pronouns-explained (0.50) | low | Distinct keyword and intent; similarity gate passed |
| `russian-soft-and-hard-signs` | russian soft sign | learn-russian-cyrillic-beginners-guide (0.50) | low | Distinct keyword and intent; similarity gate passed |
| `safe-cooking-temperatures` | safe cooking temperatures | none close | low | Distinct keyword and intent; similarity gate passed |
| `safety-car-explained` | safety car rules | why-divisibility-rules-work (0.33) | low | Distinct keyword and intent; similarity gate passed |
| `sequences-and-summation-notation` | summation notation | how-boxing-records-are-written (0.33) | low | Distinct keyword and intent; similarity gate passed |
| `set-operations-explained` | set operations | rugby-scrum-and-lineout-rules (0.33) | low | Distinct keyword and intent; similarity gate passed |
| `short-selling-explained` | how short selling works | how-golf-q-school-works (0.33) | low | Distinct keyword and intent; similarity gate passed |
| `sipc-protection-explained` | sipc protection | none close | low | Distinct keyword and intent; similarity gate passed |
| `slipstream-and-drafting` | slipstream in racing | cover-2-vs-cover-3 (0.33) | low | Distinct keyword and intent; similarity gate passed |
| `slow-breathing-and-relaxation` | slow breathing benefits | protein-per-meal-explained (0.33) | low | Distinct keyword and intent; similarity gate passed |
| `soccer-career-games-compared` | soccer career game android | how-to-choose-a-sports-career-sim (0.67) | medium | Scoped to a different question than the nearest article and links to it; similarity gate passed |
| `soccer-career-sim-xi-partnership-opportunities` | soccer career game partnership | none (no partnership content existed) | low (one per app; hub links all) | Scoped to a different question than the nearest article and links to it; similarity gate passed |
| `soccer-draft-gm-xi-partnership-opportunities` | soccer manager game acquisition | none (no partnership content existed) | low (one per app; hub links all) | Scoped to a different question than the nearest article and links to it; similarity gate passed |
| `space-galaxy-attack-hardcore-partnership-opportunities` | shooter game acquisition | none (no partnership content existed) | low (one per app; hub links all) | Scoped to a different question than the nearest article and links to it; similarity gate passed |
| `space-shooter-classic-arcade-partnership-opportunities` | arcade game publishing partnership | none (no partnership content existed) | low (one per app; hub links all) | Scoped to a different question than the nearest article and links to it; similarity gate passed |
| `speech-to-text-accuracy-tips` | improve speech to text accuracy | how-to-improve-concentration (0.33) | low | Distinct keyword and intent; similarity gate passed |
| `spin-bowling-variations` | types of spin bowling | none close | low | Distinct keyword and intent; similarity gate passed |
| `stars-and-bars-explained` | stars and bars | none close | low | Distinct keyword and intent; similarity gate passed |
| `stock-buybacks-explained` | stock buyback | tennis-coaching-teams-explained (0.33) | low | Distinct keyword and intent; similarity gate passed |
| `stock-market-hours-explained` | stock market hours | none close | low | Distinct keyword and intent; similarity gate passed |
| `stock-splits-explained` | stock split explained | recipe-scaling-and-serving-sizes (0.33) | low | Distinct keyword and intent; similarity gate passed |
| `stocks-vs-bonds` | stocks vs bonds | none close | low | Distinct keyword and intent; similarity gate passed |
| `stop-apps-using-mobile-data` | stop apps using mobile data android | none close | low | Distinct keyword and intent; similarity gate passed |
| `stop-order-vs-stop-limit-order` | stop order vs stop limit order | none close | low | Distinct keyword and intent; similarity gate passed |
| `strong-induction-vs-weak-induction` | strong induction vs weak induction | how-many-words-to-be-conversational (0.33) | low | Distinct keyword and intent; similarity gate passed |
| `super-over-rules` | super over rules | why-divisibility-rules-work (0.33) | low | Distinct keyword and intent; similarity gate passed |
| `support-and-resistance-explained` | support and resistance | cefr-levels-explained (0.50) | low | Distinct keyword and intent; similarity gate passed |
| `tautology-contradiction-contingency` | tautology contradiction contingency | none close | low | Distinct keyword and intent; similarity gate passed |
| `tcg-card-grading-scanner-partnership-opportunities` | card scanner app partnership | none (no partnership content existed) | low (one per app; hub links all) | Scoped to a different question than the nearest article and links to it; similarity gate passed |
| `technical-vs-fundamental-analysis` | technical vs fundamental analysis | reliability-and-validity-in-testing (0.29) | low | Distinct keyword and intent; similarity gate passed |
| `tennis-career-sim-partnership-opportunities` | tennis game licensing | none (no partnership content existed) | low (one per app; hub links all) | Scoped to a different question than the nearest article and links to it; similarity gate passed |
| `thai-classifiers` | thai classifiers | how-golf-q-school-works (0.33) | low | Distinct keyword and intent; similarity gate passed |
| `thai-consonant-classes` | thai consonant classes | lao-tone-rules (0.38) | low | Distinct keyword and intent; similarity gate passed |
| `thai-greetings` | thai greetings | when-to-go-for-it-on-4th-down (0.33) | low | Distinct keyword and intent; similarity gate passed |
| `thai-numbers` | thai numbers | lao-numbers-and-prices (0.60) | medium | Scoped to a different question than the nearest article and links to it; similarity gate passed |
| `thai-polite-particles` | khrap and kha | none close | low | Distinct keyword and intent; similarity gate passed |
| `thai-vowels-explained` | thai vowels | lao-vs-thai-differences (0.33) | low | Distinct keyword and intent; similarity gate passed |
| `the-1918-influenza-pandemic` | 1918 flu pandemic | none close | low | Distinct keyword and intent; similarity gate passed |
| `the-age-of-exploration` | age of exploration | none close | low | Distinct keyword and intent; similarity gate passed |
| `the-aztec-empire-explained` | aztec empire | none close | low | Distinct keyword and intent; similarity gate passed |
| `the-boxer-rebellion-explained` | boxer rebellion | none close | low | Distinct keyword and intent; similarity gate passed |
| `the-cold-war-explained` | cold war explained | history-of-inventions-timeline (0.33) | low | Distinct keyword and intent; similarity gate passed |
| `the-crusades-explained` | the crusades explained | none close | low | Distinct keyword and intent; similarity gate passed |
| `the-enlightenment-explained` | what was the enlightenment | none close | low | Distinct keyword and intent; similarity gate passed |
| `the-great-depression-explained` | great depression explained | none close | low | Distinct keyword and intent; similarity gate passed |
| `the-han-dynasty-explained` | han dynasty | why-divisibility-rules-work (0.33) | low | Distinct keyword and intent; similarity gate passed |
| `the-korean-war-explained` | korean war explained | what-started-the-first-world-war (0.40) | low | Distinct keyword and intent; similarity gate passed |
| `the-marshall-plan-explained` | marshall plan | why-meal-plans-fail-midweek (0.40) | low | Distinct keyword and intent; similarity gate passed |
| `the-mexican-revolution-explained` | mexican revolution | french-revolution-causes-and-phases (0.33) | low | Distinct keyword and intent; similarity gate passed |
| `the-ming-dynasty-explained` | ming dynasty | none close | low | Distinct keyword and intent; similarity gate passed |
| `the-persian-wars-explained` | persian wars | none close | low | Distinct keyword and intent; similarity gate passed |
| `the-protestant-reformation` | protestant reformation | none close | low | Distinct keyword and intent; similarity gate passed |
| `the-punic-wars-explained` | punic wars | none close | low | Distinct keyword and intent; similarity gate passed |
| `the-renaissance-explained` | what was the renaissance | infield-fly-rule (0.33) | low | Distinct keyword and intent; similarity gate passed |
| `the-space-race-explained` | space race explained | none close | low | Distinct keyword and intent; similarity gate passed |
| `the-taiping-rebellion-explained` | taiping rebellion | chinas-deadliest-rebellions (0.29) | low | Distinct keyword and intent; similarity gate passed |
| `the-thirty-years-war-explained` | thirty years war | none close | low | Distinct keyword and intent; similarity gate passed |
| `the-vikings-explained` | who were the vikings | kush-and-the-nubian-pharaohs (0.33) | low | Distinct keyword and intent; similarity gate passed |
| `time-in-force-order-types` | day order vs good til canceled | none close | low | Distinct keyword and intent; similarity gate passed |
| `tower-defense-upgrade-priority` | idle tower defense upgrade guide | tower-defense-strategy-basics (0.38) | low | Distinct keyword and intent; similarity gate passed |
| `trade-settlement-t-plus-1` | t+1 settlement | when-to-go-for-it-on-4th-down (0.33) | low | Distinct keyword and intent; similarity gate passed |
| `trading-journal-how-to` | trading journal | protein-tracking-apps-compared (0.29) | low | Distinct keyword and intent; similarity gate passed |
| `trading-volume-explained` | trading volume | spatial-reasoning-and-number-sense (0.40) | low | Distinct keyword and intent; similarity gate passed |
| `transcribe-audio-to-text-guide` | audio to text app android | audio-codecs-explained (0.50) | low | Distinct keyword and intent; similarity gate passed |
| `transcribe-audio-to-text-partnership-opportunities` | transcription app partnership | none (no partnership content existed) | low (one per app; hub links all) | Scoped to a different question than the nearest article and links to it; similarity gate passed |
| `trees-in-graph-theory` | trees graph theory | why-divisibility-rules-work (0.33) | low | Distinct keyword and intent; similarity gate passed |
| `turn-off-personalized-ads-android` | turn off personalized ads android | none close | low | Distinct keyword and intent; similarity gate passed |
| `undercut-vs-overcut` | undercut vs overcut | none close | low | Distinct keyword and intent; similarity gate passed |
| `unification-of-germany` | unification of germany | none close | low | Distinct keyword and intent; similarity gate passed |
| `unification-of-italy` | unification of italy | none close | low | Distinct keyword and intent; similarity gate passed |
| `valid-vs-sound-arguments` | valid vs sound argument | why-divisibility-rules-work (0.33) | low | Distinct keyword and intent; similarity gate passed |
| `verbatim-vs-clean-transcription` | verbatim vs clean verbatim | remuxing-vs-transcoding (0.50) | low | Distinct keyword and intent; similarity gate passed |
| `vietnamese-classifiers` | vietnamese classifiers | vietnamese-alphabet-explained (0.50) | low | Distinct keyword and intent; similarity gate passed |
| `vietnamese-greetings` | vietnamese greetings | vietnamese-alphabet-explained (0.50) | low | Distinct keyword and intent; similarity gate passed |
| `vietnamese-numbers` | vietnamese numbers | vietnamese-alphabet-explained (0.50) | low | Distinct keyword and intent; similarity gate passed |
| `virtual-pet-games-explained` | virtual pet games | free-agency-explained (0.33) | low | Distinct keyword and intent; similarity gate passed |
| `wash-sale-rule-explained` | wash sale rule | how-the-offside-rule-works (0.33) | low | Distinct keyword and intent; similarity gate passed |
| `ways-to-get-out-in-cricket` | ways to get out in cricket | none close | low | Distinct keyword and intent; similarity gate passed |
| `wet-weather-racing` | racing in the rain | none close | low | Distinct keyword and intent; similarity gate passed |
| `what-are-cozy-games` | what are cozy games | designing-memory-games-beyond-matching-pairs (0.43) | low | Distinct keyword and intent; similarity gate passed |
| `what-are-idle-games` | what are idle games | what-are-io-games (0.40) | low | Distinct keyword and intent; similarity gate passed |
| `what-does-a-boxing-corner-do` | boxing cornerman | how-boxing-records-are-written (0.33) | low | Distinct keyword and intent; similarity gate passed |
| `what-does-a-sports-agent-do` | what does a sports agent do | transfers-and-contracts-explained (0.33) | low | Distinct keyword and intent; similarity gate passed |
| `what-does-a-sports-commissioner-do` | what does a sports commissioner do | best-offline-sports-games-android (0.50) | low | Distinct keyword and intent; similarity gate passed |
| `what-is-a-brokerage-account` | what is a brokerage account | types-of-hockey-shots (0.33) | low | Distinct keyword and intent; similarity gate passed |
| `what-is-a-gunship-aircraft` | what is a gunship plane | none close | low | Distinct keyword and intent; similarity gate passed |
| `what-is-a-stock` | what is a stock | keto-macros-explained (0.33) | low | Distinct keyword and intent; similarity gate passed |
| `what-is-a-stock-market-index` | what is a stock market index | glycemic-index-and-load (0.33) | low | Distinct keyword and intent; similarity gate passed |
| `what-is-an-ipo` | what is an ipo | none close | low | Distinct keyword and intent; similarity gate passed |
| `what-is-discrete-math` | what is discrete math | learn-marathi-beginners-guide (0.33) | low | Distinct keyword and intent; similarity gate passed |
| `what-is-paper-trading` | what is paper trading | none close | low | Distinct keyword and intent; similarity gate passed |
| `what-is-volatility` | stock volatility | none close | low | Distinct keyword and intent; similarity gate passed |
| `world-history-timeline-sim-partnership-opportunities` | history education app partnership | none (no partnership content existed) | low (one per app; hub links all) | Scoped to a different question than the nearest article and links to it; similarity gate passed |
| `world-war-1-timeline` | world war 1 timeline | world-history-timeline-guide (0.50) | low | Distinct keyword and intent; similarity gate passed |
| `world-war-gunship-attack-guide` | gunship game | what-started-the-first-world-war (0.33) | low | Distinct keyword and intent; similarity gate passed |
| `world-war-gunship-attack-partnership-opportunities` | action game acquisition | none (no partnership content existed) | low (one per app; hub links all) | Scoped to a different question than the nearest article and links to it; similarity gate passed |
| `zombie-survival-last-survivor-partnership-opportunities` | survival game licensing | none (no partnership content existed) | low (one per app; hub links all) | Scoped to a different question than the nearest article and links to it; similarity gate passed |
