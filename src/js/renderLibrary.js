import makeRenderFilmInLibrary from './renderFilm'

let watchedArrayFromLocalStorage = JSON.parse(localStorage.getItem('filmsWatched'));
let queueArrayFromLocalStorage = JSON.parse(localStorage.getItem('filmsQueue'));

makeRenderFilmInLibrary(queueArrayFromLocalStorage);
makeRenderFilmInLibrary(watchedArrayFromLocalStorage);