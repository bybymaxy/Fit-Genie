// Import the express.Router() class to create modular, mountable route handlers
const router = require('express').Router();
// Import userRoutes from the './userRoutes' file
const userRoutes = require('./userRoutes');
// Import the express library to create an Express application
const axios = require('axios')


// Mount the userRoutes on the '/users' path
router.use('/users', userRoutes);
// Define a route for handling POST requests to '/generate-workout-plan'
router.post('/generate-workout-plan', async (req, res) => {
  try {
    // Extract user responses from the request body
    const userResponses = req.body;
    // Replace 'OPEN_AI_KEY' with your actual OpenAI API key
    const openaiApiKey = process.env.OPEN_AI_KEY;
    // Set the OpenAI API endpoint for the gpt-3.5-turbo engine
    const openaiEndpoint = 'https://api.openai.com/v1/chat/completions';
    // Make a POST request to the OpenAI API
    const response = await axios.post(openaiEndpoint, {
        "model": "gpt-3.5-turbo",
        "messages": [
          {
            "role": "system",
            "content": "You are a helpful assistant."
          },
          {
            "role": "user",
            "content": generatePrompt(userResponses)
          }
        ]
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${openaiApiKey}`,
      },
    });
    // Extract the generated workout plan from the OpenAI API response
    const workoutPlan = response.data.choices[0].message.content;
    // Send the generated workout plan as the response
    res.json(workoutPlan);
  } catch (error) {
    // Handle errors by logging and sending a 500 Internal Server Error response
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
});
// Define a function to generate a prompt based on user responses
function generatePrompt({
  age,
  currentWeight,
  currentHeight,
  targetWeight,
  fitnessGoals,
}) {
  return `User age: ${age}\n` +
         `Current weight: ${currentWeight}\n` +
         `Current height: ${currentHeight}\n` +
         `Target weight: ${targetWeight}\n` +
         `Fitness goals: ${fitnessGoals}\n` +
         'Generate a personalized workout plan:';
}
// Export the router for use in other parts of the application
module.exports = router;