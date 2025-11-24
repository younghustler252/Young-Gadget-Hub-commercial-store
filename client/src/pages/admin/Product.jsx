import { useEffect, useState } from "react";
import { FiEdit2, FiTrash2, FiPlus } from "react-icons/fi";
import { getProducts, softDeleteProduct } from "../../services/productService";
import ProductForm from "./ProductForm";
import { Spinner } from "../../components/Spinner";

const AdminProducts = () => {
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const [showForm, setShowForm] = useState(false);
	const [editingProduct, setEditingProduct] = useState(null);

	const fetchProducts = async () => {
		setLoading(true);
		try {
			const res = await getProducts();
			setProducts(res.data);
		} catch (err) {
			console.error(err);
			setError("Failed to load products");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchProducts();
	}, []);

	const handleDelete = async (id) => {
		if (!window.confirm("Are you sure you want to delete this product?")) return;
		try {
			await softDeleteProduct(id);
			setProducts((prev) => prev.filter((p) => p._id !== id));
		} catch (err) {
			console.error("Delete failed:", err);
			alert("Failed to delete");
		}
	};

	const handleEdit = (product) => {
		setEditingProduct(product);
		setShowForm(true);
	};

	const handleAdd = () => {
		setEditingProduct(null);
		setShowForm(true);
	};

	const handleFormClose = () => {
		setShowForm(false);
		setEditingProduct(null);
	};

	const handleFormSubmit = (newOrUpdated) => {
		if (editingProduct) {
			setProducts((prev) =>
				prev.map((p) => (p._id === newOrUpdated._id ? newOrUpdated : p))
			);
		} else {
			setProducts((prev) => [newOrUpdated, ...prev]);
		}
		handleFormClose();
	};

	return (
		<div className="min-h-screen p-6 bg-gray-100">
			{/* Admin Header */}
			<div className="flex justify-between items-center mb-4">
				<h1 className="text-3xl font-semibold text-gray-800">Manage Products</h1>
				<button
					className="flex items-center bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition"
					onClick={handleAdd}
				>
					<FiPlus className="mr-2" />
					Add Product
				</button>
			</div>

			{/* Loading State */}
			{loading ? (
				<div className="flex justify-center items-center py-8">
					<Spinner /> {/* You can create a reusable Spinner component */}
				</div>
			) : error ? (
				<p className="text-red-500 text-center">{error}</p>
			) : (
				<div className="overflow-x-auto bg-white shadow-lg rounded-lg">
					<table className="min-w-full text-sm">
						<thead className="bg-gray-200 text-gray-700">
							<tr>
								<th className="p-4 text-left">Image</th>
								<th className="p-4 text-left">Name</th>
								<th className="p-4 text-left">Brand</th>
								<th className="p-4 text-left">Category</th>
								<th className="p-4 text-left">Price</th>
								<th className="p-4 text-left">Promo Price</th>
								<th className="p-4 text-left">Stock</th>
								<th className="p-4 text-left">In Stock</th>
								<th className="p-4 text-left">Featured</th>
								<th className="p-4">Actions</th>
							</tr>
						</thead>
						<tbody>
							{products.map((p) => (
								<tr key={p._id} className="border-b hover:bg-gray-50">
									<td className="p-3">
										<img
											src={p.image}
											alt={p.name}
											className="h-16 w-16 object-cover rounded-md"
										/>
									</td>
									<td className="p-3">{p.name}</td>
									<td className="p-3">{p.brand}</td>
									<td className="p-3 capitalize">{p.category}</td>
									<td className="p-3">₦{p.price.toLocaleString()}</td>
									<td className="p-3 text-green-600">
										{p.promoPrice ? `₦${p.promoPrice}` : "-"}
									</td>
									<td className="p-3">{p.stockQuantity}</td>
									<td className="p-3">{p.inStock ? "✅" : "❌"}</td>
									<td className="p-3">{p.featured ? "⭐" : "—"}</td>
									<td className="p-3 space-x-2">
										<button
											onClick={() => handleEdit(p)}
											className="text-blue-600 hover:text-blue-800 transition"
											title="Edit"
										>
											<FiEdit2 />
										</button>
										<button
											onClick={() => handleDelete(p._id)}
											className="text-red-600 hover:text-red-800 transition"
											title="Delete"
										>
											<FiTrash2 />
										</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			)}

			{/* Product Form Modal */}
			{showForm && (
				<ProductForm
					product={editingProduct}
					onClose={handleFormClose}
					onSubmit={handleFormSubmit}
				/>
			)}
		</div>
	);
};

export default AdminProducts;
