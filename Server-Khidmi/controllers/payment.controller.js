const Booking = require('../models/Booking');
const Subscription = require('../models/Subscription');

// @desc    Create payment intent
// @route   POST /api/payments/intent
// @access  Private
exports.createPaymentIntent = async (req, res, next) => {
  try {
    const { amount, currency = 'MAD', bookingId, subscriptionId } = req.body;

    // TODO: Intégrer avec votre gateway de paiement (CMI, Stripe, etc.)
    // Pour l'instant, on simule
    const clientSecret = `pi_${Date.now()}_secret_${Math.random()}`;

    res.json({
      success: true,
      clientSecret,
      amount,
      currency
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Confirm payment for booking
// @route   POST /api/payments/booking/:bookingId
// @access  Private
exports.confirmBookingPayment = async (req, res, next) => {
  try {
    const { paymentMethod } = req.body;

    const booking = await Booking.findById(req.params.bookingId);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Réservation non trouvée'
      });
    }

    // Vérifier que c'est le client
    if (booking.client.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Non autorisé'
      });
    }

    // Mettre à jour le statut de paiement
    booking.paymentStatus = 'paid';
    booking.paymentMethod = paymentMethod;
    await booking.save();

    res.json({
      success: true,
      message: 'Paiement confirmé',
      booking
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Confirm payment for subscription
// @route   POST /api/payments/subscription/:subscriptionId
// @access  Private
exports.confirmSubscriptionPayment = async (req, res, next) => {
  try {
    const { paymentMethod } = req.body;

    const subscription = await Subscription.findById(req.params.subscriptionId);

    if (!subscription) {
      return res.status(404).json({
        success: false,
        message: 'Abonnement non trouvé'
      });
    }

    // Vérifier que c'est le propriétaire
    if (subscription.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Non autorisé'
      });
    }

    // Mettre à jour le statut de paiement
    subscription.paymentStatus = 'paid';
    await subscription.save();

    res.json({
      success: true,
      message: 'Paiement confirmé',
      subscription
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get payment history
// @route   GET /api/payments/history
// @access  Private
exports.getPaymentHistory = async (req, res, next) => {
  try {
    const userId = req.user.id;

    // Récupérer les paiements de réservations
    const bookingPayments = await Booking.find({
      client: userId,
      paymentStatus: 'paid'
    })
      .select('_id price paymentMethod createdAt description')
      .populate('service', 'name')
      .sort('-createdAt');

    // Récupérer les paiements d'abonnements
    const subscriptionPayments = await Subscription.find({
      user: userId,
      paymentStatus: 'paid'
    })
      .select('_id price paymentMethod createdAt plan')
      .sort('-createdAt');

    // Combiner et trier
    const allPayments = [
      ...bookingPayments.map(p => ({
        id: p._id,
        type: 'booking',
        amount: p.price,
        paymentMethod: p.paymentMethod,
        date: p.createdAt,
        description: p.description || p.service.name
      })),
      ...subscriptionPayments.map(p => ({
        id: p._id,
        type: 'subscription',
        amount: p.price,
        paymentMethod: p.paymentMethod,
        date: p.createdAt,
        description: `Abonnement ${p.plan}`
      }))
    ].sort((a, b) => new Date(b.date) - new Date(a.date));

    res.json({
      success: true,
      count: allPayments.length,
      payments: allPayments
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get payment statistics
// @route   GET /api/payments/stats
// @access  Private
exports.getPaymentStats = async (req, res, next) => {
  try {
    const userId = req.user.id;

    // Stats bookings
    const bookingStats = await Booking.aggregate([
      {
        $match: {
          client: userId,
          paymentStatus: 'paid'
        }
      },
      {
        $group: {
          _id: null,
          totalSpent: { $sum: '$price' },
          count: { $sum: 1 },
          averageAmount: { $avg: '$price' }
        }
      }
    ]);

    // Stats subscriptions
    const subscriptionStats = await Subscription.aggregate([
      {
        $match: {
          user: userId,
          paymentStatus: 'paid'
        }
      },
      {
        $group: {
          _id: null,
          totalSpent: { $sum: '$price' },
          count: { $sum: 1 },
          averageAmount: { $avg: '$price' }
        }
      }
    ]);

    const bookingTotal = bookingStats[0]?.totalSpent || 0;
    const subscriptionTotal = subscriptionStats[0]?.totalSpent || 0;

    res.json({
      success: true,
      stats: {
        totalSpent: bookingTotal + subscriptionTotal,
        bookingSpent: bookingTotal,
        subscriptionSpent: subscriptionTotal,
        bookingCount: bookingStats[0]?.count || 0,
        subscriptionCount: subscriptionStats[0]?.count || 0,
        averageBookingAmount: bookingStats[0]?.averageAmount || 0,
        averageSubscriptionAmount: subscriptionStats[0]?.averageAmount || 0
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Refund payment
// @route   POST /api/payments/refund/:paymentId
// @access  Private/Admin
exports.refundPayment = async (req, res, next) => {
  try {
    const { paymentId } = req.params;
    const { type } = req.body; // 'booking' or 'subscription'

    // TODO: Intégrer avec votre gateway de paiement
    // Pour l'instant, on simule

    if (type === 'booking') {
      const booking = await Booking.findById(paymentId);
      if (booking) {
        booking.paymentStatus = 'refunded';
        await booking.save();
      }
    }

    res.json({
      success: true,
      message: 'Remboursement effectué'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

