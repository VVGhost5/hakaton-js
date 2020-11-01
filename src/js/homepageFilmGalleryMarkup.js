// import createGalleryMarkup from '../../../goit-js-hw-13-image-finder/src/js/create-gallery-markup';
import homepageGalleryTpl from '../templates/homepageFilmGallery.hbs';

function createHomepageFilmGalleryMarkup(film) {
  const markup = homepageGalleryTpl(film);
  const galleryRef = document.querySelector('.gallery-list');
  galleryRef.insertAdjacentHTML('beforeend', markup);
}

export default createHomepageFilmGalleryMarkup;
