class ApiService {
  BASE_URL = 'https://api.themoviedb.org/3/';
  API_KEY = '2497cc3d1941bf2f5c8a3541a4d85ed3';
  LANGUAGE = 'en-US';
  INCLUDE_ADULT = 'false';
  SEARCH_TYPE = {
    byInput: 'search/movie?',
    byTrending: 'trending/movie/week?',
    byId: `movie/`,
    genres: `genre/movie/list`,
    trailer: `/videos`,
  };

  constructor() {
    this._page = 1;
    this.refs = {
      galleryList: document.querySelector('#gallary-list'),
      inputRef: document.querySelector('.input__form'),
      form: document.querySelector('#form'),
      pagination: document.querySelector('#tui-pagination-container'),
      btn_404: document.querySelector('#btn_404'),

      logoLink: document.querySelector('#nav-logo'),
      homeLink: document.querySelector('#home-page'),
      libraryLink: document.querySelector('#library-page'),
      searchFilm: document.querySelector('.search-film__wrap'),
      watchedBtn: document.querySelector('#watched-btn'),
      queueBtn: document.querySelector('#queue-btn'),
      header: document.querySelector('#head'),
      teamModal: document.querySelector('#team'),
      teamOpen: document.querySelector('#team-open'),
      teamClose: document.querySelector('#team-close'),
      overlay: document.querySelector('.team__backdrop'),
      divAnim: document.querySelector('.animation'),
      inputRef: document.querySelector('.input__form'),
    };
    this.genres = this.fetchGenres();
  }

  async fetchMovieByInput(input) {
    const searchParams = new URLSearchParams({
      api_key: this.API_KEY,
      language: this.LANGUAGE,
      query: input,
      page: this._page,
      include_adult: this.INCLUDE_ADULT,
    });
    const res = await fetch(`${this.BASE_URL}${this.SEARCH_TYPE.byInput}${searchParams}`);
    if (res.ok) return res.json();

    return Promise.reject(`Film with this "${input}" not found`);
  }

  async fetchMovieByTrending() {
    const searchParams = new URLSearchParams({
      api_key: this.API_KEY,
      page: this._page,
    });

    const res = await fetch(`${this.BASE_URL}${this.SEARCH_TYPE.byTrending}${searchParams}`);

    if (res.ok) return res.json();

    return Promise.reject(`Film with this "${input}" not found`);
  }

  async fetchMovieForModal(movieId) {
    const searchParams = new URLSearchParams({
      api_key: this.API_KEY,
      language: this.LANGUAGE,
    });

    const res = await fetch(`${this.BASE_URL}${this.SEARCH_TYPE.byId}${movieId}?${searchParams}`);
    if (res.ok) return await res.json();

    return Promise.reject('Sorry! Something went wrong :(');
  }

  async fetchGenres() {
    const searchParams = new URLSearchParams({
      api_key: this.API_KEY,
      language: this.LANGUAGE,
    });

    const res = await fetch(`${this.BASE_URL}${this.SEARCH_TYPE.genres}?${searchParams}`);
    if (res.ok) return await res.json();

    return Promise.reject(`Sorry! Something went wrong :(`);
  }
  set page(newPage) {
    this._page = newPage;
  }

  async fetchTrailer(movieId) {
    const searchParams = new URLSearchParams({
      api_key: this.API_KEY,
      language: this.LANGUAGE,
    });

    const res = await fetch(
      `${this.BASE_URL}${this.SEARCH_TYPE.byId}${movieId}${this.SEARCH_TYPE.trailer}?${searchParams}`,
    );
    if (res.ok) return await res.json();

    return Promise.reject('Sorry! Something went wrong :(');
  }
}

const api = new ApiService();

export default api;
