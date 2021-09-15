import api from '../services/api';
import renderMovis from '../../templates/renderMovis.hbs';
import dataPrepareToRender from '../services/renderCard';
import paginationItems from '../components/pagination';
const ul = document.querySelector('#gallary-list');
async function fetchMovieByTrending() {
  try {
    const { genres } = await api.fetchGenres();
    const allData = await api.fetchMovieByTrending();
    console.log(allData);
    paginationItems(allData.total_results);
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
