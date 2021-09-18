import api from '../services/api';
import renderMovis from '../../templates/renderMovis.hbs';
import dataPrepareToRender from '../services/renderCard';
import paginationItems from './pagination';
import addSpinner from '../services/addSpinner';
import cardMarkup from './../services/cardMarkup';

async function renderMoviesTrending() {
  api.refs.divAnim.classList.add('visually-hidden');
  api.page = 1;
  api.refs.form.reset();
  addSpinner();
  try {
    const { genres } = await api.genres;
    const allData = await api.fetchMovieByTrending();
    const { results: data } = allData;
    paginationItems(allData.total_results);
    await cardMarkup(data, genres);
    // const dataToRender = await dataPrepareToRender(data, genres);
    // const stringRender = renderMovis(dataToRender);
    // api.refs.galleryList.innerHTML = stringRender;
  } catch (error) {
    console.log(error);
  }
}

renderMoviesTrending();

export default renderMoviesTrending;
