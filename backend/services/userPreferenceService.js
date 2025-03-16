const UserPreference = require('../models/UserPreference');

/**
 * Get user preferences by user ID
 * @param {String} userId - User ID
 * @returns {Promise<Object>} - User preferences
 */
const getUserPreferences = async (userId) => {
  try {
    const preferences = await UserPreference.findOne({ userId });
    return preferences;
  } catch (error) {
    console.error('Error fetching user preferences:', error.message);
    throw error;
  }
};

/**
 * Create or update user preferences
 * @param {String} userId - User ID
 * @param {Object} data - User preference data
 * @returns {Promise<Object>} - Updated user preferences
 */
const updateUserPreferences = async (userId, data) => {
  try {
    const { major, interests, completedCourses } = data;
    
    // Find existing preferences or create new ones
    let preferences = await UserPreference.findOne({ userId });
    
    if (preferences) {
      // Update existing preferences
      preferences.major = major || preferences.major;
      
      if (interests) {
        preferences.interests = interests;
      }
      
      if (completedCourses) {
        preferences.completedCourses = completedCourses;
      }
      
      preferences.updatedAt = Date.now();
      
      await preferences.save();
    } else {
      // Create new preferences
      preferences = await UserPreference.create({
        userId,
        major: major || 'Undecided',
        interests: interests || [],
        completedCourses: completedCourses || [],
        savedRecommendations: []
      });
    }
    
    return preferences;
  } catch (error) {
    console.error('Error updating user preferences:', error.message);
    throw error;
  }
};

/**
 * Save a recommendation for a user
 * @param {String} userId - User ID
 * @param {Object} recommendation - Recommendation data
 * @returns {Promise<Object>} - Updated user preferences
 */
const saveRecommendation = async (userId, recommendation) => {
  try {
    const { query, courses } = recommendation;
    
    // Find existing preferences or create new ones
    let preferences = await UserPreference.findOne({ userId });
    
    if (!preferences) {
      throw new Error('User preferences not found');
    }
    
    // Add recommendation to saved recommendations
    preferences.savedRecommendations.push({
      query,
      courses,
      timestamp: Date.now()
    });
    
    preferences.updatedAt = Date.now();
    
    await preferences.save();
    
    return preferences;
  } catch (error) {
    console.error('Error saving recommendation:', error.message);
    throw error;
  }
};

module.exports = {
  getUserPreferences,
  updateUserPreferences,
  saveRecommendation
}; 