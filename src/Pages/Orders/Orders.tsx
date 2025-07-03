import { useEffect, useState } from "react";
import { loadState } from "../../utils/localStorage";
import { colors } from "../../Constants/colors";
import { mockOrders } from "./MockOrders";
import type { Order } from "./Order.types";

const Orders = () => {
	const [orders, setOrders] = useState<Order[]>([]);

	useEffect(() => {
		const savedOrders = loadState<Order[]>("orders");
		setOrders(savedOrders && savedOrders.length > 0 ? savedOrders : mockOrders);
	}, []);

	if (orders.length === 0) {
		return (
			<div className="text-center p-8 text-gray-500 text-xl">
				No orders yet. Place your first order!
			</div>
		);
	}

	return (
		<div className="max-w-5xl mx-auto px-4 py-10">
			<h2 className={`text-4xl font-bold mb-8 ${colors.baseText}`}>
				🧾 Your Orders
			</h2>
			<div className="space-y-10">
				{orders.map((order) => (
					<div
						key={order.id}
						className="bg-white shadow-md rounded-2xl p-6 border border-gray-200"
					>
						<h3 className="text-xl font-semibold text-purple-600 mb-4">
							Order #{order.id} -{" "}
							<span className="text-sm font-normal">
								{new Date(order.date).toLocaleDateString("en-GB", {
									day: "2-digit",
									month: "2-digit",
									year: "numeric",
								})}
							</span>
						</h3>
						<ul className="divide-y divide-gray-100">
							{order.items.map((item) => (
								<li key={item.id} className="flex items-center py-4 space-x-4">
									<img
										src={item.thumbnail}
										alt={item.title}
										className="w-20 h-20 object-contain rounded border"
									/>
									<div className="flex-1">
										<h4 className="font-semibold text-lg">{item.title}</h4>
										<p className="text-gray-600">
											${item.price.toFixed(2)} × {item.quantity}
										</p>
									</div>
									<div className="text-right font-semibold text-gray-700">
										${(item.price * item.quantity).toFixed(2)}
									</div>
								</li>
							))}
						</ul>
						<div className="text-right font-bold mt-4">
							Total: ${order.total.toFixed(2)}
						</div>
						<div className="text-right text-sm text-gray-500 mt-1">
							Status: {order.status}
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default Orders;
