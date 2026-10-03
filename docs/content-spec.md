# Article authoring spec

Every file in `content/blog/` must satisfy this spec. The build enforces most of
it (`src/lib/blog/index.ts` at parse time, `scripts/validate-content.mjs` after
export) — a violation fails `npm run build`, it does not warn.

## File format

`content/blog/<kebab-case-slug>.md`. The slug is the URL: `/blog/<slug>/`.

The file opens with a `---` fenced block containing **JSON** (not YAML), then the
Markdown body.

```
---
{ ...frontmatter... }
---

Body starts here.
```

## Frontmatter fields

| Field | Type | Rules |
| --- | --- | --- |
| `title` | string | The H1. Full sentence allowed; no length cap. |
| `metaTitle` | string | **≤ 60 characters.** Used in `<title>`. Front-load the keyword. |
| `description` | string | **70–160 characters.** Meta description. Must read as a sentence, not a keyword list. |
| `status` | enum | `draft` \| `review` \| `scheduled` \| `published`. Only `published` is ever public. `scheduled` requires `editorialReview: "person"` with the full review record, and `publishAt`. See [publishing-workflow.md](./publishing-workflow.md). |
| `editorialReview` | enum? | How the article was checked before it went live: `person` \| `automated`. **Required on every article published after 2026-09-22 and on every scheduled one**; absent on the 525 legacy articles. Renders the label under the byline and in the author box. `automated` = automated checks plus a logged AI editorial review, no person — the article says "AI-assisted article … No person has reviewed it yet." |
| `editorialApproved` | bool? | `true` states that a named person read the complete article and approved it. Valid **only** with `editorialReview: "person"` and the four record fields below; the build fails otherwise. Never set it on an article nobody has read. |
| `reviewerName` | string? | `person` only, required: who read and approved it. Written by that person — never by a script or an AI agent. |
| `reviewDate` | date? | `person` only, required: the Los Angeles day they approved it. Not in the future. |
| `sourcesChecked` | string[]? | `person` only, required, non-empty: the `url` of each of the article's own `sources` the reviewer opened. A URL that is not one of `sources` fails the build. |
| `reviewNotes` | string? | `person` only, required: what the reviewer checked or changed. |
| `publishAt` | date? | `scheduled` only: the earliest America/Los_Angeles day it may be released. A plan, not a publication date. |
| `publishedAt` | date | `YYYY-MM-DD`, America/Los_Angeles: the day the article actually went live. The publish step stamps it; never set it earlier. A `published` article may not carry a future date — the build fails. No article may be dated after 2026-09-22 and before 2026-10-02 (nothing was published then, and the editorial policy says so). |
| `updatedAt` | date | `YYYY-MM-DD`. Same as `publishedAt` unless visible content was genuinely revised (body, FAQs, takeaways, sources, title or description). Adding a link is not a revision; `scripts/audit-authorship.mjs` fails a bump with no content change. |
| `author` | string | An author id from `src/data/authors.ts` — currently only `reign-creative-llc`. The byline, the structured data and the profile page all read the registry. |
| `category` | enum | One of the seven app category ids. |
| `tags` | string[] | 3–6 lowercase topical tags. |
| `primaryKeyword` | string | **Must be unique across every article.** A duplicate fails the build. |
| `secondaryKeywords` | string[] | 3–8 terms. |
| `intent` | enum | `informational` \| `commercial` \| `transactional` \| `navigational` |
| `relatedApps` | string[] | ≥ 1 real app slug. First entry is the CTA app. |
| `relatedArticles` | string[] | Slugs of other articles. Must exist and must not include itself. |
| `faqs` | {question, answer}[] | 4–6 entries. Answers are 2–5 sentences and self-contained. |
| `sources` | {title, publisher, url, accessed}[] | `url` must be `https://`. `accessed` is `YYYY-MM-DD`. Required for any external factual claim. |
| `takeaways` | string[] | 3–5 sentences a reader could act on. |
| `disclaimer` | enum | `none` \| `health` \| `language` \| `comparison` |
| `featured` | bool? | Optional. Homepage/blog featured slot. |
| `noindex` | bool? | Optional. **Required `true` on every draft.** Fails the build if set on a published article. |
| `researchDate` | date? | **Required when `disclaimer` is `comparison`.** |
| `hubs` | string[]? | Topic hub ids from `src/data/hubs.ts`. An education-brain article should declare its hub. |
| `corrections` | {date, note}[]? | Corrections that changed what the article says. Rendered on the article; each date must fall between `publishedAt` and `updatedAt`. |
| `longTailKeywords` | string[]? | Planning only. Feeds the keyword map. |
| `comparisonKeywords` | string[]? | Planning only. |
| `aiSearchQuestions` | string[]? | Questions an AI assistant might be asked that this article answers. |
| `demandTier` | enum? | `unverified-high` \| `unverified-medium` \| `unverified-low`. **Estimates, never presented as data.** |

## Body rules

- Start with prose. **No H1 in the body** — `title` renders the H1.
- Use `##` for sections and `###` for sub-sections. Never skip a level.
- 1,200–2,500 words is typical. There is no minimum; do not pad to hit a number.
- Link the primary app at least once as `[App Name](/apps/<slug>/)`. Do **not**
  hand-write Google Play URLs in the body — the CTA components add the tracked
  install link automatically.
- Link 2–5 related articles and at least one category page (`/apps/category/<id>/`
  or `/blog/category/<id>/`) where it genuinely helps the reader.
- Tables, lists and blockquotes are supported (GFM).

## Hard prohibitions

These are the rules the business depends on. Breaking one is worse than shipping
nothing.

1. **No invented numbers.** No download counts, user counts, ratings, review
   quotes, revenue, search volumes, difficulty scores, CPC, or traffic
   projections. If you cannot cite it, cut it.
2. **No invented app features.** Everything said about a Reign Creative app must
   come from `src/data/apps/catalog/*.ts` (run `node scripts/dump-catalog.mjs <slug>`).
   If a feature is not in the catalog, it does not exist.
3. **No ranking, install or outcome promises.**
4. **No fake review credentials.** Never claim medical, dietetic, native-speaker
   or professional review. No fabricated author bios.
5. **No competitor logos, screenshots, icons or trade dress.** Names only, used
   nominatively, with no implied affiliation or endorsement.
6. **No unverified competitor claims.** Anything said about another product must
   be checkable against that company's own current published material, and the
   article must carry `disclaimer: "comparison"` plus a `researchDate`.
7. **No disparagement.** Describe differences, not defects. A comparison must
   stay useful to a reader who ends up choosing the competitor.
8. **No filler.** No "in today's fast-paced world", no restating the H2 as the
   first sentence, no summary paragraph that repeats the section verbatim, no
   keyword stuffing, no invented statistics to open a section.
9. **No medical, legal or financial advice.** Health articles carry the health
   disclaimer, cite NIH / USDA / FDA / CDC primary sources, and never diagnose,
   prescribe, or promise weight-loss results.
10. **No sports data from the apps, and no implied affiliation.** Our career
    simulators use fictional players, teams and leagues. Our draft and GM games
    build their player pools from real-world players' careers, with ratings that
    are the game's own estimates — so an article must:
    - never reproduce an app's player records, ratings, rosters or pools;
    - never attach an app's rating or projection to a named real athlete;
    - never imply that a league, team, players' association or athlete is
      affiliated with, endorses or licenses any of our apps, and never use team
      logos, league branding or athlete images;
    - never describe a draft/GM app as using fictional or generic players (a
      career sim may be described as fictional, because it is).
    Real leagues, rules and records may be named nominatively where an official
    or reputable source supports the fact, and the source is cited.
11. **No gambling framing.** Simulated results are not predictions and must never
    be presented as betting guidance.

## Category-specific requirements

- **health-nutrition** — `disclaimer: "health"`. Cite NIH, USDA FoodData Central,
  FDA, CDC or MedlinePlus. Distinguish official reference intakes from personal
  targets. Never state a number as a recommendation for the reader.
- **language-learning** — `disclaimer: "language"`. Use correct Unicode for the
  script (Jyutping for Cantonese, Thai script, Cyrillic, Khmer). Present standard
  forms, flag regional variation, and never claim native-speaker review. Cite
  Unicode, Ethnologue, or a national language authority for script claims.
- **education-brain** — Separate documented fact from historians' interpretation.
  Cite museums, universities, or national archives.
- **sports-gm** — Explain the assumptions a simulation makes. No guaranteed
  outcomes, no app player data (rule 10), no betting language.
- **action-arcade / anime-creative / video-utility** — `disclaimer: "none"` unless
  the article compares products.

## Draft articles

Drafts exist in the repo but must be invisible to the public build:

```json
"status": "draft",
"editorialReview": "automated",
"noindex": true
```

(`editorialReview` may be set while drafting — it is the label the article will
carry. Leave `editorialApproved` and the review record out unless a person has
actually reviewed it.)

A draft is a **complete, publishable article**, not an outline. It must satisfy
every rule above. `publishedAt` on a draft is a *planned* date — it is not a
claim that the article was published then, and the site never renders it.

`scripts/validate-content.mjs` fails the build if a draft slug reaches `out/`,
appears in the sitemap or RSS, or is linked from any exported page.

## Before you finish

```
node scripts/dump-catalog.mjs <app-slug>            # verify every app claim
node scripts/preflight-articles.mjs --only <slug>   # claim-safety and structure checks
node scripts/publish-batch.mjs <slug> --dry-run     # would it publish? (needs its editorial review)
npm run build                                       # parse + export + every gate
```

There is no release schedule: a finished article is published once it passes
every check — see [publishing-workflow.md](./publishing-workflow.md).
