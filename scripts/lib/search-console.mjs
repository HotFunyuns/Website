// Reading Google Search Console exports, and turning them into refresh
// candidates. Pure functions; the CLI in scripts/search-console-refresh.mjs
// does the file handling.
//
// Search Console's Performance report exports one CSV per table (Queries.csv,
// Pages.csv, Countries.csv, Devices.csv, Dates.csv…). A single-period export has
// columns like `Top pages, Clicks, Impressions, CTR, Position`. With "Compare"
// switched on, every metric appears once per period, each prefixed with the
// period's label — "Last 28 days Clicks", "Previous 28 days Clicks", or a date
// range. The labels vary by language and by the comparison chosen, so the
// parser recognises the metric by its suffix and treats whatever precedes it
// as the period label.

/** RFC 4180 CSV: quoted fields, doubled quotes, embedded commas and newlines, BOM. */
export function parseCsv(text) {
  const input = text.replace(/^﻿/, '');
  const rows = [];
  let row = [];
  let field = '';
  let quoted = false;
  for (let i = 0; i < input.length; i++) {
    const ch = input[i];
    if (quoted) {
      if (ch === '"' && input[i + 1] === '"') {
        field += '"';
        i++;
      } else if (ch === '"') quoted = false;
      else field += ch;
    } else if (ch === '"') quoted = true;
    else if (ch === ',') {
      row.push(field);
      field = '';
    } else if (ch === '\n' || ch === '\r') {
      if (ch === '\r' && input[i + 1] === '\n') i++;
      row.push(field);
      rows.push(row);
      row = [];
      field = '';
    } else field += ch;
  }
  if (field !== '' || row.length) {
    row.push(field);
    rows.push(row);
  }
  return rows.filter((r) => r.some((cell) => cell.trim() !== ''));
}

const METRICS = ['clicks', 'impressions', 'ctr', 'position'];
const METRIC_SUFFIX = /(clicks|impressions|ctr|position)\s*$/i;

/** Numbers as Search Console writes them: "1,234", "3.4%", "12.5", "". */
export function parseMetric(metric, raw) {
  const text = String(raw ?? '').trim().replace(/,/g, '');
  if (text === '' || text === '-') return null;
  if (metric === 'ctr') {
    const value = parseFloat(text.replace('%', ''));
    return Number.isFinite(value) ? (text.includes('%') ? value / 100 : value) : null;
  }
  const value = parseFloat(text);
  return Number.isFinite(value) ? value : null;
}

function periodEnd(label) {
  // "Aug 28, 2026 - Sep 24, 2026", "2026-08-28 - 2026-09-24", "8/28/26 - 9/24/26"
  const parts = label.split(/\s[-–]\s/);
  const last = parts[parts.length - 1];
  const time = Date.parse(last);
  return Number.isFinite(time) ? time : null;
}

/**
 * A Performance table: { key, periods: [{ label, role }], rows: [{ key, current, previous }] }
 * where current/previous are { clicks, impressions, ctr, position } (previous is
 * null for a single-period export). Throws if the header is not recognisable.
 */
export function readPerformanceTable(text) {
  const [header, ...body] = parseCsv(text);
  if (!header || header.length < 2) throw new Error('empty or headerless CSV');
  const columns = header.map((name, index) => {
    const match = METRIC_SUFFIX.exec(name.trim());
    if (!match) return { index, name: name.trim(), metric: null };
    return { index, name: name.trim(), metric: match[1].toLowerCase(), label: name.trim().slice(0, match.index).trim() };
  });
  const keyColumn = columns.find((c) => !c.metric);
  if (!keyColumn) throw new Error('no key column (e.g. "Top pages" or "Top queries")');
  const labels = [...new Set(columns.filter((c) => c.metric).map((c) => c.label))];
  if (labels.length === 0) throw new Error('no Clicks/Impressions/CTR/Position columns');
  if (labels.length > 2) throw new Error(`more than two periods in one file: ${labels.join(' | ')}`);

  let currentLabel = labels[0];
  if (labels.length === 2) {
    const previousByWord = labels.find((l) => /previous|prior|before|vorher|anterior|précédente/i.test(l));
    if (previousByWord) currentLabel = labels.find((l) => l !== previousByWord);
    else {
      const [a, b] = labels.map(periodEnd);
      if (a !== null && b !== null) currentLabel = a >= b ? labels[0] : labels[1];
    }
  }
  const previousLabel = labels.find((l) => l !== currentLabel) ?? null;

  const pick = (row, label) => {
    const values = {};
    for (const metric of METRICS) {
      const column = columns.find((c) => c.metric === metric && c.label === label);
      values[metric] = column ? parseMetric(metric, row[column.index]) : null;
    }
    return values;
  };

  return {
    key: keyColumn.name,
    periods: [
      { label: currentLabel || 'current', role: 'current' },
      ...(previousLabel !== null ? [{ label: previousLabel || 'previous', role: 'previous' }] : []),
    ],
    rows: body.map((row) => ({
      key: String(row[keyColumn.index] ?? '').trim(),
      current: pick(row, currentLabel),
      previous: previousLabel !== null ? pick(row, previousLabel) : null,
    })),
  };
}

/** Page + query rows (API, Looker Studio or a Sheets add-on). Header names vary; these are matched loosely. */
export function readPageQueryTable(text) {
  const [header, ...body] = parseCsv(text);
  const find = (...patterns) => header.findIndex((h) => patterns.some((p) => p.test(h.trim())));
  const page = find(/^(?:top )?pages?$/i, /^url$/i, /^landing page$/i, /^page url$/i);
  const query = find(/^(?:top )?quer(?:y|ies)$/i, /^search query$/i);
  const clicks = find(/clicks$/i);
  const impressions = find(/impressions$/i);
  const ctr = find(/ctr$/i, /click.?through/i);
  const position = find(/position$/i);
  if (page < 0 || query < 0 || impressions < 0) {
    throw new Error('page-query CSV needs page, query and impressions columns');
  }
  return body.map((row) => ({
    page: row[page].trim(),
    query: row[query].trim(),
    clicks: parseMetric('clicks', row[clicks]) ?? 0,
    impressions: parseMetric('impressions', row[impressions]) ?? 0,
    ctr: ctr >= 0 ? parseMetric('ctr', row[ctr]) : null,
    position: position >= 0 ? parseMetric('position', row[position]) : null,
  }));
}

/** The URL column of a Pages-report (indexing) export. */
export function readIndexingTable(text, fallbackReason) {
  const [header, ...body] = parseCsv(text);
  const url = header.findIndex((h) => /^url$/i.test(h.trim()));
  const reason = header.findIndex((h) => /^(?:reason|status|issue)$/i.test(h.trim()));
  const crawled = header.findIndex((h) => /last crawled/i.test(h.trim()));
  if (url < 0) throw new Error('indexing CSV needs a URL column');
  return body.map((row) => ({
    url: row[url].trim(),
    reason: reason >= 0 ? row[reason].trim() : fallbackReason,
    lastCrawled: crawled >= 0 ? row[crawled].trim() : null,
  }));
}

/** Relative change, or null when the base is too small to mean anything. */
export function relativeChange(now, before, minBase = 1) {
  if (now === null || before === null || before < minBase) return null;
  return (now - before) / before;
}

/**
 * The site's own median CTR by position bucket, from its own Pages table — the
 * yardstick for "this page's CTR is low for where it ranks". Published industry
 * CTR curves are not used: they describe other sites.
 */
export function ctrByPositionBucket(rows, minImpressions) {
  const buckets = new Map();
  for (const row of rows) {
    const { impressions, ctr, position } = row.current;
    if (impressions === null || impressions < minImpressions || ctr === null || position === null) continue;
    const bucket = Math.min(30, Math.max(1, Math.round(position)));
    if (!buckets.has(bucket)) buckets.set(bucket, []);
    buckets.get(bucket).push(ctr);
  }
  const medians = new Map();
  for (const [bucket, values] of buckets) {
    if (values.length < 3) continue; // too few pages to call anything typical
    values.sort((a, b) => a - b);
    medians.set(bucket, values[Math.floor(values.length / 2)]);
  }
  return medians;
}
