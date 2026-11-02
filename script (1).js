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

  function setSliderFromPointer(event) {
    const bounds = box.getBoundingClientRect();
    const position = ((event.clientX - bounds.left) / bounds.width) * 100;
    range.value = Math.max(0, Math.min(100, position));
    updateSlider();
  }

  let isDragging = false;

  box.addEventListener("pointerdown", function (event) {
    isDragging = true;
    box.setPointerCapture(event.pointerId);
    setSliderFromPointer(event);
  });

  box.addEventListener("pointermove", function (event) {
    if (isDragging) {
      setSliderFromPointer(event);
    }
  });

  box.addEventListener("pointerup", function () {
    isDragging = false;
  });

  box.addEventListener("pointercancel", function () {
    isDragging = false;
  });

  range.addEventListener("input", updateSlider);

  updateSlider();
});
