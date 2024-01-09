const router = require('express').Router();
const { profile } = require('../../models');

const getProfilePage = (req, res) => {
  // Logic to retrieve necessary data for the profile page
  console.log(req.user);
  // Check if user is authenticated and has an ID
  if (!req.user || !req.user.id) {
    return res.status(401).json({ error: 'User not authenticated' });
  }

  const userId = req.user.id;

  // Retrieve user profile data from the database based on the user ID
  User.findById(userId)
    .then((user) => {
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      // Render the profile page view and pass the user profile data to the view
      res.render('profile', { user });
    })
    .catch((error) => {
      // Handle any errors that occur during data retrieval
      res.status(500).json({ error: 'Error retrieving user profile' });
    });
};

const handleProfileSubmission = (req, res) => {
  // Handle the sign-up form submission
  const { username, email, password } = req.body;

  // Save user profile information to the database
  User.create({ username, email, password })
    .then(() => {
      // Redirect the user to the profile page or show a success message
      res.redirect('/profile');
    })
    .catch((error) => {
      // Handle any errors that occur during profile submission
      res.status(500).json({ error: 'Error saving user profile' });
    });
};

module.exports = {
  getProfilePage,
  handleProfileSubmission,
};