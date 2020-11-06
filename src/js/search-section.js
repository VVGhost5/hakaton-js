const key = 'faafef79ea4c171e4623351b880cc7ac';

export default {
  searchQuery: '',
  page: 1,

  fetchFilms(film) {
    film = this.searchQuery;
    const urlWithQuery = `https://api.themoviedb.org/3/search/movie?api_key=${key}&query=${this.searchQuery}&page=${this.page}`;
    const urlWithPopularFilms = `https://api.themoviedb.org/3/movie/popular?api_key=${key}&language=en-US&page=${this.page}`;
    const url = film ? urlWithQuery : urlWithPopularFilms;

    return fetch(url).then(res => res.json());
  },
  resetPage() {
    this.page = 1;
  },
  incrementPage() {
    this.page += 1;
  },
  decrementPage() {
    this.page -= 1;
  },
  get pageStatus() {
    return this.page;
  },
  set pageStatus(value) {
    this.page = value;
  },
  get query() {
    return this.searchQuery;
  },
  set query(value) {
    this.searchQuery = value;
  },
};
