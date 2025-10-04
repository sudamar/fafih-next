/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0A2342',
        secondary: '#2C678F',
        background: '#F4F4F9',
        'card-bg': '#FFFFFF',
        'footer-blue': '#1d4397',
        'secondary-light': '#a0c8e0',
      },
      fontFamily: {
        sans: ['var(--font-body)', 'sans-serif'],
        display: ['var(--font-heading)', 'sans-serif'],
      },
      boxShadow: {
        header: '0 4px 12px rgba(0, 0, 0, 0.08)',
        card: '0 8px 20px rgba(0, 0, 0, 0.12)',
      },
      backgroundImage: {
        'rainbow-gradient': 'linear-gradient(90deg, #6A0DAD, #0000FF, #008000, #FFFF00, #FFA500, #FF0000)',
      },
    },
  },
  plugins: [],
}
