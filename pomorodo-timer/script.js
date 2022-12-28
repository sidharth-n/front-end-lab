const main_div = document.querySelector(".main");
const startBtn = document.querySelector(".start-stop");
const timerMinutes = document.querySelector(".t-min");
const timerSeconds = document.querySelector(".t-secs");
const taskBar = document.querySelector(".current-task");
const timerCircle = document.querySelector(".timer-circle");
const pauseBtnIcon = document.querySelector(".pause");
const startBtnIcon = document.querySelector(".start");
const progressBtn = document.querySelector(".timer-circle-fake");
const settingsPage = document.querySelector(".settings-page");
const timerPage = document.querySelector(".timer-page");
const settingsPageIcon = document.querySelector(".settings-section");
const timerPageIcon = document.querySelector(".timer-section");
const saveBtn = document.querySelector(".save");
const newTaskName = document.querySelector(".task-title");
const newTaskft = document.querySelector("#focus-time");
const newTasksb = document.querySelector("#sbreak-time");
const newTasklb = document.querySelector("#lbreak-time");
const newTaskSections = document.querySelector("#sections");
const taskName = document.querySelector(".task-name");
const value = window.location.search;
const debug_nav = document.querySelector(".debug-nav");
if (value.includes("debug")) {
  debug_nav.style.display = "flex";
} else {
  debug_nav.style.display = "none";
}
timerPage.style.display = "none";
timerPageIcon.style.stroke = "#6965e7";
let state = "pause";
let speed = 10;
let timer;
let count = 1;
let tasks = {};
let minutes = 0;
let seconds = 0;
newTaskName.focus();
const vw = Math.max(
  document.documentElement.clientWidth || 0,
  window.innerWidth || 0
);
const vh = Math.max(
  document.documentElement.clientHeight || 0,
  window.innerHeight || 0
);

saveBtn.addEventListener("click", () => {
  tasks.title = newTaskName.value;
  tasks.focusTime = newTaskft.value;
  tasks.shortBreak = newTasksb.value;
  tasks.longBreak = newTasklb.value;
  tasks.sections = newTaskSections.value;
  taskName.innerText = `Task: ${tasks.title}`;
  settingsPage.style.display = "none";
  timerPage.style.display = "flex";
  timerPageIcon.style.stroke = "#6965e7";
  settingsPageIcon.style.stroke = "rgb(131, 131, 131)";
});

settingsPageIcon.addEventListener("click", () => {
  settingsPage.style.display = "flex";
  timerPage.style.display = "none";
  timerPageIcon.style.stroke = "rgb(131, 131, 131)";
  settingsPageIcon.style.stroke = "#6965e7";
});
timerPageIcon.addEventListener("click", () => {
  settingsPage.style.display = "none";
  timerPage.style.display = "flex";
  timerPageIcon.style.stroke = "#6965e7";
  settingsPageIcon.style.stroke = "rgb(131, 131, 131)";
});
main_div.style.height = `${vh}px`;
minutes = Number(timerMinutes.innerText);
seconds = Number(timerSeconds.innerText);
const totalTime = minutes * 60 + seconds;
const digreePerSecond = 360 / totalTime;
console.log(digreePerSecond);
let countdown = () => {
  timer = setInterval(() => {
    if (minutes != 0) {
      if (seconds == 0) {
        seconds = 60;
      }
    }
    if (seconds != 0) {
      seconds--;
      timerSeconds.innerText = seconds >= 10 ? seconds : `0${seconds}`;
      progressBtn.style.transform = `rotate(${digreePerSecond * count}deg)`;
      timerCircle.style.background = `conic-gradient(#4742c0, ${
        digreePerSecond * count
      }deg, rgb(27, 27, 27) 0deg)`;
    }
    if (seconds <= 0 && minutes <= 0) {
      clearInterval(timer);
      taskBar.style.backgroundColor = "green";
      state = "start";
      startBtnIcon.style.display = "flex";
      pauseBtnIcon.style.display = "none";
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
