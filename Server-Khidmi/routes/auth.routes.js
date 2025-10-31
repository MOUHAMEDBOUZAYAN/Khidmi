const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/auth.middleware');
const {
  register,
  login,
  getMe,
  logout,
  updatePassword
} = require('../controllers/auth.controller');

// Public routes
router.post('/register', register);
router.post('/login', login);

// Protected routes
router.get('/me', protect, getMe);
router.post('/logout', protect, logout);
router.put('/updatepassword', protect, updatePassword);

module.exports = router;

