import findAndReplaceDamagedImage from './findAndReplaceDamagedImage';
import filmPagination from './pagination.js';
import filmService from './search-section';
import createHomepageFilmGalleryMarkup from './homepageFilmGalleryMarkup';
import homepageMarkupTpl from '../templates/homepage-section.hbs';
import libraryPageMarkupTpl from '../templates/library-section.hbs';

const mainRef = document.querySelector('.main-js');
const homeLinkRef = document.querySelector('.home-js');
const libraryLinkRef = document.querySelector('.library-js');
createHomepageMarkup();
const formRef = document.querySelector('.search-form');
savedFocus();

function createHomepageMarkup() {
  const homepageMarkup = homepageMarkupTpl();
  mainRef.innerHTML = homepageMarkup;
}

function createLibraryMarkup() {
  const libraryPageMarkup = libraryPageMarkupTpl();
  mainRef.innerHTML = libraryPageMarkup;
}

// function searchFilms(event) {
//   event.preventDefault();
//   const filmsRef = document.querySelector('.gallery-list');
//   const counterRef = document.querySelector('#counter');
//   const form = event.currentTarget;
//   filmService.query = form.elements.query.value;

//   filmsRef.innerHTML = ' ';
//   filmService.resetPage();
//   filmService
//     .fetchFilms()
//     .then(data => {
//       findAndReplaceDamagedImage(data);

//       if (data.total_results === 0) {
//         console.log('нет такого фильма');
//         return;
//       }
//       createHomepageFilmGalleryMarkup(data.results);
//       counterRef.classList.remove('display-none');
//       filmPagination();
//     })
//     .catch(error => console.log(error));

//   formRef.reset();
// }

// formRef.addEventListener('submit', searchFilms);

formRef.addEventListener('submit', event => {
  event.preventDefault();
  const filmsRef = document.querySelector('.gallery-list');
  const counterRef = document.querySelector('#counter');
  const valueRef = document.getElementById('value');
  const decrementBtnRef = document.querySelector(
    "button[data-counter='decrement']",
  );
  const form = event.currentTarget;

  filmService.query = form.elements.query.value;

  if (filmService.searchQuery === '') {
    return;
  }

  filmService.resetPage();

  if (filmService.resetPage) {
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
      findAndReplaceDamagedImage(data);
      createHomepageFilmGalleryMarkup(data.results);

      if (data.total_results === 0) {
        console.log('нет такого фильма');
        return;
      }

      filmPagination();
    })
    .catch(error => console.log(error));

  formRef.reset();

  counterRef.classList.remove('display-none');
});

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
