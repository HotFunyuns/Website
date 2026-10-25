---
{
  "title": "How to Sign a PDF on Android, and What an Image Signature Is (and Is Not)",
  "metaTitle": "How to Sign a PDF on Android: Steps and Legal Basics",
  "description": "How to sign a PDF on Android, how an image signature differs from a certificate-based digital signature, and what the US ESIGN Act does and does not cover.",
  "status": "published",
  "editorialReview": "automated",
  "publishedAt": "2026-10-25",
  "updatedAt": "2026-10-25",
  "author": "reign-creative-llc",
  "category": "video-utility",
  "tags": ["pdf", "e-signatures", "android", "documents", "esign act"],
  "primaryKeyword": "how to sign a pdf on android",
  "secondaryKeywords": [
    "sign pdf on phone",
    "electronic signature pdf",
    "digital signature vs electronic signature",
    "is an electronic signature legal",
    "esign act"
  ],
  "intent": "informational",
  "longTailKeywords": [
    "how to add a signature to a pdf on my phone",
    "is a signature image on a pdf legally binding",
    "what documents cannot be signed electronically",
    "what is a digital signature in a pdf"
  ],
  "aiSearchQuestions": [
    "How do you sign a PDF on an Android phone?",
    "Is an electronic signature legally valid in the US?",
    "What is the difference between an electronic signature and a digital signature?",
    "Which documents cannot be signed electronically under US law?"
  ],
  "relatedApps": ["pdf-all-in-one-tools"],
  "relatedArticles": [
    "how-to-fill-in-a-pdf-form",
    "pdf-all-in-one-tools-guide",
    "how-to-password-protect-a-pdf",
    "pdf-vs-pdf-a"
  ],
  "takeaways": [
    "A drawn or saved signature placed on a PDF is an image on the page, not cryptographic proof of who signed.",
    "The US ESIGN Act says a signature or contract may not be denied legal effect solely because it is electronic.",
    "ESIGN has exceptions, including wills, family-law matters such as adoption and divorce, court documents and some eviction and foreclosure notices.",
    "A certificate-based digital signature, provided for in the PDF standard, is mathematically bound to the signed content and can reveal later changes; an image cannot.",
    "Check what the recipient requires, and keep a copy of what you signed."
  ],
  "disclaimer": "none",
  "featured": false,
  "faqs": [
    {
      "question": "How do you sign a PDF on an Android phone?",
      "answer": "Open the PDF in an app with a signature tool, fill in any fields, create your signature (in many tools by drawing it with a finger or stylus), place it on the signature line, then save a copy and check it before sending. Exact controls differ between apps."
    },
    {
      "question": "Is an electronic signature legally valid in the US?",
      "answer": "For transactions covered by the federal law, with exceptions. The ESIGN Act, 15 U.S.C. 7001, says a signature, contract or other record relating to a transaction in interstate or foreign commerce may not be denied legal effect solely because it is in electronic form. It does not require anyone to agree to use or accept electronic signatures, and this is general information, not legal advice."
    },
    {
      "question": "Which documents cannot be signed electronically under ESIGN?",
      "answer": "Section 7003 excludes, among others, wills, codicils and testamentary trusts; adoption, divorce and other family-law matters; court orders and official court documents; and certain notices, such as utility shut-offs and default, foreclosure or eviction notices for a primary residence. The family-law exception refers to state law, so check local rules too."
    },
    {
      "question": "What is the difference between an electronic and a digital signature?",
      "answer": "Wikipedia describes an electronic signature as any electronic data that carries the intent of a signature, such as a drawn signature image. A digital signature is a public-key cryptography scheme that is mathematically bound to the signed content; Wikipedia notes the PDF standard sets out how PDFs are digitally signed."
    }
  ],
  "sources": [
    {
      "title": "15 U.S. Code § 7001: General rule of validity",
      "publisher": "Legal Information Institute, Cornell Law School",
      "url": "https://www.law.cornell.edu/uscode/text/15/7001",
      "accessed": "2026-10-24"
    },
    {
      "title": "15 U.S. Code § 7003: Specific exceptions",
      "publisher": "Legal Information Institute, Cornell Law School",
      "url": "https://www.law.cornell.edu/uscode/text/15/7003",
      "accessed": "2026-10-24"
    },
    {
      "title": "PDF",
      "publisher": "Wikipedia",
      "url": "https://en.wikipedia.org/wiki/PDF",
      "accessed": "2026-10-24"
    },
    {
      "title": "Digital signature",
      "publisher": "Wikipedia",
      "url": "https://en.wikipedia.org/wiki/Digital_signature",
      "accessed": "2026-10-25"
    }
  ]
}
---

To sign a PDF on Android, open it in an app with a signature tool, fill in any fields, add your signature on the signature line and save a copy. This guide covers those steps, the difference between a signature image placed on a page and the cryptographic "digital signature" the PDF format supports, and a short note on where US federal law stands. It is general information, not legal advice.

## Signing on Android, step by step

In [PDF All in One Tool No Limit](/apps/pdf-all-in-one-tools/), the fill-and-sign tools let you complete fields, add text and sign a document. Button names and options differ between apps, so treat this as a general order of work:

1. **Open the PDF** and fill in any fields first, so the signature goes on the final version.
2. **Create your signature**: if the tool asks you to draw it, go slowly with a finger or stylus.
3. **Place it** on the signature line and resize it to fit the space.
4. **Add the date** with the text tool if the form asks for one.
5. **Save as a new file**, keeping the unsigned original.
6. **Check the result** at full size before sending.

If your app keeps a saved signature for reuse, protect the phone with a screen lock, since anyone using it could place that signature on a document.

## What that signature is

A drawn or saved signature is an **image placed on the page**. It shows that someone applied your mark. On its own it does not prove who placed it, or that the document was not changed afterwards.

The PDF format offers something stronger. Wikipedia notes that PDF files may be **digitally signed** to provide secure authentication, with the details set out in the PDF standard, ISO 32000-2, and that **PAdES**, published by ETSI, extends PDF to make it suitable for advanced electronic signatures. Wikipedia's digital signature article explains that such a signature is a type of public-key cryptography, mathematically bound to the content it signs, and that a signature applied to a whole document will indicate tampering if data on any page has been altered. It also notes that not all electronic signatures use digital signatures, and the PDF article warns that, under specific circumstances such as unpatched software on the receiver's side, what a recipient sees can still be manipulated after signing.

| | Image signature | Certificate-based digital signature |
| --- | --- | --- |
| What it is | A picture of your signature on the page | Cryptographic data tied to a certificate |
| Shows who signed | Only by appearance | Through the signer's key and certificate |
| Reveals later edits | No | Designed to |
| When to use it | When the recipient accepts it | When the recipient or process requires it |

## Where US law stands

The federal **Electronic Signatures in Global and National Commerce Act**, known as ESIGN, provides in 15 U.S.C. 7001 that, for transactions in or affecting interstate or foreign commerce, a signature, contract or other record **may not be denied legal effect, validity or enforceability solely because it is in electronic form**. The same section also says it does not **require** anyone to agree to use or accept electronic records or signatures, other than certain government agencies.

ESIGN also has **exceptions**. Section 7003 says the general rule does not apply to records governed by laws on:

- **wills, codicils and testamentary trusts**;
- **adoption, divorce and other family-law matters**;
- the Uniform Commercial Code, other than a few listed sections and Articles 2 and 2A;

and does not apply to **court orders and official court documents**, notices of **utility shut-off**, notices of **default, foreclosure or eviction** for a primary residence, cancellations of **health or life insurance**, notices of **product recalls** or failures that risk health or safety, and documents accompanying **hazardous materials**. The family-law exception refers to state law, so local rules matter too.

## A worked example: three documents

- **A gym membership agreement**: a commercial contract, so ESIGN's general rule can apply, but section 7001 also says the gym is not required to accept an electronic signature. Ask what it accepts.
- **A residential lease**: the lease itself is a contract, but section 7003 excludes notices of default or eviction under a rental agreement for a primary residence, so those notices fall outside ESIGN's general rule even if the lease was signed electronically.
- **A will**: section 7003 excludes laws governing the creation and execution of wills, so ESIGN's general rule does not apply; the formal rules where you live decide what is valid.

In each case the statute only sets the federal baseline; the recipient and local law decide the rest, so ask rather than assume.

## After signing

Read every page before you sign, not just the page with the signature line, and avoid signing a document with blanks that someone else could fill in later. If the recipient requires a certificate-based signature, ask which signing service or certificate they expect. Keep a copy of exactly what you signed. If the document is sensitive, consider [password-protecting the PDF](/blog/how-to-password-protect-a-pdf/) before sending, and for long-term records see [PDF versus PDF/A](/blog/pdf-vs-pdf-a/). [Filling in a PDF form](/blog/how-to-fill-in-a-pdf-form/) covers the step before signing.

PDF All in One Tool No Limit is one of our [video and utility apps](/apps/category/video-utility/); [its guide](/blog/pdf-all-in-one-tools-guide/) covers the other PDF jobs.
