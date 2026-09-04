---
{
  "title": "Audio Codecs Explained",
  "metaTitle": "Audio Codecs Explained",
  "description": "Lossy and lossless, AAC, MP3, FLAC, Opus and Vorbis, why multichannel audio fails on phones, and what passthrough actually does.",
  "status": "published",
  "publishedAt": "2026-09-04",
  "updatedAt": "2026-09-04",
  "author": "Reign Creative Team",
  "category": "video-utility",
  "tags": [
    "audio",
    "codecs",
    "video",
    "formats"
  ],
  "primaryKeyword": "audio codecs explained",
  "secondaryKeywords": [
    "aac vs mp3",
    "flac lossless audio",
    "opus codec",
    "audio passthrough",
    "surround sound on phone"
  ],
  "intent": "informational",
  "longTailKeywords": [
    "what is the difference between lossy and lossless audio",
    "why is there no sound on my video file",
    "what is audio passthrough",
    "does flac sound better than aac"
  ],
  "aiSearchQuestions": [
    "What are the main audio codecs?",
    "What is the difference between lossy and lossless audio?",
    "Why does a video play with no sound?",
    "What is audio passthrough?"
  ],
  "demandTier": "unverified-medium",
  "relatedApps": [
    "regal-video-player"
  ],
  "relatedArticles": [
    "video-codecs-explained",
    "hardware-vs-software-decoding",
    "remuxing-vs-transcoding",
    "video-file-formats-explained"
  ],
  "takeaways": [
    "Lossy codecs discard information permanently to reduce size; lossless codecs compress without discarding anything.",
    "AAC and MP3 are the most broadly compatible lossy formats; Opus and Vorbis are royalty-free alternatives common on the web.",
    "FLAC is lossless and compressed, which means larger files than lossy formats and identical audio to the source.",
    "A video that plays with no sound usually has an audio codec the device cannot decode, not a broken file.",
    "Passthrough sends an undecoded multichannel bitstream to external equipment that can decode it — which a phone's speakers cannot do."
  ],
  "disclaimer": "none",
  "featured": false,
  "faqs": [
    {
      "question": "What is the difference between lossy and lossless?",
      "answer": "A lossy codec permanently discards information judged least perceptible, achieving much smaller files. A lossless codec compresses without discarding anything, so decoding reproduces the original data exactly."
    },
    {
      "question": "Which audio codec is most compatible?",
      "answer": "AAC and MP3 have the broadest device support. AAC is generally more efficient at a given bitrate, and both are supported essentially everywhere that plays audio."
    },
    {
      "question": "Why does my video play with no sound?",
      "answer": "Usually the audio codec is one the device cannot decode, even though the video codec is fine. Multichannel formats intended for home cinema equipment are the most common cause on phones."
    },
    {
      "question": "What is passthrough?",
      "answer": "Sending an encoded audio bitstream to external equipment without decoding it first, so a receiver or soundbar does the decoding. It only makes sense when connected to equipment capable of that decoding."
    },
    {
      "question": "Does FLAC sound better than AAC?",
      "answer": "FLAC reproduces the source exactly; AAC does not. Whether the difference is audible depends on the bitrate, the material, the equipment and the listener, and it is a smaller difference than the file sizes suggest."
    }
  ],
  "sources": [
    {
      "title": "FLAC — Free Lossless Audio Codec",
      "publisher": "Xiph.Org Foundation",
      "url": "https://xiph.org/flac/",
      "accessed": "2026-09-03"
    },
    {
      "title": "Supported media formats",
      "publisher": "Android Developers, Google",
      "url": "https://developer.android.com/media/platform/supported-formats",
      "accessed": "2026-09-03"
    },
    {
      "title": "RFC 6381: The 'Codecs' and 'Profiles' Parameters for Bucket Media Types",
      "publisher": "RFC Editor / IETF",
      "url": "https://www.rfc-editor.org/rfc/rfc6381",
      "accessed": "2026-09-03"
    }
  ]
}
---

**Audio codecs divide into two kinds: those that throw information away and those that do not.** Everything else — which format, which bitrate, why a file has no sound — sits downstream of that.

## Lossy and lossless

**Lossy** codecs permanently discard information judged least perceptible, achieving much smaller files. The discarded data cannot be recovered; re-encoding a lossy file into another lossy format compounds the loss.

**Lossless** codecs compress without discarding anything. Decoding reproduces the original data exactly, at the cost of substantially larger files.

There is a third category worth naming: **uncompressed** — raw audio, largest of all, used mainly in production rather than distribution.

## The common formats

| Codec | Type | Compatibility | Typical use |
| --- | --- | --- | --- |
| AAC | Lossy | Very high | Video files, streaming, most modern delivery |
| MP3 | Lossy | Universal | Music files, older material |
| Opus | Lossy | Good and growing | Web audio, voice, royalty-free |
| Vorbis | Lossy | Good | Royalty-free, common in WebM |
| FLAC | Lossless | Good | Archival, music libraries |
| PCM / WAV | Uncompressed | Universal | Production, short clips |
| Dolby and DTS family | Lossy, multichannel | Home cinema equipment | Discs, surround tracks |

**AAC** is the practical default for video. It is more efficient than MP3 at a given bitrate and is supported essentially everywhere.

**MP3** persists because compatibility is total. Nothing refuses to play an MP3.

**Opus and Vorbis** are royalty-free, developed under the [Xiph.Org Foundation](https://xiph.org/flac/) umbrella alongside FLAC. Opus in particular performs well across a wide bitrate range, which is why it is common for web and voice.

**FLAC** compresses losslessly — typically well under half the size of uncompressed audio while reproducing it exactly.

## Why a video plays with no sound

This is the most common audio problem, and the diagnosis is usually simple.

**The audio codec is one the device cannot decode**, even though the video codec is fine. The player shows picture and silence.

The usual culprits are **multichannel formats intended for home cinema equipment**. Those tracks were authored for a receiver or soundbar, and a phone frequently has no decoder for them.

Three routes out:

**1. Check for another audio track.** Many files carry more than one — a multichannel track and a stereo one. Selecting the stereo track solves it immediately.

**2. Remux with a compatible track.** If a compatible track exists in the file, or you can supply one, remuxing is fast and lossless. [Remuxing versus transcoding](/blog/remuxing-vs-transcoding/) covers the operation.

**3. Transcode the audio.** Re-encode to AAC or MP3. This loses some quality — it is lossy-to-lossy — and it is the last resort.

## Passthrough

**Passthrough** sends the encoded audio bitstream to external equipment without decoding it, so a receiver or soundbar does the decoding.

It exists because home cinema equipment often has better decoders — and, for some formats, the only licensed ones. Sending the bitstream intact lets that equipment do the work.

**On a phone's own speakers, passthrough makes no sense.** There is nothing downstream capable of decoding it. The device has to decode the audio itself or produce nothing.

The practical consequence: passthrough settings are relevant when connected to capable equipment and irrelevant otherwise.

## Bitrate and quality

For lossy codecs, bitrate is the main quality control — how much data per second of audio.

Two honest observations:

**The returns diminish.** Above a certain point, increases in bitrate produce differences most listeners cannot detect on most equipment.

**Codec efficiency differs.** AAC at a given bitrate generally outperforms MP3 at the same bitrate. Comparing bitrates across codecs is not comparing like with like.

Whether a lossless file sounds better than a good lossy one depends on the bitrate, the material, the playback equipment and the listener. We are not going to tell you what you can hear; that is a personal test rather than a specification.

## Identifying what a file contains

The container carries codec information, and a player reads it to select decoders. The formal syntax for identifying codecs in a media type — the strings you see in technical contexts — is defined in [RFC 6381](https://www.rfc-editor.org/rfc/rfc6381).

Most players show track details in a media information panel: codec, channels, sample rate, bitrate. That panel is the fastest route to diagnosing a silent file, because it tells you exactly what the player was asked to decode.

[Android's supported media formats documentation](https://developer.android.com/media/platform/supported-formats) sets out which audio formats the platform supports at which version.

## Where our app fits

[Regal Video Player](/apps/regal-video-player/) supports AAC, MP3, FLAC and Ogg audio alongside H.264, H.265, VP8, VP9 and AV1 video, inside MP4, MKV, MOV, M4V, WebM, 3GP, FLV, TS and M2TS containers.

**What that means for the silent-video problem:** a file whose audio is one of those formats will play. A file carrying only a multichannel home-cinema track may play video without audio, and the fix is a compatible audio track rather than a different player.

The free version covers local playback and is supported by ads; an optional Premium purchase removes ads and unlocks extra themes.

[Video codecs explained](/blog/video-codecs-explained/) covers the video side, [hardware versus software decoding](/blog/hardware-vs-software-decoding/) covers why decoder availability matters so much, and [video file formats explained](/blog/video-file-formats-explained/) covers the containers. Everything we make here is under [video and utility apps](/apps/category/video-utility/).
