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
  x = sensor.x * 100;
  y = sensor.y * 100;
  x = sensor.z * 100;
  report = `X-axis AV : ${x} <br>`;
  report += `Y-axis AV : ${y} <br>`;
  report += `Z-axis AV : ${z} <br>`;
  report += `Ball X : ${ball1.offsetLeft} <br>`;
  report += `Ball Y : ${ball1.offsetTop} <br>`;
  consoleBox.innerHTML = report;
  ball1.style.left = `${ball1.offsetLeft + x}px`;
  ball1.style.top = `${ball1.offsetTop - y}px`;
};

sensor.onerror = (event) => {
  alert(event);
};
