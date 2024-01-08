const User = require('./User');
//import models
const fitness = require('./fitness');
const profile = require('./profile');
const submit = require('./submit')

//association methods for the Sequelize models to create relationships between them
//A user can have many fitness profiles 
User.hasMany(fitness, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

//A fitness profile belongs to a single user
fitness.belongsTo(User, {
  foreignKey: 'user_id',
});

//A user can belong to a single profile
User.belongsTo(profile, {
  foreignKey: 'user_id',
});

//A user can submit many times
User.hasMany(submit, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

//Export User,Post and Comment


module.exports = { User, profile, fitness, submit};
