---
{
  "title": "Android App Permissions Explained",
  "metaTitle": "Android App Permissions Explained",
  "description": "Install-time, runtime and special permissions, how to review what your apps have, and why a permission list is only half the privacy picture.",
  "status": "published",
  "publishedAt": "2026-09-04",
  "updatedAt": "2026-09-04",
  "author": "Reign Creative Team",
  "category": "video-utility",
  "tags": [
    "android",
    "permissions",
    "privacy",
    "utility"
  ],
  "primaryKeyword": "how to check app permissions android",
  "secondaryKeywords": [
    "runtime permissions android",
    "install time permissions",
    "special app access",
    "permission groups android",
    "revoke app permissions"
  ],
  "intent": "informational",
  "longTailKeywords": [
    "how do you see what permissions an app has",
    "what is the difference between install time and runtime permissions",
    "what are special permissions on android",
    "does denying a permission break an app"
  ],
  "aiSearchQuestions": [
    "How do you check what permissions an Android app has?",
    "What is the difference between install-time and runtime permissions?",
    "What are special permissions?",
    "Does denying a permission break the app?"
  ],
  "demandTier": "unverified-medium",
  "relatedApps": [
    "regal-video-player",
    "protein-diet-tracker"
  ],
  "relatedArticles": [
    "google-play-data-safety-explained",
    "why-free-android-games-show-ads",
    "android-video-player-guide",
    "battery-and-performance-in-mobile-games",
    "picture-in-picture-on-android"
  ],
  "takeaways": [
    "Android divides permissions into install-time, runtime and special categories, and they differ in how they are granted.",
    "Runtime permissions cover the sensitive data — location, camera, microphone, contacts — and must be requested when needed rather than at install.",
    "Special permissions are granted through system settings rather than a normal prompt, because they are unusually powerful.",
    "You can review and revoke permissions at any time from Settings, and Android can auto-revoke permissions for unused apps.",
    "Permissions tell you what an app can access; the Data safety section tells you what it collects and shares. You need both."
  ],
  "disclaimer": "none",
  "featured": false,
  "faqs": [
    {
      "question": "What is the difference between install-time and runtime permissions?",
      "answer": "Install-time permissions are granted automatically when the app is installed and cover access with limited privacy risk. Runtime permissions — also called dangerous permissions — cover sensitive data and must be requested and approved while the app is running."
    },
    {
      "question": "What are special permissions?",
      "answer": "Permissions for unusually powerful capabilities, granted through the system's Special app access settings rather than a standard prompt. The extra step is deliberate, because these capabilities warrant more deliberate consent."
    },
    {
      "question": "How do I review what an app has?",
      "answer": "In Settings, through the app's own entry or through the permission manager, which lists permissions and which apps hold each. You can revoke from either view at any time."
    },
    {
      "question": "Does denying a permission break the app?",
      "answer": "It should not. Android's guidance is that apps degrade gracefully when a permission is denied, offering reduced functionality rather than refusing to run. Apps that refuse to work without an unrelated permission are worth questioning."
    },
    {
      "question": "Are permissions the whole privacy picture?",
      "answer": "No. Permissions describe what an app can access on the device. What it collects and shares — including through third-party components such as advertising libraries — is declared separately in Google Play's Data safety section."
    }
  ],
  "sources": [
    {
      "title": "Permissions on Android",
      "publisher": "Android Developers, Google",
      "url": "https://developer.android.com/guide/topics/permissions/overview",
      "accessed": "2026-09-03"
    },
    {
      "title": "Provide information for Google Play's Data safety section",
      "publisher": "Google Play Console Help",
      "url": "https://support.google.com/googleplay/android-developer/answer/10787469",
      "accessed": "2026-09-03"
    }
  ]
}
---

**Android permissions come in three kinds, and the difference between them is how they are granted.** Knowing which is which tells you what you actually control and where to look for it.

The authoritative reference is [Android's permissions overview](https://developer.android.com/guide/topics/permissions/overview).

## The three categories

### Install-time permissions

Granted automatically when the app is installed. They cover access with limited privacy risk — network access, for instance, or vibration.

Android's documentation subdivides these into **normal** permissions, which carry minimal risk, and **signature** permissions, which are granted only to apps signed with the same certificate as the app defining them.

You are not prompted for these, because prompting for everything would train people to dismiss prompts without reading.

### Runtime permissions

The ones that matter most, sometimes called **dangerous** permissions. They cover access to restricted data and actions: location, camera, microphone, contacts, and similar.

Two properties:

- **They must be requested while the app is running**, at or near the point of use, rather than granted at install.
- **They must be checked before each access**, because you can revoke them at any time.

This is the category where you have real control, and where a well-designed app explains why it needs something before asking.

### Special permissions

A small set of unusually powerful capabilities, granted through **Special app access** in system settings rather than a normal prompt.

The extra friction is intentional. These capabilities are broad enough that a one-tap prompt would not represent meaningful consent.

## Permission groups

Related permissions are presented in groups, so a request appears as a category rather than as a list of technical identifiers.

This makes prompts readable and can obscure detail: granting a group-level request may cover more than the specific capability you had in mind. Reviewing what an app actually holds afterwards is the correction.

## How to review and revoke

Two routes, both in Settings:

**By app.** Open the app's entry and view its permissions. Useful when you are thinking about one app.

**By permission.** The permission manager lists each permission and which apps hold it. Useful for questions like "what has location access?", which is usually the more revealing direction.

Android also **auto-revokes permissions for apps you have not used for a while**, which quietly cleans up permissions granted to apps you have forgotten about.

## Denying a permission should not break the app

Android's guidance to developers is that apps should degrade gracefully: offer reduced functionality rather than refusing to run.

**The practical test:** if an app refuses to work without a permission that is not obviously required for its core function, that is worth questioning. A video player needing access to media files is expected; the same app requiring contacts is not.

## Permissions are half the picture

This is the point most permission guides omit, and it matters.

**Permissions describe what an app can access on your device. They do not describe what it collects and shares.**

An app can collect and transmit data without requesting an unusual permission — analytics, advertising identifiers, usage patterns. Third-party components such as advertising libraries collect their own data, and the app's permission list does not necessarily reveal it.

That information belongs in Google Play's **Data safety** section, which developers are required to complete — [Google's own documentation](https://support.google.com/googleplay/android-developer/answer/10787469) sets out what must be declared. [Google Play's Data safety section explained](/blog/google-play-data-safety-explained/) covers reading it.

**Check both.** Permissions tell you capability; Data safety tells you practice.

## A short review routine

Worth doing occasionally rather than never:

1. **Open the permission manager** and go through location, camera, microphone and contacts.
2. **For each, ask whether the app's core function requires it.** Revoke where the answer is no.
3. **Check the Data safety section** for apps holding anything you care about.
4. **Uninstall what you do not use.** The most reliable permission is one no app holds.

## Where our apps fit

Our apps are local-first by design, and the permission implications follow from that.

[Regal Video Player](/apps/regal-video-player/) is a player for files already on your device, so its requirements relate to reading media on the device rather than to network services, accounts or personal data categories.

[Protein Diet Tracker](/apps/protein-diet-tracker/) stores entries on your device rather than on our servers, and requires no account. That is a design decision with a privacy consequence: data that never leaves the device cannot be exposed by us, and it also means an uninstall takes your history with it.

Each app's page on this site states its ads, in-app purchase and content-rating facts, verified against the live Google Play listing with the verification date shown. Our [privacy policy](/privacy/) covers what we do and do not collect.

[Why free Android games show ads](/blog/why-free-android-games-show-ads/) covers the funding model that drives most third-party data collection in free apps. Everything we make here is under [video and utility apps](/apps/category/video-utility/).
