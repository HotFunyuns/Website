import Link from 'next/link';
import { BulletList, DataTable, ExplainerSection, Formula } from '@/components/tools/ExplainerParts';
import { DECISION_LABELS, decide, formatCard, scoreBout } from '@/lib/tools/scorecard.mjs';

const none = (rounds: number) => Array.from({ length: rounds }, () => ({ red: 0, blue: 0 }));

// The ABC Boxing Judge Manual's example: every round of a 12-round bout won
// 10-9 by the same boxer.
const TWELVE = Array.from({ length: 12 }, () => 'R9');
// An illustrative three-round MMA bout — not a real fight — that is also the
// calculator's default; then the same cards with one point taken from red in round 3.
const CARDS = [
  ['R9', 'B9', 'R9'],
  ['R9', 'R9', 'B9'],
  ['B9', 'B9', 'R9'],
];
const ONE_POINT = [
  { red: 0, blue: 0 },
  { red: 0, blue: 0 },
  { red: 1, blue: 0 },
];

const verdictLabel = (v: 'red' | 'blue' | 'even') => (v === 'even' ? 'Level' : v === 'red' ? 'Red' : 'Blue');

export default function FightScorecardExplainer() {
  const twelve = scoreBout({ sport: 'boxing', rounds: 12, cards: [TWELVE, TWELVE, TWELVE], deductions: none(12) });
  const clean = scoreBout({ sport: 'mma', rounds: 3, cards: CARDS, deductions: none(3) });
  const docked = scoreBout({ sport: 'mma', rounds: 3, cards: CARDS, deductions: ONE_POINT });
  const types: { cards: ('red' | 'blue' | 'even')[]; meaning: string }[] = [
    { cards: ['red', 'red', 'red'], meaning: 'All three judges score it for the same fighter' },
    { cards: ['red', 'red', 'blue'], meaning: 'Two for one fighter, one for the other' },
    { cards: ['red', 'red', 'even'], meaning: 'Two for the same fighter, one a draw' },
    { cards: ['even', 'even', 'even'], meaning: 'All three judges score it a draw' },
    { cards: ['even', 'even', 'red'], meaning: 'Two judges score it a draw' },
    { cards: ['red', 'blue', 'even'], meaning: 'One each way and one a draw' },
  ];
  return (
    <>
      <ExplainerSection id="formulas" title="How a scorecard adds up">
        <Formula label="Each round">winner 10 · loser 9 or fewer · an even round 10–10</Formula>
        <Formula label="Each card">total = sum of the round scores − that fighter’s point deductions</Formula>
        <p>
          In MMA the ABC’s unified rules describe four round scores: 10–10 when there is no difference between the
          fighters, 10–9 for a close round, 10–8 for a round won by a large margin through damage, dominance and
          duration, and 10–7 when one fighter is completely dominated. In boxing the ABC’s judge manual gives 10–9 when
          one boxer routinely won the round, 10–8 for a knockdown or an extremely decisive round, 10–7 for two
          knockdowns, and 10–6 or lower for more — the scorecard here goes down to 10–6. Deductions are made by the
          referee and marked next to the round score on every judge’s card.
        </p>
        <DataTable
          caption="What three cards produce (ABC unified rules; red is the example winner)"
          columns={['Cards', 'Meaning', 'Result']}
          rows={types.map((t) => {
            const d = decide(t.cards);
            return [t.cards.map(verdictLabel).join(', '), t.meaning, DECISION_LABELS[d.type]];
          })}
        />
        <p>
          A fighter needs a majority of the cards. Nevada’s boxing regulation says the same thing directly: “The
          majority opinion is conclusive and, if there is no majority, the decision is a draw.”
        </p>
      </ExplainerSection>

      <ExplainerSection id="worked-example" title="Worked examples">
        <p>
          The ABC’s boxing judge manual warns against making close fights look closer than they were: if one boxer wins
          every round by the slimmest of margins, “your championship score could read 120-108”. Twelve rounds of 10–9
          through the same code: {formatCard(twelve.cards[0])}, a {DECISION_LABELS[twelve.decision.type]}.
        </p>
        <p>
          Now an illustrative three-round MMA bout — not a real fight, and the calculator’s starting cards. Judge 1
          gives red rounds one and three, judge 2 gives red the first two, and judge 3 gives blue the first two, every
          round scored 10–9:
        </p>
        <DataTable
          caption="One bout, with and without a one-point deduction from red in round 3"
          columns={['Card', 'No deductions', 'Red docked a point']}
          rows={clean.cards.map((card, i) => [
            `Judge ${i + 1}`,
            `${formatCard(card)} (${verdictLabel(card.verdict)})`,
            `${formatCard(docked.cards[i])} (${verdictLabel(docked.cards[i].verdict)})`,
          ])}
        />
        <p>
          Without deductions red wins by {DECISION_LABELS[clean.decision.type]}. Take one point from red in the last
          round and two cards become level: the bout is a {DECISION_LABELS[docked.decision.type]}. Because a deduction
          comes off every card at once, a single point can change the result of a close fight.
        </p>
      </ExplainerSection>

      <ExplainerSection id="stoppages" title="Bouts stopped early">
        <p>
          The scorecard assumes the bout went the distance. When a bout is stopped by an injury from an accidental foul,
          the cards can still decide it as a technical decision: in MMA under the ABC’s unified rules once two of three,
          or three of five, scheduled rounds are complete, and in boxing under the ABC’s rules after four completed
          rounds. The partial round is scored too. Stopped earlier, the MMA rules give a no contest or a
          disqualification, and the boxing rules a no decision.
        </p>
      </ExplainerSection>

      <ExplainerSection id="limits" title="What the scorecard does not do">
        <BulletList
          items={[
            'Judge the rounds. It adds up the scores you give; deciding who won a round is the judges’ job, under the criteria above.',
            'Every commission’s variations. The ABC’s judge manual notes that the scoring of penalty points can vary from commission to commission.',
            'Real bouts. It holds no fighters, events or official cards.',
          ]}
        />
        <p>
          The{' '}
          <Link href="/blog/boxing-scoring-explained/" className="link-accent">
            guide to boxing scoring
          </Link>{' '}
          covers what judges weigh in a round, and{' '}
          <Link href="/blog/how-mma-judging-criteria-work/" className="link-accent">
            how MMA judging criteria work
          </Link>{' '}
          explains why three judges can see the same round differently.
        </p>
      </ExplainerSection>
    </>
  );
}
