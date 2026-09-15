import type { AppInfo } from '../types';

export const videoUtilityApps: AppInfo[] = [
  {
    slug: 'regal-video-player',
    name: 'Regal Video Player',
    tagline: 'A local video player that opens common formats and remembers where you stopped.',
    cardDescription:
      'Play local MP4, MKV and MOV files with 0.1x to 3.0x speed control, resume, Picture-in-Picture and a sleep timer.',
    longDescription: [
      'Regal Video Player is for the video files already sitting on your phone or tablet: downloaded movies, saved clips, lessons, interviews and your own recordings. It opens MP4, MKV and MOV alongside M4V, WebM, 3GP, FLV, TS and M2TS containers, and is built for media encoded with H.264, H.265, VP8, VP9 and AV1, with audio in AAC, MP3, FLAC and Ogg. What actually plays depends on the file and the decoders your device provides.',
      'Playback speed runs from 0.1x to 3.0x in 0.1x steps, which is fine-grained enough to slow a tutorial to something you can follow or move a long recording along without turning it into noise. Resume brings you back to the position you left, recent videos and playback history keep unfinished files close, and Favorites holds the ones you return to.',
      'The controls are built for watching rather than fiddling. Gestures handle seeking, jumping forward and back, volume and brightness, with mute, rotate and a screen lock that stops stray taps during long content. Picture-in-Picture keeps a video in a floating window while you use other apps on supported devices, and a sleep timer can stop playback after a set time or at the end of what you are watching.',
    ],
    category: 'Video & Utilities',
    categoryId: 'video-utility',
    schemaCategory: 'MultimediaApplication',
    playStoreUrl: 'https://play.google.com/store/apps/details?id=com.reigncreative.regalvideoplayer',
    packageId: 'com.reigncreative.regalvideoplayer',
    icon: '/icons/regal-video-player.webp',
    iconSmall: '/icons/regal-video-player-sm.webp',
    accent: 'from-gold-500 to-gold-700',
    playCategory: 'VIDEO_PLAYERS',
    contentRating: 'Everyone',
    containsAds: true,
    inAppPurchases: true,
    free: true,
    lastVerified: '2026-09-15',
    features: [
      {
        title: 'Common local formats',
        body: 'MP4, MKV and MOV plus M4V, WebM, 3GP, FLV, TS and M2TS containers, with H.264, H.265, VP8, VP9 and AV1 video where your device supplies the decoder.',
      },
      {
        title: 'Speed from 0.1x to 3.0x',
        body: 'Adjust playback in precise 0.1x steps, so slowing a tutorial or speeding up a lecture is a fine adjustment rather than a jump.',
      },
      {
        title: 'Resume, recents and favorites',
        body: 'Your position is saved so you return to the right moment, with recent videos, playback history and a favorites list to find files again.',
      },
      {
        title: 'Picture-in-Picture and screen lock',
        body: 'Float a video while you use other apps on supported devices, and lock the interface so a stray tap cannot interrupt long content.',
      },
      {
        title: 'Sleep timer and repeat',
        body: 'Stop playback after a chosen time or at the end of the current video, or set repeat mode to loop a clip you want again.',
      },
    ],
    audience: [
      'People with downloaded video files rather than streaming apps',
      'Anyone watching lessons, tutorials or long recordings',
      'Phone and tablet users who want gesture controls and a screen lock',
      'Viewers who need a player that resumes exactly where they stopped',
    ],
    howItWorks: [
      {
        title: 'Open your local files',
        body: 'Browse the media already on your device and open a file directly. No account is required for normal local playback.',
      },
      {
        title: 'Set the pace',
        body: 'Dial playback speed anywhere between 0.1x and 3.0x in 0.1x steps to suit whatever you are watching.',
      },
      {
        title: 'Use the gestures',
        body: 'Seek, jump forward or back, adjust volume and brightness, mute, rotate, or lock the interface for a long session.',
      },
      {
        title: 'Keep your place',
        body: 'Saved positions, playback history and favorites are stored locally, so an unfinished video is one tap from where you left it.',
      },
    ],
    faqs: [
      {
        question: 'Is Regal Video Player free?',
        answer:
          'The free version covers local playback and is supported by ads. An optional Premium purchase removes ads and unlocks extra themes, with monthly, yearly and lifetime options shown by Google Play.',
      },
      {
        question: 'Which formats does it play?',
        answer:
          'MP4, MKV, MOV, M4V, WebM, 3GP, FLV, TS and M2TS containers, with H.264, H.265, VP8, VP9 or AV1 video and AAC, MP3, FLAC or Ogg audio. Playback depends on the container, codec, Android version and available system decoders.',
      },
      {
        question: 'Do I need an account?',
        answer:
          'No account is required for normal local playback. Recent videos, playback history, saved positions and favorites are stored locally on your device.',
      },
      {
        question: 'Does Picture-in-Picture always work?',
        answer:
          'It is available on supported Android devices, so whether you get a floating window depends on your device and Android version.',
      },
      {
        question: 'Can playback stop on its own?',
        answer:
          'Yes. The sleep timer can end playback after a length of time you choose, or when the video you are currently watching finishes.',
      },
    ],
    metaTitle: 'Regal Video Player for Android',
    metaDescription:
      'Play local MP4, MKV and MOV files with 0.1x to 3.0x speed control, resume, Picture-in-Picture, gestures and a sleep timer. Free on Google Play.',
  },
  {
    slug: 'tcg-card-grading-scanner',
    name: 'TCG Card Grading Scanner Value',
    tagline: 'Scan a card, check what it is worth, and measure the centring before you send it anywhere.',
    cardDescription:
      'Identify trading cards with your camera, check market-value estimates by printing variant, and measure border centring from front and back photos.',
    longDescription: [
      'TCG Card Grading Scanner Value turns your camera into a card scanner. Single Value Scan handles one card at a time: capture it, review the suggested match, compare the ranked alternatives, then pick the correct printing and the price variant that matches what you are holding. A normal, holo and reverse holo copy of the same card are different things, and the app keeps the selected variant visible rather than quietly averaging them.',
      'Bulk Value Scan is for a stack. You add cards one after another, adjust quantities, change variants, remove anything matched incorrectly, and watch a combined value update as you go — without repeating the setup for every card. Each result is still reviewable before it is saved, so a bad match does not silently end up in your collection.',
      'Card Centering Scan measures left, right, top and bottom borders from front and back photos. You adjust the rounded card guides, inspect the overlay and read the centring ratios, which makes comparing two similar copies a measurement rather than a guess. The grading guidance that accompanies it is explicitly informational: these are not official grades, lighting and camera angle affect the measurements, and an official grade still requires an independent professional grading service.',
    ],
    category: 'Utilities · TCG Scanner',
    categoryId: 'video-utility',
    schemaCategory: 'UtilitiesApplication',
    playStoreUrl: 'https://play.google.com/store/apps/details?id=com.reigncreative.tcgvaluescanner',
    packageId: 'com.reigncreative.tcgvaluescanner',
    icon: '/icons/tcg-card-grading-scanner.webp',
    iconSmall: '/icons/tcg-card-grading-scanner-sm.webp',
    accent: 'from-crimson-500 to-ink-700',
    playCategory: 'SPORTS',
    contentRating: 'Everyone',
    containsAds: true,
    inAppPurchases: true,
    free: true,
    lastVerified: '2026-09-15',
    features: [
      {
        title: 'Single Value Scan',
        body: 'Capture one card, review the suggested match against ranked alternatives, and select the correct printing yourself.',
      },
      {
        title: 'Bulk Value Scan',
        body: 'Add cards consecutively, adjust quantities and variants, remove wrong entries, and see a combined value update as you work.',
      },
      {
        title: 'Card centring measurement',
        body: 'Measure left, right, top and bottom borders from front and back photos using adjustable rounded guides and an overlay.',
      },
      {
        title: 'Variant-aware values',
        body: 'Normal, holo and reverse holo printings are priced separately, and the selected variant stays visible with the result.',
      },
      {
        title: 'Collection and history',
        body: 'Save identified cards, review your scan history, correct uncertain matches, and keep variant details with each entry.',
      },
    ],
    audience: [
      'Collectors sorting or cataloguing a growing card collection',
      'Anyone checking newly acquired cards before storing or selling',
      'People comparing duplicates to decide which copy is the better one',
      'Collectors deciding whether a card is worth submitting for grading',
    ],
    howItWorks: [
      {
        title: 'Scan the card',
        body: 'Point the camera at a card and let the scanner suggest a match, with alternatives ranked underneath.',
      },
      {
        title: 'Confirm the printing',
        body: 'Choose the correct card and the price variant — normal, holo, reverse holo — that matches the copy in front of you.',
      },
      {
        title: 'Measure the centring',
        body: 'Photograph front and back, adjust the rounded guides, and read the left, right, top and bottom ratios.',
      },
      {
        title: 'Save it to the collection',
        body: 'Keep the entry with its variant and value estimate, or run a bulk scan when you have a whole stack to get through.',
      },
    ],
    faqs: [
      {
        question: 'Is TCG Card Grading Scanner Value free?',
        answer:
          'Yes, it is free to download on Google Play. It is supported by ads, and Google Play lists in-app purchases.',
      },
      {
        question: 'Does it give me an official grade?',
        answer:
          'No. Grading estimates are informational only. Lighting, glare, camera angle, card design and manual alignment all affect the centring measurement, and an official grade requires an independent professional grading service.',
      },
      {
        question: 'Where do the card values come from?',
        answer:
          'They are estimates based on available third-party market information for the matched card and variant. Pricing can change and may be unavailable for some cards. They are not guaranteed sale prices, offers or appraisals.',
      },
      {
        question: 'What if the scanner picks the wrong card?',
        answer:
          'Every scan shows ranked alternatives, and you select the correct printing and variant before the result is saved. Entries can also be corrected or removed afterwards.',
      },
      {
        question: 'Is it affiliated with any card company or grading service?',
        answer:
          'No. The app is not affiliated with, endorsed by or sponsored by any card manufacturer, marketplace or professional grading company. All names and trademarks belong to their respective owners.',
      },
    ],
    metaTitle: 'TCG Card Grading Scanner Value for Android',
    metaDescription:
      'Scan trading cards to identify them, check variant-aware market value estimates, and measure border centring before grading. Free on Google Play.',
  },
];
