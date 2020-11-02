import data from './search-section';


const galleryListRef = document.querySelector('.gallery-list');
console.log(galleryListRef);

const handleImage = (event) => {
    event.preventDefault();

console.log('LOL');
    // handleFilmDetailPage(receivedFilm3);
}
galleryListRef.addEventListener('click', (event => handleImage(event)));


