import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProductById } from "../../services/productService";
import { FiShoppingCart } from "react-icons/fi";
import { addToCart } from "../../services/cartService";

const ProductDetails = () => {
	const { id } = useParams();
	const navigate = useNavigate();

	const [product, setProduct] = useState(null);
	const [loading, setLoading] = useState(true);
	const [quantity, setQuantity] = useState(1);
	const [isAdding, setIsAdding] = useState(false);
	const [message, setMessage] = useState(null);

	useEffect(() => {
		const fetchProduct = async () => {
			try {
				const response = await getProductById(id);
				setProduct(response.data);
			} catch (error) {
				console.error("Failed to load product:", error);
				navigate("/products"); // Redirect if product not found
			} finally {
				setLoading(false);
			}
		};

		fetchProduct();
	}, [id, navigate]);

	const handleAddToCart = async () => {
		setIsAdding(true);
		try {
			await addToCart(product._id, quantity);
			setMessage("✅ Added to cart!");
		} catch (error) {
			console.error("Failed to add to cart:", error);
			setMessage("❌ Failed to add to cart");
		} finally {
			setIsAdding(false);
			setTimeout(() => setMessage(null), 3000);
		}
	};

	if (loading) {
		return <div className="p-6 text-center">Loading...</div>;
	}

	if (!product) {
		return <div className="p-6 text-center text-red-500">Product not found.</div>;
	}

	return (
		<div className="max-w-5xl mx-auto px-4 py-8">
			<div className="flex flex-col md:flex-row gap-6">
				{/* Product Image */}
				<div className="md:w-1/2">
					<img
						src={product.image}
						alt={product.name}
						className="w-full h-auto object-cover rounded shadow"
					/>
				</div>

				{/* Product Info */}
				<div className="md:w-1/2 space-y-4">
					<h1 className="text-2xl font-bold">{product.name}</h1>
					<p className="text-gray-600 text-sm">{product.brand}</p>
					<p className="text-gray-500 text-sm">Condition: {product.condition}</p>
					<p className="text-xl font-semibold text-blue-600">${product.price}</p>
					<p className="text-sm text-gray-700">{product.description || "No description provided."}</p>

					{/* Quantity Selector */}
					<div className="flex items-center gap-2 mt-4">
						<label htmlFor="quantity" className="text-sm font-medium">
							Quantity:
						</label>
						<select
							id="quantity"
							value={quantity}
							onChange={(e) => setQuantity(parseInt(e.target.value))}
							className="border px-2 py-1 rounded text-sm"
						>
							{[1, 2, 3, 4, 5].map((q) => (
								<option key={q} value={q}>
									{q}
								</option>
							))}
						</select>
					</div>

					{/* Add to Cart Button */}
					<button
						onClick={handleAddToCart}
						disabled={isAdding}
						className="mt-4 flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded disabled:opacity-60"
					>
						<FiShoppingCart />
						{isAdding ? "Adding..." : "Add to Cart"}
					</button>

					{/* Feedback Message */}
					{message && (
						<div className="mt-3 text-sm text-center text-green-600">
							{message}
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default ProductDetails;
