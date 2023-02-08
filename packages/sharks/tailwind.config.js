/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}', '../core/src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      primary: 'var(--font-primary)',
    },
    extend: {
      colors: {
        primary: 'rgb(var(--color-primary) / <alpha-value>)',
        secondary: 'rgb(var(--color-secondary) / <alpha-value>)',
        highlight: 'rgb(var(--color-highlight) / <alpha-value>)',
        foreground: 'rgb(var(--color-foreground) / <alpha-value>)',
      },
      boxShadow: {
        mat: 'var(--box-shadow-mat)',
      },
      outlineColor: {
        primary: 'rgb(var(--color-primary) / <alpha-value>)',
      },
    },
  },
  plugins: [],
};
