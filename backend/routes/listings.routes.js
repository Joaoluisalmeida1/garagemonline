const express = require('express');
const router = express.Router();
const listingsController = require('../controllers/listings.controller');
const upload = require('../middleware/upload');
const auth = require('../middleware/auth');

// Test endpoint
router.get('/test', (req, res) => {
  res.json({ message: 'Listings route is working' });
});

// Create new listing with image upload
router.post('/', auth, upload.array('images', 10), listingsController.createListing);

// Get all listings (with optional filters)
router.get('/', listingsController.getListings);

// Get listings by user ID
router.get('/user/:id', auth, listingsController.getListingsByUser);

// Get single listing
router.get('/:id', listingsController.getListingById);

module.exports = router; 