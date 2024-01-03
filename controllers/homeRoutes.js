const router = require('express').Router();
const { User } = require('../models');
<<<<<<<<< Temporary merge branch 1
const withAuth = require('../utils/auth.js');
=========
const withAuth = require('../utils/auth.js');
>>>>>>>>> Temporary merge branch 2

router.get('/', async (req, res) => {
  res.render('homepage')
});

router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});

module.exports = router;
