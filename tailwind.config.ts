import type { Config } from "tailwindcss";


const config: Config = {
    darkMode: ["class"],
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		screens: {
  			sm: '480px',
  			md: '768px',
  			lg: '1024px',
  			xl: '1280px',
  			'2xl': '1400px'
  		},
  		colors: {
  			primaryPurple: '#5E2CA5',
  			textGrey: '#3C3842',
  			primaryGreen: '#73A52C',
  			darkBlack: '#121212',
  			softPurple: '#BB86FC',
  			lightGray: '#E0E0E0',
  			cyanGreen: '#03DAC6',
  			redPink: '#CF6679',
  			lightBlack: '#1e1e1e',
  			darkWhite: '#F0F0F0',
  			textOrange: '#f98838',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		backgroundImage: {
  			'black-gradient': 'linear-gradient(135deg, #121212 0%, #1E1E1E 50%, #2C2C2C 100%)'
  		},
  		fontFamily: {
  			lato: [
  				'var(--font-lato)'
  			],
  			urbanist: [
  				'var(--font-urbanist)'
  			],
  			oleo: [
  				'var(--font-oleo)'
  			]
  		},
  	}
  },
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  plugins: [require("tailwindcss-animate")],
};
export default config;
