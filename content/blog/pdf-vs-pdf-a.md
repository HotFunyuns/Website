---
{
  "title": "PDF vs PDF/A: What the Archival Format Changes",
  "metaTitle": "PDF vs PDF/A: What the Archival Format Changes",
  "description": "PDF vs PDF/A explained: what the ISO 19005 archival format forbids and requires, how PDF/A-1 to PDF/A-4 differ, and when a document should be saved as PDF/A.",
  "status": "published",
  "editorialReview": "automated",
  "publishedAt": "2026-10-25",
  "updatedAt": "2026-10-25",
  "author": "reign-creative-llc",
  "category": "video-utility",
  "tags": ["pdf", "pdf/a", "archiving", "file formats", "documents"],
  "primaryKeyword": "pdf vs pdf/a",
  "secondaryKeywords": [
    "what is pdf/a",
    "pdf/a requirements",
    "pdf/a-1 vs pdf/a-2 vs pdf/a-3",
    "pdf/a for archiving",
    "convert pdf to pdf/a"
  ],
  "intent": "informational",
  "longTailKeywords": [
    "why is pdf/a used for archiving",
    "can a pdf/a file be password protected",
    "what is the difference between pdf/a-2b and pdf/a-2u",
    "when should i save a pdf as pdf/a"
  ],
  "aiSearchQuestions": [
    "What is the difference between PDF and PDF/A?",
    "What does PDF/A forbid?",
    "What are the versions of PDF/A?",
    "When should a document be saved as PDF/A?"
  ],
  "relatedApps": ["pdf-all-in-one-tools"],
  "relatedArticles": [
    "how-to-password-protect-a-pdf",
    "how-to-sign-a-pdf-on-android",
    "ocr-explained",
    "pdf-all-in-one-tools-guide"
  ],
  "takeaways": [
    "PDF/A is an ISO standard, ISO 19005, for PDFs meant for long-term preservation; ordinary PDF is ISO 32000.",
    "PDF/A-1 to PDF/A-3 forbid audio, video, JavaScript and encryption, and require embedded fonts and device-independent colour.",
    "PDF/A-1 (2005) is based on PDF 1.4, PDF/A-2 (2011) and PDF/A-3 (2012) on PDF 1.7, and PDF/A-4 (2020) on PDF 2.0.",
    "Level A satisfies all of PDF/A-1 to -3's requirements; levels B and U still guarantee visual appearance but ask less about structure and meaning.",
    "The Library of Congress lists PDF/A as a preferred format for textual works in digital form."
  ],
  "disclaimer": "none",
  "featured": false,
  "faqs": [
    {
      "question": "What is the difference between PDF and PDF/A?",
      "answer": "PDF/A is a constrained version of PDF for long-term preservation, standardised as ISO 19005. It removes features that make a file depend on outside resources or behaviour, such as unembedded fonts, JavaScript, audio and video and encryption, so the document should display the same way in the future."
    },
    {
      "question": "Can a PDF/A file be password protected?",
      "answer": "No. The Library of Congress notes that encryption is disallowed in PDF/A-1, PDF/A-2 and PDF/A-3, and states more generally that PDF/A does not permit encryption. Protect PDF/A files by controlling where they are stored instead."
    },
    {
      "question": "What do PDF/A-2b and PDF/A-2u mean?",
      "answer": "They are conformance levels of PDF/A-2. The Library of Congress explains that level A satisfies all the requirements, while B and U are lower levels that still guarantee visual appearance; the PDF Association calls the three Accessible, Basic and Unicode. PDF/A-4 dropped these levels in favour of two profiles."
    },
    {
      "question": "When should I save a document as PDF/A?",
      "answer": "When it needs to be read years from now exactly as it looks today: contracts, records, theses and official submissions, especially if a recipient asks for PDF/A. Everyday drafts and files you will edit again can stay as ordinary PDF."
    }
  ],
  "sources": [
    {
      "title": "PDF/A Family, PDF for Long-term Preservation",
      "publisher": "Library of Congress, Sustainability of Digital Formats",
      "url": "https://www.loc.gov/preservation/digital/formats/fdd/fdd000318.shtml",
      "accessed": "2026-10-24"
    },
    {
      "title": "PDF",
      "publisher": "Wikipedia",
      "url": "https://en.wikipedia.org/wiki/PDF",
      "accessed": "2026-10-24"
    }
  ]
}
---

A PDF looks permanent, but it is not always self-contained. It can depend on fonts installed on the viewer's computer, run scripts, play media or require a password. **PDF/A** is the version of PDF designed to remove those dependencies, so a document can still be opened and displayed the same way long into the future. This guide explains what changes, drawing on the Library of Congress's format description.

## Two standards

Ordinary PDF is standardised as **ISO 32000**; Wikipedia notes the latest edition, ISO 32000-2:2020, was published in December 2020. PDF/A is a separate family of standards, **ISO 19005**, that takes a version of PDF and constrains it for preservation. The Library of Congress describes PDF/A as constrained to **avoid external dependencies**: everything needed to display the file must be inside it.

## What PDF/A forbids and requires

For PDF/A-1, PDF/A-2 and PDF/A-3, the Library of Congress lists these constraints:

| Rule (Library of Congress) | Why it matters for preservation (our reading) |
| --- | --- |
| Audio, video and 3D artwork are forbidden | Players and formats change; pages should stand alone |
| JavaScript and launching executable files are prohibited | Behaviour cannot be guaranteed in future software |
| All fonts must be embedded, and legally embeddable | Text must look the same without the original fonts installed |
| Colour spaces must be device-independent | Colours should not depend on one screen or printer |
| Encryption is disallowed | No password should stand between a future reader and the file |
| Standards-based metadata is mandatory | The file must describe itself |

## The versions

| Version | Standard | Based on | What it added |
| --- | --- | --- | --- |
| PDF/A-1 | ISO 19005-1:2005 | PDF 1.4 | The first archival PDF |
| PDF/A-2 | ISO 19005-2:2011 | PDF 1.7 (ISO 32000-1) | Newer PDF features; embedding PDF/A-compliant attachments |
| PDF/A-3 | ISO 19005-3:2012 | PDF 1.7 | Embedding files in any format |
| PDF/A-4 | ISO 19005-4:2020 | PDF 2.0 (ISO 32000-2) | Two profiles, PDF/A-4f and PDF/A-4e; JavaScript may be stored but not run automatically |

PDF/A-3's change is significant: it lets a PDF/A carry attachments in any format, such as a spreadsheet behind a report. The Library of Congress notes that many proponents intended such attachments not to be considered part of the archival payload, though use cases are emerging where they would likely warrant preservation too.

## Conformance levels: B, U and A

PDF/A-1, -2 and -3 define levels of conformance. The Library of Congress explains that **level A** satisfies all the requirements, while **levels B and U** are lower levels: they still guarantee the document's **visual appearance** but demand less about how its structure and meaning are represented. The Library of Congress adds that the PDF Association uses the names **Accessible**, **Basic** and **Unicode** for the three levels, terms the ISO standards themselves do not use, and that level B is the level typically used for PDF/A files created from scanned pages. PDF/A-4 drops the three levels and instead offers two profiles: PDF/A-4f, which allows embedded files of any format, and PDF/A-4e for engineering documents.

## A worked example: one report, two saves

You finish a report with a company font that is not embedded, a video clip and a password. Saved as ordinary PDF, it opens fine today on your own computer. Saved as PDF/A-2b, the conversion must **embed the font**, **drop the video** and **remove the password**. The PDF/A copy is less interactive, but it does not depend on your fonts, your video player or your memory of a password. That is the trade.

## Who uses it

The Library of Congress's Recommended Format Statement lists PDF/A as a **preferred format** for textual works in digital form, electronic serials and digital musical scores, and notes that several European governments mandated PDF/A in some contexts within a few years of its introduction in 2005. If a recipient asks for PDF/A, check whether their rules name a particular version or conformance level.

## When to choose which

- **Ordinary PDF**: drafts, interactive forms, files you will edit again and documents that must stay password-protected.
- **PDF/A**: final records you will keep for years, theses, contracts after signature and any submission that asks for it.

A password and PDF/A do not mix: if a file must be both private and archival, store the PDF/A copy somewhere access-controlled rather than encrypting it. [Password-protecting a PDF](/blog/how-to-password-protect-a-pdf/) explains the alternatives, and [OCR explained](/blog/ocr-explained/) covers making scanned archives searchable.

[PDF All in One Tool No Limit](/apps/pdf-all-in-one-tools/), one of our [video and utility apps](/apps/category/video-utility/), covers everyday PDF jobs on Android, from scanning to compressing and protecting files; [its guide](/blog/pdf-all-in-one-tools-guide/) maps them.
