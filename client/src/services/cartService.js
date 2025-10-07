import API from "../api/axios";
import handleError from "../utils/handleError";

// 🛒 Add item to cart
export const addToCart = async (productId, quantity = 1) => {
	try {
		const { data } = await API.post("/cart/add", {
			productId,
			quantity,
		});
		return data;
	} catch (error) {
		handleError(error);
	}
};

// 📦 Get current user's cart
export const getCart = async () => {
	try {
		const { data } = await API.get("/cart");
		return data;
	} catch (error) {
		handleError(error);
	}
};

// ✏️ Update item quantity in cart
export const updateCartItem = async (productId, quantity) => {
	try {
		const { data } = await API.put("/cart/update", {
			productId,
			quantity,
		});
		return data;
	} catch (error) {
		handleError(error);
	}
};

// ❌ Remove an item from cart
export const removeFromCart = async (productId) => {
	try {
		const { data } = await API.delete("/cart/remove", {
			data: { productId },
		});
		return data;
	} catch (error) {
		handleError(error);
	}
};

// 🧹 Clear entire cart (optional)
export const clearCart = async () => {
	try {
		const { data } = await API.delete("/cart/clear");
		return data;
	} catch (error) {
		handleError(error);
	}
};
