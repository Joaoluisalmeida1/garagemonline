// Temporary in-memory storage
const dummyUser = {
  id: "123",
  name: "Test User",
  email: "test@test.com",
  createdAt: new Date()
};

exports.getUserStats = async (req, res) => {
  try {
    // Return dummy stats
    const stats = {
      activeListings: 0,
      totalViews: 0,
      totalListings: 0
    };
    res.json(stats);
  } catch (error) {
    console.error('Error getting user stats:', error);
    res.status(500).json({ message: 'Error getting user stats' });
  }
};

exports.getProfile = async (req, res) => {
  try {
    res.json(dummyUser);
  } catch (error) {
    console.error('Error getting user profile:', error);
    res.status(500).json({ message: 'Error getting user profile' });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    // Just return the dummy user for now
    res.json(dummyUser);
  } catch (error) {
    console.error('Error updating user profile:', error);
    res.status(500).json({ message: 'Error updating user profile' });
  }
}; 