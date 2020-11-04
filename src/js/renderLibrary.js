import makeRenderFilmInLibrary from './renderFilm'

let watchedArrayFromLocalStorage = JSON.parse(localStorage.getItem('filmsWatched'));
let queueArrayFromLocalStorage = JSON.parse(localStorage.getItem('filmsQueue'));

const sliceDate = (films) => {

}

// makeRenderFilmInLibrary(queueArrayFromLocalStorage);
// makeRenderFilmInLibrary(watchedArrayFromLocalStorage);


export { watchedArrayFromLocalStorage, queueArrayFromLocalStorage };