import {useEffect, useMemo, useState} from "react";
import FilterSidebar from "./Filter/FilterSidebar";
import Pagination from "./Pagination";

import {useQuery} from "@tanstack/react-query";
import {fetchProducts} from "../../API/Products";
import type {Product} from "./Product.types";
import ProductCard from "../../Components/ProductCard";

const ProductList = () => {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState<string>("");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(9);

  const {
    data: products = [],
    isLoading,
    isError,
    error,
  } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  // 🧠 Get unique categories
  const categories = useMemo(() => {
    const unique = new Set(products.map((p) => p.category));
    return Array.from(unique);
  }, [products]);

  useEffect(() => {
    let filtered = [...products];

    if (selectedCategories.length > 0) {
      filtered = filtered.filter((p) => selectedCategories.includes(p.category));
    }

    filtered = filtered.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1]);

    if (sortOption === "priceLowToHigh") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortOption === "priceHighToLow") {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortOption === "rating") {
      filtered.sort((a, b) => b.rating - a.rating);
    }

    // ✅ Only update if the new filtered list is different
    setFilteredProducts((prev) => {
      const sameLength = prev.length === filtered.length;
      const sameItems = prev.every((item, index) => item.id === filtered[index]?.id);
      if (sameLength && sameItems) return prev;
      return filtered;
    });
  }, [products, selectedCategories, sortOption, priceRange]);

  // ✅ Reset page only when filters actually change
  useEffect(() => {
    if (currentPage !== 1) {
      setCurrentPage(1);
    }
  }, [selectedCategories, sortOption, priceRange]);

  // 🧮 Pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const paginate = (pageNumber: number) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
      window.scrollTo({top: 0, behavior: "smooth"});
    }
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
  };

  const handleResetFilters = () => {
    setSelectedCategories([]);
    setSortOption("");
    setPriceRange([0, 100]);
    setCurrentPage(1);
    setIsSidebarOpen(false);
  };

  // 🧾 Handle loading/error
  if (isLoading) return <div className="text-center py-10">Loading...</div>;
  if (isError)
    return <div className="text-center text-red-600 py-10">Error: {(error as Error).message}</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-amber-100 to-yellow-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Product List</h2>

        {/* Top Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4 sm:gap-0">
          <p className="text-gray-600 text-center sm:text-left">
            Showing {indexOfFirstProduct + 1}-
            {Math.min(indexOfLastProduct, filteredProducts.length)} of {filteredProducts.length}{" "}
            products
          </p>
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition md:hidden">
              {isSidebarOpen ? "Close Filters" : "Open Filters"}
            </button>
            <button
              type="button"
              onClick={handleResetFilters}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition">
              Reset Filters
            </button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-start">
          {/* Sidebar */}
          <div
            className={`md:block w-full md:w-64 flex-shrink-0 mb-6 md:mb-0 md:mr-6 transition-all duration-300 ${
              isSidebarOpen ? "block" : "hidden"
            }`}>
            <FilterSidebar
              categories={categories}
              selectedCategories={selectedCategories}
              onCategoryChange={handleCategoryChange}
              priceRange={priceRange}
              onPriceRangeChange={setPriceRange}
              sortOption={sortOption}
              onSortChange={setSortOption}
            />
          </div>

          {/* Grid */}
          <div className="flex-grow w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            <Pagination currentPage={currentPage} totalPages={totalPages} paginate={paginate} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
