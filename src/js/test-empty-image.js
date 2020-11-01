import filmService from './search-section';
import createHomepageFilmGalleryMarkup from './homepageFilmGalleryMarkup';

const refs = {
  form: document.querySelector('.search-form'),
  films: document.querySelector('.gallery-list'),
};

console.log(refs.films);

export const searchFilms = event => {
  event.preventDefault();
  const form = event.currentTarget;
  filmService.query = form.elements.query.value;

  // refs.films.innerHTML = ' ';
  filmService.fetchFilms().then(data => {
    const results = data.results;
    // console.log(data.results);
    createHomepageFilmGalleryMarkup(results);
    const images = document.querySelectorAll('.gallery-item__image');
    const imagesArray = Array.prototype.slice.call(images);
    // console.log(imagesArray);

    // const backdropPath = results =>
    //   results
    //     .filter(result => {
    //       if (result.backdrop_path === null) return result;
    //     })
    //     .map(result => {
    //       return result.id;
    //     });

    const failedImages = images =>
      images.map(image => {
        if (image.src === 'https://image.tmdb.org/t/p/w500') {
          // image.src === './images/netflix.png';
        }
        return image.src;
      });

    // console.log(backdropPath(results));
    // console.log(failedImages(imagesArray));

    if (data.total_results === 0) {
      console.log('нет такого фильма');

      return;
    }
  });
  refs.form.reset();
};

export default searchFilms;
