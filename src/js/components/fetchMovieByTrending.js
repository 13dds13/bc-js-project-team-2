import api from '../services/api';
import renderMovis from '../../templates/renderMovis.hbs';
import dataPrepareToRender from '../services/renderCard';
// import paginationItems from '../components/pagination';
import addSpinner from '../services/addSpinner';
const ul = document.querySelector('#gallary-list');
async function fetchMovieByTrending() {
  try {
    addSpinner()
    const { genres } = await api.genres;
    const allData = await api.fetchMovieByTrending();
    // paginationItems(allData.total_results);
    const { results: data } = allData;
    const dataToRender = await dataPrepareToRender(data, genres);
    const stringRender = renderMovis(dataToRender);
    ul.innerHTML = stringRender;
  } catch (error) {
    console.log(error);
  }
}

fetchMovieByTrending();
export default fetchMovieByTrending;
