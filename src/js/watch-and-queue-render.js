import watchQueueSectionTpl from '../templates/watch-queue-section.hbs';

function createWatchAndQueueSectionMarkup() {
  const markupWatchQueueSection = watchQueueSectionTpl();
  const containerRef = document.querySelector('.container');

  containerRef.insertAdjacentHTML('beforeend', markupWatchQueueSection);
}

createWatchAndQueueSectionMarkup();
