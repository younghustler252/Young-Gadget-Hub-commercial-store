const asyncHandler = require('express-async-handler');
const Product = require('../models/Product');
const Order = require('../models/Order');
const User = require('../models/User');  // Assuming you have a User model

const getDashboardMetrics = asyncHandler(async (req, res) => {
    // Product metrics
    const [totalProducts, inStockProducts, featuredProducts, promoProducts] = await Promise.all([
        Product.countDocuments({ isDeleted: false }),
        Product.countDocuments({ inStock: true, isDeleted: false }),
        Product.countDocuments({ featured: true, isDeleted: false }),
        Product.countDocuments({ promoPrice: { $ne: null }, isDeleted: false })
    ]);

    // User count
    const totalUsers = await User.countDocuments({});  // Assuming no filters, this counts all users

    // Order count and total sales (revenue)
    const totalOrders = await Order.countDocuments({ status: 'completed' });  // Completed orders
    const totalRevenue = await Order.aggregate([
        { $match: { status: 'completed' } },  // Filter completed orders
        { $group: { _id: null, total: { $sum: '$totalPrice' } } }
    ]);

    const revenue = totalRevenue.length > 0 ? totalRevenue[0].total : 0; // Default to 0 if no revenue data

    // Respond with the aggregated metrics
    res.json({
        totalProducts,
        inStockProducts,
        featuredProducts,
        promoProducts,
        totalUsers,
        totalOrders,
        sales: revenue,  // Total revenue
    });
});

module.exports = { getDashboardMetrics };
