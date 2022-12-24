/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			fontFamily: {
				sans: "Inter, sans-serif",
			},
			backgroundImage: {
				app: "url(/app-bg.png)",
			},
			colors: {
				gray: {
					900: "#121214",
					800: "#202024",
					600: "#323238",
					300: "#8d8d99",
					100: "#e1e1e6",
				},
				yellow: {
					600: "#e5cd3d",
					500: "#f7dd43",
				},
				ignite: {
					500: "#129557",
				},
			},
		},
	},
	plugins: [],
};
