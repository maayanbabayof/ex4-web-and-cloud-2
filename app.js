const express = require('express');
const usersRouter = require('./routes/users');
const vacationsRouter = require('./routes/vacations');
require('dotenv').config();

const app = express();

app.use(express.json());

app.use('/api/users', usersRouter);
app.use('/api/vacations', vacationsRouter);

app.get('/', (req, res) => {
    res.status(200).send('Welcome to the API.');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
