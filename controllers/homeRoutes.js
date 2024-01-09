const router = require('express').Router();
const { User } = require('../models');

const withAuth = require('../utils/auth.js');

router.get('/', (req, res) => {
  res.render('homepage')
});

router.get('/homepage', (req, res) => {
  res.render('homepage')
});
//questions get routes
router.get('/questions1', (req, res) => {
  res.render('questions1')
});
router.get('/questions2', (req, res) => {
  res.render('questions2')
});
router.get('/questions3', (req, res) => {
  res.render('questions3')
});
//route for 


router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});

module.exports = router;
