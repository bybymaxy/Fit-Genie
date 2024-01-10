const {Model, DataTypes} = require('sequelize');
// Assuming a Sequelize instance is already defined and imported
const Sequelize = require('../config/connection'); // Adjust path as needed

class Profile extends Model {

}

Profile.init(
  {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'User', // Assuming a 'User' model exists
        key: 'id',
      },
    },
    firstName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    lastName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    // Example of additional profile fields with appropriate data types
    email: {
      type: Sequelize.STRING,
      allowNull: true,
      unique: true,
      validate: {
        isEmail: true, // Validate email format
      },
    },

    // ...other relevant fields
  },
  {
    sequelize,
    timestamps: false, // Adjust if timestamps are needed
    modelName: 'UserProfile', // Explicitly specify model name
  }
);

module.exports = Profile;