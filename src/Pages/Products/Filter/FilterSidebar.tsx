type FilterSidebarProps = {
	categories: string[];
	selectedCategories: string[];
	onCategoryChange: (category: string) => void;
	priceRange: [number, number];
	onPriceRangeChange: (range: [number, number]) => void;
	sortOption: string;
	onSortChange: (sort: string) => void;
};

const FilterSidebar: React.FC<FilterSidebarProps> = ({
	categories,
	selectedCategories,
	onCategoryChange,
	priceRange,
	onPriceRangeChange,
	sortOption,
	onSortChange,
}) => {
	return (
		<aside className="w-64 p-4 bg-orange-50 rounded-xl shadow-md mb-4 mr-6">
			<div className="mb-4">
				<h4 className="font-semibold text-lg text-purple-600 mb-2">Sort By</h4>
				<select
					value={sortOption}
					onChange={(e) => onSortChange(e.target.value)}
					className="w-full px-3 py-2 border rounded-md"
				>
					<option value="">None</option>
					<option value="priceLowToHigh">Price: Low to High</option>
					<option value="priceHighToLow">Price: High to Low</option>
					<option value="rating">Rating</option>
				</select>
			</div>
			<h3 className="text-lg text-purple-600 font-semibold mb-2">Filter By</h3>

			<div className="mb-6 pl-2">
				<h4 className="font-medium mb-2">Category</h4>
				{categories.map((category) => {
					const inputId = `category-${category}`;
					return (
						<div key={category} className="flex items-center mb-2 pl-2">
							<input
								type="checkbox"
								id={inputId}
								className="mr-2"
								checked={selectedCategories.includes(category)}
								onChange={() => onCategoryChange(category)}
							/>
							<label htmlFor={inputId} className="capitalize text-gray-700">
								{category}
							</label>
						</div>
					);
				})}
			</div>

			<div className="mb-6 pl-2">
				<h4 className="font-medium mb-2">Price Range</h4>
				<div className="flex items-center space-x-2 pl-2">
					<input
						type="number"
						value={priceRange[0]}
						onChange={(e) =>
							onPriceRangeChange([Number(e.target.value), priceRange[1]])
						}
						className="w-16 px-2 py-1 border rounded"
					/>
					<span>-</span>
					<input
						type="number"
						value={priceRange[1]}
						onChange={(e) =>
							onPriceRangeChange([priceRange[0], Number(e.target.value)])
						}
						className="w-16 px-2 py-1 border rounded"
					/>
				</div>
			</div>
		</aside>
	);
};

export default FilterSidebar;
