const value = window.location.search;
const debug_nav = document.querySelector(".debug-nav");
const mainDiv = document.querySelector(".main");
const consoleBox = document.querySelector(".debug-box");
const ball1 = document.querySelector(".b1");
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

sensor.start();
sensor.onreading = () => {
  report = `X-axis angular velocity : ${sensor.x} <br>`;
  report += `Y-axis angular velocity : ${sensor.y} <br>`;
  report += `Z-axis angular velocity : ${sensor.z} <br>`;
  consoleBox.innerHTML = report;
};

sensor.onerror = (event) => {
  alert(event);
};
