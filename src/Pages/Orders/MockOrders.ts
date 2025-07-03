import type { Order } from "./Order.types";

export const mockOrders: Order[] = [
	{
		id: "ORD123",
		date: new Date().toISOString(),
		status: "Pending",
		total: 199.99,
		items: [
			{
				id: 101,
				title: "Mock Product A",
				price: 99.99,
				quantity: 1,
				thumbnail: "http://localhost:5000/api/images/186_629.webp",
			},
			{
				id: 102,
				title: "Mock Product B",
				price: 49.99,
				quantity: 2,
				thumbnail: "http://localhost:5000/api/images/188_639.webp",
			},
		],
	},
	{
		id: "ORD124",
		date: new Date().toISOString(),
		status: "Pending",
		total: 29.99,
		items: [
			{
				id: 103,
				title: "Mock Product C",
				price: 29.99,
				quantity: 1,
				thumbnail: "http://localhost:5000/api/images/189_647.webp",
			},
		],
	},
];
