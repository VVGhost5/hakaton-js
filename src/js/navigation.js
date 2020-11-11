import { createRouter } from 'routerjs';
import homepageMarkupTpl from '../templates/homepage-section.hbs';
import libraryPageMarkupTpl from '../templates/library-section.hbs';
import watch from '../templates/libraryElementTemplate.hbs';
import queue from '../templates/libraryElementTemplate.hbs';
import detailsTemplate from '../templates/detailsTemplate.hbs';
import { toggleButtonStyleinLibrary, savedChoice } from './renderLibrary';
import {
  filmsArray,
  showFilms,
  searchFilm,
} from './searchAndPaginationHomePage';
import handleFilmDetailPage from './filmDetailPage';
import { filmPagination, filmsArrayFromPagination } from './pagination';
import { showLoader } from './errorLoader';
import filmService from './search-section';
import {
  savedFocusHomeLibrary,
  focusHomeHandler,
  focusLibraryHandler,
} from './home-library-btns-service';

const mainRef = document.querySelector('.main-js');
let watchedArrayFromLocalStorage = JSON.parse(
  localStorage.getItem('filmsWatched'),
);
let queueArrayFromLocalStorage = JSON.parse(localStorage.getItem('filmsQueue'));

function createHomepageMarkup() {
  const homepageMarkup = homepageMarkupTpl();
  mainRef.innerHTML = homepageMarkup;
}

function createLibraryMarkup() {
  const libraryPageMarkup = libraryPageMarkupTpl();
  mainRef.innerHTML = libraryPageMarkup;
}

function createWatchMarkup() {
  watchedArrayFromLocalStorage = JSON.parse(
    localStorage.getItem('filmsWatched'),
  );
  const libraryRef = document.querySelector('.library');
  const markupWatch = watch(watchedArrayFromLocalStorage);
  libraryRef.innerHTML = markupWatch;
}

function createQueueMarkup() {
  queueArrayFromLocalStorage = JSON.parse(localStorage.getItem('filmsQueue'));
  const libraryRef = document.querySelector('.library');
  const queueMarkup = queue(queueArrayFromLocalStorage);
  libraryRef.innerHTML = queueMarkup;
}

function getFilmInRequest(title) {
  const filmName = title.replaceAll('%20', ' ');
  if (!filmsArray) {
    return;
  }
  if (filmService.pageStatus === 1) {
    let filteredFilm = filmsArray.find(el => {
      return el.title === filmName;
    });
    createFilmDetailPage(filteredFilm);
    handleFilmDetailPage(filteredFilm);
    return;
  }
  if (filmService.pageStatus > 1) {
    let filmFromPagination = filmsArrayFromPagination.find(el => {
      return el.title === filmName;
    });
    createFilmDetailPage(filmFromPagination);
    handleFilmDetailPage(filmFromPagination);
  }
}

function createFilmDetailPage(film) {
  let date = film.release_date.slice(0, 4);
  const markup = detailsTemplate(film);
  mainRef.innerHTML = '';
  mainRef.insertAdjacentHTML('afterbegin', markup);
  const titleRef = document.querySelector('.year');
  titleRef.textContent = date;
}

const router = createRouter()

  .get('/hakaton-js', (req, context) => {
    createHomepageMarkup();

    const homeWrapper = document.querySelector('.home-wrapper-js');
    const libraryWrapper = document.querySelector('.library-wrapper-js');
    if (!homeWrapper.classList.contains('active')) {
      homeWrapper.classList.add('active');
      libraryWrapper.classList.remove('active');
      localStorage.setItem('focusedLinkOnHomepage', 'home');
    }

    const formRef = document.querySelector('.search-form');
    formRef.addEventListener('submit', searchFilm);

    if (filmService.query) {
      filmService.query = req.query.query;
      filmService.pageStatus = req.query.page;
    }

    filmService.query = '';
    filmService.pageStatus = 1;

    showFilms();
    filmPagination();
    req.stop();
  })
  .get('/hakaton-js/library', (req, context) => {
    createLibraryMarkup();
    savedChoice();
    req.stop();
  })
  .get('/hakaton-js/library/watch', (req, context) => {
    localStorage.setItem('focused', 'watch');
    toggleButtonStyleinLibrary();
    createWatchMarkup();
    req.stop();
  })
  .get('/hakaton-js/library/queue', (req, context) => {
    localStorage.setItem('focused', 'queue');
    toggleButtonStyleinLibrary();
    createQueueMarkup();
    req.stop();
  })
  .get('/:title', (req, context) => {
    const title = req.get('title');
    getFilmInRequest(title);
    req.stop();
  })
  .get('/404', (req, context) => {
    showLoader();
    req.stop();
  })

  .run();

export {
  mainRef,
  createHomepageMarkup,
  createLibraryMarkup,
  createWatchMarkup,
  createQueueMarkup,
  createFilmDetailPage,
};
