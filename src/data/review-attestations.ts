/**
 * Company-level review attestations — the record behind the label
 * "Reviewed by Reign Creative Editorial Team".
 *
 * A person's review of one article is recorded on that article (reviewerName,
 * reviewDate, sourcesChecked, reviewNotes). An attestation is different: the
 * company's own statement that a defined set of articles was reviewed by people
 * at the company, given by the owner in writing. It names no individual, invents
 * no per-article detail, and the label it supports says only what the statement
 * says. An article opts in with `"editorialReview": "organization"` and
 * `"reviewAttestation": "<id>"`; the build rejects an unknown id or an article
 * outside the attestation's scope.
 *
 * Only the owner adds an entry here, in their own words. An agent may transcribe
 * a statement the owner gave, as the first entry was, but never compose one.
 */
export interface ReviewAttestation {
  id: string;
  /** Exactly what the article label shows after "Reviewed by". */
  label: string;
  /** The Los Angeles day the statement was given. */
  attestedOn: string;
  /** Who gave it, by role. */
  attestedBy: string;
  /** The statement, verbatim. */
  statement: string;
  /** Where and how it was given. */
  source: string;
  /** Which articles it covers, in words; `publishedOnOrBefore` is the machine-checked rule. */
  scope: string;
  /** Articles published after this day are outside the attestation. */
  publishedOnOrBefore: string;
}

export const reviewAttestations: ReviewAttestation[] = [
  {
    id: 'library-2026-10-24',
    label: 'Reign Creative Editorial Team',
    attestedOn: '2026-10-24',
    attestedBy: 'The owner of Reign Creative LLC',
    statement: 'The owner confirms that the currently published article library received human review.',
    source:
      'The owner’s written brief for the October 2026 site release, given in the working session on 24 October 2026.',
    scope: 'Every article that was published on the site on 24 October 2026 — the 651 articles dated 9 August to 2 October 2026.',
    publishedOnOrBefore: '2026-10-02',
  },
];

export function getReviewAttestation(id: string | undefined): ReviewAttestation | undefined {
  return reviewAttestations.find((attestation) => attestation.id === id);
}
