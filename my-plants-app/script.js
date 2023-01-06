const value = window.location.search;
const debug_nav = document.querySelector(".debug-nav");
const mainDiv = document.querySelector(".main");
const page1 = document.querySelector(".page-1");
const page2 = document.querySelector(".page-2");
const pullBtn1 = document.querySelector(".hori2");
const pullBtn2 = document.querySelector(".pull-device");
const moreBtn = document.querySelector(".more-btn");
const moreDiv1 = document.querySelector(".b3");
const moreDiv2 = document.querySelector(".b4");
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
  page2.style.marginTop = "-100vh";
  /*  page2.style.marginTop = "-100px"; */
  /* pullBtn1.style.backgroundColor = "blue"; */
});

pullBtn2.addEventListener("click", () => {
  page2.style.marginTop = "0vh";
});
moreBtn.addEventListener("click", () => {
  if (moreBtn.innerText == "+2") {
    moreDiv1.style.marginTop = "0px";
    moreDiv2.style.marginTop = "0px";
    moreBtn.innerText = "-2";
  } else if (moreBtn.innerText == "-2") {
    moreDiv1.style.marginTop = "-65px";
    moreDiv2.style.marginTop = "-65px";
    moreBtn.innerText = "+2";
  }
});
