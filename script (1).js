/* ========================================
   MOBILE MENU
======================================== */

const menuToggle = document.querySelector(".menu-toggle");
const navMenu = document.querySelector(".nav nav");

if (menuToggle && navMenu) {

  menuToggle.addEventListener("click", function () {

    navMenu.classList.toggle("open");

  });


  document.querySelectorAll(".nav nav a").forEach(function (link) {

    link.addEventListener("click", function () {

      navMenu.classList.remove("open");

    });

  });

}


/* ========================================
   HEADER SHOW / HIDE ON SCROLL
======================================== */

const header = document.querySelector(".site-header");

let lastScrollTop = 0;

window.addEventListener("scroll", function () {

  const scrollTop =
    window.pageYOffset ||
    document.documentElement.scrollTop;


  if (scrollTop > lastScrollTop && scrollTop > 80) {

    header.classList.add("hide");

  } else {

    header.classList.remove("hide");

  }


  lastScrollTop = scrollTop;

});


/* ========================================
   BEFORE & AFTER SLIDERS
======================================== */

document.querySelectorAll(".before-after").forEach(function (sliderBox) {

  const slider =
    sliderBox.querySelector(".slider");

  const afterImage =
    sliderBox.querySelector(".after-image");

  const sliderLine =
    sliderBox.querySelector(".slider-line");


  if (!slider || !afterImage) {
    return;
  }


  function updateSlider() {

    const value = slider.value;

    afterImage.style.width = value + "%";

    if (sliderLine) {

      sliderLine.style.left = value + "%";

    }

  }


  slider.addEventListener(
    "input",
    updateSlider
  );


  updateSlider();

});


/* ========================================
   PROJECT CAROUSEL
======================================== */

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


if (
  carouselTrack &&
  projectSlides.length > 0 &&
  previousButton &&
  nextButton &&
  dotsContainer
) {

  let currentPage = 0;


  function projectsPerPage() {

    if (window.innerWidth <= 760) {

      return 1;

    }

    return 2;

  }


  function totalPages() {

    return Math.ceil(
      projectSlides.length /
      projectsPerPage()
    );

  }


  function createDots() {

    dotsContainer.innerHTML = "";


    const pages = totalPages();


    for (let i = 0; i < pages; i++) {

      const dot =
        document.createElement("button");


      dot.className =
        "carousel-dot";


      dot.setAttribute(
        "aria-label",
        "Go to project group " + (i + 1)
      );


      dot.addEventListener(
        "click",
        function () {

          currentPage = i;

          updateCarousel();

        }
      );


      dotsContainer.appendChild(dot);

    }

  }


  function updateCarousel() {

    const perPage =
      projectsPerPage();


    /*
      Desktop:
      4 projects
      2 projects visible
      Move 100% of the window

      Mobile:
      4 projects
      1 project visible
      Move 100% of the window
    */

    const moveAmount =
      currentPage * 100;


    carouselTrack.style.transform =
      "translateX(-" +
      moveAmount +
      "%)";


    previousButton.disabled =
      currentPage === 0;


    nextButton.disabled =
      currentPage >= totalPages() - 1;


    const dots =
      dotsContainer.querySelectorAll(
        ".carousel-dot"
      );


    dots.forEach(function (dot, index) {

      dot.classList.toggle(
        "active",
        index === currentPage
      );

    });

  }


  /* NEXT */

  nextButton.addEventListener(
    "click",
    function () {

      if (
        currentPage <
        totalPages() - 1
      ) {

        currentPage++;

        updateCarousel();

      }

    }
  );


  /* PREVIOUS */

  previousButton.addEventListener(
    "click",
    function () {

      if (currentPage > 0) {

        currentPage--;

        updateCarousel();

      }

    }
  );


  /* RESIZE */

  window.addEventListener(
    "resize",
    function () {

      const pages =
        totalPages();


      if (currentPage >= pages) {

        currentPage =
          pages - 1;

      }


      createDots();

      updateCarousel();

    }
  );


  /* START */

  createDots();

  updateCarousel();

}
