const Booking = require('../models/Booking');
const User = require('../models/User');
const { BOOKING_STATUS } = require('../utils/constants');

// @desc    Get all bookings
// @route   GET /api/bookings
// @access  Private
exports.getBookings = async (req, res, next) => {
  try {
    let query = {};

    // Si client, seulement ses réservations
    if (req.user.role === 'client') {
      query.client = req.user.id;
    }

    // Si prestataire, seulement ses réservations
    if (req.user.role === 'prestataire') {
      query.prestataire = req.user.id;
    }

    const bookings = await Booking.find(query)
      .populate('client', 'name email phone avatar')
      .populate('prestataire', 'name email phone avatar profession rating')
      .populate('service', 'name category')
      .sort('-createdAt');

    res.json({
      success: true,
      count: bookings.length,
      bookings
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get booking by ID
// @route   GET /api/bookings/:id
// @access  Private
exports.getBooking = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('client', 'name email phone avatar')
      .populate('prestataire', 'name email phone avatar profession rating bio')
      .populate('service', 'name category');

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Réservation non trouvée'
      });
    }

    res.json({
      success: true,
      booking
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Create booking
// @route   POST /api/bookings
// @access  Private
exports.createBooking = async (req, res, next) => {
  try {
    const { prestataire, service, description, location, coordinates, scheduledDate, price } = req.body;

    // Vérifier que le prestataire existe et est actif
    const prestataireExists = await User.findOne({ 
      _id: prestataire, 
      role: 'prestataire', 
      isActive: true 
    });

    if (!prestataireExists) {
      return res.status(404).json({
        success: false,
        message: 'Prestataire non trouvé ou inactif'
      });
    }

    // Créer la réservation
    const booking = await Booking.create({
      client: req.user.id,
      prestataire,
      service,
      description,
      location,
      coordinates,
      scheduledDate,
      price,
      status: BOOKING_STATUS.PENDING
    });

    // Populate pour retour
    await booking.populate('client', 'name email phone');
    await booking.populate('prestataire', 'name phone');
    await booking.populate('service', 'name');

    res.status(201).json({
      success: true,
      booking
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Update booking status
// @route   PUT /api/bookings/:id/status
// @access  Private
exports.updateBookingStatus = async (req, res, next) => {
  try {
    const { status } = req.body;

    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Réservation non trouvée'
      });
    }

    // Vérifier les permissions
    if (req.user.role === 'client' && booking.client.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Non autorisé'
      });
    }

    if (req.user.role === 'prestataire' && booking.prestataire.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Non autorisé'
      });
    }

    // Valider les transitions de statut
    if (req.user.role === 'client') {
      if (!['cancelled'].includes(status)) {
        return res.status(400).json({
          success: false,
          message: 'Action non autorisée pour le client'
        });
      }
    }

    if (req.user.role === 'prestataire') {
      if (!['accepted', 'rejected', 'in_progress', 'completed'].includes(status)) {
        return res.status(400).json({
          success: false,
          message: 'Action non autorisée pour le prestataire'
        });
      }
    }

    booking.status = status;

    // Si complété, mettre la date
    if (status === BOOKING_STATUS.COMPLETED) {
      booking.completedDate = Date.now();
    }

    await booking.save();

    res.json({
      success: true,
      booking
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Update booking
// @route   PUT /api/bookings/:id
// @access  Private
exports.updateBooking = async (req, res, next) => {
  try {
    let booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Réservation non trouvée'
      });
    }

    // Vérifier les permissions
    if (booking.client.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Non autorisé'
      });
    }

    // Mise à jour des champs
    const fieldsToUpdate = ['description', 'location', 'scheduledDate', 'price', 'notes'];
    fieldsToUpdate.forEach(field => {
      if (req.body[field]) {
        booking[field] = req.body[field];
      }
    });

    booking = await booking.save();

    res.json({
      success: true,
      booking
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Delete booking
// @route   DELETE /api/bookings/:id
// @access  Private
exports.deleteBooking = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Réservation non trouvée'
      });
    }

    // Vérifier les permissions
    if (booking.client.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Non autorisé'
      });
    }

    await booking.remove();

    res.json({
      success: true,
      message: 'Réservation supprimée'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get bookings by status
// @route   GET /api/bookings/status/:status
// @access  Private
exports.getBookingsByStatus = async (req, res, next) => {
  try {
    let query = { status: req.params.status };

    if (req.user.role === 'client') {
      query.client = req.user.id;
    }

    if (req.user.role === 'prestataire') {
      query.prestataire = req.user.id;
    }

    const bookings = await Booking.find(query)
      .populate('client', 'name email phone avatar')
      .populate('prestataire', 'name email phone avatar profession rating')
      .populate('service', 'name category')
      .sort('-createdAt');

    res.json({
      success: true,
      count: bookings.length,
      bookings
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

