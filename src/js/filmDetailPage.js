import receivedFilm from './test.json';
import receivedFilm2 from './test2.json';
import createFilmDetailedPage from './createFilmDetailedPage';

let filmsArray = [];

const checkPresenceOfArray = () => {
    if (localStorage.hasOwnProperty('films')) {
        return;
    }
    localStorage.setItem('films', JSON.stringify(filmsArray));
}

checkPresenceOfArray();
createFilmDetailedPage(receivedFilm);

const refs = {
ToWatchedButtonRef: document.getElementById('js-button-to-watched'),
ToQueueButtonRef: document.getElementById('js-button-to-queue'),
}

let filmStatus = {
    isAddedToWatched: false,
    isAddedToQueue: false,
};



const setToAddedToWatchedByDefault = () => {
    refs.ToWatchedButtonRef.textContent = "Remove from watched";
    refs.ToWatchedButtonRef.classList.add('AddedToWatched');
}

const setToNotAddedToWatchedByDefault = () => {
    refs.ToWatchedButtonRef.textContent = "Add to watched";
    refs.ToWatchedButtonRef.classList.remove('AddedToWatched');
}

const setToAddedToWatched = () => {
    refs.ToWatchedButtonRef.textContent = "Remove from watched";
    refs.ToWatchedButtonRef.classList.add('AddedToWatched');
    let FilmToLocalStorage = { ...receivedFilm, ...filmStatus };
    let arrayFromLocalStorage = JSON.parse(localStorage.getItem('films'));
    FilmToLocalStorage.isAddedToWatched = true;
    arrayFromLocalStorage.push(FilmToLocalStorage);
    localStorage.setItem('films', JSON.stringify(arrayFromLocalStorage));
    
}

const setToNotAddedToWatched = () => {
    refs.ToWatchedButtonRef.textContent = "Add to watched";
    refs.ToWatchedButtonRef.classList.remove('AddedToWatched');
    // localStorage.setItem('films', JSON.stringify(filmsArray));
}

const clearFilmFromLocalStorage = () => {
    
}

const checkTheStatusOfFilm = (receivedFilm) => {
    let foundFilm = JSON.parse(localStorage.getItem('films')).find(obj => obj.id === receivedFilm.id);
    console.log(foundFilm);
    if (!foundFilm) {
        return;
    }
    if (foundFilm.isAddedToWatched) {
        console.log('Found Film already added');
        setToAddedToWatchedByDefault();
        return;
    }
        setToNotAddedToWatchedByDefault();
}

const handleToWatched = () => {
    if (!refs.ToWatchedButtonRef.classList.contains('AddedToWatched')) {
        setToAddedToWatched();
        return;
    } 
        setToNotAddedToWatched();
    }


checkTheStatusOfFilm(receivedFilm);


refs.ToWatchedButtonRef.addEventListener('click', handleToWatched);
// refs.ToQueueButtonRef.addEventListener('click', handleToQueue);
