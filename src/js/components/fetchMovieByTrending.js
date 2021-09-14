import api from '../services/api';
import renderMovis from '../../templates/renderMovis.hbs';
const ul = document.querySelector('#gallary-list');
async function fetchMovieByTrending() {
  try {
    const { results: data } = await api.fetchMovieByTrending();
    const dataToRender = dataPrepareToRender(data);
    const stringRender = renderMovis(dataToRender);
    ul.innerHTML = stringRender;
  } catch (error) {
    console.log(error);
  }
}

fetchMovieByTrending();

function dataPrepareToRender(data) {
  const dataToRender = data.map(movie => {
    const { genre_ids, title, vote_average, release_date, poster_path, id } = movie;

    const date = new Date(release_date);

    return {
      poster_path: `https:image.tmdb.org/t/p/w500/${poster_path}`,
      genre_ids,
      title,
      vote_average,
      release_date: date.getFullYear(),
      id,
    };
  });
  return dataToRender;
}
