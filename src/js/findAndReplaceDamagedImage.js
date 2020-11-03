function findAndReplaceDamagedImage(data) {
  const results = data.results;
  results.map(el => {
    if (el.backdrop_path === null) {
      return (el.backdrop_path =
        'https://miro.medium.com/max/978/1*pUEZd8z__1p-7ICIO1NZFA.png');
    }
    return (el.backdrop_path = `https://image.tmdb.org/t/p/w500${el.backdrop_path}`);
  });
}

export default findAndReplaceDamagedImage;
