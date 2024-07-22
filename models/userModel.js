const fs = require('fs');
const path = require('path');

const usersFilePath = path.join(__dirname, 'users.json');

// Đọc dữ liệu từ tệp JSON
const readUsersFromFile = () => {
  try {
    const data = fs.readFileSync(usersFilePath, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading users file:', err);
    return [];
  }
};

// Ghi dữ liệu vào tệp JSON
const writeUsersToFile = (users) => {
  try {
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
  } catch (err) {
    console.error('Error writing users file:', err);
  }
};

const getUsers = () => {
  return readUsersFromFile();
};

const addUser = (user) => {
  const users = readUsersFromFile();
  const maxId = users.reduce((max, user) => (user.id > max ? user.id : max), 0);
  user.id = maxId + 1;
  users.push(user);
  writeUsersToFile(users);
};

module.exports = {
  getUsers,
  addUser
};
