import SimpleLightbox from 'simplelightbox'; // Описаний у документації
import 'simplelightbox/dist/simple-lightbox.min.css'; // Додатковий імпорт стилів
import iziToast from 'izitoast'; // Описаний у документації
import 'izitoast/dist/css/iziToast.min.css'; // Додатковий імпорт стилів

const gallery = document.querySelector('.gallery');
const loadBtn = document.querySelector('.load-btn');

export let totalHits = 0;

const renderImages = data => {
  const { hits } = data;
  totalHits = data.totalHits;

  if (hits.length === 0) {
    iziToast.error({
      message:
        'Sorry, there are no images matching your search query. Please try again!',
      messageColor: 'white',
      position: 'topRight',
      backgroundColor: 'red',
    });

    loadBtn.style.display = 'none';
  }

  return hits
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `
            <li class="gallery-item"><div class="box">
                <a href="${largeImageURL}" target="_blank">
                    <img class="gallery-img" src="${webformatURL}" alt="${tags}" loading="lazy" />
                </a>
                <div class="description">
                    <div><p>Likes</p><span> ${likes}</span></div>
                    <div><p>Views</p><span> ${views}</span></div>
                    <div><p>Comments</p><span> ${comments}</span></div>
                    <div><p>Downloads</p><span> ${downloads}</span></div>
                </div>
            </div></li>`
    )
    .join('');
};

export const showGallery = data => {
  const markup = renderImages(data);
  gallery.insertAdjacentHTML('beforeend', markup);
};

const lightbox = new SimpleLightbox('.gallery a');
export const lightBoxGallery = () => {
  lightbox.refresh();
};
