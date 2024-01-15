
const submitButton = document.getElementById('submitButton');

// Function to toggle visibility of containers
function showContainer(containerId) {
  const containers = document.querySelectorAll('questions-container');
  containers.forEach(container => {
    if (container.id === containerId) {
      container.classList.remove('hidden');
    } else {
        container.classList.add('hidden');
    }
  });
}

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

    localStorage.setItem('userResponses', JSON.stringify(userResponses));

      // Display the workout plan on the webpage
      const workoutPlanContainer = document.getElementById('workoutPlanContainer');
      workoutPlanContainer.innerHTML = `<p>${workoutPlan}</p>`;
      // Handle the response from the server as needed
      console.log('User responses saved to local storage:', userResponses);

    } catch (error) {
      // Handle errors
      console.error('Error:', error);
    }
  });

