const db = require("../models");

module.exports = {
  getAll: (req, res) => {
    db.Fitness.findAll().then((data) => res.json(data));
  },
  addExercise: (req, res) => {
    db.Fitness.create(req.body).then((data) => res.json(data));
  },
};
