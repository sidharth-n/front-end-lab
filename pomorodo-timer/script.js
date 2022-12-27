const main_div = document.querySelector(".main");
const startBtn = document.querySelector(".start-stop");
const timerMinutes = document.querySelector(".t-min");
const timerSeconds = document.querySelector(".t-secs");
const taskName = document.querySelector(".current-task");
const timerCircle = document.querySelector(".timer-circle");
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
let minutes = Number(timerMinutes.innerText);
let seconds = Number(timerSeconds.innerText);
const totalTime = minutes * 60 + seconds;
const digreePerSecond = 360 / totalTime;
console.log(digreePerSecond);

let countdown = () => {
  let count = 1;
  let timerDown = setInterval(() => {
    timerCircle.style.background = `conic-gradient(#4742c0, ${
      digreePerSecond * count
    }deg, #2f2d38 0deg)`;
    if (seconds == 1 && minutes == 0) {
      clearInterval(timerDown);
      taskName.style.backgroundColor = "green";
    }
    if (minutes != 0) {
      if (seconds == 0) {
        seconds = 60;
      }
    }
    seconds--;
    if (seconds == 59) {
      minutes--;
      timerMinutes.innerText = minutes >= 10 ? minutes : `0${minutes}`;
    }
    timerSeconds.innerText = seconds >= 10 ? seconds : `0${seconds}`;
    count++;
    /*     timerCircle.style.background = `conic-gradient(#4742c0, 32.72deg, #2f2d38 0deg);`; */
  }, 1000);
};

startBtn.addEventListener("click", () => {
  countdown();
});
