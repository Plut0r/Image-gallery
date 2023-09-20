module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      gridTemplateRows: {
        // Simple 8 row grid
        '8': 'repeat(8, minmax(0, 1fr))',
      },
      gridColumnStart: {
        '1': '1',
        '3': '3',
        '5': '5',
        '7': '7',
        '9': '9',
      },
      gridColumnEnd: {
        '1': '1',
        '3': '3',
        '5': '5',
        '7': '7',
        '9': '9',
      },
      gridRowStart: {
        '1': '1',
        '3': '3',
        '5': '5',
        '7': '7',
        '9': '9',
      },
      gridRowEnd: {
        '1': '1',
        '3': '3',
        '5': '5',
        '7': '7',
        '9': '9',
      }
    },
    container: {
      center: true,
      padding: '2rem',
    }
  },
  plugins: [],
};
