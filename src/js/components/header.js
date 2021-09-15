import api from '../services/api';

api.refs.logoLink.addEventListener('click', sendToHomePage);
api.refs.homeLink.addEventListener('click', sendToHomePage);
api.refs.libraryLink.addEventListener('click', sendToLibraryPage);

function sendToHomePage(e) {
  e.preventDefault();
  api.refs.searchFilm.classList.remove('visually-hidden');
  api.refs.watchedBtn.classList.add('visually-hidden');
  api.refs.queueBtn.classList.add('visually-hidden');
  api.refs.homeLink.classList.add('current');
  api.refs.libraryLink.classList.remove('current');
  api.refs.header.classList.remove('header__library');
  api.refs.header.classList.add('header__main');
}

function sendToLibraryPage(e) {
  e.preventDefault();
  api.refs.searchFilm.classList.add('visually-hidden');
  api.refs.watchedBtn.classList.remove('visually-hidden');
  api.refs.queueBtn.classList.remove('visually-hidden');
  api.refs.homeLink.classList.remove('current');
  api.refs.libraryLink.classList.add('current');
  api.refs.header.classList.add('header__library');
  api.refs.header.classList.remove('header__main');
}

api.refs.watchedBtn.addEventListener('click', onWatched);

function onWatched(e) {
  api.refs.watchedBtn.classList.remove('btn-passive');
  api.refs.watchedBtn.classList.add('btn-active');
  api.refs.queueBtn.classList.remove('btn-active');
  api.refs.queueBtn.classList.add('btn-passive');
}

api.refs.queueBtn.addEventListener('click', onQueue);

function onQueue(e) {
  api.refs.watchedBtn.classList.add('btn-passive');
  api.refs.watchedBtn.classList.remove('btn-active');
  api.refs.queueBtn.classList.add('btn-active');
  api.refs.queueBtn.classList.remove('btn-passive');
}
