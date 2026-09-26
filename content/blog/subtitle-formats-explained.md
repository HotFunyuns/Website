---
{
  "title": "Subtitle Formats Explained",
  "metaTitle": "Subtitle Formats Explained",
  "description": "SRT, ASS, WebVTT and image-based subtitles compared — what each can do, why some do not display, and the difference between embedded and external tracks.",
  "status": "published",
  "publishedAt": "2026-09-04",
  "updatedAt": "2026-09-04",
  "author": "reign-creative-llc",
  "category": "video-utility",
  "tags": [
    "subtitles",
    "video",
    "formats",
    "accessibility"
  ],
  "primaryKeyword": "subtitle formats",
  "secondaryKeywords": [
    "srt vs ass subtitles",
    "webvtt explained",
    "embedded vs external subtitles",
    "image based subtitles",
    "subtitle encoding problems"
  ],
  "intent": "informational",
  "longTailKeywords": [
    "what is the difference between srt and ass subtitles",
    "why do my subtitles show strange characters",
    "why wont my subtitles display",
    "what is a soft subtitle"
  ],
  "aiSearchQuestions": [
    "What are the main subtitle formats?",
    "What is the difference between SRT and ASS?",
    "Why do subtitles show strange characters?",
    "What is the difference between soft and hard subtitles?"
  ],
  "demandTier": "unverified-medium",
  "relatedApps": [
    "regal-video-player"
  ],
  "relatedArticles": [
    "video-file-formats-explained",
    "remuxing-vs-transcoding",
    "android-video-player-guide",
    "hardware-vs-software-decoding"
  ],
  "takeaways": [
    "SRT is the simplest and most compatible text subtitle format: timings and plain text, with almost no styling.",
    "ASS/SSA supports positioning, fonts, colours and effects, which is why it is used for typesetting-heavy releases and why support varies.",
    "WebVTT is the W3C format used on the web, with cue settings and styling defined by a published specification.",
    "Image-based subtitles store pictures of text rather than text, so they cannot be restyled, resized or searched.",
    "Most 'strange character' problems are text encoding mismatches, not corrupt files."
  ],
  "disclaimer": "none",
  "featured": false,
  "faqs": [
    {
      "question": "What is the difference between SRT and ASS?",
      "answer": "SRT carries timings and plain text with essentially no styling, which makes it near-universally supported. ASS/SSA adds positioning, fonts, colours, and effects, which makes it powerful and less consistently supported across players."
    },
    {
      "question": "What is WebVTT?",
      "answer": "The subtitle and caption format used on the web, defined by a W3C specification. It supports cue timings, positioning settings and styling, and it is what HTML video elements consume."
    },
    {
      "question": "Why do my subtitles show strange characters?",
      "answer": "Almost always a text encoding mismatch. A file saved in one encoding and interpreted as another produces garbled accented and non-Latin characters. Saving the subtitle file as UTF-8 resolves most cases."
    },
    {
      "question": "What are image-based subtitles?",
      "answer": "Subtitle tracks that store rendered pictures of text rather than the text itself, common on discs. They cannot be restyled or resized, and they cannot be searched, because there is no text to search."
    },
    {
      "question": "What is the difference between soft and hard subtitles?",
      "answer": "Soft subtitles are a separate track that can be turned on or off. Hard subtitles are burned into the video image itself and cannot be disabled, because they are part of the picture."
    }
  ],
  "sources": [
    {
      "title": "WebVTT: The Web Video Text Tracks Format",
      "publisher": "World Wide Web Consortium (W3C)",
      "url": "https://www.w3.org/TR/webvtt1/",
      "accessed": "2026-09-03"
    },
    {
      "title": "Subtitles — Matroska technical specification",
      "publisher": "Matroska",
      "url": "https://www.matroska.org/technical/subtitles.html",
      "accessed": "2026-09-03"
    },
    {
      "title": "Supported media formats",
      "publisher": "Android Developers, Google",
      "url": "https://developer.android.com/media/platform/supported-formats",
      "accessed": "2026-09-03"
    }
  ]
}
---

**Subtitles come in two fundamentally different kinds: text and images.** Everything else — which format, which features, why it does or does not display — follows from that split.

## Text-based formats

The text is stored as text, so it can be restyled, resized, searched and translated.

### SRT (SubRip)

The simplest and most widely supported. A numbered sequence of entries, each with a start time, an end time and a line of text. Almost no styling.

**Use it when** compatibility matters more than presentation. If you are unsure what will play a file, SRT is the safest choice.

**Its limitation** is the same as its strength: you cannot position a caption, change a colour or use a specific font, because the format has no way to express any of that.

### ASS / SSA (Advanced SubStation Alpha)

Supports positioning, fonts, colours, borders, shadows, and animation effects. This is the format used where typesetting matters — signs translated in place, styled dialogue, karaoke.

**Its cost** is support variability. A player that renders ASS partially will show the text with the styling ignored or, occasionally, wrong. The [Matroska subtitle documentation](https://www.matroska.org/technical/subtitles.html) covers how these tracks are carried inside a container.

### WebVTT

The web's format, defined by the [W3C WebVTT specification](https://www.w3.org/TR/webvtt1/). Cue timings, positioning settings, and styling via CSS. It is what HTML video elements consume, so it is the format you meet when captioning web video.

## Image-based formats

Some subtitle tracks — particularly those from optical discs — store **rendered pictures of text** rather than text.

The consequences are significant:

- **Cannot be restyled or resized.** The image is fixed.
- **Cannot be searched.** There is no text.
- **Cannot be easily edited or translated** without optical character recognition.
- **Scale poorly** to displays different from the one they were authored for.

They exist because they guarantee the intended appearance — the subtitle looks exactly as the author rendered it, with no dependency on available fonts.

## Soft, hard and forced

Three terms that get confused:

| Term | What it means | Can you turn it off? |
| --- | --- | --- |
| Soft | A separate selectable track | Yes |
| Hard (burned-in) | Part of the video image | No |
| Forced | A track shown automatically for foreign dialogue or signs | Usually selectable |

**Hard subtitles cannot be removed.** They were composited into the picture during encoding, so the only way to get a version without them is a different source file.

**Forced subtitles** are the ones that appear for a few lines of foreign-language dialogue in an otherwise same-language film. They are normally a separate track flagged as forced.

## Embedded versus external

**Embedded** subtitles are inside the video container, as an additional track alongside video and audio. This is what MKV in particular is good at — carrying multiple subtitle tracks in different languages and formats.

**External** subtitles are a separate file, usually with a matching filename, that a player loads alongside the video.

Both work. External files are easier to edit and easier to lose; embedded tracks travel with the video and require a remux to change. [Remuxing versus transcoding](/blog/remuxing-vs-transcoding/) covers adding or removing tracks without re-encoding — a fast, lossless operation for subtitles.

## Why subtitles fail to display

In rough order of frequency:

**1. Encoding mismatch.** The most common by far. A subtitle file saved in one text encoding and interpreted as another produces garbled accented or non-Latin characters. **Saving as UTF-8 fixes most cases.**

**2. Filename mismatch.** External subtitles are matched by filename. A difference in the name means the player does not find the file.

**3. Format not supported by the player.** Particularly ASS with heavy styling, or image-based tracks that a player cannot render.

**4. Track not selected.** An embedded track exists and is not enabled.

**5. Timing offset.** The subtitles display and are out of sync — usually because they were made for a different release of the video.

## Player support varies more than you expect

Subtitle handling is one of the areas where video players differ most, and it is a legitimate factor in choosing one. [Android's supported media formats documentation](https://developer.android.com/media/platform/supported-formats) covers what the platform provides; individual players build on that to varying degrees.

If subtitle handling is your main requirement, it is worth testing with your actual files rather than relying on a feature list — the difference between "supports ASS" and "renders ASS the way it was authored" is not visible in a bullet point.

## Where our app fits

[Regal Video Player](/apps/regal-video-player/) is a local-file player built for H.264, H.265, VP8, VP9 and AV1 video with AAC, MP3, FLAC and Ogg audio, inside MP4, MKV, MOV, M4V, WebM, 3GP, FLV, TS and M2TS containers.

**On subtitles specifically, we are going to be direct:** if extensive subtitle handling — multiple embedded tracks, complex ASS typesetting, image-based tracks from discs — is the thing you need most, check whether a player's actual behaviour with your files matches your requirement before committing to it. That is true of ours and of every other player, and a feature list is not a substitute for the test.

The free version covers local playback and is supported by ads; an optional Premium purchase removes ads and unlocks extra themes.

[Video file formats explained](/blog/video-file-formats-explained/) covers the containers these tracks live in, and [the Android video player guide](/blog/android-video-player-guide/) covers diagnosing playback problems generally. Everything we make here is under [video and utility apps](/apps/category/video-utility/).
