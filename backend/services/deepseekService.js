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
            content: 'You are a helpful course advisor for Duke University students. Provide specific course recommendations based on the student\'s major, interests, and the available courses. Only recommend courses from the provided course list.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: 1000,
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
    
    // Parse the response
    return parseResponse(response.data, allCourses);
  } catch (error) {
    console.error('DeepSeek API Error:', error.response?.data || error.message);
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
    }
    
    // Use database-based recommendations as fallback
    console.log('Using database-based recommendations');
    return generateDatabaseRecommendations(queryData);
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
    
    Please recommend specific courses from the following list that would be suitable for me:
    
    ${courseList}
    
    Format your response as a list of courses with their codes, names, and a brief explanation of why each course is recommended for me.
  `;
};

/**
 * Parse the API response into a structured format
 * @param {Object} responseData - Raw API response
 * @param {Array} allCourses - All available courses
 * @returns {Object} - Structured response
 */
const parseResponse = (responseData, allCourses) => {
  try {
    const content = responseData.choices[0].message.content;
    
    // Extract courses from the response text
    const courseRegex = /([A-Z]+\s*\d+[A-Z]*)\s*:/g;
    const courseCodes = [];
    let match;
    
    while ((match = courseRegex.exec(content)) !== null) {
      courseCodes.push(match[1].trim());
    }
    
    // Find the courses in our database
    const courses = courseCodes
      .map(code => {
        // Find the course in our database
        const course = allCourses.find(c => 
          c.code.replace(/\s+/g, '') === code.replace(/\s+/g, '')
        );
        
        if (course) {
          return {
            code: course.code,
            name: course.name,
            description: course.description
          };
        }
        return null;
      })
      .filter(course => course !== null);
    
    return {
      message: content,
      courses: courses.length > 0 ? courses : null
    };
  } catch (error) {
    console.error('Error parsing DeepSeek response:', error);
    return {
      message: responseData.choices[0].message.content,
      courses: null
    };
  }
};

/**
 * Generate recommendations based on database query
 * @param {Object} queryData - User query data
 * @returns {Promise<Object>} - Recommendations
 */
const generateDatabaseRecommendations = async (queryData) => {
  const { major, interests, query } = queryData;
  
  try {
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
    let courses = [];
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
    const formattedCourses = courses.map(course => ({
      code: course.code,
      name: course.name,
      description: course.description
    }));
    
    // If no courses found, use fallback
    if (formattedCourses.length === 0) {
      return generateFallbackRecommendations(queryData);
    }
    
    return {
      message: `Based on your ${major || ''} major and interest in ${interests || 'various subjects'}, here are some recommended courses at Duke University that might help with your query: "${query}"`,
      courses: formattedCourses
    };
  } catch (error) {
    console.error('Error generating database recommendations:', error.message);
    return generateFallbackRecommendations(queryData);
  }
};

/**
 * Generate fallback recommendations when all else fails
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