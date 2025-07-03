import { useState, useId } from "react";
import { useNavigate } from "@tanstack/react-router";

import { useAuth } from "../AuthContext";
import { siteConfig } from "../../../Constants/siteConfig";
import AuthHandle from "../AuthHandle";
import { handleSignin } from "./HandleSignin";
import { handleGoogleSignin } from "./HandleGoogleSigin";

const Signin = () => {
	const navigate = useNavigate();
	const { firstName, setFirstName } = useAuth();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [rememberMe, setRememberMe] = useState(false);
	const [loading, setLoading] = useState(false);
	const googleIconId = useId();

	if (firstName) return <AuthHandle />;

	return (
		<section className="min-h-screen bg-[#f5f3ff] flex items-center justify-center px-4">
			<div className="bg-white shadow-xl rounded-3xl w-full max-w-5xl grid md:grid-cols-2 overflow-hidden">
				{/* Left Side */}
				<div className="bg-gradient-to-br from-[#7F56D9] to-[#4F378B] text-white flex flex-col justify-center items-center p-10">
					<h2 className="text-3xl font-bold text-center">
						{`Welcome to ${siteConfig.first_name} ${siteConfig.last_name}`}
					</h2>
					<p className="text-lg mt-2 text-purple-100 text-center">
						{siteConfig.description}
					</p>
					<img
						src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
						alt="Login visual"
						className="w-80 mt-8 rounded-xl shadow-lg"
					/>
				</div>

				{/* Right Side */}
				<div className="p-10 flex flex-col justify-center">
					<h3 className="text-2xl font-semibold text-[#4F378B] text-center">
						Login to Your Account
					</h3>

					<form
						onSubmit={(e) =>
							handleSignin({
								e,
								email,
								password,
								rememberMe,
								setFirstName,
								setLoading,
								navigate,
							})
						}
						className="mt-6 flex flex-col gap-4"
					>
						<input
							type="email"
							placeholder="Email"
							className="px-4 py-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#7F56D9] outline-none"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
						/>
						<input
							type="password"
							placeholder="Password"
							className="px-4 py-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#7F56D9] outline-none"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
						/>

						<div className="flex justify-between items-center text-sm text-gray-600">
							<label className="flex items-center gap-2">
								<input
									type="checkbox"
									checked={rememberMe}
									onChange={() => setRememberMe(!rememberMe)}
									className="accent-[#7F56D9]"
								/>
								Remember Me
							</label>
						</div>

						<button
							type="submit"
							disabled={loading}
							className="mt-2 bg-[#22C55E] hover:bg-[#16a34a] text-white py-3 rounded-lg text-sm font-medium transition-all"
						>
							{loading ? "Logging in..." : "Login"}
						</button>
					</form>

					<div className="flex items-center my-6">
						<hr className="flex-1 border-gray-300" />
						<span className="px-3 text-sm text-gray-500">OR</span>
						<hr className="flex-1 border-gray-300" />
					</div>

					<button
						type="button"
						onClick={() =>
							handleGoogleSignin({
								setFirstName,
								navigate,
							})
						}
						className="w-full border border-gray-300 text-sm py-3 rounded-lg flex justify-center items-center gap-2 hover:bg-gray-50 transition-all"
					>
						{/* Google SVG */}
						<svg
							className="w-5 h-5"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 533.5 544.3"
							fill="currentColor"
							role="img"
							aria-labelledby="googleIconTitle"
						>
							<title id={googleIconId}>Google Logo</title>
							<path
								d="M533.5 278.4c0-17.4-1.6-34.1-4.6-50.4H272v95.3h147.1c-6.4 34-25.6 62.8-54.7 82v67h88.4c51.7-47.6 80.7-117.8 80.7-194z"
								fill="#4285F4"
							/>
							<path
								d="M272 544.3c73.8 0 135.8-24.5 181-66.6l-88.4-67c-24.5 16.5-55.6 26.2-92.6 26.2-71 0-131.2-47.9-152.7-112.3H29.8v70.5C74.5 485.4 167.4 544.3 272 544.3z"
								fill="#34A853"
							/>
							<path
								d="M119.3 324.6c-10.4-30.5-10.4-63.5 0-94L29.8 160c-29.9 59.8-29.9 129.5 0 189.3l89.5-24.7z"
								fill="#FBBC05"
							/>
							<path
								d="M272 107.7c39.8-.6 77.9 13.9 107.4 40.5l80.5-80.5C411.7 24.7 343.6-.1 272 0 167.4 0 74.5 58.9 29.8 160l89.5 70.5C140.8 155.6 201 107.7 272 107.7z"
								fill="#EA4335"
							/>
						</svg>
						Continue with Google
					</button>

					<p className="text-sm text-center text-gray-600 mt-6">
						Don’t have an account?{" "}
						<button
							type="button"
							onClick={() => navigate({ to: "/signup" })}
							className="text-[#7F56D9] hover:underline font-medium"
						>
							Create one
						</button>
					</p>
				</div>
			</div>
		</section>
	);
};

export default Signin;
