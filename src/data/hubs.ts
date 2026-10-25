import type { CategoryId } from './apps';

/**
 * Topic hubs sit underneath the seven app categories. A category answers "which
 * app is this about?"; a hub answers "which subject is this about?" — and those
 * are not the same question once one category holds two hundred articles.
 *
 * A hub is only worth a URL if it says something the listing alone does not, so
 * every hub here carries standing editorial copy written for it. `intro` is the
 * argument for why the subject is worth a reader's time; `orientation` is the
 * practical "where should I start" advice that a bare list of cards cannot give.
 */
export interface HubInfo {
  id: string;
  label: string;
  shortLabel: string;
  /** One-line summary used on cards and in meta descriptions. */
  blurb: string;
  /** The app this hub's articles are anchored to. */
  appSlug: string;
  categoryId: CategoryId;
  /** The single article that best introduces the subject. Must be a published slug. */
  cornerstone: string;
  /** Hubs worth crossing to from here. */
  relatedHubs: string[];
  intro: string[];
  orientation: { title: string; body: string }[];
  metaTitle: string;
  metaDescription: string;
}

export const hubs: HubInfo[] = [
  // ---------------------------------------------------------------- cognition
  {
    id: 'iq-tests-and-reasoning',
    label: 'IQ Tests and Reasoning',
    shortLabel: 'IQ & Reasoning',
    blurb:
      'What IQ tests actually measure, what the numbers mean, and where an app quiz stops and a psychological assessment begins.',
    appSlug: 'mental-math-memory-games',
    categoryId: 'education-brain',
    cornerstone: 'what-iq-tests-actually-measure',
    relatedHubs: ['logic-and-pattern-puzzles', 'brain-training-games', 'memory-and-attention'],
    intro: [
      'Almost everything written about IQ online is either a sales pitch for a quiz or an argument about politics. Neither tells you the thing worth knowing: an IQ score is a rank, not a quantity. It describes where one person sat relative to a comparison group on one day, on one set of tasks, and it carries a margin of error wide enough to matter.',
      'That single idea does most of the work in this subject. It explains why two tests disagree, why a score moves between sittings, why "genius-level" thresholds are marketing, and why a free online quiz cannot produce the number a supervised assessment produces — no matter how similar the questions look.',
      'These articles cover the reasoning tasks themselves, the statistics that turn answers into a score, and the limits of the whole exercise. They are written to be useful to someone deciding whether a result means anything, and honest about the fact that most of the time the answer is "less than the number implies".',
    ],
    orientation: [
      {
        title: 'Start with what the score is',
        body: 'Read the cornerstone guide first. Standardisation, norming and the standard error of measurement come up in every other article here, and none of them make sense in isolation.',
      },
      {
        title: 'Then the task types',
        body: 'Matrix reasoning, series completion, analogies and spatial rotation each have their own logic. Knowing how an item is built is the difference between pattern-matching and understanding.',
      },
      {
        title: 'Keep practice and assessment apart',
        body: 'Practising a task type improves performance on that task type. That is a real, useful effect, and it is not the same as a change in underlying ability — an important distinction the practice-focused hubs return to repeatedly.',
      },
    ],
    metaTitle: 'IQ Tests and Reasoning — Guides and Explainers',
    metaDescription:
      'What IQ tests measure, how scores are built, how reasoning items work, and where an entertainment quiz stops and a real assessment begins.',
  },
  {
    id: 'brain-training-games',
    label: 'Brain Training Games',
    shortLabel: 'Brain Training',
    blurb:
      'What the research actually supports, how to build a practice routine, and how to read your own progress honestly.',
    appSlug: 'mental-math-memory-games',
    categoryId: 'education-brain',
    cornerstone: 'do-brain-training-apps-work',
    relatedHubs: ['memory-and-attention', 'mental-math', 'iq-tests-and-reasoning'],
    intro: [
      'The brain-training industry made a large promise — that playing games would make you broadly smarter — and the evidence did not support it. What the evidence does support is narrower and more useful: you get better at the thing you practise, and that improvement transfers only weakly, if at all, to tasks that look different.',
      'That is not a reason to stop practising. It is a reason to practise deliberately. If you want to be faster at arithmetic, drill arithmetic. If you want to hold more in working memory during a task, train that task. The honest framing makes the activity more useful, not less, because it points you at practice that matches the thing you actually want to improve.',
      'These articles cover routine design, session length, difficulty progression, how to read a score history without fooling yourself, and what the major studies and regulatory findings actually said.',
    ],
    orientation: [
      {
        title: 'Read the evidence guide first',
        body: 'The cornerstone article covers the far-transfer problem and the regulatory action taken against overclaiming. It sets the expectations everything else here assumes.',
      },
      {
        title: 'Design a routine you will repeat',
        body: 'Short and frequent beats long and occasional, mostly because it survives contact with a normal week. The routine articles cover what that looks like in practice.',
      },
      {
        title: 'Read your own data sceptically',
        body: 'Early score gains are largely task familiarity. The progress-tracking articles cover how to tell learning from warm-up.',
      },
    ],
    metaTitle: 'Brain Training Games — Evidence and Practice',
    metaDescription:
      'What brain-training research actually supports, how to design a practice routine that lasts, and how to read progress data without fooling yourself.',
  },
  {
    id: 'mental-math',
    label: 'Mental Math',
    shortLabel: 'Mental Math',
    blurb:
      'Methods for calculating in your head — the four operations, percentages, estimation and the shortcuts worth memorising.',
    appSlug: 'mental-math-memory-games',
    categoryId: 'education-brain',
    cornerstone: 'mental-math-training-guide',
    relatedHubs: ['brain-training-games', 'logic-and-pattern-puzzles', 'iq-tests-and-reasoning'],
    intro: [
      'Mental arithmetic is a set of methods, not a talent. People who calculate quickly are almost never doing the written algorithm faster in their heads — they are using a different method, one chosen to suit the numbers in front of them and to keep as little as possible in working memory at once.',
      'Written methods are optimised for paper: they work right-to-left, they generalise to any size of number, and they require you to store digits until the end. Mental methods work left-to-right, get the magnitude right first, and lean on structure — near-doubles, complements to ten, distributing over a round number. That is why 48 × 5 is easier as half of 480 than as a column multiplication.',
      'These articles cover the methods themselves, when each one applies, the arithmetic facts worth knowing outright, and how to build the fluency that makes the methods usable under time pressure.',
    ],
    orientation: [
      {
        title: 'Learn methods before speed',
        body: 'Speed is what happens when a good method becomes automatic. Drilling a bad method just makes you fast at the hard way.',
      },
      {
        title: 'Get the magnitude first',
        body: 'Estimation is not a consolation prize for failing to get the exact answer. In most real situations it is the answer you needed, and it catches the errors exact methods produce.',
      },
      {
        title: 'Match the method to the numbers',
        body: 'The skill worth building is recognising which shortcut the numbers invite. The operation-specific guides are organised around that recognition.',
      },
    ],
    metaTitle: 'Mental Math Methods and Practice Guides',
    metaDescription:
      'Left-to-right arithmetic, complements, near-doubles, percentage shortcuts and estimation — the methods behind fast mental calculation, explained.',
  },
  {
    id: 'logic-and-pattern-puzzles',
    label: 'Logic and Pattern Puzzles',
    shortLabel: 'Logic & Patterns',
    blurb:
      'Sequences, matrices, analogies and deduction problems — how each type is constructed and how to solve it systematically.',
    appSlug: 'mental-math-memory-games',
    categoryId: 'education-brain',
    cornerstone: 'number-sequence-puzzles-explained',
    relatedHubs: ['iq-tests-and-reasoning', 'brain-training-games', 'mental-math'],
    intro: [
      'A puzzle feels like inspiration and is usually procedure. Number sequences have a small number of underlying rules; matrix problems vary a small number of attributes; syllogisms fail in a small number of predictable ways. Once you know the catalogue, most items become a search through it rather than a wait for insight.',
      'This matters because the alternative — staring until something clicks — does not scale and does not survive a time limit. A systematic first pass tells you within seconds whether a sequence is arithmetic, geometric, recursive, interleaved, or built on differences of differences, and that is most of the work.',
      'These articles cover the construction of each puzzle type, the solving procedure that fits it, and the specific reasoning errors that make otherwise-capable people get them wrong.',
    ],
    orientation: [
      {
        title: 'Work the difference table first',
        body: 'For numeric sequences, first and second differences identify most rules immediately. The sequences guide covers the full procedure.',
      },
      {
        title: 'Name the attributes',
        body: 'Matrix items vary things like shape, count, rotation, shading and position. Listing the attributes before looking for the rule prevents the common failure of spotting one rule and stopping.',
      },
      {
        title: 'Know the standard traps',
        body: 'Affirming the consequent, illicit conversion and base-rate neglect account for a large share of wrong answers on deduction items. The reasoning-error articles cover them individually.',
      },
    ],
    metaTitle: 'Logic and Pattern Puzzles — How to Solve Them',
    metaDescription:
      'Number sequences, matrix reasoning, analogies and deduction puzzles: how each type is built, the procedure that solves it, and the traps to avoid.',
  },
  {
    id: 'memory-and-attention',
    label: 'Memory and Attention Practice',
    shortLabel: 'Memory & Attention',
    blurb:
      'Working memory, span tasks, encoding strategies, attention control — what they are and how practice actually changes them.',
    appSlug: 'mental-math-memory-games',
    categoryId: 'education-brain',
    cornerstone: 'working-memory-and-training',
    relatedHubs: ['brain-training-games', 'iq-tests-and-reasoning', 'history-learning-methods'],
    intro: [
      'Working memory is the small amount of information you can hold and manipulate at once, and it is genuinely limited — the classic estimates cluster around four items for most material, not the seven the popular version claims. That limit is why mental arithmetic gets hard as numbers get longer, and why a phone number is easier to hold as three chunks than as ten digits.',
      'What changes with practice is mostly not the limit. It is the strategy: chunking, rehearsal, and encoding material into a form that holds more per slot. A digit span improves largely because the person found a better way to group the digits, which is a real and useful skill even though it is not an expanded container.',
      'These articles cover the span tasks themselves, the encoding strategies that make them easier, the difference between recall and recognition, and what the attention literature says about focus, interference and task switching.',
    ],
    orientation: [
      {
        title: 'Understand the limit before training it',
        body: 'The cornerstone article covers what working memory is, how it is measured, and what training does and does not move.',
      },
      {
        title: 'Strategy beats effort',
        body: 'Chunking and elaborative encoding change performance more than repetition does. The technique articles cover each method concretely.',
      },
      {
        title: 'Attention is a filter, not a spotlight',
        body: 'Most attention failures are interference, not weakness. The attention articles cover what that means for practice design.',
      },
    ],
    metaTitle: 'Memory and Attention Practice Guides',
    metaDescription:
      'Working memory limits, span tasks, chunking and encoding strategies, and attention control — explained, with what practice does and does not change.',
  },

  // ------------------------------------------------------------------ history
  {
    id: 'world-history-timelines',
    label: 'World History Timelines',
    shortLabel: 'Timelines',
    blurb:
      'Chronology as a tool: eras, dating systems, comparative timelines and how to hold a sequence of events in mind.',
    appSlug: 'world-history-timeline-sim',
    categoryId: 'education-brain',
    cornerstone: 'world-history-timeline-guide',
    relatedHubs: ['major-historical-events', 'civilizations-and-empires', 'history-learning-methods'],
    intro: [
      'A timeline looks like a neutral list, but it is built from decisions: where a period starts, which events are big enough to mark, and whether to draw one line or several. This hub is about those decisions and the evidence underneath them, so that a date on a screen can be read for what it is rather than taken on trust.',
      'Some of the questions are arithmetic: why the 1400s are the fifteenth century, or why a Hijri year, about eleven days shorter than a Gregorian one, almost always straddles two Common Era years. Some are method: what stratigraphy, radiocarbon, tree rings and written records can each fix, and how tightly. And some are framing: who decided that Late Antiquity sits between Rome and the Middle Ages, and what was happening in Han China, the Basin of Mexico and the Red Sea while Rome dominated the Mediterranean.',
      'A useful habit to take from these articles is to ask two things of any date you meet: what evidence fixes it, and how wide the honest range is.',
    ],
    orientation: [
      {
        title: 'Start with how to read a timeline',
        body: 'The cornerstone guide explains how to use a timeline app without mistaking its layout for the past. The major-eras article then sets out the conventional periods and where their boundaries are disputed.',
      },
      {
        title: 'Work through one calendar at a time',
        body: 'BCE and CE, century counting, regnal years, the Julian and Gregorian calendars, the Hijri calendar and the Maya Long Count each have their own conversion rules, and the calendar articles take them one at a time.',
      },
      {
        title: 'Read across regions, not just along one line',
        body: 'The comparative articles cover Rome and its contemporaries, the Chinese dynasties, and how Southeast Asian, African and pre-Columbian North American history is dated, so the European sequence is not the only line on the page.',
      },
    ],
    metaTitle: 'World History Timelines — Chronology Guides',
    metaDescription:
      'Historical eras, dating systems, calendar reform and comparative chronology — how timelines are built, what they hide, and how to read them well.',
  },
  {
    id: 'civilizations-and-empires',
    label: 'Civilizations and Empires',
    shortLabel: 'Civilizations',
    blurb:
      'How states formed, expanded, governed and came apart — across Afro-Eurasia, the Americas and the wider world.',
    appSlug: 'world-history-timeline-sim',
    categoryId: 'education-brain',
    cornerstone: 'why-rome-fell',
    relatedHubs: ['major-historical-events', 'world-history-timelines', 'historical-people'],
    intro: [
      'Empires are easier to describe than to explain. The descriptive part — territory, dynasties, dates — is well documented for most of them. The explanatory part is where historians disagree most sharply, and where popular accounts are least reliable, because a single dramatic cause makes a better story than the slow interaction of fiscal strain, succession disputes, frontier pressure and climate.',
      'The comparative view helps. Reading the Han and Roman experiences side by side, or the Inca and Ottoman approaches to administering distance, makes it obvious which pressures are general and which are local. It also punctures the tidy narrative of rise and decline: many states that are described as having fallen were reorganised, absorbed, or renamed by later writers.',
      'These articles cover individual civilizations and empires, the machinery of governing them, and the comparative questions that make the subject more than a sequence of names.',
    ],
    orientation: [
      {
        title: 'Expect multiple causes',
        body: 'The cornerstone article on Rome is written as a case study in how a "fall" is actually argued about. The same structure applies to every other collapse covered here.',
      },
      {
        title: 'Compare across regions',
        body: 'The comparative articles pair states facing similar pressures, which is where the general patterns become visible.',
      },
      {
        title: 'Watch the sources',
        body: 'Much of what is known about ancient empires comes from a small number of surviving writers with their own agendas. The articles say whose account they are relying on.',
      },
    ],
    metaTitle: 'Civilizations and Empires — History Guides',
    metaDescription:
      'How empires formed, governed and came apart, from Mesopotamia and Rome to the Inca and the Ottomans — with the causes historians actually argue about.',
  },
  {
    id: 'major-historical-events',
    label: 'Major Historical Events',
    shortLabel: 'Major Events',
    blurb:
      'Wars, revolutions, pandemics and turning points — what happened, in what order, and what followed from it.',
    appSlug: 'world-history-timeline-sim',
    categoryId: 'education-brain',
    cornerstone: 'what-caused-the-bronze-age-collapse',
    relatedHubs: ['civilizations-and-empires', 'world-history-timelines', 'historical-people'],
    intro: [
      'The phrase "turning point" does a lot of unearned work in popular history. Most events described that way were visible as decisive only afterwards, and the contemporaries who lived through them were usually reacting to something else entirely. Treating an event as a hinge is a judgement, and it should be argued rather than assumed.',
      'What holds up better is the careful version: here is the sequence, here is what each participant could actually see at the time, here is the range of consequences historians attribute to it, and here is where that attribution is contested. That is less satisfying than a single dramatic cause and considerably more accurate.',
      'These articles cover individual events across the whole span — collapse, conquest, plague, revolution, industrialisation, world war, decolonisation — with the sequence established first and the causal claims sourced and qualified.',
    ],
    orientation: [
      {
        title: 'Sequence before cause',
        body: 'Each article establishes what happened and in what order before it discusses why. Reversing that is how post-hoc reasoning gets in.',
      },
      {
        title: 'Distinguish trigger from condition',
        body: 'The event that starts a war is rarely the reason it was possible. The articles keep the two apart explicitly.',
      },
      {
        title: 'Sensitive subjects are handled directly',
        body: 'Articles touching atrocity, colonialism, enslavement and genocide state what happened plainly and cite scholarly and archival sources. They do not soften and they do not sensationalise.',
      },
    ],
    metaTitle: 'Major Historical Events Explained',
    metaDescription:
      'Wars, revolutions, pandemics and collapses explained in sequence, with the causes historians actually argue about and the sources behind each claim.',
  },
  {
    id: 'historical-people',
    label: 'Historical People',
    shortLabel: 'People',
    blurb:
      'Rulers, thinkers, builders and rebels — what the evidence supports, and where the popular version comes from.',
    appSlug: 'world-history-timeline-sim',
    categoryId: 'education-brain',
    cornerstone: 'how-we-know-what-historical-figures-did',
    relatedHubs: ['civilizations-and-empires', 'major-historical-events', 'history-learning-methods'],
    intro: [
      'Biography is where history is most often wrong in public, because a person is memorable and a structure is not. The famous quotation turns out to be attributed a century later; the decisive personal decision turns out to have been a committee; the villain turns out to have been described by the people who overthrew them.',
      'The useful approach is to ask what the evidence for a given claim actually is. For most figures before the modern period, the answer is a small number of surviving texts, often written long after the events and often by someone with a stake. That does not make the subject unknowable — it makes provenance part of the story.',
      'These articles cover individual figures with the evidence foregrounded: what is documented, what is inferred, what is legend, and where the familiar version came from.',
    ],
    orientation: [
      {
        title: 'Ask who is telling you',
        body: 'Each article names the principal sources for its subject and how close they were to the events.',
      },
      {
        title: 'Quotations get checked',
        body: 'Famous lines are attributed only where a traceable source exists. Where the attribution is doubtful, the article says so rather than repeating it.',
      },
      {
        title: 'Individuals inside structures',
        body: 'People acted within constraints they did not choose. The articles keep both in view rather than reducing events to personality.',
      },
    ],
    metaTitle: 'Historical People — Evidence-Led Profiles',
    metaDescription:
      'Rulers, thinkers and rebels across world history, written from what the evidence supports — with misattributed quotations and legends flagged.',
  },
  {
    id: 'history-learning-methods',
    label: 'History Learning Methods',
    shortLabel: 'Study Methods',
    blurb:
      'How to study history properly: sources, evidence, note-taking, remembering dates, and spotting a bad claim.',
    appSlug: 'world-history-timeline-sim',
    categoryId: 'education-brain',
    cornerstone: 'how-to-study-history-on-your-own',
    relatedHubs: ['world-history-timelines', 'memory-and-attention', 'historical-people'],
    intro: [
      'History is badly served by the way it is usually revised. Memorising a list of dates produces someone who can complete a quiz and cannot explain anything, because the dates were never the content — they were the scaffolding holding the content in sequence.',
      'The methods that work are mostly the general ones applied to this subject: retrieval practice rather than rereading, spacing rather than cramming, and building a small number of anchor dates that everything else can be positioned against. On top of those sit the discipline-specific skills — reading a source for its provenance and purpose, distinguishing a primary from a secondary account, and noticing when a confident claim has nothing behind it.',
      'These articles cover both halves: the study technique, and the source criticism that turns reading history into doing it.',
    ],
    orientation: [
      {
        title: 'Anchor dates, then relative position',
        body: 'A dozen well-chosen anchors let you place hundreds of events approximately, which is far more useful than a hundred exact dates in isolation.',
      },
      {
        title: 'Test yourself instead of rereading',
        body: 'Retrieval practice is the best-evidenced study method available and the one most people skip because it feels harder. It feels harder because it is working.',
      },
      {
        title: 'Learn to read a source',
        body: 'Who wrote it, when, for whom, and what they stood to gain. The source-criticism articles make this a habit rather than a checklist.',
      },
    ],
    metaTitle: 'How to Study History — Methods and Source Skills',
    metaDescription:
      'Retrieval practice, spacing, anchor dates, note-taking and source criticism — the study methods that actually work for learning history.',
  },
  // ---------------------------------------------------------------- mathematics (2026-10-24)
  {
    id: 'discrete-math',
    label: 'Discrete Mathematics',
    shortLabel: 'Discrete Math',
    blurb:
      'Logic, proofs, sets, functions, counting, probability, number theory and graphs, explained with worked examples you can check by hand.',
    appSlug: 'discrete-math-study-quiz',
    categoryId: 'education-brain',
    cornerstone: 'discrete-math-study-quiz-guide',
    relatedHubs: ['logic-and-pattern-puzzles', 'mental-math'],
    intro: [
      'Discrete mathematics is the mathematics of things you can count: true-or-false statements, finite sets, integers, arrangements and networks. For many students it is also where mathematics changes from calculating answers to proving statements, and that change is a large part of what makes it feel new.',
      'The subject is held together by a small number of habits. Write the definition down before you use it. Check a claim on a tiny case before you try to prove it in general. Know which proof technique a statement is asking for. A skipped definition or an unchecked case undoes more arguments than a forgotten formula does.',
      'These guides follow a common teaching order — logic, proof, sets and functions, number theory, induction, counting, probability, recurrences and graphs — and every worked example in them can be checked with pencil and paper.',
    ],
    orientation: [
      {
        title: 'Start with logic and proof',
        body: 'Truth tables, implications and the main proof techniques come up in every later topic. Read the cornerstone guide, then the logic and proof articles, before anything else.',
      },
      {
        title: 'Then counting and probability together',
        body: 'Permutations, combinations, inclusion–exclusion and the pigeonhole principle are the tools; discrete probability is the same counting with a denominator.',
      },
      {
        title: 'Practise on small cases',
        body: 'The worked examples are small enough to check by writing every case out. If a formula disagrees with a list you wrote out by hand, trust the list and find the mistake.',
      },
    ],
    metaTitle: 'Discrete Math Guides: Logic, Proofs, Graphs',
    metaDescription:
      'Discrete mathematics explained with worked examples: logic and truth tables, proofs, sets, counting, probability, number theory and graph theory.',
  },
  // ---------------------------------------------------------------- investing basics (2026-10-24)
  {
    id: 'investing-basics',
    label: 'Investing Basics',
    shortLabel: 'Investing Basics',
    blurb:
      'How shares, orders, accounts, charts and risk work, explained for beginners — education, not advice, with US rules cited and dated.',
    appSlug: 'learn-to-trade-stocks',
    categoryId: 'education-brain',
    cornerstone: 'learn-to-trade-stocks-guide',
    relatedHubs: ['mental-math'],
    intro: [
      'The first time someone looks at a trading screen, the useful questions are practical ones: what am I buying, what happens when I press buy, what can go wrong, and what do these numbers mean? A strategy pitch or a list of jargon answers none of them.',
      'These guides answer those questions in the order a beginner meets them — ownership and exchanges, then order types and accounts, then the figures on a quote and in an earnings report, then charts and indicators and their limits, and finally the rules, taxes and frauds worth knowing about. Where a rule is involved, the guide cites the regulator that wrote it and the date it was checked.',
      'Nothing here is advice. The guides explain how things work; they do not say what anyone should buy, and they treat charts and indicators as descriptions of the past rather than forecasts. The trading app they link to is a simulator that uses virtual money only.',
    ],
    orientation: [
      {
        title: 'Start with what a share is and how a trade happens',
        body: 'Ownership, exchanges, brokers and the bid–ask spread explain most of what a trading screen shows. Read those before any article about charts.',
      },
      {
        title: 'Learn the order types before you place a practice trade',
        body: 'Market, limit and stop orders behave differently when prices move fast. Practising them in a simulator shows the difference without costing anything.',
      },
      {
        title: 'Treat indicators as descriptions, not predictions',
        body: 'Every chart and indicator article says what the measure is calculated from and where it fails. None of them is a signal to buy or sell.',
      },
    ],
    metaTitle: 'Investing Basics: Stocks, Orders and Risk',
    metaDescription:
      'Beginner guides to how shares, orders, accounts, charts and risk work, with US rules cited and dated. Education only, not investment advice.',
  },
];

export const hubIds = new Set(hubs.map((hub) => hub.id));

export function getHub(id: string): HubInfo | undefined {
  return hubs.find((hub) => hub.id === id);
}

export function getHubsForApp(appSlug: string): HubInfo[] {
  return hubs.filter((hub) => hub.appSlug === appSlug);
}
