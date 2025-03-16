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
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Generate response based on query content
  let response = {
    message: `Based on your query about ${query.substring(0, 30)}..., here are some course recommendations:`,
    courses: []
  };
  
  try {
    // Get courses from database based on query
    let courses = [];
    
    // Map major to department
    let department = '';
    if (major) {
      if (major.toLowerCase().includes('computer science') || major.toLowerCase().includes('cs')) {
        department = 'Computer Science';
      } else if (major.toLowerCase().includes('economics') || major.toLowerCase().includes('econ')) {
        department = 'Economics';
      } else if (major.toLowerCase().includes('english') || major.toLowerCase().includes('writing')) {
        department = 'English';
      }
    }
    
    // Get courses by department if available
    if (department) {
      courses = await courseService.getCoursesByDepartment(department);
    }
    
    // If no courses found or no department specified, search by keywords
    if (courses.length === 0) {
      // Extract keywords from interests and query
      const keywords = [];
      
      if (interests) {
        interests.split(',').forEach(interest => {
          keywords.push(interest.trim());
        });
      }
      
      // Add common keywords from the query
      const queryWords = query.toLowerCase().split(' ');
      const relevantWords = queryWords.filter(word => 
        word.length > 3 && 
        !['what', 'which', 'should', 'could', 'would', 'take', 'recommend'].includes(word)
      );
      
      keywords.push(...relevantWords);
      
      // Search for courses using keywords
      for (const keyword of keywords) {
        if (keyword) {
          const keywordCourses = await courseService.searchCourses(keyword);
          courses.push(...keywordCourses);
        }
      }
      
      // Remove duplicates
      courses = Array.from(new Set(courses.map(course => course.code)))
        .map(code => courses.find(course => course.code === code));
    }
    
    // Limit to 5 courses
    courses = courses.slice(0, 5);
    
    // Format courses for response
    response.courses = courses.map(course => ({
      code: course.code,
      name: course.name,
      description: course.description
    }));
    
    // If no courses found, use fallback
    if (response.courses.length === 0) {
      return generateFallbackRecommendations(queryData);
    }
    
    // Enhance the response message
    response.message = `Based on your ${major || ''} major and interest in ${interests || 'various subjects'}, here are some recommended courses at Duke University that might help with your query: "${query}"`;
    
    return response;
  } catch (error) {
    console.error('Error generating recommendations from database:', error.message);
    // Use fallback if database query fails
    return generateFallbackRecommendations(queryData);
  }
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