const mongoose = require('mongoose');

// Connects to MongoDB using the URI supplied in the environment.
// Keeping this in its own module mirrors the "Connecting to the MongoDB
// database" step from the design doc and keeps server.js focused on routing.
async function connectDB() {
  const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/urlShortenerDB';

  try {
    await mongoose.connect(uri);
    console.log(`MongoDB connected -> ${uri}`);
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  }
}

module.exports = connectDB;
