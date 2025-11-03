// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{astro,html,js,jsx,ts,tsx,vue,svelte}",
  ],
  theme: {
    extend: {
      colors: {
        main: "var(--main)",
        accent: "var(--accent)",
        light: "var(--light)",
      },
    },
  },
  plugins: [],
};
