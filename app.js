const express = require('express');
const usersRouter = require('./routes/users'); // Adjust the path as per your project structure
require('dotenv').config();

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Route for user-related operations
app.use('/api/users', usersRouter);

// Example route: Other routes can be added similarly
app.get('/', (req, res) => {
    res.status(200).send('Welcome to the API.');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
