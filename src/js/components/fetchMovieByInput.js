import api from '../services/api';
import renderMovis from '../../templates/renderMovis.hbs';
import dataPrepareToRender from '../services/renderCard';
import fetchMovieByTrending from './fetchMovieByTrending';
import Notiflix from "notiflix";
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
      if (data.length === 0) {
        Notiflix.Notify.failure('Search result not successful. Enter the correct movie name and ');
      }
    }
    if (inputText === '') {
      fetchMovieByTrending();
    }
  }
} catch (error) {
  console.log(error);
}

async function cardMarkup(data, genres) {
  const makeMarkup = await dataPrepareToRender(data, genres);
  ulRef.innerHTML = renderMovis(makeMarkup);
}
Notiflix.Notify.init({
  width: "400px",
  distance: "140px",
  fontSize: "12px",
  useIcon: false,
  // closeButton: true,
  timeout: '4000',
  position: "center-top",
});