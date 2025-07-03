import { useState, useEffect, useRef } from "react";
import { Menu, X, UserCircle, LogOut } from "lucide-react";
import { siteConfig } from "../../Constants/siteConfig";
import { useNavigate } from "@tanstack/react-router";
import { useAuth } from "../../Pages/Auth/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";

const Navbar = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [showDropdown, setShowDropdown] = useState(false);
	const { firstName, setFirstName } = useAuth();
	const navigate = useNavigate();
	const dropdownRef = useRef<HTMLDivElement>(null);
	const user = Boolean(firstName);
	const publicLinks = ["Home", "Products", "About", "Contact"];
	const privateLinks = ["Products", "Orders", "Cart", "About", "Contact"];
	const navLinks = user ? privateLinks : publicLinks;

	const getLinkPath = (link: string) =>
		link.toLowerCase() === "home" ? "/" : `/${link.toLowerCase()}`;

	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target as Node)
			) {
				setShowDropdown(false);
			}
		}
		if (showDropdown) {
			document.addEventListener("mousedown", handleClickOutside);
		}
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [showDropdown]);

	const handleLogout = async () => {
		try {
			console.log("Logout btn clicked");
			await signOut(auth);
			localStorage.removeItem("firstName");
			localStorage.removeItem("isAuthenticated");
			localStorage.removeItem("cart");
			localStorage.removeItem("orders");
			setFirstName(null);
			setShowDropdown(false);
			setTimeout(() => {
				navigate({ to: "/signin" });
			}, 100);
		} catch (error) {
			console.error("Logout failed:", error);
		}
	};

	const handleLoginClick = () => {
		navigate({ to: "/signin" });
	};

	return (
		<header className="bg-white shadow sticky top-0 z-50">
			<nav
				className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16"
				aria-label="Main Navigation"
			>
				<button
					type="button"
					onClick={() => navigate({ to: "/" })}
					className="text-2xl font-bold text-purple-700 cursor-pointer bg-transparent border-none p-0 m-0 text-left flex items-center gap-1"
					aria-label="Navigate to home"
				>
					<span className="text-yellow-500">{`{🛒} `}</span>
					{`${siteConfig.first_name}  ${siteConfig.last_name || ""}`}
				</button>

				{/* Desktop Navigation */}
				<ul className="hidden md:flex space-x-6 text-gray-700 font-medium">
					{navLinks.map((link) => (
						<li key={link}>
							<button
								type="button"
								onClick={() => navigate({ to: getLinkPath(link) })}
								className="hover:text-purple-600 cursor-pointer bg-transparent border-none p-0 m-0 text-inherit"
							>
								{link}
							</button>
						</li>
					))}
				</ul>

				{/* User Section */}
				<div className="hidden md:flex items-center gap-4 relative">
					{user ? (
						<div className="relative" ref={dropdownRef}>
							{" "}
							{/* ✅ Moved ref here */}
							<button
								type="button"
								className="relative cursor-pointer select-none flex items-center gap-2 text-sm text-gray-600"
								onClick={() => setShowDropdown((prev) => !prev)}
								aria-haspopup="true"
								aria-expanded={showDropdown}
								aria-label="User menu"
							>
								<UserCircle size={22} className="text-purple-600" />
								Hi, {firstName}
							</button>
							{showDropdown && (
								<div className="absolute right-0 mt-2 w-24 bg-white border rounded-2xl shadow-md z-10">
									<button
										type="button"
										onClick={handleLogout}
										className="w-full text-left px-4 py-2 text-sm text-gray-700 rounded-2xl hover:bg-red-50 hover:text-red-500 flex items-center gap-2"
										aria-label="Logout"
									>
										<LogOut size={16} />
										Logout
									</button>
								</div>
							)}
						</div>
					) : (
						<button
							type="button"
							className="bg-purple-600 text-white px-4 py-1 rounded hover:bg-purple-700 text-sm"
							onClick={handleLoginClick}
							aria-label="Login"
						>
							Login
						</button>
					)}
				</div>

				{/* Mobile Toggle */}
				<button
					type="button"
					className="md:hidden"
					onClick={() => setIsOpen(!isOpen)}
					aria-label={isOpen ? "Close menu" : "Open menu"}
					aria-expanded={isOpen}
				>
					{isOpen ? <X size={24} /> : <Menu size={24} />}
				</button>
			</nav>

			{/* Mobile Menu */}
			{isOpen && (
				<ul
					className="md:hidden px-4 pb-4 space-y-3 text-gray-700 font-medium bg-white shadow"
					aria-label="Mobile navigation"
				>
					{navLinks.map((link) => (
						<li key={link}>
							<button
								type="button"
								onClick={() => {
									navigate({ to: getLinkPath(link) });
									setIsOpen(false);
								}}
								className="w-full text-left hover:text-purple-600 cursor-pointer"
								tabIndex={0}
							>
								{link}
							</button>
						</li>
					))}

					{user ? (
						<li>
							<button
								type="button"
								onClick={() => {
									handleLogout();
									setIsOpen(false);
								}}
								className="hover:text-red-500 cursor-pointer flex items-center gap-1 w-full text-left"
								role="menuitem"
								tabIndex={0}
							>
								<LogOut size={18} />
								Logout
							</button>
						</li>
					) : (
						<li>
							<button
								type="button"
								onClick={() => {
									handleLoginClick();
									setIsOpen(false);
								}}
								className="hover:text-purple-600 cursor-pointer w-full text-left"
								role="menuitem"
								tabIndex={0}
							>
								Login
							</button>
						</li>
					)}
				</ul>
			)}
		</header>
	);
};

export default Navbar;
