const router = require('express').Router();
const { User } = require('../models');
const withAuth = require('../utils/auth.js');

<<<<<<< HEAD

router.get('/', async (req, res) => {
  try {
                               // data to be requested 
    res.render('homepage')
  } catch (err) {
    res.status(500).json(err);  // error handling
  }
 
});

router.get('/homepage', async (req, res) => {
  try {
                                // data to be requested 
    res.render('homepage')
  } catch (err) {
    res.status(500).json(err); // error handling
  }
  
});


//questions get routes
router.get('/questions1', async (req, res) => {
  try { 
                                // data to be requested 
    res.render('questions1')
  } catch (err) {
    res.status(500).json(err); // error handling
  }
 
});
router.get('/questions2', async (req, res) => {
try {
                              // data to be requested
  res.render('questions2')
} catch (err) {
  res.status(500).json(err); // error handling
}
  
});
router.get('/questions3', async (req, res) => {
  try {
                              // data to be requested
    res.render('questions3')
  }
  catch (err) {
    res.status(500).json(err); // error handling
  }
});
//route for 

router.get('/signup', async (req, res) => {
  try {
    
    res.render('signup')
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
})


router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the sessions id
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
    })

    const user = userData.get({plain: true});

    res.render('profile', {
      ...user,
      logged_in: true
    })
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
})

=======
// Render the promptForm view for the root and /promptForm routes
router.get(['/', '/promptForm'], (req, res) => {
  res.render('promptForm');
});

// Render the homepage view for the /homepage route
router.get('/homepage', (req, res) => {
  res.render('homepage');
});
>>>>>>> aef7c903e3e28c3b77e2c5ebc46ee1be4f3ec4e9

// Render the login view or redirect to /profile if already logged in
router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/profile');
  } else {
    res.render('login');
  }
});

module.exports = router;
