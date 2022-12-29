const value = window.location.search;
const debug_nav = document.querySelector(".debug-nav");
if (value.includes("debug")) {
  debug_nav.style.display = "flex";
} else {
  debug_nav.style.display = "none";
}
const mainDiv = document.querySelector(".main");
const emailInput = document.querySelector(".email-input");
const passInput = document.querySelector("#password-input");
const nextBtn = document.querySelector(".next-btn");
const nextBtn2 = document.querySelector(".nxt2");
const warningEmail = document.querySelector(".warning-email");
const warningPass = document.querySelector(".warning-password");
const focusText = document.querySelector(".focus-text");
const focusText2 = document.querySelector(".f2");
const emailPage = document.querySelector(".p1");
const passPage = document.querySelector(".p2");
const emailBox = document.querySelector(".email-address");
const showPassCheck = document.querySelector(".checkbox");
const vh = Math.max(
  document.documentElement.clientHeight || 0,
  window.innerHeight || 0
);
let account = {};

mainDiv.style.height = `${vh}px`;
nextBtn.addEventListener("click", () => {
  if (emailInput.value == "") {
    focusText.style.display = "block";
    focusText.style.color = "red";
    emailInput.style.border = "1px solid red";
    warningEmail.style.display = "flex";
  } else {
    emailPage.style.display = "none";
    passPage.style.display = "flex";
    account.email = emailInput.value;
    emailBox.innerText = emailInput.value;
  }
});

nextBtn2.addEventListener("click", () => {
  if (passInput.value == "") {
    focusText2.style.display = "block";
    focusText2.style.color = "red";
    passInput.style.border = "1px solid red";
    warningPass.style.display = "flex";
  } else {
    account.passsword = passInput.value;
    console.log(account);
  }
});
