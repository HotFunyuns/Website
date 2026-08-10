# Draft review and publishing process

Draft articles live in `content/blog/` alongside published ones. They are
**complete, finished articles** — not outlines — that have not yet been approved
for publication. Nothing about a draft reaches the public site.

## Why drafts are gated

Publishing a large batch of pages at once, most of them thin or unreviewed, is
the pattern search engines treat as scaled content abuse. The cost of getting it
wrong is site-wide, not page-wide. So the drafts sit in the repository, ready,
and are released deliberately.

## How a draft is invisible

Three independent mechanisms, each of which would be sufficient alone:

1. **The data layer.** `src/lib/blog/index.ts` exports `posts`, which is filtered
   through `isPublicPost()`. Every route, the sitemap, the RSS feed, category
   listings, related-article links and structured data read `posts` and nothing
   else. `allPosts` exists but is never rendered.
2. **The router.** `generateStaticParams()` in `src/app/blog/[slug]/page.tsx`
   returns published slugs only, and `dynamicParams = false`. A draft slug
   therefore has no route at all — guessing the URL returns a 404, not a page.
3. **The build gate.** `scripts/validate-content.mjs` runs after export as part of
   `npm run build`. It fails the build if a draft slug appears as an exported
   page, in `sitemap.xml`, in the RSS feed, or as a link on any exported page.

A draft also carries `"noindex": true`, which is belt-and-braces: it only matters
if all three mechanisms above failed simultaneously.

`"status": "published"` with a future `publishedAt` is treated as unpublished, so
scheduling is the same mechanism rather than a separate one.

## The nine steps

A draft moves to published only by completing all nine. Steps 1–8 are a human
reading the article; step 9 is the machine.

**1. Verify every app claim.**
Run `node scripts/dump-catalog.mjs <app-slug>` and check each statement about the
app against it. Features not in the catalog do not exist. Delete anything you
cannot confirm — do not soften it.

**2. Verify every external fact.**
Open each URL in `sources`. Confirm it resolves, that it actually supports the
claim citing it, and that it is the primary source rather than something quoting
it. Update `accessed` to the date you checked. A dead or repurposed link is a
blocker.

**3. Check the compliance rules for the category.**
Health articles: no diagnosis, no prescription, no weight-loss promise, health
disclaimer present, sources are NIH/USDA/FDA/CDC-grade. Language articles: script
and romanisation correct, no native-speaker review claimed. Sports articles: no
real player, team or league names, simulation assumptions explained, no betting
framing. Comparison articles: `researchDate` set, every competitor claim
re-verified against that company's own current material, no logos, no
disparagement.

**4. Confirm there are no invented numbers.**
Search the draft for digits. Every one must be either arithmetic the reader can
check, a figure from a cited source, or a fact from the app catalog. No download
counts, ratings, review quotes, user counts, search volumes or traffic
projections.

**5. Read it as a reader, not as an editor.**
Would someone who is not a customer finish it and be better off? Cut filler,
cut restated headings, cut any paragraph that exists to hold a keyword. If the
article is only useful to someone who already decided to install the app, it is
an advert and needs rewriting.

**6. Check the keyword position.**
Confirm `primaryKeyword` is not already claimed — the build rejects duplicates,
but catching it here is cheaper. Confirm the article is not competing with an
existing one for the same intent. Run `npm run keywords` and review
`docs/keyword-verification-needed.md`.

**7. Check the links.**
`relatedApps[0]` is the right CTA app. `relatedArticles` point at articles that
are themselves published — linking a published article to a draft is a build
failure. The body links the app page, at least one category page, and 2–5
related articles.

**8. Set the publication fields.**
```json
"status": "published",
"publishedAt": "<the date it actually goes live>",
"updatedAt": "<same date>",
```
and **remove `"noindex": true`** — the build fails if a published article still
carries it. Do not backdate. A publication date is a factual claim.

**9. Build and verify the output.**
```
npm run build          # export + unpublished-content gate
npm run report:links   # orphans, thin linking, click depth
```
Then confirm on disk: `out/blog/<slug>/index.html` exists, the slug appears in
`out/sitemap.xml` and `out/blog/rss.xml`, and the rendered page carries no
`noindex`.

## Release cadence

Release in small batches rather than all at once, and leave gaps between them so
performance is attributable. `docs/publishing-schedule.md` holds the plan.

Approving a batch is the owner's decision, not the writer's. Drafts stay drafts
until then.
