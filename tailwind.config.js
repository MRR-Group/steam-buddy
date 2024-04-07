import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line import/no-default-export
export default {
  content: [
    './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
    './storage/framework/views/*.php',
    './resources/views/**/*.blade.php',
    './resources/js/**/*.jsx',
  ],

  theme: {
    colors: {
      transparent: 'transparent',
      'transparent-dark': 'rgba(31, 31, 31, 0.13)',
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
