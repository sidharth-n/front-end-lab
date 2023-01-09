const value = window.location.search;
const debug_nav = document.querySelector(".debug-nav");
const mainDiv = document.querySelector(".main");
const tileBox = document.querySelector(".tiles-box");
const reveal = document.querySelector(".reveal");

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

reveal.addEventListener("click", () => {
  tileBox.style.display = "none";
  console.log("revealed");
});
