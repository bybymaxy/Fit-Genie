// Import the express.Router() class to create modular, mountable route handlers
const router = require('express').Router();
// Import userRoutes from the './userRoutes' file
const userRoutes = require('./userRoutes');
// Import the express library to create an Express application
const axios = require('axios')

// Mount the userRoutes on the '/users' path
router.use('/users', userRoutes);

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
            "content": "You are a helpful assistant that designs personalized exercise programs. Return the response in formatted HTML with white text and no background color. Make a 1 month plan with a weely schedule for workouts given the user's input."
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
  height,
  targetWeight,
  fitnessGoals,
  gym,
  fitnessEquipment,
  outdoorActivities,
  daysAvailable,
  exerciseIntensity,
  currentFitness,
  focus,
  tracking,
  existingMedicalConditions
}) {
  return `User age: ${age}\n` +
         `Current weight: ${currentWeight}\n` +
         `height: ${height}\n` +
         `Target weight: ${targetWeight}\n` +
         `Fitness goals: ${fitnessGoals}\n` +
         `gym: ${gym}\n` +
         `fitnessEquipment: ${fitnessEquipment}\n` +
         `outdoorActivities: ${outdoorActivities}\n` +
         `daysAvailable: ${daysAvailable}\n` +
         `exerciseIntensity: ${exerciseIntensity}\n` +
         `currentFitness: ${currentFitness}\n` +
         `focus: ${focus}\n` +
         `tracking: ${tracking}\n` +
         `existingMedicalConditions: ${existingMedicalConditions}\n` +
         'Generate a personalized workout plan:';
}


// Export the router for use in other parts of the application
module.exports = router;