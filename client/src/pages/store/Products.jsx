import { useLocation, useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getFilteredProducts } from "../../services/productService";
import { FiShoppingCart, FiSliders } from "react-icons/fi";
import { Dialog } from "@headlessui/react";
import { addToCart } from "../../services/cartService";

const Products = () => {
	const location = useLocation();
	const navigate = useNavigate();

	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [filtersOpen, setFiltersOpen] = useState(false);

	const queryParams = new URLSearchParams(location.search);
	const category = queryParams.get("category") || "";
	const brand = queryParams.get("brand") || "";
	const condition = queryParams.get("condition") || "";
	const sortBy = queryParams.get("sortBy") || "";
	const pageParam = parseInt(queryParams.get("page")) || 1;

	const [selectedBrand, setSelectedBrand] = useState(brand);
	const [selectedCondition, setSelectedCondition] = useState(condition);
	const [selectedSort, setSelectedSort] = useState(sortBy);
	const [page, setPage] = useState(pageParam);
	const [totalPages, setTotalPages] = useState(1);

	const [isAdding, setIsAdding] = useState(false);
	const [message, setMessage] = useState(null);

	useEffect(() => {
		const fetchProducts = async () => {
			setLoading(true);
			try {
				const response = await getFilteredProducts({
					category,
					brand: selectedBrand,
					condition: selectedCondition,
					sortBy: selectedSort,
					page,
					limit: 12,
				});

				setProducts(Array.isArray(response.data) ? response.data : []);
				setTotalPages(response.totalPages || 1);
			} catch (error) {
				console.error("Error loading products:", error);
				setProducts([]);
			} finally {
				setLoading(false);
			}
		};

		fetchProducts();
	}, [category, selectedBrand, selectedCondition, selectedSort, page]);

	const updateQueryParams = () => {
		const params = new URLSearchParams();

		if (category) params.set("category", category);
		if (selectedBrand) params.set("brand", selectedBrand);
		if (selectedCondition) params.set("condition", selectedCondition);
		if (selectedSort) params.set("sortBy", selectedSort);
		if (page !== 1) params.set("page", page);

		navigate(`/products?${params.toString()}`);
	};

	useEffect(() => {
		updateQueryParams();
	}, [selectedBrand, selectedCondition, selectedSort, page]);

	const brandOptions = ["Samsung", "Apple", "Infinix", "Tecno", "Xiaomi"];
	const conditionOptions = ["New", "Used", "Refurbished"];
	const sortOptions = [
		{ label: "Newest", value: "newest" },
		{ label: "Price: Low to High", value: "price-asc" },
		{ label: "Price: High to Low", value: "price-desc" },
	];

	// Mobile Filter UI
	const mobileFilters = (
		<Dialog open={filtersOpen} onClose={() => setFiltersOpen(false)} className="relative z-50">
			<div className="fixed inset-0 bg-black/30" aria-hidden="true" />
			<div className="fixed inset-0 flex items-center justify-center p-4">
				<Dialog.Panel className="bg-white w-full max-w-sm rounded p-4 space-y-4">
					<Dialog.Title className="text-lg font-semibold mb-2">Filters</Dialog.Title>

					<div>
						<p className="text-sm font-medium mb-1">Shop by Brand:</p>
						<div className="space-y-1 text-sm text-gray-700">
							{brandOptions.map((b) => (
								<div key={b} className="cursor-pointer" onClick={() => {
									setSelectedBrand(b);
									setPage(1);
									setFiltersOpen(false);
								}}>
									{b}
								</div>
							))}
							<div onClick={() => { setSelectedBrand(""); setPage(1); setFiltersOpen(false); }} className="text-blue-500 mt-1 cursor-pointer">Clear</div>
						</div>
					</div>

					<div>
						<p className="text-sm font-medium mb-1">Condition:</p>
						<div className="space-y-1 text-sm text-gray-700">
							{conditionOptions.map((c) => (
								<div key={c} className="cursor-pointer" onClick={() => {
									setSelectedCondition(c);
									setPage(1);
									setFiltersOpen(false);
								}}>
									{c}
								</div>
							))}
							<div onClick={() => { setSelectedCondition(""); setPage(1); setFiltersOpen(false); }} className="text-blue-500 mt-1 cursor-pointer">Clear</div>
						</div>
					</div>

					<div>
						<p className="text-sm font-medium mb-1">Sort By:</p>
						<div className="space-y-1 text-sm text-gray-700">
							{sortOptions.map((opt) => (
								<div key={opt.value} className="cursor-pointer" onClick={() => {
									setSelectedSort(opt.value);
									setPage(1);
									setFiltersOpen(false);
								}}>
									{opt.label}
								</div>
							))}
						</div>
					</div>
				</Dialog.Panel>
			</div>
		</Dialog>
	);

	return (
		<div className="px-4 md:px-8 py-6">
			{/* 🔷 Banner */}
			<div className="bg-blue-100 text-blue-800 px-6 py-4 rounded mb-6">
				<h1 className="text-2xl font-bold capitalize">
					{category ? `${category} Collection` : "All Products"}
				</h1>
				<p className="text-sm mt-1">Browse latest deals in {category || "all categories"}.</p>
			</div>

			{/* 🔘 Mobile Filter Toggle */}
			<div className="md:hidden flex justify-between items-center mb-4">
				<button
					onClick={() => setFiltersOpen(true)}
					className="flex items-center space-x-1 text-blue-600 text-sm"
				>
					<FiSliders />
					<span>Sort & Filter</span>
				</button>
			</div>

			{/* 🖥️ Desktop Filters + Grid */}
			<div className="flex flex-col md:flex-row gap-6">
				{/* Sidebar */}
				<aside className="hidden md:block md:w-1/4 space-y-6">
					<div>
						<label className="block mb-2 text-sm font-medium">Brand</label>
						<select
							value={selectedBrand}
							onChange={(e) => {
								setSelectedBrand(e.target.value);
								setPage(1);
							}}
							className="w-full border px-3 py-2 rounded text-sm"
						>
							<option value="">All</option>
							{brandOptions.map((b) => (
								<option key={b} value={b}>{b}</option>
							))}
						</select>
					</div>

					<div>
						<label className="block mb-2 text-sm font-medium">Condition</label>
						<select
							value={selectedCondition}
							onChange={(e) => {
								setSelectedCondition(e.target.value);
								setPage(1);
							}}
							className="w-full border px-3 py-2 rounded text-sm"
						>
							<option value="">All</option>
							{conditionOptions.map((c) => (
								<option key={c} value={c}>{c}</option>
							))}
						</select>
					</div>

					<div>
						<label className="block mb-2 text-sm font-medium">Sort By</label>
						<select
							value={selectedSort}
							onChange={(e) => {
								setSelectedSort(e.target.value);
								setPage(1);
							}}
							className="w-full border px-3 py-2 rounded text-sm"
						>
							<option value="">Default</option>
							{sortOptions.map((opt) => (
								<option key={opt.value} value={opt.value}>
									{opt.label}
								</option>
							))}
						</select>
					</div>
				</aside>

				{/* Grid */}
				<div className="flex-1">
					{loading ? (
						<p>Loading...</p>
					) : products.length === 0 ? (
						<p>No products found.</p>
					) : (
						<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
							{products.map((product) => {
								const handleAddToCart = async () => {
									try {
										setIsAdding(true);
										await addToCart(product._id, 1);
										setMessage(`✅ ${product.name} added to cart`);
									} catch (err) {
										console.error(err);
										setMessage(`❌ Failed to add ${product.name}`);
									} finally {
										setIsAdding(false);
										setTimeout(() => setMessage(null), 3000);
									}
								};

								return (
									<div
										key={product._id}
										className="relative group border rounded-md p-3 shadow hover:shadow-md transition bg-white"
									>
										<Link to={`/product/${product._id}`}>
											<img
												src={product.image}
												alt={product.name}
												className="w-full h-40 object-cover mb-2 rounded"
											/>
											<h2 className="font-semibold text-sm mb-1 truncate">{product.name}</h2>
											<p className="text-gray-600 text-xs mb-1">{product.brand}</p>
											<p className="text-xs text-gray-500 mb-1">{product.condition}</p>
											<p className="font-bold text-blue-600">${product.price}</p>
										</Link>

										<button
											onClick={handleAddToCart}
											disabled={isAdding}
											className="absolute top-2 right-2 bg-blue-600 text-white p-1 rounded-full hover:bg-blue-700 opacity-0 group-hover:opacity-100 transition md:opacity-0 sm:opacity-100"
											title="Add to cart"
										>
											<FiShoppingCart size={16} />
										</button>
									</div>
								);
							})}
						</div>
					)}

					{/* Pagination */}
					{totalPages > 1 && (
						<div className="flex justify-center mt-8 space-x-2">
							{Array.from({ length: totalPages }, (_, i) => (
								<button
									key={i}
									onClick={() => setPage(i + 1)}
									className={`px-3 py-1 border rounded ${
										page === i + 1
											? "bg-blue-600 text-white"
											: "bg-white text-gray-700 hover:bg-gray-100"
									}`}
								>
									{i + 1}
								</button>
							))}
						</div>
					)}

					{message && (
						<div className="fixed top-5 right-5 z-50 bg-green-100 border border-green-300 text-green-800 px-4 py-2 rounded shadow-md">
							{message}
						</div>
					)}

				</div>
			</div>

			{/* 📱 Mobile Filter Drawer */}
			{mobileFilters}
		</div>
	);
};

export default Products;
