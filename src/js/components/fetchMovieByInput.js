import api from '../services/api';
import Notiflix from 'notiflix';
import paginationItems from '../components/pagination';
import renderMoviesTrending from './renderMoviesTrending';
import cardMarkup from '../services/cardMarkup';
import pageReset from '../services/pageReset';
var debounce = require('lodash.debounce');

const { form, pagination } = api.refs;

api.refs.inputRef.addEventListener('input', debounce(onInput, 350));

async function onInput(e) {
  e.preventDefault();
  const inputText = e.target.value;
  pageReset();
  if (!inputText) {
    renderMoviesTrending();
    return;
  }

  try {
    const { genres } = await api.genres;
    const allData = await api.fetchMovieByInput(inputText);
    const { results: data } = allData;
    paginationItems(allData.total_results, inputText);
    if (data.length === 0) {
      divAnim.classList.remove('visually-hidden');
      Notiflix.Notify.failure('Search result not successful. Enter the correct movie name and ');
      form.reset();
      pagination.textContent = '';
    }
    await cardMarkup(data, genres);
  } catch (error) {
    console.log(error);
  }
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
