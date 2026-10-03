// What must be true of an article before it may go public, shared by the two
// ways an article is published: the queue (scripts/publish-queue.mjs, for
// articles a named person approved and scheduled) and the batch tool
// (scripts/publish-batch.mjs, for finished articles published as soon as they
// pass every check).
//
// Checked without the site's TypeScript so it can run anywhere. The full
// production build re-checks all of it afterwards; this exists so a bad article
// fails before anything is written, with a message that names the problem.

import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { ROOT, extractLinks } from './content.mjs';
import { isPublic, reviewProblems } from './publishing.mjs';

/**
 * Problems that would stop `candidate` going public with the frontmatter in
 * `future` (its data as it will be once released: status, dates).
 *
 * @param {object} candidate the article as on disk
 * @param {object} future its frontmatter after release
 * @param {Array} articles every article on disk
 * @param {object} site { apps, hubs } from loadSiteData()
 * @param {object} options
 *   willBePublic  slugs released in the same run, which may be linked
 *   preflight     run preflight-articles.mjs --only (default true)
 *   now           the current instant
 */
export function validateCandidate(candidate, future, articles, site, options = {}) {
  const { willBePublic = new Set(), preflight = true, now = new Date() } = options;
  const problems = [];
  const d = future;
  const publicSlugs = new Set([...articles.filter((a) => isPublic(a.data, now)).map((a) => a.slug), ...willBePublic]);
  const appSlugs = new Set(site.apps.map((a) => a.slug));
  const categoryIds = new Set(site.apps.map((a) => a.categoryId));
  const hubIds = new Set(site.hubs.map((h) => h.id));
  const authors = readFileSync(join(ROOT, 'src', 'data', 'authors.ts'), 'utf8');

  for (const field of ['title', 'metaTitle', 'description', 'primaryKeyword']) {
    if (typeof d[field] !== 'string' || !d[field].trim()) problems.push(`"${field}" is missing`);
  }
  if (d.metaTitle?.length > 60) problems.push(`metaTitle is ${d.metaTitle.length} chars (max 60)`);
  if (d.description?.length > 160 || d.description?.length < 70) problems.push(`description is ${d.description?.length} chars (70–160)`);
  if (!/^[a-z0-9-]+$/.test(d.author ?? '') || !authors.includes(`id: '${d.author}'`)) {
    problems.push(`author "${d.author}" is not in src/data/authors.ts`);
  }
  if (!categoryIds.has(d.category)) problems.push(`category "${d.category}" is unknown`);
  if (!Array.isArray(d.relatedApps) || d.relatedApps.length === 0) problems.push('relatedApps is empty');
  for (const app of d.relatedApps ?? []) if (!appSlugs.has(app)) problems.push(`relatedApps names unknown app "${app}"`);
  for (const hub of d.hubs ?? []) if (!hubIds.has(hub)) problems.push(`hubs names unknown hub "${hub}"`);
  for (const slug of d.relatedArticles ?? []) {
    if (slug === candidate.slug) problems.push('relatedArticles names the article itself');
    else if (!publicSlugs.has(slug)) problems.push(`relatedArticles names "${slug}", which is not public`);
  }
  const key = d.primaryKeyword?.trim().toLowerCase();
  const clash = articles.find((a) => a.slug !== candidate.slug && a.data.primaryKeyword?.trim().toLowerCase() === key);
  if (clash) problems.push(`primaryKeyword is already targeted by "${clash.slug}"`);
  for (const source of d.sources ?? []) {
    if (!/^https:\/\//.test(source.url ?? '')) problems.push(`source "${source.title}" needs an https URL`);
  }
  if (d.noindex === true) problems.push('"noindex" is still set');
  for (const problem of reviewProblems(d, now)) problems.push(problem);

  for (const link of extractLinks(candidate.body)) {
    // Checked without any #fragment or ?query: `/blog/x/#section` is a link to
    // /blog/x/, and must be judged as one.
    const href = link.href.startsWith('/') ? link.href.replace(/[?#].*$/, '') : link.href;
    let m;
    if ((m = /^\/blog\/([a-z0-9-]+)\/$/.exec(href))) {
      if (!publicSlugs.has(m[1])) problems.push(`body links /blog/${m[1]}/, which is not public`);
    } else if ((m = /^\/apps\/category\/([a-z-]+)\/$/.exec(href)) || (m = /^\/blog\/category\/([a-z-]+)\/$/.exec(href))) {
      if (!categoryIds.has(m[1])) problems.push(`body links unknown category ${href}`);
    } else if ((m = /^\/blog\/topics\/([a-z-]+)\/$/.exec(href))) {
      if (!hubIds.has(m[1])) problems.push(`body links unknown hub ${href}`);
    } else if ((m = /^\/apps\/([a-z0-9-]+)\/$/.exec(href))) {
      if (!appSlugs.has(m[1])) problems.push(`body links unknown app ${href}`);
    } else if (href.startsWith('/') && !href.endsWith('/') && !/\.[a-z]+$/.test(href)) {
      problems.push(`body link ${href} has no trailing slash`);
    }
  }

  // The claim-safety rules (medical promises, invented statistics, ranking
  // guarantees…) live in preflight-articles.mjs; run them for this article.
  if (preflight) {
    try {
      execFileSync(process.execPath, [join(ROOT, 'scripts', 'preflight-articles.mjs'), '--only', candidate.slug], {
        stdio: 'pipe',
        cwd: ROOT,
      });
    } catch (error) {
      const text = error.stdout?.toString() ?? error.message;
      problems.push(`pre-flight failed:\n${text.split('\n').filter((l) => l.includes('✗')).join('\n')}`);
    }
  }
  return problems;
}

const titleWords = (s) => new Set(String(s ?? '').toLowerCase().replace(/[^a-z0-9 ]/g, '').split(/\s+/).filter(Boolean));

/**
 * Collisions among articles released together, and between them and the
 * published corpus: identical titles, meta titles or descriptions, and the
 * near-identical titles preflight-articles.mjs rejects (85% of the shorter
 * title's words shared). `preflight --only` cannot see these, because it
 * compares an article only with what is already published.
 *
 * Returns Map<slug, problems[]> for the candidates.
 */
export function batchCollisions(candidates, published) {
  const found = new Map(candidates.map((c) => [c.slug, []]));
  const pool = [...published.map((a) => ({ slug: a.slug, data: a.data, candidate: false })), ...candidates.map((c) => ({ ...c, candidate: true }))];
  for (let i = 0; i < pool.length; i++) {
    for (let j = i + 1; j < pool.length; j++) {
      const a = pool[i];
      const b = pool[j];
      if (!a.candidate && !b.candidate) continue;
      const clash = [];
      for (const field of ['title', 'metaTitle', 'description']) {
        if (String(a.data[field] ?? '').trim().toLowerCase() === String(b.data[field] ?? '').trim().toLowerCase()) clash.push(`duplicate ${field}`);
      }
      const x = titleWords(a.data.title);
      const y = titleWords(b.data.title);
      const shared = [...x].filter((w) => y.has(w)).length;
      if (Math.min(x.size, y.size) > 0 && shared / Math.min(x.size, y.size) >= 0.85 && !clash.includes('duplicate title')) {
        clash.push('near-duplicate title');
      }
      if (clash.length === 0) continue;
      if (a.candidate) found.get(a.slug).push(`${clash.join(', ')} with "${b.slug}"`);
      if (b.candidate) found.get(b.slug).push(`${clash.join(', ')} with "${a.slug}"`);
    }
  }
  return found;
}
