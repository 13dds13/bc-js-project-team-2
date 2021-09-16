
const get = (type) => {
  try {
    const localData = localStorage.getItem(type);

    return localData === null ? [] : JSON.parse(localData);
  } catch (err) {
    console.error('Get state error: ', err);
  }
};

document.querySelector('#modalBtnWrap').addEventListener('click', onBtnClick);

function onBtnClick(e) {
    const refs = {
    btnWrap: document.querySelector('#modalBtnWrap'),
    watchedBtn: document.querySelector('#watchedBtn'),
    queueBtn: document.querySelector('#queueBtn'),
        movieData: {
            img: document.querySelector('#img'),
            titleYearId: document.querySelector('#titleYearId'),
            vote: document.querySelector('#vote'),
            genre: document.querySelectorAll('.modal__stat-genre'),
    }
    };
    
    if (e.target === refs.watchedBtn) {
        const genresId = [];
        refs.movieData.genre.forEach(item => genresId.push(Number.parseInt(item.dataset.genreid)))

        const movieData = {
            id: refs.movieData.titleYearId.dataset.id,
            release_date: refs.movieData.titleYearId.dataset.year,
            title: refs.movieData.titleYearId.textContent,
            poster_path: refs.movieData.img.dataset.path,
            vote_average: refs.movieData.vote.textContent,
            genre_ids: genresId,
        }
        
        const watched = get('watched');
        watched.push(movieData);
        localStorage.setItem('watched', JSON.stringify(watched));
        return;
    }

    if (e.target === refs.queueBtn) {
        const genresId = [];
        refs.movieData.genre.forEach(item => genresId.push(Number.parseInt(item.dataset.genreid)))

        const movieData = {
            id: refs.movieData.titleYearId.dataset.id,
            release_date: refs.movieData.titleYearId.dataset.year,
            title: refs.movieData.titleYearId.textContent,
            poster_path: refs.movieData.img.dataset.path,
            vote_average: refs.movieData.vote.textContent,
            genre_ids: genresId,
        }
        
        const queue = get('queue');
        queue.push(movieData);
        localStorage.setItem('queue', JSON.stringify(queue));
        return;
    }
};