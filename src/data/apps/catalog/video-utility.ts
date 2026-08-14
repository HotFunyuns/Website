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
    lastVerified: '2026-08-09',
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
];
