const value = window.location.search;
const debug_nav = document.querySelector(".debug-nav");
if (value.includes("debug")) {
  debug_nav.style.display = "flex";
} else {
  debug_nav.style.display = "none";
}
