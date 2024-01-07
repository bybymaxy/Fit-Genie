const express = require('express');
const router = express.Router();

// Import any required models or database-related modules

// Define the signup route
router.post('/signup', (req, res) => {
  // Process the signup form data
  const { username, email, password } = req.body;

  // Perform any necessary validation or data processing

  // Save the user data to the database
  // For example, if you have a User model defined:
  User.create({ username, email, password })
    .then(() => {
      res.json({ message: 'Signup successful' });
    })
    .catch((error) => {
      res.status(500).json({ error: 'Error saving user to database' });
    });
});

// Define the login route
router.post('/login', (req, res) => {
  // Process the login form data
  const { email, password } = req.body;

  // Perform any necessary validation or data processing

  // Check if the user exists in the database
  User.findOne({ where: { email } })
    .then((user) => {
      if (!user) {
        // User not found, return an error response
        return res.status(404).json({ error: 'User not found' });
      }

      // Check if the password is correct
      if (!user.validPassword(password)) {
        // Incorrect password, return an error response
        return res.status(401).json({ error: 'Incorrect password' });
      }

      // User found and password is correct, return a success response
      res.json({ message: 'Login successful' });
    })
    .catch((error) => {
      res.status(500).json({ error: 'Error logging in' });
    });
});

module.exports = router;
