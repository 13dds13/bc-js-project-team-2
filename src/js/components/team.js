import api from '../services/api';

const { teamOpen, teamClose, overlay, teamModal } = api.refs;

teamOpen.addEventListener('click', toggleTeam);
teamClose.addEventListener('click', toggleTeam);
overlay.addEventListener('click', toggleTeam);


function toggleTeam() {
  window.addEventListener('keydown', clEsc);
  teamModal.classList.toggle('visually-hidden');
  const isOpen = document.querySelector('#team.visually-hidden');
  isOpen && window.removeEventListener('keydown', clEsc);
}

function clEsc(e) {
  if (e.code === 'Escape') {
    teamModal.classList.add('visually-hidden');
    window.removeEventListener('keydown', clEsc);
  }
}
