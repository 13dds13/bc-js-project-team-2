function classAdd(clas, ...el) {
  el.forEach(element => {
    element.classList.add(clas);
  });
}

export default classAdd;
