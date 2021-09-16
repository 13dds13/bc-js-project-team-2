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

  getDatafromStorage (type) {
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

  onBtnClick(e) {
  this.getMovieRefs();
  
  if (e.target === watchedBtn) {
    const movieData = this.getCurrentMovieData();
    this.setDataToLocalStorage('watched', movieData);
    return;
  };

    if (e.target === queueBtn) {
    const movieData = this.getCurrentMovieData();
    this.setDataToLocalStorage('queue', movieData);
    return;
    }
}

  getCurrentMovieData() {
    const { titleYearId, img, vote, genre } = this.movieRefs;
    const genresId = [];
    genre.forEach(item => genresId.push(Number(item.dataset.genreid)));
    const movieData = {
      id: titleYearId.dataset.id,
      release_date: titleYearId.dataset.year,
      title: titleYearId.textContent,
      poster_path: img.dataset.path,
      vote_average: vote.textContent,
      genre_ids: genresId,
    };
    return movieData;
  }

  setDataToLocalStorage(type, data) {
    const dataFromStorage = this.getDatafromStorage(type);
    const newData = [...dataFromStorage, data];
    if (newData) {
      localStorage.setItem(type, JSON.stringify(newData));
    }
  }
}


const localStorageApi = new StorageService;

localStorageApi.addListenerToBtns();

function checkUsersLibrary(type, movieId) {
  const localData = get(type)
  if (!localData.length) {
    return;
  };

  const isAlreadyAdded = localData.some(item => item.id === movieId)

  return isAlreadyAdded;
}

