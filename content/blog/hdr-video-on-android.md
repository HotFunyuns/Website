---
{
  "title": "HDR Video on Android: HDR10, HLG and Dolby Vision Explained",
  "metaTitle": "HDR Video on Android: HDR10, HLG and Dolby Vision",
  "description": "HDR video on Android explained: how HDR differs from SDR, HDR10, HDR10+, Dolby Vision and HLG, what playback needs, and why HDR may look duller than intended.",
  "status": "published",
  "editorialReview": "automated",
  "publishedAt": "2026-10-25",
  "updatedAt": "2026-10-25",
  "author": "reign-creative-llc",
  "category": "video-utility",
  "tags": ["hdr", "video", "android", "dolby vision", "display"],
  "primaryKeyword": "hdr video android",
  "secondaryKeywords": [
    "hdr10 vs dolby vision",
    "what is hlg",
    "hdr10 plus",
    "hdr video looks washed out",
    "does my phone support hdr"
  ],
  "intent": "informational",
  "longTailKeywords": [
    "why does hdr video look grey on my phone",
    "what is the difference between hdr10 and hdr10+",
    "can android play dolby vision",
    "what do i need to play hdr video"
  ],
  "aiSearchQuestions": [
    "What is HDR video on Android?",
    "What is the difference between HDR10, HDR10+, Dolby Vision and HLG?",
    "Why does HDR video look washed out on some phones?",
    "What does a phone need to play HDR video?"
  ],
  "relatedApps": ["regal-video-player"],
  "relatedArticles": [
    "video-codecs-explained",
    "android-video-player-guide",
    "av1-on-android-explained",
    "how-to-cast-video-to-tv-from-android"
  ],
  "takeaways": [
    "Wikipedia notes SDR formats represent up to about 100 nits of brightness, while HDR formats allow around 1,000 to 10,000 nits, plus darker blacks and richer colours.",
    "HDR10 uses static metadata; HDR10+ and Dolby Vision add dynamic metadata; HLG carries no metadata and is designed to be backward compatible with SDR UHD TVs.",
    "Android's platform documentation lists Dolby Vision, HDR10, VP9-HLG and VP9-PQ among the HDR technologies supported from Android 7.0.",
    "Android says HDR playback needs an HDR-capable decoder and an HDR-capable display.",
    "When a display cannot show the full range, Wikipedia notes the image must be adjusted to fit it; dynamic metadata exists to help with that."
  ],
  "disclaimer": "none",
  "featured": false,
  "faqs": [
    {
      "question": "What is HDR video?",
      "answer": "High dynamic range video stores a wider range of brightness and colour than standard dynamic range. Wikipedia notes SDR represents up to around 100 nits, while HDR raises that to around 1,000 to 10,000 nits, with darker blacks and more saturated colours."
    },
    {
      "question": "What is the difference between HDR10, HDR10+, Dolby Vision and HLG?",
      "answer": "HDR10 is an open format with static metadata for the whole video. HDR10+ adds dynamic metadata developed by Samsung. Dolby Vision is an end-to-end ecosystem covering creation, distribution and playback, with dynamic metadata and support for up to 10,000 nits. HLG has no metadata and is backward compatible with SDR UHD TVs."
    },
    {
      "question": "Why does HDR video look washed out on some phones?",
      "answer": "One possibility is that a link in the chain, the decoder, the player or the screen, is not handling HDR fully. Wikipedia notes that when a display cannot reproduce everything in HDR content, the image has to be adjusted to fit it, and Android's documentation says HDR playback needs both an HDR-capable decoder and an HDR-capable display."
    },
    {
      "question": "Can Android play Dolby Vision?",
      "answer": "Android's platform documentation lists Dolby Vision among the HDR technologies supported from Android 7.0, alongside HDR10, VP9-HLG and VP9-PQ, but actual support depends on the phone's decoder and display."
    }
  ],
  "sources": [
    {
      "title": "High-dynamic-range television",
      "publisher": "Wikipedia",
      "url": "https://en.wikipedia.org/wiki/High-dynamic-range_television",
      "accessed": "2026-10-24"
    },
    {
      "title": "HDR video playback",
      "publisher": "Android Open Source Project",
      "url": "https://source.android.com/docs/core/display/hdr",
      "accessed": "2026-10-24"
    }
  ]
}
---

**HDR** labels such as HDR10 and Dolby Vision describe how a video stores brightness and colour, and whether a phone can show them depends on more than the label. Wikipedia notes HDR highlights can be brighter, more colourful and more detailed. This guide explains what HDR is, how the main formats differ and what Android needs to play them, using Wikipedia's article on high-dynamic-range television and Android's platform documentation.

## What HDR changes

Wikipedia explains the core difference in brightness. **SDR** formats can represent a maximum luminance of around **100 nits**; **HDR** raises that to around **1,000 to 10,000 nits**, and can also represent **darker black levels** and **more saturated colours**. In other words, HDR is not just "brighter": it is a wider range from the darkest shadow to the brightest highlight, stored in the file.

## The main formats

Since 2014, Wikipedia notes, several HDR formats have emerged, some royalty-free and some licensed:

| Format | Metadata | Notes from Wikipedia |
| --- | --- | --- |
| HDR10 | Static | Open standard announced by the Consumer Technology Association in August 2015; the most widespread; not backward compatible with SDR displays |
| HDR10+ | Dynamic | HDR10 plus a dynamic metadata system developed by Samsung; announced April 2017 |
| Dolby Vision | Dynamic | An end-to-end ecosystem covering content creation, distribution and playback; can represent up to 10,000 nits |
| HLG | None | Uses the HLG transfer function with 10-bit depth; backward compatible with SDR UHD TVs, but not older SDR displays |
| PQ10 | None | The same as HDR10 without metadata |

**Metadata** is the key difference. Wikipedia explains that HDR10's static metadata describes the video as a whole, to help a display with lower capability adjust; **dynamic metadata** in HDR10+ and Dolby Vision can change scene by scene, improving the picture on displays that cannot reproduce the full range.

## What Android supports

Android's platform documentation says that **from Android 7.0**, these HDR technologies are supported: **Dolby Vision**, **HDR10**, **VP9-HLG** and **VP9-PQ**, with HEVC and AVC codecs for Dolby Vision, HEVC for HDR10 and VP9 for the VP9 variants. It adds that from Android 9, the media framework reports HDR metadata, static for HDR10 and dynamic for HDR10+.

Support on paper is not support in practice, though. The documentation is explicit that **HDR playback requires an HDR-capable decoder and a connection to an HDR-capable display**, and that some technologies need a specific extractor. A phone can run a recent Android version and still lack the hardware for a given format.

## Why HDR can look washed out

When a display cannot show all the brightness, contrast and colour in HDR content, Wikipedia explains, the image has to be **adjusted to fit the display's capabilities**, and Wikipedia says the dynamic metadata in Dolby Vision and HDR10+ is used to improve image quality on such limited displays. It follows that if any link in the chain, the decoder, the player or the screen, does not handle HDR fully, what you see may differ from what the creator intended, for example looking duller or flatter. Wikipedia also notes that standards assume HDR is created and viewed in a **relatively dark environment**, so bright daylight makes any screen's HDR less impressive.

## A worked example: one film, three screens

Take a film delivered in HDR10:

- On a phone with an **HDR display and decoder**, it plays as intended, using the static metadata to fit the screen.
- On a phone **without HDR support**, the file cannot be shown as HDR; Wikipedia notes HDR10 is not backward compatible with SDR displays, so how it looks depends on how the phone and player handle it.
- Cast to an **HDR TV**, the TV handles the HDR signal, if the casting route passes HDR through.

The file is identical in all three. What changes is whether each step in the chain understands HDR.

## Checking your own setup

1. **Check the phone's specifications** for HDR display support and which formats it lists.
2. **Play a known HDR sample** in a player you trust.
3. **Compare** with an SDR version of similar content in the same conditions.
4. **Watch in dim light**, as the standards assume.

Codec support matters too; [video codecs explained](/blog/video-codecs-explained/) covers HEVC, VP9 and AV1, and [AV1 on Android](/blog/av1-on-android-explained/) the newest of them.

## HDR in a local player

[Video Player All Formats PRO](/apps/regal-video-player/), one of our [video and utility apps](/apps/category/video-utility/), plays local files with H.264, H.265, VP8, VP9 or AV1 video; its listing notes that playback depends on the container, codec, Android version and available system decoders, which applies to HDR files as much as any. [The Android video player guide](/blog/android-video-player-guide/) covers diagnosing playback problems, and [casting video to a TV](/blog/how-to-cast-video-to-tv-from-android/) covers the bigger screen.
