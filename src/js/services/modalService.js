import api from './api'
import storageService from './storageService'
import createMarkupForModal from '../../templates/renderMovieForModal.hbs'
import Notiflix from './modalNotify'

class ModalService {
    IMG_PLUG = 'https://imgp.whaleshares.io/pimgp/a/einstei1/p/image-not-found-shitpostfriday/0x0/https://img.whaleshares.io/wls-img/einstei1/d765e65f432e7e6f0d062616d19364ecdc5631da.png';
    START_POSTER_PATH = 'https://image.tmdb.org/t/p/w500';

    refs = {
        backgroundBlur: document.querySelector('#backgroundBlur'),
        modalMarkupContainer: document.querySelector('.js-movie-data'),
        modal: document.querySelector('.backdrop'),
        modalCloseBtn: document.querySelector('.modal__btn-close'),
    };

    onMovieCardClick(e) {
        if (e.target === e.currentTarget) return;

        const movieId = Number(e.target.closest('li').dataset.movieid);
        const {isAlreadyInWatched, isAlreadyInQueue} = storageService.checkUsersLibrary(movieId);
        storageService.btnContentSetter(isAlreadyInWatched, isAlreadyInQueue);
        this.addMovieDataToModal(movieId);
    };
    
    async addMovieDataToModal(movieId) {
    try {
        const movieData = await api.fetchMovieForModal(movieId);
        const preparedMovieData = this.prepareDataForModal(movieData);
        this.renderMarkupToModal(preparedMovieData);
        this.modalOpener();
    } catch (error) {
        Notiflix.Notify.failure('Sorry! Something went wrong :(');
    }
};
    
    renderMarkupToModal(data) {
        const markup = createMarkupForModal(data);
        this.refs.modalMarkupContainer.innerHTML = markup;
        };
        

    modalOpener() {
        const { backgroundBlur, modal } = this.refs;
        backgroundBlur.classList.add('background-blur');
        modal.classList.remove('is-hidden');
        modal.classList.remove('visually-hidden');
        modal.addEventListener('click', this.eventsOnModal.bind(this));
        document.body.classList.add('body-modal-open');
        window.addEventListener('keydown', this.eventsOnModal.bind(this));
    };

    eventsOnModal(e) {
        if (e.target === e.currentTarget ||
            e.target.closest('button') === this.refs.modalCloseBtn ||
            e.key === 'Escape') {
            this.modalClosing();
            storageService.ifNeedRender();
            storageService.changesInStorage('remove');
        };
    };

    modalClosing() {
        const { backgroundBlur, modal } = this.refs;
        setTimeout(() => modal.classList.add('visually-hidden'), 200);
        modal.classList.add('is-hidden');
        backgroundBlur.classList.remove('background-blur');
        modal.removeEventListener('click', this.eventsOnModal.bind(this));
        document.body.classList.remove('body-modal-open');
        window.removeEventListener('keydown', this.eventsOnModal.bind(this));
        storageService.removeBtnColor();
    };

    prepareDataForModal(data) {
        const preparedMovieData = { ...data, poster_path:`${this.START_POSTER_PATH}${data.poster_path}` };
        if (!data.poster_path) {
            preparedMovieData.poster_path = this.IMG_PLUG;
        };
        return preparedMovieData;
    }
}

export default new ModalService;