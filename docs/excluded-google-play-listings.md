# Google Play listings checked and excluded

> **Latest pass: 2026-09-15.** Jump to [2026-09-15 re-audit](#2026-09-15-re-audit).
> The 2026-09-04 section below is kept as the historical record; ten of the
> packages it reports as 404 are now live under different IDs.

## 2026-09-04 audit

Every package ID probed during the 2026-09-04 inventory audit that is **not**
represented on this website, with the exact URL tested and the reason.

The probe method is identical to the inclusion test in
`docs/published-app-inventory.md`: request
`https://play.google.com/store/apps/details?id=<package>&hl=en&gl=US`
signed out, and treat the listing as public only if it returns HTTP 200 **and**
carries a `SoftwareApplication` JSON-LD block.

## Result summary

| Outcome | Count |
| --- | ---: |
| Public, included on the site | 29 |
| Probed, not public (HTTP 404) | 91 |
| Public but excluded for another reason | 0 |

**No public Reign Collective Apps listing is being withheld from the site.**
Every listing that resolved publicly was added. Nothing below was excluded on
editorial grounds — every exclusion is "this package does not exist as a public
listing".

## Why these candidates were probed at all

The public developer page returns only 20 titles and offers no pagination, so
candidates were generated from the naming conventions visible in the confirmed
set and then tested. A 404 here means the guess was wrong, not that an app was
withdrawn. None of these package names should be read as evidence that an
unreleased app exists.

## Candidates probed, all HTTP 404 (not public)

### Sport career-simulator pattern

`com.reigncreative.soccermycareer`,
`com.reigncreative.soccermycareersimulator`,
`com.reigncreative.basketballmycareer`,
`com.reigncreative.basketballmycareersimulator`,
`com.reigncreative.basketballmycareersim`,
`com.reigncreative.mmamycareer`, `com.reigncreative.mmamycareersim`,
`com.reigncreative.mmamycareersimulator`, `com.reigncreative.mmacareersim`,
`com.reigncreative.boxingmycareer`, `com.reigncreative.boxingmycareersim`,
`com.reigncreative.boxingmycareersimulator`,
`com.reigncreative.tennismycareer`, `com.reigncreative.tennismycareersim`,
`com.reigncreative.tennismycareersimulator`,
`com.reigncreative.tenniscareersim`,
`com.reigncreative.golfmycareer`, `com.reigncreative.golfmycareersim`,
`com.reigncreative.progolfsim`,
`com.reigncreative.hockeymycareer`,
`com.reigncreative.footballmycareersimulator`,
`com.reigncreative.baseballmycareersimulator`,
`com.reigncreative.cricketmycareersim`,
`com.reigncreative.cricketmycareersimulator`,
`com.reigncreative.racingmycareersim`,
`com.reigncreative.racingmycareersimulator`,
`com.reigncreative.esportsmycareersimulator`,
`com.reigncreative.wrestlingmycareersimulator`,
`com.reigncreative.volleyballmycareersimulator`,
`com.reigncreative.trackmycareersimulator`,
`com.reigncreative.swimmingmycareersimulator`,
`com.reigncreative.cyclingmycareersimulator`,
`com.reigncreative.rugbymycareersimulator`,
`com.reigncreative.bowlingmycareersimulator`,
`com.reigncreative.poolmycareersimulator`,
`com.reigncreative.dartsmycareersimulator`,
`com.reigncreative.pokermycareersimulator`,
`com.reigncreative.fightingmycareersim`

### Draft / GM pattern

`com.reigncreative.cricketdraftgm`, `com.reigncreative.rugbydraftgm`,
`com.reigncreative.esportsdraftgm`, `com.reigncreative.golfdraftgm`,
`com.reigncreative.tennisdraftgm`, `com.reigncreative.racingdraftgm`

### Language pattern `learn<language>language`

`japanese`, `korean`, `chinese`, `mandarin`, `spanish`, `french`, `german`,
`portuguese`, `dutch`, `swedish`, `norwegian`, `danish`, `finnish`, `greek`,
`hebrew`, `arabic`, `persian`, `farsi`, `hindi`, `urdu`, `bengali`, `punjabi`,
`tamil`, `telugu`, `nepali`, `sinhala`, `burmese`, `tagalog`, `filipino`,
`indonesian`, `javanese`, `swahili`, `amharic`, `yoruba`, `zulu`, `turkish`,
`polish`, `ukrainian`, `czech`, `romanian`, `hungarian`, `bulgarian`,
`serbian`, `croatian`, `albanian`, `armenian`, `georgian`, `mongolian`,
`tibetan`, `pashto`, `kazakh`, `uzbek` — each probed as
`com.reigncreative.learn<language>language`. Only `vietnamese`, `lao` and
`italian` resolved, and all three were added.

### Other language patterns

`com.reigncreative.learn<language>`, `com.reigncreative.speak<language>` and
`com.reigncreative.<language>language` were each probed across japanese, korean,
spanish, french, german, portuguese, hindi, arabic, turkish, greek, hebrew,
swahili, tagalog, filipino, indonesian, vietnamese, lao, burmese, nepali,
polish, dutch and italian. None resolved.
Also probed and not public: `com.reigncreative.learnchinesemandarin`,
`com.reigncreative.learnchinese`, `com.reigncreative.learnjapanesekanji`,
`com.reigncreative.learnkorean`, `com.reigncreative.learnvietnamese`,
`com.reigncreative.learnportuguese`, `com.reigncreative.learntagalog`.

### Utility, tracker and casual-game patterns

`com.reigncreative.calorietracker`, `com.reigncreative.workouttracker`,
`com.reigncreative.watertracker`, `com.reigncreative.habittracker`,
`com.reigncreative.sleeptracker`, `com.reigncreative.fastingtracker`,
`com.reigncreative.carnivoretracker`, `com.reigncreative.weighttracker`,
`com.reigncreative.musicplayer`, `com.reigncreative.photoeditor`,
`com.reigncreative.filemanager`, `com.reigncreative.pdfreader`,
`com.reigncreative.cardgames`, `com.reigncreative.wordsearch`,
`com.reigncreative.sudoku`, `com.reigncreative.chess`,
`com.reigncreative.tetris`, `com.reigncreative.solitaire`,
`com.reigncreative.puzzlegame`, `com.reigncreative.idlegame`,
`com.reigncreative.spaceshooter`, `com.reigncreative.tower`,
`com.reigncreative.runner`, `com.reigncreative.animequiz`

## Standing exclusion rules

These remain in force regardless of what a future probe finds:

- **Nothing in Draft, In Review, Internal Testing, Closed Testing, Open Testing
  or Pre-registration is published to this site.** A pre-registration listing is
  publicly reachable but has no Install button, so it fails the inclusion test on
  point 2 and must fail it — announcing an unreleased app as installable is a
  false claim about availability.
- **Nothing removed or suspended is published**, and if a listed app is later
  removed, the audit in `scripts/audit-catalog.mjs` fails the build rather than
  letting the page go stale.
- `scripts/verify-play-listings.mjs` keeps a `MUST_NOT_BE_PUBLIC` array for
  owner-confirmed unreleased packages, probed on every run specifically to prove
  they are *not* reachable. It is currently empty because the owner has not
  named any.

**Owner action:** if any app is in testing or pre-registration right now, add its
package ID to `MUST_NOT_BE_PUBLIC` so every future verification run asserts it
has not leaked.

---

# 2026-09-15 re-audit

Re-run of the same probe against a wider candidate set. **Ten of the packages
that were 404 or undiscovered on 2026-09-04 are now publicly live and have been
added to the site** (see `docs/current-production-app-inventory.md`), which is
the expected outcome — the 2026-09-04 note said explicitly that a 404 meant the
guessed package name was wrong, not that an app existed.

## Result summary

| Outcome | Count |
| --- | ---: |
| Public, included on the site | **39** |
| Public but excluded for another reason | **0** |
| Listed by the owner as Production, but no public listing found | **1** |

## Excluded: BIG JACKPOT Casino Slots Games — UNVERIFIED

The owner listed this as a recently-visible Production app. **It could not be
verified as publicly reachable, so it is not on the site.**

What was tried, all signed out, all on 2026-09-15:

| Method | Result |
| --- | --- |
| Public developer page (20 packages in served HTML) | Not present |
| BFS crawl of all 39 known listing pages for `com.reigncreative.*` IDs | Not present |
| Google Play search, `"BIG JACKPOT Casino Slots Games"` | No Reign Collective result |
| Google Play search, + `"Reign Creative"` | No Reign Collective result |
| Google Play search, `"Reign Creative slots"` | No Reign Collective result |
| Google Play search, `"Anime Casino Slot Machine Game"` | No Reign Collective result — **yet that app IS public**, so Play search alone is not a reliable negative for this developer's casino titles |
| Direct package-ID probes, 22 candidates | All HTTP 404 |

Candidates probed, all HTTP 404:
`com.reigncreative.bigjackpotslots`, `com.reigncreative.bigjackpot`,
`com.reigncreative.bigjackpotcasinoslots`, `com.reigncreative.bigjackpotcasino`,
`com.reigncreative.bigjackpotcasinoslotsgames`,
`com.reigncreative.bigjackpotslotsgames`, `com.reigncreative.bigjackpotslot`,
`com.reigncreative.bigjackpotcasinoslot`, `com.reigncreative.bigjackpotgames`,
`com.reigncreative.jackpotslots`, `com.reigncreative.jackpotcasinoslots`,
`com.reigncreative.jackpotcasino`, `com.reigncreative.jackpotslotsgames`,
`com.reigncreative.casinoslots`, `com.reigncreative.casinoslotsgames`,
`com.reigncreative.casinoslotsgame`, `com.reigncreative.casinoslotsjackpot`,
`com.reigncreative.casinoslotmachine`, `com.reigncreative.slots`,
`com.reigncreative.slotscasino`, `com.reigncreative.slotmachine`,
`com.reigncreative.slotmachines`, `com.reigncreative.luckyslots`,
`com.reigncreative.vegasslots`, `com.reigncreative.bigwinslots`,
`com.reigncreative.slotsgames`, `com.reigncreative.animeslots`,
`com.reigncreative.animecasino`, `com.reigncreative.animeslotmachine`

**Status: UNVERIFIED, not "not published".** The honest reading is that the
package ID is simply unknown — the sibling title
`com.reigncreative.animecasinoslots` is fully public yet also invisible to Play
search from this locale, so a search miss proves nothing here. This app is
excluded because it could not be confirmed, not because it was judged unfit.

**Owner action:** supply the exact package ID from Play Console. Add it to
`PACKAGES` in `scripts/verify-play-listings.mjs`, re-run
`node scripts/verify-play-listings.mjs` and `node scripts/fetch-app-icons.mjs`,
and if it returns HTTP 200 with `SoftwareApplication` JSON-LD it can be written
into the catalog in a single pass.

## Nothing else was withheld

Every one of the 39 packages that resolved publicly is on the site. No public
Reign Collective Apps listing is being held back on editorial grounds, including
the Teen-rated `com.reigncreative.animecasinoslots`, which is published with
explicit entertainment-only and no-real-money-gambling disclosures.

## Package IDs found public on 2026-09-15 that were unknown on 2026-09-04

`com.reigncreative.protenniscareersim`,
`com.reigncreative.twentyfourzero.rugbydraft`,
`com.reigncreative.spacegalaxyattackhardcore`,
`com.reigncreative.jellyfishio`, `com.reigncreative.regaltowerdefense`,
`com.reigncreative.tcgvaluescanner`, `com.reigncreative.easyrecipes`,
`com.reigncreative.learnmarathilanguage`,
`com.reigncreative.learnshanghaineselanguage`,
`com.reigncreative.animecasinoslots`

Note that three of these — `rugbydraftgm`, `tennisdraftgm`, and the
`learn<language>language` sweep — were *guessed near-misses* in the 2026-09-04
probe. The real IDs are `twentyfourzero.rugbydraft`, `protenniscareersim` and
`learnmarathilanguage` / `learnshanghaineselanguage`. Guessing package names is
a weak discovery method and should not be relied on again: the developer page
plus Play title search plus a BFS crawl found nine of the ten, and the tenth
(`animecasinoslots`) came from a probe of the app's own title rendered as a
package name.

## Standing exclusion rules

The rules in the 2026-09-04 section above remain in force unchanged.
`MUST_NOT_BE_PUBLIC` in `scripts/verify-play-listings.mjs` is **still empty**
because the owner has still not named any package that is in Draft, review or
testing. That is the one gap in this audit: the Play Console reportedly holds
around 78 projects, most of them drafts, and this audit can only prove which
packages *are* public — it cannot enumerate the drafts from outside.
