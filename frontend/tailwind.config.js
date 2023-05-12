/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		extend: {
			colors: {
				// primary: {
				// 	200: '#D4EDF2',
				// 	300: '#C3E1E8',
				// 	400: '#A4CCD5',
				// 	500: '#96C1CA',
				// 	600: '#7AB1BC',
				// 	700: '#5C9DAA',
				// 	800: '#418593',
				// },
				// secondary: {
				// 	200: '#e1f8f8',
				// 	500: '#5fd7d7',
				// },
				testPrimary: {
					100: '#26A69A',
					200: '#408d86',
					300: '#cdfaf6',
					400: '#f5f5dc',
				},
				testAccent: {
					100: '#80CBC4',
					200: '#43A49B',
				},
				testText: {
					100: '#263339',
					200: '#728f9e',
				},
				testBackground: {
					100: '#E0F2F1',
					200: '#D0EBEA',
					300: '#FFFFFF',
				},
			},
		},
	},
	plugins: [],
};
