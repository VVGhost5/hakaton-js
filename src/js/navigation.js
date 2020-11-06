import { createRouter } from 'routerjs';
import homepageMarkupTpl from '../templates/homepage-section.hbs';
import libraryPageMarkupTpl from '../templates/library-section.hbs';
import watch from '../templates/libraryElementTemplate.hbs';
import queue from '../templates/libraryElementTemplate.hbs';
import detailsTemplate from '../templates/detailsTemplate.hbs';
import {
  watchedArrayFromLocalStorage,
  queueArrayFromLocalStorage,
  toggleButtonStyleinLibrary,
  savedChoice,
} from './renderLibrary';
import { filmsArray, showFilms } from './searchAndPlaginationHomePage';
import handleFilmDetailPage from './filmDetailPage';
import { searchFilm } from './searchAndPlaginationHomePage';
import filmPagination from './pagination';
import filmService from './search-section';

const mainRef = document.querySelector('.main-js');

function createHomepageMarkup() {
  const homepageMarkup = homepageMarkupTpl();
  mainRef.innerHTML = homepageMarkup;
}

function createLibraryMarkup() {
  const libraryPageMarkup = libraryPageMarkupTpl();
  mainRef.innerHTML = libraryPageMarkup;
}

function createWatchMarkup() {
  const libraryRef = document.querySelector('.library');
  const markupWatch = watch(watchedArrayFromLocalStorage);
  libraryRef.innerHTML = markupWatch;
}

function createQueueMarkup() {
  const libraryRef = document.querySelector('.library');
  const queueMarkup = queue(queueArrayFromLocalStorage);
  libraryRef.innerHTML = queueMarkup;
}

function getFilmInRequest(title) {
  console.log(`title ${title}`);
  const filmName = title.replaceAll('%20', ' ');
  if (!filmsArray) {
    return;
  }
  console.log(`filmName ${filmName}`);
  let filteredFilm = filmsArray.find(el => {
    return el.title === filmName;
  });
  console.log(`filteredFilm ${filteredFilm}`);
  createFilmDetailPage(filteredFilm);
  handleFilmDetailPage(filteredFilm);
}

function createFilmDetailPage(film) {
  let date = film.release_date.slice(0, 4);
  const markup = detailsTemplate(film);
  mainRef.innerHTML = '';
  mainRef.insertAdjacentHTML('afterbegin', markup);
  const titleRef = document.querySelector('.year');
  titleRef.textContent = date;
  console.log('filmDetailpage has been created');
}

const router = createRouter()
  .get('/', (req, context) => {
    createHomepageMarkup();
    const formRef = document.querySelector('.search-form');
    formRef.addEventListener('submit', searchFilm);

    if (filmService.query) {
      filmService.query = req.query.query;
      filmService.pageStatus = req.query.page;
      console.log(filmService.query);
    }

    filmService.query = '';
    filmService.pageStatus = 1;

    showFilms();
    filmPagination();
    console.log(req);
    console.log('c', context);
    req.stop();
  })
  .get('/library', (req, context) => {
    createLibraryMarkup();
    savedChoice();
    req.stop();
  })
  .get('/library/watch', (req, context) => {
    console.log('WATCH');
    localStorage.setItem('focused', 'watch');
    toggleButtonStyleinLibrary();
    createWatchMarkup();
    req.stop();
  })
  .get('/library/queue', (req, context) => {
    console.log('QUEUE');
    localStorage.setItem('focused', 'queue');
    toggleButtonStyleinLibrary();
    createQueueMarkup();
    const watchLinkRef = document.querySelector('.watch-js');
    const queueLinkRef = document.querySelector('.queue-js');
    focusWatchHandler();
    focusQueueHandler();
    watchLinkRef.addEventListener('click', focusWatchHandler);
    queueLinkRef.addEventListener('click', focusQueueHandler);
    savedChoice();
    req.stop();
  })
  .get('/:title', (req, context) => {
    const title = req.get('title');
    getFilmInRequest(title);
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
