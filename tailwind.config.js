/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
  	extend: {
		colors: {
			'text': 'var(--text)',
			'background': 'var(--background)',
			'primary': 'var(--primary)',
			'secondary': 'var(--secondary)',
			'accent': 'var(--secondary)',
		   },
  		fontSize: {
  			sm: '0.750rem',
  			base: '1rem',
  			xl: '1.333rem',
  			'2xl': '1.777rem',
  			'3xl': '2.369rem',
  			'4xl': '3.158rem',
  			'5xl': '4.210rem'
  		},
  		fontFamily: {
  			heading: 'Hanuman',
  			body: 'Source Sans 3'
  		},
  		fontWeight: {
  			normal: '400',
  			bold: '700'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
  
};
