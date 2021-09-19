import * as basicLightbox from 'basiclightbox';
import api from '../services/api';

const trailerPlay = document.querySelector('#trailerdBtn');

trailerPlay.addEventListener('click', () => {
  const id = document.querySelector('#titleYearId');
  console.log('trailerPlay.addEventListener ~ id', id);

  const movieId = Number(id.dataset.id);
  console.log('movieId', movieId);
  onShowTrailer(movieId);
});

async function onShowTrailer(id) {
  const result = await api.fetchTrailer(id);
  // console.log('result.results', result.results);
  if (!result.results) {
    return;
  }
  if (result.results.length === 0 && result.results[0].site !== 'YouTube') {
    trailerPlay.classList.add('is-hidden');
  }
  const instance = basicLightbox.create(`
      <iframe src="https://www.youtube.com/embed/${result.results[0].key}?autoplay=1&origin" width="560" height="315" class="" frameborder="0"></iframe>
  `);
  // const onBasicLightbox = document.querySelector('.basicLightbox');
  // onBasicLightbox.classList.add('z-index');
  // document.body.addEventListener('click', closePl);
  // function closePl(e) {
  //   console.log(e.target);
  //   // api.refs.galleryList.classList.remove('visually-hidden');
  //   // api.refs.modal.classList.remove('visually-hidden');
  // }
  // document.body.classList.remove('body-modal-open');
  // api.refs.galleryList.classList.add('visually-hidden');
  // api.refs.modal.classList.add('visually-hidden');
  instance.show();
}

// function removeTralerBtn() {
// if (result.results === 0 && result.results[0].site !== 'YouTube') {
//   trailerPlay.classList.add('is-hidden');
// }
// }
// removeTralerBtn(result.results);
