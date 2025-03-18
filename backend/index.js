const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const queryRoutes = require('./routes/queryRoutes');
const courseRoutes = require('./routes/courseRoutes');

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();

// Middleware
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? 'https://vercel.com/rachels-projects-937de8c2/course-advisor-frontend' 
    : 'http://localhost:3000'
}));
app.use(express.json());

// Routes
app.use('/api/query', queryRoutes);
app.use('/api/courses', courseRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Server is running' });
});

// Set port
const PORT = process.env.PORT || 5000;

// Start server if not in production (Vercel will handle this in production)
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

// Export for Vercel
module.exports = app; 