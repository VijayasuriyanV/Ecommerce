import { createContext, useContext, useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase";

const AuthContext = createContext<{
	firstName: string | null;
	setFirstName: (name: string | null) => void;
}>({ firstName: null, setFirstName: () => {} });

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const [firstName, setFirstName] = useState<string | null>(() =>
		localStorage.getItem("firstName"),
	);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (user?.email) {
				const nameFromEmail = user.email.split("@")[0];
				setFirstName(nameFromEmail);
				localStorage.setItem("firstName", nameFromEmail);
				localStorage.setItem("isAuthenticated", "true");
			} else {
				setFirstName(null);
				localStorage.removeItem("firstName");
				localStorage.removeItem("isAuthenticated");
			}
		});

		return () => unsubscribe(); //Cleanup becoz onAuthStateChanged func kinda retrn stop listening...
	}, []);

	return (
		<AuthContext.Provider value={{ firstName, setFirstName }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => useContext(AuthContext);
