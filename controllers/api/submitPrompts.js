// Example prompts
const prompts = [
  'What is your current weight?',
  'What is your current height?',
  'What is your target weight?',
  'What are your fitness goals?',
];

// Populate the prompt list
const promptList = document.getElementById('promptList');
prompts.forEach((prompt) => {
  const promptElement = document.createElement('div');
  promptElement.textContent = prompt;
  promptList.appendChild(promptElement);
});

document.getElementById('submitBtn').addEventListener('click', async () => {
  const selectedPromptIndex = promptSelect.value;
  const selectedPrompt = prompts[selectedPromptIndex];

  const responseContainer = document.getElementById('responseContainer');
  responseContainer.innerHTML = ''; // Clear previous responses

  // Show loading indicator
  const submitBtn = document.getElementById('submitBtn');
  submitBtn.disabled = true;

  try {
      const response = await fetch('http://localhost:3001/api/submit-prompts', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ prompt: selectedPrompt }),
      });

      const responseData = await response.json();

      // Display the response from the AI
      const responseElement = document.createElement('p');
      responseElement.textContent = `AI Response: ${responseData.response}`;
      responseContainer.appendChild(responseElement);
  } catch (error) {
      console.error('Error submitting prompt:', error);

      // Display an error message
      const errorElement = document.createElement('p');
      errorElement.textContent = 'An error occurred. Please try again later.';
      responseContainer.appendChild(errorElement);
  } finally {
      // Hide loading indicator
      submitBtn.disabled = false;
  }
});