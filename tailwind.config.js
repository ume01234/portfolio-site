/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        coffee: {
          cream: '#f5e6d3',
          latte: '#e8d5c4',
          beige: '#d4c4b0',
          brown: '#8b6f47',
          dark: '#5d4e37',
          espresso: '#3e2723',
        },
      },

      fontFamily: {
        serif: ['"Noto Serif JP"', 'serif'],
      },
    },
  },
  plugins: [],
};

