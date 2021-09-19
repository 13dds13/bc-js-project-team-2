import * as basicLightbox from 'basiclightbox';
import api from '../services/api';

const trailerPlay = document.querySelector('#trailerdBtn');

trailerPlay.addEventListener('click', () => onShowTrailer(550));

async function onShowTrailer(id) {
  const result = await api.fetchTrailer(id);
  console.log(result.results);
  if (!result.results) {
    return;
  }

  const instance = basicLightbox.create(`
      <iframe src="https://www.youtube.com/embed/${result.results[0].key}?autoplay=1&origin" width="560" height="315" frameborder="0"></iframe>
  `);

  document.body.classList.remove('body-modal-open');
  api.refs.galleryList.classList.add('visually-hidden');
  api.refs.modal.classList.add('visually-hidden');
  instance.show();
}
