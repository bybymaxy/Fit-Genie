const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Import any required models or database-related modules

// Handle signup form submission
const handleSignup = async (req, res) => {
  try {
    // Extract form data from request body
    const { username, email, password } = req.body;

    // Perform any necessary validation

    // Create user in the database
    await userModel.createUser({ username, email, password });

    // Handle successful signup
    res.status(200).json({ message: 'Signup successful' });
  } catch (error) {
    // Handle errors
    console.error('Error during signup:', error);
    res.status(500).json({ error: 'An error occurred during signup' });
  }
};

module.exports = {
  handleSignup,
};
// Define the signup route
router.post('/signup', (req, res) => {
  // Process the signup form data
  const { username, email, password } = req.body;

  // Perform any necessary validation or data processing

  // Save the user data to the database
  // For example, if you have a User model defined:
  User.create({ username, email, password })
    .then((userData) => {
      req.session.save(() =>{
        req.session.user_id = userData.id
        req.session.loggedin = true
      }
      ) 
      res.json({ message: 'Signup successful' });
    })
    .catch((error) => {
      res.status(500).json({ error: 'Error saving user to database' });
    });
});


module.exports = router;
