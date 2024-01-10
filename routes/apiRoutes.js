const express = require("express");
const router = express.Router();
const fitnessController = require("./controllers/api/fitnessController");
const axios = require("axios");


// Middleware to include the Authorization header
const includeAuthorizationHeader = (req, res, next) => {
  req.headers["Authorization"] = "";
  next();
};

// Route handlers for fitness data
router.get("/api/fitness", includeAuthorizationHeader, fitnessController.getAll);
router.post("/api/fitness", includeAuthorizationHeader, fitnessController.addExercise);

module.exports = router;
// controllers/apiRoutes.js or controllers/wgerRoutes.js
const wgerrouter = require('express').Router();

// Other existing routes...

// Wger data route
router.get('/wger-data', (req, res) => {
  const wgerData = req.wgerData;
  // Use wgerData as needed
  res.json(wgerData);
});

module.exports = wgerrouter;
