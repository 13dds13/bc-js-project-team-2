import api from '../services/api';
api.refs.teamOpen.addEventListener('click', toggleTeam);
api.refs.teamClose.addEventListener('click', toggleTeam);
api.refs.overlay.addEventListener('click', toggleTeam);
window.addEventListener('keyup', clEsc);

function toggleTeam() {
  api.refs.teamModal.classList.toggle('visually-hidden');
}

function clEsc(e) {
  console.log(e.code);
  if (e.code === 'Escape') {
    api.refs.teamModal.classList.add('visually-hidden');
    window.removeEventListener('keydown', clEsc);
  }
}
