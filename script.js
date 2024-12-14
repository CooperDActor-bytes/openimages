// Fetch JSON data and display images
async function loadImages() {
  const response = await fetch('images.json'); // URL of the JSON file
  const images = await response.json();
  
  const gallery = document.getElementById('gallery');
  const searchInput = document.getElementById('search');

  function displayImages(filter = '') {
    gallery.innerHTML = ''; // Clear existing content
    const filteredImages = images.filter(image => 
      image.name.toLowerCase().includes(filter) ||
      image.category.toLowerCase().includes(filter)
    );

    filteredImages.forEach(image => {
      const card = document.createElement('div');
      card.className = 'image-card';
      card.innerHTML = `
        <img src="${image.url}" alt="${image.name}">
        <p>${image.name} (${image.category})</p>
      `;
      gallery.appendChild(card);
    });
  }

  // Initial display of all images
  displayImages();

  // Add search functionality
  searchInput.addEventListener('input', () => {
    const filter = searchInput.value.toLowerCase();
    displayImages(filter);
  });
}

loadImages();
