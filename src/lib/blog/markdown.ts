import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeSlug from 'rehype-slug';
import rehypeStringify from 'rehype-stringify';
import GithubSlugger from 'github-slugger';
import type { TocEntry } from './types';

type HastNode = {
  type: string;
  tagName?: string;
  properties?: Record<string, unknown>;
  children?: HastNode[];
};

/**
 * Wraps every table in a figure that scrolls sideways on its own, so a table
 * wider than a phone screen no longer widens the whole page. The wrapper is a
 * keyboard-focusable, labelled region (the accessible pattern for a scroll
 * container). It is a <figure>, not a <div>, on purpose: the build's checks
 * (validate-content, link-report, post-publication-links) read each article's
 * prose as the text between `<div class="prose…">` and the next `</div>`, and
 * a nested div would cut that region short at the first table.
 */
function rehypeScrollableTables() {
  const wrap = (node: HastNode) => {
    if (!node.children) return;
    node.children = node.children.map((child) => {
      if (child.type === 'element' && child.tagName === 'table') {
        return {
          type: 'element',
          tagName: 'figure',
          properties: { className: ['table-scroll'], role: 'region', ariaLabel: 'Scrollable table', tabIndex: 0 },
          children: [child],
        };
      }
      wrap(child);
      return child;
    });
  };
  return (tree: HastNode) => wrap(tree);
}

const processor = unified()
  .use(remarkParse)
  .use(remarkGfm)
  .use(remarkRehype)
  .use(rehypeScrollableTables)
  .use(rehypeSlug)
  .use(rehypeStringify);

/**
 * Article bodies are first-party Markdown committed to this repository, never
 * user input, so the rendered HTML is trusted by construction.
 */
export async function renderMarkdown(markdown: string): Promise<string> {
  return String(await processor.process(markdown));
}

const FENCE = /^\s*(```|~~~)/;
const HEADING = /^(#{1,6})\s+(.+?)\s*#*\s*$/;

/**
 * Walks the source rather than the rendered tree so the table of contents can be
 * built without a second parse. Every heading is fed to the slugger — including
 * the ones we do not list — because rehype-slug numbers duplicates in document
 * order, and skipping any would drift the generated ids out of sync with it.
 */
export function extractToc(markdown: string): TocEntry[] {
  const slugger = new GithubSlugger();
  const entries: TocEntry[] = [];
  let inFence = false;

  for (const line of markdown.split('\n')) {
    if (FENCE.test(line)) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;

    const match = HEADING.exec(line);
    if (!match) continue;

    const depth = match[1].length;
    const text = match[2].replace(/\[([^\]]+)\]\([^)]*\)/g, '$1').replace(/[*_`]/g, '').trim();
    const id = slugger.slug(text);

    if (depth === 2 || depth === 3) entries.push({ depth, text, id });
  }

  return entries;
}

export function countWords(markdown: string): number {
  return markdown
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`[^`]*`/g, ' ')
    .replace(/!?\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/[#>*_~|-]/g, ' ')
    .split(/\s+/)
    .filter(Boolean).length;
}

export function readingMinutes(wordCount: number): number {
  return Math.max(1, Math.round(wordCount / 225));
}
