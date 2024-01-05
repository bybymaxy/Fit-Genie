const express = require('express');
const router = express.Router();
const mysql = require('mysql');

// Create a MySQL connection pool
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '!z<DuiPi|0xUrF',
  database: 'fitness_app',
});

// Define the signup route
router.post('/signup', (req, res) => {
  // Process the signup form data
  const { username, email, password } = req.body;

  // Perform any necessary validation or data processing

  // Save the user data to the database
  const query = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
  pool.query(query, [username, email, password], (error, results) => {
    if (error) {
      console.error('Error saving user to database:', error);
      res.status(500).json({ error: 'Error saving user to database' });
    } else {
      res.json({ message: 'Signup successful' });
    }
  });
});

module.exports = router;