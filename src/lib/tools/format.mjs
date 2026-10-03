// Number parsing, rounding and display rules shared by every calculator.
//
// Plain JavaScript with JSDoc so the same functions run in three places: the
// static build (worked examples), the browser (the interactive calculators) and
// `npm test` (scripts/tests/tools.test.mjs). A worked example on a page can
// therefore never disagree with the calculator beside it.

/**
 * Rounds half up — toward +Infinity — to `decimals` places.
 *
 * This is the rule the USGA states for score differentials ("rounded to the
 * nearest tenth, with .5 rounded upwards") and the conventional rule for
 * printed rate statistics. The small tolerance absorbs binary floating-point
 * error, so 16.95 (stored as 16.949999…) still rounds to 17.0.
 *
 * @param {number} value
 * @param {number} [decimals]
 * @returns {number}
 */
export function roundHalfUp(value, decimals = 0) {
  const factor = 10 ** decimals;
  const rounded = Math.floor(value * factor + 0.5 + 1e-9) / factor;
  return Object.is(rounded, -0) ? 0 : rounded;
}

/**
 * Reads what a person typed into a number field. Accepts thousands separators
 * ("4,643") and a Unicode minus; anything else that is not a plain decimal
 * number is NaN, so validation can say so instead of guessing.
 *
 * @param {string | number | null | undefined} raw
 * @returns {number}
 */
export function parseNumber(raw) {
  if (typeof raw === 'number') return raw;
  const cleaned = String(raw ?? '')
    .trim()
    .replace(/,/g, '')
    .replace(/−/g, '-');
  if (!/^[-+]?(?:\d+(?:\.\d*)?|\.\d+)$/.test(cleaned)) return Number.NaN;
  return Number(cleaned);
}

/** True when a field was left empty, which some calculators treat as "not used". */
export function isBlank(raw) {
  return String(raw ?? '').trim() === '';
}

/**
 * Pushes a message onto `errors` unless `value` is a whole number in range.
 *
 * @param {string[]} errors
 * @param {string} label
 * @param {number} value
 * @param {{ min?: number, max?: number }} [range]
 */
export function requireWhole(errors, label, value, { min = 0, max = 1_000_000 } = {}) {
  if (!Number.isFinite(value)) errors.push(`${label}: enter a number.`);
  else if (!Number.isInteger(value)) errors.push(`${label}: enter a whole number.`);
  else if (value < min) errors.push(`${label} must be at least ${min.toLocaleString('en-US')}.`);
  else if (value > max) errors.push(`${label} must be no more than ${max.toLocaleString('en-US')}.`);
}

/**
 * Like requireWhole, for values that may carry decimals.
 *
 * @param {string[]} errors
 * @param {string} label
 * @param {number} value
 * @param {{ min?: number, max?: number }} [range]
 */
export function requireNumber(errors, label, value, { min = -1_000_000, max = 1_000_000 } = {}) {
  if (!Number.isFinite(value)) errors.push(`${label}: enter a number.`);
  else if (value < min) errors.push(`${label} must be at least ${min}.`);
  else if (value > max) errors.push(`${label} must be no more than ${max}.`);
}

/**
 * A fixed number of decimals, rounded half up.
 *
 * @param {number} value
 * @param {number} decimals
 * @returns {string}
 */
export function formatFixed(value, decimals) {
  return roundHalfUp(value, decimals).toFixed(decimals);
}

/**
 * Baseball and hockey print rates to three places without the leading zero:
 * .300, .915 — but 1.024 for an OPS above one.
 *
 * @param {number} value
 * @param {number} [decimals]
 * @returns {string}
 */
export function formatRate(value, decimals = 3) {
  const fixed = formatFixed(value, decimals);
  if (fixed.startsWith('0.')) return fixed.slice(1);
  if (fixed.startsWith('-0.')) return `-${fixed.slice(2)}`;
  return fixed;
}

/**
 * A fraction shown as a percentage: 0.6382 → "63.8%".
 *
 * @param {number} fraction
 * @param {number} [decimals]
 * @returns {string}
 */
export function formatPercent(fraction, decimals = 1) {
  return `${formatFixed(fraction * 100, decimals)}%`;
}

/**
 * A whole number with thousands separators.
 *
 * @param {number} value
 * @returns {string}
 */
export function formatInteger(value) {
  return Math.round(value).toLocaleString('en-US');
}
