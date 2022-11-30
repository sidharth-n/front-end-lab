const input = document.querySelector("input");
const overlay = document.querySelector(".disabled");
const slider = document.querySelector("#slider");
const main_container = document.querySelector(".main-container");
const play_box = document.querySelector(".play-box");
let val = "work";
document.addEventListener("keydown", (event) => {
  const name = event.key;
  if (name == "d") {
    if (val == "work") {
      overlay.setAttribute("class", "overlay");
      slider.style.display = "block";
      val = "debug";
    } else {
      overlay.setAttribute("class", "disabled");
      slider.style.display = "none";
      val = "work";
      main_container.style.opacity = "1";
      play_box.style.opacity = "1";
    }
  }
});

slider.addEventListener("input", () => {
  overlay.style.opacity = slider.value;
  main_container.style.opacity = 1 - slider.value;
  play_box.style.opacity = 1 - slider.value;
});
