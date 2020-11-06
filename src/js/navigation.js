import { createRouter } from 'routerjs';
import homepageMarkupTpl from '../templates/homepage-section.hbs';
import libraryPageMarkupTpl from '../templates/library-section.hbs';
import watch from '../templates/libraryElementTemplate.hbs';
import queue from '../templates/libraryElementTemplate.hbs';
import detailsTemplate from '../templates/detailsTemplate.hbs';
import { toggleButtonStyleinLibrary, savedChoice } from './renderLibrary';
import { filmsArray, showPopularFilms } from './searchAndPlaginationHomePage';
import handleFilmDetailPage from './filmDetailPage';
import { searchFilm } from './searchAndPlaginationHomePage';
import { filmPagination, filmsArrayFromPagination } from './pagination';
import { showLoader } from './errorLoader';
import filmService from './search-section';

const mainRef = document.querySelector('.main-js');
let watchedArrayFromLocalStorage = JSON.parse(localStorage.getItem('filmsWatched'));
let queueArrayFromLocalStorage = JSON.parse(localStorage.getItem('filmsQueue'));

console.log('navigation');

function createHomepageMarkup() {
  const homepageMarkup = homepageMarkupTpl();
  mainRef.innerHTML = homepageMarkup;
}

function createLibraryMarkup() {
  const libraryPageMarkup = libraryPageMarkupTpl();
  mainRef.innerHTML = libraryPageMarkup;
}

function createWatchMarkup() {
    watchedArrayFromLocalStorage = JSON.parse(localStorage.getItem('filmsWatched'));
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
  console.log(`title ${title}`);
  const filmName = title.replaceAll('%20', ' ');
  if (!filmsArray) {
    return;
  }
  if (filmService.pageStatus === 1) {
    let filteredFilm = filmsArray.find(el => {
    return el.title === filmName;
  });
    console.log(`ПЕРВАЯ СТРАНИЦА ${filteredFilm}` );
createFilmDetailPage(filteredFilm);
    handleFilmDetailPage(filteredFilm);
    return;
  }
  if (filmService.pageStatus > 1) {
let filmFromPagination = filmsArrayFromPagination.find(el => {
    return el.title === filmName;
  });
      console.log(`ОСТАЛЬНЫЕ СТРАНИЦЫ ${filmFromPagination}` );
  createFilmDetailPage(filmFromPagination);
  handleFilmDetailPage(filmFromPagination);
  }
}

function createFilmDetailPage(film) {
  console.log(`Показать фильм ${film}`);
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
    showPopularFilms();
    filmPagination();
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
