const params = new Proxy(new URLSearchParams(window.location.search), {
  get: (searchParams, prop) => searchParams.get(prop),
});
const value = params.mode;
console.log(typeof value);
const input = document.querySelector("input");
const overlay = document.querySelector(".disabled");
const slider = document.querySelector("#slider");
const main_container = document.querySelector(".main-container");
const debug_nav = document.querySelector(".debug-nav");
let val = "work";
if (value == "1") {
  if (val == "work") {
    overlay.setAttribute("class", "overlay");
    slider.style.display = "block";
    debug_nav.style.display = "flex";
    val = "debug";
  } else {
    overlay.setAttribute("class", "disabled");
    slider.style.display = "none";
    debug_nav.style.display = "none";
    val = "work";
    main_container.style.opacity = "1";
  }
}

slider.addEventListener("input", () => {
  overlay.style.opacity = slider.value;
  main_container.style.opacity = 1 - slider.value;
});
