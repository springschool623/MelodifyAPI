const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { getUsers, addUser } = require('./models/userModel');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/users', (req, res) => {
  res.json(getUsers());
});

app.post('/users', (req, res) => {
  const { username, password } = req.body;
  try {
    addUser(username, password);
    res.status(200).send('User added successfully');
  } catch (error) {
    console.error('Error adding user:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
