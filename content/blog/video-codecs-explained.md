---
{
  "title": "Video Codecs Explained: Compression, Bitrate, Bit Depth and Why Newer Is Not Always Better",
  "metaTitle": "Video Codecs Explained: H.264, HEVC, AV1",
  "description": "How video compression works, what bitrate and bit depth actually control, and why a newer codec means a smaller file and less certain support.",
  "status": "draft",
  "publishedAt": "2026-08-09",
  "updatedAt": "2026-08-09",
  "author": "Reign Creative Team",
  "category": "video-utility",
  "tags": ["video codecs", "compression", "h264", "av1", "android"],
  "primaryKeyword": "video codecs explained",
  "secondaryKeywords": [
    "h264 vs h265",
    "what is av1 codec",
    "bitrate vs quality",
    "chroma subsampling explained",
    "10 bit vs 8 bit video",
    "keyframe interval explained"
  ],
  "intent": "informational",
  "longTailKeywords": [
    "why does my 10 bit video not play",
    "what is the difference between a codec and an encoder",
    "does higher bitrate always mean better quality",
    "why is av1 slower to decode"
  ],
  "aiSearchQuestions": [
    "How does video compression actually work?",
    "What is the difference between H.264, HEVC and AV1?",
    "Why does higher bitrate not always mean better quality?",
    "What is chroma subsampling and why does it exist?"
  ],
  "demandTier": "unverified-high",
  "relatedApps": ["regal-video-player"],
  "relatedArticles": [
    "android-video-player-guide",
    "video-file-formats-explained"
  ],
  "takeaways": [
    "Video compression works almost entirely by prediction — storing what changed from a nearby frame rather than storing each frame — which is why a static shot compresses far better than falling confetti.",
    "Bitrate is a budget, not a quality setting; the same bitrate is generous at one resolution and starved at another.",
    "Bit depth is a separate hardware path, so a device that decodes an 8-bit codec can still fail completely on the 10-bit version of the same codec.",
    "A codec is a specification and an encoder is a program that implements it, so two files in the same codec at the same bitrate can look noticeably different.",
    "Each codec generation has targeted roughly half the bitrate of its predecessor for equivalent quality, and has paid for it in decoding cost and device support."
  ],
  "disclaimer": "none",
  "noindex": true,
  "featured": false,
  "faqs": [
    {
      "question": "How does video compression actually work?",
      "answer": "Mostly by not storing most of the picture. A codec predicts each block of pixels from something it already has — neighbouring pixels in the same frame, or a matching region in a nearby frame with a motion vector describing where it moved — and then stores only the difference between the prediction and reality. That difference is transformed, quantised so that detail the eye is least likely to notice is discarded, and packed with entropy coding. Storage therefore scales with how unpredictable the footage is, not with how long it runs."
    },
    {
      "question": "What is the difference between a codec and an encoder?",
      "answer": "A codec is a specification describing what a valid bitstream looks like and exactly how a decoder must interpret it. An encoder is a program that produces such a bitstream, and the specification leaves an enormous amount of freedom in how it does so. Two encoders targeting the same codec at the same bitrate can produce visibly different results, while any conforming decoder will reproduce each file identically. Encoder quality is a real variable; decoder quality essentially is not."
    },
    {
      "question": "Does a higher bitrate always mean better quality?",
      "answer": "No, because bitrate is a budget spread across resolution, frame rate and how complex the footage is. A given bitrate that looks pristine on a locked-off interview at 1080p will fall apart on 4K footage of rain or confetti, where almost nothing is predictable from frame to frame. Beyond a certain point extra bitrate also buys nothing visible, because the encoder has already stopped discarding anything you could perceive."
    },
    {
      "question": "Why does 10-bit video fail on a device that plays 8-bit fine?",
      "answer": "Because bit depth is handled by a separate profile with separate hardware support. H.265 and AV1 both define 8-bit and 10-bit variants, and a chipset can implement a fixed-function decoder for one without the other. The codec name on the file is identical either way, which is why the failure looks so arbitrary — a black screen with working audio on a file whose codec your phone supposedly supports."
    },
    {
      "question": "Which codecs is Regal Video Player built for?",
      "answer": "H.264, H.265, VP8, VP9 and AV1 video with AAC, MP3, FLAC and Ogg audio, inside MP4, MKV, MOV, M4V, WebM, 3GP, FLV, TS and M2TS containers. What actually plays depends on the file, your Android version and the decoders your device provides — no player can supply a hardware decoder your chipset does not have. It is free to download with ads, and an optional Premium purchase removes ads and unlocks extra themes."
    }
  ],
  "sources": [
    {
      "title": "H.264: Advanced video coding for generic audiovisual services",
      "publisher": "International Telecommunication Union",
      "url": "https://www.itu.int/rec/T-REC-H.264",
      "accessed": "2026-08-09"
    },
    {
      "title": "H.265: High efficiency video coding",
      "publisher": "International Telecommunication Union",
      "url": "https://www.itu.int/rec/T-REC-H.265",
      "accessed": "2026-08-09"
    },
    {
      "title": "H.266: Versatile video coding",
      "publisher": "International Telecommunication Union",
      "url": "https://www.itu.int/rec/T-REC-H.266",
      "accessed": "2026-08-09"
    },
    {
      "title": "AV1 Bitstream & Decoding Process Specification",
      "publisher": "Alliance for Open Media",
      "url": "https://aomediacodec.github.io/av1-spec/",
      "accessed": "2026-08-09"
    },
    {
      "title": "VP9 Video Codec",
      "publisher": "The WebM Project",
      "url": "https://www.webmproject.org/vp9/",
      "accessed": "2026-08-09"
    },
    {
      "title": "RFC 6716: Definition of the Opus Audio Codec",
      "publisher": "Internet Engineering Task Force",
      "url": "https://www.rfc-editor.org/rfc/rfc6716",
      "accessed": "2026-08-09"
    },
    {
      "title": "FLAC — Free Lossless Audio Codec",
      "publisher": "Xiph.Org Foundation",
      "url": "https://xiph.org/flac/",
      "accessed": "2026-08-09"
    },
    {
      "title": "Supported media formats",
      "publisher": "Android Developers, Google",
      "url": "https://developer.android.com/media/platform/supported-formats",
      "accessed": "2026-08-09"
    }
  ]
}
---

Uncompressed video is absurd. A single frame of 1080p with three colour components per pixel is a few megabytes on its own, and at twenty-five frames a second that is a rate no consumer storage or network was ever built to sustain.

Everything you have ever watched on a screen is therefore the output of a codec deciding what to throw away. Understanding roughly how it makes that decision explains most of the confusing things about video files — why one clip is ten times the size of another at the same resolution, why scrubbing jumps in chunks, and why a phone that plays a codec perfectly can produce a black screen for a different file in the same codec.

## Compression is mostly prediction

The intuition that compression means "storing the picture more efficiently" is wrong in a way that hides how the whole thing works. A modern codec barely stores pictures at all. It stores **predictions and corrections**.

Four stages, in order.

**1. Prediction.** For each block of pixels, the encoder finds something it already has that resembles it. Two sources are available:

- **Intra prediction** uses neighbouring pixels within the same frame. A sky gradient is highly predictable from the pixels above it.
- **Inter prediction** uses a region from a nearby frame, together with a **motion vector** describing where that region moved to. If the camera pans across a static scene, almost every block in the new frame exists somewhere in the previous one.

**2. Residual.** The prediction is subtracted from reality. What is left — the residual — is usually close to zero almost everywhere, and data that is mostly zero compresses extremely well.

**3. Transform and quantisation.** The residual is transformed into frequency components and then quantised, which means dividing by a step size and rounding. Coarse detail survives; fine detail rounds to zero and is gone forever. **This is the lossy step**, and the quantisation step size is essentially what a "quality" slider controls.

**4. Entropy coding.** The remaining numbers are packed using a statistical coder that gives short codes to common values.

The consequence that matters practically: **file size tracks unpredictability, not duration.** A locked-off interview compresses to almost nothing because each frame is nearly the previous frame. Falling confetti, rain, fire, water and hand-held footage in a forest compress terribly, because nothing predicts anything and the residual is real data on every block.

This is also why re-encoding an already-compressed file is worse than encoding the original. The second encoder is now trying to predict an image that contains the first encoder's artefacts, and it faithfully spends bits reproducing them.

## I, P and B frames, and why seeking is chunky

Frames come in three types, defined by what they are allowed to predict from.

- **I-frames** (intra-coded) reference nothing outside themselves. They are complete pictures and they are large.
- **P-frames** predict from earlier frames. Much smaller.
- **B-frames** predict from both earlier and later frames. Smaller still, and the reason encoded frame order differs from display order.

A **GOP** — group of pictures — is the span from one I-frame to the next. Because a P- or B-frame is meaningless without its references, a decoder can only start playback at an I-frame.

That single constraint explains scrubbing behaviour. When you drag the position bar, the player jumps to the nearest I-frame and decodes forward from there. Long GOPs give better compression and coarser, slower seeking; short GOPs give responsive seeking and larger files. Streaming formats use short GOPs because segments must be independently decodable; archival encodes use long ones.

It also explains a specific corruption pattern. If an I-frame is damaged, the error propagates through every frame that predicted from it until the next I-frame arrives, which is the smeared, melting look you occasionally get from a bad broadcast or a damaged file.

## Bitrate is a budget

Bitrate is how many bits per second the encoder is allowed to spend. It is not a quality setting, because the same budget is generous or starved depending on what it has to cover: resolution, frame rate and the complexity of the footage.

The three common control modes:

**Constant bitrate (CBR)** holds the rate steady regardless of content. Necessary for broadcast and some streaming, wasteful for everything else, because simple scenes get bits they do not need and complex scenes get starved.

**Variable bitrate (VBR)** lets the rate rise and fall with complexity, typically targeting an average. Better quality per byte, less predictable file size.

**Constant quality** — the mode usually exposed as a quality factor rather than a bitrate — fixes the quantisation aggressiveness instead of the data rate, and lets the size land wherever it lands. This is generally the right choice for files you are keeping, because it spends bits where they are needed and stops spending them when they stop helping.

Two things follow that people often get wrong:

- **Raising bitrate past a point buys nothing.** Once the encoder is no longer discarding anything perceptible, additional bits reproduce noise.
- **Resolution and bitrate are one decision.** Downscaling 4K footage to 1080p and keeping the same bitrate roughly quadruples the bits available per pixel, which frequently looks better than the 4K version did. On a phone screen this is almost always the right trade.

## Chroma subsampling

Human vision resolves brightness detail far more finely than colour detail — a consequence of how the retina is built, with luminance information carried at much higher spatial acuity than colour information. Codecs exploit this by storing colour at lower resolution than brightness.

The notation looks cryptic and means something simple:

| Notation | What it stores | Where you see it |
| --- | --- | --- |
| 4:4:4 | Full colour resolution | Production, screen recording, graphics |
| 4:2:2 | Colour at half horizontal resolution | Broadcast and professional cameras |
| 4:2:0 | Colour at half horizontal and half vertical | Essentially all consumer delivery |

4:2:0 discards three quarters of the colour samples and is almost invisible on photographic content. Where it shows is anywhere colour carries fine detail rather than brightness: saturated red text on a dark background, thin coloured lines, screen recordings of user interfaces, and chroma-key work where the edges of the key need colour precision.

If a screen recording of text looks strangely smeared and you cannot work out why, this is usually the reason, and the fix is to record in a format that keeps more colour information rather than to raise the bitrate.

## Bit depth, banding, and the hardware trap

Bit depth is how many distinct levels each component can take. **8-bit** gives 256 levels per channel; **10-bit** gives 1024.

The visible symptom of insufficient depth is **banding** — a smooth gradient like a sunset or a studio backdrop rendering as visible steps rather than a continuous ramp, because there simply are not enough available levels between the two ends.

Ten-bit encoding helps even for material that will be shown on an 8-bit display, because the extra precision reduces the accumulation of rounding error during compression. This is why a good deal of modern content is distributed in 10-bit regardless of the display it is heading for.

And here is the trap. **Bit depth is a separate profile with separate hardware support.** A chipset can carry a fixed-function decoder for 8-bit H.265 and not for 10-bit H.265. The file reports the same codec either way, so the failure looks arbitrary: audio plays, the picture is black, and every tool tells you the codec is one your device supports. It supports the codec. It does not support that profile.

## Profiles and levels

This generalises. Every modern codec defines:

- **Profiles** — which coding tools a bitstream is allowed to use. Higher profiles compress better and demand more of the decoder.
- **Levels** — limits on resolution, frame rate and bitrate that a decoder must handle.

A device advertising support for a codec supports specific profiles at specific levels. That is why a phone can decode a codec at 1080p and fail on the same codec at 4K60: it is a level limit, not a codec limit.

When a file will not play and everything says it should, the answer is nearly always in the profile and level fields rather than the codec name.

## The codecs themselves

| Codec | Standardised by | Approximate arrival | Position today |
| --- | --- | --- | --- |
| H.264 / AVC | ITU-T and ISO/IEC jointly | 2003 | The universal safe choice |
| VP8 | Google (from On2) | Open-sourced 2010 | Largely superseded |
| H.265 / HEVC | ITU-T and ISO/IEC jointly | 2013 | Widespread in hardware; encumbered by licensing |
| VP9 | Google | 2013 | Heavy use in web video |
| AV1 | Alliance for Open Media | Specification 2018 | Royalty-free, growing hardware support |
| H.266 / VVC | ITU-T and ISO/IEC jointly | 2020 | Early; little consumer hardware |

Each generation has been developed against a target of roughly **halving the bitrate** needed for equivalent quality compared with its predecessor. That goal is met in aggregate and varies enormously by content, so treat it as a design objective rather than a guarantee for your particular file.

The cost is paid twice. Newer codecs are dramatically more expensive to encode, and they need decoders that older hardware does not have. So the entire codec question reduces to one sentence: **a newer codec gives you a smaller file and less certainty that a given device can play it.**

There is also a licensing dimension, and it is a straightforward matter of public record rather than a controversy. H.264 and H.265 are covered by patent pools requiring licensing for certain uses, with H.265's licensing landscape notably more fragmented than H.264's. AV1 was developed by the Alliance for Open Media explicitly as a royalty-free codec, which is a large part of why the companies distributing most of the world's web video invested in it. That commercial fact has shaped which decoders end up in silicon at least as much as compression efficiency has.

## Codec is not encoder

This distinction is invisible in file listings and matters a great deal.

A **codec** is a specification. It defines what a valid bitstream looks like and exactly how a decoder must interpret it. Decoders are, by design, interchangeable — any conforming decoder produces the same output from the same file.

An **encoder** is a program that produces a bitstream conforming to that specification, and the specification leaves it enormous freedom in how. Choosing motion vectors, allocating bits between frames, deciding block partitioning and setting quantisation are all encoder decisions, and different encoders make them with different sophistication and at different speeds.

The practical consequences:

- Two files in the same codec at the same bitrate can look noticeably different.
- A hardware encoder — the one in a phone or a graphics card — is fast and generally less efficient than a good software encoder given time to work.
- "Encoded in H.265" tells you about compatibility, not about quality.

## Hardware and software decoding

A modern chipset contains fixed-function decoders for particular codecs at particular profiles and levels. These are fast and power-efficient because they are dedicated silicon that does one job.

When a file falls outside what the hardware covers, playback can fall back to decoding on the CPU. Software decoding works, and it costs processor time, battery and heat. At modest resolutions you will not notice. At 4K it produces stuttering that gets *worse* the longer you watch, because the device throttles as it warms — a stutter that degrades over time is nearly always a thermal symptom of a software decode.

AV1 is where this is most visible right now. Platform-level support arrived well before hardware decoders were common in mobile silicon, so on many devices AV1 plays through software with exactly the cost described above.

## Audio, briefly

The same principles apply with different names.

**AAC** is the standard lossy codec for modern video files, defined within the MPEG-4 audio specifications, and it is the safe default. **MP3** is older, less efficient, and universally supported. **Opus**, standardised by the IETF, is the strongest general-purpose lossy codec available today and is what WebM files typically carry. **Vorbis** preceded it in the same open lineage.

**FLAC** is different in kind: it is *lossless*, so it reconstructs the original samples exactly, at roughly half the size of uncompressed audio. It is a compression format in the same sense as a zip file rather than in the same sense as AAC.

A file with picture and no sound has usually hit an audio codec the device does not decode — commonly a surround format prepared for home theatre equipment rather than a phone.

## Choosing, in practice

**Encoding something to keep and play anywhere:** H.264 in MP4 with AAC audio. Larger than it needs to be, and it will play on essentially anything with a screen.

**Encoding for your own archive on modern devices:** H.265 or AV1, in Matroska, using constant quality rather than a bitrate target. Confirm your playback device handles the profile — particularly the bit depth — before committing an entire library.

**Fixing a file that will not play:** check the codec, the profile, the bit depth and the level, in that order. Then re-encode to H.264 if the device genuinely cannot decode it. [The full diagnostic order](/blog/android-video-player-guide/) covers what each failure signature tells you, and the container is the other half of the problem — try remuxing before you transcode, because it is free and lossless.

## What our player is built for

[Regal Video Player](/apps/regal-video-player/) is built for H.264, H.265, VP8, VP9 and AV1 video with AAC, MP3, FLAC and Ogg audio, inside MP4, MKV, MOV, M4V, WebM, 3GP, FLV, TS and M2TS containers.

The caveat is the honest one and it applies to every player on the platform: what actually plays depends on the file, your Android version and the decoders your device provides. Any app claiming to guarantee playback of a codec your chipset has no decoder for is claiming something the hardware does not allow.

Everything else is about the watching. Playback speed from 0.1x to 3.0x in 0.1x steps, which is fine-grained enough that a fast talker at 1.3x and a demonstration at 0.7x are both available rather than approximated. Resume returns you to the position you left, with recent videos, playback history and favorites to find files again — stored locally, with no account required for normal local playback. Gestures cover seeking, jumping, volume and brightness, plus mute, rotate and a screen lock for long content. Picture-in-Picture floats a video while you use other apps on supported devices, and the sleep timer stops playback after a chosen time or at the end of the current video, with a repeat mode for anything you want again.

The free version covers local playback and is supported by ads; an optional Premium purchase removes ads and unlocks extra themes, with monthly, yearly and lifetime options shown by Google Play. It sits with the rest of our [video and utility apps](/apps/category/video-utility/), and it is intended for media you legitimately hold — your own recordings, camera exports, meeting captures and DRM-free downloads — rather than for content licensed to be played inside the app that sold it.

## The short version

A codec predicts each block from something it already has, stores the difference, and throws away detail during quantisation. That is why unpredictable footage is enormous and a static shot is tiny, and why seeking lands on I-frame boundaries.

Bitrate is a budget shared across resolution, frame rate and complexity. Bit depth and profile are separate hardware paths, which is why "my device supports this codec" and "this file plays" are different statements. And each new generation of codec buys roughly half the bitrate for equivalent quality at the price of decode cost and device support — which is the entire trade, restated in every format war for the past twenty years.
