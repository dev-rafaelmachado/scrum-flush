import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      'blue-dianne': {
        '50': '#edfefe',
        '100': '#d1fafc',
        '200': '#a9f3f8',
        '300': '#6ee7f2',
        '400': '#2cd3e4',
        '500': '#10b6ca',
        '600': '#1091aa',
        '700': '#14748a',
        '800': '#1a5f70',
        '900': '#164351',
        '950': '#0b3441',
      },
      basic: {
        black: '#000000',
        white: '#ffffff',
        bg1: '#030E11',
      },
      purpose: {
        error: '#E28585',
        info: '#B0E0E6',
        success: '#90EE90',
        alert: '#FFDAB9',
      },
    },
    fontFamily: {
      basic: ['Lato', 'sans-serif'],
      extra: ['Carter One', 'serif'],
    },
  },
  plugins: [],
}
export default config
