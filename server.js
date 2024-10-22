const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt'); // Import bcrypt for password hashing

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MySQL Connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'arti'
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL database');
});

// API route to check if employee exists
app.post('/check-employee', (req, res) => {
    const { identifier } = req.body;

    // SQL query to check if the employee exists by email or employee number
    const query = 'SELECT * FROM employees WHERE employeeEmail = ? OR employeeNo = ?';
    db.query(query, [identifier, identifier], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Error querying database' });
        }
        if (results.length === 0) {
            return res.json({ exists: false });
        }
        return res.json({ exists: true });
    });
});

// API route to handle form submission for registration
app.post('/register', async (req, res) => {
    const { firstName, lastName, employeeNo, employeeEmail, mobileNo, projectName, username, password } = req.body;

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    const sql = 'INSERT INTO employees (firstName, lastName, employeeNo, employeeEmail, mobileNo, projectName, username, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';

    db.query(sql, [firstName, lastName, employeeNo, employeeEmail, mobileNo, projectName, username, hashedPassword], (err, result) => {
        if (err) {
            console.error('Error inserting data:', err);
            res.status(500).json({ error: 'Failed to save data' });
            return;
        }
        res.json({ message: 'Data saved successfully' });
    });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
