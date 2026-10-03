import { getAppBySlug, type AppFaq, type AppInfo } from './apps';

/**
 * The sport hubs at /sports/<id>/.
 *
 * A category page answers "which app?" and a blog category answers "which
 * articles?". A sport hub answers "I am interested in this sport — what do you
 * have?": the rules and statistics explainers, the strategy guides, the
 * calculators, and the app or apps for that sport, in one place.
 *
 * Copy may name an app only through the `{draft}` and `{career}` placeholders,
 * which are filled from the catalog at render time. App titles change on Google
 * Play (one sports app was renamed in September 2026), and a name typed into
 * this file would silently go stale. Anything said about an app must also be
 * something its catalog entry says — `node scripts/dump-catalog.mjs <slug>`.
 */
export type SportId =
  | 'basketball'
  | 'baseball'
  | 'football'
  | 'hockey'
  | 'soccer'
  | 'rugby'
  | 'combat-sports'
  | 'tennis'
  | 'golf';

export interface SportStep {
  title: string;
  body: string;
}

export interface SportInfo {
  id: SportId;
  /** Display name: "American football", "Rugby union". */
  label: string;
  /** Breadcrumbs, pills and table cells. */
  shortLabel: string;
  /** The sport as it reads mid-sentence: "basketball", "American football", "MMA and boxing". */
  noun: string;
  /** The hub's H1. */
  heading: string;
  /** One sentence for cards, llms.txt and the index. */
  blurb: string;
  /**
   * The apps for this sport, by role. Only apps that are live on Google Play
   * and in the catalog — the check at the bottom of this file enforces it.
   */
  apps: { draft?: string; career?: string };
  /** The published article to read first. Checked against the blog at build time. */
  cornerstone: string;
  /**
   * Lowercase tags that mark an article as being about this sport. Matched
   * exactly against an article's tags, or as a whole phrase in its title.
   */
  keywords: string[];
  intro: string[];
  /** How the sport's apps relate to each other. May use {draft} and {career}. */
  appsRelation: string;
  orientation: SportStep[];
  faqs: AppFaq[];
  relatedSports: SportId[];
  metaTitle: string;
  metaDescription: string;
  /** The day this hub's standing copy last changed. Feeds the sitemap. */
  updatedAt: string;
}

/**
 * MERGE NOTE — the rugby career app. "Pro Rugby Career Sport Sim" is live on
 * Google Play (verified 2026-10-02) and is being added to the catalog as
 * `rugby-career-sim` by a separate change. The rugby hub picks it up on its own
 * once that slug is in the catalog — app card, copy, FAQ and the /sports/ table
 * all switch over — and until then it covers the draft game only. The copy that
 * names it says only what its live listing says. No edit is needed at merge;
 * if the catalog uses a different slug, change it here.
 */
const RUGBY_CAREER: string | undefined = getAppBySlug('rugby-career-sim') ? 'rugby-career-sim' : undefined;

export const sports: SportInfo[] = [
  // -------------------------------------------------------------- basketball
  {
    id: 'basketball',
    label: 'Basketball',
    shortLabel: 'Basketball',
    noun: 'basketball',
    heading: 'Basketball strategy, statistics and simulation',
    blurb:
      'Positions, rotations, shooting efficiency, draft lotteries and salary caps — plus how a basketball GM game and a career sim each model the sport.',
    apps: { draft: 'pro-basketball-draft-gm-mode', career: 'pro-basketball-my-career-sim' },
    cornerstone: 'basketball-draft-gm-guide',
    keywords: ['basketball'],
    intro: [
      'Five players share one ball, so a basketball roster is a set of trade-offs: shot creation against spacing, size against speed, a star against depth. These guides are about those trade-offs — what each position is asked to do, what the efficiency statistics actually measure, and how draft order and salary rules decide who ends up on a team.',
      'They sit alongside two of our apps that look at the sport from opposite ends. {draft} puts you in the front office, drafting a roster and then managing rotations, contracts and trades across an 82-game season. {career} follows one player you create, from youth basketball through recruiting and college to the draft and the pro years. Every guide is written to be useful without either app.',
    ],
    appsRelation:
      '{draft} asks whether you can build a team: a draft board, a rotation, contracts and trades, judged by what the roster does over a season. {career} asks whether one player can build a career: you choose the position and build, then step in on key possessions through Live Sim while coach trust, chemistry and reputation respond. If you like evaluating and assembling players, start with the GM game; if you would rather be the player, start with the career sim.',
    orientation: [
      {
        title: 'Learn what the numbers measure',
        body: 'Start with positions and the efficiency statistics. Effective field-goal percentage and true shooting percentage adjust for the extra point a three is worth, and true shooting also counts free throws — which is why they can rank two shooters differently from plain field-goal percentage. The true shooting percentage calculator lets you check any box-score line.',
      },
      {
        title: 'Then think in rosters, not players',
        body: 'A balanced roster covers ball-handling, shooting, rim protection and rebounding across the rotation. The roster-building, free-agency and salary-cap guides explain why five high ratings do not automatically make a good team.',
      },
      {
        title: 'Pick the mode that matches your question',
        body: 'If you want to assemble and manage a team, read the draft and GM guides. If you want to live one career, read the guides to recruiting, body measurements and playing time.',
      },
    ],
    faqs: [
      {
        question: 'What is the difference between {draft} and {career}?',
        answer:
          '{draft} is a draft and general-manager game: you build a roster from a draft board, then manage rotations, contracts and trades across an 82-game season and the playoff race. {career} is a career simulator: you create one player and guide them through youth basketball, high school, recruiting and college, the draft and the pro years.',
      },
      {
        question: 'Which basketball statistics best describe shooting?',
        answer:
          'Field-goal percentage treats every made shot the same. Effective field-goal percentage counts a made three as one and a half field goals, and true shooting percentage also folds in free throws by weighting each free-throw attempt at 0.44 of a shot. Our true shooting percentage calculator computes all three from one line.',
      },
      {
        question: 'How long is a season in {draft}?',
        answer:
          'The season runs to 82 games after the draft, followed by the race for a playoff place. You follow the results and handle rotations, contracts and trades along the way.',
      },
      {
        question: 'Where should a newcomer to these guides start?',
        answer:
          'With the guide to basketball positions and the basketball draft simulator guide, then the advanced statistics explainer. The articles link to one another, so you can follow whichever question comes up next.',
      },
    ],
    relatedSports: ['football', 'hockey', 'baseball'],
    metaTitle: 'Basketball Strategy, Stats and Sim Guides',
    metaDescription:
      'Basketball guides from Reign Creative LLC: positions, rotations, shooting efficiency, draft and cap rules, plus how our GM and career sims model the game.',
    updatedAt: '2026-10-02',
  },

  // ---------------------------------------------------------------- baseball
  {
    id: 'baseball',
    label: 'Baseball',
    shortLabel: 'Baseball',
    noun: 'baseball',
    heading: 'Baseball statistics, strategy and simulation',
    blurb:
      'Batting and pitching statistics, lineups, pitching roles and two-way players — plus how a stat-led draft game and a career sim treat the sport.',
    apps: { draft: 'baseball-draft-gm-team', career: 'baseball-career-sim' },
    cornerstone: 'baseball-draft-gm-guide',
    keywords: ['baseball'],
    intro: [
      'Baseball keeps a statistic for almost everything, and most of them measure one thing at a time. Batting average counts hits, on-base percentage counts times on base, slugging weights extra bases, and ERA and WHIP describe a pitcher from two different angles. Knowing which number answers which question is most of the work of reading a roster, and it is what these guides are built around.',
      'Two of our apps sit beside them. {draft} has you draft nine players and a coach, compare hitters and pitchers on the numbers, and see what record the club projects over 162 games. {career} follows a single player — hitter, pitcher, catcher or two-way star — from school through the draft into the professional game. The guides explain the sport first and the games second.',
    ],
    appsRelation:
      '{draft} is about assembling a club: a position-by-position draft compared on statistics such as ERA, WHIP, on-base ability and WAR, a projected 162-game record, and a Franchise GM Mode for the batting order, rotation, bullpen and payroll. {career} is about one player: you choose the position and archetype, then play through innings, counts, runners and bullpen decisions as the career develops. The GM game suits anyone who likes reading a stat sheet; the career sim suits anyone who wants to live a season at a time.',
    orientation: [
      {
        title: 'Start with the basic rate statistics',
        body: 'Batting average, on-base percentage and slugging percentage are all defined in Rule 9.21 of the Official Baseball Rules, and each answers a different question. The beginners’ guide and the OPS explainer walk through them, and the batting average calculator computes them from a hitter’s line.',
      },
      {
        title: 'Read pitchers on more than one number',
        body: 'ERA charges a pitcher for earned runs, WHIP for baserunners, and strikeout and walk rates for the outcomes a pitcher controls most directly. The ERA and WHIP explainers show where each one misleads; the ERA calculator handles innings written as 6.1 and 6.2.',
      },
      {
        title: 'Then choose the side of the game you want',
        body: 'Batting orders, roster construction and the projected record belong to the GM side. Pitching roles, two-way players and aging curves matter most over a single career.',
      },
    ],
    faqs: [
      {
        question: 'What is the difference between {draft} and {career}?',
        answer:
          '{draft} is a draft and general-manager game: you draft nine players and a coach, the season simulator projects a 162-game record, and Franchise GM Mode covers the batting order, rotation, bullpen and payroll. {career} is a career simulator: you create one hitter, pitcher, catcher, closer, utility player or two-way star and take that player through school, the draft and the professional years.',
      },
      {
        question: 'How is on-base percentage calculated?',
        answer:
          'Under Rule 9.21 of the Official Baseball Rules, on-base percentage is hits plus walks plus hit-by-pitches, divided by at-bats plus walks plus hit-by-pitches plus sacrifice flies. Reaching base on an error or a fielder’s choice does not count. The batting average calculator applies the same formula.',
      },
      {
        question: 'Does {draft} use live results?',
        answer:
          'No. Its season record is a projection built from roster quality, position fit, hitting, pitching, speed, defence and coaching, and there is no online multiplayer.',
      },
      {
        question: 'Where should a newcomer to these guides start?',
        answer:
          'With baseball statistics explained for beginners, then the ERA and WHIP explainers and the baseball draft simulator guide.',
      },
    ],
    relatedSports: ['basketball', 'football', 'hockey'],
    metaTitle: 'Baseball Stats, Strategy and Sim Guides',
    metaDescription:
      'Baseball guides from Reign Creative LLC: batting and pitching statistics, lineups, pitching roles and two-way players, plus how our draft and career sims work.',
    updatedAt: '2026-10-02',
  },

  // ---------------------------------------------------------------- football
  {
    id: 'football',
    label: 'American football',
    shortLabel: 'Football',
    noun: 'American football',
    heading: 'American football positions, statistics and simulation',
    blurb:
      'Positions, depth charts, passer rating, clock management and the draft — plus how a football GM game and a quarterback career sim model the sport.',
    apps: { draft: 'football-draft-gm-mode', career: 'football-career-sim' },
    cornerstone: 'football-draft-gm-guide',
    keywords: ['american football', 'football'],
    intro: [
      'American football is a game of specialists: eleven players a side, separate units for offence, defence and special teams, and a quarterback who handles the ball on nearly every offensive play. That structure is why depth charts, positional value and clock management matter as much as any single rating, and it is what these guides explain. (In these hubs, “football” on its own means the American game; association football has its own hub under soccer.)',
      'Two of our apps approach it from opposite sides of the building. {draft} has you draft a full roster position by position and simulate the season, with Franchise and GM modes for the longer run. {career} puts you behind centre for one quarterback’s career, from youth football through the combine and the draft to a starting job. The guides explain the real game first, then what a simulator does with it.',
    ],
    appsRelation:
      '{draft} is the general manager’s view: fill every slot under the draft rules you pick — unlimited, limited with no refreshes, salary cap or playoff mode — then let the season simulator judge the roster. {career} is the quarterback’s view: read the defence, choose the target, call audibles and manage the clock while your coach’s trust and the depth chart respond. If you like building rosters, start with the GM game; if you would rather play the position, start with the career sim.',
    orientation: [
      {
        title: 'Know what each position is for',
        body: 'The positions guide explains what every slot contributes and what each one is worth on a draft board, and the quarterback archetypes guide covers the position that handles the ball on nearly every offensive play.',
      },
      {
        title: 'Learn the number the league uses for passers',
        body: 'Passer rating has been the NFL’s official way of rating passers since 1973. It is built from completion rate, yards per attempt, touchdowns and interceptions, and the passer rating calculator shows each of the four components so you can see what is driving a number.',
      },
      {
        title: 'Then play the situations',
        body: 'Reading a defence and managing the last two minutes are where a quarterback career is won or lost; depth charts, draft order and the draft board are where a franchise is.',
      },
    ],
    faqs: [
      {
        question: 'What is the difference between {draft} and {career}?',
        answer:
          '{draft} is a draft and general-manager game: you draft a roster position by position, the season simulator decides how it holds up, and Franchise Mode and GM Mode extend control to the wider organisation. {career} is a career simulator built around one quarterback, from youth football and high school through college, the combine and the draft to professional seasons.',
      },
      {
        question: 'Why is a perfect passer rating 158.3?',
        answer:
          'Each of the formula’s four components is capped at 2.375. Four capped components, divided by six and multiplied by 100, come to 158.3. The NFL’s own worked example — a season of 343 completions in 502 attempts for 4,643 yards, 45 touchdowns and six interceptions — rates 122.5.',
      },
      {
        question: 'What position do you play in {career}?',
        answer:
          'A quarterback. You choose the throwing hand, appearance, archetype — pocket passer, scrambler, field general or dual-threat — and ratings such as throw power, accuracy, awareness and speed, then take the player from youth football to the professional draft.',
      },
      {
        question: 'Where should a newcomer to these guides start?',
        answer:
          'With football positions explained for drafting and the football draft simulator guide, then reading a defence and clock management in the final two minutes.',
      },
    ],
    relatedSports: ['basketball', 'hockey', 'baseball'],
    metaTitle: 'American Football Guides: Positions, Stats, Sims',
    metaDescription:
      'American football guides from Reign Creative LLC: positions, depth charts, passer rating and the draft, plus how our GM and quarterback career sims work.',
    updatedAt: '2026-10-02',
  },

  // ------------------------------------------------------------------ hockey
  {
    id: 'hockey',
    label: 'Ice hockey',
    shortLabel: 'Hockey',
    noun: 'hockey',
    heading: 'Hockey rules, goaltending and simulation',
    blurb:
      'Icing, power plays, line combinations, positions and goaltending statistics — plus how a hockey draft game and a career sim model the sport.',
    apps: { draft: 'hockey-draft-gm-manager', career: 'hockey-career-sim' },
    cornerstone: 'hockey-draft-gm-guide',
    keywords: ['hockey'],
    intro: [
      'Hockey’s rules shape how a team is built. Icing keeps a side from simply clearing the puck the length of the ice, penalties create power plays and penalty kills, and lines change throughout a game, so depth matters as much as a top unit. The lineup on the ice is a centre, two wingers, two defencemen and a goaltender, and so much of a result runs through the goaltender that the position gets its own guide and its own calculator here.',
      'Two of our apps look at the sport from different seats. {draft} has you fill a starting six and choose a coach, then projects the lineup’s record over 84 games, with a Franchise GM Mode for the longer project. {career} follows one skater or goalie through training, contracts, seasons and playoff runs. These guides explain the rules and numbers first and say where a simulator simplifies them.',
    ],
    appsRelation:
      '{draft} is about the lineup: centre, both wings, two defence slots and goal, plus the coach, judged by a projected 84-game record, with Unlimited and Limited drafts and a Franchise GM Mode that runs across seasons. {career} is about one player: a forward, centre, defenceman or goalie whose skating, shooting, positioning or goaltending develops through training while you make the calls that move momentum in a game.',
    orientation: [
      {
        title: 'Learn the rules that shape every shift',
        body: 'Icing decides where play restarts, and penalties decide when a team plays short-handed. Start with the icing explainer and the power play guide, then the positions guide.',
      },
      {
        title: 'Read goaltending numbers carefully',
        body: 'Save percentage is measured per shot and goals-against average per 60 minutes, so a busy or a quiet defence can flatter or punish either one. The save percentage calculator computes both from a stat line.',
      },
      {
        title: 'Build lines, not just a roster',
        body: 'The line combinations guide, plus-minus and the special teams guide explain why coaches keep shuffling the same players and why a roster with thin spots is exposed over a long season.',
      },
    ],
    faqs: [
      {
        question: 'What is the difference between {draft} and {career}?',
        answer:
          '{draft} is a draft and general-manager game: you fill centre, both wings, two defence slots and goal, choose a coach, and the simulator projects an 84-game record, with Franchise GM Mode for multiple seasons. {career} is a career simulator: you play one forward, centre, defenceman or goalie from prospect through contracts, seasons and playoff runs.',
      },
      {
        question: 'How is goals-against average calculated?',
        answer:
          'Goals allowed, divided by minutes played, multiplied by 60 — the length of a regulation game. Save percentage is saves divided by shots against. The save percentage calculator works out both.',
      },
      {
        question: 'Can you play as a goalie in {career}?',
        answer:
          'Yes. You can play as a forward, centre, defenceman or goalie, and goaltending is one of the attributes that develops through training.',
      },
      {
        question: 'Where should a newcomer to these guides start?',
        answer:
          'With hockey positions explained and the icing explainer, then the hockey draft simulator guide and the goaltending guide.',
      },
    ],
    relatedSports: ['basketball', 'football', 'soccer'],
    metaTitle: 'Hockey Guides: Rules, Goalie Stats and Sims',
    metaDescription:
      'Hockey guides from Reign Creative LLC: icing, power plays, lines, positions and goaltending statistics, plus how our hockey draft and career sims work.',
    updatedAt: '2026-10-02',
  },

  // ------------------------------------------------------------------ soccer
  {
    id: 'soccer',
    label: 'Soccer',
    shortLabel: 'Soccer',
    noun: 'soccer',
    heading: 'Soccer rules, tactics and simulation',
    blurb:
      'Offside, league tables, positions, formations and transfers — plus how a soccer draft game and a career sim model association football.',
    apps: { draft: 'soccer-draft-gm-xi', career: 'soccer-career-sim-xi' },
    cornerstone: 'soccer-formations-explained',
    keywords: ['soccer'],
    intro: [
      'Soccer — association football — is a low-scoring game, which is why league tables, goal difference and tie-breakers carry so much weight and why a single result tells you so little about a team. These guides cover the rules that most often confuse people, such as offside and the way a league season is scored, and what positions and formations actually ask of players.',
      'Our two soccer apps cover the manager’s chair and the player’s boots. {draft} has you draft an XI position by position and simulate a league campaign; {career} follows one footballer from the academy to the end of a career. In these hubs, “football” on its own means the American game, which has its own hub.',
    ],
    appsRelation:
      '{draft} is the manager’s view: draft across every position, weigh position fit and playing style against ratings, then simulate a league campaign scored in wins, draws and losses, with club management for formations, transfers and contracts. {career} is the player’s view: create a footballer in one of six positions, earn Coach Trust, and play the key moments of each match — pass, shoot, dribble, press or make the run.',
    orientation: [
      {
        title: 'Start with how a team is set up',
        body: 'Formations describe how eleven players share the pitch, and most tactical ideas build on them. The formations guide is the place to begin; the positions guide explains what each role in a formation is for, and the guide to style fit why the roles have to work together.',
      },
      {
        title: 'Then the rules that decide matches',
        body: 'Offside, league tables and goal difference explain most of what confuses new fans. The league table guide covers points and the common tie-break orders.',
      },
      {
        title: 'Choose the side of the game you want',
        body: 'Squad building, formations and transfers belong to the manager. Coach trust, energy and morale, and what a player says at a press conference belong to one player’s career.',
      },
    ],
    faqs: [
      {
        question: 'What is the difference between {draft} and {career}?',
        answer:
          '{draft} is a draft and club-management game: you draft an XI position by position, simulate a league campaign, and can manage formations, squad depth, transfers and contracts. {career} is a career simulator: you create one footballer — goalkeeper, defender, midfielder, winger, forward or striker — and play the key moments of each match while Coach Trust decides your playing time.',
      },
      {
        question: 'How are points usually awarded in a league table?',
        answer:
          'Most leagues give three points for a win, one for a draw and none for a loss, then separate teams level on points with goal difference and further tie-breakers that each competition sets for itself. The league table and goal difference guides explain the common orders.',
      },
      {
        question: 'Where should a newcomer to these guides start?',
        answer:
          'With soccer formations explained, then soccer positions explained and how the offside rule works. The soccer draft simulator guide shows how those ideas carry into building a squad.',
      },
    ],
    relatedSports: ['football', 'hockey', 'rugby'],
    metaTitle: 'Soccer Guides: Rules, Tactics and Sim Games',
    metaDescription:
      'Soccer guides from Reign Creative LLC: offside, league tables, positions, formations and transfers, plus how our soccer draft and career sims work.',
    updatedAt: '2026-10-02',
  },

  // ------------------------------------------------------------------- rugby
  {
    id: 'rugby',
    label: 'Rugby union',
    shortLabel: 'Rugby',
    noun: 'rugby',
    heading: 'Rugby union positions, scoring and squad building',
    blurb: RUGBY_CAREER
      ? 'Positions by number, forwards and backs, scoring, squad rotation and how union differs from league — plus our rugby draft game and rugby career sim.'
      : 'Positions by number, forwards and backs, scoring, squad rotation and how union differs from league — plus our rugby draft and GM game.',
    apps: { draft: 'rugby-draft-pro-league', ...(RUGBY_CAREER ? { career: RUGBY_CAREER } : {}) },
    cornerstone: 'how-rugby-scoring-works',
    keywords: ['rugby'],
    intro: [
      'Rugby union asks more of a squad than most sports. Fifteen players a side cover very different jobs — scrummaging and lineouts in the forwards, kicking, handling and speed in the backs — and the scoring system rewards several routes to points: tries, conversions, penalty goals and drop goals. These guides explain the positions, the scoring and the ways union differs from rugby league.',
      RUGBY_CAREER
        ? 'They sit alongside our two rugby games. {draft} has you draft from a rotating pool of more than 1,000 players and run a club through a 24-match season under an in-game salary cap; {career} follows one player you create through a season of matches. The guides are about the sport first: what each number on the back means, how scoring works and why depth decides a season.'
        : 'They sit alongside {draft}, our rugby draft and GM game, which has you draft from a rotating pool of more than 1,000 players and run a club through a 24-match season under an in-game salary cap. The guides are about the sport first: what each number on the back means, how scoring works and why depth decides a season.',
    ],
    appsRelation:
      '{draft} covers the general manager’s side of rugby: drafting forwards, backs, specialists and goal kickers, then handling trades, contracts, payroll, rotation and morale across a 24-match campaign. Its match model follows rugby union scoring — tries, conversions, penalty goals, drop goals and draws.' +
      (RUGBY_CAREER
        ? ' {career} is the player’s side: you create an athlete, choose a position, train the skills that suit your role and follow your team through a season, tracking carries, metres and tackles.'
        : ''),
    orientation: [
      {
        title: 'Start with the scoring',
        body: 'How rugby scoring works covers tries, conversions, penalty goals and drop goals, and the goal-kicker guide explains why a reliable kicker changes a squad’s arithmetic.',
      },
      {
        title: 'Then the numbers on the backs',
        body: 'Rugby positions by number and the guide to forwards and backs explain who does what, from the front row to the full-back.',
      },
      {
        title: 'Plan for a season, not a match',
        body: 'The squad rotation guide and the rugby draft guide explain why depth, morale and injuries decide a 24-match campaign.',
      },
    ],
    faqs: [
      {
        question: 'What is {draft}?',
        answer:
          'A rugby union draft and GM game. You draft a squad from a rotating pool of more than 1,000 players — forwards, backs, specialists and goal kickers — then run the club through a 24-match season under a $200M in-game salary cap, handling trades, contracts, free agents and rotation.',
      },
      {
        question: 'How does rugby union scoring work?',
        answer:
          'A try is worth five points and the conversion that follows it two; a penalty goal and a drop goal are worth three each. The scoring guide explains when each is attempted and why the choice between kicking for goal and going for the try changes with the score.',
      },
      {
        question: 'How is rugby union different from rugby league?',
        answer:
          'They are separate codes with different laws. Union is played fifteen a side with contested rucks, mauls, scrums and lineouts; league is played thirteen a side with a limited number of tackles before possession changes. The comparison guide goes through the differences that matter most.',
      },
      ...(RUGBY_CAREER
        ? [
            {
              question: 'What is the difference between {draft} and {career}?',
              answer:
                '{draft} is a draft and GM game: you build a squad and run a club through a 24-match season. {career} is a career game about one player: you create an athlete, choose a position, train the skills that suit your role and follow your team through a season of matches.',
            },
          ]
        : []),
    ],
    relatedSports: ['soccer', 'football', 'combat-sports'],
    metaTitle: 'Rugby Union Guides: Positions, Scoring, Sims',
    metaDescription: RUGBY_CAREER
      ? 'Rugby union guides from Reign Creative LLC: positions, scoring, squad rotation and union vs league, plus our rugby draft and career games.'
      : 'Rugby union guides from Reign Creative LLC: positions by number, forwards and backs, scoring, squad rotation and union vs league, plus our rugby draft game.',
    updatedAt: '2026-10-02',
  },

  // ------------------------------------------------------------ combat sports
  {
    id: 'combat-sports',
    label: 'MMA and boxing',
    shortLabel: 'MMA & boxing',
    noun: 'MMA and boxing',
    heading: 'MMA and boxing scoring, styles and simulation',
    blurb:
      'Judging and the 10-point must system, weight classes, fight records, stances and style matchups — plus our MMA and boxing draft game.',
    apps: { draft: 'mma-boxing-fight-draft' },
    cornerstone: 'boxing-scoring-explained',
    keywords: ['mma', 'boxing', 'combat sports'],
    intro: [
      'Mixed martial arts and boxing are scored by judges round by round, and most of the confusion around them comes from that: why a fighter who threw more can lose a decision, what the 10-point must system actually rewards, and how three judges watching the same fight can return three different cards. These guides cover judging, weight classes, records, stances and the style matchups that decide fights.',
      'They sit alongside {draft}, our fight draft game, which simulates mixed martial arts and boxing separately: mixed martial arts bouts end by knockout, technical knockout, submission or decision, while boxing adds draws and judges’ scorecards. The guides explain the real sports first, then how a simulator decides a bout.',
    ],
    appsRelation:
      '{draft} is a draft and GM game for a stable of fighters. You draft from separate mixed martial arts and boxing pools, weighing ratings, records, eras and weight classes, then sign fighters, manage contracts and move contenders toward title shots, with seven ways to draft.',
    orientation: [
      {
        title: 'Start with how fights are scored',
        body: 'The boxing scoring guide and the MMA judging guide explain the 10-point must system and why scorecards disagree.',
      },
      {
        title: 'Then the divisions and the records',
        body: 'The weight classes guide explains how fighters are grouped, and the records guide explains what a line such as 30-2-1 (18 KO) means.',
      },
      {
        title: 'Then the styles',
        body: 'Striking against grappling and southpaw against orthodox are the matchups a fight simulator has to model; the style matchups guide explains how ours does it.',
      },
    ],
    faqs: [
      {
        question: 'What is {draft}?',
        answer:
          'A draft and GM game covering mixed martial arts and boxing. You draft fighters across eras and weight classes, two separate simulators settle every bout, and GM Mode handles signings, contracts and pushes toward title shots.',
      },
      {
        question: 'How is a boxing round scored?',
        answer:
          'Under the 10-point must system, each judge gives the winner of the round ten points and the loser nine or fewer, so a knockdown usually widens the margin. The boxing scoring guide covers the details and how commissions apply them.',
      },
      {
        question: 'Why do MMA judges disagree?',
        answer:
          'Each judge scores every round independently against the same criteria, applied in order — effective striking and grappling first, then effective aggressiveness, then fighting area control — and close rounds can reasonably go either way. The MMA judging guide explains the order of the criteria.',
      },
    ],
    relatedSports: ['tennis', 'golf', 'rugby'],
    metaTitle: 'MMA and Boxing Guides: Scoring, Styles, Sims',
    metaDescription:
      'MMA and boxing guides from Reign Creative LLC: judging and scoring, weight classes, fight records, stances and style matchups, plus our fight draft game.',
    updatedAt: '2026-10-02',
  },

  // ------------------------------------------------------------------ tennis
  {
    id: 'tennis',
    label: 'Tennis',
    shortLabel: 'Tennis',
    noun: 'tennis',
    heading: 'Tennis scoring, rankings and career strategy',
    blurb:
      'Scoring and tiebreaks, ranking points and why they expire, qualifiers, playing styles and big points — plus our tennis career simulator.',
    apps: { career: 'tennis-career-sim' },
    cornerstone: 'tennis-scoring-for-beginners',
    keywords: ['tennis'],
    intro: [
      'Tennis is scored in points, games, sets and tiebreaks rather than a running total, and its rankings are built from results that count for a limited time rather than accumulating forever. Both shape how a career is made, from junior events and qualifiers to main draws, and both are explained here from the ground up.',
      'These guides sit alongside {career}, our tennis career simulator, in which you build a player, commit to one of six playing styles and work from the junior circuit through qualifiers toward the top of the rankings, deciding how to serve, return and attack on the points that matter.',
    ],
    appsRelation:
      '{career} is a career game: choose a playing style — aggressive baseliner, counterpuncher, all-court player, serve-and-volley specialist, big server or tactical shotmaker — and the style decides which options you get when a point gets tight. Ranking points expire over a rolling window, so choosing which events to play is part of the game.',
    orientation: [
      {
        title: 'Learn the scoring',
        body: 'Tennis scoring for beginners covers points, games, sets and tiebreaks, and why the score is called the way it is.',
      },
      {
        title: 'Then the rankings and the calendar',
        body: 'The guides to ranking points, ranking decay and qualifiers explain how a player gets into tournaments and stays there.',
      },
      {
        title: 'Then the tactics',
        body: 'Playing styles, serve and volley, and the guide to big points explain how matches are actually won.',
      },
    ],
    faqs: [
      {
        question: 'What is {career}?',
        answer:
          'A tennis career simulator. You create a player, choose a dominant hand, a backhand and one of six playing styles, then work from junior events through academy opportunities and qualifiers into tournament draws and championship events.',
      },
      {
        question: 'Why do tennis ranking points go down?',
        answer:
          'Because results count for a limited period and then drop off, so a player who does not repeat last season’s result loses those points. The ranking points guide explains how the window works and why scheduling matters.',
      },
      {
        question: 'What playing styles can you choose in {career}?',
        answer:
          'Six: aggressive baseliner, counterpuncher, all-court player, serve-and-volley specialist, big server and tactical shotmaker. Each one changes the choices you get in a rally.',
      },
    ],
    relatedSports: ['golf', 'combat-sports', 'soccer'],
    metaTitle: 'Tennis Guides: Scoring, Rankings, Career Sims',
    metaDescription:
      'Tennis guides from Reign Creative LLC: scoring, tiebreaks, ranking points and decay, qualifiers and playing styles, plus our tennis career simulator.',
    updatedAt: '2026-10-02',
  },

  // -------------------------------------------------------------------- golf
  {
    id: 'golf',
    label: 'Golf',
    shortLabel: 'Golf',
    noun: 'golf',
    heading: 'Golf scoring, handicaps and course management',
    blurb:
      'Scoring, World Handicap System calculations, course management, cuts and tour formats — plus our golf career simulator.',
    apps: { career: 'golf-career-simulator' },
    cornerstone: 'golf-scoring-explained',
    keywords: ['golf'],
    intro: [
      'Golf is the one sport here with a handicap system built in. The World Handicap System, run by the USGA and The R&A, turns your scores into a Handicap Index so that players of different ability can compete fairly, and its Rules of Handicapping publish the formulas — score differentials, Slope Rating, course handicap. These guides cover scoring, handicaps, course management, tournament formats and how a professional event cuts its field.',
      'They sit alongside {career}, our golf career game, in which you decide how to play each hole rather than timing a swing, build a golfer across seven skills, and chase rankings through multi-round events with cuts, ties and playoffs.',
    ],
    appsRelation:
      '{career} is a decision game, not a swing game: each shot is a choice made from the hole, the lie, the distance, the wind and your golfer’s strengths. Finishes feed rankings, earnings and reputation, which decide the events you can enter next season.',
    orientation: [
      {
        title: 'Start with scoring and handicaps',
        body: 'How golf scoring works covers par, birdies and stroke play; the handicap guide explains what the number says, and the Handicap Index and course handicap calculators work it out under the World Handicap System.',
      },
      {
        title: 'Then course management',
        body: 'Club gapping and course management explain how good players avoid big numbers, and the strokes gained guide explains how that is measured.',
      },
      {
        title: 'Then the tour',
        body: 'The guides to cuts, Q-school and tour eligibility explain how a professional season is structured.',
      },
    ],
    faqs: [
      {
        question: 'What is {career}?',
        answer:
          'A golf career game in which you make the course-management decision on each shot instead of timing a swing. You develop driving, accuracy, irons, short game, putting, composure and consistency, and play multi-round events with cuts, leaderboards, ties and playoffs across tour seasons.',
      },
      {
        question: 'How is a Handicap Index calculated?',
        answer:
          'Each round produces a score differential: 113 divided by the Slope Rating, multiplied by the adjusted gross score minus the Course Rating and any playing-conditions adjustment. The Handicap Index is the average of the lowest eight of your most recent twenty differentials, with a published table for players with fewer. The Handicap Index calculator follows those rules.',
      },
      {
        question: 'What is the difference between a Handicap Index and a course handicap?',
        answer:
          'A Handicap Index describes your ability on a course of standard difficulty. A course handicap converts it into the number of strokes you receive from a particular set of tees, using that course’s Slope Rating, Course Rating and par.',
      },
    ],
    relatedSports: ['tennis', 'combat-sports', 'baseball'],
    metaTitle: 'Golf Guides: Handicaps, Scoring, Career Sims',
    metaDescription:
      'Golf guides from Reign Creative LLC: scoring, World Handicap System calculations, course management, cuts and tour formats, plus our golf career sim.',
    updatedAt: '2026-10-02',
  },
];

/** The day the /sports/ index's own copy last changed. */
export const SPORTS_INDEX_UPDATED_AT = '2026-10-02';

/** Standing copy for /sports/. App names never appear here; the page reads them from the catalog. */
export const sportsIndexCopy = {
  heading: 'Sports guides, calculators and simulators',
  intro: [
    'Reign Creative makes two kinds of sports game. Draft and general-manager games put you in the front office: build a roster from a draft board, then see how it holds up over a season. Career simulators follow one player you create through an entire career. This section gathers what we publish about those sports — rules explainers, statistics, strategy guides and calculators — and organises it by sport rather than by app.',
    'Each sport hub collects that sport’s guides, says which of our apps cover it and how they differ, and points to the calculators for its statistics. Guides that apply to every sport, such as salary caps, draft formats and career modes, are listed further down this page.',
  ],
  formats: [
    'A draft or general-manager game is about judgement across a whole roster: which players to take, which positions to cover, and how to manage contracts, rotations and depth once the season starts. The result is a record, and the record is the verdict on your decisions.',
    'A career simulator is about one player. You create them, choose what to develop, and make the calls in the moments that decide games, while coaches, teammates and contracts respond to how the career is going. Where a sport has both kinds, the hub explains which one answers the question you are asking.',
  ],
  faqs: [
    {
      question: 'What is the difference between a draft game and a career sim?',
      answer:
        'A draft or general-manager game puts you in the front office: you build a roster from a draft board and judge it by the record it posts. A career sim follows one player you create through the stages of a career, from the early years to the professional game. Reign Creative makes both kinds; the table on this page shows which sports have which.',
    },
    {
      question: 'Do these guides predict real results?',
      answer:
        'No. They explain rules, statistics and strategy, and how our simulators model them. Nothing in this section predicts a real game, and none of it is betting guidance.',
    },
    {
      question: 'Are Reign Creative’s sports apps connected to any league or team?',
      answer:
        'No. Reign Creative LLC’s apps are not affiliated with, or endorsed by, any league, team, players’ association or athlete.',
    },
  ] as AppFaq[],
  metaTitle: 'Sports Guides, Calculators and Sim Games',
  metaDescription:
    'Rules, statistics and strategy guides for nine sports, free sports calculators, and how Reign Creative’s draft and career sims fit together, by sport.',
};

export const sportIds = new Set<string>(sports.map((sport) => sport.id));

export function getSport(id: string): SportInfo | undefined {
  return sports.find((sport) => sport.id === id);
}

export function sportPath(sport: Pick<SportInfo, 'id'>): string {
  return `/sports/${sport.id}/`;
}

/** The sport an app belongs to, by its catalog slug. */
export function getSportForApp(appSlug: string): SportInfo | undefined {
  return sports.find((sport) => sport.apps.draft === appSlug || sport.apps.career === appSlug);
}

/** The catalog records behind a sport's roles. */
export function getSportApps(sport: SportInfo): { draft?: AppInfo; career?: AppInfo } {
  return {
    draft: sport.apps.draft ? getAppBySlug(sport.apps.draft) : undefined,
    career: sport.apps.career ? getAppBySlug(sport.apps.career) : undefined,
  };
}

/**
 * Replaces {draft} and {career} with the catalog names of the sport's apps.
 * A placeholder with no app behind it throws, so a sport cannot ship copy that
 * refers to an app it does not have.
 */
export function fillAppNames(text: string, sport: SportInfo): string {
  const apps = getSportApps(sport);
  return text.replace(/\{(draft|career)\}/g, (_, role: 'draft' | 'career') => {
    const app = apps[role];
    if (!app) throw new Error(`src/data/sports.ts — "${sport.id}" copy names {${role}}, but that sport has no ${role} app`);
    return app.name;
  });
}

/** Whether an article's tags or title say it is about this sport. */
export function isAboutSport(post: { tags: string[]; title: string }, sport: SportInfo): boolean {
  const tags = post.tags.map((tag) => tag.toLowerCase());
  const title = post.title.toLowerCase();
  return sport.keywords.some(
    (keyword) => tags.includes(keyword) || new RegExp(`\\b${keyword.replace(/[-]/g, '\\-')}\\b`).test(title)
  );
}

/**
 * The sport hub an article belongs to: the sport of its primary app, provided
 * the article is actually about that sport. Guides that apply to every sport —
 * salary caps, career modes, snake drafts — return undefined; they belong to
 * the /sports/ index instead of being filed under whichever app they happen to
 * use as an example.
 */
export function getSportForPost(post: { relatedApps: string[]; tags: string[]; title: string }): SportInfo | undefined {
  const sport = getSportForApp(post.relatedApps[0] ?? '');
  return sport && isAboutSport(post, sport) ? sport : undefined;
}

// Every app a sport names must be in the catalog, and every placeholder in its
// copy must resolve. Runs at module load, so a removed app or a typo fails the
// build instead of rendering "{career}" to a reader.
for (const sport of sports) {
  for (const [role, slug] of Object.entries(sport.apps)) {
    if (slug && !getAppBySlug(slug)) {
      throw new Error(`src/data/sports.ts — "${sport.id}" lists ${role} app "${slug}", which is not in the catalog`);
    }
  }
  const copy = [
    ...sport.intro,
    sport.appsRelation,
    ...sport.orientation.flatMap((step) => [step.title, step.body]),
    ...sport.faqs.flatMap((faq) => [faq.question, faq.answer]),
  ];
  for (const text of copy) fillAppNames(text, sport);
  for (const related of sport.relatedSports) {
    if (!sportIds.has(related)) throw new Error(`src/data/sports.ts — "${sport.id}" relates to unknown sport "${related}"`);
  }
}
