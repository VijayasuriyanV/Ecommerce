// export type OrderItem = {
//   id: number;
//   title: string;
//   price: number;
//   quantity: number;
//   thumbnail: string;
// };

// export type Order = {
//   id: string;
//   items: OrderItem[];
//   total: number;
//   date: string;
//   status: string;
// };

export type OrderItem = {
	id: number;
	title: string;
	price: number;
	quantity: number;
	thumbnail: string;
};

export type Order = {
	id: string;
	date: string;
	items: OrderItem[];
	total: number;
	status: "Pending" | "Completed";
};

export interface OrdersState {
	orders: Order[];
}
