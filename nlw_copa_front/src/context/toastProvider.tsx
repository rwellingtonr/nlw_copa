import { ReactNode, createContext, useContext } from "react";
import { Toaster, toast } from "react-hot-toast";

type ToastTypes = "success" | "error";

type ToastContextProps = {
	showToast: (message: string, type?: ToastTypes) => void;
};

type ToastProviderProps = {
	children: ReactNode;
};

const ToastContext = createContext({} as ToastContextProps);

export const useToast = () => useContext(ToastContext);

export function ToastProvider({ children }: ToastProviderProps) {
	const toastTypes = {
		success: "🚀",
		error: "🤡",
	};
	const showToast = (message: string, type: ToastTypes = "success") => {
		toast(message, {
			icon: toastTypes[type],
			style: {
				background: "#333",
				color: "#fff",
				borderRadius: "10px",
			},
		});
	};

	return (
		<ToastContext.Provider value={{ showToast }}>
			<Toaster position="bottom-right" reverseOrder={false} />
			{children}
		</ToastContext.Provider>
	);
}
