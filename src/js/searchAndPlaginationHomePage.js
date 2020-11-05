import findAndReplaceDamagedImage from './findAndReplaceDamagedImage';
import filmPagination from './pagination.js';
import filmService from './search-section';
import homepageMarkupTpl from '../templates/homepage-section.hbs';
import createHomepageFilmGalleryMarkup from './homepageFilmGalleryMarkup';
import { createHomepageMarkup } from './navigation';
import showNotFound from './showNotFound';

let filmsArray = [];

const homeLinkRef = document.querySelector('.home-js');
const libraryLinkRef = document.querySelector('.library-js');

createHomepageMarkup();

filmPagination();
filmService
  .fetchFilms()
  .then(data => {
    console.log(data);
    createHomepageFilmGalleryMarkup(data.results);
  })
  .catch(error => console.log(error));

savedFocus();

const formRef = document.querySelector('.search-form');

function searchFilm(event, film) {
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
    console.log('Button NEXT remove not-visible and add visible');
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

    console.log('PAGE STATUS AFTER RESET PAGE', filmService.pageStatus);
  }

  console.log('current page from searchFilm', filmService.pageStatus);

  filmsRef.innerHTML = ' ';
  filmService
    .fetchFilms()
    .then(data => {
      console.log(data);
      filmsArray = data.results;
      findAndReplaceDamagedImage(data);
      createHomepageFilmGalleryMarkup(data.results);

      wrongInputNotification.textContent = '';

      if (data.total_results === 0) {
        wrongInputNotification.textContent =
          'Please enter a more specific query';
        return;
      }
      if (data.total_pages === 1) {
        console.log('Знайшло 1 сторінку. Кнопопки не показуємо');
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

export { filmsArray, searchFilm };
