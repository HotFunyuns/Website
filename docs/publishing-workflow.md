# Publishing workflow

How a new article goes from a file to a live page: **at most one editorially
approved article per day**, released on or after the day you choose, linked
into the rest of the site automatically, and never published just because a
file exists.

The current state of the queue is in
[publishing-queue-report.md](./publishing-queue-report.md) (`npm run queue:report`).

---

## The rules, in one place

| Rule | Where it is enforced |
| --- | --- |
| Dates are calendar days in **America/Los_Angeles** | `scripts/lib/publishing.mjs`, `src/lib/blog/types.ts` |
| Only `status: "scheduled"` + `editorialApproved: true` + a due `publishAt` is released automatically | `planRelease()` in `scripts/lib/publishing.mjs` |
| At most **one** release per Los Angeles day; a rerun the same day does nothing | `planRelease()`; the build (`src/lib/blog/index.ts`, `scripts/validate-content.mjs`) fails on a second one without `sameDayOverride` |
| The automatic release happens from **09:00** Los Angeles time | `RELEASE_HOUR` in `scripts/lib/publishing.mjs` |
| `publishedAt` is stamped with the **real** release day — never earlier, never the planned day if that has passed | `release` in `scripts/publish-queue.mjs` |
| No other article's dates change | the release writes only the released article's dates; `scripts/audit-authorship.mjs` fails if a public article's `publishedAt` changes |
| Every article published after 2026-09-22 must carry `editorialApproved: true` | the build fails otherwise |
| Drafts, reviews and scheduled articles never reach a route, the sitemap, RSS, `llms.txt`, search, related links or any HTML | `posts` in `src/lib/blog/index.ts`; `scripts/validate-content.mjs` fails the build on any leak |
| Each release gets the post-publication linking pass, and must end up linked from at least one older article | `scripts/post-publication-links.mjs`; the build fails otherwise |
| A failed validation or build deploys nothing | the workflow builds before it commits, and deploys only after pushing |

**What `editorialApproved: true` means.** Setting it is a statement that a person
at Reign Creative LLC has read the complete article and checked it against steps
1–7 of [content-review-process.md](./content-review-process.md). The editorial
policy tells readers that every article published after 22 September 2026 was
approved this way, and approved articles print "A person at Reign Creative LLC
read this article in full and approved it before it was published". Do not set
the flag on an article nobody has read. It is an internal editorial check, not
independent or expert review, and the site says so.

---

## Statuses

| Status | Meaning | Public? |
| --- | --- | --- |
| `draft` | Being written | Never |
| `review` | Finished, waiting for a person to read and approve it | Never |
| `scheduled` | Approved and queued; released on or after `publishAt` | Not until released |
| `published` | Live from `publishedAt` | Yes |

---

## Add a draft

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
  "editorialApproved": false,
  "publishedAt": "2026-10-01",
  "updatedAt": "2026-10-01",
  "author": "reign-creative-llc",
  "category": "education-brain",
  "hubs": ["mental-math"],
  "relatedApps": ["mental-math-memory-games"],
  "relatedArticles": ["mental-math-training-guide"],
  "noindex": true,
  …
}
---
```

On a draft, `publishedAt` is only a placeholder. The release overwrites it with
the real day. Check the draft at any time with:

```
node scripts/preflight-articles.mjs --only <slug>
```

## Approve it

1. Read the whole article, and do steps 1–7 of
   [content-review-process.md](./content-review-process.md): verify every app
   claim and every source, and check that it contains no invented numbers.
2. Set `"status": "review"` while you work through it, then
   `"editorialApproved": true` once you are satisfied.

An article with `editorialApproved: false` or missing cannot be scheduled,
because the build refuses it, and cannot be released, even by hand.

## Schedule it

```json
"status": "scheduled",
"editorialApproved": true,
"publishAt": "2026-10-06",
```

`publishAt` is the earliest Los Angeles day it may go out. If several articles
are due at once, they go out one per day: earliest `publishAt` first, then
alphabetically by slug. Commit and push. The hourly job picks it up on or after
that day, from 09:00 Pacific. `npm run queue:status` shows the projected
release day of everything queued.

## Change its date

Edit `publishAt` and push. Moving it later delays the release; moving it earlier
makes it eligible sooner, but never more than one per day. Do not edit
`publishedAt` on a scheduled article. The release stamps it.

## Cancel publication

Before release: set `"status": "draft"` (or `"review"`) and push. Neither the
hourly job nor a manual release will touch anything that is not `scheduled`.
Setting `"editorialApproved": false` also blocks it.

After release: an article that is live should normally be corrected, not
withdrawn. If it must come down, set it back to `"draft"`, fix any article
that links to it (the build will name them), and remember that crawlers keep a
URL they have seen. A withdrawn URL will answer 404, because GitHub Pages cannot
serve a redirect.

## Publish manually

Use this to release a specific article now, ignoring its `publishAt` and the
09:00 release hour. The article must still be `scheduled` and
`editorialApproved: true`. A draft or review article is refused even by hand, so
setting an article back to `draft` really does cancel it. Either route:

**From GitHub:** Actions → **Publish approved article (daily queue)** → **Run
workflow**, and enter the slug. Tick *Allow a second release today* only if
something has already gone out today and you really mean two. Tick *dry run* to
see what would happen first.

**From your machine:**

```
npm run queue:status                                    # what would happen now
npm run queue:release -- --slug <slug> --dry-run        # preview, writes nothing
npm run queue:release -- --slug <slug>                  # release + linking pass
npm run build                                           # every gate; must pass
npm test
node scripts/link-report.mjs
npm run queue:report
git add content/blog docs && git commit -m "Publish <slug>" && git push
```

`--allow-second-today` is the explicit override of the one-per-day limit. It is
recorded on the article as `"sameDayOverride": true`, so the build can tell a
deliberate override from a misfire. There is no override for approval.

## What the release does

1. Validates the article: fields, lengths, author, unique primary keyword, and
   links that must all point at public pages. It also runs
   `preflight-articles.mjs --only <slug>` for the claim-safety rules.
2. Plans the linking pass against the corpus as it will be. If the article could
   not be linked from an older article, nothing is written.
3. Writes the release: `status: "published"`, `publishedAt` and `updatedAt` =
   today (Los Angeles), `noindex` removed, `publishAt` kept as a record.
4. Runs the **post-publication linking pass** (`npm run links:after-publish -- <slug>`):
   - checks that the article links its app page, its category or hub, its hub's
     cornerstone and at least two related public articles, adding a
     "Keep reading" card for a missing cornerstone or related article;
   - picks the most relevant older articles (by the same relevance score the site
     uses) and makes two to five of them link back. Where the article's own
     target phrase already appears in an older article's prose, those words
     become the link, without adding or removing a word. Otherwise the older
     article gets a "Keep reading" card. Headings, tables, code and sentences that
     already carry a link are never touched, and no article gets more than the
     six cards the template shows.
5. In the workflow it then builds the site with every gate, runs the tests,
   confirms in the built HTML that the article is linked from another article,
   from its app page or hub, and carries the Play link and byline, regenerates
   the link and queue reports, commits, pushes, and starts the deploy.

Adding links does **not** change any article's `updatedAt`. A link is not a
content revision.

## Verify the deployment

The deploy takes a few minutes and grows with the page count. With the site at
about 600 pages, allow 10–15 minutes.

```
node scripts/verify-live.mjs <slug> --wait 20
node scripts/verify-live.mjs --smoke
```

The first waits until the article answers 200. It then checks the canonical,
the byline and author markup, sitemap and RSS membership, and that
`<article>/index.txt` is a real 404. `--smoke` checks the key pages and confirms
that no draft or scheduled article answers or is listed anywhere.

## Recover from a failed scheduled job

Open Actions → **Publish approved article (daily queue)** → the failed run, and
find the failed step.

| Failed step | What it means | What to do |
| --- | --- | --- |
| Check eligibility | A manual slug was wrong or unapproved | Fix the input and run again |
| Release and link | Validation or the linking plan refused the article; **nothing was written** | Read the ✗ lines, fix the article, push. The next hourly run retries |
| Build and validate | The site would not build with the article; **nothing was committed** | Reproduce locally: `npm run queue:release -- --slug <slug>` then `npm run build`. Fix, push, and the next run retries |
| Commit and push | Usually someone pushed to `main` during the run, or branch protection blocks the bot | Nothing reached `main`; the next run retries from the new `main`. If `main` is protected, allow GitHub Actions to push, or release by hand |
| Deploy | The release is on `main` but was not deployed | Actions → **Deploy Next.js site to Pages** → Run workflow on `main`. Any later push also deploys |

If the release commit reached `main` but the deploy only succeeded the next
day, the article shows a publication date one day earlier than it went live.
Correct it forward so it is never backdated:

```
node scripts/stamp-dates.mjs --publish-on <actual-day> --from <stamped-day>
```

Reruns are safe. A second run on the same Los Angeles day sees the first
release and stops.

## Things that live outside this repository

- **Scheduled workflows pause** in a public repository after 60 days with no
  commits. Each release is a commit, but an empty queue for two months means
  re-enabling the workflow under Actions.
- **GitHub cron is best-effort** and runs in UTC; delays of up to an hour happen
  at busy times. The job checks hourly, so a late run still releases that day.
- The workflow needs `contents: write` and `actions: write`, which it declares.
  If the repository's Actions settings cap the token at read-only, or `main` is
  protected against the bot, the push step fails and nothing is published.
