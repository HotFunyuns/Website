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
| `status` | enum | `draft` \| `review` \| `scheduled` \| `published` |
| `publishedAt` | date | `YYYY-MM-DD`. A future date keeps the article unpublished even if status is `published`. |
| `updatedAt` | date | `YYYY-MM-DD`. Same as `publishedAt` unless the content was genuinely revised. |
| `author` | string | `Reign Creative Team` |
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
10. **No copyrighted sports data.** No real player databases, team names, team
    logos, or league branding. Our sports games are generic simulators.
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
  outcomes, no real-league data, no betting language.
- **action-arcade / anime-creative / video-utility** — `disclaimer: "none"` unless
  the article compares products.

## Draft articles

Drafts exist in the repo but must be invisible to the public build:

```json
"status": "draft",
"noindex": true
```

A draft is a **complete, publishable article**, not an outline. It must satisfy
every rule above. `publishedAt` on a draft is a *planned* date — it is not a
claim that the article was published then, and the site never renders it.

`scripts/validate-content.mjs` fails the build if a draft slug reaches `out/`,
appears in the sitemap or RSS, or is linked from any exported page.

## Before you finish

```
node scripts/dump-catalog.mjs <app-slug>   # verify every app claim
npm run build                              # parse + export + gate
```
