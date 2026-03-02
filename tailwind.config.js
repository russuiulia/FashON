/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        beige: {
          50: '#F9F3EC',  // background light
          100: '#E8DDD0',  // border light
          900: '#2C1F14',  // text light
        },
        espresso: {
          900: '#1C1510',  // background dark
          800: '#2E2318',  // border dark
          200: '#F0E6D6',  // text dark
        },
        gold: {
          light: '#8B6914',  // tint light
          dark: '#C9A84C',  // tint dark
        },
        caramel: '#9C7D5A',  // icon light
        bronze: '#7A6248',  // icon dark
      },
    },
  },
  darkMode: 'media', 
  plugins: [],
};