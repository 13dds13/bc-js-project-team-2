import api from '../services/api';
import storage from './storage';
import cardMarkup from './../services/cardMarkup';
import Notiflix from 'notiflix';
import addSpinner from '../services/addSpinner';
import dataPrepareToRender from '../services/renderCard';
import renderMovis from '../../templates/renderMovis.hbs';

import renderMoviesTrending from '../components/renderMoviesTrending';

api.refs.logoLink.addEventListener('click', sendToFirstPage);





const divAnim = document.querySelector('.animation')

api.refs.homeLink.addEventListener('click', sendToHomePage);
api.refs.libraryLink.addEventListener('click', sendToLibraryPage);

function sendToFirstPage(e) {
  api.page = 1;
  renderMoviesTrending();
}

function sendToHomePage(e) {
  addSpinner();
  e.preventDefault();
  api.refs.searchFilm.classList.remove('visually-hidden');
  api.refs.watchedBtn.classList.add('visually-hidden');
  api.refs.queueBtn.classList.add('visually-hidden');
  api.refs.homeLink.classList.add('current');
  api.refs.libraryLink.classList.remove('current');
  api.refs.header.classList.remove('header__library');
  api.refs.header.classList.add('header__main');
  fetchMovieByTrending()
  divAnim.classList.add('visually-hidden');
}

async function sendToLibraryPage(e) {
  addSpinner();
  e.preventDefault();
  api.refs.searchFilm.classList.add('visually-hidden');
  api.refs.watchedBtn.classList.remove('visually-hidden');
  api.refs.queueBtn.classList.remove('visually-hidden');
  api.refs.homeLink.classList.remove('current');
  api.refs.libraryLink.classList.add('current');
  api.refs.header.classList.add('header__library');
  api.refs.header.classList.remove('header__main');
  onWatched()
}

api.refs.watchedBtn.addEventListener('click', onWatched);

async function onWatched(e) {
  addSpinner();
  api.refs.watchedBtn.classList.remove('btn-passive');
  api.refs.watchedBtn.classList.add('btn-active');
  api.refs.queueBtn.classList.remove('btn-active');
  api.refs.queueBtn.classList.add('btn-passive');
  if (localStorage.watched === undefined) {
    ul.innerHTML = "";
    divAnim.classList.remove('visually-hidden');
  }
  if (localStorage.watched !== undefined) {
  const { genres } = await api.genres;
  const data = storage.load('watched');
  await cardMarkup(data, genres);
}

api.refs.queueBtn.addEventListener('click', onQueue);

async function onQueue(e) {
  addSpinner();
  api.refs.watchedBtn.classList.add('btn-passive');
  api.refs.watchedBtn.classList.remove('btn-active');
  api.refs.queueBtn.classList.add('btn-active');
  api.refs.queueBtn.classList.remove('btn-passive');

  const { genres } = await api.genres;
  const data = storage.load('queue');
  await cardMarkup(data, genres);

  if (localStorage.queue === undefined) {
    ul.innerHTML = "";
    divAnim.classList.remove('visually-hidden');
  }
  if (localStorage.queue !== undefined) {
    const { genres } = await api.genres;
    const data = storage.load('queue')
    await cardMarkup(data, genres)
  }
}
