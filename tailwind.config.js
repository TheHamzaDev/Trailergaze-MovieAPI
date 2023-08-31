/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sequel: ["SEQUEL", "sans-serif"]
      },
      backgroundImage: {
        'playBtn': "url('../src/assets/images/mdi_play.svg')"
      },
      colors: {
        'light': '#F5EFDF',
        'dark' : '#0b0c0b',
        'neon' : '#BDFF00',
        'dark.5' : 'rgba(11, 12, 11, 0.5)',
      },
      spacing: {
        '10.5px' : '10.5px',
        '20vh' : '20vh',
        '45vh' : '45vh',
        '50vh' : '50vh',
        '60vh' : '60vh',
        '70vh' : '70vh',
        '8vw' : '8vw',
        '45vw' : '45vw',
        '50vw' : '50vw',
        '65vw' : '65vw',
      },
    },
  },
  plugins: [],
}

