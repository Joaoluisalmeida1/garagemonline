const mongoose = require('mongoose');

const listingSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: String,
  price: {
    type: Number,
    required: true
  },
  brand: {
    type: String,
    required: true
  },
  model: {
    type: String,
    required: true
  },
  year: {
    type: Number,
    required: true
  },
  mileage: {
    type: Number,
    required: true
  },
  location: String,
  images: [String],
  userId: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['active', 'sold', 'inactive'],
    default: 'active'
  },
  views: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Listing', listingSchema); 