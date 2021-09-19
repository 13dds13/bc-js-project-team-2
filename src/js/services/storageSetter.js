import Notiflix from 'notiflix';

class StorageService {
  refs = {
    btnWrap: document.querySelector('#modalBtnWrap'),
    watchedBtn: document.querySelector('#watchedBtn'),
    queueBtn: document.querySelector('#queueBtn'),
  };
  
  constructor() {
    this.movieRefs = {};
  }

  getMovieRefs() {
    const refs = {
      img: document.querySelector('#img'),
      titleYearId: document.querySelector('#titleYearId'),
      vote: document.querySelector('#vote'),
      genre: document.querySelectorAll('.modal__stat-genre'),
    };
    this.movieRefs = refs;
  }

  getDatafromStorage(type) {
    try {
      const localData = localStorage.getItem(type);
      return localData === null ? [] : JSON.parse(localData);
    } catch (err) {
      return;
    }
  };

  addListenerToBtns() {
    this.refs.btnWrap.addEventListener('click', this.onBtnClick.bind(this));
  }

  removeListenerFromBtns() {
    this.refs.btnWrap.removeEventListener('click', this.onBtnClick.bind(this));
  }

  onBtnClick(e) {
  if (e.target === e.currentTarget) return;
  
  this.getMovieRefs();
  const movieData = this.getCurrentMovieData();
  const {isAlreadyInWatched, isAlreadyInQueue} = this.checkUsersLibrary(movieData.id)
  
    if (e.target === watchedBtn) {
      if (watchedBtn.textContent === 'add to watched') {
        this.setDataToLocalStorage('watched', movieData);
        watchedBtn.textContent = 'remove from watched';
        this.btnColorSwitcher(watchedBtn);
        localStorage.setItem('wasChanges', '1');
        Notiflix.Notify.success('The movie was added to "Watched"');
        if (isAlreadyInQueue) {
          this.removeMovieFromStorage('queue', movieData.id);
          queueBtn.textContent = 'add to queue';
          this.btnColorSwitcher(queueBtn);
          localStorage.setItem('wasChanges', '1');
          Notiflix.Notify.warning('Also the movie was removed from "Queue"');
        };
        return;
      };
        
      if (watchedBtn.textContent === 'remove from watched') {
        this.removeMovieFromStorage('watched', movieData.id);
        watchedBtn.textContent = 'add to watched';
        this.btnColorSwitcher(watchedBtn);
        localStorage.setItem('wasChanges', '1');
        Notiflix.Notify.failure('The movie was removed from "Watched"');
        return;
      };
  };

    if (e.target === queueBtn) {

      if (queueBtn.textContent === 'add to queue') {
        this.setDataToLocalStorage('queue', movieData);
        queueBtn.textContent = 'remove from queue';
        this.btnColorSwitcher(queueBtn);
        localStorage.setItem('wasChanges', '1');
        Notiflix.Notify.success('The movie was added to "Queue"');
        if (isAlreadyInWatched) {
          this.removeMovieFromStorage('watched', movieData.id);
          watchedBtn.textContent = 'add to watched';
          this.btnColorSwitcher(watchedBtn);
          localStorage.setItem('wasChanges', '1');
          Notiflix.Notify.warning('Also the movie was removed from "Watched"');
        };
        return;
      };
        
      if (queueBtn.textContent === 'remove from queue') {
        this.removeMovieFromStorage('queue', movieData.id);
        queueBtn.textContent = 'add to queue';
        this.btnColorSwitcher(queueBtn);
        localStorage.setItem('wasChanges', '1');
        Notiflix.Notify.failure('The movie was removed from "Queue"');
        return;
      };
    }
}

  getCurrentMovieData() {
    const { titleYearId, img, vote, genre } = this.movieRefs;
    const genresId = [];
    [...genre].map(item => genresId.push(Number(item.dataset.genreid)));
    const movieData = {
      id: Number(titleYearId.dataset.id),
      release_date: titleYearId.dataset.year,
      title: titleYearId.textContent,
      poster_path: img.dataset.path,
      vote_average: vote.textContent,
      genre_ids: genresId,
    };
    return movieData;
  }

  checkUsersLibrary(movieId) {
    const localDataWatched = this.getDatafromStorage('watched');
    const localDataQueue = this.getDatafromStorage('queue');
    const isAlreadyInWatched = localDataWatched.some(item => item.id === movieId);
    const isAlreadyInQueue = localDataQueue.some(item => item.id === movieId);
  return {isAlreadyInWatched, isAlreadyInQueue};
  }

  setDataToLocalStorage(type, data) {
    const dataFromStorage = this.getDatafromStorage(type);
    const newData = [...dataFromStorage, data];
    if (newData) {
      localStorage.setItem(type, JSON.stringify(newData));
    }
  }

  removeMovieFromStorage(type, movieId) {
    const dataFromStorage = this.getDatafromStorage(type);
    const newData = dataFromStorage.filter(item => item.id !== movieId);
    if (newData) {
      localStorage.setItem(type, JSON.stringify(newData));
    };
  }

  btnColorSwitcher(btn) {
    btn.classList.toggle('modal__btn_accent-style');
  }

  btnColorSetter(btn) {
    btn.classList.add('modal__btn_accent-style');
  }

  removeBtnColor() {
    watchedBtn.classList.remove('modal__btn_accent-style');
    queueBtn.classList.remove('modal__btn_accent-style');
  }
}

Notiflix.Notify.init({
  width: '220px',
  distance: '48px',
  fontSize: '12px',
  useIcon: false,
  // closeButton: true,
  timeout: 2500,
  position: 'center-top',
  clickToClose: true,
});

export default new StorageService;