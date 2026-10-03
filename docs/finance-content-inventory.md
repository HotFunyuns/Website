# Finance content inventory, plan and gating record

**Stock Trading Simulator Game → reigncreativellc.com**  
Prepared by agent 5 on 2026-10-02 (America/Los_Angeles) from a read-only extraction of `C:\Users\regal\Desktop\Stock Trading Simulator Game` at commit `7bf9194` (2026-09-26, working tree clean). Machine-readable companion: [`docs/data/finance-candidates.json`](data/finance-candidates.json).

> **Status: BLOCKED.** The primary app is not live on Google Play. No page in this plan may be drafted for publication, scheduled, published or linked until the app is publicly listed and verified (section 18). Every proceed candidate carries `status: "blocked: primary app not live on Google Play (404, 2026-10-02)"`.

## Contents

1. [Status and blocker evidence](#1-status-and-blocker-evidence)
2. [What ships: core pack vs draft shards](#2-what-ships-core-pack-vs-draft-shards)
3. [Extraction method and counts](#3-extraction-method-and-counts)
4. [Academy inventory: 28 units, 280 lessons](#4-academy-inventory-28-units-280-lessons)
5. [Sources the app cites (111)](#5-sources-the-app-cites-111)
6. [Glossary inventory (881 terms)](#6-glossary-inventory-881-terms)
7. [Market history and case studies](#7-market-history-and-case-studies)
8. [Pattern Trainer, Strategy Lab, scenarios and reference content](#8-pattern-trainer-strategy-lab-scenarios-and-reference-content)
9. [Calculators and tools (35)](#9-calculators-and-tools-35)
10. [Simulator mechanics](#10-simulator-mechanics)
11. [App-side notes](#11-app-side-notes)
12. [Proposed information architecture](#12-proposed-information-architecture)
13. [Candidate pages and decisions](#13-candidate-pages-and-decisions)
14. [Source plan (pages opened and confirmed)](#14-source-plan-pages-opened-and-confirmed)
15. [Numeric examples register](#15-numeric-examples-register)
16. [Owned media](#16-owned-media)
17. [Compliance checklist](#17-compliance-checklist)
18. [Exact steps to unblock](#18-exact-steps-to-unblock)
19. [Appendix: commands](#19-appendix-commands)

### Summary

- **Blocker confirmed independently today.** The Play details page returns 404 with and without `hl=en&gl=US`; a control request for another live Reign Creative app returns 200 in the same minute; the project's own release record says nothing was submitted.
- **Shipped content (core pack):** 28 units, 280 lessons, 1,423 syllabus bullets, 1,097 worked examples, 881 glossary terms, 18 market-history cases (160 dated measurements, 41 marked unavailable) plus 11 case studies, 35 tools (33 calculators + 2 screens), 190 Pattern Trainer exercises, 42 strategy playbooks, 103 simulator scenarios, 2,252 quiz questions and 111 cited sources.
- **Draft content is not shipped.** Nine further units (29-37) and the "shard" folders exist in the repo, but every generated wiring module exports an empty array, so none of it reaches the app. It is excluded from this plan.
- **Plan:** 47 proceed-when-unblocked candidates (1 app page, 1 category pair, 3 topic hubs, 38 articles, 1 glossary, 3 calculators) and 52 rejected ideas, each with its reason.
- **Website work before unblocking** (it does not lift the blocker): the website has no finance category or finance disclaimer type yet (section 12). Pages must state current rules from re-opened primary sources (section 14); for example, FINRA replaced the pattern-day-trader margin rules with intraday margin from 4 June 2026. Owner-only notes about the app itself are kept outside this public repository.

## 1. Status and blocker evidence

| Check | Method | Result | When (UTC) |
| --- | --- | --- | --- |
| Play listing, `hl=en&gl=US` | Signed-out `curl` with a desktop browser user agent | **404** | 2026-10-02 22:09:25 |
| Play listing, no locale parameters | Same | **404** | 2026-10-02 22:09:26 |
| Control: `com.reigncreative.history` (live app) | Same request shape | 200 | 2026-10-02 22:09:32 |
| Developer page "Reign Collective Apps" | Same; searched the HTML for the package and for "stock"/"trading" | 200; 20 `com.reigncreative.*` packages rendered, none is `stocktradingsim` (the page may paginate, so this is supporting evidence only) | 2026-10-02 22:09 |
| Project release record | `docs/RELEASE.md` section 6 | Production AAB (versionCode 6) finished 2026-09-24; "Nothing was submitted to Google Play and no iOS build was made." | file dated 2026-09-24 |
| Project identity | `docs/RELEASE.md` section 1 | Package `com.reigncreative.stocktradingsim`; Expo owner "Reign Creative Apps 2" | - |
| Website | Search of `src/`, `content/`, `docs/` | No catalog entry, page, link or keyword for the app | 2026-10-02 |

Conclusion: the app is not publicly available. Under the site rules (no pages for draft/testing/in-review/unverifiable apps; every article needs one verified live primary app) every finance page is blocked. Nothing found today changes that.

## 2. What ships: core pack vs draft shards

- `docs/RELEASE.md` says the content expansion is paused and its drafts under `src/content/trading/shards/*/` "are not part of this build".
- Verified in code: all 19 modules in `src/content/trading/shards/generated/` export empty arrays or objects and import types only (for example `SHARD_LESSONS = []`, `SHARD_GLOSSARY = []`). The catalogues merge those empty arrays, so shard content contributes nothing at runtime.
- `UNITS` (what the Academy lists) holds units 1-28. Units 29-37 exist only in `EXTENDED_UNITS`, which the builders can resolve but the screens never list.
- Static size of the unshipped drafts, for awareness only (counted with grep, not loaded): 165 shard source files, 73,847 lines, 78 `lesson({` calls, 788 glossary `term({` calls, 723 `extra(` worked examples, no question files.
- Caveat: the 2026-09-24 AAB predates the 2026-09-26 commit and contains changes (including a new icon) that were only committed then, so it was evidently built from the uncommitted working tree. File times show the empty shard wiring was already in place on 2026-09-23, which matches the release note, but the build that eventually goes live may differ. Re-run the extraction (section 19) against the exact released commit before any page relies on this inventory.
- Planning rule: the website may only describe content that is in the verified live build. Shard topics (funds in depth, banking, hedge funds/PE/VC, IPOs and dilution, futures and swaps, personal finance and tax, crypto, pre-1990 history, advanced TA) are rejected until they ship (FIN-R35).

## 3. Extraction method and counts

Counts were produced by loading the app's own content modules with the project's `tsx` and its `tsconfig.json` (so every module-load validator ran), then counting the exported arrays. Nothing was written into the project: a marker file was created in the scratchpad before each run, and afterwards `find "<project>" -newer <marker>` (including `node_modules`) returned nothing and `git status --short` was empty. The project's own `npm run content:audit` was **not** used because it writes `build/content-manifest.json`. The recount script is reproduced in section 19.

| Item | Count | How counted |
| --- | --- | --- |
| Units listed in the Academy | 28 | `UNITS.length` (curriculum/index.ts) |
| Units declared but hidden (29-37) | 9 | `EXTENDED_UNITS` not in `UNITS` |
| Topics | 280 | sum of `unit.topics` |
| Syllabus bullets | 1,423 | sum of `topic.bullets` |
| Lessons | 280 | `CORE_LESSONS.length`; `LESSONS` is identical because `SHARD_LESSONS` is empty |
| Academy index entries | 280 | `ACADEMY_ENTRIES.length` |
| Worked examples inside lessons | 1,097 | sum of `lesson.examples` |
| Lessons with a figure | 280 | `lesson.figure` present |
| Lessons carrying a jurisdiction | 72 | `lesson.jurisdiction` present |
| Difficulty bands (derived, not authored) | intro 50, core 150, advanced 80 | `AcademyEntry.difficulty` (academy-index.ts derives it from unit position) |
| Tracks | foundations 60, technical 70, fundamental 30, risk 30, derivatives 30, macro 60 | `AcademyEntry.track` |
| Cited sources | 111 | `SOURCES.length` (sources.ts) |
| Glossary terms | 881 | `GLOSSARY.length`; 733 carry a note |
| Market-history cases | 18 | `HISTORY_CASES.length` |
| History measurements | 160 (119 with a value, 41 unavailable) | `HISTORY_METRIC_COVERAGE` |
| Case studies | 11 | `CASE_STUDIES.length` |
| Tools in the catalogue | 35 | `TOOLS.length` |
| Calculators implemented | 33 | `ALL_CALCULATORS.length`; the other 2 (journal-stats, backtest-lab) open screens |
| Pattern Trainer exercises | 190 | `chartExercises().length`; 104 (54.7%) are failed or ambiguous setups |
| Strategy playbooks | 42 | `STRATEGIES.length` |
| Simulator scenarios | 103 | `SCENARIOS.length` |
| Quiz questions | 2,252 | `QUESTIONS.length` |
| Quiz blueprints | 343 | `QUIZ_BLUEPRINTS.length` |
| Study guides | 28 | `STUDY_GUIDES.length` |
| Flashcards | 615 | `FLASHCARDS.length` |
| Notation entries | 278 | `NOTATION.length` |
| Concept explainers | 28 | `EXPLAINERS.length` |
| Investor profiles | 18 | `INVESTORS.length` |
| Checklists | 23 | `BUILT_IN_CHECKLISTS.length` |
| Economic indicators / synthetic releases / transmission steps | 36 / 864 / 25 | economics.ts exports |
| Indicator guide entries | 14 | `INDICATOR_GUIDE.length` |
| Fictional instruments | 233 | `INSTRUMENTS.length` (equity 144, broad-fund 22, sector-fund 17, bond-fund 14, commodity-fund 11, international-fund 16, currency-proxy 5, volatility-proxy 4) |
| Rule-based opponents | 7 | `OPPONENTS.length` |
| Investing quotes shipped | 0 | `QUOTES` = `SHARD_QUOTES`, which is empty |

Cross-check: `README.md` agrees (28 units, 18 history cases, "200+" instruments). `docs/DELIVERY.md` section 3 still shows an earlier state (25 units, 250 lessons, 844 glossary terms, 93 sources) and should not be quoted.

## 4. Academy inventory: 28 units, 280 lessons

Difficulty is the app's derived navigation band (units 1-5 intro; units 11-13, 21-22 and 26-28 advanced; the rest core). The goal column is agent 5's own summary of each lesson's learning goals, written for planning; it is not app text and is not website copy. "Sources" lists the app's source ids (section 5 maps them). Every lesson is stamped `reviewedOn: 2026-09-06`.

| Unit | Title | Track | Band | Topics | Bullets |
| --- | --- | --- | --- | --- | --- |
| 1 | Market Foundations | Market Foundations | Intro | 10 | 50 |
| 2 | Instruments and Asset Classes | Market Foundations | Intro | 10 | 50 |
| 3 | Corporate Actions and Cash Returns | Market Foundations | Intro | 10 | 50 |
| 4 | Orders and Order Types | Market Foundations | Intro | 10 | 50 |
| 5 | Execution, Costs and Settlement | Market Foundations | Intro | 10 | 50 |
| 6 | Margin, Short Selling and Leverage | Market Foundations | Core | 10 | 50 |
| 7 | Reading Charts | Charts and Technical Analysis | Core | 10 | 50 |
| 8 | Trend, Structure and Levels | Charts and Technical Analysis | Core | 10 | 50 |
| 9 | Candlestick Patterns | Charts and Technical Analysis | Core | 10 | 52 |
| 10 | Chart Patterns | Charts and Technical Analysis | Core | 10 | 52 |
| 11 | Moving Averages and Trend Indicators | Charts and Technical Analysis | Advanced | 10 | 50 |
| 12 | Oscillators and Momentum | Charts and Technical Analysis | Advanced | 10 | 50 |
| 13 | Volatility and Volume Studies | Charts and Technical Analysis | Advanced | 10 | 51 |
| 14 | Financial Statements | Business and Valuation | Core | 10 | 50 |
| 15 | Valuation | Business and Valuation | Core | 10 | 50 |
| 16 | Business Quality, Sectors and Cycles | Business and Valuation | Core | 10 | 50 |
| 17 | Risk Management | Risk, Psychology and Portfolios | Core | 10 | 50 |
| 18 | Trading Psychology and Process | Risk, Psychology and Portfolios | Core | 10 | 50 |
| 19 | Portfolio Construction | Risk, Psychology and Portfolios | Core | 10 | 50 |
| 20 | Options Foundations | Options and Derivatives | Core | 10 | 50 |
| 21 | Options Pricing and Greeks | Options and Derivatives | Advanced | 10 | 50 |
| 22 | Options Strategies | Options and Derivatives | Advanced | 10 | 60 |
| 23 | Macroeconomics for Markets | Macro, Institutions and Evidence | Core | 10 | 53 |
| 24 | Institutions and Market Mechanics | Macro, Institutions and Evidence | Core | 10 | 54 |
| 25 | Strategy Evaluation and Evidence | Macro, Institutions and Evidence | Core | 10 | 51 |
| 26 | Reading the Macro Calendar | Macro, Institutions and Evidence | Advanced | 10 | 50 |
| 27 | Rates, Bonds and Currencies in Depth | Macro, Institutions and Evidence | Advanced | 10 | 50 |
| 28 | Market History, 1990 to Now | Macro, Institutions and Evidence | Advanced | 10 | 50 |

### Unit 1: Market Foundations

Track: Market Foundations. File: `src/content/trading/lessons/unit01.ts`.

| Lesson | Title | Band | Min | Jur. | Goals (agent's words) | Sources |
| --- | --- | --- | --- | --- | --- | --- |
| l-1-1 | What Markets Are For | Intro | 12 |  | Why markets exist for issuers and holders; primary vs secondary trades; a quote records a deal, not a value. | investor-gov-basics, investor-gov-markets |
| l-1-2 | Exchanges, Brokers and the Path of an Order | Intro | 15 | US | Follow an order from app to settlement; venues vs market makers; broker routing; best execution; T+1 dates. | sec-trade-execution, sec-market-structure, sec-settlement-cycle, nasdaq-market-structure |
| l-1-3 | The Order Book, Bid, Ask and Spread | Intro | 16 |  | Read a two-sided book; size the spread in cents and %; cost a round trip; how large orders eat depth. | sec-trade-execution, investor-gov-markets, nasdaq-market-structure |
| l-1-4 | Liquidity and Why It Changes | Intro | 14 |  | Treat liquidity as cost and delay; spot thin markets and when liquidity fades; impact vs daily volume. | sec-trade-execution, sec-market-structure, finra-market-volatility |
| l-1-5 | Shares, Ownership and Share Count | Intro | 13 |  | What a share does and does not give you; the different share counts; ownership % and dilution; find counts in filings. | investor-gov-glossary, sec-edgar, sec-financial-reporting |
| l-1-6 | Market Capitalisation and Enterprise Value | Intro | 12 |  | Compute market cap and enterprise value; why a low share price says nothing about size; effect of new shares. | investor-gov-glossary, sec-financial-reporting, sec-edgar |
| l-1-7 | Indices and What They Actually Measure | Intro | 15 |  | Price-, cap- and equal-weighted indices; an index as a maintained rule set; price vs total return. | investor-gov-markets, investor-gov-glossary, spiva |
| l-1-8 | Trading Sessions, Auctions and After Hours | Intro | 14 | US | Phases of the US trading day; what auctions do; extra risks outside regular hours; why closes are official marks. | nyse-hours, nasdaq-market-structure, sec-market-structure, finra-market-volatility |
| l-1-9 | Currencies, Cross-Listings and Time Zones | Intro | 15 |  | Split a foreign holding into local and currency return; dual listings; time-zone gaps; what hedging costs. | investor-gov-glossary, esma-investor, fca-investing, bis-triennial |
| l-1-10 | Investing, Trading and Speculation | Intro | 14 |  | Tell investing, trading and speculation apart; write a testable thesis with a time frame and exit condition. | investor-gov-basics, finra-investing, barber-odean-2000 |

### Unit 2: Instruments and Asset Classes

Track: Market Foundations. File: `src/content/trading/lessons/unit02.ts`.

| Lesson | Title | Band | Min | Jur. | Goals (agent's words) | Sources |
| --- | --- | --- | --- | --- | --- | --- |
| l-2-1 | Common Stock and Its Rights | Intro | 11 |  | Rights and claim order of common shareholders; dual-class voting cost; why non-dividend payers can still be worth owning. | investor-gov-basics, investor-gov-glossary, sec-edgar |
| l-2-2 | Preferred Shares and Hybrid Securities | Intro | 12 |  | How preferreds differ from common; cumulative vs non-cumulative; current yield; call features and convertibles. | investor-gov-products, investor-gov-glossary, finra-investing |
| l-2-3 | Exchange-Traded Funds | Intro | 14 |  | What an ETF holds; creation/redemption keeping price near NAV; expense-ratio cost; daily-reset leveraged funds; fact sheets. | sec-mutual-funds-etfs, investor-gov-products, investor-gov-fees |
| l-2-4 | Index Funds and Mutual Funds | Intro | 13 |  | Once-a-day NAV pricing; NAV arithmetic; index vs active cost over time; loads vs expense ratios vs transaction fees. | sec-mutual-funds-etfs, investor-gov-fees, sharpe-1991, spiva, bogle-cost-matters |
| l-2-5 | Bonds and Fixed Income Basics | Intro | 14 |  | Bond anatomy; coupon and current yield; why price and yield move oppositely; duration estimate; credit vs rate risk. | finra-bonds, investor-gov-products, investor-gov-glossary |
| l-2-6 | Bond Funds Versus Individual Bonds | Intro | 12 |  | Defined outcome of a held bond vs a bond fund; trade-offs; fund duration estimates; why fund yields drift. | finra-bonds, sec-mutual-funds-etfs, investor-gov-products |
| l-2-7 | Commodities and Commodity Exposure | Intro | 13 |  | Spot, futures and producer-equity routes to one view; contango/backwardation roll cost; why commodity funds lag spot. | cme-education, investor-gov-products, eia-petroleum |
| l-2-8 | Currencies as an Asset Class | Intro | 12 |  | Base/quote conventions; cross rates; FX profit and loss; where currency returns come from; leverage wiping out deposits. | bis-triennial, investor-gov-products, esma-investor, fca-investing |
| l-2-9 | Real Estate Exposure and Property Funds | Intro | 15 | US | Direct property vs listed REITs vs non-traded funds; US distribution rule; distribution yield; property-fund liquidity risk. | investor-gov-products, investor-gov-glossary, sec-edgar |
| l-2-10 | Closed-End Funds, Depositary Receipts and Wrappers | Intro | 13 |  | Closed-end fund discounts; ETF vs CEF vs ETN ownership; depositary receipts; counterparty risk in note wrappers. | sec-mutual-funds-etfs, investor-gov-products, investor-gov-fees, esma-investor |

### Unit 3: Corporate Actions and Cash Returns

Track: Market Foundations. File: `src/content/trading/lessons/unit03.ts`.

| Lesson | Title | Band | Min | Jur. | Goals (agent's words) | Sources |
| --- | --- | --- | --- | --- | --- | --- |
| l-3-1 | Dividends: Declaration to Payment | Intro | 13 |  | Order the dividend dates; which date decides entitlement; dividend yield and cash received; dividends are discretionary. | investor-gov-basics, investor-gov-glossary, sec-settlement-cycle |
| l-3-2 | Ex-Dividend Dates and Price Adjustment | Intro | 15 | US | Ex-date price adjustment and resting orders; why buying just before the ex-date is not free money; link to settlement. | investor-gov-basics, sec-settlement-cycle, investor-gov-glossary |
| l-3-3 | Dividend Sustainability and Payout Ratios | Intro | 15 |  | Payout vs earnings and vs free cash flow; warning signs; why an unusually high yield is often a red flag. | investor-gov-basics, sec-financial-reporting, sec-edgar, finra-investing |
| l-3-4 | Share Buybacks | Intro | 16 |  | Buyback effects on share count and EPS; how overpaying destroys value; authorisations vs actual repurchases. | investor-gov-basics, sec-financial-reporting, sec-edgar |
| l-3-5 | Stock Splits and Reverse Splits | Intro | 13 |  | Split and reverse-split arithmetic; why value and ownership are unchanged; restating pre-split prices; chart artefacts. | investor-gov-glossary, investor-gov-basics, sec-edgar |
| l-3-6 | Rights Issues and Secondary Offerings | Intro | 16 |  | What a rights issue offers; theoretical ex-rights price; dilutive issues vs secondary sales; value transfer at a discount. | investor-gov-products, investor-gov-glossary, esma-investor, fca-investing |
| l-3-7 | Spin-offs, Carve-outs and Special Dividends | Intro | 15 |  | Spin-offs, carve-outs and special dividends compared; splitting cost basis; post-spin selling; special-dividend ex-date effect. | investor-gov-products, sec-edgar, investor-gov-glossary, esma-investor |
| l-3-8 | Mergers and Acquisitions from a Shareholder Seat | Intro | 16 |  | Cash, stock and mixed offers; implied deal value; deal spread; why deals fail; acquirer vs target price reactions. | investor-gov-glossary, sec-edgar, investor-gov-basics |
| l-3-9 | Delisting, Bankruptcy and the Capital Stack | Intro | 15 | US | Capital-stack payment order; why common often recovers nothing; delisting vs suspension vs bankruptcy; checking status. | sec-trading-suspensions, sec-edgar, investor-gov-glossary, finra-investing |
| l-3-10 | How Corporate Actions Distort Charts and Backtests | Intro | 16 |  | Adjusted vs unadjusted price series; total vs price return; spotting artefacts; survivorship bias in backtests. | lopez-de-prado-backtesting, spiva, investor-gov-glossary, sec-edgar |

### Unit 4: Orders and Order Types

Track: Market Foundations. File: `src/content/trading/lessons/unit04.ts`.

| Lesson | Title | Band | Min | Jur. | Goals (agent's words) | Sources |
| --- | --- | --- | --- | --- | --- | --- |
| l-4-1 | Market Orders and What You Actually Get | Intro | 14 |  | A market order guarantees a fill, not a price; average fill across book levels; slippage vs the mid. | finra-order-types, sec-trade-execution, investor-gov-glossary |
| l-4-2 | Limit Orders | Intro | 15 |  | What a limit order guarantees and risks; placing buy and sell limits correctly; predicting fills; marketable limits. | finra-order-types, sec-trade-execution, investor-gov-glossary |
| l-4-3 | Stop Orders | Intro | 16 |  | Stops become market orders; trigger vs fill price; gap losses; why no stop protects against a gap. | finra-order-types, sec-trade-execution, finra-market-volatility, sec-2010-flash-crash |
| l-4-4 | Stop-Limit Orders | Intro | 15 |  | The two prices of a stop-limit; fast moves that skip the limit; choosing an offset; the triggered-but-unfilled risk. | finra-order-types, sec-trade-execution, finra-market-volatility |
| l-4-5 | Trailing Stops | Intro | 15 |  | How a trailing trigger ratchets; percent vs fixed trails; the fill is still a market fill; trail width vs daily range. | finra-order-types, investor-gov-glossary, finra-market-volatility |
| l-4-6 | Time in Force | Intro | 13 |  | Day, GTC, IOC and FOK; what happens at the close; forgotten GTC orders; cancellations from corporate actions. | finra-order-types, sec-trade-execution, investor-gov-glossary |
| l-4-7 | Bracket, OCO and Conditional Orders | Intro | 15 |  | Bracket legs and when they go live; one-cancels-other links; reward-to-risk of a bracket; partial-fill mismatches. | finra-order-types, investor-gov-glossary, sec-trade-execution |
| l-4-8 | Partial Fills and Working Orders | Intro | 14 |  | Risk left by a partly filled order; average price across fills; commissions on fragments; revealing intent. | sec-trade-execution, finra-order-types, investor-gov-fees |
| l-4-9 | Choosing an Order Type for the Situation | Intro | 15 |  | Pick an order type from spread, urgency, size and volatility; open, close and news-time choices; the cost each accepts. | sec-trade-execution, finra-order-types, sec-market-structure, nyse-hours |
| l-4-10 | Order Mistakes That Cost Real Money | Intro | 14 |  | Catch side, size and symbol errors; dangers of market orders pre-market or in thin names; a pre-submit checklist. | finra-order-types, sec-trade-execution, finra-market-volatility, investor-gov-basics |

### Unit 5: Execution, Costs and Settlement

Track: Market Foundations. File: `src/content/trading/lessons/unit05.ts`.

| Lesson | Title | Band | Min | Jur. | Goals (agent's words) | Sources |
| --- | --- | --- | --- | --- | --- | --- |
| l-5-1 | The True Cost of a Round Trip | Intro | 14 | US | The parts of round-trip cost; cost per share and in %; the break-even move; one big trade vs several small ones. | sec-trade-execution, investor-gov-fees, bogle-cost-matters |
| l-5-2 | Spread Cost and Effective Spread | Intro | 16 |  | Spread in cents and %; half vs full spread cost; effective spread; walking depth to an average fill. | sec-trade-execution, sec-market-structure, investor-gov-markets |
| l-5-3 | Slippage and Market Impact | Intro | 16 |  | Signed slippage vs arrival price; per-share and total slippage; temporary vs permanent impact; size vs volume. | sec-trade-execution, sec-hft-concept, sec-market-structure |
| l-5-4 | Gaps and Overnight Risk | Intro | 16 | US | Why a stop does not cap loss in a gap; planned vs realised loss; scheduled gap events; sizing for gaps. | finra-order-types, sec-trade-execution, finra-market-volatility |
| l-5-5 | Commissions, Fees and Their Arithmetic | Intro | 14 | US | Per-trade vs per-share vs regulatory fees; fee load in basis points; flat vs per-share schedules; zero commission is not zero cost. | investor-gov-fees, sec-trade-execution, bogle-cost-matters |
| l-5-6 | Order Routing and Best Execution | Intro | 16 | US | Order path to a venue; exchange vs market maker vs ATS; what best execution does and does not promise; order-flow payments. | sec-trade-execution, sec-market-structure, sec-hft-concept, finra-order-types |
| l-5-7 | Settlement and What Settled Cash Means | Intro | 12 | US | US settlement cycle; cash vs shares between trade and settlement; settled cash; free-riding; dividend cut-off. | sec-settlement-cycle, investor-gov-basics, finra-investing |
| l-5-8 | Halts, Circuit Breakers and Limit Bands | Intro | 15 | US | Single-stock halts vs limit-up/limit-down pauses vs market-wide breakers; resting orders through halts; reopen conditions. | sec-trading-suspensions, finra-market-volatility, sec-market-structure, sec-2010-flash-crash |
| l-5-9 | Opening and Closing Auctions | Intro | 14 | US | How auctions find one crossing price; computing it from cumulative interest; market-on-close risk; auction vs last print. | nyse-hours, nasdaq-market-structure, sec-market-structure, finra-order-types |
| l-5-10 | Measuring Your Own Execution Quality | Intro | 16 |  | Log arrival, fill and time; slippage in cents and bps; aggregate your costs; implementation shortfall; change one habit. | sec-trade-execution, investor-gov-fees, finra-order-types |

### Unit 6: Margin, Short Selling and Leverage

Track: Market Foundations. File: `src/content/trading/lessons/unit06.ts`.

| Lesson | Title | Band | Min | Jur. | Goals (agent's words) | Sources |
| --- | --- | --- | --- | --- | --- | --- |
| l-6-1 | Cash Accounts Versus Margin Accounts | Core | 13 | US | What cash and margin accounts allow; margin as collateralised borrowing; borrowing costs; avoiding good-faith violations. | finra-margin, sec-settlement-cycle, investor-gov-basics |
| l-6-2 | Initial and Maintenance Margin | Core | 16 | US | Equity, loan and equity %; sizing from initial margin; maintenance tests; the margin-call price; house vs regulatory minimums. | finra-margin, investor-gov-basics |
| l-6-3 | Margin Calls and Forced Liquidation | Core | 16 | US | Cash needed to meet a call vs stock that must be sold; why selling takes more; broker powers; losing more than deposited. | finra-margin, finra-order-types, investor-gov-basics |
| l-6-4 | The Arithmetic of Leverage | Core | 15 |  | Leverage ratio; the 1/L move that wipes out equity; leveraged returns both ways; why the loan does not shrink. | finra-margin, investor-gov-basics |
| l-6-5 | Short Selling Mechanics | Core | 16 | US | Borrow, sell, buy back, return; short P&L; proceeds as collateral; unbounded loss vs capped gain; dividends owed. | sec-reg-sho, finra-margin, investor-gov-basics |
| l-6-6 | Stock Borrow, Locates and Borrow Fees | Core | 15 | US | Locates; daily and cumulative borrow fees; hard-to-borrow pricing; fail-to-deliver close-outs (a jurisdictional rule). | sec-reg-sho, finra-margin, sec-market-structure |
| l-6-7 | Buy-ins, Recalls and Short Squeezes | Core | 16 | US | Recalls and buy-ins; how forced covering pushes prices; squeeze conditions without forecasting; sizing to survive a recall. | sec-reg-sho, finra-margin, finra-market-volatility |
| l-6-8 | Financing Costs and Carry | Core | 15 |  | Daily margin interest; carry on leveraged longs and shorts; break-even move to cover financing; why slow theses suffer. | finra-margin, investor-gov-fees, fed-h15 |
| l-6-9 | Leveraged and Inverse Funds | Core | 16 |  | Daily reset mechanics; multi-day compounding vs the naive multiple; volatility drag; intended holding periods. | sec-mutual-funds-etfs, investor-gov-products, finra-investing |
| l-6-10 | When Leverage Destroys an Account | Core | 17 | US | How leverage turns a right long-run view into a total loss; liquidation drawdown; survivable sizing; US day-trading margin. | finra-margin, finra-day-trading, investor-gov-basics |

### Unit 7: Reading Charts

Track: Charts and Technical Analysis. File: `src/content/trading/lessons/unit07.ts`.

| Lesson | Title | Band | Min | Jur. | Goals (agent's words) | Sources |
| --- | --- | --- | --- | --- | --- | --- |
| l-7-1 | OHLC and What One Bar Records | Core | 13 |  | Read open, high, low, close; a bar never shows whether the high or low came first; bar range; two paths, one bar. | investor-gov-markets, investor-gov-glossary |
| l-7-2 | Candlestick Anatomy: Bodies and Wicks | Core | 15 |  | Measure bodies and wicks in dollars; what a wick records and does not predict; every shape has failure cases. | park-irwin-2007, investor-gov-markets |
| l-7-3 | Timeframes and What They Hide | Core | 18 |  | Aggregate daily into weekly bars; what aggregation destroys; choose a timeframe from the holding period. | investor-gov-markets, nyse-hours |
| l-7-4 | Volume and How to Read It | Core | 17 |  | What volume counts; compare a bar to its own average; participation without direction; session and calendar effects. | sec-market-structure, nasdaq-market-structure, park-irwin-2007 |
| l-7-5 | Linear Versus Logarithmic Scales | Core | 17 |  | What equal distances mean on linear and log scales; % vs dollar moves; scale choice for long series; scale-made impressions. | investor-gov-compound, investor-gov-markets |
| l-7-6 | Gaps on a Chart | Core | 18 |  | Measure gaps in dollars and %; their causes; "gaps get filled" is not a law; gaps and resting stops. | finra-order-types, sec-trade-execution, nyse-hours |
| l-7-7 | Line, Bar, Candle and Smoothed Charts | Core | 17 |  | What line, bar, candle and smoothed charts keep and drop; smoothing lag; choose the chart by the question. | investor-gov-markets, park-irwin-2007 |
| l-7-8 | Session Structure Within a Day | Core | 17 | US (NYSE/Nasdaq) | Intraday volume pattern in US sessions; auction effects on prints; first and last bars; conventions that vary by market. | nyse-hours, nasdaq-market-structure, sec-market-structure |
| l-7-9 | Chart Hygiene: Adjustments, Splits and Survivorship | Core | 19 |  | Adjusted vs unadjusted prices; split artefacts; dividend-adjusted history vs old filings; survivorship checks. | sec-edgar, sec-financial-reporting, lopez-de-prado-backtesting, spiva |
| l-7-10 | Multi-Timeframe Analysis | Core | 18 |  | Separate context and timing timeframes; agreement and conflict; avoid timeframe-shopping; pre-decide conflict handling. | investor-gov-markets, park-irwin-2007 |

### Unit 8: Trend, Structure and Levels

Track: Charts and Technical Analysis. File: `src/content/trading/lessons/unit08.ts`.

| Lesson | Title | Band | Min | Jur. | Goals (agent's words) | Sources |
| --- | --- | --- | --- | --- | --- | --- |
| l-8-1 | What Trend Means Operationally | Core | 15 |  | A trend definition two people would apply identically; comparing rules; the bar on which a signal became knowable. | park-irwin-2007, investor-gov-markets |
| l-8-2 | Higher Highs, Higher Lows and Market Structure | Core | 16 |  | Mark confirmed swings; classify market structure; write the break level first; formation vs confirmation bar. | park-irwin-2007, investor-gov-markets |
| l-8-3 | Ranges and Consolidation | Core | 14 |  | Define ranges by boundaries and duration; range height; why mechanical trend rules mislabel ranges. | park-irwin-2007, investor-gov-markets |
| l-8-4 | Support and Resistance | Core | 18 |  | Build support/resistance zones from several swings; what a level describes vs promises; zone width; failed zones. | park-irwin-2007, investor-gov-markets |
| l-8-5 | Round Numbers, Prior Highs and Anchors | Core | 17 |  | Reference prices people watch; anchoring as an attention effect; how the anchoring bias distorts plans. | kahneman-tversky-1979, sec-market-structure, nasdaq-market-structure |
| l-8-6 | Breakouts | Core | 19 |  | Pre-define a breakout; measured-move references; volume comparisons; one rule on wins and failures; invalidation first. | park-irwin-2007, lopez-de-prado-backtesting, investor-gov-markets |
| l-8-7 | Retests and Failed Breakouts | Core | 18 |  | Judge retests; spot failed breakouts and when they became visible; trapped entries; cost of a failed breakout. | sec-market-structure, sec-trade-execution, park-irwin-2007 |
| l-8-8 | Trendlines and Channels | Core | 18 |  | Draw lines from named swings; sensitivity to anchors; channels; why a broken line does not prove a trend ended. | park-irwin-2007, lopez-de-prado-backtesting |
| l-8-9 | Pullbacks Versus Reversals | Core | 18 |  | A pre-stated rule separating pullbacks from reversals; retracement %; false signals and their cost; hindsight limits. | park-irwin-2007, investor-gov-markets |
| l-8-10 | Choosing Where You Would Be Wrong | Core | 20 |  | Choose an invalidation price from structure; ATR buffers; risk per share and size; reward-to-risk; gaps through stops. | finra-order-types, sec-trade-execution, investor-gov-basics |

### Unit 9: Candlestick Patterns

Track: Charts and Technical Analysis. File: `src/content/trading/lessons/unit09.ts`.

| Lesson | Title | Band | Min | Jur. | Goals (agent's words) | Sources |
| --- | --- | --- | --- | --- | --- | --- |
| l-9-1 | What a Candle Pattern Can and Cannot Tell You | Core | 13 |  | A candle pattern describes one session, not the next; set invalidation first; why published tests disagree. | park-irwin-2007, lo-2004-amh, investor-gov-basics |
| l-9-2 | Doji and Indecision | Core | 12 |  | Body-to-range test for a doji; its variants; two readings and the context that picks one; resolving prices. | park-irwin-2007, investor-gov-basics |
| l-9-3 | Hammer and Hanging Man | Core | 14 |  | Test hammer geometry against a definition; one shape, two names; both readings; ATR context; a failure case. | park-irwin-2007, lo-2004-amh |
| l-9-4 | Shooting Star and Inverted Hammer | Core | 14 |  | Upper-shadow ratios; what a long upper shadow records; both readings and invalidation; cost of waiting to confirm. | park-irwin-2007 |
| l-9-5 | Engulfing Patterns | Core | 14 |  | Body-based engulfing test; what the pair records; both versions; how a wide bar changes position size. | park-irwin-2007, lo-2004-amh |
| l-9-6 | Harami and Inside Bars | Core | 13 |  | Harami vs inside bar; range contraction; continuation vs reversal readings; outer-bar levels that resolve it. | park-irwin-2007 |
| l-9-7 | Morning Star and Evening Star | Core | 14 |  | Check three-bar star conditions in order; the middle bar; close-depth rule; invalidation; rarity hampers testing. | park-irwin-2007, lopez-de-prado-backtesting |
| l-9-8 | Marubozu, Long Wicks and Rejection | Core | 13 |  | Shadowless bars; wick length vs range and ATR; continuation vs exhaustion; using the open as a reference. | park-irwin-2007 |
| l-9-9 | Outside Bars and Reversal Bars | Core | 13 |  | Outside-bar test; why the close matters most; both readings and implied stop distance; weaker inside ranges. | park-irwin-2007 |
| l-9-10 | Failed Candle Patterns and Ambiguous Cases | Core | 15 |  | Patterns that do not follow through; when to leave a setup alone; selection and hindsight bias; costs a pattern must beat. | park-irwin-2007, lo-2004-amh, lopez-de-prado-backtesting, barber-odean-2000 |

### Unit 10: Chart Patterns

Track: Charts and Technical Analysis. File: `src/content/trading/lessons/unit10.ts`.

| Lesson | Title | Band | Min | Jur. | Goals (agent's words) | Sources |
| --- | --- | --- | --- | --- | --- | --- |
| l-10-1 | Double Tops and Double Bottoms | Core | 15 |  | Locate twin extremes and the reaction level; confirmation, invalidation, objective; late naming; failed necklines. | park-irwin-2007, lo-2004-amh |
| l-10-2 | Head and Shoulders | Core | 16 |  | Label shoulders, head and neckline from confirmed swings; objective projection; invalidation; failures. | park-irwin-2007, lopez-de-prado-backtesting |
| l-10-3 | Inverse Head and Shoulders | Core | 15 |  | The mirrored structure; failed lower lows; limits of the objective; invalidation and volume claims; hindsight. | park-irwin-2007, lo-2004-amh |
| l-10-4 | Ascending, Descending and Symmetrical Triangles | Core | 15 |  | Which triangle boundary is flat; narrowing ranges; both readings; objective from the widest part; the low-information apex. | park-irwin-2007, lo-2004-amh |
| l-10-5 | Flags and Pennants | Core | 14 |  | Measure pole and consolidation; shallow drift; continuation vs failure depth; pole-based objective; noise in thin markets. | park-irwin-2007, barber-odean-2000 |
| l-10-6 | Rising and Falling Wedges | Core | 14 |  | Converging same-direction boundaries; shrinking progress; both readings; the invalidating bar; subjectivity of wedges. | park-irwin-2007, lopez-de-prado-backtesting |
| l-10-7 | Rectangles and Trading Ranges | Core | 14 |  | Two horizontal boundaries and touches; rotation; breakout vs fade conditions; height objective; failed-breakout cost. | park-irwin-2007, barber-odean-2000 |
| l-10-8 | Rounded Bases and Handle Formations | Core | 14 |  | Gradual slope change; slow transfer between sellers and buyers; qualifying handles; separate invalidations; hindsight. | park-irwin-2007, lopez-de-prado-backtesting |
| l-10-9 | Measuring Objectives and Their Limits | Core | 15 |  | Objectives are arithmetic projections with no probability; ATR plausibility check; costs shrink what you keep. | park-irwin-2007, bogle-cost-matters, barber-odean-2000 |
| l-10-10 | Pattern Failure and Evidence Quality | Core | 16 |  | Each pattern's failure mode; drawing choices inflate success; what surveys show; period and cost sensitivity; out-of-sample tests. | park-irwin-2007, lo-2004-amh, lopez-de-prado-backtesting, barber-odean-2000 |

### Unit 11: Moving Averages and Trend Indicators

Track: Charts and Technical Analysis. File: `src/content/trading/lessons/unit11.ts`.

| Lesson | Title | Band | Min | Jur. | Goals (agent's words) | Sources |
| --- | --- | --- | --- | --- | --- | --- |
| l-11-1 | Simple Moving Averages | Advanced | 11 |  | Compute an SMA by hand; warm-up nulls; what it estimates and discards; both readings; window-exit effects. | park-irwin-2007, lo-2004-amh, investor-gov-basics |
| l-11-2 | Exponential and Weighted Moving Averages | Advanced | 12 |  | EMA smoothing factor and update; seeding; SMA/EMA/WMA responses compared; when speed helps; why packages differ. | park-irwin-2007, lo-2004-amh |
| l-11-3 | Choosing a Lookback Length | Advanced | 14 |  | Lookback trade-offs in numbers; lag vs turns; match the holding period; the best in-sample lookback is over-fitted. | park-irwin-2007, lopez-de-prado-backtesting, lo-2004-amh |
| l-11-4 | Moving Average Crossovers | Advanced | 13 |  | When a crossover becomes knowable; warm-up; both readings; invalidation; costing whipsaws in sideways markets. | park-irwin-2007, lo-2004-amh, investor-gov-fees |
| l-11-5 | MACD Construction | Advanced | 14 |  | Build MACD from EMAs; sign checks; different warm-ups; histogram meaning; a trend tool in price units. | park-irwin-2007, lo-2004-amh |
| l-11-6 | Reading MACD Without Overreading It | Advanced | 13 |  | Zero-line, signal and histogram events; contexts that change them; lagging divergence; little beyond its averages. | park-irwin-2007, lo-2004-amh |
| l-11-7 | ADX and Trend Strength | Advanced | 19 |  | The +DI/-DI/DX/ADX chain; long warm-up; strength without direction; familiar thresholds are conventions. | park-irwin-2007, investor-gov-markets |
| l-11-8 | Envelopes, Ribbons and Multi-Average Displays | Advanced | 18 |  | Percentage envelopes; what ribbons add or repeat; expansion vs compression; one measurement drawn many times. | park-irwin-2007, investor-gov-markets |
| l-11-9 | Lag, Whipsaw and Cost | Advanced | 20 |  | Lag of about half the lookback; costing whipsaws; gross vs net results; cost levels that erase an edge. | park-irwin-2007, lopez-de-prado-backtesting, sec-trade-execution |
| l-11-10 | Combining Trend Tools Without Double Counting | Advanced | 19 |  | Indicators sharing an input; one observation counted three times; mixing independent evidence; one invalidation level. | park-irwin-2007, lopez-de-prado-backtesting |

### Unit 12: Oscillators and Momentum

Track: Charts and Technical Analysis. File: `src/content/trading/lessons/unit12.ts`.

| Lesson | Title | Band | Min | Jur. | Goals (agent's words) | Sources |
| --- | --- | --- | --- | --- | --- | --- |
| l-12-1 | What an Oscillator Measures | Advanced | 11 |  | What an oscillator measures and omits; what bounding does to information; range vs trend readings; warm-up. | park-irwin-2007, lo-2004-amh, investor-gov-basics |
| l-12-2 | RSI Construction | Advanced | 13 |  | Wilder smoothing of gains and losses; RS to RSI; first valid bar; the zero-loss convention; package differences. | park-irwin-2007, investor-gov-basics |
| l-12-3 | Reading RSI in Trends and Ranges | Advanced | 12 |  | RSI behaviour in trends vs ranges; both readings of a high value; invalidation; losing by fading a trend. | park-irwin-2007, lo-2004-amh |
| l-12-4 | Stochastic Oscillator | Advanced | 12 |  | Stochastic %K as position in range; fast vs slow; %K/%D crosses; saturation in strong trends. | park-irwin-2007, investor-gov-basics |
| l-12-5 | Rate of Change and Momentum | Advanced | 11 |  | ROC vs momentum scales; base effects; turns caused by the bar leaving the window; invalidation. | park-irwin-2007, investor-gov-basics |
| l-12-6 | Commodity Channel Index | Advanced | 12 |  | Typical price and mean deviation; the 0.015 constant; why CCI is unbounded; thresholds as conventions. | park-irwin-2007, investor-gov-basics |
| l-12-7 | Divergence: The Honest Version | Advanced | 14 |  | Regular vs hidden divergence; when it can be confirmed; divergences that persist; eyeballing inflates reliability. | park-irwin-2007, lo-2004-amh, lopez-de-prado-backtesting |
| l-12-8 | Relative Strength Between Instruments | Advanced | 18 |  | Ratio lines rebased to 100; relative strength vs RSI; a rising ratio while losing money; invalidation. | jegadeesh-titman-1993, park-irwin-2007, spiva |
| l-12-9 | Overbought and Oversold as Myths | Advanced | 13 |  | Overbought/oversold thresholds describe recent change, not instructions; persistent extremes; mixed evidence after costs. | park-irwin-2007, lo-2004-amh, barber-odean-2000 |
| l-12-10 | Confirmation, Confluence and Double Counting | Advanced | 14 |  | RSI, stochastic and CCI share inputs; correlated "confirmations"; piling on indicators is over-fitting. | park-irwin-2007, lopez-de-prado-backtesting, lo-2004-amh |

### Unit 13: Volatility and Volume Studies

Track: Charts and Technical Analysis. File: `src/content/trading/lessons/unit13.ts`.

| Lesson | Title | Band | Min | Jur. | Goals (agent's words) | Sources |
| --- | --- | --- | --- | --- | --- | --- |
| l-13-1 | Measuring Volatility: Standard Deviation and ATR | Advanced | 14 |  | Rolling standard deviation and its units; true range; ATR warm-up; ATR as % of price for comparisons. | park-irwin-2007, investor-gov-basics |
| l-13-2 | Bollinger Bands | Advanced | 15 |  | Band construction; bandwidth and %B; mean-reversion vs trend readings; no fixed containment guarantee. | park-irwin-2007, lo-2004-amh |
| l-13-3 | Keltner Channels and Band Comparisons | Advanced | 15 |  | Keltner channels from EMA and ATR; vs Bollinger around a shock; the squeeze; mixed warm-ups. | park-irwin-2007, lo-2004-amh |
| l-13-4 | Volatility Regimes and Clustering | Advanced | 14 |  | Volatility clustering; quiet markets say little about direction; ATR expansion and contraction; modest forecasting edge. | park-irwin-2007, lo-2004-amh, cboe-vix |
| l-13-5 | On-Balance Volume and Accumulation | Advanced | 14 |  | OBV step by step; meaningless absolute level; whole-bar assumption; confirmation vs divergence; failures. | park-irwin-2007, lo-2004-amh |
| l-13-6 | VWAP and Anchored VWAP | Advanced | 15 |  | VWAP computation; session resets and anchors; readings for different participants; anchor-shopping risk. | sec-trade-execution, park-irwin-2007 |
| l-13-7 | Volume Profile and Value Areas | Advanced | 15 |  | Build a volume profile; point of control; value area; OHLCV approximation; bucket and window sensitivity. | park-irwin-2007, sec-market-structure |
| l-13-8 | Volume Spikes, Climaxes and Dry-Ups | Advanced | 14 |  | Volume as a multiple of average; spikes with and without range; exhaustion vs initiation; unreliable cross-comparisons. | park-irwin-2007, sec-market-structure, lo-2004-amh |
| l-13-9 | Using ATR for Stops and Sizing | Advanced | 16 |  | ATR-multiple stops; size from a risk budget; wider stop means fewer shares; when ATR doubles; gaps through stops. | finra-order-types, investor-gov-basics, park-irwin-2007 |
| l-13-10 | Volatility Targeting and Its Trade-offs | Advanced | 16 |  | Scale exposure to a volatility target; the scaling factor; no directional forecast; rebalancing costs; reversal risk. | park-irwin-2007, lo-2004-amh, sharpe-1994 |

### Unit 14: Financial Statements

Track: Business and Valuation. File: `src/content/trading/lessons/unit14.ts`.

| Lesson | Title | Band | Min | Jur. | Goals (agent's words) | Sources |
| --- | --- | --- | --- | --- | --- | --- |
| l-14-1 | The Three Statements and How They Link | Core | 14 | US | What each statement measures; net income into retained earnings and cash flow; reconciliation; profitable but cash-poor. | sec-financial-reporting, sec-edgar, investor-gov-basics |
| l-14-2 | Revenue Recognition and Quality | Core | 14 | US | Revenue recognition vs cash; deferred revenue vs unbilled receivables; days sales outstanding; revenue vs cash growth. | sec-financial-reporting, sec-edgar |
| l-14-3 | Cost Structure, Gross and Operating Margins | Core | 13 |  | Fixed vs variable costs; contribution, gross, operating and net margins; operating leverage; sector comparability. | sec-financial-reporting, investor-gov-basics |
| l-14-4 | The Balance Sheet: Assets and Claims | Core | 14 | US | Resources vs claims; current vs non-current; current and quick ratios, net debt; book equity as a historical residual. | sec-financial-reporting, sec-edgar, investor-gov-basics |
| l-14-5 | Working Capital and the Cash Conversion Cycle | Core | 15 |  | Working capital; DSO, DIO, DPO and the cash conversion cycle; cash absorbed by growth; negative cycles. | sec-financial-reporting, investor-gov-basics |
| l-14-6 | The Cash Flow Statement | Core | 15 | US | Three cash-flow sections; indirect method; depreciation add-back; reconciliation to cash; net income vs operating cash. | sec-financial-reporting, sec-edgar |
| l-14-7 | Free Cash Flow and Its Definitions | Core | 14 |  | Levered vs unlevered free cash flow; reconciling them; matching definition to valuation method; stock-comp add-backs. | sec-financial-reporting, graham-analysis |
| l-14-8 | Debt, Leases and Off-Balance-Sheet Claims | Core | 15 | US | Gross vs net debt; coverage and leverage vs covenants; where leases sit; notes and contingencies; maturity walls. | sec-financial-reporting, sec-edgar, finra-bonds |
| l-14-9 | Share Count, Dilution and Stock Compensation | Core | 14 | US | Basic vs diluted EPS; how stock compensation is expensed; net buybacks vs issuance; offsetting dilution. | sec-financial-reporting, sec-edgar |
| l-14-10 | Adjusted Figures and Red Flags | Core | 16 | US | Reconcile adjusted to reported earnings; recurring "one-offs"; earnings vs operating cash; receivables/inventory warnings. | sec-financial-reporting, sec-edgar, graham-analysis |

### Unit 15: Valuation

Track: Business and Valuation. File: `src/content/trading/lessons/unit15.ts`.

| Lesson | Title | Band | Min | Jur. | Goals (agent's words) | Sources |
| --- | --- | --- | --- | --- | --- | --- |
| l-15-1 | What Valuation Is Trying to Answer | Core | 19 |  | Price vs value; three families of method; valuation as a forecast; margin of safety; no timing signal. | graham-analysis, investor-gov-basics, sec-financial-reporting |
| l-15-2 | Earnings Multiples | Core | 19 |  | P/E and earnings yield; trailing vs forward; PEG limits; choosing a comparable set. | sec-financial-reporting, graham-analysis, investor-gov-products |
| l-15-3 | Enterprise Value Multiples | Core | 20 |  | Build EV; EV/EBITDA, EV/EBIT, EV/Sales; capital-structure neutrality; EBITDA flattering capital-heavy firms. | sec-financial-reporting, sec-edgar, graham-analysis |
| l-15-4 | Price to Book, Price to Sales and When They Help | Core | 19 |  | Price-to-book and price-to-sales; when book value means something; justified P/B; tangible book. | sec-financial-reporting, graham-analysis, finra-investing |
| l-15-5 | Dividend Discount and Yield-Based Valuation | Core | 19 |  | Constant-growth dividend model and its validity; payout and sustainable growth; sensitivity; high-yield warnings. | investor-gov-products, sec-financial-reporting, bogle-vanguard |
| l-15-6 | Discounted Cash Flow: Structure | Core | 22 |  | DCF steps; discounting unlevered FCF; terminal value; EV to equity per share; terminal share of value. | sec-financial-reporting, graham-analysis, sec-edgar |
| l-15-7 | Discount Rates and Terminal Value | Core | 21 |  | WACC components; uncertain cost of equity; perpetuity terminal value; exit-multiple cross-check; growth ceiling. | fed-h15, treasury-yield-curve, sharpe-1994, fama-french-1993 |
| l-15-8 | Sensitivity and Scenario Analysis | Core | 20 |  | Two-way sensitivity grids; range width; grids vs discrete scenarios; probability weighting; why the spread matters. | lopez-de-prado-backtesting, sec-financial-reporting, marks-memos |
| l-15-9 | Return on Invested Capital and Reinvestment | Core | 21 |  | NOPAT and invested capital; ROIC vs cost of capital; economic profit; value-destroying growth; reinvestment rate. | sec-financial-reporting, berkshire-letters, graham-analysis |
| l-15-10 | Why Valuation Ranges Beat Point Estimates | Core | 21 |  | Present values as ranges with assumptions; reverse DCF; point estimates as anchors; margin of safety vs the low end. | marks-memos, graham-analysis, berkshire-letters, sec-financial-reporting |

### Unit 16: Business Quality, Sectors and Cycles

Track: Business and Valuation. File: `src/content/trading/lessons/unit16.ts`.

| Lesson | Title | Band | Min | Jur. | Goals (agent's words) | Sources |
| --- | --- | --- | --- | --- | --- | --- |
| l-16-1 | Competitive Advantage and Durability | Core | 20 |  | Sources of competitive advantage and tests for each; evidence in the statements; strength vs durability; fading returns. | berkshire-letters, graham-analysis, sec-financial-reporting |
| l-16-2 | Unit Economics and Operating Leverage | Core | 20 |  | Contribution per unit or customer; lifetime value with stated assumptions; LTV/CAC and payback; churn sensitivity. | sec-financial-reporting, sec-edgar |
| l-16-3 | Capital Allocation and Management Incentives | Core | 20 |  | Uses of cash; whether a buyback created value; goodwill impairments; pay incentives; returning vs offsetting dilution. | berkshire-letters, sec-financial-reporting, sec-edgar |
| l-16-4 | Governance, Ownership and Related Parties | Core | 19 | US (SEC issuers) | Dual-class economics vs votes; board independence; insider ownership; related parties; auditor and restatement signals. | sec-edgar, sec-financial-reporting, investor-gov-basics |
| l-16-5 | Sector Characteristics: Technology and Communication | Core | 20 |  | Software financial shape; deferred revenue and retention; stock comp as % of revenue; P/E limits; sector risks. | sec-financial-reporting, sec-edgar, investor-gov-products |
| l-16-6 | Sector Characteristics: Financials and Real Estate | Core | 20 |  | Bank NIM, ROA and ROE; insurer combined ratio; property FFO and AFFO; multiples that work in the sector. | sec-financial-reporting, finra-bonds, fed-fsr, sec-mutual-funds-etfs |
| l-16-7 | Sector Characteristics: Energy, Materials and Industrials | Core | 20 |  | Price-taker economics; cash margins at two commodity prices; cost curves; maintenance vs growth capex; backlog. | eia-petroleum, sec-financial-reporting, ism-pmi |
| l-16-8 | Sector Characteristics: Defensives and Discretionary | Core | 19 |  | Defensive vs discretionary revenue; recession effects; utilities as bond-like; operating leverage; fragile balance sheets. | nber-cycles, bea-gdp, sec-financial-reporting |
| l-16-9 | Cyclicality and Where You Are in the Cycle | Core | 20 |  | Cycle phases; normalised earnings; the low-P/E-at-peak trap; indicator false signals; hindsight in cycle calls. | nber-cycles, bea-gdp, ism-pmi, treasury-yield-curve |
| l-16-10 | Building a Repeatable Evaluation Framework | Core | 21 |  | A checklist applied identically; where evidence sits in filings; pre-committed disconfirmers; reviewing against outcomes. | sec-edgar, sec-financial-reporting, graham-analysis, marks-memos, berkshire-letters |

### Unit 17: Risk Management

Track: Risk, Psychology and Portfolios. File: `src/content/trading/lessons/unit17.ts`.

| Lesson | Title | Band | Min | Jur. | Goals (agent's words) | Sources |
| --- | --- | --- | --- | --- | --- | --- |
| l-17-1 | Defining Risk Before Defining Reward | Core | 20 |  | Risk as permanent loss, not volatility; what a plan must hold; planned loss in $ and %; exits fixed before entry. | investor-gov-basics, finra-investing, finra-order-types |
| l-17-2 | Risk Per Trade and the R Unit | Core | 19 |  | Define R; convert results to R multiples; R from account size; why small risk per trade is safer. | investor-gov-basics, finra-investing |
| l-17-3 | Position Sizing from a Stop | Core | 22 |  | Size from account, risk %, entry and stop; adjust for costs; concentration caps; tight-stop effects; resizing. | investor-gov-basics, finra-order-types, finra-margin |
| l-17-4 | Portfolio Heat and Correlated Exposure | Core | 21 |  | Total open risk; correlated positions behave as one; combined risk at different correlations; sector caps. | markowitz-1952, investor-gov-diversify, fed-fsr |
| l-17-5 | Drawdown and Recovery Mathematics | Core | 20 |  | Gain needed to recover a drawdown; the recovery table; years at an assumed rate; losing-streak drawdowns. | investor-gov-compound, finra-market-volatility |
| l-17-6 | Expectancy and Profit Factor | Core | 22 |  | Expectancy in R; profit factor; break-even win rate; high win rate with negative expectancy; costs over 100 trades. | investor-gov-basics, barber-odean-2000, lopez-de-prado-backtesting |
| l-17-7 | Risk of Ruin | Core | 24 |  | Ruin as a threshold; the classic formula and its assumptions; more risk units, less ruin; over-betting turns wins into losses. | investor-gov-basics, lopez-de-prado-backtesting, finra-margin |
| l-17-8 | Stop Placement That Respects Structure | Core | 22 |  | Stops at invalidation; noise buffers; structure vs volatility stops; R:R and break-even; what stops cannot guarantee. | finra-order-types, sec-trade-execution, finra-market-volatility |
| l-17-9 | Scaling In, Scaling Out and Adding to Losers | Core | 23 |  | Adding within the original budget; average cost and open risk; scaling out; averaging down vs planned tranches. | investor-gov-basics, barber-odean-2001, kahneman-tversky-1979 |
| l-17-10 | Building a Written Risk Policy | Core | 24 |  | Limits a written policy needs; daily and monthly loss limits; de-risking ladders; following rules under stress. | investor-gov-basics, finra-day-trading, fed-fsr |

### Unit 18: Trading Psychology and Process

Track: Risk, Psychology and Portfolios. File: `src/content/trading/lessons/unit18.ts`.

| Lesson | Title | Band | Min | Jur. | Goals (agent's words) | Sources |
| --- | --- | --- | --- | --- | --- | --- |
| l-18-1 | Process Versus Outcome | Core | 14 |  | Grade decisions apart from results; the process-outcome grid; repeat good process; sample sizes that carry information. | kahneman-tversky-1979, barber-odean-2000 |
| l-18-2 | Loss Aversion and the Disposition Effect | Core | 15 |  | What prospect theory found; the disposition effect in your own log; unrealised losses are losses; pre-set exits. | kahneman-tversky-1979, barber-odean-2000 |
| l-18-3 | Fear of Missing Out and Chasing | Core | 14 |  | The chase sequence; cost of chased entries; shrinking reward and widening stop; cooling-off rules. | kahneman-tversky-1979, barber-odean-2000 |
| l-18-4 | Revenge Trading After a Loss | Core | 15 |  | The revenge-trading trigger; why upsizing after a loss raises ruin risk; daily loss limits; enforced pauses. | kahneman-tversky-1979, barber-odean-2000, finra-margin |
| l-18-5 | Confirmation Bias and Thesis Drift | Core | 14 |  | Confirmation bias; falsification conditions; detecting thesis drift; pre-mortems; new vs repeated information. | kahneman-tversky-1979, barber-odean-2001 |
| l-18-6 | Overconfidence, Luck and Sample Size | Core | 15 |  | Winning streaks are weak evidence; trades needed to tell skill from chance; brokerage-account research findings. | barber-odean-2000, barber-odean-2001, kahneman-tversky-1979 |
| l-18-7 | Anchoring, Recency and Availability | Core | 14 |  | Common anchors; your purchase price is irrelevant to the market; recency and availability distortions; re-anchoring. | kahneman-tversky-1979, barber-odean-2001 |
| l-18-8 | Overtrading and the Cost of Activity | Core | 15 |  | Annual cost of trading frequency; how small costs compound; activity is not progress; weekly trade caps. | barber-odean-2000, bogle-cost-matters, sharpe-1991 |
| l-18-9 | Journaling That Actually Changes Behaviour | Core | 14 |  | Journal fields that matter; recording before acting; tagging; a monthly review producing one measurable change. | kahneman-tversky-1979, barber-odean-2000 |
| l-18-10 | Rules, Checklists and Pre-Commitment | Core | 15 |  | Rules others could check; pre-trade checklists; pre-commitment; defined violations; scheduled rule reviews. | kahneman-tversky-1979, barber-odean-2000, finra-margin |

### Unit 19: Portfolio Construction

Track: Risk, Psychology and Portfolios. File: `src/content/trading/lessons/unit19.ts`.

| Lesson | Title | Band | Min | Jur. | Goals (agent's words) | Sources |
| --- | --- | --- | --- | --- | --- | --- |
| l-19-1 | Why Diversification Works | Core | 16 |  | Why low co-movement lowers volatility; two-asset volatility; specific vs market risk; diminishing benefit; limits. | markowitz-1952, investor-gov-diversify |
| l-19-2 | Correlation and Its Instability | Core | 16 |  | Read correlation matrices; calm-period estimates understate crises; breakdowns; correlation is not causation or beta. | markowitz-1952, investor-gov-diversify |
| l-19-3 | Strategic Asset Allocation | Core | 17 |  | Target weights for a horizon and risk tolerance; strategic vs tactical vs timing; implied bad-year loss; policy statements. | investor-gov-diversify, markowitz-1952 |
| l-19-4 | Stocks and Bonds Together | Core | 16 |  | Jobs of shares and bonds in one portfolio; mix return and volatility; when both fall; duration as a cushion. | investor-gov-diversify, markowitz-1952 |
| l-19-5 | Cash as a Position | Core | 15 |  | Cash as an allocation with a purpose; cash drag; reserves vs investments; policy cash vs fearful cash. | investor-gov-diversify |
| l-19-6 | International and Currency Exposure | Core | 16 |  | Home bias; local vs currency return; home-currency results; hedged vs unhedged costs; revenue-based foreign exposure. | investor-gov-diversify |
| l-19-7 | Factor Tilts and Hidden Concentration | Core | 16 |  | What a factor is; the documented Fama-French factors; hidden tilts; concentration measures; tilts can lag for years. | fama-french-1993, investor-gov-diversify |
| l-19-8 | Fund Overlap and Double Counting | Core | 15 |  | Overlap from holding weights; look-through exposure; more funds is not more diversification; compare with the benchmark. | investor-gov-diversify, spiva |
| l-19-9 | Rebalancing: Rules and Costs | Core | 15 | US | What rebalancing restores; calendar vs tolerance bands; computing trades; costs and US taxable-account effects. | investor-gov-diversify, bogle-cost-matters |
| l-19-10 | Sequence Risk and Time Horizon | Core | 16 |  | Sequence-of-returns risk; order matters once money moves in or out; not for lump sums; buffers and glide paths. | investor-gov-diversify |

### Unit 20: Options Foundations

Track: Options and Derivatives. File: `src/content/trading/lessons/unit20.ts`.

| Lesson | Title | Band | Min | Jur. | Goals (agent's words) | Sources |
| --- | --- | --- | --- | --- | --- | --- |
| l-20-1 | What an Option Contract Is | Core | 14 | US | Rights vs obligations; contract terms and the 100-share multiplier; who pays and keeps premium; the clearing house. | occ-odd, occ-clearing, oic-education |
| l-20-2 | Calls: Buyer and Seller Obligations | Core | 16 |  | Call buyer and seller duties; payoff per share and contract; break-even; maximum loss; covered vs uncovered. | occ-odd, oic-education, oic-strategies |
| l-20-3 | Puts: Buyer and Seller Obligations | Core | 16 |  | Put buyer and seller duties; payoff; break-even; maximum loss; how a protective put reshapes a holding. | occ-odd, oic-education, oic-strategies |
| l-20-4 | Strikes, Expiration and the Multiplier | Core | 13 |  | Read contract descriptions; premium to cash; expiry out of the money; adjusted contracts; notional exposure. | occ-odd, oic-education |
| l-20-5 | Moneyness, Intrinsic and Extrinsic Value | Core | 16 |  | In/at/out of the money; intrinsic and extrinsic value; extrinsic decays to zero; OTM premium is all extrinsic. | oic-education, cboe-education |
| l-20-6 | American Versus European Exercise | Core | 15 | US | American vs European exercise; which products use each; rational early exercise; assignment risk. | occ-odd, occ-clearing, oic-education |
| l-20-7 | Physical Versus Cash Settlement | Core | 14 | US | Physical vs cash settlement; exercise flows; index cash settlement; surprise positions; pin risk. | occ-odd, occ-clearing, cboe-education |
| l-20-8 | Reading an Option Chain | Core | 15 |  | Option chain columns; mid and spread cost; volume vs open interest; intrinsic/extrinsic split; judging liquidity. | oic-education, cboe-education |
| l-20-9 | Collateral, Buying Power and Approval Levels | Core | 15 | US | Collateral for cash-secured puts and covered calls; uncovered requirements; approval levels; the app's beginner defaults. | occ-odd, finra-margin, oic-education |
| l-20-10 | What Goes Wrong for Beginners | Core | 16 |  | The cheap far-OTM trap; high premium is not a reason to sell; break-even moves; liquidity traps; a pre-order routine. | occ-odd, oic-education, barber-odean-2000 |

### Unit 21: Options Pricing and Greeks

Track: Options and Derivatives. File: `src/content/trading/lessons/unit21.ts`.

| Lesson | Title | Band | Min | Jur. | Goals (agent's words) | Sources |
| --- | --- | --- | --- | --- | --- | --- |
| l-21-1 | What a Pricing Model Is For | Advanced | 14 |  | What a pricing model outputs; replication; risk-neutral pricing; model vs market price; model families. | bsm-1973, merton-1973, oic-education |
| l-21-2 | Black-Scholes: Inputs and Assumptions | Advanced | 16 |  | Black-Scholes inputs (volatility is unobservable); European-only; assumptions; directional sensitivities; why it is still used. | bsm-1973, merton-1973, oic-education, cboe-education |
| l-21-3 | Where Black-Scholes Breaks Down | Advanced | 16 |  | Skew as evidence against constant volatility; fat tails; early-exercise failures; lattice methods; omitted frictions. | bsm-1973, merton-1973, cboe-education, oic-education |
| l-21-4 | Implied Versus Realised Volatility | Advanced | 15 |  | Implied vs realised volatility; persistent gaps; implied volatility as a price, not a promise; volatility indices. | cboe-vix, cboe-education, bsm-1973 |
| l-21-5 | Volatility Skew and Smile | Advanced | 15 |  | Implied volatility against strike; equity index skew; flat-vol failure; comparing by IV; skew and spread costs. | cboe-education, cboe-vix, oic-education, bsm-1973 |
| l-21-6 | Term Structure and Volatility Crush | Advanced | 15 |  | Implied volatility across expiries; normal vs inverted; event crush; vega arithmetic; check event dates. | cboe-education, cboe-vix, oic-education |
| l-21-7 | Delta | Advanced | 16 |  | Delta as a model sensitivity; signs and ranges; share equivalents; not a probability of profit; estimate decay. | bsm-1973, oic-education, cboe-education |
| l-21-8 | Gamma | Advanced | 15 |  | Gamma; where it peaks; long vs short gamma; correcting delta estimates; expiration-week risk. | bsm-1973, oic-education, cboe-education |
| l-21-9 | Theta | Advanced | 16 |  | Theta as modelled decay; not guaranteed income; behaviour near expiry; one adverse move erasing many days. | bsm-1973, oic-education, occ-odd |
| l-21-10 | Vega, Rho and Portfolio Greeks | Advanced | 16 |  | Vega and rho; aggregating Greeks; same-units and same-instant caveats; stating a portfolio's dominant risk. | bsm-1973, merton-1973, cboe-education, oic-education |

### Unit 22: Options Strategies

Track: Options and Derivatives. File: `src/content/trading/lessons/unit22.ts`.

| Lesson | Title | Band | Min | Jur. | Goals (agent's words) | Sources |
| --- | --- | --- | --- | --- | --- | --- |
| l-22-1 | Covered Calls | Advanced | 15 | US | Covered call legs and duties; break-even and capped upside; premium cushions but does not protect; assignment outcomes. | occ-odd, oic-strategies, cboe-education |
| l-22-2 | Cash-Secured Puts | Advanced | 15 | US | Cash-secured put collateral; break-even and loss to zero; premium as compensation; effective purchase price. | occ-odd, oic-strategies, cboe-education |
| l-22-3 | Protective Puts | Advanced | 15 | US | Protective put construction; floor and break-even; premium drag on every outcome; strike trade-offs. | occ-odd, oic-strategies, cboe-education |
| l-22-4 | Collars | Advanced | 16 | US | Collar bounds; net premium; maximum profit and loss; what a "zero-cost" collar actually costs. | occ-odd, oic-strategies, cboe-education |
| l-22-5 | Vertical Spreads | Advanced | 17 | US | Debit vs credit verticals; maximum profit and loss from width and premium; break-even; vs the outright position. | occ-odd, oic-strategies, cboe-education |
| l-22-6 | Calendar Spreads | Advanced | 17 | US | Calendar construction; what remains after the short leg expires; term-structure exposure; profit zone and failure. | occ-odd, oic-strategies, cboe-education, cboe-vix |
| l-22-7 | Diagonal Spreads | Advanced | 18 | US | Diagonal construction; blended directional and term exposure; debit and harder-to-state maximum loss. | occ-odd, oic-strategies, cboe-education |
| l-22-8 | Iron Condors and Defined-Risk Range Trades | Advanced | 18 | US | Iron condor construction; maximum profit/loss and break-evens; defined risk; the win rate it needs. | occ-odd, oic-strategies, cboe-education |
| l-22-9 | Assignment, Early Exercise and Pin Risk | Advanced | 17 | US | Assignment notices; dividend-driven early exercise; post-assignment positions; pin-risk checks. | occ-odd, occ-clearing, oic-education, finra-margin |
| l-22-10 | Undefined Risk and Why It Is Not a Default | Advanced | 18 | US | Defined vs undefined payoffs; naked-call losses; strangle losses at several prices; wings; margin calls. | occ-odd, oic-strategies, finra-margin, cboe-education |

### Unit 23: Macroeconomics for Markets

Track: Macro, Institutions and Evidence. File: `src/content/trading/lessons/unit23.ts`.

| Lesson | Title | Band | Min | Jur. | Goals (agent's words) | Sources |
| --- | --- | --- | --- | --- | --- | --- |
| l-23-1 | What Macro Data Is and Is Not | Core | 15 | US | Actual vs consensus vs prior; surprise in release units; revisions, seasonal adjustment, base effects; limits of a release. | bls-cpi, bea-gdp, fred |
| l-23-2 | Inflation: CPI, PCE and Core Measures | Core | 15 | US | CPI vs PCE; monthly and annual rates from index levels; core measures; deflating nominal figures properly. | bls-cpi, bea-pce, bls-ppi, fred, fed-monetary-policy |
| l-23-3 | Employment and Wages | Core | 14 | US | Payroll vs household surveys; reading a jobs release; unemployment rising with employment; real wages. | bls-ces, bls-cps, bls-cpi, fed-monetary-policy, fred |
| l-23-4 | Growth: GDP and Its Components | Core | 19 | US | GDP components and shares; contributions to growth; real vs nominal; inventory and trade swings; estimate stages. | bea-gdp, bea-pce, nber-cycles, fred |
| l-23-5 | Consumption, Retail Sales and Sentiment | Core | 18 | US | Retail sales as a nominal seasonally adjusted series; the control group; deflating; sentiment vs spending; revisions. | census-retail, bea-pce, bls-cpi, fred |
| l-23-6 | Surveys and Purchasing Manager Indexes | Core | 18 | US | Diffusion indexes and the 50 line; computing one; sub-indexes; when surveys lead and when they fail. | ism-pmi, fred, nber-cycles |
| l-23-7 | Central Bank Policy and Rate Expectations | Core | 22 | US + euro area | Policy rates and mandates; decision vs projection vs guidance; implied rate paths; why expected decisions move markets. | fed-monetary-policy, ecb-policy, fed-h15, treasury-yield-curve |
| l-23-8 | Yields, the Yield Curve and What It Prices | Core | 20 | US | Basis points; price-yield inverse; expectations plus term premium; the 2s10s spread; what inversions have preceded. | treasury-yield-curve, fed-h15, finra-bonds, nber-cycles |
| l-23-9 | Credit Spreads and Financial Conditions | Core | 19 | US | Credit spreads; tighter conditions; government vs corporate leg; financial-conditions indexes; credit vs equity. | fed-fsr, finra-bonds, fred, fcic-report |
| l-23-10 | Currencies, Oil and Global Linkages | Core | 20 | US + global | Rate differentials and currencies; currency effects on reported revenue; oil supply vs demand shocks; external transmission. | bis-triennial, eia-petroleum, imf-weo, fed-h15, ecb-policy |

### Unit 24: Institutions and Market Mechanics

Track: Macro, Institutions and Evidence. File: `src/content/trading/lessons/unit24.ts`.

| Lesson | Title | Band | Min | Jur. | Goals (agent's words) | Sources |
| --- | --- | --- | --- | --- | --- | --- |
| l-24-1 | Who Is on the Other Side | Core | 14 | US | Who can fill a retail order and what each wants; sort by pay and constraints; charts do not reveal institutional intent. | sec-market-structure, sec-trade-execution, nasdaq-market-structure |
| l-24-2 | Asset Managers Versus Hedge Funds | Core | 15 | US | Asset manager vs hedge fund pay and constraints; benchmarks; tracking error; lock-ups and gates; late position filings. | sec-form-pf, fed-fsr, sec-market-structure |
| l-24-3 | Market Makers and Inventory Risk | Core | 16 | US | Market-maker round-trip earnings; inventory risk; quote skewing; adverse selection; the stop-hunting claim. | nasdaq-market-structure, sec-market-structure, sec-hft-concept |
| l-24-4 | Proprietary Firms and Execution Desks | Core | 16 | US | Principal vs agency desks; execution metrics; implementation shortfall; child orders and leakage; prime brokers. | sec-trade-execution, sec-market-structure, sec-hft-concept |
| l-24-5 | Long/Short Equity and Relative Value | Core | 16 | US | What long/short books isolate; gross and net exposure; borrow cost; pairs moving against you; crowding. | sec-reg-sho, sec-form-pf, fed-fsr |
| l-24-6 | Global Macro and Trend-Following Managers | Core | 19 |  | What macro managers trade; trend-following rules; long flat periods; positioning reports and their lags. | cftc-cot, sec-form-pf, lo-2004-amh, jegadeesh-titman-1993 |
| l-24-7 | Statistical Arbitrage and Merger Arbitrage | Core | 20 |  | Statistical arbitrage and decay; capacity; merger deal spreads; broken deals; steady-until-not loss shapes. | sec-form-pf, sec-hft-concept, lopez-de-prado-backtesting, sec-market-structure |
| l-24-8 | Execution Algorithms: VWAP, TWAP and Participation | Core | 21 |  | VWAP, TWAP and participation algorithms; where each fails; schedules; implementation shortfall; cost analysis. | sec-trade-execution, sec-market-structure, nasdaq-market-structure, cme-education |
| l-24-9 | Financing, Leverage, Redemptions and Deleveraging | Core | 22 |  | Leverage from gross exposure; collateral haircuts; margin calls; forced sellers; deleveraging correlation; redemptions. | finra-margin, fed-fsr, fcic-report, sec-form-pf |
| l-24-10 | Dealer Hedging and Conditional Feedback | Core | 22 |  | Why dealers hedge; when hedging dampens or amplifies; positioning is unobservable on a chart; refuting myths. | occ-clearing, oic-education, cboe-education, sec-market-structure |

### Unit 25: Strategy Evaluation and Evidence

Track: Macro, Institutions and Evidence. File: `src/content/trading/lessons/unit25.ts`.

| Lesson | Title | Band | Min | Jur. | Goals (agent's words) | Sources |
| --- | --- | --- | --- | --- | --- | --- |
| l-25-1 | What Would Change Your Mind | Core | 14 |  | Turn beliefs into falsifiable claims; state drop conditions first; past vs future claims; pre-registration notes. | lopez-de-prado-backtesting, park-irwin-2007 |
| l-25-2 | Backtesting: Structure and Pitfalls | Core | 16 |  | Four parts of a backtest; rules precise enough to reproduce; realistic costs; backtest vs forward vs live. | lopez-de-prado-backtesting, park-irwin-2007 |
| l-25-3 | Look-Ahead Bias and Survivorship | Core | 16 |  | Check every input for knowability; fix same-bar decisions; restated data; measure survivorship; point-in-time data. | lopez-de-prado-backtesting, spiva |
| l-25-4 | Train, Test and Out-of-Sample Discipline | Core | 20 |  | Training vs test periods; why tuning on the test set ruins it; walk-forward; several splits and seeds. | lopez-de-prado-backtesting, spiva, fama-french-1993 |
| l-25-5 | Overfitting and the Multiple-Testing Problem | Core | 21 |  | Spot over-fitting; best-of-many bias; backtest-overfitting intuition; fewer parameters; allowing for trials. | lopez-de-prado-backtesting, spiva, park-irwin-2007 |
| l-25-6 | Costs, Capacity and Turnover | Core | 19 |  | Annual cost drag from turnover; gross vs net; impact and capacity; turnover from holding period; edge after costs. | bogle-cost-matters, sec-trade-execution, barber-odean-2000, spiva |
| l-25-7 | Return, Volatility and Drawdown Together | Core | 19 |  | Maximum drawdown; why total return alone cannot rank strategies; recovery gains; reading the path, not the endpoint. | sharpe-1994, investor-gov-compound, finra-market-volatility |
| l-25-8 | Sharpe, Sortino and Their Assumptions | Core | 21 |  | Sharpe with a stated risk-free rate; annualising; Sortino; hidden assumptions; why short samples are weak evidence. | sharpe-1994, sharpe-1991, lopez-de-prado-backtesting, fed-h15 |
| l-25-9 | Regime Dependence and Model Decay | Core | 20 |  | Sub-period tests; crowding and decay; hidden market assumptions; review triggers; broken vs ordinary losing runs. | lo-2004-amh, jegadeesh-titman-1993, lopez-de-prado-backtesting, spiva |
| l-25-10 | Reading Evidence About Strategies Honestly | Core | 20 |  | Population, period and survivorship questions; measured vs headline claims; sample size for win rates; stating limits. | fama-french-1993, jegadeesh-titman-1993, park-irwin-2007, spiva, barber-odean-2000, lopez-de-prado-backtesting |

### Unit 26: Reading the Macro Calendar

Track: Macro, Institutions and Evidence. File: `src/content/trading/lessons/unit26.ts`.

| Lesson | Title | Band | Min | Jur. | Goals (agent's words) | Sources |
| --- | --- | --- | --- | --- | --- | --- |
| l-26-1 | Surprise, Not Level | Advanced | 14 | US | Expected data is already priced; surprise in release units; standardised surprises; strong headline, negative surprise. | bls-cpi, bls-ces, bls-employment-situation, census-retail, fred |
| l-26-2 | Consensus, Whisper and the Distribution | Advanced | 15 | US | Consensus vs the forecast distribution; dispersion; unofficial expectations; futures-implied expectations; no standing rule. | bls-employment-situation, fomc-calendar, fed-monetary-policy, cme-education, fred |
| l-26-3 | Revisions and the Shifting Past | Advanced | 15 | US | Release stages; net surprise including revisions; weighting noisy series; benchmark revisions; real-time data for backtests. | bls-ces, bls-employment-situation, bea-gdp, fred, lopez-de-prado-backtesting |
| l-26-4 | Good News as Bad News | Advanced | 15 | US | When strong data hurts equities; release-to-valuation arithmetic; sign flips; long- vs short-duration businesses. | fed-monetary-policy, fomc-calendar, treasury-yield-curve, bls-employment-situation, fred |
| l-26-5 | Manufacturing, Services and the Split Economy | Advanced | 14 | US | Why manufacturing and services surveys diverge; sector shares and composites; contribution arithmetic; sector relevance. | ism-pmi, bea-gdp, bls-ces, nber-cycles, fred |
| l-26-6 | Housing as a Rate-Sensitive Indicator | Advanced | 16 | US | Housing releases and their lags; early rate sensitivity; mortgage payment arithmetic; contraction without recession. | census-housing, fed-h15, bls-ces, bea-gdp, fred |
| l-26-7 | Recession Signals and Their Track Records | Advanced | 15 | US | What yield-curve inversions preceded and lead times; unemployment-rule gaps; small samples; recession dating lags. | nber-cycles, treasury-yield-curve, bls-cps, fred, lopez-de-prado-backtesting |
| l-26-8 | Positioning, Liquidity and Why Reactions Differ | Advanced | 15 | US | Crowded positioning; thin liquidity around releases; risk premia; public positioning data and staleness. | cftc-cot, sec-market-structure, cboe-vix, treasury-yield-curve, fred |
| l-26-9 | Confirmation Across Markets | Advanced | 14 | US | Checking a story across rates, FX, credit and equities; curve changes; breakevens; limits of confirmation. | treasury-yield-curve, fed-h15, fred-exchange-rates, fed-monetary-policy, fred |
| l-26-10 | Building a Release-Day Process | Advanced | 14 | US | A pre-release note with a falsifier; hold vs trade decisions; gap-based sizing; doing nothing as a decision. | finra-order-types, fomc-calendar, bls-employment-situation, lopez-de-prado-backtesting, spiva |

### Unit 27: Rates, Bonds and Currencies in Depth

Track: Macro, Institutions and Evidence. File: `src/content/trading/lessons/unit27.ts`.

| Lesson | Title | Band | Min | Jur. | Goals (agent's words) | Sources |
| --- | --- | --- | --- | --- | --- | --- |
| l-27-1 | From the Policy Rate to the Long Bond | Advanced | 14 | US | What a central bank sets; expectations plus term premium; long yields falling on a hike; setting vs expected path. | fed-monetary-policy, fomc-calendar, fed-h15, treasury-yield-curve, fed-open-market-history |
| l-27-2 | Bond Prices, Yields and Coupons | Advanced | 15 |  | Price-yield inverse from cash flows; pricing a bond; premium and discount; current yield vs YTM vs realised return. | finra-bonds, treasury-auctions, investor-gov-products, investor-gov-basics |
| l-27-3 | Duration and Convexity in Practice | Advanced | 16 |  | Duration estimates from bps moves; convexity correction; portfolio duration; long vs short bond funds; equity analogy. | finra-bonds, treasury-yield-curve, investor-gov-products, fred |
| l-27-4 | Real Yields and Breakevens | Advanced | 14 | US | Real yields; breakeven inflation; attributing yield moves; valuation effects; liquidity premia in breakevens. | treasury-yield-curve, fed-h15, bls-cpi, fred, investor-gov-products |
| l-27-5 | The Yield Curve as a Set of Prices | Advanced | 15 | US | The curve as prices; implied forward rates; bull/bear steepening and flattening; what inversions price. | treasury-yield-curve, treasury-auctions, fed-h15, fred, nber-cycles |
| l-27-6 | Credit Spreads and the Price of Default Risk | Advanced | 14 |  | Credit spreads in bps; expected loss, risk and liquidity components; widening while borrowing costs fall. | finra-bonds, fed-fsr, fred, sec-edgar, treasury-yield-curve |
| l-27-7 | Exchange Rates and What Moves Them | Advanced | 15 |  | Quoting a pair unambiguously; asymmetric % changes; covered forwards; carry trades; non-rate currency drivers. | fred-exchange-rates, fed-h10, bis-triennial, imf-weo, ecb-policy |
| l-27-8 | Currency in the Accounts | Advanced | 15 |  | Currency translation of revenue; constant-currency growth; translation vs transaction exposure; hedging effects. | sec-financial-reporting, sec-edgar, fred-exchange-rates, fed-h10 |
| l-27-9 | The Dollar, Capital Flows and Borrowing Abroad | Advanced | 15 |  | Foreign-currency debt burdens; emerging-market transmission; capital flows; invoicing currency; stability thresholds. | bis-annual-report, bis-triennial, imf-weo, imf-asia-1997, fred-exchange-rates, fed-h10 |
| l-27-10 | Sector Sensitivity to Rates and the Currency | Advanced | 15 | US | Ranking sector rate sensitivity; banks vs utilities; foreign revenue; tendencies not laws; counter-examples. | fed-h15, fdic-2023-review, treasury-yield-curve, fred, sec-edgar, fed-open-market-history |

### Unit 28: Market History, 1990 to Now

Track: Macro, Institutions and Evidence. File: `src/content/trading/lessons/unit28.ts`.

| Lesson | Title | Band | Min | Jur. | Goals (agent's words) | Sources |
| --- | --- | --- | --- | --- | --- | --- |
| l-28-1 | Reading History Without Hindsight | Advanced | 18 |  | Separate what was known then from what was understood later; alternative causes; survivorship; base rates. | nber-cycles, fed-open-market-history, fcic-report, spiva |
| l-28-2 | The Early 1990s: Recession, Recovery and 1994 | Advanced | 20 |  | Early-1990s recession dates; the 1994 tightening; bps vs price effects; bond losses without recession or default. | nber-cycles, fed-open-market-history, fomc-calendar, treasury-yield-curve, fed-h15, bls-cpi, bls-employment-situation, sec-edgar |
| l-28-3 | 1997 and 1998: Asia, Russia and LTCM | Advanced | 21 |  | Currency pegs in 1997; contagion in 1998; correlations rising under deleveraging; leverage wipe-out arithmetic. | imf-asia-1997, imf-weo, pwg-ltcm-1999, fed-history-ltcm, fed-open-market-history, fomc-calendar, treasury-yield-curve, fed-h15, fed-h10, data-licensing-note |
| l-28-4 | The Internet Boom, Y2K and the 2000 to 2002 Bust | Advanced | 22 |  | What changed for internet businesses; valuation vs earnings growth; index vs median company; being right at any price. | sec-edgar, sec-financial-reporting, fed-open-market-history, fomc-calendar, treasury-yield-curve, bls-employment-situation, nber-cycles, shiller-nobel-lecture, data-licensing-note |
| l-28-5 | 2001: Recession, September 11 and Market Closure | Advanced | 19 |  | Dating the 2001 contraction; the post-11 September closure; effects on hedges and stops; separating causes. | nber-cycles, nyse-hours, sec-2001-actions, fed-open-market-history, fomc-calendar, bls-employment-situation, data-licensing-note |
| l-28-6 | 2004 to 2007: Tightening, Housing and Calm Measures of Risk | Advanced | 22 |  | The 2004-06 tightening; securitisation incentives; low volatility is not low risk; correlation assumptions in structured products. | fed-open-market-history, fomc-calendar, fed-monetary-policy, treasury-yield-curve, fed-h15, census-housing, bls-employment-situation, fcic-report, minsky-archive, data-licensing-note |
| l-28-7 | 2007 to 2009: The Financial Crisis | Advanced | 24 |  | From 2007 funding stress to September 2008; liquidity vs solvency; diversification failure; wholesale funding; recovery maths. | fcic-report, stlouisfed-crisis-timeline, fed-open-market-history, fomc-calendar, fed-balance-sheet, fed-fsr, nber-cycles, bls-employment-situation, bls-cpi, census-housing, treasury-yield-curve, data-licensing-note |
| l-28-8 | 2010 to 2015: Europe, the Taper Tantrum and the Long Expansion | Advanced | 22 |  | The sovereign-bank loop; currency-union constraints; the 2013 taper episode in bps; markets pricing the expected path. | ecb-policy, ecb-history, esm-history, imf-weo, treasury-yield-curve, fed-h15, fomc-calendar, fed-open-market-history, fed-speeches, data-licensing-note |
| l-28-9 | 2015 to 2019: Tightening, the 2018 Selloff and the 2019 Reversal | Advanced | 21 |  | The 2015-18 cycle pace; balance-sheet reduction; late-2018 selloff; the 2019 reversal; extrapolation risk. | fed-open-market-history, fomc-calendar, fed-balance-sheet, fed-monetary-policy, treasury-yield-curve, fed-h15, bls-employment-situation, nber-cycles, data-licensing-note |
| l-28-10 | 2020 to Now: COVID, Inflation and the AI Build-Out | Advanced | 26 |  | The 2020 fall and recovery; the 2021-22 inflation debate; 2022 stock-bond decline; the computing capex boom and dispersion. | nber-cycles, fed-covid-response, fed-open-market-history, fomc-calendar, fed-balance-sheet, fed-fsr, treasury-yield-curve, fed-h15, bls-cpi, bls-employment-situation, eia-petroleum, sec-edgar, wsts-semiconductor, sia-factbook, data-licensing-note |

## 5. Sources the app cites (111)

The app's `SOURCES` list by id, with the number of lessons citing each. The website never relies on these citations: every source a page uses is re-opened and recorded in section 14. **App citations must not be copied to the website without being re-opened.**

| App id | Publisher | URL | Lessons citing |
| --- | --- | --- | --- |
| investor-gov-basics | U.S. Securities and Exchange Commission (Investor.gov) | https://www.investor.gov/introduction-investing/investing-basics | 42 |
| investor-gov-markets | U.S. Securities and Exchange Commission (Investor.gov) | https://www.investor.gov/introduction-investing/investing-basics/how-stock-markets-work | 18 |
| investor-gov-glossary | U.S. Securities and Exchange Commission (Investor.gov) | https://www.investor.gov/introduction-investing/investing-basics/glossary | 22 |
| investor-gov-products | U.S. Securities and Exchange Commission (Investor.gov) | https://www.investor.gov/introduction-investing/investing-basics/investment-products | 17 |
| investor-gov-fees | U.S. Securities and Exchange Commission (Investor.gov) | https://www.investor.gov/introduction-investing/getting-started/understanding-fees | 9 |
| investor-gov-compound | U.S. Securities and Exchange Commission (Investor.gov) | https://www.investor.gov/financial-tools-calculators/calculators/compound-interest-calculator | 3 |
| investor-gov-diversify | U.S. Securities and Exchange Commission (Investor.gov) | https://www.investor.gov/introduction-investing/getting-started/asset-allocation | 11 |
| sec-trade-execution | U.S. Securities and Exchange Commission | https://www.sec.gov/about/reports-publications/investorpubstradexec | 29 |
| sec-market-structure | U.S. Securities and Exchange Commission, Division of Trading and Markets | https://www.sec.gov/about/divisions-offices/division-trading-markets | 24 |
| sec-edgar | U.S. Securities and Exchange Commission | https://www.sec.gov/edgar/search-and-access | 32 |
| sec-financial-reporting | U.S. Securities and Exchange Commission | https://www.sec.gov/reportspubs/investor-publications/investorpubsbegfinstmtguide | 35 |
| sec-reg-sho | U.S. Securities and Exchange Commission | https://www.sec.gov/investor/pubs/regsho.htm | 4 |
| sec-settlement-cycle | U.S. Securities and Exchange Commission | https://www.sec.gov/rules-regulations/2023/02/s7-05-22 | 5 |
| sec-trading-suspensions | U.S. Securities and Exchange Commission | https://www.sec.gov/litigation/suspensions | 2 |
| sec-mutual-funds-etfs | U.S. Securities and Exchange Commission | https://www.investor.gov/introduction-investing/investing-basics/investment-products/mutual-funds-and-exchange-traded-1 | 6 |
| finra-investing | Financial Industry Regulatory Authority | https://www.finra.org/investors/investing | 9 |
| finra-margin | Financial Industry Regulatory Authority | https://www.finra.org/investors/investing/investment-products/margin | 17 |
| finra-day-trading | Financial Industry Regulatory Authority | https://www.finra.org/investors/investing/investment-products/day-trading | 2 |
| finra-order-types | Financial Industry Regulatory Authority | https://www.finra.org/investors/insights/stock-order-types | 22 |
| finra-market-volatility | Financial Industry Regulatory Authority | https://www.finra.org/investors/insights | 12 |
| finra-bonds | Financial Industry Regulatory Authority | https://www.finra.org/investors/investing/investment-products/bonds | 9 |
| occ-odd | The Options Clearing Corporation | https://www.theocc.com/company-information/documents-and-archives/options-disclosure-document | 19 |
| occ-clearing | The Options Clearing Corporation | https://www.theocc.com/clearance-and-settlement | 5 |
| oic-education | The Options Industry Council | https://www.optionseducation.org/ | 20 |
| oic-strategies | The Options Industry Council | https://www.optionseducation.org/strategies | 11 |
| cboe-education | Cboe Global Markets | https://www.cboe.com/education/ | 21 |
| cboe-vix | Cboe Global Markets | https://www.cboe.com/tradable_products/vix/ | 6 |
| bsm-1973 | Fischer Black and Myron Scholes, Journal of Political Economy, 1973 | https://www.journals.uchicago.edu/doi/10.1086/260062 | 9 |
| merton-1973 | Robert C. Merton, Bell Journal of Economics and Management Science, 1973 | https://www.jstor.org/stable/3003143 | 4 |
| bls-cpi | U.S. Bureau of Labor Statistics | https://www.bls.gov/cpi/ | 9 |
| bls-ces | U.S. Bureau of Labor Statistics | https://www.bls.gov/ces/ | 5 |
| bls-cps | U.S. Bureau of Labor Statistics | https://www.bls.gov/cps/ | 2 |
| bls-ppi | U.S. Bureau of Labor Statistics | https://www.bls.gov/ppi/ | 1 |
| bea-gdp | U.S. Bureau of Economic Analysis | https://www.bea.gov/data/gdp/gross-domestic-product | 7 |
| bea-pce | U.S. Bureau of Economic Analysis | https://www.bea.gov/data/income-saving/personal-income | 3 |
| census-retail | U.S. Census Bureau | https://www.census.gov/retail/ | 2 |
| fed-monetary-policy | Board of Governors of the Federal Reserve System | https://www.federalreserve.gov/monetarypolicy.htm | 9 |
| fed-h15 | Board of Governors of the Federal Reserve System | https://www.federalreserve.gov/releases/h15/ | 18 |
| fed-fsr | Board of Governors of the Federal Reserve System | https://www.federalreserve.gov/publications/financial-stability-report.htm | 10 |
| fred | Federal Reserve Bank of St. Louis | https://fred.stlouisfed.org/ | 21 |
| treasury-yield-curve | U.S. Department of the Treasury | https://home.treasury.gov/policy-issues/financing-the-government/interest-rate-statistics | 22 |
| eia-petroleum | U.S. Energy Information Administration | https://www.eia.gov/petroleum/ | 4 |
| ism-pmi | Institute for Supply Management | https://www.ismworld.org/supply-management-news-and-reports/reports/ism-report-on-business/ | 4 |
| bis-triennial | Bank for International Settlements | https://www.bis.org/statistics/rpfx22.htm | 5 |
| imf-weo | International Monetary Fund | https://www.imf.org/en/Publications/WEO | 5 |
| ecb-policy | European Central Bank | https://www.ecb.europa.eu/mopo/html/index.en.html | 4 |
| nber-cycles | National Bureau of Economic Research | https://www.nber.org/research/data/us-business-cycle-expansions-and-contractions | 15 |
| fcic-report | Financial Crisis Inquiry Commission, 2011 | https://www.govinfo.gov/app/details/GPO-FCIC | 5 |
| fed-covid-response | Board of Governors of the Federal Reserve System | https://www.federalreserve.gov/covid-19.htm | 1 |
| fdic-2023-review | Federal Deposit Insurance Corporation | https://www.fdic.gov/bank-failures | 1 |
| sec-2010-flash-crash | U.S. Securities and Exchange Commission and Commodity Futures Trading Commission | https://www.sec.gov/news/studies/2010/marketevents-report.pdf | 2 |
| fed-history-1987 | Federal Reserve History, Federal Reserve Bank of Richmond and the Board of Governors | https://www.federalreservehistory.org/essays/stock-market-crash-of-1987 | 0 |
| brady-report-1988 | Presidential Task Force on Market Mechanisms; archived by the Yale Program on Financial Stability Resource Library | https://elischolar.library.yale.edu/ypfs-documents/8188/ | 0 |
| fed-history-ltcm | Federal Reserve History, Federal Reserve Bank of Richmond and the Board of Governors | https://www.federalreservehistory.org/essays/ltcm-near-failure | 1 |
| pwg-ltcm-1999 | President's Working Group on Financial Markets, U.S. Department of the Treasury, 1999 | https://home.treasury.gov/news/press-releases/report3097 | 1 |
| boj-statistics | Bank of Japan | https://www.boj.or.jp/en/statistics/index.htm | 0 |
| boj-imes-bubble | Kunio Okina, Masaaki Shirakawa and Shigenori Shiratsuka, Monetary and Economic Studies (Special Edition), Bank of Japan Institute for Monetary and Economic Studies, 2001 | https://www.imes.boj.or.jp/research/papers/english/me19-s1-14.pdf | 0 |
| gao-debt-limit-2012 | U.S. Government Accountability Office, 2012 | https://www.gao.gov/products/gao-12-701 | 0 |
| sec-meme-2021 | U.S. Securities and Exchange Commission, 2021 | https://www.sec.gov/about/reports-publications/staff-report-equity-options-market-structure-conditions-early-2021 | 0 |
| fama-french-1993 | Eugene F. Fama and Kenneth R. French, Journal of Financial Economics, 1993 | https://www.sciencedirect.com/science/article/abs/pii/0304405X93900235 | 4 |
| fama-french-2015 | Eugene F. Fama and Kenneth R. French, Journal of Financial Economics, 2015 | https://www.sciencedirect.com/science/article/abs/pii/S0304405X14002323 | 0 |
| jegadeesh-titman-1993 | Narasimhan Jegadeesh and Sheridan Titman, Journal of Finance, 1993 | https://onlinelibrary.wiley.com/doi/10.1111/j.1540-6261.1993.tb04702.x | 4 |
| sharpe-1994 | William F. Sharpe, Journal of Portfolio Management, 1994 | https://web.stanford.edu/~wfsharpe/art/sr/sr.htm | 4 |
| sharpe-1991 | William F. Sharpe, Financial Analysts Journal, 1991 | https://web.stanford.edu/~wfsharpe/art/active/active.htm | 3 |
| markowitz-1952 | Harry Markowitz, Journal of Finance, 1952 | https://onlinelibrary.wiley.com/doi/10.1111/j.1540-6261.1952.tb01525.x | 5 |
| barber-odean-2000 | Brad M. Barber and Terrance Odean, Journal of Finance, 2000 | https://onlinelibrary.wiley.com/doi/10.1111/0022-1082.00226 | 19 |
| barber-odean-2001 | Brad M. Barber and Terrance Odean, Quarterly Journal of Economics, 2001 | https://academic.oup.com/qje/article/116/1/261/1939000 | 4 |
| kahneman-tversky-1979 | Daniel Kahneman and Amos Tversky, Econometrica, 1979 | https://www.jstor.org/stable/1914185 | 11 |
| lopez-de-prado-backtesting | Bailey, Borwein, Lopez de Prado and Zhu, Journal of Computational Finance, 2016 | https://papers.ssrn.com/sol3/papers.cfm?abstract_id=2326253 | 30 |
| spiva | S&P Dow Jones Indices | https://www.spglobal.com/spdji/en/research-insights/spiva/ | 14 |
| lo-2004-amh | Andrew W. Lo, Journal of Portfolio Management, 2004 | https://www.pm-research.com/content/iijpormgmt/30/5/15 | 27 |
| park-irwin-2007 | Cheol-Ho Park and Scott H. Irwin, Journal of Economic Surveys, 2007 | https://onlinelibrary.wiley.com/doi/10.1111/j.1467-6419.2007.00519.x | 66 |
| bogle-cost-matters | John C. Bogle, Financial Analysts Journal, 2014 | https://www.tandfonline.com/doi/abs/10.2469/faj.v70.n1.1 | 7 |
| graham-analysis | Benjamin Graham (works referenced, not reproduced) | https://www.harpercollins.com/products/the-intelligent-investor-rev-ed-benjamin-graham | 11 |
| berkshire-letters | Berkshire Hathaway Inc. | https://www.berkshirehathaway.com/letters/letters.html | 5 |
| lynch-one-up | Peter Lynch and John Rothchild, Simon & Schuster (ISBN 9780743200400; work referenced, not reproduced) | https://www.simonandschuster.com/books/One-Up-On-Wall-Street/Peter-Lynch/9780743200400 | 0 |
| lynch-beating | Peter Lynch and John Rothchild, Simon & Schuster (ISBN 9780671891633; work referenced, not reproduced) | https://www.simonandschuster.com/books/Beating-the-Street/Peter-Lynch/9780671891633 | 0 |
| bogle-vanguard | Bogle Financial Markets Research Center | https://johncbogle.com/ | 1 |
| marks-memos | Oaktree Capital Management | https://www.oaktreecapital.com/insights/memos | 3 |
| bridgewater-principles | Bridgewater Associates | https://www.bridgewater.com/research-and-insights | 0 |
| frazzini-pedersen-2014 | Andrea Frazzini and Lasse Heje Pedersen, Journal of Financial Economics, 2014 | https://www.sciencedirect.com/science/article/pii/S0304405X13002675 | 0 |
| shiller-nobel-lecture | Robert J. Shiller, The Nobel Foundation | https://www.nobelprize.org/prizes/economic-sciences/2013/shiller/lecture/ | 1 |
| minsky-archive | Levy Economics Institute of Bard College | https://digitalcommons.bard.edu/hm_archive/ | 1 |
| sec-hft-concept | U.S. Securities and Exchange Commission | https://www.sec.gov/rules/concept/2010/34-61358.pdf | 5 |
| sec-form-pf | U.S. Securities and Exchange Commission | https://www.sec.gov/investment/private-fund-adviser-resources | 5 |
| cftc-cot | U.S. Commodity Futures Trading Commission | https://www.cftc.gov/MarketReports/CommitmentsofTraders/index.htm | 2 |
| cme-education | CME Group | https://www.cmegroup.com/education.html | 3 |
| nyse-hours | New York Stock Exchange | https://www.nyse.com/markets/hours-calendars | 7 |
| nasdaq-market-structure | Nasdaq, Inc. | https://www.nasdaqtrader.com/ | 10 |
| irs-investment-income | U.S. Internal Revenue Service | https://www.irs.gov/taxtopics/tc409 | 0 |
| irs-wash-sale | U.S. Internal Revenue Service | https://www.irs.gov/forms-pubs/about-publication-550 | 0 |
| fca-investing | Financial Conduct Authority (UK) | https://www.fca.org.uk/consumers | 3 |
| esma-investor | European Securities and Markets Authority | https://www.esma.europa.eu/investor-corner | 5 |
| fomc-calendar | Board of Governors of the Federal Reserve System | https://www.federalreserve.gov/monetarypolicy/fomccalendars.htm | 13 |
| fed-open-market-history | Board of Governors of the Federal Reserve System | https://www.federalreserve.gov/monetarypolicy/openmarket.htm | 12 |
| fed-speeches | Board of Governors of the Federal Reserve System | https://www.federalreserve.gov/newsevents/speeches.htm | 1 |
| fed-balance-sheet | Board of Governors of the Federal Reserve System | https://www.federalreserve.gov/releases/h41/ | 3 |
| stlouisfed-crisis-timeline | Federal Reserve Bank of St. Louis | https://www.stlouisfed.org/financial-crisis/full-timeline | 1 |
| bls-employment-situation | U.S. Bureau of Labor Statistics | https://www.bls.gov/news.release/empsit.toc.htm | 12 |
| census-housing | U.S. Census Bureau | https://www.census.gov/construction/nrc/index.html | 3 |
| fred-exchange-rates | Federal Reserve Bank of St. Louis (FRED) | https://fred.stlouisfed.org/categories/95 | 4 |
| fed-h10 | Board of Governors of the Federal Reserve System | https://www.federalreserve.gov/releases/h10/ | 4 |
| imf-asia-1997 | International Monetary Fund | https://www.imf.org/en/About/Factsheets | 2 |
| bis-annual-report | Bank for International Settlements | https://www.bis.org/annualeconomicreports/index.htm | 1 |
| ecb-history | European Central Bank | https://www.ecb.europa.eu/press/key/html/index.en.html | 1 |
| esm-history | European Stability Mechanism | https://www.esm.europa.eu/about-esm/history | 1 |
| sec-2001-actions | U.S. Securities and Exchange Commission | https://www.sec.gov/news/pressreleases | 1 |
| treasury-auctions | U.S. Department of the Treasury (TreasuryDirect) | https://www.treasurydirect.gov/auctions/ | 2 |
| wsts-semiconductor | World Semiconductor Trade Statistics | https://www.wsts.org/ | 1 |
| sia-factbook | Semiconductor Industry Association | https://www.semiconductors.org/data/ | 1 |
| data-licensing-note | U.S. Government Publishing Office | https://www.usa.gov/government-works | 8 |

## 6. Glossary inventory (881 terms)

Source: `src/content/trading/glossary.ts`. 881 terms, 733 with a nuance note; every term links to at least one related term. Terms below are grouped by their primary domain (first entry of `topics`). Only term names are listed; the app's definitions are not reproduced and must not be copied.

| Domain | Terms (primary domain) | Terms (any membership) |
| --- | --- | --- |
| Technical analysis | 196 | 196 |
| Market structure | 153 | 168 |
| Risk, portfolios and behaviour | 142 | 158 |
| Fundamentals and valuation | 123 | 140 |
| Derivatives | 102 | 106 |
| Macro and economics | 61 | 87 |
| Fixed income | 31 | 45 |
| Funds | 22 | 36 |
| Hedge funds and private markets | 19 | 20 |
| Dilution and share structure | 14 | 29 |
| Regulation and history | 12 | 24 |
| IPOs and capital raising | 6 | 14 |
| Banking | 0 | 11 |
| Personal finance and accounts | 0 | 4 |
| Crypto basics | 0 | 0 |

**Technical analysis (196):** Accumulation, Adjusted close, ADX, Ambiguous pattern, Anchor, Anchored VWAP, Annualisation, Apex, Ascending triangle, ATR, ATR stop, Backward adjustment, Band squeeze, Bandwidth, Base rate, Bear trap, Bearish engulfing, Bollinger Bands, Bounded indicator, Break of structure, Breakaway gap, Breakout, Broadening formation, Bull trap, Bullish engulfing, Candlestick, Candlestick pattern, Channel, Chart hygiene, Chart pattern, Climax volume, Close, Commodity channel index, Confirmation, Confluence, Consolidation, Continuous contract, Corporate action, Cost of lag, Crossover, Cup and handle, Dark cloud cover, Death cross, Descending triangle, Directional movement, Displaced moving average, Distribution, Divergence, Doji, Double bottom, Double counting, Double top, Dragonfly doji, Evening star, Exhaustion gap, Exponential moving average, Falling wedge, False breakout, Flag, Flagpole, Formation period, Four-price doji, Gap fill, Golden cross, Gravestone doji, Hammer, Handle, Hanging man, Harami, Head and shoulders, Heikin-Ashi, Hidden divergence, Higher high, Higher low, Hindsight bias, Indicator family, Indicator threshold, Inside bar, Invalidation level, Inverse head and shoulders, Inverse volatility weighting, Inverted hammer, Keltner channel, Key reversal bar, Lag, Line chart, Linear scale, Logarithmic scale, Long-legged doji, Lookback period, Low-volume node, Lower high, Lower low, MACD, MACD histogram, MACD signal line, Market structure, Marubozu, Mean reversion, Measured move, Momentum, Money flow, Morning star, Moving average, Moving average envelope, Moving average ribbon, Moving average slope, Multi-timeframe analysis, Neckline, Noise, Non-confirmation, OHLC, On-balance volume, Opening range, Oscillator, Outside bar, Overbought, Oversold, Parameter plateau, Parameter sensitivity, Parkinson estimator, Pattern failure, Pattern height, Pennant, Percent B, Piercing line, Point of control, Prior-day high and low, Pullback, Range, Range expansion, Rate of change, Ratio chart, Real body, Realised volatility, Rectangle, Rejection, Relative strength, Relative strength index, Renko chart, Repainting, Resistance, Retest, Reversal, Rising wedge, Rolling window, Round number, Rounded base, Runaway gap, Shadow, Shooting star, Signal, Signal line crossover, Simple moving average, Slow stochastic, Smoothing factor, Smoothing half-life, Spinning top, Standard deviation, Stochastic %D, Stochastic %K, Stochastic oscillator, Stop hunting, Support, Support zone, Survivorship bias, Swing point, Symmetrical triangle, Three black crows, Three white soldiers, Throwback, Tick volume, Timeframe, Trading range, Trend, Trendline, Triple top, True range, Typical price, Value area, Visual overfitting, Volatility, Volatility clustering, Volatility contraction, Volatility of volatility, Volatility regime, Volatility targeting, Volume, Volume dry-up, Volume profile, Volume spike, VWAP, Weighted moving average, Whipsaw, Wick, Wilder smoothing.

**Market structure (153):** Adverse selection, All-in cost, All-or-none order, Arrival price, Ask, Auction imbalance, Average daily volume, Average fill price, Basis point, Best execution, Bid, Bid-ask spread, Borrow fee, Bracket order, Broker, Buy to cover, Buy-in, Buying power, Capitalisation-weighted index, Carry, Cash account, Central counterparty, Chasing, Circuit breaker, Clearing house, Closing auction, Collateral, Commission, Common stock, Conditional order, Counterparty risk, Cross-listing, Currency risk, Dark pool, Day order, Days to cover, Delivery versus payment, Depth of market, Dual-class shares, Effective spread, Equity, Ex-dividend date, Execution algorithm, Extended-hours trading, Failure to deliver, Fat-finger error, Fill, Fill-or-kill, Forced liquidation, Free-riding, Gap, Good-faith violation, Good-til-cancelled, Good-til-date, Guaranteed stop, Hard to borrow, House requirement, Hypothecation, Iceberg order, Immediate-or-cancel, Implementation shortfall, Index reconstitution, Index weighting, Informed trading, Initial margin, Institutional investor, Internalisation, Inventory risk, Investor protection scheme, Know your customer, Last price, Leverage, Limit order, Limit state, Limit up-limit down, Liquidity, Locate, Maintenance margin, Maker-taker, Margin, Margin account, Margin call, Margin cushion, Margin interest, Market breadth, Market impact, Market maker, Market order, Market-on-close order, Marketable limit order, Mid price, Netting, Novation, One-cancels-other, One-triggers-other, Opening auction, Order book, Order routing, Order ticket, Overnight risk, Partial fill, Participation rate, Pattern day trader, Payment for order flow, Payment in lieu, Permanent impact, Portfolio margin, Post-only order, Price adjustment, Price discovery, Price improvement, Primary market, Proprietary trading firm, Quote, Quoting obligation, Ratchet, Realised spread, Recall, Regulation SHO, Rehypothecation, Round trip, Secondary market, Security, Settled cash, Settlement, Short interest, Short rebate, Short selling, Short squeeze, Slippage, Stale order, Stamp duty, Stock borrow, Stock exchange, Stock index, Stop order, Stop-limit order, Stop-loss, T+1 settlement, Take-profit order, Temporary impact, Tick size, Time in force, Total return, Total return index, Traded value, Trading halt, Trading session, Trailing stop, Transaction costs, TWAP, Voting rights, Working order.

**Risk, portfolios and behaviour (142):** Action bias, Anchoring, Asset allocation, Availability bias, Averaging down, Backtest, Base rate neglect, Benchmark, Beta, CAGR, Calibration, Calmar ratio, Capacity, Capital gains tax, Cash drag, Checklist, Compounding, Concentration, Conditional value at risk, Confirmation bias, Correlation, Correlation breakdown, Covariance, Cross-validation, Currency hedge ratio, Data snooping, Deflated Sharpe ratio, Degrees of freedom, Disposition effect, Diversification, Drawdown, Edge, Effect size, Efficient frontier, Endowment effect, Expectancy, Factor, Factor crowding, Factor exposure, Factor loading, Falsifiability, Fat tail, Fear of missing out, Fixed fractional sizing, Forced seller, Fund overlap, Gambler’s fallacy, Glide path, Herding, Home bias, Idiosyncratic risk, Illusion of control, Implementation intention, In-sample, Information ratio, Investing, Kelly criterion, Look-ahead bias, Look-through analysis, Loss aversion, Loss limit, Low volatility factor, Maximum drawdown, Mental accounting, Model decay, Momentum factor, Money-weighted return, Multiple testing, Narrative bias, Negative balance, Normal distribution, Out-of-sample, Outcome bias, Overconfidence, Overfitting, Overtrading, Paper trading, Percentage return, Point-in-time data, Portfolio heat, Position sizing, Pre-commitment, Pre-registration, Process quality, Profit factor, Publication bias, Pyramiding, Quality factor, R unit, Rebalancing, Rebalancing band, Rebalancing premium, Recency bias, Recovery return, Regime dependence, Replication, Revenge trading, Risk, Risk budget, Risk decomposition, Risk of ruin, Risk parity, Risk per trade, Risk policy, Risk-reward ratio, Rolling correlation, Safe withdrawal rate, Sample size, Scaling in, Scaling out, Selection bias, Sequence risk, Sharpe ratio, Sixty-forty portfolio, Size factor, Slippage assumption, Sortino ratio, Speculation, Stop placement, Strategic asset allocation, Structural break, Sunk cost, Systematic risk, Tactical allocation, Tail risk, Tax lot, Tax-advantaged account, Thesis, Thesis drift, Tilt, Time horizon, Time-weighted return, Trading journal, Trading plan, Turnover, Underwater curve, Value at risk, Value factor, Variance, Walk-forward analysis, Wash sale, Win rate.

**Fundamentals and valuation (123):** Accrual, Accruals ratio, Acquisition, Adjusted earnings, All-stock deal, Amortisation, Assets, Balance sheet, Bill and hold, Break fee, Business cycle, Capital allocation, Capital expenditure, Capitalised cost, Carve-out, Cash conversion cycle, Cash flow statement, Cash in lieu, Channel stuffing, Churn, Comparable company, Competitive advantage, Contingent liability, Contribution margin, Corporate governance, Cost of equity, Covenant, Cyclicality, Cyclically adjusted earnings, Days sales outstanding, Deal spread, Declaration date, Defensive sector, Deferred revenue, Depreciation, Discount rate, Discounted cash flow, Discretionary spending, Dividend, Dividend cover, Dividend cut, Dividend discount model, Dividend reinvestment plan, Dividend yield, Earnings announcement, Earnings quality, Earnings yield, EBITDA, Economic moat, Empire building, Enterprise value, Equity risk premium, Equity value, EV/EBITDA, Fixed cost, Forward price-earnings, Free cash flow, Free cash flow to equity, Goodwill, Gross margin, Guidance, Impairment, Incentive alignment, Income statement, Incremental return on capital, Insider, Intrinsic value, Inventory cycle, Inventory turnover, Lease obligation, Leverage ratio, Liabilities, Maintenance capital expenditure, Margin of safety, Market capitalisation, Merger, Multiple expansion, Net debt, Net interest margin, Network effect, Non-GAAP measure, Off-balance-sheet, Operating cash flow, Operating leverage, Operating margin, Payment date, Payout ratio, Perpetuity growth rate, Pre-mortem, Price taker, Price-earnings ratio, Price-to-book, Price-to-sales, Pricing power, Record date, Recurring revenue, Red flag, Reinvestment rate, Reinvestment runway, Related-party transaction, Relative valuation, Restatement, Return on invested capital, Revenue, Revenue recognition, Reverse discounted cash flow, Scale advantage, Scenario analysis, Scrip dividend, Sector, Sensitivity analysis, Shareholders equity, Special dividend, Spin-off, Switching costs, Takeover premium, Terminal value, Unit economics, Valuation, Valuation range, Weighted average cost of capital, Withholding tax, Working capital.

**Derivatives (102):** American-style option, Approval level, Assignment, At the money, Backwardation, Black-Scholes, Breakeven, Butterfly, Buy-write, Buying power reduction, Calendar spread, Call option, Cash settlement, Cash-secured put, Charm, Collar, Commodity, Contango, Contract multiplier, Covered call, Credit spread (options), Dealer hedging, Debit spread, Defined risk, Delta, Delta hedging, Delta-neutral, Diagonal spread, Dividend assignment risk, Early exercise, European-style option, Exercise, Exercise by exception, Expiration cycle, Expiration date, Extrinsic value, Forward volatility, Futures contract, Gamma, Gamma exposure, Gamma scalping, Greeks, Holder, Implied volatility, In the money, Iron butterfly, Iron condor, Lambda, Lognormal assumption, Mark price, Married put, Model risk, Moneyness, Naked option, Notional value, Open interest, Option chain, Option contract, Option intrinsic value, Option pricing model, Out of the money, Physical settlement, Pin risk, Portfolio greeks, Premium, Premium selling, Protective put, Put option, Put-call parity, Ratio spread, Reflexivity, Rho, Risk reversal, Risk-free rate, Roll yield, Rolling, Short gamma, Spread width, Sticky delta, Straddle, Strangle, Strike interval, Strike price, Tail hedge, Term structure, Theta, Time value, Undefined risk, Underlying, Vanna, Variance risk premium, Vega, Vertical spread, Volatility crush, Volatility skew, Volatility smile, Volatility surface, Vomma, Weekend decay, Wing, Writer, Zero-cost collar.

**Macro and economics (61):** Advance estimate, Average hourly earnings, Base and quote currency, Base effect, Benchmark revision, Breakeven inflation rate, Capital flows, Carry trade, Central bank, Consensus estimate, Consensus forecast, Constant currency, Consumer price index, Consumer sentiment, Core inflation, Cross-market confirmation, Currency mismatch, Currency-hedged fund, Curve steepening, Data revision, Data vintage, Diffusion index, Economic surprise, Establishment survey, Foreign exchange, Forward guidance, Good news is bad news, Gross domestic product, Housing starts, Inflation, Interest rate risk, Labour force participation, Lock-in effect, Macroeconomic release, Market-implied expectation, Neutral rate, Nonfarm payrolls, PCE price index, Policy rate, Positioning, Purchasing managers index, Quantitative easing, Real interest rate, Real versus nominal, Real-time data problem, Recession, Recession dating, Reinvestment risk, Retail sales, Revision, Seasonal adjustment, Standardised surprise, Sticky prices, Term premium, Terms of trade, Transaction exposure, Translation exposure, Uncovered interest parity, Unemployment rate, Yield curve, Yield curve inversion.

**Fixed income (31):** Accrued interest, Bankruptcy, Bear steepening, Bond, Bond fund, Bond ladder, Breakeven inflation, Callable bond, Capital stack, Clean price, Convertible bond, Convexity, Coupon, Credit risk, Credit spread, Current yield, Debt-for-equity swap, Default, Delisting, Duration, Expectations hypothesis, Face value, Financial conditions, Flight to quality, Forward rate, Modified duration, Portfolio duration, Preferred share, Real yield, Yield to maturity, Yield to worst.

**Funds (22):** Authorised participant, Closed-end fund, Creation and redemption, Creation unit, Daily reset, Depositary receipt, Exchange-traded fund, Exchange-traded note, Expense ratio, Fee drag, In-kind transfer, Index fund, Inverse fund, Leveraged fund, Mutual fund, Net asset value, Premium or discount to NAV, Real estate investment trust, Synthetic ETF, Tracking difference, Tracking error, Volatility decay.

**Hedge funds and private markets (19):** Arbitrage, Asset manager, Basis, Crowded trade, Deleveraging, Global macro, Gross exposure, Hedge fund, Long-short equity, Managed futures, Mandate, Merger arbitrage, Net exposure, Pairs trade, Prime broker, Redemption, Redemption gate, Statistical arbitrage, Trend following.

**Dilution and share structure (14):** Buyback yield, Dilution, Earnings per share, Free float, Fully diluted share count, Net buyback, Reverse split, Share, Share buyback, Shares outstanding, Stock split, Stock-based compensation, Tender offer, Treasury shares.

**Regulation and history (12):** Balance-sheet reduction, Bond repricing, Contagion, Index concentration, Liquidity crisis, Market closure, Sector dispersion, Securitisation, Solvency, Taper, Valuation expansion, Wholesale funding.

**IPOs and capital raising (6):** Initial public offering, Lock-up period, Rights issue, Secondary offering, Subscription price, Theoretical ex-rights price.

## 7. Market history and case studies

**Market history** (`src/content/trading/history/`): 18 cases from 1990 to the end of 2025. Each measurement carries a window, a unit and a method; unavailable figures are explicit. The charts are synthetic "historical-inspired" series rebased to 100 (`history/figure-kit.ts`) and must never be shown on the website as historical data.

| Id | Title | Window | Measurements (value / unavailable) | Companies named | Sources (app ids) |
| --- | --- | --- | --- | --- | --- |
| hc-1990-recession | The 1990 to 1991 recession and the recovery that reached employment last | 1990-01-01 to 1992-12-31 | 9 (7 / 2) | - | nber-cycles, bls-employment-situation, bls-cps, bea-gdp, bls-cpi, fed-open-market-history, fomc-calendar, eia-petroleum, data-licensing-note |
| hc-1994-tightening | The 1994 tightening cycle and the year a bondholder lost money | 1993-12-01 to 1995-12-31 | 8 (7 / 1) | The Procter and Gamble Company; Gibson Greetings, Inc. | fed-open-market-history, fomc-calendar, treasury-yield-curve, fed-h15, bls-cpi, nber-cycles, sec-edgar, finra-bonds, data-licensing-note |
| hc-1990s-internet | The late 1990s internet expansion, to the end of 1999 | 1995-01-01 to 1999-12-31 | 8 (5 / 3) | Netscape Communications Corporation; Amazon.com, Inc.; Cisco Systems, Inc. | sec-edgar, sec-financial-reporting, fed-open-market-history, fomc-calendar, treasury-yield-curve, bls-employment-situation, bls-cpi, bea-gdp, wsts-semiconductor, sia-factbook, data-licensing-note |
| hc-1997-asia | The 1997 Asian crisis and the cost of a borrowed currency | 1997-01-01 to 1998-12-31 | 9 (5 / 4) | - | imf-asia-1997, imf-weo, bis-annual-report, fed-h10, fred-exchange-rates, fed-open-market-history, fomc-calendar, treasury-yield-curve, bls-employment-situation, data-licensing-note |
| hc-1998-ltcm | Russia 1998, leverage, and a fund that was right too early | 1998-06-01 to 1998-12-31 | 8 (6 / 2) | Long-Term Capital Management, L.P. | pwg-ltcm-1999, fed-history-ltcm, fed-open-market-history, fomc-calendar, treasury-yield-curve, fed-h15, fed-fsr, imf-weo, data-licensing-note |
| hc-2000-dotcom-bust | The technology decline of 2000 to 2002 | 2000-03-01 to 2002-10-31 | 8 (5 / 3) | Pets.com, Inc.; Webvan Group, Inc.; Enron Corporation; WorldCom, Inc.; Amazon.com, Inc. | nber-cycles, fed-open-market-history, fomc-calendar, bls-employment-situation, sec-edgar, shiller-nobel-lecture, data-licensing-note |
| hc-2001-recession-sept11 | The 2001 recession and the September market closure | 2001-03-01 to 2001-11-30 | 8 (6 / 2) | - | nber-cycles, nyse-hours, sec-2001-actions, fed-open-market-history, fomc-calendar, bls-employment-situation, bea-gdp |
| hc-2004-housing-boom | A measured tightening and the housing and credit expansion | 2004-06-30 to 2006-12-31 | 8 (6 / 2) | New Century Financial Corporation; Countrywide Financial Corporation; Federal National Mortgage Association and Federal Home Loan Mortgage Corporation | fed-open-market-history, fomc-calendar, fed-monetary-policy, treasury-yield-curve, fed-h15, census-housing, bls-employment-situation, fcic-report, minsky-archive, data-licensing-note |
| hc-2007-financial-crisis | The financial crisis of 2007 to 2009 | 2007-08-09 to 2009-03-31 | 9 (6 / 3) | BNP Paribas; The Bear Stearns Companies Inc.; Lehman Brothers Holdings Inc.; American International Group, Inc.; The Reserve Primary Fund; Washington Mutual, Inc. | fcic-report, stlouisfed-crisis-timeline, fed-open-market-history, fomc-calendar, fed-balance-sheet, fed-fsr, nber-cycles, bls-employment-situation, treasury-auctions, minsky-archive, data-licensing-note |
| hc-2009-recovery | The 2009 trough and the first stage of the recovery | 2009-03-09 to 2010-12-31 | 11 (9 / 2) | General Motors Corporation; Chrysler LLC | nber-cycles, bls-employment-situation, bls-cpi, census-housing, fomc-calendar, fed-open-market-history, fed-balance-sheet, stlouisfed-crisis-timeline, fcic-report, investor-gov-compound, data-licensing-note |
| hc-2010-euro-crisis | The euro-area sovereign debt period, 2010 to 2012 | 2010-04-23 to 2012-12-31 | 8 (6 / 2) | - | ecb-policy, ecb-history, esm-history, imf-weo, bis-annual-report, data-licensing-note |
| hc-2013-taper-tantrum | The 2013 taper episode: a change in language, not in policy | 2013-05-01 to 2013-12-31 | 7 (5 / 2) | - | treasury-yield-curve, fed-h15, fomc-calendar, fed-speeches, fed-open-market-history, bis-annual-report |
| hc-2015-2018-tightening | The slow tightening cycle, 2015 to 2018, and the fourth quarter of 2018 | 2015-12-16 to 2018-12-31 | 9 (7 / 2) | - | fed-open-market-history, fomc-calendar, fed-balance-sheet, treasury-yield-curve, bls-employment-situation, data-licensing-note |
| hc-2019-pivot | The 2019 reversal: a cycle undone within a year of its last step | 2018-12-19 to 2019-12-31 | 8 (7 / 1) | - | fed-open-market-history, fomc-calendar, treasury-yield-curve, fed-h15, bls-employment-situation, fed-balance-sheet, nber-cycles |
| hc-2020-covid | February 2020 to December 2020: the fastest fall, and a recovery that was almost as fast | 2020-02-19 to 2020-12-31 | 10 (8 / 2) | - | fed-covid-response, fomc-calendar, fed-open-market-history, fed-balance-sheet, treasury-yield-curve, fed-h15, bls-employment-situation, bea-gdp, nber-cycles, eia-petroleum, fed-fsr, data-licensing-note |
| hc-2021-reopening | 2021: reopening demand, constrained supply, and an argument about the word transitory | 2021-01-01 to 2021-12-31 | 10 (8 / 2) | - | bls-cpi, bls-employment-situation, fomc-calendar, fed-open-market-history, fed-speeches, census-retail, bea-gdp, imf-weo, bis-annual-report, wsts-semiconductor, data-licensing-note |
| hc-2022-inflation | 2022: the most rapid tightening cycle since the early 1980s, and the year the offset failed | 2022-01-01 to 2025-12-31 | 15 (13 / 2) | - | fed-open-market-history, fomc-calendar, fed-monetary-policy, fed-balance-sheet, treasury-yield-curve, fed-h15, bls-cpi, bls-employment-situation, eia-petroleum, fdic-2023-review, fed-fsr, bea-gdp, data-licensing-note |
| hc-2023-ai-semis | 2023 to 2025: a computing capital-spending boom, and an industry that did not move as one | 2023-01-01 to 2025-12-31 | 7 (3 / 4) | NVIDIA Corporation; Micron Technology, Inc.; Advanced Micro Devices, Inc.; Intel Corporation; Taiwan Semiconductor Manufacturing Company Limited; Samsung Electronics Co., Ltd.; SK hynix Inc. | sec-edgar, wsts-semiconductor, sia-factbook, treasury-yield-curve, fed-h15, fomc-calendar, fed-open-market-history, bea-gdp, imf-weo, data-licensing-note |

**Case studies** (`src/content/trading/case-studies.ts`): 11 dated episodes, reviewed 2026-09-06, each with "what would have failed".

| Id | Title | Period | Sources (app ids) | Linked scenario |
| --- | --- | --- | --- | --- |
| cs-1987-crash | The October 1987 crash and the hedge that had to be sold | September to November 1987, United States and global | fed-history-1987, brady-report-1988, finra-market-volatility, sec-market-structure, nber-cycles | sc-risk-gap-risk |
| cs-japan-derating | Japan, 1989 to 2003, and a decline measured in decades | Approximately 1989 to 2003, Japan | boj-imes-bubble, boj-statistics, imf-weo, fed-fsr, investor-gov-diversify | sc-long-term-crisis-hold |
| cs-dotcom | The technology and telecommunications boom and bust | Approximately 1995 to 2002, United States and global | sec-market-structure, nber-cycles, investor-gov-basics, sec-financial-reporting | - |
| cs-ltcm-1998 | Long-Term Capital Management, 1998: leverage and correlation | January to December 1998, United States and global | pwg-ltcm-1999, fed-history-ltcm, finra-margin, sec-form-pf, imf-weo | sc-risk-margin-call |
| cs-gfc | The 2007 to 2009 financial crisis | Approximately 2006 to 2009, United States and global | fcic-report, fed-fsr, nber-cycles, sec-market-structure, finra-margin | - |
| cs-flash-crash-2010 | The flash crash of 6 May 2010 and the mechanics of a price | 6 May 2010, United States equity markets | sec-2010-flash-crash, sec-hft-concept, finra-order-types, sec-trade-execution, finra-market-volatility, sec-mutual-funds-etfs | sc-day-thin-book |
| cs-2011-downgrade | The 2011 downgrade and the bond market that went the other way | January to December 2011, United States and global | gao-debt-limit-2012, treasury-yield-curve, fed-h15, fed-fsr, imf-weo | sc-risk-correlation-trap |
| cs-covid | The 2020 pandemic market disruption | February to April 2020, global | fed-covid-response, nber-cycles, fed-fsr, bea-gdp, bls-ces | - |
| cs-meme-2021 | The crowded short position of January 2021 | January to March 2021, United States | sec-meme-2021, sec-reg-sho, finra-margin, occ-odd, sec-market-structure | sc-swing-short-side |
| cs-2022-inflation | The 2022 inflation and rate adjustment | Approximately 2021 to 2023, United States and global | bls-cpi, fed-monetary-policy, treasury-yield-curve, ecb-policy, bea-gdp, imf-weo | - |
| cs-2023-banking | The 2023 regional banking stress | March to May 2023, United States and Switzerland | fdic-2023-review, fed-fsr, treasury-yield-curve, sec-financial-reporting, finra-bonds | - |

## 8. Pattern Trainer, Strategy Lab, scenarios and reference content

- **Pattern Trainer** (`app/pattern-trainer.tsx`, `src/content/trading/chart-exercises.ts`): 190 exercises built from 38 chart families; kinds pattern-id 30, next-move 30, level-read 50, indicator-read 50, risk-plan 30; difficulty intro 38, core 76, advanced 76; 54.7% failed or ambiguous by construction (a load-time guard requires at least 20%). The chart hides every bar and indicator value after the decision point, asks for a decision and confidence, then scores reasoning, risk plan and direction separately. Units: unit-9 55, unit-8 40, unit-12 20, unit-11 15, unit-13 25, unit-17 20, unit-7 5, unit-10 10. Website decision: technical-analysis pages rejected (FIN-R17..R22); the trainer may be described on the app page only.
- **Strategy Lab** (`app/strategy-lab.tsx`, `src/kernel/finance/backtest.ts`): four rules (buy and hold, 10/30 moving-average cross, RSI(14) mean reversion, 20-bar breakout) on six seeded market shapes (trending up, trending down, range-bound, choppy, crisis, recovery), each split into training and test halves. Signals fill at the next bar's open; the bar accessor throws on any forward index.
- **Strategy playbooks** (`src/content/trading/strategies.ts`): 42; families passive 10, income 7, factor 6, systematic 9, discretionary 4, event-driven 2, hedging 4; evidence grades well-documented 8, mixed 26, limited 3, disputed 5. Comparison metrics: Total return, Return versus benchmark, Volatility, Maximum drawdown, Sharpe ratio, Sortino ratio, Win rate, Average win, Average loss, Expectancy per trade, Profit factor, Turnover, Cost drag, Capital required, Time commitment, Tail risk. Website decision: rejected as pages (FIN-R27).
- **Scenarios** (`src/content/trading/scenarios.ts`): 103; by mode guided-first-trade 3, free-practice 6, day-trading 9, swing-trading 16, long-term 18, risk-management 14, options-lab 17, event-study 9, opponent-challenge 11; by difficulty intro 9, core 48, advanced 46.
- **Concept explainers** (`src/content/trading/investors.ts`, 28): Margin of safety; Circle of competence; Owner earnings; Mental models and inversion; Why costs matter more than they look; The arithmetic of active management; Cycles and the pendulum; Second-level thinking; Risk parity in plain terms; Diversification, the only free lunch; The equity risk premium; Efficient markets as a spectrum; Why a stop is not a guarantee; Delta is not a probability; Volatility is not direction; What an index actually measures; Why past performance tables mislead; What liquidity means, and when it disappears; Why correlation rises in a crisis; What the spread actually costs you; Why leverage changes the arithmetic of recovery; Survivorship bias; What a backtest cannot tell you; Counting tickers is not diversifying; What dividends and splits do to a price chart; What settlement actually is; Why the average return is not the return you got; How many trades before a result means anything.
- **Checklists** (`src/content/trading/checklists.ts`, 23): Pre-trade plan (12); Order entry double-check (10); Risk check before sizing (9); Thesis review (9); Earnings and event check (8); Reading a results announcement (10); Before acting on news (9); Options approval readiness (11); Expiry and assignment week (10); Short position check (9); Portfolio review (9); Monthly rebalancing (8); Fund and ETF selection (10); Periodic risk review (9); Backtest validity (10); Valuation model sanity check (9); Adopting a new rule (10); Weekly preparation (8); Post-trade review (9); Journal quality audit (10); Drawdown response (10); When you feel the urge to trade (10); Records and tax housekeeping (9).
- **Investor profiles** (18, third-party persons; not for website use): Warren Buffett; Charlie Munger; Benjamin Graham; John C. Bogle; Peter Lynch; Howard Marks; Ray Dalio; Harry Markowitz and William Sharpe; Eugene Fama, Kenneth French and the factor literature; Andrew Lo and the adaptive markets literature; Daniel Kahneman, Amos Tversky and the decision-research programme; Brad Barber, Terrance Odean and the individual-account literature; Bailey, Borwein, Lopez de Prado, Zhu and the backtest-overfitting literature; Fischer Black, Myron Scholes, Robert Merton and the option-pricing framework; Cheol-Ho Park, Scott Irwin and the technical-trading evidence; Robert Shiller; Hyman Minsky; The official equity market structure studies.
- **Economic indicators** (36, release histories are simulated): cpi, pce, ppi, payrolls, unemployment, wages, gdp, retail-sales, pmi, consumer-sentiment, policy-rate, yield-curve, credit-spreads, financial-conditions, oil, dollar-index, earnings-growth, import-prices, jobless-claims, job-openings, employment-cost, participation, productivity, industrial-production, durable-orders, housing-starts, trade-balance, leading-index, breakeven-inflation, real-yield, implied-volatility, lending-standards, delinquency-rate, money-supply, gold, copper.
- **Indicator guide** (14): sma20, sma50, sma200, ema9, ema20, ema50, ema200, bollinger, vwap, rsi14, macd, atr14, stoch, volume.
- **Opponents** (7, rule-based, cannot see future bars): Steady Hold (buy-and-hold); Drip Feed (dollar-cost-average); Trend Rider (trend-following); Snap Back (mean-reversion); Range Breaker (breakout); Even Keel (risk-parity-lite); Busy Hands (overtrader).

## 9. Calculators and tools (35)

Definitions: `src/content/trading/tools.ts`; implementations: `src/ui/tools/calculators.ts`, `src/ui/tools/calculators-extra.ts`; arithmetic: `src/kernel/finance/*.ts`. Inputs are the field labels; outputs are the result labels produced by running each calculator on its documented defaults. Every tool renders its assumptions beside its result. "Authority" is the standard the formula rests on; only S-numbered pages were opened by agent 5.

| Tool id | Title | Category | Inputs | Outputs | Formula(s) | Authority | Website decision |
| --- | --- | --- | --- | --- | --- | --- | --- |
| position-size | Position Size from a Stop | position | Account equity; Risk per trade; Entry price; Stop price; Cost per share; Concentration cap | Shares; At risk; Position value; Of account | Risk per share: entry − stop  (long)   \|   stop − entry  (short) / Account risk: account equity × risk % / Shares: floor( account risk ÷ risk per share ) / Position value: shares × entry | Fixed-fractional sizing arithmetic (identity); no external standard | FIN-R46 |
| portfolio-heat | Portfolio Heat and Correlated Risk | risk | Account equity; Open positions; Assumed correlation | Total heat; If every stop hits; If risks were independent; At correlation 0.70; Positions | Heat: Σ planned loss ÷ equity / Correlated worst case: Σ planned loss (every stop hit together) | Sum of planned losses; correlation case uses Markowitz (1952) portfolio variance | FIN-R46 |
| reward-risk | Reward:Risk and Break-Even Win Rate | risk | Entry; Stop; Target; Cost per share | Reward : risk; After costs; Break-even win rate; Risk per share; Reward per share | R multiple: (target − entry) ÷ (entry − stop) / Break-even win rate: 1 ÷ (1 + R) | Identity: R = reward / risk; break-even win rate 1 / (1 + R) | FIN-R46 |
| expectancy | Expectancy and Profit Factor | risk | Win rate; Average win; Average loss; Trades | Expectancy per trade; In R; Profit factor; Over 100 trades; Break-even win rate | Expectancy: (win rate × average win) − (loss rate × average loss) / Profit factor: gross profit ÷ gross loss | Identity: probability-weighted mean; profit factor is a convention | FIN-R46 |
| drawdown-recovery | Drawdown and Recovery | risk | Drawdown; Assumed annual return | Gain needed to recover; Years at that rate | Required gain: d ÷ (1 − d) / Years to recover: ln(1 ÷ (1 − d)) ÷ ln(1 + r) | Identity d / (1 - d); years via compound growth (method of S29) | FIN-T02 (tool) + FIN-A26 |
| risk-of-ruin | Risk of Ruin Explorer | risk | Win rate; Reward : risk; Risk per trade; Trades; Ruin threshold | Chance of ruin; Median ending balance; Ruined paths; Ruin defined as | Per-trade outcome: +R × risk  with probability p,   −risk  otherwise / Ruin: equity falls below the stated threshold at any point | Seeded Monte Carlo of fixed-fraction bets (app model, no closed form claimed) | FIN-R46 |
| atr-stop | ATR Stop and Size | position | ATR; ATR multiple; Entry price; Account equity; Risk per trade; Direction | Stop price; Stop distance; As % of entry; Shares; At risk | True range: max(high − low, \|high − prev close\|, \|low − prev close\|) / Stop distance: k × ATR(n) | True range / ATR as defined by J. Welles Wilder (1978); not cited by the app | FIN-R46 |
| allocation-builder | Allocation Builder | portfolio | Holdings; Position cap | Portfolio value; Largest position; Top three; Holdings | Weight: position value ÷ portfolio value / Concentration: largest weight, and the sum of the top n | Weights (identity) | FIN-R49 |
| rebalance | Rebalance Calculator | portfolio | Current values; Target weights (%); Drift band; Cost per trade | Trades needed (threshold); Cost of that; Trades if rebalancing everything; Cost of that | Drift: current weight − target weight / Trade: (target weight × portfolio value) − current value | Trade = target weight x value - current value; concept per S21 | FIN-R49; example in FIN-A22 |
| correlation | Correlation and Diversification | portfolio | Series A returns (%); Series B returns (%); Weight in A | Correlation; Volatility of A; Volatility of B; Blended volatility; Diversification benefit | Two-asset variance: w₁²σ₁² + w₂²σ₂² + 2w₁w₂ρσ₁σ₂ / Portfolio volatility: √(wᵀ Σ w) | Pearson correlation; two-asset variance (Markowitz 1952) | FIN-R50; example in FIN-A21 |
| fund-overlap | Fund Overlap Checker | portfolio | Fund A holdings; Fund B holdings | Overlap by weight; Shared holdings | Overlap by weight: Σ min(wᴬᵢ, wᴮᵢ) / Combined weight: Σ (fund weight × holding weight) | Sum of minimum weights, an industry convention; no regulatory authority | FIN-R50 |
| monte-carlo | Monte Carlo Portfolio Explorer | portfolio | Starting value; Expected annual return; Annual volatility; Years; Monthly contribution; Paths | Median outcome; Worst 5%; 25th percentile; 75th percentile; Best 5%; Median worst drawdown | Step: Vₜ₊₁ = Vₜ × exp((μ − σ²/2)Δt + σ√Δt · z) + contribution / Percentile band: the nth percentile of terminal values across paths | Discretised geometric Brownian motion (standard Black-Scholes-Merton dynamics) | FIN-R49 |
| sequence-risk | Sequence-of-Returns Explorer | portfolio | Annual returns (%); Starting balance; Annual withdrawal | As entered; Reversed; Worst years first; Best years first; Spread from order alone | With cash flow: Vₜ₊₁ = (Vₜ + cashflow) × (1 + rₜ) / Order sensitivity: range of final values across permutations of the same returns | Recursion with cash flows (identity) | FIN-R49; example in FIN-A27 |
| compounding | Compounding and Contributions | performance | Starting balance; Annual return; Years; Contribution; Compounds per year | Final balance; You put in; Growth; Growth share | Lump sum: FV = PV × (1 + r/n)^(n·t) / Contributions: FV = PMT × [((1 + i)^N − 1) ÷ i] × (1 + i if paid at period start) | Time-value-of-money identities; public reference S29 (SEC calculator) | FIN-R45 (link to S29); example in FIN-A23 |
| real-return | Real and Nominal Returns | performance | Nominal return; Inflation; Years; Amount | Real return; Naive subtraction; Nominal after 20y; In today's money | Real return: (1 + nominal) ÷ (1 + inflation) − 1 / Approximation error: nominal − inflation  overstates the real return | Fisher relation (1 + n) / (1 + i) - 1; CPI from BLS (S37) | FIN-T03 (tool) + FIN-A25 |
| cagr | CAGR and Annualising | performance | Starting value; Ending value; Years | CAGR; Total return | CAGR: (end ÷ start)^(1 ÷ years) − 1 / Annualising: (1 + period return)^(periods per year) − 1 | Geometric annualisation (identity) | FIN-R50; example in FIN-A23 |
| sharpe-sortino | Sharpe and Sortino | performance | Periodic returns (%); Risk-free rate (annual); Periods per year; Sortino target (annual) | Sharpe; Sortino; Annualised excess return; Annualised volatility; Observations | Sharpe: (mean(r − rf) ÷ stdev(r − rf)) × √periods per year / Sortino: (mean(r − target) ÷ downside deviation) × √periods per year | Sharpe (1994) (app source sharpe-1994); Sortino convention not cited by the app | FIN-R50 |
| benchmark-compare | Benchmark Comparison | performance | Strategy returns (%); Benchmark returns (%); Periods per year | Strategy total; Benchmark total; Excess; Tracking error; Strategy max drawdown; Benchmark max drawdown | Excess return: strategy return − benchmark return / Tracking error: stdev(strategy − benchmark) × √periods per year | Excess return and tracking error (standard definitions) | FIN-R50 |
| round-trip-cost | Round-Trip Cost | market | Shares; Price; Spread; Commission per order; Slippage | Total cost; Break-even move; Per share; Spread cost; Slippage; Commission | Spread cost: shares × spread  (paid across the round trip) / Total cost: spread + commissions (×2) + slippage (×2) / Break-even move: total cost ÷ (shares × entry) | Cost arithmetic; spread concept per SEC trade-execution guide (S10) | FIN-R46; example in FIN-A03 |
| slippage-impact | Slippage and Market Impact | market | Order size (shares); Price; Average daily volume; Base slippage; Participation threshold; Impact coefficient | Estimated impact; In currency; Participation; Order value | Participation: order size ÷ average daily volume / Impact (bps): base + k × max(0, participation − threshold) | App-specific linear impact model above a participation threshold - a model, not a standard | FIN-R46; example in FIN-A03 |
| currency | Currency Conversion | utility | Amount; Exchange rate; Conversion fee | You receive; Before fee; Fee; Effective rate | Converted: amount × rate × (1 − fee) / Effective rate: converted ÷ amount | Identity; the app has no live rates | FIN-R50 |
| dcf | Discounted Cash Flow and Sensitivity | valuation | Free cash flows ($m); Discount rate; Terminal growth; Net debt ($m); Shares outstanding (m) | Value per share (range); Base case; Enterprise value; Equity value; From the terminal period | Present value: Σ FCFₜ ÷ (1 + r)ᵗ / Terminal (Gordon): FCF_{n+1} ÷ (r − g), discounted back n years / Equity value: enterprise value − net debt | Discounted cash flow with a Gordon terminal value (standard corporate finance) | FIN-R48 |
| multiples | Valuation Multiples | valuation | Share price; Shares (m); Total debt ($m); Cash ($m); Earnings per share; EBITDA ($m); Revenue ($m); Book value per share | Enterprise value; Market cap; P/E; EV/EBITDA; EV/Sales; P/B | Enterprise value: market cap + debt − cash / P/E: price ÷ earnings per share / EV/EBITDA: enterprise value ÷ EBITDA | Definitions; market cap per Investor.gov glossary (S62) | FIN-R48 |
| dividend-discount | Dividend Discount and Yield | valuation | Current annual dividend; Dividend growth; Required return; Earnings per share; Free cash flow per share | Value per share; Payout of earnings; Payout of free cash flow | Gordon growth: P = D₁ ÷ (r − g),  requires r > g / Payout ratio: dividends ÷ earnings,  and  dividends ÷ free cash flow | Constant-growth (Gordon) dividend discount model | FIN-R48 |
| roic-dupont | ROIC and DuPont | valuation | Operating profit ($m); Tax rate; Invested capital ($m); Reinvestment rate; Cost of capital | ROIC; NOPAT; Spread over cost of capital; Growth from reinvestment | ROIC: NOPAT ÷ invested capital,  NOPAT = EBIT × (1 − tax rate) / Growth: ROIC × reinvestment rate / DuPont: ROE = net margin × asset turnover × equity multiplier | ROIC = NOPAT / invested capital; DuPont identity | FIN-R48 |
| bond-calculator | Bond Price, Yield and Duration | fixed-income | Face value; Coupon rate; Yield; Years to maturity; Coupons per year; Yield change | Price; Macaulay duration; Modified duration; Convexity; Duration-only estimate; With convexity; Estimated new price | Price: Σ C ÷ (1 + y/m)^(m·t) + F ÷ (1 + y/m)^(m·T) / Modified duration: Macaulay duration ÷ (1 + y/m) / Price change: −D_mod × Δy + ½ × convexity × Δy² | Standard bond pricing; Macaulay duration, modified duration, convexity; concepts per FINRA (S67) | FIN-R50; example in FIN-A30 |
| option-pricer | Option Price and Greeks | options | Underlying price; Strike; Days to expiry; Implied volatility; Risk-free rate; Dividend yield; Type | Price per share; Per contract; Intrinsic; Extrinsic; Delta; Gamma; Theta / day; Vega / 1 vol pt; Rho / 1% rate | Call: S·e^(−qT)·N(d₁) − K·e^(−rT)·N(d₂) / d₁: [ln(S/K) + (r − q + σ²/2)T] ÷ (σ√T) / Theta shown: annual theta ÷ 365 / Vega shown: annual vega ÷ 100 | Black-Scholes (1973) with Merton (1973) dividend yield (app sources bsm-1973, merton-1973) | FIN-R47 |
| implied-vol | Implied Volatility Solver | options | Option price; Underlying price; Strike; Days to expiry; Risk-free rate; Dividend yield; Realised volatility; Type | Implied volatility; Realised volatility; Difference | Solve: find σ such that BS(σ) = market price / Bounds: max(0, S·e^(−qT) − K·e^(−rT)) ≤ call ≤ S·e^(−qT) | Black-Scholes inverted by bisection; no-arbitrage bounds (Merton 1973) | FIN-R47 |
| payoff-builder | Payoff Builder | options | Underlying price; Structure; Lower strike; Upper strike; Implied volatility; Days to expiry | Max profit; Max loss; Break-even; Net credit; Legs | Call value at expiry: max(0, S − K) − premium,  negated if short / Put value at expiry: max(0, K − S) − premium,  negated if short / Break-even: the underlying price where total payoff crosses zero | Expiry payoff definitions; OCC options disclosure document (app source occ-odd) | FIN-R47 |
| collateral | Collateral and Buying Power | options | Structure; Strike; Spread width; Net premium per share; Capital available | Per contract; Contracts you can afford; Cash tied up; Leftover capital; Premium collected; Max loss | Cash-secured put: strike × 100 × contracts / Covered call: 100 shares per contract / Vertical: (width × 100 − net credit) × contracts | Simplified requirement conventions; real requirements come from FINRA Rule 4210 and broker house rules | FIN-R47 |
| hedge-sizing | Hedge Sizing | options | Portfolio value; Beta to the hedge; Exposure to keep; Hedge instrument price; Put strike; Implied volatility; Days to expiry | Notional to hedge; Shares to sell; Put contracts; Cost of the puts; As % of portfolio; Put delta | Share hedge notional: portfolio value × beta × (1 − target exposure) / Put contracts: hedge notional ÷ (\|delta\| × 100 × underlying price) | Beta-weighted notional and delta (standard, simplified) | FIN-R47 |
| capital-planner | Capital Scenario Planner | planning | Capital; Underlying price; Implied volatility; Maximum acceptable loss; Concentration limit | Shares within your limit; Cost of those shares; Contracts they support; Cash left over; Loss on a 10% fall; Your stated limit | Affordable contracts: floor(capital ÷ collateral per contract) / Covered call break-even: share cost − premium received / Capped upside: (strike − entry + premium) × 100 per contract | App-specific scenario arithmetic | FIN-R47 |
| goal-planner | Contribution Goal Planner | planning | Target amount; Years; Starting balance; Assumed annual return | Monthly contribution needed; Total contributed; Growth needed | Required payment: PMT = (FV − PV(1+i)^N) × i ÷ ((1+i)^N − 1) | Annuity payment formula (time value of money) | FIN-R49 |
| journal-stats | Trade Statistics | performance | (screen) | (screen) | R multiple: net P&L ÷ planned risk / Expectancy in R: mean R across trades | Mean R multiple (identity); implemented on the Journal screen | screen, no page |
| backtest-lab | Backtest Lab | planning | (screen) | (screen) | Out-of-sample: parameters fixed on train, applied unchanged to test / Multiple testing: the best of n tried rules looks good by chance alone | Train/test discipline (Bailey, Borwein, Lopez de Prado and Zhu; app source); implemented as the Strategy Lab screen | screen; described in FIN-A33 |

## 10. Simulator mechanics

Summarised from the kernel source; constants are as written in code at commit `7bf9194`.

**Prices** (`src/kernel/market/engine.ts`, `regimes.ts`, `rng.ts`). Every price is generated on the device from a seed; the same seed gives the same bars everywhere. Per-bar returns combine a market factor, a sector factor and an idiosyncratic shock, plus market jumps and event gaps. One correlation dial per regime drives diversification: bull 0.34, bear 0.58, sideways 0.22, crisis 0.90, recovery 0.63, high-volatility 0.55. Guards: price floor $0.01; largest single-bar log return 0.45 before events; any impossible candle throws. Each bar has a deterministic intra-bar path (5 interpolation steps per leg) that orders are resolved against.

**Instruments** (`src/kernel/market/instruments.ts`). 233 fictional instruments (144 equities, 22 broad funds, 17 sector funds, 14 bond funds, 11 commodity funds, 16 international funds, 5 currency proxies, 4 volatility proxies). A reserved list blocks real tickers. Typical half-spreads by size tier: mega 1.5-5 bps, large 3-11 bps, mid 8-26 bps, small 20-62 bps, micro 45-120 bps; liquidity tiers deep/normal/thin; events widen spreads for the session.

**Order types and fills** (`src/kernel/market/orders.ts`). Market orders fill at the next bar's open plus half-spread, slippage and size impact - never at the last print. Limits fill only if the path trades through them, at the limit or better (gap opens give the better price; a traded-through limit fills at the limit). Stops become market orders at the trigger and fill at the path price there, so a gap fills at the gap. Stop-limits may trigger and never fill. Trailing stops update their mark step by step. When a stop and a target are reached inside one path step, the adverse fill is taken first and the fill rationale says so. Time in force: day, GTC, IOC, FOK. No order may take more than 12% of a bar's volume (the rest keeps working); modelled impact is capped at 600 bps. Order sides: buy, sell, sell-short, buy-to-cover.

**Costs** (`src/content/trading/scenario-kit.ts`). Cost model fields: commission per order, per share and per option contract; slippage bps; impact threshold and impact bps; margin rate. Presets used by scenarios:

| Preset | Per order | Per share | Per contract | Slippage (bps) | Impact threshold | Impact (bps) | Margin rate |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Zero commission | $0 | $0 | $0.65 | 2 | 2% of ADV | 35 | 9.0% |
| Flat | $4.95 | $0 | $0.75 | 2 | 2% | 35 | 9.0% |
| Per share | $1.00 | $0.005 | $0.65 | 2 | 3% | 30 | 8.5% |
| Expensive (cost lessons) | $9.95 | $0.01 | $1.25 | 9 | 1% | 60 | 11.5% |
| Thin market | $2.50 | $0.004 | $0.85 | 14 | 0.8% | 90 | 10.0% |

**Account, financing and margin** (`src/kernel/market/portfolio.ts`). Two independent equity calculations must agree or the simulator stops. Short-sale proceeds and option collateral are held as reserved cash, not spendable cash. Shorts accrue a daily borrow fee on market value; negative cash accrues daily margin interest; both use a 360-day year. Maintenance requirement: 25% of long value plus 30% of short value, which the code describes as round modelling numbers near the published US minimums, not broker house rules. Below it, positions are force-sold largest first at a 25 bps penalty until equity exceeds 1.1x the requirement.

**Options** (`src/kernel/market/options-trading.ts`, `src/kernel/finance/options.ts`). American-style, 100-share multiplier; exercise and assignment only at expiry (early assignment is taught but not simulated); option orders fill immediately at the displayed bid/ask; short options must be covered when opened (naked short calls and puts are refused). The chain is a model, not a market.

**Opponents and backtests** (`src/kernel/market/opponents.ts`, `src/kernel/finance/backtest.ts`). Seven rule sets shown in full before a challenge, each with declared weaknesses (the "overtrader" exists to show costs). The market view and the backtest window throw on any forward index, so look-ahead is structurally impossible.

**Labelling.** Every price-bearing figure carries a provenance badge: Simulated; Historical-inspired synthetic scenario; Illustrative example; Published figure.

## 11. App-side notes

Owner-only notes about the app's own content are kept outside this public repository. They do not lift or add to the Play blocker. For the website plan:

- Website pages cite only the re-opened pages in section 14, never the app's citations, and every source is a specific page, not a landing page.
- Counts, lessons and features come only from a re-extraction of the released build (section 19).
- A page may link an app lesson only after checking that the lesson states the current rule (section 17).
- Icon glyphs in the app are third-party (`@expo/vector-icons`), not Reign-owned media (section 16).

## 12. Proposed information architecture

**Principles**

1. One canonical URL per search intent; variants become sections or FAQs on that page.
2. Reuse the site's existing systems: `/blog/{slug}/` articles with the review labels, publish checks and build gates, `/blog/topics/{hub}/` hubs, `/apps/{slug}/` app pages. No parallel article tree.
3. URLs are permanent: GitHub Pages cannot issue 301s, so a slug chosen wrongly stays wrong. The app slug comes from the live Play title.
4. Structural pages exist only when they add something a listing cannot: a hub needs at least five published members and a published cornerstone; a tools index needs three live tools.
5. Everything below is gated on the app being live and verified.

```text
/apps/stock-trading-simulator-game/          app page - slug from live title            FIN-P01
/apps/category/finance-education/            category apps list (if adopted)            FIN-P02
/blog/category/finance-education/            category reading list (if adopted)         FIN-P02
/blog/topics/stock-market-basics/            hub, cornerstone FIN-A01                    FIN-H01
/blog/topics/investing-risk-and-returns/     hub, cornerstone FIN-A20                    FIN-H02
/blog/topics/financial-market-history/       hub, cornerstone FIN-C00                    FIN-H03
/blog/{slug}/                                38 articles + 1 glossary                     FIN-A*, FIN-C*
/tools/finance/{slug}/                       3 calculators (phase 2, new route type)     FIN-T01..T03
```

**Category decision (owner).** Option A, recommended: a new `finance-education` category, so finance pages carry their own standing copy, disclaimers and review rules instead of sitting under brain-training and history copy; cost: a `CategoryId` change, category copy and a catalog file, and a one-app category page that must earn its place with orientation copy. Option B: file the app under `education-brain` and rely on the three hubs; cheaper, but mixes YMYL finance with puzzle and history content. Either way the id becomes part of permanent URLs.

**Site prerequisites (code the owner must add; this agent did not touch `src/`):** a `finance` value for `DisclaimerKind` that renders both required disclosures; an ownership-disclosure component near every app CTA; hub entries in `src/data/hubs.ts` with `appSlug` = the live slug; a `/tools/finance/` route type with unit tests for FIN-T01..T03; a finance banned-phrase list in `scripts/preflight-articles.mjs`.

**Rejected IA patterns:** `/finance/` landing (FIN-R01), `/learn/investing/` tree (FIN-R02), one page per lesson (FIN-R03), per-term glossary pages (FIN-R04), early tools index (FIN-R05).

## 13. Candidate pages and decisions

| Type | Proceed when unblocked | Rejected |
| --- | --- | --- |
| App page | 1 | 0 |
| Category pages (pair) | 1 | 0 |
| Topic hubs | 3 | 0 |
| Articles | 38 | 41 |
| Glossary | 1 | 0 |
| Calculators | 3 | 6 |
| IA patterns | 0 | 5 |
| **Total** | **47** | **52** |

Priorities: P0 2, P1 9, P2 19, P3 17. No search volume is claimed for any query.

### 13.1 Proceed when unblocked

| Id | Type | Pri | URL | Primary query | Hub | Risk |
| --- | --- | --- | --- | --- | --- | --- |
| FIN-P01 | App page | P0 | /apps/stock-trading-simulator-game/ | stock trading simulator game | - | medium |
| FIN-P02 | Category pages | P0 | /apps/category/finance-education/ + /blog/category/finance-education/ | - | - | low |
| FIN-H01 | Topic hub | P2 | /blog/topics/stock-market-basics/ | - | stock-market-basics | low |
| FIN-H02 | Topic hub | P2 | /blog/topics/investing-risk-and-returns/ | - | investing-risk-and-returns | low |
| FIN-H03 | Topic hub | P3 | /blog/topics/financial-market-history/ | - | financial-market-history | low |
| FIN-A01 | Article | P1 | /blog/how-the-stock-market-works/ | how does the stock market work | stock-market-basics | medium |
| FIN-A02 | Article | P1 | /blog/stock-order-types-explained/ | stock order types | stock-market-basics | medium |
| FIN-A03 | Article | P1 | /blog/bid-ask-spread-and-trading-costs/ | bid-ask spread | stock-market-basics | low |
| FIN-A04 | Article | P1 | /blog/paper-trading-explained/ | paper trading | stock-market-basics | high |
| FIN-A05 | Article | P2 | /blog/trading-halts-and-circuit-breakers/ | stock market circuit breakers | stock-market-basics | low |
| FIN-A06 | Article | P2 | /blog/t-plus-1-settlement-explained/ | t+1 settlement | stock-market-basics | low |
| FIN-A07 | Article | P3 | /blog/extended-hours-trading-explained/ | after hours trading | stock-market-basics | low |
| FIN-A08 | Article | P3 | /blog/what-a-stock-index-measures/ | how stock indexes are calculated | stock-market-basics | low |
| FIN-A09 | Article | P3 | /blog/ex-dividend-date-explained/ | ex-dividend date | stock-market-basics | low |
| FIN-A10 | Article | P3 | /blog/stock-splits-and-buybacks-explained/ | stock split explained | stock-market-basics | low |
| FIN-A11 | Article | P2 | /blog/how-to-read-financial-statements/ | how to read financial statements | stock-market-basics | low |
| FIN-A12 | Article | P3 | /blog/how-to-read-a-10-k/ | how to read a 10-k | stock-market-basics | low |
| FIN-A13 | Article | P3 | /blog/short-selling-explained/ | how short selling works | stock-market-basics | high |
| FIN-A14 | Article | P3 | /blog/investing-vs-trading-vs-speculation/ | investing vs trading | stock-market-basics | medium |
| FIN-A15 | Glossary | P2 | /blog/investing-terms-glossary/ | investing terms glossary | stock-market-basics | low |
| FIN-A20 | Article | P1 | /blog/risk-and-return-basics/ | risk and return in investing | investing-risk-and-returns | medium |
| FIN-A21 | Article | P1 | /blog/diversification-explained/ | diversification in investing | investing-risk-and-returns | medium |
| FIN-A22 | Article | P2 | /blog/asset-allocation-and-rebalancing/ | how to rebalance a portfolio | investing-risk-and-returns | high |
| FIN-A23 | Article | P1 | /blog/compound-growth-explained/ | how compound interest works | investing-risk-and-returns | medium |
| FIN-A24 | Article | P1 | /blog/how-fees-affect-investment-returns/ | how fees affect investment returns | investing-risk-and-returns | low |
| FIN-A25 | Article | P2 | /blog/real-vs-nominal-returns/ | real rate of return | investing-risk-and-returns | low |
| FIN-A26 | Article | P2 | /blog/drawdown-recovery-math/ | how much gain to recover a loss | investing-risk-and-returns | low |
| FIN-A27 | Article | P3 | /blog/sequence-of-returns-risk/ | sequence of returns risk | investing-risk-and-returns | high |
| FIN-A28 | Article | P2 | /blog/buying-on-margin-explained/ | how does buying on margin work | investing-risk-and-returns | high |
| FIN-A29 | Article | P2 | /blog/leveraged-and-inverse-etfs-explained/ | leveraged etf decay | investing-risk-and-returns | medium |
| FIN-A30 | Article | P2 | /blog/bond-prices-and-interest-rates/ | why do bond prices fall when interest rates rise | investing-risk-and-returns | low |
| FIN-A31 | Article | P3 | /blog/yield-curve-explained/ | yield curve explained | investing-risk-and-returns | high |
| FIN-A32 | Article | P1 | /blog/behavioral-biases-investing-mistakes/ | behavioral biases in investing | investing-risk-and-returns | low |
| FIN-A33 | Article | P3 | /blog/backtesting-pitfalls/ | backtesting pitfalls | investing-risk-and-returns | medium |
| FIN-C00 | Article | P2 | /blog/how-to-read-market-history/ | stock market history lessons | financial-market-history | low |
| FIN-C01 | Article | P2 | /blog/2008-financial-crisis-explained/ | 2008 financial crisis explained | financial-market-history | medium |
| FIN-C02 | Article | P2 | /blog/2010-flash-crash-explained/ | 2010 flash crash | financial-market-history | low |
| FIN-C03 | Article | P2 | /blog/1987-stock-market-crash/ | 1987 stock market crash | financial-market-history | low |
| FIN-C04 | Article | P3 | /blog/ltcm-1998-collapse-explained/ | long-term capital management collapse | financial-market-history | low |
| FIN-C05 | Article | P2 | /blog/2023-bank-failures-explained/ | 2023 bank failures explained | financial-market-history | medium |
| FIN-C06 | Article | P3 | /blog/2020-covid-market-crash/ | 2020 stock market crash | financial-market-history | low |
| FIN-C07 | Article | P3 | /blog/2021-meme-stock-episode/ | 2021 meme stock short squeeze | financial-market-history | high |
| FIN-C08 | Article | P3 | /blog/2022-stocks-and-bonds-fell-together/ | why stocks and bonds fell in 2022 | financial-market-history | medium |
| FIN-C09 | Article | P3 | /blog/dot-com-bubble-and-bust/ | dot com bubble explained | financial-market-history | medium |
| FIN-T01 | Calculator | P2 | /tools/finance/investment-fee-calculator/ | investment fee calculator | - | medium |
| FIN-T02 | Calculator | P2 | /tools/finance/drawdown-recovery-calculator/ | drawdown recovery calculator | - | low |
| FIN-T03 | Calculator | P3 | /tools/finance/real-return-calculator/ | real return calculator | - | low |

#### FIN-P01 · Stock Trading Simulator Game (use the live Play title)

- **URL:** `/apps/stock-trading-simulator-game/` - Provisional. The slug must come from the live Google Play title; other Reign apps have live titles that differ from their project names.
- **Type / priority / intent:** App page / P0 / navigational
- **Primary query:** stock trading simulator game
- **Angle:** The one canonical page for the app: an offline trading academy plus a seeded market simulator with simulated prices, fictional tickers and no real money. Features only from the catalog entry written from the live listing; "how the simulator works" lives here, not in a separate article.
- **App lessons:** -
- **Other app material:** README.md; docs/RELEASE.md (ads, analytics, consent); src/content/trading/index.ts; app/(tabs)/; src/kernel/market/orders.ts; src/kernel/market/portfolio.ts
- **Primary sources (opened 2026-10-02):** S81 Investor Alert: Beware of Fantasy Stock Trading Websites Offering Real Returns; S82 Investor Bulletin: Performance Claims
- **Numeric examples:** none planned
- **Compliance risks (medium):** Counts such as "280 lessons" must be re-extracted from the released build or omitted; Contains ads and uses consented analytics; say so consistently with the listing; No claims of profitability or skill transfer; prices are simulated; Ownership disclosure and finance disclosure required
- **Dependencies:** App live and verified; Catalog entry from verify:play facts; Icon from the live listing
- **Status:** blocked: primary app not live on Google Play (404, 2026-10-02)

#### FIN-P02 · Finance & Investing Education

- **URL:** `/apps/category/finance-education/ + /blog/category/finance-education/` - Only if the owner adopts a new category; fallback is education-brain (no new URL). Category ids become permanent URLs.
- **Type / priority / intent:** Category pages / P0 / navigational
- **Primary query:** -
- **Angle:** Standing copy that states scope (general education, simulated practice) and carries both disclosures, so finance pages never sit under brain-game or history copy.
- **App lessons:** -
- **Other app material:** -
- **Primary sources (opened 2026-10-02):** -
- **Numeric examples:** none planned
- **Compliance risks (low):** One-app category is thin unless the copy adds real orientation
- **Dependencies:** CategoryId union, categories copy and catalog file in src/data/apps (owner/code change)
- **Status:** blocked: primary app not live on Google Play (404, 2026-10-02)

#### FIN-H01 · Stock Market Basics

- **URL:** `/blog/topics/stock-market-basics/`
- **Type / priority / intent:** Topic hub / P2 / navigational / hub `stock-market-basics`
- **Primary query:** -
- **Angle:** How markets, orders, costs, settlement and company filings work. Cornerstone FIN-A01. Create only after five member articles are published.
- **App lessons:** -
- **Other app material:** -
- **Primary sources (opened 2026-10-02):** -
- **Numeric examples:** none planned
- **Compliance risks (low):** -
- **Dependencies:** hubs.ts entry with appSlug = the live app slug; >= 5 published member articles
- **Status:** blocked: primary app not live on Google Play (404, 2026-10-02)

#### FIN-H02 · Investing Risk and Returns

- **URL:** `/blog/topics/investing-risk-and-returns/`
- **Type / priority / intent:** Topic hub / P2 / navigational / hub `investing-risk-and-returns`
- **Primary query:** -
- **Angle:** Risk, diversification, compounding, fees, inflation, leverage and behavioural mistakes. Cornerstone FIN-A20.
- **App lessons:** -
- **Other app material:** -
- **Primary sources (opened 2026-10-02):** -
- **Numeric examples:** none planned
- **Compliance risks (low):** -
- **Dependencies:** >= 5 published member articles
- **Status:** blocked: primary app not live on Google Play (404, 2026-10-02)

#### FIN-H03 · Financial Market History

- **URL:** `/blog/topics/financial-market-history/`
- **Type / priority / intent:** Topic hub / P3 / navigational / hub `financial-market-history`
- **Primary query:** -
- **Angle:** Dated, sourced episodes read without hindsight. Cornerstone FIN-C00. Id avoids clashing with the existing world-history hubs.
- **App lessons:** -
- **Other app material:** -
- **Primary sources (opened 2026-10-02):** -
- **Numeric examples:** none planned
- **Compliance risks (low):** -
- **Dependencies:** >= 5 published member articles
- **Status:** blocked: primary app not live on Google Play (404, 2026-10-02)

#### FIN-A01 · How the stock market works: exchanges, brokers and the path of an order

- **URL:** `/blog/how-the-stock-market-works/`
- **Type / priority / intent:** Article / P1 / informational / hub `stock-market-basics` (cornerstone of FIN-H01)
- **Primary query:** how does the stock market work; secondary: how stock orders are executed; what is a market maker; best execution; order routing
- **Angle:** Follow one hypothetical order from the tap to settlement, naming every party; separate exchanges, market makers and alternative venues by role; treat best execution as a duty about process; show why the simulator fills market orders at the next bar.
- **App lessons:** l-1-1, l-1-2, l-1-3, l-1-4 (`src/content/trading/lessons/unit01.ts`); l-5-6 (`src/content/trading/lessons/unit05.ts`); l-24-1 (`src/content/trading/lessons/unit24.ts`)
- **Other app material:** src/kernel/market/orders.ts
- **Primary sources (opened 2026-10-02):** S01 How Stock Markets Work; S10 Trade Execution: What Every Investor Should Know; S11 New "T+1" Settlement Cycle – What Investors Need To Know: Investor Bulletin; S19 Holidays & Trading Hours; S64 Stocks - FAQs; S89 Introduction to Investing
- **Numeric examples:** NE-02, NE-04 (must be programmatically tested before publication)
- **Compliance risks (medium):** Payment for order flow described neutrally; no broker comparisons or recommendations; US rules labelled with jurisdiction and an as-of date
- **Status:** blocked: primary app not live on Google Play (404, 2026-10-02)

#### FIN-A02 · Stock order types explained: market, limit, stop, stop-limit and trailing stop orders

- **URL:** `/blog/stock-order-types-explained/`
- **Type / priority / intent:** Article / P1 / informational / hub `stock-market-basics`
- **Primary query:** stock order types; secondary: stop loss vs stop limit; limit order vs market order; time in force; trailing stop order
- **Angle:** What each order guarantees and what it leaves open, built around one worked gap-through-a-stop example and the triggered-but-unfilled stop-limit; time in force as a section; the simulator's "adverse fill first" rule shown as a teaching device, not a market fact.
- **App lessons:** l-4-1, l-4-2, l-4-3, l-4-4, l-4-5, l-4-6, l-4-7, l-4-9, l-4-10 (`src/content/trading/lessons/unit04.ts`); l-5-4 (`src/content/trading/lessons/unit05.ts`)
- **Other app material:** src/content/trading/investors.ts#stop-is-not-a-guarantee; src/kernel/market/orders.ts
- **Primary sources (opened 2026-10-02):** S02 Types of Orders; S03 Understanding Order Types – Investor Bulletin; S04 Stop, Stop-Limit, and Trailing Stop Orders – Investor Bulletin; S06 Glossary: Limit Orders; S07 Glossary: Stop Order; S08 Glossary: Market Order; S86 Order Types; S87 Stop Orders: Factors to Consider During Volatile Markets
- **Numeric examples:** NE-01 (must be programmatically tested before publication)
- **Compliance risks (medium):** Never present a stop as protection or a price guarantee; No advice on where to place stops for real positions
- **Status:** blocked: primary app not live on Google Play (404, 2026-10-02)

#### FIN-A03 · The bid-ask spread, slippage and the real cost of a trade

- **URL:** `/blog/bid-ask-spread-and-trading-costs/`
- **Type / priority / intent:** Article / P1 / informational / hub `stock-market-basics`
- **Primary query:** bid-ask spread; secondary: what is slippage in trading; round trip trading cost; zero commission hidden costs; market impact
- **Angle:** One canonical page for trading costs: spread in cents and percent, half vs full spread, walking the book, slippage against the arrival price, commissions and fees, and why zero commission is not zero cost. The simulator's cost presets illustrate how the same trade costs differ.
- **App lessons:** l-1-3, l-1-4 (`src/content/trading/lessons/unit01.ts`); l-5-1, l-5-2, l-5-3, l-5-5, l-5-10 (`src/content/trading/lessons/unit05.ts`)
- **Other app material:** src/content/trading/investors.ts#what-a-spread-costs; src/content/trading/scenario-kit.ts (cost presets); src/content/trading/tools.ts#round-trip-cost; src/content/trading/tools.ts#slippage-impact
- **Primary sources (opened 2026-10-02):** S09 Glossary: Bid Price / Ask Price (defines the spread); S10 Trade Execution: What Every Investor Should Know; S34 Understanding Fees; S02 Types of Orders
- **Numeric examples:** NE-02, NE-03 (must be programmatically tested before publication)
- **Compliance risks (low):** No broker names or fee comparisons; Simulator cost presets labelled as hypothetical models
- **Status:** blocked: primary app not live on Google Play (404, 2026-10-02)

#### FIN-A04 · Paper trading: what a stock market simulator can and cannot teach you

- **URL:** `/blog/paper-trading-explained/`
- **Type / priority / intent:** Article / P1 / informational / hub `stock-market-basics`
- **Primary query:** paper trading; secondary: stock market simulator; practice trading without money; is paper trading realistic
- **Angle:** The strongest app-anchored page: what simulation removes (money and emotion), what a realistic simulator must model (next-bar fills, spreads, slippage, gaps, partial fills, financing), scoring process rather than profit, journaling, and why simulated results are not evidence of future performance.
- **App lessons:** l-1-10 (`src/content/trading/lessons/unit01.ts`); l-18-1, l-18-9 (`src/content/trading/lessons/unit18.ts`); l-25-2, l-25-7 (`src/content/trading/lessons/unit25.ts`)
- **Other app material:** README.md ("What this app does not claim"); app/pattern-trainer.tsx (three-part scoring); src/kernel/market/opponents.ts; src/kernel/market/orders.ts
- **Primary sources (opened 2026-10-02):** S81 Investor Alert: Beware of Fantasy Stock Trading Websites Offering Real Returns; S82 Investor Bulletin: Performance Claims; S80 Investor Alert: Thinking About Investing in the Latest Hot Stock? Understand the Significant Risks of Short-Term Trading Based on Social Media; S03 Understanding Order Types – Investor Bulletin
- **Numeric examples:** none planned
- **Compliance risks (high):** Hypothetical-results disclosure is mandatory; No prize, contest, leaderboard or "real returns" framing (SEC fantasy-trading alert); The rewarded practice-cash top-up has no monetary value and must be described that way; No screenshots presenting simulated gains as achievements
- **Status:** blocked: primary app not live on Google Play (404, 2026-10-02)

#### FIN-A05 · Trading halts, circuit breakers and limit up-limit down, explained

- **URL:** `/blog/trading-halts-and-circuit-breakers/`
- **Type / priority / intent:** Article / P2 / informational / hub `stock-market-basics`
- **Primary query:** stock market circuit breakers; secondary: limit up limit down; trading halt; what happens to orders during a halt
- **Angle:** Three mechanisms told apart by their trigger: single-stock halts and suspensions, LULD pauses and market-wide circuit breakers; trigger-level arithmetic; what happens to resting orders; why a halt pauses trading rather than protecting a position.
- **App lessons:** l-5-8 (`src/content/trading/lessons/unit05.ts`); l-1-8 (`src/content/trading/lessons/unit01.ts`)
- **Other app material:** src/content/trading/case-studies.ts#cs-1987-crash; src/content/trading/case-studies.ts#cs-flash-crash-2010
- **Primary sources (opened 2026-10-02):** S16 Glossary: Stock Market Circuit Breakers; S17 Limit Up Limit Down (LULD) Plan; S85 Trading Suspensions; S78 Findings Regarding the Market Events of May 6, 2010; S18 Investor Bulletin: New Measures to Address Market Volatility (historical)
- **Numeric examples:** NE-05 (must be programmatically tested before publication)
- **Compliance risks (low):** Thresholds and times re-checked at publication (rules change); Use a hypothetical index level, not a licensed index value
- **Status:** blocked: primary app not live on Google Play (404, 2026-10-02)

#### FIN-A06 · T+1 settlement: when a stock trade actually settles

- **URL:** `/blog/t-plus-1-settlement-explained/`
- **Type / priority / intent:** Article / P2 / informational / hub `stock-market-basics`
- **Primary query:** t+1 settlement; secondary: settlement date stocks; settled cash; good faith violation; freeriding cash account
- **Angle:** Trade date vs settlement date, settled cash, free-riding in cash accounts, the ex-dividend link, and the bank-holiday trap (exchanges open, no settlement) worked through with a tested calendar.
- **App lessons:** l-5-7 (`src/content/trading/lessons/unit05.ts`); l-1-2 (`src/content/trading/lessons/unit01.ts`); l-3-2 (`src/content/trading/lessons/unit03.ts`); l-6-1 (`src/content/trading/lessons/unit06.ts`)
- **Other app material:** src/content/trading/investors.ts#what-settlement-is
- **Primary sources (opened 2026-10-02):** S11 New "T+1" Settlement Cycle – What Investors Need To Know: Investor Bulletin; S12 Shortening the Securities Transaction Settlement Cycle (Release 34-96930, File S7-05-22); S13 Extensions of Time Filing Schedule (holiday settlement table); S14 Trading in Cash Accounts – Investor Bulletin; S15 Glossary: Freeriding
- **Numeric examples:** NE-04 (must be programmatically tested before publication)
- **Compliance risks (low):** US-only rules with dates; Describe account restrictions; do not coach around them
- **Status:** blocked: primary app not live on Google Play (404, 2026-10-02)

#### FIN-A07 · Pre-market and after-hours trading: sessions, auctions and risks

- **URL:** `/blog/extended-hours-trading-explained/`
- **Type / priority / intent:** Article / P3 / informational / hub `stock-market-basics`
- **Primary query:** after hours trading; secondary: pre-market trading risks; opening auction; closing auction
- **Angle:** Session phases and auctions from the exchange's own schedule, and the specific risks the SEC lists for trading outside the core session.
- **App lessons:** l-1-8 (`src/content/trading/lessons/unit01.ts`); l-5-9 (`src/content/trading/lessons/unit05.ts`); l-7-8 (`src/content/trading/lessons/unit07.ts`)
- **Other app material:** -
- **Primary sources (opened 2026-10-02):** S05 Extended-Hours Trading: Investor Bulletin; S19 Holidays & Trading Hours
- **Numeric examples:** none planned
- **Compliance risks (low):** No encouragement to trade outside regular hours
- **Status:** blocked: primary app not live on Google Play (404, 2026-10-02)

#### FIN-A08 · What a stock market index measures (and what it leaves out)

- **URL:** `/blog/what-a-stock-index-measures/`
- **Type / priority / intent:** Article / P3 / informational / hub `stock-market-basics`
- **Primary query:** how stock indexes are calculated; secondary: price weighted vs market cap weighted; price return vs total return
- **Angle:** Three hypothetical stocks, two weighting rules, opposite signs on the same day; an index as a maintained rule set; price vs total return.
- **App lessons:** l-1-7 (`src/content/trading/lessons/unit01.ts`); l-3-10 (`src/content/trading/lessons/unit03.ts`)
- **Other app material:** src/content/trading/investors.ts#what-an-index-measures
- **Primary sources (opened 2026-10-02):** S62 Glossary: Market Capitalization; S63 Glossary: Index Fund; S49 Mutual Funds (investment products)
- **Numeric examples:** NE-17 (must be programmatically tested before publication)
- **Compliance risks (low):** Do not reproduce licensed index levels or methodology text; describe methods generically; Source gap: no regulator page explains weighting in depth - the arithmetic must carry it
- **Status:** blocked: primary app not live on Google Play (404, 2026-10-02)

#### FIN-A09 · Ex-dividend date explained: who gets the dividend

- **URL:** `/blog/ex-dividend-date-explained/`
- **Type / priority / intent:** Article / P3 / informational / hub `stock-market-basics`
- **Primary query:** ex-dividend date; secondary: record date vs ex-dividend date; dividend payment dates
- **Angle:** The dividend dates in order, how exchange rules set the ex-date from the record date, the theoretical price adjustment and why buying just before the ex-date is not free money.
- **App lessons:** l-3-1, l-3-2, l-3-3 (`src/content/trading/lessons/unit03.ts`)
- **Other app material:** src/content/trading/investors.ts#charts-and-corporate-actions
- **Primary sources (opened 2026-10-02):** S59 Ex-Dividend Dates: When Are You Entitled to Stock and Cash Dividends; S11 New "T+1" Settlement Cycle – What Investors Need To Know: Investor Bulletin
- **Numeric examples:** NE-15 (must be programmatically tested before publication)
- **Compliance risks (low):** No tax treatment beyond "taxes vary"; No dividend-capture strategy framing
- **Status:** blocked: primary app not live on Google Play (404, 2026-10-02)

#### FIN-A10 · Stock splits, reverse splits and buybacks: what changes and what does not

- **URL:** `/blog/stock-splits-and-buybacks-explained/`
- **Type / priority / intent:** Article / P3 / informational / hub `stock-market-basics`
- **Primary query:** stock split explained; secondary: reverse stock split; share buyback eps; share dilution
- **Angle:** Split, reverse-split and buyback arithmetic, dilution vs share count, and why none of these is by itself a reason to buy or sell.
- **App lessons:** l-3-4, l-3-5 (`src/content/trading/lessons/unit03.ts`); l-1-5 (`src/content/trading/lessons/unit01.ts`); l-14-9 (`src/content/trading/lessons/unit14.ts`)
- **Other app material:** -
- **Primary sources (opened 2026-10-02):** S60 Glossary: Stock Split; S61 Glossary: Reverse Stock Splits; S62 Glossary: Market Capitalization; S54 Beginners' Guide to Financial Statements
- **Numeric examples:** NE-16 (must be programmatically tested before publication)
- **Compliance risks (low):** No claim that splits or buybacks predict returns
- **Status:** blocked: primary app not live on Google Play (404, 2026-10-02)

#### FIN-A11 · How to read financial statements: the three statements and how they connect

- **URL:** `/blog/how-to-read-financial-statements/`
- **Type / priority / intent:** Article / P2 / informational / hub `stock-market-basics`
- **Primary query:** how to read financial statements; secondary: balance sheet vs income statement vs cash flow; free cash flow; earnings quality red flags
- **Angle:** A fictional company traced through all three statements (net income into retained earnings and operating cash flow), with free cash flow and earnings-quality warning signs as sections.
- **App lessons:** l-14-1, l-14-3, l-14-4, l-14-6, l-14-7, l-14-10 (`src/content/trading/lessons/unit14.ts`)
- **Other app material:** -
- **Primary sources (opened 2026-10-02):** S54 Beginners' Guide to Financial Statements; S55 How to Read a 10-K; S56 How to Read a 10-K/10-Q (Investor Bulletin)
- **Numeric examples:** NE-14 (must be programmatically tested before publication)
- **Compliance risks (low):** Fictional company only; no real-company analysis or valuation conclusion
- **Status:** blocked: primary app not live on Google Play (404, 2026-10-02)

#### FIN-A12 · How to read a 10-K on EDGAR: where to find what

- **URL:** `/blog/how-to-read-a-10-k/`
- **Type / priority / intent:** Article / P3 / informational / hub `stock-market-basics`
- **Primary query:** how to read a 10-k; secondary: edgar full text search; 10-k vs 10-q; risk factors section
- **Angle:** Navigation, not analysis: which part of a 10-K holds share counts, debt maturities, related parties and risk factors, and how to search EDGAR.
- **App lessons:** l-14-8, l-14-9 (`src/content/trading/lessons/unit14.ts`); l-16-4, l-16-10 (`src/content/trading/lessons/unit16.ts`); l-1-5 (`src/content/trading/lessons/unit01.ts`)
- **Other app material:** -
- **Primary sources (opened 2026-10-02):** S55 How to Read a 10-K; S56 How to Read a 10-K/10-Q (Investor Bulletin); S57 Glossary: Form 10-K; S58 EDGAR - Search Filings (full-text search, company search, latest filings)
- **Numeric examples:** none planned
- **Compliance risks (low):** If a real filing illustrates a point, cite the exact EDGAR document and date; draw no investment conclusion
- **Status:** blocked: primary app not live on Google Play (404, 2026-10-02)

#### FIN-A13 · Short selling explained: borrowing, fees, recalls and open-ended losses

- **URL:** `/blog/short-selling-explained/`
- **Type / priority / intent:** Article / P3 / informational / hub `stock-market-basics`
- **Primary query:** how short selling works; secondary: borrow fee; short squeeze; locate requirement
- **Angle:** The four steps of a short sale, why proceeds are collateral, borrow fees with the day-count stated, recalls and buy-ins, and why loss is open-ended; the 2021 episode linked as dated history.
- **App lessons:** l-6-5, l-6-6, l-6-7 (`src/content/trading/lessons/unit06.ts`); l-24-5 (`src/content/trading/lessons/unit24.ts`)
- **Other app material:** src/content/trading/case-studies.ts#cs-meme-2021; src/kernel/market/portfolio.ts (borrow fee accrual)
- **Primary sources (opened 2026-10-02):** S50 Key Points About Regulation SHO; S51 Investor Bulletin: An Introduction to Short Sales; S52 Glossary: Short Sales; S53 Stock Purchases and Sales: Long and Short; S79 Staff Report on Equity and Options Market Structure Conditions in Early 2021
- **Numeric examples:** NE-18 (must be programmatically tested before publication)
- **Compliance risks (high):** Must not encourage shorting or name current targets; Squeezes described historically, never as opportunities
- **Status:** blocked: primary app not live on Google Play (404, 2026-10-02)

#### FIN-A14 · Investing vs trading vs speculation: the differences that matter

- **URL:** `/blog/investing-vs-trading-vs-speculation/`
- **Type / priority / intent:** Article / P3 / informational / hub `stock-market-basics`
- **Primary query:** investing vs trading; secondary: what is speculation; trading vs investing for beginners
- **Angle:** Horizon, source of return and falsifiability; writing a thesis with an invalidation point; what the research on activity and costs found.
- **App lessons:** l-1-10 (`src/content/trading/lessons/unit01.ts`); l-18-6, l-18-8 (`src/content/trading/lessons/unit18.ts`)
- **Other app material:** -
- **Primary sources (opened 2026-10-02):** S26 What is Risk?; S80 Investor Alert: Thinking About Investing in the Latest Hot Stock? Understand the Significant Risks of Short-Term Trading Based on Social Media; S83 Behavioral Patterns and Pitfalls of U.S. Investors
- **Numeric examples:** NE-19 (must be programmatically tested before publication)
- **Compliance risks (medium):** Neutral; no "trading for income" framing
- **Status:** blocked: primary app not live on Google Play (404, 2026-10-02)

#### FIN-A15 · Investing terms glossary: plain-English definitions

- **URL:** `/blog/investing-terms-glossary/`
- **Type / priority / intent:** Glossary / P2 / informational / hub `stock-market-basics`
- **Primary query:** investing terms glossary; secondary: stock market terms; trading terms for beginners
- **Angle:** One page of about 120 curated terms (from the app's 881) with newly written definitions, an anchor per term, a link to the deeper article and, for rule terms, the jurisdiction and as-of date.
- **App lessons:** -
- **Other app material:** src/content/trading/glossary.ts
- **Primary sources (opened 2026-10-02):** S88 Glossary (index)
- **Numeric examples:** none planned
- **Compliance risks (low):** Original definitions only - never paste the app's text; Rule terms dated (e.g. pattern day trader is superseded); Every micro-example tested
- **Status:** blocked: primary app not live on Google Play (404, 2026-10-02)

#### FIN-A20 · Risk and return explained: volatility, drawdowns and permanent loss

- **URL:** `/blog/risk-and-return-basics/`
- **Type / priority / intent:** Article / P1 / informational / hub `investing-risk-and-returns` (cornerstone of FIN-H02)
- **Primary query:** risk and return in investing; secondary: types of investment risk; volatility vs risk; average return vs compound return
- **Angle:** Risk as permanent loss as well as volatility, the main risk types, why an average return is not the return you got, and why path matters.
- **App lessons:** l-17-1 (`src/content/trading/lessons/unit17.ts`); l-13-1 (`src/content/trading/lessons/unit13.ts`); l-25-7 (`src/content/trading/lessons/unit25.ts`); l-19-1 (`src/content/trading/lessons/unit19.ts`)
- **Other app material:** src/content/trading/investors.ts#average-return-is-not-your-return
- **Primary sources (opened 2026-10-02):** S26 What is Risk?; S27 Glossary: Risk; S28 Risk and return (classroom resource); S21 Beginners' Guide to Asset Allocation, Diversification, and Rebalancing
- **Numeric examples:** NE-24 (must be programmatically tested before publication)
- **Compliance risks (medium):** No risk-tolerance quiz that outputs an allocation
- **Status:** blocked: primary app not live on Google Play (404, 2026-10-02)

#### FIN-A21 · Diversification explained: why it works and what it cannot do

- **URL:** `/blog/diversification-explained/`
- **Type / priority / intent:** Article / P1 / informational / hub `investing-risk-and-returns`
- **Primary query:** diversification in investing; secondary: correlation and diversification; fund overlap; correlation in a crisis
- **Angle:** Two-asset arithmetic at several correlations, diminishing returns from more holdings, fund overlap, and the simulator's regime correlation dial (0.22 sideways to 0.9 crisis) as an illustration of why calm-period diversification overstates crisis protection.
- **App lessons:** l-19-1, l-19-2, l-19-7, l-19-8 (`src/content/trading/lessons/unit19.ts`); l-17-4 (`src/content/trading/lessons/unit17.ts`)
- **Other app material:** src/content/trading/investors.ts#free-lunch; src/content/trading/investors.ts#counting-is-not-diversifying; src/content/trading/investors.ts#correlation-in-a-crisis; src/kernel/market/regimes.ts
- **Primary sources (opened 2026-10-02):** S21 Beginners' Guide to Asset Allocation, Diversification, and Rebalancing; S22 Asset Allocation and Diversification; S23 Glossary: Diversification
- **Numeric examples:** NE-06 (must be programmatically tested before publication)
- **Compliance risks (medium):** No prescriptive "how many stocks" or allocation advice
- **Status:** blocked: primary app not live on Google Play (404, 2026-10-02)

#### FIN-A22 · Asset allocation and rebalancing, explained with hypothetical portfolios

- **URL:** `/blog/asset-allocation-and-rebalancing/`
- **Type / priority / intent:** Article / P2 / informational / hub `investing-risk-and-returns`
- **Primary query:** how to rebalance a portfolio; secondary: asset allocation explained; calendar vs threshold rebalancing
- **Angle:** Allocation as a policy fixed in advance, calendar vs tolerance-band rebalancing, computing the trades, and rebalancing as risk control rather than a return booster.
- **App lessons:** l-19-3, l-19-4, l-19-5, l-19-9 (`src/content/trading/lessons/unit19.ts`)
- **Other app material:** src/content/trading/strategies.ts#st-rebalance-calendar; src/content/trading/strategies.ts#st-rebalance-threshold
- **Primary sources (opened 2026-10-02):** S21 Beginners' Guide to Asset Allocation, Diversification, and Rebalancing; S22 Asset Allocation and Diversification; S24 Glossary: Asset Allocation; S25 Glossary: Rebalancing
- **Numeric examples:** NE-13 (must be programmatically tested before publication)
- **Compliance risks (high):** Highest personalised-advice risk in the plan: hypothetical mixes only, no age- or goal-based allocations; Taxes excluded beyond "taxes may apply"
- **Status:** blocked: primary app not live on Google Play (404, 2026-10-02)

#### FIN-A23 · Compounding explained: how investment growth builds on itself

- **URL:** `/blog/compound-growth-explained/`
- **Type / priority / intent:** Article / P1 / informational / hub `investing-risk-and-returns`
- **Primary query:** how compound interest works; secondary: rule of 72; compound growth investing
- **Angle:** Growth on growth with an explicitly assumed rate, the Rule of 72 vs the exact doubling time, log vs linear charts, and a link to the SEC's own calculator instead of duplicating it.
- **App lessons:** l-7-5 (`src/content/trading/lessons/unit07.ts`); l-17-5 (`src/content/trading/lessons/unit17.ts`); l-25-7 (`src/content/trading/lessons/unit25.ts`)
- **Other app material:** src/content/trading/tools.ts#compounding; src/content/trading/tools.ts#cagr
- **Primary sources (opened 2026-10-02):** S29 Compound Interest Calculator; S30 Glossary: Compound Interest; S31 What is compound interest? (includes the Rule of 72)
- **Numeric examples:** NE-08 (must be programmatically tested before publication)
- **Compliance risks (medium):** Assumed rates are illustrations, never forecasts; No "turn $X into $Y" headlines
- **Status:** blocked: primary app not live on Google Play (404, 2026-10-02)

#### FIN-A24 · How fees compound: expense ratios, loads and trading costs over time

- **URL:** `/blog/how-fees-affect-investment-returns/`
- **Type / priority / intent:** Article / P1 / informational / hub `investing-risk-and-returns`
- **Primary query:** how fees affect investment returns; secondary: expense ratio impact; mutual fund fees; fee drag
- **Angle:** Reproduce the SEC's published fee example exactly (stating its fee convention), then separate loads, expense ratios and trading costs, and point readers to FINRA's Fund Analyzer.
- **App lessons:** l-2-3, l-2-4 (`src/content/trading/lessons/unit02.ts`); l-5-5 (`src/content/trading/lessons/unit05.ts`); l-18-8 (`src/content/trading/lessons/unit18.ts`); l-25-6 (`src/content/trading/lessons/unit25.ts`)
- **Other app material:** src/content/trading/investors.ts#cost-matters
- **Primary sources (opened 2026-10-02):** S32 How Fees and Expenses Affect Your Investment Portfolio – Investor Bulletin; S33 Mutual Fund and ETF Fees and Expenses – Investor Bulletin; S34 Understanding Fees; S35 Glossary: Expense Ratio; S36 Compare Funds With FINRA's Fund Analyzer
- **Numeric examples:** NE-07 (must be programmatically tested before publication)
- **Compliance risks (low):** No fund names or claims that cheaper funds will outperform
- **Status:** blocked: primary app not live on Google Play (404, 2026-10-02)

#### FIN-A25 · Real vs nominal returns: how inflation changes what you earned

- **URL:** `/blog/real-vs-nominal-returns/`
- **Type / priority / intent:** Article / P2 / informational / hub `investing-risk-and-returns`
- **Primary query:** real rate of return; secondary: nominal vs real return; inflation adjusted return
- **Angle:** The exact ratio form vs the subtraction shortcut, with CPI as the measure and BLS's calculator for converting dollars.
- **App lessons:** l-23-2 (`src/content/trading/lessons/unit23.ts`)
- **Other app material:** src/content/trading/tools.ts#real-return
- **Primary sources (opened 2026-10-02):** S37 CPI Home; S38 CPI Inflation Calculator
- **Numeric examples:** NE-09 (must be programmatically tested before publication)
- **Compliance risks (low):** Any CPI figure quoted with series and period from BLS; no inflation forecasts
- **Status:** blocked: primary app not live on Google Play (404, 2026-10-02)

#### FIN-A26 · Why a 50% loss needs a 100% gain: the math of drawdowns

- **URL:** `/blog/drawdown-recovery-math/`
- **Type / priority / intent:** Article / P2 / informational / hub `investing-risk-and-returns`
- **Primary query:** how much gain to recover a loss; secondary: drawdown recovery table; maximum drawdown explained
- **Angle:** The recovery table, years to recover at a stated assumed rate, and how leverage moves the wipe-out point.
- **App lessons:** l-17-5 (`src/content/trading/lessons/unit17.ts`); l-6-4 (`src/content/trading/lessons/unit06.ts`); l-25-7 (`src/content/trading/lessons/unit25.ts`)
- **Other app material:** src/content/trading/investors.ts#leverage-and-recovery; src/content/trading/tools.ts#drawdown-recovery
- **Primary sources (opened 2026-10-02):** S29 Compound Interest Calculator; S26 What is Risk?
- **Numeric examples:** NE-10 (must be programmatically tested before publication)
- **Compliance risks (low):** Keep to investment-loss arithmetic; no risk-per-trade instructions
- **Status:** blocked: primary app not live on Google Play (404, 2026-10-02)

#### FIN-A27 · Sequence of returns risk: when the order of returns matters

- **URL:** `/blog/sequence-of-returns-risk/`
- **Type / priority / intent:** Article / P3 / informational / hub `investing-risk-and-returns`
- **Primary query:** sequence of returns risk; secondary: order of returns withdrawals
- **Angle:** The same returns in different orders: identical without cash flows, different once money is withdrawn.
- **App lessons:** l-19-10 (`src/content/trading/lessons/unit19.ts`)
- **Other app material:** src/content/trading/tools.ts#sequence-risk; src/content/trading/strategies.ts#st-glide-path
- **Primary sources (opened 2026-10-02):** S29 Compound Interest Calculator; S21 Beginners' Guide to Asset Allocation, Diversification, and Rebalancing
- **Numeric examples:** NE-21 (must be programmatically tested before publication)
- **Compliance risks (high):** Retirement-withdrawal context is personal financial planning: hypothetical only, no withdrawal-rate guidance
- **Status:** blocked: primary app not live on Google Play (404, 2026-10-02)

#### FIN-A28 · Buying on margin explained: leverage, margin calls and forced selling

- **URL:** `/blog/buying-on-margin-explained/`
- **Type / priority / intent:** Article / P2 / informational / hub `investing-risk-and-returns`
- **Primary query:** how does buying on margin work; secondary: margin call price formula; maintenance margin; pattern day trader rule change
- **Angle:** Initial vs maintenance margin, the margin-call price, why a forced sale needs more stock than the cash shortfall, interest costs, and the 2026 replacement of the pattern-day-trader rules with intraday margin (and the transition to October 2027).
- **App lessons:** l-6-1, l-6-2, l-6-3, l-6-4, l-6-8 (`src/content/trading/lessons/unit06.ts`)
- **Other app material:** src/kernel/market/portfolio.ts (25%/30% maintenance model, forced liquidation)
- **Primary sources (opened 2026-10-02):** S39 Investor Bulletin: Understanding Margin Accounts; S40 Investor Bulletin: Interested in Margin? Understand Interest.; S41 Know What Triggers a Margin Call; S42 Rule 4210. Margin Requirements; S43 Regulatory Notice 26-10: FINRA Adopts New Intraday Margin Standards to Replace the Day Trading Margin Requirements; S44 12 CFR Part 220 - Regulation T (Credit by Brokers and Dealers); S45 Glossary: Margin Call
- **Numeric examples:** NE-11 (must be programmatically tested before publication)
- **Compliance risks (high):** Leverage can lose more than the deposit - state plainly; Must reflect FINRA Regulatory Notice 26-10; House requirements may be higher than regulatory minimums
- **Dependencies:** None beyond the blocker; app lesson links are limited to those listed above (section 17)
- **Status:** blocked: primary app not live on Google Play (404, 2026-10-02)

#### FIN-A29 · Leveraged and inverse ETFs: why daily resets change long-term results

- **URL:** `/blog/leveraged-and-inverse-etfs-explained/`
- **Type / priority / intent:** Article / P2 / informational / hub `investing-risk-and-returns`
- **Primary query:** leveraged etf decay; secondary: how leveraged etfs work; inverse etf risk; daily reset
- **Angle:** A two-day path where the index falls 1% and a 2x daily fund falls 4%, then the general volatility-drag argument, with the SEC/FINRA bulletin as the authority.
- **App lessons:** l-6-9 (`src/content/trading/lessons/unit06.ts`); l-2-3 (`src/content/trading/lessons/unit02.ts`)
- **Other app material:** src/content/trading/strategies.ts#st-leveraged-etp-hold
- **Primary sources (opened 2026-10-02):** S46 Updated Investor Bulletin: Leveraged and Inverse ETFs; S47 Leveraged Investing Strategies – Know the Risks Before Using These Advanced Investment Tools; S48 Updated Investor Bulletin: Exchange-Traded Funds (ETFs)
- **Numeric examples:** NE-12 (must be programmatically tested before publication)
- **Compliance risks (medium):** No tickers or product names; Quote suitability language from the bulletin accurately and attribute it
- **Status:** blocked: primary app not live on Google Play (404, 2026-10-02)

#### FIN-A30 · Why bond prices fall when interest rates rise (with duration examples)

- **URL:** `/blog/bond-prices-and-interest-rates/`
- **Type / priority / intent:** Article / P2 / informational / hub `investing-risk-and-returns`
- **Primary query:** why do bond prices fall when interest rates rise; secondary: bond duration explained; bond fund vs individual bond; 1994 bond market
- **Angle:** Price from discounted cash flows, a duration estimate checked against the exact price, held-bond vs bond-fund outcomes, and 1994 and 2013 as dated examples (consolidating two app history cases).
- **App lessons:** l-2-5, l-2-6 (`src/content/trading/lessons/unit02.ts`); l-27-2, l-27-3 (`src/content/trading/lessons/unit27.ts`)
- **Other app material:** src/content/trading/history/cases-1990s.ts#hc-1994-tightening; src/content/trading/history/cases-2010s.ts#hc-2013-taper-tantrum
- **Primary sources (opened 2026-10-02):** S65 Investor Bulletin: Fixed Income Investments - When Interest Rates Go Up, Prices of Fixed-Rate Bonds Fall; S66 Bonds - FAQs; S67 Bonds; S68 H.15 Selected Interest Rates (Daily); S70 Open Market Operations (policy-rate change history)
- **Numeric examples:** NE-22 (must be programmatically tested before publication)
- **Compliance risks (low):** No rate forecasts; historical yields only from H.15 with dates
- **Status:** blocked: primary app not live on Google Play (404, 2026-10-02)

#### FIN-A31 · The yield curve explained: what it prices and what an inversion does not tell you

- **URL:** `/blog/yield-curve-explained/`
- **Type / priority / intent:** Article / P3 / informational / hub `investing-risk-and-returns`
- **Primary query:** yield curve explained; secondary: inverted yield curve meaning; 2s10s spread
- **Angle:** The curve as a set of prices, curve spreads in basis points, and an honest small-sample account of inversions with lead-time caveats.
- **App lessons:** l-23-8 (`src/content/trading/lessons/unit23.ts`); l-27-5 (`src/content/trading/lessons/unit27.ts`); l-26-7 (`src/content/trading/lessons/unit26.ts`)
- **Other app material:** -
- **Primary sources (opened 2026-10-02):** S68 H.15 Selected Interest Rates (Daily); S69 Monetary Policy; S71 Meeting calendars and information (FOMC)
- **Numeric examples:** NE-23 (must be programmatically tested before publication)
- **Compliance risks (high):** Market-timing risk: no recession or market calls; inversion record framed with its sample size
- **Status:** blocked: primary app not live on Google Play (404, 2026-10-02)

#### FIN-A32 · Behavioural biases that cost investors money, and how to spot them

- **URL:** `/blog/behavioral-biases-investing-mistakes/`
- **Type / priority / intent:** Article / P1 / informational / hub `investing-risk-and-returns`
- **Primary query:** behavioral biases in investing; secondary: loss aversion investing; disposition effect; overconfidence trading; fomo investing
- **Angle:** One canonical page for loss aversion, the disposition effect, chasing, revenge trading, confirmation bias, overconfidence and overtrading, each paired with an observable test from a journal and a pre-commitment habit.
- **App lessons:** l-18-2, l-18-3, l-18-4, l-18-5, l-18-6, l-18-7, l-18-8, l-18-10 (`src/content/trading/lessons/unit18.ts`)
- **Other app material:** src/content/trading/checklists.ts#cl-urge-to-trade; src/content/trading/checklists.ts#cl-drawdown-response
- **Primary sources (opened 2026-10-02):** S83 Behavioral Patterns and Pitfalls of U.S. Investors; S80 Investor Alert: Thinking About Investing in the Latest Hot Stock? Understand the Significant Risks of Short-Term Trading Based on Social Media; S82 Investor Bulletin: Performance Claims
- **Numeric examples:** NE-19 (must be programmatically tested before publication)
- **Compliance risks (low):** No psychological or medical claims
- **Status:** blocked: primary app not live on Google Play (404, 2026-10-02)

#### FIN-A33 · Why backtests mislead: look-ahead bias, survivorship and over-fitting

- **URL:** `/blog/backtesting-pitfalls/`
- **Type / priority / intent:** Article / P3 / informational / hub `investing-risk-and-returns`
- **Primary query:** backtesting pitfalls; secondary: survivorship bias investing; look-ahead bias; overfitting; hypothetical performance
- **Angle:** How hypothetical results flatter: look-ahead, survivorship, multiple testing; the Strategy Lab's train/test split and look-ahead-proof harness as a demonstration.
- **App lessons:** l-25-1, l-25-2, l-25-3, l-25-4, l-25-5 (`src/content/trading/lessons/unit25.ts`); l-3-10 (`src/content/trading/lessons/unit03.ts`); l-7-9 (`src/content/trading/lessons/unit07.ts`)
- **Other app material:** app/strategy-lab.tsx; src/kernel/finance/backtest.ts; src/content/trading/investors.ts#what-a-backtest-cannot-tell-you; src/content/trading/investors.ts#survivorship-bias; src/content/trading/investors.ts#past-performance-tables
- **Primary sources (opened 2026-10-02):** S82 Investor Bulletin: Performance Claims; S84 Investment Adviser Marketing (small entity compliance guide; hypothetical performance)
- **Numeric examples:** NE-20 (must be programmatically tested before publication)
- **Compliance risks (medium):** Strategy Lab results are simulated; no strategy performance claims; Allowed-source coverage is thin (method literature is academic)
- **Status:** blocked: primary app not live on Google Play (404, 2026-10-02)

#### FIN-C00 · How to read stock market history without hindsight bias

- **URL:** `/blog/how-to-read-market-history/`
- **Type / priority / intent:** Article / P2 / informational / hub `financial-market-history` (cornerstone of FIN-H03)
- **Primary query:** stock market history lessons; secondary: hindsight bias investing; survivorship bias history
- **Angle:** What was knowable at the time vs later, alternative causes, survivorship and base rates; why a basis-point move is not a percentage return.
- **App lessons:** l-28-1 (`src/content/trading/lessons/unit28.ts`)
- **Other app material:** src/content/trading/history/types.ts (metric kinds, unavailable state, causation notes); src/content/trading/investors.ts#past-performance-tables
- **Primary sources (opened 2026-10-02):** S82 Investor Bulletin: Performance Claims; S75 The Great Recession and Its Aftermath; S73 Stock Market Crash of 1987
- **Numeric examples:** none planned
- **Compliance risks (low):** No "history repeats, so do X" conclusions
- **Status:** blocked: primary app not live on Google Play (404, 2026-10-02)

#### FIN-C01 · The 2008 financial crisis explained: from funding stress to recovery

- **URL:** `/blog/2008-financial-crisis-explained/`
- **Type / priority / intent:** Article / P2 / informational / hub `financial-market-history` / window 9 Aug 2007 - 31 Mar 2009 (context 2004 - 2010)
- **Primary query:** 2008 financial crisis explained; secondary: great recession causes; liquidity vs solvency
- **Angle:** The sequence from 2007 funding stress to the events of 2008, liquidity vs solvency, why diversification failed, and recovery arithmetic - consolidating the housing-boom and 2009-recovery cases.
- **App lessons:** l-28-6, l-28-7 (`src/content/trading/lessons/unit28.ts`)
- **Other app material:** src/content/trading/history/cases-2000s.ts#hc-2004-housing-boom; src/content/trading/history/cases-2000s.ts#hc-2007-financial-crisis; src/content/trading/history/cases-2000s.ts#hc-2009-recovery; src/content/trading/case-studies.ts#cs-gfc
- **Primary sources (opened 2026-10-02):** S75 The Great Recession and Its Aftermath; S72 Financial Stability Report; S70 Open Market Operations (policy-rate change history). Optional, outside the preferred list: FCIC report (govinfo)
- **Numeric examples:** none planned. Published figures: Any figure quoted from an official source with page/section and date; no index levels.
- **Compliance risks (medium):** Named firms described only as the official record does; No blame beyond the sources
- **Status:** blocked: primary app not live on Google Play (404, 2026-10-02)

#### FIN-C02 · The 6 May 2010 flash crash explained

- **URL:** `/blog/2010-flash-crash-explained/`
- **Type / priority / intent:** Article / P2 / informational / hub `financial-market-history` / window 6 May 2010
- **Primary query:** 2010 flash crash; secondary: what caused the flash crash; stub quotes; limit up limit down origin
- **Angle:** What the SEC/CFTC staff report found about liquidity withdrawal, and what changed afterwards (single-stock pauses that became LULD).
- **App lessons:** l-5-8 (`src/content/trading/lessons/unit05.ts`); l-1-4 (`src/content/trading/lessons/unit01.ts`); l-4-1, l-4-3 (`src/content/trading/lessons/unit04.ts`)
- **Other app material:** src/content/trading/case-studies.ts#cs-flash-crash-2010
- **Primary sources (opened 2026-10-02):** S78 Findings Regarding the Market Events of May 6, 2010; S16 Glossary: Stock Market Circuit Breakers; S17 Limit Up Limit Down (LULD) Plan; S18 Investor Bulletin: New Measures to Address Market Volatility (historical)
- **Numeric examples:** none planned. Published figures: Only figures stated in S78, quoted with page references.
- **Compliance risks (low):** Report is a staff report - say so
- **Status:** blocked: primary app not live on Google Play (404, 2026-10-02)

#### FIN-C03 · The 1987 stock market crash and the hedge that had to be sold

- **URL:** `/blog/1987-stock-market-crash/`
- **Type / priority / intent:** Article / P2 / informational / hub `financial-market-history` / window Sep - Nov 1987
- **Primary query:** 1987 stock market crash; secondary: black monday 1987; portfolio insurance
- **Angle:** Why a hedge that must be executed during a crash cannot protect against it, and how market-wide circuit breakers followed.
- **App lessons:** l-5-8 (`src/content/trading/lessons/unit05.ts`)
- **Other app material:** src/content/trading/case-studies.ts#cs-1987-crash
- **Primary sources (opened 2026-10-02):** S73 Stock Market Crash of 1987; S16 Glossary: Stock Market Circuit Breakers. Optional, outside the preferred list: Brady report (Yale archive)
- **Numeric examples:** none planned
- **Compliance risks (low):** No index levels unless quoted from the Fed essay with attribution
- **Status:** blocked: primary app not live on Google Play (404, 2026-10-02)

#### FIN-C04 · Long-Term Capital Management, 1998: leverage and correlation

- **URL:** `/blog/ltcm-1998-collapse-explained/`
- **Type / priority / intent:** Article / P3 / informational / hub `financial-market-history` / window Jun - Dec 1998
- **Primary query:** long-term capital management collapse; secondary: ltcm 1998; leverage and correlation risk
- **Angle:** How small adverse moves remove the capital of a highly leveraged book, and how forced deleveraging made unrelated positions move together.
- **App lessons:** l-28-3 (`src/content/trading/lessons/unit28.ts`); l-24-9 (`src/content/trading/lessons/unit24.ts`)
- **Other app material:** src/content/trading/history/cases-1990s.ts#hc-1998-ltcm; src/content/trading/case-studies.ts#cs-ltcm-1998
- **Primary sources (opened 2026-10-02):** S74 Near Failure of Long-Term Capital Management; S72 Financial Stability Report. Optional, outside the preferred list: President's Working Group report (Treasury)
- **Numeric examples:** none planned
- **Compliance risks (low):** Named firm; official record only
- **Status:** blocked: primary app not live on Google Play (404, 2026-10-02)

#### FIN-C05 · The 2023 bank failures: interest-rate risk and deposit runs

- **URL:** `/blog/2023-bank-failures-explained/`
- **Type / priority / intent:** Article / P2 / informational / hub `financial-market-history` / window Mar - May 2023
- **Primary query:** 2023 bank failures explained; secondary: silicon valley bank collapse; interest rate risk banks
- **Angle:** The Federal Reserve's own review: concentrated uninsured deposits, rising rates and supervisory findings; why a bank and a utility respond differently to the same rate rise.
- **App lessons:** l-27-10 (`src/content/trading/lessons/unit27.ts`); l-16-6 (`src/content/trading/lessons/unit16.ts`)
- **Other app material:** src/content/trading/case-studies.ts#cs-2023-banking
- **Primary sources (opened 2026-10-02):** S76 Review of the Federal Reserve's Supervision and Regulation of Silicon Valley Bank (key takeaways; full report PDF); S72 Financial Stability Report. Optional, outside the preferred list: FDIC bank-failure pages
- **Numeric examples:** none planned
- **Compliance risks (medium):** Named banks; official record only; no current-bank commentary
- **Status:** blocked: primary app not live on Google Play (404, 2026-10-02)

#### FIN-C06 · The 2020 COVID market crash and the policy response

- **URL:** `/blog/2020-covid-market-crash/`
- **Type / priority / intent:** Article / P3 / informational / hub `financial-market-history` / window 19 Feb - 31 Dec 2020
- **Primary query:** 2020 stock market crash; secondary: covid market crash recovery; fed response 2020
- **Angle:** Speed of the fall and recovery, and what the Federal Reserve's facilities changed; no index levels.
- **App lessons:** l-28-10 (`src/content/trading/lessons/unit28.ts`)
- **Other app material:** src/content/trading/history/cases-2020s.ts#hc-2020-covid; src/content/trading/case-studies.ts#cs-covid
- **Primary sources (opened 2026-10-02):** S77 Coronavirus Disease 2019 (COVID-19); S70 Open Market Operations (policy-rate change history); S72 Financial Stability Report
- **Numeric examples:** none planned
- **Compliance risks (low):** Avoid medical claims; policy facts only
- **Status:** blocked: primary app not live on Google Play (404, 2026-10-02)

#### FIN-C07 · The January 2021 meme-stock episode: short interest, options and market plumbing

- **URL:** `/blog/2021-meme-stock-episode/`
- **Type / priority / intent:** Article / P3 / informational / hub `financial-market-history` / window Jan - Mar 2021
- **Primary query:** 2021 meme stock short squeeze; secondary: gamestop short squeeze explained
- **Angle:** What the SEC staff report found about short interest, options activity, broker restrictions and settlement, read as market-structure history.
- **App lessons:** l-6-7 (`src/content/trading/lessons/unit06.ts`)
- **Other app material:** src/content/trading/case-studies.ts#cs-meme-2021
- **Primary sources (opened 2026-10-02):** S79 Staff Report on Equity and Options Market Structure Conditions in Early 2021; S80 Investor Alert: Thinking About Investing in the Latest Hot Stock? Understand the Significant Risks of Short-Term Trading Based on Social Media; S50 Key Points About Regulation SHO
- **Numeric examples:** none planned
- **Compliance risks (high):** Named current companies and social-media hype: dated, factual, no implication of repeatability, no "next squeeze" content
- **Status:** blocked: primary app not live on Google Play (404, 2026-10-02)

#### FIN-C08 · 2022: when stocks and bonds fell together

- **URL:** `/blog/2022-stocks-and-bonds-fell-together/`
- **Type / priority / intent:** Article / P3 / informational / hub `financial-market-history` / window 2021 - 2023 (core: calendar 2022)
- **Primary query:** why stocks and bonds fell in 2022; secondary: 2022 inflation rate hikes; 60/40 portfolio 2022
- **Angle:** Inflation, the pace of tightening and why the usual stock-bond offset failed; consolidates the 2021 reopening case.
- **App lessons:** l-28-10 (`src/content/trading/lessons/unit28.ts`); l-19-4 (`src/content/trading/lessons/unit19.ts`)
- **Other app material:** src/content/trading/history/cases-2020s.ts#hc-2021-reopening; src/content/trading/history/cases-2020s.ts#hc-2022-inflation; src/content/trading/case-studies.ts#cs-2022-inflation
- **Primary sources (opened 2026-10-02):** S37 CPI Home; S68 H.15 Selected Interest Rates (Daily); S70 Open Market Operations (policy-rate change history)
- **Numeric examples:** none planned. Published figures: CPI and policy-rate figures quoted from BLS and the Fed with dates, re-checked at publication.
- **Compliance risks (medium):** No forward-looking rate or inflation views
- **Status:** blocked: primary app not live on Google Play (404, 2026-10-02)

#### FIN-C09 · The dot-com boom and bust, 1995 to 2002: valuation vs earnings

- **URL:** `/blog/dot-com-bubble-and-bust/`
- **Type / priority / intent:** Article / P3 / informational / hub `financial-market-history` / window 1995 - Oct 2002
- **Primary query:** dot com bubble explained; secondary: dot com crash 2000
- **Angle:** Separating valuation expansion from earnings growth, index vs median company, and being right about the future at any price.
- **App lessons:** l-28-4 (`src/content/trading/lessons/unit28.ts`)
- **Other app material:** src/content/trading/history/cases-1990s.ts#hc-1990s-internet; src/content/trading/history/cases-2000s.ts#hc-2000-dotcom-bust; src/content/trading/case-studies.ts#cs-dotcom
- **Primary sources (opened 2026-10-02):** S70 Open Market Operations (policy-rate change history); S58 EDGAR - Search Filings (full-text search, company search, latest filings)
- **Numeric examples:** none planned
- **Compliance risks (medium):** Additional source gate: needs more preferred-list sources before drafting (the app relies on NBER and a Nobel lecture)
- **Status:** blocked: primary app not live on Google Play (404, 2026-10-02)

#### FIN-T01 · Investment fee calculator: what an annual fee costs over time

- **URL:** `/tools/finance/investment-fee-calculator/`
- **Type / priority / intent:** Calculator / P2 / transactional
- **Primary query:** investment fee calculator; secondary: expense ratio calculator
- **Angle:** Inputs: amount, assumed growth (illustrative), annual fee, years. Outputs: value with and without the fee, cost of the fee. Convention fixed to the one that reproduces the SEC example, stated beside the result.
- **App lessons:** l-2-3, l-2-4 (`src/content/trading/lessons/unit02.ts`); l-25-6 (`src/content/trading/lessons/unit25.ts`)
- **Other app material:** src/content/trading/tools.ts#compounding; src/kernel/finance/money.ts (feeDrag)
- **Primary sources (opened 2026-10-02):** S32 How Fees and Expenses Affect Your Investment Portfolio – Investor Bulletin; S33 Mutual Fund and ETF Fees and Expenses – Investor Bulletin; S36 Compare Funds With FINRA's Fund Analyzer
- **Formula authority:** SEC Investor Bulletin S32 - the unit test must reproduce its published $100,000 / 4% / 20-year example
- **Numeric examples:** NE-07 (must be programmatically tested before publication)
- **Compliance risks (medium):** Assumptions and both disclosures next to every result; No fund names; no default that looks like a recommendation
- **Dependencies:** New /tools/ route type with client-side code and unit tests
- **Status:** blocked: primary app not live on Google Play (404, 2026-10-02)

#### FIN-T02 · Drawdown recovery calculator

- **URL:** `/tools/finance/drawdown-recovery-calculator/`
- **Type / priority / intent:** Calculator / P2 / transactional
- **Primary query:** drawdown recovery calculator; secondary: loss recovery calculator
- **Angle:** Inputs: loss %, optional assumed annual return. Outputs: gain needed and years at the stated rate.
- **App lessons:** l-17-5 (`src/content/trading/lessons/unit17.ts`)
- **Other app material:** src/content/trading/tools.ts#drawdown-recovery; src/kernel/finance/money.ts (drawdownRecovery)
- **Primary sources (opened 2026-10-02):** S29 Compound Interest Calculator
- **Formula authority:** Algebraic identity d/(1-d); compounding per S29
- **Numeric examples:** NE-10 (must be programmatically tested before publication)
- **Compliance risks (low):** Rate input labelled as an assumption
- **Dependencies:** New /tools/ route type
- **Status:** blocked: primary app not live on Google Play (404, 2026-10-02)

#### FIN-T03 · Real return calculator (inflation-adjusted)

- **URL:** `/tools/finance/real-return-calculator/`
- **Type / priority / intent:** Calculator / P3 / transactional
- **Primary query:** real return calculator; secondary: inflation adjusted return calculator
- **Angle:** Exact (1+n)/(1+i)-1 next to the subtraction shortcut; links to the BLS CPI calculator for dollar conversions.
- **App lessons:** l-23-2 (`src/content/trading/lessons/unit23.ts`)
- **Other app material:** src/content/trading/tools.ts#real-return; src/kernel/finance/money.ts (realReturn)
- **Primary sources (opened 2026-10-02):** S37 CPI Home; S38 CPI Inflation Calculator
- **Formula authority:** Fisher relation; inflation data from BLS CPI (S37, S38)
- **Numeric examples:** NE-09 (must be programmatically tested before publication)
- **Compliance risks (low):** No inflation forecasts as defaults
- **Dependencies:** New /tools/ route type
- **Status:** blocked: primary app not live on Google Play (404, 2026-10-02)

### 13.2 Rejected

| Id | Type | Idea | Reason | Consolidated into |
| --- | --- | --- | --- | --- |
| FIN-R01 | ia | /finance/ landing hub | Duplicates the category reading list and the topic hubs: two listing pages for one intent. | FIN-P02, FIN-H01..H03 |
| FIN-R02 | ia | /learn/investing/{topic}/ tree | A parallel article system would bypass the review labels, publish checks and build gates and create duplicate canonicals with /blog/. | /blog/{slug}/ |
| FIN-R03 | ia | One page per app lesson (280 pages) | Mass-produced pages mirroring app material: thin, scaled and a copying risk. | - |
| FIN-R04 | ia | Per-term glossary pages (/glossary/{term}/) | Thin; duplicates the Investor.gov glossary term by term. | FIN-A15 |
| FIN-R05 | ia | /tools/finance/ index page before three tools are live | Thin listing. | FIN-H02 links the tools |
| FIN-R06 | article | "How the simulator works" as a separate article | Same intent as the app page; would compete with it for the brand query. | FIN-P01, FIN-A04 |
| FIN-R07 | article | What is a stock | Definitional intent served by Investor.gov Stocks FAQs; weak owned angle. | FIN-A01 |
| FIN-R08 | article | ETF vs mutual fund | Duplicates Investor.gov and FINRA pages; the simulator adds no distinct angle on fund pricing. | FIN-A24 (costs section) |
| FIN-R09 | article | Slippage, commissions or market impact as standalone pages | Variants of one trading-cost intent. | FIN-A03 |
| FIN-R10 | article | Trailing stops, stop-limit orders or time in force as standalone pages | Variants of the order-types intent. | FIN-A02 |
| FIN-R11 | article | Stop-loss gap risk as a standalone page | Sub-topic of order types. | FIN-A02 |
| FIN-R12 | article | Good-faith violations / free-riding standalone | Sub-topic of settlement. | FIN-A06 |
| FIN-R13 | article | Market cap vs enterprise value | Definitions belong in the glossary; EV multiples lead into valuation, which is out of scope. | FIN-A15, FIN-A11 |
| FIN-R14 | article | Free cash flow / earnings quality standalone | Sections of the financial-statements guide. | FIN-A11 |
| FIN-R15 | article | Valuation guides: DCF, P/E and multiples, dividend discount, ROIC (unit 15) | Security-valuation intent invites "is X undervalued" use and price-target adjacency; outside general-education scope. | - |
| FIN-R16 | article | Business quality and sector analysis (unit 16) | Stock-picking intent; outside scope. | - |
| FIN-R17 | article | Chart reading, trend/support/breakouts (units 7-8) | Trading-signal intent; market-timing and buy/sell instruction risk; evidence base is academic, not regulator. | - |
| FIN-R18 | article | Candlestick patterns (unit 9) | Trading-signal intent; excluded as buy/sell instruction risk. | - |
| FIN-R19 | article | Chart patterns (unit 10) | Trading-signal intent; excluded. | - |
| FIN-R20 | article | Moving averages, MACD, ADX (unit 11) | Indicator "how to trade" intent; excluded. | - |
| FIN-R21 | article | RSI, stochastic, CCI, divergence, overbought/oversold (unit 12) | Indicator trading intent; excluded. | - |
| FIN-R22 | article | Bollinger, Keltner, VWAP, volume profile (unit 13) | Indicator trading intent; excluded. | - |
| FIN-R23 | article | Position sizing, R multiples, expectancy, risk of ruin, portfolio heat (unit 17) | Trading-system instruction ("how many shares to buy"); outside scope. Drawdown arithmetic is kept. | FIN-A26 |
| FIN-R24 | article | One page per bias (FOMO, revenge trading, disposition effect, anchoring) | Thin variants of one intent. | FIN-A32 |
| FIN-R25 | article | Trading journal guide | Overlaps paper trading and behaviour pages; trading-oriented. | FIN-A04, FIN-A32 |
| FIN-R26 | article | Options: basics, Greeks, pricing models, strategies, assignment (units 20-22) | Complex, high-risk products; would need the OCC options disclosure document and expert review. Deferred, not planned. | - |
| FIN-R27 | article | Strategy playbooks as pages (value, momentum, dividend investing, trend following, pairs, the wheel...) | "Which strategy works" intent becomes a strategy recommendation. | - |
| FIN-R28 | article | Investor profiles (Buffett, Munger, Graham, Bogle, Lynch, Marks, Dalio, ...) | Real people: profile pages could imply their endorsement; quotes are third-party works. | - |
| FIN-R29 | article | Investing quotes page | The app ships zero quotes (QUOTES is empty) and quotes are third-party text. | - |
| FIN-R30 | article | Macro release-day trading, "how CPI/jobs reports move stocks", "Fed decisions and markets" (units 23, 26) | Market-timing intent. | - |
| FIN-R31 | article | Institutions deep dives: hedge funds, stat arb, dealer hedging (unit 24) | Niche, and dealer-positioning claims invite speculation. | - |
| FIN-R32 | article | Currency trading, carry trades, emerging-market debt | Leveraged FX trading risk; outside scope. | - |
| FIN-R33 | article | Commodities, REITs, closed-end funds/ETNs/ADRs, preferred shares (unit 2) | Product-level pages edge toward product selection; low priority for a first release. | - |
| FIN-R34 | article | Pattern day trader / day-trading rules page | Rule replaced by FINRA intraday margin (effective 4 June 2026, transition to 20 October 2027); trading-focused. Covered as a dated section. | FIN-A28 |
| FIN-R35 | article | Units 29-37 topics (funds in depth, banking, hedge funds/PE/VC, IPOs and dilution, futures and swaps, personal finance and tax, crypto, pre-1990 bubbles, advanced TA) | Draft shard content, not in any build, so not a verified live-app feature; tax and crypto are excluded anyway. | - |
| FIN-R36 | article | Case study: 2011 US credit downgrade | App source (GAO) not verifiable by automated request; preferred-list source gap. | - |
| FIN-R37 | article | Case study: Japan 1989-2003 | Non-US sources only (Bank of Japan). | - |
| FIN-R38 | article | Case study: 1997 Asian crisis | IMF sources (blocked to automated checks) outside the preferred list. | - |
| FIN-R39 | article | Case study: euro-area debt crisis 2010-12 | Non-US sources only (ECB, ESM). | - |
| FIN-R40 | article | Case study: 2001 recession and the September 11 market closure | Sensitive event; no specific primary source identified. | - |
| FIN-R41 | article | Case studies: 2015-18 tightening, 2019 reversal | Niche; dated facts can sit in FIN-A30/FIN-A31. | FIN-A30, FIN-A31 |
| FIN-R42 | article | Case study: 2023-25 AI/semiconductor capital-spending boom | Named current companies, near-present: reads as stock commentary. | - |
| FIN-R43 | article | Case studies: 1990-91 recession, 2004-06 housing, 2009 recovery, 2021 reopening as separate pages | Consolidated into larger episodes. | FIN-C01, FIN-C08 |
| FIN-R44 | article | 1994 bond market and 2013 taper tantrum as separate pages | Consolidated as dated examples. | FIN-A30 |
| FIN-R45 | tool | Compound interest calculator | The SEC already publishes an official calculator for this intent; link to it. | FIN-A23 |
| FIN-R46 | tool | Trading calculators: position size, reward:risk, expectancy, risk of ruin, ATR stop, portfolio heat, round-trip cost, slippage impact | Trading-instruction tools; outside scope (costs explained in FIN-A03). | FIN-A03 |
| FIN-R47 | tool | Options calculators: pricer/Greeks, implied volatility, payoff builder, collateral, hedge sizing, capital planner | Options excluded. | - |
| FIN-R48 | tool | Valuation calculators: DCF, multiples, dividend discount, ROIC/DuPont | Valuation excluded. | - |
| FIN-R49 | tool | Planning and projection tools: Monte Carlo explorer, goal planner, sequence explorer, rebalance, allocation builder | Projections and personalised-planning outputs; worked examples go in articles instead. | FIN-A22, FIN-A27 |
| FIN-R50 | tool | Analytics tools: CAGR, Sharpe/Sortino, benchmark compare, correlation, fund overlap, bond calculator, currency conversion | Low incremental value as standalone tools; examples fold into articles. | FIN-A23, FIN-A21, FIN-A30 |
| FIN-R51 | article | "Best stocks/ETFs to buy", "how to get rich trading", "day trading for beginners" | Explicitly excluded intents. | - |
| FIN-R52 | article | Tax pages (capital gains, wash sales) | Tax advice excluded (the app cites IRS pages only in strategy playbooks). | - |

## 14. Source plan (pages opened and confirmed)

Every page below was opened on 2026-10-02. Preferred publishers only (SEC/Investor.gov, FINRA, Federal Reserve, BLS, exchange material, SEC EDGAR); IRS pages are not used because tax is out of scope. Re-check each page within seven days of publishing anything that cites it (`npm run audit:sources`), and re-read regulatory pages for changes, not just status codes.

| Id | Publisher | Page | URL | Date shown | How confirmed | Used by |
| --- | --- | --- | --- | --- | --- | --- |
| S01 | SEC (Investor.gov) | How Stock Markets Work | https://www.investor.gov/introduction-investing/investing-basics/how-stock-markets-work | - | HTTP 200, title matched | FIN-A01 |
| S02 | SEC (Investor.gov) | Types of Orders | https://www.investor.gov/introduction-investing/investing-basics/how-stock-markets-work/types-orders | - | HTTP 200, title matched | FIN-A02, FIN-A03 |
| S03 | SEC (Investor.gov) | Understanding Order Types – Investor Bulletin | https://www.investor.gov/introduction-investing/general-resources/news-alerts/alerts-bulletins/investor-bulletins-14 | 12 July 2017; page shows an 18 August 2026 update | HTTP 200, title matched | FIN-A02, FIN-A04 |
| S04 | SEC (Investor.gov) | Stop, Stop-Limit, and Trailing Stop Orders – Investor Bulletin | https://www.investor.gov/introduction-investing/general-resources/news-alerts/alerts-bulletins/investor-bulletins-15 | 13 July 2017; page also shows 18 August 2026 | HTTP 200, title matched | FIN-A02 |
| S05 | SEC (Investor.gov) | Extended-Hours Trading: Investor Bulletin | https://www.investor.gov/introduction-investing/general-resources/news-alerts/alerts-bulletins/investor-bulletins-42 | 6 June 2022 | HTTP 200, title matched | FIN-A07 |
| S06 | SEC (Investor.gov) | Glossary: Limit Orders | https://www.investor.gov/introduction-investing/investing-basics/glossary/limit-orders | - | HTTP 200, title matched | FIN-A02 |
| S07 | SEC (Investor.gov) | Glossary: Stop Order | https://www.investor.gov/introduction-investing/investing-basics/glossary/stop-order | - | HTTP 200, title matched | FIN-A02 |
| S08 | SEC (Investor.gov) | Glossary: Market Order | https://www.investor.gov/introduction-investing/investing-basics/glossary/market-order | - | HTTP 200, title matched | FIN-A02 |
| S09 | SEC (Investor.gov) | Glossary: Bid Price / Ask Price (defines the spread) | https://www.investor.gov/introduction-investing/investing-basics/glossary/bid-price | - | HTTP 200, title "Bid Price"; spread definition present; companion .../glossary/ask-price also 200 | FIN-A03 |
| S10 | SEC | Trade Execution: What Every Investor Should Know | https://www.sec.gov/about/reports-publications/investorpubstradexec | 15 January 2013 | WebFetch (sec.gov refuses unsigned curl) | FIN-A01, FIN-A03 |
| S11 | SEC (Investor.gov) | New "T+1" Settlement Cycle – What Investors Need To Know: Investor Bulletin | https://www.investor.gov/introduction-investing/general-resources/news-alerts/alerts-bulletins/investor-bulletins/new-t1-settlement-cycle-what-investors-need-know-investor-bulletin | 27 March 2024 (compliance date 28 May 2024) | HTTP 200, title matched | FIN-A01, FIN-A06, FIN-A09 |
| S12 | SEC | Shortening the Securities Transaction Settlement Cycle (Release 34-96930, File S7-05-22) | https://www.sec.gov/rules-regulations/2023/02/34-96930 | 15 February 2023 | WebFetch | FIN-A06 |
| S13 | FINRA | Extensions of Time Filing Schedule (holiday settlement table) | https://www.finra.org/rules-guidance/key-topics/margin-accounts/margin-extension-holiday-schedule | - | WebFetch; lists 12 Oct 2026 and 11 Nov 2026 as "bank holiday only, securities exchanges open, no settlement" | FIN-A06 |
| S14 | SEC (Investor.gov) | Trading in Cash Accounts – Investor Bulletin | https://www.investor.gov/introduction-investing/general-resources/news-alerts/alerts-bulletins/investor-bulletins/updated-9 | - | HTTP 200, title matched | FIN-A06 |
| S15 | SEC (Investor.gov) | Glossary: Freeriding | https://www.investor.gov/introduction-investing/investing-basics/glossary/freeriding | - | HTTP 200, title matched | FIN-A06 |
| S16 | SEC (Investor.gov) | Glossary: Stock Market Circuit Breakers | https://www.investor.gov/introduction-investing/investing-basics/glossary/stock-market-circuit-breakers | - | HTTP 200, title matched | FIN-A05, FIN-C02, FIN-C03 |
| S17 | LULD Plan participants (exchanges and FINRA) | Limit Up Limit Down (LULD) Plan | https://www.luldplan.com/ | - | HTTP 200 and WebFetch (participants listed; plan text not linked from the home page) | FIN-A05, FIN-C02 |
| S18 | SEC | Investor Bulletin: New Measures to Address Market Volatility (historical) | https://www.sec.gov/investor/alerts/circuitbreakersbulletin.htm | modified 9 April 2013 - use only for history | WebFetch | FIN-A05, FIN-C02 |
| S19 | NYSE | Holidays & Trading Hours | https://www.nyse.com/trade/hours-calendars | - | HTTP 200 (the app's URL /markets/hours-calendars redirects here) | FIN-A01, FIN-A07 |
| S20 | NYSE | Rules - All NYSE Group Exchanges (links to each rulebook) | https://www.nyse.com/regulation/rules | - | HTTP 200 and WebFetch; rulebooks on *.srorules.com did not answer automated requests | (reserve) |
| S21 | SEC (Investor.gov) | Beginners' Guide to Asset Allocation, Diversification, and Rebalancing | https://www.investor.gov/additional-resources/general-resources/publications-research/info-sheets/beginners-guide-asset | - | HTTP 200, title matched | FIN-A20, FIN-A21, FIN-A22, FIN-A27 |
| S22 | SEC (Investor.gov) | Asset Allocation and Diversification | https://www.investor.gov/introduction-investing/getting-started/asset-allocation | - | HTTP 200, title matched | FIN-A21, FIN-A22 |
| S23 | SEC (Investor.gov) | Glossary: Diversification | https://www.investor.gov/introduction-investing/investing-basics/glossary/diversification | - | HTTP 200, title matched | FIN-A21 |
| S24 | SEC (Investor.gov) | Glossary: Asset Allocation | https://www.investor.gov/introduction-investing/investing-basics/glossary/asset-allocation | - | HTTP 200, title matched | FIN-A22 |
| S25 | SEC (Investor.gov) | Glossary: Rebalancing | https://www.investor.gov/introduction-investing/investing-basics/glossary/rebalancing | - | HTTP 200, title matched (second attempt) | FIN-A22 |
| S26 | SEC (Investor.gov) | What is Risk? | https://www.investor.gov/introduction-investing/investing-basics/what-risk | - | HTTP 200, title matched | FIN-A14, FIN-A20, FIN-A26 |
| S27 | SEC (Investor.gov) | Glossary: Risk | https://www.investor.gov/introduction-investing/investing-basics/glossary/risk | - | HTTP 200, title matched | FIN-A20 |
| S28 | SEC (Investor.gov) | Risk and return (classroom resource) | https://www.investor.gov/additional-resources/information/youth/teachers-classroom-resources/risk-and-return | - | HTTP 200, title matched | FIN-A20 |
| S29 | SEC (Investor.gov) | Compound Interest Calculator | https://www.investor.gov/financial-tools-calculators/calculators/compound-interest-calculator | - | HTTP 200, title matched | FIN-A23, FIN-A26, FIN-A27, FIN-T02 |
| S30 | SEC (Investor.gov) | Glossary: Compound Interest | https://www.investor.gov/introduction-investing/investing-basics/glossary/compound-interest | - | HTTP 200, title matched | FIN-A23 |
| S31 | SEC (Investor.gov) | What is compound interest? (includes the Rule of 72) | https://www.investor.gov/additional-resources/information/youth/teachers-classroom-resources/what-compound-interest | - | HTTP 200, title matched; Rule of 72 text present | FIN-A23 |
| S32 | SEC (Investor.gov) | How Fees and Expenses Affect Your Investment Portfolio – Investor Bulletin | https://www.investor.gov/introduction-investing/general-resources/news-alerts/alerts-bulletins/investor-bulletins/updated | 23 July 2025 | HTTP 200, title matched | FIN-A24, FIN-T01 |
| S33 | SEC (Investor.gov) | Mutual Fund and ETF Fees and Expenses – Investor Bulletin | https://www.investor.gov/introduction-investing/general-resources/news-alerts/alerts-bulletins/investor-bulletins/mutual-fund-and-etf-fees-and-expenses-investor-bulletin | 23 July 2025 | HTTP 200, title matched | FIN-A24, FIN-T01 |
| S34 | SEC (Investor.gov) | Understanding Fees | https://www.investor.gov/introduction-investing/getting-started/understanding-fees | - | HTTP 200, title matched | FIN-A03, FIN-A24 |
| S35 | SEC (Investor.gov) | Glossary: Expense Ratio | https://www.investor.gov/introduction-investing/investing-basics/glossary/expense-ratio | - | HTTP 200, title matched | FIN-A24 |
| S36 | FINRA | Compare Funds With FINRA's Fund Analyzer | https://www.finra.org/investors/insights/research-and-compare-funds | 5 September 2024 | WebFetch (finra.org challenges curl) | FIN-A24, FIN-T01 |
| S37 | BLS | CPI Home | https://www.bls.gov/cpi/ | - | WebFetch (bls.gov denies curl); latest release shown 11 September 2026 | FIN-A25, FIN-C08, FIN-T03 |
| S38 | BLS | CPI Inflation Calculator | https://data.bls.gov/cgi-bin/cpicalc.pl | - | HTTP 200, title matched | FIN-A25, FIN-T03 |
| S39 | SEC (Investor.gov) | Investor Bulletin: Understanding Margin Accounts | https://www.investor.gov/introduction-investing/general-resources/news-alerts/alerts-bulletins/investor-bulletins-29 | 10 June 2021, updated for 2026 rule change | HTTP 200; text describes FINRA intraday margin replacing pattern-day-trader rules, effective 4 June 2026 with transition to 20 October 2027 | FIN-A28 |
| S40 | SEC (Investor.gov) | Investor Bulletin: Interested in Margin? Understand Interest. | https://www.investor.gov/introduction-investing/general-resources/news-alerts/alerts-bulletins/investor-bulletins/investor-bulletin-interested-margin-understand-interest | 7 April 2022 | HTTP 200, title matched | FIN-A28 |
| S41 | FINRA | Know What Triggers a Margin Call | https://www.finra.org/investors/insights/margin-calls | 4 June 2026 | WebFetch | FIN-A28 |
| S42 | FINRA | Rule 4210. Margin Requirements | https://www.finra.org/rules-guidance/rulebooks/finra-rules/4210 | - | WebFetch; current text has intraday margin at (d)(2) and no pattern-day-trader definition | FIN-A28 |
| S43 | FINRA | Regulatory Notice 26-10: FINRA Adopts New Intraday Margin Standards to Replace the Day Trading Margin Requirements | https://www.finra.org/rules-guidance/notices/26-10 | 20 April 2026; effective 4 June 2026; members may phase in until 20 October 2027 | WebFetch | FIN-A28 |
| S44 | Federal Reserve Board (via eCFR) | 12 CFR Part 220 - Regulation T (Credit by Brokers and Dealers) | https://www.ecfr.gov/current/title-12/chapter-II/subchapter-A/part-220 | - | HTTP 200 (script-rendered page; open by hand to confirm text before citing) | FIN-A28 |
| S45 | SEC (Investor.gov) | Glossary: Margin Call | https://www.investor.gov/introduction-investing/investing-basics/glossary/margin-call | - | HTTP 200, title matched | FIN-A28 |
| S46 | SEC (Investor.gov) | Updated Investor Bulletin: Leveraged and Inverse ETFs | https://www.investor.gov/introduction-investing/general-resources/news-alerts/alerts-bulletins/investor-alerts/sec | 29 August 2023 | HTTP 200, title matched | FIN-A29 |
| S47 | SEC (Investor.gov) | Leveraged Investing Strategies – Know the Risks Before Using These Advanced Investment Tools | https://www.investor.gov/introduction-investing/general-resources/news-alerts/alerts-bulletins/investor-bulletins/leveraged-investing-strategies-know-risks-using-these-advanced-investment-tools | - | HTTP 200, title matched | FIN-A29 |
| S48 | SEC (Investor.gov) | Updated Investor Bulletin: Exchange-Traded Funds (ETFs) | https://www.investor.gov/introduction-investing/general-resources/news-alerts/alerts-bulletins/investor-bulletins-24 | - | HTTP 200, title matched | FIN-A29 |
| S49 | SEC (Investor.gov) | Mutual Funds (investment products) | https://www.investor.gov/introduction-investing/investing-basics/investment-products/mutual-funds-and-exchange-traded-1 | - | HTTP 200, title matched | FIN-A08 |
| S50 | SEC | Key Points About Regulation SHO | https://www.sec.gov/investor/pubs/regsho.htm | modified 31 May 2022 | WebFetch | FIN-A13, FIN-C07 |
| S51 | SEC (Investor.gov) | Investor Bulletin: An Introduction to Short Sales | https://www.investor.gov/introduction-investing/general-resources/news-alerts/alerts-bulletins/investor-bulletins-51 | - | HTTP 200, title matched | FIN-A13 |
| S52 | SEC (Investor.gov) | Glossary: Short Sales | https://www.investor.gov/introduction-investing/investing-basics/glossary/short-sales-0 | - | HTTP 200, title matched | FIN-A13 |
| S53 | SEC (Investor.gov) | Stock Purchases and Sales: Long and Short | https://www.investor.gov/introduction-investing/investing-basics/how-stock-markets-work/stock-purchases-and-sales-long-and | - | HTTP 200, title matched | FIN-A13 |
| S54 | SEC | Beginners' Guide to Financial Statements | https://www.sec.gov/reportspubs/investor-publications/investorpubsbegfinstmtguide | 4 February 2007 | WebFetch; sections: balance sheets, income statements, cash flow statements, footnotes, MD&A, ratios | FIN-A10, FIN-A11 |
| S55 | SEC (Investor.gov) | How to Read a 10-K | https://www.investor.gov/introduction-investing/getting-started/researching-investments/how-read-10-k | - | HTTP 200, title matched | FIN-A11, FIN-A12 |
| S56 | SEC (Investor.gov) | How to Read a 10-K/10-Q (Investor Bulletin) | https://www.investor.gov/introduction-investing/general-resources/news-alerts/alerts-bulletins/investor-bulletins/how-read | 25 January 2021 | HTTP 200, title matched | FIN-A11, FIN-A12 |
| S57 | SEC (Investor.gov) | Glossary: Form 10-K | https://www.investor.gov/introduction-investing/investing-basics/glossary/form-10-k | - | HTTP 200, title matched | FIN-A12 |
| S58 | SEC | EDGAR - Search Filings (full-text search, company search, latest filings) | https://www.sec.gov/edgar/search-and-access | - | WebFetch | FIN-A12, FIN-C09 |
| S59 | SEC (Investor.gov) | Ex-Dividend Dates: When Are You Entitled to Stock and Cash Dividends | https://www.investor.gov/introduction-investing/investing-basics/glossary/ex-dividend-dates-when-are-you-entitled-stock-and | - | HTTP 200, title matched | FIN-A09 |
| S60 | SEC (Investor.gov) | Glossary: Stock Split | https://www.investor.gov/introduction-investing/investing-basics/glossary/stock-split | - | HTTP 200, title matched | FIN-A10 |
| S61 | SEC (Investor.gov) | Glossary: Reverse Stock Splits | https://www.investor.gov/introduction-investing/investing-basics/glossary/reverse-stock-splits | - | HTTP 200, title matched | FIN-A10 |
| S62 | SEC (Investor.gov) | Glossary: Market Capitalization | https://www.investor.gov/introduction-investing/investing-basics/glossary/market-capitalization | - | HTTP 200, title matched | FIN-A08, FIN-A10 |
| S63 | SEC (Investor.gov) | Glossary: Index Fund | https://www.investor.gov/introduction-investing/investing-basics/glossary/index-fund | - | HTTP 200, title matched | FIN-A08 |
| S64 | SEC (Investor.gov) | Stocks - FAQs | https://www.investor.gov/introduction-investing/investing-basics/investment-products/stocks | - | HTTP 200, title matched | FIN-A01 |
| S65 | SEC (Investor.gov) | Investor Bulletin: Fixed Income Investments - When Interest Rates Go Up, Prices of Fixed-Rate Bonds Fall | https://www.investor.gov/introduction-investing/general-resources/news-alerts/alerts-bulletins/investor-bulletins-86 | - | HTTP 200, title matched | FIN-A30 |
| S66 | SEC (Investor.gov) | Bonds - FAQs | https://www.investor.gov/introduction-investing/investing-basics/investment-products/bonds-or-fixed-income-products/bonds | - | HTTP 200, title matched | FIN-A30 |
| S67 | FINRA | Bonds | https://www.finra.org/investors/investing/investment-products/bonds | - | WebFetch (price/yield, interest-rate risk, credit risk covered) | FIN-A30 |
| S68 | Federal Reserve Board | H.15 Selected Interest Rates (Daily) | https://www.federalreserve.gov/releases/h15/ | - | HTTP 200, release dated 2 October 2026 | FIN-A30, FIN-A31, FIN-C08 |
| S69 | Federal Reserve Board | Monetary Policy | https://www.federalreserve.gov/monetarypolicy.htm | - | HTTP 200, title matched | FIN-A31 |
| S70 | Federal Reserve Board | Open Market Operations (policy-rate change history) | https://www.federalreserve.gov/monetarypolicy/openmarket.htm | - | HTTP 200, title matched | FIN-A30, FIN-C01, FIN-C06, FIN-C08, FIN-C09 |
| S71 | Federal Reserve Board | Meeting calendars and information (FOMC) | https://www.federalreserve.gov/monetarypolicy/fomccalendars.htm | - | HTTP 200, title matched | FIN-A31 |
| S72 | Federal Reserve Board | Financial Stability Report | https://www.federalreserve.gov/publications/financial-stability-report.htm | - | HTTP 200, title matched | FIN-C01, FIN-C04, FIN-C05, FIN-C06 |
| S73 | Federal Reserve History | Stock Market Crash of 1987 | https://www.federalreservehistory.org/essays/stock-market-crash-of-1987 | - | HTTP 200, title matched | FIN-C00, FIN-C03 |
| S74 | Federal Reserve History | Near Failure of Long-Term Capital Management | https://www.federalreservehistory.org/essays/ltcm-near-failure | - | HTTP 200, title matched | FIN-C04 |
| S75 | Federal Reserve History | The Great Recession and Its Aftermath | https://www.federalreservehistory.org/essays/great-recession-and-its-aftermath | - | HTTP 200, title matched | FIN-C00, FIN-C01 |
| S76 | Federal Reserve Board | Review of the Federal Reserve's Supervision and Regulation of Silicon Valley Bank (key takeaways; full report PDF) | https://www.federalreserve.gov/publications/2023-April-SVB-Key-Takeaways.htm | 28 April 2023 | HTTP 200; PDF https://www.federalreserve.gov/publications/files/svb-review-20230428.pdf also 200 | FIN-C05 |
| S77 | Federal Reserve Board | Coronavirus Disease 2019 (COVID-19) | https://www.federalreserve.gov/covid-19.htm | - | HTTP 200, title matched | FIN-C06 |
| S78 | SEC and CFTC staff | Findings Regarding the Market Events of May 6, 2010 | https://www.sec.gov/news/studies/2010/marketevents-report.pdf | 30 September 2010 | WebFetch download; title page read: dated 30 September 2010 (a summariser wrongly said 18 May 2010, the preliminary report's date) | FIN-A05, FIN-C02 |
| S79 | SEC staff | Staff Report on Equity and Options Market Structure Conditions in Early 2021 | https://www.sec.gov/about/reports-publications/staff-report-equity-options-market-structure-conditions-early-2021 | 18 October 2021 | WebFetch | FIN-A13, FIN-C07 |
| S80 | SEC (Investor.gov) | Investor Alert: Thinking About Investing in the Latest Hot Stock? Understand the Significant Risks of Short-Term Trading Based on Social Media | https://www.investor.gov/introduction-investing/general-resources/news-alerts/alerts-bulletins/investor-alerts/investor-alert-thinking-about-investing-latest-hot-stock-understand-significant-risks-short-term | 29 January 2021 | HTTP 200, title matched | FIN-A04, FIN-A14, FIN-A32, FIN-C07 |
| S81 | SEC (Investor.gov) | Investor Alert: Beware of Fantasy Stock Trading Websites Offering Real Returns | https://www.investor.gov/introduction-investing/general-resources/news-alerts/alerts-bulletins/investor-alerts/investor-58 | 17 June 2015 | HTTP 200 (sec.gov/oiea/... ia_fantasytrading.html 301-redirects here) | FIN-P01, FIN-A04 |
| S82 | SEC (Investor.gov) | Investor Bulletin: Performance Claims | https://www.investor.gov/introduction-investing/general-resources/news-alerts/alerts-bulletins/investor-bulletins-47 | 15 September 2022 | HTTP 200, title matched | FIN-P01, FIN-A04, FIN-A32, FIN-A33, FIN-C00 |
| S83 | Library of Congress Federal Research Division for the SEC | Behavioral Patterns and Pitfalls of U.S. Investors | https://www.sec.gov/investor/locinvestorbehaviorreport.pdf | August 2010 | WebFetch download; title page read | FIN-A14, FIN-A32 |
| S84 | SEC | Investment Adviser Marketing (small entity compliance guide; hypothetical performance) | https://www.sec.gov/resources-small-businesses/small-business-compliance-guides/investment-adviser-marketing | 28 April 2021 | WebFetch | FIN-A33 |
| S85 | SEC | Trading Suspensions | https://www.sec.gov/litigation/suspensions | - | WebFetch | FIN-A05 |
| S86 | FINRA | Order Types | https://www.finra.org/investors/investing/investment-products/stocks/order-types | - | WebFetch | FIN-A02 |
| S87 | FINRA | Stop Orders: Factors to Consider During Volatile Markets | https://www.finra.org/investors/insights/stop-orders-factors-consider-during-volatile-markets | 26 March 2025 | WebFetch | FIN-A02 |
| S88 | SEC (Investor.gov) | Glossary (index) | https://www.investor.gov/introduction-investing/investing-basics/glossary | - | HTTP 200, title matched | FIN-A15 |
| S89 | SEC (Investor.gov) | Introduction to Investing | https://www.investor.gov/introduction-investing | - | HTTP 200, title matched | FIN-A01 |

**Official but outside the preferred list** (use only with coordinator approval; status checked 2026-10-02):

| Publisher | URL | State |
| --- | --- | --- |
| U.S. Government Publishing Office (FCIC report) | https://www.govinfo.gov/app/details/GPO-FCIC | HTTP 200 (app source fcic-report) |
| FDIC | https://www.fdic.gov/bank-failures | HTTP 200 (app source fdic-2023-review) |
| U.S. Treasury | https://home.treasury.gov/policy-issues/financing-the-government/interest-rate-statistics | HTTP 200 (app source treasury-yield-curve) |
| U.S. Treasury (President's Working Group, 1999) | https://home.treasury.gov/news/press-releases/report3097 | HTTP 200 (app source pwg-ltcm-1999) |
| Yale Program on Financial Stability archive (Brady report) | https://elischolar.library.yale.edu/ypfs-documents/8188/ | HTTP 200 (app source brady-report-1988) |
| NBER (business-cycle dates) | https://www.nber.org/research/data/us-business-cycle-expansions-and-contractions | HTTP 200 (app source nber-cycles) |

**Could not be verified by automated request** (open by hand before use):

| What | URL | Result |
| --- | --- | --- |
| Nasdaq rulebook | https://listingcenter.nasdaq.com/rulebook/nasdaq/rules | 403 to curl and WebFetch - open by hand |
| NYSE rulebook pages | https://nyseguide.srorules.com/rules | no response to automated request - open by hand |
| BLS Employment Situation | https://www.bls.gov/news.release/empsit.toc.htm | 403 to curl (bot block) - open by hand |
| FINRA Fund Analyzer tool | https://tools.finra.org/fund_analyzer/ | linked from S36; not opened |
| FRED and the St. Louis Fed crisis timeline | https://fred.stlouisfed.org/ | connection timed out from this machine - inconclusive |

Note on summaries: one automated summariser misdated the SEC/CFTC flash-crash report as 18 May 2010 (the preliminary report's date); the PDF title page reads 30 September 2010. Dates must be read from the primary document itself.

## 15. Numeric examples register

All inputs are hypothetical round numbers chosen for teaching; none is a market price, an index level or a forecast. Results were computed by a scratch script (agent 5, Node.js) only to check that each example is coherent. **Every one must be programmatically tested in the website repository, with its assumptions, before publication.**

| Id | Used by | Example | Assumptions | Preliminary result (not a publication test) | Status |
| --- | --- | --- | --- | --- | --- |
| NE-01 | FIN-A02 | A sell stop that gaps: planned loss vs realised loss | Hypothetical prices; stop triggers at the open and fills at the opening price with no further slippage; No commissions or fees; Long position | {"plannedLoss":250,"realisedLoss":510,"extraLossFromGap":260} | must be programmatically tested before publication |
| NE-02 | FIN-A01, FIN-A03 | Spread in cents and percent, and round-trip spread cost | Quotes unchanged between buy and sell; Order size fits within displayed size; No commission | {"spread":0.04,"mid":25,"spreadPctOfMid":"0.160%","roundTripSpreadCost":12} | must be programmatically tested before publication |
| NE-03 | FIN-A03 | Market buy that consumes two ask levels: average fill and slippage vs best ask | Hypothetical static book; no hidden liquidity; fills in price priority | {"averageFill":30.018,"slippagePerShare":0.018,"slippageTotal":9} | must be programmatically tested before publication |
| NE-04 | FIN-A01, FIN-A06 | T+1 settlement dates around a weekend and a no-settlement bank holiday | Calendar limited to weekends plus the two 2026 no-settlement days listed by FINRA; a production test must load the full official holiday schedule (exchange holidays are also non-settlement days) | {"2026-10-05":"2026-10-06","2026-10-09":"2026-10-13","2026-10-12":"2026-10-13","2026-11-10":"2026-11-12"} | must be programmatically tested before publication |
| NE-05 | FIN-A05 | Market-wide circuit breaker trigger levels from a prior close | Hypothetical index level (do not use a real index value without a licence check); Thresholds and the 3:25 p.m. rule must be re-checked on Investor.gov at publication | {"level1":4650,"level2":4350,"level3":4000} | must be programmatically tested before publication |
| NE-06 | FIN-A21 | Volatility of a 50/50 two-asset mix at different correlations | Hypothetical volatilities; correlations assumed constant (they are not in a crisis); Single-period, no rebalancing effects | {"rho=1":"15.00%","rho=0.5":"13.23%","rho=0":"11.18%","rho=-0.5":"8.66%","weightedAverageVol":"15.00%"} | must be programmatically tested before publication |
| NE-07 | FIN-A24, FIN-T01 | Replicate the SEC bulletin example ($100,000, 4% a year, 20 years, three fee levels) under two fee conventions | Constant hypothetical growth; fee charged annually; no taxes, loads or trading costs; The SEC bulletin (Investor.gov, 23 July 2025) states approximately $208,000 / $198,000 / $179,000; the test must confirm which convention reproduces the published rounding before the page states it | {"conventionA_netRate":{"0.25%":208815,"0.50%":198979,"1.00%":180611},"conventionB_feeOnEndBalance":{"0.25%":208413,"0.50%":198211,"1.00%":179213},"noFee":219112} | must be programmatically tested before publication |
| NE-08 | FIN-A23 | Lump sum compounding at an assumed constant rate, and the rule of 72 vs exact doubling time | Assumed constant 6% a year is an illustration, not a forecast; Annual compounding, no contributions, fees or taxes | {"fv10":17908.48,"fv20":32071.35,"fv30":57434.91,"doublingExactYears":11.8957,"ruleOf72Years":12} | must be programmatically tested before publication |
| NE-09 | FIN-A25, FIN-T03 | Exact real return vs the subtraction shortcut | Hypothetical rates; inflation measured by a stated CPI series and period at publication | {"exactReal":"2.913%","shortcut":"3.000%","shortcutOverstatesBy":"0.087%"} | must be programmatically tested before publication |
| NE-10 | FIN-A26, FIN-T02 | Gain needed to recover a drawdown, and years to recover at an assumed rate | Assumed constant 6% a year is illustrative, not a forecast; No contributions or withdrawals | {"10%":{"requiredGain":"11.11%","yearsAt6pct":1.81},"20%":{"requiredGain":"25.00%","yearsAt6pct":3.83},"30%":{"requiredGain":"42.86%","yearsAt6pct":6.12},"40%":{"requiredGain":"66.67%","yearsAt6pct":8.77},"50%":{"requiredGain":"100.00%","yearsAt6pct":11.9},"60%":{"requiredGain":"150.00%","yearsAt6pct":15.73},"75%":{"requiredGain":"300.00%","yearsAt6pct":23.79}} | must be programmatically tested before publication |
| NE-11 | FIN-A28 | Margin call price and leverage effect of a 10% price fall | Hypothetical; 50% initial margin (Regulation T) and 25% maintenance (FINRA minimum) - brokers may set higher house requirements; Ignores margin interest and fees | {"marginCallPrice":26.67,"equityAtStart":4000,"equityAfter10pctFall":3200,"equityChange":"-20.00%"} | must be programmatically tested before publication |
| NE-12 | FIN-A29 | Two-day path: index vs a 2x daily-reset fund | Hypothetical returns; fund delivers exactly k times each daily return; no fees, financing costs or tracking error | {"indexCumulative":"-1.00%","twoTimesFundCumulative":"-4.00%","naiveTwoTimesIndex":"-2.00%"} | must be programmatically tested before publication |
| NE-13 | FIN-A22 | Trades needed to restore hypothetical target weights | Hypothetical mix chosen for arithmetic only, not a recommended allocation; No costs, taxes or drift bands | {"stocks":-10000,"bonds":10000,"cash":0} | must be programmatically tested before publication |
| NE-14 | FIN-A11 | Net income flows into retained earnings (fictional company) | Fictional company and round numbers; a full test must also check that the balance sheet balances and cash flow reconciles | {"grossProfit":400,"operatingIncome":150,"netIncome":97.5,"closingRetainedEarnings":467.5} | must be programmatically tested before publication |
| NE-15 | FIN-A09 | Theoretical ex-date adjustment and dividend yield | Hypothetical; the actual opening price is set by trading, not by the formula; Before tax | {"theoreticalExReference":49.5,"dividendYield":"4.00%"} | must be programmatically tested before publication |
| NE-16 | FIN-A10 | Forward split, reverse split and buyback EPS arithmetic | Value before market reaction; buyback ignores the interest lost on the cash spent | {"splitShares":400,"splitPrice":50,"splitValueUnchanged":true,"reverseShares":100,"reversePrice":15,"epsBefore":2,"epsAfter":2.2222} | must be programmatically tested before publication |
| NE-17 | FIN-A08 | Same three hypothetical stocks, two weighting rules, opposite signs | Hypothetical stocks; divisor unchanged within the day; no corporate actions | {"priceWeighted":"5.56%","capWeighted":"-0.45%"} | must be programmatically tested before publication |
| NE-18 | FIN-A13 | Loss on a short that rises, and borrow fee under two day-count conventions | Hypothetical; fee charged on the entry notional for simplicity (brokers mark to market daily); basis 360 or 365 is a broker convention that must be stated | {"pnl":-600,"borrowFee360":8.33,"borrowFee365":8.22} | must be programmatically tested before publication |
| NE-19 | FIN-A14, FIN-A32 | Annual cost of frequent round trips (hypothetical) | Hypothetical cost of 0.15% per round trip (spread + slippage); no commissions; returns before costs ignored | {"annualCost":900,"dragOnAccount":"4.50%"} | must be programmatically tested before publication |
| NE-20 | FIN-A33 | Chance that at least one of 20 useless rules looks significant | Independent tests, every rule has no real edge | {"probabilityAtLeastOneFalsePositive":"64.15%"} | must be programmatically tested before publication |
| NE-21 | FIN-A27 | Same returns, different order: no withdrawals vs annual withdrawals | Hypothetical returns; withdrawal taken at the start of each year; no fees or taxes | {"noWithdrawal":[{"order":[0.15,-0.1,0.05],"end":217350},{"order":[-0.1,0.05,0.15],"end":217350},{"order":[0.05,0.15,-0.1],"end":217350}],"withWithdrawal":[{"order":[0.15,-0.1,0.05],"end":186532.5},{"order":[-0.1,0.05,0.15],"end":182907.5},{"order":[0.05,0.15,-0.1],"end":187132.5}]} | must be programmatically tested before publication |
| NE-22 | FIN-A30 | Price of a 10-year 4% annual-coupon bond at 4% and 5% yields; duration estimate | Hypothetical option-free bond, annual coupons, no accrued interest, flat yield | {"priceAt4":1000,"priceAt5":922.78,"actualChange":"-7.72%","macaulay":8.4353,"modified":8.1109,"durationEstimate":"-8.11%"} | must be programmatically tested before publication |
| NE-23 | FIN-A31 | Curve spread in basis points from two hypothetical yields | Hypothetical yields; any real figure must be quoted from Federal Reserve H.15 with its date | {"spreadBps":-25} | must be programmatically tested before publication |
| NE-24 | FIN-A20 | Average return vs compound return, and sample standard deviation | Hypothetical annual returns | {"arithmeticMean":"3.00%","geometricMean":"2.77%","sampleStdDev":"7.75%"} | must be programmatically tested before publication |

Notable result: NE-07 shows that the SEC fee bulletin's published figures (about $208,000, $198,000 and $179,000) are reproduced only when the fee is charged on the end-of-year balance; subtracting the fee from the growth rate gives about $208,815, $198,979 and $180,611 instead. FIN-A24 and FIN-T01 must state the convention.

## 16. Owned media

| Asset | Path | Status for website use |
| --- | --- | --- |
| Source artwork (golden bull, green candles, rising arrow), 1254x1254 | `assets/branding/new app icon.png` | Not used on the website; the site uses the icon from the live Play listing. |
| Derived icons: icon, iOS icon, adaptive foreground, monochrome, splash, favicon, notification, 512 px Play icon | `assets/branding/icon.png`, `icon-ios.png`, `adaptive-icon-foreground.png`, `adaptive-icon-monochrome.png`, `splash-icon.png`, `favicon.png`, `notification-icon.png`, `play-store-icon.png` | Generated by `scripts/build-branding.py` from the artwork above. On the website, use the icon from the live Play listing (the site fetches listing icons). |
| Earlier candle mark | `assets/branding/app-icon-source.png` | Retired by the project; do not use. |
| Charts and diagrams | `src/ui/charts/*.tsx` (candles, order-book ladder, payoff, allocation, heat matrix, histogram, line, bar, sparkline) | Reign-owned code; no image files exist. Draw new original SVG diagrams from tested numbers for the website rather than screenshots. |
| Case-study figures | `src/content/trading/history/figure-kit.ts`, `src/content/trading/case-study-figures.ts` | Owned but synthetic ("historical-inspired", rebased to 100). Never present as historical data. |
| Screenshots / video | none in the project | If captured from the live build later: crop out AdMob slots (third-party ad creatives) and keep the "Simulated" badge visible. |

**Third-party elements (not owned):** icon glyphs from Material Community Icons and Ionicons via `@expo/vector-icons` (open-source licences); real people in the 18 investor profiles; real companies in case studies; the reserved list of real tickers in `instruments.ts`; cited books, papers, letters and memos (attributed, not reproduced). The app bundles no market data.

## 17. Compliance checklist

**Required visible disclosure** on every finance page and tool, above the body and beside every calculator result:

> Educational content only; not investment, tax, or legal advice. Investing involves risk, including possible loss of principal. Simulator results are hypothetical and do not represent actual trading.

**Ownership disclosure**, visible near the first mention of the app and every call to action:

> Reign Creative LLC owns and promotes the Stock Trading Simulator Game.

**Must be true before any page is published**

- [ ] The app is live: the Play details page returns 200 signed-out (`hl=en&gl=US`), `npm run verify:play` has captured its facts, and the catalog entry and icon come from the live listing.
- [ ] The inventory has been re-extracted from the exact released build; every lesson, feature and count a page mentions exists in that build (shard drafts excluded unless shipped).
- [ ] Any app lesson the page links has been checked against the current rule text; citations use the re-opened pages in section 14, never the app's citations.
- [ ] Each numeric example on the page is covered by an automated test in the website repo with its stated assumptions.
- [ ] Every source was re-opened within seven days of publication, still says what the page says, and any rule carries its jurisdiction and an as-of date.
- [ ] Human review: the site now allows an AI-reviewed label (`editorialReview: "automated"`, Path A in `docs/publishing-workflow.md`, changed by commit `fd1066c` on 2026-10-02), but for this YMYL material review by a named person (`editorialReview: "person"` with `editorialApproved`, `reviewerName`, `reviewDate`, `sourcesChecked`, `reviewNotes`, Path B) is strongly advised for every finance page and should be treated as required for the high-risk pages (FIN-A04, A13, A22, A27, A28, A31, C07). Those pages, and the disclosure wording, should also be read by someone familiar with US securities rules. Only the reviewing person fills in the record.
- [ ] Site prerequisites from section 12 are merged and the build gates pass.

**Content rules (apply to every page)**

- General education only. No personalised recommendations, buy/sell instructions, price targets, market-timing calls, guaranteed or projected returns, "best stocks to buy now", tax or legal advice, or urgency/FOMO language ("act now", "don't miss", "before it's too late", "get rich", "can't lose", "risk-free", "beat the market").
- Impersonal: no questionnaires or tools that output an allocation, a position size or a trade for the reader.
- Simulator results are hypothetical: no screenshots of gains as achievements, no leaderboards, prizes, entry fees or "real returns" framing (S81), and the rewarded practice-cash top-up is described as having no monetary value.
- Real companies appear only in dated case studies drawn from official records; examples otherwise use fictional or generic instruments; no tickers presented as ideas.
- No commercial index-level series or vendor price data reproduced; government data (H.15, BLS CPI) quoted with series and date.
- Rules state jurisdiction (US) and an as-of date, and link the primary rule or regulator page.
- Regulators are cited as sources only: no logos and nothing implying endorsement or affiliation.
- Ads and analytics described consistently with the live listing and the privacy policy.
- Original writing only: the app's lessons, glossary and explainers are planning inputs, never copy.

## 18. Exact steps to unblock

In order. Steps 1-3 are owner actions outside this repository. Further owner-only steps about the app are kept outside this public repository.

1. **Decide the shard drafts.** Either keep units 29-37 excluded or finish, test and ship them; the website will only describe what ships.
2. **Complete the Play Console steps** in `docs/RELEASE.md` section 4 (ads declaration, Advertising ID, Data safety, content rating), confirm `reigncreativellc.com/app-ads.txt` covers this app's AdMob publisher id (not checked here: AdMob ids were off-limits), and set the listing's Website field to `https://reigncreativellc.com/`.
3. **Submit** the verified production AAB (versionCode 6 or later) and wait until the listing is public.
4. **Verify live:** signed-out request to `https://play.google.com/store/apps/details?id=com.reigncreative.stocktradingsim&hl=en&gl=US` returns 200; add the package to `PACKAGES` in `scripts/verify-play-listings.mjs`; run `npm run verify:play` and confirm the JSON-LD facts (name, category, content rating, contains ads) in `scripts/play-verification.json`.
5. **Re-extract** with section 19 against the released commit; diff against sections 3-10 and update `docs/data/finance-candidates.json` if anything changed.
6. **Site groundwork** (section 12): category decision, `finance` disclaimer kind and ownership disclosure, catalog entry from live facts, app slug from the live title, preflight banned phrases. `npm run build` must pass.
7. **Publish FIN-P01 first**, then write articles in priority order as `status: "draft"` with `noindex: true`; add the numeric tests; run `node scripts/preflight-articles.mjs --only <slug>`; move to `review`; have a named person review each one (Path B, section 17); publish with `node scripts/publish-batch.mjs <slug>` (the site removed its daily cap on 2026-10-02, so pace releases by review capacity, not by a quota). Create each hub only after five of its members are live; build the tools as a separate phase.
8. **After publication:** re-check sources quarterly and immediately when a cited rule changes; log corrections in frontmatter.

## 19. Appendix: commands

Re-check the blocker:

```bash
curl -s -o /dev/null -w "%{http_code}\n" -A "Mozilla/5.0" "https://play.google.com/store/apps/details?id=com.reigncreative.stocktradingsim&hl=en&gl=US"
```

Read-only recount (save as `recount.ts` outside the project; run with the project's tsx):

```bash
PROJ="C:/Users/regal/Desktop/Stock Trading Simulator Game"
touch marker && "$PROJ/node_modules/.bin/tsx" --tsconfig "$PROJ/tsconfig.json" recount.ts "$PROJ"
find "$PROJ" -newer marker -print   # must print nothing
git -C "$PROJ" status --short       # must print nothing
```

```ts
// Compact, read-only recount of the shipped content pack. Run from any folder:
//   "<proj>/node_modules/.bin/tsx" --tsconfig "<proj>/tsconfig.json" recount.ts "<proj>"
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';

const proj = process.argv[2];
const m = (rel: string) => import(pathToFileURL(join(proj, rel)).href);

(async () => {
  const c = await m('src/content/trading/curriculum/index.ts');
  const x = await m('src/content/trading/curriculum/extended.ts');
  const l = await m('src/content/trading/lessons/index.ts');
  const g = await m('src/content/trading/glossary.ts');
  const h = await m('src/content/trading/history/index.ts');
  const cs = await m('src/content/trading/case-studies.ts');
  const t = await m('src/content/trading/tools.ts');
  const k = await m('src/ui/tools/calculators.ts');
  const ce = await m('src/content/trading/chart-exercises.ts');
  const s = await m('src/content/trading/sources.ts');
  const st = await m('src/content/trading/strategies.ts');
  const sc = await m('src/content/trading/scenarios.ts');
  const q = await m('src/content/trading/questions/index.ts');
  const ins = await m('src/kernel/market/instruments.ts');
  const out = {
    unitsVisible: c.UNITS.length,
    unitsDeclaredHidden: x.EXTENDED_UNITS.length,
    topics: c.ALL_TOPICS.length,
    lessonsCore: l.CORE_LESSONS.length,
    lessonsAll: l.LESSONS.length,
    workedExamples: l.CORE_LESSONS.reduce((n: number, z: any) => n + z.examples.length, 0),
    glossaryTerms: g.GLOSSARY.length,
    historyCases: h.HISTORY_CASES.length,
    historyMetrics: h.HISTORY_METRIC_COVERAGE,
    caseStudies: cs.CASE_STUDIES.length,
    toolsCatalogue: t.TOOLS.length,
    calculators: k.ALL_CALCULATORS.length,
    chartExercises: ce.chartExercises().length,
    failedOrAmbiguousShare: ce.chartExerciseFailureRate(),
    sources: s.SOURCES.length,
    strategies: st.STRATEGIES.length,
    scenarios: sc.SCENARIOS.length,
    questions: q.QUESTIONS.length,
    instruments: ins.INSTRUMENTS.length,
  };
  console.log(JSON.stringify(out, null, 2));
})();
```

Expected output at commit `7bf9194`: unitsVisible 28, unitsDeclaredHidden 9, topics 280, lessonsCore 280, lessonsAll 280, workedExamples 1097, glossaryTerms 881, historyCases 18, historyMetrics 119/41/160, caseStudies 11, toolsCatalogue 35, calculators 33, chartExercises 190, failedOrAmbiguousShare 0.547, sources 111, strategies 42, scenarios 103, questions 2252, instruments 233.

Shard wiring check:

```bash
grep -h "^export" "$PROJ/src/content/trading/shards/generated/"*.ts   # every export is = [] or = {}
```
