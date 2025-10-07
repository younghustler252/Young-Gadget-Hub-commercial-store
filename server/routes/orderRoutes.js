const express = require('express');
const router = express.Router();
const {
    createOrder,
    getMyOrders,
    getAllOrders,
    updateOrderStatus,
} = require('../controllers/orderController');
const { protect, admin } = require('../middleware/authMiddleware');

// ✅ Place order
router.post('/', protect, createOrder);

// 🧾 Get current user's orders
router.get('/my-orders', protect, getMyOrders);

// 🛡 Admin: Get all orders
router.get('/', protect, admin, getAllOrders);

// 🔁 Admin: Update status/payment
router.put('/:orderId/status', protect, admin, updateOrderStatus);

module.exports = router;
