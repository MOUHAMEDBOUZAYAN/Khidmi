const User = require('../models/User');
const cloudinary = require('../config/cloudinary');
const { formatUser } = require('../utils/helpers');

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find({});
    
    res.json({
      success: true,
      count: users.length,
      users
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private
exports.getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Utilisateur non trouvé'
      });
    }

    res.json({
      success: true,
      user: formatUser(user)
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private
exports.updateUser = async (req, res, next) => {
  try {
    let user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Utilisateur non trouvé'
      });
    }

    // Vérifier si l'utilisateur est le propriétaire ou admin
    if (user._id.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Vous n\'êtes pas autorisé à modifier ce profil'
      });
    }

    // Mettre à jour les champs
    const fieldsToUpdate = ['name', 'phone', 'profession', 'bio', 'location'];
    fieldsToUpdate.forEach(field => {
      if (req.body[field]) {
        user[field] = req.body[field];
      }
    });

    user = await user.save();

    res.json({
      success: true,
      user: formatUser(user)
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Upload user avatar
// @route   POST /api/users/:id/avatar
// @access  Private
exports.uploadAvatar = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Utilisateur non trouvé'
      });
    }

    // Vérifier si l'utilisateur est le propriétaire
    if (user._id.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Vous n\'êtes pas autorisé'
      });
    }

    // Upload vers Cloudinary
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: 'khidmi/avatars',
        width: 500,
        height: 500,
        crop: 'limit'
      });

      user.avatar = result.secure_url;
      await user.save();
    }

    res.json({
      success: true,
      user: formatUser(user)
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
exports.deleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Utilisateur non trouvé'
      });
    }

    await user.remove();

    res.json({
      success: true,
      message: 'Utilisateur supprimé'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get prestataires
// @route   GET /api/users/prestataires
// @access  Public
exports.getPrestataires = async (req, res, next) => {
  try {
    const { city, profession } = req.query;
    
    let query = { role: 'prestataire', isActive: true };

    if (city) {
      query['location.city'] = city;
    }

    if (profession) {
      query.profession = profession;
    }

    const prestataires = await User.find(query).sort({ rating: -1 });

    res.json({
      success: true,
      count: prestataires.length,
      prestataires
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get prestataire by ID
// @route   GET /api/users/prestataires/:id
// @access  Public
exports.getPrestataire = async (req, res, next) => {
  try {
    const prestataire = await User.findOne({ 
      _id: req.params.id, 
      role: 'prestataire',
      isActive: true 
    });

    if (!prestataire) {
      return res.status(404).json({
        success: false,
        message: 'Prestataire non trouvé'
      });
    }

    res.json({
      success: true,
      prestataire: formatUser(prestataire)
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


