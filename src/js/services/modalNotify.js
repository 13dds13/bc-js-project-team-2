import Notiflix from 'notiflix';

Notiflix.Notify.init({
  width: '220px',
  distance: '48px',
  fontSize: '12px',
  useIcon: false,
  // closeButton: true,
  timeout: 2500,
  position: 'center-top',
  clickToClose: true,
});

export default Notiflix;