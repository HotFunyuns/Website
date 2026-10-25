# App acquisition checklist (owner reference, 2026-10-24)

A working checklist for Reign Creative LLC when a partnership or acquisition enquiry
arrives through `/partnerships/` or the business email. It is an internal process note,
not legal advice and not an offer. Nothing in this repository, on the website or in an
article states a price, valuation, revenue, user count or contract term, and nothing here
changes that.

## 1. First contact (public channel)

- [ ] Reply from the business inbox (ReignCreativeSupport@gmail.com) only.
- [ ] Confirm what the enquirer has in mind: publishing, distribution, licensing, white-label
      (where technically feasible), sponsorship, cross-promotion, localisation, co-development,
      integration, educational/institutional partnership, or acquisition of one app, several
      apps or the portfolio — the owner-approved scope in `src/data/partnerships.ts`.
- [ ] Do not ask for, and do not accept, confidential, financial, identity or personal
      documents by email at this stage. The site's pre-filled email says the same.
- [ ] Record the enquiry outside the public repository (never in `docs/` or `content/`).

## 2. Before sharing anything non-public

- [ ] Verify the counterparty independently (company registration, website, a named contact
      with a company email address).
- [ ] Sign a mutual NDA before sharing any non-public figure, code, analytics or contract.
- [ ] Decide what may be shared and keep it out of the website and this repository:
      revenue, user and retention data, ad and IAP reports, source code, signing keys,
      credentials, contracts, tax records. (`private/` is gitignored, but nothing sensitive
      belongs in the working tree at all.)

## 3. Due diligence the buyer will typically ask about (prepare offline)

- [ ] Ownership of code, art, audio and fonts used in the app; licences for any third-party
      assets and SDKs.
- [ ] Data practices: the app's Google Play Data safety form and privacy policy
      (`/privacy/`), what is stored on device versus on a server.
- [ ] Ads and in-app purchase setup (ad SDKs, mediation, Play Billing products).
- [ ] Integrated Google services (Firebase, Google Analytics, Play Games Services) that must
      be unlinked and relinked.
- [ ] Policy standing of the developer account and the app.

## 4. The Google Play transfer (Play Console Help, "Transfer apps to a different developer account")

Source: https://support.google.com/googleplay/android-developer/answer/6230247 (text saved in
the session scratchpad as `play-transfer.txt`, read 2026-10-24). Points the help page makes:

- [ ] Review policy guidelines; the original account and every app transferred must comply.
- [ ] Download bulk export, payout and earnings reports first — they do **not** transfer.
- [ ] Both the original and the target developer accounts must be registered and active; a
      newly created target account pays Google's US$25 registration fee.
- [ ] Find both accounts' registration transaction IDs.
- [ ] Play App Signing: the target may request a new upload key, and Google describes a key
      upgrade for the app signing key for new installs.
- [ ] Paid apps / apps with in-app products: the target needs an active payments profile;
      a different default currency changes how prices apply, so prices are checked before the
      app is published again.
- [ ] Update integrated services (Google Analytics, Firebase, Play Games Services) and ad SDK
      integrations so ad traffic is credited to the new account.
- [ ] Finish any Google Play translation-service projects before requesting the transfer.
- [ ] Know what moves: users, statistics, data, comments, ratings and subscriptions. What
      stays: orders created before the transfer (refunds go back to the original account),
      bulk export / estimated sales / earnings reports. Promotions do not transfer (issued
      promo codes should still work). Test groups cannot be transferred.
- [ ] Submit the request; the target developer approves it; Google's support team replies
      within 2 business days.

## 5. After the transfer — website housekeeping

- [ ] Remove the app from `src/data/apps/catalog/` (or mark it per the catalog's rules) and
      re-run `node scripts/verify-play-listings.mjs` and `node scripts/audit-catalog.mjs`.
- [ ] Decide what happens to the app page, its consumer guides and its partnership overview
      (301s are impossible on GitHub Pages — see `docs/` hosting notes — so update or
      retire pages deliberately; never publish a page that implies Reign Creative still owns
      a transferred app).
- [ ] Update `/partnerships/`, `docs/published-app-inventory-latest.md` and the privacy policy
      app list.

## 6. Things never to do

- Never publish a price, valuation, revenue, download/user number or contract term.
- Never present a page as a binding offer to sell.
- Never collect financial-account data, identification documents or diligence materials
  through a website form or the public site.
- Never send names, emails or enquiry text to GA4.
- Never move an app outside Google Play's formal transfer process.
