const gallery = document.getElementById('gallery');
const API_BASE = 'https://sticker-api-qeah.onrender.com/api/stickers';

fetch(API_BASE)
  .then(response => response.json())
  .then(stickers => {
    if (Array.isArray(stickers)) {
      stickers.forEach(sticker => {
        const img = document.createElement('img');
        img.src = `${API_BASE}/${sticker.filename}`;
        img.alt = sticker.name;
        img.title = "Click to download";

        img.addEventListener('click', () => {
          const a = document.createElement('a');
          a.href = img.src;
          a.download = sticker.filename;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
        });

        gallery.appendChild(img);
      });
    } else {
      gallery.innerHTML = '<p>No stickers found.</p>';
    }
  })
  .catch(error => {
    console.error('Error fetching stickers:', error);
    gallery.innerHTML = '<p>Failed to load stickers.</p>';
  });
