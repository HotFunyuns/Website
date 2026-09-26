---
{
  "title": "Picture-in-Picture on Android: When It Works and When It Does Not",
  "metaTitle": "Picture-in-Picture on Android: Why It Fails",
  "description": "PiP depends on the app declaring it, the device qualifying, and a per-app switch most people never see. A checklist for when the floating window never appears.",
  "status": "published",
  "publishedAt": "2026-09-22",
  "updatedAt": "2026-09-22",
  "author": "reign-creative-llc",
  "category": "video-utility",
  "tags": [
    "android",
    "video player",
    "picture in picture",
    "troubleshooting",
    "device support"
  ],
  "primaryKeyword": "picture in picture not working android",
  "secondaryKeywords": [
    "android pip support",
    "floating video window android",
    "allow picture-in-picture setting",
    "why is pip greyed out",
    "android 8 picture in picture",
    "pip not available on my phone"
  ],
  "intent": "informational",
  "longTailKeywords": [
    "why does picture in picture not work on my phone",
    "how do i turn on picture in picture for an app",
    "which android versions support picture in picture",
    "does picture in picture work on every device"
  ],
  "aiSearchQuestions": [
    "Why is picture-in-picture not working on my Android phone?",
    "Which Android version added picture-in-picture?",
    "Where is the per-app picture-in-picture setting?",
    "Do all Android devices support a floating video window?"
  ],
  "demandTier": "unverified-medium",
  "relatedApps": [
    "regal-video-player"
  ],
  "relatedArticles": [
    "subtitles-not-working-on-android",
    "android-video-player-guide",
    "android-app-permissions-explained",
    "how-to-play-mkv-files-on-android"
  ],
  "takeaways": [
    "Picture-in-picture is conditional by design. Three separate things have to be true — the app declares support, the device qualifies, and the per-app switch is on — and any one of them failing produces the same silent nothing.",
    "Android's own documentation states that activities have been able to launch in picture-in-picture mode since Android 8.0 (API level 26), and that the system does not support it automatically: an app has to register for it.",
    "The Android Open Source Project documentation sets a hardware floor, noting that devices supporting picture-in-picture must have a screen larger than 220dp at its smallest width and sufficient CPU and RAM for multiple activities to run at once.",
    "Android exposes a per-application operation for picture-in-picture that lets users control it per app through system settings, which is the setting people most often have switched off without remembering it.",
    "Google's developer guidance also notes that the feature might be disabled on devices with low RAM, and recommends apps check availability before using it.",
    "Because the requirements are device-side as well as app-side, no video player can promise a floating window on every phone, and a listing that does is overstating what the platform allows."
  ],
  "disclaimer": "none",
  "featured": false,
  "faqs": [
    {
      "question": "Why is picture-in-picture not working on my Android phone?",
      "answer": "One of three conditions is not met. Either the app has not registered support for it, or the device does not qualify, or the per-app setting is switched off. Android's documentation notes the system does not automatically support the feature for apps, that it might be disabled on devices with low RAM, and that a per-application operation lets users control it through system settings. The failure looks identical in all three cases, which is why you need a checklist rather than a guess."
    },
    {
      "question": "Which Android version added picture-in-picture?",
      "answer": "Google's developer documentation states that starting in Android 8.0, API level 26, Android allows activities to launch in picture-in-picture mode. That is the baseline for handheld devices. A device running an older release will not offer it at all, and later releases refined how it behaves rather than introducing it again."
    },
    {
      "question": "Where is the per-app picture-in-picture setting?",
      "answer": "In system settings, under the special app access section, with an entry for picture-in-picture listing each app that supports it. The Android Open Source Project documentation describes the underlying mechanism as a per-package application operation that lets users control the feature per app. The exact menu path varies by manufacturer and Android version, so search the settings app for the phrase rather than following a fixed route."
    },
    {
      "question": "Can a small or older phone support it at all?",
      "answer": "Not necessarily. The AOSP documentation states that devices supporting picture-in-picture must have a screen larger than 220dp at its smallest width, and that they should have enough CPU and RAM for the use case, since more than one activity runs at the same time. On a device that does not meet the bar, no app-side setting will produce a floating window."
    }
  ],
  "sources": [
    {
      "title": "Use picture-in-picture (PiP)",
      "publisher": "Android Developers, Google",
      "url": "https://developer.android.com/develop/ui/views/picture-in-picture",
      "accessed": "2026-09-21"
    },
    {
      "title": "Picture-in-picture",
      "publisher": "Android Open Source Project",
      "url": "https://source.android.com/docs/core/display/pip",
      "accessed": "2026-09-21"
    },
    {
      "title": "Android Compatibility Definition Document",
      "publisher": "Android Open Source Project",
      "url": "https://source.android.com/docs/compatibility/cdd",
      "accessed": "2026-09-21"
    }
  ]
}
---

Picture-in-picture fails silently. You tap home expecting a floating video window, the video stops, and nothing tells you why. That is the worst kind of bug to diagnose, because the absence of an error message makes it feel like the app is broken when usually the app is not involved at all.

Three separate conditions have to hold before a floating window appears, and any one of them failing produces exactly the same nothing. Here they are, in the order worth checking.

## Condition one: the app has to register for it

Picture-in-picture is opt-in. Google's developer documentation is direct about this: "by default, the system does not automatically support PiP for apps," and an app has to declare support for it before any of its activities can enter the mode.

That documentation also fixes the platform baseline: "Starting in Android 8.0 (API level 26), Android allows activities to launch in picture-in-picture (PiP) mode." On a handheld running anything earlier, the feature does not exist to be enabled.

The Android Open Source Project documentation describes the runtime side: activities request the mode by calling `enterPictureInPictureMode()`, and can control aspect ratio and custom actions through picture-in-picture parameters.

Two practical consequences. First, a video app without picture-in-picture is not defective — it simply has not implemented it. Second, and less obviously, an app can support picture-in-picture in one place and not another, because the opt-in is per activity. A player might float a video from its playback screen and not from its file browser, and that is correct behaviour rather than an inconsistency.

## Condition two: the device has to qualify

This is the condition people rarely consider, and it is the one that most often explains a phone where nothing you change makes any difference.

The AOSP documentation sets a hardware floor: "Devices that support PIP must have a screen that is larger than 220dp at its smallest width." It adds that because picture-in-picture means more than one activity is running at once, in the same way split-screen multitasking does, "devices should have sufficient CPU and RAM to support this use case."

Google's developer guide puts the same constraint from the app side: "PiP might be disabled on devices that have low RAM," and recommends an app check availability before relying on it, by asking the system whether the picture-in-picture feature is present.

These device-level expectations are the sort of thing the Android Compatibility Definition Document exists to codify. That document describes its own role as being "to codify and clarify specific requirements, and eliminate ambiguity," precisely because automated tests cannot verify hardware characteristics, and it sets out different requirements for different device types — handhelds, televisions, automotive and so on. A feature that is required on one class of device may be optional on another.

The upshot for a user is simple and slightly unsatisfying: on some devices, picture-in-picture is genuinely unavailable, and no setting will change that.

## Condition three: the per-app switch

The commonest fixable cause. Android maintains a per-application operation for picture-in-picture, described in the AOSP documentation as a mechanism that "lets users control PIP on a per-application level through the system settings."

In practice this appears as a special app access entry listing every app that has declared support, with an individual allow toggle for each. It defaults on for most apps, but it can be switched off — by a user, by a battery-optimisation routine, or during the general permission tidy-up people do after setting up a new phone.

Because manufacturers reorganise the settings app freely, there is no single menu path worth memorising. Open settings, search for "picture-in-picture," and look for your app in the list. If the app is not listed at all, you are dealing with condition one or two rather than this one.

The same caution applies here as to any Android permission screen, and our overview of [Android app permissions](/blog/android-app-permissions-explained/) covers how those special-access categories differ from ordinary runtime permissions.

## A checklist when the window never appears

Work through these in order and stop when one explains it.

1. **Check the Android version.** Below 8.0, the feature is not there.
2. **Check whether the app is listed** under the picture-in-picture special app access screen. Not listed means it has not declared support, or the device does not qualify.
3. **Check the toggle** for that app if it is listed, and turn it on.
4. **Check you are leaving the right screen.** Picture-in-picture is entered from a playback activity. Backing out of playback first and then pressing home will not trigger it.
5. **Check how you are leaving.** Gesture navigation and button navigation both work, but a forced close or a swipe from the recents list is a termination, not a transition.
6. **Check the device class.** A very small screen or a low-memory device may simply be below the bar.

If the answer turns out to be the device, it is worth knowing early rather than working through app settings for an hour.

## What picture-in-picture does not do

Three clarifications that prevent wasted troubleshooting.

It is not background audio. A floating window is a visible activity; if you want sound with the screen off, that is a different feature.

It is not a resizable floating player in general. The system controls the window, its position and, within limits, its shape. An app can request an aspect ratio; it does not own the window.

It is not universal across content. Some sources apply playback restrictions that prevent a video appearing in a secondary window, and that is a property of the content rather than of the player.

## What a video player can honestly promise

Given all of the above, a video player can implement picture-in-picture properly and still not produce a floating window on your particular phone. That is a platform outcome, not an app defect, and it is worth being straightforward about.

[Regal Video Player](/apps/regal-video-player/) is our own app, and it states the position plainly: picture-in-picture floats a video while you use other apps **on supported devices**, so whether you get a floating window depends on your device and Android version. Alongside it the player covers local MP4, MKV and MOV files and several other containers, playback speed from 0.1x to 3.0x in 0.1x steps, resume, gesture controls, a screen lock and a sleep timer — features that do not depend on device-class gating in the same way.

If the thing that is actually failing is playback rather than the floating window, the container-and-codec side is a different diagnosis entirely, and our guide to [why a video will not play on Android](/blog/android-video-player-guide/) is the right starting point. For a comparable subsystem-level checklist, the piece on [subtitles not working on Android](/blog/subtitles-not-working-on-android/) follows the same shape for subtitle tracks.

More on players, formats and device behaviour is in our [video and utility apps](/blog/category/video-utility/) section.
