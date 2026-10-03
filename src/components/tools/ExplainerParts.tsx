import type { ReactNode } from 'react';

/**
 * Server-rendered building blocks for a tool's explanation. Everything a
 * reader (or a crawler) needs — the formula, the worked example, the limits —
 * is static HTML; only the calculator above it is interactive.
 */
export function ExplainerSection({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section aria-labelledby={id} className="mt-14">
      <h2 id={id} className="display-title scroll-mt-28 text-2xl sm:text-3xl">
        {title}
      </h2>
      <div className="mt-5 space-y-4 text-base leading-relaxed text-ink-600">{children}</div>
    </section>
  );
}

export function SubHeading({ children }: { children: ReactNode }) {
  return <h3 className="pt-2 font-display text-lg font-semibold text-ink-950">{children}</h3>;
}

/** A formula, set apart and allowed to scroll on a narrow screen rather than overflow. */
export function Formula({ children, label }: { children: ReactNode; label?: string }) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-ink-200 bg-cream-100 px-5 py-4">
      {label && <p className="mb-1 text-xs font-semibold uppercase tracking-[0.12em] text-ink-500">{label}</p>}
      <p className="whitespace-nowrap font-mono text-sm text-ink-900">{children}</p>
    </div>
  );
}

/** A data table with a visible caption and header cells scoped for screen readers. */
export function DataTable({
  caption,
  columns,
  rows,
  rowHeader = true,
}: {
  caption: string;
  columns: string[];
  rows: (string | number)[][];
  rowHeader?: boolean;
}) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-ink-200">
      <table className="w-full border-collapse text-left text-sm">
        <caption className="caption-top px-4 pb-2 pt-4 text-left text-sm font-medium text-ink-700">{caption}</caption>
        <thead>
          <tr className="border-b border-ink-300 bg-cream-100 text-xs uppercase tracking-[0.08em] text-ink-500">
            {columns.map((column) => (
              <th key={column} scope="col" className="px-4 py-2.5 font-semibold">
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="tabular-nums">
          {rows.map((row, i) => (
            <tr key={i} className="border-b border-ink-200 last:border-0">
              {row.map((cell, j) =>
                j === 0 && rowHeader ? (
                  <th key={j} scope="row" className="px-4 py-2.5 font-medium text-ink-800">
                    {cell}
                  </th>
                ) : (
                  <td key={j} className="px-4 py-2.5 text-ink-700">
                    {cell}
                  </td>
                )
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function BulletList({ items }: { items: ReactNode[] }) {
  return (
    <ul className="ml-5 list-disc space-y-2">
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  );
}
