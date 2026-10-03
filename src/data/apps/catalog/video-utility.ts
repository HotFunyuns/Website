import type { AppInfo } from '../types';

export const videoUtilityApps: AppInfo[] = [
  {
    slug: 'regal-video-player',
    name: 'Video Player All Formats PRO',
    formerNames: ['Regal Video Player'],
    tagline: 'A local video player that opens common formats and remembers where you stopped.',
    cardDescription:
      'Play local MP4, MKV and MOV files with 0.1x to 3.0x speed control, resume, Picture-in-Picture and a sleep timer.',
    longDescription: [
      'Video Player All Formats PRO — listed on Google Play as Regal Video Player until its recent rename, and still called that inside its store description — is for the video files already sitting on your phone or tablet: downloaded movies, saved clips, lessons, interviews and your own recordings. It opens MP4, MKV and MOV alongside M4V, WebM, 3GP, FLV, TS and M2TS containers, and is built for media encoded with H.264, H.265, VP8, VP9 and AV1, with audio in AAC, MP3, FLAC and Ogg. What actually plays depends on the file and the decoders your device provides.',
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
    lastVerified: '2026-10-02',
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
        question: 'Is Video Player All Formats PRO free?',
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
    metaTitle: 'Video Player All Formats PRO for Android',
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
  {
    slug: 'pdf-all-in-one-tools',
    name: 'PDF All in One Tool No Limit',
    tagline: 'Read, edit, scan, convert, merge, sign and compress PDFs from one Android toolkit.',
    cardDescription:
      'A PDF workspace its listing counts at 82 tools: annotate and rearrange pages, merge and split files, scan paper, fill and sign forms, and compress or protect PDFs.',
    longDescription: [
      'PDF All in One Tool No Limit gathers the document jobs that usually take several apps — reading, editing, scanning, converting, organising and protecting PDFs — into one workspace that its listing counts at 82 tools. It is aimed at the paperwork people actually handle on a phone: school notes, office reports, business forms, receipts, invoices, applications, contracts and personal records.',
      'Editing covers annotation — text, notes, highlights, drawings, marks and stamps — and page management: rearrange, rotate, remove or extract pages, merge several files into one, or split a long document into smaller ones. You can create PDFs from images, photos, text and other supported documents, and turn paper pages such as notes, receipts, forms and letters into PDFs with the document scanner.',
      'For forms and sending, you can complete fields, add text and sign a document, then compress it when an email or messaging attachment limit gets in the way. A PDF manager helps you review, organise and rename files before sharing them, and protection tools help you manage sensitive documents.',
    ],
    category: 'Utilities · PDF Tools',
    categoryId: 'video-utility',
    schemaCategory: 'UtilitiesApplication',
    playStoreUrl: 'https://play.google.com/store/apps/details?id=com.reigncreative.pdftoolsallinone',
    packageId: 'com.reigncreative.pdftoolsallinone',
    icon: '/icons/pdf-all-in-one-tools.webp',
    iconSmall: '/icons/pdf-all-in-one-tools-sm.webp',
    accent: 'from-crimson-600 to-ink-900',
    playCategory: 'TOOLS',
    contentRating: 'Everyone',
    containsAds: true,
    inAppPurchases: true,
    free: true,
    lastVerified: '2026-10-02',
    features: [
      {
        title: 'Annotate and edit',
        body: 'Add text, notes, highlights, drawings, marks and stamps to review or mark up a document before you send it.',
      },
      {
        title: 'Page management',
        body: 'Rearrange, rotate, remove and extract pages, merge several PDFs into one, or split a long file into smaller ones.',
      },
      {
        title: 'Scan and convert',
        body: 'Turn paper documents into PDFs with the scanner, or create PDFs from images, photos, text and other supported files.',
      },
      {
        title: 'Fill and sign',
        body: 'Complete form fields, add text and sign PDF documents for applications, school forms, work documents and agreements.',
      },
      {
        title: 'Compress and protect',
        body: 'Reduce file size for email and messaging, and use the protection tools to manage sensitive paperwork.',
      },
    ],
    audience: [
      'Students combining class notes and assignments into one file',
      'Employees and freelancers handling forms, invoices and reports',
      'Anyone scanning receipts and paperwork with a phone',
      'People who need to sign or shrink a PDF before sending it',
    ],
    howItWorks: [
      {
        title: 'Open or create a PDF',
        body: 'Start from a file on your device, scan paper pages, or create a PDF from images, photos or text.',
      },
      {
        title: 'Pick the tool',
        body: 'Choose the editing, page, conversion, signing, compression or protection tool the job needs.',
      },
      {
        title: 'Make the changes',
        body: 'Annotate, rearrange, merge, split or fill in the document, then review the result.',
      },
      {
        title: 'Save and share',
        body: 'Compress a large file, rename and organise it in the PDF manager, then share or send it.',
      },
    ],
    faqs: [
      {
        question: 'Is PDF All in One Tool No Limit free?',
        answer:
          'Yes, it is free to download on Google Play. It is supported by ads, and Google Play lists in-app purchases.',
      },
      {
        question: 'Can it scan paper documents?',
        answer:
          'Yes. The document scanner turns paper pages such as notes, receipts, forms and letters into PDF files, which you can then combine, annotate or compress.',
      },
      {
        question: 'Can I sign a PDF with it?',
        answer:
          'Yes. You can add a signature, complete fields and add text to prepare forms and paperwork before sending them.',
      },
      {
        question: 'Can it make a PDF smaller?',
        answer:
          'Yes. The compress tools reduce file size so reports, scans and image-heavy PDFs are easier to email or send by message.',
      },
      {
        question: 'Can I combine or split files?',
        answer:
          'Yes. Merge tools join several files into one document, and split tools divide a large PDF or extract only the pages you need.',
      },
    ],
    metaTitle: 'PDF All in One Tool No Limit for Android',
    metaDescription:
      'Edit, scan, convert, merge, split, sign, compress and protect PDF files with one Android toolkit of 82 PDF tools. Free on Google Play.',
  },
  {
    slug: 'transcribe-audio-to-text',
    name: 'Transcribe Audio to Text PRO',
    tagline: 'Turn recorded lectures, meetings, interviews and voice notes into text you can read at your own pace.',
    cardDescription:
      'Convert recorded speech into written transcripts for study, work and personal notes — then check names and numbers against the original audio.',
    longDescription: [
      'Transcribe Audio to Text PRO converts recorded speech into written transcripts. The reasoning is simple: a recording captures a lot, but finding one detail means listening through it again, while a transcript lets you read, check a point and move on.',
      'Its listing frames it around four everyday uses. Lecture recordings become material to review alongside your notes; voice notes become a written starting point for a journal entry, a plan or a first draft; meeting recordings become a reference while you write up notes and follow-ups; and interview recordings become text to work through before drafting an article or research.',
      'The listing is candid about the limits. Transcription accuracy depends on recording quality, background noise and how clearly people speak, so names, numbers and important details should be checked against the original audio — quotations especially, before anything is published. Keeping the original recording for tone and context is part of the intended workflow.',
    ],
    category: 'Utilities · Transcription',
    categoryId: 'video-utility',
    schemaCategory: 'UtilitiesApplication',
    playStoreUrl: 'https://play.google.com/store/apps/details?id=com.reigncreative.transcribeaudiototext',
    packageId: 'com.reigncreative.transcribeaudiototext',
    icon: '/icons/transcribe-audio-to-text.webp',
    iconSmall: '/icons/transcribe-audio-to-text-sm.webp',
    accent: 'from-gold-500 to-gold-700',
    playCategory: 'TOOLS',
    contentRating: 'Everyone',
    containsAds: true,
    inAppPurchases: false,
    free: true,
    lastVerified: '2026-10-02',
    features: [
      {
        title: 'Audio to text',
        body: 'Turn recorded speech into a written transcript you can read through instead of replaying the whole recording.',
      },
      {
        title: 'Lectures and study',
        body: 'Review recorded explanations alongside your lecture notes and pick out unfamiliar terms or points to ask about.',
      },
      {
        title: 'Meetings and work',
        body: 'Check what was said about a task, a proposal or a decision while you prepare meeting notes and follow-ups.',
      },
      {
        title: 'Interviews and research',
        body: 'Work through interview answers and locate the passages you want before drafting articles or research.',
      },
      {
        title: 'Clear about accuracy',
        body: 'Recording quality, background noise and speech clarity all affect the result, so the listing advises checking names and numbers against the audio.',
      },
    ],
    audience: [
      'Students who record lectures and review them later',
      'Professionals writing up meetings and follow-ups',
      'Writers and researchers working from recorded interviews',
      'Anyone who captures ideas as voice notes',
    ],
    howItWorks: [
      {
        title: 'Start with recorded speech',
        body: 'Begin with a lecture, meeting, interview or voice note that has been recorded.',
      },
      {
        title: 'Transcribe it',
        body: 'Convert the spoken words into a written transcript you can read at your own pace.',
      },
      {
        title: 'Check the details',
        body: 'Compare names, numbers and quotations against the original audio, because accuracy depends on the recording.',
      },
      {
        title: 'Use the text',
        body: 'Work from the transcript for study notes, meeting follow-ups, first drafts or research.',
      },
    ],
    faqs: [
      {
        question: 'Is Transcribe Audio to Text PRO free?',
        answer:
          'Yes, it is free to download on Google Play and supported by ads. Google Play does not list in-app purchases for it.',
      },
      {
        question: 'How accurate is the transcription?',
        answer:
          'It depends on recording quality, background noise and speech clarity. The listing advises reviewing names, numbers and important details against the original audio.',
      },
      {
        question: 'What kinds of recordings is it for?',
        answer:
          'Lectures, meetings, interviews and personal voice notes — anything where reading a transcript is quicker than listening through the recording again.',
      },
      {
        question: 'Should I keep the original audio?',
        answer:
          'Yes. The listing suggests keeping the recording for tone and context and using the transcript when you want to read at your own pace.',
      },
      {
        question: 'Can I quote straight from a transcript?',
        answer:
          'Check every quotation against the original audio first. The listing makes the same point for interview material that is going to be published.',
      },
    ],
    metaTitle: 'Transcribe Audio to Text PRO for Android',
    metaDescription:
      'Turn recorded lectures, meetings, interviews and voice notes into written transcripts you can read and review. Free on Google Play.',
  },
  {
    slug: 'kawaii-cute-notes-journal',
    name: 'Kawaii Cute Notes Journal Plan',
    tagline: 'Notes, a private journal, a mood tracker and a planner, decorated like cute stationery.',
    cardDescription:
      'A notes app, private journal, mood tracker, to-do planner and home screen widgets in one kawaii-styled app, with core features that work offline.',
    longDescription: [
      'Kawaii Cute Notes Journal Plan puts several everyday writing tools in one place. The notes side works as a quick notepad or a decorated notebook, with fonts, sizes, colours, highlights, checkboxes, photos, documents and audio in the editor. Notes autosave while you type and again when you leave the editor or switch apps, and saved drafts can be recovered rather than lost.',
      'The journal can be a daily diary, a gratitude journal or a private space for reflection, with prompts, streaks, goals and a calendar for looking back. A mood tracker asks how you are today and records a mood, activity, sticker and short note, with history and trends. The planner handles to-do lists with due dates, priorities and recurring tasks, any note can become a checklist or shopping list, and reminders can open the exact note they belong to.',
      'The look is as much the point as the function: pastel and patterned themes, stickers, notebook covers, custom backgrounds and widget themes, with every customisation feature available with ads. Home screen widgets can show a note, a to-do list, your mood, a calendar, a reminder, a journal streak or a countdown. An app or notebook lock where supported and hidden widget and notification previews protect private writing, and the core notes, journal, planner, checklist, reminder and calendar features work offline.',
    ],
    category: 'Utilities · Notes & Journal',
    categoryId: 'video-utility',
    schemaCategory: 'UtilitiesApplication',
    playStoreUrl: 'https://play.google.com/store/apps/details?id=com.reigncreative.cutenotesjournal',
    packageId: 'com.reigncreative.cutenotesjournal',
    icon: '/icons/kawaii-cute-notes-journal.webp',
    iconSmall: '/icons/kawaii-cute-notes-journal-sm.webp',
    accent: 'from-gold-500 to-crimson-500',
    playCategory: 'TOOLS',
    contentRating: 'Everyone',
    containsAds: true,
    inAppPurchases: false,
    free: true,
    lastVerified: '2026-10-02',
    features: [
      {
        title: 'Notes that save themselves',
        body: 'Autosave while you type and when you leave the editor, close the keyboard or switch apps, with recoverable drafts if something goes wrong.',
      },
      {
        title: 'Journal and mood tracker',
        body: 'Daily, gratitude or private journal entries with prompts and streaks, plus a mood tracker with history and trends.',
      },
      {
        title: 'Planner, checklists and reminders',
        body: 'To-do lists with due dates, priorities and recurring tasks, checklists from any note, and reminders that open the right note.',
      },
      {
        title: 'Home screen widgets',
        body: 'Pin a note, a to-do list, your mood, a calendar, a reminder, a journal streak or a countdown to the home screen.',
      },
      {
        title: 'Privacy built in',
        body: 'Lock the app or a notebook where supported, and hide private text from widgets and notification previews.',
      },
    ],
    audience: [
      'Anyone who wants notes, a journal and a planner in one app',
      'Journal keepers building a daily writing or gratitude habit',
      'Students and planners who live by to-do lists and reminders',
      'People who like their apps to look like cute stationery',
    ],
    howItWorks: [
      {
        title: 'Start a note or notebook',
        body: 'Write in the notepad editor, add photos, checkboxes or audio, and let autosave keep your work.',
      },
      {
        title: 'Keep a journal',
        body: 'Write daily entries with prompts, add a mood and a sticker, and revisit them through the journal calendar.',
      },
      {
        title: 'Plan the day',
        body: 'Build to-do lists with due dates and priorities, turn notes into checklists, and set reminders.',
      },
      {
        title: 'Pin it to your home screen',
        body: 'Add widgets for notes, tasks, mood, calendar, reminders, streaks or countdowns, styled to match your theme.',
      },
    ],
    faqs: [
      {
        question: 'Is Kawaii Cute Notes Journal Plan free?',
        answer:
          'Yes, it is free to download on Google Play and supported by ads. Google Play does not list in-app purchases for it, and the listing says every customisation feature is available with ads.',
      },
      {
        question: 'Can I keep my journal private?',
        answer:
          'You can lock the app or a notebook where supported, and hide private text from widgets and notification previews.',
      },
      {
        question: 'Does it work offline?',
        answer:
          'The core notes, journal, diary, planner, checklist, reminder and calendar features work offline. Optional tools such as weather, backup, sharing, photos, documents, drawing and audio explain the permissions they need.',
      },
      {
        question: 'What can the widgets show?',
        answer:
          'A selected, pinned or latest note, a quick note, a to-do list, your mood, a daily or monthly calendar, a reminder, a journal streak or a countdown.',
      },
      {
        question: 'Will I lose a note if I switch apps?',
        answer:
          'Notes autosave as you type, and the notepad also saves when you leave the editor, close the keyboard, switch apps or open a widget-created note. Saved drafts can be recovered.',
      },
    ],
    metaTitle: 'Kawaii Cute Notes Journal Plan for Android',
    metaDescription:
      'Cute notes, a private journal, a mood tracker, to-do lists, reminders and home screen widgets in one kawaii-styled app. Free on Google Play.',
  },
];
