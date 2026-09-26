# Entity consistency report

Recorded 2026-09-25 (America/Los_Angeles) against a full production build, the
live Google Play listings, and the structured data on every exported page. The
standing check is `npm run audit:entities` (`scripts/audit-entities.mjs`).

## The entity, stated once

| Name | What it is | Where it appears |
| --- | --- | --- |
| **Reign Creative LLC** | The legal company. Publisher of the site, the apps and every article, and the article byline | Titles (`… \| Reign Creative LLC`), About, author page, footer, JSON-LD `Organization.name`, `BlogPosting.author` and `publisher`, app-page "Developer" row |
| **Reign Collective Apps** | The developer name on Google Play. **The same company** | About ("Two names, one company"), author page, press kit, app-page "Developer" row, JSON-LD `Organization.alternateName` |
| **Reign Creative** | Short form of the brand | Header wordmark, and in running prose |
| **reigncreativellc.com** | The official website | Everywhere; the only host in any canonical |

The relationship is now stated on the About page, the author page, the editorial
policy, the press kit, every app page and `llms.txt`, and in structured data as
`name` plus `alternateName` on the one `#organization` node.

## What was inconsistent, and what changed

| Finding | Change |
| --- | --- |
| A third name, "Reign Creative Team", was the byline on 525 articles and the `BlogPosting.author` name, linked to neither company name | Replaced with **Reign Creative LLC**, from the author registry. The audit now fails on "Reign Creative Team" anywhere in the output |
| App pages said "Developer: Reign Creative LLC", while the store listing a reader compares against says "Reign Collective Apps" | The row now shows both: "Reign Creative LLC" with "Reign Collective Apps on Google Play" beneath it |
| The About page gave only "Publishing on Google Play as Reign Collective Apps" in a side card | A "Who we are" section explains the two names and states the official website, with a facts list: legal name, Play developer name, website, developer page, founding year, app count, support |
| `Organization.logo` was the 32-unit favicon SVG | Now `/apple-icon.png`, the same crown mark at 180×180, which meets Google's 112 px minimum for a logo |
| The About page carried no page-level structured data | `AboutPage` with `mainEntity` → `#organization` |
| The author was an unlinked `Organization` pointing at `/editorial-policy/` | `ProfilePage` at `/authors/reign-creative-llc/`, `mainEntity` → the same `#organization` node, with identical name, URL and `sameAs` |
| `llms.txt` did not name the relationship | It now opens with it, in three sentences |

## Checked and consistent

From the final build (606 files):

- **Company names.** "Reign Creative LLC" appears 10,248 times, "Reign Collective
  Apps" 1,189 times, and the short "Reign Creative" 2,123 times. **Zero**
  occurrences of "Reign Creative Team", "Reign Creative Editorial", "Reign
  Creatives", "Reign Creative, LLC", "Reign Creative Apps", "Reign Collective LLC",
  "Reign Collective" without "Apps", or "ReignCreative" outside the support email.
- **Organization JSON-LD** is byte-identical on every page (`validate-structured-data`),
  with `name` "Reign Creative LLC", `alternateName` "Reign Collective Apps", `url`
  equal to the site root, a logo file the site serves, and `sameAs` holding only
  the verified Google Play developer page.
- **Apps.** On all 39 app pages the H1, `SoftwareApplication.name` and the catalog
  name are identical, `installUrl` carries the catalog package, and `publisher` is
  the `#organization` node.
- **Google Play links.** All 2,598 in the export point at a catalog package or at
  the developer page. The developer page URL is spelled exactly one way.
- **Unreleased names.** "IQ Test & Brain Training Games" and "World History
  Simulator" appear nowhere; both are local `app.json` names, not the live store
  titles.
- **Bylines.** Every `BlogPosting.author` is a registry name, and no `Person` node
  exists (`audit-authorship` covers the byline side, §6 of
  [authorship-audit.md](./authorship-audit.md)).
- **Google Play developer name.** All 39 listings show the developer as "Reign
  Collective Apps", from the verified listing data in
  `scripts/play-verification.json` (verified 2026-09-15).

## Needs the owner: the "Website" field on 29 Play listings

Every one of the 39 live listings links to `reigncreativellc.com`, but checked
signed-out on 2026-09-26 (UTC), **only 10 give the site itself as the developer
website**. The other **29 link only the privacy policy**
(`/privacy/`; Regal Video Player also links `/terms/`).

The 10 that do: Protein Diet Tracker, Space Galaxy Attack Arcade, World History
Timeline Sim, Basketball Career Sim, Pro Basketball GM Franchise, Zombie Survival:
Last Survivor, Anime Coloring Book: Paint Art, Learn Cambodian, Speak Khmer, Keto
Diet Tracker: Low Carb, Anime Trivia & Word Games.

The About page says only what is true for all 39 — every listing links here, if
only for the privacy policy.

**Owner action:** Play Console → each of the other 29 apps → *Store presence →
Store settings → Store listing contact details → Website*. Set it to
`https://reigncreativellc.com/` or, better, that app's own page
(`https://reigncreativellc.com/apps/<slug>/`). This is the strongest available
confirmation, visible to users and crawlers alike, that the Play developer and
this website are the same entity. It cannot be changed from this repository.

## Not changed, deliberately

- **The short "Reign Creative"** stays in the header wordmark and in prose. It is
  an unambiguous short form of the legal name, not a third entity, and replacing
  2,123 natural uses would be rewriting for its own sake.
- **No `sameAs` beyond the Play developer page.** No official LinkedIn, X or
  other company profile could be verified. The brief rules out adding unverified
  or empty profiles.
- **`foundingDate: 2024`** is kept as stated in `companyInfo`. Nothing
  contradicts it, and nothing further was added: no founding story, team or
  awards.
