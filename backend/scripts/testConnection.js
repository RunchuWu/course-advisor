const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const MONGODB_URI = process.env.MONGODB_URI;

console.log('Attempting to connect to:', MONGODB_URI);

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('MongoDB connection successful!');
    mongoose.disconnect();
  })
  .catch(err => {
    console.error('MongoDB connection error:', err.message);
  }); 