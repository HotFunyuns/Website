---
{
  "title": "Video File Formats Explained: What Is Actually Inside an MP4, MKV or MOV",
  "metaTitle": "Video File Formats Explained: MP4, MKV, MOV",
  "description": "What a container really stores, how MP4, MKV, MOV and transport streams differ, and why remuxing fixes problems that re-encoding should not.",
  "status": "draft",
  "publishedAt": "2026-08-09",
  "updatedAt": "2026-08-09",
  "author": "Reign Creative Team",
  "category": "video-utility",
  "tags": ["video formats", "containers", "media files", "android", "utilities"],
  "primaryKeyword": "video file formats explained",
  "secondaryKeywords": [
    "mp4 vs mkv",
    "what is a video container",
    "mov file format",
    "webm vs matroska",
    "m2ts transport stream",
    "remux vs transcode"
  ],
  "intent": "informational",
  "longTailKeywords": [
    "what is the difference between mp4 and mkv",
    "why will my partially downloaded mp4 not play",
    "what is inside a video container file",
    "how do i change container without re encoding"
  ],
  "aiSearchQuestions": [
    "What is the difference between MP4 and MKV?",
    "What does a video container file actually contain?",
    "Why does a partially downloaded MP4 refuse to play at all?",
    "What is the difference between remuxing and transcoding?"
  ],
  "demandTier": "unverified-high",
  "relatedApps": ["regal-video-player"],
  "relatedArticles": [
    "android-video-player-guide",
    "video-codecs-explained"
  ],
  "takeaways": [
    "A container stores tracks, timing and an index — it does not compress anything, which is why changing container does not change quality.",
    "MP4 descends from Apple's QuickTime file format and stores its index in a separate structure from the media, which is why a truncated MP4 can fail completely rather than partially.",
    "Matroska is deliberately permissive about what it will carry, so \"MKV won't play\" is almost never the container's fault.",
    "Transport streams were designed for broadcast, where a stream has no beginning and a receiver can join at any point, which explains their overhead.",
    "Remuxing rewraps the same tracks into a different container without re-encoding, so it is fast and lossless — try it before you transcode."
  ],
  "disclaimer": "none",
  "noindex": true,
  "featured": false,
  "faqs": [
    {
      "question": "What is the difference between MP4 and MKV?",
      "answer": "MP4 is standardised through ISO and descends from Apple's QuickTime file format, and it is deliberately conservative about what it officially carries, which is why it plays almost everywhere. Matroska, the MKV container, is an open format built to carry almost any codec along with unlimited audio tracks, styled subtitles, chapters and even attached fonts. MP4 optimises for compatibility; MKV optimises for capability, and that single difference explains nearly every practical trade between them."
    },
    {
      "question": "What does a container file actually contain?",
      "answer": "Tracks and the information needed to play them together: one or more video tracks, one or more audio tracks, optional subtitle and chapter tracks, metadata such as title and language, and an index that maps playback time to byte positions in the file. It does not compress anything — the compression was done by the codec before the data was placed inside. That is why converting between containers can be lossless while converting between codecs cannot."
    },
    {
      "question": "Why will a partially downloaded MP4 not play at all?",
      "answer": "Because an MP4 keeps its index in a structure called the movie box, usually written after all the media data, and a player cannot make sense of the file without it. If the download stopped before that structure was written, there is no index, and most players will refuse the file outright rather than play the portion that arrived. Files prepared for progressive streaming move that structure to the front specifically to avoid this."
    },
    {
      "question": "What is remuxing?",
      "answer": "Remuxing takes the existing video and audio tracks out of one container and writes them into another without decoding or re-encoding them. Because the compressed data is copied bit for bit, it is lossless and runs at roughly disk speed rather than processor speed. It is the right first attempt when a file will not play, since it costs almost nothing and it fixes any problem that was caused by the container rather than by the codec inside it."
    },
    {
      "question": "Which containers does Regal Video Player open?",
      "answer": "MP4, MKV and MOV alongside M4V, WebM, 3GP, FLV, TS and M2TS. It is built for H.264, H.265, VP8, VP9 and AV1 video with AAC, MP3, FLAC and Ogg audio. What actually plays still depends on the specific file, your Android version and the decoders your device provides, which is a hardware reality rather than a property of any particular player."
    }
  ],
  "sources": [
    {
      "title": "MP4 Registration Authority",
      "publisher": "MP4RA",
      "url": "https://mp4ra.org/",
      "accessed": "2026-08-09"
    },
    {
      "title": "QuickTime File Format",
      "publisher": "Apple Developer Documentation",
      "url": "https://developer.apple.com/documentation/quicktime-file-format",
      "accessed": "2026-08-09"
    },
    {
      "title": "Matroska media container",
      "publisher": "Matroska.org",
      "url": "https://www.matroska.org/",
      "accessed": "2026-08-09"
    },
    {
      "title": "Codec Encoding for LossLess Archiving and Realtime transmission (cellar)",
      "publisher": "Internet Engineering Task Force",
      "url": "https://datatracker.ietf.org/wg/cellar/about/",
      "accessed": "2026-08-09"
    },
    {
      "title": "The WebM Project",
      "publisher": "WebM Project",
      "url": "https://www.webmproject.org/",
      "accessed": "2026-08-09"
    },
    {
      "title": "H.222.0: Generic coding of moving pictures and associated audio information — Systems",
      "publisher": "International Telecommunication Union",
      "url": "https://www.itu.int/rec/T-REC-H.222.0",
      "accessed": "2026-08-09"
    },
    {
      "title": "Supported media formats",
      "publisher": "Android Developers, Google",
      "url": "https://developer.android.com/media/platform/supported-formats",
      "accessed": "2026-08-09"
    },
    {
      "title": "Adobe Flash Player End of Life",
      "publisher": "Adobe",
      "url": "https://www.adobe.com/products/flashplayer/end-of-life.html",
      "accessed": "2026-08-09"
    }
  ]
}
---

A container is a filing system that happens to be one file. It does not compress anything, it does not improve or degrade quality, and on its own it explains almost nothing about how a video will look. What it does is decide how tracks are stored, how they are indexed, and how much a player has to read before it can start.

Those three decisions turn out to explain a surprising amount of everyday behaviour: why a half-downloaded MP4 refuses to play at all, why the subtitles vanished when someone converted a file, and why some formats can be repackaged in seconds while others need an hour of processing.

## What is actually in there

Open any container and you find the same categories of thing.

**Tracks.** At minimum a video track, usually at least one audio track, often several — commentary, another language, a downmix. Subtitle tracks and chapter markers are tracks too, in the containers that support them.

**Timing.** Each track carries a timescale and a set of timestamps saying when each chunk of data should be presented. This is what keeps audio and video in sync, and it is why a file can hold tracks with completely different internal rates and still play correctly.

**An index.** A map from playback position to byte offset. Without it a player cannot seek — dragging the scrub bar would mean reading forward through the file until it arrived.

**Metadata.** Title, language tags, track ordering, which audio track is the default, and whatever else the format allows.

**Attachments,** in the containers that permit them. Matroska will carry font files so that styled subtitles render as the author intended.

What is *not* in there is any compression logic. The video track holds data that a codec already compressed; the container just stores it, labels it and keeps it in order. That single fact is the reason you can move tracks between containers without touching quality.

## The MP4 family

MP4 is standardised through ISO, and it descends fairly directly from Apple's QuickTime file format — the ISO base media file format was built on QuickTime's structure, and the family resemblance is still visible in the internals.

The structure is a tree of **boxes** (also called atoms in QuickTime terminology), each with a size and a four-character type. Two matter for practical purposes:

- **`mdat`** — the media data. The actual compressed video and audio, in bulk.
- **`moov`** — the movie box. Track definitions, timing and the sample tables that make up the index.

Here is the consequence that catches everybody. When a file is written by a normal encoder, the sizes and offsets that go into `moov` are not known until all the media has been written, so `moov` is placed **at the end**. A player therefore needs the end of the file before it can play the beginning.

That is why a download interrupted at ninety per cent frequently will not play at all, while an interrupted download of some other formats plays right up to where it stopped. Nothing is corrupt in the ordinary sense — the index simply is not there.

Files intended for progressive streaming are post-processed to move `moov` to the front, an operation usually labelled "faststart". It changes nothing about the content and everything about whether playback can begin before the file has fully arrived.

### The relatives

**MOV** is the QuickTime container. Structurally the same family, and widely produced by cameras and editing software.

**M4V** is Apple's variant of MP4. Mechanically it is an MP4 with a different extension; some M4V files distributed by Apple carry DRM, which is a licensing matter rather than a format one and means those specific files are meant to be played in the software that sold them.

**3GP** is the mobile profile defined by 3GPP, built on the same base format and constrained for the bandwidth and codecs of early mobile networks. It still turns up in files from older phones.

If you want to know which codecs are officially registered for use in this family, the MP4 Registration Authority maintains the list — which is a good illustration of how conservative the format is by design. MP4's compatibility comes from being deliberately narrow.

## Matroska and WebM

Matroska takes the opposite position. It is an open container built on EBML, a binary structure loosely analogous to XML, and its design goal is to carry essentially anything.

Practical consequences of that permissiveness:

- Effectively unlimited tracks, so a file can hold several audio languages, several subtitle tracks and chapters at once.
- Styled subtitle formats with positioning and typography, plus the font files needed to render them.
- Codecs the format's authors never anticipated, because the container does not maintain a closed list.
- Chapters, tags and ordered editions.

This is why Matroska dominates archival and enthusiast use, and it is also the direct cause of its reputation for not working. If a container will carry anything, then any file you receive in it may contain something your device cannot decode — and the failure gets blamed on the extension. The container parsed fine. Something inside it did not.

Matroska's specification has been through formal standardisation at the IETF, in the working group set up to document it and the related lossless formats, which is a meaningful maturity signal for a format that began as a community project.

**WebM** is the constrained version: a subset of Matroska restricted to a small set of royalty-free codecs, built for use in web browsers. Everything true of Matroska's structure is true of WebM; the difference is the list of things allowed inside.

## Transport streams

TS and M2TS come from a completely different design problem, and understanding that problem explains everything odd about them.

MPEG-2 Transport Stream, specified in ITU-T H.222.0, was designed for **broadcast**. A broadcast has no beginning. A receiver might be switched on at any moment, and the signal may arrive with errors. So the format is built as a continuous sequence of small fixed-size packets — 188 bytes each — with the information needed to start decoding repeated periodically throughout the stream rather than stored once at the front.

That gives it properties no file-oriented container has:

- You can start playing from almost anywhere, because the setup information comes around again shortly.
- You can cut it anywhere and both halves remain playable.
- It tolerates corruption gracefully, losing the damaged packets rather than the file.

And it costs you overhead. Packet headers on every 188 bytes and repeated metadata make a transport stream noticeably larger than the same content in MP4.

**M2TS** is the variant used on Blu-ray discs and by many camcorders, which adds a timestamp to each packet. Files that came off a disc or a broadcast capture are usually one of these two, which is why they turn up on people's drives despite nobody choosing them deliberately.

## The legacy shelf

**FLV** was Adobe's Flash Video container, and for a stretch of the 2000s it was how video on the web worked. Adobe ended support for Flash Player on 31 December 2020, and the container has no remaining reason to exist — but files created during that era still sit in people's archives, which is why players continue to open them.

**AVI** is older still: a Microsoft container from the early 1990s built on the RIFF structure, from the Video for Windows era. It predates modern expectations about variable frame rates, multiple audio configurations and subtitle tracks, and working around those limitations produced a long history of awkward extensions. It is worth naming here because it is the one common legacy container that our own player does not list among its supported formats — if you have an AVI archive, remuxing it into MKV is generally the sensible move regardless of what you play it with.

## Subtitles live in the container, and that matters

Subtitles come in two fundamentally different kinds, and the distinction explains a lot of confusion.

**Text-based** subtitles store the actual characters. SRT is the plain version, ASS/SSA adds styling and positioning, WebVTT is the web equivalent. These are small, searchable, and can be restyled by the player.

**Bitmap** subtitles store pictures of the text. PGS comes from Blu-ray, VobSub from DVD. They preserve the exact original typography, cannot be restyled, cannot be searched, and require the player to composite images rather than draw text.

A player can support one kind and not the other, which is why subtitles sometimes appear from an SRT and not from the same film ripped from a disc.

There is also the **soft versus hard** distinction. Soft subtitles are a separate track you can turn off. Hard subtitles have been burned into the video pixels during encoding and cannot be removed by any player, because as far as the file is concerned they are part of the picture. If a file's subtitles cannot be switched off, they are hard, and that decision was made by whoever encoded it.

Container choice determines what is available: MP4 has limited subtitle support compared with Matroska, which is one of the most common reasons a conversion loses them.

## Remux before you transcode

This is the single most useful practical idea in the whole subject.

**Transcoding** decodes the video and re-encodes it. It is slow, it costs quality every time, and it is the only option when you genuinely need a different codec.

**Remuxing** takes the existing compressed tracks and writes them into a different container. Nothing is decoded. The video data is copied bit for bit, so quality is identical and the operation runs at roughly the speed of your disk.

If a file will not play, ask whether the problem is the box or the contents. A container that a device does not parse is fixed by remuxing in seconds. A codec the device cannot decode is not — that needs a real transcode, and [how codecs actually work](/blog/android-video-player-guide/) is the other half of the diagnosis.

Remuxing is also the fix for a broken index. Rewrapping an MP4 rebuilds the movie box, which repairs files where seeking was erratic or the duration was reported wrongly.

## Picking a container

If you are producing files rather than receiving them:

| Goal | Container | Why |
| --- | --- | --- |
| Play on anything | MP4 | The most conservative and most widely supported |
| Multiple audio and subtitle tracks | MKV | Built for it; MP4 is awkward at best |
| Web page embedding | MP4 or WebM | The two browsers universally handle |
| Archiving a disc | MKV | Preserves chapters and bitmap subtitles |
| Editing footage | MOV or MP4 | What cameras and editors expect |

The general rule: **MKV to keep everything, MP4 to give it to someone else.**

## What our player opens

[Regal Video Player](/apps/regal-video-player/) is built for local files rather than streams, and the container list is the concrete answer to most of this article: MP4, MKV and MOV alongside M4V, WebM, 3GP, FLV, TS and M2TS.

Inside those it is built for H.264, H.265, VP8, VP9 and AV1 video with AAC, MP3, FLAC and Ogg audio. The caveat is the same one that applies to every player on Android and is worth repeating rather than burying: what actually plays depends on the specific file, your Android version and the decoders your device provides. A player can implement a container parser; it cannot manufacture a hardware decoder your chipset does not have.

The rest of it is about not fighting the interface once a file opens. Playback speed runs from 0.1x to 3.0x in 0.1x steps. Your position is saved so an unfinished video resumes where you stopped, with recent videos, playback history and favorites to find things again — all stored locally on the device, with no account required for normal local playback. Gestures handle seeking, jumping, volume and brightness, plus mute, rotate and a screen lock for long content. Picture-in-Picture floats a video while you use other apps on supported devices, and a sleep timer stops playback after a set time or at the end of what you are watching, with a repeat mode for clips you want again.

The free version covers local playback and is supported by ads; an optional Premium purchase removes ads and unlocks extra themes, with monthly, yearly and lifetime options shown by Google Play. It sits with the rest of our [video and utility apps](/apps/category/video-utility/).

Worth stating plainly, as we do everywhere else: this is for files you legitimately hold — your own recordings, camera and drone exports, meeting and screen captures, DRM-free course downloads, and media you have ripped from discs you own where your local law permits it. Content bought or rented from a streaming store is DRM-protected and licensed to be decrypted inside the app that sold it, and a general-purpose local player has no legitimate route to opening it.

## The short version

A container stores tracks, timing, an index and metadata. It compresses nothing, which is why moving between containers can be lossless and why the extension tells you very little about whether a file will play.

MP4 is conservative and therefore compatible, and keeps its index in a structure usually written at the end — hence the dead half-download. Matroska carries almost anything, which makes it the archival choice and the format most often blamed for its contents. Transport streams come from broadcast and are built to be joined mid-flow. And when something will not play, remux first: it is free, it is lossless, and it rules out half the possible causes in seconds.
