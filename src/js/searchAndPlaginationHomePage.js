import findAndReplaceDamagedImage from './findAndReplaceDamagedImage';
import filmPagination from './pagination.js';
import filmService from './search-section';
import createHomepageFilmGalleryMarkup from './homepageFilmGalleryMarkup';
import { createHomepageMarkup } from './navigation';

export let filmsArray = [];

const homeLinkRef = document.querySelector('.home-js');
const libraryLinkRef = document.querySelector('.library-js');

createHomepageMarkup();
filmPagination();

function showPopularFilms() {
  filmService
    .fetchFilms()
    .then(data => {
      console.log('Data from Popular', data);
      filmsArray = data.results;
      findAndReplaceDamagedImage(data);
      createHomepageFilmGalleryMarkup(data.results);
      const counterRef = document.querySelector('#counter');
      counterRef.classList.remove('display-none');
    })
    .catch(error => console.log(error));
}

savedFocus();

const formRef = document.querySelector('.search-form');

function searchFilm(event) {
  event.preventDefault();

  const filmsRef = document.querySelector('.gallery-list');
  const counterRef = document.querySelector('#counter');
  const wrongInputNotification = document.querySelector(
    '.wrong-input-notification',
  );
  const incrementBtnRef = document.querySelector(
    "button[data-counter='increment']",
  );

  const form = event.currentTarget;
  filmService.query = form.elements.query.value;

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
  filmService
    .fetchFilms()
    .then(data => {
      console.log(data);
      console.log('DATA from input form', data);
      filmsArray = data.results;
      console.log('from input', filmsArray);
      findAndReplaceDamagedImage(data);
      createHomepageFilmGalleryMarkup(data.results);

      wrongInputNotification.textContent = '';

      if (data.total_results === 0) {
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

  formRef.reset();
}

function focusHomeHandler() {
  homeLinkRef.classList.add('active');
  libraryLinkRef.classList.remove('active');
  localStorage.setItem('focusedLinkOnHomepage', 'home');
}

function focusLibraryHandler() {
  homeLinkRef.classList.remove('active');
  libraryLinkRef.classList.add('active');
  localStorage.setItem('focusedLinkOnHomepage', 'library');
}

function savedFocus() {
  const saved = localStorage.getItem('focusedLinkOnHomepage');

  if (saved === 'library') {
    libraryLinkRef.classList.add('active');
    homeLinkRef.classList.remove('active');
  }
}

homeLinkRef.addEventListener('click', focusHomeHandler);
libraryLinkRef.addEventListener('click', focusLibraryHandler);
formRef.addEventListener('submit', searchFilm);

export { searchFilm, showPopularFilms };
