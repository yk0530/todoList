require('./config/db');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/user');
const todoRoutes = require('./routes/todo');
require('dotenv').config();


const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.json())

app.use('/api/user', userRoutes);
app.use('/api/todo', todoRoutes);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});