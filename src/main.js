import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { getImg } from './js/pixabay-api.js';
import { showGallery, lightBoxGallery } from './js/render-functions.js';

const form = document.querySelector('form');
const gallery = document.querySelector('.gallery');

function main() {
  form.addEventListener('submit', event => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const search = formData.get('search');

    if (!search) {
      iziToast.error({
        message: 'Input is empty!',
        messageColor: 'white',
        position: 'topRight',
        backgroundColor: 'red',
      });
      return;
    }

    form.reset();
    gallery.innerHTML = `<span class="loader"></span>`;

    getImg(search)
      .then(data => {
        showGallery(data);
        lightBoxGallery();
      })
      .catch(error => {
        console.error('Error:', error);
        gallery.innerHTML = '';
      });
  });
}

main();
