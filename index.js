const express = require('express');
const bodyParser = require('body-parser');
const { getUsers, addUser } = require('./models/userModel');

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/users', (req, res) => {
  res.json(getUsers());
});

app.post('/users', (req, res) => {
  const newUser = req.body;
  addUser(newUser);
  res.status(201).send('Người dùng đã được thêm');
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
