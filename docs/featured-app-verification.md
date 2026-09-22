# Featured app verification

The two apps at the centre of the 250-article expansion, verified against their
**live public Google Play listings**, signed out, on **2026-09-21**.

## Method

Each listing was fetched directly:

```
curl -sL -A "<desktop Chrome UA>" \
  "https://play.google.com/store/apps/details?id=<package>&hl=en_US&gl=US"
```

Facts were then read from two places in the returned HTML:

1. The embedded `schema.org/SoftwareApplication` JSON-LD block, which Google
   Play generates from the listing itself and which is authoritative for the
   title, developer, category, content rating, icon and price.
2. The visible listing badges and the full store description.

Both requests returned `HTTP 200` with a complete listing. Neither showed an
error or a "not found" state, so **both apps are live in production on Google
Play**.

---

## App 1 — Mental Math & Memory Games

| Field | Verified value |
| --- | --- |
| **Exact Play title** | **Mental Math & Memory Games** |
| Package ID | `com.reigncreative.mentalmathchampion` |
| Developer name | Reign Collective Apps |
| Play URL | https://play.google.com/store/apps/details?id=com.reigncreative.mentalmathchampion |
| Store category | `GAME_EDUCATIONAL` (Educational game) |
| Content rating | Everyone |
| Price | Free (`price: "0"`, `USD`, `InStock`) |
| Contains ads | Yes — badge present |
| In-app purchases | Yes — badge present |
| Icon | `https://play-lh.googleusercontent.com/BODCxdjVBhapRE7FZ3jf6lJRZj2ep3Z82mbaE8IX4gZAj_ahG2Hw8OOifxV44TGOkNI2jyQdADUax5vcPJmm` |
| Store short description | "Train mental math, memory, focus, speed, and recall with fun educational games." |
| Privacy policy destination | `https://reigncreativellc.com/privacy/` (the `author.url` in the listing JSON-LD) |
| Downloads shown | `10+` |
| Star rating shown | **None.** No rating is displayed on the listing — too few ratings. |
| Screenshots | present on the listing (owned first-party assets) |

### Name discrepancy — resolved

The local project's `app.json` sets
`"name": "IQ Test & Brain Training Games"`. **That is not the live store
title.** The live title is **Mental Math & Memory Games**, and it is what the
site's catalog already uses.

The brief for this expansion refers to "the IQ Test & Brain Training Games
app". That phrase identifies the right app — the package matches — but it names
an **unreleased rename**. Publishing it as the app's current name would be
inaccurate, so every article, title, meta description, CTA, and structured-data
field in this release uses **Mental Math & Memory Games**.

The alternative names in circulation resolve as follows:

| Name | Status |
| --- | --- |
| "Mental Math & Memory Games" | **Current live Google Play title.** Use this. |
| "IQ Test & Brain Training Games" | Local `app.json` only. Unreleased. Do not publish as the current name. |
| "Mental Math Champion" | The project folder name and the Expo `slug`. Internal only; never a store title. |

### Claim-safety — what this app does and does not offer

This is the single most important section for Cohort B, and it is settled by
the app's own source, not by inference.

`src/data/cognitiveTest/norms.ts` in the app project states, verbatim:

> THIS IS A PRELIMINARY INTERNAL SCALE, NOT A VALIDATED NORM. No population
> sample, age norms, reliability or validity study backs it.

and sets `validated: false` in the norm table itself.

`src/data/cognitiveTest/brainAgeScale.ts` states, verbatim:

> PRELIMINARY AND UNVALIDATED. No population sample backs these bands.

and sets `BRAIN_AGE_SCALE_VALIDATED = false`.

Therefore, across all 100 Cohort B articles:

- The app **must not** be described as producing a professionally validated,
  standardised, or clinical IQ score. It produces an explicitly unvalidated
  estimate, which the app itself labels as an estimate.
- The Brain Performance Age output **must not** be described as a biological or
  neurological brain age. The app's own code says it is not one.
- No article may claim that using the app raises intelligence, prevents or
  delays cognitive decline, treats or diagnoses any condition, or produces a
  guaranteed cognitive benefit.
- Articles must keep practice, entertainment, educational activity, and
  standardised psychological assessment clearly distinct.
- No article may present itself as written or reviewed by a psychologist,
  physician, teacher, or neuroscientist. The byline is "Reign Creative Team"
  and the editorial policy page states what has not been expert-reviewed.
- The app's internal item banks must never be reproduced on the website. Every
  practice problem published is written fresh and independently checked.

---

## App 2 — World History Timeline Sim

| Field | Verified value |
| --- | --- |
| **Exact Play title** | **World History Timeline Sim** |
| Package ID | `com.reigncreative.history` |
| Developer name | Reign Collective Apps |
| Play URL | https://play.google.com/store/apps/details?id=com.reigncreative.history |
| Store category | `EDUCATION` |
| Content rating | Everyone |
| Price | Free (`price: "0"`, `USD`, `InStock`) |
| Contains ads | Yes — badge present |
| In-app purchases | Yes — badge present |
| Icon | `https://play-lh.googleusercontent.com/zudk3Kd4SCD__mI158_iq5vlyzAUzeU11cduP3K4LS0xhOoiXVH2aXmOJpaTL8Km4BPr41CSAtZt-9KzQpeL` |
| Store short description | "learn World History from BC to modern day in history sim & time travel game" |
| Privacy policy destination | `https://reigncreativellc.com/` (the `author.url` in the listing JSON-LD) |
| Downloads shown | `500+` |
| Star rating shown | **None.** No rating is displayed on the listing. |
| Screenshots | present on the listing (owned first-party assets) |

### Name discrepancy — resolved

The local project's `app.json` sets `"name": "World History Simulator"`. The
live store title is **World History Timeline Sim**, which is what the site's
catalog already uses and what this release publishes.

| Name | Status |
| --- | --- |
| "World History Timeline Sim" | **Current live Google Play title.** Use this. |
| "World History Simulator" | Local `app.json` only. Not the live title. |
| "History app" | Informal. Fine in running prose, never in metadata. |

### Feature claims verified from the store listing

The store description — first-party, published by the developer — confirms
these as shipped features, and Cohort C may describe them:

Time Travel Mode (alternate-history scenarios with historical context, what
actually happened, decision options, tradeoffs, and a Butterfly Effect Score);
Rewrite History Campaign; Daily Time Jump; World History Timeline browsable by
year, era, region, country and category; World History Map; Civilization
Survival Mode; Timeline Detective; History Boss Battles; What-If Tournament;
Museum Collection of unlockable artifacts; quizzes, flashcards and interactive
history games.

The listing states coverage of **over 2,000 major world history events** and
**over 2,000 what-if scenarios**. These are the developer's own published
figures for the developer's own app, so they are first-party facts rather than
unverified claims — but articles should attribute them plainly ("the listing
describes…", "the app covers…") rather than dressing them up.

### Accuracy obligations for Cohort C

- The app is a learning and exploration tool. No article may imply it replaces
  qualified teachers, scholarly books, archives, or primary sources.
- Alternate-history scenarios are counterfactual by design. Articles must never
  blur a scenario outcome with documented history.
- Every historical name, date, place, sequence and causal claim published must
  be verified against reliable museum, archive, government, university,
  scholarly or primary-source material, and cited.
- Where historians disagree, the article says so and cites more than one
  source. Documented fact, scholarly interpretation, legend and uncertainty are
  kept distinct.
- Where the app's own data appears to contain an error, the **article is
  written correctly** and the app data is flagged separately for owner review.
  Nothing in the app project is edited by this work.

---

## Shared facts

| Field | Both apps |
| --- | --- |
| Developer (Play) | Reign Collective Apps |
| Company | Reign Creative LLC |
| Relationship | Reign Collective Apps is the Google Play developer account under which Reign Creative LLC publishes. Articles state this plainly rather than leaving two names unexplained. |
| Ownership disclosure | Every article promoting either app discloses that Reign Creative owns it. |
| Install attribution | Play CTAs are built by `playUrlWithReferrer()`, which percent-encodes a single `referrer` parameter carrying `utm_source`, `utm_medium`, `utm_campaign` (app slug) and `utm_content` (article slug). No personal data. |

## What could not be verified

Recorded as unknown rather than guessed:

- **"Updated on" date** — not extractable from the server-rendered HTML
  available here. No article states an app update date.
- **Star rating / rating count** — no rating is displayed on either listing.
  **No article may state or imply a rating, an award, or a review score.**
- **Platform/OS requirements** — the "Requires Android" field was not present
  in the fetched HTML. No article states a minimum OS version.
- **Download counts** — shown as `10+` and `500+`. Recorded here for accuracy;
  deliberately **not published**, since a bare install count is not useful to a
  reader and reads as manufactured social proof either way.

## Sources

| Source | URL | Accessed |
| --- | --- | --- |
| Google Play listing — Mental Math & Memory Games | https://play.google.com/store/apps/details?id=com.reigncreative.mentalmathchampion | 2026-09-21 |
| Google Play listing — World History Timeline Sim | https://play.google.com/store/apps/details?id=com.reigncreative.history | 2026-09-21 |
| App project source (read-only) — `C:\Users\regal\Desktop\Mental Math Champion` | local | 2026-09-21 |
| App project source (read-only) — `C:\Users\regal\Desktop\History` | local | 2026-09-21 |
