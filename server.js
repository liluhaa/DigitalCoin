// server.js
const express = require('express');
const connectDB = require('./db');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

// Подключаемся к базе данных
connectDB();

// API для получения пользователей
app.get('/api/users', async (req, res) => {
  try {
    const database = client.db('yourDatabaseName');
    const usersCollection = database.collection('users');
    const users = await usersCollection.find({}).toArray();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving users' });
  }
});

// API для добавления пользователя
app.post('/api/users', async (req, res) => {
  try {
    const database = client.db('users');
    const usersCollection = database.collection('users');
    const newUser = req.body;
    const result = await usersCollection.insertOne(newUser);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: 'Error adding user' });
  }
});

// Запускаем сервер
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
