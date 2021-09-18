import Notiflix from "notiflix";

export default function addSpinner() {
    Notiflix.Loading.standard('Loading...');
    Notiflix.Loading.remove(1500);
}