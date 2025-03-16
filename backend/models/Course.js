const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  credits: {
    type: Number,
    required: true,
    default: 3
  },
  prerequisites: {
    type: [String],
    default: []
  },
  department: {
    type: String,
    required: true
  },
  level: {
    type: String,
    enum: ['Introductory', 'Intermediate', 'Advanced', 'Graduate'],
    default: 'Intermediate'
  },
  terms: {
    type: [String],
    default: ['Fall', 'Spring']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Course', CourseSchema); 