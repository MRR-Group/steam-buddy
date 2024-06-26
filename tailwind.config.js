import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line import/no-default-export
export default {
  content: [
    './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
    './storage/framework/views/*.php',
    './resources/views/**/*.blade.php',
    './resources/js/**/*.tsx',
  ],

  theme: {
    extend: {
      screens: {
        xs: "475px",
        "3xl": "1750px",
      },

      spacing: {
        3.5: "0.85rem",
        41: "10.5rem",
        90: "21rem",
      },
    },

    colors: {
      transparent: 'transparent',
      'transparent-dark': {
        DEFAULT: 'rgba(31, 31, 31, 0.13)',
        50: 'rgba(31, 31, 31, 0)',
        100: 'rgba(31, 31, 31, 0.1)',
        200: 'rgba(31, 31, 31, 0.2)',
        300: 'rgba(31, 31, 31, 0.3)',
        400: 'rgba(31, 31, 31, 0.4)',
        500: 'rgba(31, 31, 31, 0.5)',
        600: 'rgba(31, 31, 31, 0.6)',
        700: 'rgba(31, 31, 31, 0.7)',
        800: 'rgba(31, 31, 31, 0.8)',
        900: 'rgba(31, 31, 31, 0.9)',
        950: 'rgba(31, 31, 31, 1)',
      },

      primary: {
        DEFAULT: '#07bcff',
        50: '#effaff',
        100: '#def3ff',
        200: '#b6eaff',
        300: '#75dcff',
        400: '#2ccbff',
        500: '#07bcff',
        600: '#0091d4',
        700: '#0073ab',
        800: '#00618d',
        900: '#065074',
        950: '#04334d',
      },
      secondary: {
        default: '#6d6d6d',
        50: '#f6f6f6',
        100: '#e7e7e7',
        200: '#d1d1d1',
        300: '#b0b0b0',
        400: '#888888',
        500: '#6d6d6d',
        600: '#5d5d5d',
        700: '#4f4f4f',
        800: '#454545',
        900: '#3d3d3d',
        950: '#000000',
      },
      dark: "#1B2838",
      text: '#ffffff',
      error: '#FF0000',
      gradient: {
        light: '#06BDFF',
        medium: '#189BFF',
        dark: '#2B73FF',
      },
    },

    fontFamily: {
      inter: 'Inter',
    },

    boxShadow: {
      md: '-4px 4px 4px rgba(0, 0, 0, 0.4)',
    },

    backdropBlur: {
      md: '10px',
    },
  },
  plugins: [forms],
};
