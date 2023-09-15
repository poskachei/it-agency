document.addEventListener("DOMContentLoaded", () => {

  const header = document.querySelector('.header');

  window.onscroll = () => {
    if (window.scrollY > 50) {
      header.classList.add("sticky");
    } else {
      header.classList.remove("sticky");
    }
  };

  /*-------плавний скрол-------*/
  header.addEventListener('click', event => {
    if (event.target.classList.contains('menu-link')) {
      event.preventDefault();

      const targetId = event.target.getAttribute('href').slice(1);
      const targetElement = document.getElementById(targetId);
      const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
      const startPosition = window.pageYOffset;
      const distance = targetPosition - startPosition;

      let startTime = null;
  
      function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = easeInOutQuad(timeElapsed, startPosition, distance, 600);
        window.scrollTo(0, run);
        if (timeElapsed < 600) requestAnimationFrame(animation);
      }
  
      function easeInOutQuad(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
      }
  
      requestAnimationFrame(animation);
    }
  });

  /*--------на якій секції ми знаходимось----------*/
  const sections = document.querySelectorAll("section");
  const menuLinks = document.querySelectorAll(".menu-link");

  const activateMenuItem = () => {
    for (const section of sections) {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
  
      if (window.scrollY >= sectionTop - sectionHeight / 3) {
        currentSection = section;
      } else {
        break;
      }
    }

    menuLinks.forEach((link) => {
      link.classList.toggle("active", link.hash === `#${currentSection.id}`);
    });
  };

  /*----------------swiper------------*/
  window.addEventListener("scroll", activateMenuItem);

  const swiper = new Swiper('.swiper', {

    spaceBetween:20,
    pagination : {
      el: '.reviews-dots',
      bulletActiveClass: 'reviews-dot-active',
      bulletClass: 'reviews-dot',
      clickable: true
    },
    breakpoints: {
      768: {
        slidesPerView: 2,
      }
    },

    navigation: {
      nextEl: '.review-button-next',
      prevEl: '.review-button-prev',
    }
  });

  /*------------burger-----------------*/
  const burger = document.querySelector('.burger');
  const menu = document.querySelector('.menu');

  burger.addEventListener('click', () => {
    burger.classList.toggle('is-active');
    menu.classList.toggle('open');
  })
});
