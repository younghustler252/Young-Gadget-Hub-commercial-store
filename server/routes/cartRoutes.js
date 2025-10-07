const express = require('express');
const router = express.Router();
const {
    addToCart,
    getCart,
    updateCartItem,
    removeFromCart,
    clearCart,
} = require('../controllers/cartController');
    
const { protect } = require('../middleware/authMiddleware');

// 🛒 Add item to cart
router.post('/add', protect, addToCart);

// 📦 Get current user's cart
router.get('/', protect, getCart);

// ✏️ Update quantity of item in cart
router.put('/update', protect, updateCartItem);

// ❌ Remove item from cart
router.delete('/remove', protect, removeFromCart);

// 🔄 Optional: Clear entire cart
router.delete('/clear', protect, clearCart);

module.exports = router;
