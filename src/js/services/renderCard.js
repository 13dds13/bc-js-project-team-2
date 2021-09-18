export default async function dataPrepareToRender(data, genres) {
  return data.map(movie => {
    const { genre_ids, title, vote_average, release_date, poster_path, id } = movie;

    const noImage =
      'https://imgp.whaleshares.io/pimgp/a/einstei1/p/image-not-found-shitpostfriday/0x0/https://img.whaleshares.io/wls-img/einstei1/d765e65f432e7e6f0d062616d19364ecdc5631da.png';
    const fullPath = `https://image.tmdb.org/t/p/w500/${poster_path}`;
    const poster = poster_path ? fullPath : noImage;

    const date = new Date(release_date);

    const dataToRender = {
      poster_path: poster,
      genre_ids,
      title,
      vote_average,
      release_date: date.getFullYear(),
      id,
    };

    const array = genres
      .filter(genre => dataToRender.genre_ids.includes(genre.id))
      .map(genreObj => genreObj.name);

    const newArray = array.slice(0, 2).join(', ');

    dataToRender.genre_ids = newArray;
    return dataToRender;
  });
}
