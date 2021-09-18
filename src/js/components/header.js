import api from '../services/api';
import storage from './storage';
import cardMarkup from './../services/cardMarkup';
import addSpinner from '../services/addSpinner';
import renderMoviesTrending from '../components/renderMoviesTrending';

api.refs.logoLink.addEventListener('click', sendToHomePage);

api.refs.homeLink.addEventListener('click', sendToHomePage);

api.refs.btn_404.addEventListener('click', sendToHomePage);
function sendToHomePage(e) {
  addSpinner();
  e.preventDefault();
  api.refs.searchFilm.classList.remove('visually-hidden');
  api.refs.watchedBtn.classList.remove('btn-active');
  api.refs.queueBtn.classList.remove('btn-active');
  api.refs.watchedBtn.classList.add('visually-hidden');
  api.refs.queueBtn.classList.add('visually-hidden');
  api.refs.homeLink.classList.add('current');
  api.refs.libraryLink.classList.remove('current');
  api.refs.header.classList.remove('header__library');
  api.refs.header.classList.add('header__main');
  renderMoviesTrending();
  api.refs.divAnim.classList.add('visually-hidden');
}

api.refs.libraryLink.addEventListener('click', sendToLibraryPage);
async function sendToLibraryPage(e) {
  addSpinner();
  e.preventDefault();
  api.refs.searchFilm.classList.add('visually-hidden');
  api.refs.watchedBtn.classList.add('btn-active');
  api.refs.watchedBtn.classList.remove('visually-hidden');
  api.refs.queueBtn.classList.remove('visually-hidden');
  api.refs.homeLink.classList.remove('current');
  api.refs.libraryLink.classList.add('current');
  api.refs.header.classList.add('header__library');
  api.refs.header.classList.remove('header__main');
  onWatched();
  api.refs.pagination.textContent = '';
}

api.refs.watchedBtn.addEventListener('click', onWatched);
async function onWatched(e) {
  addSpinner();
  api.refs.watchedBtn.classList.remove('btn-passive');
  api.refs.watchedBtn.classList.add('btn-active');
  api.refs.queueBtn.classList.remove('btn-active');
  api.refs.queueBtn.classList.add('btn-passive');
  if (localStorage.watched === undefined || localStorage.watched === []) {
    api.refs.galleryList.innerHTML = '';
    api.refs.divAnim.classList.remove('visually-hidden');
  }
  if (localStorage.watched !== undefined) {
    api.refs.divAnim.classList.add('visually-hidden');
    try {
      const { genres } = await api.genres;
      const data = storage.load('watched');
      await cardMarkup(data, genres);
      api.refs.pagination.textContent = '';
      if (data.length === 0) {
        api.refs.galleryList.innerHTML = '';
        api.refs.divAnim.classList.remove('visually-hidden');
      }
    } catch (error) {
      console.log(error);
    }
  }
}
  api.refs.queueBtn.addEventListener('click', onQueue);
  async function onQueue(e) {
    addSpinner();
    api.refs.watchedBtn.classList.add('btn-passive');
    api.refs.watchedBtn.classList.remove('btn-active');
    api.refs.queueBtn.classList.add('btn-active');
    api.refs.queueBtn.classList.remove('btn-passive');
    if (localStorage.queue === undefined) {
      api.refs.galleryList.innerHTML = '';
      api.refs.divAnim.classList.remove('visually-hidden');
    }
    if (localStorage.queue !== undefined) {
      api.refs.divAnim.classList.add('visually-hidden');
      try {
        const { genres } = await api.genres;
        const data = storage.load('queue');
        await cardMarkup(data, genres);
        if (data.length === 0) {
          api.refs.galleryList.innerHTML = '';
          api.refs.divAnim.classList.remove('visually-hidden');
        }
      } catch (error) {
        console.log(error);
      }
    }
  }


export { onWatched, onQueue };