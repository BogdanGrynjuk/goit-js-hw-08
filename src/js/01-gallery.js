import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
// Add imports above this line
import { galleryItems } from './gallery-items';
// Change code below this line

console.log(galleryItems);

const gallery = document.querySelector('.gallery');

gallery.insertAdjacentHTML("afterbegin", createGalleryItemsMarkup(galleryItems));
gallery.addEventListener('click', onGalleryClick);

const lightbox = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionDelay: 250
});

function createGalleryItemsMarkup(galleryItems) {
  return galleryItems
    .map(({ preview, original, description }) => {
      return `
      <a class="gallery__item" href="${original}">
        <img class="gallery__image" src="${preview}" alt="${description}"/>
      </a>`
    })
    .join('');
}

function onGalleryClick(event) {
  event.preventDefault();
  
  if (!event.target.classList.contains('gallery__image')) {
    return;
  };
}