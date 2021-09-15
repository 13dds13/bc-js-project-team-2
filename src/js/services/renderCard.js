
export default async function dataPrepareToRender(data, genres) {
  const dataToRender = data.map(movie => {
    const { genre_ids, title, vote_average, release_date, poster_path, id } = movie;

    const date = new Date(release_date);

    const dataToRender = {
      poster_path: `https:image.tmdb.org/t/p/w500/${poster_path}`,
      genre_ids,
      title,
      vote_average,
      release_date: date.getFullYear(),
      id,
    };

    const array = [];
      dataToRender.genre_ids.forEach(id => {
        genres.forEach(genre => {
          if (genre.id === id) {
            array.push(genre.name);
            dataToRender.genre_ids = array;
          }
        });
      dataToRender.genre_ids = dataToRender.genre_ids.join(', ');
    });

    if (dataToRender.poster_path === 'https:image.tmdb.org/t/p/w500/null') {
      dataToRender.poster_path =
        'https://www.publicdomainpictures.net/pictures/280000/velka/not-found-image-15383864787lu.jpg';
    }
    return dataToRender;
  });
  return dataToRender;
};
