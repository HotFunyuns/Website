---
{
  "title": "Khmer Fonts on Android: Why Text Breaks and How to Fix It",
  "metaTitle": "Khmer Fonts on Android",
  "description": "Khmer text that renders as boxes, stacks marks in the wrong place or clips subscripts usually points at font fallback. Here is what to check.",
  "status": "published",
  "publishedAt": "2026-09-15",
  "updatedAt": "2026-09-15",
  "author": "Reign Creative Team",
  "category": "language-learning",
  "tags": ["khmer", "android", "fonts", "troubleshooting"],
  "primaryKeyword": "khmer font for android",
  "secondaryKeywords": [
    "khmer text not showing android",
    "khmer unicode android",
    "khmer font boxes",
    "khmer rendering problem",
    "khmer keyboard android"
  ],
  "intent": "informational",
  "longTailKeywords": [
    "why does khmer show as boxes on my phone",
    "khmer subscript consonants cut off",
    "how to install a khmer font on android",
    "khmer text renders incorrectly in app",
    "what is the coeng character"
  ],
  "aiSearchQuestions": [
    "Why does Khmer text show as boxes on Android?",
    "How do I install a Khmer font on Android?",
    "Why are Khmer subscripts clipped?",
    "What is the Khmer coeng character?"
  ],
  "demandTier": "unverified-high",
  "relatedApps": ["learn-cambodian-khmer"],
  "relatedArticles": [
    "khmer-script-explained",
    "learn-khmer-beginners-guide",
    "android-app-permissions-explained",
    "khmer-vs-thai-script"
  ],
  "takeaways": [
    "Empty boxes mean the renderer found no font containing those characters — a font problem, not a corrupted file or a broken app.",
    "Khmer needs complex text shaping, so a font that merely contains the glyphs can still render a syllable wrongly if its shaping tables are incomplete.",
    "The invisible character U+17D2, called coeng or foot, tells the renderer to draw the following consonant as a subscript, and it is where stacking goes wrong.",
    "Stacked Khmer syllables are taller than Latin text, so fixed line heights and tight containers clip subscripts and vowel marks.",
    "Unicode's original under-specification of Khmer syllable structure allowed the same visual word to be encoded several different ways, which is why identical-looking text can behave differently."
  ],
  "disclaimer": "language",
  "featured": false,
  "faqs": [
    {
      "question": "Why does Khmer text show as empty boxes on my phone?",
      "answer": "Because the text renderer could not find any installed font containing glyphs for those characters, so it drew the missing-glyph placeholder instead. It is not a corrupted file or a bug in the text. The fix is a font that covers the Khmer block, either installed on the device or bundled by the app displaying the text."
    },
    {
      "question": "Why are the stacked parts of Khmer letters cut off?",
      "answer": "Almost always a layout problem rather than a font problem. A Khmer syllable can carry a subscript consonant below the base letter and a vowel sign above it, which makes it noticeably taller than a line of Latin text. A container with a fixed height, a hard-coded line height, or clipping enabled will slice the top or bottom off."
    },
    {
      "question": "What is the coeng character?",
      "answer": "U+17D2, called ceung in Khmer and meaning foot. It is an invisible combining mark that tells the renderer the following consonant should be drawn in subscript form. It is not normally rendered as a visible character itself. If a renderer does not handle it, you see the two consonants side by side instead of stacked, or a visible placeholder where nothing should appear."
    },
    {
      "question": "Can I just install a Khmer font and be done?",
      "answer": "Usually yes for reading other people's text, and not necessarily for an app you are building. A font has to contain the glyphs and carry correct shaping tables for the script, because Khmer requires complex text layout rather than a simple character-to-glyph mapping. A font with the right characters and incomplete shaping produces text that is present and wrong, which is harder to diagnose than text that is missing."
    }
  ],
  "sources": [
    {
      "title": "Khmer script",
      "publisher": "Wikipedia",
      "url": "https://en.wikipedia.org/wiki/Khmer_script",
      "accessed": "2026-09-15"
    },
    {
      "title": "UTN #61: Khmer Encoding Structure",
      "publisher": "The Unicode Consortium",
      "url": "https://www.unicode.org/notes/tn61/",
      "accessed": "2026-09-15"
    },
    {
      "title": "Downloadable fonts",
      "publisher": "Android Developers",
      "url": "https://developer.android.com/develop/ui/views/text-and-emoji/downloadable-fonts",
      "accessed": "2026-09-15"
    }
  ]
}
---

Empty boxes mean one thing: the text renderer looked for a font containing those characters and did not find one. The text itself is fine. The file is not corrupt. Something in the font fallback chain has no Khmer in it.

That is the easy failure. The harder ones look like text — real Khmer letters, in roughly the right places — with the stacking wrong, the vowel marks in the wrong position, or the bottom of every line shaved off. Those are not font-availability problems and they need a different diagnosis.

## Why Khmer breaks in ways Latin never does

Latin text is close to a one-to-one mapping: a character comes in, a glyph goes out, glyphs sit in a row. A font that contains the letters will display the letters.

Khmer does not work that way, and three properties of the script are responsible.

**Syllables stack vertically.** A consonant cluster is written with the second consonant underneath the first, in subscript form. Every consonant except one has such a form. So a syllable is not a horizontal sequence — it is a block with vertical extent.

**Vowel signs attach on four sides.** Above, below, before and after the consonant, and a sign written to the left is pronounced after the letter it precedes on the page. Positioning is contextual rather than fixed.

**Some of it is invisible.** The code point **U+17D2**, called *ceung* — "foot" — is the character that says "render the following consonant as a subscript". It is not normally rendered as a visible character at all. Its entire job is to instruct the layout engine.

Add those up and Khmer requires *complex text layout*: the renderer has to analyse the sequence, decide what combines with what, and position glyphs relative to one another. A font supports this by carrying shaping tables that describe the rules.

Which produces the diagnostic that matters: **a font can contain every Khmer glyph and still render Khmer incorrectly**, because containing glyphs and knowing how to arrange them are separate capabilities. [Khmer script explained](/blog/khmer-script-explained/) covers the script mechanics the renderer is trying to honour.

## The encoding ambiguity underneath all of this

There is a deeper reason Khmer text behaves inconsistently across apps and devices, and it is not anyone's implementation bug.

Unicode originally did not adequately describe what constitutes a valid Khmer syllable or what order a syllable's code points should appear in. The consequence was homoglyphic code point sequences — different encodings producing identical-looking text — which pushed vendors into devising their own incompatible definitions and left typists constructing sequences that happened to render correctly.

The scale of it is striking. The Khmer word for "woman" could be encoded as **twelve different sequences**, with one ordering more common in practice than the technically expected one.

Two strings that look identical, are not equal, do not match in a search, may sort differently, and may render differently depending on which engine is doing the work.

This was addressed in 2025 by Martin Hosken, of SIL International and the National Polytechnic Institute of Cambodia, in Unicode Technical Note #61, which sets out an encoding structure ensuring that a given valid visual representation has only one encoding. Worth noting honestly: a Technical Note is not a standard, and responsibility for its contents rests with its author rather than with the Unicode Consortium. But it is the clearest available account of the problem, and it explains a great deal of otherwise baffling behaviour.

If you have ever copied Khmer text from one app into another and had it come out subtly wrong, this is usually why.

## Checking it on your device

Work through these in order.

**1. Is it boxes, or is it wrong-looking text?** Boxes mean no font. Wrong-looking text means a font is being used and either its shaping tables or the layout around it is at fault. These are different problems and confusing them wastes an afternoon.

**2. Does Khmer render elsewhere on the device?** Open a Khmer Wikipedia page in your browser. If it renders there and not in an app, the device has a Khmer font and the app is not reaching it. If it fails everywhere, the device has no Khmer coverage.

**3. Check the system language and font settings.** Some manufacturer skins ship trimmed font sets and pull additional coverage down on demand. Adding Khmer as a system language sometimes triggers the download that fixes everything.

**4. Try a second app.** Messaging apps, browsers and system dialogues do not all use the same text stack. A difference between them localises the problem to one app rather than the device.

**5. If subscripts are clipped rather than missing**, it is a layout problem. Khmer needs more vertical room than Latin, and containers sized for Latin will cut it.

## What we changed in the app

The Khmer course shipped with a font fallback problem, and it was not evenly distributed — it appeared on some manufacturer skins and not others, which is the worst kind of bug because it is invisible to the people who built it.

Two distinct failures were happening.

**On some devices, subscript consonants clipped.** The base letter rendered, the subscript beneath it was drawn partly outside its line box, and the lower portion was cut off. Khmer syllables carrying both a subscript below and a vowel sign above simply do not fit inside a line height calculated from Latin metrics, and the tracing exercises in the alphabet unit — which deliberately show large, isolated syllables — were the worst affected, because those are exactly the characters with the most vertical extent.

**On others, text fell back to a font with incomplete Khmer shaping.** The result was worse than boxes: letters appeared, and they were wrong. Subscripts rendered beside their base letter instead of underneath, and a learner working through the script unit had no way of knowing whether what they were seeing was Khmer or an artefact. Boxes announce themselves. Badly shaped text does not.

The fix had three parts.

**We stopped relying on system font fallback and bundled a Khmer font with the app.** Android's Downloadable Fonts feature lets an app request fonts from a provider instead of bundling files into the APK, which saves users data and storage, and it is the right default for most cases. For this case it is not — the whole course fails if the font is unavailable, and adding a network dependency to a course people use offline on a trip to Cambodia trades one failure for a worse one. Bundling costs APK size. We paid it.

**We set explicit line metrics for Khmer text**, with leading sized for a syllable carrying both a subscript and a superscript vowel rather than for a Latin x-height, and removed clipping from the containers holding script material.

**We tested the alphabet unit specifically**, rather than testing a representative sentence. Ordinary Khmer prose under-represents the tall syllables; the alphabet unit is nothing but them. A rendering test built from running text will pass while the part of the app that matters most is broken.

The limitation worth naming: this fixes our app and nothing else. Khmer text elsewhere on a device with poor coverage will still fail, and we cannot install fonts on your behalf. If Khmer is broken across your whole phone, the fixes are at the device level, in the language and font settings — a habit that sits alongside the general device hygiene in [Android app permissions explained](/blog/android-app-permissions-explained/).

For the script itself, [is Khmer hard to learn](/blog/is-khmer-hard-to-learn/) covers what the subscripts ask of a reader, and [Learn Cambodian, Speak Khmer](/apps/learn-cambodian-khmer/) is where the alphabet lessons live. Other courses in the catalogue sit under [language learning](/apps/category/language-learning/).
