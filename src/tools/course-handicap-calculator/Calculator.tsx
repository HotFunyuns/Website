'use client';

import { useState } from 'react';
import { CalculatorCard, NumberField, ResultList, ResultRegion, SelectField } from '@/components/tools/fields';
import { formatFixed, parseNumber } from '@/lib/tools/format.mjs';
import {
  HANDICAP_ALLOWANCES,
  courseHandicap,
  formatHandicap,
  playingHandicap,
  validateAllowance,
  validateCourseInput,
} from '@/lib/tools/golf.mjs';

const CUSTOM = 'custom';

// The illustrative golfer and tees used in the worked example below.
const DEFAULTS = {
  handicapIndex: '16.9',
  slopeRating: '128',
  courseRating: '71.5',
  par: '72',
  format: 'stroke-individual',
  customPercent: '100',
};

export default function CourseHandicapCalculator() {
  const [raw, setRaw] = useState(DEFAULTS);
  const set = (key: keyof typeof DEFAULTS) => (value: string) => setRaw((prev) => ({ ...prev, [key]: value }));

  const input = {
    handicapIndex: parseNumber(raw.handicapIndex),
    slopeRating: parseNumber(raw.slopeRating),
    courseRating: parseNumber(raw.courseRating),
    par: parseNumber(raw.par),
  };
  const preset = HANDICAP_ALLOWANCES.find((a) => a.id === raw.format);
  const percent = preset ? preset.percent : parseNumber(raw.customPercent);
  const errors = [...validateCourseInput(input), ...validateAllowance(percent)];
  const ch = errors.length === 0 ? courseHandicap(input) : null;
  const ph = ch ? playingHandicap({ courseHandicapExact: ch.exact, percent }) : null;

  return (
    <CalculatorCard
      headingId="calculator-heading"
      heading="Calculate course and playing handicap"
      intro="Use the ratings printed for the tees you are playing — they differ from tee to tee."
    >
      <form onSubmit={(event) => event.preventDefault()} noValidate>
        <div className="grid gap-4 sm:grid-cols-2">
          <NumberField
            id="ch-hi"
            label="Handicap Index"
            value={raw.handicapIndex}
            onChange={set('handicapIndex')}
            inputMode="decimal"
            hint="For a plus handicap, enter a negative number: +1.2 is -1.2."
          />
          <NumberField id="ch-sr" label="Slope Rating of the tees" value={raw.slopeRating} onChange={set('slopeRating')} />
          <NumberField
            id="ch-cr"
            label="Course Rating of the tees"
            value={raw.courseRating}
            onChange={set('courseRating')}
            inputMode="decimal"
          />
          <NumberField id="ch-par" label="Par" value={raw.par} onChange={set('par')} />
          <SelectField
            id="ch-format"
            label="Format of play"
            value={raw.format}
            onChange={set('format')}
            options={[
              ...HANDICAP_ALLOWANCES.map((a) => ({ value: a.id, label: `${a.label} — ${a.percent}%` })),
              { value: CUSTOM, label: 'Another allowance set by the committee' },
            ]}
            hint="Recommended allowances from Appendix C of the Rules of Handicapping."
          />
          {raw.format === CUSTOM && (
            <NumberField
              id="ch-percent"
              label="Allowance (%)"
              value={raw.customPercent}
              onChange={set('customPercent')}
              inputMode="decimal"
            />
          )}
        </div>
      </form>

      <ResultRegion errors={errors}>
        {ch && ph && (
          <>
            <ResultList
              headline
              items={[
                {
                  label: 'Course handicap',
                  value: formatHandicap(ch.rounded, 0),
                  note: `${formatFixed(ch.exact, 2)} before rounding`,
                },
                {
                  label: `Playing handicap (${percent}%)`,
                  value: formatHandicap(ph.rounded, 0),
                  note: `${formatFixed(ph.exact, 2)} before rounding`,
                },
              ]}
            />
            <p className="mt-4 text-xs leading-relaxed text-ink-500">
              The allowance is applied to the unrounded course handicap, and only the result is rounded — as Rule 6.2a
              requires — so the playing handicap can differ from applying the percentage to the rounded figure.
            </p>
          </>
        )}
      </ResultRegion>
    </CalculatorCard>
  );
}
