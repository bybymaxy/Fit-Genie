const submitButton = document.getElementById('submitButton');

// Function to toggle visibility of containers
function showContainer(currentContainerId, nextContainerId) {
  const currentContainer = document.getElementById(currentContainerId);
  const nextContainer = document.getElementById(nextContainerId);

  // Hide the current container
  currentContainer.classList.add('hidden');

  // Show the next container
  nextContainer.classList.remove('hidden');
}
container4.innerHTML = `<img src="photos/spinner.webp" alt="Loading Image"></img>`

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
    const container4 = document.getElementById('container4')
    
  
    // Create an object with user responses
    const userResponses = { age, currentWeight, height, targetWeight, fitnessGoals, gym, fitnessEquipment, outdoorActivities, daysAvailable, exerciseIntensity, currentFitness, focus, tracking, existingMedicalConditions };
    
    localStorage.setItem('userResponses', JSON.stringify(userResponses));
    
    // Send user responses in the POST request to the server
    const response = await axios.post('/api/generate-workout-plan', userResponses);
    
    // Handle the response from the server as needed
    console.log('Server Response:', response.data);
    // Handle the response from the server as needed
    console.log('User responses saved to local storage:', userResponses);
    
    container4.innerHTML = response.data + `<button type="button" class="btn btn-secondary" onclick="showContainer('container4', 'container3')">Back</button>`

    } catch (error) {
      // Handle errors
      console.error('Error:', error);
    }
    
  });

