const Course = require('../models/Course');

/**
 * Get all courses
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find().sort({ code: 1 });
    
    return res.status(200).json({
      success: true,
      count: courses.length,
      data: courses
    });
  } catch (error) {
    console.error('Error fetching courses:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

/**
 * Get course by code
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getCourseByCode = async (req, res) => {
  try {
    const course = await Course.findOne({ code: req.params.code });
    
    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }
    
    return res.status(200).json({
      success: true,
      data: course
    });
  } catch (error) {
    console.error('Error fetching course:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

/**
 * Create a new course
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const createCourse = async (req, res) => {
  try {
    const course = await Course.create(req.body);
    
    return res.status(201).json({
      success: true,
      data: course
    });
  } catch (error) {
    console.error('Error creating course:', error.message);
    
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Course with this code already exists'
      });
    }
    
    return res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

module.exports = {
  getAllCourses,
  getCourseByCode,
  createCourse
}; 