import Link from 'next/link';
import { BulletList, DataTable, ExplainerSection, Formula } from '@/components/tools/ExplainerParts';
import { formatFixed, formatPercent } from '@/lib/tools/format.mjs';
import {
  PASSER_RATING_COMPONENT_CAP,
  PASSER_RATING_MAX,
  ncaaPassingEfficiency,
  passerRating,
} from '@/lib/tools/football.mjs';

// Each body's own worked example, computed by the same functions the
// calculator uses. scripts/tests/tools.test.mjs pins 122.5 and 161.71.
const NFL_EXAMPLE = { attempts: 502, completions: 343, yards: 4643, touchdowns: 45, interceptions: 6 };
const NCAA_EXAMPLE = { attempts: 166, completions: 98, yards: 1567, touchdowns: 16, interceptions: 7 };

export default function PasserRatingExplainer() {
  const r = passerRating(NFL_EXAMPLE);
  const n = ncaaPassingEfficiency(NCAA_EXAMPLE);
  return (
    <>
      <ExplainerSection id="how-it-works" title="How NFL passer rating is calculated">
        <p>
          The NFL rates passers against a fixed standard. Each of four rates is converted into points, floored at 0
          and capped at {PASSER_RATING_COMPONENT_CAP}, so that no single strength or weakness can dominate the result:
        </p>
        <ol className="ml-5 list-decimal space-y-2">
          <li>
            <strong className="text-ink-900">Completions:</strong> completion percentage, minus 30, multiplied by
            0.05.
          </li>
          <li>
            <strong className="text-ink-900">Yards:</strong> yards per attempt, minus 3, multiplied by 0.25.
          </li>
          <li>
            <strong className="text-ink-900">Touchdowns:</strong> touchdown passes as a percentage of attempts,
            multiplied by 0.2.
          </li>
          <li>
            <strong className="text-ink-900">Interceptions:</strong> {PASSER_RATING_COMPONENT_CAP}, minus the
            interception percentage multiplied by 0.25.
          </li>
        </ol>
        <Formula label="Then">passer rating = (completions + yards + touchdowns + interceptions) ÷ 6 × 100</Formula>
        <p>
          A component reaches its {PASSER_RATING_COMPONENT_CAP} cap at 77.5% completions, 12.5 yards per attempt,
          touchdowns on 11.875% of attempts, or no interceptions at all. Four capped components give the maximum
          rating of {formatFixed(PASSER_RATING_MAX, 1)}.
        </p>
      </ExplainerSection>

      <ExplainerSection id="nfl-example" title="Worked example: the NFL’s own">
        <p>
          The NFL’s Record &amp; Fact Book illustrates the formula with a season of 343 completions in 502 attempts
          for 4,643 yards, 45 touchdowns and six interceptions. Run through the same code as the calculator above, it
          produces the figures the Fact Book prints:
        </p>
        <DataTable
          caption="343 of 502 for 4,643 yards, 45 touchdowns, 6 interceptions"
          columns={['Component', 'Rate', 'Points']}
          rows={[
            ['Completions', formatPercent(r.completionPct / 100, 2), formatFixed(r.components.completion, 3)],
            ['Yards', `${formatFixed(r.yardsPerAttempt, 2)} per attempt`, formatFixed(r.components.yards, 3)],
            ['Touchdowns', formatPercent(r.touchdownPct / 100, 2), formatFixed(r.components.touchdowns, 3)],
            ['Interceptions', formatPercent(r.interceptionPct / 100, 2), formatFixed(r.components.interceptions, 3)],
            ['Sum ÷ 6 × 100', '—', formatFixed(r.rating, 1)],
          ]}
        />
        <p>
          Reading the components is more useful than reading the total. Here the interception component is close to its
          cap and the completion component is strong, while the yards component is the smallest of the four — the
          season’s rating rests on accuracy and on avoiding interceptions as much as on big gains.
        </p>
      </ExplainerSection>

      <ExplainerSection id="ncaa" title="College football: passing efficiency">
        <Formula label="NCAA pass efficiency">
          completion % + 8.4 × yards per attempt + 3.3 × touchdown % − 2 × interception %
        </Formula>
        <p>
          The NCAA’s statisticians’ manual defines its own formula, with no floor and no cap, and says the multipliers
          were chosen to make 100 the average rating. It also tells statisticians to carry every percentage to two
          decimal places, and the calculator follows that procedure, which reproduces the manual’s sample compilation:
        </p>
        <DataTable
          caption="The manual’s sample: 98 of 166 for 1,567 yards, 16 touchdowns, 7 interceptions"
          columns={['Factor', 'Calculation', 'Points']}
          rows={[
            ['Completion %', '98 ÷ 166 × 100', formatFixed(n.factors.completion, 2)],
            ['Yards per attempt × 8.4', `${formatFixed(n.yardsPerAttempt, 2)} × 8.4`, formatFixed(n.factors.yards, 2)],
            ['Touchdown % × 3.3', `${formatFixed(n.touchdownPct, 2)} × 3.3`, formatFixed(n.factors.touchdowns, 2)],
            ['Interception % × 2', `${formatFixed(n.interceptionPct, 2)} × 2`, `− ${formatFixed(n.factors.interceptions, 2)}`],
            ['Efficiency', '—', formatFixed(n.rating, 2)],
          ]}
        />
        <p>
          The two scales are not interchangeable: a college efficiency rating and an NFL passer rating for the same
          stat line will be different numbers, so compare passers only within one system.
        </p>
      </ExplainerSection>

      <ExplainerSection id="limits" title="What passer ratings leave out">
        <BulletList
          items={[
            'Everything that is not a pass. Sacks, scrambles, designed runs and fumbles are outside both formulas, so two passers with the same rating can have contributed very differently.',
            'Context. A completion on third-and-long counts the same as one on first down, and a touchdown pass from the 1-yard line counts the same as one from 60 yards out.',
            'Era. The NFL standard is fixed, not re-centred each season, so ratings from different periods are not directly comparable.',
            'Small samples. With only a few attempts, one touchdown or one interception swings the rating sharply — which is why leaderboards set minimums.',
          ]}
        />
        <p>
          For what a quarterback does beyond the stat sheet, the{' '}
          <Link href="/blog/reading-a-defense-basics/" className="link-accent">
            guide to reading a defence
          </Link>{' '}
          and the{' '}
          <Link href="/blog/quarterback-archetypes-explained/" className="link-accent">
            quarterback archetypes explainer
          </Link>{' '}
          cover the decisions the numbers cannot see.
        </p>
      </ExplainerSection>
    </>
  );
}
