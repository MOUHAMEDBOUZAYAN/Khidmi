const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Protect routes - vérifier JWT
exports.protect = async (req, res, next) => {
  let token;

  // Récupérer le token du header
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  // Vérifier si le token existe
  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Non autorisé, pas de token'
    });
  }

  try {
    // Vérifier le token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Récupérer l'utilisateur
    req.user = await User.findById(decoded.id).select('-password');

    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Utilisateur non trouvé'
      });
    }

    // Vérifier si le compte est actif
    if (!req.user.isActive) {
      return res.status(401).json({
        success: false,
        message: 'Votre compte est désactivé'
      });
    }

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Token invalide'
    });
  }
};

// Autoriser certains rôles
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `Le rôle ${req.user.role} n'est pas autorisé`
      });
    }
    next();
  };
};

// Vérifier si l'utilisateur est prestataire
exports.prestataireOnly = (req, res, next) => {
  if (req.user.role !== 'prestataire' && req.user.role !== 'admin') {
    return res.status(403).json({
      success: false,
      message: 'Accès réservé aux prestataires'
    });
  }
  next();
};

// Vérifier si l'utilisateur est client
exports.clientOnly = (req, res, next) => {
  if (req.user.role !== 'client' && req.user.role !== 'admin') {
    return res.status(403).json({
      success: false,
      message: 'Accès réservé aux clients'
    });
  }
  next();
};

