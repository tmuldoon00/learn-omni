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
    },
  },
};

export default config; 