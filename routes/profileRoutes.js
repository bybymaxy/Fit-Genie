const express = require("express");
const router = express.Router();

// Import any necessary controllers or middleware
const profileController = require("../controllers/api/profileController");

// Define the route for the "/profile" endpoint
router.get("/", profileController.getProfilePage);

module.exports = router;