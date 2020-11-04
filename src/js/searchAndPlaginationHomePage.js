import paginationCounrer from './next-prev_btn';
import filmService from './search-section';
import createHomepageFilmGalleryMarkup from './homepageFilmGalleryMarkup';
import homepageMarkupTpl from '../templates/homepage-section.hbs';
import libraryPageMarkupTpl from '../templates/library-section.hbs';
import shortFilmsListTmpl from '../templates/input-list.hbs';
import { createRouter } from 'routerjs';


const mainRef = document.querySelector('.main-js');
const homeLinkRef = document.querySelector('.home-js');
const libraryLinkRef = document.querySelector('.library-js');
savedFocus();
createHomepageMarkup();

const router = createRouter()
  .get('/home', (req, context) => {
    createHomepageMarkup();
        const formRef = document.querySelector('.search-form');
    formRef.addEventListener('submit', searchFilms);
    paginationCounrer();
  })
  .get('/library', (req, context) => {
    createLibraryMarkup();
  })
  .run();

function createHomepageMarkup() {
  const homepageMarkup = homepageMarkupTpl();
  mainRef.innerHTML = homepageMarkup;
}

function createLibraryMarkup() {
  const libraryPageMarkup = libraryPageMarkupTpl();
  mainRef.innerHTML = libraryPageMarkup;
}




// // Живой инпут...
// const refs = {
//   inputFilms: document.querySelector('.input'),
//   shortFilmsList: document.querySelector('.short-list-films'),
//   form: document.querySelector('.search-form'),
//   films: document.querySelector('.gallery-list'),
// };

// function shortFilmsListMarkup(films) {
//   refs.shortFilmsList.insertAdjacentHTML(
//     'beforeend',
//     shortFilmsListTmpl(films),
//   );
// }

// const inputFilmsHeandler = event => {
//   filmService.query = event.target.value;
//   console.log(filmService.query);
//   filmService
//   .fetchFilms(filmService.query)
//   .then(data => shortFilmsListMarkup(data.results));
// };


// refs.inputFilms.addEventListener('input', inputFilmsHeandler);


// function inputTitleFilms(event) {
//   refs.shortFilmsList.innerHTML = ' ';
//   refs.films.innerHTML = ' ';
//   createHomepageFilmGalleryMarkup(event);
//   refs.form.reset();
// }

// refs.shortFilmsList.addEventListener('click', inputTitleFilms);
// input is end

function searchFilms(event) {
  event.preventDefault();
  const formRef = document.querySelector('.search-form');
  const filmsRef = document.querySelector('.gallery-list');
  const form = event.currentTarget;
  filmService.query = form.elements.query.value;

  filmsRef.innerHTML = ' ';

  filmService.fetchFilms().then(data => {
    if (data.total_results === 0) {
      console.log('нет такого фильма');
      return;
    }
    createHomepageFilmGalleryMarkup(data.results);
    console.log('data from searchFilm', data);
  });

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

homeLinkRef.addEventListener('click', focusHomeHandler);
libraryLinkRef.addEventListener('click', focusLibraryHandler);

function savedFocus() {
  const saved = localStorage.getItem('focusedLinkOnHomepage');

  if (saved === 'library') {
    libraryLinkRef.classList.add('active');
    homeLinkRef.classList.remove('active');
  }
}


