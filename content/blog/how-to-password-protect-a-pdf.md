---
{
  "title": "How to Password-Protect a PDF: Open Passwords, Permissions and Encryption",
  "metaTitle": "How to Password-Protect a PDF: What It Does and Doesn't",
  "description": "How to password-protect a PDF: open versus permissions passwords, AES-256 encryption, why restrictions can be bypassed and how to pick a strong password.",
  "status": "published",
  "editorialReview": "automated",
  "publishedAt": "2026-10-25",
  "updatedAt": "2026-10-25",
  "author": "reign-creative-llc",
  "category": "video-utility",
  "tags": ["pdf", "passwords", "encryption", "security", "documents"],
  "primaryKeyword": "password protect pdf",
  "secondaryKeywords": [
    "how to put a password on a pdf",
    "pdf open password vs permissions password",
    "pdf encryption aes 256",
    "secure a pdf before emailing",
    "pdf owner password"
  ],
  "intent": "informational",
  "longTailKeywords": [
    "is a password protected pdf secure",
    "can pdf restrictions be removed",
    "how long should a pdf password be",
    "how to send a pdf password safely"
  ],
  "aiSearchQuestions": [
    "How do you password-protect a PDF?",
    "What is the difference between an open password and a permissions password?",
    "Is a password-protected PDF actually secure?",
    "How long should a PDF password be?"
  ],
  "relatedApps": ["pdf-all-in-one-tools"],
  "relatedArticles": [
    "pdf-vs-pdf-a",
    "how-to-sign-a-pdf-on-android",
    "how-to-scan-documents-to-pdf",
    "pdf-all-in-one-tools-guide"
  ],
  "takeaways": [
    "A PDF can have two passwords: a user (open) password that encrypts the file, and an owner (permissions) password that sets restrictions.",
    "Only the open password actually encrypts; Wikipedia notes owner-password restrictions rely on software and can easily be removed.",
    "PDF 2.0 defines 256-bit AES encryption as its standard method.",
    "NIST's current guidance calls for passwords of at least 15 characters when a password is the only factor, and says verifiers shall not impose composition rules such as forced character mixes.",
    "Send the password by a different channel from the file, and remember the Library of Congress notes encryption is disallowed in PDF/A."
  ],
  "disclaimer": "none",
  "featured": false,
  "faqs": [
    {
      "question": "Is a password-protected PDF actually secure?",
      "answer": "If it uses an open (user) password with strong encryption and a strong password, the contents are encrypted. Restrictions set only with an owner (permissions) password are weak: Wikipedia notes they rely on viewer software to respect them and can easily be removed."
    },
    {
      "question": "What is the difference between an open password and a permissions password?",
      "answer": "An open, or user, password is needed to view the document and encrypts the file. A permissions, or owner, password restricts actions such as printing, copying or editing when the file is opened, but does not by itself encrypt it."
    },
    {
      "question": "How long should a PDF password be?",
      "answer": "Long. NIST's SP 800-63B guidance requires passwords used as a single factor to be at least 15 characters, and recommends allowing at least 64. A passphrase of several random words is easier to remember than a short string of symbols."
    },
    {
      "question": "How should I send the password for a protected PDF?",
      "answer": "By a different channel from the file, such as a text message or phone call when the PDF goes by email. If both travel together, anyone who intercepts one has both."
    }
  ],
  "sources": [
    {
      "title": "PDF",
      "publisher": "Wikipedia",
      "url": "https://en.wikipedia.org/wiki/PDF",
      "accessed": "2026-10-24"
    },
    {
      "title": "Add passwords to PDFs in Acrobat",
      "publisher": "Adobe",
      "url": "https://helpx.adobe.com/acrobat/using/securing-pdfs-passwords.html",
      "accessed": "2026-10-24"
    },
    {
      "title": "NIST Special Publication 800-63B: Digital Identity Guidelines, Authentication and Authenticator Management",
      "publisher": "National Institute of Standards and Technology",
      "url": "https://pages.nist.gov/800-63-4/sp800-63b.html",
      "accessed": "2026-10-24"
    },
    {
      "title": "PDF/A Family, PDF for Long-term Preservation",
      "publisher": "Library of Congress, Sustainability of Digital Formats",
      "url": "https://www.loc.gov/preservation/digital/formats/fdd/fdd000318.shtml",
      "accessed": "2026-10-24"
    }
  ]
}
---

"Password-protected" can mean two quite different things for a PDF, and only one of them keeps the contents private. This guide explains the two kinds of PDF password, what the encryption does, why some "protections" are easy to remove, and how to choose and share a password sensibly.

## Two passwords, two jobs

Wikipedia describes the standard PDF security model as two methods with two passwords:

| Password | Also called | What it does | Encrypts the file? |
| --- | --- | --- | --- |
| User password | Open or document-open password | Needed to open and view the document | Yes |
| Owner password | Permissions password | Restricts actions such as printing, copying, editing or changing form fields | No |

Adobe's Acrobat help presents the same choice as setting a password for **viewing** or for **editing**. If what you want is privacy, the user (open) password is the one that matters.

## What encryption protects

Wikipedia notes that when a PDF is encrypted, a password is needed to view or edit the contents. It adds that **PDF 2.0 defines 256-bit AES encryption** as its standard. Where an app offers a choice of encryption, pick the strongest option it lists; Adobe's help notes that the advanced options in Acrobat can encrypt a PDF using a password or a certificate.

Encryption is only as strong as the password, though. A long, unguessable password matters more than the algorithm.

## Why permission restrictions are weak

Restrictions set with only an owner password are a request, not a lock. Wikipedia explains that the owner password does not encrypt the file and instead **relies on client software to respect the restrictions**; an owner password can easily be removed by software, including some free online services, and most freeware or open-source PDF readers ignore the permissions, according to the same article. It adds that Adobe Acrobat displays a warning to this effect when such restrictions are applied.

So "no printing" or "no copying" settings will deter casual users, but they do not stop a determined one. Never rely on them for confidential information.

## Choosing a strong password

The US National Institute of Standards and Technology's current digital identity guidelines, **SP 800-63B**, set clear rules for services that use passwords:

- passwords used as a single factor should be **at least 15 characters** long;
- systems should allow passwords of **at least 64 characters**;
- systems should **not impose composition rules**, such as forcing a mix of character types.

For a PDF, that points to a **passphrase**: several random words, such as an unrelated four- or five-word string, long and easy to type.

## A worked example: sending a payslip

You need to email a payslip PDF to an accountant.

1. Add a **user (open) password** of at least 15 characters, using the strongest encryption on offer.
2. **Email the PDF.**
3. **Send the password separately**, by text message or phone call, never in the same email.
4. Ask the recipient to **store the file securely** once opened.

If you also add a permissions password to stop printing, treat it as a courtesy, not as security.

## What a password does not protect

Encryption protects the file in transit and at rest, not after it is opened. Once a recipient enters the password, they can read, screenshot or retype the contents, so a password controls who can open a document, not what they do with it. The file name, the email subject and the message around the attachment are not inside the PDF, so they are not encrypted either: "Smith tax return 2026.pdf" in a subject line says a lot before anyone opens anything. Use neutral names and subjects for sensitive files, and send only the pages the recipient needs.

## When not to encrypt

Some files should not carry a password. The Library of Congress notes that **encryption is disallowed in PDF/A**, the archival PDF format, which it describes as constrained to avoid external dependencies; [PDF versus PDF/A](/blog/pdf-vs-pdf-a/) explains the format. For long-term records, keep an unencrypted PDF/A copy in an access-controlled place instead. And remember that a forgotten open password can mean a lost document: keep it somewhere safe, such as a password manager.

## Protecting PDFs on Android

[PDF All in One Tool No Limit](/apps/pdf-all-in-one-tools/), one of our [video and utility apps](/apps/category/video-utility/), includes protection tools to help you manage sensitive paperwork, alongside tools to scan, sign and compress documents. Scans of identity documents and statements are obvious candidates; menus differ between apps and versions, so look for the protection or security tools; [scanning documents to PDF](/blog/how-to-scan-documents-to-pdf/) covers creating them, and [signing a PDF on Android](/blog/how-to-sign-a-pdf-on-android/) a step that may come before protecting one.
