import homepageGalleryTpl from '../templates/homepageFilmGallery.hbs';

function createHomepageFilmGalleryMarkup(film) {
  const markup = homepageGalleryTpl(film);
  const galleryRef = document.querySelector('.gallery-list');
  galleryRef.insertAdjacentHTML('beforeend', markup);
}

export default createHomepageFilmGalleryMarkup;
