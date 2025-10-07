const mongoose = require('mongoose');
const Product = require('../models/Product');
const asyncHandler = require('express-async-handler');


const getAllProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({ isDeleted: false });

    if (products.length === 0) {
        return res.status(404).json({ message: "No products found" });
    }

    res.status(200).json({
        success: true,
        data: products
    });
});


// @desc    Bulk create products
// @route   POST /api/products/bulk
// @access  Public or Protected (your choice)
const bulkCreateProducts = asyncHandler(async (req, res) => {
    const { products } = req.body;

    if (!Array.isArray(products) || products.length === 0) {
        return res.status(400);
        throw new Error("No products provided for bulk insert");
        
    }

    try {
        const insertedProducts = await Product.insertMany(products);
        res.status(201).json({
            success: true,
            count: insertedProducts.length,
            data: insertedProducts
        });
    } catch (error) {
        console.error("Bulk insert error:", error);
        res.status(500)
        throw new Error("Bulk inserted failed");
        
    }
});


const createProduct = asyncHandler(async (req, res) => {
    const {
        name,
        description,
        price,
        category,
        inStock,
        image,
        brand,
        stockQuantity
    } = req.body;

    // Basic field validation
    if (!name || !price || !description) {
        res.status(400);
        throw new Error("Name, price, and description are required.");
    }

    // Type/Range validation
    if (price < 0) {
        res.status(400);
        throw new Error("Price must be a non-negative number.");
    }

    if (stockQuantity < 0) {
        res.status(400);
        throw new Error("Stock quantity cannot be negative.");
    }

    const validCategories = ['phone', 'laptop', 'headset'];
    if (category && !validCategories.includes(category)) {
        res.status(400);
        throw new Error(`Invalid category. Valid categories are: ${validCategories.join(', ')}`);
    }

    const product = await Product.create({
        name,
        price,
        description,
        category,
        inStock,
        image,
        brand,
        stockQuantity
    });

    res.status(201).json({
        message: 'Product created successfully.',
        product
    });
});

const getProductById = asyncHandler(async (req, res) => {
    const {id} = req.params;

    const product = await Product.findById({ _id: id, isDeleted: false });;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400);
        throw new Error("Invalid product ID");
    }

    if (!product) {
        res.status(404)
        throw new Error("product does not exist");
    }

    res.status(200).json({
        success: true,
        data: product
    })

})

const getFeaturedProducts = asyncHandler(async (req, res) => {
	const featuredProducts = await Product.find({
        isDeleted: false,
		featured: true,
		inStock: true
	}).sort({ createdAt: -1 }); // Optional: show latest featured items first

	res.status(200).json({
        success: true,
        data: featuredProducts
    });
});

// controllers/productController.js

const getPromoDeals = asyncHandler(async (req, res) => {
	const promoProducts = await Product.find({
		promoPrice: { $exists: true, $ne: null },
		inStock: true,
		isDeleted: false
	}).sort({ createdAt: -1 }).limit(8);

	res.status(200).json({
		success: true,
		data: promoProducts
	});
});



const updateProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const product = await Product.findOne({ _id: id, isDeleted: false });

    if (!product) {
        res.status(404);
        throw new Error("Product does not exist");
    }

    const {
        name,
        description,
        price,
        category,
        inStock,
        image,
        brand,
        stockQuantity
    } = req.body;

    // Validate price and stockQuantity if provided
    if (price !== undefined && price < 0) {
        res.status(400);
        throw new Error("Price must be non-negative");
    }

    if (stockQuantity !== undefined && stockQuantity < 0) {
        res.status(400);
        throw new Error("Stock quantity cannot be negative");
    }

    // Apply updates only if provided
    if (name !== undefined) product.name = name;
    if (description !== undefined) product.description = description;
    if (price !== undefined) product.price = price;
    if (category !== undefined) product.category = category;
    if (inStock !== undefined) product.inStock = inStock;
    if (image !== undefined) product.image = image;
    if (brand !== undefined) product.brand = brand;
    if (stockQuantity !== undefined) product.stockQuantity = stockQuantity;

    const updatedProduct = await product.save();

    res.status(200).json({
        success: true,
        message: 'Product updated successfully',
        data: updatedProduct
    });
});

const softDeleteProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const product = await Product.findById(id);

    if (!product || product.isDeleted) {
        res.status(404);
        throw new Error("Product not found or already deleted");
    }

    product.isDeleted = true;
    await product.save();

    res.status(200).json({
        success: true,
        message: "Product deleted (soft delete)"
    });
});


const getFilteredProducts = asyncHandler(async (req, res) => {
	const {
		category,
		brand,
		minPrice,
		maxPrice,
		inStock,
		condition,
		page = 1,
		limit = 16, // Default per page
	} = req.query;

	const query = { isDeleted: false };

	if (category) query.category = category;
	if (brand) query.brand = brand;
	if (condition) query.condition = condition;
	if (inStock !== undefined) query.inStock = inStock === "true";

	if (minPrice || maxPrice) {
		query.price = {};
		if (minPrice) query.price.$gte = parseFloat(minPrice);
		if (maxPrice) query.price.$lte = parseFloat(maxPrice);
	}

	const skip = (page - 1) * limit;

	const [products, total] = await Promise.all([
		Product.find(query).skip(skip).limit(parseInt(limit)),
		Product.countDocuments(query),
	]);

	res.status(200).json({
		success: true,
		data: products,
		page: Number(page),
		totalPages: Math.ceil(total / limit),
		totalItems: total,
	});
});




// e.g. GET /api/products/search?q=iphone
const searchProducts = asyncHandler(async (req, res) => {
    const { q } = req.query;

    if (!q) {
        return res.status(400).json({ message: "Search query is required" });
    }

    const regex = new RegExp(q, 'i'); // case-insensitive
    const products = await Product.find({
        isDeleted: false,
        $or: [{ name: regex }, { description: regex }]
    });

    res.status(200).json({ success: true, data: products });
});


module.exports = {
    bulkCreateProducts,
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    softDeleteProduct,
    getFilteredProducts,
    searchProducts,
    getFeaturedProducts,
    getPromoDeals,
};
