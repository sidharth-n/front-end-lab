const value = window.location.search;
const debug_nav = document.querySelector(".debug-nav");
const mainDiv = document.querySelector(".main");
const checkoutBtn = document.querySelector(".checkout");
const page1 = document.querySelector(".page-1");
const page2 = document.querySelector(".page-2");
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

checkoutBtn.addEventListener("click", () => {
  page1.style.display = "none";
  page2.style.display = "flex";
});
