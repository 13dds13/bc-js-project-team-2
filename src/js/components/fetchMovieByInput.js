import api from '../services/api';
import renderMovis from '../../templates/renderMovis.hbs';
import dataPrepareToRender from '../services/renderCard';
import fetchMovieByTrending from './fetchMovieByTrending';
import Notiflix from 'notiflix';
import paginationItems from '../components/pagination';
import addSpinner from '../services/addSpinner';
import renderMoviesTrending from './renderMoviesTrending';
import cardMarkup from '../services/cardMarkup';
var debounce = require('lodash.debounce');

api.refs.inputRef.addEventListener('input', debounce(onInput, 1000));

// const inputRef = document.querySelector('.input__form');

// const ulRef = document.querySelector('#gallary-list');
async function onInput(e) {
  e.preventDefault();
  const inputText = e.target.value;
  if (!inputText) {
    renderMoviesTrending();
    return
  }

  addSpinner();
  const { genres } = await api.genres;
  const allData = await api.fetchMovieByInput(inputText);
  const { results: data } = allData;
  paginationItems(allData.total_results, inputText);
  if (data.length === 0) {
    Notiflix.Notify.failure('Search result not successful. Enter the correct movie name and ');
  }
   await cardMarkup(data, genres);
  // const dataToRender = await dataPrepareToRender(data, genres);
  // const stringRender = renderMovis(dataToRender);
  // api.refs.galleryList.innerHTML = stringRender;
  // if (inputText === '') {
  //   addSpinner();
  //   fetchMovieByTrending();
  // }
}

Notiflix.Notify.init({
  width: '400px',
  distance: '140px',
  fontSize: '12px',
  useIcon: false,
  // closeButton: true,
  timeout: 2000,
  position: 'center-top',
  clickToClose: true,
});

