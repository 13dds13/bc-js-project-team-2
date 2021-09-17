import api from './api';
import renderMovis from '../../templates/renderMovis.hbs';
import dataPrepareToRender from '../services/renderCard';

async function cardMarkup(data, genres) {
  const makeMarkup = await dataPrepareToRender(data, genres);
  api.refs.galleryList.innerHTML = renderMovis(makeMarkup);
}

export default cardMarkup;
