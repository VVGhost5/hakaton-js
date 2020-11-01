import receivedFilm from './test.json';
import receivedFilm2 from './test2.json';
import receivedFilm3 from './test3.json';
import createFilmDetailedPage from './createFilmDetailedPage';

const handleFilmDetailPage = (receivedFilm) => {

let filmsArray = [];
let arrayFromLocalStorage;

const checkPresenceOfArray = (array) => {
    if (localStorage.hasOwnProperty(array)) {
        return;
    }
    localStorage.setItem(array, JSON.stringify(filmsArray));
}

checkPresenceOfArray('filmsWatched');
checkPresenceOfArray('filmsQueue');
createFilmDetailedPage(receivedFilm);

const refs = {
ToWatchedButtonRef: document.getElementById('js-button-to-watched'),
ToQueueButtonRef: document.getElementById('js-button-to-queue'),
}

const setButtonAddToWatched = () => {
    refs.ToWatchedButtonRef.textContent = "Remove from watched";
    refs.ToWatchedButtonRef.classList.add('AddedToWatched');
}

const setButtonRemoveFromWatched = () => {
    refs.ToWatchedButtonRef.textContent = "Add to watched";
    refs.ToWatchedButtonRef.classList.remove('AddedToWatched');
}

const setButtonAddToQueue = () => {
    refs.ToQueueButtonRef.textContent = "Remove from queue";
    refs.ToQueueButtonRef.classList.add('AddedToQueue');
}

const setButtonRemoveFromQueue = () => {
    refs.ToQueueButtonRef.textContent = "Add to queue";
    refs.ToQueueButtonRef.classList.remove('AddedToQueue');
}

const setToAddedToWatched = () => {
    setButtonAddToWatched();
    arrayFromLocalStorage = JSON.parse(localStorage.getItem('filmsWatched'));
    arrayFromLocalStorage.push(receivedFilm);
    localStorage.setItem('filmsWatched', JSON.stringify(arrayFromLocalStorage));   
}

const setToAddedToQueue = () => {
    setButtonAddToQueue();
    arrayFromLocalStorage = JSON.parse(localStorage.getItem('filmsQueue'));
    arrayFromLocalStorage.push(receivedFilm);
    localStorage.setItem('filmsQueue', JSON.stringify(arrayFromLocalStorage));   
}

const setToNotAddedToWatched = () => {
    setButtonRemoveFromWatched();
    clearFilmWatchedFromLocalStorage(receivedFilm);
}

const setToNotAddedToQueue = () => {
    setButtonRemoveFromQueue();
    clearFilmQueueFromLocalStorage(receivedFilm);
}

const clearFilmWatchedFromLocalStorage = (receivedFilm) => {
    let foundWatchedFilm = JSON.parse(localStorage.getItem('filmsWatched')).find(obj => obj.id === receivedFilm.id);
    if (!foundWatchedFilm) {
        return;
    }
    arrayFromLocalStorage = JSON.parse(localStorage.getItem('filmsWatched'));
    let ObjectToClear = arrayFromLocalStorage.find(obj => obj.id === receivedFilm.id); 
    arrayFromLocalStorage.splice(arrayFromLocalStorage.indexOf(ObjectToClear), 1);
    localStorage.setItem('filmsWatched', JSON.stringify(arrayFromLocalStorage));  
}

const clearFilmQueueFromLocalStorage = (receivedFilm) => {
    let foundQueueFilm = JSON.parse(localStorage.getItem('filmsQueue')).find(obj => obj.id === receivedFilm.id);
    if (!foundQueueFilm) {
        return;
    }
    arrayFromLocalStorage = JSON.parse(localStorage.getItem('filmsQueue'));
    arrayFromLocalStorage.splice(arrayFromLocalStorage.indexOf(foundQueueFilm), 1);
    localStorage.setItem('filmsQueue', JSON.stringify(arrayFromLocalStorage));  
}

const checkTheStatusOfWatchedFilm = (receivedFilm) => {
    let foundFilm = JSON.parse(localStorage.getItem('filmsWatched')).find(obj => obj.id === receivedFilm.id);
    if (!foundFilm) {
        setButtonRemoveFromWatched();
        return;
    }
    setButtonAddToWatched();
};
    
const checkTheStatusOfQueueFilm = (receivedFilm) => {
    let foundFilm = JSON.parse(localStorage.getItem('filmsQueue')).find(obj => obj.id === receivedFilm.id);
    if (!foundFilm) {
        setButtonRemoveFromQueue();
        return;
    }
    setButtonAddToQueue();
};
 
const handleToWatched = () => {
    if (!refs.ToWatchedButtonRef.classList.contains('AddedToWatched')) {
        setToAddedToWatched();
        return;
    } 
        setToNotAddedToWatched();
}
    
const handleToQueue = () => {
    if (!refs.ToQueueButtonRef.classList.contains('AddedToQueue')) {
        setToAddedToQueue();
        return;
    } 
        setToNotAddedToQueue();
    }

checkTheStatusOfWatchedFilm(receivedFilm);
checkTheStatusOfQueueFilm(receivedFilm);


refs.ToWatchedButtonRef.addEventListener('click', handleToWatched);
refs.ToQueueButtonRef.addEventListener('click', handleToQueue);
}

handleFilmDetailPage(receivedFilm3);