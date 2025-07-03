import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { loadState, saveState } from "../../utils/localStorage";

type CartItem = {
	id: number;
	title: string;
	price: number;
	thumbnail: string;
	quantity: number;
};

interface CartState {
	items: CartItem[];
}

const initialState: CartState = {
	items: loadState<CartItem[]>("cart") || [],
};

const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		addToCart: (state, action: PayloadAction<CartItem>) => {
			const index = state.items.findIndex(
				(item) => item.id === action.payload.id,
			);
			if (index >= 0) {
				state.items[index].quantity = action.payload.quantity;
			} else {
				state.items.push(action.payload);
			}
			saveState("cart", state.items);
		},
		removeFromCart: (state, action: PayloadAction<number>) => {
			state.items = state.items.filter((item) => item.id !== action.payload);
			saveState("cart", state.items);
		},
		clearCart: (state) => {
			state.items = [];
			saveState("cart", state.items);
		},
	},
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
