import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';

const container = document.getElementById('tui-pagination-container');
// const instance = new Pagination(container, { totalItems: 10, itemsPerPage: 10, visiblePages: 10 });

function paginationItems(data) {
  const option1 = { totalItems: 1500, itemsPerPage: 20, visiblePages: 5 };
  const pagination = new Pagination(container, option1);
}
export default paginationItems;

//instance.getCurrentPage();

// paganation.on('afterMove', event => {
//   const currentPage = event.page;
//   console.log(currentPage);
// });

// pagination.movePageTo(10);
