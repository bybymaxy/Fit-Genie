/*const express = require('express');
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
*/

// routes/signup.js

const express = require('express');
const app = express();
const router = express.Router();
const mysql = require('mysql');
const dotenv = require('dotenv').config();
const { User } = require('../models'); 

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

// GET route to display the signup form
router.get('/signup', (req, res) => {
  res.render('signup'); // Assuming you are using a template engine like Handlebars
});

// POST route to handle the signup form submission
router.post('/signup', async (req, res) => {
  try {
    // Extract form data from req.body
    const { username, email, password } = req.body;

    // Create a new user in the database
    const newUser = await User.create({ username, email, password });

    // Redirect to the login page
    res.redirect('/login');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;