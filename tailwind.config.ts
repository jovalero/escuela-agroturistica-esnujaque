import type { Config } from 'tailwindcss';
import typography from '@tailwindcss/typography';

const config: Config = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './data/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        paramo: {
          50: '#f0f9f4',
          100: '#d8f3dc',
          200: '#b7e4c7',
          300: '#95d5b2',
          400: '#52b788',
          500: '#40916c',
          600: '#2d6a4f',
          700: '#1b4332',
          800: '#143326',
          900: '#0b1d15',
          950: '#07120d',
        },
        tierra: {
          50: '#fbf8f3',
          100: '#f5efe4',
          200: '#eaddc6',
          300: '#dec49e',
          400: '#dda15e',
          500: '#b07d3b',
          600: '#93622d',
          700: '#764b25',
          800: '#603d22',
          900: '#50331e',
        },
        laguna: {
          50: '#f0f8fc',
          100: '#e0f1f9',
          200: '#bae3f4',
          300: '#7dcdec',
          400: '#38b3df',
          500: '#1d5b79',
          600: '#174961',
          700: '#133b4f',
          800: '#113243',
          900: '#0d2633',
        },
        papel: {
          DEFAULT: '#FFFFFF',
          dark: '#0E1713',
          card: '#FFFFFF',
          cardDark: '#15221C',
        },
      },
      fontFamily: {
        serif: ['var(--font-serif)', 'Georgia', 'Cambria', 'serif'],
        sans: ['var(--font-sans)', 'system-ui', '-apple-system', 'sans-serif'],
      },
      maxWidth: {
        reading: '70ch',
      },
    },
  },
  plugins: [typography],
};

export default config;
