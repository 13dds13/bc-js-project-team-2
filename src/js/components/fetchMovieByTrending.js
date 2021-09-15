import api from '../services/api';
import renderMovis from '../../templates/renderMovis.hbs';
import dataPrepareToRender from '../services/renderCard';
const ul = document.querySelector('#gallary-list');
async function fetchMovieByTrending() {
  try {
    const { results: data } = await api.fetchMovieByTrending();
    const dataToRender = dataPrepareToRender(data);
    const stringRender = renderMovis(dataToRender);
    ul.innerHTML = stringRender;
  } catch (error) {
    console.log(error);
  }
}

fetchMovieByTrending();
export default fetchMovieByTrending