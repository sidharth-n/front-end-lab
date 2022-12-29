const value = window.location.search;
const debug_nav = document.querySelector(".debug-nav");
if (value.includes("debug")) {
  debug_nav.style.display = "flex";
} else {
  debug_nav.style.display = "none";
}
const mainDiv = document.querySelector(".main");
const emailInput = document.querySelector(".email-input");
const nextBtn = document.querySelector(".next-btn");
const warningEmail = document.querySelector(".warning-email");
const focusText = document.querySelector(".focus-text");
const vh = Math.max(
  document.documentElement.clientHeight || 0,
  window.innerHeight || 0
);
mainDiv.style.height = `${vh}px`;
nextBtn.addEventListener("click", () => {
  if (emailInput.value == "") {
    focusText.style.display = "block";
    focusText.style.color = "red";
    emailInput.style.border = "1px solid red";
    warningEmail.style.display = "flex";
  }
});
