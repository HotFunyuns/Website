// Cross-checks the four surfaces on which this site states, in its own words,
// which URLs exist: out/sitemap.xml, out/blog/rss.xml, out/llms.txt and the
// <link rel="canonical"> of every exported page.
//
// Search Console reported pages as "Duplicate without user-selected canonical",
// which is what Google says when it finds a URL that duplicates a known page and
// carries no canonical of its own. The defence is that every URL we publish about
// ourselves is spelled identically everywhere — same scheme, same host, same
// trailing slash — and that no surface advertises a URL another surface omits.
// This script proves that mechanically rather than by inspection.
//
// The XML is parsed rather than regex-scraped, so a malformed feed fails here
// instead of in a reader.
//
// Run: node scripts/validate-sitemap-rss.mjs

import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join, sep } from 'node:path';

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, '..');
const OUT = join(ROOT, 'out');
const SITE = 'https://reigncreativellc.com';
const HOST = 'reigncreativellc.com';

if (!existsSync(OUT)) {
  console.error('out/ not found — run `npm run build` first.');
  process.exit(1);
}

const problems = [];
const fail = (m) => problems.push(m);

/* ------------------------------------------------------------- XML parser */

/**
 * A small, deliberately strict XML 1.0 reader. It is not a general-purpose
 * parser — it rejects DTDs and entity declarations rather than implementing
 * them — but within the subset a feed or sitemap may use it is unforgiving:
 * unbalanced tags, unquoted attributes, bare `&`, undeclared entities and
 * characters XML forbids all throw. That is the point. Scraping these files
 * with a regular expression would happily read a document no reader can.
 */
function parseXml(text) {
  const NAME = /[A-Za-z_:][A-Za-z0-9_:.\-]*/y;
  const ENTITY = /&(?:amp|lt|gt|quot|apos|#[0-9]+|#x[0-9a-fA-F]+);/y;
  let i = 0;
  const stack = [];
  const root = { name: '#document', attrs: {}, children: [], text: '' };
  stack.push(root);

  const at = (s) => text.startsWith(s, i);
  const die = (msg) => {
    const line = text.slice(0, i).split('\n').length;
    throw new Error(`line ${line}: ${msg}`);
  };
  const readName = () => {
    NAME.lastIndex = i;
    const m = NAME.exec(text);
    if (!m) die('expected a name');
    i = NAME.lastIndex;
    return m[0];
  };
  const skipSpace = () => {
    while (i < text.length && /\s/.test(text[i])) i++;
  };

  for (const ch of text) {
    const c = ch.codePointAt(0);
    const legal =
      c === 0x9 || c === 0xa || c === 0xd || (c >= 0x20 && c <= 0xd7ff) ||
      (c >= 0xe000 && c <= 0xfffd) || (c >= 0x10000 && c <= 0x10ffff);
    if (!legal) die(`character U+${c.toString(16).toUpperCase()} is not legal in XML 1.0`);
  }

  if (at('<?xml')) {
    const end = text.indexOf('?>', i);
    if (end < 0) die('unterminated XML declaration');
    i = end + 2;
  }

  while (i < text.length) {
    if (at('<!--')) {
      const end = text.indexOf('-->', i);
      if (end < 0) die('unterminated comment');
      i = end + 3;
      continue;
    }
    if (at('<![CDATA[')) {
      const end = text.indexOf(']]>', i);
      if (end < 0) die('unterminated CDATA');
      stack[stack.length - 1].text += text.slice(i + 9, end);
      i = end + 3;
      continue;
    }
    if (at('<!')) die('DTDs and entity declarations are not accepted here');
    if (at('<?')) {
      const end = text.indexOf('?>', i);
      if (end < 0) die('unterminated processing instruction');
      i = end + 2;
      continue;
    }
    if (at('</')) {
      i += 2;
      const name = readName();
      skipSpace();
      if (text[i] !== '>') die(`expected > closing </${name}`);
      i++;
      const open = stack.pop();
      if (!open || open.name !== name) die(`</${name}> closes <${open?.name ?? 'nothing'}>`);
      if (stack.length === 0) die(`</${name}> closes the document root twice`);
      continue;
    }
    if (text[i] === '<') {
      i++;
      const name = readName();
      const node = { name, attrs: {}, children: [], text: '' };
      for (;;) {
        skipSpace();
        if (at('/>')) {
          i += 2;
          stack[stack.length - 1].children.push(node);
          node.parent = stack[stack.length - 1];
          node.selfClosing = true;
          break;
        }
        if (text[i] === '>') {
          i++;
          stack[stack.length - 1].children.push(node);
          node.parent = stack[stack.length - 1];
          stack.push(node);
          break;
        }
        const attr = readName();
        skipSpace();
        if (text[i] !== '=') die(`attribute ${attr} has no value`);
        i++;
        skipSpace();
        const quote = text[i];
        if (quote !== '"' && quote !== "'") die(`attribute ${attr} value is not quoted`);
        i++;
        const end = text.indexOf(quote, i);
        if (end < 0) die(`unterminated value for attribute ${attr}`);
        const raw = text.slice(i, end);
        if (raw.includes('<')) die(`attribute ${attr} contains a raw <`);
        if (attr in node.attrs) die(`<${name}> repeats attribute ${attr}`);
        node.attrs[attr] = decodeXml(raw, die);
        i = end + 1;
      }
      continue;
    }
    // text node
    const next = text.indexOf('<', i);
    const chunk = text.slice(i, next < 0 ? text.length : next);
    if (chunk.includes(']]>')) die('raw ]]> in character data');
    let k = 0;
    for (;;) {
      const amp = chunk.indexOf('&', k);
      if (amp < 0) break;
      ENTITY.lastIndex = amp;
      if (!ENTITY.test(chunk)) {
        i += amp;
        die('bare & — every ampersand must be an entity reference');
      }
      k = ENTITY.lastIndex;
    }
    stack[stack.length - 1].text += decodeXml(chunk, die);
    i = next < 0 ? text.length : next;
  }

  if (stack.length !== 1) die(`unclosed <${stack[stack.length - 1].name}>`);
  const elements = root.children.filter((c) => c.name);
  if (elements.length !== 1) die(`expected exactly one root element, found ${elements.length}`);
  return elements[0];
}

function decodeXml(raw, die) {
  return raw.replace(/&(#x[0-9a-fA-F]+|#[0-9]+|[A-Za-z]+);/g, (whole, body) => {
    if (body[0] === '#') {
      return String.fromCodePoint(
        body[1] === 'x' ? parseInt(body.slice(2), 16) : parseInt(body.slice(1), 10)
      );
    }
    const named = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'" };
    if (!(body in named)) die(`undeclared entity ${whole}`);
    return named[body];
  });
}

const kids = (node, name) => node.children.filter((c) => c.name === name);
const kid = (node, name) => kids(node, name)[0];
const textOf = (node) => (node ? node.text.trim() : undefined);

/* ------------------------------------------------- what the export contains */

function walk(dir) {
  const found = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) found.push(...walk(full));
    else found.push(full);
  }
  return found;
}

const files = walk(OUT);
const htmlFiles = files.filter((f) => f.endsWith('.html'));
const routeOf = (f) => `/${f.slice(OUT.length + 1).split(sep).join('/').replace(/index\.html$/, '')}`;

/** route -> { canonical, noindex } for every exported page. */
const pages = new Map();
for (const file of htmlFiles) {
  const doc = readFileSync(file, 'utf8');
  pages.set(routeOf(file), {
    canonical: /<link rel="canonical" href="([^"]*)"/.exec(doc)?.[1],
    noindex: /<meta name="robots" content="[^"]*noindex/i.test(doc),
  });
}

/**
 * Every URL a public surface advertises must map to a file this export actually
 * contains, and that file must name the same URL as its canonical. A surface
 * that advertises a URL whose page points its canonical elsewhere is telling
 * crawlers two different things about one address.
 */
function checkAdvertisedUrl(where, url) {
  if (!url.startsWith('https://')) return fail(`${where}: ${url} is not https`);
  let parsed;
  try {
    parsed = new URL(url);
  } catch {
    return fail(`${where}: ${url} is not a valid URL`);
  }
  if (parsed.host !== HOST) return fail(`${where}: ${url} uses host ${parsed.host}, expected ${HOST}`);
  if (parsed.search || parsed.hash) return fail(`${where}: ${url} carries a query or fragment`);
  if (!parsed.pathname.endsWith('/')) return fail(`${where}: ${url} has no trailing slash`);
  if (parsed.pathname !== parsed.pathname.toLowerCase()) return fail(`${where}: ${url} is not lowercase`);
  if (parsed.pathname.includes('//')) return fail(`${where}: ${url} has an empty path segment`);
  if (/\.(html|txt|xml)\//.test(parsed.pathname)) return fail(`${where}: ${url} points inside a file`);

  const route = parsed.pathname;
  const page = pages.get(route);
  if (!page) return fail(`${where}: ${url} has no ${route}index.html in out/`);
  if (!page.canonical) return fail(`${where}: ${url} is advertised but its page carries no canonical`);
  if (page.canonical !== url) {
    return fail(`${where}: ${url} is advertised but its page's canonical is ${page.canonical}`);
  }
  if (page.noindex) return fail(`${where}: ${url} is advertised but its page is noindex`);
  return true;
}

const isoDay = (d) => d.toISOString().slice(0, 10);
const TODAY = isoDay(new Date());

/* ---------------------------------------------------------------- sitemap */

const sitemapPath = join(OUT, 'sitemap.xml');
let sitemapUrls = [];
if (!existsSync(sitemapPath)) {
  fail('out/sitemap.xml is missing');
} else {
  const raw = readFileSync(sitemapPath, 'utf8');
  let urlset;
  try {
    urlset = parseXml(raw);
  } catch (error) {
    fail(`sitemap.xml is not well-formed XML — ${error.message}`);
  }

  if (urlset) {
    if (urlset.name !== 'urlset') fail(`sitemap.xml root is <${urlset.name}>, expected <urlset>`);
    if (urlset.attrs.xmlns !== 'http://www.sitemaps.org/schemas/sitemap/0.9') {
      fail(`sitemap.xml declares xmlns "${urlset.attrs.xmlns}"`);
    }
    const entries = kids(urlset, 'url');
    if (entries.length === 0) fail('sitemap.xml contains no <url> entries');
    if (entries.length > 50000) fail(`sitemap.xml has ${entries.length} URLs (the format allows 50,000)`);
    if (Buffer.byteLength(raw) > 50 * 1024 * 1024) fail('sitemap.xml exceeds the 50MB uncompressed limit');

    const seen = new Set();
    const lastmods = [];
    for (const entry of entries) {
      const locs = kids(entry, 'loc');
      if (locs.length !== 1) {
        fail(`sitemap.xml has a <url> with ${locs.length} <loc> elements`);
        continue;
      }
      const url = textOf(locs[0]);
      sitemapUrls.push(url);
      if (seen.has(url)) fail(`sitemap.xml lists ${url} more than once`);
      seen.add(url);
      checkAdvertisedUrl('sitemap.xml', url);

      const lastmod = textOf(kid(entry, 'lastmod'));
      if (lastmod !== undefined) {
        if (!/^\d{4}-\d{2}-\d{2}(T[\d:.]+(Z|[+-]\d{2}:\d{2}))?$/.test(lastmod)) {
          fail(`sitemap.xml: ${url} has a lastmod that is not a W3C datetime (${lastmod})`);
        } else if (lastmod.slice(0, 10) > TODAY) {
          fail(`sitemap.xml: ${url} has a lastmod in the future (${lastmod})`);
        }
        lastmods.push(lastmod.slice(0, 10));
      }

      const changefreq = textOf(kid(entry, 'changefreq'));
      const FREQS = ['always', 'hourly', 'daily', 'weekly', 'monthly', 'yearly', 'never'];
      if (changefreq !== undefined && !FREQS.includes(changefreq)) {
        fail(`sitemap.xml: ${url} has changefreq "${changefreq}"`);
      }
      const priority = textOf(kid(entry, 'priority'));
      if (priority !== undefined && !(Number(priority) >= 0 && Number(priority) <= 1)) {
        fail(`sitemap.xml: ${url} has priority "${priority}"`);
      }
    }

    // lastmod must come from a date we record, never from the clock. If every
    // entry claims it changed today, the field has been stamped with build time
    // and crawlers learn to ignore it.
    const distinct = new Set(lastmods);
    if (lastmods.length > 5 && distinct.size === 1 && distinct.has(TODAY)) {
      fail('sitemap.xml: every lastmod is today — the field is being stamped with build time');
    }

    // Any exported page that names itself as its own canonical and is not
    // noindex is a page we intend crawlers to index, so it belongs in the
    // sitemap. The legacy alias and the 404 are excluded by exactly that rule:
    // the alias canonicalises elsewhere, the 404 is noindex.
    for (const [route, page] of pages) {
      const self = `${SITE}${route}`;
      if (route.endsWith('.html')) continue;
      if (page.noindex || !page.canonical || page.canonical !== self) continue;
      if (!seen.has(self)) fail(`${route} is self-canonical and indexable but missing from sitemap.xml`);
    }

    if (seen.has(`${SITE}/apps/82-0-pro-basketball-draft/`)) {
      fail('sitemap.xml lists the retired /apps/82-0-pro-basketball-draft/ alias');
    }
  }
}

const sitemapSet = new Set(sitemapUrls);
const sitemapPosts = sitemapUrls.filter((u) => /^https:\/\/reigncreativellc\.com\/blog\/[^/]+\/$/.test(u));
const sitemapApps = sitemapUrls.filter((u) => /^https:\/\/reigncreativellc\.com\/apps\/[^/]+\/$/.test(u));

/* -------------------------------------------------------------------- RSS */

const feedPath = join(OUT, 'blog', 'rss.xml');
/** slug -> { title, description, url } taken from the feed, for the llms.txt cross-check. */
const feedPostsBySlug = new Map();

if (!existsSync(feedPath)) {
  fail('out/blog/rss.xml is missing');
} else {
  const raw = readFileSync(feedPath, 'utf8');
  let rss;
  try {
    rss = parseXml(raw);
  } catch (error) {
    fail(`blog/rss.xml is not well-formed XML — ${error.message}`);
  }

  if (rss) {
    if (rss.name !== 'rss') fail(`blog/rss.xml root is <${rss.name}>, expected <rss>`);
    if (rss.attrs.version !== '2.0') fail(`blog/rss.xml declares version "${rss.attrs.version}"`);
    const channel = kid(rss, 'channel');
    if (!channel) {
      fail('blog/rss.xml has no <channel>');
    } else {
      for (const required of ['title', 'link', 'description']) {
        if (!textOf(kid(channel, required))) fail(`blog/rss.xml channel is missing <${required}>`);
      }
      const channelLink = textOf(kid(channel, 'link'));
      if (channelLink !== `${SITE}/blog/`) {
        fail(`blog/rss.xml channel <link> is ${channelLink}, expected ${SITE}/blog/`);
      } else {
        checkAdvertisedUrl('blog/rss.xml channel link', channelLink);
      }

      // atom:self must name the feed's own address, and that address must be a
      // file this export actually publishes.
      const self = kids(channel, 'atom:link').find((n) => n.attrs.rel === 'self');
      if (!self) {
        fail('blog/rss.xml has no <atom:link rel="self">');
      } else {
        if (self.attrs.href !== `${SITE}/blog/rss.xml`) {
          fail(`blog/rss.xml atom:self href is ${self.attrs.href}, expected ${SITE}/blog/rss.xml`);
        }
        if (self.attrs.type !== 'application/rss+xml') {
          fail(`blog/rss.xml atom:self type is "${self.attrs.type}"`);
        }
        if (rss.attrs['xmlns:atom'] !== 'http://www.w3.org/2005/Atom') {
          fail('blog/rss.xml uses the atom: prefix without declaring xmlns:atom');
        }
      }

      const lastBuild = textOf(kid(channel, 'lastBuildDate'));
      if (lastBuild && !isRfc822(lastBuild)) fail(`blog/rss.xml lastBuildDate "${lastBuild}" is not RFC-822`);

      // A feed that shipped whole article bodies would create a second full-text
      // copy of every post at one URL, which is the duplicate surface this
      // release exists to remove.
      if (kids(channel, 'content:encoded').length || /<content:encoded/.test(raw)) {
        fail('blog/rss.xml carries <content:encoded> — the feed must stay an index, not a full-text copy');
      }

      const items = kids(channel, 'item');
      const guids = new Set();
      let previous = Infinity;
      for (const item of items) {
        const title = textOf(kid(item, 'title'));
        const link = textOf(kid(item, 'link'));
        const guidNode = kid(item, 'guid');
        const guid = textOf(guidNode);
        const description = textOf(kid(item, 'description'));
        const pubDate = textOf(kid(item, 'pubDate'));

        if (!title) fail('blog/rss.xml has an <item> with no <title>');
        if (!description) fail(`blog/rss.xml item "${title}" has no <description>`);
        if (description && description.length > 500) {
          fail(`blog/rss.xml item "${title}" has a ${description.length}-char description — feed items are summaries`);
        }
        if (!link) {
          fail(`blog/rss.xml item "${title}" has no <link>`);
        } else {
          checkAdvertisedUrl(`blog/rss.xml item "${title}"`, link);
          if (!sitemapSet.has(link)) fail(`blog/rss.xml advertises ${link}, which the sitemap omits`);
        }
        if (guid !== link) fail(`blog/rss.xml item "${title}" has guid ${guid} but link ${link}`);
        if (guidNode && guidNode.attrs.isPermaLink !== 'true') {
          fail(`blog/rss.xml item "${title}" guid is not marked isPermaLink="true"`);
        }
        if (guid) {
          if (guids.has(guid)) fail(`blog/rss.xml repeats guid ${guid}`);
          guids.add(guid);
        }
        if (!pubDate || !isRfc822(pubDate)) {
          fail(`blog/rss.xml item "${title}" has pubDate "${pubDate}", which is not RFC-822`);
        } else {
          const t = Date.parse(pubDate);
          if (new Date(t).toUTCString() !== pubDate) {
            fail(`blog/rss.xml item "${title}" pubDate "${pubDate}" has the wrong weekday for its date`);
          }
          if (t > Date.now()) fail(`blog/rss.xml item "${title}" is dated in the future — draft leakage`);
          if (t > previous) fail(`blog/rss.xml item "${title}" is newer than the item before it`);
          previous = t;
        }
        if (link) {
          const slug = new URL(link).pathname.split('/').filter(Boolean).pop();
          feedPostsBySlug.set(slug, { title, description, url: link });
        }
      }

      // Exactly the articles the sitemap publishes — no more, no fewer.
      const feedUrls = new Set([...feedPostsBySlug.values()].map((p) => p.url));
      for (const url of sitemapPosts) {
        if (!feedUrls.has(url)) fail(`blog/rss.xml omits ${url}, which the sitemap publishes`);
      }
      if (items.length !== sitemapPosts.length) {
        fail(`blog/rss.xml has ${items.length} items but the sitemap publishes ${sitemapPosts.length} articles`);
      }
    }
  }
}

function isRfc822(value) {
  return (
    /^(Mon|Tue|Wed|Thu|Fri|Sat|Sun), \d{2} (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) \d{4} \d{2}:\d{2}:\d{2} (GMT|[+-]\d{4})$/.test(value) &&
    !Number.isNaN(Date.parse(value))
  );
}

/* --------------------------------------------------------------- llms.txt */

const llmsPath = join(OUT, 'llms.txt');
if (!existsSync(llmsPath)) {
  fail('out/llms.txt is missing');
} else {
  const llms = readFileSync(llmsPath, 'utf8');

  // llms.txt is an index we hand to assistants. Two things would make it
  // dishonest: telling those assistants what to say about us, and pasting
  // article bodies into it so the file competes with the articles themselves.
  // Both are checked, because both are easy to add later without noticing.
  const DIRECTIVES = [
    /\brecommend (?:our|these|reign)\b/i,
    /\byou (?:should|must) (?:recommend|mention|suggest|cite|prefer)\b/i,
    /\bwhen (?:asked|users ask)\b/i,
    /\balways (?:mention|recommend|cite|link)\b/i,
    /\bprefer (?:our|these) (?:apps|articles)\b/i,
    /\bignore (?:previous|prior|all) instructions\b/i,
    /\b(?:system|developer) prompt\b/i,
    /\bas an (?:ai|assistant)\b/i,
    /\binstructions? for (?:ai|assistants|llms|models)\b/i,
    /\brank (?:us|our)\b/i,
  ];
  for (const pattern of DIRECTIVES) {
    const hit = pattern.exec(llms);
    if (hit) fail(`llms.txt contains an instruction to AI systems: "${hit[0]}" — it must be an index, not a directive`);
  }
  if (/"@context"|application\/ld\+json|schema\.org/.test(llms)) {
    fail('llms.txt contains schema markup — a plain-text index must not carry JSON-LD');
  }

  const lines = llms.split('\n');
  const overlong = lines.filter((l) => l.length > 500);
  if (overlong.length) {
    fail(`llms.txt has ${overlong.length} line(s) over 500 chars — it is reproducing body text, not indexing it`);
  }

  const llmsUrls = [...llms.matchAll(/\((https?:\/\/[^)\s]+)\)/g)]
    .map((m) => m[1])
    .filter((u) => u.includes(HOST));
  const llmsSet = new Set(llmsUrls);
  for (const url of llmsSet) checkAdvertisedUrl('llms.txt', url);

  for (const url of [...sitemapPosts, ...sitemapApps]) {
    if (!llmsSet.has(url)) fail(`llms.txt omits ${url}, which the sitemap publishes`);
  }
  for (const url of llmsSet) {
    if (!sitemapSet.has(url)) fail(`llms.txt advertises ${url}, which the sitemap omits`);
  }

  // Each article gets one index line, spelled the same way the feed spells it.
  // Comparing against the feed proves the two surfaces were generated from one
  // collection, and the fixed shape proves no body text crept in.
  for (const [slug, post] of feedPostsBySlug) {
    const expected = `- [${post.title}](${post.url}): ${post.description}`;
    if (!llms.includes(expected)) {
      fail(`llms.txt entry for ${slug} does not match the feed's title/description exactly`);
    }
  }
}

/* --------------------------------------------------------------- reporting */

console.log(`sitemap URLs: ${sitemapUrls.length}   of which articles: ${sitemapPosts.length}   apps: ${sitemapApps.length}`);
console.log(`RSS items: ${feedPostsBySlug.size}   exported pages: ${pages.size}`);

if (problems.length) {
  console.log(`\n${problems.length} PROBLEM(S):`);
  for (const p of problems.slice(0, 60)) console.log(`  ✗ ${p}`);
  if (problems.length > 60) console.log(`  … and ${problems.length - 60} more`);
  process.exit(1);
}
console.log('\nsitemap, RSS and llms.txt agree with every page canonical');
