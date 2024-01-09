// Import the express.Router() class to create modular, mountable route handlers
const router = require('express').Router();
// Import userRoutes from the './userRoutes' file
const userRoutes = require('./userRoutes');
// Import the express library to create an Express application
const express = require('express');
// Create an Express application
const app = express();
// Mount the userRoutes on the '/users' path
router.use('/users', userRoutes);
// Define a route for handling POST requests to '/generate-workout-plan'
app.post('/generate-workout-plan', async (req, res) => {
  try {
    // Extract user responses from the request body
    const userResponses = req.body;

    // Replace 'OPEN_AI_KEY' with your actual OpenAI API key
    const openaiApiKey = 'OPEN_AI_KEY';

    // Set the OpenAI API endpoint for the gpt-3.5-turbo engine
    const openaiEndpoint = 'https://api.openai.com/v1/engines/gpt-3.5-turbo/completions';

    // Make a POST request to the OpenAI API
    const response = await axios.post(openaiEndpoint, {
      prompt: generatePrompt(userResponses),
      max_tokens: 150,
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${openaiApiKey}`,
      },
    });
    // Extract the generated workout plan from the OpenAI API response
    const workoutPlan = response.data.choices[0].text;
    // Send the generated workout plan as the response
    res.send(workoutPlan);
  } catch (error) {
    // Handle errors by logging and sending a 500 Internal Server Error response
    console.error('Error:', error.message);
    res.status(500).send('Internal Server Error');
  }
});
// Define a function to generate a prompt based on user responses
function generatePrompt(userResponses) {
  return `User age: ${userResponses.age}\n` +
         `Current weight: ${userResponses.currentWeight}\n` +
         `Current height: ${userResponses.currentHeight}\n` +
         `Target weight: ${userResponses.targetWeight}\n` +
         `Fitness goals: ${userResponses.fitnessGoals}\n` +
         'Generate a personalized workout plan:';
}
// Export the router for use in other parts of the application
module.exports = router;