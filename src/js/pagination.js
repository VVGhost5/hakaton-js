import findAndReplaceDamagedImage from './findAndReplaceDamagedImage';
import createHomepageFilmGalleryMarkup from './homepageFilmGalleryMarkup';
import filmService from './search-section';

function filmPagination() {
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
        findAndReplaceDamagedImage(data);
        createHomepageFilmGalleryMarkup(data.results);
        valueRef.textContent = filmService.page;
        console.log('pageStatus after Increment', filmService.pageStatus);

        if (filmService.pageStatus > 1) {
          decrementBtnRef.classList.remove('not-visible');
          decrementBtnRef.classList.add('visible');
        }

        if (filmService.pageStatus >= data.total_pages) {
          incrementBtnRef.classList.add('not-visible');
          incrementBtnRef.classList.remove('visible');
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
        findAndReplaceDamagedImage(data);
        createHomepageFilmGalleryMarkup(data.results);
        valueRef.textContent = filmService.page;
        console.log('page status after Decrement', filmService.page);

        if (filmService.pageStatus >= data.total_pages) {
          incrementBtnRef.classList.remove('not-visible');
          incrementBtnRef.classList.add('visible');
        }

        if (filmService.pageStatus < 2) {
          decrementBtnRef.classList.remove('visible');
          decrementBtnRef.classList.add('not-visible');
        }
      })
      .catch(error => console.log(error));
  };

  incrementBtnRef.addEventListener('click', valueIncrement);

  decrementBtnRef.addEventListener('click', valueDecrement);
}

export default filmPagination;
