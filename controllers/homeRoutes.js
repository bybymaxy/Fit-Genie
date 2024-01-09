const router = require('express').Router();
const { User } = require('../models');
const withAuth = require('../utils/auth.js');

// Render the promptForm view for the root and /promptForm routes
router.get(['/', '/promptForm'], (req, res) => {
  res.render('promptForm');
});

// Render the homepage view for the /homepage route
router.get('/homepage', (req, res) => {
  res.render('homepage');
});

// Render the login view or redirect to /profile if already logged in
router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/profile');
  } else {
    res.render('login');
  }
});

module.exports = router;
