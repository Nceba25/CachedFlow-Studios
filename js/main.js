// -----------------------------------------------------------------------------
// Gallery data
// -----------------------------------------------------------------------------
// We store every image in one array. Each item has:
// - src: the file path for the image
// - alt: the text screen readers use
// - caption: the text shown under the large image in the lightbox
// This keeps the gallery easy to update later without editing the HTML.
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

// -----------------------------------------------------------------------------
// Select important elements from the page
// -----------------------------------------------------------------------------
// These are the main parts of the page we need to manipulate.
// We grab the gallery container and the popup/lightbox pieces once so we can
// reuse them instead of looking them up over and over.
const galleryElement = document.getElementById('gallery');
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightbox-image');
const lightboxCaption = document.getElementById('lightbox-caption');
const lightboxCounter = document.getElementById('lightbox-counter');
const closeButton = document.querySelector('.lightbox__close');
const prevButton = document.querySelector('.lightbox__nav--prev');
const nextButton = document.querySelector('.lightbox__nav--next');

// Keep track of which image is open right now.
let currentIndex = 0;

// This stores the button that opened the lightbox so we can return focus to it
// after closing. This helps keyboard users.
let lastFocusedButton = null;

// -----------------------------------------------------------------------------
// Create the gallery thumbnails
// -----------------------------------------------------------------------------
// Instead of writing each image into the HTML manually, we build the buttons here.
// This makes the code cleaner and allows us to loop through the data array.
function renderGallery() {
  // If the gallery container does not exist, stop immediately.
  if (!galleryElement) {
    return;
  }

  // Loop through every item in the array
  galleryItems.forEach((item, index) => {
    // Create a button so the thumbnail is keyboard accessible.
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'gallery-item';
    button.setAttribute('aria-label', `Open image ${index + 1}: ${item.alt}`);

    // Add a label above the image inside the thumbnail.
    const label = document.createElement('span');
    label.className = 'gallery-item__label';
    label.textContent = item.alt;

    // Create the actual image element.
    const image = document.createElement('img');
    image.src = item.src;
    image.alt = item.alt;
    image.loading = 'lazy';
    image.decoding = 'async';

    // Put the label and image inside the button.
    button.appendChild(label);
    button.appendChild(image);

    // When the user clicks a thumbnail, open the lightbox at that image.
    button.addEventListener('click', () => openLightbox(index));

    // Add the finished thumbnail to the gallery container.
    galleryElement.appendChild(button);
  });
}

// -----------------------------------------------------------------------------
// Update the lightbox with the current image
// -----------------------------------------------------------------------------
// This function fills in the big image, caption and image counter.
function updateLightbox() {
  const item = galleryItems[currentIndex];

  // Stop if there is no valid item in the array.
  if (!item) {
    return;
  }

  // Fill in the image source and alt text.
  lightboxImage.src = item.src;
  lightboxImage.alt = item.alt;

  // Fill in the caption text and show the current page count.
  lightboxCaption.textContent = item.caption;
  lightboxCounter.textContent = `${currentIndex + 1} / ${galleryItems.length}`;
}

// -----------------------------------------------------------------------------
// Open the lightbox
// -----------------------------------------------------------------------------
// This happens when a thumbnail is clicked. It sets the selected image and shows
// the modal overlay.
function openLightbox(index) {
  // Remember which image was selected.
  currentIndex = index;

  // Remember the element that had focus before opening the modal.
  lastFocusedButton = document.activeElement;

  // Update the modal with the correct image.
  updateLightbox();

  // Add the CSS class that shows the lightbox.
  lightbox.classList.add('is-open');
  lightbox.setAttribute('aria-hidden', 'false');

  // Lock the page scroll while the modal is open.
  document.body.classList.add('lightbox-open');

  // Move focus to the close button so keyboard users are inside the modal.
  closeButton.focus();
}

// -----------------------------------------------------------------------------
// Close the lightbox
// -----------------------------------------------------------------------------
// This hides the modal and returns focus to the element that opened it.
function closeLightbox() {
  lightbox.classList.remove('is-open');
  lightbox.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('lightbox-open');

  // Return focus to the button that opened the lightbox.
  if (lastFocusedButton) {
    lastFocusedButton.focus();
  }
}

// -----------------------------------------------------------------------------
// Move through the gallery
// -----------------------------------------------------------------------------
// Next and previous buttons cycle through the images in the array.
function showNextImage() {
  // Use modulo so the count wraps around to the start.
  currentIndex = (currentIndex + 1) % galleryItems.length;
  updateLightbox();
}

function showPreviousImage() {
  // This moves backward and wraps to the last item when needed.
  currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
  updateLightbox();
}

// -----------------------------------------------------------------------------
// Add click events for the lightbox controls
// -----------------------------------------------------------------------------
// Close button, next arrow, previous arrow and backdrop click all trigger actions.
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
    // Only close if the click happened on the background overlay.
    if (event.target && event.target.matches('[data-close="true"]')) {
      closeLightbox();
    }
  });
}

// -----------------------------------------------------------------------------
// Keyboard controls
// -----------------------------------------------------------------------------
// Press Escape to close, and left/right arrow keys to move between images.
document.addEventListener('keydown', (event) => {
  // Only react when the lightbox is actually open.
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

// -----------------------------------------------------------------------------
// Final step
// -----------------------------------------------------------------------------
// Start the gallery as soon as the script loads.
renderGallery();
