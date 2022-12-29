const value = window.location.search;
const debug_nav = document.querySelector(".debug-nav");
if (value.includes("debug")) {
  debug_nav.style.display = "flex";
} else {
  debug_nav.style.display = "none";
}

const back = document.querySelector(".back");
const animalsListPage = document.querySelector(".animals-list-page");
const animalsDetailPage = document.querySelector(".animal-details-page");
const lionCard = document.querySelector(".a1");
const lionPlayBtn = document.querySelector(".play-lion");
const catPlayBtn = document.querySelector(".play-cat");
const horsePlayBtn = document.querySelector(".play-horse");
const dogPlayBtn = document.querySelector(".play-dog");
const monkeyPlayBtn = document.querySelector(".play-monkey");

back.addEventListener("click", () => {
  animalsDetailPage.style.display = "none";
  animalsListPage.style.display = "flex";
});

lionCard.addEventListener("click", () => {
  animalsDetailPage.style.display = "flex";
  animalsListPage.style.display = "none";
});

lionPlayBtn.addEventListener("click", () => {
  new Audio("./assets/sounds/lion.wav").play();
});

catPlayBtn.addEventListener("click", () => {
  new Audio("./assets/sounds/cat.wav").play();
});

horsePlayBtn.addEventListener("click", () => {
  new Audio("./assets/sounds/horse.wav").play();
});

dogPlayBtn.addEventListener("click", () => {
  new Audio("./assets/sounds/dog.wav").play();
});

monkeyPlayBtn.addEventListener("click", () => {
  new Audio("./assets/sounds/monkey.wav").play();
});
