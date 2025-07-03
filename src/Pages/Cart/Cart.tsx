import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../../store/store";
import { removeFromCart, addToCart, clearCart } from "./cartSlice"; // add clearCart in your cartSlice
import { addOrder } from "../Orders/OrderSlice";
import { colors } from "../../Constants/colors";
import { toast } from "react-toastify";
import { loadState, saveState } from "../../utils/localStorage";
import type { OrderItem } from "../Orders/Order.types";

const Cart = () => {
	const dispatch = useDispatch<AppDispatch>();
	const cartItems = useSelector((state: RootState) => state.cart.items);

	const handleRemove = (id: number) => {
		dispatch(removeFromCart(id));
	};

	const handleQuantityChange = (id: number, quantity: number) => {
		// Invalid qnty
		if (quantity < 1) return;
		dispatch(
			addToCart({
				id,
				title: "",
				price: 0,
				thumbnail: "",
				quantity,
			}),
		);
	};

	const totalPrice = cartItems.reduce(
		(sum, item) => sum + item.price * item.quantity,
		0,
	);

	const handleCheckout = () => {
		const existingOrders = loadState<OrderItem[][]>("orders") || [];
		saveState("orders", [...existingOrders, cartItems]);
		dispatch(clearCart());
		toast.success("Order placed successfully!");
		if (cartItems.length === 0) {
			toast.error("Your cart is empty!");
			return;
		}

		dispatch(
			addOrder({
				items: cartItems,
				total: totalPrice,
			}),
		);

		dispatch(clearCart());
	};

	if (cartItems.length === 0) {
		return (
			<div className={`p-12 text-center ${colors.secondaryText}`}>
				<h2 className="text-3xl font-semibold mb-6">Your Cart is Empty</h2>
				<p className="text-lg">
					Add some products to your cart to see them here.
				</p>
			</div>
		);
	}

	return (
		<div className="max-w-4xl mx-auto p-8 bg-white rounded-2xl shadow-lg border border-gray-200 m-10">
			<h2 className={`text-4xl font-extrabold mb-8 ${colors.baseText}`}>
				Shopping Cart
			</h2>
			<ul className="space-y-8">
				{cartItems.map(({ id, title, price, quantity, thumbnail }) => (
					<li
						key={id}
						className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6 border-b border-gray-200 pb-6 last:border-b-0"
					>
						<img
							src={thumbnail}
							alt={title}
							className="w-28 h-28 sm:w-24 sm:h-24 object-contain rounded-lg border border-gray-300"
							loading="lazy"
						/>
						<div className="flex-1 text-center sm:text-left">
							<h3
								className={`font-semibold text-xl ${colors.baseText} truncate`}
							>
								{title}
							</h3>
							<p className={`text-md mt-1 ${colors.secondaryText}`}>
								${price.toFixed(2)}
							</p>
							<div className="mt-3 flex justify-center sm:justify-start items-center space-x-3">
								<label htmlFor={`qty-${id}`} className="text-sm font-medium">
									Qty:
								</label>
								<input
									id={`qty-${id}`}
									type="number"
									min={1}
									value={quantity}
									onChange={(e) =>
										handleQuantityChange(id, parseInt(e.target.value) || 1)
									}
									className="w-20 rounded border border-gray-300 px-3 py-2 text-center text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
								/>
							</div>
						</div>
						<button
							type="button"
							onClick={() => handleRemove(id)}
							className="text-red-600 hover:text-red-800 font-semibold transition-colors mt-2 sm:mt-0"
							aria-label={`Remove ${title} from cart`}
						>
							Remove
						</button>
					</li>
				))}
			</ul>

			<div className="mt-10 flex flex-col sm:flex-row justify-between items-center gap-4">
				<span className={`text-2xl font-bold ${colors.baseText}`}>
					Total: ${totalPrice.toFixed(2)}
				</span>
				<button
					type="button"
					className="px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition-shadow shadow-md"
					onClick={handleCheckout}
				>
					Checkout
				</button>
			</div>
		</div>
	);
};

export default Cart;
