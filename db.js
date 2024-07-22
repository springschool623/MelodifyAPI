const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI;
    await mongoose.connect(mongoURI, {
      // Tùy chọn đã bị loại bỏ trong MongoDB Node.js Driver 4.0.0 trở lên
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('Error connecting to MongoDB', error);
    process.exit(1);
  }
};

module.exports = connectDB;
