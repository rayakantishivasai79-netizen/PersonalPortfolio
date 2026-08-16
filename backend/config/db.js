const mongoose = require('mongoose');

async function connectDB() {
  const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/portfolio';

  try {
    await mongoose.connect(uri);
    console.log(`MongoDB connected: ${mongoose.connection.host}`);
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    console.error('Make sure MongoDB is running locally, or update MONGO_URI in your .env file.');
    process.exit(1);
  }
}

module.exports = connectDB;
