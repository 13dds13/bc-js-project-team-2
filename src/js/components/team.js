import api from '../services/api';
api.refs.teamOpen.addEventListener('click', toggleTeam);
api.refs.teamClose.addEventListener('click', toggleTeam);
api.refs.overlay.addEventListener('click', toggleTeam);


function toggleTeam() {
  window.addEventListener('keydown', clEsc);
  api.refs.teamModal.classList.toggle('visually-hidden');
  const isOpen = document.querySelector('#team.visually-hidden');
  isOpen && window.removeEventListener('keydown', clEsc);
}

function clEsc(e) {
  console.log(e.code);
  if (e.code === 'Escape') {
    api.refs.teamModal.classList.add('visually-hidden');
    window.removeEventListener('keydown', clEsc);
  }
}
