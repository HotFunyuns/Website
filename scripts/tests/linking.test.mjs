// The post-publication linking pass, on a small synthetic corpus: which older
// articles it links from, what it refuses to do, and that a second run changes
// nothing. The corpus exists only in memory; no article is written to disk.
//
// Run: npm test

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { parseArticle, setFrontmatterValue } from '../lib/content.mjs';
import {
  MAX_RELATED,
  anchorPhrases,
  applyActions,
  findContextualAnchor,
  planPostPublication,
} from '../lib/linking.mjs';

const NOW = new Date('2026-10-05T18:00:00Z'); // 2026-10-05 in Los Angeles

const site = {
  apps: [
    { slug: 'tower-app', name: 'Tower App', packageId: 'com.example.tower', categoryId: 'action-arcade' },
    { slug: 'math-app', name: 'Math App', packageId: 'com.example.math', categoryId: 'education-brain' },
  ],
  hubs: [{ id: 'mental-math', label: 'Mental Math', appSlug: 'math-app', categoryId: 'education-brain', cornerstone: 'math-cornerstone' }],
};

function make(slug, fields = {}, body = '') {
  const data = {
    title: fields.title ?? `Title for ${slug.replace(/-/g, ' ')}`,
    metaTitle: 'x',
    description: 'x',
    status: 'published',
    publishedAt: '2026-09-01',
    updatedAt: '2026-09-01',
    author: 'reign-creative-llc',
    category: 'action-arcade',
    tags: ['tower defense', 'strategy'],
    primaryKeyword: `${slug} keyword`,
    secondaryKeywords: [],
    relatedApps: ['tower-app'],
    relatedArticles: [],
    ...fields,
  };
  const text = body || `Intro linking the [app](/apps/${data.relatedApps[0]}/) and the [category](/blog/category/${data.category}/).\n`;
  return parseArticle(`/virtual/${slug}.md`, `---\n${JSON.stringify(data, null, 2)}\n---\n${text}`);
}

function corpus() {
  return [
    make('older-a', { title: 'Tower defense strategy basics', primaryKeyword: 'tower defense strategy', relatedArticles: ['older-b'] }),
    make('older-b', { title: 'Tower placement for beginners', primaryKeyword: 'tower placement', relatedArticles: ['older-a'] }),
    make('older-c', { title: 'Countering armoured waves', primaryKeyword: 'armoured waves', relatedArticles: ['older-a'] }),
    make('older-full', {
      title: 'Tower upgrades explained',
      primaryKeyword: 'tower upgrades',
      relatedArticles: ['older-a', 'older-b', 'older-c', 'x1', 'x2', 'x3'],
    }),
    make('x1', { category: 'education-brain', relatedApps: ['math-app'], tags: ['arithmetic'] }),
    make('x2', { category: 'education-brain', relatedApps: ['math-app'], tags: ['arithmetic'] }),
    make('x3', { category: 'education-brain', relatedApps: ['math-app'], tags: ['arithmetic'] }),
    make('math-cornerstone', { category: 'education-brain', relatedApps: ['math-app'], hubs: ['mental-math'], tags: ['arithmetic'] }),
    make('scheduled-one', { status: 'scheduled', editorialApproved: true, publishAt: '2026-10-09', title: 'Tower speed runs' }),
    make(
      'new-article',
      {
        title: 'What tower range means',
        primaryKeyword: 'tower range meaning',
        publishedAt: '2026-10-05',
        updatedAt: '2026-10-05',
        editorialApproved: true,
        relatedArticles: ['older-a', 'older-b'],
      },
      'Covers the [app](/apps/tower-app/), [basics](/blog/older-a/) and the [category](/blog/category/action-arcade/).\n'
    ),
  ];
}

test('refuses an article that is not public yet', () => {
  const plan = planPostPublication(corpus(), 'scheduled-one', site, { now: NOW });
  assert.match(plan.fatal, /not public/);
});

test('links the new article back from relevant older articles, as cards when no phrase fits', () => {
  const plan = planPostPublication(corpus(), 'new-article', site, { now: NOW });
  assert.equal(plan.fatal, null);
  const sources = plan.actions.filter((a) => a.target === 'new-article').map((a) => a.source);
  assert.ok(sources.length >= 2, `expected ≥2 back-links, got ${sources.join(', ')}`);
  for (const source of sources) assert.ok(['older-a', 'older-b', 'older-c'].includes(source), source);
  assert.ok(!sources.includes('older-full'), 'a source already showing six cards cannot take another');
  assert.ok(!sources.includes('scheduled-one'), 'unpublished articles are never sources');
  assert.ok(plan.checks.every((c) => c.ok), JSON.stringify(plan.checks.filter((c) => !c.ok)));
});

test('never links to something unpublished, and flags the new article if it does', () => {
  const articles = corpus();
  const index = articles.findIndex((a) => a.slug === 'new-article');
  articles[index] = parseArticle(
    articles[index].file,
    setFrontmatterValue(articles[index].raw, 'relatedArticles', ['older-a', 'scheduled-one'])
  );
  const plan = planPostPublication(articles, 'new-article', site, { now: NOW });
  const check = plan.checks.find((c) => c.id === 'no-private-links');
  assert.equal(check.ok, false);
  assert.match(check.detail, /scheduled-one/);
  assert.ok(plan.actions.every((a) => a.target !== 'scheduled-one' && a.source !== 'scheduled-one'));
});

test('applying the plan is idempotent: a second plan has nothing to add', () => {
  let articles = corpus();
  const plan = planPostPublication(articles, 'new-article', site, { now: NOW });
  const edited = applyActions(articles, plan.actions, { setFrontmatterValue, parseArticle });
  articles = articles.map((a) => edited.get(a.slug)?.article ?? a);
  for (const { article } of edited.values()) assert.ok(article.data.relatedArticles.length <= MAX_RELATED);

  const again = planPostPublication(articles, 'new-article', site, { now: NOW });
  assert.deepEqual(again.actions, []);
  // Replaying the original plan against the edited corpus also adds nothing.
  assert.equal(applyActions(articles, plan.actions, { setFrontmatterValue, parseArticle }).size, 0);
});

test('a hub article gains its cornerstone when it lacks it', () => {
  const articles = [
    ...corpus(),
    make('hub-member', {
      category: 'education-brain',
      relatedApps: ['math-app'],
      hubs: ['mental-math'],
      tags: ['arithmetic'],
      publishedAt: '2026-10-05',
      editorialApproved: true,
      relatedArticles: ['x1', 'x2'],
    }),
  ];
  const plan = planPostPublication(articles, 'hub-member', site, { now: NOW, anyAge: true });
  assert.ok(plan.actions.some((a) => a.source === 'hub-member' && a.target === 'math-cornerstone'));
});

/* ----------------------------------------------------------- contextual */

test('anchor phrases come from the target itself and exclude other articles\' subjects', () => {
  const target = make('t', {
    title: 'Sugar Alcohols Explained',
    primaryKeyword: 'sugar alcohols',
    secondaryKeywords: ['erythritol and net carbs', 'net carbs explained'],
  });
  const other = make('net-carbs', { title: 'Net Carbs Explained', primaryKeyword: 'net carbs explained' });
  const phrases = anchorPhrases(target, [other]);
  assert.ok(phrases.includes('sugar alcohols'));
  assert.ok(!phrases.includes('net carbs explained'), 'another article owns that phrase');
  assert.ok(!phrases.includes('erythritol and net carbs'), 'words outside the target\'s own title are tangents');
});

test('a contextual link wraps words already in a sentence, and nowhere it should not', () => {
  const target = make('t', { title: 'Sugar Alcohols Explained', primaryKeyword: 'sugar alcohols' });
  const source = make(
    's',
    {},
    [
      '## Why sugar alcohols matter',
      '',
      'A [linked sentence about sugar alcohols](/blog/other/) is left alone.',
      '',
      '| Sugar alcohols | table |',
      '',
      'Labels count sugar alcohols inside total carbohydrate, which changes the maths.',
      '',
    ].join('\n')
  );
  const anchor = findContextualAnchor(source, target, new Map(), [target, source]);
  assert.ok(anchor);
  assert.equal(anchor.text, 'sugar alcohols');
  assert.equal(source.body.slice(anchor.start - 'Labels count '.length, anchor.start), 'Labels count ');

  const edited = applyActions([source, target], [{ type: 'contextual', source: 's', target: 't', ...anchor }], {
    setFrontmatterValue,
    parseArticle,
  });
  const body = edited.get('s').article.body;
  assert.ok(body.includes('Labels count [sugar alcohols](/blog/t/) inside total carbohydrate'));
  assert.equal(body.replace('[sugar alcohols](/blog/t/)', 'sugar alcohols'), source.body, 'no word added or removed');
});

test('no contextual anchor when the phrase only appears in headings, tables or linked sentences', () => {
  const target = make('t', { title: 'Sugar Alcohols Explained', primaryKeyword: 'sugar alcohols' });
  const source = make('s', {}, '## Sugar alcohols\n\n| Sugar alcohols | x |\n\nSee [this](/blog/o/) on sugar alcohols.\n');
  assert.equal(findContextualAnchor(source, target, new Map(), [target, source]), null);
});
