const backgroundImages = [
  "clean.jpg",
  "cycle.webp",
  "ropes.jpg",
  "run.jpg",
  "swimming.jpg",
  // Add more image URLs here
];

document.addEventListener('DOMContentLoaded', function() {
  console.log('Loading DOM')
  // Get a random index from the array
  const randomIndex = Math.floor(Math.random() * backgroundImages.length);

  // Get a reference to the body element
  const body = document.body;

  // Get the selected image URL
  const selectedImage = backgroundImages[randomIndex];

  // Set the background image of the web page
  body.style.backgroundImage = `url(photos/${selectedImage})`;
});

