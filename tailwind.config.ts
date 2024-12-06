import type { Config } from 'tailwindcss';
import colors from 'tailwindcss/colors';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      ...colors,
      white: '#ffffff',
      black: '#000000',
      gray: {
        10: '#FAFAFA',
        20: '#F5F5F5',
        30: '#F0F0F0',
        40: '#D9D9D9',
        50: '#BFBFBF',
        60: '#8C8C8C',
        70: '#595959',
        80: '#434343',
        90: '#262626',
      },
      primary: {
        10: '#FFFDF0',
        20: '#FFFCEB',
        30: '#FFF4C2',
        40: '#FFE999',
        50: '#FFDB70',
        DEFAULT: '#FFCB48',
        70: '#D9A432',
        80: '#B37F20',
        90: '#8C5D12',
        100: '#66410C',
        110: '#3F311C',
      },
    },
    screens: {
      xs: '480px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    extend: {
      boxShadow: {
        '4xl': '0 0 40px 0 rgb(0 0 0 /0.05)',
      },
    },
  },
  plugins: [],
};
export default config;
