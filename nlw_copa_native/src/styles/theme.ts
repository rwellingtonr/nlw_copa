import { extendTheme } from "native-base";

export const theme = extendTheme({
	fonts: {
		heading: "Roboto_700Bold",
		body: "Roboto_400Regular",
		medium: "Roboto_500Medium",
	},
	fontSizes: {
		xs: 12,
		sm: 14,
		lg: 20,
		xl: 24,
	},
	sizes: {
		14: 56,
	},
});
