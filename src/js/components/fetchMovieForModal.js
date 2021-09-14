import api from '../services/api'
import renderMovieDataToModal from '../../templates/renderMovieForModal.hbs'

const { refs: { modalMarkupContainer, galleryList, modal, modalCloseBtn }} = api;


galleryList.addEventListener('click', onMovieCardClick);

function onMovieCardClick(e) {
    if (e.target === e.currentTarget) return;
    const movieId = e.target.closest('li').dataset.movieid;
    movieDataForModal(movieId);
};

function onModalClick(e) {
    if (e.target === e.currentTarget || e.target.closest('button') === modalCloseBtn) {
        modal.classList.add('visually-hidden');
        modal.removeEventListener('click', onModalClick);
        document.querySelector('body').classList.remove('body_modal-open');
    }
}

async function movieDataForModal(movieId) {
    try {
        const movieData = await api.fetchMovieForModal(movieId);
        const markup = renderMovieDataToModal(movieData);
        modalMarkupContainer.innerHTML = markup;
        modal.classList.remove('visually-hidden');
        modal.addEventListener('click', onModalClick);
        document.querySelector('body').classList.add('body_modal-open');
    } catch (error) {
        console.log(error);
    }
};