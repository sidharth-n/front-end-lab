const value = window.location.search;
const debug_nav = document.querySelector(".debug-nav");
const mainDiv = document.querySelector(".main");
const page2 = document.querySelector(".page-2");
const page1 = document.querySelector(".page-1");
const backBtn = document.querySelector(".back-btn");
const lampCard = document.querySelector(".d1");

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

lampCard.addEventListener("click", () => {
  page2.style.display = "flex";
  page1.style.display = "none";
});

backBtn.addEventListener("click", () => {
  page2.style.display = "none";
  page1.style.display = "flex";
});
