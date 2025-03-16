const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');

// Get all courses
router.get('/courses', courseController.getAllCourses);

// Get course by code
router.get('/courses/:code', courseController.getCourseByCode);

// Create a new course
router.post('/courses', courseController.createCourse);

module.exports = router; 