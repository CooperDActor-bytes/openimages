let currentIndex = 0;
const imagesPerPage = 5;
let imageData = []; // To hold the JSON data after fetching

// Fetch images.json and initialize the gallery
fetch('images.json')
  .then((response) => response.json())
  .then((data) => {
    imageData = data;
    loadCategories(data);
    loadGallery(); // Load initial set of images
  })
  .catch((error) => console.error('Error loading images.json:', error));

// Load the next set of images
function loadGallery() {
  const gallery = document.getElementById('gallery');
  const endIndex = Math.min(currentIndex + imagesPerPage, imageData.length);

  for (let i = currentIndex; i < endIndex; i++) {
    const col = document.createElement('div');
    col.className = 'col-md-4';

    const card = `
      <div class="card shadow-sm">
        <img src="${imageData[i].url}" class="card-img-top" alt="${imageData[i].name}">
        <div class="card-body">
          <h5 class="card-title">${imageData[i].name}</h5>
          <p class="card-text">Category: ${imageData[i].category}</p>
        </div>
      </div>`;
    col.innerHTML = card;
    gallery.appendChild(col);
  }

  currentIndex = endIndex;

  // Hide "Load More" button if all images are loaded
  const loadMoreBtn = document.getElementById('load-more-btn');
  if (currentIndex >= imageData.length && loadMoreBtn) {
    loadMoreBtn.style.display = 'none';
  }
}

// Dynamically load categories for filtering
function loadCategories(data) {
  const categories = [...new Set(data.map((img) => img.category))];
  const categoryFilter = document.getElementById('category-filter');

  categories.forEach((category) => {
    const btn = document.createElement('button');
    btn.className = 'btn btn-outline-primary mx-1';
    btn.innerText = category;
    btn.onclick = () => filterByCategory(category);
    categoryFilter.appendChild(btn);
  });

  const resetBtn = document.createElement('button');
  resetBtn.className = 'btn btn-outline-secondary mx-1';
  resetBtn.innerText = 'Reset';
  resetBtn.onclick = resetGallery;
  categoryFilter.appendChild(resetBtn);
}

// Filter gallery by category
function filterByCategory(category) {
  const gallery = document.getElementById('gallery');
  gallery.innerHTML = ''; // Clear current gallery
  currentIndex = 0; // Reset pagination

  const filteredImages = imageData.filter((img) => img.category === category);
  filteredImages.forEach((image) => {
    const col = document.createElement('div');
    col.className = 'col-md-4';

    const card = `
      <div class="card shadow-sm">
        <img src="${image.url}" class="card-img-top" alt="${image.name}">
        <div class="card-body">
          <h5 class="card-title">${image.name}</h5>
          <p class="card-text">Category: ${image.category}</p>
        </div>
      </div>`;
    col.innerHTML = card;
    gallery.appendChild(col);
  });
}

// Reset gallery to show all images
function resetGallery() {
  const gallery = document.getElementById('gallery');
  gallery.innerHTML = ''; // Clear current gallery
  currentIndex = 0; // Reset pagination
  loadGallery(); // Load initial set of images
}

// Implement search functionality
const searchBar = document.getElementById('search-bar');
searchBar.addEventListener('input', () => {
  const query = searchBar.value.toLowerCase();
  const gallery = document.getElementById('gallery');
  gallery.innerHTML = ''; // Clear current gallery

  const filteredImages = imageData.filter((img) =>
    img.name.toLowerCase().includes(query)
  );
  filteredImages.forEach((image) => {
    const col = document.createElement('div');
    col.className = 'col-md-4';

    const card = `
      <div class="card shadow-sm">
        <img src="${image.url}" class="card-img-top" alt="${image.name}">
        <div class="card-body">
          <h5 class="card-title">${image.name}</h5>
          <p class="card-text">Category: ${image.category}</p>
        </div>
      </div>`;
    col.innerHTML = card;
    gallery.appendChild(col);
  });
});
