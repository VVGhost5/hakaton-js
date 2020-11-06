
import showNotification from './notification';

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

    const setButtonValue = (event, textContent) => {
        event.target.textContent = textContent;
};

const setToAddedToWatched = (event) => {
    setButtonValue(event, 'Remove from watched');
    event.target.classList.add('AddedToWatched');
    arrayFromLocalStorage = JSON.parse(localStorage.getItem('filmsWatched'));
    arrayFromLocalStorage.push(receivedFilm);
    localStorage.setItem('filmsWatched', JSON.stringify(arrayFromLocalStorage));   
}

const setToAddedToQueue = (event) => {
    setButtonValue(event, 'Remove from queue');
    event.target.classList.add('AddedToQueue');
    arrayFromLocalStorage = JSON.parse(localStorage.getItem('filmsQueue'));
    arrayFromLocalStorage.push(receivedFilm);
    localStorage.setItem('filmsQueue', JSON.stringify(arrayFromLocalStorage));   
}

const setToNotAddedToWatched = (event) => {
    setButtonValue(event, 'Add to watched');
    event.target.classList.remove('AddedToWatched');
    clearFilmWatchedFromLocalStorage(receivedFilm);
}

const setToNotAddedToQueue = (event) => {
    setButtonValue(event, 'Add to queue');
    event.target.classList.remove('AddedToQueue');
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
 
    const handleToWatched = (event) => {
        if (!event.target.classList.contains('AddedToWatched')) {
        showNotification('Added to watched !');
        setToAddedToWatched(event);
        return;
        } 
        showNotification('Removed from watched !');
        setToNotAddedToWatched(event);
}
    
const handleToQueue = (event) => {
    if (!event.target.classList.contains('AddedToQueue')) {
        showNotification('Added to queue !');
        setToAddedToQueue(event);
        return;
    } 
        showNotification('Removed from queue !');
        setToNotAddedToQueue(event);
    }

checkTheStatusOfWatchedFilm(receivedFilm);
checkTheStatusOfQueueFilm(receivedFilm);


refs.ToWatchedButtonRef.addEventListener('click', (event => handleToWatched(event)));
refs.ToQueueButtonRef.addEventListener('click', (event => handleToQueue(event)));
}

export default handleFilmDetailPage;