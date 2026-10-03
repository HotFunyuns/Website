'use client';

import Link from 'next/link';
import { useState } from 'react';
import { CalculatorCard, NumberField, ResultList, ResultRegion, TextAreaField, parseAll } from '@/components/tools/fields';
import { formatFixed, parseNumber } from '@/lib/tools/format.mjs';
import {
  formatHandicap,
  handicapIndex,
  parseDifferentials,
  scoreDifferential,
  validateDifferentials,
  validateRound,
} from '@/lib/tools/golf.mjs';

// The illustrative rounds used in the worked example below — not a real golfer.
const ROUND_DEFAULTS = { adjustedGrossScore: '92', courseRating: '71.5', slopeRating: '128', pcc: '0' };
const DIFFERENTIALS_DEFAULT = '18.1\n20.4\n16.9\n22.0\n19.3';

const stepHeading = 'font-display text-lg font-semibold text-ink-950';

export default function HandicapIndexCalculator() {
  const [round, setRound] = useState(ROUND_DEFAULTS);
  const [differentialText, setDifferentialText] = useState(DIFFERENTIALS_DEFAULT);
  const setRoundField = (key: keyof typeof ROUND_DEFAULTS) => (value: string) =>
    setRound((prev) => ({ ...prev, [key]: value }));

  const roundInput = parseAll(round, parseNumber);
  const roundErrors = validateRound(roundInput);
  const differential = roundErrors.length === 0 ? scoreDifferential(roundInput) : null;

  const differentials = parseDifferentials(differentialText);
  const indexErrors = validateDifferentials(differentials);
  const index = indexErrors.length === 0 ? handicapIndex(differentials) : null;

  return (
    <CalculatorCard
      headingId="calculator-heading"
      heading="Calculate your Handicap Index"
      intro="Work out each round’s score differential, collect them in the list, and the index updates as you go."
    >
      <div role="group" aria-labelledby="step-differential" className="border-b border-ink-200 pb-8">
        <h3 id="step-differential" className={stepHeading}>
          1. Score differential for one round
        </h3>
        <form onSubmit={(event) => event.preventDefault()} noValidate className="mt-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <NumberField
              id="hc-ags"
              label="Adjusted gross score"
              value={round.adjustedGrossScore}
              onChange={setRoundField('adjustedGrossScore')}
              hint="Your 18-hole score after net double bogey and the other adjustments."
            />
            <NumberField
              id="hc-cr"
              label="Course Rating"
              value={round.courseRating}
              onChange={setRoundField('courseRating')}
              inputMode="decimal"
            />
            <NumberField
              id="hc-sr"
              label="Slope Rating"
              value={round.slopeRating}
              onChange={setRoundField('slopeRating')}
              hint="113 is a course of standard difficulty."
            />
            <NumberField
              id="hc-pcc"
              label="PCC adjustment"
              value={round.pcc}
              onChange={setRoundField('pcc')}
              hint="−1 to +3, as published for the day. Usually 0."
            />
          </div>
        </form>
        <ResultRegion errors={roundErrors} minHeight="min-h-[6rem]">
          {differential && (
            <>
              <ResultList
                headline
                items={[
                  {
                    label: 'Score differential',
                    value: formatFixed(differential.rounded, 1),
                    note: `${formatFixed(differential.exact, 3)} before rounding`,
                  },
                ]}
              />
              <button
                type="button"
                className="btn-outline btn-sm mt-4"
                onClick={() =>
                  setDifferentialText((prev) => `${prev.trim()}${prev.trim() ? '\n' : ''}${formatFixed(differential.rounded, 1)}`)
                }
              >
                Add {formatFixed(differential.rounded, 1)} to the list in step 2
              </button>
            </>
          )}
        </ResultRegion>
      </div>

      <div role="group" aria-labelledby="step-index" className="pt-8">
        <h3 id="step-index" className={stepHeading}>
          2. Handicap Index from your differentials
        </h3>
        <form onSubmit={(event) => event.preventDefault()} noValidate className="mt-4">
          <TextAreaField
            id="hc-diffs"
            label="Score differentials, oldest first"
            value={differentialText}
            onChange={setDifferentialText}
            hint="One per line, or separated by commas. Only the most recent 20 count."
            invalid={indexErrors.length > 0}
          />
        </form>
        <ResultRegion errors={indexErrors}>
          {index && (
            <ResultList
              headline
              items={[
                {
                  label: 'Estimated Handicap Index',
                  value: formatHandicap(index.index, 1),
                  note: index.capped ? 'capped at the 54.0 maximum' : undefined,
                },
                {
                  label: 'Differentials counted',
                  value: String(index.considered.length),
                  note: index.ignored > 0 ? `${index.ignored} older ignored` : undefined,
                },
                {
                  label: index.used.length === 1 ? 'Lowest differential used' : `Lowest ${index.used.length} averaged`,
                  value: index.used.map((d) => formatFixed(d, 1)).join(', '),
                },
                {
                  label: 'Table adjustment',
                  value: index.adjustment === 0 ? 'none' : formatFixed(index.adjustment, 1),
                },
              ]}
            />
          )}
        </ResultRegion>
        <p className="mt-4 text-sm text-ink-600">
          Next:{' '}
          <Link href="/tools/golf/course-handicap-calculator/" className="link-accent">
            turn your index into a course handicap for a set of tees
          </Link>
          .
        </p>
      </div>
    </CalculatorCard>
  );
}
