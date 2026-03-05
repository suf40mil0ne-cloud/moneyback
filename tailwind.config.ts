import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        ink: '#102133',
        accent: '#0d9488',
        soft: '#eef6f8'
      },
      boxShadow: {
        card: '0 10px 30px rgba(16, 33, 51, 0.08)'
      }
    }
  },
  plugins: []
};

export default config;
