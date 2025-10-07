import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
	getCart,
	updateCartItem,
	removeFromCart,
} from "../services/cartService";
import { FiTrash2, FiX } from "react-icons/fi";
import { Link } from "react-router-dom";

const CartDrawer = ({ isOpen, onClose }) => {
	const [cartItems, setCartItems] = useState([]);
	const [loading, setLoading] = useState(true);
	const [updating, setUpdating] = useState(false);

	useEffect(() => {
		if (isOpen) {
			loadCart();
		}
	}, [isOpen]);

	const loadCart = async () => {
		setLoading(true);
		try {
			const response = await getCart();

			// ✅ FIX: Make sure you're accessing the array inside `data`
			const items = response?.data?.items || [];
			setCartItems(items);
		} catch (error) {
			console.error("Failed to load cart:", error);
			setCartItems([]);
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

	const calculateTotal = () => {
		return cartItems.reduce((total, item) => {
			return total + item.product.price * item.quantity;
		}, 0);
	};

	return (
		<Transition.Root show={isOpen} as={Fragment}>
			<Dialog as="div" className="relative z-50" onClose={onClose}>
				<Transition.Child
					as={Fragment}
					enter="ease-in-out duration-300"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="ease-in-out duration-200"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<div className="fixed inset-0 -opacity-30 backdrop-blur-sm transition-opacity" />
				</Transition.Child>

				<div className="fixed inset-0 overflow-hidden">
					<div className="absolute inset-0 overflow-hidden">
						<div className="fixed inset-y-0 right-0 max-w-full flex">
							<Transition.Child
								as={Fragment}
								enter="transform transition ease-in-out duration-300"
								enterFrom="translate-x-full"
								enterTo="translate-x-0"
								leave="transform transition ease-in-out duration-200"
								leaveFrom="translate-x-0"
								leaveTo="translate-x-full"
							>
								<Dialog.Panel className="w-screen max-w-md bg-white shadow-xl">
									<div className="flex items-center justify-between px-4 py-4 border-b">
										<h2 className="text-lg font-semibold">Your Cart</h2>
										<button
											onClick={onClose}
											className="text-gray-500 hover:text-gray-700"
										>
											<FiX size={22} />
										</button>
									</div>

									<div className="h-full overflow-y-auto px-4 py-6 flex flex-col justify-between">
										{loading ? (
											<p className="text-center text-gray-500">Loading...</p>
										) : cartItems.length === 0 ? (
											<p className="text-center text-gray-500 mt-20">Your cart is empty.</p>
										) : (
											<div className="space-y-5 flex-1 overflow-y-auto">
												{cartItems.map((item) => (
													<div key={item.product._id} className="flex items-center gap-4">
														<img
															src={item.product.image}
															alt={item.product.name}
															className="w-16 h-16 object-cover rounded"
														/>
														<div className="flex-1">
															<h3 className="text-sm font-medium truncate">{item.product.name}</h3>
															<p className="text-xs text-gray-500">{item.product.brand}</p>
															<p className="text-xs text-gray-500">Condition: {item.product.condition}</p>

															<div className="flex items-center mt-1">
																<select
																	value={item.quantity}
																	onChange={(e) =>
																		handleQuantityChange(item.product._id, parseInt(e.target.value))
																	}
																	className="text-sm border rounded px-1 py-0.5"
																>
																	{[1, 2, 3, 4, 5].map((num) => (
																		<option key={num} value={num}>
																			{num}
																		</option>
																	))}
																</select>

																<button
																	onClick={() => handleRemove(item.product._id)}
																	className="ml-3 text-red-500 hover:text-red-700"
																>
																	<FiTrash2 size={16} />
																</button>
															</div>
														</div>
														<p className="text-sm font-semibold text-right">
															${(item.product.price * item.quantity).toFixed(2)}
														</p>
													</div>
												))}
											</div>
										)}

										{/* Footer */}
										{cartItems.length > 0 && (
											<div className="pt-6 border-t mt-4">
												<p className="text-right text-sm font-semibold mb-3">
													Subtotal: <span className="text-blue-600">${calculateTotal().toFixed(2)}</span>
												</p>
												<Link
													to="/cart"
													onClick={onClose}
													className="block w-full mb-2 text-center bg-gray-100 text-sm px-4 py-2 rounded hover:bg-gray-200"
												>
													View Full Cart
												</Link>
												<Link
													to="/checkout"
													onClick={onClose}
													className="block w-full text-center bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
												>
													Checkout
												</Link>
											</div>
										)}
									</div>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</div>
				</div>
			</Dialog>
		</Transition.Root>
	);
};

export default CartDrawer;
