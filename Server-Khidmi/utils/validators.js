const { body } = require('express-validator');

// Validation pour register
exports.validateRegister = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Le nom est requis')
    .isLength({ min: 2, max: 50 })
    .withMessage('Le nom doit contenir entre 2 et 50 caractères'),
  
  body('email')
    .trim()
    .notEmpty()
    .withMessage('L\'email est requis')
    .isEmail()
    .withMessage('Email invalide')
    .normalizeEmail(),
  
  body('phone')
    .trim()
    .notEmpty()
    .withMessage('Le téléphone est requis')
    .matches(/^(?:(?:\+|00)212|0)[5-7](?:[.\s\-]?)(?:[0-9][.\s\-]?){8}$/)
    .withMessage('Numéro de téléphone marocain invalide'),
  
  body('password')
    .trim()
    .notEmpty()
    .withMessage('Le mot de passe est requis')
    .isLength({ min: 6 })
    .withMessage('Le mot de passe doit contenir au moins 6 caractères'),
  
  body('role')
    .optional()
    .isIn(['client', 'prestataire'])
    .withMessage('Role invalide')
];

// Validation pour login
exports.validateLogin = [
  body('email')
    .trim()
    .notEmpty()
    .withMessage('L\'email est requis')
    .isEmail()
    .withMessage('Email invalide'),
  
  body('password')
    .trim()
    .notEmpty()
    .withMessage('Le mot de passe est requis')
];

// Validation pour update password
exports.validateUpdatePassword = [
  body('currentPassword')
    .trim()
    .notEmpty()
    .withMessage('Le mot de passe actuel est requis'),
  
  body('newPassword')
    .trim()
    .notEmpty()
    .withMessage('Le nouveau mot de passe est requis')
    .isLength({ min: 6 })
    .withMessage('Le mot de passe doit contenir au moins 6 caractères')
];

