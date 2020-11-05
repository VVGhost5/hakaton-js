import makeRenderFilmInLibrary from './renderFilm'

let watchedArrayFromLocalStorage = JSON.parse(localStorage.getItem('filmsWatched'));
let queueArrayFromLocalStorage = JSON.parse(localStorage.getItem('filmsQueue'));

const sliceDate = (films) => {

}

function savedChoice() {
    const buttonLinkWatchedRef = document.querySelector('.watch-js');
const buttonLinkQueueRef = document.querySelector('.queue-js');
  const saved = localStorage.getItem('focused');

    if (saved === 'watched') {
      buttonLinkWatchedRef.classList.add('is-active');
        buttonLinkQueueRef.classList.remove('is-active');
        return;
  } 
    buttonLinkWatchedRef.classList.remove('is-active');
        buttonLinkQueueRef.classList.add('is-active');
}

const toggleButtonStyleinLibrary = () => {
  const buttonLinkWatchedRef = document.querySelector('.watch-js');
const buttonLinkQueueRef = document.querySelector('.queue-js');
        buttonLinkWatchedRef.classList.toggle('is-active');
        buttonLinkQueueRef.classList.toggle('is-active');
}

// makeRenderFilmInLibrary(queueArrayFromLocalStorage);
// makeRenderFilmInLibrary(watchedArrayFromLocalStorage);


export { watchedArrayFromLocalStorage, queueArrayFromLocalStorage, toggleButtonStyleinLibrary, savedChoice };