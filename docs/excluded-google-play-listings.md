# Google Play listings checked and excluded

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
