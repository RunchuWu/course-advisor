const Course = require('../models/Course');

/**
 * Get all courses from the database
 * @returns {Promise<Array>} - Array of course objects
 */
const getAllCourses = async () => {
  try {
    return await Course.find().sort({ code: 1 });
  } catch (error) {
    console.error('Error fetching courses:', error.message);
    throw error;
  }
};

/**
 * Get courses by department
 * @param {String} department - Department name
 * @returns {Promise<Array>} - Array of course objects
 */
const getCoursesByDepartment = async (department) => {
  try {
    return await Course.find({ department }).sort({ code: 1 });
  } catch (error) {
    console.error('Error fetching courses by department:', error.message);
    throw error;
  }
};

/**
 * Get courses by level
 * @param {String} level - Course level (Introductory, Intermediate, Advanced, Graduate)
 * @returns {Promise<Array>} - Array of course objects
 */
const getCoursesByLevel = async (level) => {
  try {
    return await Course.find({ level }).sort({ code: 1 });
  } catch (error) {
    console.error('Error fetching courses by level:', error.message);
    throw error;
  }
};

/**
 * Search courses by keyword in name or description
 * @param {String} keyword - Search keyword
 * @returns {Promise<Array>} - Array of course objects
 */
const searchCourses = async (keyword) => {
  try {
    const regex = new RegExp(keyword, 'i');
    return await Course.find({
      $or: [
        { name: regex },
        { description: regex }
      ]
    }).sort({ code: 1 });
  } catch (error) {
    console.error('Error searching courses:', error.message);
    throw error;
  }
};

module.exports = {
  getAllCourses,
  getCoursesByDepartment,
  getCoursesByLevel,
  searchCourses
}; 