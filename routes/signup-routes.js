const express = require('express');
const app = express();
const router = express.Router();
const mysql = require('mysql');
const dotenv = require('dotenv').config();

// Create a MySQL connection pool
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: process.env.DB_PASSWORD,
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
      // Redirect to the login page after successful signup
      res.redirect('/login');
    }
  });
});

// Register the router with the Express application
app.use('/', router);

// Start the server
app.listen(3001, () => {
  console.log('Server is running on http://localhost:3001');
});