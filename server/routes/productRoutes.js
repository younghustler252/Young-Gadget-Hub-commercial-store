const express = require('express');
const router = express.Router();
const {
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
} = require('../controllers/productController');
const {protect, admin} = require('../middleware/authMiddleware');

// Create a new product
router.post('/', createProduct, protect, admin);

// ✅ Specific routes should come BEFORE dynamic ones
router.get('/featured', getFeaturedProducts);

// ✅ Advanced filter/search routes
router.get('/filter/advanced', getFilteredProducts, protect);
router.get('/search/', searchProducts, protect);


// Get all products
router.get('/', getAllProducts);

router.get('/promos', getPromoDeals);

// Bulk create
router.post("/bulk", bulkCreateProducts);



// Get product by ID — KEEP THIS AT THE BOTTOM
router.get('/:id', getProductById);

// Update product by ID
router.put('/:id', updateProduct, protect, admin);

// Soft delete product by ID
router.delete('/:id', softDeleteProduct, protect, admin);

module.exports = router;

