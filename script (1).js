/* BEFORE / AFTER SLIDERS */

document.querySelectorAll(".before-after").forEach(function (box) {
  const range = box.querySelector(".slider");
  const after = box.querySelector(".after-image");
  const line = box.querySelector(".slider-line");

  if (!range || !after) return;

  function updateSlider() {
    const value = Number(range.value);

    after.style.clipPath = `inset(0 ${100 - value}% 0 0)`;

    if (line) {
      line.style.left = `${value}%`;
    }
  }

  range.addEventListener("input", updateSlider);
  range.addEventListener("change", updateSlider);

  updateSlider();
});
