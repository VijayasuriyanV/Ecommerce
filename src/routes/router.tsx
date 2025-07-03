import {
	createRouter,
	createRootRoute,
	createRoute,
	lazyRouteComponent,
} from "@tanstack/react-router";

import Layout from "./__root";
import Home from "../Pages/Home";
import { authGuard } from "../utils/AuthGuard";

const Signin = lazyRouteComponent(() => import("../Pages/Auth/Signin/Signin"));
const Signup = lazyRouteComponent(() => import("../Pages/Auth/Signup"));
const ProductList = lazyRouteComponent(
	() => import("../Pages/Products/ProductList"),
);
const ProductDetail = lazyRouteComponent(
	() => import("../Pages/Products/Card/ProductDetail"),
);
const Cart = lazyRouteComponent(() => import("../Pages/Cart/Cart"));
// const Checkout = lazyRouteComponent(() => import("../Pages/Checkout"));
const ErrorPage = lazyRouteComponent(
	() => import("../Pages/ErrorPage/ErrorPage"),
);
const About = lazyRouteComponent(() => import("../Pages/About"));
const Contact = lazyRouteComponent(() => import("../Pages/Contact/Contact"));
const Orders = lazyRouteComponent(() => import("../Pages/Orders/Orders"));
const Admin = lazyRouteComponent(() => import("../Pages/Admin/AdminDashboard"));
const ProductTable = lazyRouteComponent(
	() => import("../Pages/Admin/Product/ProductTable"),
);

const rootRoute = createRootRoute({
	component: Layout,
	notFoundComponent: ErrorPage,
});

const homeRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: "/",
	component: Home,
});

const productsRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: "products",
	component: ProductList,
});

export const productDetailRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: "products/$productId",

	component: ProductDetail,
});

const cartRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: "cart",
	beforeLoad: authGuard,
	component: Cart,
});

// const checkoutRoute = createRoute({
//   getParentRoute: () => rootRoute,
//   path: "checkout",
//   beforeLoad: authGuard,
//   component: Checkout,
// });

const aboutRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: "about",
	beforeLoad: authGuard,
	component: About,
});
const orderRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: "orders",
	beforeLoad: authGuard,
	component: Orders,
});

const signinRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: "signin",
	component: Signin,
});
const signupRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: "signup",
	component: Signup,
});

const contactRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: "contact",
	component: Contact,
});

const errorRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: "error",
	component: ErrorPage,
});
const adminRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: "admin",
	component: Admin,
});
const adminProductTableRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: "AdminProduct",
	component: ProductTable,
});

const routeTree = rootRoute.addChildren([
	homeRoute,
	cartRoute,
	aboutRoute,
	contactRoute,
	// checkoutRoute,
	signinRoute,
	signupRoute,
	orderRoute,
	productsRoute,
	productDetailRoute,
	errorRoute,
	adminRoute,
	adminProductTableRoute,
]);

export const router = createRouter({
	routeTree,
	defaultPreload: "intent",
	defaultPendingComponent: () => (
		<div className="h-screen flex justify-center items-center">
			<div className="h-10 w-10 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
		</div>
	),
	defaultErrorComponent: ({ error }) => <div>Error: {error.message}</div>,
});

// Router type registration for inference
declare module "@tanstack/react-router" {
	interface Register {
		router: typeof router;
	}
}
