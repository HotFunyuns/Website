export interface AppInfo {
  id: string;
  name: string;
  description: string;
  category: string;
  status: 'Published' | 'In Development' | 'Coming Soon';
  icon: string;
  gradient: string;
  playStoreUrl?: string;
}

export const apps: AppInfo[] = [
  {
    id: 'level-up-daily',
    name: 'Level Up Daily',
    description:
      'Discover fascinating facts every day and expand your knowledge across science, history, nature, and more. A curated daily learning experience.',
    category: 'Education',
    status: 'In Development',
    icon: '📚',
    gradient: 'from-amber-500 to-orange-600',
  },
  {
    id: 'protein-tracker',
    name: 'Protein Tracker',
    description:
      'Track your daily protein intake with precision. Set personalized goals, log meals, and stay on top of your nutrition with intuitive charts and insights.',
    category: 'Health & Fitness',
    status: 'In Development',
    icon: '💪',
    gradient: 'from-green-500 to-emerald-600',
  },
  {
    id: 'yeschef',
    name: 'YesChef',
    description:
      'Your personal recipe companion. Browse curated recipes, plan meals, and cook with step-by-step guidance designed for every skill level.',
    category: 'Food & Drink',
    status: 'In Development',
    icon: '👨‍🍳',
    gradient: 'from-red-500 to-rose-600',
  },
  {
    id: 'keto-tracker',
    name: 'Keto Tracker',
    description:
      'Stay in ketosis with confidence. Track macros, discover keto-friendly foods, and monitor your progress with a clean, purpose-built interface.',
    category: 'Health & Fitness',
    status: 'In Development',
    icon: '🥑',
    gradient: 'from-lime-500 to-green-600',
  },
  {
    id: 'breathe-more',
    name: 'Breathe More',
    description:
      'Guided breathing exercises for stress relief, focus, and relaxation. Simple sessions designed to help you find calm in your day.',
    category: 'Health & Wellness',
    status: 'In Development',
    icon: '🧘',
    gradient: 'from-sky-500 to-cyan-600',
  },
  {
    id: 'keyboard-typing-speed',
    name: 'Keyboard Typing Speed Test',
    description:
      'Measure and improve your typing speed and accuracy. Track your progress over time with detailed stats and engaging practice exercises.',
    category: 'Productivity',
    status: 'In Development',
    icon: '⌨️',
    gradient: 'from-violet-500 to-purple-600',
  },
  {
    id: 'ancient-archives',
    name: 'Ancient Archives',
    description:
      'Explore a curated library of classic literature and historical texts. Read timeless works in a beautiful, distraction-free reading experience.',
    category: 'Books & Reference',
    status: 'In Development',
    icon: '📜',
    gradient: 'from-yellow-600 to-amber-700',
  },
  {
    id: 'warehouse-tycoon',
    name: 'Warehouse Tycoon',
    description:
      'Build and manage your warehouse empire in this engaging idle game. Optimize logistics, hire workers, and expand your operations to become a tycoon.',
    category: 'Games',
    status: 'In Development',
    icon: '🏭',
    gradient: 'from-slate-500 to-zinc-600',
  },
  {
    id: 'learn-and-color',
    name: 'Learn and Color',
    description:
      'A creative learning app for all ages. Color beautiful illustrations while discovering interesting facts about animals, nature, and the world.',
    category: 'Education',
    status: 'In Development',
    icon: '🎨',
    gradient: 'from-pink-500 to-fuchsia-600',
  },
  {
    id: 'anime-coloring',
    name: 'Anime Coloring',
    description:
      'Relax and create with stunning anime-inspired coloring pages. Choose from a wide variety of illustrations and bring them to life with vibrant colors.',
    category: 'Entertainment',
    status: 'In Development',
    icon: '✨',
    gradient: 'from-indigo-500 to-blue-600',
  },
];

export const companyInfo = {
  name: 'Reign Creative LLC',
  tagline: 'Crafting Polished Mobile Experiences',
  description:
    'We design and develop high-quality mobile applications and digital products that people love to use.',
  supportEmail: 'ReignCreativeSupport@gmail.com',
  domain: 'reigncreativellc.com',
  founded: '2024',
};
