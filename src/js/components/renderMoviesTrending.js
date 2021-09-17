import api from '../services/api';
import paginationItems from './pagination';
import addSpinner from '../services/addSpinner';
import cardMarkup from './../services/cardMarkup';

async function renderMoviesTrending() {
  try {
    addSpinner();
    const { genres } = await api.genres;
    const allData = await api.fetchMovieByTrending();
    const { results: data } = allData;
    paginationItems(allData.total_results);
   await cardMarkup(data, genres);
  } catch (error) {
    console.log(error);
  }
}

renderMoviesTrending();

export default renderMoviesTrending;
