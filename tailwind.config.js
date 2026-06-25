/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'fraunces': ['"Fraunces"', 'serif'],
        'instrument': ['"Instrument Sans"', 'sans-serif'],
        'fragment': ['"Fragment Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
}