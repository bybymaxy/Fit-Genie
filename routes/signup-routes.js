const express = require('express');
const router = express.Router();
const mysql = require('mysql');

// Create a MySQL connection pool
const pool = mysql.createPool({
  host: 'your_mysql_host',
  user: 'your_mysql_username',
  password: 'your_mysql_password',
  database: 'your_mysql_database',
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
      // Redirect to the login page after successful signup
      res.redirect('/login');
    }
  });
});

module.exports = router;