/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		extend: {
			colors: {
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
