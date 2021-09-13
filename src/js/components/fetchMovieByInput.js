import api from '../services/api';

async function getMovieData() {

  try {
    const {results: data} = await api.fetchMovieByInput();
    console.log(data);
  } catch (error) {
    console.log('error')
  }
};

getMovieData();
