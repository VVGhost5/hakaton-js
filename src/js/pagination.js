import findAndReplaceDamagedImage from './findAndReplaceDamagedImage';
import createHomepageFilmGalleryMarkup from './homepageFilmGalleryMarkup';
import filmService from './search-section';
import { filmsArray } from './searchAndPlaginationHomePage';

console.log(filmsArray);

function filmPagination() {
  const incrementBtnRef = document.querySelector(
    "button[data-counter='increment']",
  );
  const decrementBtnRef = document.querySelector(
    "button[data-counter='decrement']",
  );
  const valueRef = document.getElementById('value');

  const valueIncrement = event => {
    filmService.incrementPage();
    filmService
      .fetchFilms()
      .then(data => {
        const filmsRef = document.querySelector('.gallery-list');
        filmsArray = data.results;
        filmsRef.innerHTML = '';
        findAndReplaceDamagedImage(data);
        createHomepageFilmGalleryMarkup(data.results);
        valueRef.textContent = filmService.page;
        console.log('data after NEXT', data);

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
        const filmsRef = document.querySelector('.gallery-list');
        filmsArray = data.results;
        filmsRef.innerHTML = '';
        findAndReplaceDamagedImage(data);
        createHomepageFilmGalleryMarkup(data.results);
        valueRef.textContent = filmService.page;
        console.log('data after PREV', data);
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

export default filmPagination;
