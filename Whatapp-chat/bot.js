const text_area = document.querySelector(".type");
const s_btn = document.querySelector(".send-btn");
const r_msg = document.querySelector(".r-msg");
const s_msg = document.querySelector(".s-msg");
const main_con = document.querySelector(".main-container");
document.querySelector(".r1").remove();
document.querySelector(".r2").remove();
text_area.focus();
let msg = {};
let chat = [];
let pos = 0;
let no = 0;
let prev_msg = "";

/* const getId = function (_id = null) {
  const getRandomId = () => {
    const randomChar = () =>
      String.fromCharCode(97 + Math.floor(26 * Math.random()));
    return [1, 1, 1]
      .map((_) => {
        return [1, 1, 1].map(randomChar).join("");
      })
      .join("-");
  };

  if (!_id) {
    _id = getRandomId();
  }

  return _id;
};

const _id = getId(); */
const _id = "random48345";

const rand_colors = [
  "rgb(180, 243, 244)",
  "rgb(255, 153, 153)",
  "rgb(242, 242, 145)",
  "rgb(200, 139, 139)",
  "rgb(175, 175, 238)",
  "rgb(236, 173, 111)",
  "rgb(225, 227, 146)",
  "rgb(207, 149, 245)",
];

const random_color = () => {
  let rand = Math.floor(Math.random() * 8);
  return rand_colors[rand];
};

const fetcher = () => {
  const url = `https://textdb.dev/api/data/${_id}`;
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
  fetcher()
    .read()
    .then((r) => r.json())
    .then((j) => {
      let last_msg = j[j.length - 1];
      if (prev_msg != last_msg.text) {
        add_msg(last_msg.text, last_msg.time);
        console.log(last_msg.text);
        prev_msg = last_msg.text;
      }
    })
    .catch((error) => {
      console.log("no messages yet");
    })
    .finally(() => {});
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
  main_con.scrollTop = main_con.scrollHeight;
};

s_btn.addEventListener("click", () => {
  if (text_area.value != "") {
    const time = new Date();
    timeString = `${time.getHours()}:${time.getMinutes()}`;
    msg.no = no;
    msg.text = text_area.value;
    msg.time = timeString;
    chat.push(msg);
    fetcher().write(chat);
    no++;
    msg = {};
    text_area.value = "";
  }
});

setInterval(updater, 500);
