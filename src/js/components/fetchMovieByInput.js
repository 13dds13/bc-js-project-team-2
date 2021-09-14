import api from '../services/api';

const inputRef = document.querySelector('.input');

async function getMovieData() {
  try {
    inputRef.addEventListener('input', onInput)
    const {results: data} = await api.fetchMovieByInput();
  } catch (error) {
    console.log(error)
  }
};
getMovieData();

function onInput(e) {
        e.preventDefault()
      const inputText = e.target.value;
      if (inputText !== "") {
        api.fetchMovieByInput(inputText)
      }
    };