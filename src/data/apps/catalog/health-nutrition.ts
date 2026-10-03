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
    lastVerified: '2026-09-15',
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
    metaTitle: 'Protein Diet Tracker for Android',
    metaDescription:
      'Log meals, workouts and body weight, then see your protein, calories and macros for the day in one clear total. Protein Diet Tracker is free on Google Play.',
  },
  {
    slug: 'keto-diet-tracker',
    name: 'Ketora: Keto Diet Carb Tracker',
    formerNames: ['Keto Diet Tracker: Low Carb'],
    tagline: 'Net carbs worked out for you, the whole day in one diary, and keto recipes that fit what you have left.',
    cardDescription:
      'Track net carbs and macros with a barcode scanner and food diary, plan meals from keto recipes, and run an intermittent fasting timer alongside.',
    longDescription: [
      'Ketora: Keto Diet Carb Tracker — listed on Google Play as Keto Diet Tracker: Low Carb until its recent rename — is built around the number low-carb eaters watch most closely: net carbs. Log a food and the app works them out for you, taking fiber and sugar alcohols away from total carbohydrate, and a progress ring shows how much of your daily limit is left, whether that limit is 20g or 50g.',
      'Logging is meant to take seconds. The barcode scanner fills in nutrition from a label, favourite meals can be saved, yesterday’s entries copied and custom foods added, and the food diary shows the whole day at a glance. A few questions about your body and goals produce daily targets for fat, protein, carbs and calories, and you can switch between strict keto, lazy keto and a flexible low-carb approach.',
      'Around the diary sit keto recipes with net carbs per serving, a meal planner that turns the week into a grocery list, and an intermittent fasting timer with 16:8, 18:6, 20:4, OMAD or custom windows. You can also record weight, body measurements, water and ketone readings you have taken from blood, breath or urine strips, with charts and weekly insights. The listing describes an AI coach that suggests low-carb swaps and recipes from your logs, and states that the app is informational, not medical advice.',
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
    lastVerified: '2026-10-02',
    features: [
      {
        title: 'Net carbs worked out for you',
        body: 'Fiber and sugar alcohols come off total carbohydrate automatically, net and total carbs show side by side, and a progress ring shows what is left today.',
      },
      {
        title: 'Barcode scanner and food diary',
        body: 'Scan a label to fill in nutrition, save favourite meals, copy yesterday’s entries and add your own foods, with the whole day on one screen.',
      },
      {
        title: 'Daily targets to start from',
        body: 'Answer a few questions about your body and goals to get daily fat, protein, carb and calorie targets, then switch approach if you need to.',
      },
      {
        title: 'Recipes and a meal planner',
        body: 'Browse keto recipes with net carbs per serving, add them to the week, and let the meal planner turn the plan into a grocery list.',
      },
      {
        title: 'Fasting timer and progress',
        body: 'Run 16:8, 18:6, 20:4, OMAD or custom fasting windows with reminders, and chart weight, measurements, water and ketone readings.',
      },
    ],
    audience: [
      'Low-carb eaters tired of doing net carb math by hand',
      'People new to keto who want daily targets to start from',
      'Trackers who pair a keto diet with intermittent fasting',
      'Home cooks who plan the week’s meals and shop from a list',
    ],
    howItWorks: [
      {
        title: 'Set your targets',
        body: 'Answer a few questions about your body and goals, and choose strict keto, lazy keto or a flexible low-carb approach.',
      },
      {
        title: 'Log food fast',
        body: 'Scan a barcode, reuse a saved meal or add a custom food. Net carbs, macros and calories update as you go.',
      },
      {
        title: 'Plan the week',
        body: 'Pick keto recipes, add them to the meal planner, and take the grocery list it builds to the shop.',
      },
      {
        title: 'Watch the trend',
        body: 'Track weight, measurements, water, ketone readings and fasting windows, and read the weekly insights.',
      },
    ],
    faqs: [
      {
        question: 'Is Ketora: Keto Diet Carb Tracker free?',
        answer:
          'Yes, it is free to download on Google Play and supported by ads. The listing says the core tracker, barcode scanner, food diary, calorie counter and fasting timer stay free, and it describes an optional Ketora Premium for extras such as advanced ketosis charts and data export.',
      },
      {
        question: 'How does the app count net carbs?',
        answer:
          'It takes total carbohydrate and subtracts fiber and sugar alcohols. That happens automatically each time you log a food, and net and total carbs are shown side by side.',
      },
      {
        question: 'Can I log ketone readings?',
        answer:
          'Yes. You can record readings you have taken from blood, breath or urine strips. The app stores what you enter and does not measure anything itself.',
      },
      {
        question: 'Does it support intermittent fasting?',
        answer:
          'Yes. Choose a 16:8, 18:6, 20:4, OMAD or custom window, and the app reminds you when your eating window opens and closes.',
      },
      {
        question: 'Is it medical advice?',
        answer:
          'No. The listing describes Ketora as informational and not medical advice, and suggests talking to a doctor before starting any new diet, especially if you are pregnant, nursing or managing a medical condition.',
      },
    ],
    metaTitle: 'Ketora: Keto Diet Carb Tracker for Android',
    metaDescription:
      'Track net carbs and macros with a barcode scanner, food diary, keto recipes, a meal planner and an intermittent fasting timer. Free on Google Play.',
  },
  {
    slug: 'easy-recipes-meal-planner',
    name: 'Easy Recipes & Meal Planner',
    tagline: 'Plan the week, cook from what is already in the cupboard, and see the macros while you do it.',
    cardDescription:
      'Recipes with step-by-step directions, a weekly meal planner, a pantry tracker, and nutrition that scales with your serving size.',
    longDescription: [
      'Easy Recipes & Meal Planner puts four things that usually live in four different apps into one: a recipe collection, a weekly planner, an ingredient inventory and nutrition information. The point of the combination is that they feed each other — the planner knows what you own, and cooking a planned recipe can update what you own.',
      'Recipes come with clear ingredients and step-by-step directions, and can be browsed by meal type, cuisine and dietary preference. Every recipe starts at a practical one-person serving and scales up, with ingredient quantities and available nutrition — calories plus protein, carbohydrates and fat — adjusting with the serving size rather than staying fixed at whatever the author cooked.',
      'The pantry tracker is the part that changes how you shop. It keeps a list of what is in your kitchen, surfaces recipe ideas based on ingredients you already have, and shows what is missing before you commit to a meal. Alongside it, dietary preferences filter discovery, and an allergy log lets you record reactions with notes and timestamps so recipes can be flagged when an ingredient matches something you recorded.',
    ],
    category: 'Food & Nutrition',
    categoryId: 'health-nutrition',
    schemaCategory: 'LifestyleApplication',
    playStoreUrl: 'https://play.google.com/store/apps/details?id=com.reigncreative.easyrecipes',
    packageId: 'com.reigncreative.easyrecipes',
    icon: '/icons/easy-recipes-meal-planner.webp',
    iconSmall: '/icons/easy-recipes-meal-planner-sm.webp',
    accent: 'from-gold-400 to-crimson-500',
    playCategory: 'FOOD_AND_DRINK',
    contentRating: 'Everyone',
    containsAds: true,
    inAppPurchases: true,
    free: true,
    lastVerified: '2026-09-15',
    features: [
      {
        title: 'Weekly meal planner',
        body: 'Add recipes to breakfast, lunch, dinner and snack slots so the week is decided before it gets busy.',
      },
      {
        title: 'Pantry tracker',
        body: 'Keep an inventory of what is in the kitchen, find recipes that use it, and see what is missing before you shop.',
      },
      {
        title: 'Servings that scale properly',
        body: 'Recipes start at one serving and scale up, with ingredient amounts and nutrition adjusting to match.',
      },
      {
        title: 'Calories and macros',
        body: 'View calories along with protein, carbohydrates and fat for supported recipes, at the serving size you are actually cooking.',
      },
      {
        title: 'Allergy log and flags',
        body: 'Record allergies and previous reactions with notes and timestamps, and get recipe flags when an ingredient matches one you logged.',
      },
    ],
    audience: [
      'Home cooks who want the week planned in one sitting',
      'People trying to cook what they already bought instead of shopping again',
      'Anyone tracking calories or macros while still cooking real meals',
      'Households managing allergies or specific dietary preferences',
    ],
    howItWorks: [
      {
        title: 'Find recipes',
        body: 'Browse by meal type, cuisine or dietary preference and save the ones you would genuinely cook.',
      },
      {
        title: 'Plan the week',
        body: 'Drop recipes into breakfast, lunch, dinner and snack slots so you are not deciding at six in the evening.',
      },
      {
        title: 'Check the pantry',
        body: 'Match the plan against your ingredient inventory to see what you have and what still needs buying.',
      },
      {
        title: 'Cook and update',
        body: 'Set the serving size, follow the steps, and let the app keep your kitchen list current as you go.',
      },
    ],
    faqs: [
      {
        question: 'Is Easy Recipes & Meal Planner free?',
        answer:
          'Yes, it is free to download on Google Play. It is supported by ads, and Google Play lists in-app purchases.',
      },
      {
        question: 'Does the nutrition change when I cook for more people?',
        answer:
          'Yes. Recipes start at a one-person serving and ingredient quantities and available nutrition information scale with the serving size you choose.',
      },
      {
        question: 'How does the pantry tracker help?',
        answer:
          'It keeps a list of what is in your kitchen, suggests recipes that use those ingredients, and shows what is missing, which cuts down on buying things you already own.',
      },
      {
        question: 'Can it handle food allergies?',
        answer:
          'You can log allergies and previous reactions with notes and timestamps, and recipes are flagged when an ingredient may match something you recorded. Always confirm ingredients and food labels for your own needs.',
      },
      {
        question: 'Is nutrition information available for every recipe?',
        answer:
          'Calories and macros are shown for supported recipes. Where a recipe has no nutrition data available, the app does not estimate one for it.',
      },
    ],
    metaTitle: 'Easy Recipes & Meal Planner for Android',
    metaDescription:
      'Plan a week of meals, track what is in your pantry, and see calories and macros that scale with your serving size. Free on Google Play.',
  },
];
