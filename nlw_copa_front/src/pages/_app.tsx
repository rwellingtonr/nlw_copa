import "~/styles/global.css";
import type { AppProps } from "next/app";
import { ToastProvider } from "~/context/toastProvider";

export default function App({ Component, pageProps }: AppProps) {
	return (
		<ToastProvider>
			<Component {...pageProps} />
		</ToastProvider>
	);
}
