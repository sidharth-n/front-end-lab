const value = window.location.search;
const debug_nav = document.querySelector(".debug-nav");
const mainDiv = document.querySelector(".main");
const checkoutBtn = document.querySelector(".checkout");
const menuBtn = document.querySelector(".main-menu");
const page1 = document.querySelector(".page-1");
const page2 = document.querySelector(".page-2");
const foodDetailsSection = document.querySelector(".food-details");
const foodCard = document.querySelector(".food-card");
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

foodCard.addEventListener("click", () => {
  foodDetailsSection.style.display = "flex";
});

menuBtn.addEventListener("click", () => {
  page1.style.display = "flex";
  page2.style.display = "none";
});
