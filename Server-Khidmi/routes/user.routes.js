const express = require('express');
const router = express.Router();
const { protect, authorize, checkLanguage } = require('../middlewares/auth.middleware');
const { uploadSingle, handleMulterError } = require('../middlewares/upload.middleware');
const {
  getUsers,
  getUser,
  updateUser,
  uploadAvatar,
  deleteUser,
  getPrestataires,
  getPrestataire
} = require('../controllers/user.controller');

// Public routes
router.get('/prestataires', getPrestataires);
router.get('/prestataires/:id', getPrestataire);

// Protected routes
router.get('/', protect, authorize('admin'), getUsers);
router.get('/:id', protect, getUser);
router.put('/:id', protect, updateUser);
router.post('/:id/avatar', protect, uploadSingle, handleMulterError, uploadAvatar);
router.delete('/:id', protect, authorize('admin'), deleteUser);

module.exports = router;



