// Sets publication dates on articles, in America/Los_Angeles.
//
// Two distinct operations, because they are two distinct claims:
//   --publish-on <date>   moves articles currently stamped <from> to <date>,
//                         setting both publishedAt and updatedAt. Used when a
//                         release slips a day and the stamped date would
//                         otherwise be earlier than the day it actually shipped.
//   --touch <slug,slug>   sets updatedAt only, leaving publishedAt alone. Used
//                         for an existing article that was meaningfully revised.
//
// A publication date is a factual claim, so nothing here backdates: the script
// refuses to move a date earlier than the one already recorded.
//
// Run: node scripts/stamp-dates.mjs --publish-on 2026-09-04 --from 2026-09-03
//      node scripts/stamp-dates.mjs --touch slug-a,slug-b --date 2026-09-04

import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const HERE = dirname(fileURLToPath(import.meta.url));
const CONTENT = join(HERE, '..', 'content', 'blog');
const FRONTMATTER = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/;

const args = process.argv.slice(2);
const arg = (name) => {
  const i = args.indexOf(name);
  return i >= 0 ? args[i + 1] : undefined;
};

const publishOn = arg('--publish-on');
const from = arg('--from');
const touch = arg('--touch')?.split(',').map((s) => s.trim()).filter(Boolean);
const touchDate = arg('--date');
const isDate = (v) => /^\d{4}-\d{2}-\d{2}$/.test(v ?? '');

if (!(publishOn && from) && !(touch && touchDate)) {
  console.error('usage: --publish-on <date> --from <date>   |   --touch <slugs> --date <date>');
  process.exit(1);
}
for (const value of [publishOn, from, touchDate].filter(Boolean)) {
  if (!isDate(value)) {
    console.error(`not an ISO date: ${value}`);
    process.exit(1);
  }
}

let moved = 0;
let touched = 0;

for (const file of readdirSync(CONTENT).filter((f) => f.endsWith('.md'))) {
  const slug = file.replace(/\.md$/, '');
  const path = join(CONTENT, file);
  const raw = readFileSync(path, 'utf8');
  const m = FRONTMATTER.exec(raw);
  if (!m) continue;
  const data = JSON.parse(m[1]);
  let changed = false;

  if (publishOn && data.publishedAt === from) {
    if (publishOn < from) {
      console.error(`refusing to backdate ${slug}: ${from} -> ${publishOn}`);
      process.exit(1);
    }
    data.publishedAt = publishOn;
    data.updatedAt = publishOn;
    changed = true;
    moved++;
  }

  if (touch?.includes(slug)) {
    if (touchDate < data.updatedAt) {
      console.error(`refusing to move ${slug} updatedAt backwards: ${data.updatedAt} -> ${touchDate}`);
      process.exit(1);
    }
    if (touchDate < data.publishedAt) {
      console.error(`refusing to set ${slug} updatedAt before its publishedAt`);
      process.exit(1);
    }
    if (data.updatedAt !== touchDate) {
      data.updatedAt = touchDate;
      changed = true;
      touched++;
    }
  }

  if (changed) {
    writeFileSync(path, `---\n${JSON.stringify(data, null, 2)}\n---\n${raw.slice(m[0].length)}`, 'utf8');
  }
}

if (publishOn) console.log(`moved ${moved} article(s) from ${from} to ${publishOn}`);
if (touch) {
  console.log(`set updatedAt on ${touched} revised article(s) to ${touchDate}`);
  const missing = touch.filter((s) => !readdirSync(CONTENT).includes(`${s}.md`));
  if (missing.length) console.log(`WARNING: no such article(s): ${missing.join(', ')}`);
}
