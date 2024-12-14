document.addEventListener("DOMContentLoaded", async () => {
  const gallery = document.getElementById("gallery");
  const searchBar = document.getElementById("search-bar");

  // Fetch image data
  const response = await fetch("images.json");
  const images = await response.json();

  // Display all images
  const displayImages = (imagesToShow) => {
    gallery.innerHTML = ""; // Clear gallery
    imagesToShow.forEach((image) => {
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
        <img src="${image.url}" alt="${image.name}">
        <div class="card-info">
          <h3>${image.name}</h3>
          <p>${image.category}</p>
        </div>
      `;
      gallery.appendChild(card);
    });
  };

  // Initial display
  displayImages(images);

  // Search functionality
  searchBar.addEventListener("input", (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredImages = images.filter(
      (image) =>
        image.name.toLowerCase().includes(searchTerm) ||
        image.category.toLowerCase().includes(searchTerm)
    );
    displayImages(filteredImages);
  });
});
