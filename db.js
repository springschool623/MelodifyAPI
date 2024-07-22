const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://springschool623:nxt_2003@melodifycluster.wlhn1zx.mongodb.net/?retryWrites=true&w=majority&appName=MelodifyCluster', {
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('Error connecting to MongoDB', error);
    process.exit(1);
  }
};

module.exports = connectDB;
