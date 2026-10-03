# Pokémon TCG catalog — rights audit

Recorded **2026-10-02** (all web pages fetched that day, roughly 22:00–22:40 UTC).
Agent 6 of the coordinated website expansion.

**Question.** May reigncreativellc.com publish Pokémon TCG catalog data or images? The
owner asked for a central catalog with filters (year, set, Pokémon name, rarity, card number,
artist, gold cards, secret rares) and a few curated collections, but only if the rights are
conclusively established.

**Standard applied.** Every Pokémon name, card record, image, scan, set logo and piece of
artwork is treated as blocked until written terms conclusively authorise that exact use: public
display on a commercial, ad-supported website. An API key, a paid plan, attribution, a
disclaimer, a local database or hotlinking does not, by itself, grant copyright or trademark
permission. Data-access terms (what a provider lets you do with its responses) are kept separate
from IP ownership (who owns the card art and marks).

**Not legal advice. No fair-use or nominative-use determination is made anywhere in this
document.** The decision rests only on whether written authorisation exists.

> This repository is public (`HotFunyuns/Website`, `"visibility": "public"`, checked
> 2026-10-02). This audit therefore reproduces **no card records**. It gives only counts and the
> few names needed to describe what is blocked. Owner-only notes about the app itself are kept
> outside this public repository.

---

## Decision: BLOCKED

Do not publish any of the following:

- Pokémon card images, scans, crops or photos, set symbols, set logos or artwork
- a Pokémon TCG catalog of any kind (card, set, year, rarity, card-number, artist or
  Pokémon-name pages or filters)
- curated Pokémon collections
- Pokémon character names

### The exact blocker

The rights holders are The Pokémon Company International, Inc. (TPCi) and
Nintendo / Creatures Inc. / GAME FREAK inc. **No written licence from them authorises
public, commercial website display of Pokémon card images, designs, character names or card
data.** TPCi's published position also closes the ordinary route to getting one:

1. **Terms of Use** (<https://www.pokemon.com/us/legal/terms-of-use/>, "Last Update: June 15,
   2023", fetched 2026-10-02):
   - §5: "These Terms grant permission to you, in your individual capacity, to use the
     content of Service made available to you for personal, noncommercial home use only."
   - §3: "Because we receive thousands of such requests, our policy is to decline use of our
     trademarks and copyrights."
2. **Support article "Can I use Pokémon images or materials?"**
   (<https://support.pokemon.com/hc/en-us/articles/360000634094-Can-I-use-Pok%C3%A9mon-images-or-materials>,
   updated 2026-01-30, fetched 2026-10-02):
   > "Unfortunately, we're not in a position to review requests to use the Pokémon intellectual
   > property (including its characters, names, and designs). As a result, we ask that you not use
   > it in or associate it with your project in any way."
3. **Legal Information** (<https://www.pokemon.com/us/legal/information/>, fetched
   2026-10-02): "Pokémon, Pokémon character names, … are trademarks of Nintendo."

### Secondary blockers

Each of these is enough on its own to block its data class:

| Provider | Blocker |
|---|---|
| Pokémon TCG API (the established catalog API) | Its Terms of Service grant **no** data or image licence and say nothing on display, caching or redistribution. It is deprecated, and its data repository says it "is scheduled to be taken offline on March 1, 2027." |
| Scrydex (official successor) | Card images "belong to their respective copyright holders". Its Terms forbid users to "Resell, sublicense, redistribute, mirror, or commercially exploit the Services without prior written authorization from Scrydex." |
| TCGplayer (USD prices) | It claims "pricing information and card databases" as its property. Its API terms forbid distributing its content "to your end users or third parties … for commercial or competitive purposes" and obtaining its pricing "from a third-party". New API access is closed. |
| Cardmarket (EUR prices) | The governing General Terms and Conditions **could not be fetched** (HTTP 403 to both fetch methods). A 2024 blog announcement is not terms. |

---

## 1. Candidate sources for a catalog

A catalog would need card records, images and prices. These are the sources that could supply
them. §2 and §3 assess each one for public display on this website.

| Data or image class | Candidate source | Host |
|---|---|---|
| Card records: name, set id/name/series/set code, printed total, set release date, number, rarity, artist, supertype, HP, types | Pokémon TCG API v2 (deprecated; offline from 2027-03-01) and its successor, Scrydex | `api.pokemontcg.io`; `scrydex.com` |
| Card images / scans | The same APIs' image hosts; TCGdex assets; the pokemon.com card database | `images.pokemontcg.io`, `images.scrydex.com`, `assets.tcgdex.net` |
| Set symbols and logos | The same APIs (`images.symbol` / `images.logo`) | as above |
| Prices | TCGplayer (USD) and Cardmarket (EUR), as relayed by the Pokémon TCG API; Scrydex's own pricing | `api.pokemontcg.io`; `scrydex.com` |
| Currency conversion | Frankfurter (no key) | `api.frankfurter.app` |
| Downloadable databases | `PokemonTCG/pokemon-tcg-data`; TCGdex `cards-database`; Cardmarket's price guide and product catalogue | GitHub; Cardmarket |

---

## 2. Rights by data and image class

### Summary

| # | Class | Conclusively authorised for public commercial website use? |
|---|---|---|
| A | Pokémon character names (filters, page titles, URLs, collection names, alt text, metadata) | **No** |
| B | Card records / metadata | **No** |
| C | Official card images / scans | **No** |
| D | Photos of physical Pokémon cards (ours or users') | **No** |
| E | Set symbols, set logos, rarity marks, energy symbols, card back, Poké Ball imagery | **No** |
| F | TCGplayer prices (USD) | **No** |
| G | Cardmarket prices (EUR) | **No** (governing terms could not be verified) |
| H | Scrydex prices, graded prices, price history | **No** |
| I | Bundled or downloadable catalog databases | **No** |
| J | Currency rates (Frankfurter) | Not Pokémon data. Nothing that is blocked depends on it |
| K | Reign Creative's own methodology text, generic diagrams, the app icon, and screenshots that show no Pokémon content | Needs none of the permissions audited here |

### Class sheets

**A — Pokémon character names**

| Field | Finding |
|---|---|
| Source | Card `name` field (Pokémon TCG API / Scrydex); the owner's "Pokémon name" filter; collection titles such as "Rayquaza cards" |
| Rights holder | Nintendo ("Pokémon character names … are trademarks of Nintendo"); TPCi manages the property |
| API / dataset terms | Pokémon TCG API: its terms grant no rights to data or images. Scrydex §9: "Any third-party card data, metadata, trademarks, or related content accessible through the Services remains the property of its respective owners or licensors." |
| Commercial-display permission | None. TPCi asks "that you not use it in or associate it with your project in any way" (names are named expressly) |
| Attribution | None offered; attribution would not create permission |
| Caching | n/a |
| Redistribution | TPCi Terms §5(ix) forbids using "the Service or content for commercial purposes, including … (b) placing advertising" |
| Terms dates | TPCi Terms 2023-06-15; support article 2026-01-30; Legal Information undated (© 2026) |
| **Authorised?** | **No** |

**B — Card records (name, set, series, set code, number, printed total, rarity, artist, release date, supertype, HP, types; rules, attack and flavour text if used)**

| Field | Finding |
|---|---|
| Source | Pokémon TCG API v2 (deprecated); Scrydex (successor) |
| Rights holder | Card names, text and designs come from the Pokémon rights holders (per the © and trademark notices quoted in §3.1). The compilations come from the providers, neither of which offers a display licence |
| API / dataset terms | Pokémon TCG API ToS: acceptable use, accounts and liability only. No grant of rights to data or images |
| Commercial-display permission | None. Scrydex requires "prior written authorization" to redistribute, mirror or commercially exploit |
| Attribution | Pokémon TCG API: none specified. Scrydex: none for data |
| Caching | Pokémon TCG API: not addressed (rate limits only). Scrydex recommends caching and local databases, but that is operational advice, not a licence |
| Redistribution | Pokémon TCG API: not addressed. Scrydex §4 prohibits it without written authorisation |
| Terms dates | Pokémon TCG API ToS undated; Scrydex Terms undated ("effective immediately upon posting") |
| **Authorised?** | **No.** No written terms authorise the class |

**C — Official card images / scans**

| Field | Finding |
|---|---|
| Source | `images.small` / `images.large` URLs (`images.pokemontcg.io`); Scrydex image URLs (`images.scrydex.com`); TCGdex assets; pokemon.com card database |
| Rights holder | Pokémon rights holders ("©1995–2026 Nintendo / Creatures Inc. / GAME FREAK inc."; TPCi) |
| API / dataset terms | Pokémon TCG API: none. Scrydex: "you are free to include the provided card images in your applications", **but** "Scrydex does not claim ownership of the images provided by the API. All images belong to their respective copyright holders." and "By using these images, you acknowledge that you are responsible for compliance with applicable copyright laws and permissions." |
| Commercial-display permission | None from any rights holder. TPCi: "personal, noncommercial home use only" |
| Attribution | Scrydex: "It is generally recommended to provide attribution to the respective copyright holders." This is a recommendation, not a licence |
| Caching | Scrydex suggests caching or self-hosting images. TPCi forbids "Download quantities of content to a database for any reason" (content on its Service) |
| Redistribution | TPCi forbids commercial use and derivative works. Scrydex §4 requires written authorisation |
| Terms dates | TPCi 2023-06-15 / 2026-01-30; Scrydex docs undated |
| **Authorised?** | **No** |

**D — Photos of physical Pokémon cards (taken by us or by users)**

| Field | Finding |
|---|---|
| Source | Any photo of a physical card, whether the company's or a user's |
| Rights holder | The photo reproduces the card artwork, which carries the Pokémon rights holders' © notices (§3.1). Scrydex: "All images belong to their respective copyright holders" |
| Terms | No rights holder grants permission. A website would be publishing the artwork |
| **Authorised?** | **No** |

**E — Set symbols, set logos, rarity marks, energy symbols, card back, Poké Ball imagery**

| Field | Finding |
|---|---|
| Source | Set `images.symbol` / `images.logo` (Pokémon TCG API, Scrydex) |
| Rights holder | Pokémon rights holders ("™, ®️, and character names are trademarks of Nintendo", tcg.pokemon.com footer) |
| Terms | As for C |
| **Authorised?** | **No** |

**F — TCGplayer market prices (USD)**

| Field | Finding |
|---|---|
| Source | Pokémon TCG API `tcgplayer` block ("all provided via TCGPlayer") |
| Rights holder | TCGplayer, Inc.: "pricing information and card databases, are the property of TCGplayer, Inc." |
| API terms | Licence only "solely for the purpose explicitly pre-approved by TCGplayer in writing". It forbids distributing content "to your end users or third parties … for commercial or competitive purposes", combining with third-party pricing, and obtaining pricing "from a third-party that was collected from the Site using our API". New API access is closed |
| Commercial-display permission | None |
| Attribution (for API licensees) | "This product uses TCGplayer data but is not endorsed or certified by TCGplayer." Plus naming TCGplayer as the source and a link to the product page |
| Caching / storage | Forbids "copy, store or modify content or information (including pricing information) from the Site, other than for the purposes allowed" |
| Terms dates | API T&C "Updated: June 8, 2022"; site ToS "Updated: September 27, 2023" |
| **Authorised?** | **No** |

**G — Cardmarket prices (EUR)**

| Field | Finding |
|---|---|
| Source | Pokémon TCG API `cardmarket` block ("provided by cardmarket and made available via this API"); Cardmarket's own downloadable price guide |
| Rights holder | Sammelkartenmarkt GmbH und Co. KG (Cardmarket) |
| Terms | **General T&Cs not fetchable** (HTTP 403 and a "Just a moment..." challenge to curl; HTTP 403 to WebFetch). The API is closed to new applicants. A 2024-03-25 blog post says the datasets can be used "however you see fit", but that is an announcement, not the governing terms, and it cannot cover Pokémon names or images |
| Unverified secondary report | A search-engine summary attributes to the T&Cs a requirement of "prior written agreement" for presenting cards and prices. **Not verified against the primary page; not relied on** |
| **Authorised?** | **No** (not conclusively) |

**H — Scrydex prices, graded prices, price history**

| Field | Finding |
|---|---|
| Terms | Paid plans ($29 / $99 / $399 per month, or Enterprise). §4 forbids redistribution, mirroring or commercial exploitation without "prior written authorization from Scrydex". §7 says AI-generated outputs (which it says include "pricing data") "should not be relied upon as the sole basis for financial, purchasing … decisions". Pricing is USD/JPY; Cardmarket support is still being "evaluat[ed]" |
| **Authorised?** | **No** |

**I — Bundled or downloadable catalog databases**

| Candidate | Finding |
|---|---|
| `PokemonTCG/pokemon-tcg-data` (GitHub) | **Licence: none declared** (GitHub API `"license": null`; the repo root lacks a LICENSE file). Deprecated: "should not be used as the primary data source for new applications" |
| TCGdex `cards-database` | MIT licence ("Copyright (c) 2021 TCGdex") on **its** database and software. Its own README says it "is not produced, endorsed, supported or affiliated with Nintendo or The Pokémon Company". MIT cannot license Pokémon IP that TCGdex does not own |
| Cardmarket product catalogue download | As G: governing terms unverified |
| **Authorised?** | **No** |

**J — Currency rates.** Frankfurter (<https://frankfurter.dev/>): "You don't need an API key. The
project is open source". These are not Pokémon data and need no clearance for anything in this
audit.

**K — Reign Creative's own material.** Grading and centring methodology text, generic
measurement diagrams, the app icon and screenshots that show no Pokémon content depend on none
of the permissions above.

---

## 3. Provider terms: quotes, URLs and fetch dates

All pages were fetched on **2026-10-02**. Quotes come from the raw HTML (curl, tags stripped)
unless marked otherwise. Whitespace is normalised; wording is unchanged.

### 3.1 The Pokémon Company International (IP owner)

**Terms of Use** — <https://www.pokemon.com/us/legal/terms-of-use/> — "Last Update: June 15,
2023". The first curl attempt hit a bot challenge ("Pardon Our Interruption"). WebFetch read the
page, and a second curl with browser headers returned the raw page, **against which every quote
below was checked.**

- §1 scope covers "(i) www.Pokemon.com; … (iii) All apps published by Pokémon … (iv) Pokémon
  Trading Card Game Live".
- §3: "Unless otherwise noted, all content on the Service, including articles, artwork, screen
  shots, graphics, logos, downloads and other files, is the property of Pokémon and is protected by
  United States and international copyrights, trademarks and other intellectual property laws.
  Trademarks and copyrights for third-party games and characters are owned by the companies which
  market or license those products. Because we receive thousands of such requests, our policy is
  to decline use of our trademarks and copyrights."
- §5: "These Terms grant permission to you, in your individual capacity, to use the content of
  Service made available to you for personal, noncommercial home use only. In no instance may
  you:"
  - "(ii) Modify, or create derivative works based on, the content;"
  - "(iv) Use the content in any manner: (a) suggesting an association with any other products,
    services, or brands (b) that is likely to cause confusion among customers, (c) that disparages
    or discredits Pokémon, (d) that is otherwise exploitative for any commercial purpose; or (e)
    that otherwise infringes our intellectual property rights;"
  - "(v) Download quantities of content to a database for any reason;"
  - "(ix) Use the Service or content for commercial purposes, including, but not limited to: (a)
    selling access to all or part of the Service; or (b) placing advertising, sponsorships, or
    promotions on or within the Service or content;"

**Legal Information** — <https://www.pokemon.com/us/legal/information/> (redirected from
`/us/legal/`), undated:

> "© 2026 Pokémon. © 1995–2026 Nintendo/Creatures Inc./GAME FREAK inc. Pokémon, Pokémon character
> names, Nintendo Switch, Nintendo 3DS, Nintendo DS, Wii, Wii U, and WiiWare are trademarks of
> Nintendo."
>
> "In no uncertain terms, does Pokémon's use of Fan Art constitute a grant to Fan Art's creator to
> use the Pokémon intellectual property or Fan Art beyond a personal, noncommercial home use."

**Copyright** — <https://www.pokemon.com/us/legal/copyright/>, undated:

> "You should assume that everything you see or read on http://www.pokemon.com is copyrighted --
> unless otherwise noted -- and may not be used except as stated in the Pokémon Terms of Use or
> with the written permission of The Pokémon Company International ("Pokémon")."

The only contact on that page is the copyright agent for copyright complaints. It is not a
licensing channel.

**Support: "Can I use Pokémon images or materials?"** —
<https://support.pokemon.com/hc/en-us/articles/360000634094-Can-I-use-Pok%C3%A9mon-images-or-materials>
— updated 2026-01-30T18:36:58Z. Quoted in full under the Decision above.

**Support: "Pokémon Content Guidelines for Online Streaming Platforms"** —
<https://support.pokemon.com/hc/en-us/articles/17715339053972-Pok%C3%A9mon-Content-Guidelines-for-Online-Streaming-Platforms>
— "Last updated: January 31, 2024". These cover only co-streams of official broadcasts:

> "All other Pokémon services and products not listed are not covered by these Guidelines."
>
> "Other forms of monetization of our intellectual property for commercial purposes are not
> permitted, such as … creating the derivative works related to Pokémon (including, but not limited
> to, games, apps, illustrations, music, and videos) for commercial purposes."

**tcg.pokemon.com footer** — <https://tcg.pokemon.com/en-us/>:

> "©2026 Pokémon. ©1995–2026 Nintendo / Creatures Inc. / GAME FREAK inc. ™, ®️, and character
> names are trademarks of Nintendo."

**corporate.pokemon.com** — <https://corporate.pokemon.com/en-us/>. Read with WebFetch, which
returned "NONE FOUND": the page has no licensing or permission-request route. Its navigation is
Home, About Us, Careers, Inclusion and Social Impact.

### 3.2 Nintendo

**Game Content Guidelines for Online Video & Image Sharing Platforms** —
<https://www.nintendo.co.jp/networkservice_guideline/en/index.html> — "November 29, 2018 (Updated
September 2, 2024)". They cover "gameplay footage and/or screenshots captured from games for
which Nintendo owns the copyright … for appropriate video and image sharing sites" (YouTube,
Twitch, Instagram). They state that "mere copies of … art collections, etc., … are outside the
scope of the Guidelines" and "we will not be able to respond to individual inquiries regarding
these Guidelines." A card catalog website is not covered.

### 3.3 Pokémon TCG API (pokemontcg.io)

- **Home** <https://pokemontcg.io/>: "The Pokémon TCG API is now part of Scrydex - a suite of TCG
  developer APIs."
- **Banner** on <https://docs.pokemontcg.io/> and <https://dev.pokemontcg.io/>: "The Pokémon TCG
  API is deprecated. New account registrations are no longer available. Existing API keys will
  continue to function through March 1, 2027. Please migrate your application to Scrydex."
- **Terms of Service** <https://dev.pokemontcg.io/terms> (undated; `/terms` on the other two hosts
  returns 404):
  - "These are the Terms of Service for using the Pokémon TCG API. You must read these terms and
    agree to them before using an API Key for the Pokémon TCG API account."
  - "We may modify these terms at any time."
  - "Price data is for informational purposes only. The Pokémon TCG API may include information
    about the price of third-party products or cards. Absolutely no guarantees are made for this
    information. See stores for final prices."
  - Footer: "This website is not produced, endorsed, supported, or affiliated with Nintendo or
    The Pokémon Company."
  - The terms contain **no** licence of data or images and no clauses on commercial display,
    attribution, caching or redistribution.
- **Rate limits** <https://docs.pokemontcg.io/getting-started/rate-limits>: "If you aren't using
  an API key, you are rate limited to 1000 requests a day, and a maxium [sic] of 30 per minute."
- **Authentication** <https://docs.pokemontcg.io/getting-started/authentication>: "API requests
  without authentication won't fail, but your rate limits are drastically reduced."
- **Card object** <https://docs.pokemontcg.io/api-reference/cards/card-object>:
  - `images.small`: "A smaller, lower-res image for a card. This is a URL." `large`: "A larger,
    higher-res image for a card. This is a URL." (sample host `images.pokemontcg.io`)
  - `tcgplayer`: "ALL PRICES ARE IN US DOLLARS" … "(all provided via TCGPlayer)"
  - `cardmarket`: "The following prices are provided by cardmarket and made available via this
    API"
- **Set object** <https://docs.pokemontcg.io/api-reference/sets/set-object>:
  - `images`: "Any images associated with the set, such as symbol and logo."
  - `printedTotal`: "This total does not include secret rares."
  - `total`: "The total number of cards in the set, including secret rares, alternate art, etc."
- **Data repository** <https://github.com/PokemonTCG/pokemon-tcg-data> (README fetched raw; repo
  pushed 2026-09-17): "**The Pokémon TCG API is scheduled to be taken offline on March 1,
  2027.**" GitHub API reports `"license": null`, and the root listing lacks a LICENSE file.

### 3.4 Scrydex (successor)

- **Terms of Service** <https://scrydex.com/terms> (no date shown):
  - §2: "Changes become effective immediately upon posting to this page unless otherwise
    stated."
  - §4, "You agree that you will not:" …
    - "Resell, sublicense, redistribute, mirror, or commercially exploit the Services without
      prior written authorization from Scrydex."
    - "Use the Services primarily as a substitute backend, proxy, or wholesale data source for a
      competing commercial product or service without written authorization from Scrydex."
  - §9: "Except as expressly permitted under these Terms, no rights are granted to you by
    implication or otherwise. Any third-party card data, metadata, trademarks, or related content
    accessible through the Services remains the property of its respective owners or licensors.
    Scrydex does not claim ownership of third-party intellectual property."
  - §15: indemnity includes "Your infringement of third-party rights."
- **Best practices, Images** <https://scrydex.com/docs/getting-started/best-practices>:
  - "When using the Scrydex API, you are free to include the provided card images in your
    applications."
  - Under "Notes About Using Scrydex Images":
    - "Scrydex does not claim ownership of the images provided by the API. All images belong to
      their respective copyright holders."
    - "By using these images, you acknowledge that you are responsible for compliance with
      applicable copyright laws and permissions."
    - "It is generally recommended to provide attribution to the respective copyright holders."
- **Best practices, Caching** (same page): "Cache pricing data for at least 24 hours." … "storing
  critical data in a local database is recommended."
- **Pricing** <https://scrydex.com/pricing>:
  - Plans: $29 / month (5,000 API credits), $99 / month (50,000), $399 / month (250,000) and
    Enterprise.
  - "Caching data on your end is recommended to save credits!"
  - The Starter plan is described as "Perfect for building a personal collection tracker or a
    small community discord bot" with "Access to high-quality card images for UI display."
- **FAQ** <https://scrydex.com/faq>:
  - "Scrydex is the official successor to pokemontcg.io."
  - On Cardmarket: "We are currently evaluating the addition of Cardmarket and other
    Europe-focused marketplaces."
- **Rate limits** <https://scrydex.com/docs/getting-started/rate-limits>: "There is a rate limit
  of 100 requests per second applied per-second across all API requests."

### 3.5 TCGplayer

- **Developer docs** <https://docs.tcgplayer.com/docs/getting-started>: "We are no longer
  granting new API access at this time. Existing users must adhere to the terms of service that
  govern the use of our API, including, but not limited to important restrictions and
  attributions required by you."
- **API Terms & Conditions**
  <https://help.tcgplayer.com/hc/en-us/articles/360061115874-TCGplayer-API-Terms-Conditions> —
  "Updated: June 8, 2022" (help-centre timestamp 2026-09-18T02:41:59Z):
  - Use: "TCGplayer hereby grants you a non-exclusive, non-transferable, and non-sublicensable
    license to use the TCG Offering solely for the purpose explicitly pre-approved by TCGplayer in
    writing as part of your application to receive access to the TCG Offering."
  - "The API is provided solely for the purpose of (a) academic research or (b) promoting and
    facilitating access to and use of the Site."
  - Restricted activities include:
    - "Combine TCGplayer's pricing data with your own or a third party's pricing data."
    - "Distribute TCG Content or otherwise make it available to your end users or third parties,
      including any other developers, for commercial or competitive purposes."
    - "Obtain content or information (including pricing information) from a third-party that was
      collected from the Site using our API or otherwise using automated means, as described
      above."
    - "Sell, rent, trade, distribute, lease (or otherwise commercialize), copy, store or modify
      content or information (including pricing information) from the Site, other than for the
      purposes allowed by these API Terms."
  - Attribution: "All services which utilize or access the TCG Offering shall display the
    following notice prominently within your software application, website or other interface:
    "This product uses TCGplayer data but is not endorsed or certified by TCGplayer."" …
    "When using TCGplayer pricing data, TCGplayer must be identified as the source. A link must be
    provided to direct the user to the appropriate TCGplayer product page or search result."
- **Terms of Service**
  <https://help.tcgplayer.com/hc/en-us/articles/205004918-Terms-of-Service> — "Updated:
  September 27, 2023":
  - "All of the content found on TCGplayer.com and websites under the TCGplayer.com domain,
    including graphics, text, buttons, logos, video, audio, downloadable files, pricing
    information and card databases, are the property of TCGplayer, Inc. and protected by United
    States and international copyright laws."
  - Pokémon is listed among trademarks that "appear on TCGplayer, but not be owned by
    TCGplayer".
  - "You agree not to crawl, scrape or spider any of our websites without express permission
    from us."

### 3.6 Cardmarket

- **General Terms and Conditions** <https://www.cardmarket.com/en/Policies/GeneralTermsAndConditions>
  (and `/GB`): **NOT FETCHED.** Both methods returned HTTP 403 (curl got a Cloudflare "Just a
  moment..." challenge). No quote is given, and nothing is inferred from memory.
- **Help: Cardmarket API** <https://help.cardmarket.com/en/cardmarket-api>: "Currently, we are not
  accepting applications for access to the Cardmarket API."
- **"The State of Cardmarket 2024"**
  <https://insight.cardmarket.com/en/Articles/the-state-of-cardmarket-2024> (published
  2024-03-25):
  > "our team is happy to announce that these data sets will become publicly available to all
  > users, without the need to have access to our API. This means you can always access and
  > download them on demand and use them however you see fit. Do you want to fetch Cardmarket
  > prices for your own website or app? … All of this will be possible soon, no approval or API
  > access needed."

  This is a forward-looking blog post, not the governing terms.
- **News, 05.06.2024**
  <https://news.cardmarket.com/en/Magic/were-making-the-price-guide-and-product-catalogue-available-for-download>:
  "Starting next Tuesday, Cardmarket's price guide and product catalogue will be available for
  download for all games." This post contains no licence terms.

### 3.7 TCGdex

- <https://raw.githubusercontent.com/tcgdex/cards-database/master/LICENSE>: "MIT License /
  Copyright (c) 2021 TCGdex".
- README: "A Multilanguage Pokémon TCG Database with Cards Pictures and most of the information
  contained on the cards." … "This database is not produced, endorsed, supported or affiliated
  with Nintendo or The Pokémon Company. The Database is licensed under the MIT License."

### 3.8 Fetch log

| URL | Method | Result | Page's own date |
|---|---|---|---|
| pokemon.com/us/legal/terms-of-use/ (also via /us/terms-of-use/) | curl ×3, WebFetch ×3 | first 2 curls: bot-challenge page; 3rd curl with browser headers: 200 (verbatim check); WebFetch 200 | Last Update 2023-06-15 |
| pokemon.com/us/legal/information/ | curl | 200 | none (© 2026) |
| pokemon.com/us/legal/copyright/ | curl | 200 | none |
| support.pokemon.com article 360000634094 | curl | 200 | updated 2026-01-30 |
| support.pokemon.com article 17715339053972 | curl | 200 | last updated 2024-01-31 |
| tcg.pokemon.com/en-us/ | curl | 200 | © 2026 |
| corporate.pokemon.com/en-us/ | curl, WebFetch | 200 (6 KB shell); WebFetch "NONE FOUND" | — |
| nintendo.co.jp/networkservice_guideline/en/ | curl | 200 | 2018-11-29, updated 2024-09-02 |
| pokemontcg.io, docs.pokemontcg.io (5 pages), dev.pokemontcg.io, dev.pokemontcg.io/terms | curl | 200 | none (docs footer © 2022) |
| pokemontcg.io/terms, /tos; docs.pokemontcg.io/terms | curl | 404 | — |
| github.com/PokemonTCG/pokemon-tcg-data (API + README) | curl | 200; licence null | pushed 2026-09-17 |
| scrydex.com: home, /terms, /pricing, /faq, /docs, 4 getting-started pages | curl | 200 | none shown |
| docs.tcgplayer.com/docs/getting-started | curl | 200 | none |
| help.tcgplayer.com API T&C / ToS | curl | 200 / 200 | 2022-06-08 / 2023-09-27 |
| cardmarket.com General T&Cs (two URLs) | curl, WebFetch ×2 | **403** | **not fetched** |
| help.cardmarket.com/en/cardmarket-api | curl | 200 | none |
| insight.cardmarket.com (2024 article); news.cardmarket.com (2024-06-05) | curl | 200 / 200 | 2024-03-25 / 2024-06-05 |
| TCGdex LICENSE + README; frankfurter.dev | curl | 200 | — |

---

## 4. Why the usual workarounds do not unblock this

| Workaround | Why it does not grant permission (evidence) |
|---|---|
| Getting an API key or a paid Scrydex plan | Buys data access only. Scrydex §9: "no rights are granted to you by implication"; third-party IP "remains the property of its respective owners" |
| Attribution or a "not affiliated" disclaimer | Scrydex recommends attribution but still says "you are responsible for compliance with applicable copyright laws and permissions". TPCi offers no attribution-based permission and declines use of its marks. A disclaimer is not a licence |
| A local or bundled database, or caching | Scrydex's caching advice is operational. TPCi forbids "Download quantities of content to a database for any reason" (for content on its Service). The `pokemon-tcg-data` repo's licence field is null |
| Hotlinking `images.pokemontcg.io` / `images.scrydex.com` | The copyrighted image is still displayed on our page; the hosts disclaim ownership ("All images belong to their respective copyright holders") |
| Our own photos of cards | They reproduce the card artwork (class D) |
| MIT-licensed TCGdex data | MIT covers TCGdex's own work; TCGdex disclaims any affiliation with Nintendo / TPCi |
| Asking TPCi | "we're not in a position to review requests to use the Pokémon intellectual property" |
| Other sites publish catalogs | Their arrangements, if any, are not ours. Nothing found grants a licence to third parties |

---

## 5. What the website can still do, and what is blocked

### Available: no Pokémon IP or provider data involved

This is a dependency analysis, not legal advice.

- **The app page** `/apps/tcg-card-grading-scanner/` as currently written
  (`src/data/apps/catalog/video-utility.ts` lines 106–207). It says "trading cards" generically,
  names no Pokémon, shows no card images or prices, and already answers "Is it affiliated with any
  card company…? No."
- **The app icon** (`public/icons/tcg-card-grading-scanner*.webp`): a generic holographic card
  with a gem and a rising chart. No Pokémon imagery.
- **General educational text** on grading scales, centring measurement and ratios, photographing
  cards, condition terms, why price estimates disagree, bulk scanning and match correction. It
  must be written generically: no Pokémon names, no card images, no specific-card prices.
  - Seven of the nine existing TCG articles contain no Pokémon or provider references at all:
    `bulk-scanning-a-card-collection`, `card-grading-costs-and-tiers`,
    `how-to-measure-card-centring`, `is-my-card-worth-grading`,
    `photographing-cards-for-centring`, `when-a-card-scanner-picks-the-wrong-card`,
    `why-card-price-estimates-disagree`.
  - None of the nine embeds an image. None of the 12 character names checked (for example
    Pikachu, Charizard, Rayquaza) appears anywhere in `content/` or `src/`. That check is a
    sample, not an exhaustive list.
- **Original company-made diagrams.** Use plain card outlines with border and measurement
  overlays. They must not depict Pokémon characters, card art, the card back, the Poké Ball, or
  official set, energy or rarity marks.
- **App screenshots that show no Pokémon content**: no character names, card art, set or rarity
  marks, Pokémon-like imagery, or card prices.

### Blocked

- Any Pokémon card image, scan, crop or photo (official or our own), set symbol, set logo,
  artwork, card back or Poké Ball imagery. This includes hotlinked or embedded images from
  `images.pokemontcg.io`, `images.scrydex.com`, `assets.tcgdex.net` or pokemon.com.
- The central catalog and every page or filter in it: card, set, year, rarity, card number,
  artist and Pokémon name. Also gold-card and secret-rare views, and the curated collections.
- New Pokémon character names anywhere on the site: titles, URLs, headings, body text, alt text,
  metadata, structured data. This also means not targeting Pokémon-branded queries. The keyword
  research already recorded such phrases, for example "pokemon card scanner app" in
  `docs/keyword-research-next-100.md`.
- Prices for specific cards from TCGplayer, Cardmarket or Scrydex, including "example" prices in
  articles.
- Any screenshot or marketing image that shows Pokémon names, card art, set or rarity marks,
  Pokémon-like imagery or card prices.
- Building a site-side catalog database from `pokemon-tcg-data`, TCGdex, Scrydex or Cardmarket
  downloads.

---

## 6. Blocked-candidate inventory

No catalog database exists to count from, so the counts were taken from the Pokémon TCG API.
On 2026-10-02 from about 22:18 UTC, six distinct count-only queries were made to
`api.pokemontcg.io/v2` without a key. That came to ten HTTP requests, because the sets and
rarities endpoints returned transient 5xx errors and were retried; all stayed within the
30-per-minute limit. **No card records were downloaded or stored**, and only totals are
reported.

| Candidate page type | Pages | Observable basis | Status |
|---|---|---|---|
| Catalog hub with filters | 1 | owner request | Blocked |
| Per-card pages (card number is a per-card attribute) | **20,670** | `/cards?pageSize=1&select=id` → `totalCount` | Blocked |
| … of which supertype Pokémon (carry a character name) | 17,464 | `q=supertype:pokemon` | Blocked |
| Set pages | **176** | `/sets?pageSize=250` (176 returned; 1 has no totals) | Blocked |
| Year pages | **28** (1999–2026) | distinct set `releaseDate` years | Blocked |
| Rarity filter pages | **44** | `/rarities` | Blocked |
| Pokémon-name pages | not counted | no endpoint lists distinct names; counting would mean downloading the full catalog, which was declined | Blocked |
| Artist pages | not counted | no artist endpoint; same reason | Blocked |
| Curated: Rayquaza cards | 1 (61 cards whose name begins "Rayquaza"; a lower bound) | `q=name:rayquaza*` | Blocked |
| Curated: secret rares | 1 (2,232 cards numbered above their set's printed total, across 106 sets; 327 carry the label "Rare Secret") | sum of `total − printedTotal`, using the API's own field definitions; `q=rarity:"Rare Secret"` | Blocked |
| Curated: gold cards | 1 (members not counted) | the API has no "gold" attribute, so membership would need editorial classification | Blocked |
| Filter-combination URLs (for example year × rarity) | not counted | combinatorial | Blocked |

**Counted total: 20,922 candidate pages** (1 + 20,670 + 176 + 28 + 44 + 3). Pokémon-name,
artist and filter-combination pages come on top of that and were not counted.

The per-set `total` values add up to 20,621, against a card `totalCount` of 20,670. The source
data disagrees slightly with itself, so the card count is used.

None of these pages exists today: the site has no catalog, and `public/` holds only the two app
icons for this app.

---

## 7. What would unblock it

1. **A written licence from TPCi comes first.** If TPCi names other owners (Nintendo /
   Creatures Inc. / GAME FREAK inc.), they may also need to sign. Every other step depends on
   this. The licence would need to cover expressly:
   - public display on reigncreativellc.com, an ad-supported commercial site
   - card images and scans, set symbols and logos, character names and card text/records
   - a searchable catalog with per-card, set, rarity, artist and character pages
   - storage in a site database and static build
   - territory, term, attribution and takedown terms

   TPCi says it is "not in a position to review requests", and no licensing route is published
   (corporate.pokemon.com: none found). Plan on the realistic outcome that no licence is granted
   and the decision stays **BLOCKED**.
2. **Only if step 1 succeeds:** written authorisation from the data provider for exactly this
   use.
   - Scrydex, under Terms §4 ("prior written authorization" to redistribute, mirror or
     commercially exploit).
   - Do not build on the Pokémon TCG API. It goes offline on 2027-03-01, and its terms grant
     nothing.
3. **Only if prices are wanted:**
   - TCGplayer: a written agreement allowing public, commercial display of its prices. New API
     access is closed, and the API terms bar distribution to end users for commercial purposes.
   - Cardmarket: get and review the governing General T&Cs (unreachable here, HTTP 403), plus
     written confirmation that price-guide downloads may be shown publicly on a commercial
     site.
4. **Until then**, keep all TCG content Pokémon-free under the rules in §5.

---

## 8. Method and limits

- **Read-only.** The app project was read in place and nothing in it was modified. In this repo
  only this file was created; nothing in `src/`, `content/` or `scripts/` was touched, and
  nothing was committed.
- **Credentials.** No credential, key or config file was opened. Key-like strings were searched
  for with values redacted.
- **External requests.** The page fetches in §3.8, plus six count-only API requests (§6).
- **Unverified items.** Search-engine summaries were used only to *locate* primary pages. The one
  claim that could not be checked against its primary page (the Cardmarket T&C clause) is marked
  "not verified; not relied on".
- **Not legal advice.** No fair-use, nominative-use or protectability determination is made. The
  decision rests only on the absence of written authorisation.
