import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate } from "@tanstack/react-router";
import { useAuth } from "./AuthContext";

const AuthHandle = () => {
	const { setFirstName } = useAuth();

	const navigate = useNavigate();
	return (
		<section className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
			<div className="bg-white p-8 rounded-xl shadow-md text-center">
				<h2 className="text-2xl font-semibold text-[#4F378B]">
					You are already logged in
				</h2>
				<p className="mt-2 text-gray-600">
					Click below to logout if this is not your account.
				</p>
				<button
					type="button"
					className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
					onClick={async () => {
						await signOut(auth);
						localStorage.removeItem("firstName");
						localStorage.removeItem("isAuthenticated");
						setFirstName(null);
						navigate({ to: "/signin" });
					}}
				>
					Logout
				</button>
			</div>
		</section>
	);
};

export default AuthHandle;
