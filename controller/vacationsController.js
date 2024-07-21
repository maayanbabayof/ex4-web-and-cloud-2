const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const pool = mysql.createPool({
    host: process.env.DATABASE_HOSTNAME,
    user: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

const vacationData = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/vacationData.json'), 'utf-8'));

const getVacationTypes = (req, res) => {
    res.status(200).json(vacationData.vacationTypes);
};

const getDestinations = (req, res) => {
    res.status(200).json(vacationData.destinations);
};

const createVacation = async (req, res) => {
    const { userid, start_date, end_date, duration, destination_id, vacation_type_id } = req.body;

    try {
        const [result] = await pool.query('INSERT INTO tbl_45_vacations (userid, start_date, end_date, duration, destination_id, vacation_type_id) VALUES (?, ?, ?, ?, ?, ?)', 
            [userid, start_date, end_date, duration, destination_id, vacation_type_id]);

        console.log('Vacation created:', result);
        res.status(201).json({ message: 'Vacation created successfully.' });
    } catch (err) {
        console.error('Error creating vacation:', err);
        res.status(500).json({ error: 'Failed to create vacation.' });
    }
};

const getAllVacations = async (req, res) => {
    try {
        const [rows, fields] = await pool.query('SELECT * FROM tbl_45_vacations');
        res.status(200).json(rows);
    } catch (err) {
        console.error('Error fetching vacations:', err);
        res.status(500).json({ error: 'Failed to fetch vacations.' });
    }
};

module.exports = {
    getVacationTypes,
    getDestinations,
    createVacation,
    getAllVacations
};
