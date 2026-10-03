'use client';

import { useState } from 'react';
import { CalculatorCard, NumberField, ResultRegion, SelectField } from '@/components/tools/fields';
import { formatFixed, parseNumber } from '@/lib/tools/format.mjs';
import { KG_PER_LB, classesForWeight, kgToLb, lbToKg, limitInKg, validateWeight } from '@/lib/tools/weight-classes.mjs';

type Unit = 'lb' | 'kg';

// The illustrative weight used in the worked example below.
const DEFAULT_WEIGHT = '150';

/** A limit in kilograms, to the gram: "70.307". */
const kg = (lb: number) => limitInKg(lb).toFixed(3);

function rangeText(lower: number | null, upper: number | null) {
  if (lower === null && upper !== null) return `Up to ${upper} lb (${kg(upper)} kg)`;
  if (upper === null && lower !== null) return `Over ${lower} lb (${kg(lower)} kg)`;
  if (lower !== null && upper !== null) return `Over ${lower} up to ${upper} lb (${kg(lower)}–${kg(upper)} kg)`;
  return '';
}

export default function WeightClassFinder() {
  const [weight, setWeight] = useState(DEFAULT_WEIGHT);
  const [unit, setUnit] = useState<Unit>('lb');

  const value = parseNumber(weight);
  const errors = validateWeight({ weight: value, unit });
  const found = errors.length === 0 ? classesForWeight({ weight: value, unit }) : null;

  // Distances are shown in the unit the weight was typed in, with an extra
  // decimal when they are small enough to round away.
  const distance = (lb: number) => {
    if (unit === 'lb') return `${formatFixed(lb, lb < 0.1 ? 2 : 1)} lb`;
    const kg = lb * KG_PER_LB;
    return `${formatFixed(kg, kg < 0.01 ? 3 : 2)} kg`;
  };

  const changeUnit = (next: string) => {
    const nextUnit = next === 'kg' ? 'kg' : 'lb';
    if (nextUnit === unit) return;
    // Convert a valid weight rather than reading the same number in the new unit.
    if (validateWeight({ weight: value, unit }).length === 0) {
      setWeight(nextUnit === 'kg' ? formatFixed(lbToKg(value), 3) : formatFixed(kgToLb(value), 1));
    }
    setUnit(nextUnit);
  };

  return (
    <CalculatorCard
      headingId="calculator-heading"
      heading="Find a weight class"
      intro="Every limit is an upper limit: a weight exactly on it belongs to that class."
    >
      <form onSubmit={(event) => event.preventDefault()} noValidate>
        <div className="grid gap-4 sm:grid-cols-2">
          <NumberField id="wc-weight" label="Weight" value={weight} onChange={setWeight} inputMode="decimal" />
          <SelectField
            id="wc-unit"
            label="Unit"
            value={unit}
            onChange={changeUnit}
            options={[
              { value: 'lb', label: 'Pounds (lb)' },
              { value: 'kg', label: 'Kilograms (kg)' },
            ]}
            hint="Switching converts the weight."
          />
        </div>
      </form>

      <ResultRegion errors={errors}>
        {found && (
          <>
            <p className="flex flex-wrap items-baseline gap-x-3">
              <span className="text-sm font-medium text-ink-600">Weight</span>
              <span className="font-display text-4xl font-semibold tabular-nums text-ink-950">
                {formatFixed(found.weightLb, 1)} lb
              </span>
              <span className="text-sm tabular-nums text-ink-500">{formatFixed(found.weightKg, 3)} kg</span>
            </p>
            <dl className="mt-4 grid gap-x-6 gap-y-4 sm:grid-cols-2">
              {found.results.map((r) => (
                <div key={r.table.id}>
                  <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-ink-500">{r.table.label}</dt>
                  <dd className="mt-0.5">
                    <span className="text-lg font-semibold text-ink-950">{r.cls.name}</span>
                    <span className="mt-0.5 block text-sm tabular-nums text-ink-600">{rangeText(r.lower, r.upper)}</span>
                    <span className="block text-xs leading-relaxed text-ink-500">
                      {r.underLimitBy === null
                        ? 'No upper limit.'
                        : r.underLimitBy === 0
                          ? 'Exactly on the limit.'
                          : `${distance(r.underLimitBy)} under the limit.`}
                      {r.heavier ? ` Next up: ${r.heavier.name}.` : ''}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>
          </>
        )}
      </ResultRegion>
    </CalculatorCard>
  );
}
