import { ShoppingCart, Truck, ShieldCheck } from "lucide-react";
import { Heading, SubHeading } from "../Constants/Home.const";
import { useNavigate } from "@tanstack/react-router";
import ProductCard from "../Components/ProductCard";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "../API/Products";

const Home = () => {
	const navigate = useNavigate();
	const {
		data: products = [],
		isLoading,
		isError,
	} = useQuery({
		queryKey: ["products", "home"],
		queryFn: fetchProducts,
	});
	return (
		<main className="min-h-screen bg-gray-50 text-gray-800">
			{/* Hero Section */}
			<section className="bg-gradient-to-br from-purple-600 to-indigo-700 text-white py-20 px-4 text-center">
				<h1 className="text-4xl md:text-5xl font-bold">{Heading}</h1>
				<p className="mt-4 text-lg">{SubHeading}</p>
				<button
					type="button"
					className="mt-8 px-6 py-3 bg-white text-indigo-700 rounded-full font-semibold hover:bg-gray-100 transition"
					onClick={() => navigate({ to: "/products" })}
				>
					Shop Now
				</button>
			</section>

			{/* Features */}
			<section className="grid md:grid-cols-3 gap-6 py-12 px-6 bg-white text-center">
				<div>
					<Truck className="mx-auto mb-4 h-10 w-10 text-green-600" />
					<h4 className="font-bold mb-2">Fast Delivery</h4>
					<p className="text-sm text-gray-600">
						Quick and safe delivery at your doorstep.
					</p>
				</div>
				<div>
					<ShieldCheck className="mx-auto mb-4 h-10 w-10 text-blue-600" />
					<h4 className="font-bold mb-2">Secure Payment</h4>
					<p className="text-sm text-gray-600">
						Multiple secure payment options available.
					</p>
				</div>
				<div>
					<ShoppingCart className="mx-auto mb-4 h-10 w-10 text-amber-500" />
					<h4 className="font-bold mb-2">Easy Checkout</h4>
					<p className="text-sm text-gray-600">
						Fast & seamless checkout experience.
					</p>
				</div>
			</section>

			{/* Featured Products */}

			<section className="py-16 px-6 bg-amber-50">
				<h2 className="text-2xl font-bold text-center mb-10 text-gray-800">
					Featured Products
				</h2>

				{isLoading ? (
					<p className="text-center text-gray-500">Loading...</p>
				) : isError ? (
					<p className="text-center text-red-500">Failed to load products.</p>
				) : (
					<div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
						{products.slice(0, 3).map((product) => (
							<ProductCard key={product.id} product={product} />
						))}
					</div>
				)}
			</section>
		</main>
	);
};

export default Home;
