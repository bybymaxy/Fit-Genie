
const submitButton = document.getElementById('submitButton');

submitButton.addEventListener('click', async () => {
  try {
    // Gather user responses from the form
    const age = document.getElementById('question1').value;
    const currentWeight = document.getElementById('question2').value;
    const height = document.getElementById('question3').value;
    const targetWeight = document.getElementById('question4').value;
    const fitnessGoals = document.getElementById('question5').value;
    const gym = document.getElementById('question6').value;
    const fitnessEquipment = document.getElementById('question7').value;
    const outdoorActivities = document.getElementById('question8').value;
    const daysAvailable = document.getElementById('question9').value;
    const exerciseIntensity = document.getElementById('question10').value;
    const currentFitness = document.getElementById('question11').value;
    const focus = document.getElementById('question12').value;
    const tracking = document.getElementById('question13').value;
    const existingMedicalConditions = document.getElementById('question14').value;

    // Create an object with user responses
      const userResponses = { age, currentWeight, height, targetWeight, fitnessGoals, gym, fitnessEquipment, outdoorActivities, daysAvailable, exerciseIntensity, currentFitness, focus, tracking, existingMedicalConditions };

      // Make a POST request to your server endpoint (assuming you have set up the route)
      const response = await axios.post('/generate-workout-plan', userResponses);

      // Handle the response from the server
      const workoutPlan = response.data;

      // Display the workout plan on the webpage
      const workoutPlanContainer = document.getElementById('workoutPlanContainer');
      workoutPlanContainer.innerHTML = `<p>${workoutPlan}</p>`;
      // Handle the response from the server as needed
      console.log('API Response:', response.data);

    } catch (error) {
      // Handle errors
      console.error('Error:', error);
    }
  });
  
// Import the submit-prompts.js file
// const submitPrompts = require('./api/submit-prompts');

// Call the function from submit-prompts.js
// submitPrompts();

// // Add the async function for OpenAI
// async function openaiFunction() {
//   const openaiInstance = new openai.OpenAI();

//   // Your prompts here
//   const prompts = [
//     'What is your current weight?',
//     'What is your height?',
//     'What is your target weight?',
//     'What are your fitness goals?',
//   ];

//   const responses = [];

//   for (const prompt of prompts) {
//     const response = await openaiInstance.generateText(prompt);
//     responses.push(response.data.text);
//   }

//   console.log(responses);
// }

// openaiFunction();