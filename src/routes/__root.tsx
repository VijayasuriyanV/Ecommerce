import { Outlet, useRouterState } from "@tanstack/react-router";
import Navbar from "../Components/Common/Navbar";
import Footer from "../Components/Common/Footer";

const Layout = () => {
	const location = useRouterState({ select: (s) => s.location });

	// Define routes where Navbar should be hidden
	const hideNavbarPaths = ["/signin", "/signup"];

	// Check if current pathname matches one of the hidden paths
	const shouldHideNavbar = hideNavbarPaths.includes(location.pathname);

	return (
		<div className="flex flex-col min-h-screen">
			{!shouldHideNavbar && <Navbar />}
			<main className="flex-grow overflow-hidden">
				<Outlet />
			</main>
			<Footer />
		</div>
	);
};

export default Layout;
