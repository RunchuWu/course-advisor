/**
 * Mock service to simulate DeepSeek API responses
 */

const courseService = require('./courseService');

/**
 * Generate mock course recommendations
 * @param {Object} queryData - User query data
 * @returns {Promise<Object>} - Mock API response
 */
const generateRecommendations = async (queryData) => {
  const { major, interests, query } = queryData;
  
  return {
    message: `This is a mock response for a ${major || 'undecided'} major interested in ${interests || 'various subjects'} asking: "${query}"`,
    courses: null
  };
};

/**
 * Generate fallback recommendations when the database query fails
 * @param {Object} queryData - User query data
 * @returns {Object} - Fallback response
 */
const generateFallbackRecommendations = (queryData) => {
  const { major, interests } = queryData;
  
  // Sample courses based on common majors
  const courses = [];
  
  if (major && major.toLowerCase().includes('computer science')) {
    courses.push(
      { code: 'CS101', name: 'Introduction to Computer Science', description: 'Fundamental concepts of programming and computer science.' },
      { code: 'CS201', name: 'Data Structures', description: 'Implementation and analysis of data structures.' },
      { code: 'CS230', name: 'Discrete Math for Computer Science', description: 'Mathematical foundations of computer science.' }
    );
  } else if (major && major.toLowerCase().includes('economics')) {
    courses.push(
      { code: 'ECON101', name: 'Introduction to Economics', description: 'Basic principles of microeconomics and macroeconomics.' },
      { code: 'ECON201', name: 'Intermediate Microeconomics', description: 'Analysis of consumer and producer behavior.' },
      { code: 'ECON210', name: 'Economic Statistics', description: 'Statistical methods for economic data analysis.' }
    );
  } else {
    courses.push(
      { code: 'WRITING101', name: 'Academic Writing', description: 'Fundamentals of academic writing and research.' },
      { code: 'MATH111', name: 'College Algebra', description: 'Algebraic expressions, equations, and functions.' },
      { code: 'HIST101', name: 'World History', description: 'Survey of major historical events and developments.' }
    );
  }
  
  // Add interest-based courses
  if (interests) {
    if (interests.toLowerCase().includes('ai') || interests.toLowerCase().includes('machine learning')) {
      courses.push({ code: 'CS370', name: 'Introduction to AI', description: 'Fundamentals of artificial intelligence and machine learning.' });
    }
    if (interests.toLowerCase().includes('data') || interests.toLowerCase().includes('statistics')) {
      courses.push({ code: 'STATS210', name: 'Regression Analysis', description: 'Statistical modeling and data analysis techniques.' });
    }
  }
  
  return {
    message: `Based on your ${major || 'interests'}, here are some recommended courses at Duke University:`,
    courses: courses
  };
};

module.exports = {
  generateRecommendations
}; 