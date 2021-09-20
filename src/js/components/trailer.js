import * as basicLightbox from 'basiclightbox';
import api from '../services/api';
import modalService from '../services/modalService';
import Notiflix from 'notiflix';

const trailerPlay = document.querySelector('#trailerdBtn');

trailerPlay.addEventListener('click', () => {
  const id = document.querySelector('#titleYearId');

  const movieId = Number(id.dataset.id);
  onShowTrailer(movieId);
});

async function onShowTrailer(id) {
  const result = await api.fetchTrailer(id);

  if (result.results.length === 0) {
    Notiflix.Notify.failure('Sorry, there is no trailer available');
    return;
  }
  const instance = basicLightbox.create(`
      <iframe src="https://www.youtube.com/embed/${result.results[0].key}?autoplay=1&origin" width="560" height="315" class="" frameborder="0"></iframe>
  `);
  document.body.addEventListener('click', closePl);
  function closePl(e) {
    api.refs.galleryList.classList.remove('visually-hidden');
    modalService.refs.modal.classList.remove('visually-hidden');
  }
  document.body.classList.remove('body-modal-open');
  api.refs.galleryList.classList.add('visually-hidden');
  modalService.refs.modal.classList.add('visually-hidden');
  instance.show();
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
