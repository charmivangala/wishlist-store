/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#1C2321',
        canvas: '#F6F5F1',
        panel: '#FFFFFF',
        moss: {
          50: '#EEF3EC',
          100: '#D8E4D4',
          400: '#5C7A52',
          600: '#3F5A38',
          700: '#324629',
        },
        clay: {
          400: '#C9603C',
          500: '#B44F2E',
          600: '#9A3F22',
        },
        line: '#E4E1D8',
      },
      fontFamily: {
        display: ['"Fraunces"', 'Georgia', 'serif'],
        body: ['"Inter"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 1px 2px rgba(28,35,33,0.06), 0 8px 20px -12px rgba(28,35,33,0.15)',
      },
      borderRadius: {
        xl2: '1.1rem',
      },
    },
  },
  plugins: [],
}
