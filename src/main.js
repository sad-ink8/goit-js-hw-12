import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { getImg } from './js/pixabay-api.js';
import {
  showGallery,
  lightBoxGallery,
  totalHits,
} from './js/render-functions.js';

const form = document.querySelector('form');
const gallery = document.querySelector('.gallery');
const loadBtn = document.querySelector('.load-btn');
loadBtn.style.display = 'none';

let search = '';
let page = 1;

function main() {
  form.addEventListener('submit', async event => {
    event.preventDefault();

    const formData = new FormData(event.target);
    search = formData.get('search');

    if (!search) {
      iziToast.error({
        message: 'Input is empty!',
        messageColor: 'white',
        position: 'topRight',
        backgroundColor: 'red',
      });
      return;
    }

    loadBtn.insertAdjacentHTML('afterend', "<span class='loader'></span>");
    form.reset();

    try {
      const firstImg = await getImg(search, page);
      gallery.innerHTML = '';
      showGallery(firstImg);
      lightBoxGallery();
      loadPages();
    } catch (error) {
      console.error('Error:', error);
      gallery.innerHTML = '';
    }
  });

  loadBtn.addEventListener('click', async () => {
    try {
      page += 1;
      const addImages = await getImg(search, page);
      showGallery(addImages);
      lightBoxGallery();
      loadPages();
      scrollPage();
    } catch (error) {
      console.error('Error:', error);
    }
  });
}

function loadPages() {
  const totalPages = document.querySelectorAll('.box').length;

  if (totalPages >= totalHits) {
    iziToast.error({
      message: "We're sorry, but you've reached the end of search results.",
      messageColor: 'white',
      position: 'topRight',
      backgroundColor: 'red',
    });
  } else {
    loadBtn.style.display = 'block';
  }
}

function scrollPage() {
  const imgBox = document.querySelector('.box');

  if (imgBox) {
    const boxH = imgBox.getBoundingClientRect().height;

    window.scrollBy({
      top: boxH * 2,
      behavior: 'smooth',
    });
  }
}

main();
