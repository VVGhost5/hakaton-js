function upBtnCreate () {
    const upBtnRef = document.querySelector('.up-btn-link');

  const onEntry = (entries, observer) => {
    entries.forEach(entry => {
           if (!entry.isIntersecting) {
        upBtnRef.classList.remove('up-btn-hidden');
      } else {
        upBtnRef.classList.add('up-btn-hidden');
      }
    });
  };
  const options = {
    rootMargin: '100px',
  };
  const io = new IntersectionObserver(onEntry, options);

  const formRef = document.querySelector('.search-form');
  io.observe(formRef);

  function upToStartPage(event) {
    window.scrollTo(0, 0);
    upBtnRef.classList.add('up-btn-hidden');
  }
  upBtnRef.addEventListener('click', upToStartPage);
}

export default upBtnCreate