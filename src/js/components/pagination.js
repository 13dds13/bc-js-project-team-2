import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';
import api from '../services/api';
import dataPrepareToRender from '../services/renderCard';
const container = document.getElementById('tui-pagination-container');
import renderMovis from '../../templates/renderMovis.hbs';
const ul = document.querySelector('#gallary-list');
// const instance = new Pagination(container, { totalItems: 10, itemsPerPage: 10, visiblePages: 10 });

function paginationItems(total_results, inputText) {
  const option1 = { totalItems: `${total_results}`, itemsPerPage: 20, visiblePages: 5 };
  const pagination = new Pagination(container, option1);
  pagination.on('afterMove', event => {
    const currentPage = event.page;
    api.page = currentPage;

    let newGenres = [];
    let newData = [];
    api.fetchGenres().then(({ genres }) => {
      newGenres = genres;
    });
    api.fetchMovieByInput(inputText).then(({ results: data }) => {
      newData = data;
      dataPrepareToRender(newData, newGenres).then(dataToRender => {
        const stringRender = renderMovis(dataToRender);
        ul.innerHTML = stringRender;
      });
    });
  });
}

export default paginationItems;
