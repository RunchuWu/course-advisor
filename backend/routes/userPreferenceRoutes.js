const express = require('express');
const router = express.Router();
const userPreferenceController = require('../controllers/userPreferenceController');

// Get user preferences
router.get('/users/:userId/preferences', userPreferenceController.getUserPreferences);

// Update user preferences
router.put('/users/:userId/preferences', userPreferenceController.updateUserPreferences);

// Save a recommendation
router.post('/users/:userId/recommendations', userPreferenceController.saveRecommendation);

module.exports = router; 