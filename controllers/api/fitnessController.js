const db = require("./models");
const { openaiFunction } = require('./server'); // Import the openaiFunction directly from server.js

module.exports = {
  getAll: (req, res) => {
    // Assuming you want to use OpenAI in the getAll function
    openaiFunction(); // Add this line to use OpenAI

    db.Fitness.findAll().then((data) => res.json(data));
  },
  addExercise: async (req, res) => {
    try {
      // Assuming you want to use OpenAI in the addExercise function
      await openaiFunction(); // Add this line to use OpenAI

      const result = await db.Fitness.create(req.body);
      res.json(result);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
};
