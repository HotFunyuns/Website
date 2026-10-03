# Draft review and publishing process

Draft articles live in `content/blog/` alongside published ones. A draft is a
**complete, finished article** — not an outline — that has not been published.
Nothing about a draft reaches the public site.

Since 2 October 2026 every new article is published with one of two labels,
and this document is the checklist behind both:

- **"Reviewed by" a named person** — a person did steps 1–7 below on the complete
  article and recorded it (`editorialReview: "person"` plus the review record);
- **"AI-assisted article"** — an AI editorial review did steps 1–7 and logged the
  result, and no person has read it (`editorialReview: "automated"`). The article
  says so, in those words.

How either one becomes a live page is in
[publishing-workflow.md](./publishing-workflow.md).

## How an unpublished article is invisible

Three independent mechanisms, each of which would be sufficient alone:

1. **The data layer.** `src/lib/blog/index.ts` exports `posts`, which is filtered
   through `isPublicPost()`. Every route, the sitemap, the RSS feed, category
   listings, related-article links and structured data read `posts` and nothing
   else. `allPosts` exists but is never rendered.
2. **The router.** `generateStaticParams()` in `src/app/blog/[slug]/page.tsx`
   returns published slugs only, and `dynamicParams = false`. A draft slug
   therefore has no route at all — guessing the URL returns a 404, not a page.
3. **The build gate.** `scripts/validate-content.mjs` runs after export as part of
   `npm run build`. It fails the build if an unpublished slug appears as an
   exported page, in `sitemap.xml`, in the RSS feed, or as a link on any exported
   page.

An unpublished article also carries `"noindex": true`, which is belt-and-braces:
it only matters if all three mechanisms above failed simultaneously.
`"status": "published"` with a future `publishedAt` is rejected by the build.

## The checks

Steps 1–7 are the review — a person's, or the AI editorial review's. Step 8 is
the record of it. Step 9 is the machine.

**1. Verify every app claim.**
Run `node scripts/dump-catalog.mjs <app-slug>` and check each statement about the
app against it. Features not in the catalog do not exist. Delete anything you
cannot confirm — do not soften it.

**2. Verify every external fact.**
Open each URL in `sources`. Confirm it resolves, that it actually supports the
claim citing it, and that it is the primary source rather than something quoting
it. Update `accessed` to the date you checked. A dead or repurposed link is a
blocker. A claim that no opened source supports is cut, not cited to a page
nobody read.

**3. Check the compliance rules for the category.**
Health articles: no diagnosis, no prescription, no weight-loss promise, health
disclaimer present, sources are NIH/USDA/FDA/CDC-grade. Language articles: script
and romanisation correct, no native-speaker review claimed. Sports articles:
content-spec rule 10 — no player records, ratings, rosters or pools from our apps,
no app rating attached to a named real athlete, no implied league, team, union or
athlete affiliation, no logos or league branding, no description of a draft/GM
app as fictional (career sims are fictional and may be called so); real leagues,
rules and records named only where a cited source supports the fact; simulation
assumptions explained; no betting framing. Comparison articles: `researchDate`
set, every competitor claim re-verified against that company's own current
material, no logos, no disparagement.

**4. Confirm there are no invented numbers.**
Search the article for digits. Every one must be either arithmetic the reader can
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
`relatedApps[0]` is the right CTA app. `relatedArticles` and body links point at
published articles, or at articles published in the same batch. The body links
the app page, at least one category page, and 2–5 related articles.

**8. Record the review.**

- *A person* fills in the record on the article — only the person who did steps
  1–7 sets it, and no script or agent ever does:

  ```json
  "editorialReview": "person",
  "editorialApproved": true,
  "reviewerName": "…",
  "reviewDate": "…",
  "sourcesChecked": ["…"],
  "reviewNotes": "…"
  ```

- *The AI editorial review* appends an entry to
  `docs/data/editorial-review-log-2026-10.json` — verdict, the checks it ran, notes,
  and the content hash of the exact text it reviewed
  (`node scripts/publish-batch.mjs --hash <slug>`). The schema is in
  [publishing-workflow.md](./publishing-workflow.md). The article keeps
  `editorialReview: "automated"` and never carries `editorialApproved`.

**9. Publish it.**
`node scripts/publish-batch.mjs <slug>` publishes a finished article the day it
passes — after re-running the mechanical checks, refusing anything edited since
its review, and planning its inbound links. Then
`node scripts/post-publication-links.mjs --batch --today`, `npm run build`, commit
and push. A person-approved article can instead be scheduled for a particular day
(`"status": "scheduled"`, `publishAt`), and the hourly queue releases it then.

(`scripts/publish-drafts.mjs`, which set publication fields in bulk with any date,
is retired. It now only prints a pointer.)

## What the AI editorial review is, and is not

It is a second pass by an AI agent through steps 1–7 against the cited sources,
the catalog and the rest of the site, with a logged verdict. It catches a lot. It
is not a person reading every sentence, it cannot prove that a source says exactly
what an article says it does, and it is never described on the site as a person's
review, an approval or a fact-check.

## Release cadence

There is none. A finished article is published once it passes every check; it is
not held back to fit a schedule. A batch that goes out together is linked in
together (`--batch`), so the older articles' free "Keep reading" slots are shared
across it rather than taken by its first few articles.
