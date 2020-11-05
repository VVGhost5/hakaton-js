function findAndReplaceDamagedImage(data) {
  const results = data.results;
  results.map(el => {
    if (el.backdrop_path === null) {
      return (el.backdrop_path = './images/alternative-film.jpg');
    }
    return (el.backdrop_path = `https://image.tmdb.org/t/p/w500${el.backdrop_path}`);
  });
}

export default findAndReplaceDamagedImage;
