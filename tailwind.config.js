module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'emerald': {
          '600': '#059669',
          '500': '#10b981',
          '400': '#34d399',
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      backgroundImage: {
        'grid': "url('/grid.svg')",
      },
    },
  },
  plugins: [],
}