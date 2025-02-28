const User = require('../models/user.model');

class UserService {
  async getProfile(userId) {
    return await User.findById(userId).select('-password');
  }

  async updateProfile(userId, updateData) {
    return await User.findByIdAndUpdate(
      userId,
      { 
        ...updateData,
        updatedAt: new Date()
      },
      { new: true }
    ).select('-password');
  }

  async getUserStats(userId) {
    // Get user's listings count, views, etc.
    const stats = await User.aggregate([
      { $match: { _id: userId } },
      {
        $lookup: {
          from: 'listings',
          localField: '_id',
          foreignField: 'userId',
          as: 'listings'
        }
      },
      {
        $project: {
          activeListings: { $size: '$listings' },
          totalViews: { $sum: '$listings.views' },
          // Add other stats as needed
        }
      }
    ]);
    return stats[0];
  }
}

module.exports = new UserService(); 