// script.js
let imagesData = []; // Array to hold image data from JSON
let currentIndex = 0; // To track the current batch of images being displayed
const imagesPerLoad = 5; // Number of images to load per click

// Load the images from the JSON file
fetch('images.json')
  .then(response => response.json())
  .then(data => {
    imagesData = data;
    loadImages();
  })
  .catch(error => console.error('Error loading images:', error));

// Load a batch of images and append to the gallery
function loadImages() {
  const gallery = document.getElementById('gallery');
  const endIndex = Math.min(currentIndex + imagesPerLoad, imagesData.length); // Prevent out-of-bound access

  for (let i = currentIndex; i < endIndex; i++) {
    const image = imagesData[i];
    const imageCard = document.createElement('div');
    imageCard.classList.add('col-md-4', 'col-sm-6', 'col-xs-12');
    imageCard.innerHTML = `
      <div class="card">
        <img src="${image.url}" class="card-img-top" alt="${image.name}">
        <div class="card-body">
          <h5 class="card-title">${image.name}</h5>
          <p class="card-text">Category: ${image.category}</p>
        </div>
      </div>
    `;
    gallery.appendChild(imageCard);
  }

  currentIndex = endIndex;

  // If all images have been loaded, hide the "Load More" button
  if (currentIndex >= imagesData.length) {
    document.getElementById('load-more-btn').style.display = 'none';
  }
}

// Add event listener for the "Load More" button
document.getElementById('load-more-btn').addEventListener('click', loadImages);
