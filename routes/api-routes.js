const express = require("express");
const router = express.Router();
const fitnessController = require("../controllers/fitnessController");

router.get("/api/fitness", fitnessController.getAll);
router.post("/api/fitness", fitnessController.addExercise);

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
