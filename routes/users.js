const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const router = express.Router();
require('dotenv').config();

// Create a connection pool to the database
const pool = mysql.createPool({
    host: 'localhost',
    user: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: 'Traveling',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Middleware to parse JSON bodies
router.use(express.json());

// Route: Create a new user
router.post('/create', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Check if user already exists
        const userExists = await checkUserExists(username);
        if (userExists) {
            return res.status(400).json({ error: 'User already exists.' });
        }

        // Hash the password before storing it
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert new user into the database
        const [result] = await pool.promise().query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword]);
        console.log('User created:', result);

        res.status(201).json({ message: 'User created successfully.' });
    } catch (err) {
        console.error('Error creating user:', err);
        res.status(500).json({ error: 'Failed to create user.' });
    }
});

// Route: Get all users
router.get('/all', async (req, res) => {
    try {
        // Retrieve all users from the database
        const [rows, fields] = await pool.promise().query('SELECT * FROM users');
        res.status(200).json(rows);
    } catch (err) {
        console.error('Error fetching users:', err);
        res.status(500).json({ error: 'Failed to fetch users.' });
    }
});

// Route: Login user
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Retrieve user from the database
        const [rows, fields] = await pool.promise().query('SELECT * FROM users WHERE username = ?', [username]);

        if (rows.length === 0) {
            return res.status(404).json({ error: 'User not found.' });
        }

        // Compare passwords
        const user = rows[0];
        const passwordMatch = password === user.password ? true : false;

        if (!passwordMatch) {
            return res.status(401).json({ error: 'Invalid password.' });
        }

        // Successful login
        res.status(200).json({ message: 'Login successful.' });
    } catch (err) {
        console.error('Error logging in:', err);
        res.status(500).json({ error: 'Failed to login.' });
    }
});

// Route: Logout user (example route)
router.post('/logout', (req, res) => {
    // Placeholder for logout functionality
    res.status(200).json({ message: 'Logout successful.' });
});

// Function to check if a user exists
const checkUserExists = async (username) => {
    try {
        const [rows, fields] = await pool.promise().query('SELECT * FROM users WHERE username = ?', [username]);
        return rows.length > 0; // Returns true if user exists, false otherwise
    } catch (err) {
        console.error('Error checking user:', err);
        return false;
    }
};

module.exports = router;
