const input = document.querySelector("input");
const overlay = document.querySelector(".overlay");
const slider = document.querySelector("#slider");
const debugBtn = document.querySelector(".debug-btn");

debugBtn.addEventListener("click", () => {
  if (debugBtn.value == "work") {
    overlay.setAttribute("class", "overlay");
    slider.style.display = "block";
    debugBtn.textContent = "Debug Mode";
    debugBtn.style.backgroundColor = "red";
    debugBtn.value = "debug";
  } else {
    overlay.setAttribute("class", "disabled");
    slider.style.display = "none";
    debugBtn.textContent = "Test Mode";
    debugBtn.style.backgroundColor = "green";
    debugBtn.value = "work";
  }
});

slider.addEventListener("input", () => {
  overlay.style.opacity = slider.value;
});
