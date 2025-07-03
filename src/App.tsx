import "./App.css";
import { RouterProvider } from "@tanstack/react-router";
import { router } from "./routes/router";
import { AuthProvider } from "./Pages/Auth/AuthContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();
function App() {
	return (
		<>
			<Provider store={store}>
				<QueryClientProvider client={queryClient}>
					<AuthProvider>
						<RouterProvider router={router} />
						<TanStackRouterDevtools router={router} />
						<ToastContainer
							position="top-right"
							autoClose={1000}
							closeOnClick
							draggable
							theme="colored"
							pauseOnHover
						/>
					</AuthProvider>
					<ReactQueryDevtools initialIsOpen={false} />
				</QueryClientProvider>
			</Provider>
		</>
	);
}

export default App;
