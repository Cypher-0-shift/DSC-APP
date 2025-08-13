/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",  // <-- This line ensures Tailwind scans your React files
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
