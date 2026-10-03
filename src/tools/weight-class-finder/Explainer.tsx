import Link from 'next/link';
import { BulletList, DataTable, ExplainerSection, Formula, SubHeading } from '@/components/tools/ExplainerParts';
import { formatFixed } from '@/lib/tools/format.mjs';
import { KG_PER_LB, WEIGHT_TABLES, classesForWeight, limitInKg, type WeightTable } from '@/lib/tools/weight-classes.mjs';

// The illustrative weight the calculator starts on.
const EXAMPLE_LB = 150;

/** A table's rows: class, limit in pounds, limit in kilograms. */
function rows(table: WeightTable) {
  return table.classes.map((c, i) => {
    if (c.upper !== null) return [c.name, `up to ${c.upper}`, `up to ${limitInKg(c.upper).toFixed(3)}`];
    const below = table.classes[i - 1]?.upper ?? 0;
    return [c.name, `over ${below}`, `over ${limitInKg(below).toFixed(3)}`];
  });
}

export default function WeightClassExplainer() {
  const example = classesForWeight({ weight: EXAMPLE_LB, unit: 'lb' });
  const mma = example.results.find((r) => r.table.id === 'abc-mma');
  return (
    <>
      <ExplainerSection id="how-it-works" title="How weight classes work">
        <p>
          Each class runs from just over the limit of the class below it up to and including its own limit — Nevada’s
          regulation and the ABC’s MMA rules both write classes as “over X to Y”. So a weight exactly on a limit is in
          the lighter class, and the heaviest class has no upper limit at all.
        </p>
        <Formula label="Pounds to kilograms">kg = lb × {KG_PER_LB}</Formula>
        <p>
          The limits are set in pounds. The kilogram figures use NIST’s exact factor and are rounded to the nearest gram
          — the three decimals the WBC prints — and a weight typed in kilograms is compared at the same precision, so a
          weight equal to a limit as shown is inside the class. The WBC’s own figures match these except at
          cruiserweight, where it prints 90.719 kg for 200 lb; the exact figure is {formatFixed(200 * KG_PER_LB, 6)}{' '}
          kg.
        </p>
      </ExplainerSection>

      <ExplainerSection id="tables" title="The four tables">
        <p>
          Two of the tables come from regulators and two from sanctioning bodies. The Association of Boxing
          Commissions’ Unified Rules of Boxing do not include a weight table, so for boxing the finder shows a state
          commission’s schedule — Nevada’s — alongside the WBC’s and IBF’s own lists.
        </p>
        {WEIGHT_TABLES.map((table) => (
          <div key={table.id} className="space-y-3">
            <SubHeading>{table.label}</SubHeading>
            <DataTable
              caption={`Source: ${table.source}`}
              columns={['Class', 'Pounds', 'Kilograms']}
              rows={rows(table)}
            />
          </div>
        ))}
      </ExplainerSection>

      <ExplainerSection id="differences" title="Where the boxing tables differ">
        <p>
          From 105 to 175 lb the three boxing tables share the same limits, though the IBF calls several of them “junior”
          classes where the WBC says “light” or “super”, and the IBF adds a 102 lb class below the others. Above 175 lb
          they part company:
        </p>
        <DataTable
          caption="Boxing above 175 lb"
          columns={['Table', 'Classes above light heavyweight']}
          rows={[
            ['Nevada commission', 'Cruiserweight up to 195 lb; heavyweight over 195 lb'],
            ['WBC', 'Cruiserweight up to 200 lb; bridgerweight up to 224 lb; heavyweight over 224 lb'],
            ['IBF', 'Cruiserweight up to 200 lb; heavyweight over 200 lb'],
          ]}
        />
        <p>
          MMA’s classes are a different ladder altogether: under the ABC’s rules, cruiserweight runs to 225 lb and
          heavyweight to 265 lb.
        </p>
      </ExplainerSection>

      <ExplainerSection id="worked-example" title="Worked example">
        <p>
          A weight of {EXAMPLE_LB} lb is {formatFixed(example.weightKg, 3)} kg. The four tables give it three different
          names:
        </p>
        <DataTable
          caption={`${EXAMPLE_LB} lb in each table`}
          columns={['Table', 'Class', 'Under the limit by']}
          rows={example.results.map((r) => [
            r.table.label,
            r.cls.name,
            r.underLimitBy === null ? 'no limit' : `${formatFixed(r.underLimitBy, 1)} lb`,
          ])}
        />
        <p>
          Nevada and the WBC agree on the name and the limit; the IBF has the same limit under a different name; and in
          MMA the same weight sits {formatFixed(mma?.underLimitBy ?? 0, 1)} lb inside {mma?.cls.name.toLowerCase()}.
        </p>
      </ExplainerSection>

      <ExplainerSection id="limits" title="What the finder does not cover">
        <BulletList
          items={[
            'Weight cutting or health. The tables are rule-book limits; nothing here is advice on making weight.',
            'Every organisation. Other sanctioning bodies, such as the WBA and WBO, publish their own lists, and promotions can contract bouts at catch weights between the classes.',
            'Women’s divisions. The WBC lists its women’s divisions separately; the boxing tables here are its men’s list, Nevada’s schedule and the IBF’s list as published.',
            'Changes after 2 October 2026, the day these tables were checked against their sources.',
          ]}
        />
        <p>
          The{' '}
          <Link href="/blog/mma-weight-classes-explained/" className="link-accent">
            guide to MMA weight classes
          </Link>{' '}
          explains why the bands are uneven and how catch weights and missed weight are handled, and{' '}
          <Link href="/blog/how-fight-cards-are-built/" className="link-accent">
            how fight cards are built
          </Link>{' '}
          covers how weight, rankings and styles shape a card.
        </p>
      </ExplainerSection>
    </>
  );
}
