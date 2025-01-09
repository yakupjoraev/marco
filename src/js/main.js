// Custom scripts

function collectionSlider() {
  const container = document.querySelector('.collection__slider-container');

  if (!container) {
    return null;
  }

  const paginationItems = document.querySelectorAll('.collection__slider-pagination-item');

  const swiper = new Swiper('.collection__slider', {
    slidesPerView: 'auto',
    centeredSlides: true,
    effect: 'coverflow',
    coverflowEffect: {
      rotate: 0,
      depth: 200,
      stretch: 30,
      modifier: 1,
      scale: 0.8,
      slideShadows: false,
    },
    on: {
      init: () => updatePagination(0), // При инициализации делаем первый элемент активным
      slideChange: () => updatePagination(swiper.realIndex), // Обновляем активный элемент при смене слайда
    },
  });

  paginationItems.forEach((item, index) => {
    item.addEventListener('click', () => {
      swiper.slideTo(index); // При клике переходим к соответствующему слайду
    });
  });

  function updatePagination(activeIndex) {
    paginationItems.forEach((item, index) => {
      if (index === activeIndex) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });
  }
}

collectionSlider();



const openModalBtns = document.querySelectorAll('.open-modal-btn');
const closeModalBtns = document.querySelectorAll('.close-modal-btn');
const modals = document.querySelectorAll('.modal');

openModalBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const modalId = btn.dataset.modalId;
    const modal = document.getElementById(modalId);
    modal.classList.add('show');
    document.querySelector('.main__body').classList.add('locked')
  });
});

closeModalBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const modal = btn.closest('.modal');
    modal.classList.remove('show');
    document.querySelector('.main__body').classList.remove('locked')
  });
});

window.addEventListener('click', (event) => {
  if (event.target.classList.contains('modal')) {
    event.target.classList.remove('show');
    document.querySelector('.main__body').classList.remove('locked')
  }
});
