import homepageGalleryTpl from '../templates/homepageFilmGallery.hbs';
import upBtnCreate from './up-btn';

function createHomepageFilmGalleryMarkup(film) {
  const markup = homepageGalleryTpl(film);
  const galleryRef = document.querySelector('.gallery-list');
  galleryRef.insertAdjacentHTML('beforeend', markup);
  upBtnCreate();
}

export default createHomepageFilmGalleryMarkup;
