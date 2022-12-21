const text_area = document.querySelector(".type");
const s_btn = document.querySelector(".send-btn");
const r_msg = document.querySelector(".r-msg");
const s_msg = document.querySelector(".s-msg");
const main_con = document.querySelector(".main-container");
document.querySelector(".r1").remove();
document.querySelector(".r2").remove();
text_area.focus();
let msg = "";
let pos = 0;
let started = 0;
let prev_rand = -1;

const rand_colors = [
  "rgb(180, 243, 244)",
  "rgb(255, 153, 153)",
  "rgb(242, 242, 145)",
  "rgb(234, 139, 139)",
  "rgb(175, 175, 238)",
  "rgb(242, 182, 125)",
  "rgb(225, 227, 146)",
];

const random_color = () => {
  let rand = Math.floor(Math.random() * 8);
  if (rand == prev_rand) {
    rand_colors();
  }
  prev_rand = rand;
  return rand_colors[rand];
};

const fetcher = () => {
  const url = `https://textdb.dev/api/data/sid123007`;
  const read = () => fetch(url);
  const write = (data) => {
    const value = JSON.stringify(data);

    fetch(url, {
      body: value,
      headers: { "Content-Type": "text/plain" },
      method: "POST",
    });
  };
  return { read: read, write: write };
};

const updater = () => {
  if (started == 1) {
    fetcher()
      .read()
      .then((r) => r.json())
      .then((j) => {
        if (msg != j.split("---")[0]) {
          add_msg(j.split("---")[0], j.split("---")[1]);
          msg = j.split("---")[0];
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => console.log("Message read successfully"));
  }
};

const add_msg = (new_msg, s_time) => {
  const msg_el = document.createElement("div");
  const time_el = document.createElement("span");
  time_el.classList.add("time");
  if (pos == 0) {
    msg_el.classList.add("s-msg", "msg");
    pos = 1;
  } else {
    msg_el.classList.add("r-msg", "msg");
    pos = 0;
  }
  msg_el.textContent = new_msg;
  time_el.textContent = s_time;
  main_con.appendChild(msg_el);
  msg_el.appendChild(time_el);
  msg_el.style.backgroundColor = random_color();
};

s_btn.addEventListener("click", () => {
  if (text_area.value != "") {
    started = 1;
    const time = new Date();
    timeString = `${time.getHours()}:${time.getMinutes()}`;
    fetcher().write(text_area.value + "---" + timeString);
    text_area.value = "";
  }
});

setInterval(updater, 1000);
