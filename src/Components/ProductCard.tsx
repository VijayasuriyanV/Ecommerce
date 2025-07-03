import { Link } from "@tanstack/react-router";
import { productDetailRoute } from "../routes/router";
import type { Product } from "../Pages/Products/Product.types";

type Props = {
	product: Product;
	showBuyNow?: boolean;
};

const ProductCard: React.FC<Props> = ({ product, showBuyNow = true }) => {
	return (
		<Link
			to={productDetailRoute.to}
			params={{ productId: product.id.toString() }}
			className="block"
		>
			<div className="bg-white rounded-xl shadow-sm  hover:shadow-black transition-shadow duration-200 overflow-hidden">
				<img
					src={product.thumbnail}
					alt={product.title}
					className="h-48 w-full object-contain"
				/>
				<div className="p-4">
					<h3 className="text-lg font-semibold text-gray-800">
						{product.title}
					</h3>
					<p className="text-sm text-gray-500">{product.brand}</p>
					<p className="mt-2 text-purple-600 font-bold">${product.price}</p>
					<div className="flex justify-between mt-2 text-sm text-gray-600">
						<span>⭐ {product.rating}</span>
						<span className="capitalize">{product.category}</span>
					</div>
					<p className="mt-2 text-sm text-gray-700 line-clamp-2">
						{product.description}
					</p>
					{showBuyNow && (
						<button
							type="button"
							className="mt-4 bg-amber-500 text-white px-4 py-2 text-sm rounded hover:bg-amber-600 transition"
						>
							Buy Now
						</button>
					)}
				</div>
			</div>
		</Link>
	);
};

export default ProductCard;
