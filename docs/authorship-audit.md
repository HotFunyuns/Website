# Authorship audit

Recorded 2026-09-25 (America/Los_Angeles). Covers all 525 published articles,
the article template, the structured data, and every page that describes how
the articles are written. It sets out what was found, what was changed, what
the byline is and why, and what still needs the owner.

## 1. What was there before

| Item | Finding |
| --- | --- |
| Visible byline | `Reign Creative Team` on all 525 articles, as plain text with no link |
| Author page | None |
| `BlogPosting.author` | `Organization` named "Reign Creative Team", `url` pointing at `/editorial-policy/` |
| Entity names | "Reign Creative Team" was a third name alongside the legal name and the Google Play developer name, with nothing linking it to either |
| Editorial policy, *AI and automation* | "Every article is reviewed by a person before publication." **False.** The 2026-09-22 final report records that the 250 articles in that release were drafted by AI agents and not all read by a person before release |
| App pages, app category pages, blog index | "Written by the team that builds the app / these apps / them" — inaccurate for AI-drafted articles |
| Ownership disclosure | The policy said it was made "on the article itself". Only the 18 comparison articles actually carried one, and 129 article bodies never mention that the company makes the app they link to |
| Dates | Published date shown, and "Updated" shown when it differs. All 23 articles showing an "Updated" date were checked against git history (§6): each bump came with a real change to the body, FAQs or sources |

## 2. Is there a verified individual author approved for use?

**No.** No person is named as an author, reviewer or founder anywhere on the
site, in the content, in the app catalog or in the documentation. No record of
approval to publish anyone's name exists. The only personal identifiers in the
repository are git commit metadata: an account handle and an email address. That
is not a byline anyone approved, and using it would expose private contact
information. It was not used.

So, per the brief, the byline is organizational. No human identity, biography,
credential, review claim or social profile was created.

## 3. The byline chosen, and why

**`Reign Creative LLC`**, linked to **`/authors/reign-creative-llc/`**.

- It is the legal entity that publishes every article and is accountable for it.
  That is verifiable, and it claims nothing beyond that.
- "Reign Creative *Team*" and "Reign Creative *Editorial Team*" were rejected.
  Both assert a group of people, or a dedicated editorial staff, that nobody
  could confirm. Given that the articles are AI-drafted, they also imply human
  authorship the record does not support.
- It matches the `publisher` entity exactly, so the author and the publisher are
  visibly and structurally the same company rather than two unlinked names.

To rename the byline later, change `name` for `reign-creative-llc` in
`src/data/authors.ts`. The byline, the structured data and the profile all read
from that one field.

## 4. What was implemented

| Piece | Where |
| --- | --- |
| Author registry: an article's `author` must be a registry id, and a person without a recorded owner approval fails the build | `src/data/authors.ts`, validated in `src/lib/blog/index.ts` |
| All 525 articles: `"author": "Reign Creative Team"` → `"author": "reign-creative-llc"` — one line per file, nothing else touched, no date changed | `content/blog/*.md` |
| Visible byline: "By **Reign Creative LLC**" linked with `rel="author"`, then "Published …", then "Updated …" only when `updatedAt` differs, then reading time | `src/components/blog/ArticleByline.tsx` |
| Ownership line under the byline on every article: "Reign Creative LLC makes *App*, which this article links to, so we have a commercial interest in it." with a link to the editorial policy | same |
| "About the author" box after the sources: who the author is, how AI is used, that no article has independent expert review unless a reviewer is named, how to report an error. For articles carrying `editorialApproved: true` only, it adds: "A person at Reign Creative LLC read this article in full and approved it before it was published." | `src/components/blog/AuthorBox.tsx` |
| Corrections notice, rendered when an article records a correction | `src/components/blog/ArticleCorrections.tsx`, `corrections` frontmatter field |
| `BlogPosting.author`: `{ "@type": "Organization", "name": "Reign Creative LLC", "url": "https://reigncreativellc.com/authors/reign-creative-llc/" }`, from the same registry entry as the byline | `src/app/blog/[slug]/page.tsx` |
| Author profile page: `ProfilePage` whose `mainEntity` is the site's `#organization` node; explains the organizational byline, how articles are made, AI use, the approval rule, sourcing, corrections, dates and ownership, and lists recent articles, hubs and categories | `src/app/authors/[author]/page.tsx` |
| Editorial policy, *How AI is used*: rewritten to say what actually happens (§5) | `src/app/editorial-policy/page.tsx` |
| "Written by the team…" replaced with "Published by Reign Creative LLC, which makes *App*" and "from the studio that builds these apps" | app, app-category and blog index pages |
| Build-time consistency audit (§6) | `scripts/audit-authorship.mjs`, run by `npm run build` |

## 5. The AI disclosure, as published

The editorial policy now says, in substance:

- AI tools are used extensively to find and organise sources, draft and edit.
  Many articles were drafted by AI tools working from the app catalog and the
  cited sources.
- Automated checks run before publication: sources must resolve, app claims must
  match the catalog, banned claim types are blocked, and duplication is checked.
  The policy also says what those checks cannot do: they are not a person reading
  every sentence, and they cannot prove a source says exactly what the article
  says.
- **Every article published after 22 September 2026 must be read in full and
  approved by a person before release**, and the publishing system refuses to
  release it otherwise. Articles published on or before that date passed the
  automated checks, but not every one was read in full by a person.
- That approval is an editorial check by the company that makes the apps. It is
  not independent review, third-party fact-checking or expert review.

The same facts appear, shorter, on the About page, the author page and in every
article's author box.

## 6. Consistency audit results

`scripts/audit-authorship.mjs` runs after every build. On the final build it
checked all 525 articles and the one profile:

- the byline names the author and links `/authors/reign-creative-llc/` with
  `rel="author"`;
- `BlogPosting.author.name`, `.url` and `@type` equal the byline and the profile;
- the profile's H1 and `ProfilePage.mainEntity` use the same name and type;
- "Published" equals `publishedAt` and `datePublished`; "Updated" appears if and
  only if `updatedAt ≠ publishedAt`, and equals `dateModified`;
- no date is in the future (Los Angeles);
- the approval sentence appears exactly on articles with `editorialApproved: true`.
  Currently that is none: no article has been approved under the new process yet;
- compared with git: no already-public article's `publishedAt` changed, and no
  `updatedAt` moved without a change to visible content.

**Result: 525/525 consistent.** This pass changed no `publishedAt` and no
`updatedAt`. The 82 "Keep reading" links it added to older articles are link
edits, not revisions, so they correctly carry no "Updated" date.

**The 23 existing "Updated" dates were verified.** For each one, git history
identifies the commit that set it: `c2a7ba5` (2026-08-13) or `5dd26d5`
(2026-09-04). In 19 of the 23 the article body changed in that commit. In the
other four, visible frontmatter content changed:

- `basketball-positions-explained`: a source added;
- `learn-malay-beginners-guide`: an FAQ answer corrected (the FSI figures);
- `mma-boxing-fight-draft-guide`: FAQ answers changed;
- `spaced-repetition-for-language-learning`: a source replaced.

None is a date bumped without a change.

## 7. Owner review

1. **The approval rule is a public commitment.** From now on, setting
   `editorialApproved: true` tells readers that a person read the whole article
   and approved it. Set it only when that has happened. The build and the queue
   enforce that the flag is present, but only you can make it true.
2. **The past-tense disclosure** ("not every one was read in full by a person")
   is accurate per the project's own records. If some older articles *were* read
   in full and you want that stated, it has to be recorded per article, not
   inferred.
3. **`sameAs` lists only the Google Play developer page**, the one profile
   verified to belong to the company. No LinkedIn, X, Facebook or company GitHub
   profile was found anywhere in the repository or linked from the live site. The
   repository's GitHub account was not treated as an official company profile.
   If official profiles exist, add them to `sameAs` in `src/app/layout.tsx` and
   the author entry, and only once each is active and clearly the company's.

## 8. Adding a named author later

Only with the person's explicit agreement, and only as they want to be named.

1. Add an entry to `authors` in `src/data/authors.ts` with `kind: 'person'` and an
   `approval` record: `approvedOn`, `approvedBy`, and a `scope` naming exactly
   what was approved (name, bio, profile links). The build refuses a person
   without one.
2. Write the `relationship` truthfully. An owner or employee writing about the
   company's own apps is not an independent reviewer, and the bio must not read
   as if they were.
3. List in `sameAs` only profiles that exist, are active and belong to that
   person. Leave it empty rather than add a placeholder.
4. Change `author` on the articles that person actually wrote, and only those.
5. `npm run build` checks that the new profile page, the bylines and the
   structured data agree.
