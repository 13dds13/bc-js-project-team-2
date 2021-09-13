import renderMovieDataToModal from '../../templates/renderMovieForModal.hbs'

// нужно переделать в метод api;

async function fetchMovieForModal(movieId) {
    const BASE_URL = 'https://api.themoviedb.org/3/';
    const API_KEY = '2497cc3d1941bf2f5c8a3541a4d85ed3';
    const LANGUAGE = 'en-US';
    const SEARCH_TYPE = `/movie/${movieId}`

    const res = await fetch(`${BASE_URL}${SEARCH_TYPE}?api_key=${API_KEY}&language=${LANGUAGE}`);
    if (res.ok) return await res.json();

    return Promise.reject(`The resource you requested could not be found.`);
};

const modalMarkup = document.querySelector('.js-movie-data');

async function movieDataForModal(movieId) {
    try {
        const responseData = await fetchMovieForModal(movieId);
        const { genres: genresWithID } = responseData;
        const genres = genresWithID.map(obj => obj.name);
        const addaptedData = { ...responseData, genres };
        const markup = renderMovieDataToModal(addaptedData);
        modalMarkup.innerHTML = markup;
    } catch (error) {
        console.log(error);
    }
};

movieDataForModal(550);