---
{
  "title": "What Is OCR? How Scanned Text Becomes Searchable",
  "metaTitle": "What Is OCR? How Scanned Text Becomes Searchable",
  "description": "What OCR is and how it works: pre-processing, recognition, why accuracy is quoted per character, what a 99% rate really means, and how to get better results.",
  "status": "published",
  "editorialReview": "automated",
  "publishedAt": "2026-10-25",
  "updatedAt": "2026-10-25",
  "author": "reign-creative-llc",
  "category": "video-utility",
  "tags": ["ocr", "scanning", "pdf", "text recognition", "documents"],
  "primaryKeyword": "what is ocr",
  "secondaryKeywords": [
    "optical character recognition explained",
    "how does ocr work",
    "searchable pdf",
    "ocr accuracy",
    "ocr vs icr"
  ],
  "intent": "informational",
  "longTailKeywords": [
    "how to make a scanned pdf searchable",
    "why does ocr make mistakes",
    "can ocr read handwriting",
    "how accurate is ocr software"
  ],
  "aiSearchQuestions": [
    "What is OCR?",
    "How does optical character recognition work?",
    "How accurate is OCR?",
    "Can OCR read handwriting?"
  ],
  "relatedApps": ["pdf-all-in-one-tools"],
  "relatedArticles": [
    "how-to-scan-documents-to-pdf",
    "pdf-vs-pdf-a",
    "how-to-fill-in-a-pdf-form",
    "pdf-all-in-one-tools-guide"
  ],
  "takeaways": [
    "OCR, optical character recognition, converts images of typed, printed or handwritten text into machine-encoded text.",
    "Before recognising characters, OCR software often pre-processes the image: straightening the page, removing specks, separating text from background and working out the layout.",
    "Accuracy is not perfect: one study of old newspapers found character accuracy from 81% to 99% across commercial software.",
    "Without a lexicon to correct non-words, a 1% character error rate can mean a word error rate of 5% or worse.",
    "Handwriting is harder; related techniques called ICR and IWR target handwritten text."
  ],
  "disclaimer": "none",
  "featured": false,
  "faqs": [
    {
      "question": "What is OCR?",
      "answer": "Optical character recognition: the conversion of images of typed, handwritten or printed text into machine-encoded text, whether from a scan, a photo of a document or text in a scene. It is what makes a scanned PDF searchable and copyable."
    },
    {
      "question": "How accurate is OCR?",
      "answer": "It varies with the source. Wikipedia cites a study of 19th- and early 20th-century newspaper pages that found character accuracy for commercial OCR software of 81% to 99%. It adds that total accuracy can be achieved by human review, so check important text by eye."
    },
    {
      "question": "Why does a 99% OCR accuracy still produce errors?",
      "answer": "Because accuracy can be measured per character or per word. Wikipedia notes that, if a lexicon is not used to correct non-existent words, a 1% character error rate may mean an error rate of 5% or worse when measured by whole words, since one wrong letter spoils a word."
    },
    {
      "question": "Can OCR read handwriting?",
      "answer": "Partly. Wikipedia describes related techniques, intelligent character recognition and intelligent word recognition, that target handwritten print and cursive, usually with machine learning. Wikipedia says recognition of hand printing and cursive handwriting is still the subject of active research, so check handwritten output carefully."
    }
  ],
  "sources": [
    {
      "title": "Optical character recognition",
      "publisher": "Wikipedia",
      "url": "https://en.wikipedia.org/wiki/Optical_character_recognition",
      "accessed": "2026-10-24"
    },
    {
      "title": "Scan documents with Google Drive (Android)",
      "publisher": "Google Drive Help",
      "url": "https://support.google.com/drive/answer/3145835?co=GENIE.Platform%3DAndroid&hl=en",
      "accessed": "2026-10-24"
    }
  ]
}
---

A scanned page looks like text, but to a computer it is a picture. You cannot search it, copy a sentence from it or have it read aloud until software works out which shapes are which letters. That software is **OCR**. This guide explains how it works, how accurate it is and how to get better results, drawing on Wikipedia's article on optical character recognition.

## What OCR does

Wikipedia defines optical character recognition as the conversion of **images of typed, handwritten or printed text into machine-encoded text**, whether from a scanned document, a photo of a document, a photo of a scene such as a street sign, or subtitles on a video. Its uses include data entry from invoices, receipts and passports, and making scanned documents searchable by converting them to PDFs. Google's help for the Google Drive scanner, for example, says it saves receipts, letters and billing statements as **searchable PDFs**.

Wikipedia notes that more sophisticated OCR systems can preserve the page layout and produce a PDF that includes both the original image of the page and a searchable textual representation. You see the scan; search and copy use the text.

## How it works, step by step

Wikipedia's article breaks the process into stages:

1. **Pre-processing.** Wikipedia says OCR software often pre-processes images, and lists techniques including **de-skewing** a tilted page so lines run straight, **despeckling** spots, **binarisation** (turning the image black and white to separate text from background), removing lines and boxes, and **layout analysis**, which identifies columns, paragraphs and captions.
2. **Line, word and character detection**, including separating characters that touch and joining ones broken by artefacts.
3. **Recognition.** The software compares each shape with known characters, either by matching patterns or by extracting features such as lines, loops and intersections. Wikipedia notes that some engines, such as Cuneiform and Tesseract, take a second pass, using letters recognised confidently the first time to read the rest.
4. **Post-processing**, where word lists and context can correct likely mistakes. Wikipedia notes that constraining the output to a **lexicon**, a list of words allowed to appear, can raise accuracy, but can cause problems when a document contains words outside it, such as proper nouns. That is a good reason to check surnames and place names in OCR output by eye.

## How accurate is it?

Not perfect. Wikipedia notes that recognising typewritten Latin-script text is **still not 100% accurate even with clear images**, and cites a study of 19th- and early 20th-century newspaper pages that found character-by-character accuracy for commercial OCR software ranging from **81% to 99%**. Wikipedia adds that recognition of hand printing, cursive handwriting and printed text in some other scripts, especially East Asian characters with many strokes, is still the subject of active research.

How accuracy is measured matters too. **A worked example:** a typed page of 2,000 characters read at 99% character accuracy contains about **20 wrong characters**. If words average five letters plus a space, the page has about 333 words, and those 20 errors can spoil up to 20 of them, about 6%. Wikipedia makes the same point: without a lexicon to correct non-existent words, a **1% character error rate can become a 5% or worse word error rate** when every word must be perfect.

## OCR, ICR and IWR

Wikipedia describes related techniques for handwriting. **Intelligent character recognition** (ICR) targets handwritten print or cursive one character at a time, usually with machine learning; **intelligent word recognition** (IWR) works a word at a time, which helps with joined-up scripts. If your documents are handwritten notes, check the output closely.

## Getting better OCR results

Wikipedia's list of pre-processing steps shows what the software may have to fix, and a better scan gives it less to correct:

- **Light the page evenly**, so binarisation can separate text from background.
- **Hold the phone parallel to the page**, so de-skewing has less to do.
- **Fill the frame**, so characters have enough pixels; [scanning documents to PDF](/blog/how-to-scan-documents-to-pdf/) works out the resolution.
- **Use black and white or greyscale** for plain text.
- **Check names, numbers and dates** by eye: a misread digit in an account number is worse than a misread vowel.

## Why OCR matters for archives

Recognised text makes old documents findable. For records you plan to keep, combine OCR with an archival format; [PDF versus PDF/A](/blog/pdf-vs-pdf-a/) explains how the PDF/A levels treat searchable text. And if you need to fill in a scanned form, OCR alone will not add form fields; [filling in a PDF form](/blog/how-to-fill-in-a-pdf-form/) covers what to do instead.

[PDF All in One Tool No Limit](/apps/pdf-all-in-one-tools/), one of our [video and utility apps](/apps/category/video-utility/), includes a document scanner for turning paper into PDFs, along with tools to annotate, merge and compress them; [its guide](/blog/pdf-all-in-one-tools-guide/) maps the PDF jobs to the tools.
