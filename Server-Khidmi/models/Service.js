const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Le nom du service est requis']
  },
  description: {
    type: String,
    required: [true, 'La description est requise']
  },
  category: {
    type: String,
    required: [true, 'La catégorie est requise'],
    enum: ['electricite', 'plomberie', 'menage', 'coiffure', 'peinture', 'menuiserie', 'autres']
  },
  icon: {
    type: String, // URL de l'icône
    default: ''
  },
  image: {
    type: String, // URL de l'image principale
    default: ''
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Service', serviceSchema);

