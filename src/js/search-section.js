import createHomepageFilmGalleryMarkup from './homepageFilmGalleryMarkup';

const refs = {
  form: document.querySelector('.search-form'),
  inputFilms: document.querySelector('.input'),
  films: document.querySelector('.films'),
};

let inputValue = null;

// faafef79ea4c171e4623351b880cc7ac
function fetchFilms(inputValue) {
  return fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=faafef79ea4c171e4623351b880cc7ac&query=${inputValue}`,
  )
    .then(response => response.json())
    .catch(error => console.error(error));
}

const searchFilms = event => {
  event.preventDefault();

  refs.films.innerHTML = ' ';
  inputValue = refs.inputFilms.value;
  fetchFilms(inputValue).then(data => {
    if (data.total_results !== 0) {
      createHomepageFilmGalleryMarkup(data.results);
      console.log(data.results);
    } else {
      console.log('нет такого фильма');
    }
  });
  // В дальнейшем console.log(data.results) заменяется на createCardFunc
  refs.form.reset();
};

refs.form.addEventListener('submit', searchFilms);
