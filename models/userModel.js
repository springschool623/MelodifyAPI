const users = [
  { id: 1, username: 'user1', password: '123456' },
  { id: 2, username: 'user2', password: '654321' }
];

const getUsers = () => {
  return users;
};

const addUser = (user) => {
  const maxId = users.reduce((max, user) => user.id > max ? user.id : max, 0);
  user.id = maxId + 1;
  users.push(user);
};

module.exports = {
  getUsers,
  addUser
};
