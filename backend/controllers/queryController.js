// Choose which service to use
// For production with DeepSeek API:
const deepseekService = require('../services/deepseekService');
// For development without DeepSeek API:
// const deepseekService = require('../services/mockDeepseekService');

/**
 * Process a course recommendation query
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const processQuery = async (req, res) => {
  try {
    const { major, interests, query } = req.body;
    
    console.log('Received query:', { major, interests, query });
    
    // Validate input
    if (!query) {
      return res.status(400).json({ 
        success: false, 
        message: 'Query is required' 
      });
    }
    
    // Generate recommendations using DeepSeek API or mock service
    const recommendations = await deepseekService.generateRecommendations({
      major,
      interests,
      query
    });
    
    console.log('Generated recommendations:', recommendations);
    
    // Return the recommendations
    return res.status(200).json({
      success: true,
      message: recommendations.message,
      courses: recommendations.courses
    });
  } catch (error) {
    console.error('Error processing query:', error.message);
    return res.status(500).json({ 
      success: false, 
      message: 'Failed to process your query: ' + error.message
    });
  }
};

module.exports = {
  processQuery
}; 