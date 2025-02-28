const Listing = require('../models/listing.model');

class ListingService {
  async create(listingData) {
    const listing = new Listing({
      ...listingData,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    return await listing.save();
  }

  async getAll() {
    return await Listing.find().sort({ createdAt: -1 });
  }

  async getByUser(userId) {
    return await Listing.find({ userId }).sort({ createdAt: -1 });
  }

  async getById(id) {
    return await Listing.findById(id);
  }

  async update(id, updateData) {
    return await Listing.findByIdAndUpdate(id, 
      { 
        ...updateData,
        updatedAt: new Date()
      }, 
      { new: true }
    );
  }

  async delete(id) {
    return await Listing.findByIdAndDelete(id);
  }
}

module.exports = new ListingService(); 