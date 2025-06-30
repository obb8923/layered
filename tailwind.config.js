/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        'p-regular': ['Pretendard-Regular'],
        'p-semibold': ['Pretendard-SemiBold'],
        'p-extrabold': ['Pretendard-ExtraBold'],
        'p-black': ['Pretendard-Black'],
      },
      colors: {
        'background': '#232736',
        'controller':'#33354B',
        'white': '#fefefe',
        'black': '#191919',
        'line':'#EEF0FF',
        'lightblue' : '#AABCF6',
        'blue' : '#7485BD',
        'purple':'#6A539A',

      },
    },
  },
  plugins: [],
}; 
