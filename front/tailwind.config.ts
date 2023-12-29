import type { Config } from "tailwindcss";
const colors = require("tailwindcss/colors");

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
    colors: {
      background: {
        100: "#FFFFFF",
        900: "#191919",
      },
      primary: {
        100: "#2C3333",
        900: "#2C3333",
      },
      text: {
        50: "#C6C6C6",
        100: "#878787",
      },
      black: colors.black,
      gray: colors.gray,
      slate: colors.slate,
      red: colors.red,
      green: colors.green,
      yellow: colors.yellow,
      transparent: "transparent",
      violet: colors.violet,
      fuchsia: colors.fuchsia
    },
  },
  plugins: [],
};
export default config;
