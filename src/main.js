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
const loadBtn = document.getElementById('loadbtn');
loadBtn.style.display = 'none';

let search = '';
let page = 1;

function main() {
  form.addEventListener('submit', async event => {
    event.preventDefault();

    removeLoader();
    loadBtn.insertAdjacentHTML('beforebegin', "<span class='loader'></span>");

    const formData = new FormData(event.target);
    search = formData.get('search');

    if (!search) {
      iziToast.error({
        message: 'Input is empty!',
        messageColor: 'white',
        position: 'topRight',
        backgroundColor: 'red',
      });
      removeLoader();
      return;
    }

    form.reset();
    page = 1;

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
    page += 1;
    try {
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

function loadPages() {
  const totalPages = document.querySelectorAll('.box').length;

  if (totalPages >= totalHits) {
    iziToast.error({
      message: "We're sorry, but you've reached the end of search results.",
      messageColor: 'white',
      position: 'topRight',
      backgroundColor: 'red',
    });
    loadBtn.style.display = 'none';
  } else {
    loadBtn.style.display = 'block';
  }
}

function removeLoader() {
  const loader = document.querySelector('.loader');
  if (loader) {
    loader.remove();
  }
}

main();
