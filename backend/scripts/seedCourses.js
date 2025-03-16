const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const Course = require('../models/Course');

// Load environment variables from the root .env file
dotenv.config({ path: path.resolve(__dirname, '../.env') });

// MongoDB connection string - use the one from environment variables
const MONGODB_URI = process.env.MONGODB_URI;

console.log('Using MongoDB URI:', MONGODB_URI);

// Sample course data
const courses = [
  {
    code: 'CS101',
    name: 'Introduction to Computer Science',
    description: 'Fundamental concepts of programming and computer science.',
    credits: 3,
    prerequisites: [],
    department: 'Computer Science',
    level: 'Introductory',
    terms: ['Fall', 'Spring']
  },
  {
    code: 'CS201',
    name: 'Data Structures',
    description: 'Implementation and analysis of data structures.',
    credits: 3,
    prerequisites: ['CS101'],
    department: 'Computer Science',
    level: 'Intermediate',
    terms: ['Fall', 'Spring']
  },
  {
    code: 'CS230',
    name: 'Discrete Math for Computer Science',
    description: 'Mathematical foundations of computer science.',
    credits: 3,
    prerequisites: ['CS101'],
    department: 'Computer Science',
    level: 'Intermediate',
    terms: ['Fall']
  },
  {
    code: 'CS370',
    name: 'Introduction to AI',
    description: 'Fundamentals of artificial intelligence and machine learning.',
    credits: 3,
    prerequisites: ['CS201', 'CS230'],
    department: 'Computer Science',
    level: 'Advanced',
    terms: ['Spring']
  },
  {
    code: 'ECON101',
    name: 'Introduction to Economics',
    description: 'Basic principles of microeconomics and macroeconomics.',
    credits: 3,
    prerequisites: [],
    department: 'Economics',
    level: 'Introductory',
    terms: ['Fall', 'Spring']
  },
  {
    code: 'ECON201',
    name: 'Intermediate Microeconomics',
    description: 'Analysis of consumer and producer behavior.',
    credits: 3,
    prerequisites: ['ECON101'],
    department: 'Economics',
    level: 'Intermediate',
    terms: ['Fall']
  },
  {
    code: 'ECON210',
    name: 'Economic Statistics',
    description: 'Statistical methods for economic data analysis.',
    credits: 3,
    prerequisites: ['ECON101'],
    department: 'Economics',
    level: 'Intermediate',
    terms: ['Spring']
  },
  {
    code: 'WRITING101',
    name: 'Academic Writing',
    description: 'Fundamentals of academic writing and research.',
    credits: 3,
    prerequisites: [],
    department: 'English',
    level: 'Introductory',
    terms: ['Fall', 'Spring']
  }
];

// Connect to MongoDB and seed data
const seedData = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    
    console.log('MongoDB connected...');
    
    // Delete existing courses
    await Course.deleteMany();
    console.log('Existing courses deleted');
    
    // Insert new courses
    await Course.insertMany(courses);
    console.log('Courses seeded successfully');
    
    // Disconnect from MongoDB
    mongoose.disconnect();
    console.log('MongoDB disconnected');
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error.message);
    process.exit(1);
  }
};

// Run the seed function
seedData(); 