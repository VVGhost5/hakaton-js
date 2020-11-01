const key = 'faafef79ea4c171e4623351b880cc7ac';

export default {
  searchQuery: '',
  page: 1,
  fetchFilms() {
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${key}&query=${this.searchQuery}`;

    return fetch(url)
      .then(res => res.json())
      .then(data => {
        return data;
      });
  },
  resetPage() {
    this.page = 1;
  },
  incrementPage() {
    this.page += 1;
  },
  get query() {
    return this.searchQuery;
  },
  set query(value) {
    this.searchQuery = value;
  },
};
