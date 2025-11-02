const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middlewares/auth.middleware');
const {
  createPaymentIntent,
  confirmBookingPayment,
  confirmSubscriptionPayment,
  getPaymentHistory,
  getPaymentStats,
  refundPayment
} = require('../controllers/payment.controller');

// All routes require authentication
router.use(protect);

router.get('/history', getPaymentHistory);
router.get('/stats', getPaymentStats);
router.post('/intent', createPaymentIntent);
router.post('/booking/:bookingId', confirmBookingPayment);
router.post('/subscription/:subscriptionId', confirmSubscriptionPayment);
router.post('/refund/:paymentId', authorize('admin'), refundPayment);

module.exports = router;

