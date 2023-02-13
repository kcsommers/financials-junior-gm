/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}', '../core/src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: 'rgb(var(--color-primary) / <alpha-value>)',
        secondary: 'rgb(var(--color-secondary) / <alpha-value>)',
        'secondary-2': 'rgb(var(--color-secondary-2) / <alpha-value>)',
        highlight: 'rgb(var(--color-highlight) / <alpha-value>)',
        foreground: 'rgb(var(--color-foreground) / <alpha-value>)',
        danger: 'rgb(var(--color-danger) / <alpha-value>)',
        dark: 'rgb(var(--color-dark) / <alpha-value>)',
        light: 'rgb(var(--color-light) / <alpha-value>)',
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
        xxs: '0.6rem',
      },
      borderWidth: {
        3: '3px',
        5: '5px',
        6: '6px',
        7: '7px',
        9: '9px',
        10: '10px',
      },
      height: {
        header: '125px',
        footer: '88px',
        80: '80px',
      },
    },
  },
  plugins: [],
};
