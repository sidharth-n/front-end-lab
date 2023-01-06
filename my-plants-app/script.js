const value = window.location.search;
const debug_nav = document.querySelector(".debug-nav");
const mainDiv = document.querySelector(".main");
const page1 = document.querySelector(".page-1");
const page2 = document.querySelector(".page-2");
const pullBtn1 = document.querySelector(".hori2");
const pullBtn2 = document.querySelector(".pull-device");
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

pullBtn1.addEventListener("click", () => {
  /* page1.style.position = "absolute"; */
  page1.style.Margintop = "1000px";
  /*  page2.style.marginTop = "-100px"; */
  pullBtn1.style.backgroundColor = "blue";
});

pullBtn2.addEventListener("click", () => {});
