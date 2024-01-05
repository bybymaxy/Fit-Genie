
const { User } = require('../../models/User'); // Assuming you have a User model defined

const getUsers = async (req, res) => {
  try {
    const users = await User.findAll(); // Retrieve all users from the database
    res.json(users);
  } catch (error) {
    console.error('Error retrieving users:', error);
    res.status(500).json({ error: 'Error retrieving users' });
  }
};

module.exports = getUsers;