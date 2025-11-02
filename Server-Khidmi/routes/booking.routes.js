const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/auth.middleware');
const {
  getBookings,
  getBooking,
  createBooking,
  updateBookingStatus,
  updateBooking,
  deleteBooking,
  getBookingsByStatus
} = require('../controllers/booking.controller');

// All routes require authentication
router.use(protect);

router.get('/', getBookings);
router.get('/status/:status', getBookingsByStatus);
router.get('/:id', getBooking);
router.post('/', createBooking);
router.put('/:id/status', updateBookingStatus);
router.put('/:id', updateBooking);
router.delete('/:id', deleteBooking);

module.exports = router;

