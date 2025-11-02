const Review = require('../models/Review');
const Booking = require('../models/Booking');
const User = require('../models/User');

// @desc    Get reviews
// @route   GET /api/reviews
// @access  Public
exports.getReviews = async (req, res, next) => {
  try {
    const { prestataire } = req.query;
    
    let query = {};

    if (prestataire) {
      query.prestataire = prestataire;
    }

    const reviews = await Review.find(query)
      .populate('client', 'name avatar')
      .populate('prestataire', 'name')
      .sort('-createdAt');

    res.json({
      success: true,
      count: reviews.length,
      reviews
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get review by ID
// @route   GET /api/reviews/:id
// @access  Public
exports.getReview = async (req, res, next) => {
  try {
    const review = await Review.findById(req.params.id)
      .populate('client', 'name email avatar')
      .populate('prestataire', 'name avatar')
      .populate('booking');

    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'Avis non trouvé'
      });
    }

    res.json({
      success: true,
      review
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Create review
// @route   POST /api/reviews
// @access  Private
exports.createReview = async (req, res, next) => {
  try {
    const { prestataire, booking, rating, comment } = req.body;

    // Vérifier que la réservation existe et est complétée
    const bookingExists = await Booking.findOne({
      _id: booking,
      client: req.user.id,
      prestataire: prestataire,
      status: 'completed'
    });

    if (!bookingExists) {
      return res.status(404).json({
        success: false,
        message: 'Réservation non trouvée ou non complétée'
      });
    }

    // Vérifier si l'avis existe déjà
    const reviewExists = await Review.findOne({ 
      client: req.user.id, 
      booking: booking 
    });

    if (reviewExists) {
      return res.status(400).json({
        success: false,
        message: 'Vous avez déjà laissé un avis pour cette réservation'
      });
    }

    // Créer l'avis
    const review = await Review.create({
      client: req.user.id,
      prestataire,
      booking,
      rating,
      comment
    });

    // Mettre à jour la note moyenne du prestataire
    await updatePrestataireRating(prestataire);

    await review.populate('client', 'name avatar');

    res.status(201).json({
      success: true,
      review
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Update review
// @route   PUT /api/reviews/:id
// @access  Private
exports.updateReview = async (req, res, next) => {
  try {
    let review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'Avis non trouvé'
      });
    }

    // Vérifier que c'est le propriétaire
    if (review.client.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Non autorisé'
      });
    }

    // Mettre à jour
    review.rating = req.body.rating || review.rating;
    review.comment = req.body.comment || review.comment;
    
    review = await review.save();

    // Mettre à jour la note moyenne du prestataire
    await updatePrestataireRating(review.prestataire);

    res.json({
      success: true,
      review
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Delete review
// @route   DELETE /api/reviews/:id
// @access  Private
exports.deleteReview = async (req, res, next) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'Avis non trouvé'
      });
    }

    // Vérifier les permissions
    if (review.client.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Non autorisé'
      });
    }

    const prestataireId = review.prestataire;

    await review.remove();

    // Mettre à jour la note moyenne du prestataire
    await updatePrestataireRating(prestataireId);

    res.json({
      success: true,
      message: 'Avis supprimé'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Helper function pour mettre à jour la note moyenne
const updatePrestataireRating = async (prestataireId) => {
  const stats = await Review.aggregate([
    {
      $match: { prestataire: prestataireId }
    },
    {
      $group: {
        _id: '$prestataire',
        averageRating: { $avg: '$rating' },
        numReviews: { $sum: 1 }
      }
    }
  ]);

  if (stats.length > 0) {
    await User.findByIdAndUpdate(prestataireId, {
      rating: stats[0].averageRating.toFixed(1),
      numReviews: stats[0].numReviews
    });
  }
};

