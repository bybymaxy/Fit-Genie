const User = require('../models/User');

const login = (req, res) => {
  const { email, password } = req.body;

  User.findOne({ where: { email } })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      if (!user.validPassword(password)) {
        return res.status(401).json({ error: 'Incorrect password' });
      }

      res.json({ message: 'Login successful' });
    })
    .catch((error) => {
      res.status(500).json({ error: 'Error logging in' });
    });
};

module.exports = {
  login,
};