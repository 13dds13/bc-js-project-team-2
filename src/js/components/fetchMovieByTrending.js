import api from '../services/api';

async function fetchMovieByTrending() {
  try {
    const { results: data } = await api.fetchMovieByTrending();

    const dataToRender = dataPrepareToRender(data);

  } catch (error) {
    console.log('error');
  }
}

fetchMovieByTrending();

function dataPrepareToRender(data) {
  const dataToRender = data.map(movie => {
    const { genre_ids, title, vote_average, release_date } = movie;

    const date = new Date(release_date);

    return {
      genre_ids,
      title,
      vote_average,
      release_date: date.getFullYear(),
    };
  });
  return dataToRender;
}
