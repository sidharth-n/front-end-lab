const value = window.location.search;
const debug_nav = document.querySelector(".debug-nav");
const mainDiv = document.querySelector(".main");
const tiles = document.querySelector(".tile");

if (value.includes("debug")) {
  debug_nav.style.display = "flex";
} else {
  debug_nav.style.display = "none";
}
const vh = Math.max(
  document.documentElement.clientHeight || 0,
  window.innerHeight || 0
);
mainDiv.style.height = `${vh}px`;

tiles.addEventListener("click", () => {
  console.log("its working");
  /* tiles.style.backgroundColor = "orange"; */
  tiles.style.transform = "rotateY(90deg)";
  tiles.style.transform = "rotateY(0deg)";
});

/* tiles.addEventListener("click", () => {
  console.log("its working");
});
 */
