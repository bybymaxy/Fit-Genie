const backgroundImages = [
    "clean.jpg",
    "cycle.jpg",
    "dumbbells.jpg",
    // Add more image URLs here
  ];

// Get a random index from the array
const randomIndex = Math.floor(Math.random() * backgroundImages.length);

// Get the selected image URL
const selectedImage = backgroundImages[randomIndex];

// Set the background image of the web page
document.body.style.backgroundImage = `url(${selectedImage})`;