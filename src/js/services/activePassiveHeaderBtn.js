function activePassiveHeaderBtn(active, passive) {
  passive.classList.add('btn-passive');
  passive.classList.remove('btn-active');
  active.classList.add('btn-active');
  active.classList.remove('btn-passive');
}

export default activePassiveHeaderBtn;
