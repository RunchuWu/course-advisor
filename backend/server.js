const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const helmet = require('helmet');
const { connectDB } = require('./config/db');

// Import routes
const queryRoutes = require('./routes/queryRoutes');
const courseRoutes = require('./routes/courseRoutes');
const userPreferenceRoutes = require('./routes/userPreferenceRoutes');

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(helmet());

// Connect to MongoDB
connectDB();

// Debug route
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Server is running' });
});

// Routes
app.use('/api', queryRoutes);
app.use('/api', courseRoutes);
app.use('/api', userPreferenceRoutes);

// Basic route for testing
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Server is running' });
});

// For local development
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5001;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

// Export for serverless deployment
module.exports = app; 