function findAndReplaceDamagedImage(data) {
  const results = data.results;
  results.map(el => {
    if (el.backdrop_path === null) {
      return (el.backdrop_path = 'https://image.freepik.com/free-photo/_39155-43.jpg');
    }
    return (el.backdrop_path = `https://image.tmdb.org/t/p/w500${el.backdrop_path}`);
  });
}

export default findAndReplaceDamagedImage;
