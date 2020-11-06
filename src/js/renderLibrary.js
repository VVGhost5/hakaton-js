import { createQueueMarkup, createWatchMarkup } from './navigation';

function savedChoice() {
    const buttonLinkWatchedRef = document.querySelector('.watch-js');
const buttonLinkQueueRef = document.querySelector('.queue-js');
  const saved = localStorage.getItem('focused');

    if (saved === 'watch') {
      buttonLinkWatchedRef.classList.add('is-active');
      buttonLinkQueueRef.classList.remove('is-active');
      createWatchMarkup();
        return;
  } 
    buttonLinkWatchedRef.classList.remove('is-active');
  buttonLinkQueueRef.classList.add('is-active');
  createQueueMarkup();
}

const toggleButtonStyleinLibrary = () => {
  const buttonLinkWatchedRef = document.querySelector('.watch-js');
const buttonLinkQueueRef = document.querySelector('.queue-js');
        buttonLinkWatchedRef.classList.toggle('is-active');
        buttonLinkQueueRef.classList.toggle('is-active');
}

export { toggleButtonStyleinLibrary, savedChoice };