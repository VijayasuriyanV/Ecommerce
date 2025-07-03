import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../Pages/Cart/cartSlice";
import orderReducer from "../Pages/Orders/OrderSlice";
import { loadState, saveState } from "../utils/localStorage";

const cartFromStorage = loadState("cart");
const ordersFromStorage = loadState("orders");

const preloadedState = {
	cart: {
		items: Array.isArray(cartFromStorage) ? cartFromStorage : [],
	},
	order: {
		orders: Array.isArray(ordersFromStorage) ? ordersFromStorage : [],
	},
};

export const store = configureStore({
	reducer: {
		cart: cartReducer,
		order: orderReducer,
	},
	preloadedState,
});

store.subscribe(() => {
	const state = store.getState();
	saveState("cart", state.cart.items);
	saveState("orders", state.order.orders);
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
