import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      dianne: {
        50: '#edfefe',
        100: '#D1FAFC',
        200: '#A9F3F8',
        300: '#6EE7F2',
        400: '#2CD3E4',
        500: '#10B6CA',
        600: '#1091AA',
        700: '#14748A',
        800: '#1A5F70',
        900: '#164351',
        950: '#0B3441',
      },
      purpose: {
        error: '#E28585',
        info: '#B0E0E6',
        success: '#90EE90',
        alert: '#FFDAB9',
      },
      black: '#000000',
      white: '#ffffff',
      'background-dark': '#030E11',
    },
    fontFamily: {
      sans: ['Poppins', 'sans-serif'],
      mono: ['Lato', 'monospace'],
      special: ['Changa One', 'serif'],
    },
  },
  plugins: [],
}
export default config
