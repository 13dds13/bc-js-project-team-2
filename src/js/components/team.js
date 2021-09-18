import api from '../services/api';
api.refs.teamOpen.addEventListener('click', toggleTeam);
api.refs.teamClose.addEventListener('click', toggleTeam);
api.refs.overlay.addEventListener('click', toggleTeam);


function toggleTeam() {
  window.addEventListener('keydown', clEsc);
  api.refs.teamModal.classList.toggle('visually-hidden');
  document.body.classList.add('body-modal-open');
  const isOpen = document.querySelector('#team.visually-hidden');
  if (isOpen) {
    document.body.classList.remove('body-modal-open');
    window.removeEventListener('keydown', clEsc);
  };
};

function clEsc(e) {
  if (e.code === 'Escape') {
    api.refs.teamModal.classList.add('visually-hidden');
    window.removeEventListener('keydown', clEsc);
    document.body.classList.remove('body-modal-open');
  };
};
