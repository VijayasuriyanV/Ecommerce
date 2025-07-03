import type { useNavigate } from "@tanstack/react-router";
import {
	browserLocalPersistence,
	browserSessionPersistence,
	setPersistence,
	signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../../firebase";
import { toast } from "react-toastify";

export const handleSignin = async ({
	e,
	email,
	password,
	rememberMe,
	setFirstName,
	setLoading,
	navigate,
}: {
	e: React.FormEvent;
	email: string;
	password: string;
	rememberMe: boolean;
	setFirstName: (name: string) => void;
	setLoading: (value: boolean) => void;
	navigate: ReturnType<typeof useNavigate>;
}) => {
	e.preventDefault();
	setLoading(true);
	try {
		await setPersistence(
			auth,
			rememberMe ? browserLocalPersistence : browserSessionPersistence,
		);
		const userCredential = await signInWithEmailAndPassword(
			auth,
			email,
			password,
		);
		const nameFromEmail = userCredential.user.email?.split("@")[0] ?? "";
		setFirstName(nameFromEmail);
		localStorage.setItem("firstName", nameFromEmail);
		localStorage.setItem("isAuthenticated", "true");
		toast.success("Sign in successful!");
		navigate({ to: "/" });
	} catch (error: unknown) {
		if (error instanceof Error) {
			toast.error(error.message);
		} else {
			toast.error("Signin failed. Please try again.");
		}
	} finally {
		setLoading(false);
	}
};
