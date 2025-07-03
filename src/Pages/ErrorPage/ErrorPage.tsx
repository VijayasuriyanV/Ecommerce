import { useNavigate } from "@tanstack/react-router";

const ErrorPage = () => {
	const navigate = useNavigate();

	return (
		<div className="flex flex-col items-center justify-center h-screen text-gray-800 bg-gray-100">
			<h1 className="font-bold text-red-500 text-[18rem]">404</h1>
			<h2 className="mt-4 text-2xl font-semibold">Page Not Found</h2>
			<p className="max-w-md mt-2 text-center">
				Sorry, the page you are looking for does not exist or has been moved.
			</p>
			<button
				type="button"
				onClick={() => navigate({ to: "/" })}
				className="px-6 py-2 mt-6 text-white transition duration-300 bg-blue-600 rounded hover:bg-blue-700"
			>
				Go to Home
			</button>
		</div>
	);
};

export default ErrorPage;
