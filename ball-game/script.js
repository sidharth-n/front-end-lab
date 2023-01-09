const value = window.location.search;
const debug_nav = document.querySelector(".debug-nav");
const mainDiv = document.querySelector(".main");
const consoleBox = document.querySelector(".debug-box");
const ball1 = document.querySelector(".b1");
const ball2 = document.querySelector(".b2");
let x, y, z, report;
let sensor = new Gyroscope();
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
/* ball1.style.left = `${mainDiv.offsetWidth / 2}px`;
ball1.style.top = `${mainDiv.offsetHeight / 2}px`; */
sensor.start();
sensor.onreading = () => {
  /* x = sensor.x * 150;
  y = sensor.y * 100;
  z = sensor.z * 100;
  report = `X-axis AV : ${x} <br>`;
  report += `Y-axis AV : ${y} <br>`;
  report += `Z-axis AV : ${z} <br>`;
  report += `Ball X : ${ball1.offsetLeft} <br>`;
  report += `Ball Y : ${ball1.offsetTop} <br>`; */
  consoleBox.innerHTML = sensor;
  /* ball1.style.left = `${
    ball1.offsetLeft + y < 0
      ? 0
      : ball1.offsetLeft + y > mainDiv.offsetWidth - 30
      ? mainDiv.offsetWidth - 30
      : ball1.offsetLeft + y
  }px`;
  ball1.style.top = `${
    ball1.offsetTop + x < 0
      ? 0
      : ball1.offsetTop + x > ball1.style.top - 30
      ? ball1.style.top - 30
      : ball1.offsetTop + x
  }px`;
  if (
    ball1.offsetLeft == ball2.offsetLeft ||
    ball1.offsetTop == ball2.offsetTop
  ) {
    consoleBox.innerHTML = "YOU WON !!!";
  } */
};

sensor.onerror = (event) => {
  alert(event);
};
