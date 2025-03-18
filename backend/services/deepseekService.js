const axios = require('axios');
const dotenv = require('dotenv');
const courseService = require('./courseService');

dotenv.config();

const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY;
const DEEPSEEK_API_URL = 'https://api.deepseek.com/v1/chat/completions';

/**
 * Generate course recommendations using DeepSeek API
 * @param {Object} queryData - User query data
 * @returns {Promise<Object>} - API response
 */
const generateRecommendations = async (queryData) => {
  try {
    // Get available courses from database
    const allCourses = await courseService.getAllCourses();
    
    // Format courses for the prompt
    const courseList = allCourses.map(course => 
      `${course.code}: ${course.name} - ${course.description} (Level: ${course.level}, Department: ${course.department})`
    ).join('\n');
    
    // Format the prompt for the AI
    const prompt = formatPrompt(queryData, courseList);
    
    console.log('Sending request to DeepSeek API with prompt');
    
    // Call DeepSeek API
    const response = await axios.post(
      DEEPSEEK_API_URL,
      {
        model: 'deepseek-chat',
        messages: [
          {
            role: 'system',
            content: 'You are a helpful course advisor for Duke University students. Provide course recommendations based on the student\'s major, interests, and query.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: 1500,
        temperature: 0.7
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${DEEPSEEK_API_KEY}`
        }
      }
    );
    
    console.log('Received response from DeepSeek API:', response.status);
    
    // Return the AI response directly
    return {
      message: response.data.choices[0].message.content,
      courses: null // We're not parsing courses anymore, letting the AI respond freely
    };
  } catch (error) {
    console.error('DeepSeek API Error:', error.response?.data || error.message);
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
    }
    
    // Use fallback recommendations
    console.log('Using fallback recommendations');
    return generateFallbackRecommendations(queryData);
  }
};

/**
 * Format the prompt for the AI based on user query and available courses
 * @param {Object} queryData - User query data
 * @param {String} courseList - Formatted list of available courses
 * @returns {String} - Formatted prompt
 */
const formatPrompt = (queryData, courseList) => {
  const { major, interests, query } = queryData;
  
  return `
    I am a ${major || 'undecided'} major at Duke University.
    My academic interests include: ${interests || 'various subjects'}.
    
    ${query}
    
    Here are some courses available at Duke University:
    
    ${courseList}
    
    Please provide me with course recommendations and any other advice you think would be helpful.
  `;
};

/**
 * Generate fallback recommendations when all else fails
 * @param {Object} queryData - User query data
 * @returns {Object} - Fallback response
 */
const generateFallbackRecommendations = (queryData) => {
  const { major, interests } = queryData;
  
  return {
    message: `I'm sorry, but I couldn't connect to our recommendation service at the moment. Based on your ${major || 'interests'}, I would typically recommend courses in that field. Please try again later or contact academic advising for immediate assistance.`,
    courses: null
  };
};

module.exports = {
  generateRecommendations
}; 