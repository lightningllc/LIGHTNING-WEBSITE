/* =========================
   MOBILE MENU
========================= */

const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav nav');

if (toggle) {
  toggle.addEventListener('click', () => {
    nav.classList.toggle('open');
  });

  document.querySelectorAll('.nav nav a').forEach(a => {
    a.addEventListener('click', () => {
      nav.classList.remove('open');
    });
  });
}


/* =========================
   HIDE HEADER WHEN SCROLLING
========================= */

let lastScrollTop = 0;
const header = document.querySelector(".site-header");

window.addEventListener("scroll", function () {

  const scrollTop =
    window.pageYOffset || document.documentElement.scrollTop;

  if (scrollTop > lastScrollTop && scrollTop > 80) {

    // Scrolling DOWN
    header.classList.add("hide");

  } else {

    // Scrolling UP
    header.classList.remove("hide");

  }

  lastScrollTop = scrollTop;

});


/* =========================
   BEFORE & AFTER SLIDERS
========================= */

const beforeAfterSliders =
  document.querySelectorAll(".before-after");

beforeAfterSliders.forEach(function (container) {

  const slider = container.querySelector(".slider");
  const afterImage = container.querySelector(".after-image");
  const sliderLine = container.querySelector(".slider-line");
  const sliderButton = container.querySelector(".slider-button");

  slider.addEventListener("input", function () {

    const value = this.value;

    afterImage.style.width = value + "%";
    sliderLine.style.left = value + "%";
    sliderButton.style.left = value + "%";

  });

});


/* =========================
   PROJECT CAROUSEL
========================= */

const carouselTrack =
  document.querySelector(".carousel-track");

const projectSlides =
  document.querySelectorAll(".project-slide");

const previousButton =
  document.querySelector(".carousel-prev");

const nextButton =
  document.querySelector(".carousel-next");

const dotsContainer =
  document.querySelector(".carousel-dots");


if (carouselTrack && projectSlides.length > 0) {

  let currentPage = 0;


  /* Number of projects shown at once */

  function projectsPerPage() {

    if (window.innerWidth <= 760) {
      return 1;
    }

    return 2;
  }


  /* Number of carousel pages */

  function totalPages() {

    return Math.ceil(
      projectSlides.length / projectsPerPage()
    );

  }


  /* Create navigation dots */

  function createDots() {

    dotsContainer.innerHTML = "";

    const pages = totalPages();

    for (let i = 0; i < pages; i++) {

      const dot =
        document.createElement("button");

      dot.className = "carousel-dot";

      dot.setAttribute(
        "aria-label",
        "Go to project group " + (i + 1)
      );

      dot.addEventListener("click", function () {

        currentPage = i;

        updateCarousel();

      });

      dotsContainer.appendChild(dot);

    }

  }


  /* Update carousel position */

  function updateCarousel() {

    const perPage = projectsPerPage();

    /*
      Each project takes:
      Desktop = 50%
      Mobile  = 100%
    */

    const moveAmount =
      currentPage * 100;

    carouselTrack.style.transform =
      "translateX(-" + moveAmount + "%)";


    /* Update arrows */

    previousButton.disabled =
      currentPage === 0;

    nextButton.disabled =
      currentPage >= totalPages() - 1;


    /* Update dots */

    const dots =
      dotsContainer.querySelectorAll(".carousel-dot");

    dots.forEach(function (dot, index) {

      dot.classList.toggle(
        "active",
        index === currentPage
      );

    });

  }


  /* NEXT */

  nextButton.addEventListener("click", function () {

    if (currentPage < totalPages() - 1) {

      currentPage++;

      updateCarousel();

    }

  });


  /* PREVIOUS */

  previousButton.addEventListener("click", function () {

    if (currentPage > 0) {

      currentPage--;

      updateCarousel();

    }

  });


  /* Recalculate when screen changes */

  window.addEventListener("resize", function () {

    const pages = totalPages();

    if (currentPage >= pages) {

      currentPage = pages - 1;

    }

    createDots();

    updateCarousel();

  });


  /* Initial setup */

  createDots();
  updateCarousel();

}
