document.addEventListener("DOMContentLoaded", function () {

  /* =========================
     MOBILE MENU
  ========================= */

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


  /* =========================
     HEADER HIDE / SHOW
  ========================= */

  const header = document.querySelector(".site-header");

  let lastScroll = 0;

  window.addEventListener("scroll", function () {

    const currentScroll = window.scrollY;

    if (currentScroll > lastScroll && currentScroll > 80) {
      header.classList.add("hide");
    } else {
      header.classList.remove("hide");
    }

    lastScroll = currentScroll;

  });


  /* =========================
     BEFORE / AFTER SLIDERS
  ========================= */

  const sliders = document.querySelectorAll(".before-after");

  sliders.forEach(function (box) {

    const range = box.querySelector(".slider");
    const after = box.querySelector(".after-image");
    const line = box.querySelector(".slider-line");

    if (!range || !after) return;


    function updateSlider() {

      const value = range.value;

      after.style.width = value + "%";

      if (line) {
        line.style.left = value + "%";
      }

    }


    range.addEventListener("input", updateSlider);

    updateSlider();

  });


  /* =========================
     CAROUSEL
  ========================= */

  const track = document.querySelector(".carousel-track");
  const slides = document.querySelectorAll(".project-slide");
  const previous = document.querySelector(".carousel-prev");
  const next = document.querySelector(".carousel-next");
  const dots = document.querySelector(".carousel-dots");


  if (!track || !slides.length || !previous || !next) {
    console.log("Carousel elements not found.");
    return;
  }


  let currentPage = 0;


  function slidesPerPage() {

    if (window.innerWidth <= 760) {
      return 1;
    }

    return 2;

  }


  function totalPages() {

    return Math.ceil(
      slides.length / slidesPerPage()
    );

  }


  function updateCarousel() {

    const pages = totalPages();

    if (currentPage < 0) {
      currentPage = 0;
    }

    if (currentPage >= pages) {
      currentPage = pages - 1;
    }


    /*
      Each page moves one full carousel window.
    */

    track.style.transform =
      "translateX(-" + (currentPage * 100) + "%)";


    previous.disabled =
      currentPage === 0;


    next.disabled =
      currentPage === pages - 1;


    if (dots) {

      dots.querySelectorAll(".carousel-dot")
        .forEach(function (dot, index) {

          dot.classList.toggle(
            "active",
            index === currentPage
          );

        });

    }

  }


  function createDots() {

    if (!dots) return;

    dots.innerHTML = "";

    const pages = totalPages();


    for (let i = 0; i < pages; i++) {

      const dot = document.createElement("button");

      dot.className = "carousel-dot";

      dot.addEventListener("click", function () {

        currentPage = i;

        updateCarousel();

      });

      dots.appendChild(dot);

    }

  }


  next.addEventListener("click", function () {

    if (currentPage < totalPages() - 1) {

      currentPage++;

      updateCarousel();

    }

  });


  previous.addEventListener("click", function () {

    if (currentPage > 0) {

      currentPage--;

      updateCarousel();

    }

  });


  window.addEventListener("resize", function () {

    currentPage = 0;

    createDots();

    updateCarousel();

  });


  createDots();

  updateCarousel();

});
