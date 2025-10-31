const i18next = require('../config/i18n');

// Middleware pour obtenir l'objet t (translate)
exports.translate = (req, res, next) => {
  req.t = i18next.getFixedT(req.language || 'fr');
  next();
};

// Middleware pour vérifier si la langue est supportée
exports.checkLanguage = (req, res, next) => {
  const supportedLanguages = ['fr', 'en', 'ar'];
  const lang = req.headers['accept-language'] || 'fr';
  
  if (supportedLanguages.includes(lang)) {
    req.language = lang;
  } else {
    req.language = 'fr'; // Default
  }
  
  next();
};

