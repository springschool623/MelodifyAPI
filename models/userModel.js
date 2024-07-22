const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const User = mongoose.model('User', userSchema);

const getUsers = async () => {
  try {
    const users = await User.find({});
    return users;
  } catch (error) {
    throw new Error('Error fetching users: ' + error.message);
  }
};

const addUser = async (username, password) => {
  try {
    const user = new User({ username, password });
    await user.save();
  } catch (error) {
    throw new Error('Error adding user: ' + error.message);
  }
};

module.exports = { getUsers, addUser };
