const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middlewares/auth.middleware');
const {
  getSubscriptions,
  getSubscription,
  createSubscription,
  updateSubscription,
  cancelSubscription,
  checkMySubscription
} = require('../controllers/subscription.controller');

// All routes require authentication
router.use(protect);

router.get('/check/my', checkMySubscription);
router.get('/', getSubscriptions);
router.get('/:id', getSubscription);
router.post('/', createSubscription);
router.put('/:id', authorize('admin'), updateSubscription);
router.put('/:id/cancel', cancelSubscription);

module.exports = router;

