const main_div = document.querySelector(".main");
const startBtn = document.querySelector(".start-stop");
const timerMinutes = document.querySelector(".t-min");
const timerSeconds = document.querySelector(".t-secs");
const taskName = document.querySelector(".current-task");
const timerCircle = document.querySelector(".timer-circle");
const pauseBtnIcon = document.querySelector(".pause");
const startBtnIcon = document.querySelector(".start");
const progressBtn = document.querySelector(".timer-circle-fake");
let state = "pause";
let speed = 100;
let timer;
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
let count = 1;
let countdown = () => {
  timer = setInterval(() => {
    if (minutes != 0) {
      if (seconds == 0) {
        seconds = 60;
      }
    }
    seconds--;
    timerSeconds.innerText = seconds >= 10 ? seconds : `0${seconds}`;
    progressBtn.style.transform = `rotate(${digreePerSecond * count}deg)`;
    timerCircle.style.background = `conic-gradient(#4742c0, ${
      digreePerSecond * count
    }deg, rgb(27, 27, 27) 0deg)`;
    if (seconds <= 0 && minutes <= 0) {
      clearInterval(timer);
      taskName.style.backgroundColor = "green";
    } else {
      if (seconds == 59) {
        minutes--;
        timerMinutes.innerText = minutes >= 10 ? minutes : `0${minutes}`;
      }

      count++;
      /*     timerCircle.style.background = `conic-gradient(#4742c0, 32.72deg, #2f2d38 0deg);`; */
    }
  }, speed);
};

startBtn.addEventListener("click", () => {
  if (state == "pause") {
    state = "start";
    startBtnIcon.style.display = "none";
    pauseBtnIcon.style.display = "flex";
    countdown();
  } else {
    clearInterval(timer);
    state = "pause";
    startBtnIcon.style.display = "flex";
    pauseBtnIcon.style.display = "none";
    console.log("Its paused");
  }
});
