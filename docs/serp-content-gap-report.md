# SERP and content-gap report

What was and was not observable about competing results during this pass, and
where the genuine content gaps were found.

Measured **2026-09-04**.

## Scope and honesty about method

A conventional content-gap report compares your coverage against the pages
currently ranking for a set of target queries. Doing that properly requires
result-page data — either from a provider that supplies it under licence, or
from scraping Google, which its terms do not permit.

**Neither was available to this project.** We did not scrape result pages, and we
have no licensed SERP data. Anything presented here as a "competing page" would
therefore be a fabrication, so no such list appears.

What follows is what was genuinely observed, and what can be inferred from it
without overreaching.

## What was observed

### 1. Query phrasing, from Google Autocomplete

1,015 suggestions across 120 seeds, collected 2026-09-04 for the United States
in English. Full data in `docs/data/search-intent-observations.json`; method and
limits in `docs/keyword-research-100.md`.

Autocomplete tells you how a question is worded and which adjacent questions
exist. It does not tell you who currently answers them.

### 2. Competitor product pages, fetched individually

For the comparison articles only, and only to verify specific factual claims
about named products. Each fetch was of the vendor's own page, and every claim
in an article is attributed to that page with the date it was read:

| Product | Page read | What was verified |
| --- | --- | --- |
| MyFitnessPal | Premium page | Feature list placed behind payment |
| Cronometer | Gold and features pages | Basic and Gold feature split |
| Carb Manager | Premium page | Account tiers; the page's own table does not separate them cleanly, and the article says so |
| Duolingo | Two official blog pages | Course count and what Max adds |
| Memrise | Three language pages | The content model stated for those languages |
| Pimsleur | Cantonese course page | Lesson length and level structure |
| Anki | Official site | That the application is a scheduler rather than a course |
| VLC / VideoLAN | Three official pages | Android feature list, and the no-ads/no-tracking statement |

This is claim verification, not competitive analysis. No competitor's *ranking*
was observed, because that data was not available.

### 3. Our own Google Play listings

All 29 verified on 2026-09-04. The listing copy is the source for every
app-feature claim in the new articles.

## Gaps identified, and how

Because ranking data was unavailable, gaps were identified from three sources
that were:

### Gap type 1 — apps with no content at all

The most objective gap available, and the largest. Eight apps were published on
Google Play and had **no page and no article** on this site:

| App | Articles now pointing at it as primary |
| --- | ---: |
| Baseball Career Sim 2026 | 5 |
| Football Career Sim 2026 | 3 |
| Hockey Career Sim 2026 | 3 |
| Football Career Soccer XI Sim | 4 |
| Golf Career Simulator Pro Tour | 5 |
| Learn Vietnamese Language Fast | 6 |
| Learn Lao Language Fast & Easy | 3 |
| Learn Italian for Beginners | 8 |

This required no SERP data to establish. A published app with no page is a gap by
inspection.

### Gap type 2 — questions our own articles raised and did not answer

Reading the existing 75 articles surfaced concepts referenced in passing and
never explained anywhere on the site. Each became an article:

- Existing articles referred to ERA, WHIP and OPS without defining them →
  three new statistics explainers.
- Existing hockey articles referred to plus/minus and special teams without
  covering either → two new articles.
- Existing soccer articles assumed offside and goal difference → two new
  articles.
- Existing tracking articles assumed the reader could read a label correctly →
  serving size, added sugars and food-database accuracy articles.
- Existing arcade articles referenced difficulty escalation and build design
  without explaining either → four new articles.

This is a genuine coverage gap and it is observable entirely from our own
corpus, which makes it more reliable than an inferred one.

### Gap type 3 — autocomplete phrasings with no matching page

Where a suggestion described a question the site did not answer, and the
question was within our subject areas, it became a candidate. Examples that
became articles: `what is icing in hockey`, `is lao similar to thai`,
`vietnamese pronouns`, `sugar alcohols`, `what is par in golf`,
`hardware vs software decoding`.

Candidates were rejected where the topic was outside what we can write
responsibly — several health suggestions were dropped for exactly this reason,
covered in the compliance audit.

## Gaps deliberately not filled

Recorded because the decisions matter more than the list of what was written.

**Anything requiring clinical judgement.** Several high-frequency health
phrasings would have required stating what someone should eat or take. Those
articles either were not written, or were written to explain the question and
send the reader to a clinician.

**Anything requiring native-speaker verification we do not have.** Language
articles state plainly that they have not been reviewed by a native speaker. We
did not write articles whose entire value would depend on a verification we
cannot perform.

**Query variations of pages we already have.** Autocomplete returns many
near-identical phrasings. Making a page for each would be the
"separate page for every minor keyword variation" pattern Google's spam policies
name directly. These were folded into existing articles as secondary keywords
instead — 1,820 unique terms are mapped across 175 articles, an average of about
ten terms per page rather than one page per term.

**Competitor-name pages.** No article exists to capture searches for a
competitor's brand. The two comparison articles that name competitors do so to
compare specific verified features, carry an ownership disclosure, and use no
competitor logos or trade dress.

## What would improve this report

The single change that would make a real content-gap analysis possible is
**Search Console access**. Once these URLs are crawled, the Performance report
gives query-level data specific to this site — which pages appear for which
queries, at what position, with what click-through. That is better than any
inferred gap analysis, because it describes this site rather than a market.

Until then, this report describes what was actually observed and stops there.
