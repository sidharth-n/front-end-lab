const text_area = document.querySelector(".type");
const s_btn = document.querySelector(".send-btn");
const r_msg = document.querySelector(".r-msg");
const s_msg = document.querySelector(".s-msg");
const main_con = document.querySelector(".main-container");
const main_div = document.querySelector(".main");
const popup = document.querySelector(".popup");
const close_btn = document.querySelector(".p-close");
const create_room_btn = document.querySelector(".cr-btn");
const join_room_btn = document.querySelector(".jr-btn");
const room_link_area = document.querySelector(".room-link");
const room_name = document.querySelector(".sender-name");
const overlay = document.querySelector(".overlay");
let msg = {};
let chat = [];
let pos = 0;
let no = 0;
let prev_msg = "";
let _id = "sidtesting123";
const queryString = window.location.search;
if (queryString != "") {
  _id = queryString.replace("?", "");
  room_name.innerText = `Room : ${_id}`;
  popup.style.display = "none";
  overlay.style.display = "none";
}

close_btn.addEventListener("click", () => {
  popup.style.display = "none";
});

const vw = Math.max(
  document.documentElement.clientWidth || 0,
  window.innerWidth || 0
);
const vh = Math.max(
  document.documentElement.clientHeight || 0,
  window.innerHeight || 0
);
popup.style.top = `${vh / 2 - popup.offsetHeight / 2}px`;
popup.style.left = `${(vw - popup.offsetWidth) / 2}px`;
main_div.style.width = `${vw}px`;
main_div.style.height = `${vh}px`;
console.log(screen.width);
console.log(screen.height);
document.querySelector(".r1").remove();
document.querySelector(".r2").remove();
text_area.focus();

create_room_btn.addEventListener("click", () => {
  _id = getId();
  room_name.innerText = _id;
  console.log(_id);
  room_link_area.innerText = `${window.location.href}?${_id}`;
  room_link_area.style.color = "lightblue";
  room_link_area.style.display = "block";
  create_room_btn.innerText = "Copy and share";
  create_room_btn.style.boxShadow = "none";
  create_room_btn.style.backgroundColor = "transparent";
  popup.style.left = `${(vw - popup.offsetWidth) / 2}px`;
  join_room_btn.style.backgroundColor = "rgb(236, 95, 13)";
  join_room_btn.style.boxShadow = "0px 5px 10px 2px rgb(44, 44, 44)";
  join_room_btn.style.color = "white";
});

join_room_btn.addEventListener("click", () => {
  if (create_room_btn.innerText == "Copy and share") {
    popup.style.display = "none";
    overlay.style.height = "0px";
    overlay.style.width = "0px";
  }
});

const getId = function (_id = null) {
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
  msg_el.classList.add("r-msg", "msg");
  msg_el.textContent = new_msg;
  time_el.textContent = s_time;
  main_con.appendChild(msg_el);
  msg_el.appendChild(time_el);
  msg_el.style.backgroundColor = "transparent";
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
