/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./src/**/*.{js,jsx,ts,tsx}",
		"./public/index.html",
		"./@/**/*.{js,jsx,ts,tsx}",
	],
	theme: {
		extend: {
			colors: {
				background: "var(--quaternary-color)",
				primary: "var(--link-color)",
				"primary-foreground": "#ffffff",
			},
		},
	},
	plugins: [],
};
