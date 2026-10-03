# Writing brief — 2026-10 sports expansion (shared by every writer agent)

Repo: `C:\Users\regal\Desktop\Website` (Next.js static site, https://reigncreativellc.com,
company Reign Creative LLC, Google Play developer name "Reign Collective Apps").
Today: 2026-10-02 (America/Los_Angeles).

## Read first
1. `docs/content-spec.md` — the article contract (JSON frontmatter, body rules, hard
   prohibitions; rule 10 was rewritten today).
2. `docs/content-review-process.md` — what the AI editorial review will check.
3. A published sports article for format and tone, e.g. `content/blog/how-draft-lotteries-work.md`.
4. Your candidates, by `id`, in `private/research/expansion-candidates-team-sports.json` (owner-only; not in the public repository) or
   `private/research/expansion-candidates-other-sports.json` (owner-only; not in the public repository) — use each candidate's `slug`, `title`,
   `primaryKeyword`, `secondaryKeywords`, `intent`, `primaryApp`, `relatedApps`,
   `cornerstone`, `relatedArticles`, `nearestExisting`, `overlapVerdict`, `angle` and
   `suggestedSources`. You may improve the title or angle; never change the slug or the
   primary keyword without telling the coordinator.
5. App facts: ONLY from `node scripts/dump-catalog.mjs <app-slug>`. Anything not in the
   catalog does not exist. Use the catalog's current names (e.g. the football GM app is now
   "Football Franchise GM League"; rugby has a career app `rugby-career-sim`, "Pro Rugby
   Career Sport Sim").
6. `docs/sports-data-provenance.md` §1–3 (summary): the seven draft/GM apps build player
   pools from REAL athletes' careers; only the career sims are fictional.

## Frontmatter (JSON between `---` lines; keep this key order)
```json
{
  "title": "…",
  "metaTitle": "≤ 60 chars, natural, front-loaded",
  "description": "70–160 chars, a real sentence",
  "status": "review",
  "editorialReview": "automated",
  "publishedAt": "2026-10-02",
  "updatedAt": "2026-10-02",
  "author": "reign-creative-llc",
  "category": "sports-gm",
  "tags": ["3–6 lowercase tags"],
  "primaryKeyword": "from the candidate (unique site-wide)",
  "secondaryKeywords": ["3–8"],
  "intent": "informational",
  "longTailKeywords": ["optional"],
  "aiSearchQuestions": ["optional: questions this page answers"],
  "relatedApps": ["<primaryApp>", "<0–2 related apps>"],
  "relatedArticles": ["2–6 existing PUBLISHED slugs only — the batch linking pass adds links between new articles later"],
  "takeaways": ["3–5 actionable sentences"],
  "disclaimer": "none",
  "featured": false,
  "faqs": [{ "question": "…", "answer": "2–5 self-contained sentences" }],
  "sources": [{ "title": "…", "publisher": "…", "url": "https://…", "accessed": "2026-10-02" }],
  "noindex": true
}
```
Never add `editorialApproved`, `reviewerName`, `reviewDate`, `sourcesChecked` or
`reviewNotes` — those record a PERSON's review and an agent must never write them.
4–6 FAQs. Every source is a page you actually opened today (WebFetch) and that supports
the claims you attribute to it. No `demandTier`. `disclaimer: "comparison"` (+
`researchDate`) only if the article compares products.

## Body
- Prose first; no H1; `##` sections and `###` sub-sections, never skipping a level.
- Answer the page's main question directly in the first paragraph or two (a reader and an
  AI system should get the fact without scrolling). Use short fact summaries, tables (with a
  header row) and worked examples with stated assumptions where they help.
- Typically 1,200–2,200 words. No padding, no filler ("in today's fast-paced world"), no
  section that restates its heading, no summary that repeats the article. Vary structure
  between your articles — a similarity check compares every pair of articles.
- Links (relative, trailing slash): the primary app page `/apps/<slug>/` at least once with
  a descriptive anchor (vary anchors; never the same exact-match anchor repeatedly); the
  sport hub `/sports/<sport>/` once (sport ids: basketball, baseball, football, hockey,
  soccer, rugby, combat-sports, tennis, golf; cross-sport pieces link `/sports/`); the
  candidate's cornerstone article; 2–5 related EXISTING published articles where they help
  the reader. Body links may point only at articles already published today — never at a
  sibling from this batch. Never hand-write a Google Play URL (the template adds the tracked
  install button).
- How the topic shows up in our app: optional, short, and ONLY with catalog-supported facts.
  Explain what a simulation assumes; never present simulated outcomes as predictions.

## Accuracy, rights and tone
- Every real-world fact (rules, dates, records, formulas, history) must be supported by a
  cited source you opened; prefer official rulebooks and governing bodies (league/IFAB/World
  Rugby/USGA–R&A/ITF/ATP–WTA/athletic commissions/official league sites), then reputable
  references. If sources disagree or a rule changed recently, say so and give the date.
  If you cannot verify a claim, cut it. Never invent statistics, quotes or numbers.
- Rules change. State the season/edition a rule applies to ("as of the 2026–27 season") and
  check the CURRENT rule, not last year's.
- Real leagues, teams, athletes and records may be NAMED nominatively for rules, records and
  history, with a citation. No profiles of individual athletes, no lists of active athletes'
  current records that will go stale, no logos/branding, no implied affiliation. League names
  in titles only when the article is genuinely about that league's rules or history.
- Our apps: never describe the draft/GM apps as fictional or generic; never reproduce any
  app's player records, ratings or rosters; never attach an app rating to a real athlete; the
  career sims may be described as fictional. No "best app" superlatives, no install or
  outcome promises, no ratings/downloads.
- No betting/odds/picks framing. No medical advice (injury content stays general).
- Write in your own words. Quotations ≤ 25 words, attributed. Don't copy source structure.
- Original value: decision frameworks, worked examples, common mistakes, "what this changes
  for a coach/GM/player", comparisons between rule sets — something a reader can't get from
  the rulebook alone.

## Before you finish each article
```
node scripts/preflight-articles.mjs --only <slug>      # must pass
node scripts/publish-batch.mjs <slug> --dry-run        # ignore "no review-log entry"; fix anything else
```
Also confirm the frontmatter parses as JSON, every `relatedArticles` slug exists in
`content/blog/`, every app slug exists in the catalog, and your primary keyword is not any
other article's `primaryKeyword` (grep). Do NOT run `npm run build`, `next build` or any
`npm run audit:*`; do not edit any file other than your own new articles; do not commit.

## Final message to the coordinator (≤ 300 words)
Slugs written (with word counts and source counts), any candidate you skipped or changed and
why, facts you could not verify and removed, and anything the reviewer should look at closely.
