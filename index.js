const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./db'); // Kết nối MongoDB Atlas
const { getUsers, addUser } = require('./models/userModel');

const app = express();
const port = 3001;

// Kết nối đến MongoDB
connectDB();

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/users', async (req, res) => {
  try {
    const users = await getUsers();
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.post('/users', async (req, res) => {
  const { username, password } = req.body;
  try {
    await addUser(username, password);
    res.status(200).send('User added successfully');
  } catch (error) {
    console.error('Error adding user:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
