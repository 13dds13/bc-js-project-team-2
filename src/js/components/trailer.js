import * as basicLightbox from 'basiclightbox';

const trailerPlay = document.querySelector('#trailerdBtn');

trailerPlay.addEventListener('click', () => onShowTrailer(movieId));

async function onShowTrailer(id) {
  const result = await ApiServer.fetchVideo(id);
  if (!result.results) {
    return;
  }

  const instance = basicLightbox.create(`
    <iframe src="https://www.youtube.com/embed/${result.results[0].key}?autoplay=1&origin" width="560" height="315" frameborder="0"></iframe>
`);
  instance.show();
}
