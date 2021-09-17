import api from '../services/api';
import renderMovis from '../../templates/renderMovis.hbs';
import dataPrepareToRender from '../services/renderCard';
import paginationItems from '../components/pagination';
import addSpinner from '../services/addSpinner';

// import renderMoviesTrending from '../services/renderMoviesTrending';

// // const ul = document.querySelector('#gallary-list');
// // async function fetchMovieByTrending() {
// //   try {
// //     renderMoviesTrending();
// //   } catch (error) {
// //     console.log(error);
// //   }
// // }

// renderMoviesTrending();
// export default fetchMovieByTrending;
