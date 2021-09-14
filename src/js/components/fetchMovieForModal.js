import api from '../services/api'
import renderMovieDataToModal from '../../templates/renderMovieForModal.hbs'

const { refs: { modalMarkupContainer, galleryList, modal }} = api;


galleryList.addEventListener('click', onMovieCardClick);

function onMovieCardClick(e) {
    if (e.target === e.currentTarget) return;
    const movieId = e.target.closest('li').dataset.movieid;
    movieDataForModal(movieId);
};

async function movieDataForModal(movieId) {
    try {
        const movieData = await api.fetchMovieForModal(movieId);
        const markup = renderMovieDataToModal(movieData);
        modalMarkupContainer.innerHTML = markup;
        modal.classList.remove('visually-hidden')
    } catch (error) {
        console.log(error);
    }
};