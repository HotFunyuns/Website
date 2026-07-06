export type FilterId = 'all' | 'games' | 'education' | 'health-fitness' | 'productivity';

export interface AppFeature {
  title: string;
  body: string;
}

export interface AppFaq {
  question: string;
  answer: string;
}

export interface AppInfo {
  slug: string;
  name: string;
  tagline: string;
  cardDescription: string;
  longDescription: string[];
  category: string;
  filter: Exclude<FilterId, 'all'>;
  schemaCategory: 'GameApplication' | 'HealthApplication' | 'EducationalApplication';
  playStoreUrl: string;
  packageId: string;
  icon: string;
  iconSmall: string;
  accent: string;
  featured?: boolean;
  features: AppFeature[];
  faqs: AppFaq[];
  metaTitle: string;
  metaDescription: string;
}

export const apps: AppInfo[] = [
  {
    slug: 'anime-coloring-book',
    name: 'Anime Coloring Book: Paint Art',
    tagline: 'Relax, color, and bring anime-inspired artwork to life.',
    cardDescription:
      'Relax, color, and bring anime-inspired artwork to life with a polished digital coloring experience.',
    longDescription: [
      'Anime Coloring Book: Paint Art is a digital coloring experience built around anime-inspired illustrations. Pick a piece of line art, choose your palette, and fill each region with color at your own pace — no art supplies, no mess, and no pressure to be perfect.',
      'The app is designed to be genuinely relaxing. Coloring is tap-based and forgiving, so you can unwind on the couch, pass time on a commute, or wind down before bed while still ending up with artwork that looks finished and vibrant.',
      'Whether you love anime aesthetics or simply enjoy the calm focus of coloring, the growing collection of artwork gives you something new to come back to.',
    ],
    category: 'Games · Creativity',
    filter: 'games',
    schemaCategory: 'GameApplication',
    playStoreUrl: 'https://play.google.com/store/apps/details?id=reigncreative.animecoloringbook',
    packageId: 'reigncreative.animecoloringbook',
    icon: '/icons/anime-coloring-book.jpg',
    iconSmall: '/icons/anime-coloring-book-sm.jpg',
    accent: 'from-crimson-400 to-gold-400',
    featured: true,
    features: [
      {
        title: 'Anime-inspired artwork',
        body: 'A collection of illustrations drawn in a distinctly anime-influenced style, from characters to expressive scenes.',
      },
      {
        title: 'Tap-to-fill coloring',
        body: 'Simple, satisfying tap-based coloring that keeps the focus on relaxation rather than precision.',
      },
      {
        title: 'Rich color palettes',
        body: 'Curated color options make it easy to produce artwork that looks balanced and vibrant every time.',
      },
      {
        title: 'Color at your own pace',
        body: 'Leave a piece half-finished and come back later — your progress stays right where you left it.',
      },
      {
        title: 'Made for unwinding',
        body: 'No timers and no fail states. Coloring here is designed as a calm, low-pressure activity.',
      },
    ],
    faqs: [
      {
        question: 'Is Anime Coloring Book: Paint Art free to download?',
        answer:
          'Yes. The app is free to download on Google Play. Like many free apps, it may show ads to support continued development.',
      },
      {
        question: 'Do I need drawing experience to enjoy it?',
        answer:
          'Not at all. The artwork is pre-drawn line art, and coloring works with simple taps — you choose the colors and the app keeps everything inside the lines.',
      },
      {
        question: 'Is this app suitable for casual, short sessions?',
        answer:
          'Yes. Pieces can be colored a little at a time, so it works equally well for a two-minute break or a long relaxing session.',
      },
      {
        question: 'What kind of art styles are included?',
        answer:
          'The collection focuses on anime-inspired illustrations — expressive characters and stylized scenes designed to look great once fully colored.',
      },
    ],
    metaTitle: 'Anime Coloring Book: Paint Art for Android',
    metaDescription:
      'Relax and color anime-inspired artwork with Anime Coloring Book: Paint Art by Reign Creative LLC. A polished, calming coloring experience — free on Google Play.',
  },
  {
    slug: 'protein-diet-tracker',
    name: 'Protein Diet Tracker',
    tagline: 'Hit your protein goals and build better daily habits.',
    cardDescription:
      'Track protein goals, stay consistent, and build better daily nutrition habits.',
    longDescription: [
      'Protein Diet Tracker is a focused nutrition tool for one job: helping you eat enough protein, consistently. Instead of burying you in features, it makes logging fast so checking in becomes a habit rather than a chore.',
      'Set a daily protein goal that fits your training and lifestyle, log what you eat in seconds, and watch your daily progress fill in. Over time, the pattern of consistent days becomes its own motivation.',
      'Your entries are stored locally on your device — no account creation required — so you can open the app and start tracking immediately.',
    ],
    category: 'Health & Fitness',
    filter: 'health-fitness',
    schemaCategory: 'HealthApplication',
    playStoreUrl: 'https://play.google.com/store/apps/details?id=com.reigncreative.proteinup',
    packageId: 'com.reigncreative.proteinup',
    icon: '/icons/protein-diet-tracker.jpg',
    iconSmall: '/icons/protein-diet-tracker-sm.jpg',
    accent: 'from-gold-400 to-crimson-500',
    featured: true,
    features: [
      {
        title: 'Personal protein goals',
        body: 'Set a daily target that matches your training, body, and nutrition approach — then work toward it every day.',
      },
      {
        title: 'Fast, frictionless logging',
        body: 'Add protein entries in seconds. The quicker logging feels, the easier consistency becomes.',
      },
      {
        title: 'Clear daily progress',
        body: 'A clean progress view shows exactly where you stand against today’s goal at a glance.',
      },
      {
        title: 'Habit-first design',
        body: 'Built around daily consistency, because hitting your protein target most days beats perfection on some days.',
      },
      {
        title: 'No account needed',
        body: 'Your data is stored on your device. Download the app and start logging immediately — no sign-up required.',
      },
    ],
    faqs: [
      {
        question: 'Is Protein Diet Tracker free?',
        answer:
          'Yes, it is free to download on Google Play. The app may show ads to support development.',
      },
      {
        question: 'Do I need to create an account?',
        answer:
          'No. Protein Diet Tracker works without an account, and your tracking data is stored locally on your device.',
      },
      {
        question: 'Who is this app for?',
        answer:
          'Anyone trying to eat more protein consistently — lifters, athletes, people focused on body recomposition, or anyone whose nutrition plan centers on daily protein targets.',
      },
      {
        question: 'Can it replace advice from a dietitian or doctor?',
        answer:
          'No. Protein Diet Tracker is a general wellness tool, not medical advice. For personalized guidance — especially with health conditions — consult a qualified professional.',
      },
    ],
    metaTitle: 'Protein Diet Tracker for Android — Daily Protein Goals',
    metaDescription:
      'Hit your daily protein goal with Protein Diet Tracker by Reign Creative LLC. Fast logging, clear progress, and no account required — free on Google Play.',
  },
  {
    slug: 'space-shooter-classic-arcade',
    name: 'Space Shooter: Classic Arcade',
    tagline: 'Fast-paced arcade space combat with classic shooter energy.',
    cardDescription:
      'Fast-paced arcade space combat with classic shooter energy and modern mobile gameplay.',
    longDescription: [
      'Space Shooter: Classic Arcade channels the spirit of golden-age arcade shooters into a game built for modern phones. Dodge incoming fire, blast waves of alien invaders, and chase the run where everything clicks.',
      'The controls are simple enough to learn in seconds but the action ramps up quickly, rewarding sharp reflexes and smart positioning. It is the kind of game you open for one quick run — and stay for five.',
      'If you grew up feeding quarters into space shooters, or you just want satisfying pick-up-and-play action on your phone, this one is for you.',
    ],
    category: 'Games',
    filter: 'games',
    schemaCategory: 'GameApplication',
    playStoreUrl: 'https://play.google.com/store/apps/details?id=com.reigncreative.alieninvasion',
    packageId: 'com.reigncreative.alieninvasion',
    icon: '/icons/space-shooter-classic-arcade.jpg',
    iconSmall: '/icons/space-shooter-classic-arcade-sm.jpg',
    accent: 'from-crimson-500 to-ink-700',
    features: [
      {
        title: 'Classic arcade action',
        body: 'Wave-based space combat inspired by the arcade shooters that defined the genre.',
      },
      {
        title: 'Pick-up-and-play controls',
        body: 'Controls designed for touch screens — easy to learn in your first run, satisfying to master.',
      },
      {
        title: 'Escalating intensity',
        body: 'The pressure builds as you survive longer, turning every run into a test of reflexes and nerve.',
      },
      {
        title: 'Quick-session friendly',
        body: 'Runs fit neatly into short breaks, making it a perfect bus-stop or waiting-room game.',
      },
      {
        title: 'Modern mobile polish',
        body: 'Classic energy, contemporary presentation — crisp visuals and responsive gameplay tuned for phones.',
      },
    ],
    faqs: [
      {
        question: 'Is Space Shooter: Classic Arcade free to play?',
        answer:
          'Yes, the game is free to download on Google Play and may include ads to support development.',
      },
      {
        question: 'Is it hard to learn?',
        answer:
          'No — the controls take seconds to pick up. The challenge comes from surviving as the action intensifies, which is where the arcade fun lives.',
      },
      {
        question: 'Does it suit short play sessions?',
        answer:
          'Absolutely. Runs are quick by design, so it fits perfectly into a spare five minutes.',
      },
      {
        question: 'Who will enjoy this game?',
        answer:
          'Fans of retro arcade shooters, anyone nostalgic for classic space combat, and players who like fast, skill-based mobile action.',
      },
    ],
    metaTitle: 'Space Shooter: Classic Arcade for Android',
    metaDescription:
      'Blast waves of alien invaders in Space Shooter: Classic Arcade by Reign Creative LLC. Fast, skill-based arcade space combat — free on Google Play.',
  },
  {
    slug: 'world-history-timeline-sim',
    name: 'World History Timeline Sim',
    tagline: 'Explore the events and civilizations that shaped the world.',
    cardDescription:
      'Explore major historical events, timelines, civilizations, and the stories that shaped the world.',
    longDescription: [
      'World History Timeline Sim turns world history into something you explore rather than memorize. Move through timelines of major events, discover civilizations, and see how the threads of history connect across centuries and continents.',
      'History is at its best when it reads like a story. The app presents events and eras in a way that invites curiosity — follow what interests you, from ancient empires to modern turning points.',
      'It is a great companion for students brushing up on world history, trivia lovers, and anyone who has ever fallen down a late-night history rabbit hole.',
    ],
    category: 'Education',
    filter: 'education',
    schemaCategory: 'EducationalApplication',
    playStoreUrl: 'https://play.google.com/store/apps/details?id=com.reigncreative.history',
    packageId: 'com.reigncreative.history',
    icon: '/icons/world-history-timeline-sim.jpg',
    iconSmall: '/icons/world-history-timeline-sim-sm.jpg',
    accent: 'from-gold-500 to-gold-700',
    featured: true,
    features: [
      {
        title: 'Interactive timelines',
        body: 'Major events organized chronologically, so you can see how history unfolds and interconnects.',
      },
      {
        title: 'Civilizations & eras',
        body: 'Explore the rise and fall of civilizations and the defining periods that shaped the modern world.',
      },
      {
        title: 'Story-driven learning',
        body: 'History presented as narrative — engaging to read, easy to remember, and genuinely fun to explore.',
      },
      {
        title: 'Learn at your own pace',
        body: 'No courses or deadlines. Follow your curiosity from one event to the next.',
      },
      {
        title: 'Great for curious minds',
        body: 'Useful for students, trivia fans, and lifelong learners who want history in an approachable format.',
      },
    ],
    faqs: [
      {
        question: 'Is World History Timeline Sim free?',
        answer:
          'Yes, the app is free to download on Google Play and may show ads to support development.',
      },
      {
        question: 'What periods of history does it cover?',
        answer:
          'The app spans major events and civilizations across world history — from ancient eras through modern times — organized into explorable timelines.',
      },
      {
        question: 'Is it useful for students?',
        answer:
          'Yes. The timeline format helps place events in context, which makes it a handy companion for coursework — though it is designed for enjoyment, not as a formal curriculum.',
      },
      {
        question: 'Do I need prior history knowledge?',
        answer:
          'None at all. Events are presented as approachable stories, so you can start anywhere and follow what interests you.',
      },
    ],
    metaTitle: 'World History Timeline Sim for Android — Explore History',
    metaDescription:
      'Explore world history through interactive timelines, civilizations, and stories with World History Timeline Sim by Reign Creative LLC. Free on Google Play.',
  },
  {
    slug: 'zombie-survival-last-survivor',
    name: 'Zombie Survival: Last Survivor',
    tagline: 'Fight to survive in an intense zombie-filled world.',
    cardDescription:
      'Fight to survive in an intense zombie-filled world built for quick, satisfying mobile action.',
    longDescription: [
      'Zombie Survival: Last Survivor drops you into a world overrun by the undead, where every run is a fight to stay alive just a little longer. The hordes keep coming — your job is to keep moving, keep fighting, and outlast them.',
      'The action is tuned for mobile: sessions are quick, the intensity ramps fast, and every escape feels earned. It is survival action designed around the question "one more run?" — and the answer is usually yes.',
      'If you like your mobile games tense, punchy, and satisfying in short bursts, the horde is waiting.',
    ],
    category: 'Games',
    filter: 'games',
    schemaCategory: 'GameApplication',
    playStoreUrl:
      'https://play.google.com/store/apps/details?id=com.reigncreative.zombiesurvivors',
    packageId: 'com.reigncreative.zombiesurvivors',
    icon: '/icons/zombie-survival-last-survivor.jpg',
    iconSmall: '/icons/zombie-survival-last-survivor-sm.jpg',
    accent: 'from-crimson-600 to-ink-900',
    featured: true,
    features: [
      {
        title: 'Relentless horde action',
        body: 'Face growing waves of the undead where survival depends on movement, timing, and nerve.',
      },
      {
        title: 'Quick, intense runs',
        body: 'Sessions are built for mobile — short enough for a break, intense enough to get your pulse up.',
      },
      {
        title: 'Skill-driven survival',
        body: 'Lasting longer is about playing smarter. Every run teaches you something for the next one.',
      },
      {
        title: 'Atmospheric tension',
        body: 'A dark, high-stakes world that makes each narrow escape feel genuinely satisfying.',
      },
      {
        title: 'Easy to start, hard to put down',
        body: 'Simple controls get you into the action fast — the "one more run" loop keeps you there.',
      },
    ],
    faqs: [
      {
        question: 'Is Zombie Survival: Last Survivor free?',
        answer:
          'Yes, it is free to download on Google Play and may include ads to support development.',
      },
      {
        question: 'How long is a typical play session?',
        answer:
          'Runs are designed to be quick — a session can fit into a few spare minutes, though the "one more run" pull is real.',
      },
      {
        question: 'Is the game very difficult?',
        answer:
          'It is a survival game, so pressure builds the longer you last. Early runs are approachable, and improving your survival time is a big part of the fun.',
      },
      {
        question: 'Who is this game best for?',
        answer:
          'Players who enjoy zombie and survival themes, fast arcade-style action, and skill-based games with quick sessions.',
      },
    ],
    metaTitle: 'Zombie Survival: Last Survivor for Android',
    metaDescription:
      'Outlast the horde in Zombie Survival: Last Survivor by Reign Creative LLC. Tense, quick-session zombie survival action — free on Google Play.',
  },
  {
    slug: 'keto-diet-tracker',
    name: 'Keto Diet Tracker: Low Carb',
    tagline: 'Simple tracking tools for your low-carb lifestyle.',
    cardDescription:
      'Support your low-carb lifestyle with simple tracking tools and ketogenic diet guidance.',
    longDescription: [
      'Keto Diet Tracker: Low Carb is built to make a ketogenic lifestyle easier to stick with. Track your daily intake, keep carbs in check, and stay oriented with practical keto guidance — all in one focused app.',
      'Keto succeeds or fails on daily consistency, so the app keeps tracking simple and fast. Log your day, see where you stand, and build the streak of consistent low-carb days that delivers results.',
      'Your data stays on your device and no account is required, so getting started takes seconds.',
    ],
    category: 'Health & Fitness',
    filter: 'health-fitness',
    schemaCategory: 'HealthApplication',
    playStoreUrl: 'https://play.google.com/store/apps/details?id=com.reigncreative.ketotracker',
    packageId: 'com.reigncreative.ketotracker',
    icon: '/icons/keto-diet-tracker.jpg',
    iconSmall: '/icons/keto-diet-tracker-sm.jpg',
    accent: 'from-gold-400 to-gold-600',
    features: [
      {
        title: 'Low-carb tracking',
        body: 'Keep daily carbs visible and under control — the core discipline of any ketogenic approach.',
      },
      {
        title: 'Keto diet guidance',
        body: 'Practical guidance to help you understand and stay oriented on your ketogenic journey.',
      },
      {
        title: 'Simple daily logging',
        body: 'Fast entry designed for real life, because tracking only works when it takes seconds.',
      },
      {
        title: 'Progress you can see',
        body: 'A clear picture of your consistency over time keeps motivation grounded in real data.',
      },
      {
        title: 'Private by design',
        body: 'Entries are stored locally on your device, and the app works without any account.',
      },
    ],
    faqs: [
      {
        question: 'Is Keto Diet Tracker free to download?',
        answer:
          'Yes, it is free on Google Play. The app may show ads to support ongoing development.',
      },
      {
        question: 'Where is my tracking data stored?',
        answer:
          'Locally on your device. The app does not require an account, and your entries remain on your phone until you delete them or uninstall the app.',
      },
      {
        question: 'Is this app a substitute for medical advice?',
        answer:
          'No. It is a general wellness tool. Consult a qualified healthcare professional before starting keto or any major dietary change — especially if you have a health condition, take medication, or are pregnant.',
      },
      {
        question: 'Is it suitable for keto beginners?',
        answer:
          'Yes. The combination of simple tracking and built-in guidance makes it a practical starting point for people new to low-carb eating.',
      },
    ],
    metaTitle: 'Keto Diet Tracker: Low Carb for Android',
    metaDescription:
      'Stay consistent on keto with Keto Diet Tracker: Low Carb by Reign Creative LLC. Simple carb tracking, keto guidance, no account needed — free on Google Play.',
  },
  {
    slug: 'pro-basketball-my-career-sim',
    name: 'Pro Basketball My Career Sim',
    tagline: 'Build your basketball career and chase greatness.',
    cardDescription:
      'Build your basketball career, make key decisions, grow your player, and chase greatness.',
    longDescription: [
      'Pro Basketball My Career Sim puts you in control of a basketball career from the ground up. Develop your player, make the decisions that shape a career, and chase the arc from unknown prospect to the top of the game.',
      'The heart of the game is choice. Training, opportunities, and career moments all ask something of you — and the career you end up with is the sum of the calls you make along the way.',
      'For basketball fans who love the story behind the stat lines, this is a career you get to write yourself.',
    ],
    category: 'Games · Sports',
    filter: 'games',
    schemaCategory: 'GameApplication',
    playStoreUrl:
      'https://play.google.com/store/apps/details?id=com.reigncreative.probasketballsim',
    packageId: 'com.reigncreative.probasketballsim',
    icon: '/icons/pro-basketball-my-career-sim.jpg',
    iconSmall: '/icons/pro-basketball-my-career-sim-sm.jpg',
    accent: 'from-gold-500 to-crimson-500',
    features: [
      {
        title: 'Career-driven gameplay',
        body: 'Take a player from unknown prospect toward basketball greatness, season by season.',
      },
      {
        title: 'Meaningful decisions',
        body: 'Career choices matter — the path you take shapes the player and the legacy you build.',
      },
      {
        title: 'Player growth & development',
        body: 'Invest in your player’s growth and watch decisions compound into a career arc.',
      },
      {
        title: 'A story every run',
        body: 'Each career plays out differently, giving every playthrough its own narrative.',
      },
      {
        title: 'Built for basketball fans',
        body: 'Made for players who love the drama of a career — the rises, setbacks, and signature moments.',
      },
    ],
    faqs: [
      {
        question: 'Is Pro Basketball My Career Sim free?',
        answer:
          'Yes, the game is free to download on Google Play and may include ads to support development.',
      },
      {
        question: 'What kind of game is it?',
        answer:
          'It is a career simulation. Rather than arcade controls, the focus is on decisions, player development, and the long arc of a basketball career.',
      },
      {
        question: 'Do my choices actually matter?',
        answer:
          'Yes — decisions shape how your career unfolds, which is what makes each playthrough feel like its own story.',
      },
      {
        question: 'Can I play multiple careers?',
        answer:
          'Yes. Starting fresh with a new player and taking a different path is a big part of the replay value.',
      },
    ],
    metaTitle: 'Pro Basketball My Career Sim for Android',
    metaDescription:
      'Write your own basketball story in Pro Basketball My Career Sim by Reign Creative LLC. Decisions, development, and career drama — free on Google Play.',
  },
  {
    slug: '82-0-pro-basketball-draft',
    name: '82-0 Pro Basketball Draft',
    tagline: 'Draft legendary lineups and chase the perfect season.',
    cardDescription:
      'Draft legendary basketball lineups, test your roster-building skills, and build an undefeated team.',
    longDescription: [
      '82-0 Pro Basketball Draft is built around one irresistible question: can you draft a team good enough to never lose? Assemble your lineup, weigh every pick, and chase the perfect 82-0 season.',
      'Great rosters are more than star power — they are fit, balance, and smart trade-offs. Every draft is a puzzle, and every season tells you whether your roster logic held up.',
      'It is a game for basketball nerds in the best sense: the armchair GMs who already argue about lineups and now get to prove it.',
    ],
    category: 'Games · Sports',
    filter: 'games',
    schemaCategory: 'GameApplication',
    playStoreUrl:
      'https://play.google.com/store/apps/details?id=com.reigncreative.eightytwopro.basketballdraft',
    packageId: 'com.reigncreative.eightytwopro.basketballdraft',
    icon: '/icons/82-0-pro-basketball-draft.jpg',
    iconSmall: '/icons/82-0-pro-basketball-draft-sm.jpg',
    accent: 'from-crimson-500 to-gold-500',
    features: [
      {
        title: 'Draft-first gameplay',
        body: 'The draft is the game — every pick is a bet on how your roster comes together.',
      },
      {
        title: 'Chase the perfect season',
        body: 'The goal is right in the name: build a team that can run the table at 82-0.',
      },
      {
        title: 'Roster-building strategy',
        body: 'Balance, fit, and depth matter. Outsmart the draft, not just outpick it.',
      },
      {
        title: 'High replay value',
        body: 'No two drafts play out the same, so there is always another roster theory to test.',
      },
      {
        title: 'Made for armchair GMs',
        body: 'If you love debating lineups and building super-teams on paper, this is your proving ground.',
      },
    ],
    faqs: [
      {
        question: 'Is 82-0 Pro Basketball Draft free to play?',
        answer:
          'Yes, it is free to download on Google Play and may include ads to support development.',
      },
      {
        question: 'What does "82-0" mean?',
        answer:
          'A pro basketball season is 82 games long. Going 82-0 means a perfect, undefeated season — the ultimate goal your drafted roster is chasing.',
      },
      {
        question: 'Is this a fast game to play?',
        answer:
          'Yes. Drafting a lineup and seeing how it performs makes for satisfying short sessions, with plenty of reason to immediately try another draft.',
      },
      {
        question: 'Do I need deep basketball knowledge?',
        answer:
          'No, anyone can enjoy drafting a lineup — though basketball fans will get extra fun out of the strategy and roster debates.',
      },
    ],
    metaTitle: '82-0 Pro Basketball Draft for Android',
    metaDescription:
      'Draft legendary lineups and chase a perfect 82-0 season in 82-0 Pro Basketball Draft by Reign Creative LLC. Roster-building strategy — free on Google Play.',
  },
];

export interface CategoryInfo {
  id: FilterId;
  label: string;
  blurb: string;
}

export const filterCategories: CategoryInfo[] = [
  { id: 'all', label: 'All Apps', blurb: 'The complete Reign Creative catalog.' },
  {
    id: 'games',
    label: 'Games',
    blurb: 'Arcade action, sports sims, and creative play built for quick, satisfying sessions.',
  },
  {
    id: 'education',
    label: 'Education',
    blurb: 'Learning experiences that make knowledge feel like exploration.',
  },
  {
    id: 'health-fitness',
    label: 'Health & Fitness',
    blurb: 'Focused trackers that turn daily consistency into real progress.',
  },
  {
    id: 'productivity',
    label: 'Productivity',
    blurb: 'Practical tools to sharpen your day — new releases in development.',
  },
];

export function getAppBySlug(slug: string): AppInfo | undefined {
  return apps.find((app) => app.slug === slug);
}

export function getRelatedApps(app: AppInfo, count = 3): AppInfo[] {
  const sameCategory = apps.filter((a) => a.slug !== app.slug && a.filter === app.filter);
  const others = apps.filter((a) => a.slug !== app.slug && a.filter !== app.filter);
  return [...sameCategory, ...others].slice(0, count);
}

export const featuredApps = apps.filter((app) => app.featured);

export const companyInfo = {
  name: 'Reign Creative LLC',
  tagline: 'Premium Apps. Built to Be Played, Learned From, and Loved.',
  description:
    'Reign Creative LLC is an independent mobile app studio building memorable games, learning experiences, fitness trackers, and lifestyle apps for Android.',
  supportEmail: 'ReignCreativeSupport@gmail.com',
  domain: 'reigncreativellc.com',
  siteUrl: 'https://reigncreativellc.com',
  founded: '2024',
  developerPageUrl: 'https://play.google.com/store/apps/developer?id=Reign+Collective+Apps',
  developerName: 'Reign Collective Apps',
};
