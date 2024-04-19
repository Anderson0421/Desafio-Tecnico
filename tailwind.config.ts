import type { Config } from "tailwindcss";
import { nextui } from "@nextui-org/react";


const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'text': "#E8FBFF",
        'midnight': '#02080A',
        'night': '#000421',
        'light': '#85D3E9',
        'primary': "#85d3e9",
        'button': "#b043dd",
        'secondary': "#491c97",
        'dashboard-primary': '#11180f',
        'dashboard-second': '#162113',
        'dashboard-third': '#101111',
        'dashboard-fourth': '#181818',
      },
    },
  },
  darkMode: 'class',
  plugins: [nextui()],
};
export default config;
