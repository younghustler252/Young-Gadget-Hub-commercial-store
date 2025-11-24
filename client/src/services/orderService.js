// services/orderService.js

import API from "../api/axios";
import handleError from "../utils/handleError";

// Create Order from Cart
export const createOrder = async (shippingAddress) => {
  try {
    const { data } = await API.post('/orders', { shippingAddress });
    return data; // { success, message, data: order }
  } catch (error) {
    handleError(error);
  }
};

// Get orders for logged-in user (My Orders)
export const getMyOrders = async () => {
  try {
    const { data } = await API.get('/orders/my');
    return data; // { success, data: [orders] }
  } catch (error) {
    handleError(error);
  }
};

// Admin or User update order status & payment status
export const updateOrderStatus = async (orderId, updates) => {
  // updates = { orderStatus: "shipped", paymentStatus: "paid" } (optional keys)
  try {
    const { data } = await API.put(`/orders/${orderId}`, updates);
    return data; // { success, message, data: updatedOrder }
  } catch (error) {
    handleError(error);
  }
};

// Optional: Fetch all orders (for admin view)
export const getAllOrders = async () => {
  try {
    const { data } = await API.get('/orders');
    return data; // depends on your backend route, adjust accordingly
  } catch (error) {
    handleError(error);
  }
};
