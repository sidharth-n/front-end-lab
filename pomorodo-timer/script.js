const main_div = document.querySelector(".main");

const vw = Math.max(
  document.documentElement.clientWidth || 0,
  window.innerWidth || 0
);
const vh = Math.max(
  document.documentElement.clientHeight || 0,
  window.innerHeight || 0
);

main_div.style.width = `${vw}px`;
main_div.style.height = `${vh}px`;
