class ApiService {
  BASE_URL = 'https://api.themoviedb.org';
  API_KEY = '2497cc3d1941bf2f5c8a3541a4d85ed3';
  LANGUAGE = 'en-US';
    include_adult = 'false';

  constructor() {
    this._page = 1;
  }

  async fetchMovieByInput(input) {
    const res = await fetch(
      `${this.BASE_URL}/3/search/movie?api_key=${this.API_KEY}&language=${this.LANGUAGE}&query=${input}&page=${this._page}&include_adult=${this.include_adult}`,
    );
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Film with this "${input}" not found`);
  }

  async fetchMovieByTrending() {
    const res = await fetch(`${this.BASE_URL}/3/trending/movie/week?api_key=${this.API_KEY}`);
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Film with this "${input}" not found`);
  }
}

const api = new ApiService();

export default api;
