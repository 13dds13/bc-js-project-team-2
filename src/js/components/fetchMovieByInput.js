import api from '../services/api';
import renderMovis from '../../templates/renderMovis.hbs';
const inputRef = document.querySelector('.input__form');

const ulRef = document.querySelector('#gallary-list');
  try {
    inputRef.addEventListener('input', onInput);
    async function onInput(e) {
      e.preventDefault();
      const inputText = e.target.value;
      console.log(inputText);
      if (inputText !== '') {
        const { results: data } = await api.fetchMovieByInput(inputText);
        cardMarkup(data);
      }
    }
  } catch (error) {
    console.log(error);
  }


function cardMarkup(data) {
  const makeMarkup = dataPrepareToRender(data);
  ulRef.innerHTML = renderMovis(makeMarkup);
}

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
