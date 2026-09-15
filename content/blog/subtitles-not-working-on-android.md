---
{
  "title": "Subtitles Not Working on Android: A Checklist That Finds It",
  "metaTitle": "Subtitles Not Working on Android",
  "description": "Missing subtitles usually come down to file naming, encoding, track selection or an unsupported format. Work through these in order.",
  "status": "published",
  "publishedAt": "2026-09-15",
  "updatedAt": "2026-09-15",
  "author": "Reign Creative Team",
  "category": "video-utility",
  "tags": ["video", "subtitles", "android", "troubleshooting"],
  "primaryKeyword": "subtitles not working on android",
  "secondaryKeywords": [
    "subtitles not showing android",
    "srt not working android",
    "subtitle encoding problems",
    "subtitles out of sync android",
    "external subtitles android",
    "subtitle track not selectable"
  ],
  "intent": "informational",
  "longTailKeywords": [
    "why are my subtitles not showing on android",
    "how to load external srt on android",
    "subtitles showing as question marks",
    "how to fix out of sync subtitles",
    "why do embedded subtitles not appear"
  ],
  "aiSearchQuestions": [
    "Why are subtitles not showing on Android?",
    "How do you load an external SRT file?",
    "Why do subtitles appear as garbled characters?",
    "How do you fix out-of-sync subtitles?"
  ],
  "demandTier": "unverified-high",
  "relatedApps": ["regal-video-player"],
  "relatedArticles": [
    "subtitle-formats-explained",
    "android-video-players-compared",
    "how-to-play-mkv-files-on-android",
    "video-file-formats-explained"
  ],
  "takeaways": [
    "Step zero is checking whether your player advertises subtitle support at all, because a missing feature looks exactly like a broken file.",
    "Garbled accented characters are an encoding problem, not a corrupt file, and re-saving the subtitle as UTF-8 fixes most of them.",
    "External subtitles are matched by filename, so the subtitle file's name must match the video's exactly apart from the extension.",
    "Constant lateness and lateness that grows through the film are different faults: one is an offset, the other is a frame-rate mismatch and shifting will not fix it.",
    "Subtitles burned into the picture cannot be turned off, and subtitles that were never in the file cannot be turned on."
  ],
  "disclaimer": "none",
  "featured": false,
  "faqs": [
    {
      "question": "Why are my subtitles not showing on Android?",
      "answer": "Work through five things in order: whether your player supports subtitles at all, whether the subtitle actually exists as a track or a file, whether an external file's name matches the video's, whether the track has been selected in the player, and whether the format is one the player can render. Those five cover the overwhelming majority of cases."
    },
    {
      "question": "How do you load an external SRT file?",
      "answer": "Put the subtitle file in the same folder as the video and give it the same name apart from the extension, so that film.mkv is accompanied by film.srt. Many players also accept a language suffix such as film.en.srt. Matching is by filename, so a single difference in spacing, punctuation or capitalisation can be enough to stop it being found."
    },
    {
      "question": "Why do subtitles appear as question marks or strange characters?",
      "answer": "A text encoding mismatch. The file was saved in one encoding and is being interpreted as another, which corrupts accented and non-Latin characters while leaving plain ASCII intact. Re-saving the subtitle file as UTF-8 resolves most cases, and UTF-8 is the encoding to standardise on because it covers every script in one scheme."
    },
    {
      "question": "How do you fix out-of-sync subtitles?",
      "answer": "First establish which kind of desync it is. If every line is late by the same amount from beginning to end, it is an offset and a shift fixes it. If the lines start close and drift further out as the film goes on, it is a frame-rate mismatch between the subtitle file and this release of the video, and no single shift will correct it — you need a subtitle timed for this release, or a tool that rescales the timings."
    },
    {
      "question": "Why can I not turn off the subtitles?",
      "answer": "Because they are almost certainly hard subtitles, composited into the picture during encoding. They are part of the image rather than a separate track, so no player can remove them. The only way to get a version without them is a different source file."
    }
  ],
  "sources": [
    {
      "title": "Subtitles — Matroska technical specification",
      "publisher": "Matroska.org",
      "url": "https://www.matroska.org/technical/subtitles.html",
      "accessed": "2026-09-15"
    },
    {
      "title": "UTF-8, UTF-16, UTF-32 & BOM FAQ",
      "publisher": "The Unicode Consortium",
      "url": "https://www.unicode.org/faq/utf_bom.html",
      "accessed": "2026-09-15"
    },
    {
      "title": "SubRip",
      "publisher": "Wikipedia",
      "url": "https://en.wikipedia.org/wiki/SubRip",
      "accessed": "2026-09-15"
    },
    {
      "title": "SubStation Alpha",
      "publisher": "Wikipedia",
      "url": "https://en.wikipedia.org/wiki/SubStation_Alpha",
      "accessed": "2026-09-15"
    },
    {
      "title": "WebVTT: The Web Video Text Tracks Format",
      "publisher": "World Wide Web Consortium (W3C)",
      "url": "https://www.w3.org/TR/webvtt1/",
      "accessed": "2026-09-15"
    }
  ]
}
---

Run these in order. The order is deliberate — each step rules out a whole class of cause, and doing them out of sequence is how people spend an hour on an encoding problem that was actually a filename problem.

## 0. Does your player do subtitles at all?

Start here, because a feature that is absent looks identical to a feature that is broken.

Not every video player on Android handles subtitles, and among those that do, the depth varies enormously. Some load external files and embedded tracks and render styled formats; some handle plain external files only; some do not handle them at all. The app will not usually tell you which it is, and the symptom — no subtitles — is the same in every case.

So: check the app's own description and settings before you touch the file. If there is no subtitle option anywhere in the playback controls or the settings, you have your answer, and the remaining nine steps are wasted effort.

We apply this to our own product below rather than leaving it implied.

## 1. Does the subtitle exist?

Two separate questions, because embedded and external subtitles fail differently.

**Embedded** subtitles are a track inside the container, alongside the video and audio. Matroska is particularly good at this — it is an envelope that can carry many audio, video and subtitle streams, which is why MKV files so often arrive with several language tracks. If the file has them, a capable player will list them.

**External** subtitles are a separate file sitting next to the video, usually `.srt`, `.ass` or `.vtt`.

If you did not download a subtitle file and the video has no embedded track, there is nothing to display. This sounds obvious and it accounts for a genuine share of these questions: people assume subtitles are generated on demand, and outside of live captioning services they are not. A subtitle is a file somebody wrote.

## 2. Does the filename match exactly?

**External subtitles are matched by filename.** This is the single most common fixable cause.

The subtitle file must sit in the same folder as the video and carry the same name apart from the extension:

```
My Film (2019).mkv
My Film (2019).srt
```

Many players also accept a language suffix, `My Film (2019).en.srt`. What they do not accept is a name that differs in any other way. A trailing space, a different bracket, `.mkv.srt`, a renamed video, an underscore where the video has a hyphen — any of these is enough.

The reliable fix is not to retype it. **Copy the video's filename**, paste it onto the subtitle, and change only the extension. Typing it out reintroduces the same class of error that caused the problem.

## 3. Is the track selected?

An embedded subtitle track that exists is not necessarily on.

Most players default to subtitles off, and the selection lives behind a menu during playback rather than in the main settings. Look for a track or caption control while the video is playing. If a track list appears with entries in it, the file is fine and this was the whole problem.

If the list appears and is empty, go back to step 1: there is no embedded track, and you need an external file.

## 4. Is it an encoding problem?

If subtitles appear but the accented or non-Latin characters are replaced by question marks, boxes, or nonsense such as `Ã©` where `é` should be, the file is not corrupt. **It is a text encoding mismatch.**

Subtitle files are plain text, and plain text is only meaningful together with the encoding used to write it. A file saved in a legacy single-byte encoding — Windows-1252 for Western European text, Windows-1251 for Cyrillic, and others per script — and then read as something else will produce exactly this. Plain unaccented ASCII survives, because the low range is shared; everything above it breaks.

**The fix is to re-save the file as UTF-8.** UTF-8 encodes every character in Unicode, is backward compatible with ASCII for the characters it shares, and is what a modern player will assume when nothing tells it otherwise. Open the subtitle in a text editor that lets you choose the output encoding, save as UTF-8, replace the original.

One wrinkle worth knowing: a UTF-8 file may or may not begin with a byte order mark. Most players cope with both. If a file that looks correct in an editor still misbehaves, trying the other option is a cheap experiment.

## 5. Is the format supported and actually renderable?

There is a difference between a player accepting a format and rendering it as authored, and it is where feature lists mislead.

**SubRip (.srt)** is the simplest and most widely supported: timings and plain text with essentially no styling. If you are troubleshooting, get your hands on an SRT — if the SRT works and the other file does not, the format is your answer.

**ASS/SSA** adds positioning, fonts, colours and effects. Support varies widely, and partial support is the norm rather than the exception: a player may show the text with the styling ignored, or place it somewhere the author did not intend. Typesetting-heavy releases depend on this and degrade badly when it is missing.

**WebVTT (.vtt)** is the W3C format used on the web, with cue timings, positioning settings and styling defined in a published specification. It is what HTML video elements consume, and support in standalone players is less universal than SRT.

**Image-based tracks**, common on files from optical discs, store rendered pictures of text rather than text. They cannot be restyled or resized, and a player that cannot render them will simply show nothing. There is no encoding to fix here because there is no text.

[Subtitle formats explained](/blog/subtitle-formats-explained/) goes through what each format can and cannot do in more depth.

## 6. Are they out of sync, and which kind?

This is the step people most often get wrong, because there are two different faults with one symptom.

**Constant offset.** Every line is late (or early) by the same amount, from the first to the last. The subtitle was timed for a release with different leading content — a different intro, a logo, a different cut point. A single shift fixes it, and most players that offer sync adjustment offer exactly this.

**Progressive drift.** The lines are close at the start and get steadily further out as the film goes on. This is a **frame-rate mismatch**: the subtitle was timed against a release at one frame rate and you are watching one at another, so every second of playback adds a small error. Shifting will align one point in the film and make everything else worse.

The test takes thirty seconds: check the sync at five minutes and again at eighty. Same error, it is an offset. Bigger error, it is drift.

Drift cannot be fixed by shifting. You need a subtitle timed for your release, or a subtitle tool that rescales the timings between frame rates. That is a desktop job.

## 7. Can you turn them off, and if not, why not?

If subtitles are appearing that you do not want and no setting removes them, they are **hard subtitles** — composited into the picture during encoding. They are pixels in the image, not a track, so nothing can disable them. A different source file is the only route to a version without them.

The counterpart: **forced subtitles**, a track flagged to appear for a few lines of foreign-language dialogue in an otherwise same-language film. If you are getting occasional unexpected subtitles rather than continuous ones, that is normally what you are seeing, and it is a separate selectable track.

## What our player does, stated plainly

[Regal Video Player](/apps/regal-video-player/) is built around local playback of common containers and codecs: MP4, MKV and MOV alongside M4V, WebM, 3GP, FLV, TS and M2TS, with H.264, H.265, VP8, VP9 and AV1 video and AAC, MP3, FLAC and Ogg audio, subject as always to the decoders your device provides.

The features we describe and stand behind are playback speed from 0.1x to 3.0x in 0.1x steps, resume with saved positions, recent videos and playback history, favourites, gesture controls for seeking, volume, brightness, mute and rotate, a screen lock for long content, Picture-in-Picture on supported devices, a sleep timer and repeat mode.

**Extensive subtitle handling is not among the capabilities we advertise**, and we are not going to imply otherwise in an article that would benefit from implying it. If multiple embedded tracks, complex ASS typesetting or image-based tracks from discs are your central requirement, test a player against your own files before committing to it — that is our advice about every player including ours, and step 0 of this checklist exists precisely because we would rather you started there than spent an hour re-encoding a file that was never going to display.

What this article is for is the far more common situation where the problem is the file rather than the software: a mismatched name, a legacy encoding, an unselected track, or a subtitle timed for a different release. Those are fixable, they are fixable in minutes, and the fix is the same whichever player you end up using.

If the video itself is also refusing to play, that is a different diagnosis entirely — [how to play MKV files on Android](/blog/how-to-play-mkv-files-on-android/) works through the container and codec side. For how players differ in scope and what each is actually for, [Android video players compared](/blog/android-video-players-compared/) is the honest version, including where we do not compete. Everything we make here sits under [video and utility apps](/apps/category/video-utility/), and the rest of these articles under [video and utility articles](/blog/category/video-utility/).
