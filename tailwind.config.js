/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/postgres/**/*.{tsx,ts}",
  ],

  theme: {
    extend: {
      colors: {
        coffe: '#b37c59',
      }
    },
  },
  plugins: [],
}
