# Publishing workflow

How a new article goes from a file to a live page. Since **2 October 2026**:

- every new article **says how it was checked** — "Reviewed by" a named person,
  or "AI-assisted article … No person has reviewed it yet";
- a finished article is **published as soon as it passes every check**. There
  is no daily limit and no release schedule to wait for;
- nothing is published just because a file exists, and nothing claims a review
  that did not happen.

The current state of the queue is in
[publishing-queue-report.md](./publishing-queue-report.md) (`npm run queue:report`).

---

## The rules, in one place

| Rule | Where it is enforced |
| --- | --- |
| Dates are calendar days in **America/Los_Angeles** | `scripts/lib/publishing.mjs`, `src/lib/blog/types.ts` |
| Every article published after 2026-09-22 carries `editorialReview`: `"person"` or `"automated"` | `reviewProblems()` in `scripts/lib/publishing.mjs`; the loader (`src/lib/blog/index.ts`); `scripts/validate-content.mjs` after export |
| `"person"` needs `editorialApproved: true` **and** the review record — `reviewerName`, `reviewDate` (not in the future), `sourcesChecked` (URLs of the article's own sources), `reviewNotes` | same three places |
| `"automated"` carries no approval and no review record, and is published only after a **passing, logged AI editorial review of that exact text** | `scripts/publish-batch.mjs` (review log + content hash) |
| The label is shown under the byline and in the author box, and matches the frontmatter word for word; an automated article never says "approved", "verified by" or "fact-checked" | `src/components/blog/ArticleReviewNotice.tsx`, `AuthorBox.tsx`; `scripts/audit-authorship.mjs` |
| No article is dated after 2026-09-22 and before 2026-10-02 — nothing was published then, and the editorial policy says so | the loader and `reviewProblems()` |
| `publishedAt` is the **real** day the article went live — never earlier | `scripts/publish-batch.mjs`, `scripts/publish-queue.mjs` |
| No other article's dates change; a link is not a revision | the publish steps write only their own articles; `scripts/audit-authorship.mjs` fails a date bump with no content change |
| No daily limit: a batch goes out the day it passes, and every due scheduled article goes out in one run | `scripts/lib/publishing.mjs` (`planRelease`) |
| Drafts, reviews and scheduled articles never reach a route, the sitemap, RSS, `llms.txt`, search, related links or any HTML | `posts` in `src/lib/blog/index.ts`; `scripts/validate-content.mjs` fails the build on any leak |
| Every article published after the gate has a persisted link (body or `relatedArticles`) from another published article, and the rendered page of another article links it | `scripts/validate-content.mjs`; written by the linking pass |
| A failed validation or build deploys nothing | the build runs every gate; the queue workflow builds before it commits |

**What the two labels mean.**

- `editorialReview: "person"` with `editorialApproved: true` is a statement that a
  named person at Reign Creative LLC read the complete article, opened the sources
  listed in `sourcesChecked`, and approved it. Only that person fills in the
  record. No script, workflow or AI agent writes `editorialApproved`,
  `reviewerName`, `reviewDate`, `sourcesChecked` or `reviewNotes` (a test fails if
  one tries). It is an internal editorial check, not independent or expert review,
  and the site says so.
- `editorialReview: "automated"` means the article was published after the
  automated checks (below) and an AI editorial review whose result is logged in
  `docs/data/editorial-review-log-2026-10.json`. **No person has read it**, and the
  article says exactly that. If a person later reviews it, they fill in the record
  and switch the label to `"person"` — never the other way round without a reason.

---

## Statuses

| Status | Meaning | Public? |
| --- | --- | --- |
| `draft` | Being written | Never |
| `review` | Finished, waiting for its editorial review (a person's, or the logged AI review) | Never |
| `scheduled` | Approved by a named person for a particular day; released on or after `publishAt` | Not until released |
| `published` | Live from `publishedAt` | Yes |

---

## Write it

Create `content/blog/<slug>.md`. The slug is the URL. Copy the frontmatter of a
comparable published article and change every field. See
[content-spec.md](./content-spec.md) for the full field list.

```json
---
{
  "title": "…",
  "metaTitle": "…",
  "description": "…",
  "status": "draft",
  "editorialReview": "automated",
  "publishedAt": "2026-10-02",
  "updatedAt": "2026-10-02",
  "author": "reign-creative-llc",
  "category": "sports-gm",
  "relatedApps": ["pro-basketball-draft-gm-mode"],
  "relatedArticles": ["basketball-draft-gm-guide"],
  "noindex": true,
  …
}
---
```

`publishedAt` is only a placeholder until publication stamps the real day. Check
the article at any time with:

```
node scripts/preflight-articles.mjs --only <slug>
```

When it is finished, set `"status": "review"`.

---

## Path A — publish with the "AI-assisted" label

For a finished article no person has read. It is published the day it passes.

**1. The AI editorial review, logged.** The reviewer (an AI agent working to
[content-review-process.md](./content-review-process.md)) reads the article
against its sources, the app catalog and the rest of the site, fixes or rejects
it, and then appends an entry to `docs/data/editorial-review-log-2026-10.json`:

```json
{
  "schema": "reign-editorial-review-log/1",
  "about": "Results of the AI editorial review for articles published with the automated label. Not a person's review.",
  "entries": [
    {
      "slug": "example-article",
      "verdict": "pass",
      "performedBy": "ai-editorial-review",
      "reviewedAt": "2026-10-02",
      "checks": ["sources-support-claims", "app-claims-match-catalog", "no-invented-numbers", "rights-and-branding", "cannibalisation", "duplication", "usefulness"],
      "notes": "What was checked, and what was changed or cut.",
      "contentHash": "sha256:…"
    }
  ]
}
```

| Field | Rule |
| --- | --- |
| `verdict` | `pass` publishes. Anything else (`revise`, `reject`) holds the article back. |
| `performedBy` | Must be `ai-editorial-review`. A person's review is never logged here — it goes in the article's own record and label. |
| `reviewedAt` | ISO day, not in the future. |
| `checks` | Non-empty list of what the review covered. |
| `notes` | Required. |
| `contentHash` | `node scripts/publish-batch.mjs --hash <slug>` prints it. It covers the title, meta title, description, FAQs, takeaways, sources and body. **If the article changes after its review, the hash no longer matches and the article is refused until it is reviewed again.** |

The latest entry for a slug wins, so a re-review is a new entry, not an edit.

**2. Publish.**

```
node scripts/publish-batch.mjs <slug> [<slug> …] --dry-run   # what would happen
node scripts/publish-batch.mjs <slug> [<slug> …]             # or --all-ready
```

It publishes an article only if it is in `review`, its log entry passes (or, for
a `"person"` article, its record is complete), it passes the same validation as a
queue release — fields, links to public pages only, a unique primary keyword,
`preflight-articles.mjs --only` — with the rest of the batch counted as public,
it duplicates no title, meta title or description, and the batch linking plan
can give it an inbound link. Anything that links an article that is held back is
held back too. Published articles get `status: "published"`, `publishedAt` and
`updatedAt` = today (Los Angeles), and lose `noindex`. Nothing else changes.
Held articles are listed with every reason, and the exit code is 1.

**3. Link it in — the separate reverse-linking pass.**

```
node scripts/post-publication-links.mjs --batch --today --dry-run
node scripts/post-publication-links.mjs --batch --today
```

For each new article it checks the article's own links (app page, category or
hub, the hub's cornerstone, at least two related public articles) and adds a
"Keep reading" card to the article where a cornerstone or related article is
missing. Then it shares the older articles' free card slots out across the whole
batch: in rounds, every new article gets its most relevant older article before
any gets a second; one older article takes at most two cards from one batch and
never more than six in total; relevance must clear the site's threshold. An
article no older article can take is linked from the most relevant article in the
same batch. It adds cards only — no prose, no headings — never moves `updatedAt`,
and a second run adds nothing.

**4. Build, check, commit, push.**

```
npm run build
npm test
npm run audit:all
git add content/blog docs && git commit -m "Publish …" && git push
node scripts/verify-live.mjs <slug> --wait 20
```

## Path B — a person reviews it

1. A person reads the whole article and does steps 1–7 of
   [content-review-process.md](./content-review-process.md).
2. They fill in the record themselves:

   ```json
   "editorialReview": "person",
   "editorialApproved": true,
   "reviewerName": "<their name, as they want it shown>",
   "reviewDate": "<the day they approved it>",
   "sourcesChecked": ["<the url of each source they opened>"],
   "reviewNotes": "<what they checked or changed>"
   ```

3. To publish it now, use Path A step 2 — no log entry is needed for a
   `"person"` article. To publish it on a particular day, schedule it:

   ```json
   "status": "scheduled",
   "publishAt": "2026-10-20"
   ```

   The hourly job releases every due scheduled article from 09:00 Pacific on
   that day, links each in, builds, commits and deploys.

An article that was published with the automated label and is later read and
approved by a person switches to `"person"` with the record; its label changes,
and its dates do not.

## Cancel publication

Before publication: set `"status": "draft"`, or remove its log entry's `pass`.
Neither tool touches it.

After publication: an article that is live should normally be corrected, not
withdrawn. If it must come down, set it back to `"draft"`, fix any article that
links to it (the build will name them), and remember that crawlers keep a URL
they have seen. A withdrawn URL will answer 404, because GitHub Pages cannot
serve a redirect.

## The queue, by hand

```
npm run queue:status                                    # what would happen now
npm run queue:release -- --slug <slug> --dry-run        # preview, writes nothing
npm run queue:release -- --slug <slug>                  # release one scheduled article now
npm run queue:release                                   # release every due one
```

A manual `--slug` release still requires `scheduled` and a complete person's
review record; setting an article back to `draft` really does cancel it.

## Verify the deployment

The deploy takes a few minutes and grows with the page count.

```
node scripts/verify-live.mjs <slug> --wait 20
node scripts/verify-live.mjs --smoke
```

The first waits until the article answers 200. It then checks the canonical,
the byline and author markup, sitemap and RSS membership, and that
`<article>/index.txt` is a real 404. `--smoke` checks the key pages and confirms
that no unpublished article answers or is listed anywhere.

## Recover from a failed scheduled job

Open Actions → **Publish scheduled articles (queue)** → the failed run, and find
the failed step.

| Failed step | What it means | What to do |
| --- | --- | --- |
| Check eligibility | A manual slug was wrong, unapproved or its record incomplete | Fix the input or the record and run again |
| Release and link | Every due article failed validation or the linking plan; **nothing was written** | Read the ✗ lines, fix the articles, push. The next hourly run retries |
| Build and validate | The site would not build with the release; **nothing was committed** | Reproduce locally: `npm run queue:release -- --slug <slug>` then `npm run build`. Fix, push, and the next run retries |
| Commit and push | Usually someone pushed to `main` during the run, or branch protection blocks the bot | Nothing reached `main`; the next run retries from the new `main` |
| Deploy | The release is on `main` but was not deployed | Actions → **Deploy Next.js site to Pages** → Run workflow on `main`. Any later push also deploys |
| Report articles that could not be released | Some due articles went out; the listed ones failed their own checks and stay scheduled | Fix them; the next run releases them |

If a release commit reached `main` but the deploy only succeeded the next day,
the article shows a publication date one day earlier than it went live. Correct
it forward so it is never backdated:

```
node scripts/stamp-dates.mjs --publish-on <actual-day> --from <stamped-day>
```

## Things that live outside this repository

- **Scheduled workflows pause** in a public repository after 60 days with no
  commits.
- **GitHub cron is best-effort** and runs in UTC; delays of hours happen. The job
  checks hourly, so a late run still releases that day.
- The workflow needs `contents: write` and `actions: write`, which it declares.
  If the repository's Actions settings cap the token at read-only, or `main` is
  protected against the bot, the push step fails and nothing is published.
