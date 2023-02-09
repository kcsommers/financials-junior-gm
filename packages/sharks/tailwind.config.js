/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}', '../core/src/**/*.{js,ts,jsx,tsx}'],
  theme: {
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
      fontFamily: {
        primary: 'var(--font-primary)',
      },
      fontSize: {
        h1: '5.25rem',
      },
      borderWidth: {
        5: '5px',
        6: '6px',
        7: '7px',
        9: '9px',
        10: '10px',
      },
    },
  },
  plugins: [],
};
