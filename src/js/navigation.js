import { createRouter } from 'routerjs';
import homepageMarkupTpl from '../templates/homepage-section.hbs';
import libraryPageMarkupTpl from '../templates/library-section.hbs';
import watch from '../templates/libraryElementTemplate.hbs';
import queue from '../templates/libraryElementTemplate.hbs';
import detailsTemplate from '../templates/detailsTemplate.hbs';
import { filmsArray } from './searchAndPlaginationHomePage';
import { watchedArrayFromLocalStorage, queueArrayFromLocalStorage } from './renderLibrary';
import handleFilmDetailPage from './filmDetailPage';
import { searchFilm } from './searchAndPlaginationHomePage';
import filmPagination from './pagination';

const mainRef = document.querySelector('.main-js');

// searchFilm();

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
  mainRef.innerHTML = "";
    mainRef.insertAdjacentHTML('afterbegin', markup);
    const titleRef = document.querySelector('.year');
    titleRef.textContent = date;
}   

const router = createRouter()
  .get('/', (req, context) => {
    createHomepageMarkup();
    const formRef = document.querySelector('.search-form');
    formRef.addEventListener('submit', searchFilm);
    filmPagination();
    req.stop();
  })
  .get('/library', (req, context) => {
    createLibraryMarkup();
    req.stop();
  })
  .get('/library/watch', (req, context) => {
    console.log('WATCH');
    createWatchMarkup();
    req.stop();
  })
  .get('/library/queue', (req, context) => {
    console.log('QUEUE');
    createQueueMarkup();
    req.stop();
  })
  .get('/:title', (req, context) => {
    const title = req.get('title');
    getFilmInRequest(title);
    req.stop();
  })
  .run();
  
   export { mainRef, createHomepageMarkup, createLibraryMarkup, createWatchMarkup, createQueueMarkup };
