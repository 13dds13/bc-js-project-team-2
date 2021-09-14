
import api from '../services/api';
import renderMovis from '../../templates/renderMovis.hbs'
const inputRef = document.querySelector('.input');
const ulRef = document.querySelector('#gallary-list')
async function getMovieData() {
  try {
    inputRef.addEventListener('input', onInput)
    async function onInput(e) {
        e.preventDefault()
      const inputText = e.target.value;
      if (inputText !== "") {
        const { results: data } = await api.fetchMovieByInput(inputText)
          console.log(data);
        cardMarkup(data)
          console.log(data);
      }
};
  } catch (error) {
    console.log(error)
  }
};
getMovieData();

function cardMarkup(data) {
  const makeMarkup = dataPrepareToRender(data)
    ulRef.innerHTML = renderMovis(makeMarkup)
}

function dataPrepareToRender(data) {
  const dataToRender = data.map(movie => {
    const { genre_ids, title, vote_average, release_date, poster_path } = movie;

    const date = new Date(release_date);

    return {
      poster_path: `https:image.tmdb.org/t/p/w500/${poster_path}`,
      genre_ids,
      title,
      vote_average,
      release_date: date.getFullYear(),
    };
  });
  return dataToRender;
}