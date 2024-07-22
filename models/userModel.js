const fs = require('fs');
const path = require('path');

const usersFilePath = path.join(__dirname, '..', 'users.json');

// Đọc danh sách người dùng từ tệp tin
const readUsersFromFile = () => {
  try {
    const data = fs.readFileSync(usersFilePath, 'utf8');
    return data ? JSON.parse(data) : [];
  } catch (err) {
    console.error('Error reading users file:', err);
    return [];
  }
};

// Ghi danh sách người dùng vào tệp tin
const writeUsersToFile = (users) => {
  try {
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
  } catch (err) {
    console.error('Error writing users file:', err);
  }
};

// Thêm người dùng mới với id duy nhất
const addUser = (username, password) => {
  const users = readUsersFromFile();
  
  // Tạo id duy nhất cho người dùng mới
  const newId = users.length ? users[users.length - 1].id + 1 : 1;
  
  const newUser = {
    id: newId,
    username: username,
    password: password
  };

  users.push(newUser);
  writeUsersToFile(users);
};

// Xuất các hàm
module.exports = { getUsers: readUsersFromFile, addUser };
