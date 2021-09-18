function classRemove(clas,...el) {
  el.forEach(element => {
    element.classList.remove(clas);
  });
}

export default classRemove;
