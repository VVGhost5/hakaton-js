import createHomepageFilmGalleryMarkup from './homepageFilmGalleryMarkup';
import filmService from './search-section';

function requestFilm() {
  filmService.fetchFilms().then(data => {
    createHomepageFilmGalleryMarkup(data.results);
  });
}

function paginationCounter() {
  const targetBtnRef = document.querySelector('#counter');
  const incrementBtnRef = document.querySelector(
    "button[data-counter='increment']",
  );
  const decrementBtnRef = document.querySelector(
    "button[data-counter='decrement']",
  );
  const valueRef = document.getElementById('value');

  const valueIncrement = () => {
    const filmsRef = document.querySelector('.gallery-list');
    filmsRef.innerHTML = '';
    requestFilm();
    valueRef.textContent = filmService.page;

    if (valueRef.textContent > 1) {
      decrementBtnRef.classList.remove('not-visible');
    }
  };

  const valueDecrement = () => {
    --valueRef.textContent;
    requestFilm();
    valueRef.textContent = filmService.page;

    if (valueRef.textContent < 2) {
      decrementBtnRef.classList.add('not-visible');
    }
  };

  incrementBtnRef.addEventListener('click', valueIncrement);

  decrementBtnRef.addEventListener('click', valueDecrement);
}

export default paginationCounter;
