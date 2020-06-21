function Gallery(gallery) {
  if (!gallery) {
    throw new Error('No Gallery Found');
  }
  // select all te images we need
  const images = Array.from(gallery.querySelectorAll('img'));
  const modal = document.querySelector('.modal');
  const prevButton = modal.querySelector('.prev');
  const nextButton = modal.querySelector('.next');
  const xButton = modal.querySelector('.closeModal');
  let currentImage;

  function openModal() {
    console.info('opening modal');
    // first check if the modal is already opened
    if (modal.matches('.open')) {
      console.info('modal is alreeady opened');
      return; // stop the function from running
    }
    modal.classList.add('open');
    // bound event listeners to the open modal function
    window.addEventListener('keyup', handleKeyUp);
    nextButton.addEventListener('click', showNextImage);
    prevButton.addEventListener('click', showPrevImage);
  }

  function closeModal() {
    modal.classList.remove('open');
    // TODO: add event listeners clicks and keyboard
    window.removeEventListener('keyup', handleKeyUp);
    nextButton.removeEventListener('click', showNextImage);
    prevButton.removeEventListener('click', showPrevImage);
  }

  function handleClickOutside(e) {
    // if what was clicked is the exact same thing as what we are listening for to be clicked
    // then we want to go ahead and close the modal
    if (e.target === e.currentTarget) {
      closeModal();
    }
  }

  function handleKeyUp(event) {
    if (event.key === 'Escape') return closeModal();
    if (event.key === 'ArrowRight') return showNextImage();
    if (event.key === 'ArrowLeft') return showPrevImage();
  }

  function showNextImage() {
    showImage(currentImage.nextElementSibling || gallery.firstElementChild);
  }

  function showPrevImage() {
    showImage(currentImage.previousElementSibling || gallery.lastElementChild);
  }

  function showImage(el) {
    if (!el) {
      console.log('no image to show');
      return;
    }
    // update the modal with this image info
    console.log(el);
    modal.querySelector('img').src = el.src;
    currentImage = el;
    openModal();
  }

  // These are our eventListeners
  images.forEach(image =>
    image.addEventListener('click', e => showImage(e.currentTarget))
  );

  // loop over each image
  images.forEach(image => {
    // attach an event listener for each image
    image.addEventListener('keyup', e => {
      // when that is keyup'd check if it was the Enter key
      if (e.key === 'Enter') {
        // if it was show that image
        showImage(e.currentTarget);
      }
    });
  });

  modal.addEventListener('click', handleClickOutside);
  xButton.addEventListener('click', closeModal);
}

// use it on the page

const gallery1 = Gallery(document.querySelector('.gallery1'));
const gallery2 = Gallery(document.querySelector('.gallery2'));
