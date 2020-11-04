// import paginationCounrer from './next-prev_btn';
import filmService from './search-section';
import createHomepageFilmGalleryMarkup from './homepageFilmGalleryMarkup';
// import homepageMarkupTpl from '../templates/homepage-section.hbs';
// import libraryPageMarkupTpl from '../templates/library-section.hbs';
// import { createRouter } from 'routerjs';
import { createHomepageMarkup } from './navigation';
import showNotFound from './showNotFound';

let filmsArray = [];
// const mainRef = document.querySelector('.main-js');
const homeLinkRef = document.querySelector('.home-js');
const libraryLinkRef = document.querySelector('.library-js');
savedFocus();
createHomepageMarkup();

// const router = createRouter()
//   .get('/home', (req, context) => {
//     createHomepageMarkup();
//     const formRef = document.querySelector('.search-form');
//     formRef.addEventListener('submit', searchFilms);
//     paginationCounrer();
//   })
//   .get('/library', (req, context) => {
//     createLibraryMarkup();
//   })
//   .run();

// function createHomepageMarkup() {
//   const homepageMarkup = homepageMarkupTpl();
//   mainRef.innerHTML = homepageMarkup;
// }

// function createLibraryMarkup() {
//   const libraryPageMarkup = libraryPageMarkupTpl();
//   mainRef.innerHTML = libraryPageMarkup;
// }

function searchFilms(event) {
  event.preventDefault();
  const formRef = document.querySelector('.search-form');
  const filmsRef = document.querySelector('.gallery-list');
  const form = event.currentTarget;
  filmService.query = form.elements.query.value;

  filmsRef.innerHTML = ' ';

  filmService.fetchFilms().then(data => {
    const results = data.results;
    filmsArray = results;
    results.map(el => {
      if (el.backdrop_path === null) {
        return el.backdrop_path = 'https://miro.medium.com/max/978/1*pUEZd8z__1p-7ICIO1NZFA.png'
      }
      return el.backdrop_path = `https://image.tmdb.org/t/p/w500${el.backdrop_path}`;
    });
    
    createHomepageFilmGalleryMarkup(results);
    if (data.total_results === 0) {
      console.log('нет такого фильма');
      showNotFound();
      return;
    }
    createHomepageFilmGalleryMarkup(data.results);
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

export { searchFilms, filmsArray};