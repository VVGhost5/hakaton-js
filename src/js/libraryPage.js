import watch from '../templates/library-section.hbs';
import queue from '../templates/library-section.hbs';
import { createRouter } from 'routerjs';

const watchLinkRef = document.querySelector('.watch-js');
const queueLinkRef = document.querySelector('.queue-js');
const libraryRef = document.querySelector('.library');

savedChoice();

const router = createRouter()
  .get('/watch', (req, context) => {
    createWatchMarkup();
  })
  .get('/queue', (req, context) => {
    createQueueMarkup();
  })
  .run();

watchLinkRef.addEventListener('click', focusWatchHandler);
queueLinkRef.addEventListener('click', focusQueueHandler);

function createWatchMarkup() {
  const markupWatch = watch();
  libraryRef.innerHTML = markupWatch;
}

function createQueueMarkup() {
  const queueMarkup = queue();
  libraryRef.innerHTML = queueMarkup;
}

function focusWatchHandler() {
  watchLinkRef.classList.add('is-active');
  queueLinkRef.classList.remove('is-active');
  localStorage.setItem('focused', 'watch');
}

function focusQueueHandler() {
  watchLinkRef.classList.remove('is-active');
  queueLinkRef.classList.add('is-active');
  localStorage.setItem('focused', 'queue');
}

function savedChoice() {
  const saved = localStorage.getItem('focused');

  if (saved === 'queue') {
    queueLinkRef.classList.add('is-active');
    watchLinkRef.classList.remove('is-active');
  }
}
