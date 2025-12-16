const mongoose = require('mongoose');

// Connect to MongoDB
// Database and collections are auto-created by Mongoose
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected Successfully');
    console.log('Database will be auto-created if it does not exist');
  } catch (error) {
    console.error('MongoDB Connection Error:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
