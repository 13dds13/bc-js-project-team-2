import Pagination from 'tui-pagination';
import api from '../services/api';
import dataPrepareToRender from '../services/renderCard';
const container = document.getElementById('tui-pagination-container');
import renderMovis from '../../templates/renderMovis.hbs';

const { galleryList} = api.refs;

function paginationItems(total_results, inputText) {
  const option1 = { totalItems: `${total_results}`, itemsPerPage: 20, visiblePages: 5 };
  const pagination = new Pagination(container, option1);
  pagination.on('afterMove', event => {
    const currentPage = event.page;
    api.page = currentPage;

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
          galleryList.innerHTML = stringRender;
        });
      }).catch(console.log);
    } else {
      api.fetchMovieByInput(inputText).then(({ results: data }) => {
        newData = data;
        dataPrepareToRender(newData, newGenres).then(dataToRender => {
          const stringRender = renderMovis(dataToRender);
          galleryList.innerHTML = stringRender;
        });
      });
    }

    api.refs.galleryList.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  });
}

export default paginationItems;
