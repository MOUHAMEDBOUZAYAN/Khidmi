const Subscription = require('../models/Subscription');
const User = require('../models/User');

// @desc    Get subscriptions
// @route   GET /api/subscriptions
// @access  Private
exports.getSubscriptions = async (req, res, next) => {
  try {
    let query = {};

    // Si non admin, seulement ses abonnements
    if (req.user.role !== 'admin') {
      query.user = req.user.id;
    }

    const subscriptions = await Subscription.find(query)
      .populate('user', 'name email phone')
      .sort('-createdAt');

    res.json({
      success: true,
      count: subscriptions.length,
      subscriptions
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get subscription by ID
// @route   GET /api/subscriptions/:id
// @access  Private
exports.getSubscription = async (req, res, next) => {
  try {
    const subscription = await Subscription.findById(req.params.id)
      .populate('user', 'name email phone');

    if (!subscription) {
      return res.status(404).json({
        success: false,
        message: 'Abonnement non trouvé'
      });
    }

    res.json({
      success: true,
      subscription
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Create subscription
// @route   POST /api/subscriptions
// @access  Private
exports.createSubscription = async (req, res, next) => {
  try {
    const { plan, price } = req.body;

    // Calculer la date de fin
    const startDate = new Date();
    const endDate = new Date();
    
    if (plan === 'monthly') {
      endDate.setMonth(endDate.getMonth() + 1);
    } else if (plan === 'yearly') {
      endDate.setFullYear(endDate.getFullYear() + 1);
    }

    // Créer l'abonnement
    const subscription = await Subscription.create({
      user: req.user.id,
      plan,
      price,
      startDate,
      endDate
    });

    // Mettre à jour le statut premium de l'utilisateur
    await User.findByIdAndUpdate(req.user.id, { isPremium: true });

    await subscription.populate('user', 'name email phone');

    res.status(201).json({
      success: true,
      subscription
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Update subscription
// @route   PUT /api/subscriptions/:id
// @access  Private/Admin
exports.updateSubscription = async (req, res, next) => {
  try {
    let subscription = await Subscription.findById(req.params.id);

    if (!subscription) {
      return res.status(404).json({
        success: false,
        message: 'Abonnement non trouvé'
      });
    }

    // Mettre à jour
    const fieldsToUpdate = ['status', 'paymentStatus'];
    fieldsToUpdate.forEach(field => {
      if (req.body[field]) {
        subscription[field] = req.body[field];
      }
    });

    subscription = await subscription.save();

    // Si l'abonnement est expiré, mettre à jour le statut premium
    if (subscription.status === 'expired' || subscription.status === 'cancelled') {
      await User.findByIdAndUpdate(subscription.user, { isPremium: false });
    }

    res.json({
      success: true,
      subscription
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Cancel subscription
// @route   PUT /api/subscriptions/:id/cancel
// @access  Private
exports.cancelSubscription = async (req, res, next) => {
  try {
    const subscription = await Subscription.findById(req.params.id);

    if (!subscription) {
      return res.status(404).json({
        success: false,
        message: 'Abonnement non trouvé'
      });
    }

    // Vérifier que c'est le propriétaire
    if (subscription.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Non autorisé'
      });
    }

    subscription.status = 'cancelled';
    await subscription.save();

    // Mettre à jour le statut premium
    await User.findByIdAndUpdate(subscription.user, { isPremium: false });

    res.json({
      success: true,
      message: 'Abonnement annulé'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Check subscription status
// @route   GET /api/subscriptions/check/my
// @access  Private
exports.checkMySubscription = async (req, res, next) => {
  try {
    const subscription = await Subscription.findOne({
      user: req.user.id,
      status: 'active'
    });

    if (!subscription) {
      return res.json({
        success: true,
        isActive: false,
        message: 'Aucun abonnement actif'
      });
    }

    // Vérifier si l'abonnement a expiré
    if (new Date() > subscription.endDate) {
      subscription.status = 'expired';
      await subscription.save();
      await User.findByIdAndUpdate(req.user.id, { isPremium: false });

      return res.json({
        success: true,
        isActive: false,
        message: 'Abonnement expiré'
      });
    }

    res.json({
      success: true,
      isActive: true,
      subscription
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

