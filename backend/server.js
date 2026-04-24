require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const todos = require('./routes/todos');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/todos', todos);

const MONGO_URL = process.env.MONGO_URL;
const PORT = process.env.PORT || 5000;

mongoose.connect(MONGO_URL)
  .then(() => console.log('MongoDB connected'))
  .catch(err => {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  });

app.listen(PORT, () => console.log(`Backend listening on ${PORT}`));
