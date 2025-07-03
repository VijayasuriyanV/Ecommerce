interface PaginationProps {
	currentPage: number;
	totalPages: number;
	paginate: (pageNumber: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
	currentPage,
	totalPages,
	paginate,
}) => {
	// Page num with truncation
	const getPaginationNumbers = () => {
		const pageNumbers: (number | string)[] = [];
		// const maxPagesToShow = 7;
		const delta = 2; // Pages to show around the current page

		if (totalPages > 0) {
			pageNumbers.push(1);
		}

		for (let i = currentPage - delta; i <= currentPage + delta; i++) {
			if (i > 1 && i < totalPages) {
				pageNumbers.push(i);
			}
		}

		if (totalPages > 1) {
			pageNumbers.push(totalPages);
		}

		const uniquePages = [...new Set(pageNumbers)].sort(
			(a, b) => (a as number) - (b as number),
		);

		const finalPages: (number | string)[] = [];
		for (let i = 0; i < uniquePages.length; i++) {
			finalPages.push(uniquePages[i]);
			if (
				i < uniquePages.length - 1 &&
				(uniquePages[i + 1] as number) - (uniquePages[i] as number) > 1
			) {
				finalPages.push("...");
			}
		}

		return finalPages;
	};

	const paginationNumbers = getPaginationNumbers();

	if (totalPages <= 1) {
		return null;
	}

	return (
		<div className="flex justify-center mt-8">
			<nav className="flex items-center gap-1 flex-wrap justify-center">
				<button
					type="button"
					onClick={() => paginate(currentPage - 1)}
					disabled={currentPage === 1}
					className="px-3 py-1 rounded-md border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
				>
					Previous
				</button>

				{paginationNumbers.map((item, index) =>
					item === "..." ? (
						<span
							key={`ellipsis-${index + 1}`}
							className="px-3 py-1 text-gray-600"
						>
							...
						</span>
					) : (
						<button
							type="button"
							key={item}
							onClick={() => paginate(item as number)}
							className={`px-3 py-1 rounded-md border ${
								currentPage === item
									? "bg-purple-600 text-white border-purple-600"
									: "border-gray-300"
							}`}
						>
							{item}
						</button>
					),
				)}

				<button
					type="button"
					onClick={() => paginate(currentPage + 1)}
					disabled={currentPage === totalPages}
					className="px-3 py-1 rounded-md border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
				>
					Next
				</button>
			</nav>
		</div>
	);
};

export default Pagination;
