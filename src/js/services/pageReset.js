import api from "./api";

const { divAnim } = api.refs;

function pageReset() {
  api.page = 1;
  divAnim.classList.add('visually-hidden');
}

export default pageReset;