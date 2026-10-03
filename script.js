const toggle=document.querySelector('.menu-toggle');const nav=document.querySelector('.nav nav');if(toggle){toggle.addEventListener('click',()=>nav.classList.toggle('open'));document.querySelectorAll('.nav nav a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')))}
let lastScrollTop = 0;
const header = document.querySelector(".site-header");

window.addEventListener("scroll", function () {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  if (scrollTop > lastScrollTop && scrollTop > 80) {
    // Scrolling DOWN
    header.classList.add("hide");
  } else {
    // Scrolling UP
    header.classList.remove("hide");
  }

  lastScrollTop = scrollTop;
});
