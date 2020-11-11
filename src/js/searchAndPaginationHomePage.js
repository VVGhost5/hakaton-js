import findAndReplaceDamagedImage from './findAndReplaceDamagedImage';
import { filmPagination } from './pagination.js';
import filmService from './search-section';
import createHomepageFilmGalleryMarkup from './homepageFilmGalleryMarkup';
import {
  savedFocusHomeLibrary,
  focusHomeHandlerfrom,
} from './home-library-btns-service';
import { createHomepageMarkup } from './navigation';

let filmsArray = [];

createHomepageMarkup();
filmPagination();
savedFocusHomeLibrary();
const formRef = document.querySelector('.search-form');

function showFilms() {
  const wrongInputNotification = document.querySelector(
    '.wrong-input-notification',
  );
  const incrementBtnRef = document.querySelector(
    "button[data-counter='increment']",
  );
  filmService
    .fetchFilms()
    .then(data => {
      filmsArray = data.results;
      findAndReplaceDamagedImage(data);
      sliceDate(data.results);
      createHomepageFilmGalleryMarkup(data.results);
      const counterRef = document.querySelector('#counter');
      counterRef.classList.remove('display-none');

      const state = { page: filmService.pageStatus };

      window.history.pushState(
        state,
        '',
        `hakaton-js?query=${filmService.query}&page=${filmService.pageStatus}`);
     
      wrongInputNotification.textContent = '';
      
  
      if (
        (data.total_results === 0) &
        !counterRef.classList.contains('display-none')
      ) {
        counterRef.classList.add('display-none');
        wrongInputNotification.textContent =
          'Please enter a more specific query';
        return;
      }
      if (data.total_pages === 1) {
        incrementBtnRef.classList.add('not-visible');
        return;
      }
      counterRef.classList.remove('display-none');
    })
    .catch(error => console.log(error));
}

function searchFilm(event) {
  event.preventDefault();

  const filmsRef = document.querySelector('.gallery-list');
  
  const incrementBtnRef = document.querySelector(
    "button[data-counter='increment']",
  );
  const counterRef = document.querySelector('#counter');
 
  const wrongInputNotification = document.querySelector(
    '.wrong-input-notification',
  );

  const form = event.currentTarget;
  filmService.query = form.elements.query.value.trim();

  const state = { page: filmService.pageStatus };

  window.history.pushState(
    state,
    '',
    `hakaton-js?query=${filmService.query}&page=${filmService.pageStatus}`,
  );

  if (filmService.searchQuery === '') {
    wrongInputNotification.textContent =
      'The field is empty. Please type your query';
    counterRef.classList.add('display-none');
    return;
  }

  filmService.resetPage();

  if (
    (filmService.pageStatus === 1) &
    incrementBtnRef.classList.contains('not-visible')
  ) {
    incrementBtnRef.classList.remove('not-visible');
    incrementBtnRef.classList.add('visible');
  }

  if (filmService.resetPage) {
    const valueRef = document.getElementById('value');
    const decrementBtnRef = document.querySelector(
      "button[data-counter='decrement']",
    );

    valueRef.textContent = filmService.page;
    decrementBtnRef.classList.remove('visible');
    decrementBtnRef.classList.add('not-visible');
  }

  filmsRef.innerHTML = ' ';

  showFilms();
  formRef.reset();
  form.reset();
}

function sliceDate(films) {
  films.map(el => {
    el.release_date = el.release_date.slice(0, 4);
  });
}

formRef.addEventListener('submit', searchFilm);

export { filmsArray, searchFilm, sliceDate, showFilms };
