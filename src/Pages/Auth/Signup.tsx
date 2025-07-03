import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import { useAuth } from "./AuthContext";
import { siteConfig } from "../../Constants/siteConfig";
import AuthHandle from "./AuthHandle";

const Signup = () => {
	const navigate = useNavigate();
	const { firstName, setFirstName } = useAuth();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [loading, setLoading] = useState(false);

	const handleSignup = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!email || !password || !confirmPassword) {
			toast.info("Please fill in all fields");
			return;
		}

		if (password !== confirmPassword) {
			toast.warning("Passwords do not match!");
			return;
		}

		setLoading(true);
		try {
			const userCredential = await createUserWithEmailAndPassword(
				auth,
				email,
				password,
			);
			const nameFromEmail = userCredential.user.email?.split("@")[0] ?? "";
			setFirstName(nameFromEmail);
			localStorage.setItem("firstName", nameFromEmail);
			localStorage.setItem("isAuthenticated", "true");
			toast.success("Signup successful!");
			navigate({ to: "/" });
		} catch (error: unknown) {
			if (error instanceof Error) {
				toast.error(error.message);
			} else {
				toast.error("Signup failed. Please try again.");
			}
		} finally {
			setLoading(false);
		}
	};
	if (firstName) {
		return <AuthHandle />;
	}

	return (
		<section className="min-h-screen flex items-center justify-center px-4 bg-[#f5f3ff]">
			<div className="max-w-5xl w-full grid md:grid-cols-2 bg-white shadow-xl rounded-3xl overflow-hidden">
				{/* Left Panel */}
				<div className="bg-gradient-to-br from-[#7F56D9] to-[#4F378B] text-white flex flex-col items-center justify-center p-10">
					<h2 className="text-3xl font-bold text-center">
						Welcome to {siteConfig.first_name} {siteConfig.last_name}
					</h2>
					<p className="mt-2 text-lg text-purple-100 text-center">
						{siteConfig.description}
					</p>
					<img
						src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
						alt="Signup illustration"
						className="mt-8 w-80 rounded-xl shadow-lg"
					/>
				</div>

				{/* Right Panel */}
				<div className="p-10 flex flex-col justify-center">
					<h3 className="text-center text-2xl font-semibold text-[#4F378B] mb-6">
						Create a New Account
					</h3>

					<form onSubmit={handleSignup} className="flex flex-col gap-4">
						<input
							type="email"
							placeholder="Email"
							className="px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#7F56D9]"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
						/>
						<input
							type="password"
							placeholder="Password"
							className="px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#7F56D9]"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
						/>
						<input
							type="password"
							placeholder="Confirm Password"
							className="px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#7F56D9]"
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
							required
						/>

						<button
							type="submit"
							disabled={loading}
							className="mt-2 bg-[#22C55E] hover:bg-[#16a34a] text-white py-3 rounded-lg text-sm font-medium disabled:opacity-50 transition"
						>
							{loading ? "Signing up..." : "Sign Up"}
						</button>
					</form>

					<p className="mt-6 text-center text-sm text-gray-600">
						Already have an account?{" "}
						<button
							type="button"
							onClick={() => navigate({ to: "/signin" })}
							className="font-medium text-[#7F56D9] hover:underline"
						>
							Log In
						</button>
					</p>
				</div>
			</div>
		</section>
	);
};

export default Signup;
