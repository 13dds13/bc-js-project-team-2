
import api from '../services/api'
import modalService from '../services/modalService'
import storageService from '../services/storageService'

api.refs.galleryList.addEventListener('click', modalService.onMovieCardClick.bind(modalService));

storageService.addListenerToBtns();