const Listing = require('../models/listing.model');

// Temporary storage for listings (replace with MongoDB later)
let listings = [];

exports.createListing = async (req, res) => {
  try {
    const listingData = {
      ...req.body,
      userId: req.body.userId || '123', // Temporary hardcoded user ID
      images: req.files ? req.files.map(file => file.path) : [],
      createdAt: new Date(),
      updatedAt: new Date(),
      status: 'active',
      views: 0
    };

    // For now, store in memory
    const newListing = { id: Date.now().toString(), ...listingData };
    listings.push(newListing);

    console.log('Created new listing:', newListing);
    res.status(201).json(newListing);
  } catch (error) {
    console.error('Error creating listing:', error);
    res.status(500).json({ message: 'Error creating listing' });
  }
};

exports.getListings = async (req, res) => {
  try {
    // Add basic filtering
    let filteredListings = [...listings];
    
    if (req.query.brand) {
      filteredListings = filteredListings.filter(l => 
        l.brand.toLowerCase().includes(req.query.brand.toLowerCase())
      );
    }
    
    if (req.query.minPrice) {
      filteredListings = filteredListings.filter(l => 
        l.price >= Number(req.query.minPrice)
      );
    }
    
    if (req.query.maxPrice) {
      filteredListings = filteredListings.filter(l => 
        l.price <= Number(req.query.maxPrice)
      );
    }

    res.json(filteredListings);
  } catch (error) {
    console.error('Error fetching listings:', error);
    res.status(500).json({ message: 'Error fetching listings' });
  }
};

exports.getListingsByUser = async (req, res) => {
  try {
    const userListings = listings.filter(l => l.userId === req.params.id);
    res.json(userListings);
  } catch (error) {
    console.error('Error fetching user listings:', error);
    res.status(500).json({ message: 'Error fetching user listings' });
  }
};

exports.getListingById = async (req, res) => {
  try {
    const listing = listings.find(l => l.id === req.params.id);
    if (!listing) {
      return res.status(404).json({ message: 'Listing not found' });
    }
    
    // Increment views
    listing.views += 1;
    
    res.json(listing);
  } catch (error) {
    console.error('Error fetching listing:', error);
    res.status(500).json({ message: 'Error fetching listing' });
  }
}; 