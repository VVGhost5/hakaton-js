import filmService from './search-section';
import createHomepageFilmGalleryMarkup from './homepageFilmGalleryMarkup';

const refs = {
  form: document.querySelector('.search-form'),
  films: document.querySelector('.gallery-list'),
};

const searchFilms = event => {
  event.preventDefault();
  const form = event.currentTarget;
  filmService.query = form.elements.query.value;

  refs.films.innerHTML = ' ';
  filmService.fetchFilms().then(data => {
    const results = data.results;
    // console.log(data.results.backdrop_path);
    createHomepageFilmGalleryMarkup(results);

    // const backdropPath = (results, images) =>
    //   (images = refs.films.querySelectorAll('.gallery-item__image'));
    // console.log(images);

    //   results.filter((element, index, array) => {
    //     if (element.results.includes(backdrop_path)) {
    //       return elements;
    //     }
    //   });
    // console.log(backdropPath);

    if (data.total_results === 0) {
      console.log('нет такого фильма');

      return;
    }
  });
  refs.form.reset();
};

refs.form.addEventListener('submit', searchFilms);
