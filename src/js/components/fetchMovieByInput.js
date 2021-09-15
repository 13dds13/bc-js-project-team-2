import api from '../services/api';
import renderMovis from '../../templates/renderMovis.hbs';
import dataPrepareToRender from '../services/renderCard';
import fetchMovieByTrending from './fetchMovieByTrending';
var debounce = require('lodash.debounce');

const inputRef = document.querySelector('.input__form');

const ulRef = document.querySelector('#gallary-list');
try {
  inputRef.addEventListener('input', debounce(onInput, 1000));
  async function onInput(e) {
    e.preventDefault();
    const inputText = e.target.value;
    if (inputText !== '') {
      const { genres } = await api.fetchGenres();
      const { results: data } = await api.fetchMovieByInput(inputText);
      cardMarkup(data, genres);
    }
    if (inputText === '') {
      fetchMovieByTrending();
    }
  }
} catch (error) {
  console.log(error);
}

async function cardMarkup(data, genres) {
  const makeMarkup =await dataPrepareToRender(data, genres);
  console.log(makeMarkup);
  ulRef.innerHTML = renderMovis(makeMarkup);
}
