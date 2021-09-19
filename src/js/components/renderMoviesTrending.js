import api from '../services/api';
import paginationItems from './pagination';
import addSpinner from '../services/addSpinner';
import cardMarkup from './../services/cardMarkup';
import pageReset from '../services/pageReset';

const { form } = api.refs;

 addSpinner();

async function renderMoviesTrending() {
  pageReset();
  form.reset();
  try {
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
