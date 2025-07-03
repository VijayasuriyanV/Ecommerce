// src/api/products.ts
import axios from "axios";
import type { Product } from "../Pages/Products/Product.types";

export const fetchProducts = async (): Promise<Product[]> => {
	const res = await axios.get(import.meta.env.VITE_PRODUCTS_API);
	return res.data;
};
export const fetchProductById = async (productId: string): Promise<Product> => {
	const res = await axios.get(
		`${import.meta.env.VITE_PRODUCTS_API}/${productId}`,
	);
	return res.data;
};
