import api from '../services/api'
import renderMovieDataToModal from '../../templates/renderMovieForModal.hbs'
import storageSetter from '../services/storageSetter'

const { refs: {
    modalMarkupContainer,
    galleryList,
    modal,
    modalCloseBtn,
} } = api;

const { queueBtn, watchedBtn } = storageSetter.refs;

galleryList.addEventListener('click', onMovieCardClick);
storageSetter.addListenerToBtns();

function onMovieCardClick(e) {
    if (e.target === e.currentTarget) return;
    const movieId = Number(e.target.closest('li').dataset.movieid);
    const {isAlreadyInWatched, isAlreadyInQueue} = storageSetter.checkUsersLibrary(movieId);
    watchedBtn.textContent = isAlreadyInWatched ? 'remove from watched' : 'add to watched';
    queueBtn.textContent = isAlreadyInQueue ? 'remove from queue' : 'add to queue';
    movieDataById(movieId);
};

function onModalClick(e) {
    if (e.target === e.currentTarget || e.target.closest('button') === modalCloseBtn) {
        modal.classList.add('visually-hidden');
        modal.removeEventListener('click', onModalClick);
        document.querySelector('body').classList.remove('body_modal-open');
        window.removeEventListener('keydown', onKeydown);
    }
}

async function movieDataById(movieId) {
    try {
        const movieData = await api.fetchMovieForModal(movieId);
        const markup = renderMovieDataToModal(movieData);
        modalMarkupContainer.innerHTML = markup;
        modal.classList.remove('visually-hidden');
        modal.addEventListener('click', onModalClick);
        document.querySelector('body').classList.add('body_modal-open');
        window.addEventListener('keydown', onKeydown);
    } catch (error) {
        console.log(error);
    }
};

function onKeydown(e) {
    if (e.key !== 'Escape') return;
    
    modal.classList.add('visually-hidden');
    window.removeEventListener('keydown', onKeydown);
    document.querySelector('body').classList.remove('body_modal-open');
}