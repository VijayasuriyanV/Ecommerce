import { siteConfig } from "../../Constants/siteConfig";

const Footer = () => {
	return (
		<footer className="bg-white mt-0 text-center text-sm text-gray-600 py-2">
			<div className="max-w-6xl mx-auto px-4">
				<p>
					&copy; {new Date().getFullYear()} {siteConfig.name}. All rights
					reserved.
				</p>
				<div className="flex justify-center mt-2 space-x-4">
					<a href="/" className="hover:text-purple-600">
						Privacy Policy
					</a>
					<a href="/" className="hover:text-purple-600">
						Terms
					</a>
					<a href="/" className="hover:text-purple-600">
						Support
					</a>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
