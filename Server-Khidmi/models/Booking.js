const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Le client est requis']
  },
  prestataire: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Le prestataire est requis']
  },
  service: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Service',
    required: [true, 'Le service est requis']
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'in_progress', 'completed', 'cancelled', 'rejected'],
    default: 'pending'
  },
  description: {
    type: String,
    required: [true, 'La description est requise']
  },
  location: {
    type: String,
    required: [true, 'L\'adresse est requise']
  },
  coordinates: {
    latitude: Number,
    longitude: Number
  },
  scheduledDate: {
    type: Date,
    required: [true, 'La date est requise']
  },
  completedDate: {
    type: Date
  },
  price: {
    type: Number,
    required: [true, 'Le prix est requis']
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'failed'],
    default: 'pending'
  },
  paymentMethod: {
    type: String,
    enum: ['cash', 'card', 'mobile', 'wallet'],
    default: 'cash'
  },
  notes: {
    type: String,
    default: ''
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Booking', bookingSchema);

