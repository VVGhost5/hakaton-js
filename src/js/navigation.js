
import paginationCounrer from './next-prev_btn';
import { createRouter } from 'routerjs';
import { searchFilms } from './searchAndPlaginationHomePage';
import homepageMarkupTpl from '../templates/homepage-section.hbs';
import libraryPageMarkupTpl from '../templates/library-section.hbs';
import watch from '../templates/libraryElementTemplate.hbs';
import queue from '../templates/libraryElementTemplate.hbs';
import detailsTemplate from '../templates/detailsTemplate.hbs';
import { filmsArray } from './searchAndPlaginationHomePage';
import { watchedArrayFromLocalStorage, queueArrayFromLocalStorage } from './renderLibrary';
import handleFilmDetailPage from './filmDetailPage';


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
  const filmName = title.replaceAll('%20', ' ');
  if (!filmsArray) {
    return;
  }
  let filteredFilm = filmsArray.find(el => {
    return el.title === filmName;
  });
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
  .get('/home', (req, context) => {
    createHomepageMarkup();
    const formRef = document.querySelector('.search-form');
    formRef.addEventListener('submit', searchFilms);
    paginationCounrer();
  })
  .get('/library', (req, context) => {
    createLibraryMarkup();
  })
  .get('/library/watch', (req, context) => {
    createWatchMarkup();
  })
  .get('/library/queue', (req, context) => {
    createQueueMarkup();
  })
  .get('/:title', (req, context) => {
    const title = req.get('title');
    if (title === undefined || title == 'home' || title == 'library' || title == 'queue' || title == 'watch') {
      return;
    }
    getFilmInRequest(title);
    
  })
  .run();
  
   export { mainRef, createHomepageMarkup, createLibraryMarkup, createWatchMarkup, createQueueMarkup };
