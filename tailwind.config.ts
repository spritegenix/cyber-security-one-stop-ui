import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        font1: ['var(--font1)'],
      },
      colors: {
        bg1: '#F97316', // orange
        bg2: '#000000', // black
        bg3: '#FAE7D6', // light orange
      },
      backgroundImage: {
        bgGradient1: "linear-gradient(90deg, hsl(20deg 91% 40%) 0%, hsl(22deg 88% 45%) 20%, hsl(24deg 87% 51%) 40%, hsl(24deg 87% 51%) 60%, hsl(22deg 88% 45%) 80%, hsl(20deg 91% 40%) 100%)",
      },
      keyframes: {
        'slide-up': {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        "fadeIn": {
          "from": { opacity: "0" },
          "to": { opacity: "1" },
        },
      },
      animation: {
        'slide-up': 'slide-up 0.3s ease-out forwards',
        "fadeIn": 'fadeIn 0.3s ease-in-out',
      },
    },
  },
  plugins: [],
};

export default config;
