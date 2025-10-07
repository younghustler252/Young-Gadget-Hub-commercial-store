const express = require('express');
const router = express.Router();

const {
  getUserProfile,
  updateUserProfile,
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUser
} = require('../controllers/userController');

const { protect, admin } = require('../middleware/authMiddleware');

// Current user routes
router.get('/profile', protect, getUserProfile);
router.put('/profile', protect, updateUserProfile);

// Admin routes - all require admin role
router.get('/', protect, admin, getAllUsers);          // GET all users
router.get('/:id', protect, admin, getUserById);       // GET user by ID
router.put('/:id', protect, admin, updateUserById);    // UPDATE user by ID
router.delete('/:id', protect, admin, deleteUser);     // DELETE user by ID

module.exports = router;
