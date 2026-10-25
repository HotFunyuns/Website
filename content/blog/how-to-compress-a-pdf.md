---
{
  "title": "How to Compress a PDF Without Making It Unreadable",
  "metaTitle": "How to Compress a PDF Without Losing Readability",
  "description": "How to compress a PDF without ruining it: why PDFs get big, how image resolution and JPEG quality shrink them, what to check, and the 25 MB email limit.",
  "status": "published",
  "editorialReview": "automated",
  "publishedAt": "2026-10-25",
  "updatedAt": "2026-10-25",
  "author": "reign-creative-llc",
  "category": "video-utility",
  "tags": ["pdf", "compression", "file size", "email attachments", "how-to"],
  "primaryKeyword": "how to compress a pdf",
  "secondaryKeywords": [
    "reduce pdf file size",
    "make a pdf smaller",
    "compress pdf on android",
    "pdf too large to email",
    "pdf compression quality"
  ],
  "intent": "informational",
  "longTailKeywords": [
    "why is my pdf file so large",
    "how to make a scanned pdf smaller",
    "does compressing a pdf reduce quality",
    "how small should a pdf be for email"
  ],
  "aiSearchQuestions": [
    "How do you compress a PDF?",
    "Why are some PDFs so large?",
    "Does compressing a PDF reduce its quality?",
    "How small does a PDF need to be to email it?"
  ],
  "relatedApps": ["pdf-all-in-one-tools"],
  "relatedArticles": [
    "pdf-all-in-one-tools-guide",
    "how-to-merge-pdf-files-on-android",
    "how-to-scan-documents-to-pdf",
    "how-to-convert-images-to-pdf"
  ],
  "takeaways": [
    "In a scanned or photo-based PDF, each page is an image, and those images are where the file size is.",
    "PDF compression shrinks images by lowering their resolution and re-encoding them with lossy compression such as JPEG.",
    "Wikipedia notes JPEG typically achieves about 10:1 compression with a loss in quality that is widely considered acceptable.",
    "A phone photo of a letter-size page holds about six times the pixels of the same page at 150 pixels per inch.",
    "Always open the compressed file and check that small text is still readable before sending it."
  ],
  "disclaimer": "none",
  "featured": false,
  "faqs": [
    {
      "question": "Why is my PDF file so large?",
      "answer": "If it contains scans or phone photos saved at full camera resolution, those images are the likely cause. A 12-megapixel photo holds about 12 million pixels per page, while typed text is stored as characters and fonts, so an image-heavy PDF can be many times larger than a typed document of the same length."
    },
    {
      "question": "Does compressing a PDF reduce quality?",
      "answer": "It can. Compression lowers image resolution and re-encodes images with lossy methods such as JPEG, which discard some detail. Wikipedia describes JPEG's typical 10:1 loss as perceptible but widely agreed to be acceptable; stronger settings can blur small text, so check the result."
    },
    {
      "question": "How small should a PDF be to email?",
      "answer": "It depends on the service. Google's Gmail help says personal Gmail accounts have a 25 MB attachment limit and that larger attachments become Google Drive links. Other email services and web forms set their own limits, so check before sending."
    },
    {
      "question": "Can I compress a scanned PDF on Android?",
      "answer": "Yes. PDF apps such as PDF All in One Tool No Limit include compress tools that reduce file size so scans and image-heavy PDFs are easier to email or send by message."
    }
  ],
  "sources": [
    {
      "title": "JPEG",
      "publisher": "Wikipedia",
      "url": "https://en.wikipedia.org/wiki/JPEG",
      "accessed": "2026-10-24"
    },
    {
      "title": "Dots per inch",
      "publisher": "Wikipedia",
      "url": "https://en.wikipedia.org/wiki/Dots_per_inch",
      "accessed": "2026-10-24"
    },
    {
      "title": "Send attachments with your Gmail message",
      "publisher": "Google Gmail Help",
      "url": "https://support.google.com/mail/answer/6584",
      "accessed": "2026-10-24"
    }
  ]
}
---

When a PDF is too big to send, the pictures inside it are the first place to look. Compression can fix it, but too much compression turns a contract into a blur. This guide explains what makes PDFs large, how compression works, how far to push it and what to check afterwards.

## What takes up the space

A PDF can hold text, fonts, vector graphics and raster images. The first three are compact. **Images** are not: a single phone photo holds millions of pixels, and a scanned document is a stack of photos. That is why a ten-page scanned form can be larger than a hundred-page report typed in a word processor.

## How compression shrinks a PDF

PDF compression works on the images inside in two ways:

1. **Lowers their resolution**, so each page holds fewer pixels.
2. **Re-encodes them with lossy compression**, such as JPEG.

Wikipedia describes JPEG as a lossy method whose degree of compression can be adjusted, trading storage size against image quality, and notes that it **typically achieves about 10:1 compression** with a loss in quality that, while perceptible, is widely agreed to be acceptable. Push harder and the file shrinks further, but artefacts appear, first around sharp edges such as letters.

## A worked example: pixels on a page

Resolution is a powerful lever. Wikipedia's article on dots per inch notes that an image file may record a PPI (pixels per inch) value that tells software the size the image is meant to be. Take a letter-size page, 8.5 × 11 inches:

| Version | Pixels | Megapixels |
| --- | --- | --- |
| Phone photo filling the frame (12 MP camera) | about 4,000 × 3,000 | 12 |
| Page at 300 pixels per inch | 2,550 × 3,300 | 8.4 |
| Page at 150 pixels per inch | 1,275 × 1,650 | 2.1 |

The full-resolution photo holds about **six times** as many pixels as the page at 150 pixels per inch, and halving resolution cuts the pixel count by **four**, because both width and height halve. This example uses 150 pixels per inch as an on-screen target and 300 for print; neither is a fixed rule, so test what keeps your own document legible. Before the JPEG step even starts, lower resolution alone has cut the pixel count by more than five times.

## How far to go

Match the setting to the job:

- **On-screen reading and email**: try a moderate setting first.
- **Printing**: keep more resolution.
- **Fine print, signatures or small numbers**: compress gently and check them closely.
- **Forms you will submit officially**: follow any size and quality rules the recipient gives.

## Check the result

Compression can fail quietly. After compressing, open the new file and zoom in on the smallest text, any signature and any photo that matters. If something is fuzzy, go back to the original and use a lighter setting. Keep the original until the compressed version has been accepted.

## Which PDFs shrink, and which do not

Compression results vary, and the reason is what the file contains:

- **Scans and photo-based PDFs** shrink the most, because nearly all their size is image data that can be resampled and re-encoded.
- **Documents exported from a word processor** are already compact; compressing them may save little, because most of their content is text and fonts.
- **Mixed documents**, such as a report with photos, shrink in proportion to how much of the file the photos take up.

If a typed document is unexpectedly large, look for one huge embedded image, such as a full-resolution logo or photo, rather than compressing everything.

## When compression is not enough

If a file is still too big after a reasonable compression, do not keep squeezing it until the text blurs. Split it into parts instead, for example one file per section, and send them separately; [how to split a PDF](/blog/how-to-split-a-pdf/) explains how. Or share it as a link through a cloud storage service if the recipient accepts that.

## Why size matters when sending

Google's Gmail help gives a **25 MB** attachment limit for personal accounts; larger attachments are turned into Google Drive links instead. Messaging apps and upload forms may set their own limits. If a merged file is over the line, compress it or the image-heavy parts before merging; [merging PDFs on Android](/blog/how-to-merge-pdf-files-on-android/) has a worked example.

## Avoid making big files in the first place

The easiest PDF to compress is one that was never oversized. When scanning, crop to the page and use a document mode rather than a full photo; [scanning documents to PDF](/blog/how-to-scan-documents-to-pdf/) covers that. When building a PDF from photos, [images to PDF](/blog/how-to-convert-images-to-pdf/) explains why the image format matters.

## Compressing on Android

[PDF All in One Tool No Limit](/apps/pdf-all-in-one-tools/), one of our [video and utility apps](/apps/category/video-utility/), includes compress tools that reduce file size so reports, scans and image-heavy PDFs are easier to email or send by message. Compression settings and their names vary between apps and versions, so check the result whatever the tool calls its options. [The app guide](/blog/pdf-all-in-one-tools-guide/) shows where compression fits in a full workflow.
