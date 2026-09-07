import animate from 'tailwindcss-animate';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Fredoka', 'Noto Sans TC', 'sans-serif'],
      },
      colors: {
        primary: '#6366f1',
        secondary: '#06b6d4',
        accent: '#f43f5e',
        dark: '#0f172a',
        glass: 'rgba(255, 255, 255, 0.1)',
        'space-black': '#0b0d17',
        'space-blue': '#1c1e33',
        'star-yellow': '#ffe87f',
        'kidrise-orange': '#f97316',
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 20s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
    },
  },
  plugins: [animate],
};
