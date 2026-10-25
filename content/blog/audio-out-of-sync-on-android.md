---
{
  "title": "Audio Out of Sync on Android Videos: Causes and Fixes",
  "metaTitle": "Audio Out of Sync on Android Videos: Causes and Fixes",
  "description": "Why audio drifts out of sync with video on Android, from Bluetooth latency to TV processing and faulty files, how much delay people notice and how to fix it.",
  "status": "published",
  "editorialReview": "automated",
  "publishedAt": "2026-10-25",
  "updatedAt": "2026-10-25",
  "author": "reign-creative-llc",
  "category": "video-utility",
  "tags": ["android", "video playback", "bluetooth audio", "lip sync", "troubleshooting"],
  "primaryKeyword": "audio out of sync video android",
  "secondaryKeywords": [
    "audio delay android video",
    "bluetooth audio lag video",
    "lip sync problem android",
    "video and sound not matching",
    "fix audio sync on phone"
  ],
  "intent": "informational",
  "longTailKeywords": [
    "why is my bluetooth audio delayed on videos",
    "why is the sound ahead of the picture",
    "how much audio delay is noticeable",
    "audio out of sync only on one video file"
  ],
  "aiSearchQuestions": [
    "Why is audio out of sync with video on my Android phone?",
    "Does Bluetooth cause audio delay in videos?",
    "How much audio delay can people notice?",
    "How do you fix audio out of sync on one video file?"
  ],
  "relatedApps": ["regal-video-player"],
  "relatedArticles": [
    "android-video-player-guide",
    "how-to-cast-video-to-tv-from-android",
    "video-file-formats-explained",
    "subtitles-not-working-on-android"
  ],
  "takeaways": [
    "Lip-sync error is how far audio departs from perfect timing with video; Wikipedia notes positive numbers mean audio leads and negative mean it lags.",
    "The ITU found viewers can detect errors from about 45 ms of audio lead to 125 ms of lag; the EBU recommends staying within +40 ms and −60 ms.",
    "Bluetooth headphones are one possible cause: Wikipedia notes standard Bluetooth stereo latency varies greatly with implementation and buffering.",
    "Flat-panel TVs can delay video more than audio, and Wikipedia notes consumer TVs, soundbars and receivers now offer audio-delay adjustments to compensate.",
    "If only one file is affected, suspect the file; if every file is affected only on Bluetooth headphones, suspect the audio path."
  ],
  "disclaimer": "none",
  "featured": false,
  "faqs": [
    {
      "question": "Why is audio out of sync with video on my Android phone?",
      "answer": "Three places to look are the audio path, such as Bluetooth headphones that add delay; the display path, such as a TV that processes the picture; or the file itself, if its audio and video timing was recorded or converted badly. Testing a few combinations shows which one."
    },
    {
      "question": "Does Bluetooth cause audio delay in videos?",
      "answer": "It can. Wikipedia's article on the aptX codec notes that the latency of standard Bluetooth stereo varies greatly depending on implementation and buffering, while low-latency solutions such as aptX Low Latency quote about 32 ms end to end."
    },
    {
      "question": "How much audio delay can people notice?",
      "answer": "Wikipedia cites ITU tests with expert viewers that put the detection threshold at about 45 ms of audio lead and 125 ms of audio lag. Broadcast guidance is tighter: the EBU recommends within +40 ms and −60 ms."
    },
    {
      "question": "How do I fix audio out of sync on just one video?",
      "answer": "Try the file on another device or player. If it is out of sync everywhere, the file's timing is faulty: download or copy it again, or get a different copy. If it only fails in one player, update that player or try another."
    }
  ],
  "sources": [
    {
      "title": "Audio-to-video synchronization",
      "publisher": "Wikipedia",
      "url": "https://en.wikipedia.org/wiki/Audio-to-video_synchronization",
      "accessed": "2026-10-24"
    },
    {
      "title": "aptX",
      "publisher": "Wikipedia",
      "url": "https://en.wikipedia.org/wiki/AptX",
      "accessed": "2026-10-24"
    }
  ]
}
---

Few things spoil a video faster than speech that does not match lips. On a phone, the delay can come from three places, and a few minutes of testing can narrow down which. This guide explains what "out of sync" means in numbers, where the delay comes from on Android and how to fix each case, using Wikipedia's articles on audio-to-video synchronization and the aptX codec.

## What "out of sync" means, in milliseconds

Wikipedia explains that **lip-sync error** is the amount of time the audio departs from perfect synchronisation with the video, with a **positive** number meaning the audio **leads** the picture and a **negative** number meaning it **lags**. How much error people notice has been measured:

| Guideline | Audio leading | Audio lagging |
| --- | --- | --- |
| ITU detectability threshold, expert viewers | about 45 ms | about 125 ms |
| EBU Recommendation R37, broadcast | within 40 ms | within 60 ms |
| ATSC recommendation, television | no more than 15 ms | no more than 45 ms |
| Film | about 22 ms | about 22 ms |

Two patterns stand out. Every row allows at least as much **lag** as lead, and the ITU threshold for late sound is nearly three times the one for early sound; Wikipedia notes elsewhere that sound travels much more slowly than light, so distant sound naturally arrives late. And the thresholds are small: a quarter of a second of lag is twice the ITU detection threshold.

## Where the delay comes from on a phone

**1. The audio path.** Bluetooth can add delay. Wikipedia's aptX article notes that the latency of **standard Bluetooth stereo varies greatly** depending on the implementation and buffering, while low-latency options exist: aptX Low Latency quotes about **32 ms** end to end, and some standard SBC systems achieve less than 40 ms. The same article notes that aptX Low Latency saw little adoption in smartphones and was retired by Qualcomm, so check what your own phone and headphones support.

**2. The display path.** When you cast to a TV or connect a monitor, the display processes the picture. Wikipedia notes that flat-panel displays can **delay video more than audio**, and that consumer product companies now offer **audio-delay adjustments** in TVs, soundbars and A/V receivers to compensate.

**3. The file itself.** Video files normally contain a synchronisation mechanism, interleaved audio and video data or explicit timestamps. Wikipedia notes that a stream without a working mechanism can drift out of sync. A file whose timing information was damaged or lost in conversion is one possibility.

## A four-step diagnosis

1. **Try another video.** If only one file is affected, suspect the file.
2. **Switch audio output.** Play the same video through the phone's speaker or wired headphones. If sync is fine there but wrong on Bluetooth, it is the Bluetooth path.
3. **Try another player.** If the file plays in sync elsewhere, the first player may handle that format poorly.
4. **Take the TV out of the loop.** If the problem appears only when casting or connected to a TV, check the TV's audio-delay or lip-sync settings.

## A worked example: counting frames

At 30 frames per second, each frame lasts 1,000 ÷ 30 ≈ **33 ms**. The EBU's broadcast tolerance of +40 ms to −60 ms is therefore just over one frame early to just under two frames late. Suppose a pair of Bluetooth earbuds adds a hypothetical 200 ms of delay: that is about **six frames**, well past the 125 ms lag that ITU tests found detectable. At 60 frames per second, the same 200 ms is twelve frames. That is why lips can look obviously wrong on earbuds and perfect on the phone speaker.

## Fixes for each cause

- **Bluetooth**: reconnect the headphones; try another pair; if your headphones and phone support a low-latency mode or codec, use it; or switch to the phone speaker or wired headphones for video.
- **TV or monitor**: use the TV's audio-delay or lip-sync setting, and turn off heavy picture processing modes if your TV offers a game or low-latency mode.
- **The file**: copy or download it again, or find another copy. Problems that appear at the same point every time, everywhere, are in the file.
- **The player**: update it, or try the file in another player.

## When subtitles drift too

If subtitles are out of time as well as audio, or only subtitles are wrong, the subtitle file's timing is worth checking before playback settings; [subtitles not working on Android](/blog/subtitles-not-working-on-android/) covers that.

## Local playback

Playing files stored on the phone takes network streaming out of the test. [Video Player All Formats PRO](/apps/regal-video-player/), one of our [video and utility apps](/apps/category/video-utility/), plays local MP4, MKV, MOV and other containers, with playback speed from 0.1x to 3.0x; its listing notes that playback depends on the container, codec, Android version and available system decoders. [The Android video player guide](/blog/android-video-player-guide/) covers formats, [video file formats explained](/blog/video-file-formats-explained/) the containers, and [casting video to a TV](/blog/how-to-cast-video-to-tv-from-android/) the bigger screen.
