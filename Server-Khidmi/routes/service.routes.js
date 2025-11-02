const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middlewares/auth.middleware');
const { uploadSingle, handleMulterError } = require('../middlewares/upload.middleware');
const {
  getServices,
  getService,
  createService,
  updateService,
  deleteService,
  getServicesByCategory
} = require('../controllers/service.controller');

// Public routes
router.get('/', getServices);
router.get('/category/:category', getServicesByCategory);
router.get('/:id', getService);

// Protected routes (Admin only)
router.post('/', protect, authorize('admin'), uploadSingle, handleMulterError, createService);
router.put('/:id', protect, authorize('admin'), uploadSingle, handleMulterError, updateService);
router.delete('/:id', protect, authorize('admin'), deleteService);

module.exports = router;



