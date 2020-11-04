const showNotFound = () => {
    const galleryRef = document.querySelector('.gallery');
    galleryRef.innerHTML = '';
    let randomValue = Math.floor(Math.random() * Math.floor(5));
    galleryRef.innerHTML = `<img src="./images/notFound${randomValue}.jpg" width="600" height="400" alt="filmNotFound">`;
}

export default showNotFound;

