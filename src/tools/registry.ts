import { getAppBySlug } from '@/data/apps';
import { sportIds, sports, type SportId } from '@/data/sports';
import type { ToolMeta } from './types';

export type { ToolMeta, ToolSource, ToolSport } from './types';

/**
 * Every calculator on the site, discovered from `src/tools/<id>/meta.ts`.
 *
 * There is deliberately no hand-maintained list: adding a tool means adding a
 * folder (and its route — see docs/sports-architecture.md), so two people can
 * add tools at the same time without editing a shared file. Webpack resolves
 * the context below at build time, and the checks at the bottom of this file
 * fail the build if a tool's data is inconsistent.
 *
 * Only `meta.ts` files are loaded here, never components, so the sitemap,
 * llms.txt and the sport hubs can list tools without pulling in UI code.
 */
interface MetaContext {
  keys(): string[];
  (id: string): { default: ToolMeta };
}
declare const require: { context(directory: string, useSubdirectories: boolean, filter: RegExp): MetaContext };

const context = require.context('./', true, /^\.\/[a-z0-9-]+\/meta\.ts$/);

const SPORT_ORDER = [...sports.map((sport) => sport.id as string), 'multi-sport'];

function load(): ToolMeta[] {
  const byId = new Map<string, ToolMeta>();
  for (const key of context.keys()) {
    const folder = /^\.\/([a-z0-9-]+)\/meta\.ts$/.exec(key)?.[1];
    if (!folder) continue;
    const meta = context(key).default;
    if (!meta || meta.id !== folder) {
      throw new Error(`src/tools/${folder}/meta.ts — the default export's id must be "${folder}"`);
    }
    byId.set(meta.id, meta);
  }
  return Array.from(byId.values()).sort(
    (a, b) =>
      SPORT_ORDER.indexOf(a.sport) - SPORT_ORDER.indexOf(b.sport) || a.order - b.order || a.id.localeCompare(b.id)
  );
}

/** Every tool, in sport order, then `order`, then id. */
export const tools: ToolMeta[] = load();

export function toolPath(tool: Pick<ToolMeta, 'sport' | 'id'>): string {
  return `/tools/${tool.sport}/${tool.id}/`;
}

export function getToolById(id: string): ToolMeta | undefined {
  return tools.find((tool) => tool.id === id);
}

/** Tools a sport hub lists: its own, then the cross-sport ones that apply. */
export function toolsForSport(sportId: SportId): ToolMeta[] {
  return [
    ...tools.filter((tool) => tool.sport === sportId),
    ...tools.filter((tool) => tool.sport !== sportId && tool.alsoFor.includes(sportId)),
  ];
}

/** Fills `{app}` in a tool's appContext with the catalog name. */
export function fillToolApp(text: string, tool: ToolMeta): string {
  const app = getAppBySlug(tool.primaryApp);
  if (!app) throw new Error(`src/tools/${tool.id}/meta.ts — primaryApp "${tool.primaryApp}" is not in the catalog`);
  return text.replace(/\{app\}/g, app.name);
}

/** Standing copy for /tools/. */
export const toolsIndexCopy = {
  heading: 'Sports calculators',
  intro: [
    'Calculators for the statistics our sports guides explain most often. Each one shows its formula, cites the rulebook or reference it comes from, and works through an example calculated by the same code as the calculator itself.',
    'They are free, they run in your browser, and nothing you type into them is sent anywhere.',
  ],
  method: [
    'Formulas come from the body that defines the statistic — MLB’s Official Baseball Rules, the NFL’s Record & Fact Book, the NCAA’s statisticians’ manual, the USGA’s Rules of Handicapping — or from a standard reference that publishes it, such as Basketball-Reference, Hockey-Reference or MLB.com’s glossary. Every page lists its sources and the date they were checked.',
    'The worked examples on each page are calculated by the same code as the calculator, and that code is tested against the sources’ own published examples — the NFL’s 122.5 passer rating, the NCAA manual’s 161.71 and the rulebook’s 2.89 ERA among them.',
    'Results describe performance that has already happened. They are not predictions, and they are not betting guidance.',
    'The explanations were drafted with AI assistance and have not been reviewed by a person.',
  ],
  metaTitle: 'Sports Calculators: Stats, Ratings and Handicaps',
  metaDescription:
    'Free sports calculators with sourced formulas: passer rating, batting and pitching stats, shooting efficiency, goalie stats, golf handicaps and more.',
  updatedAt: '2026-10-02',
};

// Consistency checks at module load: a typo fails the build rather than
// shipping a broken page. Related articles are checked against the published
// blog where each page renders (src/components/tools/ToolPage.tsx).
{
  const ids = new Set(tools.map((tool) => tool.id));
  const isDay = (value: string) => /^\d{4}-\d{2}-\d{2}$/.test(value);
  for (const tool of tools) {
    const where = `src/tools/${tool.id}/meta.ts`;
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(tool.id)) throw new Error(`${where} — id must be a kebab-case slug`);
    if (tool.sport !== 'multi-sport' && !sportIds.has(tool.sport)) throw new Error(`${where} — unknown sport "${tool.sport}"`);
    for (const sport of tool.alsoFor) {
      if (!sportIds.has(sport)) throw new Error(`${where} — alsoFor lists unknown sport "${sport}"`);
    }
    fillToolApp(tool.appContext, tool);
    if (tool.metaTitle.length > 60) throw new Error(`${where} — metaTitle is over 60 characters`);
    if (tool.metaDescription.length < 70 || tool.metaDescription.length > 160) {
      throw new Error(`${where} — metaDescription must be 70–160 characters (is ${tool.metaDescription.length})`);
    }
    if (tool.faqs.length < 3 || tool.faqs.length > 6) throw new Error(`${where} — needs 3–6 FAQs`);
    if (tool.sources.length === 0) throw new Error(`${where} — needs at least one source`);
    for (const source of tool.sources) {
      if (!isDay(source.accessed)) throw new Error(`${where} — source "${source.title}" needs an ISO accessed date`);
      if (source.url ? !/^https:\/\//.test(source.url) : !source.unlinked) {
        throw new Error(`${where} — source "${source.title}" needs an https url, or an "unlinked" explanation`);
      }
    }
    if (!isDay(tool.publishedAt) || !isDay(tool.updatedAt) || tool.updatedAt < tool.publishedAt) {
      throw new Error(`${where} — publishedAt/updatedAt must be ISO days, updatedAt not before publishedAt`);
    }
    for (const related of tool.relatedTools) {
      if (!ids.has(related) || related === tool.id) throw new Error(`${where} — relatedTools lists unknown tool "${related}"`);
    }
  }
}
