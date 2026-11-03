// Gallery data: each item holds the image source, the alt text, and the caption used in the lightbox.
// Keeping the data in one array makes the gallery easier to update later.
const galleryItems = [
  {
    src: 'images/tanalysis.jpg',
    alt: 'Cachedflow CRM pipeline dashboard showing leads by stage',
    caption: 'Cachedflow CRM pipeline dashboard showing leads by stage'
  },
  {
    src: 'images/tcharts.jpg',
    alt: 'Campaign analytics dashboard with reply rate and meetings booked',
    caption: 'Campaign analytics dashboard with reply rate and meetings booked'
  },
  {
    src: 'images/smail.jpg',
    alt: 'Email outreach workflow from lead to booked meeting',
    caption: 'Email outreach workflow from lead to booked meeting'
  },
  {
    src: 'images/tlinkedin.jpg',
    alt: 'LinkedIn outreach funnel from connection to call',
    caption: 'LinkedIn outreach funnel from connection to call'
  },
  {
    src: 'images/team.jpg',
    alt: 'Team collaborating in a modern office',
    caption: 'Team collaborating in a modern office'
  },
  {
    src: 'images/skyline.jpg',
    alt: 'Sandton skyline near Bryanston',
    caption: 'Sandton skyline near Bryanston'
  },
  {
    src: 'images/setup.jpg',
    alt: 'Sales meeting after a booked appointment',
    caption: 'Sales meeting after a booked appointment'
  }
];

// Cache the main gallery container and lightbox elements once.
const galleryElement = document.getElementById('gallery');
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightbox-image');
const lightboxCaption = document.getElementById('lightbox-caption');
const lightboxCounter = document.getElementById('lightbox-counter');
const closeButton = document.querySelector('.lightbox__close');
const prevButton = document.querySelector('.lightbox__nav--prev');
const nextButton = document.querySelector('.lightbox__nav--next');

let currentIndex = 0;
let lastFocusedButton = null;

// Build the gallery from the array instead of writing each thumbnail in HTML.
// This keeps the page easier to maintain and matches your request.
function renderGallery() {
  if (!galleryElement) {
    return;
  }

  galleryItems.forEach((item, index) => {
    // Each thumbnail is a button so keyboard users can tab to it easily.
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'gallery-item';
    button.setAttribute('aria-label', `Open image ${index + 1}: ${item.alt}`);

    const label = document.createElement('span');
    label.className = 'gallery-item__label';
    label.textContent = item.alt;

    const image = document.createElement('img');
    image.src = item.src;
    image.alt = item.alt;
    image.loading = 'lazy';
    image.decoding = 'async';

    button.appendChild(label);
    button.appendChild(image);

    button.addEventListener('click', () => openLightbox(index));
    galleryElement.appendChild(button);
  });
}

// Update the lightbox content for the currently selected image.
function updateLightbox() {
  const item = galleryItems[currentIndex];

  if (!item) {
    return;
  }

  lightboxImage.src = item.src;
  lightboxImage.alt = item.alt;
  lightboxCaption.textContent = item.caption;
  lightboxCounter.textContent = `${currentIndex + 1} / ${galleryItems.length}`;
}

// Open the lightbox and focus the close button so keyboard users move into the modal.
function openLightbox(index) {
  currentIndex = index;
  lastFocusedButton = document.activeElement;

  updateLightbox();
  lightbox.classList.add('is-open');
  lightbox.setAttribute('aria-hidden', 'false');
  document.body.classList.add('lightbox-open');

  // Keep focus inside the dialog for accessibility.
  closeButton.focus();
}

// Close the lightbox and return focus to the thumbnail that opened it.
function closeLightbox() {
  lightbox.classList.remove('is-open');
  lightbox.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('lightbox-open');

  if (lastFocusedButton) {
    lastFocusedButton.focus();
  }
}

// Move to the next photo and update the lightbox.
function showNextImage() {
  currentIndex = (currentIndex + 1) % galleryItems.length;
  updateLightbox();
}

// Move to the previous photo and update the lightbox.
function showPreviousImage() {
  currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
  updateLightbox();
}

// Trigger close actions when the user clicks X, backdrop, or presses Esc.
if (closeButton) {
  closeButton.addEventListener('click', closeLightbox);
}

if (prevButton) {
  prevButton.addEventListener('click', showPreviousImage);
}

if (nextButton) {
  nextButton.addEventListener('click', showNextImage);
}

if (lightbox) {
  lightbox.addEventListener('click', (event) => {
    if (event.target && event.target.matches('[data-close="true"]')) {
      closeLightbox();
    }
  });
}

// Keyboard support: Esc closes, left/right arrows navigate, and Tab stays in the modal when open.
document.addEventListener('keydown', (event) => {
  if (!lightbox || !lightbox.classList.contains('is-open')) {
    return;
  }

  if (event.key === 'Escape') {
    closeLightbox();
  }

  if (event.key === 'ArrowRight') {
    event.preventDefault();
    showNextImage();
  }

  if (event.key === 'ArrowLeft') {
    event.preventDefault();
    showPreviousImage();
  }
});

renderGallery();
