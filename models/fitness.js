module.exports = function (sequelize, DataTypes) {
  var Fitness = sequelize.define('Fitness', {
    exercise: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  return Fitness;
};
