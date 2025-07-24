import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'ka-blue': '#1865f2',
        'ka-blue-dark': '#0c4fb3', 
        'ka-blue-light': '#e7f3ff',
        'ka-green': '#00af54',
      },
      borderRadius: {
        'none': '0px',
        'sm': '1px',
        DEFAULT: '2px',
        'md': '3px',
        'lg': '3px',
        'xl': '4px',
        '2xl': '6px',
        '3xl': '8px',
        'full': '9999px',
      },
    },
  },
};

export default config; 