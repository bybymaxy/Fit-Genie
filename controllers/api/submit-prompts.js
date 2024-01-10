const openai = require('openai');

// Import the submit-prompts.js file
const submitPrompts = require('./api/submit-prompts');

// Call the function from submit-prompts.js
submitPrompts();

// Add the async function for OpenAI
async function openaiFunction() {
  const openaiInstance = new openai.OpenAI();

  // Your prompts here
  const prompts = [
    'What is your current weight?',
    'What is your current height?',
    'What is your target weight?',
    'What are your fitness goals?',
  ];

  const responses = [];

  for (const prompt of prompts) {
    const response = await openaiInstance.generateText(prompt);
    responses.push(response.data.text);
  }

  console.log(responses);
}

openaiFunction();