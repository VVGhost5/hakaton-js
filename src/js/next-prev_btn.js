import createHomepageFilmGalleryMarkup from './homepageFilmGalleryMarkup';
import filmService from './search-section';

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
    filmService.incrementPage();
    filmService.fetchFilms().then(data => {
      const filmsRef = document.querySelector('.gallery-list');
      filmsRef.innerHTML = '';
      valueRef.textContent = filmService.page;
      createHomepageFilmGalleryMarkup(data.results);
      console.log('incr', data);
    });

    if (valueRef.textContent > 1) {
      decrementBtnRef.classList.remove('not-visible');
    }
  };

  const valueDecrement = () => {
    filmService.decrementPage();
    filmService.fetchFilms().then(data => {
      const filmsRef = document.querySelector('.gallery-list');
      filmsRef.innerHTML = '';
      valueRef.textContent = filmService.page;
      createHomepageFilmGalleryMarkup(data.results);
      console.log('decr', data);
    });

    console.log('PREV CLICKED');

    valueRef.textContent = filmService.page;

    if (valueRef.textContent < 2) {
      decrementBtnRef.classList.add('not-visible');
    }
  };

  incrementBtnRef.addEventListener('click', valueIncrement);

  decrementBtnRef.addEventListener('click', valueDecrement);
}

export default paginationCounter;
