import api from '../services/api';
import storage from './storage';
import cardMarkup from './../services/cardMarkup';
import renderMoviesTrending from '../components/renderMoviesTrending';
import classAdd from '../services/classAdd';
import classRemove from '../services/classRemove';
import activePassiveHeaderBtn from '../services/activePassiveHeaderBtn';

const {
  logoLink,
  homeLink,
  btn_404,
  searchFilm,
  watchedBtn,
  queueBtn,
  libraryLink,
  header,
  divAnim,
  pagination,
  galleryList,
} = api.refs;

logoLink.addEventListener('click', sendToHomePage);

homeLink.addEventListener('click', sendToHomePage);

btn_404.addEventListener('click', sendToHomePage);
function sendToHomePage(e) {
  e.preventDefault();
  classAdd('visually-hidden', watchedBtn, queueBtn, divAnim);
  classAdd('current', homeLink);
  classAdd('header__main', header);
  classRemove('visually-hidden', searchFilm);
  classRemove('btn-active', watchedBtn, queueBtn);
  classRemove('current', libraryLink);
  classRemove('header__library', header);
  renderMoviesTrending();
}

libraryLink.addEventListener('click', sendToLibraryPage);
async function sendToLibraryPage(e) {
  e.preventDefault();

  classAdd('visually-hidden', searchFilm);
  classAdd('current', libraryLink);
  classAdd('btn-active', watchedBtn);
  classAdd('header__library', header);
  classRemove('header__main', header);
  classRemove('visually-hidden', watchedBtn, queueBtn);
  classRemove('current', homeLink);
  pagination.textContent = '';
  onWatched();
}

watchedBtn.addEventListener('click', onWatched);
async function onWatched(e) {
  activePassiveHeaderBtn(watchedBtn, queueBtn);

  if (localStorage.watched === undefined || localStorage.watched === []) {
    classAdd('visually-hidden', divAnim);
    galleryList.innerHTML = '';
  }
  if (localStorage.watched !== undefined) {
    api.refs.divAnim.classList.add('visually-hidden');
    try {
      const { genres } = await api.genres;
      const data = storage.load('watched');
      await cardMarkup(data, genres);
      pagination.textContent = '';
      if (data.length === 0) {
        galleryList.innerHTML = '';
        classRemove('visually-hidden', divAnim);
      }
    } catch (error) {
      console.log(error);
    }
  }
}
queueBtn.addEventListener('click', onQueue);
async function onQueue(e) {
  activePassiveHeaderBtn(queueBtn, watchedBtn);

  if (localStorage.queue === undefined) {
    galleryList.innerHTML = '';
    classRemove('visually-hidden', divAnim);
  }
  if (localStorage.queue !== undefined) {
    classAdd('visually-hidden', divAnim);
    try {
      const { genres } = await api.genres;
      const data = storage.load('queue');
      await cardMarkup(data, genres);
      if (data.length === 0) {
        galleryList.innerHTML = '';
        classRemove('visually-hidden', divAnim);
      }
    } catch (error) {
      console.log(error);
    }
  }
}

export { onWatched, onQueue };
