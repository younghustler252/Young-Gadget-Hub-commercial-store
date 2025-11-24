const express = require('express');
const router = express.Router();
const {getDashboardMetrics} = require('../controllers/dashboardController')
const { protect, admin } = require('../middleware/authMiddleware');

// ✅ Place order
router.get('/metrics', protect, getDashboardMetrics);


module.exports = router;
