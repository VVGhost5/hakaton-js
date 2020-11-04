import data from './search-section';


const galleryListRef = document.querySelector('.gallery-list');

const handleImage = (event) => {
    event.preventDefault();

}
galleryListRef.addEventListener('click', (event => handleImage(event)));


