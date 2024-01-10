// routes/login.js

const express = require('express');
const router = express.Router();
const { User } = require('../models'); // Assuming you have a User model defined
const loginController = require('../controllers/login');

// GET route to display the login form
router.get('/login', (req, res) => {
  res.render('login'); // Assuming you are using a template engine like Handlebars
});

router.post('/login', loginController.login);

// POST route to handle the login form submission
router.post('/login', async (req, res) => {
  try {
    // Extract login credentials from req.body
    const { email, password } = req.body;

    // Find the user in the database based on the provided email
    const user = await User.findOne({ where: { email } });

    // Check if the user exists and the password is correct
    if (user && user.password === password) {
      // Store user information in the session or generate a JWT for authentication
      req.session.user = user; // Assuming you are using express-session for session management

      // Redirect to the homepage or any other desired page
      res.redirect('/home');
    } else {
      res.status(401).send('Invalid email or password');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;