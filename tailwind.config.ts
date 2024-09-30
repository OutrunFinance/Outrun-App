import { nextui } from "@nextui-org/react";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        kronaOne: ["KronaOne"],
        verdana: ["Verdana"],
        avenir: ["Avenir"],
      },
      backgroundImage: {
        "button-gradient": "linear-gradient(270deg, #F617B3 0%, #1935ED 65%)",
        "card-button": "linear-gradient( 232deg, #FF2A83 1%, #EB25B7 99%)",
        "text-gradient": "linear-gradient(180deg, #6271FA 31%, #7B33E7 61%, #FFFFFF 70%, #6A6DFF 76%, #7C24FF 100%)",
        "menu-card": "linear-gradient( 206deg, rgba(36,102,255,0.12) 0%, rgba(17,1,194,0) 100%)",
        modal: "linear-gradient( 211deg, rgba(9,10,32,0.93) 4%, #080A1E 31%, #1E0F37 85%)",
        title: "linear-gradient(180deg, #6271FA 31%, #7C24FF 70%)",
        "title-card": "linear-gradient(180deg, #E3CBFF 31%, #9896FD 70%)",
        thumb: "linear-gradient( 192deg, #F6D6FF 20%, #CDBCFF 99%)",
        notification: "linear-gradient( 201deg, rgba(95,55,149,0.119) 0%, rgba(35,36,108,0.259) 100%)",
      },
      boxShadow: {
        button: "0rem 0.25rem 1.44rem 0.31rem rgba(76,24,246,0.4)",
        card: "0rem 0.31rem 3.13rem 0.13rem rgba(185,11,133,0.3)",
      },
      borderColor: {
        card: "rgba(200, 104, 255, 0.53)",
      },
    },
  },
  darkMode: "class",
  plugins: [
    nextui({
      themes: {
        light: {
          colors: {
            secondary: "#6C41F4",
          },
        },
      },
    }),
  ],
};
export default config;
