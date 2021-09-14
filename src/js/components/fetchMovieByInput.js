import api from '../services/api';
import renderMovis from '../../templates/renderMovis.hbs';
import dataPrepareToRender from '../services/renderCard';
import fetchMovieByTrending from './fetchMovieByTrending';
var debounce = require('lodash.debounce');

const inputRef = document.querySelector('.input__form');

const ulRef = document.querySelector('#gallary-list');
  try {
    inputRef.addEventListener('input', debounce(onInput,1000));
    async function onInput(e) {
      e.preventDefault();
      const inputText = e.target.value;
      if (inputText !== '') {
        const { results: data } = await api.fetchMovieByInput(inputText);
        cardMarkup(data);
      }
      if (inputText === '') {
        fetchMovieByTrending()
      }
    }
  } catch (error) {
    console.log(error);
}
  
function cardMarkup(data) {
  const makeMarkup = dataPrepareToRender(data);
  ulRef.innerHTML = renderMovis(makeMarkup);
}
