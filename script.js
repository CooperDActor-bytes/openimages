let currentIndex = 0;
const imagesPerPage = 5;
let imageData = [];

// Fetch images.json and initialize the gallery
fetch('images.json')
  .then((response) => response.json())
  .then((data) => {
    imageData = data;
    loadCategories(data);
    loadGallery();
  })
  .catch((error) => console.error('Error loading images.json:', error));

// Load the next set of images
function loadGallery() {
  const gallery = document.getElementById('gallery');
  const loadMoreBtn = document.getElementById('load-more-btn');

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

  if (currentIndex >= imageData.length) {
    loadMoreBtn.style.display = 'none';
  } else {
    loadMoreBtn.style.display = 'block';
  }
}

// Dynamically load categories
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

// Filter by category
function filterByCategory(category) {
  const gallery = document.getElementById('gallery');
  gallery.innerHTML = '';
  currentIndex = 0;

  const filteredImages = imageData.filter((img) => img.category === category);
  imageData = filteredImages;
  loadGallery();
}

// Reset gallery
function resetGallery() {
  fetch('images.json')
    .then((response) => response.json())
    .then((data) => {
      imageData = data;
      const gallery = document.getElementById('gallery');
      gallery.innerHTML = '';
      currentIndex = 0;
      loadGallery();
    });
}

// Search functionality
const searchBar = document.getElementById('search-bar');
searchBar.addEventListener('input', () => {
  const query = searchBar.value.toLowerCase();
  const gallery = document.getElementById('gallery');
  gallery.innerHTML = '';

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
