const homeWrapper = document.querySelector('.home-wrapper-js');
const libraryWrapper = document.querySelector('.library-wrapper-js');

function focusHomeHandler() {
  homeWrapper.classList.add('active');
  libraryWrapper.classList.remove('active');
  localStorage.setItem('focusedLinkOnHomepage', 'home');
}

function focusLibraryHandler() {
  homeWrapper.classList.remove('active');
  libraryWrapper.classList.add('active');
  localStorage.setItem('focusedLinkOnHomepage', 'library');
}

function savedFocusHomeLibrary() {
  const saved = localStorage.getItem('focusedLinkOnHomepage');

  if (saved === 'library') {
    libraryWrapper.classList.add('active');
    homeWrapper.classList.remove('active');
  }
}

homeWrapper.addEventListener('click', focusHomeHandler);
libraryWrapper.addEventListener('click', focusLibraryHandler);

export { savedFocusHomeLibrary, focusHomeHandler, focusLibraryHandler };
