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

function historySlider() {
  const container = document.querySelector('.history__slider-container');

  if (!container) {
    return null;
  }

  const paginationItems = document.querySelectorAll('.history__slider-pagination-item');
  const paginationSums = document.querySelector('.history__slider-pagination-sums');

  const swiper = new Swiper('.history__slider', {
    slidesPerView: 1.2,
    centeredSlides: true,
    spaceBetween: 32,
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
      init: () => {
        updatePagination(0);
        updatePaginationSums(0);
      }, // При инициализации делаем первый элемент активным
      slideChange: () => {
        updatePagination(swiper.realIndex);
        updatePaginationSums(swiper.realIndex);
      }, // Обновляем активный элемент при смене слайда
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

  function updatePaginationSums(activeIndex) {
    if (paginationSums) {
      paginationSums.textContent = `${activeIndex + 1} из ${paginationItems.length}`;
    }
  }
}

historySlider();


function historyReadSlide() {
  const container = document.querySelector('.history');

  if (!container) {
    return null;
  }

  // Находим кнопку для открытия и закрытия контента
  const btnRead = document.querySelector(".history__btn-read");
  const slider = document.querySelector(".history__slider");

  if (btnRead && slider) {
    btnRead.addEventListener("click", () => {
      const activeSlide = slider.querySelector(".swiper-slide-active");

      if (activeSlide) {
        const slideInfo = activeSlide.querySelector(".history__slide-info");
        if (slideInfo) {
          slideInfo.classList.toggle("visible");
        }
      }
    });

    // Находим все кнопки закрытия слайдов
    const closeButtons = slider.querySelectorAll(".history__slide-btn");
    closeButtons.forEach((closeButton) => {
      closeButton.addEventListener("click", () => {
        const activeSlide = slider.querySelector(".swiper-slide-active");

        if (activeSlide) {
          const slideInfo = activeSlide.querySelector(".history__slide-info");
          if (slideInfo) {
            slideInfo.classList.remove("visible");
          }
        }
      });
    });
  }
}

historyReadSlide();

document.addEventListener("DOMContentLoaded", () => {
  const starContainer = document.querySelector(".starfalls");

  if (!starContainer) {
    return null
  }

  const starCount = 15; // Количество звёзд одновременно

  // Функция создания звезды
  function createStar() {
    const star = document.createElement("div");
    star.classList.add("starfall");
    star.innerHTML = '<img src="./img/icons/img-star-2.png" alt="star icon">';

    // Случайная позиция по горизонтали
    const randomX = Math.random() * 100;
    star.style.left = `${randomX}%`;

    // Добавляем звезду в контейнер
    starContainer.appendChild(star);

    // Анимация появления звезды
    gsap.fromTo(
      star,
      { y: "100%", opacity: 0 },
      {
        y: "-10%", // Уходит вверх за пределы экрана
        opacity: 1,
        duration: gsap.utils.random(8, 15), // Случайная длительность анимации
        ease: "power1.out",
        onComplete: () => {
          // Удаляем звезду после завершения анимации
          star.remove();
          // Создаём новую звезду
          createStar();
        },
      }
    );
  }

  // Создаём начальный набор звёзд
  for (let i = 0; i < starCount; i++) {
    setTimeout(createStar, i * 500); // Добавляем задержку между появлениями звёзд
  }
});




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
