import type { AppInfo } from '../types';

export const healthNutritionApps: AppInfo[] = [
  {
    slug: 'protein-diet-tracker',
    name: 'Protein Diet Tracker',
    tagline: 'See how much protein you are actually eating, one quick entry at a time.',
    cardDescription:
      'Log meals, snacks and workouts in seconds, then see your protein, calories and macros for the day in one place.',
    longDescription: [
      'Protein Diet Tracker is a daily logging tool for people who would rather know what they ate than estimate it. Add meals and snacks as the day goes, and the app rolls them into totals for protein, calories, carbohydrates and fat. The screens stay deliberately plain, because a tracker only earns its place if opening it never feels like work.',
      'Alongside food, you can log workouts and record body weight, so training and intake sit in one history instead of two apps that never talk to each other. Daily goals are yours to set. The app shows how the day is tracking against the numbers you chose, and leaves the choosing entirely to you.',
      'Over weeks the useful part stops being any single day. Progress trends and nutrition history let you look back at what a normal week actually looks like, which tends to tell you more than one perfect day you could not repeat.',
    ],
    category: 'Health & Fitness',
    categoryId: 'health-nutrition',
    schemaCategory: 'HealthApplication',
    playStoreUrl: 'https://play.google.com/store/apps/details?id=com.reigncreative.proteinup',
    packageId: 'com.reigncreative.proteinup',
    icon: '/icons/protein-diet-tracker.jpg',
    iconSmall: '/icons/protein-diet-tracker-sm.jpg',
    accent: 'from-gold-400 to-crimson-500',
    featured: true,
    playCategory: 'HEALTH_AND_FITNESS',
    contentRating: 'Everyone',
    containsAds: true,
    inAppPurchases: true,
    free: true,
    lastVerified: '2026-08-09',
    features: [
      {
        title: 'Protein, calories and macros together',
        body: 'Every entry rolls up into daily totals for protein, carbohydrates, fat and calories, so one screen answers what you ate today.',
      },
      {
        title: 'Meals and snacks in seconds',
        body: 'Add food as you eat it rather than reconstructing the day from memory at midnight. Fast entry is the whole design brief.',
      },
      {
        title: 'Workout logging',
        body: 'Record training in the same app as your food, so sessions and intake share one daily record instead of living apart.',
      },
      {
        title: 'Weight and progress trends',
        body: 'Log body weight when you want to and review it alongside your nutrition history as trends rather than isolated numbers.',
      },
      {
        title: 'Goals you set yourself',
        body: 'Choose your own daily protein, calorie and macro goals. The app measures the day against your numbers and does not prescribe them.',
      },
    ],
    audience: [
      'People who want their real protein intake, not an estimate',
      'Lifters and gym-goers logging food alongside training',
      'Anyone who abandoned a tracker because logging took too long',
      'Macro trackers who want daily totals without a complicated setup',
    ],
    howItWorks: [
      {
        title: 'Set your daily numbers',
        body: 'Enter the protein, calorie and macro goals you want to work to. They are yours to pick and yours to change whenever you like.',
      },
      {
        title: 'Log food as you eat it',
        body: 'Add meals and snacks through the day so totals build in real time instead of being rebuilt from memory later.',
      },
      {
        title: 'Add training and weight',
        body: 'Record workouts and body weight in the same place, so nothing about the day sits in a separate app.',
      },
      {
        title: 'Review the history',
        body: 'Open your progress trends and nutrition history to see how the days line up and where your habits actually sit.',
      },
    ],
    faqs: [
      {
        question: 'Is Protein Diet Tracker free?',
        answer:
          'Yes, it is free to download on Google Play. It is supported by ads, and optional in-app purchases are available.',
      },
      {
        question: 'What does the app actually track?',
        answer:
          'Meals and snacks, protein, calories and macros, plus workouts and body weight. Everything rolls into daily totals and a history you can look back over.',
      },
      {
        question: 'Does it tell me how much protein to eat?',
        answer:
          'No. You set the daily goals yourself and the app simply shows the day measured against them. It does not calculate a target for you.',
      },
      {
        question: 'Do I have to follow a particular diet to use it?',
        answer:
          'No. The app totals whatever you enter. It does not push a plan or assume any particular way of eating.',
      },
      {
        question: 'Can I look back at previous days?',
        answer:
          'Yes. Nutrition history and progress trends keep past entries available, so you can review a week or a month rather than only today.',
      },
      {
        question: 'Do I need an account, and where is my data kept?',
        answer:
          'No account is required. Your entries are stored locally on your device rather than on our servers, as set out in our privacy policy, and they stay there until you delete them or uninstall the app.',
      },
    ],
    metaTitle: 'Protein Diet Tracker for Android — Log Daily Protein',
    metaDescription:
      'Log meals, workouts and body weight, then see your protein, calories and macros for the day in one clear total. Protein Diet Tracker is free on Google Play.',
  },
  {
    slug: 'keto-diet-tracker',
    name: 'Keto Diet Tracker: Low Carb',
    tagline: 'A low-carb log that does the net carb math for you and keeps the day on one screen.',
    cardDescription:
      'Track net carbs, fat and protein with a built-in calculator, barcode scanner and food database made for low-carb eating.',
    longDescription: [
      'Keto Diet Tracker: Low Carb is built around the number low-carb eaters watch most closely: net carbs. Enter a food and the app subtracts fiber and sweeteners such as erythritol, allulose and monk fruit from total carbohydrate for you, so you are not doing arithmetic on a nutrition label in a supermarket aisle.',
      'Logging is meant to be quick. A low-carb food database and a barcode scanner cover packaged items, custom foods and recipes handle anything you cook yourself, and a meal planner lets you set out breakfast, lunch, dinner and desserts ahead of time. A built-in macro calculator turns details you enter, such as age, height, weight and activity level, into starting fat, protein and net carb figures you are free to adjust.',
      'Around the food log sit the other things low-carb eaters tend to record: ketone readings you have taken yourself with blood, urine strips or a breath meter, an intermittent fasting timer, water intake, and sodium, potassium and magnesium. Charts, body measurements, photo logs and weekly and monthly summaries turn all of it into a record you can look back over.',
    ],
    category: 'Health & Fitness',
    categoryId: 'health-nutrition',
    schemaCategory: 'HealthApplication',
    playStoreUrl: 'https://play.google.com/store/apps/details?id=com.reigncreative.ketotracker',
    packageId: 'com.reigncreative.ketotracker',
    icon: '/icons/keto-diet-tracker.jpg',
    iconSmall: '/icons/keto-diet-tracker-sm.jpg',
    accent: 'from-gold-400 to-gold-600',
    playCategory: 'HEALTH_AND_FITNESS',
    contentRating: 'Everyone',
    containsAds: true,
    inAppPurchases: false,
    free: true,
    lastVerified: '2026-08-09',
    features: [
      {
        title: 'Net carbs worked out for you',
        body: 'Fiber and sweeteners such as erythritol, allulose and monk fruit come off total carbohydrate automatically, and the app can alert you when a day passes the limit you set.',
      },
      {
        title: 'Food database and barcode scanner',
        body: 'Search a low-carb food database or scan a package to pull an item straight in, and save your own foods and recipes for anything you make.',
      },
      {
        title: 'A macro target to start from',
        body: 'The built-in calculator turns details you enter, such as age, height, weight and activity level, into starting fat, protein and net carb figures you can change.',
      },
      {
        title: 'Ketone and fasting logs',
        body: 'Record readings you have taken from blood, urine strips or a breath meter, including GKI, and run an intermittent fasting timer next to your food log.',
      },
      {
        title: 'The rest of the day in one place',
        body: 'Water, sodium, potassium and magnesium, body measurements, photos, charts and weekly and monthly summaries all sit with your history.',
      },
    ],
    audience: [
      'Low-carb eaters tired of doing net carb math by hand',
      'People new to low-carb who want the calculations handled',
      'Trackers who also log ketone readings and fasting windows',
      'Home cooks who need custom foods and their own recipes',
    ],
    howItWorks: [
      {
        title: 'Set your starting macros',
        body: 'Enter your details and let the calculator suggest fat, protein and net carb figures, or type in your own if you already know what you work to.',
      },
      {
        title: 'Log food fast',
        body: 'Search the low-carb database, scan a barcode, or add a custom food or recipe. Net carbs are calculated as you go.',
      },
      {
        title: 'Track the rest of the day',
        body: 'Add water, electrolytes, fasting windows and any ketone readings you have taken, so the whole day sits in one entry.',
      },
      {
        title: 'Look at the week, not the day',
        body: 'Charts, measurements, photo logs and weekly or monthly summaries show what your low-carb eating looks like over time.',
      },
    ],
    faqs: [
      {
        question: 'Is Keto Diet Tracker: Low Carb free?',
        answer:
          'Yes, it is free to download on Google Play. It is supported by ads, and there are no in-app purchases.',
      },
      {
        question: 'How does the app count net carbs?',
        answer:
          'It takes total carbohydrate and subtracts fiber and sweeteners such as erythritol, allulose and monk fruit. That subtraction happens automatically each time you log a food.',
      },
      {
        question: 'Do I have to set a carb limit?',
        answer:
          'You choose your own daily limit and the app can alert you when a day goes past it. The app does not pick the number for you.',
      },
      {
        question: 'Can I log ketone readings?',
        answer:
          'Yes. There is a place to record blood, urine strip and breath meter readings, including GKI. The app stores what you enter and does not measure anything itself.',
      },
      {
        question: 'Can I add my own recipes?',
        answer:
          'Yes. Custom foods and recipes let you save anything you cook so you are not re-entering the same meal every week, and the meal planner can schedule them in advance.',
      },
      {
        question: 'Do I need an account, and where is my data kept?',
        answer:
          'No account is required. Your logs are stored locally on your device rather than on our servers, as set out in our privacy policy, and they remain there until you delete them or uninstall the app.',
      },
    ],
    metaTitle: 'Keto Diet Tracker: Low Carb for Android',
    metaDescription:
      'Log net carbs without the math, with fiber and sweeteners subtracted for you, plus a barcode scanner, food database and ketone log. Free on Google Play.',
  },
];
