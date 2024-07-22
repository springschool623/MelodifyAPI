const fs = require('fs');
const path = require('path');
const axios = require('axios');

const usersFilePath = path.join(__dirname, '..', 'users.json');
const usersEndpoint = 'https://melodify-api.vercel.app/users'; // Thay thế bằng URL endpoint thực tế của bạn

// Đọc danh sách người dùng từ file local
const readUsersFromFile = () => {
  try {
    const data = fs.readFileSync(usersFilePath, 'utf8');
    return data ? JSON.parse(data) : [];
  } catch (err) {
    console.error('Error reading users file:', err);
    return [];
  }
};

// Ghi danh sách người dùng vào file local
const writeUsersToFile = (users) => {
  try {
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
  } catch (err) {
    console.error('Error writing users file:', err);
  }
};

// Đọc danh sách người dùng từ endpoint
const readUsersFromEndpoint = async () => {
  try {
    const response = await axios.get(usersEndpoint);
    return response.data;
  } catch (err) {
    console.error('Error reading users from endpoint:', err);
    return [];
  }
};

// Ghi danh sách người dùng vào endpoint
const writeUsersToEndpoint = async (users) => {
  try {
    await axios.post(usersEndpoint, users);
  } catch (err) {
    console.error('Error writing users to endpoint:', err);
  }
};

// Thêm người dùng mới với id duy nhất và lưu vào cả file local và endpoint
const addUser = async (username, password) => {
  // Đọc danh sách người dùng từ file local
  const users = readUsersFromFile();
  
  // Tạo id duy nhất cho người dùng mới
  const newId = users.length ? users[users.length - 1].id + 1 : 1;
  
  const newUser = {
    id: newId,
    username: username,
    password: password
  };

  users.push(newUser);
  
  // Ghi danh sách người dùng vào file local
  writeUsersToFile(users);
  
  // Ghi danh sách người dùng vào endpoint
  await writeUsersToEndpoint(users);
};

// Xuất các hàm
module.exports = { getUsers: readUsersFromFile, addUser };
