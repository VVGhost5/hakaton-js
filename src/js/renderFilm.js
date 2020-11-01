import renderFilm from '../templates/libraryElementTemplate.hbs';

const containerRef = document.querySelector('body');

const makeRenderFilmInLibrary = array => {
    const markup = renderFilm(array);
    containerRef.insertAdjacentHTML('afterbegin', markup);
}   

export default makeRenderFilmInLibrary;