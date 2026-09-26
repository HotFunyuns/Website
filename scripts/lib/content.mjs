// Shared helpers for the scripts that read and edit content/blog.
//
// Kept separate from src/lib/blog on purpose: the build gates in scripts/ must
// be able to catch a bug in the site's own loader, so they parse the files
// themselves. Only node built-ins are used, so the hourly publishing check can
// run before `npm ci`.
//
// Editing rule: change the value of one frontmatter key and nothing else. The
// files are not uniformly formatted — 153 of 525 write short arrays inline, one
// has CRLF line endings in the working tree — and re-serialising the whole
// block would turn a one-line edit into a reformatting of the file. Every edit
// is verified by re-parsing the result and comparing every other key.

import { readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

export const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
/**
 * `REIGN_CONTENT_DIR` points every script at another copy of the articles.
 * scripts/tests uses it to rehearse a release against a temporary copy; nothing
 * in the build or the workflows sets it.
 */
export const CONTENT_DIR = process.env.REIGN_CONTENT_DIR || join(ROOT, 'content', 'blog');
export const OUT_DIR = join(ROOT, 'out');
export const SITE = 'https://reigncreativellc.com';

const FRONTMATTER = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/;

/**
 * @typedef {object} Article
 * @property {string} slug
 * @property {string} file absolute path
 * @property {string} raw the file exactly as read
 * @property {Record<string, any>} data parsed frontmatter
 * @property {string} body Markdown after the frontmatter block
 */

/** @returns {Article} */
export function parseArticle(file, raw) {
  const slug = file.split(/[\\/]/).pop().replace(/\.md$/, '');
  const match = FRONTMATTER.exec(raw);
  if (!match) throw new Error(`${slug}: missing the --- frontmatter block`);
  let data;
  try {
    data = JSON.parse(match[1]);
  } catch (error) {
    throw new Error(`${slug}: frontmatter is not valid JSON — ${error.message}`);
  }
  return { slug, file, raw, data, body: raw.slice(match[0].length) };
}

/** Every article in a content directory, sorted by slug. */
export function readArticles(contentDir = CONTENT_DIR) {
  return readdirSync(contentDir)
    .filter((name) => name.endsWith('.md'))
    .sort()
    .map((name) => {
      const file = join(contentDir, name);
      return parseArticle(file, readFileSync(file, 'utf8'));
    });
}

/** Writes an edited article back, keeping the line endings it was read with. */
export function writeArticle(article, raw) {
  const crlf = article.raw.includes('\r\n');
  const normalised = raw.replace(/\r\n/g, '\n');
  writeFileSync(article.file, crlf ? normalised.replace(/\n/g, '\r\n') : normalised, 'utf8');
}

/* ------------------------------------------------------------- body links */

/**
 * Inline Markdown links in a body, in order, with their offsets. Image links
 * are skipped. Only the forms this repository uses are recognised:
 * `[text](/path/)` and `[text](https://…)`.
 */
export function extractLinks(body) {
  const links = [];
  const pattern = /(!?)\[([^\]\n]+)\]\(([^)\s]+)\)/g;
  let match;
  while ((match = pattern.exec(body)) !== null) {
    if (match[1] === '!') continue;
    links.push({ text: match[2], href: match[3], index: match.index, length: match[0].length });
  }
  return links;
}

/** The article slug a site-relative href points at, or null. */
export function blogSlugOf(href) {
  const match = /^\/blog\/([a-z0-9]+(?:-[a-z0-9]+)*)\/(?:#.*)?$/.exec(href);
  return match ? match[1] : null;
}

/** Slugs this article links to in its prose. */
export function bodyTargets(article) {
  return new Set(
    extractLinks(article.body)
      .map((link) => blogSlugOf(link.href))
      .filter((slug) => slug && slug !== article.slug)
  );
}

/* --------------------------------------------------- frontmatter editing */

/**
 * Splits LF-normalised content into `---\n`, the JSON text, and everything from
 * the newline before the closing `---` onward, so `head + fm + tail` is the
 * original file exactly.
 */
function splitFrontmatter(raw) {
  const normalised = raw.replace(/\r\n/g, '\n');
  const match = /^---\n([\s\S]*?)\n---/.exec(normalised);
  if (!match) throw new Error('missing the --- frontmatter block');
  const head = '---\n';
  return { head, fm: match[1], tail: normalised.slice(head.length + match[1].length) };
}

/** Index just past the JSON value that starts at `start` in `text`. */
function endOfValue(text, start) {
  const first = text[start];
  if (first === '"') {
    for (let i = start + 1; i < text.length; i++) {
      if (text[i] === '\\') i++;
      else if (text[i] === '"') return i + 1;
    }
    throw new Error('unterminated string in frontmatter');
  }
  if (first === '[' || first === '{') {
    let depth = 0;
    let inString = false;
    for (let i = start; i < text.length; i++) {
      const ch = text[i];
      if (inString) {
        if (ch === '\\') i++;
        else if (ch === '"') inString = false;
      } else if (ch === '"') inString = true;
      else if (ch === '[' || ch === '{') depth++;
      else if (ch === ']' || ch === '}') {
        depth--;
        if (depth === 0) return i + 1;
      }
    }
    throw new Error('unbalanced bracket in frontmatter');
  }
  const scalar = /^[^,\n}]+/.exec(text.slice(start));
  return start + (scalar ? scalar[0].trimEnd().length : 0);
}

/** Serialises a value in the style the old one was written in. */
function serialise(value, wasInline) {
  if (Array.isArray(value) && value.every((item) => typeof item !== 'object' || item === null)) {
    if (value.length === 0) return '[]';
    if (wasInline) return `[${value.map((item) => JSON.stringify(item)).join(', ')}]`;
    return `[\n${value.map((item) => `    ${JSON.stringify(item)}`).join(',\n')}\n  ]`;
  }
  if (value !== null && typeof value === 'object') {
    return JSON.stringify(value, null, 2).replace(/\n/g, '\n  ');
  }
  return JSON.stringify(value);
}

function keyPattern(key) {
  return new RegExp(`^  "${key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}": `, 'm');
}

function verify(beforeData, afterRaw, expect) {
  const after = parseArticle('check.md', afterRaw).data;
  const want = { ...beforeData };
  expect(want);
  const keys = new Set([...Object.keys(want), ...Object.keys(after)]);
  for (const key of keys) {
    if (JSON.stringify(want[key]) !== JSON.stringify(after[key])) {
      throw new Error(`frontmatter edit changed "${key}" unexpectedly`);
    }
  }
}

/**
 * Sets one top-level frontmatter key, editing only that key's text. Adds the
 * key after `after` (or before the closing brace) when it does not exist yet.
 * Returns the new raw file content; the caller decides whether to write it.
 */
export function setFrontmatterValue(raw, key, value, { after } = {}) {
  const before = parseArticle('check.md', raw).data;
  const { head, fm, tail } = splitFrontmatter(raw);
  let nextFm;

  const found = keyPattern(key).exec(fm);
  if (found) {
    const valueStart = found.index + found[0].length;
    const valueEnd = endOfValue(fm, valueStart);
    const wasInline = !fm.slice(valueStart, valueEnd).includes('\n');
    nextFm = fm.slice(0, valueStart) + serialise(value, wasInline) + fm.slice(valueEnd);
  } else {
    const line = `  ${JSON.stringify(key)}: ${serialise(value, true)}`;
    const anchor = after ? keyPattern(after).exec(fm) : null;
    if (anchor) {
      const valueStart = anchor.index + anchor[0].length;
      let insertAt = endOfValue(fm, valueStart);
      if (fm[insertAt] === ',') {
        nextFm = `${fm.slice(0, insertAt + 1)}\n${line},${fm.slice(insertAt + 1)}`;
      } else {
        // The anchor was the last key: it gains a comma, the new key does not.
        nextFm = `${fm.slice(0, insertAt)},\n${line}${fm.slice(insertAt)}`;
      }
    } else {
      const close = fm.lastIndexOf('}');
      const beforeClose = fm.slice(0, close).replace(/\s*$/, '');
      nextFm = `${beforeClose},\n${line}\n${fm.slice(close)}`;
    }
  }

  const next = `${head}${nextFm}${tail}`;
  verify(before, next, (want) => {
    want[key] = value;
  });
  return next;
}

/** Removes one top-level key and its line(s). A no-op when the key is absent. */
export function deleteFrontmatterKey(raw, key) {
  const before = parseArticle('check.md', raw).data;
  if (!(key in before)) return raw;
  const { head, fm, tail } = splitFrontmatter(raw);
  const found = keyPattern(key).exec(fm);
  if (!found) throw new Error(`"${key}" is not a top-level key at the expected indentation`);
  const lineStart = found.index;
  let end = endOfValue(fm, found.index + found[0].length);
  let nextFm;
  if (fm[end] === ',') {
    end += 1;
    // Drop the whole line, including its newline.
    nextFm = fm.slice(0, lineStart) + fm.slice(end).replace(/^\n/, '');
  } else {
    // The key was last: remove it and the comma that preceded it.
    const prefix = fm.slice(0, lineStart).replace(/,\s*$/, '');
    nextFm = `${prefix}${fm.slice(end)}`;
  }
  const next = `${head}${nextFm}${tail}`;
  verify(before, next, (want) => {
    delete want[key];
  });
  return next;
}

/**
 * First-party app guides are sourced from the app itself and from the verified
 * Play listing, both linked in the body, so they are exempt from the two-source
 * minimum. Shared by preflight-articles.mjs and search-console-refresh.mjs.
 */
export const FIRST_PARTY_GUIDE = /-guide$|^best-|^sports-gm-games-without-internet$|^career-mode-vs-franchise-mode$|^what-makes-a-good-draft-board$|^how-fantasy-draft-strategy-works$|^snake-draft-vs-auction-draft$|^salary-cap-basics-for-gm-games$|^how-soccer-league-tables-work$|^hockey-positions-explained$|^hockey-line-combinations-explained$|^football-positions-explained-for-drafting$/;

/* ----------------------------------------------------- apps and topic hubs */

/**
 * The app catalog and the topic hubs, read from their TypeScript source without
 * compiling it, so this works before `npm ci`. Both files are data literals at a
 * fixed indentation; the parser reads each object's fields in order and throws
 * if the shapes stop lining up, rather than returning a silently short list.
 */
export function loadSiteData(root = ROOT) {
  const field = (text, name) =>
    [...text.matchAll(new RegExp(`^    ${name}: (?:'((?:[^'\\\\]|\\\\.)*)'|"((?:[^"\\\\]|\\\\.)*)")`, 'gm'))].map(
      (m) => (m[1] ?? m[2]).replace(/\\(.)/g, '$1')
    );

  const catalogDir = join(root, 'src', 'data', 'apps', 'catalog');
  const apps = [];
  for (const name of readdirSync(catalogDir).filter((f) => f.endsWith('.ts')).sort()) {
    const text = readFileSync(join(catalogDir, name), 'utf8');
    const slugs = field(text, 'slug');
    const names = field(text, 'name');
    const packages = field(text, 'packageId');
    const cats = field(text, 'categoryId');
    const verified = field(text, 'lastVerified');
    if (!slugs.length || ![names, packages, cats, verified].every((list) => list.length === slugs.length)) {
      throw new Error(`could not read src/data/apps/catalog/${name} — its field layout changed`);
    }
    slugs.forEach((slug, i) =>
      apps.push({ slug, name: names[i], packageId: packages[i], categoryId: cats[i], lastVerified: verified[i] })
    );
  }

  const hubText = readFileSync(join(root, 'src', 'data', 'hubs.ts'), 'utf8');
  const ids = field(hubText, 'id');
  const labels = field(hubText, 'label');
  const hubApps = field(hubText, 'appSlug');
  const hubCats = field(hubText, 'categoryId');
  const cornerstones = field(hubText, 'cornerstone');
  if (!ids.length || ![labels, hubApps, hubCats, cornerstones].every((list) => list.length === ids.length)) {
    throw new Error('could not read src/data/hubs.ts — its field layout changed');
  }
  const hubs = ids.map((id, i) => ({
    id,
    label: labels[i],
    appSlug: hubApps[i],
    categoryId: hubCats[i],
    cornerstone: cornerstones[i],
  }));

  return { apps, hubs };
}

/* ------------------------------------------------------------- reporting */

/** Relative, forward-slashed path for messages. */
export function rel(file) {
  return file.slice(ROOT.length + 1).split('\\').join('/');
}
