const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const userController = require('../controllers/user.controller');

// Get user stats
router.get('/:id/stats', auth, async (req, res) => {
  try {
    // For now, return dummy stats
    res.json({
      activeListings: 0,
      totalViews: 0,
      totalListings: 0
    });
  } catch (error) {
    console.error('Error fetching user stats:', error);
    res.status(500).json({ message: 'Error fetching user stats' });
  }
});

router.get('/:id', auth, userController.getProfile);
router.put('/:id', auth, userController.updateProfile);

module.exports = router; 