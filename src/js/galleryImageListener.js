import data from './search-section';

const callTest = () => {
    const galleryListRef = document.querySelector('#gallery-list-id');
    console.log(galleryListRef);
    galleryListRef.style.backgroundColor = 'red';

    const handleImage = (event) => {
        event.preventDefault();

        console.log('LOL');
        // handleFilmDetailPage(receivedFilm3);
    }
    galleryListRef.addEventListener('click', (event) => console.log(event));
};

export { callTest };
    






