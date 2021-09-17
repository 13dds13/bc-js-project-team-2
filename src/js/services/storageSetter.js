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
    console.log('+');
  }

  removeListenerFromBtns() {
    this.refs.btnWrap.removeEventListener('click', this.onBtnClick.bind(this));
    console.log('-');
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
        if (isAlreadyInQueue) {
          this.removeMovieFromStorage('queue', movieData.id);
          queueBtn.textContent = 'add to queue';
        };
        console.log('wa');
        return;
      };
        
      if (watchedBtn.textContent === 'remove from watched') {
        this.removeMovieFromStorage('watched', movieData.id);
        watchedBtn.textContent = 'add to watched';
        console.log('wr');
        return;
      };
  };

    if (e.target === queueBtn) {

      if (queueBtn.textContent === 'add to queue') {
        this.setDataToLocalStorage('queue', movieData);
        queueBtn.textContent = 'remove from queue';
        if (isAlreadyInWatched) {
          this.removeMovieFromStorage('watched', movieData.id);
          watchedBtn.textContent = 'add to watched';
        };
        console.log('qa');
        return;
      };
        
      if (queueBtn.textContent === 'remove from queue') {
        this.removeMovieFromStorage('queue', movieData.id);
        queueBtn.textContent = 'add to queue';
        console.log('qr');
        return;
      };
    }
}

  getCurrentMovieData() {
    const { titleYearId, img, vote, genre } = this.movieRefs;
    const genresId = [];
    genre.forEach(item => genresId.push(Number(item.dataset.genreid)));
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
}

export default new StorageService;