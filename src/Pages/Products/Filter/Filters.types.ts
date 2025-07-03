export type FilterOption = {
	label: string;
	value: string | number;
};

export type FilterSection = {
	id: string;
	title: string;
	type: "checkbox" | "radio" | "range";
	options?: FilterOption[];
	range?: { min: number; max: number };
};
