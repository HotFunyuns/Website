---
{
  "title": "Timestamps in Transcripts: When to Add Them and How Often",
  "metaTitle": "Transcript Timestamps: When to Add Them and How Often",
  "description": "How to add timestamps to a transcript: why they help, formats from [00:12:41] to SRT subtitles, how often to place them, with a long-interview example.",
  "status": "published",
  "editorialReview": "automated",
  "publishedAt": "2026-10-25",
  "updatedAt": "2026-10-25",
  "author": "reign-creative-llc",
  "category": "video-utility",
  "tags": ["transcription", "timestamps", "interviews", "research", "subtitles"],
  "primaryKeyword": "transcript timestamps",
  "secondaryKeywords": [
    "how to add timestamps to a transcript",
    "timestamp format for transcripts",
    "how often to timestamp a transcript",
    "srt timestamp format",
    "time coded transcript"
  ],
  "intent": "informational",
  "longTailKeywords": [
    "what format should transcript timestamps use",
    "should every line of a transcript have a timestamp",
    "how to timestamp an interview transcript",
    "difference between a transcript and an srt file"
  ],
  "aiSearchQuestions": [
    "Why add timestamps to a transcript?",
    "What format should transcript timestamps use?",
    "How often should you add timestamps?",
    "What is the SRT timestamp format?"
  ],
  "relatedApps": ["transcribe-audio-to-text"],
  "relatedArticles": [
    "how-to-transcribe-an-interview",
    "how-to-transcribe-lectures",
    "verbatim-vs-clean-transcription",
    "subtitles-not-working-on-android"
  ],
  "takeaways": [
    "ATLAS.ti's research guide describes time stamps as helping to locate specific parts of a recording, which can be very helpful during analysis.",
    "For reading transcripts, a simple [hh:mm:ss] marker is enough; subtitle files use the SRT format, hours:minutes:seconds,milliseconds.",
    "Place timestamps at changes of speaker or topic, beside unclear audio, and next to anything you may quote.",
    "Interval timestamps, such as every minute, suit long recordings that will be searched rather than read.",
    "A transcript is for reading; an SRT file is for playing in sync with video. They are different jobs."
  ],
  "disclaimer": "none",
  "featured": false,
  "faqs": [
    {
      "question": "Why add timestamps to a transcript?",
      "answer": "So you can find the matching moment in the recording quickly. ATLAS.ti's research guide notes that time stamps help locate specific parts of the audio recording. That makes it quicker to check a quote, an unclear word or a point you want to hear again."
    },
    {
      "question": "What format should transcript timestamps use?",
      "answer": "For reading, a bracketed [hh:mm:ss] marker, such as [00:12:41], is clear and sorts correctly. Subtitle files use the SRT format, which Wikipedia describes as hours:minutes:seconds,milliseconds, with a start and end time joined by an arrow."
    },
    {
      "question": "How often should I add timestamps?",
      "answer": "At meaningful points rather than at random: each change of speaker or topic, beside any [inaudible] note, and next to anything you may quote. For long recordings you will search later, add interval markers too, such as every minute or two."
    },
    {
      "question": "What is the difference between a transcript and an SRT file?",
      "answer": "A transcript is text meant to be read, with occasional timestamps for reference. An SRT file is a subtitle file: numbered cues, each with exact start and end times, meant to be displayed in sync with a video."
    }
  ],
  "sources": [
    {
      "title": "Transcripts in Research: Overview, Types & Examples",
      "publisher": "ATLAS.ti",
      "url": "https://atlasti.com/guides/qualitative-research-guide-part-2/research-transcripts",
      "accessed": "2026-10-24"
    },
    {
      "title": "SubRip",
      "publisher": "Wikipedia",
      "url": "https://en.wikipedia.org/wiki/SubRip",
      "accessed": "2026-10-24"
    }
  ]
}
---

A transcript without timestamps works until you need to hear something again. Then you are scrubbing through an hour of audio for a sentence you remember reading. Timestamps fix that: small time markers that link the text back to the recording. This guide covers why they help, which format to use, how often to add them and how they differ from subtitles.

## What timestamps are for

ATLAS.ti's guide to research transcripts lists **time stamps** among the elements typically included in an interview transcript, describing them as helping to **locate specific parts of the audio recording**, which can be very helpful during analysis. It also suggests the researcher may add them during review, when the transcript is cross-checked against the recording. In practice, timestamps help you:

- **re-hear a quote** before using it;
- **resolve an unclear word**, marked [inaudible] in the text;
- **find a topic** in a long recording;
- **share a moment** with someone: "listen from 34:10".

## Choosing a format

| Use | Format | Example |
| --- | --- | --- |
| Reading transcripts | [hh:mm:ss] in brackets | [00:12:41] |
| Short recordings, under an hour | [mm:ss] | [12:41] |
| Subtitles (SRT files) | hh:mm:ss,mmm --> hh:mm:ss,mmm | 00:02:16,612 --> 00:02:19,376 |

For reading, keep it simple and consistent. Two-digit, zero-padded parts, such as 00:07:05 rather than 0:7:5, keep times aligned and easy to scan.

The subtitle format is different by design. Wikipedia describes the **SubRip (.srt)** format as numbered subtitles, each with a time it should appear, an arrow, and a time it should disappear, using **hours:minutes:seconds,milliseconds** with two-digit units and three-digit fractions, followed by the subtitle text and a blank line.

## How often to add them

Place timestamps where they will be used:

1. **At every change of topic**, so the transcript works like a table of contents.
2. **At changes of speaker**, in multi-person recordings, if turns are long.
3. **Beside every [inaudible] or [?] note**, so the gap can be checked.
4. **Next to anything you might quote.**

For long recordings that you will mostly **search** rather than read, add **interval timestamps** too, such as every minute or two.

## A worked example: a 90-minute interview

A 90-minute interview covers eight topics. Topic markers give you **8 timestamps**. Add one beside each of roughly a dozen quotable passages and five unclear words, and you have about **25 timestamps**, one every three to four minutes on average. That is enough to find anything in a few seconds without cluttering the text. Interval markers every two minutes would add **45 more**, useful only if you expect to search the interview repeatedly, such as in a research project.

## Adding them in practice

If your transcription tool does not add timestamps, add them while you check the transcript against the audio, which you need to do anyway: when the topic changes, glance at the player's time and type it in. Put the timestamp at the **start** of the paragraph it refers to, before the speaker label: "[00:34:10] Participant 2: ...". The listing for our transcription app does not describe automatic timestamps, so with it, plan on adding them during that review pass.

## Timestamp slips that send you to the wrong moment

- **Editing the audio afterwards.** If you trim the first two minutes from a recording, every timestamp in the transcript is now two minutes out. Timestamp the final version of the audio, or note the offset at the top.
- **Mixing clock time and elapsed time.** "[14:05]" could mean five past two in the afternoon or 14 minutes into the recording. Use elapsed time from the start of the file, and say so in the transcript header.
- **Inconsistent formats.** Switching between 1:05, 01:05 and 00:01:05 makes times hard to scan and sort. Pick one and keep it.
- **Too many markers.** A timestamp on every line turns a readable transcript into a table; place them where someone will actually look.

## Transcripts and subtitles are different jobs

A transcript is for **reading**: paragraphs, speaker labels and occasional timestamps. An SRT file is for **playback**: short, precisely timed cues that a video player shows in sync. Converting one into the other means re-timing every line. If subtitles drift in a video player, the cause can be the timing in the subtitle file or a player setting; [subtitles not working on Android](/blog/subtitles-not-working-on-android/) covers it.

## Where timestamps fit

Timestamps are the finishing step after transcription and style choices; [verbatim versus clean verbatim](/blog/verbatim-vs-clean-transcription/) covers the style, and [transcribing an interview](/blog/how-to-transcribe-an-interview/) and [transcribing lectures](/blog/how-to-transcribe-lectures/) cover the full process. [Transcribe Audio to Text PRO](/apps/transcribe-audio-to-text/), one of our [video and utility apps](/apps/category/video-utility/), turns recordings into transcripts that you can then mark up this way.
