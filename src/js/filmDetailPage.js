import receivedFilm from './test.json';
import receivedFilm2 from './test2.json';
import createFilmDetailedPage from './createFilmDetailedPage';

createFilmDetailedPage(receivedFilm);

const refs = {
ToWatchedButtonRef: document.getElementById('js-button-to-watched'),
ToQueueButtonRef: document.getElementById('js-button-to-queue'),
}

console.log(refs.ToWatchedButtonRef);

let filmStatus = {
    isAddedToWatched: null,
    isAddedToQueue: null,
};

let filmsArray = [];

console.log(receivedFilm);

let FilmToLocalStorage = { ...receivedFilm, ...filmStatus };

filmsArray = [...FilmToLocalStorage];

console.log(filmsArray);

console.log(FilmToLocalStorage);

let isWatched = JSON.parse(localStorage.getItem('films'));

console.log(isWatched);

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
    FilmToLocalStorage.isAddedToWatched = true;
    localStorage.setItem('films', JSON.stringify(filmsArray));
}

const setToNotAddedToWatched = () => {
    refs.ToWatchedButtonRef.textContent = "Add to watched";
    refs.ToWatchedButtonRef.classList.remove('AddedToWatched');
    FilmToLocalStorage.isAddedToWatched = false;
    localStorage.setItem('films', JSON.stringify(filmsArray));
}

const clearFilmFromLocalStorage = () => {
    
}

const checkTheStatusOfFilm = (receivedFilm) => {
    let findedFilm = filmsArray.find(obj => obj.id === receivedFilm.id);
    console.log(`!!!!!!!!!!!!! ${findedFilm.isAddedToWatched}`);
    if (findedFilm.isAddedToWatched) {
        console.log('NOT ADDED');
         setToNotAddedToWatchedByDefault();
    } else {
        setToAddedToWatchedByDefault();
        console.log('ADDED');
    }
    
}

const handleToWatched = () => {
    if (!refs.ToWatchedButtonRef.classList.contains('AddedToWatched')) {
        setToAddedToWatched();
    } else {
        setToNotAddedToWatched();
    }

}

checkTheStatusOfFilm(receivedFilm);


refs.ToWatchedButtonRef.addEventListener('click', handleToWatched);
// refs.ToQueueButtonRef.addEventListener('click', handleToQueue);
