const asyncHandler = require('express-async-handler');
const Order = require('../models/orderModel');
const Cart = require('../models/cartModel');
const Product = require('../models/productModel');

// ✅ Create Order from Cart
const createOrder = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const { shippingAddress } = req.body;
    
    if (!shippingAddress) {
        return res.status(400).json({ message: 'Shipping address is required' });
    }

    const cart = await Cart.findOne({ user: userId }).populate('items.product');

    if (!cart || cart.items.length === 0) {
        return res.status(400).json({ message: 'Cart is empty' });
    }

    // Prepare product list with locked-in prices
    const products = cart.items.map(item => ({
        product: item.product._id,
        quantity: item.quantity,
        price: item.product.price, // Lock price at time of order
    }));

    // Calculate total
    const totalAmount = products.reduce((acc, item) => {
        return acc + item.price * item.quantity;
    }, 0);

    // Create order
    const order = await Order.create({
        user: userId,
        products,
        totalAmount,
        shippingAddress,
        paymentStatus: 'pending',
        orderStatus: 'processing',
    });

    // Clear the cart
    await Cart.findOneAndDelete({ user: userId });

    res.status(201).json({
        success: true,
        message: 'Order placed successfully',
        data: order,
    });
});


const getMyOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user.id })
        .populate('products.product')
        .sort({ createdAt: -1 });

    res.status(200).json({
        success: true,
        data: orders,
    });
});

const updateOrderStatus = asyncHandler(async (req, res) => {
    const { orderId } = req.params;
    const { orderStatus, paymentStatus } = req.body;
    
    const validOrderStatuses = ['processing', 'shipped', 'delivered', 'cancelled'];
    const validPaymentStatuses = ['pending', 'paid', 'failed'];

    const order = await Order.findById(orderId);
    if (!order) {
        return res.status(404).json({ message: 'Order not found' });
    }

    if (orderStatus && validOrderStatuses.includes(orderStatus)) {
        order.orderStatus = orderStatus;
    }

    if (paymentStatus && validPaymentStatuses.includes(paymentStatus)) {
        order.paymentStatus = paymentStatus;
    }
 
  await order.save();

    res.status(200).json({
        success: true,
        message: 'Order updated successfully',
        data: order,
    });
    });


