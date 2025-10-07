import { useEffect, useState } from "react";
import {
	getCart,
	updateCartItem,
	removeFromCart,
	clearCart,
} from "../../services/cartService";
import { Link } from "react-router-dom";
import { FiTrash2 } from "react-icons/fi";

const Cart = () => {
	const [cartItems, setCartItems] = useState([]);
	const [loading, setLoading] = useState(true);
	const [updating, setUpdating] = useState(false);

	useEffect(() => {
		loadCart();
	}, []);

	const loadCart = async () => {
		setLoading(true);
		try {
			const response = await getCart();
			setCartItems(response?.data || []);
		} catch (error) {
			console.error("Failed to load cart:", error);
		} finally {
			setLoading(false);
		}
	};

	const handleQuantityChange = async (productId, quantity) => {
		setUpdating(true);
		try {
			await updateCartItem(productId, quantity);
			await loadCart();
		} catch (error) {
			console.error("Error updating quantity:", error);
		} finally {
			setUpdating(false);
		}
	};

	const handleRemove = async (productId) => {
		setUpdating(true);
		try {
			await removeFromCart(productId);
			await loadCart();
		} catch (error) {
			console.error("Error removing item:", error);
		} finally {
			setUpdating(false);
		}
	};

	const handleClearCart = async () => {
		setUpdating(true);
		try {
			await clearCart();
			await loadCart();
		} catch (error) {
			console.error("Error clearing cart:", error);
		} finally {
			setUpdating(false);
		}
	};

	const calculateTotal = () => {
		return cartItems.reduce((total, item) => {
			return total + item.product.price * item.quantity;
		}, 0);
	};

	if (loading) {
		return (
			<div className="flex justify-center items-center h-64">
				<p className="text-gray-500">Loading cart...</p>
			</div>
		);
	}

	if (!cartItems.length) {
		return (
			<div className="text-center py-20">
				<h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
				<Link
					to="/"
					className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
				>
					Go Shopping
				</Link>
			</div>
		);
	}

	return (
		<div className="max-w-5xl mx-auto px-4 py-10">
			<h1 className="text-2xl font-bold mb-6">Your Cart</h1>

			<div className="flex flex-col gap-6">
				{cartItems.map((item) => (
					<div
						key={item.product._id}
						className="flex items-center justify-between border-b pb-4"
					>
						<div className="flex items-center gap-4">
							<img
								src={item.product.image}
								alt={item.product.name}
								className="w-20 h-20 object-cover rounded"
							/>
							<div>
								<Link
									to={`/product/${item.product._id}`}
									className="text-lg font-semibold hover:underline"
								>
									{item.product.name}
								</Link>
								<p className="text-sm text-gray-500">{item.product.brand}</p>
								<p className="text-sm text-gray-500">
									Condition: {item.product.condition}
								</p>
							</div>
						</div>

						<div className="flex items-center gap-4">
							<select
								value={item.quantity}
								disabled={updating}
								onChange={(e) =>
									handleQuantityChange(item.product._id, parseInt(e.target.value))
								}
								className="border px-2 py-1 rounded"
							>
								{[1, 2, 3, 4, 5].map((num) => (
									<option key={num} value={num}>
										{num}
									</option>
								))}
							</select>

							<p className="w-16 text-right font-semibold">
								${(item.product.price * item.quantity).toFixed(2)}
							</p>

							<button
								onClick={() => handleRemove(item.product._id)}
								disabled={updating}
								className="text-red-500 hover:text-red-700"
								title="Remove item"
							>
								<FiTrash2 size={18} />
							</button>
						</div>
					</div>
				))}
			</div>

			{/* Footer */}
			<div className="mt-10 flex justify-between items-center border-t pt-6">
				<button
					onClick={handleClearCart}
					disabled={updating}
					className="text-red-600 hover:underline text-sm"
				>
					Clear Cart
				</button>

				<div className="text-right">
					<p className="text-lg font-semibold">
						Subtotal: <span className="text-blue-600">${calculateTotal().toFixed(2)}</span>
					</p>
					<Link
						to="/checkout"
						className="inline-block mt-3 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
					>
						Checkout
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Cart;
