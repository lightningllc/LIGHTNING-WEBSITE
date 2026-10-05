document.addEventListener("DOMContentLoaded", function () {

  console.log("LIGHTNING SCRIPT LOADED");


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
     HEADER
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
     BEFORE / AFTER
  ========================= */

  const beforeAfterBoxes =
    document.querySelectorAll(".before-after");

  console.log(
    "Before/After sliders found:",
    beforeAfterBoxes.length
  );


  beforeAfterBoxes.forEach(function (box) {

    const slider = box.querySelector(".slider");
    const after = box.querySelector(".after-image");
    const line = box.querySelector(".slider-line");

    if (!slider || !after) {
      console.log("Slider elements missing");
      return;
    }


    function moveSlider() {

      const value = slider.value;

      after.style.width = value + "%";

      if (line) {
        line.style.left = value + "%";
      }

    }


    slider.addEventListener("input", moveSlider);

    moveSlider();

  });


  /* =========================
     CAROUSEL
  ========================= */

  const track =
    document.querySelector(".carousel-track");

  const slides =
    document.querySelectorAll(".project-slide");

  const next =
    document.querySelector(".carousel-next");

  const previous =
    document.querySelector(".carousel-prev");

  const dots =
    document.querySelector(".carousel-dots");


  console.log(
    "Carousel slides found:",
    slides.length
  );


  if (!track || !next || !previous || slides.length === 0) {

    console.log("CAROUSEL ELEMENTS ARE MISSING");

    return;

  }


  let currentPage = 0;


  function getSlidesPerPage() {

    if (window.innerWidth <= 760) {
      return 1;
    }

    return 2;

  }


  function getTotalPages() {

    return Math.ceil(
      slides.length / getSlidesPerPage()
    );

  }


  function createDots() {

    if (!dots) return;

    dots.innerHTML = "";

    const total =
      getTotalPages();


    for (let i = 0; i < total; i++) {

      const dot =
        document.createElement("button");

      dot.className = "carousel-dot";

      if (i === currentPage) {
        dot.classList.add("active");
      }


      dot.addEventListener("click", function () {

        currentPage = i;

        updateCarousel();

      });


      dots.appendChild(dot);

    }

  }


  function updateCarousel() {

    /*
      Each page moves exactly one
      visible screen of projects.
    */

    const total =
      getTotalPages();


    if (currentPage < 0) {
      currentPage = 0;
    }


    if (currentPage >= total) {
      currentPage = total - 1;
    }


    const percent =
      currentPage * 100;


    track.style.transform =
      "translateX(-" + percent + "%)";


    previous.disabled =
      currentPage === 0;


    next.disabled =
      currentPage === total - 1;


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


  next.addEventListener("click", function () {

    if (currentPage < getTotalPages() - 1) {

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
