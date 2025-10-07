const Cart = require('../models/Cart')
const asyncHandler = require('express-async-handler');

const addToCart = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const { productId, quantity } = req.body;
    
    // Simple validation
    if (!productId || typeof quantity !== 'number' || quantity <= 0) {
        return res.status(400).json({
            success: false,
            message: 'Invalid product or quantity',
        });
    }

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
        cart = new Cart({
            user: userId,
            items: [{ product: productId, quantity }],
        });
    } else {
        const itemIndex = cart.items.findIndex(
            item => item.product.toString() === productId
        );

        if (itemIndex > -1) {
            cart.items[itemIndex].quantity += quantity;
        } else {
            cart.items.push({ product: productId, quantity });
        }
    }

    await cart.save();
    await cart.populate('items.product'); // Optional but useful

    res.status(200).json({
        success: true,
        data: cart,
    });

});

const getCart = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    
    const cart = await Cart.findOne({ user: userId }).populate('items.product');

    if (!cart || cart.items.length === 0) {
        return res.status(200).json({
            success: true,
            message: 'Cart is empty',
            data: [],
        });
    }

    res.status(200).json({
        success: true,
        data: cart,
    });

});


const updateCartItem = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const { productId, quantity } = req.body;
    
    // Validate inputs
    if (!productId || typeof quantity !== 'number' || quantity <= 0) {
        return res.status(400).json({
            success: false,
            message: 'Invalid product ID or quantity',
        });
    }

    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
        return res.status(404).json({
            success: false,
            message: 'Cart not found',
        });
    }

    const itemIndex = cart.items.findIndex(
        item => item.product.toString() === productId
    );

    if (itemIndex === -1) {
        return res.status(404).json({
            success: false,
            message: 'Product not found in cart',
        });
    }

    cart.items[itemIndex].quantity = quantity;

    await cart.save();
    await cart.populate('items.product');

    res.status(200).json({
        success: true,
        message: 'Cart item updated',
        data: cart,
    });
});


const removeFromCart = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const { productId } = req.body;
    
    if (!productId) {
        return res.status(400).json({
            success: false,
            message: 'Product ID is required',
        });
    }

    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
        return res.status(404).json({
            success: false,
            message: 'Cart not found',
        });
    }

    const itemIndex = cart.items.findIndex(
        item => item.product.toString() === productId
    );

    if (itemIndex === -1) {
        return res.status(404).json({
            success: false,
            message: 'Product not found in cart',
        });
    }

    // Remove item
    cart.items.splice(itemIndex, 1);
  
    await cart.save();
    await cart.populate('items.product');

    res.status(200).json({
        success: true,
        message: 'Product removed from cart',
        data: cart,
    });

});



const clearCart = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    
    await Cart.findOneAndDelete({ user: userId });

    res.status(200).json({
        success: true,
        message: 'Cart cleared successfully',
    });

});


module.exports = {
    addToCart,
    getCart,
    updateCartItem,
    removeFromCart,
    clearCart, // optional 
};


