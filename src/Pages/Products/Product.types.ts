export interface Product {
	id: number;
	title: string;
	description: string;
	category: string;
	price: number;
	discountPercentage: number;
	rating: number;
	stock: number;
	tags: string[];
	brand: string;
	sku: string;
	weight: number;
	dimensions: Dimensions;
	warrantyInformation: string;
	shippingInformation: string;
	availabilityStatus: "In Stock" | "Out of Stock" | string; // extendable
	reviews: Review[];
	returnPolicy: string;
	minimumOrderQuantity: number;
	meta: ProductMeta;
	images: string[];
	thumbnail: string;
}

export interface Dimensions {
	width: number;
	height: number;
	depth: number;
}

export interface Review {
	rating: number;
	comment: string;
	date: string | Date;
	reviewerName: string;
	reviewerEmail: string;
}

export interface ProductMeta {
	createdAt: string | Date;
	updatedAt: string | Date;
	barcode: string;
	qrCode: string;
}
