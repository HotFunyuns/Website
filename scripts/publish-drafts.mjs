// Retired on 2026-09-25. Publishing now goes through scripts/publish-batch.mjs
// (and, for a person-approved article scheduled for a later day, the queue).
//
// This script used to move every reviewed draft to published in one go, with
// whatever --date it was given. That allowed a backdated publication date and a
// release with no record of how the article was checked — each of which
// publish-batch now prevents: it stamps the real Los Angeles day, and it
// publishes an article only with a passing, logged AI editorial review of that
// exact text, or a person's complete review record.
//
//   npm run publish:batch -- <slug…> --dry-run    what would publish, and why not
//   npm run publish:batch -- --all-ready          publish every ready article today
//
// The file is kept, printing this pointer, so older documents that name it
// still lead somewhere. See docs/publishing-workflow.md.

console.error(
  [
    'publish-drafts.mjs is retired: it could backdate and publish without a review record.',
    'Use the batch publisher instead:',
    '  npm run publish:batch -- <slug…> --dry-run',
    '  npm run publish:batch -- --all-ready',
    'See docs/publishing-workflow.md.',
  ].join('\n')
);
process.exit(1);
