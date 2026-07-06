import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          50: '#F7F7F8',
          100: '#EFEFF1',
          200: '#E0E0E4',
          300: '#C9C9D0',
          400: '#9A9AA3',
          500: '#6E6E78',
          600: '#52525C',
          700: '#3B3B44',
          800: '#26262C',
          900: '#16161B',
          950: '#0C0C10',
        },
        gold: {
          50: '#FCF9F0',
          100: '#F7F0DC',
          200: '#EEDFB4',
          300: '#E3CA85',
          400: '#D6B25A',
          500: '#C9A13B',
          600: '#B08A2E',
          700: '#8F6E23',
          800: '#745817',
          900: '#5E4712',
          950: '#362807',
        },
        crimson: {
          50: '#FDF2F4',
          100: '#FBE4E8',
          200: '#F6C9D1',
          300: '#EE9DAB',
          400: '#E26379',
          500: '#C8102E',
          600: '#A90D27',
          700: '#8B0A20',
          800: '#71081B',
          900: '#5C0716',
          950: '#33030B',
        },
        cream: {
          50: '#FCFBF7',
          100: '#FAF8F2',
          200: '#F4F1E6',
          300: '#ECE7D6',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-fraunces)', 'Georgia', 'serif'],
      },
      boxShadow: {
        card: '0 1px 2px rgba(12, 12, 16, 0.04), 0 8px 24px -12px rgba(12, 12, 16, 0.12)',
        'card-hover':
          '0 2px 6px rgba(12, 12, 16, 0.05), 0 24px 48px -16px rgba(12, 12, 16, 0.18)',
        'gold-glow': '0 12px 40px -10px rgba(201, 161, 59, 0.45)',
        'crimson-glow': '0 12px 36px -10px rgba(200, 16, 46, 0.35)',
        'icon-tile':
          '0 2px 4px rgba(12, 12, 16, 0.08), 0 16px 32px -12px rgba(12, 12, 16, 0.25)',
      },
      animation: {
        'float-slow': 'float-y 7s ease-in-out infinite',
        'float-mid': 'float-y 5.5s ease-in-out 0.8s infinite',
        'float-fast': 'float-y 4.5s ease-in-out 0.3s infinite',
        shimmer: 'shimmer 3.2s linear infinite',
        'streak-a': 'streak-a 14s ease-in-out infinite alternate',
        'streak-b': 'streak-b 18s ease-in-out infinite alternate',
        'pulse-soft': 'pulse-soft 4s ease-in-out infinite',
        'spin-slower': 'spin 24s linear infinite',
      },
      keyframes: {
        'float-y': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '200% 50%' },
          '100%': { backgroundPosition: '-200% 50%' },
        },
        'streak-a': {
          '0%': { transform: 'translate3d(-8%, -4%, 0) rotate(-14deg) scale(1)' },
          '100%': { transform: 'translate3d(10%, 6%, 0) rotate(-8deg) scale(1.12)' },
        },
        'streak-b': {
          '0%': { transform: 'translate3d(6%, 8%, 0) rotate(16deg) scale(1.05)' },
          '100%': { transform: 'translate3d(-10%, -6%, 0) rotate(10deg) scale(0.95)' },
        },
        'pulse-soft': {
          '0%, 100%': { opacity: '0.35' },
          '50%': { opacity: '0.7' },
        },
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
};

export default config;
