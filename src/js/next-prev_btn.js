import changedDamagedImage from './searchAndPlaginationHomePage';
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
    filmService
      .fetchFilms()
      .then(data => {
        const filmsRef = document.querySelector('.gallery-list');
        filmsRef.innerHTML = '';
        valueRef.textContent = filmService.page;
        changedDamagedImage(data);
        createHomepageFilmGalleryMarkup(data.results);
        if (filmService.pageStatus > 1) {
          decrementBtnRef.classList.remove('not-visible');
          decrementBtnRef.classList.add('visible');
        }

        if (filmService.pageStatus >= data.total_pages) {
          incrementBtnRef.setAttribute('disabled', true);
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
        filmsRef.innerHTML = '';
        valueRef.textContent = filmService.page;
        changedDamagedImage(data);
        createHomepageFilmGalleryMarkup(data.results);

        if (filmService.pageStatus <= data.total_pages) {
          incrementBtnRef.removeAttribute('disabled');
        }
      })
      .catch(error => console.log(error));

    if (filmService.pageStatus < 2) {
      decrementBtnRef.classList.remove('visible');
      decrementBtnRef.classList.add('not-visible');
    }
  };

  incrementBtnRef.addEventListener('click', valueIncrement);

  decrementBtnRef.addEventListener('click', valueDecrement);
}

export default paginationCounter;
