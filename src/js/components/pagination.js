import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';
import api from '../services/api';
import dataPrepareToRender from '../services/renderCard';
const container = document.getElementById('tui-pagination-container');
import renderMovis from '../../templates/renderMovis.hbs';
import addSpinner from '../services/addSpinner';

function paginationItems(total_results, inputText) {
  const option1 = { totalItems: `${total_results}`, itemsPerPage: 20, visiblePages: 5 };
  const pagination = new Pagination(container, option1);
  pagination.on('afterMove', event => {
    const currentPage = event.page;
    api.page = 1;
    api.page = currentPage;

    addSpinner();
    let newGenres = [];
    let newData = [];
    api.genres.then(({ genres }) => {
      newGenres = genres;
    });

    if (!inputText) {
      api.fetchMovieByTrending().then(({ results: data }) => {
        newData = data;
        dataPrepareToRender(newData, newGenres).then(dataToRender => {
          const stringRender = renderMovis(dataToRender);
          api.refs.galleryList.innerHTML = stringRender;
        });
      });
    } else {
      api.fetchMovieByInput(inputText).then(({ results: data }) => {
        newData = data;
        dataPrepareToRender(newData, newGenres).then(dataToRender => {
          const stringRender = renderMovis(dataToRender);
          api.refs.galleryList.innerHTML = stringRender;
        });
      });
    }
  });
}

export default paginationItems;
