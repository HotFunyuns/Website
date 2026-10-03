'use client';

import type { ReactNode } from 'react';

/**
 * The building blocks every calculator shares.
 *
 * Inputs are plain text fields with an input mode rather than type="number":
 * a number input silently swallows "4,643" and "6.1" edge cases differently in
 * every browser, while a text field hands the exact keystrokes to the parsing
 * rules in src/lib/tools/format.mjs, which can then say what is wrong. Text is
 * 16px so iOS does not zoom on focus.
 */
const inputClass =
  'w-full rounded-xl border border-ink-300 bg-white px-4 py-3 text-base text-ink-900 placeholder-ink-400 transition-colors focus:border-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-300/60 aria-[invalid=true]:border-crimson-500';

export function NumberField({
  id,
  label,
  value,
  onChange,
  hint,
  inputMode = 'numeric',
  invalid = false,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  hint?: string;
  /** `text` for free-text fields such as a draw seed. */
  inputMode?: 'numeric' | 'decimal' | 'text';
  invalid?: boolean;
}) {
  const hintId = hint ? `${id}-hint` : undefined;
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-ink-800">
        {label}
      </label>
      <input
        id={id}
        type="text"
        inputMode={inputMode}
        autoComplete="off"
        spellCheck={false}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        aria-describedby={hintId}
        aria-invalid={invalid || undefined}
        className={inputClass}
      />
      {hint && (
        <p id={hintId} className="mt-1.5 text-xs leading-relaxed text-ink-500">
          {hint}
        </p>
      )}
    </div>
  );
}

export function TextAreaField({
  id,
  label,
  value,
  onChange,
  hint,
  rows = 5,
  invalid = false,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  hint?: string;
  rows?: number;
  invalid?: boolean;
}) {
  const hintId = hint ? `${id}-hint` : undefined;
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-ink-800">
        {label}
      </label>
      <textarea
        id={id}
        rows={rows}
        spellCheck={false}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        aria-describedby={hintId}
        aria-invalid={invalid || undefined}
        className={`${inputClass} font-mono`}
      />
      {hint && (
        <p id={hintId} className="mt-1.5 text-xs leading-relaxed text-ink-500">
          {hint}
        </p>
      )}
    </div>
  );
}

export function SelectField({
  id,
  label,
  value,
  onChange,
  options,
  hint,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  hint?: string;
}) {
  const hintId = hint ? `${id}-hint` : undefined;
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-ink-800">
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        aria-describedby={hintId}
        className={inputClass}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {hint && (
        <p id={hintId} className="mt-1.5 text-xs leading-relaxed text-ink-500">
          {hint}
        </p>
      )}
    </div>
  );
}

/** The calculator card: its own heading, inputs, then the live result region. */
export function CalculatorCard({
  headingId,
  heading,
  intro,
  children,
}: {
  headingId: string;
  heading: string;
  intro?: string;
  children: ReactNode;
}) {
  return (
    <section aria-labelledby={headingId} className="card-premium p-6 sm:p-8">
      <h2 id={headingId} className="display-title text-2xl">
        {heading}
      </h2>
      {intro && <p className="mt-2 text-sm leading-relaxed text-ink-500">{intro}</p>}
      <div className="mt-6">{children}</div>
    </section>
  );
}

/**
 * Results or the reasons there are none, announced politely to screen readers
 * as they change. The minimum height keeps the page from jumping while someone
 * types an invalid value on the way to a valid one.
 */
export function ResultRegion({
  errors,
  children,
  minHeight = 'min-h-[8rem]',
}: {
  errors: string[];
  children: ReactNode;
  minHeight?: string;
}) {
  return (
    <div
      aria-live="polite"
      aria-atomic="true"
      className={`mt-6 rounded-2xl border border-ink-200 bg-cream-100 p-5 sm:p-6 ${minHeight}`}
    >
      {errors.length > 0 ? (
        <div>
          <p className="text-sm font-semibold text-crimson-700">Check these values:</p>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-relaxed text-crimson-700">
            {errors.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        </div>
      ) : (
        children
      )}
    </div>
  );
}

/** Label/value pairs. The first item can be promoted as the headline figure. */
export function ResultList({
  items,
  headline = false,
}: {
  items: { label: string; value: string; note?: string }[];
  headline?: boolean;
}) {
  const [first, ...rest] = items;
  const listed = headline ? rest : items;
  return (
    <div>
      {headline && first && (
        <p className="flex flex-wrap items-baseline gap-x-3">
          <span className="text-sm font-medium text-ink-600">{first.label}</span>
          <span className="font-display text-4xl font-semibold tabular-nums text-ink-950">{first.value}</span>
          {first.note && <span className="text-sm text-ink-500">{first.note}</span>}
        </p>
      )}
      {listed.length > 0 && (
        <dl className={`grid gap-x-6 gap-y-3 sm:grid-cols-2 ${headline ? 'mt-4' : ''}`}>
          {listed.map((item) => (
            <div key={item.label} className="flex flex-col">
              <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-ink-500">{item.label}</dt>
              <dd className="mt-0.5 text-lg font-semibold tabular-nums text-ink-950">
                {item.value}
                {item.note && <span className="ml-2 text-sm font-normal text-ink-500">{item.note}</span>}
              </dd>
            </div>
          ))}
        </dl>
      )}
    </div>
  );
}

/** Reads a set of raw field strings through one parser. */
export function parseAll<T extends string>(
  raw: Record<T, string>,
  parse: (value: string) => number
): Record<T, number> {
  const out = {} as Record<T, number>;
  for (const key of Object.keys(raw) as T[]) out[key] = parse(raw[key]);
  return out;
}
