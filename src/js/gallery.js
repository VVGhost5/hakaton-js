import gallery from '';
const markup = galleryItems(gallery);

const galleryRef = document.querySelector('.gallery-list');
galleryRef.insertAdjacentHTML('afterbegin', markup)