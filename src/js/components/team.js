import api from '../services/api';
api.refs.teamOpen.addEventListener('click', toggleTeam);
api.refs.teamClose.addEventListener('click', toggleTeam);
function toggleTeam() {
  api.refs.teamModal.classList.toggle('visually-hidden');
}

// api.refs.teamModal.addEventListener('keyup', clEsc);
// function clEsc(e) {
//   console.log(e.code);
//   if (api.refs.teamModal.classList.contains('visually-=hidden')) {
//     return;
//   } else {
//     if (e.code === 'Escape') {
//       api.refs.teamModal.classList.remove('visually-hidden');
//     }
//   }
// }

// const overlay = document.querySelector('.lightbox__overlay');
// overlay.addEventListener('click', toggleTeam);
