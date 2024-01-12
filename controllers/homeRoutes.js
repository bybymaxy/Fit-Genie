const router = require('express').Router();
const { User } = require('../models');
const bcrypt = require('bcrypt');

const withAuth = require('../utils/auth.js');


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

router.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Find the user in the database based on the provided email
  User.findOne({ where: { email } })
    .then((User) => { // <-- Updated parameter name to 'user'
      // User found
      if (User) { // <-- Updated variable name to 'user'
        bcrypt.compare(password, User.password)
          .then((isMatch) => {
            if (isMatch) {
              // Passwords match
              // Redirect to the home page
              res.redirect('/homepage');
            } else {
              // Passwords don't match
              res.status(401).json({ error: 'Incorrect password' });
            }
          })
          .catch((error) => {
            // Error occurred while comparing passwords
            res.status(500).json({ error: 'Error comparing passwords' });
          });
      } else {
        // User not found
        res.status(404).json({ error: 'User not found' });
      }
    })
    .catch((error) => {
      // Error occurred while querying the database
      res.status(500).json({ error: 'Error finding user' });
    });
});
router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});

module.exports = router;