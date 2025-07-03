import { useEffect, useId, useState } from "react";
import { useNavigate, useParams } from "@tanstack/react-router";
import { productDetailRoute } from "../../../routes/router";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../../store/store";
import { addToCart } from "../../Cart/cartSlice";
import { useQuery } from "@tanstack/react-query";
import { fetchProductById } from "../../../API/Products";

const ProductDetail = () => {
	const { productId } = useParams({ from: productDetailRoute.id });
	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>();
	const [quantity, setQuantity] = useState(1);
	const [selectedImage, setSelectedImage] = useState<string | null>(null);
	const quantityInputId = useId();

	const {
		data: product,
		isLoading,
		isError,
	} = useQuery({
		queryKey: ["product", productId],
		queryFn: () => fetchProductById(productId),
		retry: false,
		staleTime: 1000 * 60 * 5,
	});

	useEffect(() => {
		if (isError) {
			navigate({ to: "/error" });
		}
	}, [isError, navigate]);

	useEffect(() => {
		if (product) {
			setSelectedImage(product.thumbnail);
		}
	}, [product]);

	const handleAddToCart = () => {
		if (!product) return;
		dispatch(
			addToCart({
				id: product.id,
				title: product.title,
				price: product.price,
				thumbnail: product.thumbnail,
				quantity,
			}),
		);
		alert(`${quantity} ${product.title} added to cart!`);
	};

	if (isLoading) {
		return (
			<div className="h-screen flex justify-center items-center">
				<div className="h-10 w-10 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
			</div>
		);
	}

	if (isError || !product) {
		return (
			<div className="text-center py-20">
				<h2 className="text-xl font-semibold text-gray-600 mb-4">
					Product Not Found
				</h2>
				<button
					type="button"
					onClick={() => navigate({ to: "/products" })}
					className="text-purple-600 underline hover:text-purple-800"
				>
					← Back to Products
				</button>
			</div>
		);
	}

	return (
		<div className="max-w-6xl mx-auto px-4 py-6">
			<button
				type="button"
				onClick={() => navigate({ to: "/products" })}
				className="text-sm text-purple-600 hover:underline mb-4"
			>
				← Back to Products
			</button>

			<div className="grid md:grid-cols-2 gap-10 bg-white p-6 shadow-lg rounded-2xl">
				{/* Image Section */}
				<div>
					<div className="aspect-square rounded-xl overflow-hidden bg-gray-100 mb-4">
						<img
							src={selectedImage || product.thumbnail}
							alt={product.title}
							className="w-full h-full object-contain transition-transform hover:scale-105"
						/>
					</div>
					<div className="flex gap-2 overflow-x-auto pb-2">
						{[product.thumbnail, ...product.images].map((img) => (
							<button
								type="button"
								key={img}
								onClick={() => setSelectedImage(img)}
								className={`w-16 h-16 rounded-lg border ${
									selectedImage === img
										? "border-purple-500"
										: "border-gray-300 hover:border-purple-300"
								}`}
							>
								<img
									src={img}
									alt="Thumbnail"
									className="object-cover w-full h-full"
								/>
							</button>
						))}
					</div>
				</div>

				{/* Details Section */}
				<div className="flex flex-col justify-between">
					<div>
						<h1 className="text-2xl font-bold text-gray-800">
							{product.title}
						</h1>
						<p className="text-sm uppercase text-purple-600 font-semibold mt-1 mb-2">
							{product.brand}
						</p>
						<p className="text-sm text-gray-500 mb-4">SKU: {product.sku}</p>

						<div className="mb-4 flex flex-wrap gap-2">
							{product.tags.map((tag: string) => (
								<span
									key={tag}
									className="bg-purple-100 text-purple-700 px-2 py-1 text-xs rounded-full"
								>
									{tag}
								</span>
							))}
						</div>

						<p className="text-gray-700 mb-2">{product.description}</p>

						<div className="mt-2 border-t pt-4 text-sm text-gray-500 space-y-0">
							<h3 className="font-medium text-gray-700 text-base mb-2">
								Product Details
							</h3>
							<p>
								<span className="font-medium">Weight:</span> {product.weight}g
							</p>
							<p>
								<span className="font-medium">Dimensions:</span>{" "}
								{product.dimensions.width}×{product.dimensions.height}×
								{product.dimensions.depth} mm
							</p>
							<p>
								<span className="font-medium">Warranty:</span>{" "}
								{product.warrantyInformation}
							</p>
							<p>
								<span className="font-medium">Shipping:</span>{" "}
								{product.shippingInformation}
							</p>
							<p>
								<span className="font-medium">Return Policy:</span>{" "}
								{product.returnPolicy}
							</p>
							<p>
								<span className="font-medium">Min Order:</span>{" "}
								{product.minimumOrderQuantity}
							</p>
						</div>
					</div>

					<div className="border-t pt-4">
						<div className="flex items-center justify-between mb-4">
							<div>
								<span className="text-2xl font-bold text-purple-700">
									${product.price.toFixed(2)}
								</span>
								{product.discountPercentage > 0 && (
									<span className="text-red-400 line-through ml-2 text-lg">
										$
										{(
											product.price /
											(1 - product.discountPercentage / 100)
										).toFixed(2)}
									</span>
								)}
							</div>

							<span
								className={`text-xs px-3 py-1 rounded-full ${
									product.availabilityStatus.toLowerCase() === "in stock"
										? "bg-green-100 text-green-700"
										: "bg-red-100 text-red-700"
								}`}
							>
								{product.availabilityStatus}
							</span>
						</div>

						<div className="mb-4">
							<label
								htmlFor={quantityInputId}
								className="block text-sm font-medium mb-1"
							>
								Quantity
							</label>
							<input
								id={quantityInputId}
								type="number"
								min={1}
								value={quantity}
								onChange={(e) =>
									setQuantity(Math.max(1, parseInt(e.target.value)))
								}
								className="w-20 px-3 py-1 border border-gray-300 rounded text-center"
							/>
						</div>

						<button
							type="button"
							onClick={handleAddToCart}
							className="w-full py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition"
						>
							Add to Cart
						</button>

						<div className="text-xs text-gray-400 mt-3 text-right">
							<p>Barcode: {product.meta.barcode}</p>
							<p>
								Created: {new Date(product.meta.createdAt).toLocaleDateString()}
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProductDetail;
