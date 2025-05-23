// Custom Scripts
// Custom scripts

function scrollChest() {
  const modal = document.querySelector('.chest-modal .modal-content');
  const header = document.querySelector('[data-chest-header]');

  if (!modal || !header) return;

  let scrollableElement = modal;

  const updateClass = () => {
    if (scrollableElement.scrollTop > 10) {
      if (!header.classList.contains('scroll')) {
        header.classList.add('scroll');
      }
    } else {
      if (header.classList.contains('scroll')) {
        header.classList.remove('scroll');
      }
    }
  };

  scrollableElement.addEventListener('scroll', updateClass);
  updateClass();
}

document.addEventListener('DOMContentLoaded', scrollChest);








function collectionSlider() {
  const container = document.querySelector('.collection__slider-container');

  if (!container) {
    return null;
  }

  const paginationItems = document.querySelectorAll('.collection__slider-pagination-item');

  const swiper = new Swiper('.collection__slider', {
    slidesPerView: 1.6,
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

// function historySlider() {
//   const container = document.querySelector('.history__slider-container');
//   const historyElement = document.querySelector('.history');
//   const fullBtnSize = document.querySelector('.history__btn-size');

//   if (!container || !historyElement) {
//     return null;
//   }

//   let swiper;

//   function initSwiper() {
//     const isFull = historyElement.classList.contains('full');

//     if (swiper) {
//       swiper.destroy(true, true); // Уничтожаем старый экземпляр
//     }

//     swiper = new Swiper('.history__slider', {
//       slidesPerView: isFull ? 1 : 1.2,
//       centeredSlides: !isFull,
//       spaceBetween: isFull ? 0 : 32,
//       effect: isFull ? 'slide' : 'coverflow',
//       coverflowEffect: isFull
//         ? {}
//         : {
//           rotate: 0,
//           depth: 200,
//           stretch: 30,
//           modifier: 1,
//           scale: 0.8,
//           slideShadows: false,
//         },
//       on: {
//         init: () => {
//           updatePagination(0);
//           updatePaginationSums(0);
//         },
//         slideChange: () => {
//           updatePagination(swiper.realIndex);
//           updatePaginationSums(swiper.realIndex);
//         },
//       },
//     });
//   }



//   const paginationItems = document.querySelectorAll('.history__slider-pagination-item');
//   const paginationSums = document.querySelector('.history__slider-pagination-sums');

//   paginationItems.forEach((item, index) => {
//     item.addEventListener('click', () => {
//       swiper.slideTo(index);
//     });
//   });

//   function updatePagination(activeIndex) {
//     paginationItems.forEach((item, index) => {
//       item.classList.toggle('active', index === activeIndex);
//     });
//   }

//   function updatePaginationSums(activeIndex) {
//     if (paginationSums) {
//       paginationSums.textContent = `${activeIndex + 1} из ${paginationItems.length}`;
//     }
//   }

//   initSwiper(); // Инициализация при загрузке страницы

//   // Обработчик для переключения режима full
//   fullBtnSize.addEventListener('click', () => {
//     historyElement.classList.toggle('full');
//     initSwiper(); // Переинициализация Swiper
//   });
// }

// historySlider();


function historySlider() {
  const container = document.querySelector('.history__slider-container');
  const historyElement = document.querySelector('.history');
  const fullBtnSize = document.querySelector('.history__btn-size');
  const fullBtnSizeInner = document.querySelector('.history__toroll');
  const nextButton = document.querySelector('.history__next');
  const prevButton = document.querySelector('.history__prev');

  if (!container || !historyElement || !fullBtnSize) {
    return null;
  }

  let swiper;

  function initSwiper() {
    const isFull = historyElement.classList.contains('full');

    if (swiper) {
      swiper.destroy(true, true); // Уничтожаем старый экземпляр
    }

    swiper = new Swiper('.history__slider', {
      slidesPerView: isFull ? 1 : 1.2,
      centeredSlides: !isFull,
      spaceBetween: isFull ? 0 : 32,
      effect: isFull ? 'slide' : 'coverflow',
      navigation: isFull ?
        {
          nextEl: '.history__next',
          prevEl: '.history__prev',
        } :
        false,
      coverflowEffect: isFull ?
        {} :
        {
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
        },
        slideChange: () => {
          updatePagination(swiper.realIndex);
          updatePaginationSums(swiper.realIndex);
        },
      },
    });

    // Включаем или выключаем кнопки навигации в зависимости от режима
    if (isFull) {
      nextButton.classList.remove('disabled');
      prevButton.classList.remove('disabled');
    } else {
      nextButton.classList.add('disabled');
      prevButton.classList.add('disabled');
    }
  }

  const paginationItems = document.querySelectorAll('.history__slider-pagination-item');
  const paginationSums = document.querySelector('.history__slider-pagination-sums');

  paginationItems.forEach((item, index) => {
    item.addEventListener('click', () => {
      swiper.slideTo(index);
    });
  });

  function updatePagination(activeIndex) {
    paginationItems.forEach((item, index) => {
      item.classList.toggle('active', index === activeIndex);
    });
  }

  function updatePaginationSums(activeIndex) {
    if (paginationSums) {
      paginationSums.textContent = `${activeIndex + 1} из ${paginationItems.length}`;
    }
  }

  initSwiper(); // Инициализация при загрузке страницы

  // Обработчик для переключения режима full
  fullBtnSize.addEventListener('click', () => {
    historyElement.classList.toggle('full');
    initSwiper(); // Переинициализация Swiper
  });

  // Обработчик для переключения режима full
  fullBtnSizeInner.addEventListener('click', () => {
    historyElement.classList.toggle('full');
    initSwiper(); // Переинициализация Swiper
  });

}

historySlider();



function historyReadSlide() {
  const container = document.querySelector('.history');

  if (!container) {
    return null;
  }

  // Находим кнопку для открытия и закрытия контента
  const btnRead = document.querySelector(".history__btn-read");
  const btnFullRead = document.querySelector(".history__tohistory");
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

    btnFullRead.addEventListener("click", () => {
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
      star, {
      y: "100%",
      opacity: 0
    }, {
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
