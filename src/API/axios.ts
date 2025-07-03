import axios from "axios";

const api = axios.create({
	baseURL: import.meta.env.VITE_PRODUCTS_API,
	timeout: 5000,
	headers: { "Cache-Control": "public, max-age=300" },
});

export default api;
