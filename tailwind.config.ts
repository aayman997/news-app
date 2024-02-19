import { Config } from "tailwindcss";

const config: Config = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: "Rubik, sans-serif",
    },
    extend: {},
  },
  plugins: [],
};

export default config;
