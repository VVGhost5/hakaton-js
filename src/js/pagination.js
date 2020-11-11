import findAndReplaceDamagedImage from './findAndReplaceDamagedImage';
import createHomepageFilmGalleryMarkup from './homepageFilmGalleryMarkup';
import filmService from './search-section';

let filmsArrayFromPagination = [];

function filmPagination() {
  const incrementBtnRef = document.querySelector(
    "button[data-counter='increment']",
  );
  const decrementBtnRef = document.querySelector(
    "button[data-counter='decrement']",
  );
  const valueRef = document.getElementById('value');

  const valueIncrement = () => {
    filmService.incrementPage();
    filmService
      .fetchFilms()
      .then(data => {
        filmsArrayFromPagination = data.results;
        const filmsRef = document.querySelector('.gallery-list');
        filmsRef.innerHTML = '';
        findAndReplaceDamagedImage(data);
        createHomepageFilmGalleryMarkup(data.results);
        valueRef.textContent = filmService.pageStatus;

        const state = { page: filmService.pageStatus };

        window.history.pushState(
          state,
          '',
          `hakaton-js?query=${filmService.query}&page=${filmService.pageStatus}`,
        );

        if (filmService.pageStatus < data.total_pages) {
          incrementBtnRef.classList.remove('not-visible');
        }
        if (filmService.pageStatus === data.total_pages) {
          incrementBtnRef.classList.add('not-visible');
        }
        if (filmService.pageStatus > 1) {
          decrementBtnRef.classList.remove('not-visible');
        }
      })
      .catch(error => console.log(error));
  };

  const valueDecrement = () => {
    filmService.decrementPage();
    filmService
      .fetchFilms()
      .then(data => {
        filmsArrayFromPagination = data.results;
        const filmsRef = document.querySelector('.gallery-list');
        filmsRef.innerHTML = '';
        findAndReplaceDamagedImage(data);
        createHomepageFilmGalleryMarkup(data.results);
        valueRef.textContent = filmService.pageStatus;

        const state = { page: filmService.pageStatus };

        window.history.pushState(
          state,
          '',
          `hakaton-js?query=${filmService.query}&page=${filmService.pageStatus}`,
        );

        if (filmService.pageStatus === 1) {
          incrementBtnRef.classList.remove('visible');
          decrementBtnRef.classList.add('not-visible');
        }
        if (filmService.pageStatus < data.total_pages) {
          incrementBtnRef.classList.add('visible');
          incrementBtnRef.classList.remove('not-visible');
        }
      })
      .catch(error => console.log(error));
  };

  incrementBtnRef.addEventListener('click', valueIncrement);

  decrementBtnRef.addEventListener('click', valueDecrement);
}

export { filmsArrayFromPagination, filmPagination };
