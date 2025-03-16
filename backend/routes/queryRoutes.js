const express = require('express');
const router = express.Router();
const queryController = require('../controllers/queryController');
const axios = require('axios');

// Route to process course recommendation queries
router.post('/query', queryController.processQuery);

// Test route for DeepSeek API
router.get('/test-deepseek', async (req, res) => {
  try {
    const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY;
    
    if (!DEEPSEEK_API_KEY) {
      return res.status(500).json({ 
        success: false, 
        message: 'DeepSeek API key is not configured' 
      });
    }
    
    // Simple test request to DeepSeek API
    const response = await axios.post(
      'https://api.deepseek.com/v1/chat/completions',
      {
        model: 'deepseek-chat',
        messages: [
          { role: 'user', content: 'Hello, can you recommend a course?' }
        ],
        max_tokens: 100
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${DEEPSEEK_API_KEY}`
        }
      }
    );
    
    return res.status(200).json({
      success: true,
      message: 'DeepSeek API test successful',
      data: response.data
    });
  } catch (error) {
    console.error('DeepSeek API Test Error:', error.response?.data || error.message);
    return res.status(500).json({
      success: false,
      message: 'DeepSeek API test failed',
      error: error.response?.data || error.message
    });
  }
});

module.exports = router; 