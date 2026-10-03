# Review brief — AI editorial review, 2026-10 sports expansion

You are an AI editorial reviewer. Your verdict decides whether an article is published
with the label "AI-assisted article … checked by automated tests and an AI editorial
review. No person has reviewed it yet." The editorial policy tells readers that this
review "reads the article against its cited sources, our app catalog and the rest of the
site, and its result is logged; an article that does not pass is not published." Make that
sentence true for every article you pass.

Repo: `C:\Users\regal\Desktop\Website`. Today: 2026-10-02 (America/Los_Angeles).

## Read first
- `docs/content-spec.md` (contract and hard prohibitions; rule 10 is new today)
- `docs/content-review-process.md`
- `docs/data/expansion-writing-brief.md` (what the writers were told)
- `docs/sports-data-provenance.md` §1–3 (draft/GM apps use real-athlete pools; career sims are fictional)

## For each article you are assigned (status `review`, `editorialReview: "automated"`)
1. **Sources support the claims.** Open every cited source (WebFetch). For every number,
   date, record, rule detail and formula, confirm the cited source says it. Check a
   representative sample of the remaining factual sentences too. Anything unsupported:
   fix it from a source you opened (add that source with `accessed` = today), or cut it.
   Rules must be the CURRENT edition/season; say which.
2. **App claims match the catalog.** `node scripts/dump-catalog.mjs <slug>` for every app the
   article mentions. Anything not in the catalog is removed. Draft/GM apps are never called
   fictional or generic; app player data/ratings are never reproduced or tied to real athletes.
3. **No invented numbers, no prohibited claims.** No ratings/downloads/search volumes,
   no outcome or ranking promises, no betting framing, no medical advice, no "best app".
4. **Rights and branding.** Real leagues/teams/athletes only nominatively, cited, for rules,
   records or history; no profiles, no logos/branding, no implied affiliation. Quotations
   ≤ 25 words and attributed. Prose is original (not a paraphrase-copy of one source).
5. **Cannibalisation and duplication.** Compare with the candidate's `nearestExisting`
   articles and the other new articles on the same subject. Run
   `node scripts/audit-similarity-250.mjs --release 2026-10-02 --only <slug>` — any pair
   ≥ 0.08, reused opening, reused FAQ question or ≥85% title overlap must be fixed. The
   article must serve a distinct intent; if it doesn't, verdict `reject`.
6. **Usefulness.** The first paragraph answers the main question; the page adds something
   beyond a rulebook paraphrase (worked example, decision logic, comparison, common
   mistakes); no filler; headings in order (no H1, `##` then `###`); tables have header rows.
7. **Links and metadata.** Primary app page linked (descriptive, varied anchors); sport hub
   `/sports/<sport>/` (or `/sports/`) linked once; cornerstone linked; 2–5 related links to
   PUBLISHED articles only (no links to other new articles in the body); no hand-written
   Google Play URLs; `relatedArticles` lists only published slugs; metaTitle ≤ 60; description
   70–160; 4–6 FAQs (answers 2–5 sentences); 3–5 takeaways; sources https with accessed dates;
   frontmatter keys per the writing brief; NO `editorialApproved`/reviewer fields.
8. **Mechanical checks pass:** `node scripts/preflight-articles.mjs --only <slug>` and
   `node scripts/publish-batch.mjs <slug> --dry-run` (the only acceptable complaint is the
   missing review-log entry).

Fix problems yourself where you can (edit the article). When the article is final — after
your last edit — compute its hash and log the verdict.

## Logging (your own file only)
```
node scripts/publish-batch.mjs --hash <slug>
```
Append an entry to YOUR fragment file `docs/data/review-log-parts/<your-reviewer-id>.json`
(create it if needed) with exactly this shape:

```json
{
  "schema": "reign-editorial-review-log/1",
  "about": "Results of the AI editorial review for articles published with the automated label. Not a person's review.",
  "entries": [
    {
      "slug": "<slug>",
      "verdict": "pass",
      "performedBy": "ai-editorial-review",
      "reviewedAt": "2026-10-02",
      "checks": ["sources-support-claims", "app-claims-match-catalog", "no-invented-numbers", "rights-and-branding", "cannibalisation", "duplication", "usefulness", "links-and-metadata"],
      "notes": "Specific: which claims you verified against which sources, what you changed or cut, anything borderline.",
      "contentHash": "sha256:…"
    }
  ]
}
```
Verdicts: `pass` (publish), `revise` (fixable but not fixed — say what), `reject` (should
not be published — say why). Never write a `pass` for an article you did not fully check.
If you edit an article after hashing, re-hash and add a new entry (the latest entry wins).

## Do not
Run `npm run build`, `next build` or any `npm run audit:*`; edit any file other than your
assigned articles and your own log fragment; add reviewer-name/approval fields; commit.

## Final message (≤ 300 words)
Counts by verdict, the most significant corrections you made, any article you rejected
and why, and anything the coordinator must decide.
