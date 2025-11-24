import { useState, useEffect } from "react"
import { createProduct, updateProduct } from "../../services/productService"

const categoryOptions = [
	"phone", "laptop", "headset", "accessory", "smartwatch", "tablet", "gaming"
]

const ProductForm = ({ product, onClose, onSuccess }) => {
	const isEditing = !!product

	const [formData, setFormData] = useState({
		name: "",
		brand: "",
		description: "",
		image: "",
		price: "",
		promoPrice: "",
		condition: "UK Used",
		category: "phone",
		negotiable: false,
		inStock: true,
		stockQuantity: 0,
		featured: false
	})

	const [loading, setLoading] = useState(false)

	useEffect(() => {
		if (product) {
			setFormData({
				name: product.name || "",
				brand: product.brand || "",
				description: product.description || "",
				image: product.image || "",
				price: product.price || "",
				promoPrice: product.promoPrice || "",
				condition: product.condition || "UK Used",
				category: product.category || "phone",
				negotiable: product.negotiable || false,
				inStock: product.inStock || true,
				stockQuantity: product.stockQuantity || 0,
				featured: product.featured || false
			})
		}
	}, [product])

	const handleChange = (e) => {
		const { name, value, type, checked } = e.target
		setFormData((prev) => ({
			...prev,
			[name]: type === "checkbox" ? checked : value
		}))
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		setLoading(true)

		try {
			const res = isEditing
				? await updateProduct(product._id, formData)
				: await createProduct(formData)

			onSuccess(res.data)
		} catch (err) {
			console.error(err)
			alert("Failed to save product")
		} finally {
			setLoading(false)
		}
	}

	return (
		<div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
			<div className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-6 max-h-[90vh] overflow-y-auto">
				<h2 className="text-xl font-semibold mb-4">
					{isEditing ? "Edit Product" : "Add Product"}
				</h2>

				<form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">

					{/* --- Basic Info --- */}
					<div>
						<label className="text-sm">Name</label>
						<input
							name="name"
							value={formData.name}
							onChange={handleChange}
							required
							className="input w-full"
						/>
					</div>

					<div>
						<label className="text-sm">Brand</label>
						<input
							name="brand"
							value={formData.brand}
							onChange={handleChange}
							className="input w-full"
						/>
					</div>

					<div className="md:col-span-2">
						<label className="text-sm">Description</label>
						<textarea
							name="description"
							value={formData.description}
							onChange={handleChange}
							rows="4"
							className="input w-full"
						/>
					</div>

					{/* --- Pricing --- */}
					<div>
						<label className="text-sm">Price (₦)</label>
						<input
							type="number"
							name="price"
							value={formData.price}
							onChange={handleChange}
							className="input w-full"
						/>
					</div>

					<div>
						<label className="text-sm">Promo Price (₦)</label>
						<input
							type="number"
							name="promoPrice"
							value={formData.promoPrice}
							onChange={handleChange}
							className="input w-full"
						/>
					</div>

					{/* --- Inventory --- */}
					<div>
						<label className="text-sm">Stock Quantity</label>
						<input
							type="number"
							name="stockQuantity"
							value={formData.stockQuantity}
							onChange={handleChange}
							className="input w-full"
						/>
					</div>

					<div>
						<label className="text-sm">Image URL</label>
						<input
							name="image"
							value={formData.image}
							onChange={handleChange}
							className="input w-full"
						/>
					</div>

					{/* --- Attributes --- */}
					<div>
						<label className="text-sm">Condition</label>
						<select
							name="condition"
							value={formData.condition}
							onChange={handleChange}
							className="input w-full"
						>
							<option value="UK Used">UK Used</option>
							<option value="Brand New">Brand New</option>
						</select>
					</div>

					<div>
						<label className="text-sm">Category</label>
						<select
							name="category"
							value={formData.category}
							onChange={handleChange}
							className="input w-full"
						>
							{categoryOptions.map((cat) => (
								<option key={cat} value={cat}>
									{cat}
								</option>
							))}
						</select>
					</div>

					{/* --- Flags --- */}
					<div className="md:col-span-2 grid grid-cols-2 gap-4 mt-2">
						<label className="flex items-center gap-2">
							<input
								type="checkbox"
								name="negotiable"
								checked={formData.negotiable}
								onChange={handleChange}
							/>
							<span>Negotiable</span>
						</label>

						<label className="flex items-center gap-2">
							<input
								type="checkbox"
								name="inStock"
								checked={formData.inStock}
								onChange={handleChange}
							/>
							<span>In Stock</span>
						</label>

						<label className="flex items-center gap-2">
							<input
								type="checkbox"
								name="featured"
								checked={formData.featured}
								onChange={handleChange}
							/>
							<span>Featured</span>
						</label>
					</div>

					{/* --- Action Buttons --- */}
					<div className="md:col-span-2 flex justify-end space-x-3 mt-4">
						<button
							type="button"
							onClick={onClose}
							className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100"
						>
							Cancel
						</button>

						<button
							type="submit"
							disabled={loading}
							className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
						>
							{loading ? "Saving..." : isEditing ? "Update Product" : "Add Product"}
						</button>
					</div>
				</form>
			</div>
		</div>
	)
}

export default ProductForm
