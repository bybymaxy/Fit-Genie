const express = require('express');
const router = express.Router();
const User = require('../models/user');

// GET route for /signup
router.get('/signup', (req, res) => {
  res.render('signup'); // Render the signup.handlebars view
});

// POST route for /signup
router.post('/signup', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Perform any necessary validation or data processing

    // Save the user data to the database using Sequelize
    const newUser = await User.create({ username, email, password });

    res.redirect('/login'); // Redirect to the login page after successful signup
  } catch (error) {
    console.error('Error saving user to database:', error);
    res.status(500).json({ error: 'Error saving user to database' });
  }
});

module.exports = router;