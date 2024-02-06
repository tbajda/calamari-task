/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    colors: {
      bgPrimary: '#F9FAFE',
      white: '#ffffff',
      primary: '#3540FF',
      secondary: '#00E3EE',

      grey: '#C5CDDA',
      lightGrey: '#F3F5FC',

      textPrimary: '#000000',
      textSecondary: '#A2A8C1',
      transparent: 'transparent',

      borderPrimary: '#F2F4F6',
    },
    extend: {
      gridTemplateColumns: {
        'auto-fill-280': 'repeat(auto-fill, minmax(280px, 1fr))',
      },
      boxShadow: {
        shd: '0px 3px 16px 0px #E7EAF759',
        input: '0px 3px 16px 0px #2211660D',
      },
    },
  },
  plugins: [],
};
