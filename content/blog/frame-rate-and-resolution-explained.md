---
{
  "title": "Frame Rate and Resolution Explained",
  "metaTitle": "Frame Rate and Resolution Explained",
  "description": "What each controls, why bitrate matters more than either for perceived quality, and how judder, interlacing and scaling produce visible artefacts.",
  "status": "published",
  "publishedAt": "2026-09-04",
  "updatedAt": "2026-09-04",
  "author": "Reign Creative Team",
  "category": "video-utility",
  "tags": [
    "video",
    "resolution",
    "frame rate",
    "quality"
  ],
  "primaryKeyword": "frame rate and resolution explained",
  "secondaryKeywords": [
    "bitrate vs resolution",
    "what is judder video",
    "interlaced vs progressive",
    "video upscaling quality",
    "24fps 30fps 60fps"
  ],
  "intent": "informational",
  "longTailKeywords": [
    "does higher resolution always mean better quality",
    "why does 24fps look juddery on some screens",
    "what is the difference between interlaced and progressive",
    "does upscaling improve video quality"
  ],
  "aiSearchQuestions": [
    "What is the difference between frame rate and resolution?",
    "Does higher resolution always mean better quality?",
    "Why does 24fps content look juddery?",
    "What is the difference between interlaced and progressive video?"
  ],
  "demandTier": "unverified-medium",
  "relatedApps": [
    "regal-video-player"
  ],
  "relatedArticles": [
    "video-codecs-explained",
    "hardware-vs-software-decoding",
    "audio-codecs-explained",
    "video-file-formats-explained"
  ],
  "takeaways": [
    "Resolution is how many pixels each frame contains; frame rate is how many frames per second. They are independent.",
    "Bitrate — data per second — usually determines perceived quality more than resolution does, because a high resolution at a low bitrate produces visible compression artefacts.",
    "Judder occurs when the source frame rate does not divide evenly into the display's refresh rate, so some frames are shown longer than others.",
    "Interlaced video stores half a frame at a time and needs deinterlacing for progressive displays; done badly it produces combing artefacts.",
    "Upscaling adds pixels and cannot add detail that was never captured."
  ],
  "disclaimer": "none",
  "featured": false,
  "faqs": [
    {
      "question": "What is the difference between frame rate and resolution?",
      "answer": "Resolution is how many pixels each frame contains — its spatial detail. Frame rate is how many frames are shown per second — its temporal smoothness. They are independent, and a file can be high in one and low in the other."
    },
    {
      "question": "Does higher resolution always mean better quality?",
      "answer": "No. Perceived quality depends heavily on bitrate. A high-resolution file at a low bitrate shows visible compression artefacts and can look worse than a lower-resolution file with enough data allocated to it."
    },
    {
      "question": "Why does film content look juddery?",
      "answer": "Because 24 frames per second does not divide evenly into most display refresh rates. Some frames are held longer than others to fill the time, which produces uneven motion known as judder."
    },
    {
      "question": "What is interlacing?",
      "answer": "A legacy technique that stores half the horizontal lines of a frame at a time, alternating between them. It halved bandwidth for broadcast. Progressive displays must deinterlace it, and poor deinterlacing produces comb-like artefacts on motion."
    },
    {
      "question": "Does upscaling improve quality?",
      "answer": "It makes an image fit a larger display. It cannot add detail that was never captured — the additional pixels are interpolated from existing ones. Good upscaling looks better than bad upscaling; neither recovers lost information."
    }
  ],
  "sources": [
    {
      "title": "H.264: Advanced video coding for generic audiovisual services",
      "publisher": "International Telecommunication Union (ITU-T)",
      "url": "https://www.itu.int/rec/T-REC-H.264",
      "accessed": "2026-09-03"
    },
    {
      "title": "H.265: High efficiency video coding",
      "publisher": "International Telecommunication Union (ITU-T)",
      "url": "https://www.itu.int/rec/T-REC-H.265",
      "accessed": "2026-09-03"
    },
    {
      "title": "Web video codec guide",
      "publisher": "MDN Web Docs, Mozilla",
      "url": "https://developer.mozilla.org/en-US/docs/Web/Media/Formats/Video_codecs",
      "accessed": "2026-09-03"
    }
  ]
}
---

**Resolution is how much detail each frame has. Frame rate is how many frames arrive per second. Bitrate is how much data describes them — and bitrate usually decides how good the video looks.**

That third variable is the one missing from most descriptions, and it explains why a file labelled with an impressive resolution can look worse than one labelled with a modest one.

## The three variables

| Variable | What it controls | Measured in |
| --- | --- | --- |
| Resolution | Spatial detail per frame | Pixels (width × height) |
| Frame rate | Temporal smoothness | Frames per second |
| Bitrate | How much data describes the video | Bits per second |

Resolution and frame rate are properties of the content. **Bitrate is the budget available to represent them**, and it is where quality is actually won or lost.

## Why bitrate matters most

A codec compresses video by discarding information. How much it must discard depends on how much data it is allowed to use.

A high-resolution file at a low bitrate has more pixels to describe and less data to describe them with. The result is visible compression artefacts: blocking in flat areas, smearing in motion, banding in gradients.

**A lower-resolution file with an adequate bitrate frequently looks better than a higher-resolution file starved of data.**

This is also why newer codecs matter. H.265 and AV1 achieve comparable quality to H.264 at lower bitrates — the formal specifications are published by the ITU-T for [H.264](https://www.itu.int/rec/T-REC-H.264) and [H.265](https://www.itu.int/rec/T-REC-H.265) — which means the same file size buys more quality. [Video codecs explained](/blog/video-codecs-explained/) covers each in detail.

## Frame rate and judder

Common frame rates and where they come from:

- **24 fps** — the film standard, and the reason a lot of content is this rate.
- **25 / 30 fps** — broadcast standards, derived from mains frequencies.
- **50 / 60 fps** — smoother motion, common in sport and games.

**Judder** happens when the source frame rate does not divide evenly into the display's refresh rate. To fill the time, some frames are held longer than others, producing uneven motion that is most visible in slow horizontal pans.

24 fps content on a 60 Hz display is the classic case: 60 does not divide by 24 evenly, so frames are repeated in an uneven pattern.

Displays that can match the source rate avoid this. Where they cannot, judder is a property of the mismatch rather than a fault in the file.

## Higher frame rate is not automatically better

Two reasons to be careful with this assumption.

**Doubling the frame rate roughly doubles the data required** for equivalent quality. At a fixed bitrate, a higher frame rate means less data per frame — trading spatial quality for temporal smoothness.

**Aesthetics.** 24 fps is a deliberate convention for film, and content shot at higher rates looks materially different. Whether that is better is a preference, not a specification.

## Interlacing

A legacy technique worth understanding because you still meet it.

**Interlaced** video stores half the horizontal lines of a frame at a time, alternating between odd and even sets. It halved the bandwidth required for broadcast at a time when bandwidth was the binding constraint.

**Progressive** video stores complete frames.

Modern displays are progressive, so interlaced content must be **deinterlaced** for display. Done well, it is nearly invisible. Done badly, it produces comb-like horizontal artefacts on moving objects — the characteristic sign of a deinterlacing failure.

You encounter interlaced material mainly in older broadcast recordings and some camera output. If you see combing, the deinterlacing is the problem rather than the source.

## Scaling and upscaling

Video rarely matches the display exactly, so it is scaled.

**Downscaling** — more source pixels than display pixels — is generally clean. There is information to discard.

**Upscaling** — fewer source pixels than display — has to invent pixels. Sophisticated upscaling produces better-looking results than naive upscaling, and **neither adds detail that was never captured.**

This is worth being clear about, because upscaling is marketed in ways that imply otherwise. An upscaled image can look better; it does not contain more information.

## Diagnosing what you are seeing

| What you see | Likely cause |
| --- | --- |
| Blocky areas, smeared motion | Bitrate too low for the resolution |
| Uneven motion on slow pans | Judder from frame rate mismatch |
| Comb-like lines on moving objects | Deinterlacing failure |
| Soft, slightly blurry image | Upscaling from a lower resolution |
| Stuttering plus a hot device | Software decoding — see [hardware versus software decoding](/blog/hardware-vs-software-decoding/) |

That last row is the one people most often misattribute to file quality. A hot device with dropped frames is a decoding capability problem, not a bitrate problem.

The [MDN web video codec guide](https://developer.mozilla.org/en-US/docs/Web/Media/Formats/Video_codecs) is a good technical reference for how these variables interact with codec choice.

## Where our app fits

[Regal Video Player](/apps/regal-video-player/) plays local files in H.264, H.265, VP8, VP9 and AV1 with AAC, MP3, FLAC and Ogg audio, inside MP4, MKV, MOV, M4V, WebM, 3GP, FLV, TS and M2TS containers.

**What a player controls:** which decoder is used, and how the decoded frames are presented. **What it does not:** the bitrate, resolution or frame rate of the file, all of which were fixed at encoding. A player cannot improve a source; it can fail to do it justice.

The free version covers local playback and is supported by ads; an optional Premium purchase removes ads and unlocks extra themes.

[Audio codecs explained](/blog/audio-codecs-explained/) covers the other half of a media file, and [video file formats explained](/blog/video-file-formats-explained/) covers the containers. Everything we make here is under [video and utility apps](/apps/category/video-utility/).
