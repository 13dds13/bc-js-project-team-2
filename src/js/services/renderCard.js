export default async function dataPrepareToRender(data, genres) {

  return data.map(movie => {
    const { genre_ids, title, vote_average, release_date, poster_path, id } = movie;

    const date = new Date(release_date);

    const dataToRender = {
      poster_path: `https://image.tmdb.org/t/p/w500/${poster_path}`,
      genre_ids,
      title,
      vote_average,
      release_date: date.getFullYear(),
      id,
    };

    if (dataToRender.poster_path === 'https://image.tmdb.org/t/p/w500/null') {
      dataToRender.poster_path =
        'https://imgp.whaleshares.io/pimgp/a/einstei1/p/image-not-found-shitpostfriday/0x0/https://img.whaleshares.io/wls-img/einstei1/d765e65f432e7e6f0d062616d19364ecdc5631da.png';
    }

    const array = [];
    genres.forEach(genre => {
      return movie.genre_ids.forEach(genreId => {
        if (genreId === genre.id) {
          array.push(genre.name);
        }
      });
    });
    const newArray = array.slice(0, 3).join(', ');

    dataToRender.genre_ids = newArray;
    return dataToRender;
  });
}
