const mongoose = require('mongoose');

const UserPreferenceSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true
  },
  major: {
    type: String,
    required: true
  },
  interests: {
    type: [String],
    default: []
  },
  completedCourses: {
    type: [String], // Course codes
    default: []
  },
  savedRecommendations: {
    type: [{
      query: String,
      courses: [{
        code: String,
        name: String,
        description: String
      }],
      timestamp: {
        type: Date,
        default: Date.now
      }
    }],
    default: []
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('UserPreference', UserPreferenceSchema); 