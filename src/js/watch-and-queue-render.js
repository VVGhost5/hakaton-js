import watchQueueSectionTpl from '../templates/library-section.hbs';

function createWatchAndQueueSectionMarkup() {
  const markupWatchQueueSection = watchQueueSectionTpl();
  const containerRef = document.querySelector('.container');

  containerRef.insertAdjacentHTML('beforeend', markupWatchQueueSection);
}

createWatchAndQueueSectionMarkup();
