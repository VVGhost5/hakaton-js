import loader from '../templates/error-404.hbs';

function showLoader() {
    const galleryRef = document.querySelector('.main-js');
    const loaderMarkUp = loader();
    galleryRef.insertAdjacentHTML('beforeend', loaderMarkUp)
    
}

export { showLoader };