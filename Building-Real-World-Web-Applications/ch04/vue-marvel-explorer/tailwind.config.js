// Listing 4.4 Adjustments for Tailwind CSS 3.0 warnings tailwind.config.js file in the vue-local-weather folder
// warn - The `purge`/`content` options have changed in Tailwind CSS v3.0.
// warn - Update your configuration file to eliminate this warning.
// https://tailwindcss.com/docs/upgrade-guide#configure-content-sources

/** @type {import('tailwindcss').Config} */
export default {
    content: [ './public/**/*.html', './src/**/*.{vue,js,ts,tsx}'],
    theme: {
      extend: {},
    },
    plugins: [],
  }
  
  