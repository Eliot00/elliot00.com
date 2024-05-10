/** @type {import('tailwindcss').Config} */
const { withMaterialColors } = require('tailwind-material-colors')

const config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

module.exports = withMaterialColors(
  config,
  {
    primary: '#415f91',
  },
  {
    scheme: 'content',
    contrast: 0,
  }
)
