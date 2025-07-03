import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Order, OrdersState } from "./Order.types";

const initialState: OrdersState = {
	orders: [
		{
			id: "ORD100001",
			date: new Date(Date.now() - 86400000 * 3).toISOString(),
			items: [
				{
					id: 1,
					title: "Mock Product 1",
					price: 20,
					quantity: 2,
					thumbnail: "https://via.placeholder.com/64",
				},
			],
			total: 40,
			status: "Completed",
		},
		{
			id: "ORD100002",
			date: new Date(Date.now() - 86400000 * 1).toISOString(),
			items: [
				{
					id: 2,
					title: "Mock Product 2",
					price: 50,
					quantity: 1,
					thumbnail: "https://via.placeholder.com/64",
				},
			],
			total: 50,
			status: "Pending",
		},
	],
};

const ordersSlice = createSlice({
	name: "orders",
	initialState,
	reducers: {
		addOrder: (
			state,
			action: PayloadAction<Omit<Order, "id" | "date" | "status">>,
		) => {
			const newOrder: Order = {
				...action.payload,
				id: `"ORD"  ${Math.floor(100000 + Math.random() * 900000)}`, // random 6-digit id
				date: new Date().toISOString(),
				status: "Pending",
			};
			state.orders.unshift(newOrder);
		},
	},
});

export const { addOrder } = ordersSlice.actions;

export default ordersSlice.reducer;
