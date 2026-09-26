// Retired on 2026-09-25. Publishing now goes through the approval-gated queue.
//
// This script used to move every reviewed draft to published in one go, with
// whatever --date it was given. That allowed a backdated publication date, a
// bulk release, and a release with no record of approval — each of which the
// queue now prevents:
//
//   npm run queue:status                        what is queued and what would happen now
//   npm run queue:release -- --slug <slug>      release one approved article today (manual override)
//
// The file is kept, printing this pointer, so older documents that name it
// still lead somewhere. See docs/publishing-workflow.md.

console.error(
  [
    'publish-drafts.mjs is retired: it could backdate and bulk-publish.',
    'Use the approval-gated queue instead:',
    '  npm run queue:status',
    '  npm run queue:release -- --slug <slug>   (the article must carry "editorialApproved": true)',
    'See docs/publishing-workflow.md.',
  ].join('\n')
);
process.exit(1);
