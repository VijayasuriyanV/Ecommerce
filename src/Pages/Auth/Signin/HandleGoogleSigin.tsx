import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../../firebase";
import { toast } from "react-toastify";
import type { useNavigate } from "@tanstack/react-router";
export const handleGoogleSignin = async ({
	setFirstName,
	navigate,
}: {
	setFirstName: (val: string) => void;
	navigate: ReturnType<typeof useNavigate>;
}) => {
	try {
		const provider = new GoogleAuthProvider();
		const result = await signInWithPopup(auth, provider);
		const user = result.user;

		const fullName = user.displayName ?? "";
		const first = fullName.split(" ")[0];

		setFirstName(first);
		localStorage.setItem("firstName", first);
		localStorage.setItem("isAuthenticated", "true");

		toast.success("Google sign-in successful!");
		navigate({ to: "/" });
	} catch (error: unknown) {
		if (error instanceof Error) {
			toast.error(error.message);
		} else {
			toast.error("Google sign-in failed.");
		}
	}
};
