const userPreferenceService = require('../services/userPreferenceService');

/**
 * Get user preferences
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getUserPreferences = async (req, res) => {
  try {
    const { userId } = req.params;
    
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: 'User ID is required'
      });
    }
    
    const preferences = await userPreferenceService.getUserPreferences(userId);
    
    if (!preferences) {
      return res.status(404).json({
        success: false,
        message: 'User preferences not found'
      });
    }
    
    return res.status(200).json({
      success: true,
      data: preferences
    });
  } catch (error) {
    console.error('Error fetching user preferences:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

/**
 * Update user preferences
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const updateUserPreferences = async (req, res) => {
  try {
    const { userId } = req.params;
    const { major, interests, completedCourses } = req.body;
    
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: 'User ID is required'
      });
    }
    
    const preferences = await userPreferenceService.updateUserPreferences(userId, {
      major,
      interests,
      completedCourses
    });
    
    return res.status(200).json({
      success: true,
      data: preferences
    });
  } catch (error) {
    console.error('Error updating user preferences:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

/**
 * Save a recommendation
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const saveRecommendation = async (req, res) => {
  try {
    const { userId } = req.params;
    const { query, courses } = req.body;
    
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: 'User ID is required'
      });
    }
    
    if (!query || !courses) {
      return res.status(400).json({
        success: false,
        message: 'Query and courses are required'
      });
    }
    
    const preferences = await userPreferenceService.saveRecommendation(userId, {
      query,
      courses
    });
    
    return res.status(200).json({
      success: true,
      data: preferences
    });
  } catch (error) {
    console.error('Error saving recommendation:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

module.exports = {
  getUserPreferences,
  updateUserPreferences,
  saveRecommendation
}; 